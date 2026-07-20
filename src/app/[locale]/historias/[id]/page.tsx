import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { editorialFeatures } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

const BASE = "https://noscaboverde.cv";

const typeColors: Record<string, string> = {
  "história": "bg-ncv-blue text-white",
  "ilha da semana": "bg-ncv-gold text-ncv-night",
  "artista do mês": "bg-ncv-red text-white",
  "receita da semana": "bg-green-800 text-white",
};

export function generateStaticParams() {
  return editorialFeatures.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const article = editorialFeatures.find((a) => a.id === id);
  if (!article) return {};

  const isEn = locale === "en";
  const imageUrl = article.image.startsWith("http") ? article.image : `${BASE}${article.image}`;
  const ptUrl = `${BASE}/historias/${article.id}`;
  const enUrl = `${BASE}/en/historias/${article.id}`;
  const canonicalUrl = isEn ? enUrl : ptUrl;

  return {
    title: article.title,
    description: article.subtitle,
    alternates: {
      canonical: canonicalUrl,
      languages: { pt: ptUrl, en: enUrl },
    },
    openGraph: {
      title: article.title,
      description: article.subtitle,
      url: canonicalUrl,
      type: "article",
      locale: isEn ? "en_GB" : "pt_CV",
      siteName: "Nós Cabo Verde",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.subtitle,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "historias" });
  const article = editorialFeatures.find((a) => a.id === id);
  if (!article) notFound();

  const isEn = locale === "en";
  const others = editorialFeatures.filter((a) => a.id !== id);
  const imageUrl = article.image.startsWith("http") ? article.image : `${BASE}${article.image}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE}/${locale === "en" ? "en/" : ""}historias/${article.id}`,
    headline: article.title,
    description: article.subtitle,
    image: [imageUrl],
    url: `${BASE}/${locale === "en" ? "en/" : ""}historias/${article.id}`,
    datePublished: "2026-01-01T00:00:00Z",
    dateModified: "2026-07-20T00:00:00Z",
    author: {
      "@type": "Organization",
      name: "Nós Cabo Verde",
      url: BASE,
    },
    publisher: {
      "@id": `${BASE}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/${locale === "en" ? "en/" : ""}historias/${article.id}`,
    },
    about: {
      "@type": "Place",
      name: article.island,
      containedInPlace: { "@type": "Country", name: isEn ? "Cape Verde" : "Cabo Verde" },
    },
    isPartOf: { "@id": `${BASE}/#website` },
  };

  return (
    <>
      <StructuredData data={articleJsonLd} />
      <Navbar />
      <main className="bg-ncv-salt min-h-screen">
        {/* Hero */}
        <div className="relative h-[58vh] lg:h-[72vh] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/25 to-ncv-night/10" />

          {/* Back */}
          <div className="absolute top-6 left-6 lg:top-8 lg:left-12">
            <Link
              href={isEn ? "/en/#editorial" : "/#editorial"}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-sans group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              {t("back")}
            </Link>
          </div>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-16 pb-12 lg:pb-16 max-w-5xl">
            <span
              className={`inline-block text-xs font-sans font-bold tracking-widest uppercase px-3.5 py-1 mb-5 rounded-full ${typeColors[article.type] ?? "bg-ncv-blue text-white"}`}
            >
              {article.type}
            </span>
            <h1 className="font-serif text-3xl lg:text-5xl xl:text-6xl text-white leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-white/55 text-base lg:text-lg font-sans mb-7 max-w-2xl">
              {article.subtitle}
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-1.5 text-white/35 text-xs font-sans">
                <Clock size={12} />
                {article.readTime} {t("readTime")}
              </div>
              <div className="h-px w-6 bg-white/15" />
              <div className="flex items-center gap-1.5 text-white/35 text-xs font-sans">
                <MapPin size={12} />
                {article.island}
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="max-w-2xl mx-auto px-6 pt-8 pb-2">
          <Breadcrumbs
            items={[
              { label: t("breadcrumbHome"), href: isEn ? "/en" : "/" },
              { label: t("breadcrumbStories"), href: isEn ? "/en/#editorial" : "/#editorial" },
              { label: article.title },
            ]}
          />
        </div>

        {/* Article body */}
        <div className="max-w-2xl mx-auto px-6 pt-10 pb-28">
          {"body" in article && article.body ? (
            article.body.map((section, i) => (
              <div key={i}>
                {"heading" in section && section.heading && (
                  <h2 className="font-serif text-2xl lg:text-3xl text-ncv-night mt-14 mb-6">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p: string, j: number) => (
                  <p
                    key={j}
                    className={`font-sans leading-[1.85] mb-7 ${
                      i === 0
                        ? "text-xl lg:text-[22px] text-ncv-night/75 font-light"
                        : "text-[15px] lg:text-base text-ncv-basalt/60"
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p className="text-ncv-basalt/30 font-sans text-center py-24 text-sm">
              {t("comingSoon")}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-ncv-basalt/8 max-w-7xl mx-auto" />

        {/* More articles */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-12 bg-ncv-gold" />
            <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
              {t("continueReading")}
            </span>
          </div>
          <h3 className="font-serif text-4xl text-ncv-night mb-10">{t("moreStories")}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((item) => (
              <Link key={item.id} href={isEn ? `/en/historias/${item.id}` : `/historias/${item.id}`} className="group">
                <div className="relative h-52 overflow-hidden rounded-2xl mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`inline-block text-[10px] font-sans font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${typeColors[item.type] ?? "bg-ncv-blue text-white"}`}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
                <h4 className="font-serif text-base text-ncv-night group-hover:text-ncv-blue transition-colors leading-snug mb-1.5">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-ncv-basalt/35 text-xs font-sans">
                  <Clock size={10} />
                  {item.readTime} {t("readTime")}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
