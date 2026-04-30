import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getContactEmail, getFromEmail, getResend } from "@/lib/resend";
import { getRequestIp } from "@/lib/request-ip";

const MAX_FILES = 3;
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  const ip = getRequestIp(request);

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const birthDate = String(formData.get("birthDate") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const acceptTerms = String(formData.get("acceptTerms") ?? "") === "true";

  const errors: string[] = [];
  if (!firstName) errors.push("Prénom requis.");
  if (!lastName) errors.push("Nom requis.");
  if (!isValidEmail(email)) errors.push("Email invalide.");
  if (!birthDate) errors.push("Date de naissance requise.");
  if (message.length < 20) errors.push("Message trop court.");
  if (!acceptTerms) errors.push("Acceptation des conditions requise.");

  const rawFiles = formData.getAll("photos");
  const files: File[] = [];
  for (const item of rawFiles) {
    if (item instanceof File && item.size > 0) files.push(item);
  }
  if (files.length === 0) errors.push("Au moins une photo est requise.");
  if (files.length > MAX_FILES) errors.push("Trop de fichiers.");

  for (const f of files) {
    if (!ALLOWED.has(f.type)) errors.push("Format de fichier non autorisé.");
    if (f.size > MAX_BYTES) errors.push("Fichier trop volumineux (max 5 Mo).");
  }

  if (errors.length) {
    return NextResponse.json({ error: errors[0] }, { status: 400 });
  }

  const limited = checkRateLimit(`soins:${ip}`, 3, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop de demandes.", retryAfterSec: limited.retryAfterSec },
      { status: 429 },
    );
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json(
      { error: "Service email non configuré (RESEND_API_KEY)." },
      { status: 503 },
    );
  }

  const to = getContactEmail();
  const from = getFromEmail();
  const paymentUrl = process.env.STRIPE_SOINS_PAYMENT_LINK?.trim();
  if (!paymentUrl) {
    return NextResponse.json(
      { error: "Lien de paiement Stripe non configuré (STRIPE_SOINS_PAYMENT_LINK)." },
      { status: 503 },
    );
  }

  const attachments = await Promise.all(
    files.map(async (f) => {
      const buf = Buffer.from(await f.arrayBuffer());
      return {
        filename: f.name || "photo",
        content: buf,
      };
    }),
  );

  const htmlRows = `
    <tr><td>Prénom</td><td>${escapeHtml(firstName)}</td></tr>
    <tr><td>Nom</td><td>${escapeHtml(lastName)}</td></tr>
    <tr><td>Email</td><td>${escapeHtml(email)}</td></tr>
    <tr><td>Téléphone</td><td>${escapeHtml(phone || "—")}</td></tr>
    <tr><td>Date de naissance</td><td>${escapeHtml(birthDate)}</td></tr>
    <tr><td>Message</td><td>${escapeHtml(message).replace(/\n/g, "<br/>")}</td></tr>
    <tr><td>IP</td><td>${escapeHtml(ip)}</td></tr>
  `;

  const ownerHtml = `
    <h1>Nouvelle demande de soin à distance</h1>
    <table style="border-collapse:collapse">${htmlRows}</table>
  `;

  const [ownerSend, clientSend] = await Promise.all([
    resend.emails.send({
      from,
      to,
      subject: `[Rose Mediara] Demande de soin — ${firstName} ${lastName}`,
      html: ownerHtml,
      attachments,
    }),
    resend.emails.send({
      from,
      to: email,
      subject: "Rose Mediara — réception de votre demande de soin",
      html: `
        <p>Bonjour ${escapeHtml(firstName)},</p>
        <p>J’ai bien reçu votre demande de soin à distance. Je reviendrai vers vous après étude de votre dossier.</p>
        <p>Bien à vous,<br/>Rose Mediara</p>
      `,
    }),
  ]);

  if (ownerSend.error || clientSend.error) {
    return NextResponse.json(
      {
        error:
          ownerSend.error?.message ??
          clientSend.error?.message ??
          "Échec d’envoi email.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, paymentUrl });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
