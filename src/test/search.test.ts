import { describe, expect, it } from 'vitest';
import { searchContent } from '@/search/searchEngine';

describe('moteur de recherche', () => {
  it('trouve par titre', () => {
    const r = searchContent('useState');
    expect(r.length).toBeGreaterThan(0);
    expect(r.some((c) => c.slug === 'usestate')).toBe(true);
  });

  it('trouve par alias (use state → useState)', () => {
    const r = searchContent('use state');
    expect(r.some((c) => c.slug === 'usestate')).toBe(true);
  });

  it('est insensible aux accents et à la casse', () => {
    const r = searchContent('DEPLOIEMENT');
    expect(r.length).toBeGreaterThan(0);
  });

  it('trouve par besoin concret (mot-clé)', () => {
    const r = searchContent('filtrer une liste');
    expect(r.some((c) => c.slug === 'filter' || c.slug === 'creer-une-recherche')).toBe(true);
  });

  it('filtre par type de contenu', () => {
    const r = searchContent('', { kind: 'guide' });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((c) => c.kind === 'guide')).toBe(true);
  });

  it('filtre par technologie', () => {
    const r = searchContent('', { technology: 'sql' });
    expect(r.every((c) => c.technology === 'sql')).toBe(true);
  });

  it('renvoie une liste vide pour une requête sans correspondance', () => {
    const r = searchContent('zzzznimportequoi');
    expect(r).toEqual([]);
  });
});
