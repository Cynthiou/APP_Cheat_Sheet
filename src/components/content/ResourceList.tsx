import type { Content, ResourceKind } from '@/types/content';
import { resourcesFor } from '@/data/resources';

const KIND_LABEL: Record<ResourceKind, string> = {
  doc: 'Doc',
  tool: 'Outil',
  tuto: 'Tuto',
};

function KindIcon({ kind }: { kind: ResourceKind }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 15,
    height: 15,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (kind) {
    case 'doc':
      return (
        <svg {...common}>
          <path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v4h4M8 12h8M8 16h6" />
        </svg>
      );
    case 'tool':
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2l-6 6 2.2 2.2 6-6a4 4 0 0 0 5.2-5.4l-2.5 2.5-2.2-.3-.3-2.2 2.5-2.5Z" />
        </svg>
      );
    case 'tuto':
      return (
        <svg {...common}>
          <path d="M3 5.5A2 2 0 0 1 5 4h5v15H5a2 2 0 0 0-2 1.5V5.5Z" />
          <path d="M21 5.5A2 2 0 0 0 19 4h-5v15h5a2 2 0 0 1 2 1.5V5.5Z" />
        </svg>
      );
  }
}

function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export function ResourceList({ content }: { content: Content }) {
  const links = resourcesFor(content);
  if (links.length === 0) return null;

  return (
    <section className="resources" aria-label="Ressources et outils">
      <h3 className="res-head">Ressources &amp; outils</h3>
      <p className="res-sub">Pour aller plus loin : doc officielle, outils gratuits et tutos en français.</p>
      <div className="res-list">
        {links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className={`res-item res-${l.kind}`}>
            <span className="res-ico">
              <KindIcon kind={l.kind} />
            </span>
            <span className="res-body">
              <span className="res-label">
                {l.label}
                <span className="res-ext" aria-hidden="true">↗</span>
              </span>
              {l.note && <span className="res-note">{l.note}</span>}
            </span>
            <span className="res-meta">
              <span className="res-kind">{KIND_LABEL[l.kind]}</span>
              <span className="res-host">{host(l.url)}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
