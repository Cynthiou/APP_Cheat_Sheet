import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { LessonContent, TemplateContent, LessonBlock } from '@/types/content';
import { CATEGORY_OF } from '@/data/categories';
import { TECHNOLOGY_LABEL } from '@/utils/labels';
import { CodeBlock } from '@/components/code/CodeBlock';
import { RichText } from '@/components/common/RichText';
import { FavButton } from './FavButton';
import { BackButton } from './BackButton';
import { RelatedList } from './RelatedList';
import { ResourceList } from './ResourceList';
import { NextSteps } from './NextSteps';

function Block({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <RichText as="p" className="body" html={block.html} />;
    case 'code':
      return <CodeBlock block={block.block} />;
    case 'note':
      return <RichText as="div" className={`note ${block.variant}`} html={block.html} />;
    case 'situation':
      return (
        <div className="situation">
          <span className="situation-tag">Je veux…</span>
          <div className="situation-body" dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case 'table':
      return (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <td key={j}>
                        <span className="mono" dangerouslySetInnerHTML={{ __html: cell }} />
                      </td>
                    ) : (
                      <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

interface Props {
  lesson?: LessonContent;
  template?: TemplateContent;
}

export function FicheView({ lesson, template }: Props) {
  const [params, setParams] = useSearchParams();
  const primary = (lesson ?? template)!;
  const cat = CATEGORY_OF[primary.technology];

  const hasCode = !!template;
  const hasComprendre = !!lesson;
  const wanted = params.get('vue');
  const initialTab: 'code' | 'comprendre' =
    wanted === 'comprendre' && hasComprendre ? 'comprendre' : hasCode ? 'code' : 'comprendre';

  const [tab, setTabState] = useState<'code' | 'comprendre'>(initialTab);

  const [variantId, setVariantId] = useState(template?.variants[0]?.id);
  const variant = template?.variants.find((v) => v.id === variantId) ?? template?.variants[0];

  function setTab(next: 'code' | 'comprendre') {
    setTabState(next);
    const p = new URLSearchParams(params);
    if (next === 'comprendre') p.set('vue', 'comprendre');
    else p.delete('vue');
    setParams(p, { replace: true });
  }

  const title = lesson?.title ?? template?.title ?? '';
  const subtitle = hasCode && hasComprendre
    ? 'Comprends la notion, ou récupère un code prêt à l’emploi.'
    : (lesson?.utility ?? template?.lede ?? '');

  return (
    <article className="reading fiche">
      <BackButton />
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/bibliotheque">Bibliothèque</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/bibliotheque?cat=${cat}`}>{TECHNOLOGY_LABEL[primary.technology]}</Link>
      </nav>

      <header className="fiche-head">
        <div>
          <h1 className="title">{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </div>
        <FavButton id={primary.id} />
      </header>

      {hasCode && hasComprendre && (
        <div className="fiche-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'comprendre'}
            className={`fiche-tab${tab === 'comprendre' ? ' active' : ''}`}
            onClick={() => setTab('comprendre')}
          >
            Comprendre
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'code'}
            className={`fiche-tab${tab === 'code' ? ' active' : ''}`}
            onClick={() => setTab('code')}
          >
            <span className="chevrons">&lt;/&gt;</span> Code prêt à copier
          </button>
        </div>
      )}

      {tab === 'code' && template && variant && (
        <div className="fiche-code">
          {template.variants.length > 1 && (
            <>
              <div className="lbl">Choisis ton besoin</div>
              <div className="need-tabs">
                {template.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`need-tab${v.id === variant.id ? ' active' : ''}`}
                    onClick={() => setVariantId(v.id)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {variant.description && <p className="body dim">{variant.description}</p>}

          {variant.codeBlocks.map((cb) => (
            <CodeBlock key={cb.id} block={cb} />
          ))}

          {variant.replacements.length > 0 && (
            <>
              <div className="lbl">À remplacer</div>
              <div className="repl">
                {variant.replacements.map((r) => (
                  <div className="rl" key={r.token}>
                    <span className="k">{r.token}</span>
                    <span className="v">{r.description}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {variant.placement && (
            <>
              <div className="lbl">Où le mettre</div>
              <div className="placement">{variant.placement}</div>
            </>
          )}

          {lesson && (
            <button type="button" className="to-understand" onClick={() => setTab('comprendre')}>
              ✦ Comprendre à quoi sert ce code →
            </button>
          )}
        </div>
      )}

      {tab === 'comprendre' && lesson && (
        <div className="fiche-learn">
          <div className="callout summary">
            <span className="callout-tag">✦ En résumé</span>
            <RichText as="div" html={lesson.intro} />
          </div>

          {lesson.sections.map((section, i) => (
            <section className="sec" key={section.id}>
              <div className="sec-head">
                <span className="n">{i + 1}</span>
                {section.title}
              </div>
              {section.blocks.map((block, k) => (
                <Block key={k} block={block} />
              ))}
            </section>
          ))}

          {lesson.pitfalls && lesson.pitfalls.length > 0 && (
            <div className="callout danger">
              <span className="callout-tag">⚠ Erreurs fréquentes</span>
              <ul>
                {lesson.pitfalls.map((p, i) => (
                  <RichText as="li" key={i} html={p} />
                ))}
              </ul>
            </div>
          )}

          <div className="recap">
            <h3>À retenir en 1 minute</h3>
            <ul>
              {lesson.takeaways.map((t, i) => (
                <RichText as="li" key={i} html={t} />
              ))}
            </ul>
          </div>

          {hasCode && (
            <button type="button" className="to-code" onClick={() => setTab('code')}>
              <span className="chevrons">&lt;/&gt;</span> Voir le code prêt à copier →
            </button>
          )}
        </div>
      )}

      <RelatedList
        ids={[...(lesson?.relatedContentIds ?? []), ...(template?.relatedContentIds ?? [])]}
        title="Voir aussi"
      />

      <ResourceList content={primary} />

      <NextSteps slug={primary.slug} tomeId={primary.tomeId} />
    </article>
  );
}
