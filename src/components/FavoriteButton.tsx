"use client";

import { useFavorites } from "@/lib/favorites-context";

type Props = {
  category: "islands" | "experiences" | "articles";
  id: string;
  className?: string;
};

export function FavoriteButton({ category, id, className = "" }: Props) {
  const { toggle, isFavorite } = useFavorites();
  const active = isFavorite(category, id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(category, id);
      }}
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={`group flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
        active
          ? "bg-ncv-red/20 text-ncv-red"
          : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-4 h-4 transition-all duration-200 ${
          active ? "fill-ncv-red stroke-ncv-red scale-110" : "fill-transparent stroke-current"
        }`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
