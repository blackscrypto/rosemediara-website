import { consultationFormats, type ConsultationFormatId } from "@/lib/consultations";

export type CalendlyOption = {
  id: ConsultationFormatId;
  label: string;
  price: number;
  url: string;
};

/** Accepte `utilisateur/evenement` ou une URL Calendly complète. */
function normalizeCalendlyUrl(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  const s = raw.trim().replace(/\/+$/, "");
  const url = /^https?:\/\//i.test(s) ? s : `https://calendly.com/${s.replace(/^\/+/, "")}`;
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith("calendly.com") ? parsed.toString() : null;
  } catch {
    return null;
  }
}

const envUrls: Record<ConsultationFormatId, string | undefined> = {
  "15": process.env.NEXT_PUBLIC_CALENDLY_URL_15,
  "30": process.env.NEXT_PUBLIC_CALENDLY_URL_30,
  "45": process.env.NEXT_PUBLIC_CALENDLY_URL_45,
  "60": process.env.NEXT_PUBLIC_CALENDLY_URL_60,
};

/**
 * Formats réservables sur Calendly. Liste vide si NEXT_PUBLIC_BOOKING_PROVIDER=calcom
 * (retour en arrière vers Cal.com sans toucher au code).
 */
export function getCalendlyOptions(): CalendlyOption[] {
  if (process.env.NEXT_PUBLIC_BOOKING_PROVIDER?.trim().toLowerCase() === "calcom") return [];
  return consultationFormats.flatMap((f) => {
    const url = normalizeCalendlyUrl(envUrls[f.id] ?? f.calendlyUrl);
    return url ? [{ id: f.id, label: f.shortLabel, price: f.price, url }] : [];
  });
}
