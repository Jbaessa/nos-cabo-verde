import type { Metadata } from "next";
import Link from "next/link";
import { islands } from "@/lib/data";
import { BARLAVENTO, SOTAVENTO } from "@/lib/island-groups";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "As Dez Ilhas — Nós Cabo Verde",
  description:
    "Explora as dez ilhas de Cabo Verde: Barlavento e Sotavento. Cada ilha tem a sua personalidade, a sua música e a sua forma de te fazer sentir em casa.",
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
          alt={island.name}
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
      <h3 className="font-serif text-2xl text-white group-hover:text-ncv-gold transition-colors">
        {island.name}
      </h3>
      <p className="text-white/40 text-sm font-sans italic mt-1">{island.tagline}</p>
    </Link>
  );
}

export default function IslandsIndexPage() {
  return (
    <>
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
