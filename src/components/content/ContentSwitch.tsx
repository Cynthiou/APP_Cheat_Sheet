import { Link } from 'react-router-dom';
import { kindPath } from '@/utils/paths';

interface Props {
  current: 'lesson' | 'template';
  lessonSlug?: string;
  templateSlug?: string;
}

export function ContentSwitch({ current, lessonSlug, templateSlug }: Props) {
  return (
    <div className="switch" role="group" aria-label="Comprendre ou Template">
      {lessonSlug ? (
        <Link
          to={kindPath('lesson', lessonSlug)}
          className={current === 'lesson' ? 'active-lesson' : ''}
          aria-current={current === 'lesson' ? 'page' : undefined}
        >
          Comprendre
        </Link>
      ) : (
        <span className="disabled">Comprendre</span>
      )}
      {templateSlug ? (
        <Link
          to={kindPath('template', templateSlug)}
          className={current === 'template' ? 'active-template' : ''}
          aria-current={current === 'template' ? 'page' : undefined}
        >
          Template
        </Link>
      ) : (
        <span className="disabled">Template</span>
      )}
    </div>
  );
}
