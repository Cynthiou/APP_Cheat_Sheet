import { describe, expect, it } from 'vitest';
import { ALL_CONTENT } from '@/data/catalog';
import { READY_CONTENT } from '@/data/content';
import { isTemplate, isLesson } from '@/types/content';
import type { GuideContent } from '@/types/content';

const ids = new Set(ALL_CONTENT.map((c) => c.id));

function refsOf(): { from: string; ref: string }[] {
  const out: { from: string; ref: string }[] = [];
  for (const c of ALL_CONTENT) {
    const push = (ref?: string) => {
      if (ref) out.push({ from: c.id, ref });
    };
    c.relatedContentIds.forEach(push);
    push(c.lessonId);
    push(c.templateId);
    c.guideIds?.forEach(push);
    if (c.kind === 'guide' && c.status === 'ready') {
      const g = c as GuideContent;
      g.usesContentIds?.forEach(push);
      g.steps.forEach((s) => s.relatedContentIds.forEach(push));
    }
  }
  return out;
}

describe('intégrité du catalogue', () => {
  it('a des identifiants uniques', () => {
    const arr = ALL_CONTENT.map((c) => c.id);
    expect(new Set(arr).size).toBe(arr.length);
  });

  it('a des couples (kind, slug) uniques', () => {
    const keys = ALL_CONTENT.map((c) => `${c.kind}:${c.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('ne contient aucun lien interne mort', () => {
    const dangling = refsOf().filter((r) => !ids.has(r.ref));
    expect(dangling, JSON.stringify(dangling, null, 2)).toEqual([]);
  });

  it('relie chaque Leçon et Template d’une même notion (réciprocité)', () => {
    for (const c of READY_CONTENT) {
      if (isLesson(c) && c.templateId) {
        const t = ALL_CONTENT.find((x) => x.id === c.templateId);
        expect(t?.kind, `templateId de ${c.id}`).toBe('template');
        expect(t?.templateId ?? t?.id).toBeDefined();
        expect((t as { lessonId?: string }).lessonId).toBe(c.id);
      }
      if (isTemplate(c) && c.lessonId) {
        const l = ALL_CONTENT.find((x) => x.id === c.lessonId);
        expect(l?.kind, `lessonId de ${c.id}`).toBe('lesson');
        expect((l as { templateId?: string }).templateId).toBe(c.id);
      }
    }
  });

  it('donne à chaque Template au moins une variante avec du code', () => {
    for (const c of READY_CONTENT) {
      if (isTemplate(c)) {
        expect(c.variants.length, `variantes de ${c.id}`).toBeGreaterThan(0);
        for (const v of c.variants) {
          expect(v.codeBlocks.length, `code de ${c.id}/${v.id}`).toBeGreaterThan(0);
          expect(v.codeBlocks[0].code.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('n’introduit aucune clé de gamification (durée, niveau, score…)', () => {
    const forbiddenKeys = [
      'duration',
      'duree',
      'level',
      'niveau',
      'difficulty',
      'score',
      'points',
      'badge',
      'badges',
      'progress',
      'progression',
      'xp',
    ];
    const keys = new Set<string>();
    const walk = (v: unknown) => {
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === 'object') {
        for (const k of Object.keys(v)) {
          keys.add(k.toLowerCase());
          walk((v as Record<string, unknown>)[k]);
        }
      }
    };
    walk(ALL_CONTENT);
    const found = forbiddenKeys.filter((k) => keys.has(k));
    expect(found, `clés interdites: ${found.join(', ')}`).toEqual([]);
  });
});
