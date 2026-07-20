"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PartnerCard } from "@/components/PartnerCard";
import { partners } from "@/lib/data";
import { motion } from "framer-motion";

export default function ParceirosPage() {
  const t = useTranslations("partnersPage");
  const locale = useLocale();
  const isEn = locale === "en";

  const types = [
    { key: "Todos", label: t("typeAll") },
    { key: "Hotel", label: t("typeHotel") },
    { key: "Restaurante", label: t("typeRestaurant") },
    { key: "Operador Turístico", label: t("typeOperator") },
    { key: "Escola de Desporto", label: t("typeSports") },
  ];

  const islandOptions = [
    { key: "Todas", label: t("islandAll") },
    { key: "Santo Antão", label: "Santo Antão" },
    { key: "São Vicente", label: "São Vicente" },
    { key: "Sal", label: "Sal" },
    { key: "Boa Vista", label: "Boa Vista" },
    { key: "Fogo", label: "Fogo" },
    { key: "Santiago", label: "Santiago" },
    { key: "Brava", label: "Brava" },
  ];

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
            alt={isEn ? "Nós Cabo Verde Partners" : "Parceiros Nós Cabo Verde"}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-12">
            <p className="text-ncv-gold text-xs tracking-[0.3em] uppercase mb-4">
              {t("eyebrow")}
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl text-white mb-4">
              {t("heading")} <span className="text-ncv-gold">{t("headingHighlight")}</span>
            </h1>
            <p className="text-white/70 font-sans text-lg max-w-xl">
              {t("desc", { count: verified })}
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-4">
          <div className="flex gap-2 flex-wrap">
            {types.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveType(key)}
                className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-200 ${
                  activeType === key
                    ? "bg-ncv-gold text-ncv-night font-semibold"
                    : "bg-white/8 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

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
                onClick={() => { setActiveType("Todos"); setActiveIsland("Todas"); }}
                className="btn btn-gold-line text-sm px-6 py-2.5"
              >
                {t("clearFilters")}
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

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="rounded-2xl bg-gradient-to-br from-ncv-blue to-ncv-night border border-white/10 p-10 text-center">
            <p className="text-ncv-gold text-xs tracking-[0.3em] uppercase mb-4">{t("ctaEyebrow")}</p>
            <h2 className="font-serif text-4xl text-white mb-4">{t("ctaHeading")}</h2>
            <p className="text-white/60 font-sans text-base max-w-lg mx-auto mb-8">{t("ctaBody")}</p>
            <a
              href="mailto:parceiros@noscaboverde.cv"
              className="btn btn-gold px-8 py-3.5 text-base inline-block"
            >
              {t("ctaBtn")}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
