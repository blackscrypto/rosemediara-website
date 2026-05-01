import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Traitement des données personnelles et droits RGPD — Rose Mediara.",
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
            La presente politique explique comment Rose Mediara collecte,
            utilise et protege les donnees personnelles traitees via le site
            rosemediara.com.
          </p>
          <h2>1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement est Affoua Kouakou (Rose Mediara),
            entrepreneur individuel, joignable a{" "}
            <a href="mailto:rosemediara@gmail.com">rosemediara@gmail.com</a>.
          </p>
          <h2>2. Donnees collectees</h2>
          <p>
            Selon les formulaires utilises, les donnees suivantes peuvent etre
            collectees : prenom, nom, adresse email, telephone, date de
            naissance, contenu des messages, temoignages, ainsi que les photos
            transmises dans le cadre d&apos;une demande de soin.
          </p>
          <h2>3. Finalites du traitement</h2>
          <p>Les donnees sont utilisees pour :</p>
          <ul>
            <li>repondre aux demandes envoyees via le formulaire de contact ;</li>
            <li>gerer les commandes et demandes de soins a distance ;</li>
            <li>traiter les paiements en ligne securises ;</li>
            <li>envoyer les communications necessaires au suivi des demandes ;</li>
            <li>gerer la reception et la moderation des temoignages.</li>
          </ul>

          <h2>4. Bases legales</h2>
          <p>
            Les traitements reposent sur l&apos;execution de mesures
            precontractuelles ou du contrat, le consentement (notamment pour le
            depot de temoignage et l&apos;acceptation des conditions), ainsi que
            l&apos;interet legitime (securite et prevention des abus).
          </p>

          <h2>5. Destinataires des donnees</h2>
          <p>
            Les donnees sont accessibles uniquement aux personnes habilitees
            chez Rose Mediara et aux sous-traitants techniques necessaires au
            fonctionnement du service, notamment Netlify (hebergement), OVH
            (nom de domaine), Stripe (paiements), Supabase (stockage technique)
            et Resend (emails transactionnels).
          </p>

          <h2>6. Durees de conservation</h2>
          <p>
            Les donnees sont conservees pendant la duree necessaire au
            traitement de la demande, au suivi de la relation client et au
            respect des obligations legales.
          </p>

          <h2>7. Securite et confidentialite</h2>
          <p>
            Rose Mediara met en place des mesures techniques et
            organisationnelles raisonnables pour proteger les donnees contre la
            perte, l&apos;acces non autorise, l&apos;alteration ou la divulgation.
          </p>

          <h2>8. Vos droits</h2>
          <p>
            Conformement au RGPD, vous disposez des droits d&apos;acces, de
            rectification, d&apos;effacement, de limitation, d&apos;opposition et
            de portabilite de vos donnees lorsque ces droits sont applicables.
          </p>
          <p>
            Pour exercer vos droits :{" "}
            <a href="mailto:rosemediara@gmail.com">rosemediara@gmail.com</a>.
          </p>
          <p>
            En cas de difficulte non resolue, vous pouvez introduire une
            reclamation aupres de la CNIL (
            <a href="https://www.cnil.fr/" target="_blank" rel="noreferrer">
              cnil.fr
            </a>
            ).
          </p>

          <h2>9. Cookies</h2>
          <p>
            L&apos;utilisation des cookies est detaillee sur la page{" "}
            <a href="/politique-cookies">Politique de cookies</a>.
          </p>

          <h2>10. Mise a jour</h2>
          <p>
            La presente politique peut etre modifiee a tout moment pour
            refleter les evolutions legales, techniques ou organisationnelles.
          </p>
          <p>Derniere mise a jour : 1 mai 2026.</p>
        </article>
      </Container>
    </div>
  );
}
