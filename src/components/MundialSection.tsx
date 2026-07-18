"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function MundialSection() {
  return (
    <section className="bg-ncv-night relative overflow-hidden">
      {/* Ghost background — match photo esbatido */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <img
          src="/images/mundial-match.jpg"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-[0.06] object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ncv-night via-ncv-night/90 to-ncv-night/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ncv-night/60 via-transparent to-ncv-night/40" />
      </div>

      {/* Glow accent */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ncv-blue/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">

          {/* ── LEFT: fans photo ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-2 relative overflow-hidden rounded-2xl min-h-[360px] lg:min-h-[560px]"
          >
            <img
              src="/images/mundial-fans.jpg"
              alt="Adeptos cabo-verdianos no Mundial 2026"
              className="w-full h-full object-cover object-top"
            />

            {/* Gradient from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-ncv-night via-ncv-night/20 to-transparent" />

            {/* Flag strip + label */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="h-px w-full bg-white/10 mb-4" />
              <div className="flex items-center gap-3">
                {/* Cabo Verde flag mini */}
                <div className="flex items-center h-4 w-8 overflow-hidden rounded-sm flex-shrink-0">
                  <div className="w-full h-full flex flex-col">
                    <div className="flex-[3] bg-ncv-blue" />
                    <div className="flex-[1] bg-white" />
                    <div className="flex-[1] bg-ncv-red" />
                    <div className="flex-[1] bg-white" />
                    <div className="flex-[3] bg-ncv-blue" />
                  </div>
                </div>
                <span className="text-white/60 text-[11px] font-sans tracking-[0.25em] uppercase">
                  Os Tubarões Azuis
                </span>
              </div>
            </div>

            {/* "Cabo Verde" overlay text (esbatido) */}
            <div className="absolute top-6 left-6 right-6 pointer-events-none">
              <span className="font-serif text-7xl font-bold text-white/[0.04] leading-none select-none">
                CV
              </span>
            </div>
          </motion.div>

          {/* ── RIGHT: text content ──────────────────── */}
          <div className="lg:col-span-3 flex flex-col justify-center lg:pl-6">

            {/* FIFA 2026 logo + hosts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-5 mb-10"
            >
              <img
                src="https://assets.football-logos.cc/logos/tournaments/1500x1500/fifa-world-cup-2026--white.10e0b37b.png"
                alt="FIFA World Cup 2026"
                className="h-14 lg:h-16 w-auto opacity-85"
              />
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-white/25 text-[9px] font-sans tracking-[0.3em] uppercase mb-1">
                  EUA · Canadá · México
                </p>
                <p className="text-white/40 text-xs font-sans tracking-[0.2em] uppercase">
                  Copa do Mundo FIFA
                </p>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              <h2 className="font-serif leading-[0.88] mb-5">
                <span className="block text-7xl lg:text-8xl xl:text-9xl text-white">
                  Cabo
                </span>
                <span className="block text-7xl lg:text-8xl xl:text-9xl text-gradient-gold">
                  Verde
                </span>
              </h2>
              <p className="text-white/30 text-xs lg:text-sm font-sans tracking-[0.35em] uppercase mb-10">
                no palco do mundo
              </p>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-white/8 mb-10" />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/45 text-sm lg:text-[15px] font-sans leading-[1.9] mb-10 max-w-md"
            >
              Dez ilhas. Um povo. Um sonho que atravessou o Atlântico.
              Os Tubarões Azuis escreveram história e levaram a bandeira
              azul das estrelas ao maior palco do futebol mundial.
            </motion.p>

            {/* Match photo strip — esbatido */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.95 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative h-24 overflow-hidden rounded-xl mb-10"
            >
              <img
                src="/images/mundial-match.jpg"
                alt="Cabo Verde em campo"
                className="w-full h-full object-cover object-[center_30%]"
              />
              <div className="absolute inset-0 bg-ncv-night/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-ncv-night/80 via-transparent to-ncv-night/80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/35 text-[10px] font-sans tracking-[0.4em] uppercase">
                  FIFA World Cup 2026 · Grupo de Fase Final
                </span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <a
                href="#"
                className="btn btn-gold inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase px-7 py-3.5"
              >
                Acompanhar os Tubarões Azuis
                <ArrowRight size={15} />
              </a>
              <a
                href="#"
                className="btn btn-glass inline-flex items-center gap-2 text-xs font-sans text-white/50 hover:text-white px-5 py-3.5 transition-colors"
              >
                Ver calendário
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
