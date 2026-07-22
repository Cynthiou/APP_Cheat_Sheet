import type { Content, ContentKind, PlannedContent, Technology } from '@/types/content';
import { normalize, slugify, tokenize } from '@/utils/normalize';

interface RawEntry {
  tomeId: string;
  technology: Technology;
  kind: ContentKind;
  title: string;
}

interface TomeBatch {
  tomeId: string;
  technology: Technology;
  kind: ContentKind;
  titles: string[];
}

const BATCHES: TomeBatch[] = [
  {
    tomeId: 't0',
    technology: 'tools',
    kind: 'lesson',
    titles: [
      'C’est quoi Node.js et l’installer',
      'C’est quoi npm',
      'Les commandes du terminal : cd, ls, mkdir, pwd',
      'Créer un projet React avec Vite',
      'npm install : installer les dépendances',
      'npm run dev : lancer le projet',
      'La structure d’un projet : les dossiers',
      'Le fichier package.json expliqué',
      'Le fichier .env : variables d’environnement',
      'Installer une librairie : npm install nom',
    ],
  },
  {
    tomeId: 't1',
    technology: 'git',
    kind: 'lesson',
    titles: [
      'git init et cloner un dépôt',
      'git add et git commit',
      'git push et git pull',
      'Créer une branche : git checkout -b',
      'Changer de branche',
      'Fusionner : merge',
      'Faire une Pull Request',
      'Le fichier .gitignore',
      'Corriger un commit et annuler',
    ],
  },
  {
    tomeId: 't1b',
    technology: 'methodology',
    kind: 'lesson',
    titles: [
      'La méthode Agile : c’est quoi',
      'Scrum : sprints, daily, rétrospective',
      'Les user stories',
      'Le Kanban : Trello et Jira',
      'Le terminal et Git Bash : les commandes de base',
      'VS Code : raccourcis et extensions utiles',
      'Figma : lire une maquette et exporter des images',
      'Notion : organiser son projet et ses notes',
      'Un monorepo : client, serveur et workspaces',
      'La structure MVC : models, controllers et routes',
      'Bien nommer ses fichiers et ses variables',
    ],
  },
  {
    tomeId: 't2',
    technology: 'html',
    kind: 'lesson',
    titles: [
      'La structure d’une page HTML',
      'Les balises courantes',
      'Les liens et les images',
      'Les formulaires HTML',
    ],
  },
  {
    tomeId: 't2',
    technology: 'css',
    kind: 'lesson',
    titles: [
      'Les sélecteurs CSS',
      'Le box model : marges et bordures',
      'Flexbox',
      'Grid',
      'Le responsive : media queries',
      'Les variables CSS',
      'position : relative, absolute et fixed',
      'Les animations et transitions',
    ],
  },
  {
    tomeId: 't3',
    technology: 'javascript',
    kind: 'lesson',
    titles: [
      'Les variables : let et const',
      'Les types : nombre, texte et booléen',
      'Les conditions : if et else',
      'Les boucles : for et while',
      'Les fonctions',
      'Les fonctions fléchées',
      'Les tableaux : arrays',
      'Les objets',
      'map()',
      'filter()',
      'find()',
      'sort()',
      'reduce()',
      'La déstructuration',
      'Le spread et le rest',
      'Les template literals',
      'Les Promesses',
      'async et await',
      'fetch',
      'try et catch : gérer les erreurs',
      'Les opérateurs : égalité, et, ou, optional chaining',
      'Le ternaire : condition ? a : b',
      'switch',
      'forEach',
      'includes et indexOf',
      'Les méthodes de texte : toUpperCase, split, slice',
      'Les méthodes de nombre : toFixed, parseInt',
      'JSON.parse et JSON.stringify',
      'setTimeout et setInterval',
      'Les classes',
      'Les modules : import et export',
      'Sélectionner un élément : querySelector',
      'Modifier un élément : texte, style et classe',
      'Réagir à un événement : addEventListener',
      'Créer et supprimer un élément',
      'Récupérer la valeur d’un input',
    ],
  },
  {
    tomeId: 't4',
    technology: 'typescript',
    kind: 'lesson',
    titles: [
      'C’est quoi un type',
      'Typer une variable',
      'Les types objet',
      'Les tableaux : Type[]',
      'Les types union',
      'Les propriétés optionnelles',
      'Les interfaces',
      'Typer une fonction',
      'Typer les props',
      'L’assertion as',
      'Les génériques : introduction',
    ],
  },
  {
    tomeId: 't5',
    technology: 'react',
    kind: 'lesson',
    titles: [
      'Créer un composant',
      'C’est quoi le JSX',
      'Afficher une variable dans le JSX',
      'Les props : passer des données',
      'Typer les props (React)',
      'Les conditions en JSX : et logique, ternaire',
      'Afficher une liste : map et key',
      'Le style dans React : className et style',
    ],
  },
  {
    tomeId: 't6',
    technology: 'react',
    kind: 'lesson',
    titles: [
      'useEffect',
      'useRef',
      'useContext',
      'useMemo',
      'useCallback',
      'Créer son propre hook : custom hook',
    ],
  },
  {
    tomeId: 't7',
    technology: 'react',
    kind: 'lesson',
    titles: [
      'Réagir à un clic : onClick',
      'Un champ contrôlé : input et onChange',
      'Un formulaire complet : onSubmit',
      'Gérer plusieurs champs',
      'Valider un formulaire',
      'Cases à cocher et boutons radio',
      'Menu déroulant : select',
    ],
  },
  {
    tomeId: 't8',
    technology: 'react',
    kind: 'lesson',
    titles: [
      'fetch une liste',
      'fetch un seul objet',
      'fetch avec async et await',
      'Afficher un loader : chargement',
      'Gérer une erreur de requête',
      'Axios : alternative à fetch',
      'Rafraîchir les données',
    ],
  },
  {
    tomeId: 't9',
    technology: 'react',
    kind: 'lesson',
    titles: [
      'Installer React Router',
      'Définir des routes',
      'Link et NavLink',
      'Une route dynamique : /produit/:id',
      'useParams',
      'useNavigate',
      'Une page 404',
      'Routes protégées',
    ],
  },
  {
    tomeId: 't10',
    technology: 'react',
    kind: 'lesson',
    titles: [
      'Le Context API',
      'Remonter l’état : lifting state up',
      'Créer un composant réutilisable',
      'Passer une fonction en prop',
      'Les listes filtrées et triées',
    ],
  },
  {
    tomeId: 't11',
    technology: 'node',
    kind: 'lesson',
    titles: [
      'C’est quoi Node',
      'Exécuter un fichier JavaScript',
      'Les modules : import et export (Node)',
      'npm et scripts',
      'Les variables d’environnement (Node)',
    ],
  },
  {
    tomeId: 't12',
    technology: 'express',
    kind: 'lesson',
    titles: [
      'Créer un serveur Express',
      'Une route GET',
      'Une route POST',
      'Une route PUT',
      'Une route DELETE',
      'req : la requête',
      'res : la réponse',
      'Le Router Express',
      'Un middleware',
      'Gérer les erreurs (Express)',
      'CORS',
      'Upload de fichiers',
      'Connecter Express à la base de données',
      'La structure MVC : models, controllers et routes (Express)',
      'Valider les données reçues',
      'Les requêtes préparées : sécurité',
    ],
  },
  {
    tomeId: 't13',
    technology: 'sql',
    kind: 'lesson',
    titles: [
      'Installer MySQL',
      'Créer une base',
      'Créer une table',
      'Les types SQL',
      'INSERT',
      'SELECT',
      'UPDATE',
      'DELETE',
      'WHERE',
      'ORDER BY et LIMIT',
      'JOIN',
      'Clé primaire et clé étrangère',
      'Les relations : 1-1, 1-N et N-N',
      'Connecter Express à MySQL',
    ],
  },
  {
    tomeId: 't14',
    technology: 'database',
    kind: 'lesson',
    titles: [
      'MCD : modèle conceptuel',
      'MLD : modèle logique',
      'Les cardinalités',
      'Relation 1-1, 1-N et N-N (modélisation)',
    ],
  },
  {
    tomeId: 't15',
    technology: 'auth',
    kind: 'lesson',
    titles: [
      'Hasher un mot de passe avec bcrypt',
      'Créer un token avec JWT',
      'Vérifier un token',
      'Middleware d’authentification',
      'Login et logout côté React',
      'Stocker le token',
    ],
  },
  {
    tomeId: 't16',
    technology: 'deployment',
    kind: 'lesson',
    titles: [
      'Le build : npm run build',
      'Déployer le front : Vercel et Netlify',
      'Déployer le serveur : Render et Railway',
      'Les variables d’environnement en production',
      'Docker : plus tard',
    ],
  },
  {
    tomeId: 't17',
    technology: 'testing',
    kind: 'lesson',
    titles: [
      'Les tests : Jest et Vitest',
      'Testing Library : tester un composant React',
      'ESLint, Prettier et Biome : formatage automatique',
      'Débugger : console et DevTools du navigateur',
    ],
  },
  {
    tomeId: 't17',
    technology: 'advanced',
    kind: 'lesson',
    titles: [
      'localStorage et sessionStorage',
      'Manipuler les dates',
      'Les expressions régulières : regex',
      'Utiliser une API externe avec une clé API',
      'Tester une API avec Postman',
      'React Query et TanStack Query',
      'Les WebSockets : temps réel et chat',
      'Zustand',
      'Redux : introduction',
      'Next.js : introduction',
      'L’accessibilité : a11y',
      'Optimiser les performances React',
      'Les bonnes pratiques et le clean code',
      'Docker : introduction',
    ],
  },
  {
    tomeId: 't10',
    technology: 'react',
    kind: 'guide',
    titles: [
      'Créer une navbar responsive',
      'Créer un menu burger mobile',
      'Créer un système d’onglets',
      'Créer un accordéon ou FAQ',
      'Créer un dark mode',
      'Créer des notifications toast',
      'Créer un loader ou skeleton',
      'Créer un carrousel ou slider',
      'Créer une galerie d’images avec lightbox',
      'Créer une barre de progression',
      'Créer un tooltip',
    ],
  },
  {
    tomeId: 't8',
    technology: 'react',
    kind: 'guide',
    titles: [
      'Créer une page détail avec /produit/:id',
      'Créer un formulaire avec envoi',
      'Créer un formulaire multi-étapes',
      'Créer une recherche avec autocomplétion',
      'Créer un tri : A-Z, prix',
      'Créer un infinite scroll',
      'Créer des favoris',
      'Créer un panier e-commerce',
      'Créer une todo list',
      'Créer un système de likes et de notes',
      'Créer un upload d’image',
    ],
  },
  {
    tomeId: 't15',
    technology: 'auth',
    kind: 'guide',
    titles: [
      'Créer une inscription : register',
      'Créer une page de connexion : login',
      'Créer une déconnexion',
      'Créer une authentification JWT complète',
      'Protéger des routes',
      'Gérer les rôles : admin et utilisateur',
      'Créer un mot de passe oublié',
    ],
  },
  {
    tomeId: 't12',
    technology: 'express',
    kind: 'guide',
    titles: [
      'Créer une API Express et MySQL',
      'Créer un CRUD full-stack : SQL, Express et React',
      'Créer une relation entre tables : users vers posts',
      'Pagination et recherche côté serveur',
      'Uploader un fichier sur le serveur',
      'Envoyer un email',
      'Créer une API REST complète',
    ],
  },
  {
    tomeId: 't17',
    technology: 'advanced',
    kind: 'guide',
    titles: [
      'Une todo app full-stack',
      'Un blog avec articles et commentaires',
      'Un e-commerce avec produits, panier et commande',
      'Un réseau social simple avec posts et likes',
      'Un dashboard admin',
      'Une app météo avec API externe',
      'Une app de recettes de cuisine avec API externe',
      'Une application full-stack complète de A à Z',
    ],
  },
];

function flatten(): RawEntry[] {
  const out: RawEntry[] = [];
  for (const b of BATCHES) {
    for (const title of b.titles) {
      out.push({ tomeId: b.tomeId, technology: b.technology, kind: b.kind, title });
    }
  }
  return out;
}

export function buildPlanned(skipTitles: ReadonlySet<string>): Content[] {
  const used = new Set<string>();
  const items: PlannedContent[] = [];
  let index = 0;

  for (const entry of flatten()) {
    index += 1;
    let slug = slugify(entry.title);
    if (!slug) slug = `entree-${index}`;
    if (skipTitles.has(normalize(entry.title))) continue;
    let unique = slug;
    let n = 2;
    while (used.has(`${entry.kind}:${unique}`)) {
      unique = `${slug}-${n}`;
      n += 1;
    }
    used.add(`${entry.kind}:${unique}`);

    items.push({
      id: `PLAN-${entry.kind.toUpperCase()}-${index}`,
      slug: unique,
      kind: entry.kind,
      status: 'planned',
      title: entry.title,
      technology: entry.technology,
      tomeId: entry.tomeId,
      summary: '',
      aliases: [],
      keywords: tokenize(entry.title),
      relatedContentIds: [],
    });
  }

  return items;
}
