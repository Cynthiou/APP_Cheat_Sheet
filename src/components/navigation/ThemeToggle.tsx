import { useTheme } from '@/features/theme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      className="btn btn-icon"
      onClick={toggle}
      aria-label={dark ? 'Passer en thème clair' : 'Passer en thème sombre'}
    >
      <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" fill="none" strokeWidth={2} aria-hidden="true">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
        )}
      </svg>
    </button>
  );
}
