import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import { GuideNav } from "@/components/guide/GuideNav";
import { PlaceCard } from "@/components/guide/PlaceCard";
import { getCategory, guidePaths } from "@/lib/guide";
import { guideArticleJsonLd, guideMetadata, placesItemListJsonLd } from "@/lib/guide-seo";

type Params = Promise<{ locale: string; destino: string; categoria: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, destino, categoria } = await params;
  const found = getCategory(destino, categoria);
  if (!found) return {};
  const lang = locale === "en" ? "en" : "pt";
  const page = found.destination.categories[found.category];
  const path = `/guia/${destino}/${categoria}`;
  return guideMetadata({ title: page.title[lang], description: page.description[lang], path, locale });
}

export default async function GuideCategoryPage({ params }: { params: Params }) {
  const { locale, destino, categoria } = await params;
  const found = getCategory(destino, categoria);
  if (!found) notFound();

  const t = await getTranslations({ locale, namespace: "guide" });
  const lang = locale === "en" ? "en" : "pt";
  const prefix = locale === "en" ? "/en" : "";
  const page = found.destination.categories[found.category];
  const path = `/guia/${destino}/${categoria}`;
  const updatedAt = guidePaths().find((p) => p.path === path)?.lastModified ?? "";

  return (
    <>
      <StructuredData
        data={[
          guideArticleJsonLd({ title: page.title[lang], description: page.description[lang], path, locale, updatedAt }),
          placesItemListJsonLd(found.places, locale),
        ]}
      />
      <Navbar />
      <main className="bg-ncv-salt min-h-screen">
        <header className="bg-ncv-night text-white px-6 lg:px-16 pt-28 pb-12">
          <div className="max-w-3xl mx-auto">
            <Breadcrumbs
              dark
              items={[
                { label: t("home"), href: prefix || "/" },
                { label: found.destination.name, href: `${prefix}/guia/${destino}` },
                { label: page.title[lang] },
              ]}
            />
            <h1 className="font-serif text-4xl lg:text-5xl mt-5">{page.title[lang]}</h1>
            <p className="text-white/80 text-lg mt-4 leading-relaxed">{page.intro[lang]}</p>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-sm text-ncv-basalt/60 mb-6">
            {t("updated", { date: updatedAt })}
          </p>
          <div className="space-y-5">
            {found.places.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                lang={lang}
                labels={{
                  bestFor: t("bestFor"),
                  price: t("price"),
                  website: t("website"),
                  book: t("book"),
                  checked: t("checked"),
                  reviews: t("reviews"),
                  fewReviews: t("fewReviews"),
                }}
              />
            ))}
          </div>
          {page.tips.length > 0 && (
            <section className="mt-12">
              <h2 className="font-serif text-2xl text-ncv-blue mb-4">{t("tips")}</h2>
              <ul className="list-disc pl-5 space-y-2 text-ncv-basalt/80 leading-relaxed">
                {page.tips.map((tip) => (
                  <li key={tip.pt}>{tip[lang]}</li>
                ))}
              </ul>
            </section>
          )}
          <GuideNav locale={locale} destinationId={destino} />
        </div>
      </main>
      <Footer />
    </>
  );
}
