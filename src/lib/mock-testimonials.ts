import type { TestimonialPublic } from "@/types";

/** Données de démo (9 avis) lorsque Supabase n’est pas configuré. */
export const MOCK_TESTIMONIALS: TestimonialPublic[] = [
  {
    id: "mock-1",
    first_name: "Sophie",
    rating: 5,
    content:
      "Rose a une sensibilité exceptionnelle. Elle m’a aidée à comprendre des messages que je recevais depuis des mois. Sa bienveillance m’a permis de me sentir en confiance immédiatement.",
    created_at: new Date().toISOString(),
  },
  {
    id: "mock-2",
    first_name: "Marie",
    rating: 5,
    content:
      "Le soin énergétique avec Rose était exactement ce dont j’avais besoin. J’ai ressenti une paix profonde que je n’avais pas connue depuis longtemps. Merci infiniment !",
    created_at: new Date().toISOString(),
  },
  {
    id: "mock-3",
    first_name: "Claire",
    rating: 5,
    content:
      "Rose m’a reconnectée à mon chemin de vie. Ses conseils sont précis et toujours justes. Je recommande vivement ses consultations à toute personne en quête de réponses.",
    created_at: new Date().toISOString(),
  },
  {
    id: "mock-4",
    first_name: "Isabelle",
    rating: 5,
    content:
      "J’ai apprécié la clarté des messages et le respect du rythme. Aucune promesse irréaliste : un vrai accompagnement humain.",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "mock-5",
    first_name: "Nathalie",
    rating: 5,
    content:
      "La consultation téléphonique s’est passée dans le calme. J’ai pu poser toutes mes questions sans me sentir jugée.",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "mock-6",
    first_name: "Émilie",
    rating: 4,
    content:
      "Très belle écoute. Les conseils m’ont aidée à poser un premier pas concret dans ma situation professionnelle.",
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
  {
    id: "mock-7",
    first_name: "Céline",
    rating: 5,
    content:
      "Le compte-rendu du soin à distance était détaillé et doux. J’ai relu plusieurs fois les passages qui me parlaient le plus.",
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
  {
    id: "mock-8",
    first_name: "Valérie",
    rating: 5,
    content:
      "Je recommande pour la qualité de l’échange et la bienveillance. On sent une vraie éthique de travail.",
    created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: "mock-9",
    first_name: "Aurélie",
    rating: 5,
    content:
      "Première expérience avec une médium : j’étais angoissée à l’avance, Rose a su me rassurer dès les premières minutes.",
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
];

export function getMockTestimonialsPage(
  offset: number,
  limit: number,
): { items: TestimonialPublic[]; hasMore: boolean } {
  const slice = MOCK_TESTIMONIALS.slice(offset, offset + limit + 1);
  const hasMore = slice.length > limit;
  const items = hasMore ? slice.slice(0, limit) : slice;
  return { items, hasMore };
}
