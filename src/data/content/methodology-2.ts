import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const methodology2Content: ReadyContent[] = [
  // ————— Organiser son projet et ses notes —————
  lesson({
    id: 'METH-F-1107-LESSON',
    slug: 'notion-organiser-son-projet-et-ses-notes',
    title: 'Notion : organiser son projet et ses notes',
    shortTitle: 'Organiser son projet',
    technology: 'methodology',
    tomeId: 't1b',
    summary:
      'Ranger son code et ses notes de façon claire et constante, pour retrouver n’importe quel fichier en quelques secondes.',
    utility:
      'Garder un projet lisible et des notes utiles, même en revenant dessus des semaines plus tard.',
    aliases: [
      'organiser projet',
      'ranger fichiers',
      'structure de dossiers',
      'notes de dev',
      'readme',
      'todo',
      'arborescence',
    ],
    keywords: [
      'ranger son code',
      'ou mettre mes fichiers',
      'dossier src',
      'prendre des notes',
      'readme projet',
      'liste de taches',
      'retrouver un fichier',
    ],
    relatedContentIds: [],
    templateId: 'METH-F-1107-TEMPLATE',
    intro:
      'Un projet bien rangé se lit comme une <b>carte</b> : chaque chose a une place logique. On regroupe le code par <b>rôle</b> (<code>components</code>, <code>utils</code>, <code>data</code>…) et on garde ses idées dans des <b>notes</b> simples (<code>README.md</code>, <code>TODO.md</code>) versionnées avec le code.',
    sections: [
      {
        id: 's1',
        title: 'Ranger par rôle, pas en vrac',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>retrouver un fichier en 3 secondes</b> quand je reviens sur mon projet, au lieu de fouiller un dossier fourre-tout de 40 fichiers.',
          },
          {
            type: 'paragraph',
            html: 'La règle : on <b>regroupe par rôle</b>. Les composants ensemble, les fonctions utilitaires ensemble, les données ensemble. Un dossier = une intention claire.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1107-l-c1',
              filename: 'arborescence.txt',
              language: 'text',
              code: `mon-projet/
  src/
    components/   // les morceaux d'interface reutilisables
    pages/        // une page = un ecran de l'app
    utils/        // les petites fonctions outils
    data/         // les donnees en dur, les constantes
    styles/       // les fichiers de style
  public/         // images et fichiers servis tels quels
  README.md       // presentation + comment lancer le projet
  TODO.md         // ce qu'il reste a faire`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une cuisine. Tu ne ranges pas les couteaux avec les épices : chaque tiroir a un thème. Ton <code>src/</code> marche pareil, un dossier par famille de fichiers.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le README : la porte d’entrée',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <code>README.md</code> est le <b>premier fichier</b> qu’on lit (toi dans 3 mois, ou un collègue). Il répond à : c’est quoi ce projet, et comment je le lance ?',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1107-l-c2',
              filename: 'README.md',
              language: 'text',
              code: `# Mon projet

Petite app de gestion de tâches en React.

## Lancer le projet

npm install   // installe les dependances
npm run dev   // demarre le serveur local

## Structure

- src/components : les composants reutilisables
- src/pages : les ecrans de l'app`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> le <code>README.md</code> vit à la <b>racine</b> du projet. Il est écrit en Markdown (<code>#</code> pour un titre, <code>-</code> pour une liste) et se met à jour dès que le lancement change.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Des notes qui suivent le code',
        blocks: [
          {
            type: 'paragraph',
            html: 'Garde tes idées <b>dans le dépôt</b>, pas dans un carnet à part qui se perd. Un <code>TODO.md</code> versionné avec Git = tes notes suivent ton code partout.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1107-l-c3',
              filename: 'TODO.md',
              language: 'text',
              code: `# A faire

## En cours
- [ ] Formulaire d'ajout de tache

## A faire ensuite
- [ ] Filtre par statut
- [ ] Sauvegarde dans le navigateur

## Fait
- [x] Affichage de la liste`,
            },
          },
          {
            type: 'table',
            headers: ['Fichier', 'À quoi il sert'],
            rows: [
              ['<code>README.md</code>', 'présenter le projet et comment le lancer'],
              ['<code>TODO.md</code>', 'lister ce qu’il reste à faire'],
              ['<code>NOTES.md</code>', 'garder les décisions et idées en vrac'],
              ['<code>.gitignore</code>', 'dire à Git ce qu’il ne faut pas versionner'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Un seul dossier fourre-tout avec 40 fichiers : impossible à parcourir. Regroupe par <b>rôle</b> dès le début.',
      'Des notes éparpillées (post-its, fichiers sur le bureau) : elles se perdent. Mets-les <b>dans le dépôt</b>.',
      'Un <code>README</code> vide ou absent : personne (même toi) ne sait comment lancer le projet.',
      'Renommer les dossiers au fil de l’eau sans logique : garde une <b>convention</b> et tiens-t’y.',
    ],
    takeaways: [
      'range le code par <b>rôle</b> : <code>components</code>, <code>utils</code>, <code>data</code>, <code>pages</code>…',
      'le <code>README.md</code> = c’est quoi le projet + comment le lancer',
      'garde tes notes (<code>TODO.md</code>) <b>dans le dépôt</b>, versionnées avec Git',
      'une place logique pour chaque fichier = tu le retrouves en 3 secondes',
    ],
  }),
  template({
    id: 'METH-F-1107-TEMPLATE',
    slug: 'notion-organiser-son-projet-et-ses-notes',
    title: 'Organiser son projet',
    shortTitle: 'Organiser',
    technology: 'methodology',
    tomeId: 't1b',
    summary: 'Des squelettes prêts à copier pour ranger un projet et écrire ses notes.',
    lede: 'Ranger un projet proprement. Choisis ce dont tu as besoin :',
    aliases: ['structure projet', 'readme', 'todo', 'arborescence'],
    keywords: ['ranger', 'notes', 'squelette de projet'],
    relatedContentIds: [],
    lessonId: 'METH-F-1107-LESSON',
    variants: [
      {
        id: 'arborescence',
        label: 'Arborescence',
        description: 'Le squelette de dossiers d’un projet front rangé par rôle.',
        codeBlocks: [
          {
            id: 'METH-F-1107-t-v1',
            filename: 'arborescence.txt',
            language: 'text',
            code: `src/
  components/
  pages/
  utils/
  data/
  styles/
public/
README.md
TODO.md`,
          },
        ],
        replacements: [
          { token: 'components / pages / utils', description: 'les familles de fichiers propres à ton app' },
          { token: 'src', description: 'le dossier qui contient tout ton code source' },
        ],
        placement: 'À créer au tout début du projet, avant d’écrire la première ligne de code.',
      },
      {
        id: 'readme',
        label: 'README',
        description: 'Un README minimal mais complet, en Markdown.',
        codeBlocks: [
          {
            id: 'METH-F-1107-t-v2',
            filename: 'README.md',
            language: 'text',
            code: `# Nom du projet

Une phrase qui dit ce que fait l'app.

## Lancer le projet

npm install
npm run dev

## Structure

- src/components : composants reutilisables
- src/pages : ecrans de l'app`,
          },
        ],
        replacements: [
          { token: 'Nom du projet', description: 'le titre de ton projet' },
          { token: 'Une phrase qui dit ce que fait l’app.', description: 'le pitch en une ligne' },
        ],
        placement: 'À la racine du projet. C’est le premier fichier que lira quiconque ouvre le dépôt.',
      },
      {
        id: 'todo',
        label: 'TODO',
        description: 'Une liste de tâches en cases à cocher Markdown.',
        codeBlocks: [
          {
            id: 'METH-F-1107-t-v3',
            filename: 'TODO.md',
            language: 'text',
            code: `# A faire

## En cours
- [ ] Tache en cours

## A faire
- [ ] Prochaine tache

## Fait
- [x] Tache terminee`,
          },
        ],
        replacements: [
          { token: 'Tache en cours', description: 'ce sur quoi tu travailles maintenant' },
          { token: 'Prochaine tache', description: 'ce que tu feras ensuite' },
        ],
        placement: 'À la racine, versionné avec Git. Coche les cases au fur et à mesure.',
      },
    ],
  }),

  // ————— Un monorepo : client, serveur et workspaces —————
  lesson({
    id: 'METH-F-1108-LESSON',
    slug: 'un-monorepo-client-serveur-et-workspaces',
    title: 'Un monorepo : client, serveur et workspaces',
    shortTitle: 'Monorepo',
    technology: 'methodology',
    tomeId: 't1b',
    summary:
      'Réunir le front (client) et le back (serveur) dans un seul dépôt bien séparé, géré par des workspaces npm.',
    utility:
      'Garder client et serveur ensemble dans un même dépôt, sans mélanger leurs dépendances.',
    aliases: [
      'monorepo',
      'monorepot',
      'workspaces',
      'npm workspaces',
      'client serveur',
      'front back',
      'un seul depot',
    ],
    keywords: [
      'un seul depot',
      'client et serveur ensemble',
      'workspaces npm',
      'partager du code',
      'front et back',
      'plusieurs package json',
      'organiser fullstack',
    ],
    relatedContentIds: [],
    templateId: 'METH-F-1108-TEMPLATE',
    intro:
      'Un <b>monorepo</b> = un seul dépôt Git qui contient <b>plusieurs projets</b> (ici le client et le serveur). Les <b>workspaces</b> npm permettent de les gérer ensemble, avec un <code>package.json</code> à la racine qui pointe vers chaque sous-projet.',
    sections: [
      {
        id: 's1',
        title: 'La structure : client + serveur',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>garder mon front React et mon back Express dans le même dépôt</b>, sans que leurs dépendances se mélangent.',
          },
          {
            type: 'paragraph',
            html: 'On crée un dossier par projet (souvent dans <code>packages/</code>), chacun avec <b>son propre</b> <code>package.json</code>. La racine, elle, ne contient que la configuration commune.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1108-l-c1',
              filename: 'arborescence.txt',
              language: 'text',
              code: `mon-app/
  package.json      // racine : declare les workspaces
  packages/
    client/         // le front React
      package.json  // ses propres dependances
      src/
    server/         // le back Express
      package.json  // ses propres dependances
      src/`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un immeuble. La racine = le hall d’entrée commun ; <code>client/</code> et <code>server/</code> = deux appartements séparés, chacun avec sa cuisine (ses dépendances).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Déclarer les workspaces',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dans le <code>package.json</code> de la <b>racine</b>, la clé <code>workspaces</code> liste les sous-projets. npm sait alors qu’ils forment un tout.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1108-l-c2',
              filename: 'package.json',
              language: 'json',
              code: `{
  "name": "mon-app",
  "private": true,
  "workspaces": [
    "packages/client",
    "packages/server"
  ]
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> le <code>package.json</code> racine porte <code>"private": true</code> (il ne sera jamais publié) et ne sert qu’à orchestrer les workspaces.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Installer et lancer depuis la racine',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un seul <code>npm install</code> à la racine installe <b>tout</b>. Et <code>-w</code> (workspace) permet de cibler un sous-projet précis pour lancer une commande.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1108-l-c3',
              filename: 'terminal.sh',
              language: 'bash',
              code: `# Depuis la racine : installe les deux projets d'un coup
npm install

# Lancer le client seulement
npm run dev -w client

# Lancer le serveur seulement
npm run dev -w server

# Ajouter une dependance uniquement au serveur
npm install express -w server`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Rôle'],
            rows: [
              ['<code>package.json</code> racine', 'déclare les workspaces, orchestre le tout'],
              ['<code>packages/client</code>', 'le front, avec ses dépendances'],
              ['<code>packages/server</code>', 'le back, avec ses dépendances'],
              ['<code>-w client</code>', 'cible un workspace précis pour une commande'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Mélanger toutes les dépendances dans un seul <code>package.json</code> : le front se retrouve avec des paquets serveur inutiles. Un <code>package.json</code> <b>par projet</b>.',
      'Oublier <code>"private": true</code> à la racine : les workspaces marchent quand même, mais rien ne t’empêche de publier par erreur le dépôt racine sur npm.',
      'Lancer <code>npm install</code> dans un sous-dossier au lieu de la racine : installe partiellement et casse la résolution des workspaces.',
      'Nommer deux workspaces pareil : le drapeau <code>-w</code> devient ambigu. Chaque nom doit être <b>unique</b>.',
    ],
    takeaways: [
      'monorepo = un dépôt Git, <b>plusieurs projets</b> (client + serveur)',
      'un <code>package.json</code> <b>par projet</b> + un à la racine qui déclare <code>workspaces</code>',
      'racine : <code>"private": true</code> et la liste des sous-projets',
      '<code>npm install</code> à la racine installe tout · <code>-w nom</code> cible un projet',
    ],
  }),
  template({
    id: 'METH-F-1108-TEMPLATE',
    slug: 'un-monorepo-client-serveur-et-workspaces',
    title: 'Monorepo (workspaces)',
    shortTitle: 'Monorepo',
    technology: 'methodology',
    tomeId: 't1b',
    summary: 'Mettre en place un monorepo npm : racine, sous-projets et commandes.',
    lede: 'Réunir client et serveur dans un dépôt. Choisis l’étape :',
    aliases: ['monorepo', 'workspaces', 'npm workspaces', 'client serveur'],
    keywords: ['un seul depot', 'package json racine', 'workspace'],
    relatedContentIds: [],
    lessonId: 'METH-F-1108-LESSON',
    variants: [
      {
        id: 'racine',
        label: 'package.json racine',
        description: 'Le fichier racine qui déclare les workspaces.',
        codeBlocks: [
          {
            id: 'METH-F-1108-t-v1',
            filename: 'package.json',
            language: 'json',
            code: `{
  "name": "mon-app",
  "private": true,
  "workspaces": [
    "packages/client",
    "packages/server"
  ]
}`,
          },
        ],
        replacements: [
          { token: 'mon-app', description: 'le nom global de ton monorepo' },
          { token: 'packages/client', description: 'le chemin vers chaque sous-projet' },
        ],
        placement: 'À la racine du dépôt. C’est lui qui transforme le dossier en monorepo.',
      },
      {
        id: 'arborescence',
        label: 'Arborescence',
        description: 'Le squelette de dossiers client + serveur.',
        codeBlocks: [
          {
            id: 'METH-F-1108-t-v2',
            filename: 'arborescence.txt',
            language: 'text',
            code: `mon-app/
  package.json
  packages/
    client/
      package.json
    server/
      package.json`,
          },
        ],
        replacements: [
          { token: 'client', description: 'ton front (React, Vue…)' },
          { token: 'server', description: 'ton back (Express, Fastify…)' },
        ],
        placement: 'La forme cible du dépôt : un dossier par projet sous packages/.',
      },
      {
        id: 'commandes',
        label: 'Commandes',
        description: 'Installer et lancer chaque workspace.',
        codeBlocks: [
          {
            id: 'METH-F-1108-t-v3',
            filename: 'terminal.sh',
            language: 'bash',
            code: `# Tout installer depuis la racine
npm install

# Lancer un workspace precis
npm run dev -w client
npm run dev -w server

# Installer un paquet dans un seul workspace
npm install axios -w client`,
          },
        ],
        replacements: [
          { token: 'client', description: 'le nom du workspace à cibler' },
          { token: 'axios', description: 'le paquet à installer dans ce workspace' },
        ],
        placement: 'Toujours lancer ces commandes depuis la racine du monorepo.',
      },
    ],
  }),

  // ————— La structure MVC : models, controllers et routes —————
  lesson({
    id: 'METH-F-1109-LESSON',
    slug: 'la-structure-mvc-models-controllers-et-routes',
    title: 'La structure MVC : models, controllers et routes',
    shortTitle: 'Structure MVC',
    technology: 'methodology',
    tomeId: 't1b',
    summary:
      'Découper un serveur en trois rôles clairs — routes, controllers, models — pour un back lisible et facile à faire évoluer.',
    utility:
      'Organiser un serveur (Express) en séparant la route, la logique et l’accès aux données.',
    aliases: [
      'mvc',
      'modele vue controleur',
      'model controller',
      'routes controllers',
      'structure serveur',
      'organiser express',
      'couches back',
    ],
    keywords: [
      'organiser un serveur',
      'separer la logique',
      'route controller model',
      'structure express',
      'couches d application',
      'ou mettre la logique',
      'back propre',
    ],
    relatedContentIds: [],
    templateId: 'METH-F-1109-TEMPLATE',
    intro:
      'Le <b>MVC</b> range un serveur en trois rôles : la <b>route</b> reçoit la requête, le <b>controller</b> décide quoi faire, le <b>model</b> parle aux données. Chacun a un seul job — le back reste lisible même quand il grossit.',
    sections: [
      {
        id: 's1',
        title: 'Trois rôles, trois dossiers',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>arrêter d’entasser toute ma logique dans un seul gros fichier de routes</b> de 500 lignes, et savoir où va chaque bout de code.',
          },
          {
            type: 'paragraph',
            html: 'On sépare en trois couches : <code>routes/</code> (les URL), <code>controllers/</code> (ce qu’on fait pour chaque URL), <code>models/</code> (la forme et l’accès aux données).',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1109-l-c1',
              filename: 'arborescence.txt',
              language: 'text',
              code: `server/
  src/
    routes/       // les URL : /users, /products...
    controllers/  // la logique de chaque route
    models/       // la forme des donnees + acces base
    app.js        // assemble le tout`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un restaurant. La <b>route</b> = le serveur qui prend la commande ; le <b>controller</b> = le chef qui décide de la recette ; le <b>model</b> = le garde-manger où sont les ingrédients (les données).',
          },
        ],
      },
      {
        id: 's2',
        title: 'La route : juste l’aiguillage',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une route ne fait <b>presque rien</b> : elle associe une URL à une fonction du controller. Aucune logique métier ici.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1109-l-c2',
              filename: 'routes/users.js',
              language: 'javascript',
              code: `import { Router } from "express";
import { getUsers, createUser } from "../controllers/users.js";

const router = Router();

// GET /users -> le controller getUsers repond
router.get("/", getUsers);

// POST /users -> le controller createUser repond
router.post("/", createUser);

export default router;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> un fichier de routes par <b>ressource</b> (<code>users.js</code>, <code>products.js</code>). La route <b>délègue</b> toujours au controller, elle ne calcule rien.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Controller et model',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <b>controller</b> orchestre : il lit la requête, appelle le <b>model</b> pour les données, et renvoie la réponse. Le model, lui, ne connaît que les données.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1109-l-c3',
              filename: 'controllers/users.js',
              language: 'javascript',
              code: `import { UserModel } from "../models/user.js";

// Recoit la requete, delegue au model, renvoie la reponse
export async function getUsers(req, res) {
  const users = await UserModel.findAll(); // le model va chercher
  res.json(users);                         // le controller repond
}

export async function createUser(req, res) {
  const nouveau = await UserModel.create(req.body);
  res.status(201).json(nouveau);
}`,
            },
          },
          {
            type: 'table',
            headers: ['Couche', 'Son seul job', 'Ne fait PAS'],
            rows: [
              ['<code>route</code>', 'associer une URL à un controller', 'de la logique'],
              ['<code>controller</code>', 'orchestrer la réponse', 'parler directement à la base'],
              ['<code>model</code>', 'lire/écrire les données', 'gérer la requête HTTP'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre la logique métier <b>dans la route</b> : elle doit juste aiguiller vers le controller.',
      'Faire parler le controller <b>directement</b> à la base de données : passe par le model, sinon tout est mélangé.',
      'Un seul fichier <code>routes.js</code> géant : découpe <b>par ressource</b> (<code>users</code>, <code>products</code>…).',
      'Confondre les couches : si tu ne sais plus où mettre un bout de code, c’est souvent qu’il appartient à une autre couche.',
    ],
    takeaways: [
      'MVC = trois rôles : <b>route</b> (URL) → <b>controller</b> (logique) → <b>model</b> (données)',
      'la route <b>délègue</b> au controller, elle ne calcule rien',
      'le controller passe par le <b>model</b> pour toucher aux données',
      'un fichier de routes et un controller <b>par ressource</b>',
    ],
  }),
  template({
    id: 'METH-F-1109-TEMPLATE',
    slug: 'la-structure-mvc-models-controllers-et-routes',
    title: 'Structure MVC',
    shortTitle: 'MVC',
    technology: 'methodology',
    tomeId: 't1b',
    summary: 'Les trois couches d’un serveur MVC prêtes à copier : route, controller, model.',
    lede: 'Découper un serveur en couches. Choisis la couche :',
    aliases: ['mvc', 'routes', 'controllers', 'models'],
    keywords: ['structure serveur', 'couches', 'express'],
    relatedContentIds: [],
    lessonId: 'METH-F-1109-LESSON',
    variants: [
      {
        id: 'route',
        label: 'Route',
        description: 'Un fichier de routes qui délègue au controller.',
        codeBlocks: [
          {
            id: 'METH-F-1109-t-v1',
            filename: 'routes/ressource.js',
            language: 'javascript',
            code: `import { Router } from "express";
import { getAll, create } from "../controllers/ressource.js";

const router = Router();

router.get("/", getAll);
router.post("/", create);

export default router;`,
          },
        ],
        replacements: [
          { token: 'ressource', description: 'le nom de ta ressource (users, products…)' },
          { token: 'getAll / create', description: 'les fonctions du controller à brancher' },
        ],
        placement: 'Dans src/routes/, un fichier par ressource. La route aiguille, rien de plus.',
      },
      {
        id: 'controller',
        label: 'Controller',
        description: 'Un controller qui orchestre la réponse.',
        codeBlocks: [
          {
            id: 'METH-F-1109-t-v2',
            filename: 'controllers/ressource.js',
            language: 'javascript',
            code: `import { Model } from "../models/ressource.js";

export async function getAll(req, res) {
  const items = await Model.findAll();
  res.json(items);
}

export async function create(req, res) {
  const item = await Model.create(req.body);
  res.status(201).json(item);
}`,
          },
        ],
        replacements: [
          { token: 'Model', description: 'le model de la ressource' },
          { token: 'getAll / create', description: 'les actions exposées par ce controller' },
        ],
        placement: 'Dans src/controllers/. Il lit la requête, appelle le model, renvoie la réponse.',
      },
      {
        id: 'model',
        label: 'Model',
        description: 'Un model qui isole l’accès aux données.',
        codeBlocks: [
          {
            id: 'METH-F-1109-t-v3',
            filename: 'models/ressource.js',
            language: 'javascript',
            code: `// Le model ne connait QUE les donnees
export const Model = {
  async findAll() {
    // va chercher toutes les entrees
    return db.query("SELECT * FROM ressource");
  },
  async create(data) {
    // ajoute une entree
    return db.insert("ressource", data);
  },
};`,
          },
        ],
        replacements: [
          { token: 'ressource', description: 'la table ou la collection concernée' },
          { token: 'findAll / create', description: 'les opérations sur les données' },
        ],
        placement: 'Dans src/models/. Seul endroit qui touche la base ; il ignore tout du HTTP.',
      },
    ],
  }),

  // ————— Bien nommer ses fichiers et ses variables —————
  lesson({
    id: 'METH-F-1110-LESSON',
    slug: 'bien-nommer-ses-fichiers-et-ses-variables',
    title: 'Bien nommer ses fichiers et ses variables',
    shortTitle: 'Bien nommer',
    technology: 'methodology',
    tomeId: 't1b',
    summary:
      'Choisir des noms clairs et cohérents (camelCase, PascalCase, kebab-case) pour un code qui se lit tout seul.',
    utility:
      'Donner à chaque fichier et variable un nom qui dit ce qu’il contient, sans commentaire.',
    aliases: [
      'nommer',
      'nommage',
      'convention de nommage',
      'camelcase',
      'pascalcase',
      'kebab-case',
      'nom de variable',
      'nom de fichier',
    ],
    keywords: [
      'bien nommer une variable',
      'convention de nommage',
      'camelcase pascalcase',
      'nom de fichier',
      'code lisible',
      'nommer un composant',
      'nommer un booleen',
    ],
    relatedContentIds: [],
    templateId: 'METH-F-1110-TEMPLATE',
    intro:
      'Un bon nom <b>décrit son contenu</b> sans qu’on ait à lire le code autour. On suit des <b>conventions</b> selon le rôle : <code>camelCase</code> pour les variables, <code>PascalCase</code> pour les composants, <code>kebab-case</code> pour beaucoup de fichiers.',
    sections: [
      {
        id: 's1',
        title: 'Un nom qui décrit le contenu',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>relire mon code dans un mois et comprendre chaque variable</b> sans avoir à deviner ce que contient <code>x</code>, <code>data2</code> ou <code>temp</code>.',
          },
          {
            type: 'paragraph',
            html: 'La règle : un nom dit <b>quoi</b>, pas <b>comment</b>. Long et clair vaut mieux que court et mystérieux. Un booléen commence par <code>is</code>, <code>has</code> ou <code>can</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1110-l-c1',
              filename: 'exemples.js',
              language: 'javascript',
              code: `// Flou : on ne sait pas ce que c'est
const d = 42;
const list = [];
const flag = true;

// Clair : le nom raconte tout
const ageUtilisateur = 42;
const produitsPanier = [];
const estConnecte = true; // booleen -> commence par "est"/"is"`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> des cartons de déménagement. « Carton 3 » ne t’aide en rien ; « Cuisine – assiettes » te dit tout de suite quoi ouvrir. Tes variables sont ces étiquettes.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les trois casses courantes',
        blocks: [
          {
            type: 'paragraph',
            html: 'Chaque <b>casse</b> a un usage attendu. Les respecter, c’est parler la même langue que les autres devs (et que les frameworks).',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1110-l-c2',
              filename: 'casses.js',
              language: 'javascript',
              code: `// camelCase : variables et fonctions
const nombreDeVues = 10;
function calculerTotal() {}

// PascalCase : composants et classes
function CarteProduit() {}
class UtilisateurConnecte {}

// UPPER_SNAKE_CASE : constantes globales figees
const URL_API = "https://exemple.fr";`,
            },
          },
          {
            type: 'table',
            headers: ['Casse', 'Pour quoi', 'Exemple'],
            rows: [
              ['<code>camelCase</code>', 'variables, fonctions', '<code>ageUtilisateur</code>'],
              ['<code>PascalCase</code>', 'composants, classes', '<code>CarteProduit</code>'],
              ['<code>UPPER_SNAKE_CASE</code>', 'constantes figées', '<code>URL_API</code>'],
              ['<code>kebab-case</code>', 'noms de fichiers', '<code>carte-produit.css</code>'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Nommer ses fichiers',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le nom du fichier suit souvent son contenu : un <b>composant</b> React en <code>PascalCase</code>, la plupart des <b>autres</b> fichiers en <code>kebab-case</code>. L’important est de rester <b>cohérent</b> dans tout le projet.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1110-l-c3',
              filename: 'noms-fichiers.txt',
              language: 'text',
              code: `// Composants React : PascalCase, comme le composant
CarteProduit.tsx
BarreDeRecherche.tsx

// Utilitaires, styles, config : kebab-case
formater-date.js
carte-produit.css
vite.config.js`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> le fichier d’un composant porte <b>exactement</b> le nom du composant (<code>CarteProduit.tsx</code> exporte <code>CarteProduit</code>). Choisis une convention et applique-la <b>partout</b>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Des noms cryptiques (<code>x</code>, <code>data2</code>, <code>temp</code>) : tu paieras la relecture plus tard. Décris le contenu.',
      'Mélanger les casses au hasard (<code>Carte_produit</code>, <code>carteProduit.tsx</code>) : choisis une convention et tiens-t’y.',
      'Un booléen sans préfixe : préfère <code>estActif</code> / <code>isActive</code> à <code>actif</code> tout court.',
      'Abréger à outrance (<code>usrLst</code>) : quelques lettres gagnées, beaucoup de clarté perdue.',
    ],
    takeaways: [
      'un nom <b>décrit le contenu</b> : clair et long &gt; court et mystérieux',
      '<code>camelCase</code> = variables/fonctions · <code>PascalCase</code> = composants/classes',
      '<code>UPPER_SNAKE_CASE</code> = constantes figées · <code>kebab-case</code> = fichiers',
      'booléen → préfixe <code>is</code>/<code>has</code>/<code>est</code> · fichier composant = nom du composant',
    ],
  }),
  template({
    id: 'METH-F-1110-TEMPLATE',
    slug: 'bien-nommer-ses-fichiers-et-ses-variables',
    title: 'Bien nommer',
    shortTitle: 'Nommage',
    technology: 'methodology',
    tomeId: 't1b',
    summary: 'Des repères de nommage prêts à copier : variables, composants, fichiers.',
    lede: 'Choisir de bons noms. Choisis le cas :',
    aliases: ['nommage', 'camelcase', 'pascalcase', 'kebab-case'],
    keywords: ['nom de variable', 'convention', 'casse'],
    relatedContentIds: [],
    lessonId: 'METH-F-1110-LESSON',
    variants: [
      {
        id: 'variables',
        label: 'Variables',
        description: 'camelCase, et un booléen bien préfixé.',
        codeBlocks: [
          {
            id: 'METH-F-1110-t-v1',
            filename: 'variables.js',
            language: 'javascript',
            code: `// camelCase, descriptif
const ageUtilisateur = 42;
const produitsPanier = [];

// booleen : prefixe est / is / has
const estConnecte = true;
const aDesArticles = produitsPanier.length > 0;`,
          },
        ],
        replacements: [
          { token: 'ageUtilisateur', description: 'un nom qui décrit la valeur' },
          { token: 'estConnecte', description: 'un booléen préfixé de est/is/has' },
        ],
        placement: 'Pour toute variable ou fonction : camelCase, et un préfixe clair pour les booléens.',
      },
      {
        id: 'composants',
        label: 'Composants',
        description: 'PascalCase, fichier au même nom.',
        codeBlocks: [
          {
            id: 'METH-F-1110-t-v2',
            filename: 'CarteProduit.tsx',
            language: 'tsx',
            code: `// Fichier CarteProduit.tsx -> composant CarteProduit
export function CarteProduit() {
  return <article>...</article>;
}`,
          },
        ],
        replacements: [
          { token: 'CarteProduit', description: 'le nom du composant (et du fichier)' },
        ],
        placement: 'Pour un composant React ou une classe : PascalCase, et le fichier porte le même nom.',
      },
      {
        id: 'fichiers',
        label: 'Fichiers',
        description: 'kebab-case pour les fichiers non-composants.',
        codeBlocks: [
          {
            id: 'METH-F-1110-t-v3',
            filename: 'noms-fichiers.txt',
            language: 'text',
            code: `// Utilitaires, styles, config : kebab-case
formater-date.js
carte-produit.css
api-client.js`,
          },
        ],
        replacements: [
          { token: 'formater-date', description: 'le nom du fichier, en kebab-case' },
        ],
        placement: 'Pour les fichiers hors composants : kebab-case, cohérent dans tout le projet.',
      },
    ],
  }),
];
