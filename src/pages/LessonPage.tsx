import { useParams } from 'react-router-dom';
import { getByKindSlug } from '@/data/catalog';
import { isLesson } from '@/types/content';
import { LessonView } from '@/components/content/LessonView';
import { PlannedView } from '@/components/content/PlannedView';
import { useTrackHistory } from '@/hooks/useTrackHistory';
import { NotFoundPage } from './NotFoundPage';

export function LessonPage() {
  const { slug } = useParams();
  const content = slug ? getByKindSlug('lesson', slug) : undefined;
  useTrackHistory(content?.id, 'comprendre');
  if (!content) return <NotFoundPage />;
  if (isLesson(content)) return <LessonView lesson={content} />;
  return <PlannedView content={content} />;
}
