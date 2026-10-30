import { describe, expect, it } from "vitest";
import { guideAlternates, guideArticleJsonLd, guideMetadata, placesItemListJsonLd } from "./guide-seo";
import type { Place } from "./guide";

const place: Place = {
  id: "h",
  destinationId: "praia",
  category: "onde-ficar",
  name: "Hotel",
  zone: { pt: "Platô", en: "Plateau" },
  bestFor: { pt: "Casais", en: "Couples" },
  why: { pt: "Bom", en: "Good" },
  priceBand: 2,
  tags: [],
  ratings: [{ source: "Google", score: 4.5, reviews: 100, url: "https://a.example", checkedAt: "2026-10-30" }],
  lastReviewAt: "2026-10-01",
  website: "https://h.example",
  validatedAt: "2026-10-31",
};

describe("guideAlternates", () => {
  it("builds the English canonical with the locale prefix", () => {
    expect(guideAlternates("/guia/praia/onde-ficar", "en")?.canonical).toBe(
      "https://noscaboverde.cv/en/guia/praia/onde-ficar",
    );
  });

  it("builds the Portuguese alternate without a prefix", () => {
    expect(guideAlternates("/guia/praia/onde-ficar", "en")?.languages).toEqual({
      pt: "https://noscaboverde.cv/guia/praia/onde-ficar",
      en: "https://noscaboverde.cv/en/guia/praia/onde-ficar",
    });
  });
});

describe("guideArticleJsonLd", () => {
  it("is signed by the brand", () => {
    const ld = guideArticleJsonLd({ title: "T", description: "D", path: "/guia/praia", locale: "pt", updatedAt: "2026-10-31" });
    expect((ld.author as { name: string }).name).toBe("Nós Cabo Verde");
    expect(ld.dateModified).toBe("2026-10-31");
  });
});

describe("placesItemListJsonLd", () => {
  it("lists places in English without third-party ratings", () => {
    const ld = placesItemListJsonLd([place], "en");
    const json = JSON.stringify(ld);
    expect(json).toContain("Hotel");
    expect(json).not.toContain("aggregateRating");
    expect(json).not.toContain("4.5");
  });
});

describe("guideMetadata", () => {
  const meta = guideMetadata({ title: "T", description: "D", path: "/guia/praia", locale: "en" });

  it("shares the page itself, not the home page", () => {
    expect(meta.openGraph?.title).toBe("T");
    expect(meta.openGraph?.url).toBe("https://noscaboverde.cv/en/guia/praia");
    expect(meta.twitter?.title).toBe("T");
    expect(meta.twitter?.description).toBe("D");
  });
});
