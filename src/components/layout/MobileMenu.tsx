"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, isNavActive } from "@/lib/nav-links";

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[12px] text-text hover:bg-black/5 lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        id="mobile-drawer"
        className={`fixed inset-0 z-[60] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-dusk/55 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          aria-label="Fermer le menu"
          onClick={() => setOpen(false)}
        />
        <nav
          className={`absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col border-l border-border/70 bg-[rgba(250,247,243,0.98)] shadow-[0_0_48px_rgba(22,22,22,0.22)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Navigation mobile"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <span className="font-serif text-lg font-semibold text-accent-rose">
              Menu
            </span>
            <button
              type="button"
              className="rounded-[12px] p-2 hover:bg-black/5"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="flex flex-1 flex-col gap-2 bg-[rgba(250,247,243,0.98)] p-4">
            {NAV_LINKS.map((l) => {
              const active = isNavActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-[12px] border px-3 py-3 text-base font-semibold ${
                      active
                        ? "border-accent-rose/35 bg-accent-rose/18 text-accent-rose"
                        : "border-border/50 bg-white/72 text-text-secondary hover:bg-accent-rose/12 hover:text-text"
                    }`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
