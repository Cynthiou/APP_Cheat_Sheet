import { useState } from 'react';
import { useToast } from '@/features/toast';

interface Props {
  code: string;
  label?: string;
}

export function CopyButton({ code, label = 'Copier' }: Props) {
  const [done, setDone] = useState(false);
  const { show } = useToast();

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        show('Copie indisponible sur ce navigateur');
        return;
      }
      setDone(true);
      show('Code copié');
      window.setTimeout(() => setDone(false), 1200);
    } catch {
      show('Copie impossible');
    }
  }

  return (
    <button
      type="button"
      className={`copy${done ? ' done' : ''}`}
      onClick={handleCopy}
      aria-label={done ? 'Code copié' : `${label} le code`}
    >
      <svg viewBox="0 0 24 24">
        {done ? (
          <path d="M20 6L9 17l-5-5" />
        ) : (
          <>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 012-2h10" />
          </>
        )}
      </svg>
      {done ? 'Copié' : label}
    </button>
  );
}
