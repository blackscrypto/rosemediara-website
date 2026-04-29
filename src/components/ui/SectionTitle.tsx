type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  id,
  title,
  subtitle,
  align = "left",
  className = "",
}: Props) {
  const alignClass = align === "center" ? "text-center items-center" : "";
  return (
    <div className={`mb-8 flex flex-col gap-3 sm:mb-10 ${alignClass} ${className}`}>
      <div
        className={`flex flex-col gap-3 ${align === "center" ? "items-center" : ""}`}
      >
        <span
          className="h-px w-14 rounded-full bg-gradient-to-r from-gold via-accent-rose-soft to-sage-muted"
          aria-hidden
        />
        <h2
          id={id}
          className={`font-serif text-3xl font-semibold tracking-tight text-text sm:text-4xl ${id ? "scroll-mt-24 sm:scroll-mt-28" : ""}`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={`max-w-2xl text-base font-medium leading-relaxed text-text-secondary ${align === "center" ? "mx-auto" : ""}`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
