import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente des prestations Rose Mediara.",
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
            Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent
            à toute commande de prestation effectuée auprès de Rose Mediara.
          </p>

          <h2>Article 1 - Identité du vendeur</h2>
          <p>
            Les prestations sont proposées par Affoua Kouakou, entrepreneur
            individuel (micro-entreprise), exerçant sous l&apos;enseigne Rose
            Mediara.
          </p>
          <ul>
            <li>SIREN : 499 828 739</li>
            <li>SIRET : 499 828 739 00049</li>
            <li>Adresse : Villa 2, 7 Chemin de la Prunette, 34300 Agde, France</li>
            <li>Contact : rosemediara@gmail.com</li>
            <li>TVA non applicable, art. 293 B du CGI</li>
          </ul>

          <h2>Article 2 - Objet</h2>
          <p>
            Les présentes CGV définissent les droits et obligations des parties
            dans le cadre de la vente à distance des prestations proposées sur
            le site rosemediara.com.
          </p>

          <h2>Article 3 - Prestations</h2>
          <p>
            La nature, le contenu et le tarif des prestations sont présentés sur
            le site au moment de la commande. Le client reconnaît avoir pris
            connaissance de ces informations avant toute validation.
          </p>

          <h2>Article 4 - Tarifs et paiement</h2>
          <p>
            Les prix sont indiqués en euros. Le règlement est exigible à la
            commande via les moyens de paiement proposés sur le site (notamment
            Stripe). La commande est considérée comme confirmée après paiement
            effectif.
          </p>

          <h2>Article 5 - Exécution de la prestation</h2>
          <p>
            La prestation est réalisée selon les modalités indiquées lors de la
            commande (à distance, envoi d&apos;informations, etc.). Le client
            s&apos;engage à fournir des informations exactes et complètes.
          </p>

          <h2>Article 6 - Annulation, report et remboursement</h2>
          <p>
            Toute demande d&apos;annulation ou de report doit être formulée par
            email à l&apos;adresse de contact. Sauf accord exprès de Rose
            Mediara, toute prestation commencée ou réalisée est due et ne donne
            pas lieu à remboursement.
          </p>

          <h2>Article 7 - Droit de rétractation</h2>
          <p>
            Conformément au Code de la consommation, le client consommateur
            dispose en principe d&apos;un délai de quatorze (14) jours pour
            exercer son droit de rétractation, sauf exceptions légales.
          </p>
          <p>
            En validant sa commande, le client peut demander l&apos;exécution
            immédiate de la prestation avant la fin de ce délai et reconnaître
            qu&apos;il renonce alors à son droit de rétractation une fois la
            prestation pleinement exécutée.
          </p>

          <h2>Article 8 - Responsabilité</h2>
          <p>
            Les prestations proposées ne constituent ni un acte médical ni un
            suivi thérapeutique médical et ne remplacent en aucun cas un avis,
            un diagnostic ou un traitement médical.
          </p>
          <p>
            Rose Mediara est tenue à une obligation de moyens dans
            l&apos;accomplissement des prestations.
          </p>

          <h2>Article 9 - Médiation de la consommation</h2>
          <p>
            En cas de litige non résolu directement, le client consommateur peut
            recourir gratuitement à un médiateur de la consommation.
            L&apos;organisme de médiation est en cours de désignation.
          </p>

          <h2>Article 10 - Droit applicable et litiges</h2>
          <p>
            Les présentes CGV sont soumises au droit français. À défaut de
            résolution amiable, les tribunaux français seront seuls compétents,
            sous réserve des dispositions légales impératives applicables.
          </p>

          <p>Dernière mise à jour : 1 mai 2026.</p>
        </article>
      </Container>
    </div>
  );
}
