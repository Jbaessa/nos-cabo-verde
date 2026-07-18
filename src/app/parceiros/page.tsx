"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PartnerCard } from "@/components/PartnerCard";
import { partners } from "@/lib/data";
import { motion } from "framer-motion";

const types = ["Todos", "Hotel", "Restaurante", "Operador Turístico", "Escola de Desporto"];
const islandOptions = ["Todas", "Santo Antão", "São Vicente", "Sal", "Boa Vista", "Fogo", "Santiago", "Brava"];

export default function ParceirosPage() {
  const [activeType, setActiveType] = useState("Todos");
  const [activeIsland, setActiveIsland] = useState("Todas");

  const filtered = partners.filter((p) => {
    const typeMatch = activeType === "Todos" || p.type === activeType;
    const islandMatch = activeIsland === "Todas" || p.island === activeIsland;
    return typeMatch && islandMatch;
  });

  const verified = partners.filter((p) => p.verified).length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ncv-night">
        {/* Hero */}
        <section className="relative h-[45vh] min-h-[320px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
            alt="Parceiros Nós Cabo Verde"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-12">
            <p className="text-ncv-gold text-xs tracking-[0.3em] uppercase mb-4">
              — Escolhidos a dedo
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl text-white mb-4">
              Parceiros <span className="text-ncv-gold">verificados</span>
            </h1>
            <p className="text-white/70 font-sans text-lg max-w-xl">
              Hotéis, restaurantes, operadores e escolas de desporto seleccionados pela nossa equipa. {verified} parceiros oficiais em todo o arquipélago.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-4">
          <div className="flex gap-2 flex-wrap">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-200 ${
                  activeType === t
                    ? "bg-ncv-gold text-ncv-night font-semibold"
                    : "bg-white/8 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap">
            {islandOptions.map((isl) => (
              <button
                key={isl}
                onClick={() => setActiveIsland(isl)}
                className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all duration-200 border ${
                  activeIsland === isl
                    ? "border-ncv-gold/60 bg-ncv-gold/10 text-ncv-gold"
                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                }`}
              >
                {isl}
              </button>
            ))}
          </div>

          <p className="text-white/40 text-xs font-sans">
            {filtered.length} {filtered.length === 1 ? "parceiro encontrado" : "parceiros encontrados"}
          </p>
        </section>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <p className="text-white/40 font-sans text-sm mb-4">Nenhum parceiro encontrado.</p>
              <button
                onClick={() => { setActiveType("Todos"); setActiveIsland("Todas"); }}
                className="btn btn-gold-line text-sm px-6 py-2.5"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((partner, i) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <PartnerCard partner={partner} />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* CTA — tornar-se parceiro */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="rounded-2xl bg-gradient-to-br from-ncv-blue to-ncv-night border border-white/10 p-10 text-center">
            <p className="text-ncv-gold text-xs tracking-[0.3em] uppercase mb-4">— Junta-te a nós</p>
            <h2 className="font-serif text-4xl text-white mb-4">
              O teu negócio merece estar aqui
            </h2>
            <p className="text-white/60 font-sans text-base max-w-lg mx-auto mb-8">
              Partilha a tua paixão por Cabo Verde com viajantes de todo o mundo. Torna-te parceiro verificado da plataforma.
            </p>
            <a
              href="mailto:parceiros@noscaboverde.cv"
              className="btn btn-gold px-8 py-3.5 text-base inline-block"
            >
              Candidatar-me como parceiro
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
