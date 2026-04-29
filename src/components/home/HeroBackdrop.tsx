"use client";

import NextImage from "next/image";
import { useEffect, useState } from "react";

/**
 * Le premier fichier trouvé sous public/images/ est utilisé (ordre = préférence).
 * Ex. hero-bg.webp puis .jpg — pas besoin de renommer si vous changez d’extension.
 */
export const HERO_IMAGE_CANDIDATES = [
  "/images/hero-bg.webp",
  "/images/hero-bg.jpg",
  "/images/hero-bg.jpeg",
  "/images/hero-bg.png",
] as const;

export type HeroImageSrc = (typeof HERO_IMAGE_CANDIDATES)[number];

/** Ordre effectif : préfère d’abord le fichier présent dans le dépôt pour éviter des 404 inutiles en dev. */
const HERO_PROBE_ORDER: readonly HeroImageSrc[] = [
  "/images/hero-bg.png",
  ...HERO_IMAGE_CANDIDATES.filter((p) => p !== "/images/hero-bg.png"),
] as const;

export function HeroBackdrop() {
  const [resolvedSrc, setResolvedSrc] = useState<HeroImageSrc | null>(null);

  useEffect(() => {
    let cancelled = false;
    const list = [...HERO_PROBE_ORDER];

    const probe = (index: number) => {
      if (cancelled) return;
      if (index >= list.length) {
        setResolvedSrc(null);
        return;
      }
      const path = list[index];
      const img = new window.Image();
      img.onload = () => {
        if (!cancelled) setResolvedSrc(path);
      };
      img.onerror = () => probe(index + 1);
      img.src = path;
    };

    probe(0);
    return () => {
      cancelled = true;
    };
  }, []);

  const showPhoto = resolvedSrc !== null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <div className="absolute inset-0 bg-gradient-hero" />

      {showPhoto && resolvedSrc ? (
        <>
          <NextImage
            src={resolvedSrc}
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Voile léger sur toute la section : la lisibilité du texte repose surtout sur le calque local dans Hero */}
          <div
            className="absolute inset-0 hidden bg-[linear-gradient(95deg,rgba(250,247,243,0.82)_0%,rgba(250,247,243,0.38)_min(40vw,520px),rgba(250,247,243,0.12)_min(62vw,760px),transparent_100%)] lg:block"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-cream/72 from-0% via-cream/18 via-45% to-transparent to-68% lg:hidden"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-cream/20 via-transparent to-transparent"
            aria-hidden
          />
        </>
      ) : null}
    </div>
  );
}
