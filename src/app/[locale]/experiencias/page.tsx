"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExperienceCard } from "@/components/ExperienceCard";
import { BookingModal } from "@/components/BookingModal";
import { experiences } from "@/lib/data";
import { motion } from "framer-motion";

type Experience = (typeof experiences)[0];

export default function ExperienciasPage() {
  const t = useTranslations("experiencesPage");

  const categories = [
    { key: "Todos", label: t("categoryAll") },
    { key: "Trekking", label: t("catTrekking") },
    { key: "Kitesurf", label: t("catKitesurf") },
    { key: "Mergulho", label: t("catMergulho") },
    { key: "Gastronomia", label: t("catGastronomia") },
    { key: "Cultural", label: t("catCultural") },
    { key: "Natureza", label: t("catNatureza") },
  ];

  const islandOptions = [
    { key: "Todas", label: t("islandAll") },
    { key: "Santo Antão", label: "Santo Antão" },
    { key: "São Vicente", label: "São Vicente" },
    { key: "Sal", label: "Sal" },
    { key: "Boa Vista", label: "Boa Vista" },
    { key: "Fogo", label: "Fogo" },
    { key: "Santiago", label: "Santiago" },
  ];

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
              {t("heroEyebrow")}
            </p>
            <h1 className="font-serif text-5xl lg:text-7xl text-white mb-4">
              {t("heroTitle")} <span className="text-ncv-gold">{t("heroTitleHighlight")}</span>
            </h1>
            <p className="text-white/70 font-sans text-lg max-w-xl">
              {t("heroDesc", { count: experiences.length })}
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-4">
          {/* Category */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-200 ${
                  activeCategory === key
                    ? "bg-ncv-gold text-ncv-night font-semibold"
                    : "bg-white/8 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Island */}
          <div className="flex gap-2 flex-wrap">
            {islandOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveIsland(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all duration-200 border ${
                  activeIsland === key
                    ? "border-ncv-gold/60 bg-ncv-gold/10 text-ncv-gold"
                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="text-white/40 text-xs font-sans">
            {filtered.length} {filtered.length === 1 ? t("countSingular") : t("countPlural")}
          </p>
        </section>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <p className="text-white/40 font-sans text-sm mb-4">{t("empty")}</p>
              <button
                onClick={() => { setActiveCategory("Todos"); setActiveIsland("Todas"); }}
                className="btn btn-gold-line text-sm px-6 py-2.5"
              >
                {t("clearFilters")}
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
