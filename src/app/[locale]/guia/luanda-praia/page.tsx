import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GuideNav } from "@/components/guide/GuideNav";
import { StructuredData } from "@/components/seo/StructuredData";
import { isFactStale, LUANDA_UPDATED_AT, luandaFacts } from "@/lib/guide";
import { guideArticleJsonLd, guideMetadata } from "@/lib/guide-seo";

const PATH = "/guia/luanda-praia";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide" });
  return guideMetadata({
    title: t("luandaTitle"),
    description: t("luandaDescription"),
    path: PATH,
    locale,
    image: { url: "/images/taag-luanda-praia.jpg", width: 640, height: 778, alt: t("teaserAlt") },
  });
}

export default async function LuandaPraiaPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide" });
  const lang = locale === "en" ? "en" : "pt";
  const prefix = locale === "en" ? "/en" : "";

  return (
    <>
      <StructuredData
        data={guideArticleJsonLd({
          title: t("luandaTitle"),
          description: t("luandaDescription"),
          path: PATH,
          locale,
          updatedAt: LUANDA_UPDATED_AT,
        })}
      />
      <Navbar />
      <main className="bg-ncv-salt min-h-screen">
        <header className="bg-ncv-night text-white px-6 lg:px-16 pt-28 pb-12">
          <div className="max-w-3xl mx-auto">
            <Breadcrumbs dark items={[{ label: t("home"), href: prefix || "/" }, { label: t("luandaTitle") }]} />
            <h1 className="font-serif text-4xl lg:text-5xl mt-5">{t("luandaTitle")}</h1>
            <p className="text-white/80 text-lg mt-4 leading-relaxed">{t("luandaIntro")}</p>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
          <Image
            src="/images/taag-luanda-praia.jpg"
            alt={t("teaserAlt")}
            width={640}
            height={778}
            sizes="(max-width: 640px) 100vw, 480px"
            priority
            className="w-full max-w-md h-auto rounded-2xl mx-auto"
          />
          {luandaFacts.map((fact) => (
            <section key={fact.id}>
              <h2 className="font-serif text-2xl text-ncv-blue">{fact.label[lang]}</h2>
              <p className="text-ncv-basalt/80 leading-relaxed mt-2">{fact.value[lang]}</p>
              <p className="text-xs text-ncv-basalt/60 mt-2">
                <a href={fact.sourceUrl} target="_blank" rel="nofollow noopener" className="underline underline-offset-2">
                  {t("source")}
                </a>
                {` · ${t("checked")} ${fact.checkedAt}`}
              </p>
              {!fact.official && <p className="text-sm text-ncv-basalt/70 mt-2">{t("unofficial")}</p>}
              {isFactStale(fact, new Date()) && <p className="text-sm text-ncv-basalt/70 mt-2">{t("stale")}</p>}
            </section>
          ))}
          <section>
            <h2 className="font-serif text-2xl text-ncv-blue">{t("stayTitle")}</h2>
            <p className="text-ncv-basalt/80 leading-relaxed mt-2">{t("stayIntro")}</p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-ncv-basalt/80 leading-relaxed">
              <li>{t("stayShort")}</li>
              <li>{t("stayLong")}</li>
            </ul>
          </section>
          <GuideNav locale={locale} destinationId="praia" />
        </div>
      </main>
      <Footer />
    </>
  );
}
