import { createContext, useCallback, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const LIMIT = 40;

export type FicheTab = 'comprendre' | 'code';

export interface HistoryEntry {
  id: string;
  at: number;
  tab?: FicheTab;
}

interface HistoryCtx {
  history: HistoryEntry[];
  push: (id: string, tab?: FicheTab) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const Ctx = createContext<HistoryCtx | null>(null);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('rm.history.v2', []);

  const push = useCallback(
    (id: string, tab?: FicheTab) =>
      setHistory((prev) => {
        const rest = prev.filter((e) => e.id !== id);
        return [{ id, at: Date.now(), tab }, ...rest].slice(0, LIMIT);
      }),
    [setHistory],
  );

  const remove = useCallback(
    (id: string) => setHistory((prev) => prev.filter((e) => e.id !== id)),
    [setHistory],
  );

  const clear = useCallback(() => setHistory([]), [setHistory]);

  const value = useMemo<HistoryCtx>(
    () => ({ history, push, remove, clear }),
    [history, push, remove, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useHistory(): HistoryCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useHistory doit être utilisé dans <HistoryProvider>');
  return ctx;
}
