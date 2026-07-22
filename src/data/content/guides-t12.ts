import type { ReadyContent } from '@/types/content';
import { guide } from './_factory';

export const guidesT121Content: ReadyContent[] = [
  // ————— Créer une API Express et MySQL —————
  guide({
    id: 'GUIDE-W6-129',
    slug: 'creer-une-api-express-et-mysql',
    title: 'Créer une API Express et MySQL',
    shortTitle: 'API Express + MySQL',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Monter un serveur Express qui se connecte à une base MySQL et expose une route qui renvoie des données en JSON.',
    objective: 'Une API qui lit une table MySQL et renvoie les lignes en JSON.',
    preview:
      'Tu lances le serveur, tu ouvres GET /produits et tu obtiens la liste des produits de ta base au format JSON.',
    aliases: ['api express', 'express mysql', 'serveur node mysql', 'backend api'],
    keywords: ['express mysql', 'connexion base de donnees', 'route json', 'mysql2 pool'],
    relatedContentIds: [],
    files: ['package.json', '.env', 'db.js', 'server.js'],
    steps: [
      {
        id: 'GUIDE-W6-129-e1',
        title: 'Installer Express et le driver MySQL',
        goal: 'Préparer le projet et ses dépendances.',
        explanation:
          'On installe <code>express</code> pour créer le serveur et <code>mysql2</code> pour parler à MySQL. On ajoute <code>dotenv</code> pour lire les identifiants de connexion depuis un fichier <code>.env</code> plutôt que de les écrire en dur dans le code : c’est plus sûr et ça évite de pousser tes mots de passe sur GitHub.',
        files: ['package.json'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-129-cb1',
            filename: 'terminal',
            language: 'bash',
            code: `npm init -y
npm install express mysql2 dotenv
# On lance le serveur avec node server.js (ou nodemon en dev)`,
          },
        ],
        result: 'Le projet a Express, mysql2 et dotenv d’installés.',
      },
      {
        id: 'GUIDE-W6-129-e2',
        title: 'Créer la connexion à MySQL',
        goal: 'Ouvrir un pool de connexions réutilisable.',
        explanation:
          'On isole la connexion dans <code>db.js</code> pour la partager partout. On utilise un <b>pool</b> plutôt qu’une connexion unique : le pool garde plusieurs connexions ouvertes et les distribue au besoin, ce qui évite de rouvrir la base à chaque requête. Les identifiants viennent de <code>process.env</code>, donc du fichier <code>.env</code>.',
        files: ['.env', 'db.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-129-cb2',
            filename: '.env',
            language: 'bash',
            code: `DB_HOST=localhost
DB_USER=root
DB_PASSWORD=motdepasse
DB_NAME=ma_boutique`,
          },
          {
            id: 'GUIDE-W6-129-cb3',
            filename: 'db.js',
            language: 'javascript',
            code: `const mysql = require("mysql2/promise");
require("dotenv").config();

// Pool = plusieurs connexions prêtes, réutilisées automatiquement
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;`,
          },
        ],
        result: 'On peut importer pool partout pour interroger la base.',
      },
      {
        id: 'GUIDE-W6-129-e3',
        title: 'Créer le serveur Express',
        goal: 'Démarrer un serveur qui écoute les requêtes.',
        explanation:
          'On crée l’application Express et on active <code>express.json()</code> : ce middleware lit automatiquement le corps JSON des requêtes entrantes (utile dès qu’on enverra des données). Enfin <code>app.listen</code> démarre le serveur sur un port et affiche un message quand il est prêt.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-129-cb4',
            filename: 'server.js',
            language: 'javascript',
            code: `const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json()); // lit le JSON reçu dans req.body

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Serveur prêt sur http://localhost:" + PORT);
});`,
          },
        ],
        result: 'Le serveur démarre et écoute sur le port 3000.',
      },
      {
        id: 'GUIDE-W6-129-e4',
        title: 'Ajouter une route qui lit la base',
        goal: 'Renvoyer les lignes d’une table en JSON.',
        explanation:
          'On écrit une route <code>GET</code> asynchrone. <code>pool.query</code> renvoie un tableau dont le <b>premier</b> élément contient les lignes : d’où <code>const [rows]</code>. On enveloppe l’appel dans un <code>try/catch</code> pour renvoyer un code <code>500</code> propre si la base est indisponible, au lieu de laisser le serveur planter.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-129-cb5',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/produits", async (req, res) => {
  try {
    // pool.query renvoie [lignes, infos] : on récupère les lignes
    const [rows] = await pool.query("SELECT * FROM produits");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erreur: "Erreur base de données" });
  }
});`,
          },
        ],
        result: 'GET /produits renvoie la liste des produits en JSON.',
      },
    ],
    finalResult:
      'Une API Express reliée à MySQL via un pool, avec une route qui lit une table et renvoie du JSON, sans identifiants en dur.',
    pitfalls: [
      'Oublier .env dans le .gitignore : tes identifiants MySQL finissent sur GitHub.',
      'Écrire const rows au lieu de const [rows] : tu récupères aussi les métadonnées et l’affichage est faux.',
      'Ne pas mettre de try/catch : une base indisponible fait planter tout le serveur.',
    ],
    variations: [
      'Externaliser les routes dans un dossier routes/ quand elles se multiplient.',
      'Ajouter le middleware cors si un front React appelle l’API depuis un autre port.',
    ],
  }),

  // ————— Créer un CRUD full-stack : SQL, Express et React —————
  guide({
    id: 'GUIDE-W6-130',
    slug: 'creer-un-crud-full-stack-sql-express-et-react',
    title: 'Créer un CRUD full-stack : SQL, Express et React',
    shortTitle: 'CRUD full-stack',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Relier une table SQL, quatre routes Express (lister, créer, modifier, supprimer) et un front React qui les consomme.',
    objective: 'Gérer une ressource de bout en bout : créer, lire, modifier, supprimer.',
    preview:
      'Le React affiche la liste des tâches, un formulaire les ajoute, chaque ligne a un bouton Supprimer ; tout est stocké en base.',
    aliases: ['crud', 'crud express react', 'full stack', 'crud mysql'],
    keywords: ['crud complet', 'post put delete', 'express react api', 'formulaire base'],
    relatedContentIds: [],
    files: ['schema.sql', 'server.js', 'App.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-130-e1',
        title: 'Créer la table en SQL',
        goal: 'Préparer le stockage de la ressource.',
        explanation:
          'On crée une table <code>taches</code>. La colonne <code>id</code> est <code>AUTO_INCREMENT</code> et <code>PRIMARY KEY</code> : MySQL attribue un identifiant unique à chaque ligne automatiquement. <code>created_at</code> avec <code>DEFAULT CURRENT_TIMESTAMP</code> enregistre la date de création sans qu’on ait à la fournir.',
        files: ['schema.sql'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-130-cb1',
            filename: 'schema.sql',
            language: 'sql',
            code: `CREATE TABLE taches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  faite BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
          },
        ],
        result: 'La table taches est prête à recevoir des lignes.',
      },
      {
        id: 'GUIDE-W6-130-e2',
        title: 'Routes lister et créer',
        goal: 'Exposer GET et POST côté Express.',
        explanation:
          'Le <code>GET</code> renvoie toutes les tâches. Le <code>POST</code> lit le titre dans <code>req.body</code> (grâce à <code>express.json()</code>) et l’insère. On utilise un <b>placeholder</b> <code>?</code> avec un tableau de valeurs : c’est ce qui protège contre les injections SQL, car mysql2 échappe la valeur à ta place. <code>result.insertId</code> donne l’id généré, qu’on renvoie au front.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-130-cb2',
            filename: 'server.js',
            language: 'javascript',
            code: `// Lister
app.get("/taches", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM taches ORDER BY id DESC");
  res.json(rows);
});

// Créer
app.post("/taches", async (req, res) => {
  const { titre } = req.body;
  // Le ? est remplacé de façon sûre par titre (anti-injection)
  const [result] = await pool.query(
    "INSERT INTO taches (titre) VALUES (?)",
    [titre]
  );
  res.status(201).json({ id: result.insertId, titre, faite: false });
});`,
          },
        ],
        result: 'On peut lister et ajouter des tâches via l’API.',
      },
      {
        id: 'GUIDE-W6-130-e3',
        title: 'Routes modifier et supprimer',
        goal: 'Compléter le CRUD avec PUT et DELETE.',
        explanation:
          'Le <code>PUT</code> et le <code>DELETE</code> ciblent une ligne précise grâce à <code>:id</code> dans l’URL, lu via <code>req.params.id</code>. Ici encore, l’id passe par un placeholder <code>?</code>. On renvoie un statut clair : <code>204</code> pour une suppression réussie (pas de contenu à retourner).',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-130-cb3',
            filename: 'server.js',
            language: 'javascript',
            code: `// Modifier (marquer faite / non faite)
app.put("/taches/:id", async (req, res) => {
  const { faite } = req.body;
  await pool.query(
    "UPDATE taches SET faite = ? WHERE id = ?",
    [faite, req.params.id]
  );
  res.json({ id: Number(req.params.id), faite });
});

// Supprimer
app.delete("/taches/:id", async (req, res) => {
  await pool.query("DELETE FROM taches WHERE id = ?", [req.params.id]);
  res.status(204).end(); // 204 = succès sans contenu
});`,
          },
        ],
        result: 'Le CRUD est complet côté serveur.',
      },
      {
        id: 'GUIDE-W6-130-e4',
        title: 'Afficher et créer côté React',
        goal: 'Consommer l’API depuis le front.',
        explanation:
          'Au montage, <code>useEffect</code> charge la liste une seule fois. À la soumission du formulaire, on envoie un <code>POST</code> avec <code>fetch</code> : le header <code>Content-Type: application/json</code> et <code>JSON.stringify</code> sont indispensables pour que le serveur comprenne le corps. On ajoute la tâche renvoyée au state pour rafraîchir l’écran sans recharger.',
        files: ['App.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-130-cb4',
            filename: 'App.tsx',
            language: 'tsx',
            code: `const [taches, setTaches] = useState<{ id: number; titre: string }[]>([]);
const [titre, setTitre] = useState("");

useEffect(() => {
  fetch("http://localhost:3000/taches")
    .then((r) => r.json())
    .then(setTaches);
}, []);

async function ajouter(e: React.FormEvent) {
  e.preventDefault();
  const r = await fetch("http://localhost:3000/taches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titre }),
  });
  const creee = await r.json();
  setTaches([creee, ...taches]); // on ajoute en haut de la liste
  setTitre("");
}`,
          },
        ],
        result: 'Le front affiche et crée des tâches en base.',
      },
      {
        id: 'GUIDE-W6-130-e5',
        title: 'Supprimer côté React',
        goal: 'Retirer une ligne du serveur et de l’écran.',
        explanation:
          'On appelle la route <code>DELETE</code> avec l’id, puis on met à jour le state en <b>filtrant</b> la tâche supprimée. Cette double action est la clé : la base est nettoyée, et l’écran reflète le changement immédiatement sans refetch complet.',
        files: ['App.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-130-cb5',
            filename: 'App.tsx',
            language: 'tsx',
            code: `async function supprimer(id: number) {
  await fetch("http://localhost:3000/taches/" + id, { method: "DELETE" });
  // On retire la tâche de la liste affichée
  setTaches(taches.filter((t) => t.id !== id));
}

return (
  <ul>
    {taches.map((t) => (
      <li key={t.id}>
        {t.titre}
        <button onClick={() => supprimer(t.id)}>Supprimer</button>
      </li>
    ))}
  </ul>
);`,
          },
        ],
        result: 'Le CRUD fonctionne de bout en bout : SQL, Express, React.',
      },
    ],
    finalResult:
      'Une ressource gérée entièrement : table SQL, quatre routes Express sécurisées par placeholders, et un React qui liste, crée et supprime en direct.',
    pitfalls: [
      'Oublier le header Content-Type et JSON.stringify : le serveur reçoit un req.body vide.',
      'Concaténer les valeurs dans la requête SQL au lieu d’utiliser ? : porte ouverte aux injections.',
      'Ne pas mettre à jour le state après une action : l’écran et la base se désynchronisent.',
    ],
    variations: [
      'Ajouter la validation des champs avant l’insertion (titre non vide).',
      'Gérer les états de chargement et d’erreur autour de chaque fetch.',
    ],
  }),

  // ————— Créer une relation entre tables : users vers posts —————
  guide({
    id: 'GUIDE-W6-131',
    slug: 'creer-une-relation-entre-tables-users-vers-posts',
    title: 'Créer une relation entre tables : users vers posts',
    shortTitle: 'Relation users → posts',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Lier deux tables avec une clé étrangère et récupérer chaque post avec le nom de son auteur grâce à un JOIN.',
    objective: 'Un post appartient à un utilisateur, et l’API renvoie les deux ensemble.',
    preview:
      'GET /posts renvoie chaque post avec le nom de l’auteur, obtenu en une seule requête grâce à un JOIN.',
    aliases: ['relation tables', 'cle etrangere', 'foreign key', 'join sql', 'users posts'],
    keywords: ['clé étrangère', 'jointure join', 'relation un a plusieurs', 'foreign key mysql'],
    relatedContentIds: [],
    files: ['schema.sql', 'server.js'],
    steps: [
      {
        id: 'GUIDE-W6-131-e1',
        title: 'Créer les deux tables liées',
        goal: 'Poser la clé étrangère entre posts et users.',
        explanation:
          'La table <code>posts</code> contient une colonne <code>user_id</code> qui pointe vers <code>users.id</code> : c’est une <b>clé étrangère</b>. La contrainte <code>FOREIGN KEY</code> garantit qu’on ne peut pas créer un post avec un <code>user_id</code> qui n’existe pas. C’est une relation « un utilisateur a plusieurs posts ».',
        files: ['schema.sql'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-131-cb1',
            filename: 'schema.sql',
            language: 'sql',
            code: `CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  -- user_id doit correspondre à un id existant dans users
  FOREIGN KEY (user_id) REFERENCES users(id)
);`,
          },
        ],
        result: 'Chaque post est rattaché à un utilisateur existant.',
      },
      {
        id: 'GUIDE-W6-131-e2',
        title: 'Créer un post rattaché à un user',
        goal: 'Insérer un post avec son user_id.',
        explanation:
          'Pour créer un post, on fournit son <code>titre</code> et le <code>user_id</code> de son auteur. Grâce à la clé étrangère, si le <code>user_id</code> n’existe pas, MySQL refuse l’insertion. On enveloppe donc dans un <code>try/catch</code> pour renvoyer une erreur claire dans ce cas.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-131-cb2',
            filename: 'server.js',
            language: 'javascript',
            code: `app.post("/posts", async (req, res) => {
  const { titre, user_id } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO posts (titre, user_id) VALUES (?, ?)",
      [titre, user_id]
    );
    res.status(201).json({ id: result.insertId, titre, user_id });
  } catch (err) {
    // Se déclenche si user_id ne correspond à aucun utilisateur
    res.status(400).json({ erreur: "Utilisateur introuvable" });
  }
});`,
          },
        ],
        result: 'On crée des posts liés à un utilisateur valide.',
      },
      {
        id: 'GUIDE-W6-131-e3',
        title: 'Lire les posts avec leur auteur (JOIN)',
        goal: 'Récupérer post + nom d’auteur en une requête.',
        explanation:
          'Le <code>JOIN</code> combine les deux tables sur la condition <code>posts.user_id = users.id</code>. On choisit précisément les colonnes voulues et on renomme <code>users.nom</code> en <code>auteur</code> avec <code>AS</code>. Résultat : chaque ligne renvoyée contient le post <b>et</b> le nom de son auteur, sans faire une deuxième requête par post.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-131-cb3',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/posts", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT posts.id, posts.titre, users.nom AS auteur " +
    "FROM posts " +
    "JOIN users ON posts.user_id = users.id " +
    "ORDER BY posts.id DESC"
  );
  res.json(rows);
});`,
          },
        ],
        result: 'GET /posts renvoie chaque post avec le nom de l’auteur.',
      },
      {
        id: 'GUIDE-W6-131-e4',
        title: 'Lister les posts d’un utilisateur',
        goal: 'Filtrer les posts par auteur.',
        explanation:
          'On ajoute une route qui prend un <code>:id</code> d’utilisateur et renvoie seulement ses posts, grâce à un <code>WHERE user_id = ?</code>. C’est le côté « plusieurs » de la relation : depuis un utilisateur, on remonte à tous ses posts.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-131-cb4',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/users/:id/posts", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM posts WHERE user_id = ? ORDER BY id DESC",
    [req.params.id]
  );
  res.json(rows);
});`,
          },
        ],
        result: 'On obtient tous les posts d’un utilisateur donné.',
      },
    ],
    finalResult:
      'Deux tables reliées par une clé étrangère, avec une API qui crée des posts rattachés à un auteur et les relit via un JOIN, plus la liste des posts par utilisateur.',
    pitfalls: [
      'Oublier la contrainte FOREIGN KEY : des posts peuvent référencer des utilisateurs inexistants.',
      'Faire une requête par post pour retrouver l’auteur (problème N+1) au lieu d’un seul JOIN.',
      'Ne pas préfixer les colonnes (posts.id, users.nom) : ambiguïté quand les deux tables ont une colonne id.',
    ],
    variations: [
      'Ajouter ON DELETE CASCADE pour supprimer les posts quand l’utilisateur est supprimé.',
      'Utiliser un LEFT JOIN pour lister aussi les utilisateurs sans aucun post.',
    ],
  }),

  // ————— Pagination et recherche côté serveur —————
  guide({
    id: 'GUIDE-W6-132',
    slug: 'pagination-et-recherche-cote-serveur',
    title: 'Pagination et recherche côté serveur',
    shortTitle: 'Pagination serveur',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Renvoyer une liste page par page et filtrée, directement en SQL avec LIMIT, OFFSET et LIKE, via des paramètres d’URL.',
    objective: 'Une API qui pagine et recherche sans jamais charger toute la table.',
    preview:
      'GET /produits?page=2&q=cafe renvoie la 2ᵉ page des produits dont le nom contient « cafe », plus le total.',
    aliases: ['pagination serveur', 'limit offset', 'recherche sql', 'search backend'],
    keywords: ['limit offset', 'query params', 'recherche like', 'pagination sql'],
    relatedContentIds: [],
    files: ['server.js'],
    steps: [
      {
        id: 'GUIDE-W6-132-e1',
        title: 'Lire les paramètres d’URL',
        goal: 'Récupérer page et recherche depuis la query.',
        explanation:
          'Les paramètres après le <code>?</code> arrivent dans <code>req.query</code>, toujours sous forme de <b>chaînes</b>. On convertit <code>page</code> en nombre avec des valeurs par défaut, et on calcule l’<code>OFFSET</code> : c’est le nombre de lignes à sauter avant de commencer la page demandée.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-132-cb1',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/produits", async (req, res) => {
  const parPage = 10;
  // req.query renvoie des chaînes : on force en nombre
  const page = Number(req.query.page) || 1;
  const q = req.query.q || "";
  const offset = (page - 1) * parPage; // lignes à sauter
});`,
          },
        ],
        result: 'On connaît la page demandée, la recherche et l’offset.',
      },
      {
        id: 'GUIDE-W6-132-e2',
        title: 'Filtrer avec LIKE',
        goal: 'Ne garder que les lignes qui matchent la recherche.',
        explanation:
          'Le <code>WHERE nom LIKE ?</code> filtre les noms qui contiennent la recherche. Les <code>%</code> autour du terme veulent dire « n’importe quoi avant et après ». On construit la valeur <code>"%cafe%"</code> côté JavaScript et on la passe par le placeholder, ce qui reste sûr même avec une recherche vide (elle matche alors tout).',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-132-cb2',
            filename: 'server.js',
            language: 'javascript',
            code: `  // %terme% = le nom contient le terme n'importe où
  const recherche = "%" + q + "%";
  const [rows] = await pool.query(
    "SELECT * FROM produits WHERE nom LIKE ? ORDER BY id LIMIT ? OFFSET ?",
    [recherche, parPage, offset]
  );`,
          },
        ],
        result: 'Seules les lignes correspondant à la recherche sortent.',
      },
      {
        id: 'GUIDE-W6-132-e3',
        title: 'Limiter à une page avec LIMIT / OFFSET',
        goal: 'Ne renvoyer qu’une tranche de résultats.',
        explanation:
          '<code>LIMIT</code> fixe le nombre maximum de lignes renvoyées (la taille d’une page) et <code>OFFSET</code> saute les pages précédentes. C’est la pagination faite <b>par la base</b> : contrairement au <code>slice</code> côté client, on ne transfère jamais toute la table sur le réseau, seulement 10 lignes.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-132-cb3',
            filename: 'server.js',
            language: 'sql',
            code: `-- LIMIT 10 OFFSET 10 = les lignes 11 à 20 (la page 2)
SELECT * FROM produits
WHERE nom LIKE '%cafe%'
ORDER BY id
LIMIT 10 OFFSET 10;`,
          },
        ],
        result: 'La base ne renvoie que les lignes de la page voulue.',
      },
      {
        id: 'GUIDE-W6-132-e4',
        title: 'Renvoyer le total pour l’interface',
        goal: 'Permettre au front de connaître le nombre de pages.',
        explanation:
          'Le front a besoin du nombre total de résultats pour afficher « page 2 sur 7 ». On fait une deuxième requête <code>COUNT(*)</code> avec le <b>même</b> filtre, puis on renvoie données et métadonnées ensemble. Le calcul du nombre de pages se fait avec <code>Math.ceil(total / parPage)</code>.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-132-cb4',
            filename: 'server.js',
            language: 'javascript',
            code: `  const [[compte]] = await pool.query(
    "SELECT COUNT(*) AS total FROM produits WHERE nom LIKE ?",
    [recherche]
  );

  res.json({
    donnees: rows,
    page,
    total: compte.total,
    totalPages: Math.ceil(compte.total / parPage),
  });`,
          },
        ],
        result: 'Le front reçoit les données ET de quoi afficher la pagination.',
      },
    ],
    finalResult:
      'Une API qui pagine et recherche en SQL (LIMIT, OFFSET, LIKE) à partir de paramètres d’URL, et renvoie le total pour piloter l’interface, sans jamais transférer toute la table.',
    pitfalls: [
      'Oublier de convertir req.query.page en nombre : le calcul de l’offset est faux.',
      'Paginer côté client sur une table énorme : on télécharge tout pour n’afficher que 10 lignes.',
      'Utiliser un filtre différent entre la requête de données et le COUNT : le total ne correspond plus.',
    ],
    variations: [
      'Ajouter un tri dynamique via un paramètre ?tri=prix (en validant les colonnes autorisées).',
      'Rechercher sur plusieurs colonnes avec WHERE nom LIKE ? OR description LIKE ?.',
    ],
  }),

  // ————— Uploader un fichier sur le serveur —————
  guide({
    id: 'GUIDE-W6-133',
    slug: 'uploader-un-fichier-sur-le-serveur',
    title: 'Uploader un fichier sur le serveur',
    shortTitle: 'Upload fichier',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Recevoir un fichier envoyé depuis un formulaire, le stocker sur le serveur avec Multer et le rendre accessible via une URL.',
    objective: 'Un endpoint qui reçoit un fichier et renvoie son URL.',
    preview:
      'Le front envoie une image, le serveur l’enregistre dans /uploads et renvoie l’URL pour l’afficher.',
    aliases: ['upload fichier', 'multer', 'envoyer image serveur', 'formdata'],
    keywords: ['multer upload', 'multipart form data', 'stocker fichier', 'servir static'],
    relatedContentIds: [],
    files: ['server.js', 'Upload.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-133-e1',
        title: 'Installer et configurer Multer',
        goal: 'Préparer la réception de fichiers.',
        explanation:
          'Un fichier n’est pas du JSON : il arrive en <code>multipart/form-data</code>, un format qu’Express ne lit pas seul. <b>Multer</b> est le middleware qui décode ce format. On configure un <code>diskStorage</code> pour choisir le dossier de destination et générer un nom unique (avec la date) afin d’éviter que deux fichiers du même nom s’écrasent.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-133-cb1',
            filename: 'terminal',
            language: 'bash',
            code: `npm install multer`,
          },
          {
            id: 'GUIDE-W6-133-cb2',
            filename: 'server.js',
            language: 'javascript',
            code: `const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/", // dossier de stockage
  filename: (req, file, cb) => {
    // Nom unique : date + extension d'origine
    const nom = Date.now() + path.extname(file.originalname);
    cb(null, nom);
  },
});

