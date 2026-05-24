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
          subtitle="Deux façons d’avancer : un échange en direct au téléphone, ou un soin énergétique à distance. Choisissez ce qui vous correspond aujourd’hui."
        />
      </AnimateOnScroll>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <AnimateOnScroll>
            <ServiceCard
              icon={Phone}
              title="Consultations téléphoniques"
              description="Échange en direct : guidance, messages des guides et conseils adaptés à votre situation, du format court (15 min) à une heure, selon ce dont vous avez besoin."
              highlights={[
                "Durées de 15 minutes à 1 heure",
                "Guidance ciblée ou temps plus long pour approfondir",
                "Réservation en ligne, je vous rappellerai à l’heure convenue",
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
              description="Vous déposez votre demande, un court échange téléphonique est prévu avant le soin pour me connecter à votre énergie, je réalise le soin à distance, puis un bref échange téléphonique peut avoir lieu après pour faire un point si nécessaire."
              highlights={[
                "Harmonisation, libération, travail sur les vies antérieures, etc.",
                "Court échange téléphonique d’environ 10 minutes avant le soin",
                "Bref point téléphonique après le soin si nécessaire",
              ]}
              meta="À distance · Avec un point téléphonique avant et après"
              ctaLabel="Faire une demande"
              href="/soins"
            />
          </AnimateOnScroll>
      </div>
    </PageSection>
  );
}
