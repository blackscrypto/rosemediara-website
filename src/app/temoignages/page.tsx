import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCard } from "@/components/TestimonialCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { TestimonialSubmitForm } from "@/components/temoignages/TestimonialSubmitForm";
import { fetchApprovedTestimonialsPage } from "@/lib/testimonials-query";
import { getMockTestimonialsPage } from "@/lib/mock-testimonials";

export const metadata: Metadata = {
  title: "Témoignages",
  description:
    "Lisez les témoignages de consultants et déposez le vôtre — publication après vérification.",
  openGraph: {
    title: "Témoignages — Rose Mediara",
    description: "Avis authentiques et formulaire de dépôt sécurisé.",
  },
};

const PAGE_SIZE = 6;

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readPageParam(params: Record<string, string | string[] | undefined>): number {
  const value = params.page;
  const raw = typeof value === "string" ? value : Array.isArray(value) ? value[0] : "";
  const parsed = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}

function pageHref(page: number) {
  return page <= 1 ? "/temoignages" : `/temoignages?page=${page}`;
}

export default async function TemoignagesPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const page = readPageParam(params);
  const offset = (page - 1) * PAGE_SIZE;

  const fromDb = await fetchApprovedTestimonialsPage(PAGE_SIZE, offset);
  const hasRealData = Boolean(fromDb && fromDb.items.length > 0);
  const fallback = getMockTestimonialsPage(offset, PAGE_SIZE);
  const list = hasRealData && fromDb ? fromDb.items : fallback.items;
  const hasMore = hasRealData && fromDb ? fromDb.hasMore : fallback.hasMore;
  const usesDemo = !hasRealData;
  const hasPrev = page > 1;

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <AnimateOnScroll>
          <SectionTitle
            title="Témoignages"
            subtitle="Merci pour votre confiance. Les avis ci-dessous sont publiés après vérification."
            align="center"
          />
        </AnimateOnScroll>

        {usesDemo ? (
          <p className="mb-10 text-center text-xs text-text-muted">
            Données de démonstration — configurez Supabase pour afficher les
            témoignages validés.
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <AnimateOnScroll key={t.id}>
              <TestimonialCard testimonial={t} />
            </AnimateOnScroll>
          ))}
        </div>

        {(hasPrev || hasMore) && (
          <nav
            className="mt-8 flex items-center justify-center gap-3"
            aria-label="Pagination des témoignages"
          >
            {hasPrev ? (
              <Link
                href={pageHref(page - 1)}
                className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-border bg-cream/55 px-4 py-2 text-sm font-semibold text-text-secondary transition hover:text-text"
              >
                Page précédente
              </Link>
            ) : (
              <span
                className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-border/60 bg-cream/35 px-4 py-2 text-sm font-semibold text-text-muted"
                aria-disabled
              >
                Page précédente
              </span>
            )}

            <span className="min-w-20 text-center text-sm font-semibold text-text-secondary">
              Page {page}
            </span>

            {hasMore ? (
              <Link
                href={pageHref(page + 1)}
                className="inline-flex min-h-10 items-center justify-center rounded-[12px] bg-accent-rose px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-rose-hover"
              >
                Page suivante
              </Link>
            ) : (
              <span
                className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-border/60 bg-cream/35 px-4 py-2 text-sm font-semibold text-text-muted"
                aria-disabled
              >
                Page suivante
              </span>
            )}
          </nav>
        )}

        <section
          className="mt-20 border-t border-border pt-16"
          aria-labelledby="leave-testimonial"
        >
          <AnimateOnScroll>
            <SectionTitle
              id="leave-testimonial"
              title="Laisser un témoignage"
              subtitle="Votre email sert uniquement à la vérification et n’est pas affiché."
              align="center"
            />
          </AnimateOnScroll>
          <div className="mx-auto max-w-2xl">
            <TestimonialSubmitForm />
          </div>
        </section>
      </Container>
    </div>
  );
}
