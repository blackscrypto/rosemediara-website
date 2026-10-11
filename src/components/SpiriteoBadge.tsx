import { BadgeCheck, Star } from "lucide-react";
import { spiriteo } from "@/lib/spiriteo";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-gold-bright text-gold-bright" strokeWidth={1.5} />
      ))}
    </span>
  );
}

type Props = {
  /** « inline » : pastille compacte (hero, en-têtes) · « card » : encadré détaillé. */
  variant?: "inline" | "card";
  className?: string;
};

export function SpiriteoBadge({ variant = "inline", className = "" }: Props) {
  if (variant === "inline") {
    return (
      <p
        className={`inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-2xl border border-accent-rose/25 bg-white/70 sm:rounded-full px-3.5 py-1.5 text-sm font-semibold text-text shadow-soft backdrop-blur-sm ${className}`}
      >
        <BadgeCheck className="h-4 w-4 shrink-0 text-accent-rose" strokeWidth={2} aria-hidden />
        <span>Médium validée par Spiriteo</span>
        <span className="hidden h-3.5 w-px bg-border sm:inline-block" aria-hidden />
        <span className="inline-flex items-center gap-1.5">
          <Stars />
          <span className="tabular-nums">
            {spiriteo.rating} · {spiriteo.reviewsLabel}
          </span>
        </span>
      </p>
    );
  }

  return (
    <aside
      className={`rounded-[18px] border border-accent-rose/25 bg-gradient-card p-5 shadow-soft sm:p-6 ${className}`}
      aria-labelledby="spiriteo-badge-title"
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-rose/12 text-accent-rose">
          <BadgeCheck className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 id="spiriteo-badge-title" className="font-serif text-xl font-semibold text-text">
            Médium validée par Spiriteo
          </h3>
          <p className="mt-1 text-sm font-medium leading-relaxed text-text-secondary">
            J’exerce aussi sur Spiriteo, plateforme de voyance en ligne, où mon profil a été
            validé. Les avis y sont laissés par les clients après leur consultation.
          </p>
        </div>
      </div>
      <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-border/70 pt-4 text-center">
        <div>
          <dt className="sr-only">Note moyenne</dt>
          <dd className="font-serif text-2xl font-semibold text-accent-rose">{spiriteo.rating}</dd>
          <dd className="mt-0.5 flex justify-center">
            <Stars />
          </dd>
        </div>
        <div>
          <dt className="sr-only">Avis clients</dt>
          <dd className="font-serif text-2xl font-semibold tabular-nums text-accent-rose">
            {spiriteo.reviews}
          </dd>
          <dd className="mt-0.5 text-xs font-semibold text-sage-ink">avis clients</dd>
        </div>
        <div>
          <dt className="sr-only">Consultations</dt>
          <dd className="font-serif text-2xl font-semibold tabular-nums text-accent-rose">
            {spiriteo.consultations}
          </dd>
          <dd className="mt-0.5 text-xs font-semibold text-sage-ink">consultations</dd>
        </div>
      </dl>
      <p className="mt-4 text-center text-xs font-medium text-text-muted">
        Code expert Spiriteo : {spiriteo.expertCode}
      </p>
    </aside>
  );
}
