"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music2, ExternalLink } from "lucide-react";
import { playlists } from "@/lib/data";

const waveHeights = [20, 35, 50, 42, 28, 55, 38, 30, 48, 22, 40, 33, 58, 25, 45];

type Playlist = (typeof playlists)[number];

export function MusicSection() {
  const t = useTranslations("musicSection");
  const [playing, setPlaying] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState("Morna");
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const genres = [
    { name: "Morna", icon: "♪", descKey: "mornaDesc", spotifyId: "6bHuZog5a0N2nMRC3ycMAR" },
    { name: "Funaná", icon: "🎸", descKey: "funanadesc", spotifyId: null },
    { name: "Batuque", icon: "🥁", descKey: "batuqueDesc", spotifyId: null },
    { name: "Coladeira", icon: "💃", descKey: "colaDesc", spotifyId: null },
    { name: "Tabanka", icon: "🎶", descKey: "tabankaDesc", spotifyId: null },
  ];

  const currentGenre = genres.find((g) => g.name === activeGenre) ?? genres[0];

  const sidebarSpotifyId = selectedPlaylist?.spotifyId ?? currentGenre.spotifyId ?? null;
  const sidebarLabel = selectedPlaylist ? selectedPlaylist.name : currentGenre.name;
  const sidebarDescription = selectedPlaylist ? selectedPlaylist.mood : t(currentGenre.descKey as Parameters<typeof t>[0]);
  const sidebarKey = selectedPlaylist?.id ?? currentGenre.name;

  function handleGenreClick(name: string) {
    setActiveGenre(name);
    setSelectedPlaylist(null);
  }

  function handleCardClick(playlist: Playlist) {
    setSelectedPlaylist(playlist.id === selectedPlaylist?.id ? null : playlist);
  }

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
              {t("heading1")}
              <br />
              <span className="text-gradient-gold">{t("heading2")}</span>
            </h2>
          </div>

          {/* Genre tabs */}
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g.name}
                onClick={() => handleGenreClick(g.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans transition-all duration-200 ${
                  activeGenre === g.name
                    ? "bg-ncv-night text-ncv-gold border border-ncv-gold/30 shadow-[0_0_14px_-2px_rgba(201,160,94,0.4)]"
                    : "border border-ncv-basalt/15 text-ncv-basalt/50 hover:border-ncv-gold/30 hover:text-ncv-gold hover:shadow-[0_0_10px_-2px_rgba(201,160,94,0.2)]"
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
              {playlists.map((playlist, i) => {
                const isSelected = selectedPlaylist?.id === playlist.id;
                const isPlaying = playing === playlist.id;

                return (
                  <motion.div
                    key={playlist.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleCardClick(playlist)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden bg-white border transition-all duration-300 ${
                      isSelected
                        ? "border-ncv-gold/50 shadow-[0_0_32px_-4px_rgba(201,160,94,0.55),0_4px_16px_rgba(0,0,0,0.08)]"
                        : "border-ncv-basalt/10 shadow-sm hover:border-ncv-gold/25 hover:shadow-[0_0_22px_-4px_rgba(201,160,94,0.3),0_4px_20px_rgba(0,0,0,0.07)]"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={playlist.image}
                        alt={playlist.name}
                        className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/70 via-ncv-night/20 to-transparent" />

                      {/* Play button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlaying(isPlaying ? null : playlist.id);
                          handleCardClick(playlist);
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/40 ${
                            isSelected
                              ? "bg-ncv-gold scale-110 shadow-[0_0_20px_rgba(201,160,94,0.6)]"
                              : "bg-ncv-gold/90 group-hover:bg-ncv-gold group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(201,160,94,0.5)]"
                          }`}
                        >
                          {isPlaying ? (
                            <Pause size={18} className="text-ncv-night" />
                          ) : (
                            <Play size={18} className="text-ncv-night ml-0.5" />
                          )}
                        </div>
                      </button>

                      {/* Track count + Spotify badge */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-ncv-night/70 backdrop-blur-sm rounded-full px-2.5 py-1">
                        {playlist.spotifyId && (
                          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-[#1DB954] flex-shrink-0">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                          </svg>
                        )}
                        <span className="text-white/70 text-[10px] font-sans">{playlist.tracks} músicas</span>
                      </div>

                      {/* Wave indicator */}
                      {isPlaying && (
                        <div className="absolute bottom-3 left-3 flex items-end gap-0.5 h-5">
                          {waveHeights.slice(0, 6).map((h, wi) => (
                            <motion.div
                              key={wi}
                              className="w-1 bg-ncv-gold rounded-full"
                              animate={{ height: [h * 0.3, h * 0.8, h * 0.3] }}
                              transition={{ repeat: Infinity, duration: 0.8, delay: wi * 0.1, ease: "easeInOut" }}
                              style={{ height: h * 0.3 }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Selected badge */}
                      {isSelected && (
                        <div className="absolute top-3 left-3">
                          <span className="text-ncv-night text-[9px] font-sans font-bold tracking-wider uppercase bg-ncv-gold px-2.5 py-1 rounded-full">
                            {t("playing")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="px-4 py-3.5">
                      <h4
                        className={`font-sans text-sm font-semibold leading-snug mb-1 transition-colors ${
                          isSelected ? "text-ncv-blue" : "text-ncv-night group-hover:text-ncv-blue"
                        }`}
                      >
                        {playlist.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-ncv-basalt/40 text-xs font-sans">{playlist.mood}</span>
                        <span className="text-ncv-basalt/20 text-xs">·</span>
                        <span className="text-ncv-basalt/40 text-xs font-sans">{playlist.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar — dynamic embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="bg-ncv-night rounded-2xl overflow-hidden sticky top-24">
              {/* Mood image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src="/images/morna.png"
                  alt="Música de Cabo Verde"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={sidebarKey + "-label"}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="text-ncv-gold text-xs font-sans tracking-widest uppercase bg-ncv-night/70 backdrop-blur-sm px-3.5 py-1 rounded-full">
                        {sidebarLabel}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-5">
                {/* Description */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={sidebarKey + "-desc"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-white/40 text-xs font-sans leading-relaxed mb-4"
                  >
                    {sidebarDescription}
                  </motion.p>
                </AnimatePresence>

                {/* Spotify embed or placeholder */}
                <AnimatePresence mode="wait">
                  {sidebarSpotifyId ? (
                    <motion.div
                      key={sidebarSpotifyId}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <iframe
                        src={`https://open.spotify.com/embed/playlist/${sidebarSpotifyId}?utm_source=generator`}
                        width="100%"
                        height="352"
                        style={{ border: "none", borderRadius: "12px" }}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      />
                      <a
                        href={`https://open.spotify.com/playlist/${sidebarSpotifyId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20 hover:bg-[#1DB954]/20 transition-colors text-[#1DB954] text-xs font-sans font-medium"
                      >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                        {t("openSpotify")}
                        <ExternalLink size={11} />
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={sidebarKey + "-empty"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center justify-center gap-3 h-44 rounded-xl border border-white/8 bg-white/3"
                    >
                      <Music2 size={28} className="text-ncv-gold/30" />
                      <p className="text-white/30 text-xs font-sans text-center leading-snug">
                        {sidebarLabel}<br />{t("comingSoon")}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
