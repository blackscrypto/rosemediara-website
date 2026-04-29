import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getContactEmail, getFromEmail, getResend } from "@/lib/resend";
import { getRequestIp } from "@/lib/request-ip";

const SUBJECT_LABELS: Record<string, string> = {
  general: "Question générale",
  info: "Demande d’information",
  other: "Autre",
};

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

type Body = {
  firstName?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  const ip = getRequestIp(request);

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subjectKey = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!firstName) {
    return NextResponse.json({ error: "Prénom requis." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }
  if (!SUBJECT_LABELS[subjectKey]) {
    return NextResponse.json({ error: "Objet invalide." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ error: "Message trop court." }, { status: 400 });
  }

  const limited = checkRateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop de messages envoyés.", retryAfterSec: limited.retryAfterSec },
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

  const from = getFromEmail();
  const to = getContactEmail();
  const subjectLabel = SUBJECT_LABELS[subjectKey];

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `[Rose Mediara] ${subjectLabel} — ${firstName}`,
    html: `
      <p><strong>De :</strong> ${escapeHtml(firstName)} &lt;${escapeHtml(email)}&gt;</p>
      <p><strong>Objet :</strong> ${escapeHtml(subjectLabel)}</p>
      <p><strong>IP :</strong> ${escapeHtml(ip)}</p>
      <hr/>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
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
