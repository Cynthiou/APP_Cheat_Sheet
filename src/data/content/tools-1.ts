import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const tools1Content: ReadyContent[] = [
  // ————— C’est quoi Node.js et l’installer —————
  lesson({
    id: 'TOOLS-F-1100-LESSON',
    slug: 'c-est-quoi-node-js-et-l-installer',
    title: 'C’est quoi Node.js et l’installer',
    shortTitle: 'Node.js',
    technology: 'tools',
    tomeId: 't0',
    summary:
      'Node.js fait tourner du JavaScript en dehors du navigateur : c’est le moteur qui permet de lancer React, Vite et les outils modernes.',
    utility: 'Installer le moteur qui exécute JavaScript sur ta machine et fait tourner tous les outils.',
    aliases: ['node', 'nodejs', 'node js', 'installer node', 'moteur javascript', 'runtime'],
    keywords: [
      'executer javascript hors navigateur',
      'installer node',
      'version lts',
      'node -v',
      'moteur js',
      'prerequis react',
    ],
    relatedContentIds: [],
    templateId: 'TOOLS-F-1100-TEMPLATE',
    intro:
      '<b>Node.js</b> est un <b>moteur</b> qui exécute du <b>JavaScript</b> en dehors du navigateur. Sans lui, impossible de lancer Vite, React ou <code>npm</code>. C’est le tout premier outil à installer.',
    sections: [
      {
        id: 's1',
        title: 'À quoi sert Node.js',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>démarrer un projet React sur ma machine</b>, mais on me dit qu’il me faut d’abord « installer Node ». Je ne comprends pas pourquoi.',
          },
          {
            type: 'paragraph',
            html: 'Le <b>JavaScript</b> tournait à l’origine <b>seulement dans le navigateur</b>. <b>Node.js</b> lui permet de tourner <b>directement sur ton ordinateur</b>. C’est grâce à ça que des outils comme <code>npm</code> et <code>vite</code> peuvent s’exécuter dans ton terminal.',
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> Node.js = le <b>moteur d’une voiture</b>. React, Vite, npm sont la carrosserie et les options, mais sans moteur rien ne roule.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Installer la version LTS',
        blocks: [
          {
            type: 'paragraph',
            html: 'On télécharge Node.js sur le site officiel <code>nodejs.org</code>. Choisis toujours la version <b>LTS</b> (Long Term Support) : c’est la version <b>stable</b>, recommandée pour travailler.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1100-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# 1. Va sur nodejs.org et telecharge la version LTS
# 2. Lance l'installateur (clique sur Suivant jusqu'au bout)
# 3. Rien d'autre a faire : npm est installe avec Node`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> prends la <b>LTS</b>, pas la « Current ». La Current contient les toutes dernières nouveautés, parfois instables — inutile quand on débute.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Vérifier que ça a marché',
        blocks: [
          {
            type: 'paragraph',
            html: 'Après l’installation, ouvre un <b>terminal</b> et vérifie les versions. Si un numéro s’affiche, c’est bon : Node et npm sont prêts.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1100-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Affiche la version de Node (ex : v20.11.0)
node -v

# Affiche la version de npm, livre avec Node (ex : 10.2.4)
npm -v

# Si tu vois deux numeros, tout est bon`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Astuce :</b> si le terminal répond <code>command not found</code>, c’est que l’installation ne s’est pas faite ou que tu dois <b>fermer et rouvrir</b> le terminal.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier de <b>fermer puis rouvrir</b> le terminal après l’installation : les commandes <code>node</code> et <code>npm</code> ne sont reconnues qu’au prochain lancement.',
      'Installer la version <b>Current</b> au lieu de la <b>LTS</b> : tu risques des incompatibilités inutiles avec certains outils.',
      'Croire qu’il faut installer <code>npm</code> séparément : <code>npm</code> est <b>livré automatiquement</b> avec Node.js.',
    ],
    takeaways: [
      '<b>Node.js</b> = moteur qui exécute JavaScript hors du navigateur',
      'télécharge la version <b>LTS</b> sur <code>nodejs.org</code>',
      '<code>npm</code> est installé <b>en même temps</b> que Node',
      'vérifie avec <code>node -v</code> et <code>npm -v</code>',
    ],
  }),
  template({
    id: 'TOOLS-F-1100-TEMPLATE',
    slug: 'c-est-quoi-node-js-et-l-installer',
    title: 'Installer Node.js',
    shortTitle: 'Node.js',
    technology: 'tools',
    tomeId: 't0',
    summary: 'Les commandes pour vérifier ou gérer ta version de Node.js.',
    lede: 'Vérifier et gérer Node. Choisis le cas :',
    aliases: ['node', 'nodejs', 'node -v', 'version node'],
    keywords: ['verifier version', 'lts', 'nvm'],
    relatedContentIds: [],
    lessonId: 'TOOLS-F-1100-LESSON',
    variants: [
      {
        id: 'verifier',
        label: 'Vérifier la version',
        codeBlocks: [
          {
            id: 'TOOLS-F-1100-t-v1',
            filename: 'terminal',
            language: 'bash',
            code: `node -v
npm -v`,
          },
        ],
        replacements: [],
        placement: 'À lancer après l’installation pour confirmer que Node et npm répondent bien.',
      },
      {
        id: 'nvm',
        label: 'Gérer plusieurs versions (nvm)',
        description: 'Quand un projet exige une version précise de Node.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1100-t-v2',
            filename: 'terminal',
            language: 'bash',
            code: `# Installer une version precise de Node
nvm install 20

# Basculer dessus
nvm use 20`,
          },
        ],
        replacements: [
          { token: '20', description: 'le numéro de version majeure de Node à utiliser' },
        ],
        placement: 'Utile plus tard, quand tu jongles entre plusieurs projets qui n’ont pas la même version de Node.',
      },
    ],
  }),

  // ————— C’est quoi npm —————
  lesson({
    id: 'TOOLS-F-1101-LESSON',
    slug: 'c-est-quoi-npm',
    title: 'C’est quoi npm',
    shortTitle: 'npm',
    technology: 'tools',
    tomeId: 't0',
    summary:
      'npm est le gestionnaire de paquets de Node : il télécharge les bibliothèques (React, Vite…) et lance les scripts de ton projet.',
    utility: 'Télécharger des bibliothèques toutes faites et lancer les commandes de ton projet.',
    aliases: ['npm', 'node package manager', 'gestionnaire de paquets', 'paquets', 'dependances'],
    keywords: [
      'installer une bibliotheque',
      'gestionnaire de paquets',
      'npm install',
      'npm run',
      'package json',
      'node modules',
    ],
    relatedContentIds: [],
    templateId: 'TOOLS-F-1101-TEMPLATE',
    intro:
      '<b>npm</b> (Node Package Manager) est l’outil qui <b>télécharge des bibliothèques</b> écrites par d’autres (React, Vite…) et qui <b>lance les scripts</b> de ton projet. Il est installé automatiquement avec Node.',
    sections: [
      {
        id: 's1',
        title: 'À quoi sert npm',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>utiliser React dans mon projet</b> sans réécrire React moi-même. Comment je récupère ce code déjà fait ?',
          },
          {
            type: 'paragraph',
            html: 'Une <b>bibliothèque</b> (ou « paquet ») est du code déjà écrit que tu réutilises. <b>npm</b> va chercher ce code sur un immense entrepôt en ligne et le range dans ton projet. Plus besoin de tout coder soi-même.',
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> npm = un <b>supermarché de code</b>. Tu demandes un produit (React), npm va le chercher au rayon et le met dans ton panier (ton projet).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les deux fichiers clés',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>package.json</code> est la <b>liste de courses</b> de ton projet : il note les bibliothèques dont tu as besoin. Le dossier <code>node_modules</code> contient le <b>code réel</b> téléchargé — souvent énorme, jamais modifié à la main.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1101-l-c1',
              filename: 'package.json',
              language: 'json',
              code: `{
  "name": "mon-projet",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "dev": "vite"
  }
}`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Rôle'],
            rows: [
              ['<code>package.json</code>', 'la liste des bibliothèques et des scripts'],
              ['<code>node_modules</code>', 'le code réel téléchargé (lourd)'],
              ['<code>dependencies</code>', 'les bibliothèques utilisées par ton app'],
              ['<code>scripts</code>', 'les commandes raccourcies (<code>npm run dev</code>…)'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Les commandes de base',
        blocks: [
          {
            type: 'paragraph',
            html: 'Deux commandes reviennent tout le temps : <code>npm install</code> pour ajouter du code, <code>npm run</code> pour lancer un script défini dans <code>package.json</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1101-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Ajouter une bibliotheque au projet
npm install axios

# Lancer un script defini dans package.json
npm run dev

# Installer tout ce que package.json demande
npm install`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Bon à savoir :</b> <code>npm install</code> peut s’écrire <code>npm i</code> en raccourci. Les deux font exactement la même chose.',
          },
        ],
      },
    ],
    pitfalls: [
      'Modifier des fichiers à la main dans <code>node_modules</code> : ce dossier est <b>généré</b>, tes changements seront écrasés au prochain install.',
      'Confondre <code>npm install</code> (ajoute/installe des paquets) et <code>npm run</code> (lance un script) : ce sont deux usages différents.',
      'Envoyer <code>node_modules</code> sur Git : il est <b>énorme</b> et se régénère. On l’ignore toujours (<code>.gitignore</code>).',
    ],
    takeaways: [
      '<b>npm</b> = gestionnaire de paquets, livré avec Node',
      '<code>package.json</code> = la liste · <code>node_modules</code> = le code réel',
      '<code>npm install</code> ajoute du code · <code>npm run</code> lance un script',
      '<code>npm i</code> = raccourci de <code>npm install</code>',
    ],
  }),
  template({
    id: 'TOOLS-F-1101-TEMPLATE',
    slug: 'c-est-quoi-npm',
    title: 'Commandes npm',
    shortTitle: 'npm',
    technology: 'tools',
    tomeId: 't0',
    summary: 'Les commandes npm essentielles : installer, lancer, ajouter en dev.',
    lede: 'Utiliser npm au quotidien. Choisis l’action :',
    aliases: ['npm', 'npm install', 'npm run', 'npm i'],
    keywords: ['installer paquet', 'lancer script', 'dev dependency'],
    relatedContentIds: [],
    lessonId: 'TOOLS-F-1101-LESSON',
    variants: [
      {
        id: 'installer-tout',
        label: 'Tout installer',
        codeBlocks: [
          {
            id: 'TOOLS-F-1101-t-v1',
            filename: 'terminal',
            language: 'bash',
            code: `npm install`,
          },
        ],
        replacements: [],
        placement: 'Juste après avoir récupéré un projet : télécharge tout ce que package.json réclame.',
      },
      {
        id: 'ajouter',
        label: 'Ajouter une bibliothèque',
        codeBlocks: [
          {
            id: 'TOOLS-F-1101-t-v2',
            filename: 'terminal',
            language: 'bash',
            code: `npm install axios`,
          },
        ],
        replacements: [
          { token: 'axios', description: 'le nom de la bibliothèque à ajouter' },
        ],
        placement: 'Quand tu veux utiliser une nouvelle bibliothèque dans ton code.',
      },
      {
        id: 'dev',
        label: 'Outil de développement',
        description: 'Pour un paquet utile seulement pendant le développement.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1101-t-v3',
            filename: 'terminal',
            language: 'bash',
            code: `npm install --save-dev eslint`,
          },
        ],
        replacements: [
          { token: 'eslint', description: 'l’outil de développement à ajouter' },
        ],
        placement: 'Pour les outils qui ne servent pas à l’app finale (linter, tests…). Le --save-dev les range à part.',
      },
    ],
  }),

  // ————— Les commandes du terminal : cd, ls, mkdir, pwd —————
  lesson({
    id: 'TOOLS-F-1102-LESSON',
    slug: 'les-commandes-du-terminal-cd-ls-mkdir-pwd',
    title: 'Les commandes du terminal : cd, ls, mkdir, pwd',
    shortTitle: 'Terminal',
    technology: 'tools',
    tomeId: 't0',
    summary:
      'Se déplacer dans les dossiers et les manipuler depuis le terminal avec quatre commandes de base : cd, ls, mkdir, pwd.',
    utility: 'Naviguer entre les dossiers et les créer sans passer par la souris.',
    aliases: ['terminal', 'ligne de commande', 'cd', 'ls', 'mkdir', 'pwd', 'console', 'shell'],
    keywords: [
      'changer de dossier',
      'lister les fichiers',
      'creer un dossier',
      'ou je suis',
      'naviguer terminal',
      'ligne de commande',
    ],
    relatedContentIds: [],
    templateId: 'TOOLS-F-1102-TEMPLATE',
    intro:
      'Le <b>terminal</b> permet de piloter ton ordinateur avec du <b>texte</b> plutôt qu’avec la souris. Quatre commandes suffisent pour commencer : <code>pwd</code>, <code>ls</code>, <code>cd</code> et <code>mkdir</code>.',
    sections: [
      {
        id: 's1',
        title: 'Se repérer et regarder',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>savoir dans quel dossier je me trouve</b> dans le terminal, et <b>voir ce qu’il contient</b>, sans ouvrir l’explorateur de fichiers.',
          },
          {
            type: 'paragraph',
            html: '<code>pwd</code> affiche le <b>chemin du dossier courant</b> (« où suis-je ? »). <code>ls</code> <b>liste</b> les fichiers et dossiers présents à cet endroit.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1102-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Affiche le chemin ou je me trouve
pwd
# -> /Users/alice/projets

# Liste ce que contient le dossier courant
ls
# -> mon-projet   photos   notes.txt`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>pwd</code> = le point « Vous êtes ici » sur un plan. <code>ls</code> = regarder autour de toi pour voir les portes disponibles.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Se déplacer avec cd',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>cd</code> (change directory) te fait <b>entrer</b> dans un dossier. <code>cd ..</code> <b>remonte</b> d’un cran vers le dossier parent.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1102-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Entrer dans le dossier mon-projet
cd mon-projet

# Remonter d'un niveau (dossier parent)
cd ..

# Revenir directement dans ton dossier personnel
cd ~`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce :</b> tape les premières lettres d’un nom puis appuie sur <b>Tab</b> : le terminal <b>complète tout seul</b>. Un gain de temps énorme.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Créer un dossier avec mkdir',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>mkdir</code> (make directory) <b>crée</b> un nouveau dossier à l’endroit où tu te trouves.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1102-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Creer un dossier nomme mes-projets
mkdir mes-projets

# Y entrer aussitot
cd mes-projets`,
            },
          },
          {
            type: 'table',
            headers: ['Commande', 'Signifie', 'Rôle'],
            rows: [
              ['<code>pwd</code>', 'print working directory', 'où suis-je ?'],
              ['<code>ls</code>', 'list', 'liste le contenu'],
              ['<code>cd</code>', 'change directory', 'change de dossier'],
              ['<code>mkdir</code>', 'make directory', 'crée un dossier'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Taper <code>cd</code> vers un dossier <b>mal orthographié</b> : le terminal répond « No such file or directory ». Vérifie avec <code>ls</code>.',
      'Oublier l’espace dans <code>cd ..</code> : <code>cd..</code> collé ne fonctionne pas.',
      'Mettre des <b>espaces</b> dans un nom de dossier avec <code>mkdir</code> : préfère un tiret (<code>mon-projet</code>) pour éviter les galères.',
    ],
    takeaways: [
      '<code>pwd</code> = où suis-je · <code>ls</code> = liste le contenu',
      '<code>cd dossier</code> = entrer · <code>cd ..</code> = remonter',
      '<code>mkdir nom</code> = créer un dossier',
      'la touche <b>Tab</b> complète les noms automatiquement',
    ],
  }),
  template({
    id: 'TOOLS-F-1102-TEMPLATE',
    slug: 'les-commandes-du-terminal-cd-ls-mkdir-pwd',
    title: 'Commandes du terminal',
    shortTitle: 'Terminal',
    technology: 'tools',
    tomeId: 't0',
    summary: 'Les commandes de navigation dans le terminal, prêtes à copier.',
    lede: 'Naviguer dans le terminal. Choisis l’action :',
    aliases: ['cd', 'ls', 'mkdir', 'pwd', 'terminal'],
    keywords: ['naviguer', 'creer dossier', 'lister'],
    relatedContentIds: [],
    lessonId: 'TOOLS-F-1102-LESSON',
    variants: [
      {
        id: 'naviguer',
        label: 'Naviguer',
        codeBlocks: [
          {
            id: 'TOOLS-F-1102-t-v1',
            filename: 'terminal',
            language: 'bash',
            code: `# Ou suis-je ?
pwd

# Voir le contenu
ls

# Entrer dans un dossier
cd mon-dossier

# Remonter d'un cran
cd ..`,
          },
        ],
        replacements: [
          { token: 'mon-dossier', description: 'le nom du dossier dans lequel entrer' },
        ],
        placement: 'Le quatuor de base pour se déplacer et voir où l’on est.',
      },
      {
        id: 'creer',
        label: 'Créer un dossier',
        codeBlocks: [
          {
            id: 'TOOLS-F-1102-t-v2',
            filename: 'terminal',
            language: 'bash',
            code: `mkdir mon-dossier
cd mon-dossier`,
          },
        ],
        replacements: [
          { token: 'mon-dossier', description: 'le nom du dossier à créer (sans espaces)' },
        ],
        placement: 'Crée un dossier puis entre dedans dans la foulée.',
      },
    ],
  }),

  // ————— Créer un projet React avec Vite —————
  lesson({
    id: 'TOOLS-F-1103-LESSON',
    slug: 'creer-un-projet-react-avec-vite',
    title: 'Créer un projet React avec Vite',
    shortTitle: 'Projet Vite',
    technology: 'tools',
    tomeId: 't0',
    summary:
      'Générer un projet React tout prêt en une commande grâce à Vite, l’outil moderne de démarrage rapide.',
    utility: 'Créer la base complète d’un projet React sans rien configurer à la main.',
    aliases: ['vite', 'create vite', 'creer projet react', 'demarrer react', 'npm create vite', 'scaffold'],
    keywords: [
      'creer un projet react',
      'demarrer un projet',
      'vite react',
      'npm create vite',
      'template react',
      'nouveau projet',
    ],
    relatedContentIds: [],
    templateId: 'TOOLS-F-1103-TEMPLATE',
    intro:
      '<b>Vite</b> est un outil qui <b>génère un projet React complet</b> en une seule commande, avec tous les fichiers déjà en place. C’est la façon moderne et rapide de démarrer.',
    sections: [
      {
        id: 's1',
        title: 'Générer le projet',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>démarrer une nouvelle application React</b> proprement, sans passer des heures à configurer le build et les fichiers de départ.',
          },
          {
            type: 'paragraph',
            html: 'La commande <code>npm create vite@latest</code> lance un petit assistant qui te pose quelques questions : le <b>nom du projet</b>, le <b>framework</b> (choisis React) et la <b>variante</b> (JavaScript ou TypeScript).',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1103-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Lance l'assistant de creation Vite
npm create vite@latest

# L'assistant demande :
# - Project name  -> mon-app
# - Framework     -> React
# - Variant       -> JavaScript ou TypeScript`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> Vite = un <b>kit de meuble déjà découpé</b>. Tu n’assembles pas les planches toi-même : tout arrive prêt à monter.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les 3 étapes après la création',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une fois le projet généré, Vite affiche <b>trois commandes à taper</b> : entrer dans le dossier, installer les dépendances, lancer le serveur.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1103-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# 1. Entrer dans le dossier du projet
cd mon-app

# 2. Installer les bibliotheques (React, Vite...)
npm install

# 3. Lancer le serveur de developpement
npm run dev`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> ces 3 étapes sont <b>toujours les mêmes</b> après <code>create vite</code>. Vite te les rappelle d’ailleurs à l’écran.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Tout en une seule commande',
        blocks: [
          {
            type: 'paragraph',
            html: 'On peut aussi <b>pré-remplir</b> le nom et le template pour sauter les questions de l’assistant. Pratique quand tu sais déjà ce que tu veux.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1103-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Cree directement un projet React nomme mon-app
npm create vite@latest mon-app -- --template react

# Puis les memes 3 etapes
cd mon-app
npm install
npm run dev`,
            },
          },
          {
            type: 'table',
            headers: ['Template Vite', 'Ce que tu obtiens'],
            rows: [
              ['<code>react</code>', 'React en JavaScript'],
              ['<code>react-ts</code>', 'React en TypeScript'],
              ['<code>vanilla</code>', 'JavaScript seul, sans framework'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Lancer <code>npm run dev</code> <b>avant</b> <code>npm install</code> : rien ne démarre, car les bibliothèques ne sont pas encore téléchargées.',
      'Oublier le <code>cd mon-app</code> : tu restes dans le dossier parent et les commandes s’exécutent au mauvais endroit.',
      'Choisir le mauvais <b>framework</b> dans l’assistant : vérifie bien de sélectionner <b>React</b>, pas Vue ou Svelte.',
    ],
    takeaways: [
      '<code>npm create vite@latest</code> génère un projet React complet',
      'ensuite toujours : <code>cd</code> → <code>npm install</code> → <code>npm run dev</code>',
      'template <code>react</code> = JavaScript · <code>react-ts</code> = TypeScript',
      'Vite affiche les étapes suivantes à l’écran après la création',
    ],
  }),
  template({
    id: 'TOOLS-F-1103-TEMPLATE',
    slug: 'creer-un-projet-react-avec-vite',
    title: 'Créer un projet Vite',
    shortTitle: 'Projet Vite',
    technology: 'tools',
    tomeId: 't0',
    summary: 'Les commandes pour générer un projet React avec Vite.',
    lede: 'Démarrer un projet React. Choisis la méthode :',
    aliases: ['vite', 'npm create vite', 'creer projet react'],
    keywords: ['nouveau projet', 'react-ts', 'template'],
    relatedContentIds: [],
    lessonId: 'TOOLS-F-1103-LESSON',
    variants: [
      {
        id: 'assistant',
        label: 'Assistant (guidé)',
        codeBlocks: [
          {
            id: 'TOOLS-F-1103-t-v1',
            filename: 'terminal',
            language: 'bash',
            code: `npm create vite@latest`,
          },
        ],
        replacements: [],
        placement: 'La méthode la plus simple : réponds aux questions posées à l’écran.',
      },
      {
        id: 'direct-js',
        label: 'Direct (JavaScript)',
        codeBlocks: [
          {
            id: 'TOOLS-F-1103-t-v2',
            filename: 'terminal',
            language: 'bash',
            code: `npm create vite@latest mon-app -- --template react
cd mon-app
npm install
npm run dev`,
          },
        ],
        replacements: [
          { token: 'mon-app', description: 'le nom de ton projet (dossier créé)' },
        ],
        placement: 'Quand tu veux tout enchaîner sans passer par les questions de l’assistant.',
      },
      {
        id: 'direct-ts',
        label: 'Direct (TypeScript)',
        codeBlocks: [
          {
            id: 'TOOLS-F-1103-t-v3',
            filename: 'terminal',
            language: 'bash',
            code: `npm create vite@latest mon-app -- --template react-ts
cd mon-app
npm install
npm run dev`,
          },
        ],
        replacements: [
          { token: 'mon-app', description: 'le nom de ton projet (dossier créé)' },
        ],
        placement: 'Même chose mais avec TypeScript, pour un typage plus strict dès le départ.',
      },
    ],
  }),

  // ————— npm install : installer les dépendances —————
  lesson({
    id: 'TOOLS-F-1104-LESSON',
    slug: 'npm-install-installer-les-dependances',
    title: 'npm install : installer les dépendances',
    shortTitle: 'npm install',
    technology: 'tools',
    tomeId: 't0',
    summary:
      'Télécharger dans node_modules toutes les bibliothèques dont un projet a besoin, listées dans package.json.',
    utility: 'Récupérer toutes les bibliothèques d’un projet pour qu’il puisse tourner.',
    aliases: ['npm install', 'npm i', 'installer dependances', 'node_modules', 'dependances', 'install'],
    keywords: [
      'installer les dependances',
      'telecharger les bibliotheques',
      'node modules',
      'apres un git clone',
      'package json',
      'npm i',
    ],
    relatedContentIds: [],
    templateId: 'TOOLS-F-1104-TEMPLATE',
    intro:
      '<code>npm install</code> lit le fichier <code>package.json</code> et <b>télécharge toutes les bibliothèques</b> qui y sont listées dans le dossier <code>node_modules</code>. C’est le premier réflexe sur un projet récupéré.',
    sections: [
      {
        id: 's1',
        title: 'Installer tout un projet',
        blocks: [
          {
            type: 'situation',
            html: 'Je viens de <b>télécharger un projet React d’une collègue</b>, mais quand je le lance, plein d’erreurs disent « module introuvable ». Que faire ?',
          },
          {
            type: 'paragraph',
            html: 'Le dossier <code>node_modules</code> n’est <b>jamais partagé</b> (trop lourd) : il faut le <b>régénérer</b>. <code>npm install</code>, sans argument, télécharge tout ce que <code>package.json</code> réclame.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1104-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Dans le dossier du projet, installe TOUT
npm install

# Raccourci equivalent
npm i

# Un dossier node_modules apparait : c'est normal`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>package.json</code> = une <b>recette de cuisine</b>, <code>npm install</code> = aller acheter <b>tous les ingrédients</b> de la liste d’un coup.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Ajouter une bibliothèque précise',
        blocks: [
          {
            type: 'paragraph',
            html: 'Avec un <b>nom</b>, <code>npm install</code> ajoute <b>une</b> bibliothèque et l’inscrit automatiquement dans <code>package.json</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1104-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Ajouter axios au projet
npm install axios

# En ajouter plusieurs d'un coup
npm install axios react-router-dom

# Un outil utile seulement en dev (tests, linter...)
npm install --save-dev vitest`,
            },
          },
          {
            type: 'table',
            headers: ['Commande', 'Effet'],
            rows: [
              ['<code>npm install</code>', 'installe tout le <code>package.json</code>'],
              ['<code>npm install nom</code>', 'ajoute une bibliothèque'],
              ['<code>npm install --save-dev nom</code>', 'ajoute un outil de dev'],
              ['<code>npm uninstall nom</code>', 'retire une bibliothèque'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'node_modules et Git',
        blocks: [
          {
            type: 'paragraph',
            html: 'Comme <code>node_modules</code> se <b>régénère</b> avec <code>npm install</code>, on ne le met <b>jamais</b> sur Git. On l’ajoute au fichier <code>.gitignore</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1104-l-c3',
              filename: '.gitignore',
              language: 'text',
              code: `# Ne jamais versionner node_modules
node_modules

# Ni le dossier de build
dist`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Réflexe :</b> après un <b>git clone</b> ou un téléchargement de projet, la première commande à taper est presque toujours <code>npm install</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Lancer <code>npm install</code> <b>hors</b> du dossier du projet : sans <code>package.json</code> à côté, il ne sait pas quoi installer.',
      'Vouloir <b>copier</b> <code>node_modules</code> d’un projet à l’autre : inutile et fragile. Relance <code>npm install</code>.',
      'Committer <code>node_modules</code> sur Git : le dépôt devient énorme. Ajoute-le à <code>.gitignore</code>.',
    ],
    takeaways: [
      '<code>npm install</code> seul = installe tout le <code>package.json</code>',
      '<code>npm install nom</code> = ajoute une bibliothèque précise',
      '<code>--save-dev</code> pour les outils de développement',
      'jamais <code>node_modules</code> sur Git → <code>.gitignore</code>',
    ],
  }),
  template({
    id: 'TOOLS-F-1104-TEMPLATE',
    slug: 'npm-install-installer-les-dependances',
    title: 'npm install',
    shortTitle: 'npm install',
    technology: 'tools',
    tomeId: 't0',
    summary: 'Les variantes de npm install : tout installer, ajouter, retirer.',
    lede: 'Gérer les dépendances. Choisis l’action :',
    aliases: ['npm install', 'npm i', 'npm uninstall'],
    keywords: ['dependances', 'ajouter paquet', 'retirer paquet'],
    relatedContentIds: [],
    lessonId: 'TOOLS-F-1104-LESSON',
    variants: [
      {
        id: 'tout',
        label: 'Tout installer',
        codeBlocks: [
          {
            id: 'TOOLS-F-1104-t-v1',
            filename: 'terminal',
            language: 'bash',
            code: `npm install`,
          },
        ],
        replacements: [],
        placement: 'Après un clone ou un téléchargement : régénère node_modules à partir de package.json.',
      },
      {
        id: 'ajouter',
        label: 'Ajouter',
        codeBlocks: [
          {
            id: 'TOOLS-F-1104-t-v2',
            filename: 'terminal',
            language: 'bash',
            code: `npm install nom-du-paquet`,
          },
        ],
        replacements: [
          { token: 'nom-du-paquet', description: 'la bibliothèque à installer (ex : axios)' },
        ],
        placement: 'Pour ajouter une nouvelle bibliothèque et l’inscrire dans package.json.',
      },
      {
        id: 'dev',
        label: 'Ajouter (dev)',
        codeBlocks: [
          {
            id: 'TOOLS-F-1104-t-v3',
            filename: 'terminal',
            language: 'bash',
            code: `npm install --save-dev nom-du-paquet`,
          },
        ],
        replacements: [
          { token: 'nom-du-paquet', description: 'l’outil de développement (linter, tests…)' },
        ],
        placement: 'Pour les outils qui ne servent pas dans l’app finale.',
      },
      {
        id: 'retirer',
        label: 'Retirer',
        codeBlocks: [
          {
            id: 'TOOLS-F-1104-t-v4',
            filename: 'terminal',
            language: 'bash',
            code: `npm uninstall nom-du-paquet`,
          },
        ],
        replacements: [
          { token: 'nom-du-paquet', description: 'la bibliothèque à supprimer du projet' },
        ],
        placement: 'Pour retirer une bibliothèque dont tu n’as plus besoin.',
      },
    ],
  }),

  // ————— npm run dev : lancer le projet —————
  lesson({
    id: 'TOOLS-F-1105-LESSON',
    slug: 'npm-run-dev-lancer-le-projet',
    title: 'npm run dev : lancer le projet',
    shortTitle: 'npm run dev',
    technology: 'tools',
    tomeId: 't0',
    summary:
      'Démarrer le serveur de développement pour voir ton app dans le navigateur, avec rechargement automatique à chaque modification.',
    utility: 'Lancer ton projet en local et le voir se mettre à jour au fil de tes changements.',
    aliases: ['npm run dev', 'npm run', 'lancer le projet', 'serveur de dev', 'localhost', 'demarrer'],
    keywords: [
      'lancer le projet',
      'serveur de developpement',
      'localhost',
      'rechargement automatique',
      'npm run',
      'scripts',
    ],
    relatedContentIds: [],
    templateId: 'TOOLS-F-1105-TEMPLATE',
    intro:
      '<code>npm run dev</code> démarre un <b>serveur de développement</b> local. Ton app s’ouvre sur une adresse <code>localhost</code> et se <b>recharge toute seule</b> à chaque fois que tu sauvegardes un fichier.',
    sections: [
      {
        id: 's1',
        title: 'Lancer et voir son app',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>voir mon app React dans le navigateur</b> pendant que je code, et qu’elle se mette à jour dès que j’enregistre un fichier.',
          },
          {
            type: 'paragraph',
            html: 'Dans le dossier du projet, tape <code>npm run dev</code>. Le terminal affiche une <b>adresse locale</b> (souvent <code>http://localhost:5173</code>) : ouvre-la dans ton navigateur.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1105-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Demarre le serveur de developpement
npm run dev

# Le terminal affiche :
#   Local:  http://localhost:5173/
# -> ouvre cette adresse dans ton navigateur`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>npm run dev</code> = <b>allumer la vitrine</b> de ton magasin. Tant qu’elle est allumée, tu vois en direct chaque changement que tu fais à l’intérieur.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Arrêter le serveur',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le serveur <b>reste allumé</b> et occupe le terminal. Pour l’<b>arrêter</b>, place-toi dans ce terminal et fais <b>Ctrl + C</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1105-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Le serveur tourne : le terminal est "occupe"

# Pour l'arreter : appuie sur
# Ctrl + C

# Le terminal redevient libre pour d'autres commandes`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À savoir :</b> tant que le serveur tourne, ce terminal est bloqué. Ouvre un <b>second terminal</b> si tu dois taper d’autres commandes en parallèle.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Les autres scripts',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>dev</code> n’est qu’un des scripts définis dans <code>package.json</code>. On les lance tous avec <code>npm run</code> + leur nom. <code>build</code> et <code>preview</code> reviennent souvent.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1105-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Serveur de developpement (pendant que tu codes)
npm run dev

# Construire la version optimisee pour la production
npm run build

# Previsualiser la version de production en local
npm run preview`,
            },
          },
          {
            type: 'table',
            headers: ['Script', 'Sert à…'],
            rows: [
              ['<code>npm run dev</code>', 'coder en local, rechargement auto'],
              ['<code>npm run build</code>', 'générer la version finale (dossier <code>dist</code>)'],
              ['<code>npm run preview</code>', 'tester la version finale en local'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Taper <code>npm run dev</code> <b>hors</b> du dossier du projet, ou <b>avant</b> <code>npm install</code> : le serveur ne démarre pas.',
      'Fermer la fenêtre sans faire <b>Ctrl + C</b> : le port peut rester occupé et bloquer le prochain lancement.',
      'Croire que le site est en ligne : <code>localhost</code> n’est visible que sur <b>ta machine</b>, pas par les autres.',
    ],
    takeaways: [
      '<code>npm run dev</code> lance le serveur local (<code>localhost</code>)',
      'l’app se <b>recharge seule</b> à chaque sauvegarde',
      'pour arrêter : <b>Ctrl + C</b> dans le terminal',
      'autres scripts : <code>npm run build</code>, <code>npm run preview</code>',
    ],
  }),
  template({
    id: 'TOOLS-F-1105-TEMPLATE',
    slug: 'npm-run-dev-lancer-le-projet',
    title: 'npm run dev',
    shortTitle: 'npm run dev',
    technology: 'tools',
    tomeId: 't0',
    summary: 'Les scripts npm courants : dev, build, preview.',
    lede: 'Lancer un script du projet. Choisis lequel :',
    aliases: ['npm run dev', 'npm run build', 'npm run preview'],
    keywords: ['serveur dev', 'build', 'localhost'],
    relatedContentIds: [],
    lessonId: 'TOOLS-F-1105-LESSON',
    variants: [
      {
        id: 'dev',
        label: 'Développement',
        codeBlocks: [
          {
            id: 'TOOLS-F-1105-t-v1',
            filename: 'terminal',
            language: 'bash',
            code: `npm run dev`,
          },
        ],
        replacements: [],
        placement: 'Pendant que tu codes : ouvre localhost et recharge à chaque sauvegarde. Ctrl + C pour arrêter.',
      },
      {
        id: 'build',
        label: 'Build (production)',
        codeBlocks: [
          {
            id: 'TOOLS-F-1105-t-v2',
            filename: 'terminal',
            language: 'bash',
            code: `npm run build`,
          },
        ],
        replacements: [],
        placement: 'Quand ton app est prête : génère la version optimisée dans le dossier dist.',
      },
      {
        id: 'preview',
        label: 'Preview',
        codeBlocks: [
          {
            id: 'TOOLS-F-1105-t-v3',
            filename: 'terminal',
            language: 'bash',
            code: `npm run preview`,
          },
        ],
        replacements: [],
        placement: 'Après un build : teste en local la version de production avant de la mettre en ligne.',
      },
    ],
  }),

  // ————— La structure d’un projet : les dossiers —————
  lesson({
    id: 'TOOLS-F-1106-LESSON',
    slug: 'la-structure-d-un-projet-les-dossiers',
    title: 'La structure d’un projet : les dossiers',
    shortTitle: 'Structure projet',
    technology: 'tools',
    tomeId: 't0',
    summary:
      'Se repérer dans un projet React généré par Vite : à quoi servent src, public, node_modules et les fichiers de configuration.',
    utility: 'Savoir où se trouve chaque fichier et où écrire ton propre code.',
    aliases: ['structure projet', 'arborescence', 'dossiers', 'src', 'public', 'organisation fichiers'],
    keywords: [
      'ou ecrire mon code',
      'a quoi sert src',
      'dossier public',
      'structure react',
      'arborescence projet',
      'fichiers de config',
    ],
    relatedContentIds: [],
    templateId: 'TOOLS-F-1106-TEMPLATE',
    intro:
      'Un projet React généré par Vite a toujours la <b>même structure</b>. En comprenant le rôle de chaque dossier, tu sais <b>où écrire ton code</b> et quels fichiers ne pas toucher.',
    sections: [
      {
        id: 's1',
        title: 'Les dossiers principaux',
        blocks: [
          {
            type: 'situation',
            html: 'Je viens d’ouvrir un projet React et je vois plein de dossiers. Je veux <b>savoir où écrire mon propre code</b> sans casser quoi que ce soit.',
          },
          {
            type: 'paragraph',
            html: 'La règle d’or : <b>ton code va dans</b> <code>src</code>. Le reste est de la configuration ou du contenu généré. Voici l’arborescence typique :',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1106-l-c1',
              filename: 'arborescence',
              language: 'text',
              code: `mon-app/
├── node_modules/     <- bibliotheques (ne pas toucher)
├── public/           <- fichiers statiques (images, favicon)
├── src/              <- TON code vit ici
│   ├── App.jsx       <- ton composant principal
│   ├── main.jsx      <- point d'entree de l'app
│   └── index.css     <- styles globaux
├── index.html        <- la page HTML de base
├── package.json      <- liste des dependances et scripts
└── vite.config.js    <- configuration de Vite`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le projet = une <b>maison</b>. <code>src</code> est le salon où tu vis (ton code), <code>node_modules</code> la chaufferie qu’on ne visite pas, les fichiers de config sont les compteurs.',
          },
        ],
      },
      {
        id: 's2',
        title: 'src vs public',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>src</code> contient le code <b>traité</b> par Vite (composants, styles importés). <code>public</code> contient des fichiers <b>servis tels quels</b>, sans transformation (favicon, images fixes).',
          },
          {
            type: 'table',
            headers: ['Dossier / fichier', 'Rôle', 'On y touche ?'],
            rows: [
              ['<code>src/</code>', 'ton code (composants, styles)', 'oui, tout le temps'],
              ['<code>public/</code>', 'fichiers statiques bruts', 'parfois'],
              ['<code>node_modules/</code>', 'bibliothèques téléchargées', 'jamais'],
              ['<code>index.html</code>', 'page HTML de départ', 'rarement'],
              ['<code>package.json</code>', 'dépendances et scripts', 'parfois'],
              ['<code>vite.config.js</code>', 'config de Vite', 'rarement'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Où mettre tes composants',
        blocks: [
          {
            type: 'paragraph',
            html: 'Au fur et à mesure que ton app grandit, on <b>range les composants</b> dans un sous-dossier de <code>src</code>, souvent nommé <code>components</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1106-l-c2',
              filename: 'arborescence',
              language: 'text',
              code: `src/
├── components/       <- tes composants reutilisables
│   ├── Bouton.jsx
│   └── Carte.jsx
├── App.jsx           <- assemble les composants
├── main.jsx          <- demarre l'app
└── index.css         <- styles globaux`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> un composant par fichier, avec une <b>majuscule</b> au nom du fichier (<code>Bouton.jsx</code>). Regroupe-les dans <code>src/components</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Écrire ton code <b>hors de</b> <code>src</code> (par ex. dans <code>public</code>) : Vite ne le traite pas comme prévu.',
      'Fouiller ou modifier <code>node_modules</code> : c’est généré automatiquement, tes changements seront perdus.',
      'Supprimer <code>main.jsx</code> ou <code>index.html</code> : ce sont les <b>points de départ</b>, l’app ne démarre plus sans eux.',
    ],
    takeaways: [
      'ton code vit dans <code>src</code> · le reste est config ou généré',
      '<code>public</code> = fichiers servis tels quels (favicon, images)',
      '<code>node_modules</code> = jamais toucher · <code>package.json</code> = dépendances',
      'range tes composants dans <code>src/components</code>, un par fichier',
    ],
  }),
  template({
    id: 'TOOLS-F-1106-TEMPLATE',
    slug: 'la-structure-d-un-projet-les-dossiers',
    title: 'Structure d’un projet',
    shortTitle: 'Structure projet',
    technology: 'tools',
    tomeId: 't0',
    summary: 'L’arborescence type d’un projet React Vite, à copier comme repère.',
    lede: 'Se repérer dans un projet. Choisis la vue :',
    aliases: ['structure', 'arborescence', 'src', 'dossiers'],
    keywords: ['organisation', 'components', 'public'],
    relatedContentIds: [],
    lessonId: 'TOOLS-F-1106-LESSON',
    variants: [
      {
        id: 'base',
        label: 'Projet de base',
        codeBlocks: [
          {
            id: 'TOOLS-F-1106-t-v1',
            filename: 'arborescence',
            language: 'text',
            code: `mon-app/
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
└── package.json`,
          },
        ],
        replacements: [
          { token: 'mon-app', description: 'le nom de ton projet' },
        ],
        placement: 'La structure juste après create vite : repère où chaque chose se trouve.',
      },
      {
        id: 'organise',
        label: 'src organisé',
        description: 'Quand le projet grandit et qu’il faut ranger.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1106-t-v2',
            filename: 'arborescence',
            language: 'text',
            code: `src/
├── components/
│   ├── Bouton.jsx
│   └── Carte.jsx
├── pages/
│   └── Accueil.jsx
├── App.jsx
├── main.jsx
└── index.css`,
          },
        ],
        replacements: [
          { token: 'Bouton.jsx / Carte.jsx', description: 'tes composants réutilisables' },
          { token: 'Accueil.jsx', description: 'tes pages (si l’app en a plusieurs)' },
        ],
        placement: 'Une organisation courante dès que tu as plusieurs composants et pages.',
      },
    ],
  }),
];
