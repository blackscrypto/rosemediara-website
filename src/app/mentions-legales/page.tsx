import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales, éditeur du site et hébergeur — Rose Mediara.",
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <article className="prose prose-neutral max-w-3xl text-text-muted">
          <h1 className="font-serif text-3xl font-semibold text-text">
            Mentions légales
          </h1>
          <p className="lead text-text-muted">
            Contenu placeholder à remplacer avant mise en ligne (statut
            auto-entrepreneur, SIRET, adresse, TVA, etc.).
          </p>
          <h2>Éditeur du site</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <h2>Hébergement</h2>
          <p>
            Hébergeur : Vercel Inc. (adresse et coordonnées à compléter). Ce
            site est déployé sur l’infrastructure Vercel conformément aux usages
            courants des sites Next.js.
          </p>
          <h2>Propriété intellectuelle</h2>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Tous les contenus
            (textes, visuels, logo) sont la propriété de Rose Mediara sauf
            mention contraire.
          </p>
          <h2>Contact</h2>
          <p>
            Pour toute question relative aux présentes mentions :{" "}
            <a href="mailto:contact@rosemediara.com">contact@rosemediara.com</a>
          </p>
        </article>
      </Container>
    </div>
  );
}
