import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { diasporaCommunities } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommunityDetail } from "@/components/CommunityDetail";
import { StructuredData } from "@/components/seo/StructuredData";

const BASE = "https://noscaboverde.cv";

export function generateStaticParams() {
  return diasporaCommunities.flatMap((c) => [
    { locale: "pt", id: c.id },
    { locale: "en", id: c.id },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const community = diasporaCommunities.find((c) => c.id === id);
  if (!community) return {};
  const isEn = locale === "en";

  const title = isEn
    ? `Cape Verdeans in ${community.country}: diaspora community · Nós Cabo Verde`
    : `Cabo-Verdianos em ${community.country}: comunidade da diáspora · Nós Cabo Verde`;
  const description = community.description.length > 155
    ? community.description.slice(0, 152) + "..."
    : community.description;
  const url = `${isEn ? `${BASE}/en` : BASE}/diaspora/${community.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        pt: `${BASE}/diaspora/${community.id}`,
        en: `${BASE}/en/diaspora/${community.id}`,
      },
    },
    openGraph: {
      title: isEn
        ? `${community.country} ${community.flag} — Cape Verdean Diaspora`
        : `${community.country} ${community.flag} — Diáspora Cabo-Verdiana`,
      description: community.highlight,
      url,
      type: "article",
      locale: isEn ? "en_GB" : "pt_CV",
      siteName: "Nós Cabo Verde",
      images: [{ url: community.image, width: 1200, height: 630, alt: `${community.country} — Diáspora Cabo-Verdiana` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: community.highlight,
      images: [community.image],
    },
  };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const isEn = locale === "en";
  const index = diasporaCommunities.findIndex((c) => c.id === id);
  if (index === -1) notFound();

  const community = diasporaCommunities[index];
  const prev = diasporaCommunities[(index - 1 + diasporaCommunities.length) % diasporaCommunities.length];
  const next = diasporaCommunities[(index + 1) % diasporaCommunities.length];
  const url = `${isEn ? `${BASE}/en` : BASE}/diaspora/${community.id}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    headline: isEn
      ? `Cape Verdeans in ${community.country}: ${community.population} people`
      : `Cabo-Verdianos em ${community.country}: ${community.population} pessoas`,
    description: community.description,
    image: community.image,
    url,
    isPartOf: { "@id": `${BASE}/#website` },
    about: {
      "@type": "Country",
      name: community.country,
    },
    mentions: community.islandRoots.map((island) => ({
      "@type": "Place",
      name: `${island}, Cabo Verde`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Início", item: isEn ? `${BASE}/en` : BASE },
      { "@type": "ListItem", position: 2, name: isEn ? "Diaspora" : "Diáspora", item: `${isEn ? `${BASE}/en` : BASE}/diaspora` },
      { "@type": "ListItem", position: 3, name: `${community.flag} ${community.country}`, item: url },
    ],
  };

  return (
    <>
      <StructuredData data={articleJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <Navbar />
      <main>
        <CommunityDetail community={community} prev={prev} next={next} index={index} />
      </main>
      <Footer />
    </>
  );
}
