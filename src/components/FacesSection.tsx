"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Quote } from "lucide-react";
import { faces } from "@/lib/data";

export function FacesSection() {
  const t = useTranslations("facesSection");

  return (
    <section id="rostos" className="bg-ncv-salt py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-ncv-gold" />
              <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
                {t("eyebrow")}
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ncv-night leading-tight">
              {t("heading")}
              <br />
              <span className="text-gradient-gold">{t("headingHighlight")}</span>
            </h2>
          </div>
          <p className="text-ncv-basalt/50 text-base font-sans max-w-md lg:text-right leading-relaxed">
            {t("desc")}
          </p>
        </motion.div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {faces.map((person, i) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl hover:shadow-[0_0_26px_-4px_rgba(201,160,94,0.35),0_4px_20px_rgba(0,0,0,0.15)] transition-shadow duration-300 ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              } ${i === 3 ? "lg:col-span-2" : ""}`}
            >
              <div className={`relative ${i === 3 ? "h-64" : "h-80"} overflow-hidden`}>
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/90 via-ncv-night/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-white">{person.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <MapPin size={11} className="text-ncv-gold" />
                        <span className="text-ncv-gold/70 text-xs font-sans">{person.island}</span>
                        <span className="text-white/20 text-xs">·</span>
                        <span className="text-white/40 text-xs font-sans">{person.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden max-h-28 lg:max-h-0 lg:group-hover:max-h-28 transition-all duration-400">
                    <div className="pt-3 border-t border-white/10 mt-3">
                      <Quote size={12} className="text-ncv-gold mb-1.5" />
                      <p className="text-white/70 text-xs font-sans leading-relaxed italic">
                        {person.quote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a href="#" className="btn btn-night px-10 py-4 text-sm">
            {t("cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
