import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Rose Mediara par email ou formulaire — réponse sous quelques jours ouvrés.",
  openGraph: {
    title: "Contact — Rose Mediara",
    description: "Formulaire de contact et coordonnées.",
  },
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <AnimateOnScroll>
          <SectionTitle
            title="Contact"
            subtitle="Une question avant de réserver ? Écrivez-moi."
            align="center"
          />
        </AnimateOnScroll>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <aside className="space-y-6 text-center lg:col-span-2 lg:text-left">
            <AnimateOnScroll>
              <div className="rounded-[14px] border border-border bg-gradient-card p-6 shadow-soft">
                <p className="text-sm font-semibold text-text">Email</p>
                <a
                  href="mailto:contact@rosemediara.com"
                  className="mt-2 inline-flex items-center justify-center gap-2 text-accent-rose hover:underline lg:justify-start"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  contact@rosemediara.com
                </a>
                <p className="mt-4 text-sm font-medium text-text-secondary">
                  Horaires (placeholder) : lundi–vendredi, 14h–18h
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="rounded-[14px] border border-border bg-gradient-card p-6 shadow-soft">
                <p className="text-sm font-semibold text-text">Réseaux</p>
                <div className="mt-3 flex justify-center gap-4 lg:justify-start">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage hover:text-accent-rose"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="h-6 w-6" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage hover:text-accent-rose"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="h-6 w-6" />
                  </a>
                </div>
                <p className="mt-3 text-xs font-medium text-text-muted">
                  Remplacez les liens par vos profils réels.
                </p>
              </div>
            </AnimateOnScroll>
          </aside>

          <div className="lg:col-span-3">
            <AnimateOnScroll>
              <ContactForm />
            </AnimateOnScroll>
          </div>
        </div>
      </Container>
    </div>
  );
}
