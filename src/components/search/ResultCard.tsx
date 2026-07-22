import { Link } from 'react-router-dom';
import type { Content, ContentKind } from '@/types/content';
import { KindChip, StatusChip, TechChip } from '@/components/common/Chips';
import { contentPath } from '@/utils/paths';

const FILE_SUFFIX: Record<ContentKind, string> = {
  lesson: 'lecon.md',
  template: 'template.tsx',
  guide: 'guide.md',
};

export function ResultCard({ content }: { content: Content }) {
  return (
    <Link className={`content-card kind-${content.kind}`} to={contentPath(content)}>
      <div className="cc-top">
        <KindChip kind={content.kind} />
        <TechChip technology={content.technology} />
        {content.status === 'planned' && <StatusChip status="planned" />}
      </div>
      <div className="cc-title">{content.title}</div>
      {content.summary && <div className="cc-summary">{content.summary}</div>}
      <div className="cc-foot mono">
        {content.slug}.{FILE_SUFFIX[content.kind]}
      </div>
    </Link>
  );
}
