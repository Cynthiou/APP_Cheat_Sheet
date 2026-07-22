import { useParams } from 'react-router-dom';
import { getByKindSlug } from '@/data/catalog';
import { isGuide } from '@/types/content';
import { GuideView } from '@/components/content/GuideView';
import { PlannedView } from '@/components/content/PlannedView';
import { useTrackHistory } from '@/hooks/useTrackHistory';
import { NotFoundPage } from './NotFoundPage';

export function GuidePage() {
  const { slug } = useParams();
  const content = slug ? getByKindSlug('guide', slug) : undefined;
  useTrackHistory(content?.id, 'code');
  if (!content) return <NotFoundPage />;
  if (isGuide(content)) return <GuideView guide={content} />;
  return <PlannedView content={content} />;
}
