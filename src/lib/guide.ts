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
  priceBand?: 1 | 2 | 3 | 4;
  tags: string[];
  /** A primeira nota é a da fonte principal. */
  ratings: Rating[];
  lastReviewAt: string;
  website?: string;
  bookingUrl?: string;
  phone?: string;
  /** Praias e monumentos, sem contacto próprio. */
  publicPlace?: boolean;
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
  title: Localized;
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
    title: { pt: "Guia da Praia, Cabo Verde", en: "Praia, Cape Verde: travel guide" },
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
          pt: "Escolhe primeiro a zona: o Platô para ficar no centro histórico, a Prainha para estar perto do mar, o Palmarejo para uma zona mais residencial.",
          en: "Pick the area first: the Plateau for the historic centre, Prainha to be near the sea, Palmarejo for a more residential area.",
        },
        tips: [
          { pt: "Se vens pela primeira vez, o Platô e a Prainha deixam-te perto do centro e do mar.", en: "On a first visit, the Plateau and Prainha keep you close to the centre and the sea." },
          { pt: "Confirma o preço para as tuas datas: os valores variam muito ao longo do ano.", en: "Check prices for your dates: rates vary a lot through the year." },
        ],
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
        tips: [
          { pt: "Reserva um dia para a Cidade Velha, ou combina-a com a cidade num passeio guiado.", en: "Keep a day for Cidade Velha, or combine it with the city on a guided tour." },
          { pt: "Confirma o preço de entrada e o horário antes de ir, porque podem mudar.", en: "Check entry prices and opening hours before you go, as they can change." },
        ],
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
        tips: [
          { pt: "Prova a cachupa, o prato nacional, feita de milho, feijão e peixe ou carne.", en: "Try cachupa, the national dish, made with corn, beans and fish or meat." },
          { pt: "Ao jantar, sobretudo ao fim-de-semana, vale a pena reservar.", en: "For dinner, especially at weekends, it is worth booking." },
        ],
      },
    },
  },
];

