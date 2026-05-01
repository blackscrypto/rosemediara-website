import { PageSection } from "@/components/ui/PageSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { RosePortrait } from "@/components/ui/RosePortrait";

export function AboutPreview() {
  return (
    <PageSection aria-labelledby="about-preview-heading">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <AnimateOnScroll>
            <SectionTitle
              id="about-preview-heading"
              title="Qui suis-je ?"
              subtitle="Affoua Rose Kaba — médium, voyante et thérapeute énergétique."
            />
            <p className="text-base font-medium leading-relaxed text-text-secondary">
              Depuis l’enfance, je perçois les énergies subtiles et le lien avec les
              guides. Depuis plus de{" "}
              <strong className="font-medium text-text">15 ans</strong>, j’accompagne
              celles et ceux qui cherchent du sens, des réponses ou un apaisement —
              avec une approche simple, humaine et authentique.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-text-secondary">
              Mon objectif : vous aider à retrouver de l’équilibre, à comprendre ce qui
              vous traverse et à avancer plus sereinement — sans créer de
              dépendance, en respectant totalement votre libre arbitre.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8 text-center sm:text-left">
              <div>
                <dt className="font-serif text-2xl font-semibold text-accent-rose">
                  15+
                </dt>
                <dd className="text-xs font-semibold text-sage-ink">
                  années d’expérience
                </dd>
              </div>
              <div>
                <dt className="font-serif text-2xl font-semibold text-accent-rose">
                  15 000+
                </dt>
                <dd className="text-xs font-semibold text-sage-ink">
                  consultations
                </dd>
              </div>
              <div>
                <dt className="font-serif text-2xl font-semibold text-accent-rose">
                  100%
                </dt>
                <dd className="text-xs font-semibold text-sage-ink">
                  bienveillance
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <Button href="/a-propos" variant="secondary">
                En savoir plus
              </Button>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <RosePortrait priority />
          </AnimateOnScroll>
      </div>
    </PageSection>
  );
}
