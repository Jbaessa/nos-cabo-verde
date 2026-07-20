import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
    alternates: { canonical: url, languages: { pt: `${BASE}/experiencias`, en: `${BASE}/en/experiencias` } },
    openGraph: { title: t("experiencesTitle"), description: t("experiencesDesc"), url, type: "website", locale: isEn ? "en_GB" : "pt_CV", siteName: "Nós Cabo Verde" },
    twitter: { card: "summary_large_image", title: t("experiencesTitle"), description: t("experiencesDesc") },
  };
}

export default function ExperienciasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
