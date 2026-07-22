import type { ContentKind, ContentStatus, Technology } from '@/types/content';
import { KIND_LABEL, TECHNOLOGY_LABEL, techColorVar } from '@/utils/labels';

export function KindChip({ kind }: { kind: ContentKind }) {
  return (
    <span className={`kindchip ${kind}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {kind === 'lesson' && <path d="M4 5a2 2 0 012-2h12v18H6a2 2 0 01-2-2zM8 3v18" />}
        {kind === 'template' && <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" />}
        {kind === 'guide' && <path d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5" />}
      </svg>
      {KIND_LABEL[kind]}
    </span>
  );
}

export function TechChip({ technology }: { technology: Technology }) {
  return (
    <span className="techchip">
      <span className="tech-dot" style={{ background: techColorVar(technology) }} />
      {TECHNOLOGY_LABEL[technology]}
    </span>
  );
}

export function StatusChip({ status }: { status: ContentStatus }) {
  if (status === 'ready') {
    return <span className="statuschip ready">Prêt</span>;
  }
  return <span className="statuschip planned">À rédiger</span>;
}
