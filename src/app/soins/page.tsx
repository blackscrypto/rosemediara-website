import type { Metadata } from "next";
import { Heart, Phone, Send, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StepCard } from "@/components/StepCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Soins énergétiques à distance",
  description:
    "Soins énergétiques à distance avec Rose Mediara : harmonisation, libération, accompagnements spécialisés. Avec un court échange téléphonique avant le soin et un bref point téléphonique après si nécessaire.",
  openGraph: {
    title: "Soins à distance | Rose Mediara",
    description:
      "Soins énergétiques à distance, avec un court échange téléphonique avant et après si nécessaire.",
  },
};

const soinTypes = [
  "Soin de couple : union et guérison",
  "Soin des vies antérieures : mémoires et réparations",
  "Soin de libération : cœur, corps et âme",
  "Nettoyage énergétique des lieux : habitat et harmonie",
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
                  Les soins sont réalisés à distance.
                </strong>{" "}
                Un court échange téléphonique d’environ 10 minutes est prévu
                avant le soin afin de me connecter à votre énergie. Après le
                soin, un bref échange téléphonique peut avoir lieu pour faire un
                point ensemble si cela est nécessaire.
              </p>
              <p className="mt-3">
                La présence durant le soin n’est pas nécessaire. Les
                informations transmises au préalable ainsi que la connexion
                énergétique établie permettent de réaliser le soin dans les
                meilleures conditions, tout en me laissant pleinement
                concentrée sur le travail énergétique effectué.
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
                title="Paiement et demande"
                description="Sécurisez votre séance via Stripe, puis envoyez vos informations et photos confidentielles sur la page dédiée."
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <StepCard
                step={2}
                icon={Phone}
                title="Échange téléphonique avant le soin"
                description="Un court appel d’environ 10 minutes me permet de me connecter à votre énergie et de préparer le soin avec précision."
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <StepCard
                step={3}
                icon={Sparkles}
                title="Le soin et un court point après"
                description="Je réalise le soin à distance ; un bref échange téléphonique peut être proposé après le soin pour faire un point si nécessaire."
              />
            </AnimateOnScroll>
          </div>
        </section>

        <section className="mb-16" aria-labelledby="soins-pricing">
          <AnimateOnScroll>
            <SectionTitle
              id="soins-pricing"
              title="Tarif"
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
                  Soin à distance, avec un point téléphonique avant et après si
                  nécessaire.
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
                  Réserver et payer (145 €)
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
