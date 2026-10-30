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

export function guideMetadata({
  title,
  description,
  path,
  locale,
  image,
}: {
  title: string;
  description: string;
  path: string;
  locale: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  return {
    title,
    description,
    alternates: guideAlternates(path, locale),
    openGraph: {
      title,
      description,
      url: guideUrl(path, locale),
      type: "article",
      siteName: BRAND,
      locale: locale === "en" ? "en_GB" : "pt_CV",
      ...(image ? { images: [image] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image.url] } : {}) },
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
