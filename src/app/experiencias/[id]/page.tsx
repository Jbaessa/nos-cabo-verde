import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { experiences } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExperienceDetailClient } from "@/components/ExperienceDetailClient";
import { StructuredData } from "@/components/seo/StructuredData";

const BASE = "https://noscaboverde.cv";

export function generateStaticParams() {
  return experiences.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const exp = experiences.find((e) => e.id === id);
  if (!exp) return {};

  const title = `${exp.title}: experiência em ${exp.island}, Cabo Verde`;
  const description = exp.description.length > 155
    ? exp.description.slice(0, 152) + "..."
    : exp.description;
  const imageUrl = exp.image.startsWith("http") ? exp.image : `${BASE}${exp.image}`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE}/experiencias/${exp.id}` },
    openGraph: {
      title: `${exp.title} — ${exp.island}`,
      description: exp.description,
      url: `${BASE}/experiencias/${exp.id}`,
      type: "article",
      locale: "pt_CV",
      siteName: "Nós Cabo Verde",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: exp.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${exp.title} — ${exp.island}`,
      description: exp.description,
      images: [imageUrl],
    },
  };
}

export default async function ExperienciaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = experiences.find((e) => e.id === id);
  if (!experience) notFound();

  const related = experiences
    .filter(
      (e) =>
        e.id !== id &&
        (e.category === experience.category || e.islandId === experience.islandId)
    )
    .slice(0, 3);

  const imageUrl = experience.image.startsWith("http")
    ? experience.image
    : `${BASE}${experience.image}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE}/experiencias/${experience.id}`,
    name: experience.title,
    description: experience.description,
    image: imageUrl,
    url: `${BASE}/experiencias/${experience.id}`,
    offers: {
      "@type": "Offer",
      price: experience.price,
      priceCurrency: "EUR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${BASE}/experiencias/${experience.id}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: experience.rating,
      bestRating: 5,
      ratingCount: 24,
    },
    brand: {
      "@type": "Organization",
      name: "Nós Cabo Verde",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: BASE },
      { "@type": "ListItem", position: 2, name: "Experiências", item: `${BASE}/experiencias` },
      { "@type": "ListItem", position: 3, name: experience.title, item: `${BASE}/experiencias/${experience.id}` },
    ],
  };

  return (
    <>
      <StructuredData data={productJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <Navbar />
      <ExperienceDetailClient experience={experience} related={related} />
      <Footer />
    </>
  );
}
