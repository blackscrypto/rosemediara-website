import { Fragment } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export type ConsultationsPricingVariant = "cards" | "table" | "timeline";

export type PricingItem = {
  title: string;
  price: string;
  duration: string;
  intro: string;
  idealFor: string;
  perks: readonly string[];
  closing: string;
  popular?: boolean;
};

const pricing: PricingItem[] = [
  {
    title: "Consultation rapide",
    price: "30",
    duration: "15 minutes",
    intro:
      "Un échange court et ciblé pour obtenir un éclairage immédiat sur une situation précise.",
    idealFor:
      "Cette formule est idéale si vous avez une question unique ou un point urgent à clarifier sans entrer dans une analyse approfondie.",
    perks: [
      "Écoute attentive et recentrée",
      "Guidance intuitive ciblée",
      "Réponse claire et directe",
    ],
    closing:
      "En 15 minutes, je vous apporte un éclairage précis sur une situation actuelle, afin de vous aider à comprendre l’énergie du moment et à orienter votre décision ou votre ressenti avec plus de clarté.",
  },
  {
    title: "Consultation express",
    price: "60",
    duration: "30 minutes",
    intro:
      "Un temps équilibré pour explorer une à deux questions avec clarté et fluidité.",
    idealFor:
      "Cette formule est idéale si vous souhaitez aborder un ou deux sujets précis, tout en prenant le temps de recevoir une guidance plus complète et structurée.",
    perks: [
      "Échange personnalisé et approfondi",
      "Messages intuitifs et guidance médiumnique",
      "Conseils adaptés à votre situation",
    ],
    closing:
      "En 30 minutes, je me connecte à votre énergie pour vous transmettre des messages des guides et des ressentis précis, afin de vous aider à mieux comprendre vos dynamiques actuelles et les pistes d’évolution possibles.",
  },
  {
    title: "Consultation approfondie",
    price: "90",
    duration: "45 minutes",
    intro:
      "Un temps privilégié pour aller plus en profondeur et éclairer votre situation avec finesse et clarté.",
    idealFor:
      "Cette formule est idéale si vous souhaitez explorer plusieurs aspects d’une situation avec davantage de recul, de nuances et de précision.",
    perks: [
      "Lecture énergétique complète",
      "Messages intuitifs et guidance approfondie",
      "Vision élargie de votre situation",
    ],
    closing:
      "En 45 minutes, je vous accompagne dans une lecture plus détaillée de votre vécu, avec une perception énergétique affinée et des conseils structurants pour vous aider à comprendre les enjeux présents et les directions possibles.",
  },
  {
    title: "Consultation complète",
    price: "110",
    duration: "1 heure",
    intro:
      "La formule la plus choisie pour un accompagnement profond, structuré et entièrement personnalisé.",
    idealFor:
      "Cette séance vous permet de prendre le temps nécessaire pour explorer votre situation dans sa globalité, avec une vraie qualité d’échange et de guidance.",
    perks: [
      "Accompagnement sur-mesure et approfondi",
      "Lecture énergétique complète et messages intuitifs",
      "Plan de compréhension et pistes d’évolution personnalisées",
    ],
    closing:
      "En 1 heure, nous prenons le temps d’explorer en profondeur votre situation, vos blocages et vos potentiels, afin de vous offrir une vision claire et des clés concrètes pour avancer avec plus de sérénité et de stabilité.",
    popular: true,
  },
];

