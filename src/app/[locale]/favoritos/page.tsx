"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useFavorites } from "@/lib/favorites-context";
import { islands, experiences, editorialFeatures } from "@/lib/data";

const tabs = [
  { id: "islands", label: "Ilhas" },
  { id: "experiences", label: "Experiências" },
  { id: "articles", label: "Artigos" },
] as const;

type Tab = (typeof tabs)[number]["id"];

export default function FavoritosPage() {
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState<Tab>("islands");

  const savedIslands = islands.filter((i) => favorites.islands.includes(i.id));
  const savedExperiences = experiences.filter((e) => favorites.experiences.includes(e.id));
  const savedArticles = editorialFeatures.filter((a) => favorites.articles.includes(a.id));

  const counts = {
    islands: savedIslands.length,
    experiences: savedExperiences.length,
    articles: savedArticles.length,
  };

  const totalCount = counts.islands + counts.experiences + counts.articles;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ncv-night pt-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-8">
          <p className="text-ncv-gold text-xs tracking-[0.3em] uppercase mb-4">
            — A tua colecção
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-4">
            Os teus{" "}
            <span className="text-ncv-gold">favoritos</span>
          </h1>
          <p className="text-white/60 font-sans text-lg max-w-xl">
            {totalCount === 0
              ? "Ainda não guardaste nada. Explora e clica no coração para guardar."
              : `${totalCount} ${totalCount === 1 ? "item guardado" : "itens guardados"} na tua colecção pessoal.`}
          </p>
        </section>

        {/* Tabs */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-4">
          <div className="flex gap-2 border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-sans font-medium transition-all duration-200 border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-ncv-gold text-ncv-gold"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                {tab.label}
                {counts[tab.id] > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 rounded-full bg-ncv-gold/20 text-ncv-gold text-xs">
                    {counts[tab.id]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          {/* Islands */}
          {activeTab === "islands" && (
            <>
              {savedIslands.length === 0 ? (
                <EmptyState label="ilhas" href="/ilhas" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedIslands.map((island) => (
                    <Link
                      key={island.id}
                      href={`/ilhas/${island.id}`}
                      className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/8 transition-all duration-300"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={island.image}
                          alt={island.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <FavoriteButton category="islands" id={island.id} />
                        </div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="font-serif text-xl text-white">{island.name}</h3>
                          <p className="text-white/70 text-xs font-sans mt-1">{island.tagline}</p>
                        </div>
                      </div>
                      <div className="p-4 flex gap-4">
                        <span className="text-ncv-gold text-xs font-sans">{island.temperature}</span>
                        <span className="text-white/40 text-xs font-sans">{island.duration}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Experiences */}
          {activeTab === "experiences" && (
            <>
              {savedExperiences.length === 0 ? (
                <EmptyState label="experiências" href="/experiencias" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedExperiences.map((exp) => (
                    <Link
                      key={exp.id}
                      href={`/experiencias/${exp.id}`}
                      className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/8 transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={exp.image}
                          alt={exp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <FavoriteButton category="experiences" id={exp.id} />
                        </div>
                        <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-ncv-gold/90 text-ncv-night text-xs font-sans font-semibold">
                          {exp.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif text-lg text-white mb-1">{exp.title}</h3>
                        <p className="text-white/50 text-xs font-sans mb-3">{exp.island} · {exp.duration}</p>
                        <p className="text-ncv-gold font-sans font-semibold text-sm">
                          {exp.price}€ <span className="text-white/40 font-normal">{exp.priceUnit}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Articles */}
          {activeTab === "articles" && (
            <>
              {savedArticles.length === 0 ? (
                <EmptyState label="artigos" href="/#editorial" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {savedArticles.map((article) => (
                    <div
                      key={article.id}
                      className="group relative overflow-hidden rounded-2xl bg-white/5"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <FavoriteButton category="articles" id={article.id} />
                        </div>
                        <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-ncv-blue/80 text-white text-xs font-sans uppercase tracking-wider">
                          {article.type}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif text-lg text-white mb-1 line-clamp-2">{article.title}</h3>
                        <p className="text-white/50 text-xs font-sans">{article.readTime} de leitura · {article.island}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function EmptyState({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white/30" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-white/40 font-sans text-sm mb-4">Ainda não tens {label} guardados.</p>
      <Link href={href} className="btn btn-gold-line text-sm px-6 py-2.5">
        Explorar {label}
      </Link>
    </div>
  );
}
