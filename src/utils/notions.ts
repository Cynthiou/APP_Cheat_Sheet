import type { Content, Technology } from '@/types/content';

export interface Notion {
  key: string;
  title: string;
  summary: string;
  technology: Technology;
  tomeId: string;
  planned: boolean;
  lesson?: Content;
  template?: Content;
  guide?: Content;
  plannedContent?: Content;
}

export function groupNotions(items: Content[]): Notion[] {
  const map = new Map<string, Notion>();
  const order: string[] = [];

  for (const c of items) {
    let key: string;
    if (c.status === 'planned') key = `p:${c.id}`;
    else if (c.kind === 'guide') key = `g:${c.id}`;
    else key = `n:${c.tomeId}:${c.slug}`;

    let n = map.get(key);
    if (!n) {
      n = {
        key,
        title: c.title,
        summary: c.summary,
        technology: c.technology,
        tomeId: c.tomeId,
        planned: c.status === 'planned',
      };
      map.set(key, n);
      order.push(key);
    }

    if (c.status === 'planned') {
      n.plannedContent = c;
    } else if (c.kind === 'lesson') {
      n.lesson = c;
      n.title = c.title;
      if (c.summary) n.summary = c.summary;
    } else if (c.kind === 'template') {
      n.template = c;
      if (!n.lesson && c.summary) n.summary = c.summary;
    } else if (c.kind === 'guide') {
      n.guide = c;
      n.title = c.title;
      if (c.summary) n.summary = c.summary;
    }
  }

  return order.map((k) => map.get(k)!);
}
