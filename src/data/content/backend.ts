import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const backendContent: ReadyContent[] = [
  // ————— Créer un serveur Express —————
  lesson({
    id: 'EXPRESS-F-001-LESSON',
    slug: 'creer-serveur-express',
    title: 'Créer un serveur Express',
    shortTitle: 'Serveur Express',
    technology: 'express',
    tomeId: 't12',
    summary: 'Démarrer un serveur HTTP minimal avec Express qui écoute sur un port.',
    utility: 'Avoir un back-end qui répond à des requêtes.',
    aliases: ['express', 'serveur', 'backend', 'listen', 'port', 'api'],
    keywords: ['creer serveur', 'demarrer backend', 'ecouter port', 'express app'],
    relatedContentIds: ['EXPRESS-F-002-LESSON'],
    templateId: 'EXPRESS-F-001-TEMPLATE',
    intro:
      'Express crée un serveur en quelques lignes : on importe Express, on crée une <code>app</code>, on définit des routes, puis on écoute un <b>port</b>.',
    sections: [
      {
        id: 's1',
        title: 'app + listen',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'express-server-c1',
              filename: 'server.js',
              language: 'javascript',
              code: `import express from "express";

const app = express();
app.use(express.json()); // pour lire le JSON du body

app.get("/", (req, res) => {
  res.send("Serveur en ligne");
});

app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<code>app.use(express.json())</code> est nécessaire pour lire les données JSON envoyées dans le corps des requêtes POST/PUT.',
          },
        ],
      },
    ],
    takeaways: [
      '<code>const app = express()</code> puis <code>app.listen(PORT)</code>',
      '<code>express.json()</code> pour lire le body JSON',
    ],
  }),
  template({
    id: 'EXPRESS-F-001-TEMPLATE',
    slug: 'creer-serveur-express',
    title: 'Serveur Express',
    technology: 'express',
    tomeId: 't12',
    summary: 'Serveur Express minimal.',
    lede: 'Démarrer un serveur. Choisis la syntaxe :',
    aliases: ['express', 'serveur', 'esm', 'commonjs', 'require'],
    keywords: ['listen'],
    relatedContentIds: ['EXPRESS-F-002-TEMPLATE'],
    lessonId: 'EXPRESS-F-001-LESSON',
    variants: [
      {
        id: 'esm',
        label: 'import (ESM)',
        codeBlocks: [
          {
            id: 'express-server-t-esm',
            filename: 'server.js',
            language: 'javascript',
            code: `import express from "express";

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
});`,
          },
        ],
        replacements: [{ token: '3000', description: 'le port d’écoute' }],
        placement: 'Nécessite "type": "module" dans package.json.',
      },
      {
        id: 'cjs',
        label: 'require (CommonJS)',
        codeBlocks: [
          {
            id: 'express-server-t-cjs',
            filename: 'server.js',
            language: 'javascript',
            code: `const express = require("express");

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
});`,
          },
        ],
        replacements: [{ token: '3000', description: 'le port d’écoute' }],
        placement: 'La syntaxe Node « classique », sans configuration.',
      },
      {
        id: 'cors',
        label: 'Avec CORS',
        codeBlocks: [
          {
            id: 'express-server-t-cors',
            filename: 'server.js',
            language: 'javascript',
            code: `import express from "express";
import cors from "cors";

const app = express();
app.use(cors());        // autorise les requêtes du front
app.use(express.json());

app.listen(3000);`,
          },
        ],
        replacements: [],
        placement: 'Ajoute CORS quand ton front (autre port) appelle l’API (npm i cors).',
      },
    ],
  }),

  // ————— Route GET —————
  lesson({
    id: 'EXPRESS-F-002-LESSON',
    slug: 'route-get-express',
    title: 'Une route GET',
    shortTitle: 'Route GET',
    technology: 'express',
    tomeId: 't12',
    summary: 'Répondre à une requête de lecture avec app.get et res.json.',
    utility: 'Exposer des données à lire.',
    aliases: ['get', 'route', 'app.get', 'endpoint', 'api', 'lire', 'res.json', 'res.send'],
    keywords: ['route get', 'renvoyer donnees', 'res.json', 'endpoint'],
    relatedContentIds: ['EXPRESS-F-001-LESSON', 'EXPRESS-F-003-LESSON'],
    templateId: 'EXPRESS-F-002-TEMPLATE',
    intro:
      'Une route <b>GET</b> répond aux requêtes de lecture. Selon ce qu’on renvoie, on utilise <code>res.json(...)</code> (des données), <code>res.send(...)</code> (du texte) ou <code>res.status(...)</code> (un code).',
    sections: [
      {
        id: 's1',
        title: 'app.get + res.json',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'express-get-c1',
              filename: 'server.js',
              language: 'javascript',
              code: `app.get("/api/users", (req, res) => {
  const users = [{ id: 1, nom: "Alice" }];
  res.json(users);
});`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> GET = consulter le menu du restaurant. Tu lis, tu ne changes rien.',
          },
        ],
      },
    ],
    takeaways: [
      '<code>app.get("/chemin", (req, res) =&gt; res.json(data))</code>',
      '<code>res.json</code> = données · <code>res.send</code> = texte · <code>res.status</code> = code',
    ],
  }),
  template({
    id: 'EXPRESS-F-002-TEMPLATE',
    slug: 'route-get-express',
    title: 'Route GET',
    technology: 'express',
    tomeId: 't12',
    summary: 'Route GET Express, plusieurs façons de répondre.',
    lede: 'Répondre à une lecture. Choisis la façon de répondre :',
    aliases: ['get', 'route', 'res.json', 'res.send', 'res.status', 'params'],
    keywords: ['endpoint'],
    relatedContentIds: ['EXPRESS-F-001-TEMPLATE'],
    lessonId: 'EXPRESS-F-002-LESSON',
    variants: [
      {
        id: 'json',
        label: 'res.json (données)',
        codeBlocks: [
          {
            id: 'express-get-t-json',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/api/CHEMIN", (req, res) => {
  res.json(donnees); // renvoie du JSON
});`,
          },
        ],
        replacements: [
          { token: '/api/CHEMIN', description: 'l’URL de ta ressource' },
          { token: 'donnees', description: 'un tableau ou un objet' },
        ],
        placement: 'Le cas normal d’une API : renvoyer des données JSON.',
      },
      {
        id: 'send',
        label: 'res.send (texte)',
        codeBlocks: [
          {
            id: 'express-get-t-send',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API"); // texte ou HTML
});`,
          },
        ],
        replacements: [{ token: 'Bienvenue sur l\'API', description: 'le texte à renvoyer' }],
        placement: 'Pour renvoyer du texte simple ou du HTML.',
      },
      {
        id: 'status',
        label: 'res.status (code)',
        codeBlocks: [
          {
            id: 'express-get-t-status',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/api/user/:id", (req, res) => {
  const user = trouver(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Introuvable" });
  }
  res.json(user);
});`,
          },
        ],
        replacements: [
          { token: 'trouver(req.params.id)', description: 'ta recherche de la ressource' },
        ],
        placement: 'On combine un code HTTP (404, 201…) avec .json().',
      },
      {
        id: 'params',
        label: 'Avec paramètre :id',
        codeBlocks: [
          {
            id: 'express-get-t-params',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/api/produits/:id", (req, res) => {
  const id = req.params.id;   // partie dynamique de l'URL
  res.json({ id });
});

// Query string : /api/produits?tri=prix
// req.query.tri`,
          },
        ],
        replacements: [{ token: 'produits', description: 'ta ressource' }],
        placement: '<code>req.params</code> pour :id, <code>req.query</code> pour ?clé=valeur.',
      },
    ],
  }),

  // ————— Route POST —————
  lesson({
    id: 'EXPRESS-F-003-LESSON',
    slug: 'route-post-express',
    title: 'Une route POST',
    shortTitle: 'Route POST',
    technology: 'express',
    tomeId: 't12',
    summary: 'Recevoir des données envoyées par le client dans req.body et créer une ressource.',
    utility: 'Créer une ressource à partir de données reçues.',
    aliases: ['post', 'creer', 'body', 'app.post', 'envoyer'],
    keywords: ['route post', 'req.body', 'creer donnee', 'recevoir'],
    relatedContentIds: ['EXPRESS-F-002-LESSON', 'SQL-F-005-LESSON'],
    templateId: 'EXPRESS-F-003-TEMPLATE',
    intro:
      'Une route <b>POST</b> reçoit des données dans <code>req.body</code> (grâce à <code>express.json()</code>) pour créer quelque chose, puis renvoie une réponse.',
    sections: [
      {
        id: 's1',
        title: 'app.post + req.body',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'express-post-c1',
              filename: 'server.js',
              language: 'javascript',
              code: `app.post("/api/users", (req, res) => {
  const { nom } = req.body;
  // ... enregistrer en base
  res.status(201).json({ id: 1, nom });
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Réponds avec <code>res.status(201)</code> (créé) et l’objet créé. Sans <code>express.json()</code>, <code>req.body</code> est vide.',
          },
        ],
      },
    ],
    takeaways: [
      '<code>app.post(...)</code> lit <code>req.body</code>',
      'répond <code>res.status(201).json(...)</code>',
    ],
  }),
  template({
    id: 'EXPRESS-F-003-TEMPLATE',
    slug: 'route-post-express',
    title: 'Route POST',
    technology: 'express',
    tomeId: 't12',
    summary: 'Route POST Express.',
    lede: 'Recevoir et créer. Choisis le cas :',
    aliases: ['post', 'body', 'validation'],
    keywords: ['creer'],
    relatedContentIds: ['EXPRESS-F-002-TEMPLATE'],
    lessonId: 'EXPRESS-F-003-LESSON',
    variants: [
      {
        id: 'base',
        label: 'Créer',
        codeBlocks: [
          {
            id: 'express-post-t-base',
            filename: 'server.js',
            language: 'javascript',
            code: `app.post("/api/CHEMIN", (req, res) => {
  const { champ } = req.body;
  res.status(201).json({ champ });
});`,
          },
        ],
        replacements: [
          { token: '/api/CHEMIN', description: 'l’URL de création' },
          { token: 'champ', description: 'les données attendues dans le body' },
        ],
        placement: 'Nécessite app.use(express.json()) plus haut.',
      },
      {
        id: 'validation',
        label: 'Avec validation',
        codeBlocks: [
          {
            id: 'express-post-t-valid',
            filename: 'server.js',
            language: 'javascript',
            code: `app.post("/api/users", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email requis" });
  }
  res.status(201).json({ email });
});`,
          },
        ],
        replacements: [{ token: 'email', description: 'le champ à vérifier' }],
        placement: 'On vérifie le body et on renvoie 400 si invalide.',
      },
      {
        id: 'async',
        label: 'Avec base (async)',
        codeBlocks: [
          {
            id: 'express-post-t-async',
            filename: 'server.js',
            language: 'javascript',
            code: `app.post("/api/users", async (req, res) => {
  try {
    const { nom } = req.body;
    const result = await db.query(
      "INSERT INTO users (nom) VALUES (?)",
      [nom]
    );
    res.status(201).json({ id: result.insertId, nom });
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});`,
          },
        ],
        replacements: [
          { token: 'db.query', description: 'ta connexion à la base' },
          { token: 'users / nom', description: 'ta table et ses colonnes' },
        ],
        placement: 'Enregistre en base avec une requête préparée (le ?).',
      },
    ],
  }),

  // ————— SELECT —————
  lesson({
    id: 'SQL-F-006-LESSON',
    slug: 'select',
    title: 'SELECT',
    shortTitle: 'SELECT',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Lire des lignes dans une table SQL, avec les colonnes voulues.',
    utility: 'Récupérer des données en base.',
    aliases: ['select', 'lire', 'requete', 'from', 'recuperer'],
    keywords: ['lire donnees sql', 'requete select', 'colonnes', 'from table'],
    relatedContentIds: ['SQL-F-009-LESSON', 'EXPRESS-F-002-LESSON'],
    templateId: 'SQL-F-006-TEMPLATE',
    intro:
      '<code>SELECT</code> lit des lignes. On choisit les <b>colonnes</b> puis la <b>table</b> avec <code>FROM</code>. <code>*</code> = toutes les colonnes.',
    sections: [
      {
        id: 's1',
        title: 'SELECT ... FROM ...',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'sql-select-c1',
              filename: 'requete.sql',
              language: 'sql',
              code: `-- Toutes les colonnes
SELECT * FROM users;

-- Colonnes precises
SELECT id, nom FROM users;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'En production, évite <code>SELECT *</code> : nomme les colonnes dont tu as besoin (plus clair, plus rapide).',
          },
        ],
      },
    ],
    takeaways: [
      '<code>SELECT colonnes FROM table;</code>',
      '<code>*</code> = toutes les colonnes',
    ],
  }),
  template({
    id: 'SQL-F-006-TEMPLATE',
    slug: 'select',
    title: 'SELECT',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Lire des données avec SELECT.',
    lede: 'Lire des lignes. Choisis le cas :',
    aliases: ['select', 'lire', 'where', 'join', 'order by'],
    keywords: ['from'],
    relatedContentIds: ['SQL-F-009-TEMPLATE'],
    lessonId: 'SQL-F-006-LESSON',
    variants: [
      {
        id: 'toutes',
        label: 'Toutes les colonnes',
        codeBlocks: [
          {
            id: 'sql-select-t-all',
            filename: 'requete.sql',
            language: 'sql',
            code: `SELECT * FROM ma_table;`,
          },
        ],
        replacements: [{ token: 'ma_table', description: 'le nom de ta table' }],
        placement: 'Rapide pour tester. En prod, préfère nommer les colonnes.',
      },
      {
        id: 'colonnes',
        label: 'Colonnes précises',
        codeBlocks: [
          {
            id: 'sql-select-t-cols',
            filename: 'requete.sql',
            language: 'sql',
            code: `SELECT id, nom, email
FROM ma_table;`,
          },
        ],
        replacements: [
          { token: 'id, nom, email', description: 'les colonnes à lire' },
          { token: 'ma_table', description: 'ta table' },
        ],
        placement: 'Recommandé : ne lis que ce dont tu as besoin.',
      },
      {
        id: 'where',
        label: 'Avec condition',
        codeBlocks: [
          {
            id: 'sql-select-t-where',
            filename: 'requete.sql',
            language: 'sql',
            code: `SELECT * FROM ma_table
WHERE colonne = valeur
ORDER BY date DESC
LIMIT 10;`,
          },
        ],
        replacements: [
          { token: 'colonne = valeur', description: 'ton filtre' },
        ],
        placement: 'WHERE filtre, ORDER BY trie, LIMIT limite.',
      },
      {
        id: 'join',
        label: 'Avec jointure',
        codeBlocks: [
          {
            id: 'sql-select-t-join',
            filename: 'requete.sql',
            language: 'sql',
            code: `SELECT posts.titre, users.nom
FROM posts
JOIN users ON users.id = posts.user_id;`,
          },
        ],
        replacements: [
          { token: 'posts / users', description: 'les deux tables' },
          { token: 'posts.user_id', description: 'la clé étrangère qui les relie' },
        ],
        placement: 'Pour combiner deux tables reliées (ex. posts + auteurs).',
      },
    ],
  }),

  // ————— INSERT —————
  lesson({
    id: 'SQL-F-005-LESSON',
    slug: 'insert',
    title: 'INSERT',
    shortTitle: 'INSERT',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Ajouter une nouvelle ligne dans une table avec INSERT INTO ... VALUES.',
    utility: 'Créer une donnée en base.',
    aliases: ['insert', 'inserer', 'ajouter', 'values', 'creer ligne'],
    keywords: ['ajouter ligne sql', 'insert into', 'creer donnee'],
    relatedContentIds: ['SQL-F-006-LESSON', 'EXPRESS-F-003-LESSON'],
    templateId: 'SQL-F-005-TEMPLATE',
    intro:
      '<code>INSERT INTO</code> ajoute une ligne : on liste les <b>colonnes</b> puis les <b>valeurs</b> correspondantes.',
    sections: [
      {
        id: 's1',
        title: 'INSERT INTO ... VALUES ...',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'sql-insert-c1',
              filename: 'requete.sql',
              language: 'sql',
              code: `INSERT INTO users (nom, email)
VALUES ('Alice', 'alice@mail.com');`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Depuis Express, n’injecte jamais les valeurs à la main : utilise des <b>requêtes préparées</b> (des <code>?</code>) pour éviter les injections SQL.',
          },
        ],
      },
    ],
    takeaways: [
      '<code>INSERT INTO table (col1, col2) VALUES (v1, v2);</code>',
      'côté serveur : requêtes préparées obligatoires',
    ],
  }),
  template({
    id: 'SQL-F-005-TEMPLATE',
    slug: 'insert',
    title: 'INSERT',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Ajouter une ligne avec INSERT.',
    lede: 'Insérer une donnée. Choisis le cas :',
    aliases: ['insert', 'ajouter', 'requete preparee'],
    keywords: ['values'],
    relatedContentIds: ['SQL-F-006-TEMPLATE'],
    lessonId: 'SQL-F-005-LESSON',
    variants: [
      {
        id: 'sql',
        label: 'SQL pur',
        codeBlocks: [
          {
            id: 'sql-insert-t-sql',
            filename: 'requete.sql',
            language: 'sql',
            code: `INSERT INTO ma_table (colonne1, colonne2)
VALUES (valeur1, valeur2);`,
          },
        ],
        replacements: [
          { token: 'ma_table', description: 'ta table' },
          { token: 'colonne1, colonne2', description: 'les colonnes à remplir' },
          { token: 'valeur1, valeur2', description: 'les valeurs' },
        ],
        placement: 'Dans un client SQL directement.',
      },
      {
        id: 'preparee',
        label: 'Requête préparée (Node)',
        codeBlocks: [
          {
            id: 'sql-insert-t-prep',
            filename: 'server.js',
            language: 'javascript',
            code: `await db.query(
  "INSERT INTO users (nom, email) VALUES (?, ?)",
  [nom, email]
);`,
          },
        ],
        replacements: [
          { token: 'users / nom, email', description: 'ta table et ses colonnes' },
          { token: '[nom, email]', description: 'les valeurs (à la place des ?)' },
        ],
        placement: 'Depuis Express : les <code>?</code> protègent des injections SQL.',
      },
    ],
  }),

  // ————— WHERE —————
  lesson({
    id: 'SQL-F-009-LESSON',
    slug: 'where',
    title: 'WHERE',
    shortTitle: 'WHERE',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Filtrer les lignes d’une requête selon une condition.',
    utility: 'Ne récupérer/modifier que les lignes voulues.',
    aliases: ['where', 'filtrer', 'condition', 'clause'],
    keywords: ['filtrer lignes sql', 'condition where', 'and or'],
    relatedContentIds: ['SQL-F-006-LESSON'],
    templateId: 'SQL-F-009-TEMPLATE',
    intro:
      '<code>WHERE</code> filtre les lignes concernées par une condition. Indispensable avec <code>SELECT</code>, <code>UPDATE</code> et <code>DELETE</code>.',
    sections: [
      {
        id: 's1',
        title: 'Filtrer avec une condition',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'sql-where-c1',
              filename: 'requete.sql',
              language: 'sql',
              code: `SELECT * FROM users
WHERE age >= 18;

-- Plusieurs conditions
SELECT * FROM users
WHERE actif = 1 AND ville = 'Paris';`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Attention :</b> un <code>UPDATE</code> ou <code>DELETE</code> <b>sans</b> <code>WHERE</code> touche <b>toutes</b> les lignes.',
          },
        ],
      },
    ],
    takeaways: [
      '<code>... WHERE condition;</code>',
      'combine avec <code>AND</code> / <code>OR</code> · jamais de DELETE sans WHERE',
    ],
  }),
  template({
    id: 'SQL-F-009-TEMPLATE',
    slug: 'where',
    title: 'WHERE',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Filtrer avec WHERE.',
    lede: 'Filtrer des lignes. Choisis le cas :',
    aliases: ['where', 'condition', 'and', 'or', 'like'],
    keywords: ['filtrer'],
    relatedContentIds: ['SQL-F-006-TEMPLATE'],
    lessonId: 'SQL-F-009-LESSON',
    variants: [
      {
        id: 'simple',
        label: 'Simple',
        codeBlocks: [
          {
            id: 'sql-where-t-simple',
            filename: 'requete.sql',
            language: 'sql',
            code: `SELECT * FROM ma_table
WHERE colonne = valeur;`,
          },
        ],
        replacements: [
          { token: 'colonne = valeur', description: 'ta condition' },
        ],
        placement: 'Une seule condition.',
      },
      {
        id: 'andor',
        label: 'AND / OR',
        codeBlocks: [
          {
            id: 'sql-where-t-andor',
            filename: 'requete.sql',
            language: 'sql',
            code: `SELECT * FROM users
WHERE actif = 1 AND ville = 'Paris';

SELECT * FROM users
WHERE ville = 'Paris' OR ville = 'Lyon';`,
          },
        ],
        replacements: [{ token: 'actif / ville', description: 'tes colonnes et valeurs' }],
        placement: 'AND = les deux · OR = l’une ou l’autre.',
      },
      {
        id: 'like',
        label: 'Recherche (LIKE)',
        codeBlocks: [
          {
            id: 'sql-where-t-like',
            filename: 'requete.sql',
            language: 'sql',
            code: `SELECT * FROM produits
WHERE nom LIKE '%chaise%'; -- contient "chaise"`,
          },
        ],
        replacements: [
          { token: 'nom', description: 'la colonne texte' },
          { token: 'chaise', description: 'le mot cherché' },
        ],
        placement: '<code>%</code> = n’importe quoi. Pour une recherche partielle.',
      },
      {
        id: 'in',
        label: 'Plusieurs valeurs (IN)',
        codeBlocks: [
          {
            id: 'sql-where-t-in',
            filename: 'requete.sql',
            language: 'sql',
            code: `SELECT * FROM users
WHERE ville IN ('Paris', 'Lyon', 'Nice');`,
          },
        ],
        replacements: [
          { token: 'ville', description: 'ta colonne' },
          { token: "'Paris', 'Lyon', 'Nice'", description: 'les valeurs acceptées' },
        ],
        placement: 'IN = la valeur est dans cette liste (plus court que des OR).',
      },
    ],
  }),
];
