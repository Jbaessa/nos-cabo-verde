"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FavoriteButton } from "@/components/FavoriteButton";
import { BookingModal } from "@/components/BookingModal";
import { experiences } from "@/lib/data";
import { motion } from "framer-motion";

type Experience = (typeof experiences)[number];

const difficultyColor: Record<string, string> = {
  Fácil: "bg-emerald-500/20 text-emerald-400",
  Moderado: "bg-amber-500/20 text-amber-400",
  Difícil: "bg-red-500/20 text-red-400",
  Iniciante: "bg-sky-500/20 text-sky-400",
};

interface Props {
  experience: Experience;
  related: Experience[];
}

export function ExperienceDetailClient({ experience, related }: Props) {
  const t = useTranslations("experienceDetail");
  const locale = useLocale();
  const isEn = locale === "en";
  const [booking, setBooking] = useState(false);

  const difficultyMap: Record<string, string> = {
    Fácil: t("easy"),
    Moderado: t("moderate"),
    Difícil: t("difficult"),
    Iniciante: t("beginner"),
  };

  const difficultyLabel = difficultyMap[experience.difficulty] ?? experience.difficulty;

  return (
    <main className="min-h-screen bg-ncv-night">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-ncv-gold/90 text-ncv-night text-xs font-sans font-semibold">
                  {experience.category}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-sans font-medium ${difficultyColor[experience.difficulty] ?? "bg-white/10 text-white/60"}`}
                >
                  {difficultyLabel}
                </span>
              </div>
              <h1 className="font-serif text-4xl lg:text-6xl text-white mb-3">{experience.title}</h1>
              <p className="text-white/70 font-sans text-lg">
                {experience.island} · {experience.duration}
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <FavoriteButton category="experiences" id={experience.id} className="w-11 h-11" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-2xl text-white mb-4">{t("about")}</h2>
              <p className="text-white/70 font-sans text-base leading-relaxed">{experience.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 className="font-serif text-2xl text-white mb-4">{t("included")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {experience.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <svg viewBox="0 0 20 20" className="w-4 h-4 fill-ncv-gold shrink-0">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/80 text-sm font-sans">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Link
                href={isEn ? `/en/ilhas/${experience.islandId}` : `/ilhas/${experience.islandId}`}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-ncv-gold/30 transition-all duration-300 group"
              >
                <div className="flex-1">
                  <p className="text-ncv-gold text-xs font-sans uppercase tracking-wider mb-1">{t("location")}</p>
                  <h3 className="font-serif text-xl text-white">{experience.island}</h3>
                  <p className="text-white/50 text-sm font-sans mt-1">{t("seeIsland")}</p>
                </div>
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/30 group-hover:text-ncv-gold transition-colors" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Sidebar — booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
              <div>
                <span className="text-ncv-gold font-sans font-bold text-3xl">{experience.price}€</span>
                <span className="text-white/40 text-sm font-sans ml-2">{experience.priceUnit}</span>
              </div>

              <div className="space-y-3 text-sm font-sans">
                <div className="flex justify-between text-white/60">
                  <span>{t("duration")}</span>
                  <span className="text-white">{experience.duration}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>{t("difficulty")}</span>
                  <span className="text-white">{difficultyLabel}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>{t("rating")}</span>
                  <span className="text-white flex items-center gap-1">
                    <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-ncv-gold">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {experience.rating}
                  </span>
                </div>
              </div>

              <button onClick={() => setBooking(true)} className="btn btn-gold w-full py-3.5 text-base">
                {t("bookNow")}
              </button>

              <div className="flex items-center justify-center gap-2">
                <FavoriteButton category="experiences" id={experience.id} />
                <span className="text-white/40 text-xs font-sans">{t("saveFavorites")}</span>
              </div>

              <p className="text-white/30 text-xs font-sans text-center">
                {t("responseNote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <h2 className="font-serif text-3xl text-white mb-8">{t("youMightAlsoLike")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((exp) => (
              <Link
                key={exp.id}
                href={isEn ? `/en/experiencias/${exp.id}` : `/experiencias/${exp.id}`}
                className="group overflow-hidden rounded-2xl bg-white/5 hover:bg-white/8 transition-all duration-300 border border-white/5 hover:border-white/15"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-ncv-gold/90 text-ncv-night text-xs font-sans font-semibold">
                    {exp.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base text-white mb-1">{exp.title}</h3>
                  <p className="text-white/50 text-xs font-sans">{exp.island} · {exp.price}€</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {booking && <BookingModal experience={experience} onClose={() => setBooking(false)} />}
    </main>
  );
}
