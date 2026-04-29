import { Heart, Phone } from "lucide-react";
import { PageSection } from "@/components/ui/PageSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function ServicesSection() {
  return (
    <PageSection aria-labelledby="services-heading">
      <AnimateOnScroll>
        <SectionTitle
          id="services-heading"
          title="Mes services"
          subtitle="Deux façons d’avancer : un échange en direct au téléphone, ou un soin à distance avec un retour par écrit. Choisissez ce qui vous correspond aujourd’hui."
        />
      </AnimateOnScroll>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <AnimateOnScroll>
            <ServiceCard
              icon={Phone}
              title="Consultations téléphoniques"
              description="Échange en direct : guidance, messages des guides et conseils adaptés à votre situation — du format court (15 min) à une heure, selon ce dont vous avez besoin."
              highlights={[
                "Durées de 15 minutes à 1 heure",
                "Guidance ciblée ou temps plus long pour approfondir",
                "Réservation en ligne, rappel à l’heure convenue",
              ]}
              meta="Par téléphone · Sur rendez-vous"
              ctaLabel="Voir les tarifs & réserver"
              href="/consultations"
            />
          </AnimateOnScroll>
          <AnimateOnScroll>
            <ServiceCard
              icon={Heart}
              title="Soins énergétiques à distance"
              description="Sans appel téléphonique : vous déposez votre demande (et les éléments utiles), je réalise le soin à distance puis vous adresse un compte-rendu détaillé par email."
              highlights={[
                "Harmonisation, libération, travail sur les vies antérieures, etc.",
                "Adapté si vous préférez le silence, le recul, ou un écrit à relire",
                "Compte-rendu pour garder une trace des messages et des ressentis",
              ]}
              meta="À distance · Sans appel téléphonique"
              ctaLabel="Faire une demande"
              href="/soins"
            />
          </AnimateOnScroll>
      </div>
    </PageSection>
  );
}
