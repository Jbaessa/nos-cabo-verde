import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { IslandsSection } from "@/components/IslandsSection";
import { EditorialSection } from "@/components/EditorialSection";
import { MundialSection } from "@/components/MundialSection";
import { CultureSection } from "@/components/CultureSection";
import { FacesSection } from "@/components/FacesSection";
import { FlavorsSection } from "@/components/FlavorsSection";
import { MusicSection } from "@/components/MusicSection";
import { AgendaSection } from "@/components/AgendaSection";
import { DiasporaSection } from "@/components/DiasporaSection";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/seo/StructuredData";
import { islands } from "@/lib/data";

const BASE = "https://noscaboverde.cv";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isEn = locale === "en";
  const url = isEn ? `${BASE}/en` : BASE;

  return {
    title: t("homeTitle"),
    description: t("homeDesc"),
    alternates: {
      canonical: url,
      languages: { pt: BASE, en: `${BASE}/en` },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDesc"),
      url,
      type: "website",
      locale: isEn ? "en_GB" : "pt_CV",
      siteName: "Nós Cabo Verde",
    },
    twitter: { card: "summary_large_image", title: t("homeTitle"), description: t("homeDesc") },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = isEn ? `${BASE}/en` : BASE;

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: isEn ? "Nós Cabo Verde — Ten islands. One people. One soul." : "Nós Cabo Verde — Dez ilhas. Um povo. Uma alma.",
    description: isEn
      ? "Digital portal of Cape Verdean culture, beauty and identity."
      : "Portal digital da cultura, beleza e identidade cabo-verdiana.",
    isPartOf: { "@id": `${BASE}/#website` },
    about: { "@type": "Country", name: "Cabo Verde", sameAs: "https://www.wikidata.org/wiki/Q1011" },
    mainEntity: {
      "@type": "ItemList",
      name: isEn ? "Islands of Cape Verde" : "Ilhas de Cabo Verde",
      numberOfItems: 10,
      itemListElement: islands.map((island, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: island.name,
      })),
    },
  };

  return (
    <>
      <StructuredData data={webPageJsonLd} />
      <Navbar />
      <main>
        <HeroSection />
        <IslandsSection />
        <EditorialSection />
        <MundialSection />
        <CultureSection />
        <FacesSection />
        <FlavorsSection />
        <MusicSection />
        <AgendaSection />
        <DiasporaSection />
      </main>
      <Footer />
    </>
  );
}
