import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CodeBlock as CodeBlockData, GuideContent } from '@/types/content';
import { KindChip, TechChip } from '@/components/common/Chips';
import { CodeBlock } from '@/components/code/CodeBlock';
import { FavButton } from './FavButton';
import { BackButton } from './BackButton';
import { RelatedList } from './RelatedList';
import { ResourceList } from './ResourceList';

function StepCode({ blocks }: { blocks: CodeBlockData[] }) {
  const [active, setActive] = useState(0);
  if (blocks.length === 0) return null;
  if (blocks.length === 1) return <CodeBlock block={blocks[0]} />;
  const current = blocks[Math.min(active, blocks.length - 1)];
  return (
    <>
      <div className="tabs" role="tablist" aria-label="Façons de faire">
        {blocks.map((b, i) => (
          <button
            key={b.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`tab${i === active ? ' active' : ''}`}
            onClick={() => setActive(i)}
          >
            {b.label ?? b.filename ?? `Façon ${i + 1}`}
          </button>
        ))}
      </div>
      <CodeBlock block={current} />
    </>
  );
}

export function GuideView({ guide }: { guide: GuideContent }) {
  const [activeStep, setActiveStep] = useState(guide.steps[0]?.id);

  return (
    <article className="reading">
      <BackButton />
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/bibliotheque">Bibliothèque</Link>
        <span aria-hidden="true">/</span>
        <span>Guide</span>
      </nav>

      <header className="page-head">
        <div className="chiprow">
          <KindChip kind="guide" />
          <TechChip technology={guide.technology} />
        </div>
        <h1 className="title">{guide.title}</h1>
        <p className="subtitle">{guide.objective}</p>
      </header>

      <div className="actions-row">
        <FavButton id={guide.id} />
      </div>

      <div className="idea" style={{ borderLeftColor: 'var(--guide)' }}>
        <b>Aperçu :</b> {guide.preview}
      </div>

      <div className="lbl">Fichiers concernés</div>
      <div className="files-chips">
        {guide.files.map((f) => (
          <code key={f}>{f}</code>
        ))}
      </div>

      <nav className="step-nav" aria-label="Étapes du guide">
        {guide.steps.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`step-pill${activeStep === s.id ? ' active' : ''}`}
            onClick={() => setActiveStep(s.id)}
          >
            {i + 1}. {s.title}
          </a>
        ))}
      </nav>

      {guide.steps.map((step, i) => (
        <section className="guide-step" id={step.id} key={step.id}>
          <h3>
            Étape {i + 1} — {step.title}
          </h3>
          <p className="goal">{step.goal}</p>
          {step.explanation && (
            <p className="body" dangerouslySetInnerHTML={{ __html: step.explanation }} />
          )}
          {step.files.length > 0 && (
            <div className="files-chips">
              {step.files.map((f) => (
                <code key={f}>{f}</code>
              ))}
            </div>
          )}
          <StepCode blocks={step.codeBlocks} />
          {step.result && (
            <div className="step-result">
              <b>Résultat :</b> {step.result}
            </div>
          )}
          {step.relatedContentIds.length > 0 && (
            <RelatedList ids={step.relatedContentIds} title="Fiches utilisées" />
          )}
        </section>
      ))}

      <section className="recap" style={{ borderLeftColor: 'var(--guide)', marginTop: 8 }}>
        <h3 style={{ color: 'var(--guide-deep)' }}>Résultat final</h3>
        <ul>
          <li>{guide.finalResult}</li>
        </ul>
      </section>

      {guide.pitfalls && guide.pitfalls.length > 0 && (
        <section className="pitfalls">
          <h3>Erreurs fréquentes</h3>
          <ul>
            {guide.pitfalls.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>
      )}

      {guide.variations && guide.variations.length > 0 && (
        <>
          <div className="lbl">Pour aller plus loin — idées à explorer</div>
          <ul className="ideas">
            {guide.variations.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </>
      )}

      <RelatedList ids={guide.usesContentIds ?? guide.relatedContentIds} title="Notions réutilisées" />

      <ResourceList content={guide} />
    </article>
  );
}