const upload = multer({ storage });`,
          },
        ],
        result: 'Multer est prêt à recevoir et stocker les fichiers.',
      },
      {
        id: 'GUIDE-W6-133-e2',
        title: 'Créer la route d’upload',
        goal: 'Recevoir un fichier et renvoyer son URL.',
        explanation:
          'On place <code>upload.single("fichier")</code> comme middleware sur la route : il traite le champ nommé <code>fichier</code> du formulaire. Une fois passé, les infos du fichier stocké sont dans <code>req.file</code>. On construit l’URL publique à partir de son nom et on la renvoie au front.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-133-cb3',
            filename: 'server.js',
            language: 'javascript',
            code: `// upload.single lit le champ "fichier" du formulaire
app.post("/upload", upload.single("fichier"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ erreur: "Aucun fichier reçu" });
  }
  // req.file contient filename, size, mimetype...
  const url = "http://localhost:3000/uploads/" + req.file.filename;
  res.json({ url });
});`,
          },
        ],
        result: 'La route enregistre le fichier et renvoie son URL.',
      },
      {
        id: 'GUIDE-W6-133-e3',
        title: 'Rendre les fichiers accessibles',
        goal: 'Servir le dossier uploads en statique.',
        explanation:
          'Enregistrer le fichier ne suffit pas : il faut pouvoir l’afficher. <code>express.static</code> expose le contenu d’un dossier tel quel. En le montant sur le chemin <code>/uploads</code>, l’URL renvoyée à l’étape précédente devient directement ouvrable dans un navigateur ou une balise <code>img</code>.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-133-cb4',
            filename: 'server.js',
            language: 'javascript',
            code: `// Rend le dossier uploads accessible via /uploads/nom-du-fichier
