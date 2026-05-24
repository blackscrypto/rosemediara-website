import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { RosePortrait } from "@/components/ui/RosePortrait";

export const metadata: Metadata = {
  title: "À propos | Mon parcours",
  description:
    "Affoua Rose Kaba, thérapeute énergétique et médium pur : plus de 15 ans d’accompagnement énergétique et médiumnique.",
  openGraph: {
    title: "Mon parcours | Rose Mediara",
    description:
      "Une présence apaisée pour votre guidance et vos soins énergétiques.",
  },
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <AnimateOnScroll>
          <SectionTitle
            title="Mon parcours"
            subtitle="Je suis Affoua Rose Kaba, médium et praticienne en soins énergétiques."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll>
            <div className="prose prose-neutral max-w-none space-y-4 font-medium text-text-secondary">
              <p>
                Depuis l’enfance, je ressens les énergies, les émotions et
                certaines perceptions intuitives qui m’ont progressivement
                conduite vers cette voie d’accompagnement. Ce chemin s’est
                construit avec le temps, à travers l’expérience, l’écoute et une
                profonde volonté d’aider les autres avec sincérité.
              </p>
              <p>
                Depuis plus de{" "}
                <strong className="font-medium text-text">quinze ans</strong>, j’accompagne
                des femmes et des hommes à travers des consultations spirituelles
                et des soins énergétiques réalisés à distance. Beaucoup viennent
                chercher des réponses, un soutien dans une période difficile ou
                simplement un moment d’apaisement et de recentrage.
              </p>
              <p>
                Je travaille avec douceur, honnêteté et respect du libre arbitre.
                Mon rôle n’est pas de décider à votre place, mais de vous apporter
                un éclairage et un accompagnement afin que vous puissiez avancer
                avec davantage de sérénité et de conscience.
              </p>
              <p>
                Chaque séance est réalisée dans un cadre confidentiel,
                bienveillant et sans jugement. Je tiens également à exercer cette
                activité avec des limites claires et une déontologie accessible à
                tous.
              </p>
              <p>
                Aujourd’hui encore, je considère cette pratique comme une mission
                de cœur : aider chacun à se reconnecter à sa lumière intérieure
                et à avancer plus paisiblement sur son chemin.
              </p>
              <blockquote className="border-l-4 border-accent-rose/40 pl-4 font-serif text-lg leading-relaxed text-text sm:text-xl">
                « La lumière que vous cherchez existe déjà en vous. Mon rôle est
                simplement de vous aider à la retrouver. »
              </blockquote>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <RosePortrait />
          </AnimateOnScroll>
        </div>

        <div className="mt-20 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll className="order-2 lg:order-1">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[14px] border border-border bg-cream-deep shadow-[0_4px_24px_rgba(45,45,45,0.06)]">
              <Image
                src="/images/about-approach.png"
                alt="Tirage de cartes et présence bienveillante lors d’une consultation."
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cream via-cream/88 to-transparent px-5 pb-5 pt-14 text-center sm:px-6">
                <p className="mx-auto max-w-sm font-serif text-base font-medium leading-relaxed text-text sm:text-lg">
                  « L’essentiel, pour moi, est que vous repartiez apaisé·e, plus
                  clair·e, et surtout plus confiant·e en vous. »
                </p>
              </figcaption>
            </figure>
          </AnimateOnScroll>
          <AnimateOnScroll className="order-1 lg:order-2">
            <SectionTitle
              title="Mon approche"
              subtitle="Une présence sincère, dans le respect de votre chemin."
            />
            <div className="prose prose-neutral max-w-none space-y-4 font-medium text-text-secondary">
              <p>
                Je travaille avec authenticité et simplicité. Je transmets ce
                que je ressens avec bienveillance, sans chercher à impressionner,
                à faire peur ou à créer de dépendance. Mon rôle est d’apporter un
                éclairage, tout en vous laissant libre de vos choix et de votre
                propre cheminement.
              </p>
              <p>
                Parce que la confiance est essentielle, mon cadre déontologique
                est clairement défini et accessible sur ce site.
              </p>
              <p>
                Les consultations et soins énergétiques proposés s’inscrivent
                dans une démarche spirituelle et de mieux-être. Ils ne remplacent
                jamais l’accompagnement d’un médecin, psychologue ou psychiatre
                lorsque cela est nécessaire.
              </p>
              <p>
                Chaque séance se déroule dans un climat de respect, de
                confidentialité et d’écoute. Vous avancez à votre rythme, dans
                un espace où vos émotions, vos ressentis et vos limites sont
                accueillis avec douceur et considération.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </div>
  );
}
