import { Leaf, Heart, Sparkles } from "lucide-react";
import { PageSection } from "@/components/ui/PageSection";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const pillars = [
  {
    icon: Leaf,
    title: "Don de naissance",
    text: "Une sensibilité aux énergies et aux guides, présente depuis l’enfance — le fil conducteur de mon accompagnement.",
  },
  {
    icon: Heart,
    title: "Approche bienveillante",
    text: "Un cadre doux : votre rythme, vos questions, votre libre arbitre. Aucune pression, aucune promesse irréaliste.",
  },
  {
    icon: Sparkles,
    title: "Énergie & clarté",
    text: "Consultations et soins pour retrouver de la lisibilité dans ce que vous traversez — et des pistes concrètes pour avancer.",
  },
];

export function PillarsSection() {
  return (
    <PageSection
      aria-labelledby="pillars-heading"
      className="bg-[linear-gradient(140deg,#f3e8df_0%,#efe3d9_45%,#e9ddd3_100%)]"
    >
      <h2 id="pillars-heading" className="sr-only">
        Ce qui me guide
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <AnimateOnScroll key={p.title}>
              <article className="relative h-full overflow-hidden rounded-[12px] border border-border/70 bg-[linear-gradient(150deg,rgba(255,255,255,0.78)_0%,rgba(252,246,240,0.66)_60%,rgba(246,236,228,0.62)_100%)] px-3 py-3 shadow-[0_8px_22px_rgba(22,22,22,0.08)] sm:px-3.5 sm:py-3.5">
                <div
                  className="pointer-events-none absolute right-2 top-2 h-8 w-8 rounded-full bg-accent-rose/8 blur-md"
                  aria-hidden
                />
                <div className="flex items-center gap-2.5">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-border/45 bg-gradient-to-br from-sage-muted/35 to-sage/25 text-sage shadow-[0_2px_10px_rgba(40,40,40,0.08)]">
                    <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                  </div>
                  <h3 className="font-serif text-base font-semibold leading-tight text-text">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm font-medium leading-snug text-text-secondary">
                  {p.text}
                </p>
              </article>
            </AnimateOnScroll>
          );
        })}
      </div>
    </PageSection>
  );
}
