interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function windowed(page: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '…')[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) pages.push('…');
  for (let p = start; p <= end; p += 1) pages.push(p);
  if (end < total - 1) pages.push('…');
  pages.push(total);
  return pages;
}

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pg-btn"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Page précédente"
      >
        ‹
      </button>
      {windowed(page, totalPages).map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} className="pg-ellipsis" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className={`pg-btn${p === page ? ' active' : ''}`}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        className="pg-btn"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Page suivante"
      >
        ›
      </button>
    </nav>
  );
}
