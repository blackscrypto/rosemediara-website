import type { Metadata } from "next";
import { Heart, Mail, Send, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StepCard } from "@/components/StepCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Soins énergétiques à distance",
  description:
    "Soins énergétiques à distance avec Rose Mediara : harmonisation, libération, accompagnements spécialisés. Demande par formulaire et retour par email.",
  openGraph: {
    title: "Soins à distance — Rose Mediara",
    description:
      "Sans appel téléphonique : envoyez votre demande, recevez un retour par email.",
  },
};

const soinTypes = [
  "Soin de couple — union & guérison",
  "Soin des vies antérieures — mémoires & réparations",
  "Soin de libération — cœur, corps & âme",
  "Nettoyage énergétique des lieux — habitat & harmonie",
];

export default function SoinsPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <header className="mb-12 text-center">
          <AnimateOnScroll>
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[14px] bg-sage/25 text-sage">
              <Heart className="h-7 w-7" strokeWidth={1.5} aria-hidden />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-text sm:text-4xl">
              Soins énergétiques à distance
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <div className="mx-auto mt-6 max-w-2xl rounded-[14px] border border-accent-rose/35 bg-gradient-to-br from-accent-rose/12 via-cream/85 to-sage-muted/15 px-5 py-4 text-left text-sm font-medium leading-relaxed text-text-secondary sm:text-center">
              <p>
                <strong className="font-semibold text-text">
                  Les soins sont réalisés à distance, sans contact téléphonique.
                </strong>{" "}
                Après paiement, vous complétez votre demande sur une page dédiée ;
                je réalise le soin et vous envoie un retour détaillé par email —
                pour que vous puissiez relire et intégrer les messages à votre
                rythme.
              </p>
            </div>
          </AnimateOnScroll>
        </header>

        <section className="mb-16" aria-labelledby="soins-how">
          <AnimateOnScroll>
            <SectionTitle
              id="soins-how"
              title="Comment ça fonctionne"
              align="center"
            />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <AnimateOnScroll>
              <StepCard
                step={1}
                icon={Send}
                title="Validez le paiement"
                description="Commencez par sécuriser votre séance via Stripe (145 €). Une fois le paiement confirmé, vous finalisez votre demande."
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <StepCard
                step={2}
                icon={Sparkles}
                title="Envoyez votre demande"
                description="Sur la page suivante, envoyez vos informations et photos confidentielles pour que je prépare le soin avec précision."
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <StepCard
                step={3}
                icon={Mail}
                title="Je réalise le soin et vous écris"
                description="Vous recevez un compte-rendu détaillé par email : ressentis, messages et pistes pour la suite."
              />
            </AnimateOnScroll>
          </div>
        </section>

        <section className="mb-16" aria-labelledby="soins-pricing">
          <AnimateOnScroll>
            <SectionTitle
              id="soins-pricing"
              title="Tarif indicatif"
              subtitle="Montant reprenant la grille publique du site rosemediara.com — confirmez le tarif exact lors de votre demande ou par email."
              align="center"
            />
          </AnimateOnScroll>
          <div className="mx-auto max-w-xl">
            <AnimateOnScroll>
              <div className="rounded-[14px] border border-border bg-gradient-card p-8 text-center shadow-soft">
                <h3 className="font-serif text-xl font-semibold text-text">
                  Soin énergétique à distance
                </h3>
                <p className="mt-4 font-serif text-4xl font-semibold text-accent-rose">
                  145 €
                </p>
                <p className="mt-2 text-sm font-medium text-text-secondary">
                  Soin réalisé à distance, sans appel téléphonique
                </p>
                <ul className="mt-8 space-y-2 border-t border-border pt-6 text-left text-sm font-medium text-text-secondary">
                  {soinTypes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-gold" aria-hidden>
                        ·
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/soins/commander" variant="primary" className="mt-8 w-full">
                  Réserver et payer — 145 €
                </Button>
                <p className="mt-6 text-xs font-medium text-text-muted">
                  Après paiement, vous décrivez votre besoin et joignez vos photos sur la page dédiée.
                  J’étudierai votre demande avant de confirmer la faisabilité et le délai.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </Container>
    </div>
  );
}
