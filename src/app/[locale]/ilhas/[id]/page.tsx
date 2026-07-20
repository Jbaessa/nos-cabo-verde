import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { islands, localizeIsland } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IslandDetail } from "@/components/IslandDetail";
import { StructuredData } from "@/components/seo/StructuredData";

const BASE = "https://noscaboverde.cv";

export function generateStaticParams() {
  return islands.flatMap((island) => [
    { locale: "pt", id: island.id },
    { locale: "en", id: island.id },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const raw = islands.find((i) => i.id === id);
  if (!raw) return {};
  const island = localizeIsland(raw, locale);
  const isEn = locale === "en";

  const title = isEn
    ? `${island.name}, Cape Verde: what to visit, beaches, culture and itinerary`
    : `${island.name}, Cabo Verde: o que visitar, praias, cultura e roteiro`;
  const description = isEn
    ? `Discover ${island.name}: ${island.description} ${island.highlights.map((h) => h.name).join(", ")} and much more.`
    : `Descobre ${island.name}: ${island.description} ${island.highlights.map((h) => h.name).join(", ")} e muito mais.`;
  const imageUrl = island.image.startsWith("http") ? island.image : `${BASE}${island.image}`;
  const url = `${isEn ? `${BASE}/en` : BASE}/ilhas/${island.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { pt: `${BASE}/ilhas/${island.id}`, en: `${BASE}/en/ilhas/${island.id}` },
    },
    openGraph: {
      title: isEn ? `${island.name} — Discover Cape Verde` : `${island.name} — Descobrir Cabo Verde`,
      description: island.description,
      url,
      type: "article",
      locale: isEn ? "en_GB" : "pt_CV",
      siteName: "Nós Cabo Verde",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${island.name}, Cape Verde` }],
    },
    twitter: { card: "summary_large_image", title, description: island.description, images: [imageUrl] },
  };
}

export default async function IslandPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const isEn = locale === "en";
  const index = islands.findIndex((i) => i.id === id);
  if (index === -1) notFound();

  const island = localizeIsland(islands[index], locale);
  const prev = localizeIsland(islands[(index - 1 + islands.length) % islands.length], locale);
  const next = localizeIsland(islands[(index + 1) % islands.length], locale);
  const imageUrl = island.image.startsWith("http") ? island.image : `${BASE}${island.image}`;
  const url = `${isEn ? `${BASE}/en` : BASE}/ilhas/${island.id}`;

  const touristAttractionJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": url,
    name: `${island.name}, Cape Verde`,
    description: island.description,
    url,
    image: imageUrl,
    touristType: island.highlights.map((h) => ({ "@type": "Audience", audienceType: h.name })),
    geo: { "@type": "GeoCoordinates", addressCountry: "CV" },
    containedInPlace: { "@type": "Country", name: "Cabo Verde" },
    isPartOf: { "@id": `${BASE}/#website` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Início", item: isEn ? `${BASE}/en` : BASE },
      { "@type": "ListItem", position: 2, name: isEn ? "Islands" : "As Ilhas", item: `${isEn ? `${BASE}/en` : BASE}/ilhas` },
      { "@type": "ListItem", position: 3, name: island.name, item: url },
    ],
  };

  return (
    <>
      <StructuredData data={touristAttractionJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <Navbar />
      <main>
        <IslandDetail island={island} prev={prev} next={next} index={index} locale={locale} />
      </main>
      <Footer />
    </>
  );
}
