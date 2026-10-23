/** Options de l'accord de témoignage vidéo (page /temoignage). */

export const appearanceOptions = [
  { value: "visible", label: "Visage visible" },
  { value: "flou", label: "Visage flouté" },
  { value: "flou-voix", label: "Visage flouté et voix modifiée" },
] as const;

export const displayNameOptions = [
  { value: "prenom", label: "Mon prénom" },
  { value: "initiales", label: "Mes initiales" },
  { value: "anonyme", label: "Aucun nom (anonyme)" },
] as const;

export const usageOptions = [
  { value: "site", label: "Sur le site rosemediara.com" },
  { value: "reseaux", label: "Sur les réseaux sociaux de Rose Mediara" },
  { value: "publicite", label: "Dans des publicités en ligne" },
] as const;

/** Durée de l'autorisation, reprise dans le texte de l'accord et dans les e-mails. */
export const consentDuration = "2 ans";

/** Durée de validité de la consultation offerte. */
export const giftValidity = "3 mois";

export type Appearance = (typeof appearanceOptions)[number]["value"];
export type DisplayName = (typeof displayNameOptions)[number]["value"];
export type Usage = (typeof usageOptions)[number]["value"];

export function labelOf<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}
