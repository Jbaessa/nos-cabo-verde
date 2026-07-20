"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { diasporaCommunities, diasporaStories, diasporaEvents } from "@/lib/data";
import { motion } from "framer-motion";

const stats = [
  { value: "700 000+", label: "Cabo-verdianos no mundo" },
  { value: "2×", label: "Mais fora do que dentro das ilhas" },
  { value: "120+", label: "Países de acolhimento" },
  { value: "500 anos", label: "De história de emigração" },
];

const islandRootColors: Record<string, string> = {
  Santiago: "bg-ncv-blue/30 text-ncv-blue border-ncv-blue/20",
  "São Vicente": "bg-purple-900/30 text-purple-300 border-purple-700/20",
  "Santo Antão": "bg-emerald-900/30 text-emerald-400 border-emerald-700/20",
  Fogo: "bg-red-900/30 text-red-400 border-red-700/20",
  Brava: "bg-indigo-900/30 text-indigo-300 border-indigo-700/20",
  "São Nicolau": "bg-green-900/30 text-green-400 border-green-700/20",
  Sal: "bg-amber-900/30 text-amber-400 border-amber-700/20",
};

export default function DiasporaPage() {
  const [activeContinent, setActiveContinent] = useState("Todos");

  const continents = ["Todos", "Europa", "Américas", "África"];

  const continentMap: Record<string, string[]> = {
    Europa: ["portugal", "franca", "paises-baixos", "italia", "luxemburgo"],
    Américas: ["eua", "brasil"],
    África: ["angola", "senegal"],
  };

  const filtered =
    activeContinent === "Todos"
      ? diasporaCommunities
      : diasporaCommunities.filter((c) =>
          continentMap[activeContinent]?.includes(c.id)
        );

  const totalDiaspora = diasporaCommunities.reduce(
    (acc, c) => acc + c.populationNumber,
    0
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ncv-night">

        {/* ── HERO ─────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          {/* Background: dark gradient with subtle globe texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-ncv-night via-ncv-blue/10 to-ncv-night" />

          {/* Decorative dots — diáspora points */}
          {[
            { x: "18%", y: "35%", size: 10, delay: 0 },
            { x: "32%", y: "28%", size: 6, delay: 0.3 },
            { x: "48%", y: "38%", size: 8, delay: 0.6 },
            { x: "62%", y: "32%", size: 12, delay: 0.2 },
            { x: "73%", y: "42%", size: 7, delay: 0.9 },
            { x: "85%", y: "36%", size: 9, delay: 0.4 },
            { x: "25%", y: "55%", size: 5, delay: 0.7 },
            { x: "55%", y: "60%", size: 6, delay: 1.0 },
          ].map((dot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: dot.delay, duration: 0.6 }}
              className="absolute rounded-full bg-ncv-gold pointer-events-none"
              style={{
                left: dot.x,
                top: dot.y,
                width: dot.size,
                height: dot.size,
                boxShadow: `0 0 ${dot.size * 3}px ${dot.size}px rgba(201,160,94,0.15)`,
              }}
            />
          ))}

          {/* Lines connecting dots — suggestion of connection */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" preserveAspectRatio="none">
            <line x1="18%" y1="35%" x2="32%" y2="28%" stroke="#C9A05E" strokeWidth="1" />
            <line x1="32%" y1="28%" x2="48%" y2="38%" stroke="#C9A05E" strokeWidth="1" />
            <line x1="48%" y1="38%" x2="62%" y2="32%" stroke="#C9A05E" strokeWidth="1" />
            <line x1="62%" y1="32%" x2="73%" y2="42%" stroke="#C9A05E" strokeWidth="1" />
            <line x1="73%" y1="42%" x2="85%" y2="36%" stroke="#C9A05E" strokeWidth="1" />
            <line x1="18%" y1="35%" x2="25%" y2="55%" stroke="#C9A05E" strokeWidth="1" />
            <line x1="48%" y1="38%" x2="55%" y2="60%" stroke="#C9A05E" strokeWidth="1" />
          </svg>

          {/* Cabo Verde marker — origin point */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute pointer-events-none"
            style={{ left: "8%", top: "48%" }}
          >
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-ncv-gold border-2 border-ncv-gold/50" />
              <div className="absolute inset-0 rounded-full bg-ncv-gold/30 animate-ping" />
              <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-ncv-gold text-[10px] font-sans tracking-wider">Cabo Verde</p>
              </div>
            </div>
          </motion.div>

          {/* Hero content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-16 pt-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <p className="text-ncv-gold text-xs tracking-[0.35em] uppercase mb-5">
                — A diáspora cabo-verdiana
              </p>
              <h1 className="font-serif text-5xl lg:text-7xl xl:text-8xl text-white mb-6 leading-tight">
                Somos de todo<br />
                <span className="text-ncv-gold">o mundo</span>
              </h1>
              <p className="text-white/60 font-sans text-lg max-w-2xl leading-relaxed">
                Mais de {(totalDiaspora / 1000).toFixed(0)} mil cabo-verdianos vivem fora das dez ilhas.
                Levam a língua crioula, a morna e a morabeza — a arte de ser generoso — por onde quer que vão.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── STATS BAR ───────────────────────────── */}
        <section className="border-y border-white/8 bg-white/3">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.6 }}
                  className="px-6 py-8 text-center"
                >
                  <p className="font-serif text-3xl text-ncv-gold mb-1">{stat.value}</p>
                  <p className="text-white/40 text-xs font-sans">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMUNITIES ─────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px w-12 bg-ncv-gold" />
                <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">Onde vivemos</span>
              </div>
              <h2 className="font-serif text-4xl text-white">Comunidades no mundo</h2>
            </div>

            {/* Continent filter */}
            <div className="flex gap-2 flex-wrap">
              {continents.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveContinent(c)}
                  className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-200 ${
                    activeContinent === c
                      ? "bg-ncv-gold text-ncv-night font-semibold"
                      : "bg-white/8 text-white/60 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((community, i) => (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  href={`/diaspora/${community.id}`}
                  className="block rounded-2xl bg-white/5 border border-white/8 overflow-hidden group hover:border-white/20 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={community.image}
                      alt={community.country}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-3xl">{community.flag}</span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="text-ncv-gold font-sans font-bold text-xl">{community.population}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-serif text-xl text-white mb-1">{community.country}</h3>
                    <p className="text-white/40 text-xs font-sans mb-3">{community.city}</p>
                    <p className="text-white/60 text-sm font-sans leading-relaxed mb-4">
                      {community.description}
                    </p>

                    {/* Highlight quote */}
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border-l-2 border-ncv-gold/40">
                      <span className="text-ncv-gold/50 font-serif text-lg leading-none mt-0.5">"</span>
                      <p className="text-white/50 text-xs font-sans italic leading-relaxed">
                        {community.highlight}
                      </p>
                    </div>

                    {/* Island roots */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {community.islandRoots.map((island) => (
                        <span
                          key={island}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-sans border ${islandRootColors[island] ?? "bg-white/5 text-white/40 border-white/10"}`}
                        >
                          {island}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── STORIES ─────────────────────────────── */}
        <section className="bg-white/3 border-y border-white/8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-12 bg-ncv-gold" />
              <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">Histórias reais</span>
            </div>
            <h2 className="font-serif text-4xl text-white mb-12">Vozes da diáspora</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diasporaStories.map((person, i) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl bg-ncv-night border border-white/8 overflow-hidden"
                >
                  {/* Photo */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/90 via-ncv-night/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span className="text-xl">{person.flag}</span>
                      <div>
                        <p className="text-white text-sm font-sans font-medium">{person.name}</p>
                        <p className="text-white/50 text-xs font-sans">{person.city}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-ncv-gold/10 text-ncv-gold text-xs font-sans border border-ncv-gold/20">
                        Origem: {person.islandOrigin}
                      </span>
                    </div>
                    <blockquote className="font-serif text-white/85 text-base leading-relaxed mb-4">
                      &ldquo;{person.quote}&rdquo;
                    </blockquote>
                    <p className="text-white/40 text-xs font-sans leading-relaxed">
                      {person.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GLOBAL EVENTS ───────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-12 bg-ncv-gold" />
            <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">Agenda global</span>
          </div>
          <h2 className="font-serif text-4xl text-white mb-12">Eventos da diáspora</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {diasporaEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/8 hover:border-white/20 transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-2xl">{event.flag}</span>
                    <span className="px-2.5 py-1 rounded-full bg-ncv-gold/90 text-ncv-night text-xs font-sans font-semibold">
                      {event.category}
                    </span>
                  </div>
                  {event.free && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-emerald-500/80 text-white text-xs font-sans font-semibold">
                      Entrada livre
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <p className="text-ncv-gold font-sans text-sm font-semibold">{event.dateDisplay}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-white mb-1">{event.name}</h3>
                  <p className="text-white/40 text-xs font-sans mb-3 flex items-center gap-1.5">
                    <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current flex-shrink-0">
                      <path d="M8 0a5 5 0 0 0-5 5c0 3.5 5 11 5 11s5-7.5 5-11a5 5 0 0 0-5-5zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                    {event.city}
                  </p>
                  <p className="text-white/60 text-sm font-sans leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA REGISTO ─────────────────────────── */}
        <section id="registo" className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
          <div className="rounded-2xl bg-gradient-to-br from-ncv-blue to-ncv-night border border-white/10 p-10 lg:p-14 text-center">
            <p className="text-ncv-gold text-xs tracking-[0.3em] uppercase mb-4">— Junta-te a nós</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mb-4">
              A tua comunidade<br />merece estar aqui
            </h2>
            <p className="text-white/60 font-sans text-base max-w-lg mx-auto mb-8 leading-relaxed">
              Se representas uma associação ou comunidade cabo-verdiana no mundo, contacta-nos para figurares nesta plataforma e ligar-te à rede global.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:diaspora@noscaboverde.cv"
                className="btn btn-gold px-8 py-3.5 text-base inline-block"
              >
                Registar a minha comunidade
              </a>
              <Link
                href="/"
                className="btn btn-glass text-white/60 hover:text-white px-6 py-3.5 text-sm inline-block transition-colors"
              >
                Voltar ao início
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
