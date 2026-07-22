import { NavLink, Link, useLocation, useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '@/data/categories';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type IconName = 'home' | 'library' | 'guides' | 'heart' | 'history';

function Icon({ name }: { name: IconName }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 17,
    height: 17,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 10.5 12 4l9 6.5" />
          <path d="M5 9.5V20h14V9.5" />
        </svg>
      );
    case 'library':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'guides':
      return (
        <svg {...common}>
          <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
          <path d="M3 12l9 4.5L21 12M3 16.5 12 21l9-4.5" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.5-9-9c-1.2-2.7.4-5.5 3.2-5.5 1.9 0 3 1.2 3.8 2.3.8-1.1 1.9-2.3 3.8-2.3C19.6 5.5 21.2 8.3 20 11c-2 4.5-8 9-8 9Z" />
        </svg>
      );
    case 'history':
      return (
        <svg {...common}>
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path d="M3 4v4h4" />
          <path d="M12 8v4l3 2" />
        </svg>
      );
  }
}

export function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const [params] = useSearchParams();
  const { pathname } = useLocation();
  const onBiblio = pathname === '/bibliotheque' || pathname === '/explorer';
  const activeCat = onBiblio ? params.get('cat') : null;
  const [open, setOpen] = useLocalStorage('rm.bibOpen', true);
  const expanded = open || onBiblio;

  return (
    <nav aria-label="Navigation principale">
      <div className="nav-group">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          onClick={onNavigate}
        >
          <Icon name="home" />
          <span>Accueil</span>
        </NavLink>

        <div className={`nav-parent${onBiblio ? ' active' : ''}`}>
          <Link to="/bibliotheque" className="nav-link np-link" onClick={onNavigate}>
            <Icon name="library" />
            <span>Bibliothèque</span>
          </Link>
          <button
            type="button"
            className={`np-chev${expanded ? ' open' : ''}`}
            aria-label={expanded ? 'Replier' : 'Déplier'}
            aria-expanded={expanded}
            onClick={() => setOpen(!expanded)}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {expanded && (
          <div className="nav-sub">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/bibliotheque?cat=${cat.id}`}
                className={`nav-sublink cat-${cat.id}${activeCat === cat.id ? ' active' : ''}`}
                onClick={onNavigate}
              >
                <span className="dot" style={{ background: 'var(--cat-color)' }} />
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        )}

        <NavLink
          to="/guides"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          onClick={onNavigate}
        >
          <Icon name="guides" />
          <span>Guides</span>
        </NavLink>

        <NavLink
          to="/favoris"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          onClick={onNavigate}
        >
          <Icon name="heart" />
          <span>Favoris</span>
        </NavLink>

        <NavLink
          to="/historique"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          onClick={onNavigate}
        >
          <Icon name="history" />
          <span>Historique</span>
        </NavLink>
      </div>
    </nav>
  );
}
