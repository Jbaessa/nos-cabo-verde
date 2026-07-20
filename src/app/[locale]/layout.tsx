import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { FavoritesProvider } from "@/lib/favorites-context";
import { StructuredData } from "@/components/seo/StructuredData";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const BASE = "https://noscaboverde.cv";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isEn = locale === "en";

  return {
    metadataBase: new URL(BASE),
    title: {
      default: t("homeTitle"),
      template: `%s | Nós Cabo Verde`,
    },
    description: t("homeDesc"),
    keywords: isEn
      ? ["Cape Verde", "Cape Verde islands", "Cape Verde tourism", "Cape Verdean culture", "morna", "Cape Verde travel", "Sal", "Santiago", "São Vicente"]
      : ["Cabo Verde", "ilhas Cabo Verde", "turismo Cabo Verde", "cultura cabo-verdiana", "morna", "funaná", "gastronomia Cabo Verde", "São Vicente", "Santiago", "diáspora cabo-verdiana"],
    authors: [{ name: "Nós Cabo Verde", url: BASE }],
    creator: "Nós Cabo Verde",
    publisher: "Nós Cabo Verde",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    alternates: {
      canonical: isEn ? `${BASE}/en` : BASE,
      languages: { pt: BASE, en: `${BASE}/en` },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDesc"),
      url: isEn ? `${BASE}/en` : BASE,
      siteName: "Nós Cabo Verde",
      locale: isEn ? "en_GB" : "pt_CV",
      type: "website",
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Nós Cabo Verde" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDesc"),
      images: ["/images/og-default.jpg"],
      site: "@noscaboverde",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: "Nós Cabo Verde",
  url: BASE,
  logo: { "@type": "ImageObject", url: `${BASE}/images/logo.png`, width: 400, height: 120 },
  sameAs: ["https://www.instagram.com/noscaboverde", "https://www.facebook.com/noscaboverde", "https://twitter.com/noscaboverde"],
  description: "Digital portal dedicated to the culture, identity and tourism of Cape Verde.",
  areaServed: { "@type": "Country", name: "Cabo Verde" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: BASE,
  name: "Nós Cabo Verde",
  description: "Ten islands. One people. One soul.",
  publisher: { "@id": `${BASE}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE}/pesquisa?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "pt" | "en")) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${dmSerif.variable} ${manrope.variable}`}>
      <head>
        <StructuredData data={organizationJsonLd} />
        <StructuredData data={websiteJsonLd} />
      </head>
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider messages={messages}>
          <FavoritesProvider>{children}</FavoritesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
