import { describe, expect, it } from "vitest";
import {
  destinations,
  getCategory,
  getPublishedCategories,
  getPublishedPlaces,
  guidePaths,
  luandaFacts,
  places,
  validateFact,
  validatePlace,
  type Fact,
  type Place,
} from "./guide";

const today = new Date("2026-11-01");

const place: Place = {
  id: "hotel-teste",
  category: "onde-ficar",
  destinationId: "praia",
  name: "Hotel Teste",
  zone: { pt: "Platô", en: "Plateau" },
  bestFor: { pt: "Casais", en: "Couples" },
  why: { pt: "Boa localização", en: "Good location" },
  priceBand: 2,
  tags: ["centro"],
  ratings: [
    { source: "Google Maps", score: 4.4, reviews: 120, url: "https://a.example", checkedAt: "2026-10-30" },
    { source: "Booking", score: 4.2, reviews: 80, url: "https://b.example", checkedAt: "2026-10-30" },
  ],
  lastReviewAt: "2026-09-01",
  website: "https://hotel.example",
  validatedAt: "2026-10-31",
};

const fact: Fact = {
  id: "voos",
  label: { pt: "Voos", en: "Flights" },
  value: { pt: "Dois por semana", en: "Twice a week" },
  sourceUrl: "https://taag.example",
  checkedAt: "2026-10-30",
  official: true,
};

describe("validatePlace", () => {
  it("accepts a place meeting the entry rule", () => {
    expect(validatePlace(place, today)).toEqual([]);
  });

  it.each<[string, Partial<Place>]>([
    ["only one source", { ratings: [place.ratings[0]] }],
    ["score below 4.0", { ratings: [{ ...place.ratings[0], score: 3.9 }, place.ratings[1]] }],
    ["49 reviews without the low-review flag", { ratings: [{ ...place.ratings[0], reviews: 49 }, place.ratings[1]] }],
    ["19 reviews with the low-review flag", { lowReviewCategory: true, ratings: [{ ...place.ratings[0], reviews: 19 }, place.ratings[1]] }],
    ["last review over 12 months old", { lastReviewAt: "2025-10-31" }],
    ["no website or booking link", { website: undefined, bookingUrl: undefined }],
    ["missing English text", { why: { pt: "Bom", en: "  " } }],
  ])("rejects %s", (_name, change) => {
    expect(validatePlace({ ...place, ...change }, today).length).toBeGreaterThan(0);
  });

  it("accepts 20 reviews with the low-review flag", () => {
    const low = { ...place, lowReviewCategory: true, ratings: [{ ...place.ratings[0], reviews: 20 }, place.ratings[1]] };
    expect(validatePlace(low, today)).toEqual([]);
  });
});

describe("validateFact", () => {
  it("accepts a recent sourced fact", () => {
    expect(validateFact(fact, today)).toEqual([]);
  });

  it("rejects a fact checked over 6 months ago", () => {
    expect(validateFact({ ...fact, checkedAt: "2026-04-30" }, today).length).toBeGreaterThan(0);
  });

  it("rejects a fact without a source", () => {
    expect(validateFact({ ...fact, sourceUrl: "" }, today).length).toBeGreaterThan(0);
  });
});

describe("publication", () => {
  const unvalidated: Place = { ...place, id: "por-validar", validatedAt: null };

  it("excludes places not validated", () => {
    expect(getPublishedPlaces("praia", "onde-ficar", [place, unvalidated]).map((p) => p.id)).toEqual(["hotel-teste"]);
  });

  it("returns no category when none is published", () => {
    expect(getCategory("praia", "onde-ficar", [unvalidated])).toBeUndefined();
  });

  it("returns no category for unknown ids", () => {
    expect(getCategory("praia", "nada", [place])).toBeUndefined();
    expect(getCategory("nada", "onde-ficar", [place])).toBeUndefined();
  });

  it("returns a category with its published places", () => {
    expect(getCategory("praia", "onde-ficar", [place, unvalidated])?.places).toHaveLength(1);
  });

  it("lists only categories with published places", () => {
    expect(getPublishedCategories("praia", [place])).toEqual(["onde-ficar"]);
  });

  it("omits empty categories and empty destinations from paths", () => {
    expect(guidePaths([])).toEqual([]);
    expect(guidePaths([place]).map((p) => p.path)).toEqual(["/guia/praia", "/guia/praia/onde-ficar"]);
  });

  it("dates paths by the latest validation", () => {
    expect(guidePaths([place])[1].lastModified).toBe("2026-10-31");
  });
});

describe("real data", () => {
  it("every place passes the entry rule", () => {
    for (const p of places) expect([p.id, validatePlace(p, new Date())]).toEqual([p.id, []]);
  });

  it("the Praia destination is defined", () => {
    expect(destinations.map((d) => d.id)).toContain("praia");
  });
});

describe("luandaFacts", () => {
  it("covers flights, visa, currency and season, and passes validation", () => {
    expect(luandaFacts.map((f) => f.id)).toEqual(expect.arrayContaining(["voos", "visto", "ease", "moeda", "epoca"]));
    for (const f of luandaFacts) expect([f.id, validateFact(f, new Date())]).toEqual([f.id, []]);
  });

  it("does not present flights as officially confirmed until TAAG confirms them", () => {
    expect(luandaFacts.find((f) => f.id === "voos")?.official).toBe(false);
  });
});
