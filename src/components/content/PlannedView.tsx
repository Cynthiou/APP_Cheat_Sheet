import { Link } from 'react-router-dom';
import type { Content } from '@/types/content';
import { TOME_BY_ID } from '@/data/tomes';
import { KindChip, StatusChip, TechChip } from '@/components/common/Chips';
import { BackButton } from './BackButton';

export function PlannedView({ content }: { content: Content }) {
  const tome = TOME_BY_ID[content.tomeId];
  return (
    <article className="reading">
      <BackButton />
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/explorer">Explorer</Link>
        <span aria-hidden="true">/</span>
        <span>{tome?.title ?? 'Sommaire'}</span>
      </nav>

      <header className="page-head">
        <div className="chiprow">
          <KindChip kind={content.kind} />
          <TechChip technology={content.technology} />
          <StatusChip status="planned" />
        </div>
        <h1 className="title">{content.title}</h1>
      </header>

      <div className="planned-box">
        <p>
          <b>Contenu à rédiger.</b> Cette entrée fait partie du sommaire de React Memo mais n’a pas
          encore été écrite. Elle apparaît ici pour que rien ne soit perdu du programme.
        </p>
        <p style={{ marginTop: 10 }}>
          En attendant, explore les contenus déjà disponibles ou utilise la recherche.
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" to="/recherche">
            Rechercher
          </Link>
          <Link className="btn" to="/explorer">
            Voir le sommaire
          </Link>
        </div>
      </div>
    </article>
  );
}