app.use("/uploads", express.static("uploads"));`,
          },
        ],
        result: 'Les fichiers uploadés sont visibles via leur URL.',
      },
      {
        id: 'GUIDE-W6-133-e4',
        title: 'Envoyer le fichier depuis React',
        goal: 'Poster un fichier avec FormData.',
        explanation:
          'Côté front, on ne peut pas envoyer un fichier en JSON. On utilise un objet <code>FormData</code> et on y ajoute le fichier sous la clé <code>fichier</code> (le même nom que dans <code>upload.single</code>). Point important : on ne met <b>pas</b> de header <code>Content-Type</code> manuel, le navigateur le règle automatiquement avec les bonnes limites de séparation.',
        files: ['Upload.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-133-cb5',
            filename: 'Upload.tsx',
            language: 'tsx',
            code: `async function envoyer(fichier: File) {
  const data = new FormData();
  data.append("fichier", fichier); // même nom que dans upload.single

  const r = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: data, // pas de header Content-Type : le navigateur le gère
  });
  const { url } = await r.json();
  return url; // URL de l'image stockée
}`,
          },
        ],
        result: 'Le front envoie un fichier et reçoit son URL en retour.',
      },
    ],
    finalResult:
      'Un upload complet : Multer stocke le fichier sous un nom unique, express.static le rend accessible, et React l’envoie via FormData pour récupérer son URL.',
    pitfalls: [
      'Fixer manuellement Content-Type côté React : le multipart casse, req.file reste vide.',
      'Garder le nom d’origine : deux fichiers homonymes s’écrasent l’un l’autre.',
      'Oublier express.static : le fichier est bien enregistré mais impossible à afficher.',
    ],
    variations: [
      'Limiter la taille et le type de fichier avec les options limits et fileFilter de Multer.',
      'Enregistrer l’URL du fichier en base pour la lier à un utilisateur ou un produit.',
    ],
  }),

  // ————— Envoyer un email —————
  guide({
    id: 'GUIDE-W6-134',
    slug: 'envoyer-un-email',
    title: 'Envoyer un email',
    shortTitle: 'Envoyer un email',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Envoyer un email depuis une route Express avec Nodemailer, en gardant les identifiants SMTP hors du code.',
    objective: 'Une route qui envoie un email quand on l’appelle.',
    preview:
      'POST /contact reçoit un message et déclenche l’envoi d’un email de confirmation à l’adresse fournie.',
    aliases: ['envoyer email', 'nodemailer', 'smtp node', 'mail express'],
    keywords: ['nodemailer', 'envoi email', 'transporter smtp', 'sendmail'],
    relatedContentIds: [],
    files: ['.env', 'mailer.js', 'server.js'],
    steps: [
      {
        id: 'GUIDE-W6-134-e1',
        title: 'Installer Nodemailer et stocker le SMTP',
        goal: 'Préparer l’envoi et cacher les identifiants.',
        explanation:
          'Envoyer un email passe par un serveur <b>SMTP</b> (celui de ton fournisseur : Gmail, un service transactionnel, etc.). On installe <code>nodemailer</code> et on met l’adresse, le port et surtout le mot de passe d’application dans un <code>.env</code> : ces secrets ne doivent jamais apparaître dans le code versionné.',
        files: ['.env'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-134-cb1',
            filename: 'terminal',
            language: 'bash',
            code: `npm install nodemailer`,
          },
          {
            id: 'GUIDE-W6-134-cb2',
            filename: '.env',
            language: 'bash',
            code: `SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=moi@gmail.com
