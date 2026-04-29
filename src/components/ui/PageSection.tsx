import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type Props = {
  children: ReactNode;
  id?: string;
  "aria-labelledby"?: string;
  /** Classes sur la balise <section> (fond, bordures) */
  className?: string;
  /** Surcharge du padding vertical du conteneur (ex. hero secondaire) */
  containerClassName?: string;
};

/** Sections pleine largeur : même gouttière, même rythme vertical, contexte d’empilement propre */
export function PageSection({
  children,
  id,
  "aria-labelledby": ariaLabelledBy,
  className = "",
  containerClassName = "",
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`relative isolate ${className}`.trim()}
    >
      <div
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent-rose/28 to-transparent sm:inset-x-8"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/[0.18] to-transparent"
        aria-hidden
      />
      <Container
        className={`py-8 sm:py-10 ${containerClassName}`.trim()}
      >
        {children}
      </Container>
    </section>
  );
}
