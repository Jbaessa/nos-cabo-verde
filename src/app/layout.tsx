import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Nós Cabo Verde — Dez ilhas. Um povo. Uma alma.",
    template: "%s | Nós Cabo Verde",
  },
  description:
    "Portal digital da cultura, beleza e identidade cabo-verdiana. Descobre as dez ilhas, a música, a gastronomia, o povo e as experiências autênticas de Cabo Verde.",
  keywords: [
    "Cabo Verde", "ilhas Cabo Verde", "turismo Cabo Verde", "cultura cabo-verdiana",
    "morna", "funaná", "gastronomia Cabo Verde", "São Vicente", "Santiago",
    "Santo Antão", "diáspora cabo-verdiana", "viagem Cabo Verde",
  ],
  authors: [{ name: "Nós Cabo Verde", url: BASE }],
  creator: "Nós Cabo Verde",
  publisher: "Nós Cabo Verde",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: "Nós Cabo Verde — Dez ilhas. Um povo. Uma alma.",
    description:
      "Portal digital da cultura, beleza e identidade cabo-verdiana. Descobre as dez ilhas, a música, a gastronomia e as experiências autênticas.",
    url: BASE,
    siteName: "Nós Cabo Verde",
    locale: "pt_CV",
    type: "website",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Nós Cabo Verde — Dez ilhas. Um povo. Uma alma.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nós Cabo Verde — Dez ilhas. Um povo. Uma alma.",
    description:
      "Portal digital da cultura, beleza e identidade cabo-verdiana. Descobre as dez ilhas, a música, a gastronomia e as experiências autênticas.",
    images: ["/images/og-default.jpg"],
    site: "@noscaboverde",
    creator: "@noscaboverde",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: "Nós Cabo Verde",
  url: BASE,
  logo: {
    "@type": "ImageObject",
    url: `${BASE}/images/logo.png`,
    width: 400,
    height: 120,
  },
  sameAs: [
    "https://www.instagram.com/noscaboverde",
    "https://www.facebook.com/noscaboverde",
    "https://twitter.com/noscaboverde",
  ],
  description:
    "Portal digital dedicado à cultura, identidade e turismo de Cabo Verde.",
  areaServed: { "@type": "Country", name: "Cabo Verde" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: BASE,
  name: "Nós Cabo Verde",
  description: "Dez ilhas. Um povo. Uma alma.",
  publisher: { "@id": `${BASE}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE}/pesquisa?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${dmSerif.variable} ${manrope.variable}`}>
      <head>
        <StructuredData data={organizationJsonLd} />
        <StructuredData data={websiteJsonLd} />
      </head>
      <body className="min-h-screen antialiased">
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
