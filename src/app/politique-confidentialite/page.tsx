import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Traitement des données personnelles et droits RGPD — Rose Mediara (placeholder).",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <article className="prose prose-neutral max-w-3xl text-text-muted">
          <h1 className="font-serif text-3xl font-semibold text-text">
            Politique de confidentialité
          </h1>
          <p>
            Texte placeholder conforme à structurer selon le RGPD : responsable
            de traitement, finalités, base légale, durée de conservation,
            destinataires, transferts hors UE, droits d’accès, rectification,
            effacement, opposition, portabilité, réclamation auprès de la CNIL.
          </p>
          <h2>Données collectées</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Données
            issues des formulaires (contact, soins, témoignages) : identité,
            coordonnées, contenus transmis, pièces jointes le cas échéant.
          </p>
          <h2>Finalités</h2>
          <p>
            Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
            Gestion des demandes, envoi d’emails transactionnels, modération des
            avis.
          </p>
          <h2>Cookies</h2>
          <p>
            Voir la page dédiée{" "}
            <a href="/politique-cookies">Politique de cookies</a> (placeholder).
          </p>
        </article>
      </Container>
    </div>
  );
}
