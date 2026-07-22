import type { GuideContent, LessonContent, TemplateContent } from '@/types/content';

export function lesson(l: Omit<LessonContent, 'kind' | 'status'>): LessonContent {
  return { ...l, kind: 'lesson', status: 'ready' };
}
export function template(t: Omit<TemplateContent, 'kind' | 'status'>): TemplateContent {
  return { ...t, kind: 'template', status: 'ready' };
}
export function guide(g: Omit<GuideContent, 'kind' | 'status'>): GuideContent {
  return { ...g, kind: 'guide', status: 'ready' };
}