SMTP_PASS=mot_de_passe_application`,
          },
        ],
        result: 'Nodemailer est installé et les secrets sont dans .env.',
      },
      {
        id: 'GUIDE-W6-134-e2',
        title: 'Configurer le transporteur',
        goal: 'Créer l’objet qui saura envoyer les mails.',
        explanation:
          'Le <b>transporteur</b> est la connexion réutilisable au serveur SMTP. On le configure une fois dans <code>mailer.js</code> à partir des variables d’environnement, puis on l’exporte. Le créer à part évite de rouvrir une connexion à chaque email et garde <code>server.js</code> lisible.',
        files: ['mailer.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-134-cb3',
            filename: 'mailer.js',
            language: 'javascript',
            code: `const nodemailer = require("nodemailer");
require("dotenv").config();

// Transporteur = connexion SMTP réutilisable
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = transporter;`,
          },
        ],
        result: 'On dispose d’un transporteur prêt à envoyer des mails.',
      },
      {
        id: 'GUIDE-W6-134-e3',
        title: 'Envoyer un email dans une route',
        goal: 'Déclencher l’envoi à la réception d’une requête.',
        explanation:
          '<code>transporter.sendMail</code> est asynchrone : on l’attend avec <code>await</code>. On lui passe l’expéditeur, le destinataire, l’objet et le contenu (<code>text</code> ou <code>html</code>). Le <code>try/catch</code> est essentiel : un envoi peut échouer (SMTP injoignable, adresse invalide) et on veut renvoyer une erreur claire plutôt que de planter.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-134-cb4',
            filename: 'server.js',
            language: 'javascript',
            code: `const transporter = require("./mailer");

