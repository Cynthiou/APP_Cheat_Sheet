import type { Content, ResourceLink, Technology } from '@/types/content';

export const RESOURCES_BY_TECH: Record<Technology, ResourceLink[]> = {
  tools: [
    { label: 'Node.js — site officiel', url: 'https://nodejs.org/fr', kind: 'doc', note: 'Télécharger la version LTS' },
    { label: 'Documentation npm', url: 'https://docs.npmjs.com/', kind: 'doc', note: 'Le gestionnaire de paquets' },
    { label: 'Vite', url: 'https://vite.dev/', kind: 'tool', note: 'Créer un projet front rapide' },
    { label: 'Grafikart — tutos vidéo (FR)', url: 'https://grafikart.fr/tutoriels', kind: 'tuto' },
  ],
  git: [
    { label: 'Git — documentation', url: 'https://git-scm.com/doc', kind: 'doc', note: 'Livre « Pro Git » dispo en FR' },
    { label: 'GitHub Docs (FR)', url: 'https://docs.github.com/fr', kind: 'doc' },
    { label: 'Learn Git Branching', url: 'https://learngitbranching.js.org/?locale=fr_FR', kind: 'tool', note: 'Visualiser les branches en jouant' },
    { label: 'Grafikart — Git (FR)', url: 'https://grafikart.fr/tutoriels/git', kind: 'tuto' },
  ],
  methodology: [
    { label: 'Manifeste Agile (FR)', url: 'https://agilemanifesto.org/iso/fr/manifesto.html', kind: 'doc', note: 'Les 4 valeurs, texte officiel' },
    { label: 'Le Guide Scrum (officiel)', url: 'https://scrumguides.org/download.html', kind: 'doc', note: 'PDF, version française dispo' },
    { label: 'Atlassian — Agile (FR)', url: 'https://www.atlassian.com/fr/agile', kind: 'doc', note: 'Guides Agile / Scrum / Kanban' },
    { label: 'Trello', url: 'https://trello.com/fr', kind: 'tool', note: 'Tableau Kanban gratuit' },
  ],
  html: [
    { label: 'MDN — HTML (FR)', url: 'https://developer.mozilla.org/fr/docs/Web/HTML', kind: 'doc', note: 'La référence des balises' },
    { label: 'MDN — Apprendre le web (FR)', url: 'https://developer.mozilla.org/fr/docs/Learn', kind: 'tuto' },
    { label: 'Playground MDN', url: 'https://developer.mozilla.org/fr/play', kind: 'tool', note: 'Tester HTML/CSS/JS en ligne' },
  ],
  css: [
    { label: 'MDN — CSS (FR)', url: 'https://developer.mozilla.org/fr/docs/Web/CSS', kind: 'doc' },
    { label: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/', kind: 'tool', note: 'Apprendre Flexbox en jouant' },
    { label: 'Grid Garden', url: 'https://cssgridgarden.com/', kind: 'tool', note: 'Apprendre CSS Grid en jouant' },
    { label: 'MDN — Apprendre CSS (FR)', url: 'https://developer.mozilla.org/fr/docs/Learn/CSS', kind: 'tuto' },
  ],
  javascript: [
    { label: 'MDN — JavaScript (FR)', url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript', kind: 'doc' },
    { label: 'javascript.info', url: 'https://javascript.info/', kind: 'doc', note: 'Le JS moderne, très complet' },
    { label: 'Grafikart — JavaScript (FR)', url: 'https://grafikart.fr/tutoriels/javascript', kind: 'tuto' },
  ],
  typescript: [
    { label: 'TypeScript — Handbook', url: 'https://www.typescriptlang.org/docs/', kind: 'doc' },
    { label: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play', kind: 'tool', note: 'Tester du TS en ligne' },
    { label: 'Grafikart — TypeScript (FR)', url: 'https://grafikart.fr/tutoriels/typescript', kind: 'tuto' },
  ],
  react: [
    { label: 'React — doc officielle', url: 'https://react.dev/', kind: 'doc', note: 'Exemples interactifs' },
    { label: 'React Router', url: 'https://reactrouter.com/', kind: 'doc', note: 'La navigation dans React' },
    { label: 'Grafikart — React (FR)', url: 'https://grafikart.fr/tutoriels/react', kind: 'tuto' },
  ],
  node: [
    { label: 'Node.js — doc (FR)', url: 'https://nodejs.org/fr/docs', kind: 'doc' },
    { label: 'Node.js — API', url: 'https://nodejs.org/docs/latest/api/', kind: 'doc' },
    { label: 'Grafikart — tutos (FR)', url: 'https://grafikart.fr/tutoriels', kind: 'tuto' },
  ],
  express: [
    { label: 'Express (FR)', url: 'https://expressjs.com/fr/', kind: 'doc', note: 'Framework back-end pour Node' },
    { label: 'Express — le routage (FR)', url: 'https://expressjs.com/fr/guide/routing.html', kind: 'doc' },
    { label: 'MDN — Express / Node (FR)', url: 'https://developer.mozilla.org/fr/docs/Learn/Server-side/Express_Nodejs', kind: 'tuto' },
  ],
  sql: [
    { label: 'SQL.sh — cours complet (FR)', url: 'https://sql.sh/', kind: 'doc', note: 'La référence SQL en français' },
    { label: 'SQLBolt', url: 'https://sqlbolt.com/', kind: 'tool', note: 'Exercices SQL interactifs' },
    { label: 'PostgreSQL — doc', url: 'https://www.postgresql.org/docs/', kind: 'doc' },
  ],
  database: [
    { label: 'SQL.sh — les cours (FR)', url: 'https://sql.sh/cours', kind: 'doc' },
    { label: 'dbdiagram.io', url: 'https://dbdiagram.io/', kind: 'tool', note: 'Dessiner un schéma de BDD' },
    { label: 'DB Fiddle', url: 'https://www.db-fiddle.com/', kind: 'tool', note: 'Tester des requêtes en ligne' },
  ],
  auth: [
    { label: 'JWT — jwt.io', url: 'https://jwt.io/', kind: 'doc', note: 'Comprendre / décoder un token' },
    { label: 'OWASP — Authentication', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', kind: 'doc', note: 'Bonnes pratiques de sécurité' },
    { label: 'bcrypt (npm)', url: 'https://www.npmjs.com/package/bcrypt', kind: 'doc', note: 'Hacher les mots de passe' },
  ],
  deployment: [
    { label: 'Vercel — docs', url: 'https://vercel.com/docs', kind: 'doc', note: 'Déployer un front (React/Vite)' },
    { label: 'Netlify — docs', url: 'https://docs.netlify.com/', kind: 'doc' },
    { label: 'Render — docs', url: 'https://render.com/docs', kind: 'doc', note: 'Back-end + BDD, offre gratuite' },
  ],
  testing: [
    { label: 'Vitest', url: 'https://vitest.dev/', kind: 'doc', note: 'Le testeur des projets Vite' },
    { label: 'Testing Library', url: 'https://testing-library.com/docs/', kind: 'doc' },
    { label: 'Jest (FR)', url: 'https://jestjs.io/fr/', kind: 'doc' },
  ],
  advanced: [
    { label: 'MDN Web Docs (FR)', url: 'https://developer.mozilla.org/fr/', kind: 'doc' },
    { label: 'web.dev', url: 'https://web.dev/', kind: 'doc', note: 'Performance & bonnes pratiques' },
    { label: 'Grafikart — tutos (FR)', url: 'https://grafikart.fr/tutoriels', kind: 'tuto' },
  ],
};

interface Topic {
  test: RegExp;
  links: ResourceLink[];
}

const TOPICS: Topic[] = [
  {
    test: /manifeste|\bagile\b|cycle en v/,
    links: [
      { label: 'Manifeste Agile (FR)', url: 'https://agilemanifesto.org/iso/fr/manifesto.html', kind: 'doc', note: 'Texte officiel des 4 valeurs' },
      { label: 'Atlassian — Le Manifeste Agile (FR)', url: 'https://www.atlassian.com/fr/agile/manifesto', kind: 'doc' },
    ],
  },
  {
    test: /scrum|sprint|daily|r[ée]trospective|mêl[ée]e|\brôles?\b/,
    links: [
      { label: 'Le Guide Scrum (officiel)', url: 'https://scrumguides.org/download.html', kind: 'doc', note: 'PDF, version française dispo' },
      { label: 'Atlassian — Scrum (FR)', url: 'https://www.atlassian.com/fr/agile/scrum', kind: 'doc' },
    ],
  },
  {
    test: /user stor|en tant que|crit[èe]res d.acceptation/,
    links: [
      { label: 'Atlassian — User stories (FR)', url: 'https://www.atlassian.com/fr/agile/project-management/user-stories', kind: 'doc' },
    ],
  },
  {
    test: /kanban|trello|jira|work in progress|\bwip\b/,
    links: [
      { label: 'Trello', url: 'https://trello.com/fr', kind: 'tool', note: 'Tableau Kanban gratuit' },
      { label: 'Jira', url: 'https://www.atlassian.com/fr/software/jira', kind: 'tool', note: 'Gestion de projet (offre gratuite)' },
      { label: 'Atlassian — Kanban (FR)', url: 'https://www.atlassian.com/fr/agile/kanban', kind: 'doc' },
    ],
  },
  {
    test: /figma|maquette/,
    links: [
      { label: 'Figma', url: 'https://www.figma.com/', kind: 'tool', note: 'Compte gratuit pour lire les maquettes' },
      { label: 'Figma — Guide du Dev Mode', url: 'https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode', kind: 'doc', note: 'Lire le CSS et exporter les assets' },
      { label: 'Figma — Handoff développeur', url: 'https://www.figma.com/best-practices/guide-to-developer-handoff/', kind: 'doc' },
    ],
  },
  {
    test: /notion/,
    links: [
      { label: 'Notion', url: 'https://www.notion.so/fr', kind: 'tool', note: 'Notes & organisation (gratuit)' },
      { label: 'Notion — Centre d’aide', url: 'https://www.notion.com/help', kind: 'doc' },
      { label: 'Notion — Modèles', url: 'https://www.notion.so/templates', kind: 'tool', note: 'Des modèles prêts à l’emploi' },
    ],
  },
  {
    test: /vs ?code|palette de commandes|raccourcis|extensions/,
    links: [
      { label: 'VS Code — documentation', url: 'https://code.visualstudio.com/docs', kind: 'doc' },
      { label: 'VS Code — raccourcis (PDF)', url: 'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf', kind: 'doc', note: 'Aide-mémoire Windows' },
    ],
  },
  {
    test: /terminal|git bash|ligne de commande|\bcd\b|\bmkdir\b/,
    links: [
      { label: 'MDN — La ligne de commande (FR)', url: 'https://developer.mozilla.org/fr/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line', kind: 'doc' },
    ],
  },
  {
    test: /readme|markdown/,
    links: [
      { label: 'Markdown Guide', url: 'https://www.markdownguide.org/', kind: 'doc', note: 'La syntaxe Markdown' },
      { label: 'GitHub — écrire sur GitHub', url: 'https://docs.github.com/fr/get-started/writing-on-github', kind: 'doc' },
    ],
  },
  {
    test: /\bvite\b/,
    links: [{ label: 'Vite — documentation', url: 'https://vite.dev/guide/', kind: 'doc', note: 'Le bundler des projets modernes' }],
  },
];

function dedupe(links: ResourceLink[], max = 6): ResourceLink[] {
  const seen = new Set<string>();
  const out: ResourceLink[] = [];
  for (const l of links) {
    if (seen.has(l.url)) continue;
    seen.add(l.url);
    out.push(l);
    if (out.length >= max) break;
  }
  return out;
}

export function resourcesFor(content: Content): ResourceLink[] {
  if (content.resources && content.resources.length > 0) {
    return dedupe(content.resources);
  }
  const hay = `${content.title} ${content.keywords.join(' ')} ${content.aliases.join(' ')} ${content.slug}`.toLowerCase();
  const topicLinks = TOPICS.filter((t) => t.test.test(hay)).flatMap((t) => t.links);
  const techLinks = RESOURCES_BY_TECH[content.technology] ?? [];
  return dedupe([...topicLinks, ...techLinks]);
}
