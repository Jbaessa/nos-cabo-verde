import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { IslandsSection } from "@/components/IslandsSection";
import { EditorialSection } from "@/components/EditorialSection";
import { MundialSection } from "@/components/MundialSection";
import { CultureSection } from "@/components/CultureSection";
import { FacesSection } from "@/components/FacesSection";
import { FlavorsSection } from "@/components/FlavorsSection";
import { MusicSection } from "@/components/MusicSection";
import { AgendaSection } from "@/components/AgendaSection";
import { DiasporaSection } from "@/components/DiasporaSection";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/seo/StructuredData";

const BASE = "https://noscaboverde.cv";

export const metadata: Metadata = {
  title: "Nós Cabo Verde — Dez ilhas. Um povo. Uma alma.",
  description:
    "Portal digital da cultura, beleza e identidade cabo-verdiana. Descobre as dez ilhas, a morna, a gastronomia, o Carnaval de Mindelo e as experiências autênticas de Cabo Verde.",
  alternates: { canonical: BASE },
  openGraph: {
    title: "Nós Cabo Verde — Dez ilhas. Um povo. Uma alma.",
    description:
      "Portal digital da cultura, beleza e identidade cabo-verdiana. Descobre as dez ilhas, a morna, a gastronomia e as experiências autênticas.",
    url: BASE,
    type: "website",
    locale: "pt_CV",
    siteName: "Nós Cabo Verde",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nós Cabo Verde — Dez ilhas. Um povo. Uma alma.",
    description:
      "Portal digital da cultura, beleza e identidade cabo-verdiana. Descobre as dez ilhas, a morna, a gastronomia e as experiências autênticas.",
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": BASE,
  url: BASE,
  name: "Nós Cabo Verde — Dez ilhas. Um povo. Uma alma.",
  description:
    "Portal digital da cultura, beleza e identidade cabo-verdiana. Morna, gastronomia, ilhas e experiências autênticas.",
  isPartOf: { "@id": `${BASE}/#website` },
  about: {
    "@type": "Country",
    name: "Cabo Verde",
    sameAs: "https://www.wikidata.org/wiki/Q1011",
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Ilhas de Cabo Verde",
    numberOfItems: 10,
    itemListElement: [
      "Santo Antão", "São Vicente", "Santa Luzia", "São Nicolau",
      "Sal", "Boa Vista", "Maio", "Santiago", "Fogo", "Brava",
    ].map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={webPageJsonLd} />
      <Navbar />
      <main>
        <HeroSection />
        <IslandsSection />
        <EditorialSection />
        <MundialSection />
        <CultureSection />
        <FacesSection />
        <FlavorsSection />
        <MusicSection />
        <AgendaSection />
        <DiasporaSection />
      </main>
      <Footer />
    </>
  );
}
