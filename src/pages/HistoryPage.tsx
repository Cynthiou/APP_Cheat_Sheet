import { Link } from 'react-router-dom';
import { useHistory } from '@/features/history';
import type { HistoryEntry } from '@/features/history';
import { getById } from '@/data/catalog';
import { TechChip } from '@/components/common/Chips';
import { contentPath } from '@/utils/paths';

function dayKey(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function groupLabel(ts: number): string {
  const now = new Date();
  const d = new Date(ts);
  const today = dayKey(now.getTime());
  const yest = dayKey(now.getTime() - 86400000);
  const k = dayKey(ts);
  if (k === today) return "Aujourd'hui";
  if (k === yest) return 'Hier';
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

function timeLabel(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.round(diff / 60000);
  if (min < 1) return "À l'instant";
  if (min < 60) return `Il y a ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `Il y a ${h} h`;
  const d = new Date(ts);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export function HistoryPage() {
  const { history, remove, clear } = useHistory();

  const resolved = history
    .map((e) => ({ entry: e, content: getById(e.id) }))
    .filter((x): x is { entry: HistoryEntry; content: NonNullable<typeof x.content> } => !!x.content);

  const groups: { label: string; items: typeof resolved }[] = [];
  for (const item of resolved) {
    const label = groupLabel(item.entry.at);
    let g = groups.find((x) => x.label === label);
    if (!g) {
      g = { label, items: [] };
      groups.push(g);
    }
    g.items.push(item);
  }

  return (
    <div className="reading">
      <header className="page-head-row">
        <div>
          <h1 className="title">Historique</h1>
          <p className="subtitle">Les notions que tu as consultées récemment.</p>
        </div>
        {history.length > 0 && (
          <button type="button" className="ghost-danger" onClick={clear}>
            Vider l'historique
          </button>
        )}
      </header>

      {resolved.length === 0 ? (
        <div className="empty">
          <h3>Rien pour le moment</h3>
          <p>Les fiches que tu ouvres apparaîtront ici, pour y revenir vite.</p>
          <div className="suggestions">
            <Link className="btn btn-primary" to="/bibliotheque">
              Ouvrir la bibliothèque
            </Link>
          </div>
        </div>
      ) : (
        groups.map((g) => (
          <section key={g.label} className="hist-group">
            <div className="hist-day">{g.label}</div>
            <div className="hist-list">
              {g.items.map(({ entry, content }) => (
                <div key={entry.id} className="hist-item">
                  <Link
                    to={contentPath(content) + (entry.tab === 'comprendre' ? '?vue=comprendre' : '')}
                    className="hist-link"
                  >
                    <span className="hist-dot" style={{ background: `var(--tech-${content.technology})` }} />
                    <span className="hist-main">
                      <span className="hist-title">{content.title}</span>
                      <span className="hist-sub">
                        <TechChip technology={content.technology} />
                        <span className="hist-tab">
                          onglet {entry.tab === 'comprendre' ? 'Comprendre' : 'Code'}
                        </span>
                      </span>
                    </span>
                  </Link>
                  <span className="hist-time">{timeLabel(entry.at)}</span>
                  <button
                    type="button"
                    className="hist-x"
                    aria-label="Retirer de l'historique"
                    onClick={() => remove(entry.id)}
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
