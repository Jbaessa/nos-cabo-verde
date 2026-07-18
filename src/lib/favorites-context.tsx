"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

type FavoritesState = {
  islands: string[];
  experiences: string[];
  articles: string[];
};

type FavoritesAction =
  | { type: "TOGGLE"; category: keyof FavoritesState; id: string }
  | { type: "LOAD"; state: FavoritesState };

const initialState: FavoritesState = { islands: [], experiences: [], articles: [] };

function reducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  if (action.type === "LOAD") return action.state;
  const list = state[action.category];
  const next = list.includes(action.id)
    ? list.filter((x) => x !== action.id)
    : [...list, action.id];
  return { ...state, [action.category]: next };
}

type FavoritesContextValue = {
  favorites: FavoritesState;
  toggle: (category: keyof FavoritesState, id: string) => void;
  isFavorite: (category: keyof FavoritesState, id: string) => boolean;
  totalCount: number;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const STORAGE_KEY = "ncv_favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) dispatch({ type: "LOAD", state: JSON.parse(stored) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggle = (category: keyof FavoritesState, id: string) =>
    dispatch({ type: "TOGGLE", category, id });

  const isFavorite = (category: keyof FavoritesState, id: string) =>
    favorites[category].includes(id);

  const totalCount =
    favorites.islands.length + favorites.experiences.length + favorites.articles.length;

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite, totalCount }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
