import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const tools2Content: ReadyContent[] = [
  // ————— Le fichier package.json expliqué —————
  lesson({
    id: 'TOOLS-F-1107-LESSON',
    slug: 'le-fichier-package-json-explique',
    title: 'Le fichier package.json expliqué',
    shortTitle: 'package.json',
    technology: 'tools',
    tomeId: 't0',
    summary:
      'La carte d’identité de ton projet : son nom, ses dépendances et ses scripts. Le fichier que npm lit en premier.',
    utility:
      'Comprendre le fichier qui liste les dépendances et les commandes de ton projet.',
    aliases: ['package.json', 'package json', 'dependencies', 'scripts npm', 'manifest'],
    keywords: [
      'liste des dependances',
      'lancer npm run',
      'version du projet',
      'dependencies devdependencies',
      'scripts start build',
      'a quoi sert package json',
    ],
    relatedContentIds: [],
    templateId: 'TOOLS-F-1107-TEMPLATE',
    intro:
      'Le <b>package.json</b> est la <b>carte d’identité</b> de ton projet Node. Il déclare son <b>nom</b>, sa <b>version</b>, la liste de ses <b>dépendances</b> et les <b>scripts</b> que tu lances avec <code>npm run</code>. C’est le premier fichier que <code>npm</code> lit.',
    sections: [
      {
        id: 's1',
        title: 'À quoi ressemble un package.json',
        blocks: [
          {
            type: 'situation',
            html: 'Je viens de <b>cloner un projet</b> et je veux comprendre ce qu’il contient : quelles librairies il utilise et quelles commandes je peux lancer.',
          },
          {
            type: 'paragraph',
            html: 'Tout est dans le <code>package.json</code> à la racine. C’est un fichier <b>JSON</b> : des clés et des valeurs. Voici les champs les plus courants.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1107-l-c1',
              filename: 'package.json',
              language: 'json',
              code: `{
  "name": "mon-projet",        // le nom du projet
  "version": "1.0.0",          // sa version (format x.y.z)
  "scripts": {                 // les commandes npm run ...
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {            // librairies utiles en production
    "react": "^18.2.0"
  },
  "devDependencies": {         // outils utiles seulement au dev
    "vite": "^5.0.0"
  }
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le <code>package.json</code>, c’est la <b>liste de courses</b> du projet. <code>npm install</code> lit la liste et va tout chercher pour toi.',
          },
        ],
      },
      {
        id: 's2',
        title: 'dependencies vs devDependencies',
        blocks: [
          {
            type: 'paragraph',
            html: 'Deux listes de librairies. <code>dependencies</code> = ce dont l’<b>app a besoin pour tourner</b> (React, une lib de dates…). <code>devDependencies</code> = les <b>outils du développeur</b> seulement (Vite, ESLint, les types TypeScript).',
          },
          {
            type: 'table',
            headers: ['Champ', 'Contient', 'Installé en production ?'],
            rows: [
              ['<code>dependencies</code>', 'librairies utilisées par l’app', 'oui'],
              ['<code>devDependencies</code>', 'outils de dev (build, lint…)', 'non'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> <code>npm install nom</code> range la lib dans <code>dependencies</code>. Ajoute <code>--save-dev</code> (ou <code>-D</code>) pour la ranger dans <code>devDependencies</code>.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Les scripts : tes raccourcis de commandes',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>lancer mon serveur de développement</b> sans retenir une longue commande à rallonge.',
          },
          {
            type: 'paragraph',
            html: 'La section <code>scripts</code> donne un <b>nom court</b> à une commande. Tu la lances avec <code>npm run nom</code>. Deux noms sont spéciaux : <code>start</code> et <code>test</code> marchent aussi sans le mot <code>run</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1107-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Lance le script "dev" defini dans package.json
npm run dev

# Lance le script "build"
npm run build

# "start" et "test" acceptent la forme courte
npm start
npm test`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un script, c’est un <b>bouton programmé</b> sur ta télécommande. Tu appuies sur <code>npm run dev</code>, et toute la longue commande derrière s’exécute.',
          },
        ],
      },
      {
        id: 's4',
        title: 'Les versions : ce que veut dire le ^',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une version s’écrit <code>major.minor.patch</code> (ex. <code>18.2.0</code>). Le symbole devant autorise plus ou moins de mises à jour automatiques quand tu réinstalles.',
          },
          {
            type: 'table',
            headers: ['Écriture', 'Autorise', 'Exemple'],
            rows: [
              ['<code>18.2.0</code>', 'exactement cette version', 'figée'],
              ['<code>^18.2.0</code>', 'les mises à jour mineures et patch', '18.x.x'],
              ['<code>~18.2.0</code>', 'les patch uniquement', '18.2.x'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Bon à savoir :</b> le <code>package-lock.json</code> note la version <b>exacte</b> réellement installée. Ne le modifie jamais à la main, mais garde-le dans Git.',
          },
        ],
      },
    ],
    pitfalls: [
      'Modifier <code>package.json</code> à la main pour ajouter une lib, sans faire <code>npm install</code> : la lib n’est pas téléchargée dans <code>node_modules</code>.',
      'Confondre <code>npm run build</code> et <code>npm build</code> : sauf pour <code>start</code>/<code>test</code>, le mot <code>run</code> est obligatoire.',
      'Ajouter <code>node_modules</code> à Git : ce dossier se régénère avec <code>npm install</code>. Mets-le dans <code>.gitignore</code>.',
      'Le JSON n’accepte <b>ni virgule finale ni commentaire</b> : un vrai <code>package.json</code> ne contient pas les <code>//</code> montrés ici (présents seulement pour l’explication).',
    ],
    takeaways: [
      '<code>package.json</code> = carte d’identité du projet (nom, version, dépendances, scripts)',
      '<code>dependencies</code> = utile en prod · <code>devDependencies</code> = outils de dev',
      'lancer un script : <code>npm run nom</code> (sauf <code>start</code> et <code>test</code>)',
      '<code>^18.2.0</code> = mises à jour mineures ok · <code>package-lock.json</code> fige la version exacte',
    ],
  }),
  template({
    id: 'TOOLS-F-1107-TEMPLATE',
    slug: 'le-fichier-package-json-explique',
    title: 'package.json',
    shortTitle: 'package.json',
    technology: 'tools',
    tomeId: 't0',
    summary: 'Un package.json prêt à copier : minimal, avec scripts, ou complet avec dépendances.',
    lede: 'Le squelette d’un package.json. Choisis ton point de départ :',
    aliases: ['package.json', 'scripts npm', 'dependencies'],
    keywords: ['squelette', 'scripts', 'dependances'],
    relatedContentIds: [],
    lessonId: 'TOOLS-F-1107-LESSON',
    variants: [
      {
        id: 'minimal',
        label: 'Minimal',
        description: 'Le strict nécessaire pour un projet Node vide.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1107-t-v1',
            filename: 'package.json',
            language: 'json',
            code: `{
  "name": "mon-projet",
  "version": "1.0.0",
  "type": "module"
}`,
          },
        ],
        replacements: [
          { token: 'mon-projet', description: 'le nom de ton projet (minuscules, tirets)' },
          { token: '1.0.0', description: 'la version de départ' },
        ],
        placement: 'Généré automatiquement par npm init -y. Le point de départ le plus simple.',
      },
      {
        id: 'avec-scripts',
        label: 'Avec scripts',
        description: 'Les commandes courantes d’un projet front.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1107-t-v2',
            filename: 'package.json',
            language: 'json',
            code: `{
  "name": "mon-projet",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`,
          },
        ],
        replacements: [
          { token: 'dev / build / preview', description: 'les noms de tes commandes (à lancer via npm run)' },
          { token: 'vite', description: 'l’outil réellement exécuté par le script' },
        ],
        placement: 'Dès que tu as des commandes récurrentes à lancer. Utilise-les avec npm run dev.',
      },
      {
        id: 'complet',
        label: 'Complet',
        description: 'Avec dépendances de prod et de dev séparées.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1107-t-v3',
            filename: 'package.json',
            language: 'json',
            code: `{
  "name": "mon-projet",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}`,
          },
        ],
        replacements: [
          { token: 'react / react-dom', description: 'les librairies dont ton app a besoin en production' },
          { token: 'vite', description: 'les outils utilisés seulement pendant le développement' },
          { token: '^18.2.0', description: 'la plage de versions acceptée' },
        ],
        placement: 'Ce que tu obtiens après quelques npm install. Les versions se remplissent toutes seules.',
      },
    ],
  }),

  // ————— Le fichier .env : variables d’environnement —————
  lesson({
    id: 'TOOLS-F-1108-LESSON',
    slug: 'le-fichier-env-variables-d-environnement',
    title: 'Le fichier .env : variables d’environnement',
    shortTitle: '.env',
    technology: 'tools',
    tomeId: 't0',
    summary:
      'Stocker les valeurs sensibles (clés d’API, mots de passe) hors du code, dans un fichier .env jamais versionné.',
    utility:
      'Garder les clés secrètes et les réglages hors du code, dans un fichier séparé.',
    aliases: ['.env', 'env', 'variable environnement', 'dotenv', 'cle api', 'secret'],
    keywords: [
      'cacher une cle api',
      'variable secrete',
      'process env',
      'import meta env',
      'ne pas commit la cle',
      'fichier env exemple',
    ],
    relatedContentIds: [],
    templateId: 'TOOLS-F-1108-TEMPLATE',
    intro:
      'Un fichier <b>.env</b> stocke des <b>valeurs de configuration</b> — clés d’API, adresses de base de données, mots de passe — <b>en dehors du code</b>. On ne l’ajoute <b>jamais</b> à Git : chaque environnement (ton PC, le serveur) a le sien.',
    sections: [
      {
        id: 's1',
        title: 'Pourquoi un fichier .env',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>utiliser une clé d’API</b> dans mon code sans l’écrire en dur dedans, pour ne pas la publier par accident sur GitHub.',
          },
          {
            type: 'paragraph',
            html: 'Tu mets la clé dans un fichier <code>.env</code> à la racine. Une variable par ligne, au format <code>NOM=valeur</code>. Pas d’espaces autour du <code>=</code>, pas de guillemets nécessaires.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1108-l-c1',
              filename: '.env',
              language: 'bash',
              code: `# Une variable par ligne : NOM=valeur
API_KEY=abc123secret
DATABASE_URL=postgres://localhost:5432/madb
PORT=3000`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le fichier <code>.env</code> est le <b>coffre-fort</b> du projet. Le code sait qu’il existe un coffre et demande une valeur, mais le contenu ne voyage jamais avec le code.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Ne jamais versionner le .env',
        blocks: [
          {
            type: 'paragraph',
            html: 'Règle absolue : le <code>.env</code> ne va <b>pas</b> dans Git. On l’ajoute au <code>.gitignore</code>. À la place, on partage un <code>.env.example</code> qui liste les <b>noms des variables</b> sans leurs valeurs.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1108-l-c2',
              filename: '.gitignore',
              language: 'bash',
              code: `# Le vrai fichier de secrets : jamais commit
.env

# On versionne seulement l'exemple (sans les valeurs)
# .env.example est suivi par Git`,
            },
          },
          {
            type: 'table',
            headers: ['Fichier', 'Contenu', 'Dans Git ?'],
            rows: [
              ['<code>.env</code>', 'les vraies valeurs secrètes', 'non'],
              ['<code>.env.example</code>', 'les noms de variables, valeurs vides', 'oui'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Lire une variable dans le code',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>récupérer ma clé d’API dans mon code JavaScript</b> pour l’envoyer avec ma requête.',
          },
          {
            type: 'paragraph',
            html: 'La façon de lire dépend de l’outil. Côté <b>Node</b>, on utilise <code>process.env.NOM</code>. Côté <b>Vite</b> (front), on utilise <code>import.meta.env.NOM</code> et le nom doit commencer par <code>VITE_</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1108-l-c3',
              filename: 'exemples.js',
              language: 'javascript',
              code: `// Cote Node (serveur) : process.env
const cle = process.env.API_KEY;
const port = process.env.PORT;

// Cote Vite (front) : import.meta.env
// Le nom DOIT commencer par VITE_ pour etre expose
const cleFront = import.meta.env.VITE_API_KEY;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> les noms de variables d’environnement s’écrivent en <b>MAJUSCULES</b> avec des underscores (<code>API_KEY</code>, <code>DATABASE_URL</code>). Avec Vite, préfixe par <code>VITE_</code>.',
          },
        ],
      },
      {
        id: 's4',
        title: 'Attention côté front : tout est visible',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une variable lue dans le <b>front</b> (navigateur) n’est <b>pas secrète</b> : elle finit dans le code envoyé au visiteur. Le <code>.env</code> protège surtout les secrets utilisés côté <b>serveur</b>.',
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une clé mise dans le front, c’est une clé <b>collée sur la porte d’entrée</b> : n’importe qui peut la lire. Les vrais secrets (mot de passe de base de données) restent côté serveur.',
          },
        ],
      },
    ],
    pitfalls: [
      'Committer le <code>.env</code> par erreur : ajoute-le au <code>.gitignore</code> <b>avant</b> le premier commit. Une clé poussée sur GitHub est à considérer comme compromise.',
      'Oublier de redémarrer le serveur après avoir modifié le <code>.env</code> : les variables sont lues au démarrage, pas à chaud.',
      'Croire qu’une variable <code>VITE_</code> est secrète : tout ce qui est côté front est visible dans le navigateur.',
      'Mettre des espaces autour du <code>=</code> (<code>NOM = valeur</code>) : écris <code>NOM=valeur</code> sans espace.',
    ],
    takeaways: [
      '<code>.env</code> = valeurs de config et secrets, hors du code, format <code>NOM=valeur</code>',
      'jamais dans Git : ajoute-le au <code>.gitignore</code>, partage un <code>.env.example</code>',
      'lire : <code>process.env.NOM</code> (Node) · <code>import.meta.env.VITE_NOM</code> (Vite)',
      'côté front = jamais secret · redémarre le serveur après modification',
    ],
  }),
  template({
    id: 'TOOLS-F-1108-TEMPLATE',
    slug: 'le-fichier-env-variables-d-environnement',
    title: '.env',
    shortTitle: '.env',
    technology: 'tools',
    tomeId: 't0',
    summary: 'Les fichiers .env prêts à copier : le fichier de secrets, l’exemple partagé, la ligne .gitignore.',
    lede: 'Mettre en place tes variables d’environnement. Choisis le fichier :',
    aliases: ['.env', 'dotenv', 'env example', 'cle api'],
    keywords: ['secret', 'gitignore', 'env example'],
    relatedContentIds: [],
    lessonId: 'TOOLS-F-1108-LESSON',
    variants: [
      {
        id: 'env',
        label: 'Fichier .env',
        description: 'Le vrai fichier avec les valeurs (jamais commit).',
        codeBlocks: [
          {
            id: 'TOOLS-F-1108-t-v1',
            filename: '.env',
            language: 'bash',
            code: `API_KEY=ta_vraie_cle_ici
DATABASE_URL=postgres://localhost:5432/madb
PORT=3000`,
          },
        ],
        replacements: [
          { token: 'API_KEY', description: 'le nom de ta variable (MAJUSCULES)' },
          { token: 'ta_vraie_cle_ici', description: 'la valeur réelle et secrète' },
        ],
        placement: 'À la racine du projet. Ajoute-le au .gitignore : il ne doit jamais partir sur GitHub.',
      },
      {
        id: 'example',
        label: '.env.example',
        description: 'Le modèle partagé, sans les valeurs.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1108-t-v2',
            filename: '.env.example',
            language: 'bash',
            code: `# Copie ce fichier en .env et remplis les valeurs
API_KEY=
DATABASE_URL=
PORT=`,
          },
        ],
        replacements: [
          { token: 'API_KEY / DATABASE_URL / PORT', description: 'la liste des variables attendues par le projet' },
        ],
        placement: 'Celui-ci se versionne. Il documente les variables à définir sans révéler aucun secret.',
      },
      {
        id: 'gitignore',
        label: 'Ligne .gitignore',
        description: 'Pour exclure le .env du suivi Git.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1108-t-v3',
            filename: '.gitignore',
            language: 'bash',
            code: `# Secrets : jamais versionnes
.env
.env.local`,
          },
        ],
        replacements: [
          { token: '.env.local', description: 'les autres fichiers de secrets à ignorer si besoin' },
        ],
        placement: 'À ajouter au .gitignore avant ton premier commit. La ligne la plus importante du projet.',
      },
    ],
  }),

  // ————— Installer une librairie : npm install nom —————
  lesson({
    id: 'TOOLS-F-1109-LESSON',
    slug: 'installer-une-librairie-npm-install-nom',
    title: 'Installer une librairie : npm install nom',
    shortTitle: 'npm install',
    technology: 'tools',
    tomeId: 't0',
    summary:
      'Ajouter une librairie externe à ton projet avec npm : téléchargement, node_modules et mise à jour du package.json.',
    utility:
      'Ajouter une librairie déjà écrite par d’autres à ton projet, sans réinventer la roue.',
    aliases: ['npm install', 'npm i', 'installer package', 'ajouter dependance', 'node modules', 'yarn add'],
    keywords: [
      'ajouter une librairie',
      'installer un package',
      'npm i axios',
      'save dev',
      'node modules',
      'desinstaller une lib',
    ],
    relatedContentIds: [],
    templateId: 'TOOLS-F-1109-TEMPLATE',
    intro:
      'La commande <code>npm install nom</code> <b>télécharge une librairie</b> écrite par d’autres et l’ajoute à ton projet. Elle la range dans <code>node_modules</code> et l’inscrit dans ton <code>package.json</code>.',
    sections: [
      {
        id: 's1',
        title: 'Installer une librairie',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>utiliser axios pour faire des requêtes HTTP</b> dans mon projet, au lieu d’écrire tout à la main.',
          },
          {
            type: 'paragraph',
            html: 'Tu lances <code>npm install</code> suivi du nom de la librairie. npm la télécharge, la place dans <code>node_modules</code>, et l’ajoute à la section <code>dependencies</code> de ton <code>package.json</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1109-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Installe axios et l'ajoute a dependencies
npm install axios

# Forme courte equivalente : npm i
npm i axios

# Ensuite, on l'importe dans le code
# import axios from "axios";`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>npm install</code>, c’est <b>commander une pièce détachée</b> déjà fabriquée. Tu ne la construis pas : tu la reçois, prête à monter dans ton projet.',
          },
        ],
      },
      {
        id: 's2',
        title: 'dependencies ou devDependencies',
        blocks: [
          {
            type: 'paragraph',
            html: 'Par défaut, la lib va dans <code>dependencies</code> (utile à l’app). Pour un <b>outil de développement</b> (test, lint, types), ajoute <code>--save-dev</code> ou <code>-D</code> : elle ira dans <code>devDependencies</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1109-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Dependance de l'app -> dependencies
npm install react

# Outil de dev -> devDependencies (avec -D)
npm install -D eslint

# Installer une version precise
npm install react@18.2.0`,
            },
          },
          {
            type: 'table',
            headers: ['Commande', 'Range dans', 'Pour'],
            rows: [
              ['<code>npm i axios</code>', '<code>dependencies</code>', 'une lib utilisée par l’app'],
              ['<code>npm i -D eslint</code>', '<code>devDependencies</code>', 'un outil de développement'],
              ['<code>npm i -g nom</code>', 'installé globalement', 'une commande système'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Réinstaller à partir du package.json',
        blocks: [
          {
            type: 'situation',
            html: 'Je viens de <b>cloner un projet</b> et le dossier <code>node_modules</code> est absent : rien ne se lance.',
          },
          {
            type: 'paragraph',
            html: 'C’est normal : <code>node_modules</code> n’est pas versionné. Lance <code>npm install</code> <b>sans nom</b> : npm lit le <code>package.json</code> et réinstalle <b>toutes</b> les dépendances listées.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1109-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Sans nom : installe TOUT ce que liste package.json
npm install

# Le premier reflexe apres un git clone
git clone https://github.com/exemple/projet.git
npm install`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Réflexe :</b> après chaque <code>git clone</code> ou <code>git pull</code> qui touche au <code>package.json</code>, relance <code>npm install</code> pour te mettre à jour.',
          },
        ],
      },
      {
        id: 's4',
        title: 'Désinstaller une librairie',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour retirer une lib, utilise <code>npm uninstall nom</code>. Elle est supprimée de <code>node_modules</code> et retirée du <code>package.json</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TOOLS-F-1109-l-c4',
              filename: 'terminal',
              language: 'bash',
              code: `# Retire axios du projet et du package.json
npm uninstall axios

# Forme courte
npm un axios`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>npm install</code> après un <code>git clone</code> : sans <code>node_modules</code>, les imports échouent avec « module introuvable ».',
      'Committer <code>node_modules</code> : ce dossier est lourd et se régénère. Il doit être dans le <code>.gitignore</code>.',
      'Installer en global (<code>-g</code>) une lib de projet : la dépendance ne suivra pas ton projet. Réserve <code>-g</code> aux commandes système.',
      'Ranger un outil de dev dans <code>dependencies</code> : pense à <code>-D</code> pour ESLint, les types, les outils de test.',
    ],
    takeaways: [
      '<code>npm install nom</code> (ou <code>npm i nom</code>) télécharge une lib et l’ajoute au <code>package.json</code>',
      '<code>-D</code> range dans <code>devDependencies</code> · <code>-g</code> installe globalement',
      '<code>npm install</code> sans nom = réinstalle tout : le réflexe après un <code>git clone</code>',
      'retirer une lib : <code>npm uninstall nom</code> · <code>node_modules</code> toujours dans <code>.gitignore</code>',
    ],
  }),
  template({
    id: 'TOOLS-F-1109-TEMPLATE',
    slug: 'installer-une-librairie-npm-install-nom',
    title: 'npm install',
    shortTitle: 'npm install',
    technology: 'tools',
    tomeId: 't0',
    summary: 'Les commandes npm install prêtes à copier : dépendance, outil de dev, version précise, réinstallation.',
    lede: 'Ajouter ou réinstaller une librairie. Choisis le cas :',
    aliases: ['npm install', 'npm i', 'npm uninstall', 'save dev'],
    keywords: ['installer', 'devdependencies', 'reinstaller'],
    relatedContentIds: [],
    lessonId: 'TOOLS-F-1109-LESSON',
    variants: [
      {
        id: 'dependance',
        label: 'Dépendance',
        description: 'Une librairie utilisée par ton application.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1109-t-v1',
            filename: 'terminal',
            language: 'bash',
            code: `npm install axios`,
          },
        ],
        replacements: [
          { token: 'axios', description: 'le nom de la librairie à installer' },
        ],
        placement: 'Le cas par défaut : la lib va dans dependencies. Utilise npm i axios pour la forme courte.',
      },
      {
        id: 'dev',
        label: 'Outil de dev',
        description: 'Un outil utile seulement pendant le développement.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1109-t-v2',
            filename: 'terminal',
            language: 'bash',
            code: `npm install -D eslint`,
          },
        ],
        replacements: [
          { token: 'eslint', description: 'l’outil de dev (linter, types, framework de test…)' },
          { token: '-D', description: 'range la lib dans devDependencies (équivaut à --save-dev)' },
        ],
        placement: 'Pour les outils qui ne servent pas à l’app en production (ESLint, Vitest, @types/...).',
      },
      {
        id: 'version',
        label: 'Version précise',
        description: 'Installer une version exacte plutôt que la dernière.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1109-t-v3',
            filename: 'terminal',
            language: 'bash',
            code: `npm install react@18.2.0`,
          },
        ],
        replacements: [
          { token: 'react', description: 'le nom de la librairie' },
          { token: '18.2.0', description: 'la version exacte voulue (après le @)' },
        ],
        placement: 'Quand tu dois figer une version précise, par exemple pour éviter une régression.',
      },
      {
        id: 'tout',
        label: 'Tout réinstaller',
        description: 'Après un git clone, pour reconstruire node_modules.',
        codeBlocks: [
          {
            id: 'TOOLS-F-1109-t-v4',
            filename: 'terminal',
            language: 'bash',
            code: `npm install`,
          },
        ],
        replacements: [],
        placement: 'Sans aucun nom : npm lit package.json et réinstalle toutes les dépendances. Le réflexe après un clone.',
      },
    ],
  }),
];
