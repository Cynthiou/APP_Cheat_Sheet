import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const sql1Content: ReadyContent[] = [
  // ————— Installer MySQL —————
  lesson({
    id: 'SQL-F-1100-LESSON',
    slug: 'installer-mysql',
    title: 'Installer MySQL',
    shortTitle: 'Installer MySQL',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Mettre en place un serveur MySQL sur ta machine et t’y connecter en ligne de commande pour commencer à écrire du SQL.',
    utility: 'Avoir une base de données MySQL qui tourne en local pour t’entraîner.',
    aliases: ['installer mysql', 'setup mysql', 'mysql server', 'installation base de donnees', 'mysql local'],
    keywords: [
      'installer une base de donnees',
      'demarrer mysql',
      'se connecter en ligne de commande',
      'mot de passe root',
      'homebrew mysql',
      'apt mysql',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1100-TEMPLATE',
    intro:
      'Pour écrire du <b>SQL</b>, il te faut un <b>serveur de base de données</b> qui tourne. <b>MySQL</b> est l’un des plus répandus. On l’installe, on le démarre, puis on s’y connecte avec la commande <code>mysql</code>.',
    sections: [
      {
        id: 's1',
        title: 'Installer selon ton système',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>installer MySQL sur mon ordinateur</b> pour avoir une base de données à disposition et m’entraîner à écrire des requêtes.',
          },
          {
            type: 'paragraph',
            html: 'La commande d’installation dépend de ton système. Sur <b>macOS</b> on passe par <code>Homebrew</code>, sur <b>Linux</b> par le gestionnaire de paquets <code>apt</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1100-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# macOS (avec Homebrew installe)
brew install mysql        # telecharge et installe MySQL
brew services start mysql # demarre le serveur en tache de fond

# Linux (Debian / Ubuntu)
sudo apt update           # met a jour la liste des paquets
sudo apt install mysql-server
sudo systemctl start mysql # demarre le serveur`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> installer MySQL <b>ne suffit pas</b>, il faut aussi <b>démarrer le serveur</b> (<code>brew services start</code> ou <code>systemctl start</code>). Sans serveur qui tourne, aucune connexion possible.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Se connecter au serveur',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une fois le serveur lancé, on ouvre le <b>client</b> MySQL avec la commande <code>mysql</code>. L’option <code>-u</code> précise l’utilisateur, <code>-p</code> demande le mot de passe.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1100-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# -u root = utilisateur root  ·  -p = demande le mot de passe
mysql -u root -p

# Une fois connecte, l'invite devient : mysql>
# Verifier que tout marche :
mysql> SHOW DATABASES; -- liste les bases existantes
mysql> exit;           -- quitte le client`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Rôle'],
            rows: [
              ['<b>serveur</b>', 'le programme qui stocke les données et tourne en fond'],
              ['<b>client</b> (<code>mysql</code>)', 'l’outil pour envoyer des requêtes au serveur'],
              ['<code>-u root</code>', 'se connecter en tant qu’utilisateur <code>root</code>'],
              ['<code>-p</code>', 'demander le mot de passe à la connexion'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le <b>serveur</b> est la cuisine d’un restaurant (elle prépare et garde les plats), le <b>client</b> <code>mysql</code> est le serveur en salle qui transmet ta commande. Tu ne parles jamais directement à la cuisine.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Sécuriser l’installation',
        blocks: [
          {
            type: 'paragraph',
            html: 'MySQL fournit un script pour définir un mot de passe <code>root</code> et retirer les réglages de test. À lancer une fois après l’installation.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1100-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Assistant de securisation (mot de passe, options par defaut)
mysql_secure_installation

# Il te pose quelques questions :
# - definir un mot de passe root
# - supprimer les utilisateurs anonymes
# - interdire la connexion root a distance
# Reponds "y" (yes) partout si c'est pour t'entrainer en local`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier de <b>démarrer le serveur</b> : la commande <code>mysql</code> répond « Can’t connect » tant que le service n’est pas lancé.',
      'Confondre le <b>client</b> (<code>mysql</code>, l’outil que tu tapes) et le <b>serveur</b> (le service qui tourne en fond) : ce sont deux choses distinctes.',
      'Perdre le <b>mot de passe root</b> défini pendant <code>mysql_secure_installation</code> : note-le, sinon la reconnexion devient galère.',
    ],
    takeaways: [
      'macOS : <code>brew install mysql</code> puis <code>brew services start mysql</code>',
      'Linux : <code>sudo apt install mysql-server</code> puis <code>systemctl start mysql</code>',
      'se connecter : <code>mysql -u root -p</code>',
      'toujours <b>démarrer le serveur</b> avant de se connecter · <code>SHOW DATABASES;</code> pour vérifier',
    ],
  }),
  template({
    id: 'SQL-F-1100-TEMPLATE',
    slug: 'installer-mysql',
    title: 'Installer MySQL',
    shortTitle: 'Installer MySQL',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Les commandes prêtes à copier pour installer, démarrer et se connecter à MySQL selon ton système.',
    lede: 'Installer et lancer MySQL. Choisis ton système :',
    aliases: ['installer mysql', 'setup mysql', 'demarrer mysql'],
    keywords: ['brew install mysql', 'apt mysql', 'mysql -u root -p'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1100-LESSON',
    variants: [
      {
        id: 'SQL-F-1100-t-v1',
        label: 'macOS (Homebrew)',
        codeBlocks: [
          {
            id: 'SQL-F-1100-t-c1',
            filename: 'terminal',
            language: 'bash',
            code: `brew install mysql
brew services start mysql
mysql -u root -p`,
          },
        ],
        replacements: [
          { token: 'root', description: 'le nom d’utilisateur (root par défaut)' },
        ],
        placement: 'Sur macOS avec Homebrew installé. La 2ᵉ ligne démarre le serveur en tâche de fond.',
      },
      {
        id: 'SQL-F-1100-t-v2',
        label: 'Linux (apt)',
        codeBlocks: [
          {
            id: 'SQL-F-1100-t-c2',
            filename: 'terminal',
            language: 'bash',
            code: `sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
mysql -u root -p`,
          },
        ],
        replacements: [
          { token: 'root', description: 'le nom d’utilisateur (root par défaut)' },
        ],
        placement: 'Sur Debian ou Ubuntu. <code>systemctl start</code> lance le service serveur.',
      },
      {
        id: 'SQL-F-1100-t-v3',
        label: 'Se connecter',
        codeBlocks: [
          {
            id: 'SQL-F-1100-t-c3',
            filename: 'terminal',
            language: 'bash',
            code: `mysql -u root -p
# puis, une fois dans l'invite mysql> :
# SHOW DATABASES;`,
          },
        ],
        replacements: [
          { token: 'root', description: 'l’utilisateur avec lequel tu te connectes' },
        ],
        placement: 'Quand le serveur tourne déjà : ouvre le client et saisis ton mot de passe.',
      },
    ],
  }),

  // ————— Créer une base —————
  lesson({
    id: 'SQL-F-1101-LESSON',
    slug: 'creer-une-base',
    title: 'Créer une base',
    shortTitle: 'Créer une base',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Créer une base de données, la sélectionner pour y travailler, et la supprimer proprement quand elle ne sert plus.',
    utility: 'Disposer d’un espace nommé où ranger tes tables et tes données.',
    aliases: ['creer une base', 'create database', 'use database', 'nouvelle base', 'drop database'],
    keywords: [
      'creer une base de donnees',
      'selectionner une base',
      'use ma_base',
      'supprimer une base',
      'liste des bases',
      'if not exists',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1101-TEMPLATE',
    intro:
      'Une <b>base de données</b> est un conteneur nommé qui regroupe tes <b>tables</b>. On la crée avec <code>CREATE DATABASE</code>, puis on la sélectionne avec <code>USE</code> pour dire à MySQL « c’est ici que je travaille ».',
    sections: [
      {
        id: 's1',
        title: 'Créer et sélectionner',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>créer une base “boutique” pour mon projet</b>, puis me placer dedans pour commencer à y créer des tables.',
          },
          {
            type: 'paragraph',
            html: 'Deux temps : <code>CREATE DATABASE</code> fabrique la base, <code>USE</code> te place à l’intérieur. Tant que tu n’as pas fait <code>USE</code>, MySQL ne sait pas dans quelle base créer tes tables.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1101-l-c1',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- 1. Je cree la base (IF NOT EXISTS evite l'erreur si elle existe deja)
CREATE DATABASE IF NOT EXISTS boutique;

-- 2. Je me place dedans : c'est ma base "active"
USE boutique;

-- 3. Verifier ou je suis
SELECT DATABASE(); -- affiche la base actuellement selectionnee`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> les mots-clés SQL (<code>CREATE</code>, <code>USE</code>…) s’écrivent en <b>MAJUSCULES</b>, les noms de bases et de tables en <b>minuscules</b>. Ce n’est pas obligatoire mais c’est la lisibilité standard.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Lister et supprimer',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>SHOW DATABASES</code> liste toutes les bases du serveur. <code>DROP DATABASE</code> en supprime une <b>définitivement</b> — tables et données comprises.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1101-l-c2',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- Voir toutes les bases du serveur
SHOW DATABASES;

-- Supprimer une base ET tout ce qu'elle contient (irreversible !)
DROP DATABASE IF EXISTS boutique;`,
            },
          },
          {
            type: 'table',
            headers: ['Commande', 'Effet'],
            rows: [
              ['<code>CREATE DATABASE nom</code>', 'crée une nouvelle base'],
              ['<code>USE nom</code>', 'sélectionne la base où travailler'],
              ['<code>SHOW DATABASES</code>', 'liste toutes les bases'],
              ['<code>DROP DATABASE nom</code>', 'supprime la base et son contenu'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une base de données est une <b>armoire</b>, les tables sont les <b>tiroirs</b>. <code>USE boutique</code> = « j’ouvre l’armoire boutique ». <code>DROP DATABASE</code> = « je jette l’armoire entière avec tous ses tiroirs ».',
          },
        ],
      },
      {
        id: 's3',
        title: 'Choisir l’encodage',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour bien gérer les accents et les emojis, on précise l’encodage <code>utf8mb4</code> à la création. C’est le réglage recommandé aujourd’hui.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1101-l-c3',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- utf8mb4 = gere accents ET emojis correctement
CREATE DATABASE boutique
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Créer une table sans avoir fait <code>USE</code> avant : MySQL répond « No database selected ».',
      '<code>DROP DATABASE</code> est <b>irréversible</b> : aucune corbeille, tout part immédiatement. Vérifie deux fois le nom.',
      'Oublier <code>IF NOT EXISTS</code> dans un script rejoué : la 2ᵉ exécution plante car la base existe déjà.',
    ],
    takeaways: [
      'créer : <code>CREATE DATABASE nom;</code> · sélectionner : <code>USE nom;</code>',
      'lister : <code>SHOW DATABASES;</code> · supprimer : <code>DROP DATABASE nom;</code>',
      'toujours faire <code>USE</code> avant de créer des tables',
      'encodage recommandé : <code>utf8mb4</code> (accents + emojis)',
    ],
  }),
  template({
    id: 'SQL-F-1101-TEMPLATE',
    slug: 'creer-une-base',
    title: 'Créer une base',
    shortTitle: 'Créer une base',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Le SQL prêt à copier pour créer, sélectionner ou supprimer une base de données.',
    lede: 'Gérer une base de données. Choisis l’action :',
    aliases: ['create database', 'use', 'drop database'],
    keywords: ['creer base', 'selectionner base', 'supprimer base'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1101-LESSON',
    variants: [
      {
        id: 'SQL-F-1101-t-v1',
        label: 'Créer + sélectionner',
        codeBlocks: [
          {
            id: 'SQL-F-1101-t-c1',
            filename: 'requetes.sql',
            language: 'sql',
            code: `CREATE DATABASE IF NOT EXISTS boutique;
USE boutique;`,
          },
        ],
        replacements: [
          { token: 'boutique', description: 'le nom de ta base de données' },
        ],
        placement: 'Le combo de départ : on crée la base puis on se place dedans pour travailler.',
      },
      {
        id: 'SQL-F-1101-t-v2',
        label: 'Avec encodage',
        codeBlocks: [
          {
            id: 'SQL-F-1101-t-c2',
            filename: 'requetes.sql',
            language: 'sql',
            code: `CREATE DATABASE boutique
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;`,
          },
        ],
        replacements: [
          { token: 'boutique', description: 'le nom de ta base' },
          { token: 'utf8mb4', description: 'l’encodage (utf8mb4 gère accents et emojis)' },
        ],
        placement: 'Quand tu veux gérer proprement les accents et emojis dès la création.',
      },
      {
        id: 'SQL-F-1101-t-v3',
        label: 'Supprimer',
        codeBlocks: [
          {
            id: 'SQL-F-1101-t-c3',
            filename: 'requetes.sql',
            language: 'sql',
            code: `DROP DATABASE IF EXISTS boutique;`,
          },
        ],
        replacements: [
          { token: 'boutique', description: 'le nom de la base à supprimer (irréversible)' },
        ],
        placement: 'Pour repartir de zéro. Attention : supprime la base et toutes ses tables sans confirmation.',
      },
    ],
  }),

  // ————— Créer une table —————
  lesson({
    id: 'SQL-F-1102-LESSON',
    slug: 'creer-une-table',
    title: 'Créer une table',
    shortTitle: 'Créer une table',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Définir une table avec ses colonnes, une clé primaire auto-incrémentée et quelques contraintes de base.',
    utility: 'Structurer tes données en colonnes typées à l’intérieur d’une base.',
    aliases: ['creer une table', 'create table', 'colonnes', 'cle primaire', 'primary key', 'auto_increment'],
    keywords: [
      'creer une table',
      'definir des colonnes',
      'cle primaire',
      'auto increment',
      'not null',
      'valeur par defaut',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1102-TEMPLATE',
    intro:
      'Une <b>table</b> range les données en <b>lignes</b> et <b>colonnes</b>, comme un tableur. On la définit avec <code>CREATE TABLE</code> : chaque colonne reçoit un <b>nom</b> et un <b>type</b>, et une colonne sert de <b>clé primaire</b> pour identifier chaque ligne.',
    sections: [
      {
        id: 's1',
        title: 'La structure de base',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>créer une table “users” pour stocker mes utilisateurs</b> : un identifiant unique, un nom, un email et une date d’inscription.',
          },
          {
            type: 'paragraph',
            html: 'Chaque colonne = un <b>nom</b> + un <b>type</b> + d’éventuelles contraintes. La colonne <code>id</code> avec <code>AUTO_INCREMENT</code> se remplit toute seule (1, 2, 3…) et sert de <code>PRIMARY KEY</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1102-l-c1',
              filename: 'schema.sql',
              language: 'sql',
              code: `CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY, -- identifiant unique auto
  nom VARCHAR(100) NOT NULL,         -- texte obligatoire (max 100)
  email VARCHAR(255) NOT NULL UNIQUE, -- obligatoire ET unique
  cree_le DATETIME DEFAULT NOW()     -- date auto a l'insertion
);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> presque toutes les tables ont une colonne <code>id INT AUTO_INCREMENT PRIMARY KEY</code>. C’est l’identifiant unique et automatique de chaque ligne.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les contraintes courantes',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les <b>contraintes</b> imposent des règles sur les colonnes : valeur obligatoire, unicité, valeur par défaut. Elles protègent la qualité de tes données.',
          },
          {
            type: 'table',
            headers: ['Contrainte', 'Signifie'],
            rows: [
              ['<code>PRIMARY KEY</code>', 'identifiant unique de la ligne'],
              ['<code>AUTO_INCREMENT</code>', 'MySQL remplit tout seul (1, 2, 3…)'],
              ['<code>NOT NULL</code>', 'la colonne ne peut pas être vide'],
              ['<code>UNIQUE</code>', 'aucune valeur en double'],
              ['<code>DEFAULT valeur</code>', 'valeur utilisée si rien n’est fourni'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une table est un <b>tableur</b>. Les <b>colonnes</b> sont l’en-tête (nom, email…), chaque <b>ligne</b> est un enregistrement. La <b>clé primaire</b> est le numéro de ligne unique qui ne se répète jamais.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Lister et supprimer une table',
        blocks: [
          {
            type: 'paragraph',
            html: 'Après création, on peut inspecter la structure avec <code>DESCRIBE</code>, lister les tables avec <code>SHOW TABLES</code>, ou supprimer une table avec <code>DROP TABLE</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1102-l-c2',
              filename: 'schema.sql',
              language: 'sql',
              code: `-- Voir les colonnes et leurs types
DESCRIBE users;

-- Lister les tables de la base active
SHOW TABLES;

-- Supprimer la table ET ses donnees (irreversible)
DROP TABLE IF EXISTS users;`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier la <b>clé primaire</b> : la table fonctionne mais chaque ligne devient difficile à cibler et à relier.',
      'Mettre une colonne en <code>NOT NULL</code> sans <code>DEFAULT</code> : toute insertion qui l’oublie sera rejetée.',
      'Confondre <code>DROP TABLE</code> (supprime la table) et <code>DELETE</code> (vide les lignes, garde la structure).',
    ],
    takeaways: [
      'structure : <code>CREATE TABLE nom ( colonne TYPE contraintes, ... );</code>',
      'id classique : <code>id INT AUTO_INCREMENT PRIMARY KEY</code>',
      'contraintes utiles : <code>NOT NULL</code>, <code>UNIQUE</code>, <code>DEFAULT</code>',
      'inspecter : <code>DESCRIBE table;</code> · lister : <code>SHOW TABLES;</code>',
    ],
  }),
  template({
    id: 'SQL-F-1102-TEMPLATE',
    slug: 'creer-une-table',
    title: 'Créer une table',
    shortTitle: 'Créer une table',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Le SQL prêt à copier pour créer une table avec clé primaire, contraintes et clé étrangère.',
    lede: 'Créer une table. Choisis le cas :',
    aliases: ['create table', 'cle primaire', 'foreign key'],
    keywords: ['colonnes', 'auto_increment', 'not null'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1102-LESSON',
    variants: [
      {
        id: 'SQL-F-1102-t-v1',
        label: 'Table simple',
        codeBlocks: [
          {
            id: 'SQL-F-1102-t-c1',
            filename: 'schema.sql',
            language: 'sql',
            code: `CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);`,
          },
        ],
        replacements: [
          { token: 'users', description: 'le nom de ta table' },
          { token: 'nom VARCHAR(100) NOT NULL', description: 'une colonne : nom, type, contraintes' },
        ],
        placement: 'Le cas de base : un id auto en clé primaire et quelques colonnes typées.',
      },
      {
        id: 'SQL-F-1102-t-v2',
        label: 'Avec valeurs par défaut',
        codeBlocks: [
          {
            id: 'SQL-F-1102-t-c2',
            filename: 'schema.sql',
            language: 'sql',
            code: `CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(200) NOT NULL,
  actif BOOLEAN DEFAULT TRUE,
  cree_le DATETIME DEFAULT NOW()
);`,
          },
        ],
        replacements: [
          { token: 'articles', description: 'le nom de ta table' },
          { token: 'DEFAULT TRUE', description: 'la valeur utilisée si rien n’est fourni' },
        ],
        placement: 'Quand certaines colonnes ont une valeur automatique (statut par défaut, date de création).',
      },
      {
        id: 'SQL-F-1102-t-v3',
        label: 'Avec clé étrangère',
        codeBlocks: [
          {
            id: 'SQL-F-1102-t-c3',
            filename: 'schema.sql',
            language: 'sql',
            code: `CREATE TABLE commandes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);`,
          },
        ],
        replacements: [
          { token: 'commandes', description: 'le nom de ta table' },
          { token: 'user_id', description: 'la colonne qui référence une autre table' },
          { token: 'users(id)', description: 'la table et colonne cible du lien' },
        ],
        placement: 'Pour relier deux tables : la clé étrangère pointe vers la clé primaire d’une autre table.',
      },
    ],
  }),

  // ————— Les types SQL —————
  lesson({
    id: 'SQL-F-1103-LESSON',
    slug: 'les-types-sql',
    title: 'Les types SQL',
    shortTitle: 'Types SQL',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Choisir le bon type pour chaque colonne : nombres, textes, dates et booléens, sans gaspiller ni tronquer.',
    utility: 'Donner à chaque colonne le type adapté à la donnée qu’elle stocke.',
    aliases: ['types sql', 'int', 'varchar', 'text', 'datetime', 'decimal', 'boolean', 'types de donnees'],
    keywords: [
      'quel type choisir',
      'stocker un nombre',
      'stocker du texte',
      'stocker une date',
      'varchar ou text',
      'decimal argent',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1103-TEMPLATE',
    intro:
      'Chaque colonne a un <b>type</b> qui définit ce qu’elle peut contenir. Bien choisir évite de <b>gaspiller</b> de l’espace ou de <b>tronquer</b> une donnée. Les grandes familles : <b>nombres</b>, <b>textes</b>, <b>dates</b> et <b>booléens</b>.',
    sections: [
      {
        id: 's1',
        title: 'Nombres et textes',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>choisir le bon type pour un prix, un nom et une description</b>, sans me tromper entre <code>VARCHAR</code> et <code>TEXT</code> ni entre <code>INT</code> et <code>DECIMAL</code>.',
          },
          {
            type: 'paragraph',
            html: 'Pour un texte <b>court et borné</b>, <code>VARCHAR(n)</code>. Pour un texte <b>long</b>, <code>TEXT</code>. Pour un entier, <code>INT</code>. Pour de l’argent, <b>jamais</b> de flottant : <code>DECIMAL</code> qui garde la précision exacte.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1103-l-c1',
              filename: 'schema.sql',
              language: 'sql',
              code: `CREATE TABLE produits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(150),        -- texte court et borne (max 150)
  description TEXT,        -- texte long, sans limite pratique
  quantite INT,           -- nombre entier
  prix DECIMAL(10, 2)     -- 10 chiffres dont 2 apres la virgule
);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle argent :</b> pour un prix ou un montant, toujours <code>DECIMAL(p, s)</code> — jamais <code>FLOAT</code>/<code>DOUBLE</code> qui introduisent des arrondis (0,10 + 0,20 ≠ 0,30).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Dates et booléens',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour une <b>date seule</b>, <code>DATE</code>. Pour une <b>date + heure</b>, <code>DATETIME</code>. Pour un oui/non, <code>BOOLEAN</code> (stocké comme 0 ou 1).',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1103-l-c2',
              filename: 'schema.sql',
              language: 'sql',
              code: `CREATE TABLE evenements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  jour DATE,              -- '2026-07-21'
  debut DATETIME,         -- '2026-07-21 09:30:00'
  publie BOOLEAN DEFAULT FALSE -- vrai/faux (0 ou 1)
);`,
            },
          },
          {
            type: 'table',
            headers: ['Type', 'Pour stocker', 'Exemple'],
            rows: [
              ['<code>INT</code>', 'un entier', 'quantité, âge'],
              ['<code>DECIMAL(10,2)</code>', 'un montant précis', 'prix, total'],
              ['<code>VARCHAR(n)</code>', 'un texte court', 'nom, email'],
              ['<code>TEXT</code>', 'un texte long', 'description, article'],
              ['<code>DATE</code>', 'une date', 'date de naissance'],
              ['<code>DATETIME</code>', 'date + heure', 'horodatage'],
              ['<code>BOOLEAN</code>', 'un oui/non', 'actif, publié'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> choisir un type, c’est choisir la <b>taille du contenant</b>. <code>VARCHAR(150)</code> = une boîte prévue pour 150 lettres. Mettre un roman dedans déborde ; utilise <code>TEXT</code>, la grande caisse.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Signé, non signé, tailles',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un entier peut être <code>UNSIGNED</code> (jamais négatif, donc plage positive doublée). Pratique pour un id ou une quantité qui ne descend jamais sous zéro.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1103-l-c3',
              filename: 'schema.sql',
              language: 'sql',
              code: `-- UNSIGNED : pas de valeurs negatives possibles
CREATE TABLE stock (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quantite INT UNSIGNED DEFAULT 0
);
-- Un id ou un stock ne sont jamais negatifs : UNSIGNED convient`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>FLOAT</code>/<code>DOUBLE</code> pour de l’argent : les arrondis binaires faussent les totaux. Toujours <code>DECIMAL</code>.',
      'Prendre <code>TEXT</code> pour un simple nom : <code>VARCHAR(n)</code> est plus rapide et indexable. Réserve <code>TEXT</code> aux longs contenus.',
      'Sous-dimensionner un <code>VARCHAR</code> : un email dans <code>VARCHAR(20)</code> sera tronqué. Prévois large (souvent 255).',
    ],
    takeaways: [
      'entier : <code>INT</code> · argent : <code>DECIMAL(10,2)</code> (jamais FLOAT)',
      'texte court : <code>VARCHAR(n)</code> · texte long : <code>TEXT</code>',
      'date : <code>DATE</code> · date + heure : <code>DATETIME</code> · oui/non : <code>BOOLEAN</code>',
      'valeur jamais négative : ajoute <code>UNSIGNED</code>',
    ],
  }),
  template({
    id: 'SQL-F-1103-TEMPLATE',
    slug: 'les-types-sql',
    title: 'Types SQL',
    shortTitle: 'Types SQL',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Des exemples de colonnes prêts à copier, par famille de type : nombres, textes, dates.',
    lede: 'Choisir un type de colonne. Choisis la famille :',
    aliases: ['types sql', 'int', 'varchar', 'datetime', 'decimal'],
    keywords: ['nombre', 'texte', 'date', 'booleen'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1103-LESSON',
    variants: [
      {
        id: 'SQL-F-1103-t-v1',
        label: 'Nombres',
        codeBlocks: [
          {
            id: 'SQL-F-1103-t-c1',
            filename: 'schema.sql',
            language: 'sql',
            code: `quantite INT,
note TINYINT,
prix DECIMAL(10, 2),
id INT UNSIGNED AUTO_INCREMENT`,
          },
        ],
        replacements: [
          { token: 'DECIMAL(10, 2)', description: '10 chiffres au total, 2 après la virgule (pour l’argent)' },
        ],
        placement: 'Entiers avec INT, montants avec DECIMAL. UNSIGNED pour interdire les négatifs.',
      },
      {
        id: 'SQL-F-1103-t-v2',
        label: 'Textes',
        codeBlocks: [
          {
            id: 'SQL-F-1103-t-c2',
            filename: 'schema.sql',
            language: 'sql',
            code: `nom VARCHAR(100),
email VARCHAR(255),
description TEXT`,
          },
        ],
        replacements: [
          { token: '100', description: 'la longueur max du texte court' },
        ],
        placement: 'VARCHAR(n) pour un texte court et borné, TEXT pour un contenu long.',
      },
      {
        id: 'SQL-F-1103-t-v3',
        label: 'Dates & booléens',
        codeBlocks: [
          {
            id: 'SQL-F-1103-t-c3',
            filename: 'schema.sql',
            language: 'sql',
            code: `jour DATE,
cree_le DATETIME DEFAULT NOW(),
actif BOOLEAN DEFAULT TRUE`,
          },
        ],
        replacements: [
          { token: 'NOW()', description: 'la date/heure automatique à l’insertion' },
        ],
        placement: 'DATE pour une date seule, DATETIME avec l’heure, BOOLEAN pour un oui/non.',
      },
    ],
  }),

  // ————— UPDATE —————
  lesson({
    id: 'SQL-F-1104-LESSON',
    slug: 'update',
    title: 'UPDATE',
    shortTitle: 'UPDATE',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Modifier des lignes existantes en toute sécurité, avec un WHERE ciblé pour ne pas toucher toute la table.',
    utility: 'Changer la valeur de colonnes sur des lignes déjà enregistrées.',
    aliases: ['update', 'modifier', 'mettre a jour', 'set', 'update where', 'modifier une ligne'],
    keywords: [
      'modifier une ligne',
      'mettre a jour une valeur',
      'update where',
      'changer un champ',
      'update sans where',
      'incrementer une colonne',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1104-TEMPLATE',
    intro:
      '<code>UPDATE</code> modifie des lignes <b>déjà présentes</b>. La structure : <code>UPDATE table SET colonne = valeur WHERE condition</code>. Le <code>WHERE</code> est <b>crucial</b> : sans lui, toutes les lignes sont modifiées.',
    sections: [
      {
        id: 's1',
        title: 'Modifier une ligne précise',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>changer l’email de l’utilisateur dont l’id est 42</b>, sans toucher aux autres utilisateurs.',
          },
          {
            type: 'paragraph',
            html: 'On cible la ligne avec <code>WHERE</code> (souvent sur l’<code>id</code>, qui est unique). <code>SET</code> liste les colonnes à changer. On peut en modifier plusieurs d’un coup, séparées par des virgules.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1104-l-c1',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- Modifie UNE seule ligne : celle dont l'id vaut 42
UPDATE users
SET email = 'nouvel@email.com'
WHERE id = 42;

-- Changer plusieurs colonnes a la fois (virgules)
UPDATE users
SET nom = 'Alice', actif = TRUE
WHERE id = 42;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle d’or :</b> toujours écrire le <code>WHERE</code> <b>avant</b> de valider un <code>UPDATE</code>. Un <code>UPDATE</code> sans <code>WHERE</code> modifie <b>toutes</b> les lignes de la table.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Calculer à partir de la valeur actuelle',
        blocks: [
          {
            type: 'paragraph',
            html: 'On peut baser la nouvelle valeur sur l’<b>ancienne</b> : incrémenter un compteur, appliquer une remise. La colonne se référence elle-même dans le <code>SET</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1104-l-c2',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- Ajouter 1 au stock du produit 7
UPDATE produits
SET stock = stock + 1
WHERE id = 7;

-- Baisser tous les prix de 10% sur la categorie "solde"
UPDATE produits
SET prix = prix * 0.9
WHERE categorie = 'solde';`,
            },
          },
          {
            type: 'table',
            headers: ['Morceau', 'Rôle'],
            rows: [
              ['<code>UPDATE table</code>', 'la table à modifier'],
              ['<code>SET col = valeur</code>', 'la ou les colonnes à changer'],
              ['<code>WHERE condition</code>', 'quelles lignes sont concernées'],
              ['<code>col = col + 1</code>', 'calcul basé sur la valeur actuelle'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>UPDATE</code> sans <code>WHERE</code>, c’est repeindre <b>toute la maison</b> d’un coup. Avec <code>WHERE id = 42</code>, tu ne repeins qu’<b>une seule pièce</b>.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Vérifier avant de modifier',
        blocks: [
          {
            type: 'paragraph',
            html: 'Bonne habitude : lancer d’abord un <code>SELECT</code> avec le <b>même</b> <code>WHERE</code> pour voir quelles lignes seront touchées, avant de faire l’<code>UPDATE</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1104-l-c3',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- 1. D'ABORD : je verifie ce que je vais toucher
SELECT * FROM users WHERE id = 42;

-- 2. ENSUITE, si c'est bon, je modifie avec le MEME where
UPDATE users SET email = 'ok@mail.com' WHERE id = 42;`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le <code>WHERE</code> : <code>UPDATE users SET actif = FALSE</code> désactive <b>tous</b> les utilisateurs d’un coup.',
      'Cibler sur une colonne <b>non unique</b> (ex. <code>WHERE nom = \'Alice\'</code>) : plusieurs lignes peuvent être modifiées sans le vouloir.',
      'Confondre <code>=</code> (comparaison dans le <code>WHERE</code>) et <code>=</code> (affectation dans le <code>SET</code>) : ce sont deux rôles différents.',
    ],
    takeaways: [
      'structure : <code>UPDATE table SET col = valeur WHERE condition;</code>',
      'le <code>WHERE</code> est <b>obligatoire</b> en pratique — sinon toute la table change',
      'plusieurs colonnes : séparées par des virgules dans le <code>SET</code>',
      'calcul possible : <code>SET stock = stock + 1</code> · vérifie avec un <code>SELECT</code> d’abord',
    ],
  }),
  template({
    id: 'SQL-F-1104-TEMPLATE',
    slug: 'update',
    title: 'UPDATE',
    shortTitle: 'UPDATE',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Le SQL prêt à copier pour modifier des lignes : une colonne, plusieurs, ou un calcul.',
    lede: 'Modifier des lignes existantes. Choisis le cas :',
    aliases: ['update', 'modifier', 'set where'],
    keywords: ['mettre a jour', 'changer valeur', 'incrementer'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1104-LESSON',
    variants: [
      {
        id: 'SQL-F-1104-t-v1',
        label: 'Une colonne',
        codeBlocks: [
          {
            id: 'SQL-F-1104-t-c1',
            filename: 'requetes.sql',
            language: 'sql',
            code: `UPDATE users
SET email = 'nouvel@email.com'
WHERE id = 42;`,
          },
        ],
        replacements: [
          { token: 'users', description: 'ta table' },
          { token: 'email', description: 'la colonne à modifier' },
          { token: 'id = 42', description: 'la condition qui cible la ligne (garde-la toujours)' },
        ],
        placement: 'Le cas courant : modifier une valeur sur une ligne ciblée par son id.',
      },
      {
        id: 'SQL-F-1104-t-v2',
        label: 'Plusieurs colonnes',
        codeBlocks: [
          {
            id: 'SQL-F-1104-t-c2',
            filename: 'requetes.sql',
            language: 'sql',
            code: `UPDATE users
SET nom = 'Alice', actif = TRUE
WHERE id = 42;`,
          },
        ],
        replacements: [
          { token: 'nom = \'Alice\', actif = TRUE', description: 'les colonnes à changer, séparées par des virgules' },
          { token: 'id = 42', description: 'la ligne visée' },
        ],
        placement: 'Quand tu modifies plusieurs champs de la même ligne en une requête.',
      },
      {
        id: 'SQL-F-1104-t-v3',
        label: 'Calcul sur la valeur',
        codeBlocks: [
          {
            id: 'SQL-F-1104-t-c3',
            filename: 'requetes.sql',
            language: 'sql',
            code: `UPDATE produits
SET stock = stock + 1
WHERE id = 7;`,
          },
        ],
        replacements: [
          { token: 'stock = stock + 1', description: 'la nouvelle valeur calculée à partir de l’ancienne' },
          { token: 'id = 7', description: 'la ligne concernée' },
        ],
        placement: 'Pour incrémenter, décrémenter ou appliquer un pourcentage à partir de la valeur actuelle.',
      },
    ],
  }),

  // ————— DELETE —————
  lesson({
    id: 'SQL-F-1105-LESSON',
    slug: 'delete',
    title: 'DELETE',
    shortTitle: 'DELETE',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Supprimer des lignes précises avec DELETE, en gardant la structure de la table, et éviter la suppression totale accidentelle.',
    utility: 'Retirer des lignes d’une table sans supprimer la table elle-même.',
    aliases: ['delete', 'supprimer', 'delete where', 'effacer une ligne', 'truncate', 'supprimer des donnees'],
    keywords: [
      'supprimer une ligne',
      'effacer des donnees',
      'delete where',
      'delete sans where',
      'vider une table',
      'truncate table',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1105-TEMPLATE',
    intro:
      '<code>DELETE</code> supprime des <b>lignes</b> d’une table, mais garde la <b>structure</b> (colonnes, types). Structure : <code>DELETE FROM table WHERE condition</code>. Comme pour <code>UPDATE</code>, le <code>WHERE</code> est <b>vital</b>.',
    sections: [
      {
        id: 's1',
        title: 'Supprimer une ligne précise',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>supprimer le compte de l’utilisateur dont l’id est 42</b>, et lui seul, sans vider toute la table.',
          },
          {
            type: 'paragraph',
            html: 'On cible avec <code>WHERE</code>, idéalement sur l’<code>id</code>. La table et ses autres lignes restent intactes. Seule la ligne visée disparaît.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1105-l-c1',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- Supprime UNE seule ligne : celle dont l'id vaut 42
DELETE FROM users
WHERE id = 42;

-- On peut supprimer plusieurs lignes via une condition large
DELETE FROM users
WHERE actif = FALSE; -- tous les comptes inactifs`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle d’or :</b> jamais de <code>DELETE FROM table</code> sans <code>WHERE</code> — cela vide <b>toute</b> la table. Écris et vérifie le <code>WHERE</code> en premier.',
          },
        ],
      },
      {
        id: 's2',
        title: 'DELETE, TRUNCATE ou DROP ?',
        blocks: [
          {
            type: 'paragraph',
            html: 'Trois façons de « supprimer », mais pas au même niveau : <code>DELETE</code> retire des lignes, <code>TRUNCATE</code> vide toute la table d’un coup, <code>DROP TABLE</code> supprime la table entière.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1105-l-c2',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- Retirer certaines lignes (avec condition)
DELETE FROM users WHERE actif = FALSE;

-- Vider TOUTE la table, mais garder sa structure
TRUNCATE TABLE users;

-- Supprimer la table entiere (structure comprise)
DROP TABLE users;`,
            },
          },
          {
            type: 'table',
            headers: ['Commande', 'Supprime quoi ?', 'Garde la table ?'],
            rows: [
              ['<code>DELETE FROM t WHERE …</code>', 'les lignes choisies', 'oui'],
              ['<code>TRUNCATE TABLE t</code>', 'toutes les lignes', 'oui (structure)'],
              ['<code>DROP TABLE t</code>', 'la table entière', 'non'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>DELETE</code> = enlever <b>quelques dossiers</b> d’un classeur. <code>TRUNCATE</code> = <b>vider tout le classeur</b>. <code>DROP</code> = <b>jeter le classeur</b> lui-même.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Vérifier avant de supprimer',
        blocks: [
          {
            type: 'paragraph',
            html: 'Comme pour <code>UPDATE</code>, on teste d’abord le <code>WHERE</code> avec un <code>SELECT</code> : on voit exactement ce qui va disparaître avant de le confirmer.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1105-l-c3',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- 1. D'ABORD : voir ce que je vais supprimer
SELECT * FROM users WHERE actif = FALSE;

-- 2. ENSUITE, si c'est bon : supprimer avec le MEME where
DELETE FROM users WHERE actif = FALSE;`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le <code>WHERE</code> : <code>DELETE FROM users</code> efface <b>toutes</b> les lignes. Aucune corbeille, c’est définitif.',
      'Confondre <code>DELETE</code> (lignes, structure gardée) et <code>DROP TABLE</code> (table entière détruite).',
      'Supprimer une ligne référencée par une <b>clé étrangère</b> : MySQL refuse tant que les lignes liées existent.',
    ],
    takeaways: [
      'structure : <code>DELETE FROM table WHERE condition;</code>',
      'le <code>WHERE</code> est <b>obligatoire</b> en pratique — sinon toute la table est vidée',
      '<code>TRUNCATE TABLE</code> = vide tout · <code>DROP TABLE</code> = supprime la table',
      'vérifie toujours avec un <code>SELECT</code> avant de supprimer',
    ],
  }),
  template({
    id: 'SQL-F-1105-TEMPLATE',
    slug: 'delete',
    title: 'DELETE',
    shortTitle: 'DELETE',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Le SQL prêt à copier pour supprimer des lignes ciblées, ou vider une table entière.',
    lede: 'Supprimer des données. Choisis le cas :',
    aliases: ['delete', 'supprimer', 'truncate'],
    keywords: ['effacer ligne', 'vider table', 'delete where'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1105-LESSON',
    variants: [
      {
        id: 'SQL-F-1105-t-v1',
        label: 'Une ligne',
        codeBlocks: [
          {
            id: 'SQL-F-1105-t-c1',
            filename: 'requetes.sql',
            language: 'sql',
            code: `DELETE FROM users
WHERE id = 42;`,
          },
        ],
        replacements: [
          { token: 'users', description: 'ta table' },
          { token: 'id = 42', description: 'la condition qui cible la ligne (garde-la toujours)' },
        ],
        placement: 'Le cas courant : supprimer une ligne précise identifiée par son id.',
      },
      {
        id: 'SQL-F-1105-t-v2',
        label: 'Plusieurs lignes',
        codeBlocks: [
          {
            id: 'SQL-F-1105-t-c2',
            filename: 'requetes.sql',
            language: 'sql',
            code: `DELETE FROM users
WHERE actif = FALSE;`,
          },
        ],
        replacements: [
          { token: 'actif = FALSE', description: 'la condition qui sélectionne le groupe de lignes' },
        ],
        placement: 'Pour supprimer toutes les lignes qui répondent à un critère (ex. comptes inactifs).',
      },
      {
        id: 'SQL-F-1105-t-v3',
        label: 'Vider la table',
        codeBlocks: [
          {
            id: 'SQL-F-1105-t-c3',
            filename: 'requetes.sql',
            language: 'sql',
            code: `TRUNCATE TABLE users;`,
          },
        ],
        replacements: [
          { token: 'users', description: 'la table à vider entièrement (structure gardée)' },
        ],
        placement: 'Pour tout effacer d’un coup en gardant la table. Plus rapide qu’un DELETE sans WHERE.',
      },
    ],
  }),

  // ————— ORDER BY et LIMIT —————
  lesson({
    id: 'SQL-F-1106-LESSON',
    slug: 'order-by-et-limit',
    title: 'ORDER BY et LIMIT',
    shortTitle: 'ORDER BY / LIMIT',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Trier les résultats d’un SELECT (croissant/décroissant) et n’en garder qu’un nombre limité, avec la pagination.',
    utility: 'Ordonner les résultats et limiter le nombre de lignes retournées.',
    aliases: ['order by', 'limit', 'trier', 'tri', 'asc', 'desc', 'pagination', 'offset'],
    keywords: [
      'trier les resultats',
      'ordre croissant decroissant',
      'les 10 premiers',
      'top 5',
      'pagination sql',
      'limit offset',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1106-TEMPLATE',
    intro:
      '<code>ORDER BY</code> <b>trie</b> les résultats d’un <code>SELECT</code> selon une colonne, en ordre croissant (<code>ASC</code>) ou décroissant (<code>DESC</code>). <code>LIMIT</code> <b>restreint</b> le nombre de lignes retournées. Les deux se combinent souvent.',
    sections: [
      {
        id: 's1',
        title: 'Trier les résultats',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher mes produits du moins cher au plus cher</b>, puis dans l’autre sens, sans changer les données stockées.',
          },
          {
            type: 'paragraph',
            html: 'On ajoute <code>ORDER BY colonne</code> à la fin du <code>SELECT</code>. Par défaut c’est croissant (<code>ASC</code>). Pour l’ordre inverse, on ajoute <code>DESC</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1106-l-c1',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- Du moins cher au plus cher (croissant par defaut)
SELECT nom, prix FROM produits
ORDER BY prix ASC;

-- Du plus cher au moins cher (decroissant)
SELECT nom, prix FROM produits
ORDER BY prix DESC;

-- Trier sur plusieurs colonnes : categorie puis prix
SELECT nom, categorie, prix FROM produits
ORDER BY categorie ASC, prix DESC;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>ORDER BY</code> ne change <b>rien</b> dans la table, il n’affecte que l’<b>affichage</b> du résultat. Par défaut le tri est <code>ASC</code> (croissant).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Limiter le nombre de lignes',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>LIMIT n</code> ne garde que les <code>n</code> premières lignes. Combiné à <code>ORDER BY</code>, il donne le classement « top 3 », « les 5 plus récents »…',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1106-l-c2',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- Les 3 produits les plus chers
SELECT nom, prix FROM produits
ORDER BY prix DESC
LIMIT 3;

-- Les 5 derniers utilisateurs inscrits
SELECT nom FROM users
ORDER BY cree_le DESC
LIMIT 5;`,
            },
          },
          {
            type: 'table',
            headers: ['Clause', 'Rôle'],
            rows: [
              ['<code>ORDER BY col</code>', 'trie selon la colonne'],
              ['<code>ASC</code>', 'croissant (défaut) : A→Z, 0→9'],
              ['<code>DESC</code>', 'décroissant : Z→A, 9→0'],
              ['<code>LIMIT n</code>', 'garde les n premières lignes'],
              ['<code>LIMIT n OFFSET m</code>', 'saute m lignes puis en prend n'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>ORDER BY</code> = ranger les cartes dans l’ordre, <code>LIMIT 3</code> = ne garder que les <b>3 du dessus</b> de la pile.',
          },
        ],
      },
      {
        id: 's3',
        title: 'La pagination avec OFFSET',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour afficher une page à la fois, <code>OFFSET</code> <b>saute</b> un nombre de lignes avant de prendre les suivantes. C’est la base de la pagination.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1106-l-c3',
              filename: 'requetes.sql',
              language: 'sql',
              code: `-- Page 1 : lignes 1 a 10
SELECT nom FROM produits
ORDER BY nom
LIMIT 10 OFFSET 0;

-- Page 2 : lignes 11 a 20 (on saute les 10 premieres)
SELECT nom FROM produits
ORDER BY nom
LIMIT 10 OFFSET 10;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce pagination :</b> pour la page N avec une taille de page P, l’offset vaut (N - 1) fois P. Toujours associer <code>OFFSET</code> à un <code>ORDER BY</code> stable, sinon l’ordre des pages varie.',
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>LIMIT</code> sans <code>ORDER BY</code> : « les 3 premières » n’a pas de sens, l’ordre n’est pas garanti.',
      'Croire que <code>ORDER BY</code> modifie la table : il ne trie que l’<b>affichage</b> du résultat, jamais les données.',
      'Oublier que <code>OFFSET</code> commence à <b>0</b> : la première page, c’est <code>OFFSET 0</code>, pas <code>OFFSET 1</code>.',
    ],
    takeaways: [
      'trier : <code>ORDER BY colonne ASC|DESC</code> (ASC par défaut)',
      'plusieurs critères : <code>ORDER BY a ASC, b DESC</code>',
      'limiter : <code>LIMIT n</code> · top N : <code>ORDER BY … DESC LIMIT n</code>',
      'pagination : <code>LIMIT taille OFFSET (page - 1) * taille</code> (offset commence à 0)',
    ],
  }),
  template({
    id: 'SQL-F-1106-TEMPLATE',
    slug: 'order-by-et-limit',
    title: 'ORDER BY et LIMIT',
    shortTitle: 'ORDER BY / LIMIT',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Le SQL prêt à copier pour trier, prendre un top N, ou paginer les résultats.',
    lede: 'Trier et limiter un SELECT. Choisis le cas :',
    aliases: ['order by', 'limit', 'trier', 'pagination'],
    keywords: ['asc desc', 'top n', 'offset'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1106-LESSON',
    variants: [
      {
        id: 'SQL-F-1106-t-v1',
        label: 'Trier',
        codeBlocks: [
          {
            id: 'SQL-F-1106-t-c1',
            filename: 'requetes.sql',
            language: 'sql',
            code: `SELECT nom, prix FROM produits
ORDER BY prix DESC;`,
          },
        ],
        replacements: [
          { token: 'prix', description: 'la colonne sur laquelle trier' },
          { token: 'DESC', description: 'le sens : ASC (croissant) ou DESC (décroissant)' },
        ],
        placement: 'Pour ordonner les résultats. ASC par défaut, DESC pour l’ordre inverse.',
      },
      {
        id: 'SQL-F-1106-t-v2',
        label: 'Top N',
        codeBlocks: [
          {
            id: 'SQL-F-1106-t-c2',
            filename: 'requetes.sql',
            language: 'sql',
            code: `SELECT nom, prix FROM produits
ORDER BY prix DESC
LIMIT 3;`,
          },
        ],
        replacements: [
          { token: 'prix DESC', description: 'le critère de classement' },
          { token: '3', description: 'le nombre de lignes à garder' },
        ],
        placement: 'Pour un classement : les N meilleurs/plus récents. Toujours avec un ORDER BY.',
      },
      {
        id: 'SQL-F-1106-t-v3',
        label: 'Pagination',
        codeBlocks: [
          {
            id: 'SQL-F-1106-t-c3',
            filename: 'requetes.sql',
            language: 'sql',
            code: `SELECT nom FROM produits
ORDER BY nom
LIMIT 10 OFFSET 10;`,
          },
        ],
        replacements: [
          { token: '10', description: 'la taille de la page (LIMIT) et le décalage (OFFSET)' },
        ],
        placement: 'Page N : OFFSET vaut (N - 1) × taille de page. Ici page 2 de 10 éléments.',
      },
    ],
  }),

  // ————— Introduction aux bases de données relationnelles —————
  lesson({
    id: 'SQL-F-1200-LESSON',
    slug: 'introduction-bases-relationnelles',
    title: 'Introduction aux bases de données relationnelles',
    shortTitle: 'BDD relationnelles',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'C’est quoi une base relationnelle : des données rangées dans des tables (lignes et colonnes) reliées entre elles par des clés, gérées par un SGBD et interrogées en SQL.',
    utility:
      'Comprendre le vocabulaire et l’idée de base avant d’écrire la moindre requête SQL.',
    aliases: ['base relationnelle', 'bdd', 'sgbd', 'table ligne colonne', 'c est quoi une base de donnees', 'relationnel'],
    keywords: [
      'base de donnees relationnelle',
      'table',
      'ligne',
      'colonne',
      'sgbd',
      'sql',
      'cle primaire',
      'relation',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1200-TEMPLATE',
    intro:
      'Une <b>base de données relationnelle</b> range l’information dans des <b>tables</b>, comme des tableaux. Chaque table a des <b>lignes</b> (les enregistrements) et des <b>colonnes</b> (les informations). Le mot <b>« relationnel »</b> vient du fait que les tables sont <b>reliées entre elles</b> par des clés. Un logiciel appelé <b>SGBD</b> (MySQL, PostgreSQL…) stocke tout ça, et on lui parle avec le langage <b>SQL</b>.',
    sections: [
      {
        id: 's1',
        title: 'Une base = des tables',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>stocker mes clients et leurs commandes</b> proprement, sans tout mélanger dans un seul gros fichier Excel.',
          },
          {
            type: 'paragraph',
            html: 'On crée <b>une table par « chose »</b> : une table <code>client</code>, une table <code>commande</code>. Chaque table ressemble à un tableau avec des colonnes fixes et autant de lignes qu’on veut.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1200-l-c1',
              filename: 'table-client.txt',
              language: 'text',
              code: `Table "client"
+-----------+--------+---------------------+
| id_client | nom    | email               |   <- les COLONNES
+-----------+--------+---------------------+
| 1         | Marie  | marie@mail.com      |   <- une LIGNE
| 2         | Karim  | karim@mail.com      |
+-----------+--------+---------------------+`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une table, c’est un <b>onglet de tableur</b>. La différence : les tables peuvent être <b>reliées</b> entre elles, et la base <b>garantit</b> que les données restent cohérentes.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le vocabulaire de base',
        blocks: [
          {
            type: 'table',
            headers: ['Mot', 'Ce que c’est'],
            rows: [
              ['Table', 'un tableau qui stocke un type de données (client, produit…)'],
              ['Ligne', 'un enregistrement : <b>un</b> client, <b>une</b> commande'],
              ['Colonne', 'une information de la table (nom, email, prix)'],
              ['Clé primaire', 'la colonne qui identifie chaque ligne de façon unique (<code>id</code>)'],
              ['SGBD', 'le logiciel qui gère la base (MySQL, PostgreSQL, SQLite)'],
              ['SQL', 'le langage pour interroger et modifier la base'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Pourquoi « relationnel » : les liens',
        blocks: [
          {
            type: 'paragraph',
            html: 'Plutôt que de recopier le nom du client dans chaque commande, on stocke juste son <b>identifiant</b>. La commande « pointe » vers le client par une <b>clé étrangère</b>. C’est ça, la <b>relation</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1200-l-c2',
              filename: 'relation.txt',
              language: 'text',
              code: `Table "client"            Table "commande"
+-----------+-------+     +-------------+------------+-----------+
| id_client | nom   |     | id_commande | date       | id_client |
+-----------+-------+     +-------------+------------+-----------+
| 1         | Marie | <-- | 50          | 2026-07-01 | 1         |
| 2         | Karim |     | 51          | 2026-07-02 | 1         |
+-----------+-------+     +-------------+------------+-----------+
                                                       ^^^^^^^^^
                          id_client pointe vers la table client.`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>L’intérêt :</b> si Marie change d’email, on ne le modifie <b>qu’à un seul endroit</b> (sa ligne dans <code>client</code>). Pas de doublon, pas d’oubli.',
          },
        ],
      },
      {
        id: 's4',
        title: 'Le SGBD et le langage SQL',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <b>SGBD</b> (Système de Gestion de Base de Données) est le logiciel qui stocke et protège les tables. Les plus courants sont <b>MySQL</b>, <b>PostgreSQL</b> et <b>SQLite</b>. Pour leur parler, on utilise tous le même langage : <b>SQL</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1200-l-c3',
              filename: 'premier-sql.sql',
              language: 'sql',
              code: `-- "Montre-moi toutes les lignes de la table client"
SELECT * FROM client;

-- "Montre-moi juste les noms"
SELECT nom FROM client;`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Confondre <b>base</b> et <b>table</b> : une base <i>contient</i> plusieurs tables.',
      'Recopier la même info (le nom du client) dans plusieurs tables : on stocke un <b>identifiant</b> et on relie, pour éviter les doublons.',
      'Croire que SQL est réservé à MySQL : c’est le <b>même langage</b> pour presque tous les SGBD.',
    ],
    takeaways: [
      'une base relationnelle range les données dans des <b>tables</b> (lignes + colonnes)',
      '<b>ligne</b> = un enregistrement · <b>colonne</b> = une information · <b>clé primaire</b> = l’identifiant unique',
      '« relationnel » = les tables sont <b>reliées</b> par des clés (on évite les doublons)',
      'le <b>SGBD</b> (MySQL…) stocke la base · on l’interroge en <b>SQL</b>',
    ],
  }),
  template({
    id: 'SQL-F-1200-TEMPLATE',
    slug: 'introduction-bases-relationnelles',
    title: 'Introduction aux bases de données relationnelles',
    shortTitle: 'BDD relationnelles',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Le vocabulaire relationnel en un coup d’œil et ta toute première requête pour regarder une table.',
    lede: 'De quoi démarrer : le mémo du vocabulaire, ou la première requête. Choisis :',
    aliases: ['vocabulaire sql', 'select simple', 'premiere requete', 'base relationnelle'],
    keywords: ['vocabulaire', 'select', 'table', 'ligne', 'colonne'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1200-LESSON',
    variants: [
      {
        id: 'SQL-F-1200-t-v1',
        label: 'Le vocabulaire',
        description: 'Le mémo à garder sous les yeux au début.',
        codeBlocks: [
          {
            id: 'SQL-F-1200-t-v1-c1',
            filename: 'vocabulaire.txt',
            language: 'text',
            code: `BASE      = un ensemble de tables
TABLE     = un tableau (client, produit, commande...)
LIGNE     = un enregistrement (UN client)
COLONNE   = une information (nom, email...)
CLE PRIM. = la colonne qui identifie la ligne (id)
CLE ETR.  = une colonne qui pointe vers une autre table
SGBD      = le logiciel (MySQL, PostgreSQL, SQLite)
SQL       = le langage pour parler a la base`,
          },
        ],
        replacements: [],
        placement: 'À relire au début de chaque quête BDD, le temps que le vocabulaire rentre.',
      },
      {
        id: 'SQL-F-1200-t-v2',
        label: 'Regarder une table',
        description: 'La première requête : afficher le contenu d’une table.',
        codeBlocks: [
          {
            id: 'SQL-F-1200-t-v2-c1',
            filename: 'voir-table.sql',
            language: 'sql',
            code: `-- Tout le contenu d'une table
SELECT * FROM ma_table;

-- Seulement certaines colonnes
SELECT colonne_1, colonne_2 FROM ma_table;`,
          },
        ],
        replacements: [
          { token: 'ma_table', description: 'le nom de la table à regarder (client, produit…)' },
          { token: 'colonne_1', description: 'une colonne que tu veux afficher' },
        ],
        placement: 'Dans ton client MySQL ou un fichier .sql, pour vérifier ce qu’il y a dans une table.',
      },
    ],
  }),

  // ————— GROUP BY et fonctions d'agrégation —————
  lesson({
    id: 'SQL-F-1201-LESSON',
    slug: 'group-by-et-agregats',
    title: 'GROUP BY et les fonctions d’agrégation',
    shortTitle: 'GROUP BY',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Regrouper les lignes qui partagent une valeur pour compter, additionner ou faire des moyennes par groupe, avec COUNT, SUM, AVG et le filtre HAVING.',
    utility:
      'Répondre aux questions « combien par… », « total par… », « moyenne par… » directement en SQL.',
    aliases: ['group by', 'agregat', 'count', 'sum', 'avg', 'having', 'fonctions agregation', 'regrouper'],
    keywords: [
      'group by',
      'count',
      'sum',
      'avg',
      'min',
      'max',
      'having',
      'regrouper des lignes',
      'agregation',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1201-TEMPLATE',
    intro:
      'Les <b>fonctions d’agrégation</b> (<code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>) calculent <b>une seule valeur</b> à partir de plusieurs lignes. Combinées à <b>GROUP BY</b>, elles donnent <b>un résultat par groupe</b> : le nombre de commandes <b>par client</b>, le chiffre d’affaires <b>par mois</b>, etc.',
    sections: [
      {
        id: 's1',
        title: 'Compter, additionner : les agrégats',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux savoir <b>combien de commandes il y a en tout</b>, puis <b>combien par client</b>.',
          },
          {
            type: 'paragraph',
            html: 'Sans <code>GROUP BY</code>, une fonction d’agrégation renvoie <b>une valeur pour toute la table</b> :',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1201-l-c1',
              filename: 'total.sql',
              language: 'sql',
              code: `-- Le nombre total de commandes
SELECT COUNT(*) AS nb_commandes FROM commande;

-- Le chiffre d'affaires total
SELECT SUM(montant) AS total FROM commande;`,
            },
          },
          {
            type: 'table',
            headers: ['Fonction', 'Ce qu’elle calcule'],
            rows: [
              ['<code>COUNT(*)</code>', 'le nombre de lignes'],
              ['<code>SUM(col)</code>', 'la somme d’une colonne'],
              ['<code>AVG(col)</code>', 'la moyenne'],
              ['<code>MIN(col)</code> / <code>MAX(col)</code>', 'le plus petit / le plus grand'],
            ],
          },
        ],
      },
      {
        id: 's2',
        title: 'GROUP BY : un résultat par groupe',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>GROUP BY</code> <b>regroupe les lignes qui partagent une valeur</b>. La fonction d’agrégation est alors calculée <b>pour chaque groupe</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1201-l-c2',
              filename: 'group-by.sql',
              language: 'sql',
              code: `-- Nombre de commandes PAR client
SELECT id_client, COUNT(*) AS nb
FROM commande
GROUP BY id_client;

-- Resultat :
-- id_client | nb
--     1     | 2
--     2     | 5`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle :</b> toute colonne du <code>SELECT</code> qui n’est <b>pas</b> dans une fonction d’agrégation <b>doit</b> apparaître dans le <code>GROUP BY</code>.',
          },
        ],
      },
      {
        id: 's3',
        title: 'WHERE avant, HAVING après',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour filtrer, l’endroit compte : <code>WHERE</code> filtre les <b>lignes avant</b> le regroupement · <code>HAVING</code> filtre les <b>groupes après</b> l’agrégation.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1201-l-c3',
              filename: 'having.sql',
              language: 'sql',
              code: `-- Les clients qui ont passe PLUS DE 3 commandes
SELECT id_client, COUNT(*) AS nb
FROM commande
WHERE date_cmd >= '2026-01-01'   -- filtre les lignes (avant)
GROUP BY id_client
HAVING COUNT(*) > 3;             -- filtre les groupes (apres)`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce :</b> on ne peut pas utiliser un agrégat (<code>COUNT(*)…</code>) dans un <code>WHERE</code>. Dès qu’on filtre sur un résultat calculé, c’est <code>HAVING</code>.',
          },
        ],
      },
      {
        id: 's4',
        title: 'L’ordre d’exécution',
        blocks: [
          {
            type: 'paragraph',
            html: 'MySQL lit toujours la requête dans cet ordre, ce qui explique pourquoi <code>WHERE</code> ne « voit » pas encore les groupes :',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1201-l-c4',
              filename: 'ordre.txt',
              language: 'text',
              code: `FROM      -> on prend la table
WHERE     -> on filtre les lignes
GROUP BY  -> on forme les groupes
HAVING    -> on filtre les groupes
SELECT    -> on choisit les colonnes / agregats
ORDER BY  -> on trie le resultat`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre dans le <code>SELECT</code> une colonne non agrégée absente du <code>GROUP BY</code> : erreur (ou résultat faux en MySQL non strict).',
      'Filtrer un agrégat avec <code>WHERE</code> : il faut <code>HAVING</code> (<code>WHERE COUNT(*) &gt; 3</code> est interdit).',
      'Oublier que <code>COUNT(*)</code> compte les lignes alors que <code>COUNT(colonne)</code> ignore les <code>NULL</code>.',
      'Placer <code>HAVING</code> avant <code>GROUP BY</code> : l’ordre est <code>GROUP BY</code> puis <code>HAVING</code>.',
    ],
    takeaways: [
      'les <b>agrégats</b> (<code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>) résument plusieurs lignes en une valeur',
      '<code>GROUP BY</code> = <b>une valeur par groupe</b> de lignes partageant la même clé',
      'toute colonne non agrégée du <code>SELECT</code> doit être dans le <code>GROUP BY</code>',
      '<code>WHERE</code> filtre <b>avant</b> (les lignes) · <code>HAVING</code> filtre <b>après</b> (les groupes)',
      'ordre réel : <code>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</code>',
    ],
  }),
  template({
    id: 'SQL-F-1201-TEMPLATE',
    slug: 'group-by-et-agregats',
    title: 'GROUP BY et les fonctions d’agrégation',
    shortTitle: 'GROUP BY',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Les requêtes GROUP BY prêtes à copier : compter par groupe, sommer / moyenner, filtrer avec HAVING.',
    lede: 'Le GROUP BY prêt à copier. Choisis ton besoin :',
    aliases: ['group by', 'count', 'sum', 'avg', 'having'],
    keywords: ['group by', 'count', 'sum', 'avg', 'having', 'par groupe'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1201-LESSON',
    variants: [
      {
        id: 'SQL-F-1201-t-v1',
        label: 'Compter par groupe',
        description: 'Le nombre de lignes pour chaque valeur d’une colonne.',
        codeBlocks: [
          {
            id: 'SQL-F-1201-t-v1-c1',
            filename: 'compter.sql',
            language: 'sql',
            code: `SELECT colonne, COUNT(*) AS nb
FROM ma_table
GROUP BY colonne;`,
          },
        ],
        replacements: [
          { token: 'colonne', description: 'la colonne qui définit les groupes (id_client, categorie…)' },
          { token: 'ma_table', description: 'ta table' },
          { token: 'nb', description: 'le nom donné au compte (alias)' },
        ],
        placement: 'Pour répondre à « combien de … par … ». Ajoute ORDER BY nb DESC pour classer.',
      },
      {
        id: 'SQL-F-1201-t-v2',
        label: 'Somme / moyenne par groupe',
        description: 'Additionner ou moyenner une colonne pour chaque groupe.',
        codeBlocks: [
          {
            id: 'SQL-F-1201-t-v2-c1',
            filename: 'somme.sql',
            language: 'sql',
            code: `SELECT colonne,
       SUM(montant) AS total,
       AVG(montant) AS moyenne
FROM ma_table
GROUP BY colonne;`,
          },
        ],
        replacements: [
          { token: 'colonne', description: 'la colonne de regroupement' },
          { token: 'montant', description: 'la colonne numérique à additionner / moyenner' },
        ],
        placement: 'Pour un chiffre d’affaires par mois, un panier moyen par client, etc.',
      },
      {
        id: 'SQL-F-1201-t-v3',
        label: 'Filtrer les groupes (HAVING)',
        description: 'Ne garder que les groupes qui remplissent une condition sur l’agrégat.',
        codeBlocks: [
          {
            id: 'SQL-F-1201-t-v3-c1',
            filename: 'having.sql',
            language: 'sql',
            code: `SELECT colonne, COUNT(*) AS nb
FROM ma_table
GROUP BY colonne
HAVING COUNT(*) > 3;`,
          },
        ],
        replacements: [
          { token: 'colonne', description: 'la colonne de regroupement' },
          { token: 'COUNT(*) > 3', description: 'la condition sur l’agrégat (ex. SUM(montant) > 100)' },
        ],
        placement: 'Quand le filtre porte sur un résultat calculé (un COUNT, un SUM), c’est HAVING, pas WHERE.',
      },
    ],
  }),

  // ————— Fonctions texte & date —————
  lesson({
    id: 'SQL-F-1202-LESSON',
    slug: 'fonctions-texte-et-date',
    title: 'Les fonctions texte et date',
    shortTitle: 'Fonctions texte/date',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Transformer les valeurs directement dans la requête : mettre en majuscules, concaténer, mesurer une longueur, ou récupérer la date du jour.',
    utility:
      'Nettoyer et mettre en forme du texte, ou manipuler des dates, sans passer par le code de l’application.',
    aliases: ['concat', 'upper', 'lower', 'length', 'now', 'curdate', 'fonctions texte', 'fonctions date'],
    keywords: [
      'concat',
      'upper',
      'lower',
      'length',
      'now',
      'curdate',
      'fonction texte',
      'fonction date',
      'mettre en majuscules',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1202-TEMPLATE',
    intro:
      'SQL sait <b>transformer les valeurs</b> au moment de les lire. Les fonctions <b>texte</b> (<code>CONCAT</code>, <code>UPPER</code>, <code>LOWER</code>, <code>LENGTH</code>) mettent en forme des chaînes ; les fonctions <b>date</b> (<code>NOW</code>, <code>CURDATE</code>) donnent la date et l’heure. On les utilise dans le <code>SELECT</code>.',
    sections: [
      {
        id: 's1',
        title: 'Mettre en forme du texte',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher les noms en majuscules</b> et <b>coller le prénom et le nom</b> dans une seule colonne.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1202-l-c1',
              filename: 'texte.sql',
              language: 'sql',
              code: `SELECT
  UPPER(nom)              AS nom_maj,     -- en MAJUSCULES
  LOWER(email)            AS email_min,   -- en minuscules
  CONCAT(prenom, ' ', nom) AS nom_complet, -- colle les deux
  LENGTH(nom)            AS taille        -- nombre de caracteres
FROM client;`,
            },
          },
          {
            type: 'table',
            headers: ['Fonction', 'Ce qu’elle fait'],
            rows: [
              ['<code>UPPER(t)</code> / <code>LOWER(t)</code>', 'majuscules / minuscules'],
              ['<code>CONCAT(a, b, …)</code>', 'assemble plusieurs textes'],
              ['<code>LENGTH(t)</code>', 'compte les caractères'],
              ['<code>TRIM(t)</code>', 'enlève les espaces au début / à la fin'],
            ],
          },
        ],
      },
      {
        id: 's2',
        title: 'La date et l’heure',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>NOW()</code> renvoie la <b>date + l’heure</b> actuelles, <code>CURDATE()</code> juste la <b>date</b>. Pratique pour horodater ou comparer.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1202-l-c2',
              filename: 'date.sql',
              language: 'sql',
              code: `SELECT NOW();       -- 2026-07-22 15:30:00
SELECT CURDATE();   -- 2026-07-22

-- Les commandes passees aujourd'hui
SELECT * FROM commande
WHERE date_cmd = CURDATE();`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce :</b> <code>AS</code> donne un nom lisible à la colonne calculée (<code>UPPER(nom) AS nom_maj</code>). Sans <code>AS</code>, la colonne s’appellerait « UPPER(nom) ».',
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>+</code> pour coller du texte : en MySQL c’est <code>CONCAT()</code>, pas <code>+</code>.',
      'Oublier l’alias <code>AS</code> : la colonne garde alors un nom illisible comme « CONCAT(prenom,nom) ».',
      'Confondre <code>NOW()</code> (date + heure) et <code>CURDATE()</code> (date seule) dans une comparaison.',
    ],
    takeaways: [
      'texte : <code>UPPER</code> / <code>LOWER</code>, <code>CONCAT</code> (coller), <code>LENGTH</code> (longueur), <code>TRIM</code>',
      'date : <code>NOW()</code> = date + heure · <code>CURDATE()</code> = date du jour',
      'ces fonctions se placent dans le <code>SELECT</code>',
      'nomme le résultat avec <code>AS</code> pour une colonne lisible',
    ],
  }),
  template({
    id: 'SQL-F-1202-TEMPLATE',
    slug: 'fonctions-texte-et-date',
    title: 'Les fonctions texte et date',
    shortTitle: 'Fonctions texte/date',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Les fonctions prêtes à copier : mise en forme de texte et date du jour.',
    lede: 'À copier selon ton besoin :',
    aliases: ['concat', 'upper', 'lower', 'now', 'curdate'],
    keywords: ['concat', 'upper', 'lower', 'now', 'curdate'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1202-LESSON',
    variants: [
      {
        id: 'SQL-F-1202-t-v1',
        label: 'Mettre en forme du texte',
        description: 'Majuscules, minuscules, concaténation.',
        codeBlocks: [
          {
            id: 'SQL-F-1202-t-v1-c1',
            filename: 'texte.sql',
            language: 'sql',
            code: `SELECT
  UPPER(colonne)              AS en_majuscules,
  CONCAT(col_a, ' ', col_b)   AS assemble
FROM ma_table;`,
          },
        ],
        replacements: [
          { token: 'colonne', description: 'la colonne texte à transformer' },
          { token: 'col_a', description: 'le premier morceau à coller' },
          { token: 'col_b', description: 'le second morceau à coller' },
        ],
        placement: 'Dans le SELECT. Ajoute AS pour nommer la colonne résultat.',
      },
      {
        id: 'SQL-F-1202-t-v2',
        label: 'Date du jour',
        description: 'Récupérer ou comparer avec la date actuelle.',
        codeBlocks: [
          {
            id: 'SQL-F-1202-t-v2-c1',
            filename: 'date.sql',
            language: 'sql',
            code: `-- Horodater
SELECT NOW() AS maintenant;

-- Filtrer sur aujourd'hui
SELECT * FROM ma_table
WHERE colonne_date = CURDATE();`,
          },
        ],
        replacements: [
          { token: 'ma_table', description: 'ta table' },
          { token: 'colonne_date', description: 'la colonne de type DATE à comparer' },
        ],
        placement: 'NOW() pour date + heure, CURDATE() pour la date seule.',
      },
    ],
  }),

  // ————— Sous-requêtes —————
  lesson({
    id: 'SQL-F-1203-LESSON',
    slug: 'sous-requetes',
    title: 'Les sous-requêtes',
    shortTitle: 'Sous-requêtes',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Une requête à l’intérieur d’une autre : filtrer selon le résultat d’un SELECT, ou utiliser une valeur calculée sans faire deux allers-retours.',
    utility:
      'Répondre à des questions du type « les clients qui ont commandé » ou « au-dessus de la moyenne » en une seule requête.',
    aliases: ['sous-requete', 'subquery', 'requete imbriquee', 'select dans select', 'select dans where'],
    keywords: [
      'sous-requete',
      'subquery',
      'requete dans une requete',
      'select imbrique',
      'in select',
      'au dessus de la moyenne',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1203-TEMPLATE',
    intro:
      'Une <b>sous-requête</b> est une requête <code>SELECT</code> <b>placée à l’intérieur d’une autre</b>, entre parenthèses. La requête interne s’exécute d’abord, et son résultat sert à la requête externe. On l’utilise surtout dans le <code>WHERE</code>.',
    sections: [
      {
        id: 's1',
        title: 'Une sous-requête dans le WHERE',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>les clients qui ont au moins une commande</b>, sans faire de jointure.',
          },
          {
            type: 'paragraph',
            html: 'La sous-requête renvoie une <b>liste d’identifiants</b>, et le <code>WHERE … IN (…)</code> garde les lignes qui correspondent.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1203-l-c1',
              filename: 'in-subquery.sql',
              language: 'sql',
              code: `SELECT nom
FROM client
WHERE id_client IN (
  SELECT id_client FROM commande   -- la sous-requete
);`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> la base calcule d’abord la <b>liste entre parenthèses</b>, puis lit la requête externe comme si tu avais écrit <code>WHERE id_client IN (1, 2, 5, …)</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Comparer à une valeur calculée',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une sous-requête peut renvoyer <b>une seule valeur</b> (une moyenne, un maximum) qu’on compare avec <code>=</code>, <code>&gt;</code>, <code>&lt;</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1203-l-c2',
              filename: 'valeur-calculee.sql',
              language: 'sql',
              code: `-- Les produits plus chers que la moyenne
SELECT nom, prix
FROM produit
WHERE prix > (
  SELECT AVG(prix) FROM produit   -- renvoie 1 valeur
);`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'Dans le SELECT ou le FROM',
        blocks: [
          {
            type: 'paragraph',
            html: 'Plus rare : une sous-requête dans le <code>SELECT</code> (une valeur par ligne) ou dans le <code>FROM</code> (une « table dérivée » temporaire).',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1203-l-c3',
              filename: 'select-from.sql',
              language: 'sql',
              code: `-- Une valeur calculee par ligne
SELECT nom,
  (SELECT COUNT(*) FROM commande c WHERE c.id_client = u.id_client) AS nb
FROM client u;`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>=</code> avec une sous-requête qui renvoie <b>plusieurs</b> lignes : il faut <code>IN</code>. <code>=</code> ne marche que pour <b>une</b> valeur.',
      'Oublier les <b>parenthèses</b> autour de la sous-requête.',
      'Écrire une sous-requête là où une <b>jointure</b> serait plus simple et plus rapide : compare les deux.',
    ],
    takeaways: [
      'une <b>sous-requête</b> = un <code>SELECT</code> entre parenthèses dans une autre requête',
      'elle s’exécute <b>en premier</b>, son résultat nourrit la requête externe',
      'liste de valeurs → <code>WHERE col IN (SELECT …)</code>',
      'une seule valeur → comparaison <code>WHERE col &gt; (SELECT AVG(…))</code>',
    ],
  }),
  template({
    id: 'SQL-F-1203-TEMPLATE',
    slug: 'sous-requetes',
    title: 'Les sous-requêtes',
    shortTitle: 'Sous-requêtes',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Les sous-requêtes prêtes à copier : filtrer sur une liste ou comparer à une valeur calculée.',
    lede: 'Choisis ta situation :',
    aliases: ['sous-requete', 'subquery', 'in select', 'select imbrique'],
    keywords: ['sous-requete', 'subquery', 'in', 'avg'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1203-LESSON',
    variants: [
      {
        id: 'SQL-F-1203-t-v1',
        label: 'Filtrer sur une liste',
        description: 'Garder les lignes présentes dans le résultat d’un autre SELECT.',
        codeBlocks: [
          {
            id: 'SQL-F-1203-t-v1-c1',
            filename: 'in.sql',
            language: 'sql',
            code: `SELECT *
FROM table_a
WHERE colonne IN (
  SELECT colonne FROM table_b WHERE condition
);`,
          },
        ],
        replacements: [
          { token: 'table_a', description: 'la table que tu affiches' },
          { token: 'colonne', description: 'la colonne commune (ex. id_client)' },
          { token: 'table_b', description: 'la table qui fournit la liste' },
          { token: 'condition', description: 'un filtre optionnel sur la sous-requête' },
        ],
        placement: 'Quand tu filtres selon « ce qui existe dans une autre table ».',
      },
      {
        id: 'SQL-F-1203-t-v2',
        label: 'Comparer à un calcul',
        description: 'Comparer chaque ligne à une valeur unique (moyenne, max…).',
        codeBlocks: [
          {
            id: 'SQL-F-1203-t-v2-c1',
            filename: 'compare.sql',
            language: 'sql',
            code: `SELECT *
FROM ma_table
WHERE colonne > (
  SELECT AVG(colonne) FROM ma_table
);`,
          },
        ],
        replacements: [
          { token: 'ma_table', description: 'ta table' },
          { token: 'colonne', description: 'la colonne numérique à comparer' },
          { token: 'AVG', description: 'l’agrégat voulu : AVG, MAX, MIN…' },
        ],
        placement: 'Pour « au-dessus de la moyenne », « le plus récent », etc.',
      },
    ],
  }),

  // ————— Transactions (TCL) —————
  lesson({
    id: 'SQL-F-1204-LESSON',
    slug: 'transactions-tcl',
    title: 'Les transactions (COMMIT / ROLLBACK)',
    shortTitle: 'Transactions',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Regrouper plusieurs opérations en un bloc « tout ou rien » : valider avec COMMIT, ou tout annuler avec ROLLBACK si une étape échoue.',
    utility:
      'Éviter les états incohérents (ex. débiter un compte sans créditer l’autre) en validant plusieurs requêtes ensemble.',
    aliases: ['transaction', 'commit', 'rollback', 'savepoint', 'start transaction', 'tcl', 'tout ou rien'],
    keywords: [
      'transaction',
      'commit',
      'rollback',
      'savepoint',
      'start transaction',
      'tout ou rien',
      'annuler des modifications',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1204-TEMPLATE',
    intro:
      'Une <b>transaction</b> regroupe plusieurs requêtes en un seul bloc <b>« tout ou rien »</b>. On l’ouvre avec <code>START TRANSACTION</code>, on la valide définitivement avec <code>COMMIT</code>, ou on <b>annule tout</b> avec <code>ROLLBACK</code> si un problème survient. C’est le <b>filet de sécurité</b> des opérations sensibles.',
    sections: [
      {
        id: 's1',
        title: 'Tout ou rien',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>transférer 50 € d’un compte à un autre</b> : débiter l’un ET créditer l’autre. Si la 2ᵉ étape échoue, la 1ʳᵉ ne doit <b>pas</b> rester.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1204-l-c1',
              filename: 'transaction.sql',
              language: 'sql',
              code: `START TRANSACTION;

UPDATE compte SET solde = solde - 50 WHERE id = 1;
UPDATE compte SET solde = solde + 50 WHERE id = 2;

COMMIT;   -- tout est valide d'un coup`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une transaction, c’est un <b>brouillon</b>. Tant que tu n’as pas fait <code>COMMIT</code>, rien n’est gravé. <code>ROLLBACK</code> jette le brouillon.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Annuler avec ROLLBACK',
        blocks: [
          {
            type: 'paragraph',
            html: 'Si une étape se passe mal, <code>ROLLBACK</code> <b>remet la base exactement comme avant</b> le <code>START TRANSACTION</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1204-l-c2',
              filename: 'rollback.sql',
              language: 'sql',
              code: `START TRANSACTION;

DELETE FROM commande WHERE id_client = 7;
-- Oups, mauvais client !

ROLLBACK;   -- rien n'a ete supprime, on repart a zero`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>SAVEPOINT :</b> pose un <b>point de reprise</b> nommé au milieu d’une transaction. <code>ROLLBACK TO sp1</code> revient à ce point sans tout annuler.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le <code>COMMIT</code> : les modifications restent en attente et peuvent être perdues à la déconnexion.',
      'Croire que <code>ROLLBACK</code> annule après un <code>COMMIT</code> : une fois validé, c’est définitif.',
      'Faire de très longues transactions : elles bloquent les lignes concernées pour les autres utilisateurs.',
    ],
    takeaways: [
      '<code>START TRANSACTION</code> ouvre un bloc « tout ou rien »',
      '<code>COMMIT</code> valide définitivement · <code>ROLLBACK</code> annule tout',
      '<code>SAVEPOINT</code> + <code>ROLLBACK TO</code> = revenir à une étape intermédiaire',
      'idéal pour les opérations liées (transfert, commande + stock…)',
    ],
  }),
  template({
    id: 'SQL-F-1204-TEMPLATE',
    slug: 'transactions-tcl',
    title: 'Les transactions (COMMIT / ROLLBACK)',
    shortTitle: 'Transactions',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Le squelette d’une transaction, avec ou sans point de reprise.',
    lede: 'Le bloc transaction prêt à copier :',
    aliases: ['transaction', 'commit', 'rollback', 'savepoint'],
    keywords: ['start transaction', 'commit', 'rollback', 'savepoint'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1204-LESSON',
    variants: [
      {
        id: 'SQL-F-1204-t-v1',
        label: 'Bloc tout ou rien',
        description: 'Plusieurs opérations validées ensemble.',
        codeBlocks: [
          {
            id: 'SQL-F-1204-t-v1-c1',
            filename: 'transaction.sql',
            language: 'sql',
            code: `START TRANSACTION;

-- tes requetes ici
UPDATE ma_table SET colonne = valeur WHERE condition;

COMMIT;   -- ou ROLLBACK; pour tout annuler`,
          },
        ],
        replacements: [
          { token: 'ma_table', description: 'la table modifiée' },
          { token: 'colonne', description: 'la colonne à changer' },
          { token: 'condition', description: 'le filtre des lignes concernées' },
        ],
        placement: 'Autour de plusieurs requêtes qui doivent réussir ou échouer ensemble.',
      },
      {
        id: 'SQL-F-1204-t-v2',
        label: 'Avec point de reprise',
        description: 'Revenir à une étape intermédiaire sans tout annuler.',
        codeBlocks: [
          {
            id: 'SQL-F-1204-t-v2-c1',
            filename: 'savepoint.sql',
            language: 'sql',
            code: `START TRANSACTION;

INSERT INTO ma_table (col) VALUES ('a');
SAVEPOINT sp1;                 -- point de reprise

INSERT INTO ma_table (col) VALUES ('b');
ROLLBACK TO sp1;              -- annule seulement le 2e INSERT

COMMIT;`,
          },
        ],
        replacements: [
          { token: 'sp1', description: 'le nom de ton point de reprise' },
          { token: 'ma_table', description: 'la table modifiée' },
        ],
        placement: 'Quand tu veux pouvoir annuler une partie seulement de la transaction.',
      },
    ],
  }),

  // ————— Modifier une table (ALTER TABLE) —————
  lesson({
    id: 'SQL-F-1205-LESSON',
    slug: 'modifier-une-table-alter',
    title: 'Modifier une table : ALTER TABLE',
    shortTitle: 'ALTER TABLE',
    technology: 'sql',
    tomeId: 't13',
    summary:
      'Faire évoluer une table déjà créée : ajouter, modifier ou supprimer une colonne, et renommer une colonne ou la table.',
    utility:
      'Changer la structure d’une table sans la recréer ni perdre les données déjà présentes.',
    aliases: ['alter table', 'add column', 'modify column', 'drop column', 'rename column', 'rename table', 'modifier une table'],
    keywords: [
      'alter table',
      'ajouter une colonne',
      'supprimer une colonne',
      'modifier une colonne',
      'renommer une colonne',
      'renommer une table',
      'changer la structure',
    ],
    relatedContentIds: [],
    templateId: 'SQL-F-1205-TEMPLATE',
    intro:
      '<code>ALTER TABLE</code> sert à <b>modifier la structure d’une table existante</b>, sans la supprimer. On peut <b>ajouter</b> une colonne (<code>ADD</code>), <b>changer son type</b> (<code>MODIFY</code>), la <b>supprimer</b> (<code>DROP</code>) ou <b>renommer</b> colonne et table. Les données déjà présentes restent.',
    sections: [
      {
        id: 's1',
        title: 'Ajouter, modifier, supprimer une colonne',
        blocks: [
          {
            type: 'situation',
            html: 'Ma table <code>client</code> existe déjà, mais j’ai oublié la colonne <code>telephone</code>. Je veux l’ajouter <b>sans tout refaire</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'SQL-F-1205-l-c1',
              filename: 'alter-colonnes.sql',
              language: 'sql',
              code: `-- Ajouter une colonne
ALTER TABLE client ADD telephone VARCHAR(20);

-- Changer le type d'une colonne
ALTER TABLE client MODIFY telephone VARCHAR(30);

-- Supprimer une colonne
ALTER TABLE client DROP COLUMN telephone;`,
            },
          },
          {
            type: 'table',
            headers: ['Action', 'Mot-clé'],
            rows: [
              ['Ajouter une colonne', '<code>ADD</code>'],
              ['Changer le type', '<code>MODIFY</code> (MySQL)'],
              ['Supprimer une colonne', '<code>DROP COLUMN</code>'],
            ],
          },
        ],
      },
      {
        id: 's2',
        title: 'Renommer une colonne ou la table',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'SQL-F-1205-l-c2',
              filename: 'renommer.sql',
              language: 'sql',
              code: `-- Renommer une colonne (MySQL 8+)
ALTER TABLE client RENAME COLUMN nom TO nom_complet;

-- Renommer la table
RENAME TABLE client TO clients;
-- (equivaut a : ALTER TABLE client RENAME TO clients;)`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Attention :</b> <code>DROP COLUMN</code> supprime la colonne <b>et ses données</b>, définitivement. Vérifie avant, il n’y a pas de <code>ROLLBACK</code> possible hors transaction.',
          },
        ],
      },
    ],
    pitfalls: [
      'Confondre <code>ALTER TABLE</code> (change la <b>structure</b>) et <code>UPDATE</code> (change les <b>données</b>).',
      '<code>DROP COLUMN</code> efface les données de la colonne : aucune récupération possible ensuite.',
      'Utiliser <code>MODIFY</code> sous PostgreSQL : là-bas c’est <code>ALTER COLUMN … TYPE</code>. La syntaxe varie selon le SGBD.',
    ],
    takeaways: [
      '<code>ALTER TABLE</code> modifie une table existante sans la recréer',
      '<code>ADD</code> (ajouter) · <code>MODIFY</code> (changer le type) · <code>DROP COLUMN</code> (supprimer)',
      '<code>RENAME COLUMN … TO …</code> et <code>RENAME TABLE … TO …</code> pour renommer',
      '<code>DROP COLUMN</code> supprime les données : à manier avec précaution',
    ],
  }),
  template({
    id: 'SQL-F-1205-TEMPLATE',
    slug: 'modifier-une-table-alter',
    title: 'Modifier une table : ALTER TABLE',
    shortTitle: 'ALTER TABLE',
    technology: 'sql',
    tomeId: 't13',
    summary: 'Les ALTER TABLE prêts à copier : ajouter, modifier, supprimer, renommer.',
    lede: 'Choisis la modification :',
    aliases: ['alter table', 'add column', 'drop column', 'rename column', 'rename table'],
    keywords: ['alter table', 'add', 'modify', 'drop column', 'rename'],
    relatedContentIds: [],
    lessonId: 'SQL-F-1205-LESSON',
    variants: [
      {
        id: 'SQL-F-1205-t-v1',
        label: 'Ajouter une colonne',
        description: 'Ajouter une colonne à une table existante.',
        codeBlocks: [
          {
            id: 'SQL-F-1205-t-v1-c1',
            filename: 'add.sql',
            language: 'sql',
            code: `ALTER TABLE ma_table ADD nouvelle_colonne VARCHAR(100);`,
          },
        ],
        replacements: [
          { token: 'ma_table', description: 'la table à faire évoluer' },
          { token: 'nouvelle_colonne', description: 'le nom de la colonne à ajouter' },
          { token: 'VARCHAR(100)', description: 'son type (INT, DATE, DECIMAL…)' },
        ],
        placement: 'Quand une table existe déjà et qu’il manque une information.',
      },
      {
        id: 'SQL-F-1205-t-v2',
        label: 'Modifier / supprimer',
        description: 'Changer le type d’une colonne ou la supprimer.',
        codeBlocks: [
          {
            id: 'SQL-F-1205-t-v2-c1',
            filename: 'modify-drop.sql',
            language: 'sql',
            code: `-- Changer le type
ALTER TABLE ma_table MODIFY colonne VARCHAR(200);

-- Supprimer la colonne (definitif !)
ALTER TABLE ma_table DROP COLUMN colonne;`,
          },
        ],
        replacements: [
          { token: 'ma_table', description: 'la table concernée' },
          { token: 'colonne', description: 'la colonne à modifier ou supprimer' },
        ],
        placement: 'MODIFY pour changer le type, DROP COLUMN pour l’enlever (irréversible).',
      },
      {
        id: 'SQL-F-1205-t-v3',
        label: 'Renommer',
        description: 'Renommer une colonne ou la table entière.',
        codeBlocks: [
          {
            id: 'SQL-F-1205-t-v3-c1',
            filename: 'rename.sql',
            language: 'sql',
            code: `-- Une colonne (MySQL 8+)
ALTER TABLE ma_table RENAME COLUMN ancien TO nouveau;

-- La table
RENAME TABLE ancien_nom TO nouveau_nom;`,
          },
        ],
        replacements: [
          { token: 'ma_table', description: 'la table contenant la colonne' },
          { token: 'ancien', description: 'le nom actuel de la colonne' },
          { token: 'nouveau', description: 'le nouveau nom de la colonne' },
        ],
        placement: 'Pour corriger un nom mal choisi sans perdre les données.',
      },
    ],
  }),
];
