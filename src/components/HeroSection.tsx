"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Volume2, VolumeX, ChevronDown, Play } from "lucide-react";

const diasporaCountriesPt = [
  "Portugal", "Angola", "Estados Unidos", "França", "Países Baixos",
  "Luxemburgo", "Itália", "Senegal", "Brasil", "São Tomé e Príncipe",
  "Suíça", "Suécia", "Alemanha", "Reino Unido", "Bélgica",
];

const diasporaCountriesEn = [
  "Portugal", "Angola", "United States", "France", "Netherlands",
  "Luxembourg", "Italy", "Senegal", "Brazil", "São Tomé and Príncipe",
  "Switzerland", "Sweden", "Germany", "United Kingdom", "Belgium",
];

export function HeroSection() {
  const t = useTranslations("hero");
  const [soundOn, setSoundOn] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(0);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  const isEn = t("line1") === "Cape Verde";
  const countries = isEn ? diasporaCountriesEn : diasporaCountriesPt;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCountry((prev) => (prev + 1) % countries.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [countries.length]);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Cabo Verde"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ncv-night/75 via-ncv-night/35 to-ncv-night/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ncv-night/60 via-transparent to-ncv-night/30" />
        <div className="absolute inset-0 bg-ncv-blue/15" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6 lg:px-12 pt-20"
      >
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-ncv-gold" />
            <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
              {t("eyebrow")}
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="font-serif leading-none mb-6"
          >
            <span className="block text-white text-4xl sm:text-6xl lg:text-[88px] xl:text-[104px]">
              {t("line1")}
            </span>
            <span className="block text-4xl sm:text-6xl lg:text-[88px] xl:text-[104px] text-gradient-gold">
              {t("line2")}
            </span>
            <span className="block text-white text-4xl sm:text-6xl lg:text-[88px] xl:text-[104px]">
              {t("line3")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white/65 text-lg lg:text-xl font-sans leading-relaxed max-w-xl mb-10"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="#ilhas" className="group btn btn-gold px-8 py-4 font-bold text-sm tracking-wide">
              {t("cta")}
              <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </a>
            <a href="#ilhas" className="btn btn-glass px-8 py-4 font-semibold text-sm tracking-wide">
              {t("ctaIslands")}
            </a>
            <a
              href="#musica"
              className="flex items-center gap-3 text-white/70 hover:text-ncv-gold font-sans font-medium text-sm py-4 transition-colors"
            >
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-ncv-gold transition-colors">
                <Play size={12} className="ml-0.5" />
              </div>
              {t("ctaMusic")}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Diaspora ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 left-6 lg:left-12 z-20"
      >
        <p className="text-white/30 text-xs font-sans mb-1.5 tracking-widest uppercase">
          {t("presentIn")}
        </p>
        <motion.p
          key={currentCountry}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="text-ncv-gold text-sm font-sans font-medium"
        >
          {countries[currentCountry]}
        </motion.p>
      </motion.div>

      {/* Sound button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setSoundOn(!soundOn)}
        className="absolute bottom-16 right-6 lg:bottom-24 lg:right-12 z-20 flex items-center gap-3 bg-white/5 border border-white/15 text-white rounded-full px-5 py-3 hover:bg-ncv-gold/10 hover:border-ncv-gold/40 transition-all backdrop-blur-sm group"
      >
        <span className="text-xs font-sans tracking-wider text-white/60 group-hover:text-white transition-colors">
          {t("listen")}
        </span>
        <div className="w-7 h-7 rounded-full bg-ncv-gold/20 flex items-center justify-center">
          {soundOn ? (
            <Volume2 size={13} className="text-ncv-gold" />
          ) : (
            <VolumeX size={13} className="text-white/50" />
          )}
        </div>
        {soundOn && (
          <span className="absolute inset-0 rounded-full border border-ncv-gold/30 animate-ping" />
        )}
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
        />
        <span className="text-white/25 text-[10px] font-sans tracking-[0.25em] uppercase">Scroll</span>
      </motion.div>

      {/* Diagonal decorative line */}
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none">
        <svg viewBox="0 0 256 256" fill="none" className="w-full h-full opacity-5">
          <path d="M0 256 L256 0" stroke="#C9A05E" strokeWidth="1" />
          <path d="M40 256 L256 40" stroke="#C9A05E" strokeWidth="1" />
          <path d="M80 256 L256 80" stroke="#C9A05E" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}