function CardsPricing() {
  return (
    <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3">
      {pricing.map((p) => (
        <AnimateOnScroll key={p.title}>
          <div
            className={`relative flex h-full flex-col rounded-[14px] border bg-gradient-card p-6 text-center shadow-soft ${
              p.popular
                ? "border-accent-rose/50 ring-2 ring-accent-rose/20"
                : "border-border"
            }`}
          >
            {p.popular ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-rose px-3 py-0.5 text-xs font-medium text-white">
                Le plus demandé
              </span>
            ) : null}
            <h3 className="font-serif text-lg font-semibold text-text">{p.title}</h3>
            <p className="mt-1 text-sm font-semibold text-sage-ink">{p.duration}</p>
            <p className="mt-4 font-serif text-4xl font-semibold text-accent-rose">
              {p.price} €
            </p>
            <p className="mt-3 flex-1 space-y-3 text-left text-sm font-medium leading-relaxed text-text-secondary">
              <span className="block">{p.intro}</span>
              <span className="block">{p.idealFor}</span>
              <span className="block">{p.closing}</span>
            </p>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}

function TablePricing() {
  return (
    <div className="pt-4">
      <div className="md:hidden space-y-4">
        {pricing.map((p) => (
          <AnimateOnScroll key={p.title}>
            <div
              className={`rounded-[14px] border bg-gradient-card p-5 shadow-soft ${
                p.popular
                  ? "border-accent-rose/50 ring-2 ring-accent-rose/20"
                  : "border-border"
              }`}
            >
              {p.popular ? (
                <span className="mb-3 inline-block rounded-full bg-accent-rose px-2.5 py-0.5 text-xs font-medium text-white">
                  Le plus demandé
                </span>
              ) : null}
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/80 pb-3">
                <h3 className="font-serif text-lg font-semibold text-text">{p.title}</h3>
                <p className="font-serif text-2xl font-semibold text-accent-rose tabular-nums">
                  {p.price} €
                </p>
              </div>
              <p className="mt-2 text-sm font-semibold text-sage-ink">{p.duration}</p>
              <p className="mt-2 space-y-2 text-sm font-medium leading-relaxed text-text-secondary">
                <span className="block">{p.intro}</span>
                <span className="block">{p.idealFor}</span>
                <span className="block">{p.closing}</span>
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      <AnimateOnScroll className="hidden md:block">
        <div className="overflow-hidden rounded-[14px] border border-border bg-gradient-card shadow-soft">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Tarifs des consultations téléphoniques par durée
            </caption>
            <thead>
              <tr className="border-b border-border bg-cream-deep/60">
                <th scope="col" className="px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Formule
                </th>
                <th scope="col" className="px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Durée
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-right font-sans text-xs font-semibold uppercase tracking-wide text-text-muted"
                >
                  Tarif
                </th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((p) => (
                <Fragment key={p.title}>
                  <tr
                    className={`border-b border-border/40 ${
                      p.popular ? "bg-accent-rose/[0.06]" : ""
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 align-top font-serif text-base font-semibold text-text"
                    >
                      <span className="block pr-2">{p.title}</span>
                      {p.popular ? (
                        <span className="mt-1 inline-block rounded-full bg-accent-rose px-2 py-0.5 text-[0.65rem] font-sans font-medium uppercase tracking-wide text-white">
                          Populaire
                        </span>
                      ) : null}
                    </th>
                    <td className="px-5 py-4 align-top font-medium text-sage-ink">{p.duration}</td>
                    <td className="px-5 py-4 align-top text-right font-serif text-xl font-semibold tabular-nums text-accent-rose">
                      {p.price} €
                    </td>
                  </tr>
                  <tr
                    className={`border-b border-border/80 last:border-0 ${
                      p.popular ? "bg-accent-rose/[0.04]" : "bg-cream-deep/30"
                    }`}
                  >
                    <td colSpan={3} className="space-y-2 px-5 pb-4 pt-0 text-sm font-medium leading-relaxed text-text-secondary">
                      <p>{p.intro}</p>
                      <p>{p.idealFor}</p>
                      <p>{p.closing}</p>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </AnimateOnScroll>
    </div>
  );
}

/**
 * Durée / Tarif : sur lg, les encarts s’étirent sur toute la hauteur de la carte (alignée au bloc texte).
 * Mobile : hauteur mini confortable, contenu centré.
 */
const TIMELINE_CELL_DURATION =
  "flex min-h-[4.5rem] min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-3.5 py-2.5 text-center sm:min-h-[4.5rem] sm:px-4 sm:py-2.5 lg:min-h-0 lg:w-[8rem] lg:max-w-[8rem] lg:flex-none lg:self-stretch lg:px-3 lg:py-4";
const TIMELINE_CELL_PRICE =
  "flex min-h-[4.5rem] min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-4 py-2.5 text-center sm:min-h-[4.5rem] sm:px-5 sm:py-2.5 lg:min-h-0 lg:w-[9.75rem] lg:max-w-[9.75rem] lg:flex-none lg:self-stretch lg:px-4 lg:py-4";

function TimelinePricing() {
  const total = pricing.length;

  return (
    <div className="pt-2">
      <AnimateOnScroll>
        <p className="mx-auto mb-5 max-w-3xl text-center text-sm font-medium leading-relaxed text-text-secondary sm:mb-6 sm:text-base">
          <span className="text-text">Ordre proposé :</span> du format{" "}
          <strong className="font-semibold text-text">le plus court</strong> au{" "}
          <strong className="font-semibold text-text">plus long</strong>. Chaque formule reçoit le même soin : seul le
          temps d’échange change.
        </p>
      </AnimateOnScroll>

      <ol
        className="mx-auto max-w-5xl list-none space-y-3 pl-0 sm:space-y-3.5"
        aria-label="Liste des tarifs, de la consultation la plus courte à la plus longue"
      >
        {pricing.map((p, i) => {
          const step = i + 1;

          return (
            <li key={p.title}>
              <AnimateOnScroll>
                <article
                  className={`relative rounded-[14px] border shadow-soft sm:rounded-2xl ${
                    p.popular
                      ? "border-accent-rose/45 bg-gradient-to-br from-[#fdf8fa] via-[#faf4f0] to-[#f3ebe5] ring-1 ring-accent-rose/15"
                      : "border-border/90 bg-gradient-to-br from-[#fcfaf7] via-[#f9f4ef] to-[#f2ebe4]"
                  }`}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-gold/25 via-accent-rose/35 to-sage/25"
                    aria-hidden
                  />

                  <div className="flex min-w-0 flex-col gap-3 px-5 py-4 sm:px-7 sm:py-4 lg:flex-row lg:items-stretch lg:gap-8 lg:px-10 lg:py-4">
                    <div className="flex min-w-0 flex-1 gap-3 sm:gap-4 lg:items-start">
                      <div className="flex shrink-0 flex-col items-center pt-0.5" aria-hidden>
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold tabular-nums shadow-soft sm:h-11 sm:w-11 sm:text-base ${
                            p.popular
                              ? "border-accent-rose/60 bg-accent-rose text-white"
                              : "border-sage/35 bg-cream/90 text-sage-ink"
                          }`}
                        >
                          {step}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1 text-left">
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                          Formule {step} / {total}
                        </p>
                        <h3 className="mt-0.5 font-serif text-lg font-semibold leading-snug text-text sm:text-xl">
                          {p.title} ({p.duration})
                        </h3>
                        <div className="mt-1 min-h-[1.25rem]">
                          {p.popular ? (
                            <span className="inline-flex rounded-full bg-accent-rose px-2.5 py-0.5 text-[0.7rem] font-semibold text-white sm:py-1 sm:text-xs">
                              La formule la plus choisie
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-2 text-sm font-medium leading-snug text-text-secondary sm:text-[0.9375rem] sm:leading-snug">
                          {p.intro}
                        </p>

                        <p className="mt-2 text-sm font-medium leading-snug text-text-secondary sm:text-[0.9375rem] sm:leading-snug">
                          {p.idealFor}
                        </p>

                        <ul className="mt-2 flex flex-col gap-0.5 text-xs font-semibold leading-snug text-sage sm:text-sm">
                          {p.perks.map((line) => (
                            <li key={line} className="flex gap-2">
                              <span className="w-3 shrink-0 text-center text-gold" aria-hidden>
                                ✦
                              </span>
                              <span className="min-w-0">{line}</span>
                            </li>
                          ))}
                        </ul>

                        <p className="mt-2 text-sm font-medium leading-snug text-text-secondary sm:text-[0.9375rem] sm:leading-snug">
                          {p.closing}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 w-full gap-4 border-t border-border/50 pt-3 sm:gap-5 lg:w-[23rem] lg:max-w-none lg:shrink-0 lg:flex-none lg:items-stretch lg:gap-5 lg:self-stretch lg:border-l lg:border-t-0 lg:pl-10 lg:pr-6 lg:pt-0">
                      <div
                        className={`${TIMELINE_CELL_DURATION} border-border/65 bg-cream/55`}
                      >
                        <p className="text-[0.65rem] font-semibold uppercase leading-tight tracking-wide text-text-muted sm:text-xs">
                          Durée
                        </p>
                        <p className="px-0.5 font-serif text-base font-semibold tabular-nums leading-tight text-text sm:text-lg">
                          {p.duration}
                        </p>
                      </div>
                      <div
                        className={`${TIMELINE_CELL_PRICE} border-accent-rose/30 bg-accent-rose/[0.1]`}
                      >
                        <p className="text-[0.65rem] font-semibold uppercase leading-tight tracking-wide text-accent-rose sm:text-xs">
                          Tarif
                        </p>
                        <p className="px-0.5 font-serif text-2xl font-semibold tabular-nums leading-none tracking-tight text-accent-rose sm:text-[1.65rem]">
                          {p.price}&nbsp;€
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </AnimateOnScroll>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

type Props = {
  variant?: ConsultationsPricingVariant;
};

export function ConsultationsPricing({ variant = "cards" }: Props) {
  if (variant === "table") return <TablePricing />;
  if (variant === "timeline") return <TimelinePricing />;
  return <CardsPricing />;
}
