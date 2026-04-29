"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

const Cal = dynamic(() => import("@calcom/embed-react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(75dvh,720px)] min-h-[520px] items-center justify-center rounded-[10px] border border-dashed border-border bg-cream text-sm font-medium text-text-secondary">
      Chargement du calendrier…
    </div>
  ),
});

/**
 * Segment public Cal.com : `utilisateur` ou `utilisateur/nom-du-rendez-vous`.
 * Accepte aussi une URL complète collée par erreur.
 */
function normalizeCalLink(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  let s = raw.trim();
  s = s.replace(/^https?:\/\/(www\.)?cal\.com\//i, "");
  s = s.replace(/^\/+/, "").replace(/\/+$/, "");
  s = s.replace(/\/embed$/i, "");
  return s.length > 0 ? s : null;
}

/** Page publique Cal.com (nouvel onglet), sans chemin /embed. */
function calPublicUrl(calLink: string): string {
  const path = calLink.replace(/^\/+/, "");
  return `https://cal.com/${path}`;
}

export function CalBooking() {
  const options = useMemo(
    () =>
      [
        { id: "15", label: "15 minutes", calLink: normalizeCalLink(process.env.NEXT_PUBLIC_CALCOM_LINK_15) },
        { id: "30", label: "30 minutes", calLink: normalizeCalLink(process.env.NEXT_PUBLIC_CALCOM_LINK_30) },
        { id: "45", label: "45 minutes", calLink: normalizeCalLink(process.env.NEXT_PUBLIC_CALCOM_LINK_45) },
        { id: "60", label: "1 heure", calLink: normalizeCalLink(process.env.NEXT_PUBLIC_CALCOM_LINK_60) },
      ].filter((o): o is { id: string; label: string; calLink: string } => Boolean(o.calLink)),
    [],
  );

  const fallback = normalizeCalLink(process.env.NEXT_PUBLIC_CALCOM_LINK);
  const defaultLink = options[0]?.calLink ?? fallback;
  const [selectedId, setSelectedId] = useState(options[0]?.id ?? "single");
  const selected = options.find((o) => o.id === selectedId) ?? options[0];
  const activeLink = selected?.calLink ?? defaultLink;
  const isDev = process.env.NODE_ENV === "development";

  const embedNamespace = useMemo(() => {
    if (!activeLink) return "rose-booking";
    return activeLink.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "rose-booking";
  }, [activeLink]);

  if (!activeLink) {
    return (
      <div className="rounded-[14px] border border-dashed border-accent-rose/35 bg-gradient-card px-5 py-10 text-center shadow-soft">
        <p className="font-serif text-lg font-semibold text-text">Réservation en ligne</p>
        {isDev ? (
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-secondary">
            Dans <code className="rounded bg-black/[0.06] px-1.5 py-0.5 text-xs">.env.local</code>, ajoutez soit{" "}
            <code className="rounded bg-black/[0.06] px-1.5 py-0.5 text-xs">NEXT_PUBLIC_CALCOM_LINK</code> (ex.{" "}
            <code className="rounded bg-black/[0.06] px-1.5 py-0.5 text-xs">rose-mediara</code>), soit les variables{" "}
            <code className="rounded bg-black/[0.06] px-1.5 py-0.5 text-xs">NEXT_PUBLIC_CALCOM_LINK_15</code> …
            <code className="rounded bg-black/[0.06] px-1.5 py-0.5 text-xs">_60</code>, puis redémarrez{" "}
            <code className="rounded bg-black/[0.06] px-1.5 py-0.5 text-xs">npm run dev</code>.
          </p>
        ) : (
          <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">
            La réservation en ligne n’est pas disponible pour le moment. Utilisez la page contact pour réserver.
          </p>
        )}
        <Button href="/contact" variant="secondary" className="mt-6">
          Nous contacter
        </Button>
      </div>
    );
  }

  const showDurationPicker = options.length > 1;

  return (
    <div className="rounded-[14px] border border-border bg-gradient-card p-4 shadow-soft sm:p-5">
      {showDurationPicker ? (
        <div className="mb-4">
          <label htmlFor="cal-consultation-duration" className="block text-sm font-semibold text-text">
            Durée de la consultation
          </label>
          <select
            id="cal-consultation-duration"
            className="mt-2 w-full rounded-[10px] border border-border bg-cream px-3 py-2.5 text-sm font-medium text-text"
            value={selected?.id ?? selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <p className="mb-3 text-sm text-text-secondary">
        Choisissez une date ci-dessous. Le calendrier est affiché par{" "}
        <span className="font-semibold text-text">Cal.com</span> (connexion sécurisée).
      </p>

      <div className="h-[min(75dvh,720px)] min-h-[520px] w-full overflow-hidden rounded-[10px] border border-border bg-gradient-embed">
        <Cal
          key={activeLink}
          namespace={embedNamespace}
          calLink={activeLink}
          style={{ width: "100%", height: "100%", minHeight: "520px", overflow: "auto" }}
        />
      </div>

      <p className="mt-4 text-center text-sm text-text-secondary">
        <a
          href={calPublicUrl(activeLink)}
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
