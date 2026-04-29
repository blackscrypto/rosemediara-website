import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { RosePortrait } from "@/components/ui/RosePortrait";

export const metadata: Metadata = {
  title: "À propos — Mon parcours",
  description:
    "Rose Kaba, médium et thérapeute énergétique : plus de 15 ans d’accompagnement spirituel et de soins énergétiques.",
  openGraph: {
    title: "Mon parcours — Rose Mediara",
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
            subtitle="Je suis Rose Kaba. Médium et thérapeute énergétique, j’exerce avec cœur depuis de nombreuses années."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll>
            <div className="prose prose-neutral max-w-none space-y-4 font-medium text-text-secondary">
              <p>
                Mon don s’est manifesté très tôt : enfant, je percevais déjà des
                nuances d’énergie et des présences bienveillantes autour de moi.
                Avec le temps, cette sensibilité s’est structurée en une véritable
                pratique d’écoute et de transmission, toujours guidée par le
                respect de la personne qui se confie à moi.
              </p>
              <p>
                Depuis plus de{" "}
                <strong className="font-medium text-text">quinze ans</strong>, j’ai
                accompagné des milliers de personnes — en consultation
                téléphonique ou par des soins à distance — qui souhaitaient des
                éclairages sur leur chemin, un apaisement émotionnel ou une
                réharmonisation énergétique. Chaque échange est unique : je ne
                promets pas de miracle, je propose une présence claire, honnête
                et bienveillante.
              </p>
              <p>
                Aujourd’hui, ma mission reste la même : vous aider à vous
                reconnecter à votre lumière intérieure, à comprendre ce que la
                vie vous propose, et à avancer avec plus de paix — en
                rappelant toujours que vous restez seul·e maître·sse de vos
                décisions.
              </p>
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
              subtitle="Transparence, éthique et limites claires — sans artifice."
            />
            <div className="prose prose-neutral max-w-none space-y-4 font-medium text-text-secondary">
              <p>
                Je privilégie la franchise : je transmets ce que je perçois, dans
                la mesure où cela peut vous servir, sans dramatiser ni vous
                enfermer dans une histoire. Je ne pratique aucune promesse de
                résultat ni aucune ingérence sur le libre arbitre d’autrui ; mon
                cadre déontologique est public et consultable sur ce site.
              </p>
              <p>
                Les consultations et les soins ne remplacent en aucun cas un
                avis médical, psychologique ou psychiatrique. En cas de souffrance
                physique ou psychique importante, il est essentiel de vous
                tourner vers les professionnels de santé habilités.
              </p>
              <p>
                En séance comme à distance, vous êtes accueilli·e dans un
                espace de respect : rythme posé, confidentialité, et possibilité
                pour vous de poser vos limites à tout moment. C’est ainsi que
                nous construisons ensemble un échange de qualité.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </div>
  );
}
