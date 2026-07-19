import type { Metadata } from "next";
import Link from "next/link";
import { islands } from "@/lib/data";
import { BARLAVENTO, SOTAVENTO } from "@/lib/island-groups";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/seo/StructuredData";

const BASE = "https://noscaboverde.cv";

export const metadata: Metadata = {
  title: "As Dez Ilhas de Cabo Verde: guia completo de Barlavento e Sotavento",
  description:
    "Explora as dez ilhas de Cabo Verde: Santo Antão, São Vicente, São Nicolau, Sal, Boa Vista, Maio, Santiago, Fogo e Brava. Cada ilha tem a sua personalidade, música e cultura única.",
  alternates: { canonical: `${BASE}/ilhas` },
  openGraph: {
    title: "As Dez Ilhas de Cabo Verde — Guia Completo",
    description:
      "Do Barlavento ao Sotavento, descobre as dez ilhas de Cabo Verde. Praias, cultura, gastronomia e experiências autênticas.",
    url: `${BASE}/ilhas`,
    type: "website",
    locale: "pt_CV",
    siteName: "Nós Cabo Verde",
  },
  twitter: {
    card: "summary_large_image",
    title: "As Dez Ilhas de Cabo Verde — Guia Completo",
    description:
      "Do Barlavento ao Sotavento, descobre as dez ilhas de Cabo Verde.",
  },
};

function IslandCard({ id, number }: { id: string; number: number }) {
  const island = islands.find((i) => i.id === id);
  if (!island) return null;

  return (
    <Link href={`/ilhas/${island.id}`} className="group block">
      <div className="relative h-72 overflow-hidden rounded-2xl mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={island.image}
          alt={`${island.name}, Cabo Verde — ${island.tagline}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/20 to-transparent" />
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ncv-night/60 backdrop-blur-sm border border-ncv-gold/25 flex items-center justify-center">
          <span className="text-ncv-gold text-xs font-sans">{number}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="text-white text-xs font-sans">{island.temperature}</span>
          <span className="text-ncv-gold/70 text-xs font-sans">{island.duration}</span>
        </div>
      </div>
      <h2 className="font-serif text-2xl text-white group-hover:text-ncv-gold transition-colors">
        {island.name}
      </h2>
      <p className="text-white/40 text-sm font-sans italic mt-1">{island.tagline}</p>
    </Link>
  );
}

export default function IslandsIndexPage() {
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE}/ilhas`,
    name: "As Dez Ilhas de Cabo Verde",
    description:
      "Guia completo das dez ilhas do arquipélago de Cabo Verde — do Barlavento ao Sotavento.",
    url: `${BASE}/ilhas`,
    isPartOf: { "@id": `${BASE}/#website` },
    hasPart: islands.map((island) => ({
      "@type": "TouristDestination",
      name: island.name,
      url: `${BASE}/ilhas/${island.id}`,
      description: island.description,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: BASE },
      { "@type": "ListItem", position: 2, name: "As Ilhas", item: `${BASE}/ilhas` },
    ],
  };

  return (
    <>
      <StructuredData data={collectionPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <Navbar />
      <main className="bg-ncv-night min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-ncv-gold" />
              <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
                O Arquipélago
              </span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-4">
              As Dez Ilhas <span className="text-ncv-gold">do Atlântico</span>
            </h1>
            <p className="text-white/40 text-base font-sans max-w-lg">
              Do Barlavento ao Sotavento, cada ilha é um mundo. Escolhe a tua e começa a
              descobrir.
            </p>
          </div>

          {/* Barlavento */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-ncv-gold/40" />
              <span className="text-ncv-gold/70 text-xs font-sans tracking-[0.25em] uppercase">
                Barlavento — Ilhas do Norte
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {BARLAVENTO.map((id, i) => (
                <IslandCard key={id} id={id} number={i + 1} />
              ))}
            </div>
          </div>

          {/* Sotavento */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-ncv-gold/40" />
              <span className="text-ncv-gold/70 text-xs font-sans tracking-[0.25em] uppercase">
                Sotavento — Ilhas do Sul
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {SOTAVENTO.map((id, i) => (
                <IslandCard key={id} id={id} number={i + 7} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
