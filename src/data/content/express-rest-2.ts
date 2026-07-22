import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const expressRest2Content: ReadyContent[] = [
  // ————— CORS —————
  lesson({
    id: 'EXPRESS-F-1107-LESSON',
    slug: 'cors',
    title: 'CORS',
    shortTitle: 'CORS',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Autoriser ton front (un autre port ou un autre domaine) à appeler ton API Express, sans être bloqué par le navigateur.',
    utility: 'Laisser ton front-end React parler à ton API Express malgré la règle de sécurité du navigateur.',
    aliases: ['cors', 'cross origin', 'access-control-allow-origin', 'origine', 'blocage cors'],
    keywords: [
      'front bloque par api',
      'erreur cors',
      'autoriser origine',
      'localhost 5173 vers 3000',
      'access control allow origin',
      'middleware cors',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1107-TEMPLATE',
    intro:
      'Le <b>CORS</b> (Cross-Origin Resource Sharing) est une règle du <b>navigateur</b> : par défaut, une page servie depuis une origine (ex. <code>http://localhost:5173</code>) ne peut pas appeler une API sur une <b>autre</b> origine (ex. <code>http://localhost:3000</code>). Pour l’autoriser, ton API doit renvoyer les bons en-têtes — c’est le rôle du middleware <code>cors</code>.',
    sections: [
      {
        id: 's1',
        title: 'Le problème : « blocked by CORS policy »',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux que <b>mon front React sur le port 5173 appelle mon API Express sur le port 3000</b>, mais la console affiche « blocked by CORS policy ».',
          },
          {
            type: 'paragraph',
            html: 'Deux <b>origines différentes</b> = deux couples (protocole, domaine, port) différents. Ici le port change (<code>5173</code> vs <code>3000</code>) : le navigateur considère que c’est une autre origine et <b>bloque la réponse</b> tant que l’API n’a pas dit « je t’autorise ».',
          },
          {
            type: 'table',
            headers: ['Front', 'API', 'Même origine ?'],
            rows: [
              ['localhost:5173', 'localhost:3000', 'Non (port différent) → CORS'],
              ['localhost:3000', 'localhost:3000', 'Oui → aucun souci'],
              ['mon-site.fr', 'api.mon-site.fr', 'Non (domaine différent) → CORS'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le CORS, c’est le videur du navigateur. Il ne laisse entrer la réponse que si l’API a mis ton origine sur la <b>liste des invités</b> (l’en-tête <code>Access-Control-Allow-Origin</code>).',
          },
        ],
      },
      {
        id: 's2',
        title: 'La solution : le middleware cors',
        blocks: [
          {
            type: 'paragraph',
            html: 'On installe le paquet <code>cors</code>, puis on l’ajoute comme <b>middleware global</b> avec <code>app.use()</code>. Il ajoute automatiquement les bons en-têtes à chaque réponse.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1107-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# On installe le paquet cors
npm install cors`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1107-l-c2',
              filename: 'app.js',
              language: 'javascript',
              code: `import express from "express";
import cors from "cors"; // on importe le middleware

const app = express();

// CORS ouvert a tout le monde (pratique en developpement)
app.use(cors());

app.use(express.json());

app.get("/api/produits", (req, res) => {
  res.json([{ id: 1, nom: "Clavier" }]);
});

app.listen(3000);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À placer tôt :</b> mets <code>app.use(cors())</code> <b>avant</b> tes routes, sinon certaines réponses partent sans les en-têtes CORS.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Restreindre à ton seul front (production)',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>cors()</code> tout ouvert est parfait en local, mais en production tu veux n’autoriser <b>que ton propre site</b>. On passe alors un objet d’options avec l’option <code>origin</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1107-l-c3',
              filename: 'app.js',
              language: 'javascript',
              code: `// On n'autorise QUE l'origine de notre front
app.use(
  cors({
    origin: "https://mon-site.fr", // seule origine acceptee
    credentials: true,             // autorise l'envoi des cookies
  })
);

// Plusieurs origines : on passe un tableau
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mon-site.fr"],
  })
);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Sécurité :</b> évite <code>origin: "*"</code> en production. Liste précisément les origines de confiance. <code>credentials: true</code> est obligatoire si tu envoies des cookies (auth par session).',
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que l’erreur vient de l’API alors que c’est le <b>navigateur</b> qui bloque : en direct (Postman, curl) l’appel passe sans souci, le CORS ne concerne que le navigateur.',
      'Mettre <code>app.use(cors())</code> <b>après</b> les routes : les réponses partent sans les en-têtes. Place-le tout en haut.',
      'Utiliser <code>origin: "*"</code> avec <code>credentials: true</code> : le navigateur refuse cette combinaison. Précise une origine exacte.',
      'Confondre CORS et un vrai problème réseau : si l’API ne répond pas du tout, ce n’est pas du CORS mais une URL ou un serveur éteint.',
    ],
    takeaways: [
      'CORS = règle du <b>navigateur</b> qui bloque les appels entre origines différentes',
      'origine = protocole + domaine + <b>port</b> ; un port différent suffit à déclencher le CORS',
      'solution : <code>npm install cors</code> puis <code>app.use(cors())</code> avant les routes',
      'en production : <code>cors({ origin: "https://ton-site.fr" })</code> plutôt que tout ouvert',
      'cookies d’auth → ajoute <code>credentials: true</code> et une origine exacte',
    ],
  }),
  template({
    id: 'EXPRESS-F-1107-TEMPLATE',
    slug: 'cors',
    title: 'CORS',
    shortTitle: 'CORS',
    technology: 'express',
    tomeId: 't12',
    summary: 'Le middleware CORS prêt à copier : ouvert en dev, restreint à une ou plusieurs origines en prod.',
    lede: 'Autoriser ton front à appeler l’API. Choisis le niveau d’ouverture :',
    aliases: ['cors', 'access-control-allow-origin', 'origine autorisee'],
    keywords: ['middleware cors', 'autoriser front', 'origine'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1107-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1107-t-v1',
        label: 'Ouvert (dev)',
        description: 'Autorise toutes les origines. Idéal en développement.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1107-t-c1',
            filename: 'app.js',
            language: 'javascript',
            code: `import cors from "cors";

app.use(cors()); // toutes les origines autorisees`,
          },
        ],
        replacements: [],
        placement: 'À placer juste après la création de app, avant toutes tes routes. Ne pas laisser tel quel en production.',
      },
      {
        id: 'EXPRESS-F-1107-t-v2',
        label: 'Une origine (prod)',
        description: 'N’autorise que ton front en production.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1107-t-c2',
            filename: 'app.js',
            language: 'javascript',
            code: `import cors from "cors";

app.use(
  cors({
    origin: "https://mon-site.fr",
    credentials: true,
  })
);`,
          },
        ],
        replacements: [
          { token: 'https://mon-site.fr', description: 'l’URL exacte de ton front en production' },
          { token: 'credentials: true', description: 'à garder seulement si tu envoies des cookies (auth par session)' },
        ],
        placement: 'Le réglage recommandé en production : une seule origine de confiance.',
      },
      {
        id: 'EXPRESS-F-1107-t-v3',
        label: 'Plusieurs origines',
        description: 'Autorise une liste précise d’origines.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1107-t-c3',
            filename: 'app.js',
            language: 'javascript',
            code: `import cors from "cors";

app.use(
  cors({
    origin: ["http://localhost:5173", "https://mon-site.fr"],
  })
);`,
          },
        ],
        replacements: [
          { token: 'http://localhost:5173', description: 'ton front en local (dev)' },
          { token: 'https://mon-site.fr', description: 'ton front en production' },
        ],
        placement: 'Quand tu veux couvrir le dev ET la prod avec la même configuration.',
      },
    ],
  }),

  // ————— Upload de fichiers —————
  lesson({
    id: 'EXPRESS-F-1108-LESSON',
    slug: 'upload-de-fichiers',
    title: 'Upload de fichiers',
    shortTitle: 'Upload',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Recevoir un fichier envoyé par un formulaire (image, PDF…) côté Express avec multer, et le stocker sur le serveur.',
    utility: 'Recevoir et stocker un fichier envoyé depuis un formulaire côté serveur.',
    aliases: ['upload', 'multer', 'multipart', 'fichier', 'image', 'formdata', 'telecharger fichier'],
    keywords: [
      'envoyer une image',
      'formulaire fichier',
      'multipart form data',
      'stocker un fichier',
      'req file',
      'avatar utilisateur',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1108-TEMPLATE',
    intro:
      'Un fichier ne s’envoie pas en JSON : il arrive en <b>multipart/form-data</b>. Express seul ne sait pas le lire — on utilise le middleware <b>multer</b> pour récupérer le fichier dans <code>req.file</code> et le stocker.',
    sections: [
      {
        id: 's1',
        title: 'Recevoir un fichier avec multer',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux qu’un utilisateur puisse <b>envoyer une photo de profil</b> depuis un formulaire, et que mon serveur l’enregistre dans un dossier <code>uploads/</code>.',
          },
          {
            type: 'paragraph',
            html: 'On installe <code>multer</code>, on le configure avec un dossier de destination, puis on l’ajoute comme middleware <b>sur la route</b>. Le fichier reçu devient accessible dans <code>req.file</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1108-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# On installe multer
npm install multer`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1108-l-c2',
              filename: 'app.js',
              language: 'javascript',
              code: `import express from "express";
import multer from "multer";

const app = express();

// On configure le dossier ou seront stockes les fichiers
const upload = multer({ dest: "uploads/" });

// upload.single("photo") lit UN fichier nomme "photo"
app.post("/api/profil", upload.single("photo"), (req, res) => {
  // Le fichier recu est dans req.file
  console.log(req.file); // { filename, path, size, mimetype... }

  // Les autres champs texte du formulaire sont dans req.body
  console.log(req.body.nom);

  res.json({ message: "Fichier recu", fichier: req.file.filename });
});

app.listen(3000);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> le nom passé à <code>upload.single("photo")</code> doit correspondre <b>exactement</b> au <code>name</code> du champ fichier envoyé par le formulaire.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Maîtriser le nom et le dossier',
        blocks: [
          {
            type: 'paragraph',
            html: 'Par défaut, multer donne un nom aléatoire sans extension. Avec <code>diskStorage</code>, tu contrôles le <b>dossier</b> et le <b>nom de fichier</b> final.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1108-l-c3',
              filename: 'upload.js',
              language: 'javascript',
              code: `import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  // Ou ranger le fichier
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // Sous quel nom l'enregistrer
  filename: (req, file, cb) => {
    // Nom unique : date + extension d'origine
    const ext = path.extname(file.originalname);
    const nom = "photo-" + Date.now() + ext;
    cb(null, nom);
  },
});

export const upload = multer({ storage });`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Reçoit'],
            rows: [
              ['<code>upload.single("photo")</code>', 'un seul fichier → <code>req.file</code>'],
              ['<code>upload.array("photos", 5)</code>', 'jusqu’à 5 fichiers → <code>req.files</code>'],
              ['<code>upload.none()</code>', 'un formulaire sans fichier (texte seul)'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Limiter la taille et le type',
        blocks: [
          {
            type: 'paragraph',
            html: 'Ne fais jamais confiance au fichier envoyé : limite sa <b>taille</b> et filtre son <b>type</b> pour n’accepter, par exemple, que des images.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1108-l-c4',
              filename: 'upload.js',
              language: 'javascript',
              code: `export const upload = multer({
  storage,
  // Taille maximale : 2 Mo
  limits: { fileSize: 2 * 1024 * 1024 },
  // On n'accepte que les images
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);  // fichier accepte
    } else {
      cb(new Error("Seules les images sont acceptees"), false);
    }
  },
});`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> multer, c’est le service courrier de ton serveur. Il ouvre le colis (le fichier), le range dans le bon rayon (<code>uploads/</code>) et te laisse un reçu (<code>req.file</code>) avec l’adresse exacte.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>enctype="multipart/form-data"</code> sur le formulaire (ou le <code>FormData</code> côté fetch) : le fichier n’arrive jamais, <code>req.file</code> est <code>undefined</code>.',
      'Mettre <code>express.json()</code> pour lire un upload : le JSON ne gère pas les fichiers, c’est multer qui s’en charge.',
      'Nom du champ qui ne correspond pas : <code>upload.single("photo")</code> mais le formulaire envoie <code>image</code> → rien n’est reçu.',
      'Ne pas limiter la taille : un utilisateur peut saturer ton disque avec un énorme fichier. Ajoute toujours <code>limits.fileSize</code>.',
    ],
    takeaways: [
      'un fichier arrive en <b>multipart/form-data</b>, pas en JSON',
      'middleware : <code>npm install multer</code> puis <code>upload.single("champ")</code> sur la route',
      'un fichier → <code>req.file</code> · plusieurs → <code>req.files</code> · texte → <code>req.body</code>',
      '<code>diskStorage</code> pour choisir le dossier et le nom final',
      'toujours limiter <code>fileSize</code> et filtrer le <code>mimetype</code>',
    ],
  }),
  template({
    id: 'EXPRESS-F-1108-TEMPLATE',
    slug: 'upload-de-fichiers',
    title: 'Upload de fichiers',
    shortTitle: 'Upload',
    technology: 'express',
    tomeId: 't12',
    summary: 'Recevoir un fichier avec multer : un fichier simple, plusieurs fichiers, ou avec limites et filtre.',
    lede: 'Recevoir un fichier côté serveur. Choisis le cas :',
    aliases: ['upload', 'multer', 'req.file', 'multipart'],
    keywords: ['fichier', 'image', 'formdata'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1108-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1108-t-v1',
        label: 'Un fichier',
        description: 'Recevoir un seul fichier sur une route.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1108-t-c1',
            filename: 'app.js',
            language: 'javascript',
            code: `import multer from "multer";

const upload = multer({ dest: "uploads/" });

app.post("/api/profil", upload.single("photo"), (req, res) => {
  res.json({ fichier: req.file.filename });
});`,
          },
        ],
        replacements: [
          { token: 'photo', description: 'le name du champ fichier dans ton formulaire' },
          { token: 'uploads/', description: 'le dossier où stocker les fichiers reçus' },
          { token: '/api/profil', description: 'l’URL de ta route d’upload' },
        ],
        placement: 'Le cas le plus courant : un avatar, une pièce jointe unique.',
      },
      {
        id: 'EXPRESS-F-1108-t-v2',
        label: 'Plusieurs fichiers',
        description: 'Recevoir une galerie de fichiers.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1108-t-c2',
            filename: 'app.js',
            language: 'javascript',
            code: `import multer from "multer";

const upload = multer({ dest: "uploads/" });

app.post("/api/galerie", upload.array("photos", 5), (req, res) => {
  const noms = req.files.map((f) => f.filename);
  res.json({ fichiers: noms });
});`,
          },
        ],
        replacements: [
          { token: 'photos', description: 'le name du champ fichier (multiple)' },
          { token: '5', description: 'le nombre maximum de fichiers acceptés' },
        ],
        placement: 'Pour une galerie ou plusieurs pièces jointes. Les fichiers arrivent dans req.files (tableau).',
      },
      {
        id: 'EXPRESS-F-1108-t-v3',
        label: 'Avec limites + filtre',
        description: 'Nom maîtrisé, taille limitée, images seulement.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1108-t-c3',
            filename: 'upload.js',
            language: 'javascript',
            code: `import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, "fichier-" + Date.now() + ext);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(null, file.mimetype.startsWith("image/"));
  },
});`,
          },
        ],
        replacements: [
          { token: '2 * 1024 * 1024', description: 'la taille maximale en octets (ici 2 Mo)' },
          { token: 'image/', description: 'le type MIME autorisé (image/, application/pdf…)' },
          { token: 'fichier-', description: 'le préfixe du nom de fichier enregistré' },
        ],
        placement: 'La version robuste à utiliser en production : taille bornée et type vérifié.',
      },
    ],
  }),

  // ————— Connecter Express à la base de données —————
  lesson({
    id: 'EXPRESS-F-1109-LESSON',
    slug: 'connecter-express-a-la-base-de-donnees',
    title: 'Connecter Express à la base de données',
    shortTitle: 'Connexion BDD',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Ouvrir une connexion entre ton serveur Express et une base de données (MySQL/PostgreSQL) via un pool, et l’utiliser dans tes routes.',
    utility: 'Faire dialoguer ton serveur Express avec une base de données pour lire et écrire des données.',
    aliases: ['connexion base', 'pool', 'mysql2', 'pg', 'database', 'bdd', 'connecter base de donnees'],
    keywords: [
      'connecter express mysql',
      'pool de connexions',
      'variables environnement',
      'requete sql depuis express',
      'dotenv',
      'db query',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1109-TEMPLATE',
    intro:
      'Pour stocker des données durablement, Express a besoin d’une <b>base de données</b>. On ouvre la connexion une seule fois via un <b>pool</b> (un réservoir de connexions réutilisables), et on garde les identifiants dans des <b>variables d’environnement</b> — jamais en dur dans le code.',
    sections: [
      {
        id: 's1',
        title: 'Créer un pool de connexions',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux que <b>mon API Express lise et écrive dans une base MySQL</b>, sans rouvrir une connexion à chaque requête.',
          },
          {
            type: 'paragraph',
            html: 'Un <b>pool</b> garde plusieurs connexions ouvertes et prêtes. On le crée <b>une fois</b>, dans un fichier dédié, puis on l’importe partout où on a besoin de la base.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1109-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Le driver MySQL + de quoi lire un fichier .env
npm install mysql2 dotenv`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1109-l-c2',
              filename: 'db.js',
              language: 'javascript',
              code: `import mysql from "mysql2/promise";
import "dotenv/config"; // charge les variables du fichier .env

// On cree UN pool, reutilise dans toute l'application
export const pool = mysql.createPool({
  host: process.env.DB_HOST,       // ex: localhost
  user: process.env.DB_USER,       // ex: root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,   // ex: ma_boutique
  waitForConnections: true,
  connectionLimit: 10,             // 10 connexions max en parallele
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> un pool par application, exporté depuis un fichier <code>db.js</code>. On ne crée <b>pas</b> une connexion à chaque route.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Garder les secrets dans .env',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les identifiants de la base ne doivent <b>jamais</b> être écrits dans le code (ni poussés sur Git). On les met dans un fichier <code>.env</code>, ignoré par Git.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1109-l-c3',
              filename: '.env',
              language: 'bash',
              code: `DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mon_mot_de_passe
DB_NAME=ma_boutique`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1109-l-c4',
              filename: '.gitignore',
              language: 'text',
              code: `node_modules
.env`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle absolue :</b> ajoute <code>.env</code> à ton <code>.gitignore</code>. Un mot de passe publié sur GitHub est compromis à vie.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Utiliser le pool dans une route',
        blocks: [
          {
            type: 'paragraph',
            html: 'On importe le <code>pool</code> et on appelle <code>pool.query()</code>. La méthode renvoie un tableau où <b>le premier élément</b> contient les lignes trouvées.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1109-l-c5',
              filename: 'app.js',
              language: 'javascript',
              code: `import express from "express";
import { pool } from "./db.js";

const app = express();
app.use(express.json());

app.get("/api/produits", async (req, res) => {
  try {
    // query renvoie [lignes, infos] : on garde les lignes
    const [produits] = await pool.query("SELECT * FROM produits");
    res.json(produits);
  } catch (err) {
    // Si la base est injoignable ou la requete invalide
    res.status(500).json({ erreur: "Erreur base de donnees" });
  }
});

app.listen(3000);`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le pool, c’est une file de taxis qui attendent moteur allumé. Chaque requête prend un taxi libre, s’en sert, puis le rend — bien plus rapide que d’en démarrer un neuf à chaque fois.',
          },
        ],
      },
    ],
    pitfalls: [
      'Écrire les identifiants en dur dans le code : utilise <code>.env</code> + <code>dotenv</code>, et n’oublie pas d’ignorer <code>.env</code> dans Git.',
      'Ouvrir une nouvelle connexion à chaque requête : crée <b>un seul pool</b>, réutilisé partout.',
      'Oublier <code>await</code> devant <code>pool.query()</code> : tu récupères une promesse, pas les données.',
      'Ne pas entourer la requête d’un <code>try / catch</code> : la moindre erreur SQL fait planter le serveur.',
    ],
    takeaways: [
      'un <b>pool</b> = plusieurs connexions prêtes, créé une seule fois dans <code>db.js</code>',
      'identifiants dans <code>.env</code> + <code>dotenv</code>, jamais en dur, <code>.env</code> dans le <code>.gitignore</code>',
      '<code>const [lignes] = await pool.query(...)</code> : les données sont dans le 1er élément',
      'toujours un <code>try / catch</code> autour des requêtes',
      'driver au choix : <code>mysql2</code> (MySQL) ou <code>pg</code> (PostgreSQL)',
    ],
  }),
  template({
    id: 'EXPRESS-F-1109-TEMPLATE',
    slug: 'connecter-express-a-la-base-de-donnees',
    title: 'Connexion BDD',
    shortTitle: 'Connexion BDD',
    technology: 'express',
    tomeId: 't12',
    summary: 'Connecter Express à une base : pool MySQL, pool PostgreSQL, ou fichier .env.',
    lede: 'Ouvrir la connexion à ta base. Choisis ta techno :',
    aliases: ['pool', 'mysql2', 'pg', 'connexion base', 'dotenv'],
    keywords: ['connecter base', 'pool', 'env'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1109-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1109-t-v1',
        label: 'MySQL (mysql2)',
        description: 'Pool de connexions pour MySQL / MariaDB.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1109-t-c1',
            filename: 'db.js',
            language: 'javascript',
            code: `import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});`,
          },
        ],
        replacements: [
          { token: 'connectionLimit: 10', description: 'le nombre max de connexions simultanées' },
        ],
        placement: 'Fichier db.js à créer une fois. Importe ensuite pool là où tu fais des requêtes.',
      },
      {
        id: 'EXPRESS-F-1109-t-v2',
        label: 'PostgreSQL (pg)',
        description: 'Pool de connexions pour PostgreSQL.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1109-t-c2',
            filename: 'db.js',
            language: 'javascript',
            code: `import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 10,
});`,
          },
        ],
        replacements: [
          { token: 'max: 10', description: 'le nombre max de connexions dans le pool' },
        ],
        placement: 'La version PostgreSQL. Installe le driver avec npm install pg.',
      },
      {
        id: 'EXPRESS-F-1109-t-v3',
        label: 'Fichier .env',
        description: 'Les secrets de connexion, hors du code.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1109-t-c3',
            filename: '.env',
            language: 'bash',
            code: `DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mon_mot_de_passe
DB_NAME=ma_base`,
          },
        ],
        replacements: [
          { token: 'localhost', description: 'l’adresse du serveur de base de données' },
          { token: 'root', description: 'ton utilisateur de base de données' },
          { token: 'mon_mot_de_passe', description: 'le mot de passe de cet utilisateur' },
          { token: 'ma_base', description: 'le nom de ta base de données' },
        ],
        placement: 'À la racine du projet. Ajoute .env dans ton .gitignore pour ne jamais le publier.',
      },
    ],
  }),

  // ————— La structure MVC —————
  lesson({
    id: 'EXPRESS-F-1110-LESSON',
    slug: 'la-structure-mvc-models-controllers-et-routes-express',
    title: 'La structure MVC : models, controllers et routes (Express)',
    shortTitle: 'MVC',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Découper une API Express en trois rôles clairs : routes (les URL), controllers (la logique) et models (l’accès aux données).',
    utility: 'Organiser une API Express en fichiers clairs plutôt qu’un seul gros app.js.',
    aliases: ['mvc', 'model view controller', 'controller', 'router', 'model', 'architecture', 'structurer projet'],
    keywords: [
      'organiser projet express',
      'separer routes logique',
      'controller express',
      'model acces donnees',
      'router express',
      'gros app js',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1110-TEMPLATE',
    intro:
      'Quand tout tient dans <code>app.js</code>, le projet devient vite illisible. Le patron <b>MVC</b> répartit le code en trois rôles : les <b>routes</b> (quelle URL ?), les <b>controllers</b> (quoi faire ?) et les <b>models</b> (comment accéder aux données ?).',
    sections: [
      {
        id: 's1',
        title: 'Qui fait quoi',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>arrêter d’avoir un app.js de 400 lignes</b> et savoir exactement dans quel fichier ajouter une nouvelle fonctionnalité.',
          },
          {
            type: 'paragraph',
            html: 'Chaque couche a <b>une seule responsabilité</b>. La route reçoit l’URL et délègue, le controller décide, le model parle à la base.',
          },
          {
            type: 'table',
            headers: ['Couche', 'Rôle', 'Fichier'],
            rows: [
              ['Route', 'associe une URL à une fonction', 'routes/produits.js'],
              ['Controller', 'la logique (valider, répondre)', 'controllers/produits.js'],
              ['Model', 'lit/écrit dans la base', 'models/produit.js'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un restaurant. La <b>route</b> = le serveur qui prend la commande. Le <b>controller</b> = le chef qui décide comment la préparer. Le <b>model</b> = le magasinier qui va chercher les ingrédients en réserve (la base).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le model : l’accès aux données',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <b>model</b> regroupe toutes les requêtes vers la base pour une entité. Il ne connaît ni <code>req</code> ni <code>res</code> : il reçoit des valeurs, renvoie des données.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1110-l-c1',
              filename: 'models/produit.js',
              language: 'javascript',
              code: `import { pool } from "../db.js";

// Recupere tous les produits
export async function findAll() {
  const [lignes] = await pool.query("SELECT * FROM produits");
  return lignes;
}

// Recupere un produit par son id
export async function findById(id) {
  const [lignes] = await pool.query(
    "SELECT * FROM produits WHERE id = ?",
    [id]
  );
  return lignes[0]; // un seul produit (ou undefined)
}`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'Le controller : la logique',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <b>controller</b> reçoit <code>req</code> et <code>res</code>, appelle le model et construit la réponse. C’est lui qui gère les cas d’erreur (produit introuvable…).',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1110-l-c2',
              filename: 'controllers/produits.js',
              language: 'javascript',
              code: `import * as Produit from "../models/produit.js";

// GET /api/produits
export async function getTousLesProduits(req, res) {
  const produits = await Produit.findAll();
  res.json(produits);
}

// GET /api/produits/:id
export async function getProduit(req, res) {
  const produit = await Produit.findById(req.params.id);
  if (!produit) {
    // Le controller decide de la reponse d'erreur
    return res.status(404).json({ erreur: "Produit introuvable" });
  }
  res.json(produit);
}`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'La route : brancher les URL',
        blocks: [
          {
            type: 'paragraph',
            html: 'La <b>route</b> associe chaque URL à une fonction du controller, via un <code>Router</code>. On branche ensuite ce router dans <code>app.js</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1110-l-c3',
              filename: 'routes/produits.js',
              language: 'javascript',
              code: `import { Router } from "express";
import * as ctrl from "../controllers/produits.js";

const router = Router();

// On associe chaque URL a une fonction du controller
router.get("/", ctrl.getTousLesProduits);
router.get("/:id", ctrl.getProduit);

export default router;`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1110-l-c4',
              filename: 'app.js',
              language: 'javascript',
              code: `import express from "express";
import produitsRouter from "./routes/produits.js";

const app = express();
app.use(express.json());

// Tout ce qui commence par /api/produits part dans le router
app.use("/api/produits", produitsRouter);

app.listen(3000);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> le préfixe est défini <b>une fois</b> dans <code>app.use("/api/produits", ...)</code>. Dans le router, les chemins sont donc relatifs (<code>"/"</code>, <code>"/:id"</code>).',
          },
        ],
      },
    ],
    pitfalls: [
      'Répéter le préfixe : <code>app.use("/api/produits", router)</code> + <code>router.get("/api/produits")</code> donne <code>/api/produits/api/produits</code>. Dans le router, reste relatif.',
      'Mettre des requêtes SQL dans le controller : garde-les dans le model, le controller ne fait que la logique.',
      'Faire un model qui manipule <code>req</code>/<code>res</code> : le model ne connaît pas la requête HTTP, il travaille sur des valeurs.',
      'Oublier <code>export default router</code> ou l’import correspondant : le router branché est <code>undefined</code>.',
    ],
    takeaways: [
      'MVC = <b>routes</b> (URL) + <b>controllers</b> (logique) + <b>models</b> (données)',
      'model : requêtes SQL, ignore <code>req</code>/<code>res</code>',
      'controller : reçoit <code>req</code>/<code>res</code>, gère les erreurs, appelle le model',
      'route : un <code>Router</code> qui mappe les URL aux fonctions du controller',
      'préfixe défini une seule fois dans <code>app.use("/api/...", router)</code>',
    ],
  }),
  template({
    id: 'EXPRESS-F-1110-TEMPLATE',
    slug: 'la-structure-mvc-models-controllers-et-routes-express',
    title: 'Structure MVC',
    shortTitle: 'MVC',
    technology: 'express',
    tomeId: 't12',
    summary: 'Les trois fichiers du MVC Express prêts à copier : model, controller et route.',
    lede: 'Découper ton API en couches. Choisis le fichier :',
    aliases: ['mvc', 'controller', 'router', 'model', 'structurer'],
    keywords: ['organiser', 'separer', 'architecture'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1110-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1110-t-v1',
        label: 'Model',
        description: 'L’accès aux données pour une entité.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1110-t-c1',
            filename: 'models/produit.js',
            language: 'javascript',
            code: `import { pool } from "../db.js";

export async function findAll() {
  const [lignes] = await pool.query("SELECT * FROM produits");
  return lignes;
}

export async function findById(id) {
  const [lignes] = await pool.query(
    "SELECT * FROM produits WHERE id = ?",
    [id]
  );
  return lignes[0];
}`,
          },
        ],
        replacements: [
          { token: 'produits', description: 'le nom de ta table' },
          { token: 'produit', description: 'le nom du fichier model (au singulier)' },
        ],
        placement: 'Dossier models/. Ne contient que des requêtes, aucune logique HTTP.',
      },
      {
        id: 'EXPRESS-F-1110-t-v2',
        label: 'Controller',
        description: 'La logique qui relie route et model.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1110-t-c2',
            filename: 'controllers/produits.js',
            language: 'javascript',
            code: `import * as Produit from "../models/produit.js";

export async function getTousLesProduits(req, res) {
  const produits = await Produit.findAll();
  res.json(produits);
}

export async function getProduit(req, res) {
  const produit = await Produit.findById(req.params.id);
  if (!produit) {
    return res.status(404).json({ erreur: "Introuvable" });
  }
  res.json(produit);
}`,
          },
        ],
        replacements: [
          { token: 'Produit', description: 'le model importé pour cette entité' },
          { token: 'getTousLesProduits / getProduit', description: 'les noms de tes fonctions de logique' },
        ],
        placement: 'Dossier controllers/. Reçoit req/res, appelle le model, gère les erreurs.',
      },
      {
        id: 'EXPRESS-F-1110-t-v3',
        label: 'Route',
        description: 'Le router qui branche les URL.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1110-t-c3',
            filename: 'routes/produits.js',
            language: 'javascript',
            code: `import { Router } from "express";
import * as ctrl from "../controllers/produits.js";

const router = Router();

router.get("/", ctrl.getTousLesProduits);
router.get("/:id", ctrl.getProduit);

export default router;`,
          },
        ],
        replacements: [
          { token: 'ctrl', description: 'l’alias du controller importé' },
          { token: '/:id', description: 'le paramètre d’URL (ici un id)' },
        ],
        placement: 'Dossier routes/. À brancher dans app.js avec app.use("/api/produits", router).',
      },
    ],
  }),

  // ————— Valider les données reçues —————
  lesson({
    id: 'EXPRESS-F-1111-LESSON',
    slug: 'valider-les-donnees-recues',
    title: 'Valider les données reçues',
    shortTitle: 'Validation',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Vérifier que le corps d’une requête contient des données valides avant de les traiter, à la main ou avec un schéma (Zod).',
    utility: 'Refuser proprement les données mal formées avant qu’elles n’atteignent ta base.',
    aliases: ['validation', 'valider', 'zod', 'schema', 'donnees invalides', 'controle des entrees'],
    keywords: [
      'verifier req body',
      'champ manquant',
      'email valide',
      'valider formulaire serveur',
      'zod schema',
      'renvoyer 400',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1111-TEMPLATE',
    intro:
      'Ne fais <b>jamais</b> confiance aux données envoyées par le client. Avant d’enregistrer quoi que ce soit, on vérifie que <code>req.body</code> contient bien les champs attendus, au bon format. Si non → on renvoie une erreur <b>400</b> (Bad Request).',
    sections: [
      {
        id: 's1',
        title: 'Validation à la main',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>refuser un formulaire d’inscription où l’email est vide ou le mot de passe trop court</b>, avant de toucher à la base.',
          },
          {
            type: 'paragraph',
            html: 'Pour un cas simple, on vérifie les champs un par un et on renvoie un <b>400</b> avec un message clair dès qu’une règle n’est pas respectée.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1111-l-c1',
              filename: 'controllers/auth.js',
              language: 'javascript',
              code: `export function inscription(req, res) {
  const { email, motDePasse } = req.body;

  // 1. Le champ est-il present ?
  if (!email || !motDePasse) {
    return res.status(400).json({ erreur: "Email et mot de passe requis" });
  }

  // 2. Le format est-il correct ?
  if (!email.includes("@")) {
    return res.status(400).json({ erreur: "Email invalide" });
  }
  if (motDePasse.length < 8) {
    return res.status(400).json({ erreur: "Mot de passe trop court (8 min)" });
  }

  // 3. Tout est bon : on continue
  res.status(201).json({ message: "Compte cree" });
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> une donnée invalide = code <b>400</b> (Bad Request). Réserve le <b>500</b> aux erreurs du serveur, pas aux fautes du client.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Valider avec un schéma (Zod)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dès que les règles se multiplient, la validation à la main devient lourde. Une bibliothèque comme <b>Zod</b> décrit la forme attendue une fois, puis vérifie tout d’un coup.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1111-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# On installe Zod
npm install zod`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1111-l-c3',
              filename: 'controllers/auth.js',
              language: 'javascript',
              code: `import { z } from "zod";

// On decrit la forme attendue une seule fois
const schemaInscription = z.object({
  email: z.string().email(),
  motDePasse: z.string().min(8),
});

export function inscription(req, res) {
  // safeParse ne jette pas d'erreur : il renvoie un resultat
  const resultat = schemaInscription.safeParse(req.body);

  if (!resultat.success) {
    // On renvoie les details de ce qui ne va pas
    return res.status(400).json({ erreurs: resultat.error.issues });
  }

  // resultat.data contient les donnees validees et typees
  const { email, motDePasse } = resultat.data;
  res.status(201).json({ message: "Compte cree", email });
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le schéma Zod, c’est le gabarit de tri postal. Chaque colis (requête) doit passer par la découpe : s’il ne rentre pas, il est renvoyé (400) sans jamais entrer dans l’entrepôt (la base).',
          },
        ],
      },
      {
        id: 's3',
        title: 'En faire un middleware réutilisable',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour ne pas répéter la validation dans chaque controller, on en fait un <b>middleware</b> qu’on branche sur les routes concernées.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1111-l-c4',
              filename: 'middlewares/valider.js',
              language: 'javascript',
              code: `// Fabrique un middleware a partir d'un schema Zod
export function valider(schema) {
  return (req, res, next) => {
    const resultat = schema.safeParse(req.body);
    if (!resultat.success) {
      return res.status(400).json({ erreurs: resultat.error.issues });
    }
    req.body = resultat.data; // on remplace par les donnees propres
    next();                   // on passe a la suite
  };
}

// Utilisation sur une route :
// router.post("/inscription", valider(schemaInscription), inscription);`,
            },
          },
          {
            type: 'table',
            headers: ['Situation', 'Code HTTP'],
            rows: [
              ['données valides', '200 / 201'],
              ['champ manquant ou mauvais format', '400 (Bad Request)'],
              ['non authentifié', '401'],
              ['erreur interne du serveur', '500'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Valider côté client seulement : le client est contournable (Postman, curl). La validation <b>serveur</b> est obligatoire.',
      'Renvoyer un <code>500</code> pour une faute du client : une donnée invalide, c’est un <code>400</code>.',
      'Oublier <code>express.json()</code> : sans lui, <code>req.body</code> est <code>undefined</code> et toute validation échoue.',
      'Avec Zod, oublier <code>return</code> avant <code>res.status(400)</code> : le code continue et tente de traiter des données invalides.',
    ],
    takeaways: [
      'ne jamais faire confiance à <code>req.body</code> : valider <b>côté serveur</b>',
      'donnée invalide → <b>400</b> avec un message clair',
      'cas simple : vérifs à la main (présence + format)',
      'cas riche : un schéma <b>Zod</b> + <code>safeParse</code> (<code>resultat.data</code> = données propres)',
      'DRY : transformer la validation en <b>middleware</b> réutilisable',
    ],
  }),
  template({
    id: 'EXPRESS-F-1111-TEMPLATE',
    slug: 'valider-les-donnees-recues',
    title: 'Validation',
    shortTitle: 'Validation',
    technology: 'express',
    tomeId: 't12',
    summary: 'Valider req.body : à la main, avec un schéma Zod, ou via un middleware réutilisable.',
    lede: 'Vérifier les données reçues. Choisis l’approche :',
    aliases: ['validation', 'zod', 'safeparse', 'valider req body'],
    keywords: ['verifier', 'schema', '400'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1111-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1111-t-v1',
        label: 'À la main',
        description: 'Vérifs simples, sans dépendance.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1111-t-c1',
            filename: 'controllers/auth.js',
            language: 'javascript',
            code: `export function inscription(req, res) {
  const { email, motDePasse } = req.body;

  if (!email || !motDePasse) {
    return res.status(400).json({ erreur: "Champs requis" });
  }
  if (motDePasse.length < 8) {
    return res.status(400).json({ erreur: "Mot de passe trop court" });
  }

  res.status(201).json({ message: "OK" });
}`,
          },
        ],
        replacements: [
          { token: 'email, motDePasse', description: 'les champs attendus dans le corps' },
          { token: '8', description: 'la longueur minimale du mot de passe' },
        ],
        placement: 'Pour deux ou trois champs seulement, sans installer de bibliothèque.',
      },
      {
        id: 'EXPRESS-F-1111-t-v2',
        label: 'Schéma Zod',
        description: 'Une description déclarative des règles.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1111-t-c2',
            filename: 'controllers/auth.js',
            language: 'javascript',
            code: `import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  motDePasse: z.string().min(8),
});

export function inscription(req, res) {
  const resultat = schema.safeParse(req.body);
  if (!resultat.success) {
    return res.status(400).json({ erreurs: resultat.error.issues });
  }
  res.status(201).json({ message: "OK", data: resultat.data });
}`,
          },
        ],
        replacements: [
          { token: 'email: z.string().email()', description: 'une règle par champ à valider' },
          { token: 'motDePasse: z.string().min(8)', description: 'ajoute autant de champs que nécessaire' },
        ],
        placement: 'Dès que les règles se multiplient. resultat.data contient les données validées.',
      },
      {
        id: 'EXPRESS-F-1111-t-v3',
        label: 'Middleware Zod',
        description: 'Validation réutilisable sur n’importe quelle route.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1111-t-c3',
            filename: 'middlewares/valider.js',
            language: 'javascript',
            code: `export function valider(schema) {
  return (req, res, next) => {
    const resultat = schema.safeParse(req.body);
    if (!resultat.success) {
      return res.status(400).json({ erreurs: resultat.error.issues });
    }
    req.body = resultat.data;
    next();
  };
}

// router.post("/inscription", valider(schema), inscription);`,
          },
        ],
        replacements: [
          { token: 'schema', description: 'le schéma Zod passé à la fabrique' },
        ],
        placement: 'Pour ne pas répéter la validation : branche valider(schema) avant le controller.',
      },
    ],
  }),

  // ————— Les requêtes préparées : sécurité —————
  lesson({
    id: 'EXPRESS-F-1112-LESSON',
    slug: 'les-requetes-preparees-securite',
    title: 'Les requêtes préparées : sécurité',
    shortTitle: 'Requêtes préparées',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Empêcher les injections SQL en passant les valeurs séparément de la requête, grâce aux requêtes préparées (placeholders ?).',
    utility: 'Protéger ta base contre les injections SQL en séparant le code SQL des valeurs.',
    aliases: ['requete preparee', 'injection sql', 'prepared statement', 'placeholder', 'securite sql', 'parametres'],
    keywords: [
      'injection sql',
      'placeholder point interrogation',
      'concatenation dangereuse',
      'proteger base',
      'valeurs separees',
      'pool query parametres',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1112-TEMPLATE',
    intro:
      'Construire une requête SQL en <b>collant</b> des données du client dedans est la faille n°1 des API : l’<b>injection SQL</b>. La parade : les <b>requêtes préparées</b>, où le SQL et les valeurs voyagent <b>séparément</b> via des placeholders (<code>?</code>).',
    sections: [
      {
        id: 's1',
        title: 'Le danger : la concaténation',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>chercher un utilisateur par son email</b> reçu du client, sans qu’un pirate puisse détourner ma requête SQL.',
          },
          {
            type: 'paragraph',
            html: 'Coller la valeur directement dans la chaîne SQL permet à un attaquant d’<b>injecter</b> du SQL. Ne fais <b>jamais</b> ça :',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1112-l-c1',
              filename: 'DANGER.js',
              language: 'javascript',
              code: `// A NE JAMAIS FAIRE : la valeur est collee dans le SQL
const email = req.body.email;
const sql = "SELECT * FROM users WHERE email = '" + email + "'";
await pool.query(sql);

// Si email vaut :  ' OR '1'='1
// La requete devient :
// SELECT * FROM users WHERE email = '' OR '1'='1'
// -> elle renvoie TOUS les utilisateurs`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> concaténer, c’est laisser un inconnu écrire directement sur ton bon de commande. Il peut ajouter « …et vide le coffre » à la fin. La requête préparée lui donne un formulaire à cases : il remplit les cases, il ne réécrit pas le texte.',
          },
        ],
      },
      {
        id: 's2',
        title: 'La parade : les placeholders ?',
        blocks: [
          {
            type: 'paragraph',
            html: 'On met un <code>?</code> à la place de chaque valeur, puis on passe les valeurs dans un <b>tableau séparé</b>. Le driver les échappe : elles ne peuvent jamais être interprétées comme du SQL.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1112-l-c2',
              filename: 'models/user.js',
              language: 'javascript',
              code: `// BIEN : le ? est un emplacement, la valeur reste a part
const email = req.body.email;

const [lignes] = await pool.query(
  "SELECT * FROM users WHERE email = ?", // le SQL
  [email]                                // les valeurs, separees
);

// Meme avec email = ' OR '1'='1
// la valeur est traitee comme un simple texte a chercher,
// jamais comme du code SQL.`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle d’or :</b> une valeur qui vient du client passe <b>toujours</b> par un <code>?</code> (ou <code>$1</code> en PostgreSQL). Jamais par une concaténation.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Plusieurs valeurs et INSERT',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le principe vaut pour toutes les requêtes : autant de <code>?</code> que de valeurs, dans le <b>même ordre</b> que le tableau.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1112-l-c3',
              filename: 'models/produit.js',
              language: 'javascript',
              code: `// INSERT : un ? par valeur, dans l'ordre du tableau
const { nom, prix } = req.body;

const [resultat] = await pool.query(
  "INSERT INTO produits (nom, prix) VALUES (?, ?)",
  [nom, prix]
);

// L'id genere est disponible ici :
const nouvelId = resultat.insertId;`,
            },
          },
          {
            type: 'table',
            headers: ['Driver', 'Placeholder', 'Exemple'],
            rows: [
              ['mysql2 (MySQL)', '<code>?</code>', 'WHERE id = ?'],
              ['pg (PostgreSQL)', '<code>$1</code>, <code>$2</code>', 'WHERE id = $1'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Attention :</b> les <code>?</code> servent aux <b>valeurs</b>, pas aux noms de table ou de colonne. Un nom de colonne dynamique doit venir d’une <b>liste blanche</b> que tu contrôles, jamais du client.',
          },
        ],
      },
    ],
    pitfalls: [
      'Construire du SQL avec <code>+</code> ou une interpolation de chaîne : c’est la porte ouverte à l’injection SQL. Toujours des <code>?</code>.',
      'Croire qu’un simple <code>replace</code> des guillemets suffit : c’est fragile et contournable. Laisse le driver échapper via les placeholders.',
      'Mauvais nombre de <code>?</code> par rapport au tableau de valeurs : le driver renvoie une erreur. Compte-les.',
      'Vouloir mettre un nom de table/colonne dans un <code>?</code> : ça ne marche pas. Ces éléments passent par une liste blanche codée en dur.',
    ],
    takeaways: [
      'injection SQL = faille n°1 : ne jamais <b>concaténer</b> une valeur du client dans du SQL',
      'requête préparée : un <code>?</code> par valeur + un <b>tableau</b> de valeurs à part',
      'le driver échappe les valeurs → elles ne peuvent pas devenir du code SQL',
      'MySQL : <code>?</code> · PostgreSQL : <code>$1</code>, <code>$2</code>…',
      'les <code>?</code> = valeurs uniquement ; noms de table/colonne → liste blanche',
    ],
  }),
  template({
    id: 'EXPRESS-F-1112-TEMPLATE',
    slug: 'les-requetes-preparees-securite',
    title: 'Requêtes préparées',
    shortTitle: 'Requêtes préparées',
    technology: 'express',
    tomeId: 't12',
    summary: 'Requêtes SQL sécurisées prêtes à copier : SELECT, INSERT (MySQL) et version PostgreSQL.',
    lede: 'Passer les valeurs sans risque d’injection. Choisis le cas :',
    aliases: ['requete preparee', 'injection sql', 'placeholder', 'securite'],
    keywords: ['prepared statement', 'point interrogation', 'proteger'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1112-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1112-t-v1',
        label: 'SELECT (MySQL)',
        description: 'Lire avec une valeur du client, en sécurité.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1112-t-c1',
            filename: 'models/user.js',
            language: 'javascript',
            code: `const [lignes] = await pool.query(
  "SELECT * FROM users WHERE email = ?",
  [email]
);

const user = lignes[0];`,
          },
        ],
        replacements: [
          { token: 'users', description: 'ta table' },
          { token: 'email', description: 'la colonne filtrée + la variable passée' },
        ],
        placement: 'Le cas de base : toute valeur venue du client passe par un ?.',
      },
      {
        id: 'EXPRESS-F-1112-t-v2',
        label: 'INSERT (MySQL)',
        description: 'Insérer plusieurs valeurs proprement.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1112-t-c2',
            filename: 'models/produit.js',
            language: 'javascript',
            code: `const [resultat] = await pool.query(
  "INSERT INTO produits (nom, prix) VALUES (?, ?)",
  [nom, prix]
);

const nouvelId = resultat.insertId;`,
          },
        ],
        replacements: [
          { token: 'produits', description: 'ta table' },
          { token: 'nom, prix', description: 'les colonnes à remplir' },
          { token: '[nom, prix]', description: 'les valeurs, dans le même ordre que les colonnes' },
        ],
        placement: 'Autant de ? que de colonnes, dans le même ordre que le tableau de valeurs.',
      },
      {
        id: 'EXPRESS-F-1112-t-v3',
        label: 'SELECT (PostgreSQL)',
        description: 'La même sécurité avec le driver pg.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1112-t-c3',
            filename: 'models/user.js',
            language: 'javascript',
            code: `const resultat = await pool.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
);

const user = resultat.rows[0];`,
          },
        ],
        replacements: [
          { token: '$1', description: 'le placeholder PostgreSQL (numéroté : $1, $2…)' },
          { token: 'email', description: 'la valeur passée dans le tableau' },
        ],
        placement: 'Avec pg, les placeholders sont numérotés ($1, $2) et les lignes sont dans resultat.rows.',
      },
    ],
  }),
];
