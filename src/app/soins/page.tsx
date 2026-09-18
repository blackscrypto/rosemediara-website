import type { Metadata } from "next";
import { Heart, Phone, Send, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StepCard } from "@/components/StepCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";
import { soins, type Soin } from "@/lib/soins";

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

const soinsAdultes = soins.filter((s) => !s.minor);
const soinsJeunes = soins.filter((s) => s.minor);

function SoinCard({ soin }: { soin: Soin }) {
  return (
    <div className="flex h-full flex-col rounded-[14px] border border-border bg-gradient-card p-6 shadow-soft sm:p-8">
      <h3 className="font-serif text-xl font-semibold text-text">{soin.name}</h3>
      {soin.tagline ? (
        <p className="mt-1 text-sm font-medium text-text-secondary">{soin.tagline}</p>
      ) : null}
      <p className="mt-4 font-serif text-4xl font-semibold text-accent-rose">
        {soin.price} €
      </p>
      {soin.description ? (
        <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm font-medium leading-relaxed text-text-secondary">
          {soin.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      {soin.minor ? (
        <p className="mt-4 text-xs font-medium text-text-muted">
          La demande est à effectuer par un parent ou le représentant légal.
        </p>
      ) : null}
      <div className="mt-auto pt-8">
        <Button
          href={`/soins/commander?soin=${soin.slug}`}
          variant="primary"
          className="w-full"
        >
          Réserver et payer ({soin.price} €)
        </Button>
      </div>
    </div>
  );
}

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
              <p className="mb-3">
                Les soins énergétiques sont réalisés dans la lumière et
                accompagnés de la prière. Ils s’inscrivent dans une démarche de
                bien-être, d’apaisement et d’accompagnement.
              </p>
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
              title="Les soins et leurs tarifs"
              align="center"
            />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {soinsAdultes.map((soin) => (
              <AnimateOnScroll key={soin.slug} className="h-full">
                <SoinCard soin={soin} />
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <h3 className="mb-6 mt-14 text-center font-serif text-2xl font-semibold text-text">
              Enfants et adolescents
            </h3>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {soinsJeunes.map((soin) => (
              <AnimateOnScroll key={soin.slug} className="h-full">
                <SoinCard soin={soin} />
              </AnimateOnScroll>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs font-medium text-text-muted">
            Chaque soin est réalisé à distance, avec un point téléphonique avant et après si
            nécessaire. Après paiement, vous décrivez votre besoin et joignez vos photos sur la
            page dédiée. J’étudierai votre demande avant de confirmer la faisabilité et le délai.
          </p>
        </section>
      </Container>
    </div>
  );
}
