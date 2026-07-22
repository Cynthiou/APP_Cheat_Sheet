import type { Content, ContentKind, Technology } from '@/types/content';
import { READY_CONTENT } from './content';
import { buildPlanned } from './planned';
import { TOMES } from './tomes';
import { normalize } from '@/utils/normalize';

const coveredTitles = new Set(READY_CONTENT.map((c) => normalize(c.title)));

export const ALL_CONTENT: Content[] = [...READY_CONTENT, ...buildPlanned(coveredTitles)];

const byId = new Map<string, Content>(ALL_CONTENT.map((c) => [c.id, c]));

export function getById(id: string): Content | undefined {
  return byId.get(id);
}

export function getByKindSlug(kind: ContentKind, slug: string): Content | undefined {
  return ALL_CONTENT.find((c) => c.kind === kind && c.slug === slug);
}

export function contentByTechnology(tech: Technology): Content[] {
  return ALL_CONTENT.filter((c) => c.technology === tech);
}

export function contentByTome(tomeId: string): Content[] {
  return ALL_CONTENT.filter((c) => c.tomeId === tomeId);
}

export function catalogByTome(): { tomeId: string; items: Content[] }[] {
  return TOMES.map((t) => ({ tomeId: t.id, items: contentByTome(t.id) })).filter(
    (g) => g.items.length > 0,
  );
}

export function countByTechnology(tech: Technology): { ready: number; total: number } {
  const items = contentByTechnology(tech);
  return { ready: items.filter((c) => c.status === 'ready').length, total: items.length };
}
