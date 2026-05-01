import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SoinsCheckoutStart } from "@/components/soins/SoinsCheckoutStart";

export const metadata: Metadata = {
  title: "Réserver un soin — paiement",
  description:
    "Réglez votre soin énergétique à distance (145 €), puis complétez votre demande détaillée.",
  robots: { index: false, follow: true },
};

export default function SoinsCommanderPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <AnimateOnScroll>
          <SectionTitle
            title="Réserver votre soin"
            subtitle="Étape 1 sur 2 : paiement sécurisé par carte (Stripe)."
            align="center"
          />
        </AnimateOnScroll>

        <div className="mx-auto mt-10 max-w-xl">
          <AnimateOnScroll>
            <SoinsCheckoutStart />
          </AnimateOnScroll>
          <p className="mt-6 text-center text-xs font-medium text-text-muted">
            Déjà payé ? Si Stripe vous a renvoyé·e sur cette page sans lien de confirmation,
            vérifiez votre email ou{" "}
            <Link href="/contact" className="text-accent-rose underline-offset-4 hover:underline">
              contactez-moi
            </Link>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
