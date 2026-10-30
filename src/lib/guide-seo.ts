import type { Metadata } from "next";
import type { Place } from "./guide";

const BASE = "https://noscaboverde.cv";
const BRAND = "Nós Cabo Verde";

export function guideUrl(path: string, locale: string): string {
  return `${locale === "en" ? `${BASE}/en` : BASE}${path}`;
}

export function guideAlternates(path: string, locale: string): Metadata["alternates"] {
  return {
    canonical: guideUrl(path, locale),
    languages: { pt: guideUrl(path, "pt"), en: guideUrl(path, "en") },
  };
}

export function guideArticleJsonLd({
  title,
  description,
  path,
  locale,
  updatedAt,
}: {
  title: string;
  description: string;
  path: string;
  locale: string;
  updatedAt: string;
}): Record<string, unknown> {
  const url = guideUrl(path, locale);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    headline: title,
    description,
    url,
    inLanguage: locale,
    dateModified: updatedAt,
    author: { "@type": "Organization", name: BRAND, url: BASE },
    publisher: { "@id": `${BASE}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": `${BASE}/#website` },
  };
}

export function placesItemListJsonLd(places: Place[], locale: string): Record<string, unknown> {
  const lang = locale === "en" ? "en" : "pt";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: places.map((place, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Place",
        name: place.name,
        description: place.why[lang],
        ...(place.website ? { url: place.website } : {}),
      },
    })),
  };
}
