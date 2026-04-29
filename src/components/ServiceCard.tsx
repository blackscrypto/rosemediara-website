import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  meta: string;
  ctaLabel: string;
  href: string;
  /** Short bullet points shown under the description */
  highlights?: string[];
};

export function ServiceCard({
  icon: Icon,
  title,
  description,
  meta,
  ctaLabel,
  href,
  highlights,
}: Props) {
  return (
    <article className="flex h-full flex-col rounded-[14px] border border-border bg-gradient-card p-6 shadow-soft transition hover:border-accent-rose/25 hover:shadow-[0_12px_40px_rgba(157,78,95,0.1)]">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-accent-rose/15 text-accent-rose">
        <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
      </div>
      <h3 className="font-serif text-xl font-semibold text-text">{title}</h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
        {description}
      </p>
      {highlights && highlights.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2 text-sm text-text-secondary">
          {highlights.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wide text-sage-ink">
        {meta}
      </p>
      <div className="mt-6">
        <Button href={href} variant="primary" className="w-full sm:w-auto">
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
