import { Link, useSearchParams } from 'react-router-dom';
import { ALL_CONTENT } from '@/data/catalog';
import { TOMES } from '@/data/tomes';
import { CATEGORIES, CATEGORY_BY_ID, CATEGORY_OF, isCategoryId } from '@/data/categories';
import type { CategoryId } from '@/data/categories';
import type { Technology } from '@/types/content';
import { TECHNOLOGY_LABEL } from '@/utils/labels';
import { NotionCard } from '@/components/search/NotionCard';
import { SearchBar } from '@/components/search/SearchBar';
import { searchContent } from '@/search/searchEngine';
import { groupNotions } from '@/utils/notions';

const TOME_INDEX: Record<string, number> = Object.fromEntries(TOMES.map((t, i) => [t.id, i]));
const SORTED = [...ALL_CONTENT]
  .filter((c) => c.kind !== 'guide')
  .sort((a, b) => (TOME_INDEX[a.tomeId] ?? 99) - (TOME_INDEX[b.tomeId] ?? 99));

const MAIN_TECHS: Technology[] = ['html', 'css', 'javascript', 'typescript', 'react', 'node', 'express', 'sql'];

export function ExplorePage() {
  const [params, setParams] = useSearchParams();

  const catParam = params.get('cat');
  const category = isCategoryId(catParam) ? catParam : null;
  const techParam = params.get('tech') as Technology | null;

  const chipTechs = category ? CATEGORY_BY_ID[category].technologies : MAIN_TECHS;
  const technology = techParam && chipTechs.includes(techParam) ? techParam : null;

  const q = params.get('q') ?? '';
  const nq = q.trim();
  const searching = nq.length > 0;

  let notions;
  let elsewhere: { cat: CategoryId; count: number }[] = [];
  if (searching) {
    const inScope = searchContent(nq, category ? { category } : {}).filter((c) => c.kind !== 'guide');
    notions = groupNotions(inScope);

    if (category) {
      const counts = new Map<CategoryId, Set<string>>();
      for (const c of searchContent(nq, {})) {
        if (c.kind === 'guide') continue;
        const cc = CATEGORY_OF[c.technology];
        if (cc === category) continue;
        if (!counts.has(cc)) counts.set(cc, new Set());
        counts.get(cc)!.add(c.slug);
      }
      elsewhere = CATEGORIES.filter((c) => counts.has(c.id)).map((c) => ({ cat: c.id, count: counts.get(c.id)!.size }));
    }
  } else {
    let items = SORTED;
    if (category) items = items.filter((c) => CATEGORY_OF[c.technology] === category);
    if (technology) items = items.filter((c) => c.technology === technology);
    notions = groupNotions(items);
  }

  function setQ(v: string) {
    const p = new URLSearchParams(params);
    if (v) p.set('q', v);
    else p.delete('q');
    setParams(p, { replace: true });
  }
  function setTech(t: Technology | null) {
    const p = new URLSearchParams(params);
    if (t) {
      p.set('tech', t);
      if (!category) p.set('cat', CATEGORY_OF[t]);
    } else {
      p.delete('tech');
    }
    setParams(p, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function clearCategory() {
    const p = new URLSearchParams(params);
    p.delete('cat');
    p.delete('tech');
    setParams(p, { replace: true });
  }

  return (
    <div className="reading">
      <header className="toc-head">
        <h1 className="title">Bibliothèque</h1>
        <p className="subtitle">Une notion, deux façons de l'ouvrir : comprendre ou copier.</p>
      </header>

      {category && (
        <div className="cat-context">
          <span className={`cat-context-dot cat-${category}`} style={{ background: 'var(--cat-color)' }} />
          <span className="cat-context-name">{CATEGORY_BY_ID[category].label}</span>
          <button type="button" className="cat-context-all" onClick={clearCategory}>
            · toute la bibliothèque
          </button>
        </div>
      )}

      <div className="search-row">
        <SearchBar value={q} onChange={setQ} placeholder="Rechercher une notion…" />
      </div>

      <div className="lib-toolbar">
        <div className="chip-row">
          <button type="button" className={`lib-chip${!technology ? ' active' : ''}`} onClick={() => setTech(null)}>
            Tous
          </button>
          {chipTechs.map((t) => (
            <button
              key={t}
              type="button"
              className={`lib-chip${technology === t ? ' active' : ''}`}
              onClick={() => setTech(technology === t ? null : t)}
            >
              <span className="lib-chip-dot" style={{ background: `var(--tech-${t})` }} />
              {TECHNOLOGY_LABEL[t]}
            </button>
          ))}
        </div>
      </div>

      <p className="toc-count">
        {searching
          ? `${notions.length} résultat${notions.length > 1 ? 's' : ''}${category ? ` dans ${CATEGORY_BY_ID[category].label}` : ''}`
          : `${notions.length} notion${notions.length > 1 ? 's' : ''}`}
      </p>

      {searching && category && elsewhere.length > 0 && (
        <div className="cross-hint">
          <span className="cross-hint-txt">
            {notions.length === 0
              ? `Rien dans ${CATEGORY_BY_ID[category].label} pour « ${nq} » — c’est plutôt dans :`
              : 'On le trouve aussi dans :'}
          </span>
          <span className="cross-hint-links">
            {elsewhere.map((e) => (
              <Link
                key={e.cat}
                to={`/bibliotheque?cat=${e.cat}&q=${encodeURIComponent(nq)}`}
                className={`cross-chip cat-${e.cat}`}
              >
                <span className="cross-dot" style={{ background: 'var(--cat-color)' }} />
                {CATEGORY_BY_ID[e.cat].label} <b>({e.count})</b>
              </Link>
            ))}
          </span>
        </div>
      )}

      {notions.length === 0 ? (
        elsewhere.length === 0 && (
          <div className="empty">
            <h3>Aucun résultat pour « {nq} »</h3>
            <p>Essaie un autre mot.</p>
          </div>
        )
      ) : (
        <div className="lib-list">
          {notions.map((n) => (
            <NotionCard key={n.key} notion={n} />
          ))}
        </div>
      )}
    </div>
  );
}
