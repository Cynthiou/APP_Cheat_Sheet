import type { Content, ContentKind } from '@/types/content';

const SEGMENT: Record<ContentKind, string> = {
  lesson: 'lecon',
  template: 'template',
  guide: 'guide',
};

export function contentPath(content: Pick<Content, 'kind' | 'slug'>): string {
  if (content.kind === 'guide') return `/guide/${content.slug}`;
  if (content.kind === 'lesson') return `/fiche/${content.slug}?vue=comprendre`;
  return `/fiche/${content.slug}`;
}

export function kindPath(kind: ContentKind, slug: string): string {
  return `/${SEGMENT[kind]}/${slug}`;
}
