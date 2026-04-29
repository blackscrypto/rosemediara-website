import type { Metadata } from "next";
import { Phone, CalendarClock, Sparkles, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StepCard } from "@/components/StepCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";
import { ConsultationsCalSection } from "@/components/consultations/ConsultationsCalSection";
import { ConsultationsMobileBookingCta } from "@/components/consultations/ConsultationsMobileBookingCta";
import {
  ConsultationsPricing,
  type ConsultationsPricingVariant,
} from "@/components/consultations/ConsultationsPricing";

export const metadata: Metadata = {
  title: "Consultations téléphoniques",
  description:
    "Consultations par téléphone avec Rose Mediara : formats 15 min à 1 h, guidance et messages des guides. Réservation en ligne.",
  openGraph: {
    title: "Consultations téléphoniques — Rose Mediara",
    description:
      "Réservez votre créneau pour un échange en direct par téléphone.",
  },
};

/** Grille de cartes (actuel) · "table" = comparatif type grille tarifaire · "timeline" = progression durées / prix */
const PRICING_DESIGN: ConsultationsPricingVariant = "timeline";

export default function ConsultationsPage() {
  return (
    <div className="pb-24 md:pb-16">
      <div className="py-12 sm:py-16">
        <Container>
          <header className="mb-8 text-center sm:mb-9">
            <AnimateOnScroll>
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[14px] bg-accent-rose/15 text-accent-rose">
                <Phone className="h-7 w-7" strokeWidth={1.5} aria-hidden />
              </div>
              <h1 className="font-serif text-3xl font-semibold text-text sm:text-4xl">
                Consultations téléphoniques
              </h1>
              <p className="mx-auto mt-4 max-w-2xl font-medium text-text-secondary">
                Toutes les consultations se déroulent par téléphone. Après votre
                réservation en ligne, vous recevez les coordonnées pour notre
                rendez-vous — je vous appelle à l’heure convenue au numéro
                indiqué.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button href="#reservation-cal" variant="primary">
                  Voir les créneaux
                </Button>
                <Button href="/contact" variant="ghost">
                  Une question avant ?
                </Button>
              </div>
            </AnimateOnScroll>
          </header>

          <section className="mb-10 sm:mb-12" aria-labelledby="how-it-works">
            <AnimateOnScroll>
              <SectionTitle
                id="how-it-works"
                title="Comment se déroule une consultation"
                align="center"
                className="!mb-5 sm:!mb-6"
              />
            </AnimateOnScroll>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              <AnimateOnScroll>
                <StepCard
                  compact
                  step={1}
                  icon={CalendarClock}
                  title="Réservez votre créneau"
                  description="Choisissez la date, l’heure et le type de séance dans le calendrier en bas de cette page. Le paiement s’effectue en ligne de façon sécurisée."
                />
              </AnimateOnScroll>
              <AnimateOnScroll>
                <StepCard
                  compact
                  step={2}
                  icon={Phone}
                  title="Préparez-vous"
                  description="Préparez vos questions et un moment calme. Le prénom et la date de naissance pourront vous être demandés pour cadrer l’échange."
                />
              </AnimateOnScroll>
              <AnimateOnScroll>
                <StepCard
                  compact
                  step={3}
                  icon={Sparkles}
                  title="Recevez votre guidance"
                  description="Je vous appelle à l’heure prévue pour un échange en direct : écoute, messages et conseils adaptés à votre situation."
                />
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll>
              <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-3 rounded-[14px] border border-border bg-gradient-card px-5 py-3.5 text-center text-sm font-medium text-text-secondary sm:flex-row sm:text-left">
                <ShieldCheck
                  className="h-8 w-8 shrink-0 text-sage"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p>
                  Les paiements en ligne sont traités de manière sécurisée
                  (connexion chiffrée). Vos données bancaires ne sont pas
                  conservées sur ce site.
                </p>
              </div>
            </AnimateOnScroll>
          </section>

          <section className="mb-10 sm:mb-12" aria-labelledby="pricing-consult">
            <AnimateOnScroll>
              <SectionTitle
                id="pricing-consult"
                title="Tarifs"
                subtitle="Les montants ci-dessous reprennent la grille affichée sur rosemediara.com — vérifiez-les lors de la réservation au cas où ils évolueraient."
                align="center"
                className="!mb-5 sm:!mb-6"
              />
            </AnimateOnScroll>
            <ConsultationsPricing variant={PRICING_DESIGN} />
            <AnimateOnScroll>
              <div className="mt-6 flex justify-center md:hidden">
                <Button href="#reservation-cal" variant="secondary">
                  Accéder au calendrier
                </Button>
              </div>
            </AnimateOnScroll>
          </section>

          <section
            id="reservation-cal"
            className="mb-8 scroll-mt-24"
            aria-labelledby="booking-title"
            tabIndex={-1}
          >
            <AnimateOnScroll>
              <SectionTitle
                id="booking-title"
                title="Réserver votre consultation"
                subtitle="Un calendrier ci-dessous : choisissez la durée si besoin, puis votre créneau. Vous pouvez aussi ouvrir Cal.com dans un nouvel onglet."
                align="center"
                className="!mb-5 sm:!mb-6"
              />
            </AnimateOnScroll>
            <ConsultationsCalSection />
          </section>
        </Container>
      </div>
      <ConsultationsMobileBookingCta />
    </div>
  );
}
