import { Link } from 'react-router-dom';
import type { Notion } from '@/utils/notions';
import { TECHNOLOGY_LABEL } from '@/utils/labels';
import { contentPath } from '@/utils/paths';
import { useFavorites } from '@/features/favorites';
import { TechLogo } from '@/components/common/TechLogo';

function decode(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, '’')
    .replace(/&quot;/g, '"');
}

export function NotionCard({ notion }: { notion: Notion }) {
  const { lesson, template, guide, plannedContent } = notion;
  const { isFavorite, toggle } = useFavorites();
  const favId = (lesson ?? template ?? guide ?? plannedContent)?.id;
  const on = favId ? isFavorite(favId) : false;

  return (
    <div className={`lib-card${notion.planned ? ' is-planned' : ''}`}>
      {favId && (
        <button
          type="button"
          className={`lib-fav${on ? ' on' : ''}`}
          aria-pressed={on}
          aria-label={on ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          onClick={() => toggle(favId)}
        >
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
            <path
              d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"
              fill={on ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </button>
      )}

      <div className="lib-body">
        <span className="lib-icon" style={{ background: `var(--tech-${notion.technology})` }}>
          <TechLogo technology={notion.technology} />
        </span>
        <div className="lib-text">
          <div className="lib-title-row">
            <span className="lib-title">{notion.title}</span>
            <span className="lib-tag">{TECHNOLOGY_LABEL[notion.technology]}</span>
          </div>
          {notion.summary && <p className="lib-desc">{decode(notion.summary)}</p>}
        </div>
      </div>

      <div className="lib-actions">
        {guide ? (
          <Link className="lib-btn full" to={contentPath(guide)}>
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <path d="M4 4h9l7 7v9H4V4Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M9 12l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Ouvrir le guide
          </Link>
        ) : (
          <div className="lib-toggle" role="group" aria-label="Ouvrir la notion">
            {lesson ? (
              <Link className="lib-seg" to={contentPath(lesson)}>
                <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                  <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4H11v15H4.5A1.5 1.5 0 0 0 3 20.5V5.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <path d="M21 5.5A1.5 1.5 0 0 0 19.5 4H13v15h6.5A1.5 1.5 0 0 1 21 20.5V5.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                </svg>
                Comprendre
              </Link>
            ) : plannedContent ? (
              <Link className="lib-seg" to={contentPath(plannedContent)}>
                Voir la fiche
              </Link>
            ) : null}
            {template && (
              <Link className="lib-seg seg-code" to={contentPath(template)}>
                <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                  <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Code
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
