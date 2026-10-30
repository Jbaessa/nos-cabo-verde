import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GuideNav } from "@/components/guide/GuideNav";
import { StructuredData } from "@/components/seo/StructuredData";
import { getDestination, getPublishedCategories, guidePaths } from "@/lib/guide";
import { guideArticleJsonLd, guideMetadata } from "@/lib/guide-seo";

type Params = Promise<{ locale: string; destino: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, destino } = await params;
  const destination = getDestination(destino);
  if (!destination || getPublishedCategories(destino).length === 0) return {};
  const lang = locale === "en" ? "en" : "pt";
  return guideMetadata({
    title: destination.title[lang],
    description: destination.intro[lang],
    path: `/guia/${destino}`,
    locale,
  });
}

export default async function GuideDestinationPage({ params }: { params: Params }) {
  const { locale, destino } = await params;
  const destination = getDestination(destino);
  const categories = getPublishedCategories(destino);
  if (!destination || categories.length === 0) notFound();

  const t = await getTranslations({ locale, namespace: "guide" });
  const lang = locale === "en" ? "en" : "pt";
  const prefix = locale === "en" ? "/en" : "";
  const path = `/guia/${destino}`;
  const title = destination.title[lang];
  const updatedAt = guidePaths().find((p) => p.path === path)?.lastModified ?? "";

  return (
    <>
      <StructuredData
        data={guideArticleJsonLd({ title, description: destination.intro[lang], path, locale, updatedAt })}
      />
      <Navbar />
      <main className="bg-ncv-salt min-h-screen">
        <header className="bg-ncv-night text-white px-6 lg:px-16 pt-28 pb-12">
          <div className="max-w-3xl mx-auto">
            <Breadcrumbs dark items={[{ label: t("home"), href: prefix || "/" }, { label: destination.name }]} />
            <h1 className="font-serif text-4xl lg:text-5xl mt-5">{title}</h1>
            <p className="text-white/80 text-lg mt-4 leading-relaxed">{destination.intro[lang]}</p>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-5">
          {categories.map((c) => (
            <Link
              key={c}
              href={`${prefix}/guia/${destino}/${c}`}
              className="block bg-white rounded-2xl border border-ncv-basalt/10 p-6 hover:border-ncv-gold transition-colors"
            >
              <h2 className="font-serif text-2xl text-ncv-blue">{destination.categories[c].title[lang]}</h2>
              <p className="text-ncv-basalt/70 mt-2 leading-relaxed">{destination.categories[c].description[lang]}</p>
            </Link>
          ))}
          <GuideNav locale={locale} destinationId={destino} />
        </div>
      </main>
      <Footer />
    </>
  );
}
