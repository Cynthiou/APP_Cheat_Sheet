import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContent } from '@/search/searchEngine';
import { isTemplate } from '@/types/content';
import type { Content } from '@/types/content';
import { useToast } from '@/features/toast';
import { TECHNOLOGY_LABEL } from '@/utils/labels';
import { contentPath } from '@/utils/paths';

const MAX = 8;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { show } = useToast();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('cmdk:open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('cmdk:open', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const results = useMemo<Content[]>(() => {
    if (!q.trim()) return [];
    const all = searchContent(q, {});
    const templates = all.filter((c) => c.kind === 'template');
    const rest = all.filter((c) => c.kind !== 'template');
    return [...templates, ...rest].slice(0, MAX);
  }, [q]);

  useEffect(() => {
    setSel((s) => Math.min(s, Math.max(0, results.length - 1)));
  }, [results.length]);

  if (!open) return null;

  async function copyTemplate(c: Content) {
    if (isTemplate(c)) {
      const code = c.variants[0]?.codeBlocks[0]?.code ?? '';
      try {
        await navigator.clipboard.writeText(code);
        show(`« ${c.title} » copié`);
      } catch {
        show('Copie impossible');
      }
    }
  }

  function openFiche(c: Content) {
    navigate(contentPath(c));
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const c = results[sel];
      if (c) openFiche(c);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const c = results[sel];
      if (!c) return;
      if (c.kind === 'template') {
        copyTemplate(c);
        setOpen(false);
      } else {
        openFiche(c);
      }
    }
  }

  const templates = results.filter((c) => c.kind === 'template');
  const others = results.filter((c) => c.kind !== 'template');

  function Row({ c }: { c: Content }) {
    const idx = results.indexOf(c);
    const active = idx === sel;
    return (
      <button
        type="button"
        className={`cmd-row${active ? ' active' : ''}`}
        onMouseEnter={() => setSel(idx)}
        onClick={() => (c.kind === 'template' ? (copyTemplate(c), setOpen(false)) : openFiche(c))}
      >
        <span className="cmd-icon" style={{ background: `var(--tech-${c.technology})` }}>
          {c.kind === 'template' ? '</>' : c.kind === 'guide' ? '❯' : '▤'}
        </span>
        <span className="cmd-main">
          <span className="cmd-title">{c.title}</span>
          <span className="cmd-sub">
            {TECHNOLOGY_LABEL[c.technology]} · {c.kind === 'template' ? 'copier le code' : 'ouvrir la fiche'}
          </span>
        </span>
        {active && c.kind === 'template' && <span className="cmd-enter">⏎ copier</span>}
        {active && c.kind !== 'template' && <span className="cmd-enter">⏎ ouvrir</span>}
      </button>
    );
  }

  return (
    <div className="cmd-backdrop" onClick={() => setOpen(false)}>
      <div className="cmd-panel" role="dialog" aria-label="Recherche rapide" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Cherche un template, une notion…"
            aria-label="Recherche rapide"
          />
          <span className="cmd-esc">esc</span>
        </div>

        <div className="cmd-results">
          {!q.trim() ? (
            <div className="cmd-hint-empty">Tape pour chercher — ex. « formulaire », « fetch », « route ».</div>
          ) : results.length === 0 ? (
            <div className="cmd-hint-empty">Rien trouvé pour « {q} ».</div>
          ) : (
            <>
              {templates.length > 0 && (
                <div className="cmd-group">
                  <div className="cmd-group-label">Templates</div>
                  {templates.map((c) => (
                    <Row key={c.id} c={c} />
                  ))}
                </div>
              )}
              {others.length > 0 && (
                <div className="cmd-group">
                  <div className="cmd-group-label">Comprendre</div>
                  {others.map((c) => (
                    <Row key={c.id} c={c} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="cmd-foot">
          <span><b>↑↓</b> naviguer</span>
          <span><b>⏎</b> copier / ouvrir</span>
          <span><b>→</b> ouvrir la fiche</span>
        </div>
      </div>
    </div>
  );
}
