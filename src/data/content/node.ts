import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const nodeContent: ReadyContent[] = [
  // ————— C’est quoi Node —————
  lesson({
    id: 'NODE-F-1100-LESSON',
    slug: 'c-est-quoi-node',
    title: 'C’est quoi Node',
    shortTitle: 'C’est quoi Node',
    technology: 'node',
    tomeId: 't11',
    summary:
      'Comprendre ce qu’est Node.js : le moteur qui fait tourner du JavaScript en dehors du navigateur, sur ta machine ou sur un serveur.',
    utility: 'Exécuter du JavaScript hors du navigateur, pour écrire des outils et des serveurs.',
    aliases: ['node', 'nodejs', 'node.js', 'runtime', 'javascript serveur', 'moteur v8'],
    keywords: [
      'javascript hors navigateur',
      'executer du js',
      'cote serveur',
      'terminal',
      'runtime javascript',
      'process',
    ],
    relatedContentIds: [],
    templateId: 'NODE-F-1100-TEMPLATE',
    intro:
      'Jusqu’ici ton JavaScript tournait dans le <b>navigateur</b>. <b>Node.js</b> est un <b>runtime</b> : il fait tourner du JavaScript <b>directement sur ta machine</b>, sans navigateur. C’est ce qui te permet d’écrire des scripts, des outils, et surtout des <b>serveurs</b> en JavaScript.',
    sections: [
      {
        id: 's1',
        title: 'Navigateur vs Node',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>écrire du JavaScript qui tourne sur mon ordinateur</b> (lire un fichier, lancer un serveur), pas seulement dans une page web.',
          },
          {
            type: 'paragraph',
            html: 'Le langage est <b>le même</b> (JavaScript), mais l’environnement change. Dans le navigateur tu as <code>window</code> et le <b>DOM</b> ; dans Node tu as <code>process</code> et l’accès aux <b>fichiers</b>.',
          },
          {
            type: 'table',
            headers: ['', 'Navigateur', 'Node.js'],
            rows: [
              ['Où ça tourne', 'dans une page web', 'sur ta machine / un serveur'],
              ['Objet global', '<code>window</code>', '<code>global</code> / <code>process</code>'],
              ['Accès au DOM', 'oui (<code>document</code>)', 'non'],
              ['Accès aux fichiers', 'non', 'oui (module <code>fs</code>)'],
              ['À quoi ça sert', 'interface, clics', 'scripts, API, serveurs'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le JavaScript est une <b>langue</b>. Le navigateur et Node sont deux <b>pays</b> différents où on parle cette langue — mêmes mots, mais on n’y fait pas les mêmes choses.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Vérifier que Node est installé',
        blocks: [
          {
            type: 'paragraph',
            html: 'Node s’installe une fois sur ta machine. Pour vérifier qu’il est là, on demande sa <b>version</b> dans le terminal. <code>npm</code> (le gestionnaire de paquets) est installé <b>en même temps</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1100-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Affiche la version de Node installee
node --version
# ex : v20.11.0

# Affiche la version de npm (livre avec Node)
npm --version
# ex : 10.2.4`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Bon à savoir :</b> installe de préférence une version <b>LTS</b> (Long Term Support). C’est la version stable recommandée pour travailler au quotidien.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Un premier bout de code Node',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dans Node, <code>console.log</code> écrit dans le <b>terminal</b> (pas dans une console de navigateur). Et tu as accès à des objets qui n’existent pas côté client, comme <code>process</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1100-l-c2',
              filename: 'hello.js',
              language: 'javascript',
              code: `// S'affiche dans le terminal, pas dans le navigateur
console.log("Bonjour depuis Node");

// process : des infos sur l'execution en cours
console.log("Version de Node :", process.version);
console.log("Dossier courant :", process.cwd());`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que le DOM existe dans Node : <code>document</code> et <code>window</code> n’y sont <b>pas</b>. Node ne connaît pas les pages web.',
      'Confondre la console du navigateur et le terminal : dans Node, <code>console.log</code> s’affiche dans le <b>terminal</b>.',
      'Installer Node depuis n’importe quelle source : passe par le site officiel et choisis la version <b>LTS</b>.',
    ],
    takeaways: [
      'Node = un <b>runtime</b> qui exécute du JavaScript hors du navigateur',
      'même langage, environnement différent : <code>process</code> et fichiers au lieu du DOM',
      'vérifier l’installation : <code>node --version</code> · <code>npm --version</code>',
      '<code>npm</code> est installé automatiquement avec Node',
    ],
  }),
  template({
    id: 'NODE-F-1100-TEMPLATE',
    slug: 'c-est-quoi-node',
    title: 'C’est quoi Node',
    shortTitle: 'Node',
    technology: 'node',
    tomeId: 't11',
    summary: 'Vérifier Node et écrire un premier script, selon ce que tu veux tester.',
    lede: 'Prendre Node en main. Choisis ce que tu veux faire :',
    aliases: ['node', 'nodejs', 'version', 'runtime'],
    keywords: ['node version', 'premier script', 'process'],
    relatedContentIds: [],
    lessonId: 'NODE-F-1100-LESSON',
    variants: [
      {
        id: 'verifier',
        label: 'Vérifier l’installation',
        codeBlocks: [
          {
            id: 'NODE-F-1100-t-v1',
            filename: 'terminal',
            language: 'bash',
            code: `node --version
npm --version`,
          },
        ],
        replacements: [],
        placement: 'Dans le terminal, avant de commencer un projet. Si une version s’affiche, Node est prêt.',
      },
      {
        id: 'hello',
        label: 'Premier script',
        codeBlocks: [
          {
            id: 'NODE-F-1100-t-v2',
            filename: 'index.js',
            language: 'javascript',
            code: `console.log("Bonjour depuis Node");`,
          },
        ],
        replacements: [
          { token: 'Bonjour depuis Node', description: 'le message à afficher dans le terminal' },
        ],
        placement: 'Un fichier .js à lancer avec « node index.js ». Le message apparaît dans le terminal.',
      },
      {
        id: 'infos',
        label: 'Infos d’exécution',
        codeBlocks: [
          {
            id: 'NODE-F-1100-t-v3',
            filename: 'infos.js',
            language: 'javascript',
            code: `console.log(process.version); // version de Node
console.log(process.cwd());   // dossier courant
console.log(process.platform); // systeme (linux, darwin, win32)`,
          },
        ],
        replacements: [],
        placement: 'Quand tu veux savoir dans quel contexte ton script tourne (version, dossier, OS).',
      },
    ],
  }),

  // ————— Exécuter un fichier JavaScript —————
  lesson({
    id: 'NODE-F-1101-LESSON',
    slug: 'executer-un-fichier-javascript',
    title: 'Exécuter un fichier JavaScript',
    shortTitle: 'Exécuter un fichier',
    technology: 'node',
    tomeId: 't11',
    summary:
      'Lancer un fichier .js avec la commande node, lui passer des arguments et lire ce qu’il affiche dans le terminal.',
    utility: 'Faire tourner un script JavaScript depuis le terminal avec Node.',
    aliases: ['node fichier', 'lancer un script', 'executer js', 'node index.js', 'arguments', 'argv'],
    keywords: [
      'lancer un fichier js',
      'node commande',
      'passer des arguments',
      'terminal',
      'process argv',
      'script',
    ],
    relatedContentIds: [],
    templateId: 'NODE-F-1101-TEMPLATE',
    intro:
      'Pour lancer un fichier JavaScript avec Node, on tape <code>node</code> suivi du <b>chemin du fichier</b> dans le terminal. Node lit le fichier de haut en bas et l’exécute. On peut aussi lui passer des <b>arguments</b>.',
    sections: [
      {
        id: 's1',
        title: 'Lancer un fichier',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>exécuter mon fichier <code>index.js</code></b> pour voir ce qu’il fait, sans passer par un navigateur ni une page HTML.',
          },
          {
            type: 'paragraph',
            html: 'On se place dans le dossier du projet, puis on lance <code>node</code> suivi du nom du fichier. L’<b>extension .js est optionnelle</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1101-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Lance le fichier index.js
node index.js

# L'extension .js peut etre omise
node index

# Un fichier dans un sous-dossier
node src/script.js`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>node index.js</code>, c’est comme donner une <b>recette à un cuisinier</b> : il lit les étapes de haut en bas et les exécute une par une, dans l’ordre.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Passer des arguments',
        blocks: [
          {
            type: 'paragraph',
            html: 'Tout ce que tu tapes <b>après</b> le nom du fichier devient un <b>argument</b>. Node les range dans <code>process.argv</code>, un tableau. Les deux premiers éléments sont toujours le chemin de Node et celui du fichier.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1101-l-c2',
              filename: 'salut.js',
              language: 'javascript',
              code: `// process.argv : [chemin node, chemin fichier, ...tes arguments]
// On coupe les 2 premiers avec slice(2)
const args = process.argv.slice(2);

// Le premier argument passe (ou "toi" par defaut)
const prenom = args[0] || "toi";

console.log("Salut " + prenom);`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1101-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `node salut.js Alice
# Affiche : Salut Alice

node salut.js
# Affiche : Salut toi`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Contient'],
            rows: [
              ['<code>process.argv[0]</code>', 'le chemin de Node'],
              ['<code>process.argv[1]</code>', 'le chemin de ton fichier'],
              ['<code>process.argv[2]</code>', 'ton 1ᵉʳ argument'],
              ['<code>process.argv.slice(2)</code>', 'la liste de tes arguments'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Relancer à chaque modification',
        blocks: [
          {
            type: 'paragraph',
            html: 'Par défaut, Node lit le fichier <b>une seule fois</b> puis s’arrête. Si tu modifies le code, il faut <b>relancer</b> la commande. Le flag <code>--watch</code> (Node récent) relance automatiquement à chaque sauvegarde.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1101-l-c4',
              filename: 'terminal',
              language: 'bash',
              code: `# Relance automatiquement a chaque sauvegarde du fichier
node --watch index.js

# Pratique en developpement pour ne pas retaper la commande`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Lancer <code>node</code> depuis le mauvais dossier : « Cannot find module ». Place-toi dans le dossier du fichier ou donne le bon chemin.',
      'Confondre <code>node index.js</code> et <code>npm start</code> : le second exécute un <b>script</b> défini dans <code>package.json</code>, pas forcément le fichier voulu.',
      'Oublier <code>slice(2)</code> sur <code>process.argv</code> : tes deux premiers éléments seront les chemins de Node et du fichier, pas tes arguments.',
    ],
    takeaways: [
      'lancer un fichier : <code>node index.js</code> (extension optionnelle)',
      'les arguments arrivent dans <code>process.argv</code> · à découper avec <code>slice(2)</code>',
      'Node lit le fichier une fois puis s’arrête ; relance après chaque modif',
      '<code>node --watch index.js</code> relance tout seul à chaque sauvegarde',
    ],
  }),
  template({
    id: 'NODE-F-1101-TEMPLATE',
    slug: 'executer-un-fichier-javascript',
    title: 'Exécuter un fichier JavaScript',
    shortTitle: 'Exécuter un fichier',
    technology: 'node',
    tomeId: 't11',
    summary: 'Lancer un script Node : simple, avec arguments, ou en mode watch.',
    lede: 'Faire tourner un fichier. Choisis le cas :',
    aliases: ['node fichier', 'lancer script', 'argv', 'watch'],
    keywords: ['node index.js', 'arguments', 'relancer'],
    relatedContentIds: [],
    lessonId: 'NODE-F-1101-LESSON',
    variants: [
      {
        id: 'simple',
        label: 'Lancer simplement',
        codeBlocks: [
          {
            id: 'NODE-F-1101-t-v1',
            filename: 'terminal',
            language: 'bash',
            code: `node index.js`,
          },
        ],
        replacements: [
          { token: 'index.js', description: 'le chemin de ton fichier à exécuter' },
        ],
        placement: 'Le cas de base : exécute le fichier une fois puis rend la main.',
      },
      {
        id: 'arguments',
        label: 'Lire des arguments',
        codeBlocks: [
          {
            id: 'NODE-F-1101-t-v2',
            filename: 'script.js',
            language: 'javascript',
            code: `const args = process.argv.slice(2);
console.log("Arguments recus :", args);`,
          },
        ],
        replacements: [
          { token: 'args', description: 'le tableau de tes arguments (tout ce qui suit le nom du fichier)' },
        ],
        placement: 'Quand ton script doit réagir à ce que l’utilisateur tape après le nom du fichier.',
      },
      {
        id: 'watch',
        label: 'Mode watch',
        codeBlocks: [
          {
            id: 'NODE-F-1101-t-v3',
            filename: 'terminal',
            language: 'bash',
            code: `node --watch index.js`,
          },
        ],
        replacements: [
          { token: 'index.js', description: 'le fichier à surveiller et relancer à chaque sauvegarde' },
        ],
        placement: 'En développement, pour relancer automatiquement à chaque modification du fichier.',
      },
    ],
  }),

  // ————— Les modules : import et export (Node) —————
  lesson({
    id: 'NODE-F-1102-LESSON',
    slug: 'les-modules-import-et-export-node',
    title: 'Les modules : import et export (Node)',
    shortTitle: 'Modules Node',
    technology: 'node',
    tomeId: 't11',
    summary:
      'Découper son code en plusieurs fichiers et partager des fonctions entre eux, avec les modules ES (import/export) ou CommonJS (require).',
    utility: 'Répartir son code en fichiers réutilisables et les relier entre eux.',
    aliases: ['import', 'export', 'require', 'module', 'commonjs', 'esm', 'module.exports'],
    keywords: [
      'decouper le code',
      'partager une fonction',
      'importer un fichier',
      'require node',
      'export default',
      'type module',
    ],
    relatedContentIds: [],
    templateId: 'NODE-F-1102-TEMPLATE',
    intro:
      'Un <b>module</b>, c’est un fichier. Pour partager du code entre fichiers, un fichier <b>exporte</b> (met à disposition) et un autre <b>importe</b> (récupère). Node comprend deux syntaxes : <b>ES Modules</b> (<code>import</code>/<code>export</code>, moderne) et <b>CommonJS</b> (<code>require</code>, historique).',
    sections: [
      {
        id: 's1',
        title: 'ES Modules : import / export',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>écrire mes fonctions utilitaires dans un fichier à part</b> et les réutiliser dans mon fichier principal, au lieu de tout entasser dans un seul fichier.',
          },
          {
            type: 'paragraph',
            html: 'La syntaxe moderne, la même qu’en React : <code>export</code> pour exposer, <code>import</code> pour récupérer. En Node, pense à mettre l’<b>extension .js</b> dans le chemin d’import.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1102-l-c1',
              filename: 'maths.js',
              language: 'javascript',
              code: `// Export nomme : on peut en exporter plusieurs
export function additionner(a, b) {
  return a + b;
}

// Export par defaut : un seul par fichier
export default function multiplier(a, b) {
  return a * b;
}`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1102-l-c2',
              filename: 'index.js',
              language: 'javascript',
              code: `// Le defaut sans accolades, les nommes entre accolades
import multiplier, { additionner } from "./maths.js";

console.log(additionner(2, 3)); // 5
console.log(multiplier(2, 3));  // 6`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Important en Node :</b> pour utiliser <code>import</code>/<code>export</code>, ajoute <code>"type": "module"</code> dans ton <code>package.json</code>. Sinon Node attend la syntaxe CommonJS.',
          },
        ],
      },
      {
        id: 's2',
        title: 'CommonJS : require / module.exports',
        blocks: [
          {
            type: 'paragraph',
            html: 'La syntaxe <b>historique</b> de Node, encore très présente. On expose avec <code>module.exports</code> et on récupère avec <code>require()</code>. Pas besoin de <code>"type": "module"</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1102-l-c3',
              filename: 'maths.js',
              language: 'javascript',
              code: `function additionner(a, b) {
  return a + b;
}

// On expose ce qu'on veut rendre disponible
module.exports = { additionner };`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1102-l-c4',
              filename: 'index.js',
              language: 'javascript',
              code: `// require() renvoie ce que le fichier a exporte
const { additionner } = require("./maths.js");

console.log(additionner(2, 3)); // 5`,
            },
          },
          {
            type: 'table',
            headers: ['', 'ES Modules', 'CommonJS'],
            rows: [
              ['Exporter', '<code>export</code> / <code>export default</code>', '<code>module.exports</code>'],
              ['Importer', '<code>import ... from</code>', '<code>require()</code>'],
              ['Config', '<code>"type": "module"</code>', 'aucune (défaut)'],
              ['Style', 'moderne, standard', 'historique Node'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Importer un module intégré',
        blocks: [
          {
            type: 'paragraph',
            html: 'Node fournit des modules <b>intégrés</b> (fichiers, chemins, etc.). On les importe par leur <b>nom</b>, sans <code>./</code> ni installation. Le préfixe <code>node:</code> est recommandé.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1102-l-c5',
              filename: 'lire.js',
              language: 'javascript',
              code: `// Module integre : pas de ./ ni de npm install
import { readFile } from "node:fs/promises";

// Lit un fichier texte et l'affiche
const contenu = await readFile("notes.txt", "utf-8");
console.log(contenu);`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Mélanger <code>import</code> et <code>require</code> dans le même projet sans réfléchir : choisis une syntaxe. <code>import</code> exige <code>"type": "module"</code>.',
      'Oublier l’extension <code>.js</code> dans un <code>import</code> relatif en ES Modules Node : le chemin doit être complet (<code>./maths.js</code>).',
      'Confondre chemin relatif (<code>./maths.js</code>, un de tes fichiers) et nom de paquet (<code>express</code>, installé via npm).',
    ],
    takeaways: [
      'un module = un fichier · un fichier <b>exporte</b>, l’autre <b>importe</b>',
      'ES Modules : <code>export</code> / <code>import</code> + <code>"type": "module"</code>',
      'CommonJS : <code>module.exports</code> / <code>require()</code> (défaut, historique)',
      'import relatif avec <code>./</code> et <b>extension .js</b> · module intégré par son nom (<code>node:fs</code>)',
    ],
  }),
  template({
    id: 'NODE-F-1102-TEMPLATE',
    slug: 'les-modules-import-et-export-node',
    title: 'Modules Node : import / export',
    shortTitle: 'Modules Node',
    technology: 'node',
    tomeId: 't11',
    summary: 'Partager du code entre fichiers : ES Modules, export par défaut, ou CommonJS.',
    lede: 'Relier tes fichiers. Choisis la syntaxe :',
    aliases: ['import', 'export', 'require', 'module.exports'],
    keywords: ['esm', 'commonjs', 'partager fonction'],
    relatedContentIds: [],
    lessonId: 'NODE-F-1102-LESSON',
    variants: [
      {
        id: 'esm-nomme',
        label: 'ES Modules (nommé)',
        codeBlocks: [
          {
            id: 'NODE-F-1102-t-v1a',
            filename: 'utils.js',
            language: 'javascript',
            code: `export function saluer(nom) {
  return "Bonjour " + nom;
}`,
          },
          {
            id: 'NODE-F-1102-t-v1b',
            filename: 'index.js',
            language: 'javascript',
            code: `import { saluer } from "./utils.js";

console.log(saluer("Alice"));`,
          },
        ],
        replacements: [
          { token: 'saluer', description: 'le nom de la fonction exportée puis importée' },
          { token: './utils.js', description: 'le chemin du fichier (extension .js incluse)' },
        ],
        placement: 'La syntaxe moderne recommandée. Nécessite "type": "module" dans package.json.',
      },
      {
        id: 'esm-default',
        label: 'Export par défaut',
        codeBlocks: [
          {
            id: 'NODE-F-1102-t-v2a',
            filename: 'config.js',
            language: 'javascript',
            code: `export default {
  port: 3000,
  hote: "localhost",
};`,
          },
          {
            id: 'NODE-F-1102-t-v2b',
            filename: 'index.js',
            language: 'javascript',
            code: `import config from "./config.js";

console.log(config.port);`,
          },
        ],
        replacements: [
          { token: 'config', description: 'le nom que tu choisis à l’import (pas d’accolades)' },
        ],
        placement: 'Quand un fichier n’expose qu’une seule chose principale (un objet, une fonction).',
      },
      {
        id: 'commonjs',
        label: 'CommonJS (require)',
        codeBlocks: [
          {
            id: 'NODE-F-1102-t-v3a',
            filename: 'utils.js',
            language: 'javascript',
            code: `function saluer(nom) {
  return "Bonjour " + nom;
}

module.exports = { saluer };`,
          },
          {
            id: 'NODE-F-1102-t-v3b',
            filename: 'index.js',
            language: 'javascript',
            code: `const { saluer } = require("./utils.js");

console.log(saluer("Alice"));`,
          },
        ],
        replacements: [
          { token: 'saluer', description: 'la fonction exposée dans module.exports' },
        ],
        placement: 'La syntaxe historique. Fonctionne sans configuration dans package.json.',
      },
    ],
  }),

  // ————— npm et scripts —————
  lesson({
    id: 'NODE-F-1103-LESSON',
    slug: 'npm-et-scripts',
    title: 'npm et scripts',
    shortTitle: 'npm & scripts',
    technology: 'node',
    tomeId: 't11',
    summary:
      'Gérer les dépendances d’un projet avec npm (package.json, node_modules) et lancer des commandes raccourcies via les scripts npm.',
    utility: 'Installer des paquets et automatiser les commandes d’un projet.',
    aliases: ['npm', 'package.json', 'npm install', 'npm run', 'dependances', 'scripts', 'node_modules'],
    keywords: [
      'installer un paquet',
      'gerer les dependances',
      'npm install',
      'lancer un script',
      'package json',
      'npm run dev',
    ],
    relatedContentIds: [],
    templateId: 'NODE-F-1103-TEMPLATE',
    intro:
      '<b>npm</b> (Node Package Manager) gère les <b>dépendances</b> de ton projet : les paquets écrits par d’autres que tu réutilises. Tout est décrit dans <code>package.json</code>. npm sert aussi à définir des <b>scripts</b> : des raccourcis vers tes commandes.',
    sections: [
      {
        id: 's1',
        title: 'Installer des dépendances',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>utiliser une librairie externe</b> (par exemple Express) dans mon projet, sans copier son code à la main.',
          },
          {
            type: 'paragraph',
            html: 'On initialise un projet avec <code>npm init</code>, ce qui crée le <code>package.json</code>. Puis <code>npm install</code> télécharge un paquet dans <code>node_modules/</code> et l’inscrit dans les dépendances.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1103-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Cree package.json (le -y accepte les valeurs par defaut)
npm init -y

# Installe un paquet et l'ajoute aux dependances
npm install express

# Un outil utile seulement en dev (-D)
npm install -D nodemon

# Re-installe tout depuis package.json (ex : projet clone)
npm install`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> on ne versionne <b>jamais</b> <code>node_modules/</code> (souvent énorme). On le met dans <code>.gitignore</code> : <code>npm install</code> le régénère à partir de <code>package.json</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Anatomie du package.json',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <code>package.json</code> décrit ton projet : son nom, ses <b>dépendances</b>, et surtout ses <b>scripts</b>. C’est le fichier central d’un projet Node.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1103-l-c2',
              filename: 'package.json',
              language: 'json',
              code: `{
  "name": "mon-projet",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}`,
            },
          },
          {
            type: 'table',
            headers: ['Champ', 'Rôle'],
            rows: [
              ['<code>scripts</code>', 'les commandes raccourcies du projet'],
              ['<code>dependencies</code>', 'paquets nécessaires en production'],
              ['<code>devDependencies</code>', 'paquets utiles seulement en dev'],
              ['<code>type</code>', '<code>module</code> pour activer <code>import</code>/<code>export</code>'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Lancer un script',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un <b>script</b> est un raccourci vers une commande. On l’écrit une fois dans <code>package.json</code>, on l’exécute avec <code>npm run</code>. Deux noms sont spéciaux : <code>start</code> et <code>test</code> se lancent sans <code>run</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1103-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Lance le script "dev" defini dans package.json
npm run dev

# "start" est special : le "run" est optionnel
npm start
# equivaut a : npm run start`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> les scripts npm sont des <b>boutons de raccourci</b>. Plutôt que de retaper <code>node --watch index.js</code> à chaque fois, tu appuies sur le bouton <code>npm run dev</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Versionner <code>node_modules/</code> sur Git : c’est inutile et lourd. Ajoute-le à <code>.gitignore</code> et laisse <code>npm install</code> le recréer.',
      'Confondre <code>dependencies</code> et <code>devDependencies</code> : un outil de dev (tests, watcher) va en <code>-D</code>, pas en production.',
      'Écrire <code>npm dev</code> au lieu de <code>npm run dev</code> : seuls <code>start</code> et <code>test</code> se lancent sans <code>run</code>.',
    ],
    takeaways: [
      '<code>npm init -y</code> crée le <code>package.json</code> · <code>npm install &lt;paquet&gt;</code> ajoute une dépendance',
      '<code>-D</code> pour une dépendance de développement · <code>npm install</code> seul régénère <code>node_modules</code>',
      '<code>node_modules/</code> va dans <code>.gitignore</code>, jamais sur Git',
      'les scripts sont des raccourcis : <code>npm run dev</code> · <code>start</code> et <code>test</code> sans <code>run</code>',
    ],
  }),
  template({
    id: 'NODE-F-1103-TEMPLATE',
    slug: 'npm-et-scripts',
    title: 'npm et scripts',
    shortTitle: 'npm & scripts',
    technology: 'node',
    tomeId: 't11',
    summary: 'Les commandes npm essentielles : installer, définir des scripts, les lancer.',
    lede: 'Gérer un projet avec npm. Choisis le cas :',
    aliases: ['npm', 'npm install', 'npm run', 'scripts'],
    keywords: ['installer paquet', 'package.json', 'lancer script'],
    relatedContentIds: [],
    lessonId: 'NODE-F-1103-LESSON',
    variants: [
      {
        id: 'installer',
        label: 'Installer',
        codeBlocks: [
          {
            id: 'NODE-F-1103-t-v1',
            filename: 'terminal',
            language: 'bash',
            code: `# Dependance de production
npm install express

# Dependance de developpement
npm install -D nodemon`,
          },
        ],
        replacements: [
          { token: 'express', description: 'le nom du paquet à installer' },
          { token: 'nodemon', description: 'un outil utile seulement pendant le développement' },
        ],
        placement: 'Quand tu ajoutes une librairie à ton projet. Elle s’inscrit dans package.json.',
      },
      {
        id: 'scripts',
        label: 'Définir des scripts',
        codeBlocks: [
          {
            id: 'NODE-F-1103-t-v2',
            filename: 'package.json',
            language: 'json',
            code: `{
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  }
}`,
          },
        ],
        replacements: [
          { token: 'dev', description: 'le nom de ton raccourci (appelé avec npm run dev)' },
          { token: 'node --watch index.js', description: 'la commande complète que le script exécute' },
        ],
        placement: 'Dans package.json, pour créer des raccourcis vers tes commandes fréquentes.',
      },
      {
        id: 'lancer',
        label: 'Lancer un script',
        codeBlocks: [
          {
            id: 'NODE-F-1103-t-v3',
            filename: 'terminal',
            language: 'bash',
            code: `npm run dev

# start et test se lancent sans "run"
npm start`,
          },
        ],
        replacements: [
          { token: 'dev', description: 'le nom du script à exécuter' },
        ],
        placement: 'Une fois le script défini, pour l’exécuter depuis le terminal.',
      },
    ],
  }),

  // ————— Les variables d’environnement (Node) —————
  lesson({
    id: 'NODE-F-1104-LESSON',
    slug: 'les-variables-d-environnement-node',
    title: 'Les variables d’environnement (Node)',
    shortTitle: 'Variables d’env',
    technology: 'node',
    tomeId: 't11',
    summary:
      'Stocker les valeurs sensibles ou variables (clés d’API, port, mot de passe) hors du code, dans un fichier .env lu via process.env.',
    utility: 'Sortir les valeurs secrètes ou changeantes du code source.',
    aliases: ['env', 'process.env', 'dotenv', 'variable environnement', 'fichier .env', 'secret', 'cle api'],
    keywords: [
      'cacher une cle api',
      'fichier env',
      'process env',
      'valeur secrete',
      'configuration',
      'port variable',
    ],
    relatedContentIds: [],
    templateId: 'NODE-F-1104-TEMPLATE',
    intro:
      'Une <b>variable d’environnement</b> stocke une valeur <b>en dehors du code</b> : une clé d’API, un mot de passe, un port. Dans Node, on les lit via <code>process.env</code>. En dev, on les range dans un fichier <code>.env</code> — que l’on ne commite <b>jamais</b>.',
    sections: [
      {
        id: 's1',
        title: 'Pourquoi sortir une valeur du code',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>utiliser une clé d’API sans l’écrire en dur dans mon code</b>, pour ne pas la publier par accident sur GitHub.',
          },
          {
            type: 'paragraph',
            html: 'Écrire un secret directement dans le code est <b>dangereux</b> : il finit sur Git, visible de tous. La solution : le mettre dans une variable d’environnement, lue via <code>process.env.NOM</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1104-l-c1',
              filename: 'index.js',
              language: 'javascript',
              code: `// A NE PAS FAIRE : secret ecrit en dur dans le code
const cle = "sk_live_1234secret";

// A FAIRE : on lit la valeur depuis l'environnement
const cleApi = process.env.CLE_API;

// Toujours prevoir un defaut pour les valeurs non sensibles
const port = process.env.PORT || 3000;`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>process.env</code> est un <b>trousseau de clés</b> fourni au programme au démarrage. Le code demande une clé par son nom, sans savoir où elle est rangée.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le fichier .env',
        blocks: [
          {
            type: 'paragraph',
            html: 'En développement, on regroupe ses variables dans un fichier <code>.env</code> à la racine : une valeur par ligne, au format <code>NOM=valeur</code>. Ce fichier va <b>toujours</b> dans <code>.gitignore</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1104-l-c2',
              filename: '.env',
              language: 'bash',
              code: `# Une variable par ligne, sans espace autour du =
CLE_API=sk_live_1234secret
PORT=4000
BASE_URL=http://localhost:4000`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1104-l-c3',
              filename: '.gitignore',
              language: 'text',
              code: `# Ne jamais commiter les secrets
.env
node_modules`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> on commite un <code>.env.example</code> avec les <b>noms</b> des variables mais <b>sans les valeurs</b>. Ça documente ce qu’il faut renseigner, sans fuite de secret.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Charger le .env dans Node',
        blocks: [
          {
            type: 'paragraph',
            html: 'Node ne lit pas <code>.env</code> tout seul (sauf versions récentes). On utilise le paquet <code>dotenv</code>, ou le flag <code>--env-file</code> intégré aux versions modernes de Node.',
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1104-l-c4',
              filename: 'index.js',
              language: 'javascript',
              code: `// Option 1 : le paquet dotenv (npm install dotenv)
// A appeler tout en haut, avant de lire process.env
import "dotenv/config";

console.log(process.env.CLE_API);`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'NODE-F-1104-l-c5',
              filename: 'terminal',
              language: 'bash',
              code: `# Option 2 : flag integre a Node (versions recentes)
node --env-file=.env index.js`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Rôle'],
            rows: [
              ['<code>process.env.NOM</code>', 'lit une variable d’environnement'],
              ['<code>.env</code>', 'fichier local qui stocke les valeurs'],
              ['<code>dotenv</code>', 'paquet qui charge le <code>.env</code>'],
              ['<code>--env-file=.env</code>', 'charge le <code>.env</code> sans paquet'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Commiter le fichier <code>.env</code> : tes secrets deviennent publics. Ajoute-le à <code>.gitignore</code> <b>avant</b> le premier commit.',
      'Lire <code>process.env</code> avant d’avoir chargé <code>dotenv</code> : la valeur est <code>undefined</code>. Charge <code>dotenv/config</code> tout en haut.',
      'Oublier que <code>process.env</code> renvoie <b>toujours des chaînes</b> : <code>process.env.PORT</code> est <code>"4000"</code>, pas le nombre <code>4000</code>.',
    ],
    takeaways: [
      'les secrets et valeurs changeantes vont dans l’<b>environnement</b>, pas dans le code',
      'on les lit avec <code>process.env.NOM</code> (toujours une chaîne)',
      'en dev : un fichier <code>.env</code> à la racine, <b>toujours</b> dans <code>.gitignore</code>',
      'charger le <code>.env</code> : <code>import "dotenv/config"</code> ou <code>node --env-file=.env</code>',
    ],
  }),
  template({
    id: 'NODE-F-1104-TEMPLATE',
    slug: 'les-variables-d-environnement-node',
    title: 'Variables d’environnement (Node)',
    shortTitle: 'Variables d’env',
    technology: 'node',
    tomeId: 't11',
    summary: 'Gérer les valeurs sensibles avec un .env : le fichier, sa lecture, son chargement.',
    lede: 'Sortir une valeur du code. Choisis le cas :',
    aliases: ['env', 'process.env', 'dotenv', '.env'],
    keywords: ['secret', 'cle api', 'configuration'],
    relatedContentIds: [],
    lessonId: 'NODE-F-1104-LESSON',
    variants: [
      {
        id: 'fichier',
        label: 'Fichier .env',
        codeBlocks: [
          {
            id: 'NODE-F-1104-t-v1',
            filename: '.env',
            language: 'bash',
            code: `CLE_API=ta_cle_secrete
PORT=4000`,
          },
        ],
        replacements: [
          { token: 'CLE_API', description: 'le nom de ta variable (en MAJUSCULES par convention)' },
          { token: 'ta_cle_secrete', description: 'la valeur (sans guillemets, sans espace autour du =)' },
        ],
        placement: 'À la racine du projet. À ajouter dans .gitignore avant tout commit.',
      },
      {
        id: 'lire',
        label: 'Lire une variable',
        codeBlocks: [
          {
            id: 'NODE-F-1104-t-v2',
            filename: 'index.js',
            language: 'javascript',
            code: `const port = process.env.PORT || 3000;
const cleApi = process.env.CLE_API;`,
          },
        ],
        replacements: [
          { token: 'PORT', description: 'le nom de la variable à lire (identique à celui du .env)' },
          { token: '3000', description: 'une valeur par défaut si la variable est absente' },
        ],
        placement: 'Partout dans ton code, pour récupérer une valeur de configuration.',
      },
      {
        id: 'charger-dotenv',
        label: 'Charger avec dotenv',
        codeBlocks: [
          {
            id: 'NODE-F-1104-t-v3',
            filename: 'index.js',
            language: 'javascript',
            code: `import "dotenv/config";

console.log(process.env.CLE_API);`,
          },
        ],
        replacements: [],
        placement: 'Tout en haut du fichier d’entrée, après « npm install dotenv ». Rend le .env accessible via process.env.',
      },
      {
        id: 'charger-flag',
        label: 'Charger sans paquet',
        codeBlocks: [
          {
            id: 'NODE-F-1104-t-v4',
            filename: 'terminal',
            language: 'bash',
            code: `node --env-file=.env index.js`,
          },
        ],
        replacements: [
          { token: '.env', description: 'le chemin du fichier d’environnement à charger' },
        ],
        placement: 'Avec une version récente de Node, pour charger le .env sans installer dotenv.',
      },
    ],
  }),
];
