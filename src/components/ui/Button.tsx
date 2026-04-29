import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<
  Variant,
  string
> = {
  primary:
    "bg-accent-rose text-white hover:bg-accent-rose-hover shadow-soft focus-visible:ring-2 focus-visible:ring-accent-rose focus-visible:ring-offset-2 focus-visible:ring-offset-white",
  secondary:
    "border-2 border-accent-rose text-accent-rose bg-cream/55 hover:bg-accent-rose/12 focus-visible:ring-2 focus-visible:ring-accent-rose focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
  ghost:
    "text-text-secondary hover:bg-black/[0.07] hover:text-text focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-white",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: never };

type ButtonAsLink = BaseProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[14px] px-6 py-3 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none min-h-[44px]";
  const merged = `${base} ${variants[props.variant ?? "primary"]} ${props.className ?? ""}`;

  if ("href" in props && props.href) {
    const raw = { ...(props as ButtonAsLink) } as Record<string, unknown>;
    delete raw.variant;
    delete raw.className;
    const linkProps = raw as Omit<ButtonAsLink, "variant" | "className">;
    return <Link {...linkProps} className={merged} />;
  }

  const raw = { ...(props as ButtonAsButton) } as Record<string, unknown>;
  delete raw.variant;
  delete raw.className;
  const btn = raw as Omit<ButtonAsButton, "variant" | "className">;
  return (
    <button {...btn} type={btn.type ?? "button"} className={merged} />
  );
}
