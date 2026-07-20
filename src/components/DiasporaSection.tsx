"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { diasporaCommunities, diasporaStories } from "@/lib/data";

export function DiasporaSection() {
  const t = useTranslations("diasporaSection");
  const locale = useLocale();
  const isEn = locale === "en";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStory, setActiveStory] = useState(0);

  const story = diasporaStories[activeStory];

  const stats = [
    { value: "700 000+", label: t("stat0") },
    { value: "120+", label: t("stat1") },
    { value: "2×", label: t("stat2") },
    { value: "500 anos", label: t("stat3") },
  ];

  return (
    <section
      id="diaspora"
      ref={ref}
      className="relative bg-ncv-night overflow-hidden"
    >
      {/* Faint world map texture */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #C9A05E 1px, transparent 1px),
                           radial-gradient(circle at 40% 30%, #C9A05E 1px, transparent 1px),
                           radial-gradient(circle at 55% 40%, #C9A05E 1px, transparent 1px),
                           radial-gradient(circle at 70% 45%, #C9A05E 1px, transparent 1px),
                           radial-gradient(circle at 80% 35%, #C9A05E 1px, transparent 1px),
                           radial-gradient(circle at 30% 60%, #C9A05E 1px, transparent 1px),
                           radial-gradient(circle at 60% 65%, #C9A05E 1px, transparent 1px)`,
          backgroundSize: "800px 400px",
        }}
      />

      {/* Top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-ncv-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-ncv-gold" />
              <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
                {t("eyebrow")}
              </span>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
              {t("heading1")}<br />
              <span className="text-ncv-gold">{t("heading2")}</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-white/50 font-sans text-base lg:text-lg leading-relaxed lg:pb-2"
          >
            {t("body")}
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden mb-20"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-ncv-night/80 px-6 py-8 text-center"
            >
              <p className="font-serif text-3xl lg:text-4xl text-ncv-gold mb-2">{stat.value}</p>
              <p className="text-white/40 text-xs font-sans leading-snug">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main content: story + communities */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left: Story rotator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="lg:col-span-2"
          >
            <p className="text-ncv-gold/70 text-xs font-sans tracking-[0.25em] uppercase mb-6">
              {t("voices")}
            </p>

            {/* Story card */}
            <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 min-h-[380px]">
              <div className="relative h-52 overflow-hidden">
                <img
                  key={story.id}
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="text-xl">{story.flag}</span>
                  <span className="text-white/60 text-xs font-sans">{story.city}</span>
                </div>
              </div>
              <div className="p-6">
                <blockquote className="text-white font-serif text-lg leading-relaxed mb-4">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="text-ncv-gold text-sm font-sans font-medium">{story.name}</p>
                  <p className="text-white/40 text-xs font-sans">
                    {t("origin")} {story.islandOrigin} · {story.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Story navigation */}
            <div className="flex gap-2 mt-4">
              {diasporaStories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStory(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeStory ? "bg-ncv-gold w-8" : "bg-white/20 w-4 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: communities map list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <p className="text-ncv-gold/70 text-xs font-sans tracking-[0.25em] uppercase mb-6">
              {t("where")}
            </p>

            <div className="space-y-3">
              {diasporaCommunities.slice(0, 7).map((community, i) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}
                >
                  <Link
                    href={isEn ? `/en/diaspora/${community.id}` : `/diaspora/${community.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/4 hover:bg-white/8 border border-white/5 hover:border-white/15 transition-all duration-300 group"
                  >
                    <span className="text-2xl flex-shrink-0">{community.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-sans font-medium text-white text-sm group-hover:text-ncv-gold transition-colors">{community.country}</h3>
                      </div>
                      <p className="text-white/40 text-xs font-sans truncate">{community.city}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-ncv-gold font-sans font-semibold text-sm">{community.population}</p>
                      <p className="text-white/25 text-xs font-sans">{t("capeVerdeans")}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={isEn ? "/en/diaspora" : "/diaspora"}
                className="btn btn-gold inline-flex items-center justify-center gap-3 text-xs font-bold tracking-widest uppercase px-7 py-3.5"
              >
                {t("explore")}
                <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href={isEn ? "/en/diaspora#registo" : "/diaspora#registo"}
                className="btn btn-glass inline-flex items-center justify-center gap-2 text-xs font-sans text-white/50 hover:text-white px-5 py-3.5 transition-colors"
              >
                {t("register")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-ncv-gold/20 to-transparent" />
    </section>
  );
}
