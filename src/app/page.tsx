import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { PillarsSection } from "@/components/home/PillarsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaSection } from "@/components/home/CtaSection";
import { siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accueil",
  description: siteDescription,
  openGraph: {
    title: `${siteName} — Accueil`,
    description: siteDescription,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <TestimonialsPreview />
      <PillarsSection />
      <AboutPreview />
      <FaqSection />
      <CtaSection />
    </>
  );
}
