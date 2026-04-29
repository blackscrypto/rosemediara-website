import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Code de déontologie",
  description:
    "Les engagements éthiques de Rose Mediara : respect du libre arbitre, confidentialité, limites de la pratique.",
  openGraph: {
    title: "Code de déontologie — Rose Mediara",
    description: "Principes déontologiques de l’exercice de médium et thérapeute énergétique.",
  },
};

const sections = [
  {
    title: "1. Respect du libre arbitre",
    body:
      "Le consultant reste seul maître de ses décisions. Les informations transmises lors d'une consultation sont des éclairages et des guidances, jamais des injonctions. Rose Mediara ne se substituera jamais à la volonté du consultant.",
  },
  {
    title: "2. Confidentialité",
    body:
      "Toutes les informations partagées lors d'une consultation ou d'une demande de soin sont strictement confidentielles. Aucune information personnelle ne sera divulguée à un tiers.",
  },
  {
    title: "3. Non-dépendance",
    body:
      "Rose Mediara s'engage à ne jamais créer de relation de dépendance avec ses consultants. Les consultations doivent rester un outil ponctuel d'aide et de guidance, non une béquille permanente.",
  },
  {
    title: "4. Honnêteté et bienveillance",
    body:
      "Les messages transmis le sont avec honnêteté et bienveillance. Rose Mediara ne fait aucune promesse de résultat et ne garantit pas la réalisation d'événements futurs.",
  },
  {
    title: "5. Limites de la pratique",
    body:
      "Rose Mediara ne pose aucun diagnostic médical et ne prescrit aucun traitement. Les consultations et soins ne se substituent en aucun cas à un suivi médical, psychologique ou à tout autre accompagnement par un professionnel de santé. En cas de problème de santé, le consultant est invité à consulter son médecin.",
  },
  {
    title: "6. Interdiction de pratiques abusives",
    body:
      "Rose Mediara ne pratique aucun travail de magie, désenvoûtement, retour d'affection ou toute autre pratique visant à influencer le libre arbitre d'un tiers. Aucune somme supplémentaire ne sera demandée en dehors des tarifs affichés.",
  },
  {
    title: "7. Mineurs",
    body:
      "Les consultations pour les personnes mineures ne sont réalisées qu'avec l'accord explicite d'un parent ou représentant légal.",
  },
  {
    title: "8. Droit de refus",
    body:
      "Rose Mediara se réserve le droit de refuser ou d'interrompre une consultation si elle estime que celle-ci n'est pas dans l'intérêt du consultant ou si les conditions ne permettent pas un échange de qualité.",
  },
];

export default function DeontologiePage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <AnimateOnScroll>
          <header className="mb-12 max-w-3xl">
            <h1 className="font-serif text-3xl font-semibold text-text sm:text-4xl">
              Code de déontologie
            </h1>
            <p className="mt-4 font-medium text-text-secondary">
              Rose Mediara s&apos;engage à respecter les principes déontologiques
              suivants dans l&apos;exercice de son activité de médium et
              thérapeute énergétique :
            </p>
          </header>
        </AnimateOnScroll>

        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((s) => (
            <AnimateOnScroll key={s.title}>
              <article className="rounded-[14px] border border-border bg-gradient-card p-6 shadow-soft sm:p-8">
                <h2 className="font-serif text-xl font-semibold text-text">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-text-secondary sm:text-base">
                  {s.body}
                </p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </div>
  );
}
