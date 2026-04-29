import { ChevronDown } from "lucide-react";
import { PageSection } from "@/components/ui/PageSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import Link from "next/link";

const faqItems = [
  {
    q: "Comment me préparer à une consultation ?",
    a: "Notez à l’avance ce qui compte pour vous (questions, thèmes). Prévoyez un moment calme et un téléphone chargé. Le prénom et la date de naissance peuvent être demandés pour cadrer l’échange.",
  },
  {
    q: "Mes données personnelles sont-elles protégées ?",
    a: "Oui. Ce que vous partagez en consultation ou pour un soin est traité avec discrétion. Le détail des traitements et de vos droits figure dans la politique de confidentialité.",
  },
  {
    q: "Comment se déroule un soin à distance ?",
    a: "Vous envoyez votre demande et les éléments demandés via le formulaire dédié. Je réalise le soin sans appel téléphonique, puis vous adresse un retour détaillé par email.",
  },
  {
    q: "Puis-je annuler ou reporter ma séance ?",
    a: "Les modalités d’annulation et de report dépendent des conditions prévues lors de votre réservation en ligne. Vérifiez le message de confirmation ou contactez-moi en cas de doute.",
  },
  {
    q: "Combien de temps dure l’effet d’un soin énergétique ?",
    a: "Chaque personne est unique : le ressenti et la durée des effets varient. Un soin n’est pas une promesse de résultat ; il s’inscrit dans une démarche d’accompagnement et d’harmonisation.",
  },
  {
    q: "Proposez-vous des consultations pour les enfants ?",
    a: "Pour les mineurs, une consultation n’est envisagée qu’avec l’accord explicite d’un parent ou représentant légal, conformément à mon code de déontologie.",
  },
];

export function FaqSection() {
  return (
    <PageSection aria-labelledby="faq-heading">
      <div className="flex flex-col gap-10">
        <AnimateOnScroll>
          <SectionTitle
            id="faq-heading"
            title="Questions fréquentes"
            subtitle="Les questions les plus fréquentes avant de réserver. Pour une situation personnelle, un message direct reste le plus adapté."
            align="center"
            className="!mb-0"
          />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-[14px] border border-border bg-gradient-card px-5 py-1 shadow-soft"
              >
                <summary className="cursor-pointer list-none py-4 font-semibold text-text marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span>{item.q}</span>
                    <ChevronDown
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent-rose transition-transform duration-200 group-open:rotate-180"
                      aria-hidden
                      strokeWidth={2}
                    />
                  </span>
                </summary>
                <p className="border-t border-border pb-4 pt-2 text-sm font-medium leading-relaxed text-text-secondary">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p className="mx-auto max-w-xl text-center text-sm font-medium text-text-secondary">
            Une autre question ?{" "}
            <Link
              href="/contact"
              className="font-medium text-accent-rose underline-offset-4 hover:underline"
            >
              Écrivez-moi
            </Link>
            , ou allez vers{" "}
            <Link
              href="/consultations"
              className="font-medium text-accent-rose underline-offset-4 hover:underline"
            >
              les consultations
            </Link>
            {" / "}
            <Link
              href="/soins"
              className="font-medium text-accent-rose underline-offset-4 hover:underline"
            >
              les soins à distance
            </Link>
            .
          </p>
        </AnimateOnScroll>
      </div>
    </PageSection>
  );
}
