"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Users, MapPin, Globe } from "lucide-react";
import { diasporaCommunities, diasporaStories, diasporaEvents } from "@/lib/data";

type Community = (typeof diasporaCommunities)[number];

const islandRootColors: Record<string, string> = {
  Santiago: "bg-ncv-blue/30 text-blue-300 border-ncv-blue/30",
  "São Vicente": "bg-purple-900/30 text-purple-300 border-purple-700/30",
  "Santo Antão": "bg-emerald-900/30 text-emerald-400 border-emerald-700/30",
  Fogo: "bg-red-900/30 text-red-400 border-red-700/30",
  Brava: "bg-indigo-900/30 text-indigo-300 border-indigo-700/30",
  "São Nicolau": "bg-green-900/30 text-green-400 border-green-700/30",
  Sal: "bg-amber-900/30 text-amber-400 border-amber-700/30",
};

export function CommunityDetail({
  community,
  prev,
  next,
  index,
}: {
  community: Community;
  prev: Community;
  next: Community;
  index: number;
}) {
  const t = useTranslations("communityDetail");
  const locale = useLocale();
  const isEn = locale === "en";

  const stories = diasporaStories.filter((s) => s.country === community.country);
  const events = diasporaEvents.filter((e) => e.country === community.country);
  const total = diasporaCommunities.length;

  const diasporaHref = isEn ? "/en/diaspora" : "/diaspora";
  const diasporaRegisterHref = isEn ? "/en/diaspora#registo" : "/diaspora#registo";

  return (
    <div className="bg-ncv-night">
      {/* ── Hero ── */}
      <div className="relative h-[72vh] min-h-[520px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={community.image}
          alt={community.country}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/40 to-ncv-night/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ncv-night/70 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-12 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href={diasporaHref}
              className="inline-flex items-center gap-2 text-white/50 hover:text-ncv-gold text-xs font-sans tracking-widest uppercase mb-6 transition-colors"
            >
              <ArrowLeft size={13} /> {t("back")}
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-ncv-gold text-xs font-sans tracking-widest uppercase border border-ncv-gold/30 bg-ncv-night/50 backdrop-blur-sm px-3.5 py-1 rounded-full">
                {t("community")} {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <span className="text-5xl lg:text-6xl">{community.flag}</span>
              <h1 className="font-serif text-5xl lg:text-7xl text-white leading-none">
                {community.country}
              </h1>
            </div>
            <p className="text-ncv-gold text-base lg:text-lg font-sans italic">
              {community.city}
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
            <Users size={16} className="text-ncv-gold" />
            <div>
              <p className="text-white/30 text-[10px] font-sans uppercase tracking-wider">
                {t("capeVerdeans")}
              </p>
              <p className="text-white text-sm font-sans font-semibold">{community.population}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-ncv-gold" />
            <div>
              <p className="text-white/30 text-[10px] font-sans uppercase tracking-wider">
                {t("mainCities")}
              </p>
              <p className="text-white text-sm font-sans">{community.city}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe size={16} className="text-ncv-gold" />
            <div>
              <p className="text-white/30 text-[10px] font-sans uppercase tracking-wider">
                {t("islandRoots")}
              </p>
              <p className="text-white text-sm font-sans">{community.islandRoots.join(", ")}</p>
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
                {t("communitySection")}
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl text-white leading-snug mb-6">
              {t("capeVerdeansIn")} {community.country}
            </h2>
            <p className="text-white/60 text-base lg:text-lg font-sans leading-relaxed mb-10">
              {community.description}
            </p>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/8 border-l-4 border-l-ncv-gold mb-10">
              <span className="text-ncv-gold font-serif text-4xl leading-none mt-1 flex-shrink-0">"</span>
              <p className="text-white/70 font-sans italic text-base leading-relaxed">
                {community.highlight}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href={diasporaHref} className="btn btn-gold px-8 py-4 text-sm font-bold tracking-wide">
                {t("viewAllCommunities")}
              </Link>
              <Link href={diasporaRegisterHref} className="btn btn-glass px-8 py-4 text-sm">
                {t("registerCommunity")}
              </Link>
            </div>
          </motion.div>

          {/* Island roots */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="border border-white/8 rounded-2xl p-8">
              <p className="text-ncv-gold/60 text-[10px] font-sans tracking-[0.3em] uppercase mb-6">
                {t("islandRootsLabel")}
              </p>
              {community.islandRoots.map((island, i) => (
                <div
                  key={island}
                  className="flex items-center gap-4 py-3.5 border-b border-white/5 last:border-0"
                >
                  <span className="text-ncv-gold/40 text-[10px] font-mono tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-sans border ${
                      islandRootColors[island] ?? "bg-white/5 text-white/50 border-white/10"
                    }`}
                  >
                    {island}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stories ── */}
      {stories.length > 0 && (
        <section className="bg-white/3 border-y border-white/8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-12 bg-ncv-gold" />
              <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
                {t("communityVoices")}
              </span>
            </div>
            <h2 className="font-serif text-3xl text-white mb-10">
              {t("storiesFrom")} {community.country}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story, i) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl bg-ncv-night border border-white/8 overflow-hidden"
                >
                  <div className="relative h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="text-xl">{story.flag}</span>
                      <span className="text-white/60 text-xs font-sans">{story.city}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <blockquote className="text-white font-serif text-base leading-relaxed mb-3">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>
                    <p className="text-ncv-gold text-sm font-sans font-medium">{story.name}</p>
                    <p className="text-white/40 text-xs font-sans">{t("islandLabel")} {story.islandOrigin}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Events ── */}
      {events.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-12 bg-ncv-gold" />
            <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">{t("agenda")}</span>
          </div>
          <h2 className="font-serif text-3xl text-white mb-10">
            {t("eventsIn")} {community.country}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-5 p-5 rounded-2xl bg-white/4 border border-white/8 hover:border-white/20 transition-colors"
              >
                <div className="flex-shrink-0 w-16 text-center">
                  <p className="text-ncv-gold font-serif text-lg leading-none">{event.dateDisplay}</p>
                  <p className="text-white/30 text-[10px] font-sans mt-1">{event.category}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans font-semibold text-white text-sm mb-1">{event.name}</h3>
                  <p className="text-white/40 text-xs font-sans mb-2">{event.city}</p>
                  <p className="text-white/50 text-xs font-sans leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                </div>
                {event.free && (
                  <span className="flex-shrink-0 self-start px-2 py-0.5 text-[10px] rounded-full bg-emerald-900/40 text-emerald-400 border border-emerald-700/30 font-sans">
                    {t("free")}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Prev / Next navigation ── */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          {[
            { nav: prev, label: t("prevCommunity"), dir: "prev" as const },
            { nav: next, label: t("nextCommunity"), dir: "next" as const },
          ].map(({ nav, label, dir }) => (
            <Link
              key={dir}
              href={isEn ? `/en/diaspora/${nav.id}` : `/diaspora/${nav.id}`}
              className={`group relative h-56 overflow-hidden flex items-center ${
                dir === "next" ? "justify-end text-right md:border-l md:border-white/8" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={nav.image}
                alt={nav.country}
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
                  <span className="mr-2">{nav.flag}</span>
                  {nav.country}
                </h3>
                <p className="text-white/40 text-xs font-sans mt-1">{nav.city}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
