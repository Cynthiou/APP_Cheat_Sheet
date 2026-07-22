import { Link } from 'react-router-dom';

interface Props {
  direction: 'to-template' | 'to-lesson';
  href: string;
}

export function CrossLink({ direction, href }: Props) {
  const toTemplate = direction === 'to-template';
  return (
    <div className={`crosslink ${direction}`}>
      <div>
        <div className="t">{toTemplate ? 'Tu as compris ? Passe au code.' : 'Pas sûr·e de comprendre ?'}</div>
        <div className="s">
          {toTemplate ? 'Le template prêt à copier.' : 'Va voir la leçon expliquée.'}
        </div>
      </div>
      <Link className="cta" to={href}>
        {toTemplate ? 'Voir le template →' : 'Voir la leçon →'}
      </Link>
    </div>
  );
}
