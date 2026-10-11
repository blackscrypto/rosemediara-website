export type ConsultationFormatId = "15" | "30" | "45" | "60";

export type ConsultationFormat = {
  id: ConsultationFormatId;
  /** Libellé long, ex. « 15 minutes ». */
  duration: string;
  /** Libellé court pour les boutons, ex. « 15 min ». */
  shortLabel: string;
  /** Prix en euros : doit rester identique au prix réglé dans Calendly (Intégrations → Stripe). */
  price: number;
  /** Page Calendly de réservation (surchargeable par NEXT_PUBLIC_CALENDLY_URL_<id>). */
  calendlyUrl: string;
};

export const consultationFormats: ConsultationFormat[] = [
  {
    id: "15",
    duration: "15 minutes",
    shortLabel: "15 min",
    price: 30,
    calendlyUrl: "https://calendly.com/rosemediara/consultation-de-mediumnite-15-min",
  },
  {
    id: "30",
    duration: "30 minutes",
    shortLabel: "30 min",
    price: 60,
    calendlyUrl: "https://calendly.com/rosemediara/30min",
  },
  {
    id: "45",
    duration: "45 minutes",
    shortLabel: "45 min",
    price: 90,
    calendlyUrl: "https://calendly.com/rosemediara/consultation-de-mediumnite-45-min",
  },
  {
    id: "60",
    duration: "1 heure",
    shortLabel: "1 h",
    price: 110,
    calendlyUrl: "https://calendly.com/rosemediara/consultation-de-mediumnite-1-heure",
  },
];

export function getConsultationFormat(id: ConsultationFormatId): ConsultationFormat {
  const format = consultationFormats.find((f) => f.id === id);
  if (!format) throw new Error(`Format de consultation inconnu : ${id}`);
  return format;
}
