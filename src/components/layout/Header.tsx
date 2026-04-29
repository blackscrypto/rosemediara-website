"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, isNavActive } from "@/lib/nav-links";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/10 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "bg-cream/82 shadow-[0_10px_40px_-10px_rgba(55,35,65,0.14)] backdrop-blur-sm"
          : "bg-cream/70 shadow-[0_1px_0_rgba(139,77,107,0.08),inset_0_-1px_0_rgba(255,252,248,0.45)] backdrop-blur-sm"
      }`}
      style={{
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-accent-rose sm:text-2xl [text-shadow:0_1px_0_rgba(255,255,255,0.8)]"
        >
          Rose Mediara
        </Link>
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigation principale"
        >
          {NAV_LINKS.map((l) => {
            const active = isNavActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-[12px] px-3 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-accent-rose/18 text-accent-rose ring-1 ring-accent-rose/25"
                    : "text-text hover:bg-black/[0.07] hover:text-text"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <MobileMenu />
      </Container>
    </header>
  );
}
