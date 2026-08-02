import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ExperienciasClient } from "@/components/ExperienciasClient";
import { StructuredData } from "@/components/seo/StructuredData";
import { experiences } from "@/lib/data";

const BASE = "https://noscaboverde.cv";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isEn = locale === "en";
  const url = isEn ? `${BASE}/en/experiencias` : `${BASE}/experiencias`;

  return {
    title: t("experiencesTitle"),
    description: t("experiencesDesc"),
    alternates: {
      canonical: url,
      languages: {
        pt: `${BASE}/experiencias`,
        en: `${BASE}/en/experiencias`,
      },
    },
    openGraph: {
      title: t("experiencesTitle"),
      description: t("experiencesDesc"),
      url,
      type: "website",
      locale: isEn ? "en_GB" : "pt_CV",
      siteName: "Nós Cabo Verde",
    },
    twitter: {
      card: "summary_large_image",
      title: t("experiencesTitle"),
      description: t("experiencesDesc"),
    },
  };
}

export default async function ExperienciasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = isEn ? `${BASE}/en/experiencias` : `${BASE}/experiencias`;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    name: isEn
      ? "Authentic experiences in Cape Verde"
      : "Experiências autênticas em Cabo Verde",
    description: isEn
      ? `${experiences.length} curated experiences: trekking, kitesurfing, diving, gastronomy and culture.`
      : `${experiences.length} experiências curadas: trekking, kitesurf, mergulho, gastronomia e cultura.`,
    url,
    isPartOf: { "@id": `${BASE}/#website` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEn ? "Home" : "Início",
        item: isEn ? `${BASE}/en` : BASE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEn ? "Experiences" : "Experiências",
        item: url,
      },
    ],
  };

  return (
    <>
      <StructuredData data={collectionJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <ExperienciasClient />
    </>
  );
}
