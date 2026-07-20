"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ChevronRight, Thermometer, Clock, ArrowRight, X } from "lucide-react";
import { islands } from "@/lib/data";
import { BARLAVENTO, SOTAVENTO } from "@/lib/island-groups";

const ISLAND_HOTSPOTS: Record<string, { x: number; y: number; r: number }> = {
  "santo-antao": { x: 366,  y: 290,  r: 120 },
  "sao-vicente": { x: 492,  y: 429,  r: 85  },
  "santa-luzia": { x: 663,  y: 510,  r: 52  },
  "sao-nicolau": { x: 994,  y: 638,  r: 100 },
  "sal":         { x: 1908, y: 533,  r: 72  },
  "boa-vista":   { x: 1966, y: 973,  r: 110 },
  "maio":        { x: 1737, y: 1587, r: 78  },
  "santiago":    { x: 1417, y: 1668, r: 140 },
  "fogo":        { x: 915,  y: 1795, r: 100 },
  "brava":       { x: 674,  y: 1829, r: 58  },
};

function IslandMapWithHotspots({
  activeIsland,
  onHover,
  onSelect,
}: {
  activeIsland: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "2400 / 2085" }}>
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 68% 64% at 50% 48%, black 6%, rgba(0,0,0,0.88) 26%, rgba(0,0,0,0.58) 48%, rgba(0,0,0,0.18) 66%, rgba(0,0,0,0.03) 80%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 68% 64% at 50% 48%, black 6%, rgba(0,0,0,0.88) 26%, rgba(0,0,0,0.58) 48%, rgba(0,0,0,0.18) 66%, rgba(0,0,0,0.03) 80%, transparent 90%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cv-map.png"
          alt="Mapa topográfico de Cabo Verde"
          className="w-full h-full object-cover"
          style={{ opacity: 0.70, filter: "saturate(0.72) brightness(0.82)" }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 56% at 50% 48%, rgba(3,26,54,0.10) 10%, rgba(3,26,54,0.28) 38%, rgba(3,26,54,0.62) 60%, rgba(3,26,54,0.92) 78%, rgba(3,26,54,0.99) 90%)",
          pointerEvents: "none",
        }}
      />

      <svg
        viewBox="0 0 2400 2085"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ pointerEvents: "none" }}
      >
        {islands.map((island) => {
          const h = ISLAND_HOTSPOTS[island.id];
          if (!h) return null;
          const isActive = activeIsland === island.id;

          return (
            <g
              key={island.id}
              style={{ pointerEvents: "all", cursor: "pointer" }}
              onMouseEnter={() => onHover(island.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(island.id)}
            >
              <circle cx={h.x} cy={h.y} r={h.r + 30} fill="transparent" />

              {isActive && (
                <circle
                  cx={h.x} cy={h.y} r={h.r + 40}
                  fill="none" stroke="#C9A05E" strokeWidth={5} strokeOpacity={0.20}
                />
              )}

              <circle
                cx={h.x} cy={h.y} r={h.r}
                fill={isActive ? "#C9A05E" : "transparent"}
                fillOpacity={isActive ? 0.08 : 0}
                stroke="#C9A05E"
                strokeWidth={isActive ? 8 : 3}
                strokeOpacity={isActive ? 0.95 : 0.42}
                style={{ transition: "all 0.22s ease" }}
              />

              <circle
                cx={h.x} cy={h.y}
                r={isActive ? 10 : 6}
                fill="#C9A05E"
                fillOpacity={isActive ? 1 : 0.60}
                style={{ transition: "all 0.22s ease" }}
              />

              <text
                x={h.x}
                y={h.y + h.r + 50}
                textAnchor="middle"
                fill={isActive ? "#C9A05E" : "#F8F6F0"}
                fillOpacity={isActive ? 1 : 0.65}
                fontSize={isActive ? 32 : 25}
                fontFamily="Manrope"
                fontWeight={isActive ? "600" : "400"}
                style={{ transition: "all 0.22s ease", userSelect: "none" }}
              >
                {island.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function IslandRow({
  island,
  index,
  onHover,
  onSelect,
}: {
  island: (typeof islands)[number];
  index: number;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      onMouseEnter={() => onHover(island.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(island.id)}
      className="w-full flex items-center gap-3 group py-2.5 border-b border-white/5 hover:border-ncv-gold/25 transition-all"
    >
      <span className="text-white/18 text-[10px] font-mono tabular-nums shrink-0 w-5 text-left">
        {String(index).padStart(2, "0")}
      </span>
      <span className="text-white/50 text-sm font-sans group-hover:text-white transition-colors flex-1 text-left leading-none">
        {island.name}
      </span>
      <ChevronRight
        size={11}
        className="text-transparent group-hover:text-ncv-gold/60 transition-all"
      />
    </button>
  );
}

export function IslandsSection() {
  const t = useTranslations("islandsSection");
  const locale = useLocale();
  const isEn = locale === "en";

  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeIsland = hovered ?? selected;
  const isPinned = selected !== null && hovered === null;
  const toggleSelect = (id: string) =>
    setSelected((prev) => (prev === id ? null : id));

  const activeData = islands.find((i) => i.id === activeIsland);

  const barlaventoIslands = BARLAVENTO.map((id) => islands.find((i) => i.id === id)!).filter(Boolean);
  const sotaventoIslands  = SOTAVENTO.map((id) => islands.find((i) => i.id === id)!).filter(Boolean);

  return (
    <section id="ilhas" className="bg-ncv-night py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-ncv-gold" />
            <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            {t("heading")}
            <br />
            <span className="text-ncv-gold">{t("headingHighlight")}</span>
          </h2>
          <p className="text-white/40 text-base font-sans mt-4 max-w-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Map + info panel */}
        <div className="grid lg:grid-cols-5 gap-10 items-start mb-20">
          {/* Map — 3/5 cols */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <IslandMapWithHotspots
              activeIsland={activeIsland}
              onHover={setHovered}
              onSelect={toggleSelect}
            />
          </motion.div>

          {/* Info panel — 2/5 cols */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {activeData ? (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                <div className="relative h-52 mb-6 overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeData.image}
                    alt={activeData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-ncv-gold text-xs font-sans tracking-widest uppercase bg-ncv-night/60 backdrop-blur-sm px-3.5 py-1 rounded-full">
                      {BARLAVENTO.includes(activeData.id) ? "Barlavento" : "Sotavento"}
                    </span>
                  </div>
                  {isPinned && (
                    <button
                      onClick={() => setSelected(null)}
                      aria-label={t("deselect")}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ncv-night/70 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-ncv-gold/50 transition-colors cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                <h3 className="font-serif text-4xl text-white mb-2">{activeData.name}</h3>
                <p className="text-ncv-gold/80 text-sm font-sans italic mb-4">
                  &ldquo;{activeData.tagline}&rdquo;
                </p>
                <p className="text-white/50 text-sm font-sans leading-relaxed mb-5">
                  {activeData.description}
                </p>
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-white/40 text-xs font-sans">
                    <Thermometer size={13} className="text-ncv-gold" />
                    {activeData.temperature}
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-xs font-sans">
                    <Clock size={13} className="text-ncv-gold" />
                    {activeData.duration}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeData.highlights.map((h) => (
                    <span
                      key={h.name}
                      className="border border-ncv-gold/20 text-ncv-gold/60 text-xs font-sans px-3.5 py-1 rounded-full"
                    >
                      {h.name}
                    </span>
                  ))}
                </div>
                <Link
                  href={isEn ? `/en/ilhas/${activeData.id}` : `/ilhas/${activeData.id}`}
                  className="group btn btn-gold px-6 py-3 text-xs font-bold tracking-wider uppercase self-start"
                >
                  {t("explore")} {activeData.name}{" "}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                {/* Intro */}
                <div className="mb-8 pb-8 border-b border-white/8">
                  <p className="text-ncv-gold/50 text-[10px] font-sans tracking-[0.3em] uppercase mb-3">
                    {t("eyebrow")}
                  </p>
                  <h3 className="font-serif text-3xl text-white leading-snug mb-3">
                    {t("emptyHeading")}{" "}
                    <span className="text-ncv-gold/70">{t("emptyHeadingHighlight")}</span>
                  </h3>
                  <p className="text-white/30 text-sm font-sans leading-relaxed">
                    {t("emptyHint")}
                  </p>
                </div>

                {/* Barlavento + Sotavento side by side */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-px w-5 bg-ncv-gold/40" />
                      <span className="text-ncv-gold/55 text-[9px] font-sans tracking-[0.25em] uppercase">
                        Barlavento
                      </span>
                    </div>
                    {barlaventoIslands.map((island, i) => (
                      <IslandRow
                        key={island.id}
                        island={island}
                        index={i + 1}
                        onHover={setHovered}
                        onSelect={toggleSelect}
                      />
                    ))}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-px w-5 bg-ncv-gold/40" />
                      <span className="text-ncv-gold/55 text-[9px] font-sans tracking-[0.25em] uppercase">
                        Sotavento
                      </span>
                    </div>
                    {sotaventoIslands.map((island, i) => (
                      <IslandRow
                        key={island.id}
                        island={island}
                        index={i + 7}
                        onHover={setHovered}
                        onSelect={toggleSelect}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats footer */}
                <div className="pt-6 border-t border-white/8">
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="font-serif text-2xl text-ncv-gold leading-none mb-1">10</div>
                      <div className="text-white/30 text-[10px] font-sans uppercase tracking-wider">{t("islandsLabel")}</div>
                    </div>
                    <div className="w-px bg-white/8" />
                    <div className="text-center">
                      <div className="font-serif text-2xl text-ncv-gold leading-none mb-1">9</div>
                      <div className="text-white/30 text-[10px] font-sans uppercase tracking-wider">{t("inhabitedLabel")}</div>
                    </div>
                    <div className="w-px bg-white/8" />
                    <div className="text-center">
                      <div className="font-serif text-2xl text-ncv-gold leading-none mb-1">~600</div>
                      <div className="text-white/30 text-[10px] font-sans uppercase tracking-wider">km²</div>
                    </div>
                    <div className="w-px bg-white/8" />
                    <div className="text-center">
                      <div className="font-serif text-2xl text-ncv-gold leading-none mb-1">500k</div>
                      <div className="text-white/30 text-[10px] font-sans uppercase tracking-wider">{isEn ? "Inhabitants" : "Habitantes"}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Island cards horizontal scroll */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white/60 text-sm font-sans tracking-widest uppercase">
              {t("allIslandsLabel")}
            </h3>
            <Link
              href={isEn ? "/en/ilhas" : "/ilhas"}
              className="text-ncv-gold text-sm font-sans flex items-center gap-2 hover:gap-4 transition-all"
            >
              {t("seeAll")} <ChevronRight size={15} />
            </Link>
          </div>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 lg:-mx-12 lg:px-12"
          >
            {islands.map((island, i) => (
              <motion.a
                key={island.id}
                href={isEn ? `/en/ilhas/${island.id}` : `/ilhas/${island.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group flex-shrink-0 w-52 cursor-pointer rounded-2xl overflow-hidden border border-white/6 hover:border-ncv-gold/30 hover:shadow-[0_0_26px_-4px_rgba(201,160,94,0.45),0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={island.image}
                    alt={island.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-xs font-sans">{island.temperature}</span>
                      <span className="text-ncv-gold/60 text-xs font-sans">{island.duration}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-ncv-gold/10 border border-ncv-gold/20 flex items-center justify-center">
                    <span className="text-ncv-gold text-xs font-sans">{i + 1}</span>
                  </div>
                </div>
                <div className="px-3.5 py-3 bg-ncv-night/60">
                  <h4 className="text-white font-serif text-base group-hover:text-ncv-gold transition-colors leading-snug">
                    {island.name}
                  </h4>
                  <p className="text-white/35 text-xs font-sans mt-0.5 leading-tight">
                    {island.tagline}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
