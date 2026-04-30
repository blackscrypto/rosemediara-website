import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function GET(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe non configuré (STRIPE_SECRET_KEY)." },
      { status: 503 },
    );
  }

  const id = new URL(request.url).searchParams.get("id")?.trim();
  if (!id) {
    return NextResponse.json({ error: "Identifiant manquant." }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(id).catch(() => null);
  if (!session || session.payment_status !== "paid") {
    return NextResponse.json({ error: "Paiement non trouvé ou non confirmé." }, { status: 404 });
  }
  if (session.metadata?.flow !== "soins") {
    return NextResponse.json({ error: "Session invalide." }, { status: 400 });
  }

  const email = (
    session.customer_details?.email ??
    session.customer_email ??
    session.metadata.email ??
    ""
  ).trim();

  return NextResponse.json({
    firstName: String(session.metadata.firstName ?? "").trim(),
    lastName: String(session.metadata.lastName ?? "").trim(),
    email,
  });
}
