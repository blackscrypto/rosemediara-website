import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-b from-transparent via-cream/40 to-cream/95 sm:h-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden
      >
        <svg className="h-full w-full text-sage-muted/50" preserveAspectRatio="none">
          <defs>
            <pattern
              id="leaf"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 80 Q40 20 90 50 Q50 70 10 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaf)" />
        </svg>
      </div>
      <Container className="relative z-10 py-16 sm:py-24 lg:py-28">
        <AnimateOnScroll>
          <div className="relative max-w-3xl">
            <div className="relative rounded-[1.5rem] border border-white/35 bg-[linear-gradient(155deg,rgba(250,247,243,0.5)_0%,rgba(250,247,243,0.32)_52%,rgba(250,247,243,0.2)_100%)] px-4 py-5 shadow-[0_14px_50px_-22px_rgba(70,45,62,0.4)] backdrop-blur-[2.5px] sm:rounded-[1.75rem] sm:px-6 sm:py-6">
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[linear-gradient(160deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_58%,rgba(255,255,255,0.04)_100%)]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-[1px] -z-10 rounded-[inherit] border border-accent-rose/10"
                aria-hidden
              />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-sage-ink">
                  Médium · Voyante · Thérapeute énergétique
                </p>
                <h1 className="mt-3 font-serif text-2xl font-semibold text-accent-rose sm:text-3xl">
                  Rose Mediara
                </h1>
                <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-text sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
                  Connectez-vous à votre lumière intérieure
                </h2>
                <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-text sm:text-xl">
                  Consultations par téléphone et soins énergétiques à distance,
                  dans le respect de votre rythme — pour retrouver équilibre,
                  clarté et sérénité sur votre chemin.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Button href="/consultations" variant="primary">
                    Réserver une consultation
                  </Button>
                  <Button href="/a-propos" variant="secondary">
                    Découvrir Rose
                  </Button>
                </div>
                <p className="mt-8 text-sm font-semibold text-text">
                  <Link
                    href="/deontologie"
                    className="text-accent-rose underline-offset-4 hover:underline"
                  >
                    Lire le code de déontologie
                  </Link>
                  {" · "}
                  <Link
                    href="/contact"
                    className="underline-offset-4 hover:underline"
                  >
                    Me contacter
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
