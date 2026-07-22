import type { Tome } from '@/types/content';

export const TOMES: Tome[] = [
  { id: 't0', title: 'TOME 0 — Démarrer : environnement et outils', technology: 'tools' },
  { id: 't1', title: 'TOME 1 — Git et GitHub', technology: 'git' },
  { id: 't1b', title: 'TOME 1B — Méthodologie, outils et organisation', technology: 'methodology' },
  { id: 't2', title: 'TOME 2 — HTML et CSS', technology: 'html' },
  { id: 't3', title: 'TOME 3 — JavaScript', technology: 'javascript' },
  { id: 't4', title: 'TOME 4 — TypeScript', technology: 'typescript' },
  { id: 't5', title: 'TOME 5 — React : les bases', technology: 'react' },
  { id: 't6', title: 'TOME 6 — React : les Hooks', technology: 'react' },
  { id: 't7', title: 'TOME 7 — React : interactions et formulaires', technology: 'react' },
  { id: 't8', title: 'TOME 8 — React : données et API', technology: 'react' },
  { id: 't9', title: 'TOME 9 — React : navigation avec Router', technology: 'react' },
  { id: 't10', title: 'TOME 10 — React : aller plus loin', technology: 'react' },
  { id: 't11', title: 'TOME 11 — Node.js', technology: 'node' },
  { id: 't12', title: 'TOME 12 — Express : back-end', technology: 'express' },
  { id: 't13', title: 'TOME 13 — Base de données SQL', technology: 'sql' },
  { id: 't14', title: 'TOME 14 — Modéliser une base', technology: 'database' },
  { id: 't15', title: 'TOME 15 — Authentification', technology: 'auth' },
  { id: 't16', title: 'TOME 16 — Déploiement', technology: 'deployment' },
  { id: 't17', title: 'TOME 17 — Bonus et avancé', technology: 'advanced' },
];

export const TOME_BY_ID: Record<string, Tome> = Object.fromEntries(
  TOMES.map((t) => [t.id, t]),
);
