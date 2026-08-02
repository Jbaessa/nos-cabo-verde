import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DiasporaClient } from "@/components/DiasporaClient";
import { StructuredData } from "@/components/seo/StructuredData";
import { diasporaCommunities } from "@/lib/data";

const BASE = "https://noscaboverde.cv";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isEn = locale === "en";
  const url = isEn ? `${BASE}/en/diaspora` : `${BASE}/diaspora`;

  return {
    title: t("diasporaTitle"),
    description: t("diasporaDesc"),
    alternates: {
      canonical: url,
      languages: {
        pt: `${BASE}/diaspora`,
        en: `${BASE}/en/diaspora`,
      },
    },
    openGraph: {
      title: t("diasporaTitle"),
      description: t("diasporaDesc"),
      url,
      type: "website",
      locale: isEn ? "en_GB" : "pt_CV",
      siteName: "Nós Cabo Verde",
    },
    twitter: {
      card: "summary_large_image",
      title: t("diasporaTitle"),
      description: t("diasporaDesc"),
    },
  };
}

export default async function DiasporaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = isEn ? `${BASE}/en/diaspora` : `${BASE}/diaspora`;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    name: isEn
      ? "Cape Verdean Diaspora: communities, stories and roots"
      : "Diáspora Cabo-Verdiana: comunidades, histórias e raízes",
    description: isEn
      ? `Discover the ${diasporaCommunities.length} Cape Verdean communities around the world.`
      : `Descobre as ${diasporaCommunities.length} comunidades cabo-verdianas espalhadas pelo mundo.`,
    url,
    isPartOf: { "@id": `${BASE}/#website` },
    hasPart: diasporaCommunities.map((c) => ({
      "@type": "Article",
      name: `${c.country} — Diáspora Cabo-Verdiana`,
      url: `${isEn ? `${BASE}/en` : BASE}/diaspora/${c.id}`,
    })),
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
        name: isEn ? "Diaspora" : "Diáspora",
        item: url,
      },
    ],
  };

  return (
    <>
      <StructuredData data={collectionJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <DiasporaClient />
    </>
  );
}
