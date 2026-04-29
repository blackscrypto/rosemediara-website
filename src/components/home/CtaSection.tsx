import { PageSection } from "@/components/ui/PageSection";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function CtaSection() {
  return (
    <PageSection aria-labelledby="cta-final-heading">
      <AnimateOnScroll>
        <div className="rounded-[14px] border border-accent-rose/20 bg-gradient-cta px-6 py-12 text-center shadow-soft sm:px-12">
          <h2
            id="cta-final-heading"
            className="font-serif text-2xl font-semibold text-text sm:text-3xl"
          >
            Envie de franchir le pas ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-medium text-text-secondary">
            Consultation au téléphone ou soin à distance : passez par le bouton qui
            correspond à votre besoin. Une question avant de vous lancer ? Le lien
            contact reste en dessous.
          </p>
          <div className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:mx-auto sm:max-w-2xl sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Button href="/consultations" variant="primary" className="w-full sm:w-auto sm:min-w-[12rem]">
              Réserver une consultation
            </Button>
            <Button href="/soins" variant="secondary" className="w-full sm:w-auto sm:min-w-[12rem]">
              Demander un soin
            </Button>
          </div>
          <div className="mt-5 flex justify-center">
            <Button
              href="/contact"
              variant="ghost"
              className="!min-h-10 px-5 py-2 text-sm font-semibold text-text-secondary hover:text-text"
            >
              Me contacter
            </Button>
          </div>
        </div>
      </AnimateOnScroll>
    </PageSection>
  );
}
