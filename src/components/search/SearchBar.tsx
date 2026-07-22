import { forwardRef } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  big?: boolean;
  showKbd?: boolean;
  autoFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar = forwardRef<HTMLInputElement, Props>(function SearchBar(
  { value, onChange, onSubmit, placeholder = 'Rechercher une notion, un besoin…', big, showKbd, autoFocus, onFocus, onBlur, onKeyDown },
  ref,
) {
  return (
    <div className={`searchbar${big ? ' big' : ''}`}>
      <svg className="s-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      <input
        ref={ref}
        type="search"
        value={value}
        autoFocus={autoFocus}
        aria-label="Recherche"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (onKeyDown) onKeyDown(e);
          if (e.key === 'Enter' && onSubmit) onSubmit();
        }}
      />
      {showKbd && <span className="kbd" aria-hidden="true">/</span>}
    </div>
  );
});
