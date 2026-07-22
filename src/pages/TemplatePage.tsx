import { useParams } from 'react-router-dom';
import { getByKindSlug } from '@/data/catalog';
import { isTemplate } from '@/types/content';
import { TemplateView } from '@/components/content/TemplateView';
import { PlannedView } from '@/components/content/PlannedView';
import { useTrackHistory } from '@/hooks/useTrackHistory';
import { NotFoundPage } from './NotFoundPage';

export function TemplatePage() {
  const { slug } = useParams();
  const content = slug ? getByKindSlug('template', slug) : undefined;
  useTrackHistory(content?.id, 'code');
  if (!content) return <NotFoundPage />;
  if (isTemplate(content)) return <TemplateView template={content} />;
  return <PlannedView content={content} />;
}
