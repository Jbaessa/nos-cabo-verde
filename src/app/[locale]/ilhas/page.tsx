import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getLocalizedIslands } from "@/lib/data";
import { BARLAVENTO, SOTAVENTO } from "@/lib/island-groups";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/seo/StructuredData";

const BASE = "https://noscaboverde.cv";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isEn = locale === "en";
  const url = isEn ? `${BASE}/en/ilhas` : `${BASE}/ilhas`;

  return {
    title: t("islandsTitle"),
    description: t("islandsDesc"),
    alternates: { canonical: url, languages: { pt: `${BASE}/ilhas`, en: `${BASE}/en/ilhas` } },
    openGraph: { title: t("islandsTitle"), description: t("islandsDesc"), url, type: "website", locale: isEn ? "en_GB" : "pt_CV", siteName: "Nós Cabo Verde" },
    twitter: { card: "summary_large_image", title: t("islandsTitle"), description: t("islandsDesc") },
  };
}

function IslandCard({ id, number, locale }: { id: string; number: number; locale: string }) {
  const islands = getLocalizedIslands(locale);
  const island = islands.find((i) => i.id === id);
  if (!island) return null;

  return (
    <Link href={locale === "en" ? `/en/ilhas/${island.id}` : `/ilhas/${island.id}`} className="group block">
      <div className="relative h-72 overflow-hidden rounded-2xl mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={island.image} alt={`${island.name}, ${locale === "en" ? "Cape Verde" : "Cabo Verde"} — ${island.tagline}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/20 to-transparent" />
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ncv-night/60 backdrop-blur-sm border border-ncv-gold/25 flex items-center justify-center">
          <span className="text-ncv-gold text-xs font-sans">{number}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="text-white text-xs font-sans">{island.temperature}</span>
          <span className="text-ncv-gold/70 text-xs font-sans">{island.duration}</span>
        </div>
      </div>
      <h2 className="font-serif text-2xl text-white group-hover:text-ncv-gold transition-colors">{island.name}</h2>
      <p className="text-white/40 text-sm font-sans italic mt-1">{island.tagline}</p>
    </Link>
  );
}

export default async function IslandsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "islandsPage" });
  const ti = await getTranslations({ locale, namespace: "islands" });
  const islands = getLocalizedIslands(locale);
  const isEn = locale === "en";
  const url = isEn ? `${BASE}/en/ilhas` : `${BASE}/ilhas`;

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    name: isEn ? "The Ten Islands of Cape Verde" : "As Dez Ilhas de Cabo Verde",
    description: isEn ? "Complete guide to the ten islands of the Cape Verde archipelago." : "Guia completo das dez ilhas do arquipélago de Cabo Verde.",
    url,
    isPartOf: { "@id": `${BASE}/#website` },
    hasPart: islands.map((island) => ({ "@type": "TouristDestination", name: island.name, url: `${isEn ? `${BASE}/en` : BASE}/ilhas/${island.id}`, description: island.description })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Início", item: isEn ? `${BASE}/en` : BASE },
      { "@type": "ListItem", position: 2, name: isEn ? "Islands" : "As Ilhas", item: url },
    ],
  };

  return (
    <>
      <StructuredData data={collectionPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <Navbar />
      <main className="bg-ncv-night min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-ncv-gold" />
              <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">{t("sectionTag")}</span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-4">
              {t("title")} <span className="text-ncv-gold">{t("titleHighlight")}</span>
            </h1>
            <p className="text-white/40 text-base font-sans max-w-lg">{t("subtitle")}</p>
          </div>

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-ncv-gold/40" />
              <span className="text-ncv-gold/70 text-xs font-sans tracking-[0.25em] uppercase">{ti("barlavento")}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {BARLAVENTO.map((id, i) => <IslandCard key={id} id={id} number={i + 1} locale={locale} />)}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-ncv-gold/40" />
              <span className="text-ncv-gold/70 text-xs font-sans tracking-[0.25em] uppercase">{ti("sotavento")}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {SOTAVENTO.map((id, i) => <IslandCard key={id} id={id} number={i + 7} locale={locale} />)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
