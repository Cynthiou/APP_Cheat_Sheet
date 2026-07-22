import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Technology } from '@/types/content';
import { searchContent } from '@/search/searchEngine';
import { SearchBar } from '@/components/search/SearchBar';
import { NotionCard } from '@/components/search/NotionCard';
import { groupNotions } from '@/utils/notions';
import { useToast } from '@/features/toast';
import { TECHNOLOGY_ORDER } from '@/utils/labels';

const SUGGESTIONS = ['Requête fetch', 'API REST', 'Serveur Node', 'useState', 'formulaire'];

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const { show } = useToast();

  const q = params.get('q') ?? '';
  const techParam = params.get('tech');
  const technology = TECHNOLOGY_ORDER.includes(techParam as Technology) ? (techParam as Technology) : null;

  const raw = searchContent(q, { technology });
  const notions = groupNotions(raw);

  function update(next: { q?: string; technology?: Technology | null }) {
    const p = new URLSearchParams(params);
    if (next.q !== undefined) {
      if (next.q) p.set('q', next.q);
      else p.delete('q');
    }
    if (next.technology !== undefined) {
      if (next.technology) p.set('tech', next.technology);
      else p.delete('tech');
    }
    setParams(p, { replace: true });
  }

  return (
    <div className="reading">
      <h1 className="title" style={{ marginBottom: 16 }}>
        Recherche
      </h1>

      <div className="search-row">
        <SearchBar ref={inputRef} value={q} onChange={(v) => update({ q: v })} autoFocus />
      </div>

      <p className="toc-count">
        {notions.length} résultat{notions.length > 1 ? 's' : ''}
      </p>

      {q.trim() && notions.length === 0 ? (
        <div className="no-result">
          <h3>Rien trouvé pour « {q} »</h3>
          <p>Cette notion n'est pas encore dans Cheat Sheet. Vérifie l'orthographe, ou propose-la — on l'ajoute vite.</p>
          <div className="nr-actions">
            <button type="button" className="btn btn-primary" onClick={() => show('Merci ! On l\'ajoute à la liste.')}>
              + Proposer cette fiche
            </button>
            <button type="button" className="btn" onClick={() => update({ q: '' })}>
              Effacer la recherche
            </button>
          </div>
          <div className="nr-suggest">Peut-être que tu cherches</div>
          <div className="needs-chips">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" className="need-chip" onClick={() => update({ q: s })}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="lib-grid">
          {notions.map((n) => (
            <NotionCard key={n.key} notion={n} />
          ))}
        </div>
      )}
    </div>
  );
}
