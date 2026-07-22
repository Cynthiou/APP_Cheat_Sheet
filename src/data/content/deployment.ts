import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const deploymentContent: ReadyContent[] = [
  // ————— Le build : npm run build —————
  lesson({
    id: 'DEPLOY-F-1100-LESSON',
    slug: 'le-build-npm-run-build',
    title: 'Le build : npm run build',
    shortTitle: 'npm run build',
    technology: 'deployment',
    tomeId: 't16',
    summary:
      'Transformer ton projet React en fichiers statiques optimisés (HTML, CSS, JS) prêts à être mis en ligne.',
    utility:
      'Fabriquer la version finale et optimisée de ton app, celle que le serveur d’hébergement enverra aux visiteurs.',
    aliases: ['build', 'npm run build', 'compiler', 'dist', 'production build', 'bundle'],
    keywords: [
      'compiler mon app',
      'preparer pour la production',
      'dossier dist',
      'fichiers optimises',
      'minifier',
      'vite build',
    ],
    relatedContentIds: [],
    templateId: 'DEPLOY-F-1100-TEMPLATE',
    intro:
      'En développement, tu lances <code>npm run dev</code> et un serveur recompile à chaque sauvegarde. Mais on ne met <b>jamais</b> ce serveur en ligne. Pour la production, on lance <code>npm run build</code> : il fabrique une version <b>optimisée</b> et <b>figée</b> de ton app dans un dossier (<code>dist</code> avec Vite, <code>build</code> avec Create React App).',
    sections: [
      {
        id: 's1',
        title: 'Pourquoi builder ?',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>mettre mon site React en ligne</b>, mais mon code contient du JSX et des imports que le navigateur ne comprend pas tel quel.',
          },
          {
            type: 'paragraph',
            html: 'Le navigateur ne sait lire que du <b>HTML</b>, du <b>CSS</b> et du <b>JavaScript pur</b>. Ton JSX, tes imports et ton TypeScript doivent d’abord être <b>traduits</b>. C’est le rôle du build : il compile tout, regroupe les fichiers, les minifie, et produit un dossier prêt à être servi tel quel.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1100-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Compile l'app en version optimisee pour la production
npm run build

# Vite depose le resultat dans le dossier dist/
# (Create React App le depose dans build/)`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>npm run dev</code> = ta cuisine en plein service, tout bouge en direct. <code>npm run build</code> = tu dresses le <b>plat final</b>, tu l’emballes, et c’est cette version figée que le client reçoit.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Ce que contient le dossier de sortie',
        blocks: [
          {
            type: 'paragraph',
            html: 'Après le build, tout ton projet tient dans un seul dossier. Un <code>index.html</code>, un dossier <code>assets/</code> avec le JS et le CSS minifiés, et tes images. Ce sont ces fichiers, et <b>seulement</b> eux, que tu mets en ligne.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1100-l-c2',
              filename: 'dist/',
              language: 'text',
              code: `dist/
  index.html            # le point d'entree
  assets/
    index-a1b2c3.js     # ton JS compile et minifie
    index-d4e5f6.css    # ton CSS compile
  logo.svg              # tes images copiees`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> les noms de fichiers contiennent un <b>hash</b> (<code>index-a1b2c3.js</code>). Il change à chaque build : ça force le navigateur à recharger la nouvelle version au lieu de garder l’ancienne en cache.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Tester le build en local',
        blocks: [
          {
            type: 'paragraph',
            html: 'Avant de déployer, teste ta version de production sur ta machine avec <code>npm run preview</code>. Ça lance un petit serveur qui sert le dossier <code>dist</code> exactement comme le fera l’hébergeur.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1100-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# 1. On build
npm run build

# 2. On sert le resultat en local pour verifier
npm run preview

# Ouvre l'URL affichee (souvent http://localhost:4173)
# Si tout marche ici, ca marchera en ligne`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>npm run preview</code> = la <b>répétition générale</b> avant la première. Tu joues le spectacle final, mais encore à huis clos, pour repérer les bugs avant le public.',
          },
        ],
      },
    ],
    pitfalls: [
      'Vouloir déployer le dossier <code>src</code> ou lancer <code>npm run dev</code> en ligne : on ne déploie que le dossier <b>buildé</b> (<code>dist</code>).',
      'Le build échoue à cause d’une erreur TypeScript ou d’un import cassé qui passait inaperçue en dev : corrige-la, le build est plus strict.',
      'Confondre <code>dist</code> (Vite) et <code>build</code> (Create React App) : vérifie quel dossier ton outil produit avant de configurer l’hébergeur.',
    ],
    takeaways: [
      '<code>npm run dev</code> = développement · <code>npm run build</code> = version finale à mettre en ligne',
      'le build produit un dossier statique : <code>dist</code> (Vite) ou <code>build</code> (Create React App)',
      'on ne déploie <b>que</b> ce dossier, pas le code source',
      '<code>npm run preview</code> teste la version de production en local avant de déployer',
    ],
  }),
  template({
    id: 'DEPLOY-F-1100-TEMPLATE',
    slug: 'le-build-npm-run-build',
    title: 'npm run build',
    shortTitle: 'Build',
    technology: 'deployment',
    tomeId: 't16',
    summary: 'Les commandes de build prêtes à copier selon ton outil : Vite, Create React App, ou Next.js.',
    lede: 'Fabriquer ta version de production. Choisis ton outil :',
    aliases: ['build', 'npm run build', 'compiler', 'preview'],
    keywords: ['vite build', 'production', 'dist', 'preview'],
    relatedContentIds: [],
    lessonId: 'DEPLOY-F-1100-LESSON',
    variants: [
      {
        id: 'vite',
        label: 'Vite',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1100-t-vite',
            filename: 'terminal',
            language: 'bash',
            code: `# Build vers dist/
npm run build

# Tester le resultat en local
npm run preview`,
          },
        ],
        replacements: [
          { token: 'dist/', description: 'le dossier de sortie de Vite (par défaut dist)' },
        ],
        placement:
          'Le cas le plus courant aujourd’hui. La commande de build à donner à l’hébergeur est npm run build, le dossier à publier est dist.',
      },
      {
        id: 'cra',
        label: 'Create React App',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1100-t-cra',
            filename: 'terminal',
            language: 'bash',
            code: `# Build vers build/
npm run build

# Servir le resultat en local (paquet serve)
npx serve -s build`,
          },
        ],
        replacements: [
          { token: 'build/', description: 'le dossier de sortie de Create React App' },
        ],
        placement:
          'Si ton projet a été créé avec Create React App. Le dossier à publier s’appelle build (et non dist).',
      },
      {
        id: 'nextjs',
        label: 'Next.js',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1100-t-next',
            filename: 'terminal',
            language: 'bash',
            code: `# Build de production
npm run build

# Demarrer le serveur de production Next.js
npm run start`,
          },
        ],
        replacements: [
          { token: 'npm run start', description: 'la commande qui lance le serveur Next.js en production' },
        ],
        placement:
          'Pour une app Next.js : le build prépare la prod, puis npm run start lance un vrai serveur (Next n’est pas qu’un site statique).',
      },
    ],
  }),

  // ————— Déployer le front : Vercel et Netlify —————
  lesson({
    id: 'DEPLOY-F-1101-LESSON',
    slug: 'deployer-le-front-vercel-et-netlify',
    title: 'Déployer le front : Vercel et Netlify',
    shortTitle: 'Vercel / Netlify',
    technology: 'deployment',
    tomeId: 't16',
    summary:
      'Mettre ton app React en ligne gratuitement en connectant ton dépôt Git à Vercel ou Netlify.',
    utility:
      'Publier ton site React sur une vraie URL, avec redéploiement automatique à chaque push Git.',
    aliases: ['vercel', 'netlify', 'deployer front', 'hebergement front', 'mettre en ligne', 'deploiement'],
    keywords: [
      'mettre mon site en ligne',
      'hebergement gratuit',
      'connecter github',
      'redeploiement automatique',
      'url publique',
      'front statique',
    ],
    relatedContentIds: [],
    templateId: 'DEPLOY-F-1101-TEMPLATE',
    intro:
      '<b>Vercel</b> et <b>Netlify</b> hébergent gratuitement les sites front (React, Vue…). Le principe : tu connectes ton dépôt <b>GitHub</b>, ils lancent <code>npm run build</code> pour toi, et publient le dossier <code>dist</code> sur une URL. À chaque <code>git push</code>, ils redéploient <b>automatiquement</b>.',
    sections: [
      {
        id: 's1',
        title: 'Le déploiement depuis Git',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>partager mon app React avec une vraie URL</b> que je peux envoyer à quelqu’un, sans gérer de serveur ni payer.',
          },
          {
            type: 'paragraph',
            html: 'La méthode moderne : ton code vit sur GitHub, tu le relies à Vercel ou Netlify en quelques clics. Ils détectent que c’est un projet Vite/React, lancent le build, et mettent le résultat en ligne. Plus besoin de transférer des fichiers à la main.',
          },
          {
            type: 'table',
            headers: ['Étape', 'Ce qui se passe'],
            rows: [
              ['Tu pousses ton code', 'sur GitHub (<code>git push</code>)'],
              ['Tu connectes le dépôt', 'sur Vercel ou Netlify'],
              ['La plateforme build', 'elle lance <code>npm run build</code>'],
              ['Ton site est en ligne', 'sur une URL <code>.vercel.app</code> ou <code>.netlify.app</code>'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> c’est un tapis roulant. Tu déposes ton code sur GitHub, la plateforme s’occupe de tout le reste jusqu’à la vitrine en ligne, sans que tu touches à quoi que ce soit.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les réglages de build',
        blocks: [
          {
            type: 'paragraph',
            html: 'La plateforme te demande deux infos : la <b>commande de build</b> (<code>npm run build</code>) et le <b>dossier à publier</b> (<code>dist</code> pour Vite). En général, elle les devine seule, mais garde ces valeurs en tête si tu dois les corriger.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1101-l-c1',
              filename: 'Reglages Vercel / Netlify',
              language: 'text',
              code: `Build Command    : npm run build
Output Directory : dist        (build/ pour Create React App)
Install Command  : npm install`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> avec Vite le dossier de sortie est <code>dist</code>. Si ta page est blanche après déploiement, c’est souvent que le mauvais dossier a été publié.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Le déploiement en une commande (CLI)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Sans passer par l’interface web, tu peux déployer directement depuis ton terminal avec l’outil en ligne de commande de chaque plateforme. Pratique pour un test rapide.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1101-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Vercel : installe l'outil, puis deploie
npm install -g vercel
vercel           # deploie une preview
vercel --prod    # deploie en production

# Netlify : idem avec son outil
npm install -g netlify-cli
netlify deploy --prod`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Le piège du routing (SPA)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Avec React Router, rafraîchir une page comme <code>/contact</code> renvoie souvent une erreur <b>404</b> : le serveur cherche un fichier <code>contact</code> qui n’existe pas. Il faut lui dire de <b>toujours</b> renvoyer <code>index.html</code>, et laisser React gérer la route.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1101-l-c3',
              filename: 'public/_redirects (Netlify)',
              language: 'text',
              code: `# Toutes les routes renvoient vers index.html
# React Router prend ensuite le relais
/*    /index.html   200`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> sur Vercel c’est automatique pour Vite. Sur Netlify, ajoute le fichier <code>_redirects</code> ci-dessus dans <code>public/</code> pour éviter les 404 au rafraîchissement.',
          },
        ],
      },
    ],
    pitfalls: [
      'Page blanche après déploiement : le mauvais dossier de sortie est configuré (mets <code>dist</code> pour Vite, <code>build</code> pour Create React App).',
      'Erreur 404 en rafraîchissant une route (<code>/contact</code>) : ajoute une règle de redirection vers <code>index.html</code> (fichier <code>_redirects</code> sur Netlify).',
      'Oublier que les variables d’environnement du front doivent être <b>reconfigurées</b> sur la plateforme : ton fichier <code>.env</code> local n’est pas envoyé.',
      'Croire que Vercel/Netlify hébergent ton serveur Express : ce sont des hébergeurs de <b>front statique</b>, le back va ailleurs.',
    ],
    takeaways: [
      'Vercel et Netlify hébergent le <b>front</b> gratuitement, depuis un dépôt GitHub',
      'chaque <code>git push</code> déclenche un <b>redéploiement automatique</b>',
      'réglages clés : commande <code>npm run build</code> + dossier <code>dist</code>',
      'routing SPA : renvoyer toutes les routes vers <code>index.html</code> pour éviter les 404',
    ],
  }),
  template({
    id: 'DEPLOY-F-1101-TEMPLATE',
    slug: 'deployer-le-front-vercel-et-netlify',
    title: 'Déployer le front',
    shortTitle: 'Vercel / Netlify',
    technology: 'deployment',
    tomeId: 't16',
    summary: 'Déployer une app React : via Vercel, via Netlify, ou corriger le routing SPA.',
    lede: 'Mettre ton front en ligne. Choisis la plateforme :',
    aliases: ['vercel', 'netlify', 'deployer', 'redirects'],
    keywords: ['deploiement front', 'cli', 'spa 404'],
    relatedContentIds: [],
    lessonId: 'DEPLOY-F-1101-LESSON',
    variants: [
      {
        id: 'vercel-cli',
        label: 'Vercel (CLI)',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1101-t-vercel',
            filename: 'terminal',
            language: 'bash',
            code: `# Une seule fois : installer l'outil
npm install -g vercel

# Depuis la racine du projet
vercel --prod`,
          },
        ],
        replacements: [
          { token: '--prod', description: 'déploie en production (sans, tu obtiens une preview)' },
        ],
        placement:
          'Lance la commande à la racine de ton projet. Vercel détecte Vite/React tout seul et te donne l’URL finale.',
      },
      {
        id: 'netlify-cli',
        label: 'Netlify (CLI)',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1101-t-netlify',
            filename: 'terminal',
            language: 'bash',
            code: `# Une seule fois : installer l'outil
npm install -g netlify-cli

# Build puis deploie le dossier dist en production
npm run build
netlify deploy --prod --dir=dist`,
          },
        ],
        replacements: [
          { token: '--dir=dist', description: 'le dossier à publier (dist pour Vite, build pour Create React App)' },
        ],
        placement:
          'Build d’abord, puis pointe Netlify sur le bon dossier avec --dir. L’option --prod met directement en production.',
      },
      {
        id: 'redirects',
        label: 'Fix routing SPA',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1101-t-redirects',
            filename: 'public/_redirects',
            language: 'text',
            code: `# Netlify : toutes les URL renvoient index.html
/*    /index.html   200`,
          },
          {
            id: 'DEPLOY-F-1101-t-vercel-json',
            filename: 'vercel.json',
            language: 'json',
            code: `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`,
          },
        ],
        replacements: [
          { token: '/index.html', description: 'le point d’entrée de ton app (à ne pas changer)' },
        ],
        placement:
          'Ajoute ces fichiers pour éviter les erreurs 404 quand on rafraîchit une route React Router. _redirects pour Netlify, vercel.json pour Vercel.',
      },
    ],
  }),

  // ————— Déployer le serveur : Render et Railway —————
  lesson({
    id: 'DEPLOY-F-1102-LESSON',
    slug: 'deployer-le-serveur-render-et-railway',
    title: 'Déployer le serveur : Render et Railway',
    shortTitle: 'Render / Railway',
    technology: 'deployment',
    tomeId: 't16',
    summary:
      'Héberger ton API Node/Express et sa base de données pour qu’elle tourne en continu, sur Render ou Railway.',
    utility:
      'Mettre en ligne ton back-end pour que ton front puisse l’appeler depuis n’importe où.',
    aliases: ['render', 'railway', 'deployer back', 'hebergement serveur', 'deployer api', 'deployer express'],
    keywords: [
      'heberger mon api',
      'deployer express',
      'serveur en ligne',
      'base de donnees hebergee',
      'port dynamique',
      'back end en production',
    ],
    relatedContentIds: [],
    templateId: 'DEPLOY-F-1102-TEMPLATE',
    intro:
      'Vercel héberge le front, mais un serveur <b>Express</b> doit tourner <b>en permanence</b> pour répondre aux requêtes. C’est le rôle de <b>Render</b> et <b>Railway</b> : ils lancent ton <code>node server.js</code>, le gardent allumé, et lui donnent une URL publique. Ils hébergent aussi ta base de données PostgreSQL.',
    sections: [
      {
        id: 's1',
        title: 'Front et back : deux hébergements',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>mettre mon API Express en ligne</b> pour que mon front déployé sur Vercel puisse aller y chercher des données.',
          },
          {
            type: 'paragraph',
            html: 'Un front est un ensemble de fichiers statiques : on le pose sur un CDN, point. Un back Express est un <b>programme qui tourne</b> : il attend des requêtes, interroge la base, répond. Il lui faut un hébergeur qui garde le processus <b>vivant</b> — c’est ce que font Render et Railway.',
          },
          {
            type: 'table',
            headers: ['', 'Front (React)', 'Back (Express)'],
            rows: [
              ['Nature', 'fichiers statiques', 'programme qui tourne'],
              ['Hébergeur', 'Vercel / Netlify', 'Render / Railway'],
              ['Commande', '<code>npm run build</code>', '<code>node server.js</code>'],
            ],
          },
        ],
      },
      {
        id: 's2',
        title: 'Le PORT dynamique',
        blocks: [
          {
            type: 'paragraph',
            html: 'En local, ton serveur écoute sur un port fixe (<code>3000</code>). En production, l’hébergeur <b>impose</b> le sien via la variable <code>process.env.PORT</code>. Ton code doit la lire, sinon le déploiement échoue.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1102-l-c1',
              filename: 'server.js',
              language: 'javascript',
              code: `// On lit le port impose par l'hebergeur,
// et on retombe sur 3000 en local si absent
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Serveur en ligne sur le port " + PORT);
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle absolue :</b> ne code jamais le port en dur (<code>app.listen(3000)</code>) en production. Toujours <code>process.env.PORT || 3000</code>, sinon Render/Railway ne peuvent pas te joindre.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Les commandes de démarrage',
        blocks: [
          {
            type: 'paragraph',
            html: 'La plateforme te demande deux commandes : comment <b>installer</b> (<code>npm install</code>) et comment <b>démarrer</b> (<code>npm start</code>). Ce <code>start</code> doit exister dans ton <code>package.json</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1102-l-c2',
              filename: 'package.json',
              language: 'json',
              code: `{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>dev</code> avec nodemon = un cuisinier qui refait le plat à chaque changement. <code>start</code> = le service normal, stable, sans rechargement. C’est <code>start</code> qui tourne en production.',
          },
        ],
      },
      {
        id: 's4',
        title: 'Le CORS entre les deux',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une fois séparés sur deux domaines (<code>.vercel.app</code> et <code>.onrender.com</code>), le navigateur bloque les appels du front vers le back par sécurité : c’est le <b>CORS</b>. Il faut autoriser explicitement l’URL de ton front côté serveur.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1102-l-c3',
              filename: 'server.js',
              language: 'javascript',
              code: `const cors = require("cors");

// On autorise UNIQUEMENT l'URL de notre front en ligne
app.use(cors({
  origin: "https://mon-app.vercel.app",
}));`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Coder <code>app.listen(3000)</code> en dur : en production, utilise <code>process.env.PORT || 3000</code>, sinon l’hébergeur ne joint pas ton serveur.',
      'Oublier le script <code>start</code> dans <code>package.json</code> : Render/Railway ne savent pas comment lancer ton app.',
      'Erreur CORS dans la console du front : autorise l’URL du front dans la config <code>cors()</code> du serveur.',
      'Laisser l’URL de l’API en dur (<code>localhost:3000</code>) dans le front : remplace-la par l’URL en ligne via une variable d’environnement.',
    ],
    takeaways: [
      'front (Vercel) et back (Render/Railway) sont hébergés <b>séparément</b>',
      'toujours <code>const PORT = process.env.PORT || 3000</code> — jamais un port en dur',
      'un script <code>"start": "node server.js"</code> dans <code>package.json</code> est obligatoire',
      'penser au <b>CORS</b> : autoriser l’URL du front côté serveur',
    ],
  }),
  template({
    id: 'DEPLOY-F-1102-TEMPLATE',
    slug: 'deployer-le-serveur-render-et-railway',
    title: 'Déployer le serveur',
    shortTitle: 'Render / Railway',
    technology: 'deployment',
    tomeId: 't16',
    summary: 'Préparer un serveur Express pour la production : port dynamique, script start, CORS.',
    lede: 'Mettre ton back en ligne. Choisis ce que tu prépares :',
    aliases: ['render', 'railway', 'deployer back', 'process.env.port'],
    keywords: ['port dynamique', 'script start', 'cors'],
    relatedContentIds: [],
    lessonId: 'DEPLOY-F-1102-LESSON',
    variants: [
      {
        id: 'port',
        label: 'Port dynamique',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1102-t-port',
            filename: 'server.js',
            language: 'javascript',
            code: `const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("En ligne sur le port " + PORT);
});`,
          },
        ],
        replacements: [
          { token: '3000', description: 'le port de repli utilisé en local (l’hébergeur impose le sien)' },
        ],
        placement:
          'Indispensable pour Render/Railway : ils fournissent le port via process.env.PORT. Le 3000 ne sert que sur ta machine.',
      },
      {
        id: 'start',
        label: 'Script start',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1102-t-start',
            filename: 'package.json',
            language: 'json',
            code: `{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}`,
          },
        ],
        replacements: [
          { token: 'server.js', description: 'le fichier d’entrée de ton serveur (index.js, app.js…)' },
        ],
        placement:
          'La plateforme lance npm start en production. Ce script doit exister et pointer sur ton vrai fichier serveur.',
      },
      {
        id: 'cors',
        label: 'CORS production',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1102-t-cors',
            filename: 'server.js',
            language: 'javascript',
            code: `const cors = require("cors");

app.use(cors({
  origin: "https://mon-app.vercel.app",
}));`,
          },
        ],
        replacements: [
          { token: 'https://mon-app.vercel.app', description: 'l’URL exacte de ton front déployé' },
        ],
        placement:
          'À ajouter côté serveur pour autoriser ton front en ligne à appeler l’API. Sans ça, le navigateur bloque les requêtes.',
      },
    ],
  }),

  // ————— Les variables d’environnement en production —————
  lesson({
    id: 'DEPLOY-F-1103-LESSON',
    slug: 'les-variables-d-environnement-en-production',
    title: 'Les variables d’environnement en production',
    shortTitle: 'Variables d’env',
    technology: 'deployment',
    tomeId: 't16',
    summary:
      'Gérer les secrets (clés API, URL de base) sans les écrire en dur, et les configurer chez l’hébergeur.',
    utility:
      'Séparer le code des secrets, et fournir les bonnes valeurs au front et au back une fois en ligne.',
    aliases: ['variables environnement', 'env', 'dotenv', 'secrets', 'process.env', 'import.meta.env'],
    keywords: [
      'cacher une cle api',
      'fichier env',
      'url api dynamique',
      'secret en production',
      'vite env prefix',
      'configurer variables hebergeur',
    ],
    relatedContentIds: [],
    templateId: 'DEPLOY-F-1103-TEMPLATE',
    intro:
      'Une <b>variable d’environnement</b> stocke une valeur qui change selon l’endroit où tourne le code : une clé API, l’URL de ta base, l’URL de ton API. On ne l’écrit <b>jamais en dur</b> dans le code (ni sur GitHub) : on la met dans un fichier <code>.env</code> en local, et on la <b>reconfigure</b> chez l’hébergeur en production.',
    sections: [
      {
        id: 's1',
        title: 'Pourquoi ne pas écrire en dur',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>utiliser ma clé API secrète</b> dans mon code sans qu’elle se retrouve visible sur GitHub, où n’importe qui pourrait la voler.',
          },
          {
            type: 'paragraph',
            html: 'Si tu écris ta clé directement dans le code et que tu pousses sur GitHub, elle est <b>exposée</b> pour toujours. La solution : la mettre dans un fichier <code>.env</code>, et <b>ignorer</b> ce fichier dans Git. Le code lit la variable, la vraie valeur reste privée.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1103-l-c1',
              filename: '.env',
              language: 'bash',
              code: `# Fichier .env (jamais commite !)
DATABASE_URL=postgres://user:motdepasse@host:5432/ma_base
JWT_SECRET=une_longue_chaine_aleatoire`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1103-l-c2',
              filename: '.gitignore',
              language: 'text',
              code: `# On empeche Git d'envoyer les secrets sur GitHub
.env
node_modules`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle d’or :</b> le <code>.env</code> est <b>toujours</b> dans le <code>.gitignore</code>. On partage plutôt un <code>.env.example</code> (avec les noms des variables, sans les valeurs) pour documenter.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Lire une variable : front vs back',
        blocks: [
          {
            type: 'paragraph',
            html: 'La syntaxe <b>diffère</b> selon le côté. Côté serveur (Node), c’est <code>process.env.NOM</code>. Côté front avec Vite, c’est <code>import.meta.env.VITE_NOM</code> — et le nom <b>doit</b> commencer par <code>VITE_</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1103-l-c3',
              filename: 'exemples',
              language: 'javascript',
              code: `// BACK (Node/Express) : process.env
const secret = process.env.JWT_SECRET;

// FRONT (Vite) : import.meta.env, prefixe VITE_
const apiUrl = import.meta.env.VITE_API_URL;`,
            },
          },
          {
            type: 'table',
            headers: ['Côté', 'Syntaxe', 'Préfixe requis'],
            rows: [
              ['Back (Node)', '<code>process.env.NOM</code>', 'aucun'],
              ['Front (Vite)', '<code>import.meta.env.VITE_NOM</code>', '<code>VITE_</code>'],
              ['Front (Create React App)', '<code>process.env.REACT_APP_NOM</code>', '<code>REACT_APP_</code>'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Attention :</b> côté front, tout est <b>public</b>. Ne mets <b>jamais</b> une vraie clé secrète dans une variable <code>VITE_</code> : elle finit dans le code envoyé au navigateur. Les secrets restent côté back.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Configurer chez l’hébergeur',
        blocks: [
          {
            type: 'paragraph',
            html: 'Ton fichier <code>.env</code> local n’est <b>pas envoyé</b> en ligne (il est dans le <code>.gitignore</code>). Il faut donc <b>recopier chaque variable</b> dans l’interface de Vercel, Render ou Railway (section « Environment Variables »).',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1103-l-c4',
              filename: 'Interface hebergeur',
              language: 'text',
              code: `Environment Variables
--------------------------------
VITE_API_URL   =  https://mon-api.onrender.com
JWT_SECRET     =  une_longue_chaine_aleatoire
DATABASE_URL   =  postgres://...

# Puis : redeployer pour que ce soit pris en compte`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le <code>.env</code> local, c’est ton trousseau de clés à la maison. En arrivant au bureau (l’hébergeur), tes clés ne te suivent pas : il faut refaire un double sur place.',
          },
        ],
      },
    ],
    pitfalls: [
      'Committer le fichier <code>.env</code> : la clé est exposée sur GitHub. Ajoute <code>.env</code> au <code>.gitignore</code> <b>avant</b> le premier push, puis révoque la clé si c’est arrivé.',
      'Oublier le préfixe <code>VITE_</code> côté front : <code>import.meta.env.API_URL</code> sera <code>undefined</code>.',
      'Mettre un secret (clé privée) dans une variable <code>VITE_</code> : elle devient publique dans le bundle du navigateur.',
      'Modifier une variable chez l’hébergeur sans <b>redéployer</b> : l’ancienne valeur reste active jusqu’au prochain build.',
    ],
    takeaways: [
      'jamais de secret en dur : fichier <code>.env</code> + <code>.env</code> dans le <code>.gitignore</code>',
      'back : <code>process.env.NOM</code> · front Vite : <code>import.meta.env.VITE_NOM</code>',
      'côté front, tout est public : les vrais secrets restent côté back',
      'le <code>.env</code> local n’est pas déployé : reconfigure les variables chez l’hébergeur, puis redéploie',
    ],
  }),
  template({
    id: 'DEPLOY-F-1103-TEMPLATE',
    slug: 'les-variables-d-environnement-en-production',
    title: 'Variables d’environnement',
    shortTitle: 'Variables d’env',
    technology: 'deployment',
    tomeId: 't16',
    summary: 'Gérer les variables d’environnement : côté back Node, côté front Vite, et le .gitignore.',
    lede: 'Gérer tes secrets et URL. Choisis le cas :',
    aliases: ['env', 'dotenv', 'process.env', 'import.meta.env'],
    keywords: ['secret', 'cle api', 'vite env'],
    relatedContentIds: [],
    lessonId: 'DEPLOY-F-1103-LESSON',
    variants: [
      {
        id: 'back',
        label: 'Back (Node)',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1103-t-back',
            filename: 'server.js',
            language: 'javascript',
            code: `// Une fois en haut du fichier d'entree
require("dotenv").config();

// Puis on lit la variable
const secret = process.env.JWT_SECRET;`,
          },
        ],
        replacements: [
          { token: 'JWT_SECRET', description: 'le nom de ta variable, tel qu’écrit dans le .env' },
        ],
        placement:
          'Côté serveur. Le paquet dotenv charge le fichier .env en local ; en production, l’hébergeur fournit process.env directement.',
      },
      {
        id: 'front',
        label: 'Front (Vite)',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1103-t-front-env',
            filename: '.env',
            language: 'bash',
            code: `# Prefixe VITE_ obligatoire pour etre lisible cote front
VITE_API_URL=https://mon-api.onrender.com`,
          },
          {
            id: 'DEPLOY-F-1103-t-front-use',
            filename: 'api.js',
            language: 'javascript',
            code: `// On lit la variable prefixee VITE_
const apiUrl = import.meta.env.VITE_API_URL;

fetch(apiUrl + "/users");`,
          },
        ],
        replacements: [
          { token: 'VITE_API_URL', description: 'le nom de ta variable (préfixe VITE_ obligatoire)' },
          { token: 'https://mon-api.onrender.com', description: 'l’URL de ton API en ligne' },
        ],
        placement:
          'Côté front Vite. Rappel : ces valeurs sont publiques, n’y mets jamais un vrai secret. Redémarre le serveur dev après modification du .env.',
      },
      {
        id: 'gitignore',
        label: '.gitignore',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1103-t-gitignore',
            filename: '.gitignore',
            language: 'text',
            code: `# Ne jamais envoyer les secrets sur GitHub
.env
.env.local
node_modules`,
          },
        ],
        replacements: [],
        placement:
          'À la racine du projet. À faire avant le premier push : si un .env a déjà été commité, révoque les clés concernées.',
      },
    ],
  }),

  // ————— Docker : plus tard —————
  lesson({
    id: 'DEPLOY-F-1104-LESSON',
    slug: 'docker-plus-tard',
    title: 'Docker : plus tard',
    shortTitle: 'Docker',
    technology: 'deployment',
    tomeId: 't16',
    summary:
      'Comprendre ce qu’est Docker et pourquoi, en début de carrière, tu peux t’en passer sans culpabiliser.',
    utility:
      'Savoir de quoi on parle quand on entend « conteneur » ou « Dockerfile », sans t’y noyer trop tôt.',
    aliases: ['docker', 'conteneur', 'container', 'dockerfile', 'image docker', 'devops'],
    keywords: [
      'c est quoi docker',
      'conteneur',
      'ca marche sur ma machine',
      'dockerfile',
      'quand apprendre docker',
      'pas prioritaire',
    ],
    relatedContentIds: [],
    templateId: 'DEPLOY-F-1104-TEMPLATE',
    intro:
      '<b>Docker</b> emballe ton app <b>et tout son environnement</b> (version de Node, dépendances, système) dans une boîte étanche appelée <b>conteneur</b>. Cette boîte tourne à l’identique partout. C’est puissant, mais <b>pas prioritaire</b> pour une première mise en ligne : Vercel et Render suffisent largement.',
    sections: [
      {
        id: 's1',
        title: 'Le problème que Docker résout',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux comprendre pourquoi on entend <b>« ça marche sur ma machine mais pas sur le serveur »</b>, et ce que Docker vient régler là-dedans.',
          },
          {
            type: 'paragraph',
            html: 'Ton app dépend de plein de choses invisibles : la version de Node, celles des paquets, des réglages système. Sur une autre machine, une de ces choses diffère et tout casse. Docker <b>fige</b> tout cet environnement dans un conteneur : la boîte est identique sur ton PC, chez ton collègue et sur le serveur.',
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> Docker, c’est le <b>conteneur maritime</b>. Peu importe le bateau, le camion ou le pays : la boîte est standard et son contenu voyage sans surprise. Ton app est dedans, l’environnement aussi.',
          },
        ],
      },
      {
        id: 's2',
        title: 'À quoi ressemble un Dockerfile',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un <code>Dockerfile</code> est une <b>recette</b> : il liste les étapes pour construire la boîte. Tu n’as pas besoin de le maîtriser aujourd’hui, mais le reconnaître aide à ne pas paniquer quand tu en croises un.',
          },
          {
            type: 'code',
            block: {
              id: 'DEPLOY-F-1104-l-c1',
              filename: 'Dockerfile',
              language: 'text',
              code: `# On part d'une image Node officielle
FROM node:20

# Dossier de travail dans le conteneur
WORKDIR /app

# On copie et installe les dependances
COPY package.json .
RUN npm install

# On copie le reste du code
COPY . .

# La commande qui demarre l'app
CMD ["npm", "start"]`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Vocabulaire :</b> le <code>Dockerfile</code> est la recette, l’<b>image</b> est le plat cuisiné (figé), le <b>conteneur</b> est une portion qui tourne. Une même image peut lancer plusieurs conteneurs.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Quand t’y mettre (et pas avant)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour tes premiers projets et ton portfolio, Vercel + Render font le travail sans une ligne de Docker. Tu y viendras quand un <b>vrai besoin</b> apparaît : une équipe, un environnement complexe, ou un job qui l’exige.',
          },
          {
            type: 'table',
            headers: ['Situation', 'Docker utile ?'],
            rows: [
              ['Portfolio, projet perso', 'non — Vercel/Render suffisent'],
              ['Premier déploiement', 'non — reste simple'],
              ['Travail en équipe', 'souvent oui — même environnement pour tous'],
              ['Micro-services, config complexe', 'oui — c’est fait pour ça'],
              ['Une offre d’emploi le demande', 'oui — apprends les bases à ce moment-là'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> Docker n’est pas un prérequis pour déployer. C’est un outil d’<b>équipe et de scalabilité</b>. Le noter comme « à apprendre plus tard » est une décision <b>saine</b>, pas un aveu de faiblesse.',
          },
        ],
      },
    ],
    pitfalls: [
      'Croire qu’il <b>faut</b> Docker pour mettre un projet en ligne : faux, Vercel et Render déploient sans aucun conteneur.',
      'Vouloir tout dockeriser dès le premier projet : tu passes des jours sur l’outillage au lieu de livrer ton app.',
      'Confondre <b>image</b> (le modèle figé) et <b>conteneur</b> (l’instance qui tourne) : ce sont deux choses distinctes.',
    ],
    takeaways: [
      'Docker = ton app <b>+ son environnement</b> figés dans un conteneur, identique partout',
      'il règle le « ça marche sur ma machine » mais n’est <b>pas requis</b> pour déployer',
      'Vercel + Render suffisent pour un portfolio ou un premier projet',
      'à apprendre plus tard : en équipe, en environnement complexe, ou si un job l’exige',
    ],
  }),
  template({
    id: 'DEPLOY-F-1104-TEMPLATE',
    slug: 'docker-plus-tard',
    title: 'Docker (les bases)',
    shortTitle: 'Docker',
    technology: 'deployment',
    tomeId: 't16',
    summary: 'Les fichiers Docker de base à reconnaître : Dockerfile front, Dockerfile back, .dockerignore.',
    lede: 'Pour le jour où tu t’y mettras. Choisis le fichier :',
    aliases: ['docker', 'dockerfile', 'conteneur', 'dockerignore'],
    keywords: ['dockerfile', 'image node', 'dockerignore'],
    relatedContentIds: [],
    lessonId: 'DEPLOY-F-1104-LESSON',
    variants: [
      {
        id: 'back',
        label: 'Dockerfile (back)',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1104-t-back',
            filename: 'Dockerfile',
            language: 'text',
            code: `FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
          },
        ],
        replacements: [
          { token: 'node:20', description: 'la version de Node à utiliser' },
          { token: '3000', description: 'le port sur lequel ton serveur écoute' },
          { token: 'npm", "start', description: 'la commande qui démarre ton serveur' },
        ],
        placement:
          'Pour conteneuriser une API Node/Express. À la racine du projet back. Utile plus tard, en équipe ou pour un hébergeur qui demande une image.',
      },
      {
        id: 'front',
        label: 'Dockerfile (front)',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1104-t-front',
            filename: 'Dockerfile',
            language: 'text',
            code: `# Etape 1 : on build le front
FROM node:20 AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Etape 2 : on sert dist/ avec nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html`,
          },
        ],
        replacements: [
          { token: '/app/dist', description: 'le dossier de build (dist pour Vite, build pour Create React App)' },
        ],
        placement:
          'Un build en deux étapes : on compile avec Node, puis on sert les fichiers statiques avec nginx. Le plus courant pour dockeriser un front.',
      },
      {
        id: 'dockerignore',
        label: '.dockerignore',
        codeBlocks: [
          {
            id: 'DEPLOY-F-1104-t-ignore',
            filename: '.dockerignore',
            language: 'text',
            code: `# On evite de copier ces dossiers dans l'image
node_modules
dist
.env
.git`,
          },
        ],
        replacements: [],
        placement:
          'À côté du Dockerfile. Comme un .gitignore mais pour Docker : évite d’alourdir l’image avec des dossiers inutiles ou des secrets.',
      },
    ],
  }),
];
