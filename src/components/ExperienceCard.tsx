"use client";

import Link from "next/link";
import { FavoriteButton } from "@/components/FavoriteButton";

type Experience = {
  id: string;
  title: string;
  island: string;
  islandId: string;
  category: string;
  duration: string;
  price: number;
  priceUnit: string;
  image: string;
  description: string;
  rating: number;
  difficulty: string;
  highlights: string[];
};

type Props = {
  experience: Experience;
  onBook: (exp: Experience) => void;
};

const difficultyColor: Record<string, string> = {
  Fácil: "bg-emerald-500/20 text-emerald-400",
  Moderado: "bg-amber-500/20 text-amber-400",
  Difícil: "bg-red-500/20 text-red-400",
  Iniciante: "bg-sky-500/20 text-sky-400",
};

export function ExperienceCard({ experience, onBook }: Props) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/5 hover:bg-white/8 transition-all duration-300 border border-white/5 hover:border-white/15">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ncv-gold/90 text-ncv-night text-xs font-sans font-semibold">
          {experience.category}
        </span>

        {/* Favorite */}
        <div className="absolute top-3 right-3">
          <FavoriteButton category="experiences" id={experience.id} />
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-ncv-gold">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-white text-xs font-sans font-medium">{experience.rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg text-white leading-snug">{experience.title}</h3>
          <span
            className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-sans font-medium ${
              difficultyColor[experience.difficulty] ?? "bg-white/10 text-white/60"
            }`}
          >
            {experience.difficulty}
          </span>
        </div>

        <p className="text-white/50 text-xs font-sans mb-3">
          {experience.island} · {experience.duration}
        </p>

        <p className="text-white/70 text-sm font-sans line-clamp-2 mb-4 flex-1">
          {experience.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div>
            <span className="text-ncv-gold font-sans font-bold text-lg">{experience.price}€</span>
            <span className="text-white/40 text-xs font-sans ml-1">{experience.priceUnit}</span>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/experiencias/${experience.id}`}
              className="btn btn-glass text-xs px-3 py-2"
            >
              Detalhes
            </Link>
            <button
              onClick={() => onBook(experience)}
              className="btn btn-gold text-xs px-3 py-2"
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
