"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function AnimateOnScroll({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Fade seule : translateY débordait visuellement sur la section suivante.
  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ease-out motion-reduce:transition-none ${
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0 motion-reduce:pointer-events-auto motion-reduce:opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}