app.post("/contact", async (req, res) => {
  const { email, message } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Confirmation de réception",
      text: "Merci, nous avons bien reçu : " + message,
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ erreur: "Envoi impossible" });
  }
});`,
          },
        ],
        result: 'Appeler POST /contact envoie réellement un email.',
      },
      {
        id: 'GUIDE-W6-134-e4',
        title: 'Vérifier la connexion au démarrage',
        goal: 'Détecter tout de suite un SMTP mal configuré.',
        explanation:
          'Plutôt que de découvrir le problème au premier envoi, on teste la connexion au lancement du serveur avec <code>transporter.verify</code>. Si les identifiants sont faux, on le voit immédiatement dans la console, ce qui fait gagner beaucoup de temps de débogage.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-134-cb5',
            filename: 'server.js',
            language: 'javascript',
            code: `// Teste la connexion SMTP dès le démarrage
transporter.verify((err) => {
  if (err) console.error("SMTP KO :", err.message);
  else console.log("SMTP prêt à envoyer");
});`,
          },
        ],
        result: 'Une mauvaise config SMTP se voit dès le lancement.',
      },
    ],
    finalResult:
      'Une route Express qui envoie de vrais emails via Nodemailer, avec un transporteur réutilisable, des identifiants protégés et une vérification de la connexion au démarrage.',
    pitfalls: [
      'Mettre le mot de passe SMTP en dur dans le code : fuite de secret assurée.',
      'Oublier await devant sendMail : la route répond avant que l’email soit parti.',
      'Utiliser son vrai mot de passe Gmail au lieu d’un mot de passe d’application dédié.',
    ],
    variations: [
      'Envoyer un contenu HTML riche avec la propriété html au lieu de text.',
      'Passer par un service transactionnel (SendGrid, Mailgun) pour une meilleure délivrabilité.',
    ],
  }),

  // ————— Créer une API REST complète —————
  guide({
    id: 'GUIDE-W6-135',
    slug: 'creer-une-api-rest-complete',
    title: 'Créer une API REST complète',
    shortTitle: 'API REST complète',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Structurer une API REST propre : routes séparées, contrôleur, middleware et gestion centralisée des erreurs.',
    objective: 'Une API organisée, prête à grandir, avec les conventions REST.',
    preview:
      'Les routes /articles sont rangées dans un routeur dédié, la logique dans un contrôleur, et les erreurs passent par un seul middleware.',
    aliases: ['api rest', 'rest complete', 'structurer express', 'router controller'],
    keywords: ['api rest', 'express router', 'controller middleware', 'gestion erreurs'],
    relatedContentIds: [],
    files: ['server.js', 'routes/articles.js', 'controllers/articles.js'],
    steps: [
      {
        id: 'GUIDE-W6-135-e1',
        title: 'Isoler les routes dans un routeur',
        goal: 'Séparer les URLs du fichier principal.',
        explanation:
          'Quand les routes se multiplient, <code>server.js</code> devient illisible. <code>express.Router()</code> permet de regrouper les routes d’une ressource dans leur propre fichier. On y déclare les URLs et on branche chacune sur une fonction du contrôleur, sans écrire la logique ici.',
        files: ['routes/articles.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-135-cb1',
            filename: 'routes/articles.js',
            language: 'javascript',
            code: `const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/articles");

