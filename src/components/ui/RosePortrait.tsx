"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PORTRAIT_CANDIDATES = [
  "/images/rose-portrait.webp",
  "/images/rose-portrait.jpg",
  "/images/rose-portrait.jpeg",
  "/images/rose-portrait.png",
] as const;

type Props = {
  className?: string;
  priority?: boolean;
};

function PortraitFallback({ className }: { className: string }) {
  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-[14px] border border-border bg-gradient-to-br from-accent-rose/15 via-cream to-sage/20 shadow-soft ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="font-serif text-lg font-medium text-text-secondary">
          Photo Rose Mediara
        </p>
        <p className="max-w-xs text-xs font-medium text-text-muted">
          Ajoutez votre portrait dans{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-[0.7rem]">
            public/images/rose-portrait.webp
          </code>
          ,{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-[0.7rem]">
            .jpg
          </code>{" "}
          ou{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-[0.7rem]">
            .png
          </code>
        </p>
      </div>
    </div>
  );
}

export function RosePortrait({ className = "", priority }: Props) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const [probed, setProbed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const list = [...PORTRAIT_CANDIDATES];

    const probe = (index: number) => {
      if (cancelled) return;
      if (index >= list.length) {
        setResolvedSrc(null);
        setProbed(true);
        return;
      }
      const path = list[index];
      const img = new window.Image();
      img.onload = () => {
        if (!cancelled) {
          setResolvedSrc(path);
          setProbed(true);
        }
      };
      img.onerror = () => probe(index + 1);
      img.src = path;
    };

    probe(0);
    return () => {
      cancelled = true;
    };
  }, []);

  if (!probed) {
    return (
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-[14px] border border-border bg-cream-deep shadow-soft ${className}`}
        aria-hidden
      />
    );
  }

  if (!resolvedSrc) {
    return <PortraitFallback className={className} />;
  }

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-[14px] border border-border bg-cream-deep shadow-soft ${className}`}
    >
      <Image
        src={resolvedSrc}
        alt="Rose Mediara, médium et thérapeute énergétique"
        fill
        className="object-cover object-top"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={priority}
      />
    </div>
  );
}
