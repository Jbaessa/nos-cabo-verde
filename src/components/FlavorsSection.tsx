"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { flavors } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "Prato Principal": "bg-ncv-blue/80 text-white",
  "Petisco": "bg-ncv-gold/80 text-ncv-night",
  "Peixe e Marisco": "bg-teal-700/80 text-white",
  "Produtos Locais": "bg-amber-800/80 text-white",
  "Bebida": "bg-purple-900/80 text-white",
};

export function FlavorsSection() {
  const featured = flavors.find((f) => f.featured)!;
  const others = flavors.filter((f) => !f.featured);

  return (
    <section id="sabores" className="bg-ncv-night py-24 lg:py-32">
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
              Gastronomia
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Sabores de
              <br />
              <span className="text-ncv-gold">Cabo Verde</span>
            </h2>
            <p className="text-white/35 text-base font-sans max-w-sm leading-relaxed">
              Da cachupa ao queijo do Fogo. Da lagosta grelhada ao grogue de Santo Antão.
              Uma cozinha que conta a história de um povo.
            </p>
          </div>
        </motion.div>

        {/* Featured dish — full width hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative h-72 lg:h-96 mb-6 overflow-hidden cursor-pointer"
        >
          <img
            src={featured.image}
            alt={featured.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-600"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ncv-night/80 via-ncv-night/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/50 to-transparent" />

          <div className="absolute bottom-0 left-0 p-5 sm:p-8 lg:p-12">
            <span
              className={`inline-block text-xs font-sans font-bold tracking-widest uppercase px-3.5 py-1 mb-4 rounded-full ${categoryColors[featured.category]}`}
            >
              {featured.category}
            </span>
            <h3 className="font-serif text-4xl lg:text-5xl text-white mb-2">{featured.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={13} className="text-ncv-gold" />
              <span className="text-ncv-gold/70 text-sm font-sans">{featured.island}</span>
            </div>
            <p className="text-white/60 text-sm font-sans max-w-sm">{featured.description}</p>
            <a
              href="#"
              className="mt-5 inline-flex items-center gap-2 text-ncv-gold text-sm font-sans font-medium hover:gap-4 transition-all"
            >
              Ver receita <ArrowRight size={14} />
            </a>
          </div>

          {/* PRATO NACIONAL badge */}
          <div className="absolute top-6 right-6 border border-ncv-gold/30 text-ncv-gold text-xs font-sans tracking-widest px-3.5 py-1.5 bg-ncv-night/40 backdrop-blur-sm rounded-full">
            PRATO NACIONAL
          </div>
        </motion.div>

        {/* Grid of other dishes */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {others.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="group relative cursor-pointer overflow-hidden"
            >
              <div className="relative h-48 lg:h-56">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/90 via-ncv-night/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span
                    className={`inline-block text-[10px] font-sans font-bold tracking-widest uppercase px-2 py-0.5 mb-2 ${categoryColors[dish.category]}`}
                  >
                    {dish.category}
                  </span>
                  <h4 className="font-serif text-lg text-white leading-snug">{dish.name}</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={10} className="text-ncv-gold/60" />
                    <span className="text-white/40 text-xs font-sans">{dish.island}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#"
            className="btn btn-gold text-sm font-bold px-10 py-4 tracking-wide"
          >
            Explorar a Gastronomia Cabo-Verdiana
          </a>
          <a
            href="#"
            className="btn btn-glass px-8 py-4 text-sm"
          >
            Mapa Gastronómico
          </a>
        </motion.div>
      </div>
    </section>
  );
}
