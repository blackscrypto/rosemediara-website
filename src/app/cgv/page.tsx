import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "CGV des prestations proposées par Rose Mediara (placeholder).",
};

export default function CgvPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <article className="prose prose-neutral max-w-3xl text-text-muted">
          <h1 className="font-serif text-3xl font-semibold text-text">
            Conditions générales de vente
          </h1>
          <p>
            Document placeholder : à remplacer par vos CGV définitives (prestations,
            tarifs, modalités de paiement, annulation, droit de rétractation
            applicable, litiges, médiation, etc.).
          </p>
          <h2>Article 1 — Objet</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas.
          </p>
          <h2>Article 2 — Prestations</h2>
          <p>
            Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit
            amet, ante. Donec eu libero sit amet quam egestas semper.
          </p>
          <h2>Article 3 — Tarifs et paiement</h2>
          <p>
            Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Les prix
            sont indiqués en euros TTC ou HT selon votre statut (à préciser).
          </p>
          <h2>Article 4 — Responsabilité</h2>
          <p>
            Quisque sit amet est et sapien ullamcorper pharetra. Les consultations
            et soins ne remplacent pas un avis médical.
          </p>
        </article>
      </Container>
    </div>
  );
}
