import { useParams, useSearchParams } from 'react-router-dom';
import { getByKindSlug } from '@/data/catalog';
import { isLesson, isTemplate } from '@/types/content';
import { FicheView } from '@/components/content/FicheView';
import { useTrackHistory } from '@/hooks/useTrackHistory';
import { NotFoundPage } from './NotFoundPage';

export function FichePage() {
  const { slug } = useParams();
  const [params] = useSearchParams();

  const lessonRaw = slug ? getByKindSlug('lesson', slug) : undefined;
  const templateRaw = slug ? getByKindSlug('template', slug) : undefined;
  const lesson = lessonRaw && isLesson(lessonRaw) ? lessonRaw : undefined;
  const template = templateRaw && isTemplate(templateRaw) ? templateRaw : undefined;

  const primary = lesson ?? template;
  const tab = params.get('vue') === 'comprendre' && lesson ? 'comprendre' : template ? 'code' : 'comprendre';
  useTrackHistory(primary?.id, tab);

  if (!primary) return <NotFoundPage />;
  return <FicheView key={slug} lesson={lesson} template={template} />;
}
