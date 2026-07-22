import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const sql2Content: ReadyContent[] = [
  // ————— JOIN —————
  lesson({
    id: 'SQL-F-1107-LESSON',
    slug: 'join',
    title: 'JOIN',
    shortTitle: 'JOIN',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Combiner les lignes de deux tables reliées en une seule requête, pour lire d’un coup une donnée et tout ce qui lui est rattaché.',
    utility: 'Lire ensemble des données réparties dans deux tables reliées.',
    aliases: ['join', 'jointure', 'inner join', 'left join', 'relier deux tables', 'on'],
    keywords: [
      'combiner deux tables',
      'recuperer le nom de l auteur',
      'jointure',
      'inner join',
      'left join',
      'clause on',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1107-TEMPLATE',
    intro:
      'Un <b>JOIN</b> combine les lignes de <b>deux tables</b> en fonction d’une colonne commune. Tu écris <code>JOIN</code> pour nommer la deuxième table, puis <code>ON</code> pour dire <b>comment</b> les lignes se correspondent.',
    sections: [
      {
        id: 's1',
        title: 'Relier deux tables avec INNER JOIN',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher la liste des articles avec le nom de leur auteur</b>, alors que les articles sont dans une table et les auteurs dans une autre.',
          },
          {
            type: 'paragraph',
            html: 'Chaque article stocke seulement un <code>author_id</code>. Pour obtenir le <b>nom</b>, on relie la table <code>articles</code> à la table <code>users</code> là où <code>articles.author_id</code> correspond à <code>users.id</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1107-l-c1',
              filename: 'requete.sql',
              language: 'sql',
              code: `-- On lit dans les deux tables a la fois
SELECT articles.titre, users.nom
FROM articles
-- On relie users sur la colonne commune
JOIN users ON articles.author_id = users.id;

-- Resultat : chaque ligne = un article + le nom de son auteur`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> après <code>JOIN</code>, la clause <code>ON</code> indique la <b>condition de correspondance</b> entre les deux tables. C’est presque toujours <code>tableA.cle_etrangere = tableB.id</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'INNER JOIN vs LEFT JOIN',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un <code>INNER JOIN</code> (le <code>JOIN</code> par défaut) ne garde <b>que les lignes qui ont une correspondance</b>. Un <code>LEFT JOIN</code> garde <b>toutes</b> les lignes de la table de gauche, même sans correspondance (les colonnes de droite valent alors <code>NULL</code>).',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1107-l-c2',
              filename: 'requete.sql',
              language: 'sql',
              code: `-- INNER JOIN : seulement les articles QUI ONT un auteur
SELECT articles.titre, users.nom
FROM articles
INNER JOIN users ON articles.author_id = users.id;

-- LEFT JOIN : TOUS les articles, meme sans auteur
SELECT articles.titre, users.nom
FROM articles
LEFT JOIN users ON articles.author_id = users.id;
-- users.nom vaut NULL quand l article n a pas d auteur`,
            },
          },
          {
            type: 'table',
            headers: ['Type de JOIN', 'Ce qu’il garde'],
            rows: [
              ['<code>INNER JOIN</code>', 'seulement les lignes qui ont une correspondance dans les 2 tables'],
              ['<code>LEFT JOIN</code>', 'toutes les lignes de gauche + celles qui matchent à droite'],
              ['<code>RIGHT JOIN</code>', 'toutes les lignes de droite + celles qui matchent à gauche'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Les alias pour raccourcir',
        blocks: [
          {
            type: 'paragraph',
            html: 'Répéter <code>articles.</code> et <code>users.</code> devient vite lourd. On donne un <b>alias</b> court à chaque table avec <code>AS</code> (ou juste un espace), puis on l’utilise partout.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1107-l-c3',
              filename: 'requete.sql',
              language: 'sql',
              code: `-- a = articles, u = users
SELECT a.titre, u.nom
FROM articles AS a
JOIN users AS u ON a.author_id = u.id
WHERE u.nom = 'Alice';

-- Plus court a lire, surtout avec plusieurs JOIN`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un <code>JOIN</code>, c’est agrafer deux fiches ensemble. La clause <code>ON</code> dit sur quel <b>numéro commun</b> agrafer : le <code>author_id</code> de la fiche article doit coller à l’<code>id</code> de la fiche auteur.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier la clause <code>ON</code> : la base combine <b>chaque ligne avec chaque ligne</b> (produit cartésien) et renvoie un résultat énorme et faux.',
      'Attendre toutes les lignes avec un <code>INNER JOIN</code> : celles sans correspondance <b>disparaissent</b>. Utilise <code>LEFT JOIN</code> si tu veux tout garder.',
      'Colonnes ambiguës : si les deux tables ont une colonne <code>id</code>, préfixe toujours (<code>users.id</code>) sinon la base ne sait pas laquelle tu veux.',
    ],
    takeaways: [
      '<code>JOIN autre_table ON tableA.cle = tableB.id</code> = relier deux tables sur une colonne commune',
      '<code>INNER JOIN</code> = seulement les correspondances · <code>LEFT JOIN</code> = tout garder à gauche',
      'la clause <code>ON</code> est <b>obligatoire</b> : elle dit comment les lignes se correspondent',
      'alias avec <code>AS</code> pour raccourcir : <code>FROM articles AS a</code>',
    ],
  }),
  template({
    id: 'SQL-F-1107-TEMPLATE',
    slug: 'join',
    title: 'JOIN',
    shortTitle: 'JOIN',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Les jointures SQL prêtes à copier : INNER, LEFT et JOIN sur plusieurs tables.',
    lede: 'Relier des tables. Choisis le type de jointure :',
    aliases: ['join', 'jointure', 'inner join', 'left join'],
    keywords: ['combiner tables', 'on', 'alias'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1107-LESSON',
    variants: [
      {
        id: 'SQL-F-1107-t-inner',
        label: 'INNER JOIN',
        description: 'Ne garde que les lignes qui ont une correspondance dans les deux tables.',
        codeBlocks: [
          {
            id: 'SQL-F-1107-t-c-inner',
            filename: 'requete.sql',
            language: 'sql',
            code: `SELECT a.titre, u.nom
FROM articles AS a
INNER JOIN users AS u ON a.author_id = u.id;`,
          },
        ],
        replacements: [
          { token: 'articles / users', description: 'tes deux tables à relier' },
          { token: 'a.author_id = u.id', description: 'la colonne commune (clé étrangère = clé primaire)' },
          { token: 'a.titre, u.nom', description: 'les colonnes que tu veux afficher' },
        ],
        placement: 'Le cas par défaut : tu ne veux que les lignes reliées des deux côtés.',
      },
      {
        id: 'SQL-F-1107-t-left',
        label: 'LEFT JOIN',
        description: 'Garde toutes les lignes de gauche, même celles sans correspondance.',
        codeBlocks: [
          {
            id: 'SQL-F-1107-t-c-left',
            filename: 'requete.sql',
            language: 'sql',
            code: `SELECT u.nom, a.titre
FROM users AS u
LEFT JOIN articles AS a ON a.author_id = u.id;
-- a.titre vaut NULL pour un user sans article`,
          },
        ],
        replacements: [
          { token: 'users', description: 'la table dont tu veux TOUTES les lignes (la gauche)' },
          { token: 'articles', description: 'la table à rattacher (peut manquer)' },
          { token: 'a.author_id = u.id', description: 'la condition de correspondance' },
        ],
        placement: 'Quand tu veux la liste complète d’un côté (ex. tous les users), même sans données liées.',
      },
      {
        id: 'SQL-F-1107-t-multi',
        label: 'Plusieurs JOIN',
        description: 'Enchaîner les jointures pour traverser trois tables.',
        codeBlocks: [
          {
            id: 'SQL-F-1107-t-c-multi',
            filename: 'requete.sql',
            language: 'sql',
            code: `SELECT a.titre, u.nom, c.nom AS categorie
FROM articles AS a
JOIN users AS u ON a.author_id = u.id
JOIN categories AS c ON a.category_id = c.id;`,
          },
        ],
        replacements: [
          { token: 'categories', description: 'la 3e table à rattacher' },
          { token: 'a.category_id = c.id', description: 'la 2e condition de correspondance' },
        ],
        placement: 'Quand une donnée est répartie sur trois tables : on ajoute un JOIN par table.',
      },
    ],
  }),

  // ————— Clé primaire et clé étrangère —————
  lesson({
    id: 'SQL-F-1108-LESSON',
    slug: 'cle-primaire-et-cle-etrangere',
    title: 'Clé primaire et clé étrangère',
    shortTitle: 'Clés',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Donner à chaque ligne un identifiant unique (clé primaire) et pointer vers une ligne d’une autre table (clé étrangère) pour relier proprement les données.',
    utility: 'Identifier une ligne de façon unique et la relier à une autre table.',
    aliases: ['primary key', 'foreign key', 'cle primaire', 'cle etrangere', 'references', 'auto_increment'],
    keywords: [
      'identifiant unique',
      'relier deux tables',
      'primary key',
      'foreign key',
      'references',
      'integrite',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1108-TEMPLATE',
    intro:
      'Une <b>clé primaire</b> (<code>PRIMARY KEY</code>) identifie chaque ligne de façon <b>unique</b>. Une <b>clé étrangère</b> (<code>FOREIGN KEY</code>) est une colonne qui <b>pointe</b> vers la clé primaire d’une autre table : c’est elle qui crée le lien.',
    sections: [
      {
        id: 's1',
        title: 'La clé primaire : un identifiant unique',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>que chaque utilisateur ait un identifiant unique</b> qui s’attribue tout seul, pour ne jamais confondre deux personnes portant le même nom.',
          },
          {
            type: 'paragraph',
            html: 'On déclare une colonne <code>id</code> en <code>PRIMARY KEY</code>. Avec <code>AUTO_INCREMENT</code>, la base attribue automatiquement un numéro <b>toujours différent</b> à chaque nouvelle ligne.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1108-l-c1',
              filename: 'schema.sql',
              language: 'sql',
              code: `CREATE TABLE users (
  -- identifiant unique, attribue automatiquement
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- id = 1, 2, 3... jamais deux fois le meme`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> presque toutes les tables ont une colonne <code>id</code> en <code>PRIMARY KEY AUTO_INCREMENT</code>. C’est le point d’accroche pour les relations.',
          },
        ],
      },
      {
        id: 's2',
        title: 'La clé étrangère : pointer vers une autre table',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dans la table <code>articles</code>, la colonne <code>author_id</code> stocke l’<code>id</code> d’un utilisateur. On la déclare <code>FOREIGN KEY ... REFERENCES</code> pour dire à la base : « cette valeur doit exister dans <code>users.id</code> ».',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1108-l-c2',
              filename: 'schema.sql',
              language: 'sql',
              code: `CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(200) NOT NULL,
  -- cette colonne pointe vers un user
  author_id INT,
  -- le lien : author_id doit exister dans users.id
  FOREIGN KEY (author_id) REFERENCES users(id)
);`,
            },
          },
          {
            type: 'table',
            headers: ['Notion', 'Rôle', 'Où'],
            rows: [
              ['<code>PRIMARY KEY</code>', 'identifie la ligne de façon unique', 'la table « cible »'],
              ['<code>FOREIGN KEY</code>', 'pointe vers la clé primaire d’une autre table', 'la table « qui référence »'],
              ['<code>REFERENCES</code>', 'précise la table et la colonne visées', 'après la <code>FOREIGN KEY</code>'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'L’intégrité : la base protège tes liens',
        blocks: [
          {
            type: 'paragraph',
            html: 'Grâce à la clé étrangère, la base <b>refuse</b> les liens cassés : impossible d’insérer un article avec un <code>author_id</code> qui n’existe pas, ni de supprimer un user encore référencé (sauf règle explicite).',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1108-l-c3',
              filename: 'requete.sql',
              language: 'sql',
              code: `-- OK : le user 1 existe
INSERT INTO articles (titre, author_id)
VALUES ('Mon premier article', 1);

-- ERREUR : le user 999 n existe pas
INSERT INTO articles (titre, author_id)
VALUES ('Article fantome', 999);
-- La base rejette : la cle etrangere protege les donnees`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> la clé primaire = le <b>numéro de sécurité sociale</b> d’une personne (unique). La clé étrangère = ce même numéro <b>recopié</b> sur un dossier pour dire à qui il appartient.',
          },
        ],
      },
    ],
    pitfalls: [
      'Confondre les deux : la <b>clé primaire</b> est dans la table cible, la <b>clé étrangère</b> est la copie qui pointe vers elle depuis une autre table.',
      'Oublier <code>AUTO_INCREMENT</code> : sans lui, tu dois fournir un <code>id</code> unique à la main à chaque insertion.',
      'Types incompatibles : la clé étrangère doit avoir le <b>même type</b> que la clé primaire visée (<code>INT</code> ↔ <code>INT</code>), sinon la relation est refusée.',
    ],
    takeaways: [
      '<code>PRIMARY KEY</code> = identifiant unique de la ligne (souvent <code>id INT AUTO_INCREMENT</code>)',
      '<code>FOREIGN KEY (col) REFERENCES autre_table(id)</code> = crée le lien vers une autre table',
      'la clé étrangère doit avoir le <b>même type</b> que la clé primaire visée',
      'la base garantit l’<b>intégrité</b> : pas de lien vers une ligne inexistante',
    ],
  }),
  template({
    id: 'SQL-F-1108-TEMPLATE',
    slug: 'cle-primaire-et-cle-etrangere',
    title: 'Clé primaire et clé étrangère',
    shortTitle: 'Clés',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Déclarer une clé primaire et une clé étrangère : à la création ou sur une table existante.',
    lede: 'Identifier et relier. Choisis le cas :',
    aliases: ['primary key', 'foreign key', 'cle primaire', 'cle etrangere'],
    keywords: ['auto_increment', 'references', 'alter table'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1108-LESSON',
    variants: [
      {
        id: 'SQL-F-1108-t-primary',
        label: 'Clé primaire',
        description: 'Une colonne id unique qui s’attribue automatiquement.',
        codeBlocks: [
          {
            id: 'SQL-F-1108-t-c-primary',
            filename: 'schema.sql',
            language: 'sql',
            code: `CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL
);`,
          },
        ],
        replacements: [
          { token: 'users', description: 'le nom de ta table' },
          { token: 'nom VARCHAR(100)', description: 'tes autres colonnes' },
        ],
        placement: 'À la création de la table : la colonne id devient l’identifiant unique.',
      },
      {
        id: 'SQL-F-1108-t-foreign',
        label: 'Clé étrangère',
        description: 'Une colonne qui pointe vers la clé primaire d’une autre table.',
        codeBlocks: [
          {
            id: 'SQL-F-1108-t-c-foreign',
            filename: 'schema.sql',
            language: 'sql',
            code: `CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(200) NOT NULL,
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES users(id)
);`,
          },
        ],
        replacements: [
          { token: 'author_id', description: 'la colonne qui stocke l’id de l’autre table' },
          { token: 'users(id)', description: 'la table et la colonne visées (la clé primaire)' },
        ],
        placement: 'À la création : author_id devra toujours correspondre à un users.id existant.',
      },
      {
        id: 'SQL-F-1108-t-alter',
        label: 'Sur une table existante',
        description: 'Ajouter une clé étrangère après coup avec ALTER TABLE.',
        codeBlocks: [
          {
            id: 'SQL-F-1108-t-c-alter',
            filename: 'migration.sql',
            language: 'sql',
            code: `ALTER TABLE articles
ADD FOREIGN KEY (author_id) REFERENCES users(id);`,
          },
        ],
        replacements: [
          { token: 'articles', description: 'la table à modifier' },
          { token: 'author_id', description: 'la colonne déjà existante à transformer en clé étrangère' },
          { token: 'users(id)', description: 'la table et la colonne visées' },
        ],
        placement: 'Quand la table existe déjà et que tu ajoutes le lien plus tard.',
      },
    ],
  }),

  // ————— Les relations : 1-1, 1-N et N-N —————
  lesson({
    id: 'SQL-F-1109-LESSON',
    slug: 'les-relations-1-1-1-n-et-n-n',
    title: 'Les relations : 1-1, 1-N et N-N',
    shortTitle: 'Relations',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Choisir la bonne structure de tables selon le lien entre les données : un-à-un, un-à-plusieurs ou plusieurs-à-plusieurs.',
    utility: 'Structurer ses tables selon le type de lien entre les données.',
    aliases: ['relations', 'one to one', 'one to many', 'many to many', '1-n', 'n-n', 'table de liaison'],
    keywords: [
      'un a plusieurs',
      'plusieurs a plusieurs',
      'table de liaison',
      'modeliser',
      'ou mettre la cle etrangere',
      'relation',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1109-TEMPLATE',
    intro:
      'Trois types de relations relient tes tables : <b>1-1</b> (un-à-un), <b>1-N</b> (un-à-plusieurs) et <b>N-N</b> (plusieurs-à-plusieurs). Le type décide <b>où placer la clé étrangère</b>, et si une <b>table de liaison</b> est nécessaire.',
    sections: [
      {
        id: 's1',
        title: '1-N : un-à-plusieurs (le cas le plus courant)',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux modéliser qu’<b>un auteur peut écrire plusieurs articles</b>, mais qu’un article n’a qu’un seul auteur.',
          },
          {
            type: 'paragraph',
            html: 'Règle d’or : la clé étrangère se met <b>du côté « plusieurs »</b>. Ici chaque article pointe vers son auteur, donc <code>author_id</code> va dans la table <code>articles</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1109-l-c1',
              filename: 'schema.sql',
              language: 'sql',
              code: `-- Le cote "un"
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100)
);

-- Le cote "plusieurs" porte la cle etrangere
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(200),
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES users(id)
);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Réflexe 1-N :</b> la clé étrangère va <b>toujours du côté « plusieurs »</b>. Un article = un auteur, un auteur = plusieurs articles → <code>author_id</code> dans <code>articles</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'N-N : plusieurs-à-plusieurs (table de liaison)',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux qu’<b>un article puisse avoir plusieurs tags</b>, et qu’<b>un tag puisse concerner plusieurs articles</b>.',
          },
          {
            type: 'paragraph',
            html: 'Impossible de poser une simple clé étrangère des deux côtés. On crée une <b>table de liaison</b> intermédiaire qui contient une clé étrangère vers <b>chacune</b> des deux tables.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1109-l-c2',
              filename: 'schema.sql',
              language: 'sql',
              code: `-- La table de liaison relie articles et tags
CREATE TABLE article_tags (
  article_id INT,
  tag_id INT,
  -- un couple (article, tag) ne peut exister qu une fois
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- Chaque ligne = un lien entre 1 article et 1 tag`,
            },
          },
          {
            type: 'table',
            headers: ['Relation', 'Où va la clé étrangère ?', 'Exemple'],
            rows: [
              ['1-1', 'd’un côté ou l’autre (souvent avec <code>UNIQUE</code>)', 'un user ↔ un profil'],
              ['1-N', 'du côté « plusieurs »', 'un user → plusieurs articles'],
              ['N-N', 'dans une <b>table de liaison</b> dédiée', 'articles ↔ tags'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: '1-1 : un-à-un',
        blocks: [
          {
            type: 'paragraph',
            html: 'Plus rare : une ligne d’un côté correspond à <b>une seule</b> ligne de l’autre. On met la clé étrangère d’un côté et on la marque <code>UNIQUE</code> pour interdire les doublons.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1109-l-c3',
              filename: 'schema.sql',
              language: 'sql',
              code: `-- Chaque user a AU PLUS un profil
CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bio TEXT,
  user_id INT UNIQUE, -- UNIQUE garantit le 1-1
  FOREIGN KEY (user_id) REFERENCES users(id)
);`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> 1-N = un parent et ses enfants (chaque enfant a un seul parent). N-N = des acteurs et des films : chacun en a plusieurs — il faut un <b>carnet de liaison</b> pour noter qui joue dans quoi.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre la clé étrangère du <b>mauvais côté</b> en 1-N : elle va toujours du côté « plusieurs » (dans <code>articles</code>, pas dans <code>users</code>).',
      'Tenter un N-N sans <b>table de liaison</b> : deux clés étrangères directes ne suffisent pas, il faut une table intermédiaire.',
      'Oublier <code>UNIQUE</code> sur une relation 1-1 : sans lui, rien n’empêche plusieurs lignes de pointer vers la même, et tu retombes en 1-N.',
    ],
    takeaways: [
      '<b>1-N</b> = clé étrangère du côté « plusieurs » (le cas le plus fréquent)',
      '<b>N-N</b> = une <b>table de liaison</b> avec une clé étrangère vers chaque table',
      '<b>1-1</b> = clé étrangère d’un côté + contrainte <code>UNIQUE</code>',
      'la question à se poser : « une ligne d’ici correspond à combien de lignes là-bas ? »',
    ],
  }),
  template({
    id: 'SQL-F-1109-TEMPLATE',
    slug: 'les-relations-1-1-1-n-et-n-n',
    title: 'Relations 1-1, 1-N, N-N',
    shortTitle: 'Relations',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Le schéma de tables prêt à copier selon le type de relation : 1-N, N-N ou 1-1.',
    lede: 'Structurer une relation. Choisis le type :',
    aliases: ['relations', 'one to many', 'many to many', 'table de liaison'],
    keywords: ['1-n', 'n-n', '1-1', 'foreign key'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1109-LESSON',
    variants: [
      {
        id: 'SQL-F-1109-t-onemany',
        label: '1-N (un-à-plusieurs)',
        description: 'Un parent, plusieurs enfants. La clé étrangère va du côté « plusieurs ».',
        codeBlocks: [
          {
            id: 'SQL-F-1109-t-c-onemany',
            filename: 'schema.sql',
            language: 'sql',
            code: `CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(200),
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES users(id)
);`,
          },
        ],
        replacements: [
          { token: 'articles', description: 'la table du côté « plusieurs »' },
          { token: 'author_id', description: 'la clé étrangère vers le côté « un »' },
          { token: 'users(id)', description: 'la table du côté « un »' },
        ],
        placement: 'Le cas le plus courant : un user a plusieurs articles, un article a un seul auteur.',
      },
      {
        id: 'SQL-F-1109-t-manymany',
        label: 'N-N (plusieurs-à-plusieurs)',
        description: 'Une table de liaison dédiée avec deux clés étrangères.',
        codeBlocks: [
          {
            id: 'SQL-F-1109-t-c-manymany',
            filename: 'schema.sql',
            language: 'sql',
            code: `CREATE TABLE article_tags (
  article_id INT,
  tag_id INT,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);`,
          },
        ],
        replacements: [
          { token: 'article_tags', description: 'le nom de ta table de liaison' },
          { token: 'article_id / tag_id', description: 'les deux clés étrangères vers chaque table' },
          { token: 'articles(id) / tags(id)', description: 'les deux tables reliées' },
        ],
        placement: 'Dès que les deux côtés peuvent avoir plusieurs correspondances (articles ↔ tags).',
      },
      {
        id: 'SQL-F-1109-t-oneone',
        label: '1-1 (un-à-un)',
        description: 'Une clé étrangère UNIQUE pour garantir une seule correspondance.',
        codeBlocks: [
          {
            id: 'SQL-F-1109-t-c-oneone',
            filename: 'schema.sql',
            language: 'sql',
            code: `CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bio TEXT,
  user_id INT UNIQUE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);`,
          },
        ],
        replacements: [
          { token: 'profiles', description: 'la table qui porte la clé étrangère' },
          { token: 'user_id', description: 'la clé étrangère vers l’autre table' },
          { token: 'UNIQUE', description: 'la contrainte qui interdit deux liens vers la même ligne' },
        ],
        placement: 'Quand chaque ligne correspond à au plus une ligne de l’autre table (user ↔ profil).',
      },
    ],
  }),

  // ————— Connecter Express à MySQL —————
  lesson({
    id: 'SQL-F-1110-LESSON',
    slug: 'connecter-express-a-mysql',
    title: 'Connecter Express à MySQL',
    shortTitle: 'Express + MySQL',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Brancher un serveur Express sur une base MySQL avec mysql2 pour exécuter des requêtes SQL depuis une route et renvoyer les données en JSON.',
    utility: 'Exécuter des requêtes SQL depuis un serveur Express et renvoyer du JSON.',
    aliases: ['mysql2', 'connexion base', 'pool', 'express mysql', 'createPool', 'query'],
    keywords: [
      'connecter express a mysql',
      'mysql2',
      'pool de connexions',
      'requete depuis une route',
      'requete parametree',
      'variables d environnement',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1110-TEMPLATE',
    intro:
      'Pour parler à MySQL depuis Express, on installe le paquet <b>mysql2</b>, on crée un <b>pool de connexions</b>, puis on appelle <code>pool.query(...)</code> dans nos routes. Le résultat SQL revient en tableau, prêt à renvoyer en <b>JSON</b>.',
    sections: [
      {
        id: 's1',
        title: 'Installer et créer la connexion',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>que mon API Express lise les utilisateurs stockés dans ma base MySQL</b> et les renvoie au front en JSON.',
          },
          {
            type: 'paragraph',
            html: 'D’abord on installe <code>mysql2</code>. Puis on crée un <b>pool</b> (un ensemble de connexions réutilisables) avec la version <code>/promise</code>, pour pouvoir utiliser <code>await</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1110-l-c1',
              filename: 'terminal.sh',
              language: 'bash',
              code: `# Installer le driver MySQL pour Node
npm install mysql2`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1110-l-c2',
              filename: 'db.js',
              language: 'javascript',
              code: `// On importe la version promise pour utiliser await
const mysql = require('mysql2/promise');

// Un pool = des connexions reutilisables (mieux qu une seule)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'motdepasse',
  database: 'ma_base',
});

// On exporte le pool pour l utiliser dans les routes
module.exports = pool;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> un <b>pool</b> (<code>createPool</code>) plutôt qu’une connexion unique. Il gère plusieurs requêtes en parallèle et se reconnecte tout seul.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Requêter depuis une route',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>pool.query(...)</code> renvoie une <b>promesse</b>. On la <code>await</code> et on déstructure : le <b>premier</b> élément (<code>rows</code>) contient les lignes trouvées, qu’on renvoie en JSON.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1110-l-c3',
              filename: 'server.js',
              language: 'javascript',
              code: `const express = require('express');
const pool = require('./db');
const app = express();

// GET /users : renvoie tous les utilisateurs
app.get('/users', async (req, res) => {
  // rows = les lignes retournees par la requete
  const [rows] = await pool.query('SELECT * FROM users');
  res.json(rows); // on renvoie le tableau en JSON
});

app.listen(3000);`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le pool est une <b>rangée de guichets ouverts</b>. Chaque requête prend un guichet libre, l’utilise, puis le rend — au lieu de rouvrir un guichet à chaque fois.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Requête paramétrée (données du client)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Quand la requête dépend d’une donnée du client (un id, un filtre), <b>ne jamais</b> coller la valeur dans la chaîne SQL. On met un <code>?</code> et on passe la valeur à part : mysql2 l’échappe et bloque les <b>injections SQL</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1110-l-c4',
              filename: 'server.js',
              language: 'javascript',
              code: `// GET /users/42 : un seul utilisateur
app.get('/users/:id', async (req, res) => {
  // Le ? sera remplace de facon SECURISEE par l id
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE id = ?',
    [req.params.id]
  );
  // rows[0] = la premiere (et seule) ligne trouvee
  res.json(rows[0]);
});`,
            },
          },
          {
            type: 'table',
            headers: ['Étape', 'Code'],
            rows: [
              ['Installer', '<code>npm install mysql2</code>'],
              ['Créer le pool', '<code>mysql.createPool({ ... })</code>'],
              ['Requêter', '<code>const [rows] = await pool.query(...)</code>'],
              ['Sécuriser', '<code>WHERE id = ?</code> + <code>[valeur]</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Importer <code>mysql2</code> au lieu de <code>mysql2/promise</code> : sans la version promise, <code>await pool.query(...)</code> ne fonctionne pas.',
      'Oublier de déstructurer : <code>pool.query</code> renvoie <code>[rows, fields]</code>. Écris <code>const [rows] = await ...</code>, pas <code>const rows = await ...</code>.',
      'Concaténer la valeur du client dans le SQL (<code>WHERE id = " + req.params.id</code>) : faille d’<b>injection SQL</b>. Utilise toujours les <code>?</code>.',
      'Mettre le mot de passe en clair dans le code : passe par des <b>variables d’environnement</b> (<code>process.env</code>).',
    ],
    takeaways: [
      'installer : <code>npm install mysql2</code> · importer <code>mysql2/promise</code>',
      'créer un <b>pool</b> : <code>mysql.createPool({ host, user, password, database })</code>',
      'requêter : <code>const [rows] = await pool.query(...)</code> puis <code>res.json(rows)</code>',
      'données du client → toujours des <code>?</code> + un tableau de valeurs (anti-injection)',
    ],
  }),
  template({
    id: 'SQL-F-1110-TEMPLATE',
    slug: 'connecter-express-a-mysql',
    title: 'Connecter Express à MySQL',
    shortTitle: 'Express + MySQL',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Le code prêt à copier pour brancher Express sur MySQL : pool, route de lecture, requête paramétrée.',
    lede: 'Brancher Express sur MySQL. Choisis l’étape :',
    aliases: ['mysql2', 'createPool', 'express mysql', 'pool'],
    keywords: ['connexion', 'query', 'requete parametree'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1110-LESSON',
    variants: [
      {
        id: 'SQL-F-1110-t-pool',
        label: 'Créer le pool',
        description: 'Le fichier de connexion réutilisable, avec variables d’environnement.',
        codeBlocks: [
          {
            id: 'SQL-F-1110-t-c-pool',
            filename: 'db.js',
            language: 'javascript',
            code: `const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;`,
          },
        ],
        replacements: [
          { token: 'process.env.DB_HOST', description: 'l’adresse de la base (souvent localhost)' },
          { token: 'process.env.DB_USER', description: 'l’utilisateur MySQL' },
          { token: 'process.env.DB_NAME', description: 'le nom de ta base de données' },
        ],
        placement: 'Dans un fichier db.js dédié, importé partout où tu as besoin de la base.',
      },
      {
        id: 'SQL-F-1110-t-select',
        label: 'Route de lecture',
        description: 'Une route GET qui renvoie toutes les lignes en JSON.',
        codeBlocks: [
          {
            id: 'SQL-F-1110-t-c-select',
            filename: 'server.js',
            language: 'javascript',
            code: `const pool = require('./db');

app.get('/users', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users');
  res.json(rows);
});`,
          },
        ],
        replacements: [
          { token: '/users', description: 'le chemin de ta route' },
          { token: 'SELECT * FROM users', description: 'ta requête SQL' },
        ],
        placement: 'Pour renvoyer une liste complète. rows est un tableau, directement sérialisable en JSON.',
      },
      {
        id: 'SQL-F-1110-t-param',
        label: 'Requête paramétrée',
        description: 'Insérer une valeur du client en toute sécurité avec des ?.',
        codeBlocks: [
          {
            id: 'SQL-F-1110-t-c-param',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get('/users/:id', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE id = ?',
    [req.params.id]
  );
  res.json(rows[0]);
});`,
          },
        ],
        replacements: [
          { token: 'WHERE id = ?', description: 'ta condition, avec un ? par valeur dynamique' },
          { token: '[req.params.id]', description: 'le tableau des valeurs qui remplacent les ?' },
        ],
        placement: 'Dès qu’une donnée vient du client (id, filtre, recherche). Jamais de concaténation directe.',
      },
    ],
  }),
];
