import type { ContentKind, Technology } from '@/types/content';
import type { SearchFilters } from '@/search/searchEngine';
import { CATEGORIES, CATEGORY_OF } from '@/data/categories';
import { KIND_LABEL, TECHNOLOGY_LABEL, TECHNOLOGY_ORDER, techColorVar } from '@/utils/labels';

interface Props {
  filters: SearchFilters;
  onChange: (f: SearchFilters) => void;
}

const KINDS: ContentKind[] = ['lesson', 'template', 'guide'];

export function Filters({ filters, onChange }: Props) {
  const techs: Technology[] = filters.category
    ? (CATEGORIES.find((c) => c.id === filters.category)?.technologies ?? [])
    : TECHNOLOGY_ORDER;

  return (
    <div>
      <div className="catrow" role="group" aria-label="Catégorie">
        {CATEGORIES.map((c) => {
          const on = filters.category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              className={`catchip cat-${c.id}${on ? ' active' : ''}`}
              aria-pressed={on}
              title={c.hint}
              onClick={() =>
                onChange({
                  ...filters,
                  category: on ? null : c.id,
                  technology:
                    filters.technology && CATEGORY_OF[filters.technology] === c.id && !on
                      ? filters.technology
                      : null,
                })
              }
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="kindtabs" role="tablist" aria-label="Type de contenu">
        <button
          type="button"
          role="tab"
          aria-selected={!filters.kind}
          className={`ktab${!filters.kind ? ' active' : ''}`}
          onClick={() => onChange({ ...filters, kind: null })}
        >
          Tout
        </button>
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={filters.kind === k}
            className={`ktab${filters.kind === k ? ' active' : ''}`}
            onClick={() => onChange({ ...filters, kind: k })}
          >
            {KIND_LABEL[k]}s
          </button>
        ))}
      </div>

      <div className="techstrip" role="group" aria-label="Filtrer par technologie">
        {techs.map((t) => {
          const on = filters.technology === t;
          return (
            <button
              key={t}
              type="button"
              className={`tchip${on ? ' active' : ''}`}
              aria-pressed={on}
              onClick={() => onChange({ ...filters, technology: on ? null : t })}
            >
              <b style={{ background: techColorVar(t) }} />
              {TECHNOLOGY_LABEL[t]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
