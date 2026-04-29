import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getContactEmail, getFromEmail, getResend } from "@/lib/resend";
import { getSupabaseService } from "@/lib/supabase";
import { getRequestIp } from "@/lib/request-ip";

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

type Body = {
  firstName?: string;
  email?: string;
  rating?: number;
  content?: string;
  consent?: boolean;
  /** Honeypot — must stay empty */
  website?: string;
};

export async function POST(request: Request) {
  const ip = getRequestIp(request);
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  if (body.website && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const firstName = String(body.firstName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const rating = Number(body.rating);
  const content = String(body.content ?? "").trim();
  const consent = Boolean(body.consent);

  if (!firstName) {
    return NextResponse.json({ error: "Prénom requis." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Note invalide." }, { status: 400 });
  }
  if (content.length < 20 || content.length > 1000) {
    return NextResponse.json(
      { error: "Le témoignage doit faire entre 20 et 1000 caractères." },
      { status: 400 },
    );
  }
  if (!consent) {
    return NextResponse.json({ error: "Consentement requis." }, { status: 400 });
  }

  const limited = checkRateLimit(`testimonials:${ip}`, 2, 24 * 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop de témoignages envoyés.", retryAfterSec: limited.retryAfterSec },
      { status: 429 },
    );
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.json(
      { error: "Base de données non configurée (clé service Supabase)." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("testimonials").insert({
    first_name: firstName,
    email,
    rating,
    content,
    status: "pending",
    ip_address: ip,
  });

  if (error) {
    return NextResponse.json(
      { error: "Enregistrement impossible pour le moment." },
      { status: 502 },
    );
  }

  const resend = getResend();
  if (resend) {
    const from = getFromEmail();
    const to = getContactEmail();
    await resend.emails.send({
      from,
      to,
      subject: "[Rose Mediara] Nouveau témoignage en attente de validation",
      html: `
        <p>Un nouveau témoignage a été déposé.</p>
        <p><strong>Prénom :</strong> ${escapeHtml(firstName)}<br/>
        <strong>Email :</strong> ${escapeHtml(email)}<br/>
        <strong>Note :</strong> ${rating}/5</p>
        <p>${escapeHtml(content).replace(/\n/g, "<br/>")}</p>
      `,
    });
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
