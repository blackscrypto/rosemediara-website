import type { Metadata } from "next";
import { Gift, MessageCircle, PenLine, Video } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StepCard } from "@/components/StepCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { VideoTestimonialForm } from "@/components/temoignage/VideoTestimonialForm";
import { giftValidity } from "@/lib/temoignage-video";

export const metadata: Metadata = {
  title: "Témoigner en vidéo",
  description:
    "Partagez votre expérience avec Rose Mediara en vidéo, visage visible ou flouté, et recevez 30 minutes de consultation offertes.",
  // Page envoyée aux clientes par Rose : pas besoin d'apparaître dans Google.
  robots: { index: false, follow: true },
};

const questions = [
  "Ce qui vous a amenée à consulter Rose",
  "Comment s’est passé l’échange, ce que vous avez ressenti",
  "Ce que vous en retenez aujourd’hui",
];

const tips = [
  "30 secondes à 1 minute suffisent",
  "Téléphone à la verticale, près d’une fenêtre",
  "Un endroit calme, sans musique derrière",
  "Parlez librement, avec vos mots, même si votre avis est nuancé",
];

export default function TemoignagePage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <AnimateOnScroll>
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[14px] bg-accent-rose/15 text-accent-rose">
              <Video className="h-7 w-7" strokeWidth={1.5} aria-hidden />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-text sm:text-4xl">Témoigner en vidéo</h1>
            <p className="mt-4 font-medium leading-relaxed text-text-secondary">
              Votre expérience peut aider d’autres personnes à oser franchir le pas. Si vous acceptez de
              la raconter en une courte vidéo, visage visible ou flouté, je vous offre{" "}
              <strong className="font-semibold text-text">30 minutes de consultation</strong> en
              remerciement, quel que soit votre avis.
            </p>
            <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-accent-rose/25 bg-white/70 px-4 py-1.5 text-sm font-semibold text-text shadow-soft">
              <Gift className="h-4 w-4 text-accent-rose" strokeWidth={2} aria-hidden />
              30 min offertes · valables {giftValidity} · une fois par personne
            </p>
          </AnimateOnScroll>
        </header>

        <section className="mb-14" aria-labelledby="tv-how">
          <AnimateOnScroll>
            <SectionTitle id="tv-how" title="Comment ça se passe" align="center" className="!mb-6" />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            <AnimateOnScroll>
              <StepCard
                compact
                step={1}
                icon={PenLine}
                title="Vous donnez votre accord"
                description="Le formulaire ci-dessous : comment apparaître, sous quel nom, où la vidéo peut être utilisée. Vous recevez une copie par email."
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <StepCard
                compact
                step={2}
                icon={MessageCircle}
                title="Vous m’envoyez la vidéo"
                description="Sur WhatsApp, en réponse à mon message. Si vous avez choisi le flou ou la voix modifiée, je m’en occupe au montage."
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <StepCard
                compact
                step={3}
                icon={Gift}
                title="Je vous offre 30 minutes"
                description="Dès réception, je vous envoie le lien pour réserver votre consultation de 30 minutes offerte."
              />
            </AnimateOnScroll>
          </div>
        </section>

        <section className="mb-14" aria-labelledby="tv-tips">
          <AnimateOnScroll>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-[18px] border border-border bg-gradient-card p-6 shadow-soft">
                <h2 id="tv-tips" className="font-serif text-xl font-semibold text-text">
                  De quoi parler
                </h2>
                <ul className="mt-3 space-y-2 text-sm font-medium leading-relaxed text-text-secondary">
                  {questions.map((q) => (
                    <li key={q} className="flex gap-2">
                      <span className="text-gold" aria-hidden>
                        ✦
                      </span>
                      {q}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-medium leading-relaxed text-text-muted">
                  Merci de ne pas présenter la consultation comme un soin médical ni de promettre un
                  résultat : chaque chemin est personnel.
                </p>
              </div>
              <div className="rounded-[18px] border border-border bg-gradient-card p-6 shadow-soft">
                <h2 className="font-serif text-xl font-semibold text-text">Pour bien filmer</h2>
                <ul className="mt-3 space-y-2 text-sm font-medium leading-relaxed text-text-secondary">
                  {tips.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-gold" aria-hidden>
                        ✦
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        <section className="mx-auto max-w-3xl" aria-labelledby="tv-form">
          <AnimateOnScroll>
            <SectionTitle
              id="tv-form"
              title="Votre accord"
              subtitle="Deux minutes, une seule fois. Vous pourrez demander le retrait de la vidéo quand vous voulez."
              align="center"
              className="!mb-6"
            />
          </AnimateOnScroll>
          <VideoTestimonialForm />
        </section>
      </Container>
    </div>
  );
}
