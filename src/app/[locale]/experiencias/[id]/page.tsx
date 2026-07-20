import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { experiences } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExperienceDetailClient } from "@/components/ExperienceDetailClient";
import { StructuredData } from "@/components/seo/StructuredData";

const BASE = "https://noscaboverde.cv";

export function generateStaticParams() {
  return experiences.flatMap((e) => [
    { locale: "pt", id: e.id },
    { locale: "en", id: e.id },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const exp = experiences.find((e) => e.id === id);
  if (!exp) return {};
  const isEn = locale === "en";

  const title = isEn
    ? `${exp.title}: experience in ${exp.island}, Cape Verde`
    : `${exp.title}: experiência em ${exp.island}, Cabo Verde`;
  const description = exp.description.length > 155 ? exp.description.slice(0, 152) + "..." : exp.description;
  const imageUrl = exp.image.startsWith("http") ? exp.image : `${BASE}${exp.image}`;
  const url = `${isEn ? `${BASE}/en` : BASE}/experiencias/${exp.id}`;

  return {
    title,
    description,
    alternates: { canonical: url, languages: { pt: `${BASE}/experiencias/${exp.id}`, en: `${BASE}/en/experiencias/${exp.id}` } },
    openGraph: { title: `${exp.title} — ${exp.island}`, description: exp.description, url, type: "article", locale: isEn ? "en_GB" : "pt_CV", siteName: "Nós Cabo Verde", images: [{ url: imageUrl, width: 1200, height: 630, alt: exp.title }] },
    twitter: { card: "summary_large_image", title: `${exp.title} — ${exp.island}`, description: exp.description, images: [imageUrl] },
  };
}

export default async function ExperienciaDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const isEn = locale === "en";
  const experience = experiences.find((e) => e.id === id);
  if (!experience) notFound();

  const related = experiences.filter((e) => e.id !== id && (e.category === experience.category || e.islandId === experience.islandId)).slice(0, 3);
  const imageUrl = experience.image.startsWith("http") ? experience.image : `${BASE}${experience.image}`;
  const url = `${isEn ? `${BASE}/en` : BASE}/experiencias/${experience.id}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": url,
    name: experience.title,
    description: experience.description,
    image: imageUrl,
    url,
    offers: { "@type": "Offer", price: experience.price, priceCurrency: "EUR", priceValidUntil: "2027-12-31", availability: "https://schema.org/InStock", url },
    aggregateRating: { "@type": "AggregateRating", ratingValue: experience.rating, bestRating: 5, ratingCount: 24 },
    brand: { "@type": "Organization", name: "Nós Cabo Verde" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Início", item: isEn ? `${BASE}/en` : BASE },
      { "@type": "ListItem", position: 2, name: isEn ? "Experiences" : "Experiências", item: `${isEn ? `${BASE}/en` : BASE}/experiencias` },
      { "@type": "ListItem", position: 3, name: experience.title, item: url },
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
