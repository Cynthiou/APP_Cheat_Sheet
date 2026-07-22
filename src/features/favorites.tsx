import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface FavoritesCtx {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
}

const Ctx = createContext<FavoritesCtx | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('rm.favorites', []);

  const value = useMemo<FavoritesCtx>(
    () => ({
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggle: (id) =>
        setFavorites((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev],
        ),
    }),
    [favorites, setFavorites],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFavorites(): FavoritesCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useFavorites doit être utilisé dans <FavoritesProvider>');
  return ctx;
}
