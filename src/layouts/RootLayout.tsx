import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/navigation/Sidebar';
import { NavContent } from '@/components/navigation/NavContent';
import { ThemeToggle } from '@/components/navigation/ThemeToggle';
import { CommandPalette } from '@/components/search/CommandPalette';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function RootLayout() {
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useLocalStorage('rm.navCollapsed', false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    setDrawer(false);
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
      if (e.key === '/' && !typing) {
        e.preventDefault();
        navigate('/recherche');
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  return (
    <div className={`layout${collapsed ? ' nav-collapsed' : ''}`}>
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <Sidebar
        collapsed={collapsed}
        onReduce={() => setCollapsed(true)}
        onExpand={() => setCollapsed(false)}
      />

      <header className="mobile-header">
        <button
          type="button"
          className="btn btn-icon"
          aria-label="Ouvrir le menu"
          aria-expanded={drawer}
          onClick={() => setDrawer(true)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth={2} aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link to="/" className="brand">
          <span className="logo">&lt;/&gt;</span>
          Cheat Sheet
        </Link>
        <ThemeToggle />
      </header>

      {drawer && (
        <>
          <div className="drawer-backdrop" onClick={() => setDrawer(false)} aria-hidden="true" />
          <div className="drawer" role="dialog" aria-label="Menu">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span className="brand" style={{ padding: 0 }}>
                <span className="logo">&lt;/&gt;</span> Cheat Sheet
              </span>
              <button
                type="button"
                className="btn btn-icon"
                aria-label="Fermer le menu"
                onClick={() => setDrawer(false)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth={2} aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <NavContent onNavigate={() => setDrawer(false)} />
          </div>
        </>
      )}

      <main className="main" id="main">
        <Outlet />
      </main>

      <CommandPalette />
      <ScrollToTop />
    </div>
  );
}
