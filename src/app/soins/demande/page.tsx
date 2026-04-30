import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SoinsForm } from "@/components/soins/SoinsForm";

export const metadata: Metadata = {
  title: "Demande de soin — formulaire",
  description:
    "Complétez votre demande de soin énergétique à distance après paiement.",
  robots: { index: false, follow: true },
};

export default function SoinsDemandePage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <AnimateOnScroll>
          <SectionTitle
            title="Votre demande détaillée"
            subtitle="Étape 2 sur 2 : après paiement confirmé, envoyez vos informations et vos photos pour préparer le soin."
            align="center"
          />
        </AnimateOnScroll>

        <div className="mx-auto mt-10 max-w-2xl">
          <AnimateOnScroll>
            <SoinsForm />
          </AnimateOnScroll>
          <p className="mt-6 text-center text-sm font-medium text-text-muted">
            Besoin d’aide ?{" "}
            <Link href="/contact" className="text-accent-rose underline-offset-4 hover:underline">
              Écrivez-moi
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
