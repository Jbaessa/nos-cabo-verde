"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExperienceCard } from "@/components/ExperienceCard";
import { BookingModal } from "@/components/BookingModal";
import { experiences } from "@/lib/data";
import { motion } from "framer-motion";

const categories = ["Todos", "Trekking", "Kitesurf", "Mergulho", "Gastronomia", "Cultural", "Natureza"];
const islandOptions = ["Todas", "Santo Antão", "São Vicente", "Sal", "Boa Vista", "Fogo", "Santiago"];

type Experience = (typeof experiences)[0];

export default function ExperienciasPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeIsland, setActiveIsland] = useState("Todas");
  const [bookingExp, setBookingExp] = useState<Experience | null>(null);

  const filtered = experiences.filter((exp) => {
    const catMatch = activeCategory === "Todos" || exp.category === activeCategory;
    const islandMatch = activeIsland === "Todas" || exp.island === activeIsland;
    return catMatch && islandMatch;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ncv-night">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80"
            alt="Experiências em Cabo Verde"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-14">
            <p className="text-ncv-gold text-xs tracking-[0.3em] uppercase mb-4">
              — Vive Cabo Verde de dentro
            </p>
            <h1 className="font-serif text-5xl lg:text-7xl text-white mb-4">
              Experiências <span className="text-ncv-gold">autênticas</span>
            </h1>
            <p className="text-white/70 font-sans text-lg max-w-xl">
              Trekking vulcânico, mergulho em paraísos virgens, gastronomia na fonte. {experiences.length} experiências curadas.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-4">
          {/* Category */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-ncv-gold text-ncv-night font-semibold"
                    : "bg-white/8 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Island */}
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
            {filtered.length} {filtered.length === 1 ? "experiência encontrada" : "experiências encontradas"}
          </p>
        </section>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <p className="text-white/40 font-sans text-sm mb-4">Nenhuma experiência encontrada.</p>
              <button
                onClick={() => { setActiveCategory("Todos"); setActiveIsland("Todas"); }}
                className="btn btn-gold-line text-sm px-6 py-2.5"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <ExperienceCard experience={exp} onBook={setBookingExp} />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />

      {bookingExp && (
        <BookingModal experience={bookingExp} onClose={() => setBookingExp(null)} />
      )}
    </>
  );
}
