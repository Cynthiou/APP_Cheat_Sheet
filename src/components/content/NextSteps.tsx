import { Link } from 'react-router-dom';
import { ALL_CONTENT } from '@/data/catalog';
import { groupNotions } from '@/utils/notions';
import { contentPath } from '@/utils/paths';
import { TECHNOLOGY_LABEL } from '@/utils/labels';
import type { Notion } from '@/utils/notions';

function primaryLink(n: Notion): string {
  const c = n.template ?? n.lesson ?? n.guide;
  return c ? contentPath(c) : '/bibliotheque';
}

export function NextSteps({ slug, tomeId }: { slug: string; tomeId: string }) {
  const tomeNotions = groupNotions(ALL_CONTENT.filter((c) => c.tomeId === tomeId));
  const idx = tomeNotions.findIndex(
    (n) => n.lesson?.slug === slug || n.template?.slug === slug || n.guide?.slug === slug,
  );
  if (idx === -1) return null;

  const next = tomeNotions[idx + 1];
  const siblings = tomeNotions.filter((_, i) => i !== idx && i !== idx + 1).slice(0, 2);

  if (!next && siblings.length === 0) return null;

  return (
    <section className="next-steps">
      <div className="ns-head">→ Maintenant que tu sais ça…</div>

      {next && (
        <Link to={primaryLink(next)} className="ns-main">
          <span className="ns-tag">Étape suivante</span>
          <span className="ns-title">{next.title}</span>
          {next.summary && <span className="ns-desc">{next.summary}</span>}
          <span className="ns-arrow">→</span>
        </Link>
      )}

      {siblings.length > 0 && (
        <>
          <div className="ns-sub-label">Dans la même lancée</div>
          <div className="ns-siblings">
            {siblings.map((n) => (
              <Link key={n.key} to={primaryLink(n)} className="ns-sibling">
                <span
                  className="ns-dot"
                  style={{ background: `var(--tech-${n.technology})` }}
                />
                <span className="ns-sib-main">
                  <span className="ns-sib-title">{n.title}</span>
                  <span className="ns-sib-tech">{TECHNOLOGY_LABEL[n.technology]}</span>
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
