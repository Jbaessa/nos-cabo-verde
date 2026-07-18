"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { playlists } from "@/lib/data";

const genres = [
  { name: "Morna", icon: "♪", active: true },
  { name: "Funaná", icon: "🎸", active: false },
  { name: "Batuque", icon: "🥁", active: false },
  { name: "Coladeira", icon: "💃", active: false },
  { name: "Tabanka", icon: "🎶", active: false },
];

const waveHeights = [20, 35, 50, 42, 28, 55, 38, 30, 48, 22, 40, 33, 58, 25, 45];

export function MusicSection() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState("Morna");

  return (
    <section id="musica" className="bg-ncv-salt py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-ncv-gold" />
              <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
                Música
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ncv-night leading-tight">
              A Nossa
              <br />
              <span className="text-gradient-gold">Música</span>
            </h2>
          </div>

          {/* Genre tabs */}
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g.name}
                onClick={() => setActiveGenre(g.name)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-sans transition-all ${
                  activeGenre === g.name
                    ? "bg-ncv-night text-ncv-gold border border-ncv-gold/30"
                    : "border border-ncv-basalt/15 text-ncv-basalt/50 hover:border-ncv-gold/30 hover:text-ncv-gold"
                }`}
              >
                <span className="text-base">{g.icon}</span>
                {g.name}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Playlists */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {playlists.map((playlist, i) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-44 overflow-hidden mb-3">
                    <img
                      src={playlist.image}
                      alt={playlist.name}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-ncv-night/50" />

                    {/* Play button */}
                    <button
                      onClick={() => setPlaying(playing === playlist.id ? null : playlist.id)}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-ncv-gold flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-black/30">
                        {playing === playlist.id ? (
                          <Pause size={18} className="text-ncv-night" />
                        ) : (
                          <Play size={18} className="text-ncv-night ml-0.5" />
                        )}
                      </div>
                    </button>

                    {/* Track count */}
                    <div className="absolute bottom-3 right-3 bg-ncv-night/70 backdrop-blur-sm px-2 py-1">
                      <span className="text-white/60 text-[10px] font-sans">{playlist.tracks} músicas</span>
                    </div>

                    {/* Playing indicator */}
                    {playing === playlist.id && (
                      <div className="absolute bottom-3 left-3 flex items-end gap-0.5 h-5">
                        {waveHeights.slice(0, 6).map((h, wi) => (
                          <motion.div
                            key={wi}
                            className="w-1 bg-ncv-gold rounded-full"
                            animate={{ height: [h * 0.3, h * 0.8, h * 0.3] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              delay: wi * 0.1,
                              ease: "easeInOut",
                            }}
                            style={{ height: h * 0.3 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <h4 className="font-sans text-sm font-semibold text-ncv-night group-hover:text-ncv-blue transition-colors leading-snug mb-0.5">
                    {playlist.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-ncv-basalt/35 text-xs font-sans">{playlist.mood}</span>
                    <span className="text-ncv-basalt/20">·</span>
                    <span className="text-ncv-basalt/35 text-xs font-sans">{playlist.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar — Featured artist */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="bg-ncv-night rounded-2xl overflow-hidden">
              <div className="relative h-72 overflow-hidden rounded-t-2xl">
                <img
                  src="/images/cesaria-evora.png"
                  alt="Cesária Évora"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/10 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-ncv-gold text-xs font-sans tracking-widest uppercase bg-ncv-night/60 backdrop-blur-sm px-3.5 py-1 rounded-full">
                    Artista em Destaque
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-2xl text-white mb-1">Cesária Évora</h3>
                <p className="text-ncv-gold/60 text-sm font-sans mb-4">São Vicente · Morna</p>
                <p className="text-white/40 text-sm font-sans leading-relaxed mb-6">
                  &ldquo;A diva dos pés descalços&rdquo;. A voz que levou Cabo Verde ao mundo inteiro e
                  eternizou a morna como arte universal.
                </p>

                {/* Spotify embed */}
                <iframe
                  src="https://open.spotify.com/embed/playlist/7q0mFpor4WDp5ZUhqN9uVm?utm_source=generator"
                  width="100%"
                  height="232"
                  style={{ border: "none" }}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