// Conventions REST : le verbe HTTP dit l'action
router.get("/", ctrl.lister);
router.get("/:id", ctrl.details);
router.post("/", ctrl.creer);
router.delete("/:id", ctrl.supprimer);

module.exports = router;`,
          },
        ],
        result: 'Les routes /articles vivent dans leur propre fichier.',
      },
      {
        id: 'GUIDE-W6-135-e2',
        title: 'Mettre la logique dans un contrôleur',
        goal: 'Séparer le « quoi faire » du « quelle URL ».',
        explanation:
          'Le <b>contrôleur</b> contient les fonctions appelées par les routes : chacune fait son travail (lire la base, répondre). On sépare ainsi le routage de la logique métier, ce qui rend le code testable et réutilisable. On passe <code>next</code> aux erreurs pour les envoyer vers le middleware dédié.',
        files: ['controllers/articles.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-135-cb2',
            filename: 'controllers/articles.js',
            language: 'javascript',
            code: `const pool = require("../db");

exports.lister = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM articles");
    res.json(rows);
  } catch (err) {
    next(err); // délègue au middleware d'erreurs
  }
};

exports.details = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM articles WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ erreur: "Article introuvable" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};`,
          },
        ],
        result: 'La logique est rangée, séparée des routes.',
      },
      {
        id: 'GUIDE-W6-135-e3',
        title: 'Brancher le routeur sur un préfixe',
        goal: 'Monter la ressource sous /articles.',
        explanation:
          'Dans <code>server.js</code>, <code>app.use("/articles", ...)</code> monte tout le routeur sous ce préfixe : une route <code>router.get("/:id")</code> devient <code>/articles/:id</code>. Le fichier principal reste minuscule et donne une vue d’ensemble des ressources de l’API.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-135-cb3',
            filename: 'server.js',
            language: 'javascript',
            code: `const express = require("express");
