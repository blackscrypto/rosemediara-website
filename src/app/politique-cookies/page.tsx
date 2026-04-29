import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Utilisation des cookies sur rosemediara.com (placeholder).",
};

export default function PolitiqueCookiesPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <article className="prose prose-neutral max-w-3xl text-text-muted">
          <h1 className="font-serif text-3xl font-semibold text-text">
            Politique de cookies
          </h1>
          <p>
            Contenu placeholder : liste des cookies utilisés (techniques,
            mesure d’audience, tiers), durée de conservation, modalités de
            consentement et lien vers les outils de refus.
          </p>
          <h2>Cookies strictement nécessaires</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ces cookies
            permettent le fonctionnement du site (sécurité, préférences de
            session le cas échéant).
          </p>
          <h2>Cookies de mesure d’audience</h2>
          <p>
            À compléter si vous activez un outil d’analyse (ex. solution
            respectueuse de la vie privée), avec mention du fournisseur et de la
            durée de conservation.
          </p>
          <h2>Vos choix</h2>
          <p>
            Vous pouvez configurer votre navigateur pour refuser les cookies ;
            certaines fonctionnalités pourraient être limitées.
          </p>
        </article>
      </Container>
    </div>
  );
}
