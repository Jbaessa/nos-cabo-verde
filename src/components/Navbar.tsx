"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/lib/favorites-context";

const navLinks = [
  { label: "Ilhas", href: "/#ilhas" },
  { label: "Cultura", href: "/#cultura" },
  { label: "Música", href: "/#musica" },
  { label: "Gastronomia", href: "/#sabores" },
  { label: "Experiências", href: "/experiencias" },
  { label: "Parceiros", href: "/parceiros" },
  { label: "Agenda", href: "/#agenda" },
];

const mobileLinks = [
  ...navLinks,
  { label: "Favoritos", href: "/favoritos" },
  { label: "Perfil", href: "/perfil" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalCount } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ncv-night/95 backdrop-blur-md border-b border-ncv-gold/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="15" stroke="#C9A05E" strokeWidth="1.5" />
                <path
                  d="M8 16 C8 10 12 7 16 7 C20 7 24 10 24 16 C24 22 20 25 16 25 C12 25 8 22 8 16Z"
                  fill="#C9A05E"
                  fillOpacity="0.15"
                  stroke="#C9A05E"
                  strokeWidth="1"
                />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                  const angle = (i * 36 - 90) * (Math.PI / 180);
                  const r = 11;
                  const x = 16 + r * Math.cos(angle);
                  const y = 16 + r * Math.sin(angle);
                  return <circle key={i} cx={x} cy={y} r="1.2" fill="#C9A05E" />;
                })}
              </svg>
            </div>
            <span className="font-serif text-xl text-white">Nós Cabo Verde</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-ncv-gold text-sm font-sans font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center text-white/60 hover:text-ncv-gold transition-colors">
              <Search size={18} />
            </button>
            <button className="hidden lg:flex items-center gap-1.5 text-white/60 hover:text-ncv-gold transition-colors text-sm font-sans">
              <Globe size={15} />
              <span>PT</span>
            </button>

            {/* Favorites icon */}
            <Link
              href="/favoritos"
              className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 text-white/60 hover:text-white transition-all relative"
              aria-label="Favoritos"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ncv-red text-white text-[10px] font-sans font-bold flex items-center justify-center">
                  {totalCount > 9 ? "9+" : totalCount}
                </span>
              )}
            </Link>

            {/* Profile icon */}
            <Link
              href="/perfil"
              className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 text-white/60 hover:text-white transition-all"
              aria-label="Perfil"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            <Link
              href="/experiencias"
              className="hidden lg:inline-flex btn btn-gold text-xs font-bold px-5 py-2.5 tracking-wider uppercase"
            >
              Descobrir
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-white/80 hover:text-ncv-gold transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-ncv-night flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
              <span className="font-serif text-xl text-white">Nós Cabo Verde</span>
              <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-1 p-6 flex-1 overflow-y-auto">
              {mobileLinks.map((link, i) => (
                <motion.div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-serif text-3xl text-white/80 hover:text-ncv-gold py-3 border-b border-white/5 transition-colors"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between"
                    >
                      {link.label}
                      {link.label === "Favoritos" && totalCount > 0 && (
                        <span className="text-base font-sans px-2 py-0.5 rounded-full bg-ncv-red/20 text-ncv-red">
                          {totalCount}
                        </span>
                      )}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="p-6 border-t border-white/10">
              <p className="text-ncv-gold/60 text-xs font-sans tracking-widest">
                DESCOBRIR · SENTIR · PERTENCER
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