const articlesRouter = require("./routes/articles");

const app = express();
app.use(express.json());

// Toutes les routes du routeur sont préfixées par /articles
app.use("/articles", articlesRouter);`,
          },
        ],
        result: 'La ressource /articles est branchée proprement.',
      },
      {
        id: 'GUIDE-W6-135-e4',
        title: 'Ajouter un middleware de validation',
        goal: 'Refuser les requêtes invalides avant la logique.',
        explanation:
          'Un <b>middleware</b> est une fonction qui s’exécute avant le contrôleur. Ici il vérifie que le titre est présent : s’il manque, il renvoie une erreur <code>400</code> et <b>ne</b> passe <b>pas</b> à la suite. Sinon il appelle <code>next()</code> pour laisser la requête continuer. Cela évite de répéter la validation dans chaque contrôleur.',
        files: ['routes/articles.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-135-cb4',
            filename: 'routes/articles.js',
            language: 'javascript',
            code: `function verifierArticle(req, res, next) {
  if (!req.body.titre) {
    return res.status(400).json({ erreur: "Le titre est requis" });
  }
  next(); // tout va bien, on continue vers le contrôleur
}

// On insère le middleware avant ctrl.creer
router.post("/", verifierArticle, ctrl.creer);`,
          },
        ],
        result: 'Les créations sans titre sont rejetées d’office.',
      },
      {
        id: 'GUIDE-W6-135-e5',
        title: 'Centraliser la gestion des erreurs',
        goal: 'Un seul endroit pour répondre aux plantages.',
        explanation:
          'Un middleware d’erreurs se reconnaît à ses <b>quatre</b> arguments <code>(err, req, res, next)</code>. Placé <b>en dernier</b>, il attrape tout ce qui a été passé à <code>next(err)</code> dans les contrôleurs. On journalise l’erreur et on renvoie une réponse <code>500</code> uniforme, sans divulguer les détails internes au client.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-135-cb5',
            filename: 'server.js',
            language: 'javascript',
            code: `// 4 arguments = middleware d'erreurs, à mettre EN DERNIER
app.use((err, req, res, next) => {
  console.error(err); // pour le développeur
  res.status(500).json({ erreur: "Erreur serveur" });
});

app.listen(3000, () => console.log("API prête sur le port 3000"));`,
          },
        ],
        result: 'Toutes les erreurs aboutissent à une réponse propre et unique.',
      },
    ],
    finalResult:
      'Une API REST bien rangée : routes dans un routeur, logique dans un contrôleur, validation par middleware et un gestionnaire d’erreurs unique — une base saine qui grandit sans devenir un plat de spaghettis.',
    pitfalls: [
      'Placer le middleware d’erreurs avant les routes : il n’attrape alors plus rien.',
      'Oublier next(err) dans les try/catch : les erreurs n’arrivent jamais au gestionnaire central.',
      'Tout écrire dans server.js : le fichier devient ingérable dès quelques ressources.',
    ],
    variations: [
      'Ajouter les routes PUT et PATCH pour compléter le CRUD REST.',
      'Externaliser aussi la validation avec une librairie comme Joi ou Zod.',
    ],
  }),
];
