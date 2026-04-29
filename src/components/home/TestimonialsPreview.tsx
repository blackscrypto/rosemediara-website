import { PageSection } from "@/components/ui/PageSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { TestimonialCard } from "@/components/TestimonialCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { TestimonialsLoadMore } from "@/components/home/TestimonialsLoadMore";
import { fetchApprovedTestimonialsPage } from "@/lib/testimonials-query";
import { getMockTestimonialsPage } from "@/lib/mock-testimonials";

const PAGE_SIZE = 3;

export async function TestimonialsPreview() {
  const page = await fetchApprovedTestimonialsPage(PAGE_SIZE, 0);
  const hasRealData = Boolean(page && page.items.length > 0);
  const fallback = getMockTestimonialsPage(0, PAGE_SIZE);
  const list = hasRealData && page ? page.items : fallback.items;
  const initialHasMore = hasRealData && page ? page.hasMore : fallback.hasMore;
  const usesDemo = !hasRealData;

  return (
    <PageSection aria-labelledby="testimonials-preview-heading">
      <AnimateOnScroll>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <SectionTitle
            id="testimonials-preview-heading"
            title="Ce que disent mes client·es"
            subtitle="Avis publiés après modération. Ils reflètent le vécu de personnes qui se sont confiées, comme vous pourriez le faire."
            className="!mb-0"
          />
          <Button
            href="/temoignages"
            variant="primary"
            className="w-full shrink-0 justify-center px-7 text-[0.9375rem] font-semibold shadow-soft sm:mt-1 sm:w-auto sm:self-start sm:px-8 sm:text-sm"
          >
            Voir tous les témoignages
          </Button>
        </div>
      </AnimateOnScroll>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {list.map((t) => (
          <AnimateOnScroll key={t.id}>
            <TestimonialCard testimonial={t} />
          </AnimateOnScroll>
        ))}
      </div>

      <TestimonialsLoadMore initialOffset={PAGE_SIZE} initialHasMore={initialHasMore} />

      {usesDemo ? (
        <p className="mt-6 text-center text-xs text-text-muted">
          Aperçu de démonstration — connectez Supabase pour afficher les avis validés.
        </p>
      ) : null}
    </PageSection>
  );
}
