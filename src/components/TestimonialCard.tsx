import { StarRating } from "@/components/ui/StarRating";
import type { TestimonialPublic } from "@/types";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

type Props = {
  testimonial: TestimonialPublic;
};

export function TestimonialCard({ testimonial }: Props) {
  return (
    <article className="flex h-full flex-col rounded-[14px] border border-border bg-gradient-card p-6 shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-serif text-lg font-semibold text-text">
          {testimonial.first_name}
        </p>
        <StarRating value={testimonial.rating} readOnly />
      </div>
      <p className="flex-1 text-sm font-medium leading-relaxed text-text-secondary">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <time
        className="mt-4 text-xs font-medium text-text-muted"
        dateTime={testimonial.created_at}
      >
        {formatDate(testimonial.created_at)}
      </time>
    </article>
  );
}
