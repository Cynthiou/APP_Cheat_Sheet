import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface ToastCtx {
  show: (message: string) => void;
}

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 1600);
  }, []);

  const value = useMemo<ToastCtx>(() => ({ show }), [show]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div aria-live="polite" role="status" className="sr-only-live">
        {message}
      </div>
      {message && (
        <div className="toast" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" fill="none" strokeWidth={2}>
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {message}
        </div>
      )}
    </Ctx.Provider>
  );
}

export function useToast(): ToastCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast doit être utilisé dans <ToastProvider>');
  return ctx;
}
