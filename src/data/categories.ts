import type { Technology } from '@/types/content';

export type CategoryId = 'frontend' | 'backend' | 'bdd' | 'outils';

export interface Category {
  id: CategoryId;
  label: string;
  hint: string;
  technologies: Technology[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'frontend',
    label: 'Front-end',
    hint: 'Ce qui touche à l’interface : HTML, CSS, JavaScript, React.',
    technologies: ['html', 'css', 'javascript', 'typescript', 'react'],
  },
  {
    id: 'backend',
    label: 'Back-end',
    hint: 'Serveur et API : Node, Express, authentification.',
    technologies: ['node', 'express', 'auth'],
  },
  {
    id: 'bdd',
    label: 'Base de données',
    hint: 'Stocker et modéliser : SQL, modélisation.',
    technologies: ['sql', 'database'],
  },
  {
    id: 'outils',
    label: 'Outils',
    hint: 'Git, méthode, tests, déploiement, sujets avancés.',
    technologies: ['tools', 'git', 'methodology', 'deployment', 'testing', 'advanced'],
  },
];

export const CATEGORY_BY_ID: Record<CategoryId, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;

export const CATEGORY_OF: Record<Technology, CategoryId> = (() => {
  const map = {} as Record<Technology, CategoryId>;
  for (const cat of CATEGORIES) {
    for (const tech of cat.technologies) map[tech] = cat.id;
  }
  return map;
})();

export function isCategoryId(value: string | null | undefined): value is CategoryId {
  return value === 'frontend' || value === 'backend' || value === 'bdd' || value === 'outils';
}
