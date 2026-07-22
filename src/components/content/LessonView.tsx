import { Link } from 'react-router-dom';
import type { LessonContent, LessonBlock } from '@/types/content';
import { getById } from '@/data/catalog';
import { TOME_BY_ID } from '@/data/tomes';
import { KindChip, TechChip } from '@/components/common/Chips';
import { CodeBlock } from '@/components/code/CodeBlock';
import { RichText } from '@/components/common/RichText';
import { FavButton } from './FavButton';
import { BackButton } from './BackButton';
import { ContentSwitch } from './ContentSwitch';
import { CrossLink } from './CrossLink';
import { RelatedList } from './RelatedList';
import { kindPath } from '@/utils/paths';

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

export function LessonView({ lesson }: { lesson: LessonContent }) {
  const tome = TOME_BY_ID[lesson.tomeId];
  const template = lesson.templateId ? getById(lesson.templateId) : undefined;

  return (
    <article className="reading">
      <BackButton />
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/explorer">Explorer</Link>
        <span aria-hidden="true">/</span>
        <span>{tome?.title ?? 'Leçon'}</span>
      </nav>

      <header className="page-head">
        <div className="chiprow">
          <KindChip kind="lesson" />
          <TechChip technology={lesson.technology} />
        </div>
        <h1 className="title">{lesson.title}</h1>
        <p className="subtitle">{lesson.utility}</p>
      </header>

      <ContentSwitch current="lesson" lessonSlug={lesson.slug} templateSlug={template?.slug} />

      <div className="actions-row">
        <FavButton id={lesson.id} />
      </div>

      <RichText as="div" className="idea" html={lesson.intro} />

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
        <section className="pitfalls">
          <h3>Erreurs fréquentes</h3>
          <ul>
            {lesson.pitfalls.map((p, i) => (
              <RichText as="li" key={i} html={p} />
            ))}
          </ul>
        </section>
      )}

      <section className="recap" style={{ marginTop: 24 }}>
        <h3>À retenir en 1 minute</h3>
        <ul>
          {lesson.takeaways.map((t, i) => (
            <RichText as="li" key={i} html={t} />
          ))}
        </ul>
      </section>

      {template && <CrossLink direction="to-template" href={kindPath('template', template.slug)} />}

      <RelatedList ids={lesson.relatedContentIds} />
    </article>
  );
}
