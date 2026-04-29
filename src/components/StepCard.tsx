import type { LucideIcon } from "lucide-react";

type Props = {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Cartes moins hautes (ex. page consultations) */
  compact?: boolean;
};

export function StepCard({ step, icon: Icon, title, description, compact }: Props) {
  return (
    <div
      className={`relative flex flex-col rounded-[14px] border border-border bg-gradient-card shadow-soft ${
        compact ? "gap-2 p-4 sm:gap-2.5 sm:p-4" : "gap-3 p-5 sm:p-6"
      }`}
    >
      <span
        className={`absolute font-serif font-semibold text-accent-rose/35 ${
          compact ? "right-3 top-3 text-3xl" : "right-4 top-4 text-4xl"
        }`}
      >
        {step}
      </span>
      <div
        className={`inline-flex items-center justify-center rounded-[12px] bg-sage/20 text-sage ${
          compact ? "h-10 w-10" : "h-11 w-11"
        }`}
      >
        <Icon className={compact ? "h-4 w-4" : "h-5 w-5"} strokeWidth={1.5} aria-hidden />
      </div>
      <h3 className={`font-serif font-semibold text-text pr-10 ${compact ? "text-base leading-snug" : "text-lg"}`}>
        {title}
      </h3>
      <p
        className={`text-sm font-medium text-text-secondary ${
          compact ? "leading-snug" : "leading-relaxed"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
