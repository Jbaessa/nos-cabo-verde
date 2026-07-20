"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Thermometer,
  Clock,
  MapPin,
  Compass,
  ChevronDown,
} from "lucide-react";
import { islands } from "@/lib/data";
import { islandGroup } from "@/lib/island-groups";

type Island = (typeof islands)[number];

export function IslandDetail({
  island,
  prev,
  next,
  index,
}: {
  island: Island;
  prev: Island;
  next: Island;
  index: number;
}) {
  const group = islandGroup(island.id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-ncv-night">
      {/* ── Hero ── */}
      <div className="relative h-[72vh] min-h-[520px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={island.image}
          alt={island.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/40 to-ncv-night/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ncv-night/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-12 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href="/#ilhas"
              className="inline-flex items-center gap-2 text-white/50 hover:text-ncv-gold text-xs font-sans tracking-widest uppercase mb-6 transition-colors"
            >
              <ArrowLeft size={13} /> Todas as Ilhas
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-ncv-gold text-xs font-sans tracking-widest uppercase border border-ncv-gold/30 bg-ncv-night/50 backdrop-blur-sm px-3.5 py-1 rounded-full">
                {group}
              </span>
              <span className="text-white/40 text-xs font-sans tracking-widest uppercase">
                Ilha {String(index + 1).padStart(2, "0")} / 10
              </span>
            </div>

            <h1 className="font-serif text-6xl lg:text-8xl text-white leading-none mb-4">
              {island.name}
            </h1>
            <p className="text-ncv-gold text-lg lg:text-xl font-sans italic">
              &ldquo;{island.tagline}&rdquo;
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border-y border-white/8"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-wrap gap-x-12 gap-y-4">
          <div className="flex items-center gap-3">
            <Thermometer size={16} className="text-ncv-gold" />
            <div>
              <p className="text-white/30 text-[10px] font-sans uppercase tracking-wider">
                Temperatura média
              </p>
              <p className="text-white text-sm font-sans">{island.temperature}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-ncv-gold" />
            <div>
              <p className="text-white/30 text-[10px] font-sans uppercase tracking-wider">
                Estadia ideal
              </p>
              <p className="text-white text-sm font-sans">{island.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Compass size={16} className="text-ncv-gold" />
            <div>
              <p className="text-white/30 text-[10px] font-sans uppercase tracking-wider">
                Grupo
              </p>
              <p className="text-white text-sm font-sans">{group}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-ncv-gold" />
            <div>
              <p className="text-white/30 text-[10px] font-sans uppercase tracking-wider">
                Arquipélago
              </p>
              <p className="text-white text-sm font-sans">Cabo Verde</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-3 gap-14">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-ncv-gold" />
              <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
                A Ilha
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl text-white leading-snug mb-6">
              Descobre {island.name}
            </h2>
            <p className="text-white/60 text-base lg:text-lg font-sans leading-relaxed mb-10">
              {island.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/#planear" className="btn btn-gold px-8 py-4 text-sm font-bold tracking-wide">
                Planear a Viagem
              </a>
              <Link href="/#ilhas" className="btn btn-glass px-8 py-4 text-sm">
                Ver no Mapa
              </Link>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="border border-white/8 rounded-2xl overflow-hidden">
              <div className="px-8 pt-8 pb-4">
                <p className="text-ncv-gold/60 text-[10px] font-sans tracking-[0.3em] uppercase">
                  Não Percas
                </p>
              </div>
              {island.highlights.map((h, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={h.name} className="border-t border-white/5">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 px-8 py-4 hover:bg-white/3 transition-colors text-left group"
                    >
                      <span className="text-ncv-gold/40 text-[10px] font-mono tabular-nums shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/80 text-sm font-sans flex-1 group-hover:text-white transition-colors">
                        {h.name}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`text-ncv-gold/50 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-8 pb-5 pt-1 text-white/50 text-xs font-sans leading-relaxed border-t border-white/5">
                            {h.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="pb-4" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Prev / Next navigation ── */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          {[
            { island: prev, label: "Ilha anterior", dir: "prev" as const },
            { island: next, label: "Próxima ilha", dir: "next" as const },
          ].map(({ island: nav, label, dir }) => (
            <Link
              key={dir}
              href={`/ilhas/${nav.id}`}
              className={`group relative h-56 overflow-hidden flex items-center ${
                dir === "next" ? "justify-end text-right md:border-l md:border-white/8" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={nav.image}
                alt={nav.name}
                className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-ncv-night/50" />
              <div className="relative px-8 lg:px-12">
                <p
                  className={`text-white/40 text-[10px] font-sans tracking-[0.3em] uppercase mb-2 flex items-center gap-2 ${
                    dir === "next" ? "justify-end" : ""
                  }`}
                >
                  {dir === "prev" && (
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                  )}
                  {label}
                  {dir === "next" && (
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  )}
                </p>
                <h3 className="font-serif text-3xl text-white group-hover:text-ncv-gold transition-colors">
                  {nav.name}
                </h3>
                <p className="text-white/40 text-xs font-sans italic mt-1">{nav.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
