import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request-ip";
import { getSiteUrl, getStripe } from "@/lib/stripe";

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  const ip = getRequestIp(request);

  const limited = checkRateLimit(`soins-checkout:${ip}`, 8, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez plus tard." },
      { status: 429 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "Nom et prénom requis." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe non configuré (STRIPE_SECRET_KEY)." },
      { status: 503 },
    );
  }

  const siteUrl = getSiteUrl();
  if (!siteUrl) {
    return NextResponse.json(
      { error: "URL du site non configurée (NEXT_PUBLIC_SITE_URL)." },
      { status: 503 },
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    success_url: `${siteUrl}/soins/demande?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/soins/commander?payment=cancelled`,
    metadata: {
      flow: "soins",
      firstName,
      lastName,
      email,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: 100,
          product_data: {
            name: "Soin énergétique à distance",
          },
        },
      },
    ],
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Impossible de créer la session Stripe." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, checkoutUrl: session.url });
}
