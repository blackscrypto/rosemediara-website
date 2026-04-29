"use client";

import { useCallback, useState } from "react";
import type { TestimonialPublic } from "@/types";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Button } from "@/components/ui/Button";

const PAGE_SIZE = 3;

type ApiResponse = {
  items: TestimonialPublic[];
  hasMore: boolean;
};

type Props = {
  /** Offset Supabase / API après les 3 premiers affichés côté serveur */
  initialOffset: number;
  initialHasMore: boolean;
};

export function TestimonialsLoadMore({ initialOffset, initialHasMore }: Props) {
  const [batches, setBatches] = useState<TestimonialPublic[][]>([]);
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/testimonials/public?offset=${offset}&limit=${PAGE_SIZE}`,
        { method: "GET" },
      );
      if (!res.ok) {
        setError("Impossible de charger d’autres témoignages pour le moment.");
        return;
      }
      const data = (await res.json()) as ApiResponse;
      if (data.items.length > 0) {
        setBatches((prev) => [...prev, data.items]);
      }
      setOffset((o) => o + data.items.length);
      setHasMore(data.hasMore);
    } catch {
      setError("Une erreur est survenue. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, offset]);

  if (!initialHasMore) {
    return null;
  }

  return (
    <div className="mt-8">
      <div aria-live="polite" className="flex flex-col gap-8">
        {batches.map((batch, i) => (
          <div
            key={`batch-${i}-${batch[0]?.id ?? i}`}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {batch.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        ))}
      </div>

      {error ? (
        <p className="mt-4 text-center text-sm font-medium text-accent-rose" role="alert">
          {error}
        </p>
      ) : null}

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Button type="button" variant="secondary" onClick={load} disabled={loading}>
            {loading ? "Chargement…" : "Lire plus de témoignages"}
          </Button>
        </div>
      ) : batches.length > 0 ? (
        <p className="mt-6 text-center text-sm font-medium text-text-muted">
          Vous avez lu tous les témoignages affichés ici. Pour la liste complète, utilisez le bouton
          « Voir tous les témoignages » en haut de la section.
        </p>
      ) : null}
    </div>
  );
}
