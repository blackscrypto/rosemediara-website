import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getContactEmail, getFromEmail, getResend } from "@/lib/resend";
import { getRequestIp } from "@/lib/request-ip";
import {
  appearanceOptions,
  consentDuration,
  displayNameOptions,
  giftValidity,
  labelOf,
  usageOptions,
} from "@/lib/temoignage-video";

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  appearance?: string;
  displayName?: string;
  usages?: string[];
  signature?: string;
  acceptConsent?: boolean;
  acceptAdult?: boolean;
};

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  const ip = getRequestIp(request);

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const appearance = String(body.appearance ?? "");
  const displayName = String(body.displayName ?? "");
  const usages = Array.isArray(body.usages) ? body.usages.map(String) : [];
  const signature = String(body.signature ?? "").trim();

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "Prénom et nom requis." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }
  if (!appearanceOptions.some((o) => o.value === appearance)) {
    return NextResponse.json({ error: "Choisissez comment apparaître." }, { status: 400 });
  }
  if (!displayNameOptions.some((o) => o.value === displayName)) {
    return NextResponse.json({ error: "Choisissez le nom affiché." }, { status: 400 });
  }
  if (usages.length === 0 || !usages.every((u) => usageOptions.some((o) => o.value === u))) {
    return NextResponse.json({ error: "Choisissez au moins un usage." }, { status: 400 });
  }
  if (signature.length < 3) {
    return NextResponse.json({ error: "Signature requise." }, { status: 400 });
  }
  if (body.acceptConsent !== true || body.acceptAdult !== true) {
    return NextResponse.json({ error: "Les deux cases d’accord sont requises." }, { status: 400 });
  }

  const limited = checkRateLimit(`temoignage-video:${ip}`, 3, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop d’envois.", retryAfterSec: limited.retryAfterSec },
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

  const signedAt = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
  const usageLabels = usages.map((u) => labelOf(usageOptions, u));

  const recap = `
    <table style="border-collapse:collapse">
      <tr><td>Prénom et nom</td><td>${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
      <tr><td>Email</td><td>${escapeHtml(email)}</td></tr>
      <tr><td>Téléphone</td><td>${escapeHtml(phone || "—")}</td></tr>
      <tr><td>Apparence</td><td>${escapeHtml(labelOf(appearanceOptions, appearance))}</td></tr>
      <tr><td>Nom affiché</td><td>${escapeHtml(labelOf(displayNameOptions, displayName))}</td></tr>
      <tr><td>Usages autorisés</td><td>${usageLabels.map(escapeHtml).join("<br/>")}</td></tr>
      <tr><td>Durée</td><td>${consentDuration} à compter du ${escapeHtml(signedAt)}</td></tr>
      <tr><td>Signature</td><td>${escapeHtml(signature)}</td></tr>
      <tr><td>Signé le</td><td>${escapeHtml(signedAt)} (heure de Paris)</td></tr>
      <tr><td>IP</td><td>${escapeHtml(ip)}</td></tr>
    </table>
  `;

  const [ownerSend, clientSend] = await Promise.all([
    resend.emails.send({
      from: getFromEmail(),
      to: getContactEmail(),
      replyTo: email,
      subject: `[Rose Mediara] Accord témoignage vidéo — ${firstName} ${lastName}`,
      html: `
        <h1>Nouvel accord de témoignage vidéo</h1>
        <p>Gardez cet email : c’est la trace écrite de l’accord. La vidéo arrive sur WhatsApp.</p>
        ${recap}
        <p>Consultation de 30 minutes offerte à remettre, valable ${giftValidity}, quel que soit le contenu du témoignage.</p>
      `,
    }),
    resend.emails.send({
      from: getFromEmail(),
      to: email,
      subject: "Rose Mediara — votre accord pour le témoignage vidéo",
      html: `
        <p>Bonjour ${escapeHtml(firstName)},</p>
        <p>Merci d’accepter de partager votre expérience. Voici la copie de votre accord :</p>
        ${recap}
        <p>Il vous reste à m’envoyer votre vidéo sur WhatsApp, en réponse à mon message. Dès réception, je vous envoie le lien pour réserver vos 30 minutes offertes (valables ${giftValidity}).</p>
        <p>Vous pouvez demander le retrait de votre vidéo à tout moment en répondant à cet email.</p>
        <p>Bien à vous,<br/>Rose Mediara</p>
      `,
    }),
  ]);

  // Même tolérance que le formulaire de soins : en mode test Resend, la copie au client peut être refusée.
  const clientErrorMessage = clientSend.error?.message ?? "";
  const isResendRecipientRestriction =
    clientErrorMessage.includes("You can only send testing emails to your own email address") ||
    clientErrorMessage.includes("verify a domain at resend.com/domains");

  if (ownerSend.error || (clientSend.error && !isResendRecipientRestriction)) {
    return NextResponse.json(
      { error: ownerSend.error?.message ?? clientSend.error?.message ?? "Échec d’envoi email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
