import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales du site Rose Mediara.",
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

          <h2>Éditeur du site</h2>
          <p>
            Le présent site est édité par Affoua Kouakou, entrepreneur
            individuel (micro-entreprise), exerçant sous l&apos;enseigne Rose
            Mediara.
          </p>
          <ul>
            <li>SIREN : 499 828 739</li>
            <li>SIRET (siège) : 499 828 739 00049</li>
            <li>RCS : 499 828 739 R.C.S. Béziers</li>
            <li>Adresse : Villa 2, 7 Chemin de la Prunette, 34300 Agde, France</li>
            <li>Activité : vente à distance sur catalogue spécialisé</li>
            <li>TVA non applicable, art. 293 B du CGI</li>
          </ul>

          <h2>Directeur de la publication</h2>
          <p>Affoua Kouakou.</p>

          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par Netlify, Inc., 512 2nd Street, Floor 2,
            San Francisco, CA 94107, USA, via la plateforme{" "}
            <a href="https://www.netlify.com/" target="_blank" rel="noreferrer">
              netlify.com
            </a>
            .
          </p>
          <p>
            Le nom de domaine est géré par OVH SAS, 2 rue Kellermann, 59100
            Roubaix, France, via{" "}
            <a href="https://www.ovh.com/" target="_blank" rel="noreferrer">
              ovh.com
            </a>
            .
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            Tous les contenus présents sur ce site (textes, visuels, logo,
            éléments graphiques) sont protégés par le droit de la propriété
            intellectuelle. Sauf mention contraire, ils sont la propriété
            exclusive de Rose Mediara. Toute reproduction, diffusion ou
            utilisation sans autorisation préalable est interdite.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Les traitements de données personnelles sont réalisés conformément à
            la politique de confidentialité disponible sur le site.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative aux présentes mentions :{" "}
            <a href="mailto:rosemediara@gmail.com">rosemediara@gmail.com</a>
          </p>

          <p>Dernière mise à jour : 1 mai 2026.</p>
        </article>
      </Container>
    </div>
  );
}
