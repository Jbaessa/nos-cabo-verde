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
  const url = isEn ? `${BASE}/en/diaspora` : `${BASE}/diaspora`;

  return {
    title: t("diasporaTitle"),
    description: t("diasporaDesc"),
    alternates: { canonical: url, languages: { pt: `${BASE}/diaspora`, en: `${BASE}/en/diaspora` } },
    openGraph: { title: t("diasporaTitle"), description: t("diasporaDesc"), url, type: "website", locale: isEn ? "en_GB" : "pt_CV", siteName: "Nós Cabo Verde" },
    twitter: { card: "summary_large_image", title: t("diasporaTitle"), description: t("diasporaDesc") },
  };
}

export default function DiasporaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
