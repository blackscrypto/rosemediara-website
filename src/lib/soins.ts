export type Soin = {
  slug: string;
  name: string;
  /** Prix en euros (le montant Stripe est calculé côté serveur à partir de cette valeur). */
  price: number;
  tagline?: string;
  description?: string[];
  /** Soin destiné à un mineur : la demande doit être faite par un parent. */
  minor?: boolean;
};

export const soins: Soin[] = [
  {
    slug: "couple",
    name: "Soin de couple",
    price: 145,
    tagline: "Union et guérison",
  },
  {
    slug: "transgenerationnel",
    name: "Soin transgénérationnel",
    price: 145,
    tagline: "Mémoires familiales et lignées",
  },
  {
    slug: "vies-anterieures",
    name: "Soin des vies antérieures",
    price: 145,
    tagline: "Mémoires et réparations",
  },
  {
    slug: "liberation",
    name: "Soin de libération",
    price: 145,
    tagline: "Cœur, corps et âme",
  },
  {
    slug: "nettoyage-logement",
    name: "Nettoyage énergétique du logement",
    price: 190,
    tagline: "Habitat et harmonie",
  },
  {
    slug: "adolescents",
    name: "Soin énergétique pour adolescents",
    price: 105,
    tagline: "De 12 à 17 ans",
    minor: true,
    description: [
      "L’adolescence est une période de grands changements, parfois accompagnée de difficultés d’intégration, d’instabilité scolaire, émotionnelle ou relationnelle, de stress, de perte de confiance ou encore de perturbations dans le sommeil et la nuit.",
      "Ce soin énergétique est proposé comme un accompagnement doux et bienveillant pour aider l’adolescent à retrouver davantage d’apaisement, d’équilibre et de confiance intérieure, et à mieux traverser cette période de changements.",
    ],
  },
  {
    slug: "enfants",
    name: "Soin énergétique pour enfants",
    price: 90,
    tagline: "Moins de 12 ans",
    minor: true,
    description: [
      "Un soin énergétique doux et bienveillant destiné aux enfants de moins de 12 ans qui peuvent traverser une période de perturbation, de changement ou présenter un état général qui semble nécessiter davantage d’apaisement et d’équilibre.",
      "Ce soin peut accompagner l’enfant dans son évolution, l’aider à retrouver davantage de sérénité et favoriser une meilleure harmonie intérieure. Il peut également constituer une ouverture pour l’aider à avancer plus sereinement dans son développement et, en grandissant, à être davantage ouvert, équilibré et confiant face aux différentes étapes de la vie.",
      "Le soin est réalisé dans la lumière et accompagné de la prière, toujours avec douceur et bienveillance, dans le respect de l’enfant et de son rythme.",
    ],
  },
];

export function getSoin(slug: string | null | undefined): Soin | null {
  if (!slug) return null;
  return soins.find((s) => s.slug === slug) ?? null;
}
