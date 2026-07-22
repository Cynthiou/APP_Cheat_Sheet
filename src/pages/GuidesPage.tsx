import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ALL_CONTENT } from '@/data/catalog';
import { isGuide } from '@/types/content';
import type { GuideContent } from '@/types/content';
import { CATEGORIES, CATEGORY_OF } from '@/data/categories';
import type { CategoryId } from '@/data/categories';
import { TECHNOLOGY_LABEL } from '@/utils/labels';
import { TechLogo } from '@/components/common/TechLogo';
import { SearchBar } from '@/components/search/SearchBar';
import { contentPath } from '@/utils/paths';
import { normalize } from '@/utils/normalize';

const GUIDES: GuideContent[] = ALL_CONTENT.filter(isGuide);
const CAT_SHORT: Record<CategoryId, string> = {
  frontend: 'Front-end',
  backend: 'Back-end',
  bdd: 'BDD',
  outils: 'Outils',
};

const GUIDE_CATS = CATEGORIES.filter((c) => GUIDES.some((g) => CATEGORY_OF[g.technology] === c.id));

function GuideCard({ guide }: { guide: GuideContent }) {
  return (
    <Link to={contentPath(guide)} className="guide-card">
      <span className="guide-icon" style={{ background: `var(--tech-${guide.technology})` }}>
        <TechLogo technology={guide.technology} />
      </span>
      <span className="guide-body">
        <span className="guide-title">{guide.title}</span>
        {guide.objective && <span className="guide-obj">{guide.objective}</span>}
        <span className="guide-meta">
          <span className="guide-steps">{guide.steps.length} étapes</span>
          <span className="guide-tech">{TECHNOLOGY_LABEL[guide.technology]}</span>
        </span>
      </span>
      <span className="guide-arrow" aria-hidden="true">→</span>
    </Link>
  );
}

export function GuidesPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<CategoryId | null>(null);

  let items = GUIDES;
  if (cat) items = items.filter((g) => CATEGORY_OF[g.technology] === cat);
  const nq = normalize(q.trim());
  if (nq) {
    items = items.filter((g) =>
      normalize(`${g.title} ${g.objective} ${g.keywords.join(' ')} ${g.aliases.join(' ')}`).includes(nq),
    );
  }

  return (
    <div className="reading">
      <header className="toc-head">
        <h1 className="title">Guides</h1>
        <p className="subtitle">Des recettes pas-à-pas pour construire des trucs concrets, de A à Z.</p>
      </header>

      <div className="search-row">
        <SearchBar value={q} onChange={setQ} placeholder="Chercher un guide…" />
      </div>

      <div className="chip-row">
        <button type="button" className={`lib-chip${!cat ? ' active' : ''}`} onClick={() => setCat(null)}>
          Tous
        </button>
        {GUIDE_CATS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`lib-chip cat-${c.id}${cat === c.id ? ' active' : ''}`}
            onClick={() => setCat(cat === c.id ? null : c.id)}
          >
            <span className="lib-chip-dot" style={{ background: 'var(--cat-color)' }} />
            {CAT_SHORT[c.id]}
          </button>
        ))}
      </div>

      <p className="toc-count">
        {items.length} guide{items.length > 1 ? 's' : ''}
      </p>

      {items.length === 0 ? (
        <div className="empty">
          <h3>Aucun guide</h3>
          <p>Essaie un autre mot ou une autre catégorie.</p>
        </div>
      ) : (
        <div className="guide-grid">
          {items.map((g) => (
            <GuideCard key={g.id} guide={g} />
          ))}
        </div>
      )}
    </div>
  );
}
