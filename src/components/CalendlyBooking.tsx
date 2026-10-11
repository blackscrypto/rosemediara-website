"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarCheck, Clock, Lock } from "lucide-react";
import type { CalendlyOption } from "@/lib/calendly";

type CalendlyGlobal = {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

/** Ancre posée par les boutons « Réserver ce format » de la grille tarifaire, ex. #reserver-30. */
const HASH_PREFIX = "#reserver-";

/**
 * Couleurs du site, et masquage du panneau de gauche de Calendly :
 * la durée et le prix sont déjà affichés dans les cartes au-dessus.
 */
function embedUrlFor(url: string): string {
  const u = new URL(url);
  u.searchParams.set("hide_event_type_details", "1");
  u.searchParams.set("primary_color", "7d3f5c");
  u.searchParams.set("text_color", "0f0f0f");
  u.searchParams.set("background_color", "fcf8f4");
  return u.toString();
}

export function CalendlyBooking({ options }: { options: CalendlyOption[] }) {
  const [selectedId, setSelectedId] = useState(options[0]?.id);
  const [scriptReady, setScriptReady] = useState(false);
  const [booked, setBooked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.id === selectedId) ?? options[0];
  const embedUrl = useMemo(() => (selected ? embedUrlFor(selected.url) : null), [selected]);

  // Présélection depuis la grille tarifaire (#reserver-45).
  useEffect(() => {
    function applyHash() {
      if (!window.location.hash.startsWith(HASH_PREFIX)) return;
      const id = window.location.hash.slice(HASH_PREFIX.length);
      if (!options.some((o) => o.id === id)) return;
      setSelectedId(id as CalendlyOption["id"]);
    }
    const initial = window.setTimeout(applyHash, 0);
    window.addEventListener("hashchange", applyHash);
    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("hashchange", applyHash);
    };
  }, [options]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      if ((e.data as { event?: string } | null)?.event === "calendly.event_scheduled") setBooked(true);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!scriptReady || !embedUrl || !el || !window.Calendly) return;
    el.innerHTML = "";
    window.Calendly.initInlineWidget({ url: embedUrl, parentElement: el });
  }, [scriptReady, embedUrl]);

  if (!selected || !embedUrl) return null;

  return (
    <div
      className="overflow-hidden rounded-[18px] border border-border bg-gradient-card shadow-soft"
    >
      {/* Ancres #reserver-15… : le navigateur défile ici tout seul, le script ne fait que présélectionner. */}
      {options.map((o) => (
        <span key={o.id} id={`reserver-${o.id}`} className="block scroll-mt-24" aria-hidden />
      ))}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />

      <fieldset className="border-b border-border/70 px-4 pb-5 pt-5 sm:px-6 sm:pt-6">
        <legend className="sr-only">Durée de la consultation</legend>
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-text" aria-hidden>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-rose text-xs font-bold text-white">
            1
          </span>
          Choisissez la durée
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
          {options.map((o) => {
            const active = o.id === selected.id;
            return (
              <label
                key={o.id}
                className={`relative flex cursor-pointer flex-col items-center justify-center rounded-[14px] border-2 px-3 py-3 text-center transition-colors focus-within:ring-2 focus-within:ring-accent-rose focus-within:ring-offset-2 focus-within:ring-offset-cream ${
                  active
                    ? "border-accent-rose bg-accent-rose text-white shadow-soft"
                    : "border-border bg-cream/70 text-text hover:border-accent-rose/50 hover:bg-accent-rose/[0.06]"
                }`}
              >
                <input
                  type="radio"
                  name="consultation-duration"
                  value={o.id}
                  checked={active}
                  onChange={() => setSelectedId(o.id)}
                  className="sr-only"
                />
                <span className="flex items-center gap-1.5 font-serif text-xl font-semibold leading-none sm:text-2xl">
                  <Clock
                    className={`h-4 w-4 ${active ? "text-white/85" : "text-accent-rose"}`}
                    strokeWidth={2}
                    aria-hidden
                  />
                  {o.label}
                </span>
                <span
                  className={`mt-1.5 text-sm font-semibold tabular-nums ${active ? "text-white/90" : "text-accent-rose"}`}
                >
                  {o.price}&nbsp;€
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="px-2 pb-2 pt-4 sm:px-4 sm:pb-4">
        <p className="mb-2 flex items-center gap-2 px-2 text-sm font-semibold text-text" aria-hidden>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-rose text-xs font-bold text-white">
            2
          </span>
          Choisissez votre date et votre heure
        </p>

        {booked ? (
          <p
            className="mx-2 mb-3 rounded-[12px] border border-sage/40 bg-sage/10 px-4 py-3 text-sm font-medium text-text"
            role="status"
          >
            Merci, votre rendez-vous est réservé. Un e-mail de confirmation vient de vous être
            envoyé. Je vous appellerai à l’heure prévue au numéro indiqué.
          </p>
        ) : null}

        <div
          ref={containerRef}
          className="h-[1040px] w-full overflow-hidden rounded-[12px] sm:h-[700px]"
          aria-label={`Calendrier de réservation, consultation de ${selected.label}`}
        >
          <div className="flex h-full flex-col items-center justify-center gap-3 text-sm font-medium text-text-secondary">
            <span
              className="h-8 w-8 animate-spin rounded-full border-2 border-accent-rose/25 border-t-accent-rose"
              aria-hidden
            />
            Chargement du calendrier…
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-2 border-t border-border/70 bg-cream/50 px-5 py-4 text-sm font-medium text-text-secondary sm:grid-cols-3 sm:gap-4 sm:px-6">
        <li className="flex items-center gap-2">
          <Lock className="h-4 w-4 shrink-0 text-sage" strokeWidth={2} aria-hidden />
          Paiement sécurisé par Stripe
        </li>
        <li className="flex items-center gap-2">
          <CalendarCheck className="h-4 w-4 shrink-0 text-sage" strokeWidth={2} aria-hidden />
          Confirmation immédiate par e-mail
        </li>
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-sage" strokeWidth={2} aria-hidden />
          Horaires dans votre fuseau horaire
        </li>
      </ul>

      <p className="border-t border-border/50 px-5 py-3 text-center text-xs font-medium text-text-muted">
        Le calendrier ne s’affiche pas ?{" "}
        <a
          href={selected.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent-rose underline decoration-accent-rose/40 underline-offset-2 hover:decoration-accent-rose"
        >
          Ouvrir la réservation dans un nouvel onglet
        </a>
      </p>
    </div>
  );
}
