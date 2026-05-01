import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Utilisation des cookies sur rosemediara.com.",
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
            Cette page explique l&apos;utilisation des cookies et technologies
            similaires sur le site rosemediara.com.
          </p>

          <h2>Cookies strictement nécessaires</h2>
          <p>
            Ces cookies sont indispensables au fonctionnement du site et ne
            nécessitent pas de consentement préalable. Ils permettent par
            exemple la sécurité du service, la stabilité technique et certaines
            fonctionnalités essentielles.
          </p>

          <h2>Cookies de mesure d’audience</h2>
          <p>
            À la date de la présente politique, aucun cookie publicitaire n&apos;est
            déployé et aucun cookie de mesure d&apos;audience tiers n&apos;est activé
            par défaut. En cas d&apos;activation future d&apos;un outil de mesure
            d&apos;audience, cette page sera mise à jour et le consentement sera
            recueilli lorsque la réglementation l&apos;impose.
          </p>

          <h2>Cookies tiers liés aux services utilisés</h2>
          <p>
            Certaines fonctionnalités (par exemple paiement sécurisé via Stripe)
            peuvent entraîner l&apos;utilisation de traceurs nécessaires au service
            lors de votre navigation ou de votre redirection sur leurs pages.
            Ces traitements relèvent également des politiques de confidentialité
            de ces services tiers.
          </p>

          <h2>Vos choix</h2>
          <p>
            Vous pouvez configurer votre navigateur pour refuser les cookies ;
            certaines fonctionnalités pourraient être limitées.
          </p>
          <p>
            Vous pouvez aussi supprimer les cookies déjà enregistrés via les
            paramètres de votre navigateur.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question sur cette politique :{" "}
            <a href="mailto:rosemediara@gmail.com">rosemediara@gmail.com</a>.
          </p>

          <p>Dernière mise à jour : 1 mai 2026.</p>
        </article>
      </Container>
    </div>
  );
}
