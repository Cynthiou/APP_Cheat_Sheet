import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { TemplateContent } from '@/types/content';
import { getById } from '@/data/catalog';
import { TOME_BY_ID } from '@/data/tomes';
import { KindChip, TechChip } from '@/components/common/Chips';
import { CodeBlock } from '@/components/code/CodeBlock';
import { FavButton } from './FavButton';
import { BackButton } from './BackButton';
import { ContentSwitch } from './ContentSwitch';
import { CrossLink } from './CrossLink';
import { RelatedList } from './RelatedList';
import { kindPath } from '@/utils/paths';

export function TemplateView({ template }: { template: TemplateContent }) {
  const tome = TOME_BY_ID[template.tomeId];
  const lesson = template.lessonId ? getById(template.lessonId) : undefined;
  const [activeId, setActiveId] = useState(template.variants[0]?.id);
  const active = template.variants.find((v) => v.id === activeId) ?? template.variants[0];

  return (
    <article className="reading">
      <BackButton />
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/explorer">Explorer</Link>
        <span aria-hidden="true">/</span>
        <span>{tome?.title ?? 'Template'}</span>
      </nav>

      <header className="page-head">
        <div className="chiprow">
          <KindChip kind="template" />
          <TechChip technology={template.technology} />
        </div>
        <h1 className="title mono">{template.title}</h1>
        <p className="subtitle">{template.lede}</p>
      </header>

      <ContentSwitch current="template" lessonSlug={lesson?.slug} templateSlug={template.slug} />

      <div className="actions-row">
        <FavButton id={template.id} />
      </div>

      {template.variants.length > 1 && (
        <div className="tabs" role="tablist" aria-label="Variantes">
          {template.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={v.id === active.id}
              className={`tab${v.id === active.id ? ' active' : ''}`}
              onClick={() => setActiveId(v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      {active.description && <p className="body">{active.description}</p>}

      {active.codeBlocks.map((cb) => (
        <CodeBlock key={cb.id} block={cb} />
      ))}

      {active.replacements.length > 0 && (
        <>
          <div className="lbl">À remplacer</div>
          <div className="repl">
            {active.replacements.map((r) => (
              <div className="rl" key={r.token}>
                <span className="k">{r.token}</span>
                <span className="v">→ {r.description}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {active.placement && (
        <>
          <div className="lbl">Où le mettre</div>
          <div className="placement">{active.placement}</div>
        </>
      )}

      {active.preview && (
        <>
          <div className="lbl">Aperçu</div>
          <div className="placement">{active.preview}</div>
        </>
      )}

      {lesson && <CrossLink direction="to-lesson" href={kindPath('lesson', lesson.slug)} />}

      <RelatedList ids={template.relatedContentIds} />
    </article>
  );
}
