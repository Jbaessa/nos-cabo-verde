import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { islands } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IslandDetail } from "@/components/IslandDetail";
import { StructuredData } from "@/components/seo/StructuredData";

const BASE = "https://noscaboverde.cv";

export function generateStaticParams() {
  return islands.map((island) => ({ id: island.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const island = islands.find((i) => i.id === id);
  if (!island) return {};

  const title = `${island.name}, Cabo Verde: o que visitar, praias, cultura e roteiro`;
  const description = `Descobre ${island.name}: ${island.description} ${island.highlights.join(", ")} e muito mais. Roteiro completo para visitar ${island.name}.`;
  const imageUrl = island.image.startsWith("http") ? island.image : `${BASE}${island.image}`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE}/ilhas/${island.id}` },
    openGraph: {
      title: `${island.name} — Descobrir Cabo Verde`,
      description: island.description,
      url: `${BASE}/ilhas/${island.id}`,
      type: "article",
      locale: "pt_CV",
      siteName: "Nós Cabo Verde",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `Vista de ${island.name}, Cabo Verde` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${island.name} — Descobrir Cabo Verde`,
      description: island.description,
      images: [imageUrl],
    },
  };
}

export default async function IslandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = islands.findIndex((i) => i.id === id);
  if (index === -1) notFound();

  const island = islands[index];
  const prev = islands[(index - 1 + islands.length) % islands.length];
  const next = islands[(index + 1) % islands.length];

  const imageUrl = island.image.startsWith("http") ? island.image : `${BASE}${island.image}`;

  const touristAttractionJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `${BASE}/ilhas/${island.id}`,
    name: `${island.name}, Cabo Verde`,
    description: island.description,
    url: `${BASE}/ilhas/${island.id}`,
    image: imageUrl,
    touristType: island.highlights.map((h) => ({ "@type": "Audience", audienceType: h })),
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "CV",
    },
    containedInPlace: {
      "@type": "Country",
      name: "Cabo Verde",
    },
    isPartOf: {
      "@id": `${BASE}/#website`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: BASE },
      { "@type": "ListItem", position: 2, name: "As Ilhas", item: `${BASE}/ilhas` },
      { "@type": "ListItem", position: 3, name: island.name, item: `${BASE}/ilhas/${island.id}` },
    ],
  };

  return (
    <>
      <StructuredData data={touristAttractionJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <Navbar />
      <main>
        <IslandDetail island={island} prev={prev} next={next} index={index} />
      </main>
      <Footer />
    </>
  );
}
