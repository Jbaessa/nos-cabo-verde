export type CategoryId = "onde-ficar" | "o-que-fazer" | "onde-comer";
export type Localized = { pt: string; en: string };

export type Rating = {
  source: string;
  /** Nota normalizada para a escala de 5. */
  score: number;
  reviews: number;
  url: string;
  checkedAt: string;
};

export type Place = {
  id: string;
  destinationId: string;
  category: CategoryId;
  name: string;
  zone: Localized;
  bestFor: Localized;
  why: Localized;
  priceBand: 1 | 2 | 3 | 4;
  tags: string[];
  /** A primeira nota é a da fonte principal. */
  ratings: Rating[];
  lastReviewAt: string;
  website?: string;
  bookingUrl?: string;
  lowReviewCategory?: boolean;
  validatedAt: string | null;
  image?: { src: string; credit: string };
};

export type Fact = {
  id: string;
  label: Localized;
  value: Localized;
  sourceUrl: string;
  checkedAt: string;
  official: boolean;
};

export type Destination = {
  id: string;
  name: string;
  intro: Localized;
  categories: Record<
    CategoryId,
    { title: Localized; description: Localized; intro: Localized; tips: Localized[] }
  >;
};

export const METHOD_UPDATED_AT = "2026-10-30";

export const CATEGORY_IDS: CategoryId[] = ["onde-ficar", "o-que-fazer", "onde-comer"];

const MIN_SCORE = 4;
const MIN_SOURCES = 2;
const MIN_REVIEWS = 50;
const MIN_REVIEWS_LOW = 20;
const PLACE_MAX_AGE_MONTHS = 12;
const FACT_MAX_AGE_MONTHS = 6;

export const destinations: Destination[] = [
  {
    id: "praia",
    name: "Praia",
    intro: {
      pt: "A capital de Cabo Verde, na ilha de Santiago: o centro histórico do Platô, a Cidade Velha aqui ao lado e uma vida urbana que as ilhas de resort não têm.",
      en: "Cape Verde's capital, on Santiago island: the historic Plateau, Cidade Velha next door and a city life the resort islands don't have.",
    },
    categories: {
      "onde-ficar": {
        title: { pt: "Onde ficar na Praia, Cabo Verde", en: "Where to stay in Praia, Cape Verde" },
        description: {
          pt: "As melhores zonas e hotéis da Praia por orçamento, escolhidos pelas avaliações de quem lá ficou.",
          en: "The best areas and hotels in Praia by budget, chosen from guest reviews.",
        },
        intro: {
          pt: "Escolhe primeiro a zona: o Platô para ficar no centro histórico, Prainha e Quebra Canela para estar perto do mar, Achada Santo António para pagar menos.",
          en: "Pick the area first: the Plateau for the historic centre, Prainha and Quebra Canela to be near the sea, Achada Santo António to pay less.",
        },
        tips: [],
      },
      "o-que-fazer": {
        title: { pt: "O que fazer na Praia, Cabo Verde", en: "What to do in Praia, Cape Verde" },
        description: {
          pt: "O essencial da cidade da Praia e os melhores passeios de um dia, como a Cidade Velha e o Tarrafal.",
          en: "The essentials of Praia and the best day trips, including Cidade Velha and Tarrafal.",
        },
        intro: {
          pt: "Começa pelo Platô e pelo mercado de Sucupira, e reserva um dia para a Cidade Velha, Património Mundial da UNESCO.",
          en: "Start with the Plateau and Sucupira market, and keep a day for Cidade Velha, a UNESCO World Heritage Site.",
        },
        tips: [],
      },
      "onde-comer": {
        title: { pt: "Onde comer na Praia, Cabo Verde", en: "Where to eat in Praia, Cape Verde" },
        description: {
          pt: "Os restaurantes mais bem avaliados da Praia: cachupa, peixe e marisco, e opções económicas.",
          en: "Praia's best-rated restaurants: cachupa, fish and seafood, and budget options.",
        },
        intro: {
          pt: "Prova a cachupa, o prato nacional, e o peixe fresco. Abaixo estão os locais com as melhores avaliações, por tipo de refeição.",
          en: "Try cachupa, the national dish, and fresh fish. Below are the best-rated places by type of meal.",
        },
        tips: [],
      },
    },
  },
];

export const places: Place[] = [];

function isOlderThan(date: string, months: number, today: Date): boolean {
  const limit = new Date(today);
  limit.setMonth(limit.getMonth() - months);
  return new Date(date) < limit;
}

function isBlank(text: Localized): boolean {
  return !text.pt.trim() || !text.en.trim();
}

export function validatePlace(place: Place, today: Date): string[] {
  const errors: string[] = [];
  if (place.ratings.length < MIN_SOURCES) errors.push("precisa de duas fontes");
  if (place.ratings.some((r) => r.score < MIN_SCORE)) errors.push("nota abaixo de 4,0");
  const minReviews = place.lowReviewCategory ? MIN_REVIEWS_LOW : MIN_REVIEWS;
  if ((place.ratings[0]?.reviews ?? 0) < minReviews) errors.push(`menos de ${minReviews} reviews`);
  if (isOlderThan(place.lastReviewAt, PLACE_MAX_AGE_MONTHS, today)) errors.push("sem reviews nos últimos 12 meses");
  if (!place.website && !place.bookingUrl) errors.push("sem site nem ligação de reserva");
  if (isBlank(place.zone) || isBlank(place.bestFor) || isBlank(place.why)) errors.push("texto PT ou EN em falta");
  return errors;
}

export function validateFact(fact: Fact, today: Date): string[] {
  const errors: string[] = [];
  if (!fact.sourceUrl) errors.push("sem fonte");
  if (isOlderThan(fact.checkedAt, FACT_MAX_AGE_MONTHS, today)) errors.push("verificado há mais de 6 meses");
  if (isBlank(fact.label) || isBlank(fact.value)) errors.push("texto PT ou EN em falta");
  return errors;
}

export function getDestination(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

export function getPublishedPlaces(destinationId: string, category: CategoryId, from: Place[] = places): Place[] {
  return from.filter((p) => p.destinationId === destinationId && p.category === category && p.validatedAt);
}

export function getPublishedCategories(destinationId: string, from: Place[] = places): CategoryId[] {
  return CATEGORY_IDS.filter((c) => getPublishedPlaces(destinationId, c, from).length > 0);
}

export function getCategory(
  destinationId: string,
  category: string,
  from: Place[] = places,
): { destination: Destination; category: CategoryId; places: Place[] } | undefined {
  const destination = getDestination(destinationId);
  if (!destination || !CATEGORY_IDS.includes(category as CategoryId)) return undefined;
  const published = getPublishedPlaces(destinationId, category as CategoryId, from);
  if (published.length === 0) return undefined;
  return { destination, category: category as CategoryId, places: published };
}

function latestValidation(list: Place[]): string {
  return list.map((p) => p.validatedAt ?? "").sort().at(-1) ?? "";
}

export function guidePaths(from: Place[] = places): { path: string; lastModified: string }[] {
  return destinations.flatMap((d) => {
    const categories = getPublishedCategories(d.id, from);
    if (categories.length === 0) return [];
    const all = categories.flatMap((c) => getPublishedPlaces(d.id, c, from));
    return [
      { path: `/guia/${d.id}`, lastModified: latestValidation(all) },
      ...categories.map((c) => ({
        path: `/guia/${d.id}/${c}`,
        lastModified: latestValidation(getPublishedPlaces(d.id, c, from)),
      })),
    ];
  });
}
