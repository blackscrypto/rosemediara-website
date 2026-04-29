"use client";

import { Star } from "lucide-react";

type Props = {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  label?: string;
  name?: string;
};

export function StarRating({
  value,
  onChange,
  readOnly,
  label = "Note",
  name = "rating",
}: Props) {
  const interactive = !readOnly && typeof onChange === "function";

  return (
    <div className="flex flex-wrap items-center gap-1" aria-label={label}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        if (interactive) {
          return (
            <button
              key={n}
              type="button"
              name={name}
              aria-pressed={filled}
              className="rounded p-1 text-gold-bright transition hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-rose"
              onClick={() => onChange?.(n)}
            >
              <Star
                className={`h-8 w-8 ${filled ? "fill-gold-bright text-gold" : "text-sage-muted/70"}`}
                strokeWidth={filled ? 0 : 1.5}
                aria-hidden
              />
              <span className="sr-only">Noter {n} sur 5</span>
            </button>
          );
        }
        return (
          <Star
            key={n}
            className={`h-5 w-5 ${filled ? "fill-gold-bright text-gold" : "text-sage-muted/65"}`}
            strokeWidth={filled ? 0 : 1.5}
            aria-hidden
          />
        );
      })}
      {readOnly ? (
        <span className="sr-only">
          {value} sur 5 étoiles
        </span>
      ) : null}
    </div>
  );
}
