"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cultureItems } from "@/lib/data";

export function CultureSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <section id="cultura" className="bg-ncv-blue py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-ncv-gold" />
              <span className="text-ncv-gold text-xs font-sans tracking-[0.3em] uppercase">
                Identidade
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Cultura
              <br />
              <span className="text-ncv-gold">em Movimento</span>
            </h2>
          </div>

          {/* Scroll controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:border-ncv-gold/50 hover:text-ncv-gold transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:border-ncv-gold/50 hover:text-ncv-gold transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 lg:-mx-12 lg:px-12"
        >
          {cultureItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative flex-shrink-0 w-72 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[380px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-600"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/90 via-ncv-night/20 to-transparent" />
                {/* Color accent on top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: item.color, opacity: 0.7 }}
                />

                {/* Play button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <Play size={20} className="text-white ml-1" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="font-serif text-2xl text-white mb-1.5">{item.name}</h3>
                  <p className="text-white/50 text-xs font-sans leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                  <div className="h-px w-8 bg-ncv-gold mt-4 group-hover:w-16 transition-all duration-300" />
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
          className="mt-12 flex items-center justify-center"
        >
          <a
            href="#"
            className="btn btn-gold-line w-full sm:w-auto px-8 sm:px-10 py-4 text-sm"
          >
            Explorar toda a Cultura Cabo-Verdiana
          </a>
        </motion.div>
      </div>
    </section>
  );
}
