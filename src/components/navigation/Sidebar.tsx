import { Link, NavLink } from 'react-router-dom';
import { NavContent } from './NavContent';
import { ThemeToggle } from './ThemeToggle';

interface Props {
  collapsed?: boolean;
  onReduce?: () => void;
  onExpand?: () => void;
}

const RAIL = [
  { to: '/', label: 'Accueil', end: true, d: 'M3 10.5 12 4l9 6.5M5 9.5V20h14V9.5' },
  { to: '/bibliotheque', label: 'Bibliothèque', end: false, d: 'M3 4h7v7H3zM14 4h7v7h-7zM3 13h7v7H3zM14 13h7v7h-7z' },
  { to: '/favoris', label: 'Favoris', end: false, d: 'M12 20s-7-4.5-9-9c-1.2-2.7.4-5.5 3.2-5.5 1.9 0 3 1.2 3.8 2.3.8-1.1 1.9-2.3 3.8-2.3C19.6 5.5 21.2 8.3 20 11c-2 4.5-8 9-8 9Z' },
  { to: '/historique', label: 'Historique', end: false, d: 'M3 12a9 9 0 1 0 3-6.7L3 8M3 4v4h4M12 8v4l3 2' },
];

export function Sidebar({ collapsed, onReduce, onExpand }: Props) {
  if (collapsed) {
    return (
      <aside className="sidebar rail">
        <button type="button" className="rail-logo" onClick={onExpand} aria-label="Déplier le menu">
          <span className="logo">&lt;/&gt;</span>
        </button>
        <nav className="rail-nav" aria-label="Navigation">
          {RAIL.map((r) => (
            <NavLink
              key={r.to}
              to={r.to}
              end={r.end}
              title={r.label}
              aria-label={r.label}
              className={({ isActive }) => `rail-item${isActive ? ' active' : ''}`}
            >
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={r.d} />
              </svg>
            </NavLink>
          ))}
        </nav>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="side-head">
        <Link to="/" className="brand">
          <span className="logo">&lt;/&gt;</span>
          Cheat Sheet
        </Link>
        <ThemeToggle />
      </div>
      <NavContent />

      {onReduce && (
        <button type="button" className="nav-reduce" onClick={onReduce}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          Réduire le menu
        </button>
      )}
    </aside>
  );
}
