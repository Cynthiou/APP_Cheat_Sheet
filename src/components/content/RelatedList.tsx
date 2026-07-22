import { Link } from 'react-router-dom';
import { getById } from '@/data/catalog';
import { KindChip, TechChip } from '@/components/common/Chips';
import { contentPath } from '@/utils/paths';

export function RelatedList({ ids, title = 'Contenus liés' }: { ids: string[]; title?: string }) {
  const items = ids.map((id) => getById(id)).filter((c) => c != null);
  if (items.length === 0) return null;
  return (
    <section>
      <div className="lbl">{title}</div>
      <div className="related">
        {items.map((c) => (
          <Link key={c.id} className="related-item" to={contentPath(c)}>
            <KindChip kind={c.kind} />
            <span style={{ flex: 1 }}>{c.title}</span>
            <TechChip technology={c.technology} />
          </Link>
        ))}
      </div>
    </section>
  );
}
