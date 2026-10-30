import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GuideNav } from "@/components/guide/GuideNav";
import { StructuredData } from "@/components/seo/StructuredData";
import { METHOD_UPDATED_AT } from "@/lib/guide";
import { guideArticleJsonLd, guideMetadata } from "@/lib/guide-seo";

const PATH = "/guia/como-escolhemos";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide" });
  return guideMetadata({ title: t("methodTitle"), description: t("methodIntro"), path: PATH, locale });
}

export default async function HowWeChoosePage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide" });
  const prefix = locale === "en" ? "/en" : "";
  const rules = ["ruleScore", "ruleActivities", "ruleReviews", "ruleRecent", "ruleOpen", "ruleReview"] as const;

  return (
    <>
      <StructuredData
        data={guideArticleJsonLd({
          title: t("methodTitle"),
          description: t("methodIntro"),
          path: PATH,
          locale,
          updatedAt: METHOD_UPDATED_AT,
        })}
      />
      <Navbar />
      <main className="bg-ncv-salt min-h-screen">
        <header className="bg-ncv-night text-white px-6 lg:px-16 pt-28 pb-12">
          <div className="max-w-3xl mx-auto">
            <Breadcrumbs dark items={[{ label: t("home"), href: prefix || "/" }, { label: t("methodTitle") }]} />
            <h1 className="font-serif text-4xl lg:text-5xl mt-5">{t("methodTitle")}</h1>
            <p className="text-white/80 text-lg mt-4 leading-relaxed">{t("methodIntro")}</p>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-6 py-12 text-ncv-basalt/80 leading-relaxed">
          <h2 className="font-serif text-2xl text-ncv-blue mb-4">{t("rulesTitle")}</h2>
          <ul className="list-disc pl-5 space-y-2">
            {rules.map((rule) => (
              <li key={rule}>{t(rule)}</li>
            ))}
          </ul>
          <p className="mt-8">{t("methodDisclosure")}</p>
          <GuideNav locale={locale} destinationId="praia" />
        </div>
      </main>
      <Footer />
    </>
  );
}