export const places: Place[] = [
  {
    id: "barcelo-praia",
    destinationId: "praia",
    category: "onde-ficar",
    name: "Barceló Praia Cape Verde",
    zone: { pt: "Prainha", en: "Prainha" },
    bestFor: { pt: "Quem procura um hotel de cinco estrelas junto ao mar", en: "Travellers after a five-star hotel by the sea" },
    why: { pt: "A nota mais alta entre os grandes hotéis da cidade, nas duas fontes.", en: "The highest score among the city's large hotels, on both sources." },
    priceBand: 4,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.7, reviews: 527, url: "https://www.google.com/maps/search/?api=1&query=Barcel%C3%B3%20Praia%20Cape%20Verde&query_place_id=ChIJG7nKomKZNQkRWCHj-qEavyQ", checkedAt: "2026-10-30" },
      { source: "Booking", score: 4.5, reviews: 863, url: "https://www.booking.com/city/cv/praia.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-29",
    website: "https://www.barcelo.com/pt-pt/barcelo-praia-cape-verde/",
    phone: "+238 350 07 85",
    validatedAt: "2026-10-30",
  },
  {
    id: "casa-jardim-di-sol",
    destinationId: "praia",
    category: "onde-ficar",
    name: "Casa Jardim di Sol",
    zone: { pt: "Palmarejo", en: "Palmarejo" },
    bestFor: { pt: "Quem prefere uma casa de hóspedes tranquila", en: "Travellers who prefer a quiet guesthouse" },
    why: { pt: "A nota mais alta da Booking nesta selecção, numa casa de hóspedes em zona residencial.", en: "The highest Booking score in this selection, at a guesthouse in a residential area." },
    priceBand: 3,
    tags: [],
    ratings: [
      { source: "Booking", score: 4.55, reviews: 210, url: "https://www.booking.com/city/cv/praia.html", checkedAt: "2026-10-30" },
      { source: "Google Maps", score: 4.7, reviews: 41, url: "https://www.google.com/maps/search/?api=1&query=Casa%20Jardim%20di%20Sol&query_place_id=ChIJXcjF_NeZNQkRZ2BRUBvldqM", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-26",
    website: "https://jardimdisol.com/",
    phone: "+238 976 30 79",
    validatedAt: "2026-10-30",
  },
  {
    id: "chez-maria-julia",
    destinationId: "praia",
    category: "onde-ficar",
    name: "Chez Maria Júlia Boutique Hotel",
    zone: { pt: "Palmarejo", en: "Palmarejo" },
    bestFor: { pt: "Quem procura um hotel pequeno", en: "Travellers looking for a small hotel" },
    why: { pt: "Hotel boutique com boas notas consistentes nas duas fontes.", en: "A boutique hotel with consistently good scores on both sources." },
    priceBand: 3,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.4, reviews: 89, url: "https://www.google.com/maps/search/?api=1&query=Chez%20Maria%20J%C3%BAlia%20Boutique%20Hotel&query_place_id=ChIJQ_95LMWZNQkRkgFSEH7O720", checkedAt: "2026-10-30" },
      { source: "Booking", score: 4.35, reviews: 350, url: "https://www.booking.com/city/cv/praia.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-25",
    website: "https://chezmariajulia.cv/",
    phone: "+238 262 77 70",
    validatedAt: "2026-10-30",
  },
  {
    id: "pestana-tropico",
    destinationId: "praia",
    category: "onde-ficar",
    name: "Pestana Trópico",
    zone: { pt: "Prainha", en: "Prainha" },
    bestFor: { pt: "Quem quer um grande hotel perto do mar", en: "Travellers who want a large hotel near the sea" },
    why: { pt: "Um dos hotéis com mais avaliações da cidade, e mantém boas notas nas duas fontes.", en: "One of the most-reviewed hotels in the city, with good scores on both sources." },
    priceBand: 4,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.4, reviews: 1417, url: "https://www.google.com/maps/search/?api=1&query=Pestana%20Tr%C3%B3pico&query_place_id=ChIJOZUnZe6YNQkRJFIlLzkTQKg", checkedAt: "2026-10-30" },
      { source: "Booking", score: 4.25, reviews: 1651, url: "https://www.booking.com/city/cv/praia.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-23",
    website: "https://www.pestana.com/en/hotel/pestana-tropico",
    phone: "+238 261 42 00",
    validatedAt: "2026-10-30",
  },
  {
    id: "hotel-cesaria",
    destinationId: "praia",
    category: "onde-ficar",
    name: "Hotel Cesaria",
    zone: { pt: "Perto do aeroporto", en: "Near the airport" },
    bestFor: { pt: "Quem chega tarde ou tem pouco tempo", en: "Travellers arriving late or short on time" },
    why: { pt: "Preço intermédio e muitas avaliações positivas nas duas fontes.", en: "Mid-range prices and many positive reviews on both sources." },
    priceBand: 2,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.2, reviews: 413, url: "https://www.google.com/maps/search/?api=1&query=Hotel%20Cesaria&query_place_id=ChIJXYteIxyZNQkRwwY2lu2rW40", checkedAt: "2026-10-30" },
      { source: "Booking", score: 4.25, reviews: 1029, url: "https://www.booking.com/city/cv/praia.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-22",
    website: "https://hotelcesaria.com/",
    phone: "+238 261 65 56",
    validatedAt: "2026-10-30",
  },
  {
    id: "oasis-praiamar",
    destinationId: "praia",
    category: "onde-ficar",
    name: "Hotel Oásis Atlântico Praiamar",
    zone: { pt: "Prainha", en: "Prainha" },
    bestFor: { pt: "Quem quer ficar na Prainha", en: "Travellers who want to stay in Prainha" },
    why: { pt: "O hotel com mais avaliações no Google nesta selecção, com nota acima de 4 nas duas fontes.", en: "The most-reviewed hotel on Google in this selection, scoring above 4 on both sources." },
    priceBand: 3,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.3, reviews: 1623, url: "https://www.google.com/maps/search/?api=1&query=Hotel%20O%C3%A1sis%20Atl%C3%A2ntico%20Praiamar&query_place_id=ChIJ4RedhO2YNQkR_hkc-SRlsYU", checkedAt: "2026-10-30" },
      { source: "Booking", score: 4.05, reviews: 363, url: "https://www.booking.com/city/cv/praia.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-23",
    website: "https://oasisatlantico.com/en/destinos/cabo-verde/ilha-de-santiago/oasis-praiamar/",
    phone: "+238 260 84 40",
    validatedAt: "2026-10-30",
  },
  {
    id: "praia-maria",
    destinationId: "praia",
    category: "onde-ficar",
    name: "Boutique Hotel Praia Maria",
    zone: { pt: "Platô", en: "Plateau" },
    bestFor: { pt: "Quem quer ficar no centro a preço económico", en: "Travellers who want a central stay on a budget" },
    why: { pt: "A opção mais económica desta selecção, na Rua 5 de Julho, no centro histórico.", en: "The most affordable option in this selection, on Rua 5 de Julho in the historic centre." },
    priceBand: 1,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.0, reviews: 214, url: "https://www.google.com/maps/search/?api=1&query=Boutique%20Hotel%20Praia%20Maria&query_place_id=ChIJNRyt1OOYNQkRCJ_xosAd0LA", checkedAt: "2026-10-30" },
      { source: "Booking", score: 4.0, reviews: 1078, url: "https://www.booking.com/city/cv/praia.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-28",
    website: "https://gruposofia.net/",
    phone: "+238 590 99 97",
    validatedAt: "2026-10-30",
  },
  {
    id: "quintal-da-musica",
    destinationId: "praia",
    category: "onde-comer",
    name: "Restaurante Quintal da Música",
    zone: { pt: "Platô", en: "Plateau" },
    bestFor: { pt: "Um jantar com música ao vivo", en: "Dinner with live music" },
    why: { pt: "Muito avaliado nas duas fontes, com referências a música ao vivo.", en: "Heavily reviewed on both sources, with mentions of live music." },
    priceBand: 3,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.5, reviews: 1488, url: "https://www.google.com/maps/search/?api=1&query=Restaurante%20Quintal%20da%20M%C3%BAsica&query_place_id=ChIJ82659OGYNQkRjZ8Z_Bz0X1k", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.2, reviews: 658, url: "https://www.tripadvisor.com/Restaurant_Review-g293775-d2524813-Reviews-Quintal_Da_Musica-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-23",
    website: "https://facebook.com/quintaldamusica/",
    phone: "+238 992 99 41",
    validatedAt: "2026-10-30",
  },
  {
    id: "linha-d-agua",
    destinationId: "praia",
    category: "onde-comer",
    name: "Restaurante Linha d'Água",
    zone: { pt: "Prainha", en: "Prainha" },
    bestFor: { pt: "Uma refeição na Prainha", en: "A meal in Prainha" },
    why: { pt: "O restaurante com mais avaliações no Google nesta selecção, com a mesma nota nas duas fontes.", en: "The most-reviewed restaurant on Google in this selection, with the same score on both sources." },
    priceBand: 2,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.3, reviews: 1688, url: "https://www.google.com/maps/search/?api=1&query=Restaurante%20Linha%20d'%C3%81gua&query_place_id=ChIJawr44C2ZNQkRPoeFafrCNyM", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.3, reviews: 162, url: "https://www.tripadvisor.com/Restaurant_Review-g293775-d13549080-Reviews-Linha_D_agua-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-29",
    website: "https://pt-br.facebook.com/linhadaguacv/",
    phone: "+238 938 70 09",
    validatedAt: "2026-10-30",
  },
  {
    id: "noventa-90",
    destinationId: "praia",
    category: "onde-comer",
    name: "Bistro Noventa 90",
    zone: { pt: "Platô", en: "Plateau" },
    bestFor: { pt: "Um jantar no centro", en: "Dinner in the centre" },
    why: { pt: "A mesma nota alta nas duas fontes, com centenas de avaliações.", en: "The same high score on both sources, with hundreds of reviews." },
    priceBand: 2,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.5, reviews: 523, url: "https://www.google.com/maps/search/?api=1&query=Bistro%20Noventa%2090&query_place_id=ChIJ6TAWjeGYNQkRNCupZ7G-Mbo", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.5, reviews: 125, url: "https://www.tripadvisor.com/Restaurant_Review-g293775-d11952597-Reviews-90_Noventa_Bistro-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-20",
    phone: "+238 938 70 13",
    validatedAt: "2026-10-30",
  },
  {
    id: "kaza-katxupa",
    destinationId: "praia",
    category: "onde-comer",
    name: "Restaurante Kaza Katxupa",
    zone: { pt: "Platô", en: "Plateau" },
    bestFor: { pt: "Provar comida cabo-verdiana", en: "Trying Cape Verdean food" },
    why: { pt: "Restaurante de gastronomia cabo-verdiana, bem avaliado nas duas fontes.", en: "A Cape Verdean restaurant, well rated on both sources." },
    priceBand: 1,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.3, reviews: 706, url: "https://www.google.com/maps/search/?api=1&query=Restaurante%20Kaza%20Katxupa&query_place_id=ChIJ_7wVNzeZNQkRJVW_iCRtJuA", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.4, reviews: 121, url: "https://www.tripadvisor.com/Restaurant_Review-g293775-d15361388-Reviews-Kaza_Katxupa-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-29",
    website: "https://www.instagram.com/kazakatxupa",
    phone: "+238 521 53 86",
    validatedAt: "2026-10-30",
  },
  {
    id: "cheff-teresa",
    destinationId: "praia",
    category: "onde-comer",
    name: "Cheff Teresa",
    zone: { pt: "Prainha", en: "Prainha" },
    bestFor: { pt: "Uma refeição especial", en: "A special meal" },
    why: { pt: "Notas altas nas duas fontes, com a melhor do Tripadvisor entre os muito avaliados.", en: "High scores on both sources, the best on Tripadvisor among the heavily reviewed." },
    priceBand: 3,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.4, reviews: 262, url: "https://www.google.com/maps/search/?api=1&query=Cheff%20Teresa&query_place_id=ChIJ62Bv4e2YNQkReiZB1lVwEDw", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.6, reviews: 78, url: "https://www.tripadvisor.com/Restaurant_Review-g293775-d12995955-Reviews-Chef_Teresa_Restaurant-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-24",
    phone: "+238 998 43 84",
    validatedAt: "2026-10-30",
  },
  {
    id: "punto-d-incontro",
    destinationId: "praia",
    category: "onde-comer",
    name: "Restaurante Punto d'Incontro",
    zone: { pt: "Avenida Cidade de Lisboa", en: "Avenida Cidade de Lisboa" },
    bestFor: { pt: "Uma refeição de faixa de preço mais alta", en: "A higher-priced meal" },
    why: { pt: "Bem avaliado nas duas fontes, com mais de 200 opiniões em cada.", en: "Well rated on both sources, with over 200 reviews on each." },
    priceBand: 4,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.2, reviews: 281, url: "https://www.google.com/maps/search/?api=1&query=Restaurante%20Punto%20d'Incontro&query_place_id=ChIJicOAT-OYNQkRaHkIpbYUTgw", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.4, reviews: 213, url: "https://www.tripadvisor.com/Restaurant_Review-g293775-d3707711-Reviews-Restaurante_Punto_d_Incontro-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-10",
    website: "http://www.puntodincontro.cv",
    phone: "+238 261 70 90",
    validatedAt: "2026-10-30",
  },
  {
    id: "l-atelier",
    destinationId: "praia",
    category: "onde-comer",
    name: "L'Atelier",
    zone: { pt: "Palmarejo", en: "Palmarejo" },
    bestFor: { pt: "Boa comida a preço médio", en: "Good food at a mid-range price" },
    why: { pt: "A nota mais alta desta selecção: 4,8 nas duas fontes.", en: "The highest score in this selection: 4.8 on both sources." },
    priceBand: 2,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.8, reviews: 181, url: "https://www.google.com/maps/search/?api=1&query=L'ATELIER%20%2F%20PRAIA&query_place_id=ChIJifjh7g6ZNQkRtnI2Riz6urk", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.8, reviews: 31, url: "https://www.tripadvisor.com/Restaurant_Review-g293775-d21140493-Reviews-L_Atelier-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-12",
    website: "https://www.facebook.com/L-atelier-Chez-Bruno-Queijo-Praia-108078627429700/",
    phone: "+238 586 20 65",
    validatedAt: "2026-10-30",
  },
  {
    id: "dragoeiro",
    destinationId: "praia",
    category: "onde-comer",
    name: "Churrasqueira Dragoeiro",
    zone: { pt: "Achada Santo António", en: "Achada Santo António" },
    bestFor: { pt: "Comer bem sem gastar muito", en: "Eating well on a budget" },
    why: { pt: "Churrasqueira de cozinha cabo-verdiana, económica e muito avaliada.", en: "A Cape Verdean grill, affordable and heavily reviewed." },
    priceBand: 1,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.2, reviews: 874, url: "https://www.google.com/maps/search/?api=1&query=Restaurante%20Churrasqueira%20Dragoeiro&query_place_id=ChIJRTnSNfeYNQkRplgUiHFUmUs", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.1, reviews: 71, url: "https://www.tripadvisor.com/Restaurant_Review-g293775-d9869047-Reviews-Churrasqueira_Dragoeira-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-24",
    phone: "+238 262 47 67",
    validatedAt: "2026-10-30",
  },
  {
    id: "tambake",
    destinationId: "praia",
    category: "onde-comer",
    name: "Restaurante Tambake",
    zone: { pt: "Palmarejo", en: "Palmarejo" },
    bestFor: { pt: "Comida vegana", en: "Vegan food" },
    why: { pt: "Restaurante vegano com notas muito altas e preço acessível.", en: "A vegan restaurant with very high scores and affordable prices." },
    priceBand: 1,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.7, reviews: 131, url: "https://www.google.com/maps/search/?api=1&query=Restaurante%20Tambake&query_place_id=ChIJX7yI1riZNQkRjq8ufveGv9g", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.9, reviews: 10, url: "https://www.tripadvisor.com/Restaurant_Review-g293775-d17689059-Reviews-Tambake-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-05",
    phone: "+238 356 00 27",
    validatedAt: "2026-10-30",
  },
  {
    id: "lotus-cafe",
    destinationId: "praia",
    category: "onde-comer",
    name: "Restaurante Lótus Café",
    zone: { pt: "Achada Santo António", en: "Achada Santo António" },
    bestFor: { pt: "Uma refeição em Achada Santo António", en: "A meal in Achada Santo António" },
    why: { pt: "Muitas avaliações no Google, com nota alta nessa fonte.", en: "Many Google reviews, with a high score on that source." },
    priceBand: 2,
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.4, reviews: 365, url: "https://www.google.com/maps/search/?api=1&query=Restaurante%20L%C3%B3tus%20Caf%C3%A9&query_place_id=ChIJK0qdDPCYNQkRCWJENTRkH8Q", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.0, reviews: 15, url: "https://www.tripadvisor.com/Restaurant_Review-g293775-d20324558-Reviews-Lotus_Cafe_Restaurante-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-29",
    website: "https://www.facebook.com/lotuscaferestaurante/",
    phone: "+238 262 15 16",
    validatedAt: "2026-10-30",
  },
  {
    id: "fortaleza-sao-filipe",
    destinationId: "praia",
    category: "o-que-fazer",
    name: "Fortaleza Real de São Filipe",
    zone: { pt: "Cidade Velha", en: "Cidade Velha" },
    bestFor: { pt: "Quem se interessa por história", en: "History lovers" },
    why: { pt: "Fortaleza na Cidade Velha, Património Mundial da UNESCO, muito perto da Praia.", en: "A fortress in Cidade Velha, a UNESCO World Heritage Site, close to Praia." },
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.4, reviews: 1016, url: "https://www.google.com/maps/search/?api=1&query=Fortaleza%20Real%20de%20S%C3%A3o%20Filipe&query_place_id=ChIJ29cs2guXNQkRJVWoBIg725E", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-29",
    phone: "+238 594 78 24",
    validatedAt: "2026-10-30",
  },
  {
    id: "quebra-canela",
    destinationId: "praia",
    category: "o-que-fazer",
    name: "Praia de Quebra Canela",
    zone: { pt: "Quebra Canela", en: "Quebra Canela" },
    bestFor: { pt: "Um dia de praia na cidade", en: "A beach day in the city" },
    why: { pt: "A praia urbana com melhor nota nas fontes consultadas.", en: "The best-rated city beach on the sources we checked." },
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.5, reviews: 431, url: "https://www.google.com/maps/search/?api=1&query=Quebra%20Canela&query_place_id=ChIJx2PQufOYNQkRMlVyqt_vxq4", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.0, reviews: 111, url: "https://www.tripadvisor.com/Attraction_Review-g293775-d8609351-Reviews-Quebra_Canela_Beach-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-24",
    publicPlace: true,
    validatedAt: "2026-10-30",
  },
  {
    id: "farol-maria-pia",
    destinationId: "praia",
    category: "o-que-fazer",
    name: "Farol Dona Maria Pia",
    zone: { pt: "Praia", en: "Praia" },
    bestFor: { pt: "Uma visita curta com vista para o mar", en: "A short visit with sea views" },
    why: { pt: "Farol histórico, bem avaliado nas duas fontes.", en: "A historic lighthouse, well rated on both sources." },
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.4, reviews: 307, url: "https://www.google.com/maps/search/?api=1&query=Farol%20Dona%20Maria%20Pia&query_place_id=ChIJDXb_M5OYNQkRCcVyzq516bo", checkedAt: "2026-10-30" },
      { source: "Tripadvisor", score: 4.0, reviews: 200, url: "https://www.tripadvisor.com/Attraction_Review-g293775-d8596331-Reviews-Farol_de_D_Maria_Pia-Praia_Santiago.html", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-27",
    website: "http://www.ipc.cv/",
    phone: "+238 262 33 85",
    validatedAt: "2026-10-30",
  },
  {
    id: "bu-country-tours",
    destinationId: "praia",
    category: "o-que-fazer",
    name: "Bu Country Tours",
    zone: { pt: "Santiago", en: "Santiago" },
    bestFor: { pt: "Passeios guiados em Santiago", en: "Guided tours on Santiago" },
    why: { pt: "O operador com mais avaliações entre os consultados, com nota alta.", en: "The most-reviewed operator we checked, with a high score." },
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.7, reviews: 109, url: "https://www.google.com/maps/search/?api=1&query=Bu%20Country%20Tours&query_place_id=ChIJtUVTtjiZNQkRI3G2vHTb1Q4", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-23",
    website: "http://www.bucountrytours.com/",
    phone: "+238 923 57 28",
    validatedAt: "2026-10-30",
  },
  {
    id: "kapverden-tours",
    destinationId: "praia",
    category: "o-que-fazer",
    name: "Kapverden Tours",
    zone: { pt: "Junto ao mercado de Sucupira", en: "Next to Sucupira market" },
    bestFor: { pt: "Passeios organizados a partir da Praia", en: "Organised tours from Praia" },
    why: { pt: "Operador turístico com nota alta e pelo menos 50 avaliações.", en: "A tour operator with a high score and at least 50 reviews." },
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.8, reviews: 50, url: "https://www.google.com/maps/search/?api=1&query=Kapverden%20Tours&query_place_id=ChIJvUgP0wmZNQkRufoIPXIZ0KI", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-14",
    website: "https://www.kapverden-tours.com/",
    phone: "+238 986 71 16",
    validatedAt: "2026-10-30",
  },
  {
    id: "praiatur",
    destinationId: "praia",
    category: "o-que-fazer",
    name: "Praiatur",
    zone: { pt: "Platô", en: "Plateau" },
    bestFor: { pt: "Tratar da viagem com uma agência local", en: "Arranging your trip with a local agency" },
    why: { pt: "Agência de viagens e turismo no centro histórico.", en: "A travel agency in the historic centre." },
    tags: [],
    ratings: [
      { source: "Google Maps", score: 4.3, reviews: 69, url: "https://www.google.com/maps/search/?api=1&query=Praiatur%20Agencia%20de%20Viagens%20e%20Turismo&query_place_id=ChIJjdcUdEaZNQkRsY_8O45HNaA", checkedAt: "2026-10-30" },
    ],
    lastReviewAt: "2026-10-13",
    website: "http://www.praiaturcaboverde.com/",
    phone: "+238 261 57 46",
    validatedAt: "2026-10-30",
  },
];

export const LUANDA_UPDATED_AT = "2026-10-30";

export const luandaFacts: Fact[] = [
  {
    id: "voos",
    label: { pt: "Voos", en: "Flights" },
    value: {
      pt: "O primeiro voo da TAAG de Luanda para a Praia é a 12 de Dezembro de 2026. Estão anunciados dois voos por semana: de Luanda às segundas e aos sábados, da Praia às terças e aos domingos. A campanha da TAAG indica voos de ida e volta a partir de 793.205 AOA. Confirma o preço, as condições e o itinerário, incluindo eventuais escalas, ao reservar.",
      en: "TAAG's first flight from Luanda to Praia is on 12 December 2026. Two flights a week have been announced: from Luanda on Mondays and Saturdays, from Praia on Tuesdays and Sundays. TAAG's campaign shows return fares from 793,205 AOA. Check the price, conditions and itinerary, including any stops, when you book.",
    },
    sourceUrl: "https://www.verangola.net/va/pt/102026/Transportes/50571/TAAG-abre-venda-de-bilhetes-para-rota-Luanda-Cidade-da-Praia-que-arranca-em-Dezembro-com-dois-voos-por-semana.htm",
    checkedAt: "2026-10-30",
    official: true,
  },
  {
    id: "visto",
    label: { pt: "Visto", en: "Visa" },
    value: {
      pt: "A página da Embaixada de Cabo Verde em Angola indica que os cidadãos angolanos estão isentos de visto em estadas até 30 dias. Para ficar mais tempo, é preciso comunicá-lo à Direcção de Emigração e Fronteiras.",
      en: "The Cape Verde Embassy in Angola's page says Angolan citizens are visa-exempt for stays of up to 30 days. To stay longer, you must notify the Immigration and Borders Directorate.",
    },
    sourceUrl: "https://embaixada-de-cabo-verde-em-angola.odoo.com/pedidodevisto",
    checkedAt: "2026-10-30",
    official: false,
  },
  {
    id: "ease",
    label: { pt: "Registo e taxa à chegada", en: "Registration and arrival fee" },
    value: {
      pt: "Faz o pré-registo em ease.gov.cv, se possível até 5 dias antes da viagem, e paga a taxa de segurança aeroportuária (TSA) de 3.400 escudos. Crianças com menos de 2 anos estão isentas.",
      en: "Pre-register at ease.gov.cv, ideally up to 5 days before you travel, and pay the 3,400-escudo airport security fee (TSA). Children under 2 are exempt.",
    },
    sourceUrl: "https://www.visit-caboverde.com/planear-viagem/visto-e-imigracao",
    checkedAt: "2026-10-30",
    official: true,
  },
  {
    id: "moeda",
    label: { pt: "Moeda", en: "Currency" },
    value: {
      pt: "A moeda é o escudo de Cabo Verde (CVE). O Banco de Cabo Verde indica 110,265 escudos por euro. Nas casas de câmbio e nos bancos, a taxa que recebes pode ser diferente.",
      en: "The currency is the Cape Verdean escudo (CVE). The Bank of Cape Verde lists 110.265 escudos per euro. The rate you get at exchange offices and banks may differ.",
    },
    sourceUrl: "https://www.bcv.cv/pt",
    checkedAt: "2026-10-30",
    official: true,
  },
  {
    id: "epoca",
    label: { pt: "Quando ir", en: "When to go" },
    value: {
      pt: "As chuvas são irregulares e concentram-se sobretudo entre Agosto e Outubro. De Novembro a Junho, a probabilidade de chuva é menor.",
      en: "Rain is irregular and mostly falls between August and October. From November to June, rain is less likely.",
    },
    sourceUrl: "https://www.onde-e-quando.net/when/africa/cabo-verde/ilha-de-santiago/",
    checkedAt: "2026-10-30",
    official: false,
  },
];

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
  const minSources = place.category === "o-que-fazer" ? 1 : MIN_SOURCES;
  if (place.ratings.length < minSources) errors.push(`precisa de ${minSources} fonte(s)`);
  if (place.ratings.some((r) => r.score < MIN_SCORE)) errors.push("nota abaixo de 4,0");
  const minReviews = place.lowReviewCategory ? MIN_REVIEWS_LOW : MIN_REVIEWS;
  if ((place.ratings[0]?.reviews ?? 0) < minReviews) errors.push(`menos de ${minReviews} reviews`);
  if (isOlderThan(place.lastReviewAt, PLACE_MAX_AGE_MONTHS, today)) errors.push("sem reviews nos últimos 12 meses");
  const exemptFromContact = place.publicPlace && place.category === "o-que-fazer";
  if (!exemptFromContact && !place.website && !place.bookingUrl && !place.phone) errors.push("sem contacto");
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

export function guideAllPaths(from: Place[] = places): { path: string; lastModified: string }[] {
  return [
    { path: "/guia/como-escolhemos", lastModified: METHOD_UPDATED_AT },
    { path: "/guia/luanda-praia", lastModified: LUANDA_UPDATED_AT },
    ...guidePaths(from),
  ];
}
