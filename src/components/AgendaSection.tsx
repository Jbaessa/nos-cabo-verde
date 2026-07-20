"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { events } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Música: "text-ncv-blue border-ncv-blue/30 bg-ncv-blue/5",
  Festival: "text-ncv-red border-ncv-red/30 bg-ncv-red/5",
  Gastronomia: "text-amber-700 border-amber-700/30 bg-amber-700/5",
  Arte: "text-purple-700 border-purple-700/30 bg-purple-700/5",
};

export function AgendaSection() {
  const t = useTranslations("agendaSection");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = [
    { key: "Todos", label: t("all") },
    { key: "Música", label: t("music") },
    { key: "Festival", label: t("festival") },
    { key: "Gastronomia", label: t("gastronomy") },
    { key: "Arte", label: t("art") },
  ];

  const filtered =
    activeCategory === "Todos" ? events : events.filter((e) => e.category === activeCategory);

  const featured = filtered.find((e) => e.featured) || filtered[0];
  const others = filtered.filter((e) => e.id !== featured.id);

  return (
    <section id="agenda" className="bg-ncv-sand/30 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-ncv-gold" />
            <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
              {t("eyebrow")}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ncv-night leading-tight">
              {t("heading1")}
              <br />
              {t("heading2")}
            </h2>
            <a
              href="#"
              className="flex items-center gap-2 text-ncv-blue text-sm font-sans font-medium hover:gap-4 transition-all"
            >
              {t("viewAll")} <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`btn px-5 py-2 text-sm border ${
                activeCategory === key
                  ? "bg-ncv-night text-ncv-gold border-ncv-night shadow-[0_8px_20px_-8px_rgba(3,26,54,0.45)]"
                  : "border-ncv-basalt/15 text-ncv-basalt/50 hover:border-ncv-night/30 hover:text-ncv-night hover:bg-ncv-night/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured event */}
          {featured && (
            <motion.div
              key={featured.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1 group cursor-pointer"
            >
              <div className="relative h-72 overflow-hidden mb-4 rounded-xl">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/90 via-ncv-night/20 to-transparent" />

                {/* Date badge */}
                <div className="absolute top-4 left-4 bg-ncv-gold text-ncv-night text-center px-3 py-2">
                  <p className="text-xl font-bold font-serif leading-none">{featured.dateDisplay.split(" ")[0]}</p>
                  <p className="text-[10px] font-sans font-bold tracking-wider uppercase">{featured.dateDisplay.split(" ").slice(1).join(" ")}</p>
                </div>

                {featured.free && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white text-[10px] font-bold font-sans tracking-wider uppercase px-2 py-1">
                    {t("free")}
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className={`inline-block text-[10px] font-bold tracking-widest uppercase border px-2 py-0.5 mb-3 ${categoryColors[featured.category]}`}>
                    {featured.category}
                  </span>
                  <h3 className="font-serif text-xl text-white leading-snug">{featured.name}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <MapPin size={12} className="text-ncv-gold" />
                <span className="text-ncv-basalt/50 text-xs font-sans">{featured.location}</span>
              </div>
              <p className="text-ncv-basalt/60 text-sm font-sans leading-relaxed mb-3">
                {featured.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-ncv-blue text-sm font-sans font-medium hover:gap-4 transition-all"
              >
                {t("learnMore")} <ExternalLink size={13} />
              </a>
            </motion.div>
          )}

          {/* Event list */}
          <div className="lg:col-span-2 space-y-4">
            {others.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex gap-4 border border-ncv-basalt/8 bg-white/50 hover:border-ncv-gold/25 hover:bg-white/80 hover:shadow-[0_0_18px_-4px_rgba(201,160,94,0.28),0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 rounded-xl p-4 cursor-pointer"
              >
                {/* Date */}
                <div className="flex-shrink-0 w-16 text-center border-r border-ncv-basalt/10 pr-4">
                  <p className="font-serif text-2xl text-ncv-night leading-none">{event.dateDisplay.split("–")[0]}</p>
                  <p className="text-ncv-gold text-xs font-sans mt-0.5">{event.dateDisplay.split(" ").slice(-1)[0]}</p>
                </div>

                {/* Image */}
                <div className="flex-shrink-0 w-20 h-16 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold tracking-widest uppercase border px-2 py-0.5 ${categoryColors[event.category]}`}>
                          {event.category}
                        </span>
                        {event.free && (
                          <span className="text-[10px] font-bold tracking-widest uppercase text-green-700">
                            {t("free")}
                          </span>
                        )}
                      </div>
                      <h4 className="font-sans font-semibold text-ncv-night text-sm group-hover:text-ncv-blue transition-colors">
                        {event.name}
                      </h4>
                    </div>
                    <ArrowRight
                      size={15}
                      className="text-ncv-basalt/20 group-hover:text-ncv-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin size={10} className="text-ncv-gold/60" />
                    <span className="text-ncv-basalt/40 text-xs font-sans">{event.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <div className="border border-ncv-night/8 bg-ncv-night rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-ncv-gold text-xs font-sans tracking-widest uppercase mb-1">
                  {t("alertsTitle")}
                </p>
                <p className="text-white/60 text-sm font-sans">
                  {t("alertsDesc")}
                </p>
              </div>
              <button className="btn btn-gold text-xs font-bold px-7 py-3 tracking-wider uppercase">
                {t("alertsBtn")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
