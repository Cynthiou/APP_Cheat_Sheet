import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ALL_CONTENT, getById } from '@/data/catalog';
import { searchContent } from '@/search/searchEngine';
import { CATEGORIES } from '@/data/categories';
import { useFavorites } from '@/features/favorites';
import { useHistory } from '@/features/history';
import { SearchBar } from '@/components/search/SearchBar';
import { TECHNOLOGY_LABEL } from '@/utils/labels';
import { contentPath } from '@/utils/paths';
import { TechLogo } from '@/components/common/TechLogo';
import { isGuide } from '@/types/content';
import type { Content } from '@/types/content';
import type { HistoryEntry } from '@/features/history';

const KIND_HINT: Record<string, string> = {
  template: 'code à copier',
  lesson: 'comprendre',
  guide: 'guide',
};

const HOME_GUIDES = ALL_CONTENT.filter(isGuide).slice(0, 4);

function timeAgo(at: number): string {
  const min = Math.round((Date.now() - at) / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = Math.round(h / 24);
  if (d === 1) return 'hier';
  return `il y a ${d} j`;
}

export function HomePage() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { history } = useHistory();
  const [q, setQ] = useState('');
  const [focused, setFocused] = useState(false);
  const [sel, setSel] = useState(-1);

  const suggestions = useMemo<Content[]>(() => {
    if (q.trim().length < 2) return [];
    const all = searchContent(q, {});
    const seen = new Set<string>();
    const out: Content[] = [];
    for (const c of [...all.filter((c) => c.kind === 'template'), ...all.filter((c) => c.kind !== 'template')]) {
      if (seen.has(c.slug)) continue;
      seen.add(c.slug);
      out.push(c);
      if (out.length >= 6) break;
    }
    return out;
  }, [q]);

  const showSuggest = focused && q.trim().length >= 2;

  function go(query: string) {
    if (query.trim()) navigate(`/recherche?q=${encodeURIComponent(query.trim())}`);
  }
  function openFiche(c: Content) {
    navigate(contentPath(c));
  }
  function onSearchKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showSuggest) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, -1));
    } else if (e.key === 'Enter') {
      if (sel >= 0 && suggestions[sel]) {
        e.preventDefault();
        openFiche(suggestions[sel]);
      }
    } else if (e.key === 'Escape') {
      setFocused(false);
    }
  }

  const recent = history
    .map((e) => ({ e, c: getById(e.id) }))
    .filter((x): x is { e: HistoryEntry; c: Content } => !!x.c)
    .slice(0, 3);
  const favs = favorites
    .map((id) => getById(id))
    .filter((c): c is Content => c != null)
    .slice(0, 3);

  return (
    <div className="reading home">
      <header className="greeting-block">
        <h1 className="greeting">Bonjour.</h1>
        <p className="greeting-sub">Sur quoi tu bloques aujourd'hui ?</p>
      </header>

      <div className="home-searchbar">
        <SearchBar
          value={q}
          onChange={(v) => {
            setQ(v);
            setSel(-1);
          }}
          onSubmit={() => go(q)}
          onKeyDown={onSearchKey}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 120)}
          placeholder="Rechercher une notion, un besoin, un bout de code…"
        />

        {showSuggest && (
          <div className="suggest-pop" role="listbox" aria-label="Suggestions">
            {suggestions.length === 0 ? (
              <div className="suggest-empty">
                Rien trouvé pour « {q.trim()} ». <button type="button" className="suggest-all" onMouseDown={(e) => { e.preventDefault(); go(q); }}>Voir la recherche</button>
              </div>
            ) : (
              <>
                {suggestions.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    role="option"
                    aria-selected={i === sel}
                    className={`suggest-row${i === sel ? ' active' : ''}`}
                    onMouseEnter={() => setSel(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      openFiche(c);
                    }}
                  >
                    <span className="suggest-icon" style={{ background: `var(--tech-${c.technology})` }}>
                      <TechLogo technology={c.technology} />
                    </span>
                    <span className="suggest-main">
                      <span className="suggest-title">{c.title}</span>
                      <span className="suggest-sub">
                        {TECHNOLOGY_LABEL[c.technology]} · {KIND_HINT[c.kind] ?? 'fiche'}
                      </span>
                    </span>
                    <span className="suggest-go" aria-hidden="true">↵</span>
                  </button>
                ))}
                <button
                  type="button"
                  className="suggest-foot"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    go(q);
                  }}
                >
                  Voir tous les résultats pour « {q.trim()} »
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <section className="home-browse">
        <div className="col-head">
          <h2>Bibliothèque</h2>
          <Link to="/bibliotheque">Tout voir →</Link>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/bibliotheque?cat=${cat.id}`} className={`cat-card cat-${cat.id}`}>
              <span className="cat-card-dot" style={{ background: 'var(--cat-color)' }} />
              <span className="cat-card-label">{cat.label}</span>
              <span className="cat-card-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-browse">
        <div className="col-head">
          <h2>Guides</h2>
          <Link to="/guides">Tout voir →</Link>
        </div>
        <div className="guide-grid-home">
          {HOME_GUIDES.map((g) => (
            <Link key={g.id} to={contentPath(g)} className="rcard">
              <span className="rcard-icon" style={{ background: `var(--tech-${g.technology})` }}>
                <TechLogo technology={g.technology} />
              </span>
              <span className="rcard-main">
                <span className="rcard-title">{g.title}</span>
                <span className="rcard-meta">{g.steps.length} étapes · {TECHNOLOGY_LABEL[g.technology]}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="home-cols">
        <section className="home-col">
          <div className="col-head">
            <h2>Reprendre</h2>
            <Link to="/historique">Historique →</Link>
          </div>
          {recent.length > 0 ? (
            <div className="mini-list">
              {recent.map(({ e, c }) => (
                <Link key={e.id} to={contentPath(c)} className="rcard">
                  <span className="rcard-icon" style={{ background: `var(--tech-${c.technology})` }}>
                    <TechLogo technology={c.technology} />
                  </span>
                  <span className="rcard-main">
                    <span className="rcard-title">{c.shortTitle ?? c.title}</span>
                    <span className="rcard-meta">Consulté {timeAgo(e.at)}</span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="col-empty">Rien encore — ouvre une fiche, elle apparaîtra ici.</div>
          )}
        </section>

        <section className="home-col">
          <div className="col-head">
            <h2>Tes favoris</h2>
            <Link to="/favoris">Tout voir →</Link>
          </div>
          {favs.length > 0 ? (
            <div className="mini-list">
              {favs.map((c) => (
                <Link key={c.id} to={contentPath(c)} className="rcard fav">
                  <span className="rcard-icon" style={{ background: `var(--tech-${c.technology})` }}>
                    <TechLogo technology={c.technology} />
                  </span>
                  <span className="rcard-main">
                    <span className="rcard-title">{c.shortTitle ?? c.title}</span>
                    <span className="rcard-tech" style={{ color: `var(--tech-${c.technology})` }}>
                      {TECHNOLOGY_LABEL[c.technology]}
                    </span>
                  </span>
                  <span className="rcard-chev" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="col-empty">Ajoute une fiche en favori pour la garder sous la main.</div>
          )}
        </section>
      </div>
    </div>
  );
}
