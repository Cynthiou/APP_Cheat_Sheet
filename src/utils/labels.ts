import type { ContentKind, Technology } from '@/types/content';

export const KIND_LABEL: Record<ContentKind, string> = {
  lesson: 'Leçon',
  template: 'Template',
  guide: 'Guide',
};

export const TECHNOLOGY_LABEL: Record<Technology, string> = {
  tools: 'Outils',
  git: 'Git',
  methodology: 'Méthodo',
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
  node: 'Node.js',
  express: 'Express',
  sql: 'SQL',
  database: 'Base de données',
  auth: 'Auth',
  deployment: 'Déploiement',
  testing: 'Tests',
  advanced: 'Avancé',
};

export const TECHNOLOGY_ORDER: Technology[] = [
  'tools',
  'git',
  'methodology',
  'html',
  'css',
  'javascript',
  'typescript',
  'react',
  'node',
  'express',
  'sql',
  'database',
  'auth',
  'deployment',
  'testing',
  'advanced',
];

export function techColorVar(tech: Technology): string {
  return `var(--tech-${tech})`;
}
