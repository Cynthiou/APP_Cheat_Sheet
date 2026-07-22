import type { ReadyContent } from '@/types/content';
import { guide } from './_factory';

export const guidesT151Content: ReadyContent[] = [
  // ————— Créer une inscription : register —————
  guide({
    id: 'GUIDE-W6-122',
    slug: 'creer-une-inscription-register',
    title: 'Créer une inscription : register',
    shortTitle: 'Inscription',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Enregistrer un nouvel utilisateur : formulaire côté React, route côté Express, mot de passe haché en base.',
    objective: 'Un formulaire d’inscription qui crée un compte et hache le mot de passe.',
    preview:
      'L’utilisateur remplit e-mail + mot de passe, valide, et un compte est créé en base avec le mot de passe chiffré.',
    aliases: ['inscription', 'register', 'signup', 'creer un compte', 'enregistrement'],
    keywords: ['register', 'inscription', 'bcrypt', 'hacher mot de passe', 'creer utilisateur'],
    relatedContentIds: [],
    files: ['authController.js', 'auth.routes.js', 'Register.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-122-e1',
        title: 'Hacher le mot de passe côté serveur',
        goal: 'Ne jamais stocker un mot de passe en clair.',
        explanation:
          'On ne garde <b>jamais</b> un mot de passe en clair : si la base fuite, tous les comptes sont exposés. <code>bcrypt</code> transforme le mot de passe en une empreinte irréversible. Le <code>salt</code> (le chiffre 10) rend chaque empreinte unique, même pour deux mots de passe identiques.',
        files: ['authController.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-122-cb1',
            filename: 'authController.js',
            language: 'javascript',
            code: `import bcrypt from "bcrypt";
import { pool } from "../db.js";

export async function register(req, res) {
  const { email, motDePasse } = req.body;

  // On hache le mot de passe avant de le stocker (10 = force du salt)
  const hache = await bcrypt.hash(motDePasse, 10);

  // On insère le nouvel utilisateur avec le mot de passe chiffré
  await pool.query(
    "INSERT INTO utilisateurs (email, mot_de_passe) VALUES ($1, $2)",
    [email, hache]
  );

  res.status(201).json({ message: "Compte créé" });
}`,
          },
        ],
        result: 'Le mot de passe est stocké chiffré, jamais lisible.',
      },
      {
        id: 'GUIDE-W6-122-e2',
        title: 'Empêcher les doublons d’e-mail',
        goal: 'Refuser une inscription si l’e-mail existe déjà.',
        explanation:
          'Deux comptes avec le même e-mail casseraient la connexion. Avant d’insérer, on vérifie si l’e-mail existe déjà et on renvoie un statut <code>409</code> (conflit) le cas échéant. C’est plus clair pour le front qu’une erreur SQL brute.',
        files: ['authController.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-122-cb2',
            filename: 'authController.js',
            language: 'javascript',
            code: `export async function register(req, res) {
  const { email, motDePasse } = req.body;

  // On regarde si un compte utilise déjà cet e-mail
  const existant = await pool.query(
    "SELECT id FROM utilisateurs WHERE email = $1",
    [email]
  );
  if (existant.rows.length > 0) {
    return res.status(409).json({ message: "E-mail déjà utilisé" });
  }

  const hache = await bcrypt.hash(motDePasse, 10);
  await pool.query(
    "INSERT INTO utilisateurs (email, mot_de_passe) VALUES ($1, $2)",
    [email, hache]
  );
  res.status(201).json({ message: "Compte créé" });
}`,
          },
        ],
        result: 'Un e-mail ne peut être inscrit qu’une seule fois.',
      },
      {
        id: 'GUIDE-W6-122-e3',
        title: 'Brancher la route POST /register',
        goal: 'Exposer le contrôleur sur une URL.',
        explanation:
          'Le contrôleur ne sert à rien tant qu’il n’est pas relié à une <b>route</b>. On crée un routeur Express qui associe l’URL <code>/register</code> en <code>POST</code> à la fonction <code>register</code>. Le front appellera cette URL.',
        files: ['auth.routes.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-122-cb3',
            filename: 'auth.routes.js',
            language: 'javascript',
            code: `import { Router } from "express";
import { register } from "../controllers/authController.js";

const router = Router();

// POST /api/auth/register → crée un compte
router.post("/register", register);

export default router;`,
          },
        ],
        result: 'La route d’inscription est accessible depuis le front.',
      },
      {
        id: 'GUIDE-W6-122-e4',
        title: 'Le formulaire React d’inscription',
        goal: 'Envoyer e-mail + mot de passe à l’API.',
        explanation:
          'Côté React, deux champs contrôlés stockent la saisie. À la soumission, on empêche le rechargement de la page avec <code>preventDefault</code>, puis on envoie les données en <code>POST</code>. On affiche un message selon la réponse pour guider l’utilisateur.',
        files: ['Register.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-122-cb4',
            filename: 'Register.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

export function Register() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");

  async function envoyer(e: React.FormEvent) {
    e.preventDefault(); // on garde la main sur l'envoi

    const reponse = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, motDePasse }),
    });
    const data = await reponse.json();
    setMessage(data.message);
  }

  return (
    <form onSubmit={envoyer}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
      <input
        type="password"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        placeholder="Mot de passe"
      />
      <button type="submit">S'inscrire</button>
      {message && <p>{message}</p>}
    </form>
  );
}`,
          },
        ],
        result: 'Le formulaire crée un compte réel via l’API.',
      },
    ],
    finalResult:
      'Une inscription complète : formulaire React, route Express, e-mail unique et mot de passe haché avec bcrypt.',
    pitfalls: [
      'Stocker le mot de passe en clair : toujours passer par bcrypt.hash avant l’insertion.',
      'Oublier de vérifier le doublon d’e-mail : deux comptes identiques rendent la connexion ambiguë.',
      'Ne pas valider le format de l’e-mail ni la longueur du mot de passe côté serveur.',
    ],
    variations: [
      'Ajouter une confirmation de mot de passe côté formulaire.',
      'Envoyer un e-mail de bienvenue après l’inscription.',
      'Valider les données avec une librairie comme Zod ou Joi.',
    ],
  }),

  // ————— Créer une page de connexion : login —————
  guide({
    id: 'GUIDE-W6-123',
    slug: 'creer-une-page-de-connexion-login',
    title: 'Créer une page de connexion : login',
    shortTitle: 'Connexion',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Vérifier l’e-mail et le mot de passe, renvoyer un token JWT et le stocker côté front.',
    objective: 'Une page qui connecte l’utilisateur et garde une preuve de connexion.',
    preview:
      'L’utilisateur saisit ses identifiants ; s’ils sont bons, un token est renvoyé et enregistré dans le navigateur.',
    aliases: ['connexion', 'login', 'se connecter', 'signin', 'authentifier'],
    keywords: ['login', 'connexion', 'jwt token', 'bcrypt compare', 'localstorage token'],
    relatedContentIds: [],
    files: ['authController.js', 'auth.routes.js', 'Login.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-123-e1',
        title: 'Retrouver l’utilisateur par e-mail',
        goal: 'Charger le compte correspondant à l’e-mail saisi.',
        explanation:
          'La connexion commence par retrouver le compte. On cherche l’utilisateur par son e-mail. S’il n’existe pas, on renvoie une erreur <code>401</code> <b>générique</b> : on ne dit jamais « e-mail inconnu », pour ne pas révéler quels e-mails sont inscrits.',
        files: ['authController.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-123-cb1',
            filename: 'authController.js',
            language: 'javascript',
            code: `export async function login(req, res) {
  const { email, motDePasse } = req.body;

  // On récupère l'utilisateur correspondant à l'e-mail
  const resultat = await pool.query(
    "SELECT * FROM utilisateurs WHERE email = $1",
    [email]
  );
  const utilisateur = resultat.rows[0];

  // Message volontairement flou pour ne pas révéler les comptes existants
  if (!utilisateur) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }
  // ... suite à l'étape suivante
}`,
          },
        ],
        result: 'On tient le compte visé, sans divulguer son existence.',
      },
      {
        id: 'GUIDE-W6-123-e2',
        title: 'Comparer le mot de passe avec bcrypt',
        goal: 'Vérifier le mot de passe sans le déchiffrer.',
        explanation:
          'On ne peut pas « déchiffrer » un hash bcrypt : on utilise <code>bcrypt.compare</code>, qui rehache la saisie et la compare à l’empreinte stockée. S’ils ne correspondent pas, même erreur générique <code>401</code>. C’est le cœur de la vérification.',
        files: ['authController.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-123-cb2',
            filename: 'authController.js',
            language: 'javascript',
            code: `import bcrypt from "bcrypt";

// On compare le mot de passe saisi avec l'empreinte stockée
const correspond = await bcrypt.compare(motDePasse, utilisateur.mot_de_passe);

if (!correspond) {
  return res.status(401).json({ message: "Identifiants invalides" });
}`,
          },
        ],
        result: 'Le mot de passe est validé de façon sûre.',
      },
      {
        id: 'GUIDE-W6-123-e3',
        title: 'Générer et renvoyer un token JWT',
        goal: 'Donner une preuve de connexion signée.',
        explanation:
          'Une fois l’identité prouvée, on crée un <b>token JWT</b> avec <code>jwt.sign</code>. Il contient l’<code>id</code> de l’utilisateur, est signé avec une clé secrète et expire au bout d’un temps donné. Le front le renverra à chaque requête pour prouver qu’il est connecté.',
        files: ['authController.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-123-cb3',
            filename: 'authController.js',
            language: 'javascript',
            code: `import jwt from "jsonwebtoken";

// On signe un token contenant l'id de l'utilisateur
const token = jwt.sign(
  { id: utilisateur.id },
  process.env.JWT_SECRET, // clé secrète stockée dans le .env
  { expiresIn: "2h" }     // le token expire après 2 heures
);

res.json({ token });`,
          },
        ],
        result: 'Le serveur renvoie un token valable 2 heures.',
      },
      {
        id: 'GUIDE-W6-123-e4',
        title: 'La page React et le stockage du token',
        goal: 'Connecter l’utilisateur et mémoriser le token.',
        explanation:
          'Côté React, on envoie les identifiants et, si la réponse contient un token, on le range dans <code>localStorage</code> : il survit ainsi au rechargement de la page. On redirige ensuite vers une page privée. En cas d’échec, on affiche l’erreur.',
        files: ['Login.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-123-cb4',
            filename: 'Login.tsx',
            language: 'tsx',
            code: `import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    const reponse = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, motDePasse }),
    });

    if (!reponse.ok) {
      setErreur("Identifiants invalides");
      return;
    }
    const data = await reponse.json();
    // On mémorise le token pour rester connecté après un rechargement
    localStorage.setItem("token", data.token);
    navigate("/profil");
  }

  return (
    <form onSubmit={envoyer}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
      <input
        type="password"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        placeholder="Mot de passe"
      />
      <button type="submit">Se connecter</button>
      {erreur && <p>{erreur}</p>}
    </form>
  );
}`,
          },
        ],
        result: 'L’utilisateur est connecté et son token est mémorisé.',
      },
    ],
    finalResult:
      'Une connexion fonctionnelle : vérification bcrypt, token JWT signé et stocké côté front, message d’erreur générique.',
    pitfalls: [
      'Dire « e-mail inconnu » ou « mauvais mot de passe » : ça aide les attaquants. Reste générique.',
      'Mettre la clé JWT_SECRET en dur dans le code : garde-la dans le fichier .env.',
      'Oublier expiresIn : un token éternel est un risque si on le vole.',
    ],
    variations: [
      'Stocker le token dans un cookie httpOnly plutôt que localStorage (plus sûr contre le XSS).',
      'Ajouter un « Se souvenir de moi » qui allonge la durée du token.',
      'Renvoyer aussi les infos publiques de l’utilisateur (nom, rôle).',
    ],
  }),

  // ————— Créer une déconnexion —————
  guide({
    id: 'GUIDE-W6-124',
    slug: 'creer-une-deconnexion',
    title: 'Créer une déconnexion',
    shortTitle: 'Déconnexion',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Effacer le token, remettre l’interface à l’état déconnecté et rediriger l’utilisateur.',
    objective: 'Un bouton « Se déconnecter » qui coupe la session côté front.',
    preview:
      'Cliquer sur « Se déconnecter » supprime le token, vide le contexte utilisateur et renvoie vers la page de connexion.',
    aliases: ['deconnexion', 'logout', 'se deconnecter', 'signout'],
    keywords: ['logout', 'deconnexion', 'supprimer token', 'removeitem', 'fin de session'],
    relatedContentIds: [],
    files: ['auth.ts', 'BoutonDeconnexion.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-124-e1',
        title: 'Une fonction qui efface le token',
        goal: 'Centraliser la suppression de la session.',
        explanation:
          'Avec un JWT, la déconnexion se joue surtout <b>côté front</b> : il suffit d’oublier le token. On isole cette logique dans une petite fonction <code>deconnexion</code>, pour l’appeler partout au même endroit et éviter de dupliquer <code>removeItem</code>.',
        files: ['auth.ts'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-124-cb1',
            filename: 'auth.ts',
            language: 'typescript',
            code: `// Petit module utilitaire pour gérer le token
export function deconnexion() {
  // On oublie le token : le navigateur n'a plus de preuve de connexion
  localStorage.removeItem("token");
}

export function estConnecte(): boolean {
  return localStorage.getItem("token") !== null;
}`,
          },
        ],
        result: 'La suppression du token est centralisée et réutilisable.',
      },
      {
        id: 'GUIDE-W6-124-e2',
        title: 'Le bouton de déconnexion',
        goal: 'Déclencher la déconnexion et rediriger.',
        explanation:
          'Le bouton appelle <code>deconnexion()</code> puis renvoie l’utilisateur vers la page de connexion avec <code>navigate</code>. La redirection est importante : sans elle, l’utilisateur resterait sur une page privée devenue inaccessible.',
        files: ['BoutonDeconnexion.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-124-cb2',
            filename: 'BoutonDeconnexion.tsx',
            language: 'tsx',
            code: `import { useNavigate } from "react-router-dom";
import { deconnexion } from "../auth";

export function BoutonDeconnexion() {
  const navigate = useNavigate();

  function gererClic() {
    deconnexion();      // on efface le token
    navigate("/login"); // on renvoie vers la connexion
  }

  return (
    <button type="button" onClick={gererClic}>
      Se déconnecter
    </button>
  );
}`,
          },
        ],
        result: 'Un clic déconnecte et ramène à la page de connexion.',
      },
      {
        id: 'GUIDE-W6-124-e3',
        title: 'Prévenir le reste de l’app',
        goal: 'Remettre l’interface à l’état déconnecté.',
        explanation:
          'Effacer le token ne suffit pas si un contexte garde encore l’utilisateur en mémoire. Si tu utilises un <code>AuthContext</code>, la déconnexion doit aussi remettre l’utilisateur à <code>null</code>, pour que la barre de navigation et les pages se rafraîchissent.',
        files: ['auth.ts'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-124-cb3',
            filename: 'AuthContext.tsx',
            language: 'tsx',
            code: `// Extrait d'un contexte d'authentification
function seDeconnecter() {
  localStorage.removeItem("token");
  setUtilisateur(null); // l'interface repasse en mode "invité"
}`,
          },
        ],
        result: 'Toute l’interface reflète l’état déconnecté.',
      },
      {
        id: 'GUIDE-W6-124-e4',
        title: 'Afficher le bouton au bon moment',
        goal: 'Ne montrer « Se déconnecter » qu’aux utilisateurs connectés.',
        explanation:
          'Un bouton de déconnexion n’a de sens que si l’utilisateur est connecté. Dans la barre de navigation, on s’appuie sur <code>estConnecte()</code> pour afficher soit le bouton de déconnexion, soit un lien vers la page de connexion. L’interface reste ainsi cohérente avec l’état de la session.',
        files: ['Navbar.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-124-cb4',
            filename: 'Navbar.tsx',
            language: 'tsx',
            code: `import { Link } from "react-router-dom";
import { estConnecte } from "../auth";
import { BoutonDeconnexion } from "./BoutonDeconnexion";

export function Navbar() {
  // On choisit ce qu'on affiche selon l'état de connexion
  return (
    <nav>
      <Link to="/">Accueil</Link>
      {estConnecte() ? <BoutonDeconnexion /> : <Link to="/login">Se connecter</Link>}
    </nav>
  );
}`,
          },
        ],
        result: 'La barre de navigation reflète l’état de connexion.',
      },
    ],
    finalResult:
      'Une déconnexion propre : token effacé, contexte vidé et redirection vers la page de connexion.',
    pitfalls: [
      'Effacer le token sans rediriger : l’utilisateur reste bloqué sur une page privée cassée.',
      'Oublier de vider le contexte : la barre de navigation affiche encore « connecté ».',
      'Croire que la déconnexion invalide le token côté serveur : un JWT reste valable jusqu’à son expiration.',
    ],
    variations: [
      'Tenir une liste noire de tokens côté serveur pour invalider immédiatement.',
      'Déconnecter automatiquement quand le token expire (401 → logout).',
      'Ajouter une confirmation « Voulez-vous vraiment vous déconnecter ? ».',
    ],
  }),

  // ————— Créer une authentification JWT complète —————
  guide({
    id: 'GUIDE-W6-125',
    slug: 'creer-une-authentification-jwt-complete',
    title: 'Créer une authentification JWT complète',
    shortTitle: 'Auth JWT complète',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Assembler inscription, connexion, middleware de vérification et envoi automatique du token.',
    objective: 'Une chaîne d’authentification JWT de bout en bout, front et back.',
    preview:
      'Un utilisateur s’inscrit, se connecte, reçoit un token, et chaque requête protégée est vérifiée par un middleware.',
    aliases: ['jwt', 'authentification', 'auth complete', 'json web token', 'securite api'],
    keywords: ['jwt complet', 'middleware auth', 'bearer token', 'verify token', 'chaine authentification'],
    relatedContentIds: [],
    files: ['db.js', 'authController.js', 'auth.middleware.js', 'api.ts'],
    steps: [
      {
        id: 'GUIDE-W6-125-e1',
        title: 'Les variables secrètes dans .env',
        goal: 'Poser la clé de signature au bon endroit.',
        explanation:
          'Le JWT est signé avec une <b>clé secrète</b>. Si elle fuite, on peut forger de faux tokens : elle ne doit donc jamais être dans le code, mais dans un fichier <code>.env</code> ignoré par Git. On y range aussi la durée de vie du token pour la régler sans toucher au code.',
        files: ['.env'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-125-cb1',
            filename: '.env',
            language: 'bash',
            code: `# Clé secrète qui signe les tokens (à garder confidentielle)
JWT_SECRET=une_longue_chaine_aleatoire_et_secrete
# Durée de validité d'un token
JWT_EXPIRATION=2h`,
          },
        ],
        result: 'La clé de signature est isolée du code source.',
      },
      {
        id: 'GUIDE-W6-125-e2',
        title: 'Inscription et connexion réunies',
        goal: 'Regrouper register et login dans un contrôleur.',
        explanation:
          'On rassemble les deux points d’entrée : <code>register</code> hache le mot de passe et crée le compte, <code>login</code> vérifie avec <code>bcrypt.compare</code> puis signe un token. Les deux vivent dans le même contrôleur pour garder toute l’authentification au même endroit.',
        files: ['authController.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-125-cb2',
            filename: 'authController.js',
            language: 'javascript',
            code: `import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

export async function register(req, res) {
  const { email, motDePasse } = req.body;
  const hache = await bcrypt.hash(motDePasse, 10);
  await pool.query(
    "INSERT INTO utilisateurs (email, mot_de_passe) VALUES ($1, $2)",
    [email, hache]
  );
  res.status(201).json({ message: "Compte créé" });
}

export async function login(req, res) {
  const { email, motDePasse } = req.body;
  const { rows } = await pool.query(
    "SELECT * FROM utilisateurs WHERE email = $1",
    [email]
  );
  const utilisateur = rows[0];

  // Un seul message si l'e-mail ou le mot de passe est faux
  if (!utilisateur || !(await bcrypt.compare(motDePasse, utilisateur.mot_de_passe))) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }

  const token = jwt.sign(
    { id: utilisateur.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
  res.json({ token });
}`,
          },
        ],
        result: 'Inscription et connexion partagent la même base.',
      },
      {
        id: 'GUIDE-W6-125-e3',
        title: 'Le middleware qui vérifie le token',
        goal: 'Protéger n’importe quelle route en une ligne.',
        explanation:
          'Un <b>middleware</b> s’exécute avant le contrôleur. Il lit l’en-tête <code>Authorization</code>, en extrait le token après le mot « Bearer », puis le vérifie avec <code>jwt.verify</code>. Si tout va bien, il attache l’utilisateur à <code>req</code> et appelle <code>next()</code> ; sinon il renvoie <code>401</code>.',
        files: ['auth.middleware.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-125-cb3',
            filename: 'auth.middleware.js',
            language: 'javascript',
            code: `import jwt from "jsonwebtoken";

export function verifierToken(req, res, next) {
  // L'en-tête ressemble à : "Bearer eyJhbGciOi..."
  const entete = req.headers.authorization;
  if (!entete) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = entete.split(" ")[1]; // on enlève le mot "Bearer"

  try {
    // Si le token est valide, on récupère son contenu (id de l'utilisateur)
    const contenu = jwt.verify(token, process.env.JWT_SECRET);
    req.utilisateur = contenu; // disponible dans les contrôleurs suivants
    next();
  } catch {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
}`,
          },
        ],
        result: 'Il suffit d’ajouter ce middleware pour protéger une route.',
      },
      {
        id: 'GUIDE-W6-125-e4',
        title: 'Envoyer le token automatiquement côté front',
        goal: 'Joindre le token à chaque requête protégée.',
        explanation:
          'Plutôt que d’ajouter l’en-tête à la main partout, on crée un petit assistant <code>fetch</code> qui lit le token dans <code>localStorage</code> et l’ajoute automatiquement. On concatène « Bearer » et le token pour former l’en-tête <code>Authorization</code> attendu par le middleware.',
        files: ['api.ts'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-125-cb4',
            filename: 'api.ts',
            language: 'typescript',
            code: `// Un fetch qui ajoute tout seul le token d'authentification
export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      // On construit l'en-tête "Bearer <token>" sans interpolation
      Authorization: token ? "Bearer " + token : "",
    },
  });
}`,
          },
        ],
        result: 'Chaque requête protégée porte le token sans effort.',
      },
      {
        id: 'GUIDE-W6-125-e5',
        title: 'Protéger une route et la tester',
        goal: 'Vérifier la chaîne de bout en bout.',
        explanation:
          'On applique le middleware sur une route sensible : Express l’exécute avant le contrôleur. Sans token valide, la réponse est <code>401</code> ; avec un bon token, le contrôleur reçoit <code>req.utilisateur</code>. La boucle inscription → connexion → requête protégée est bouclée.',
        files: ['user.routes.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-125-cb5',
            filename: 'user.routes.js',
            language: 'javascript',
            code: `import { Router } from "express";
import { verifierToken } from "../middleware/auth.middleware.js";

const router = Router();

// Seul un utilisateur avec un token valide accède à son profil
router.get("/profil", verifierToken, (req, res) => {
  res.json({ message: "Bienvenue", id: req.utilisateur.id });
});

export default router;`,
          },
        ],
        result: 'La route ne répond qu’aux utilisateurs authentifiés.',
      },
    ],
    finalResult:
      'Une authentification JWT complète : clé secrète isolée, inscription/connexion, middleware de vérification et token envoyé automatiquement par le front.',
    pitfalls: [
      'Mettre JWT_SECRET dans le code ou le committer : garde-le dans .env ignoré par Git.',
      'Oublier de découper « Bearer » : jwt.verify reçoit alors une chaîne invalide.',
      'Ne pas gérer l’expiration côté front : capte le 401 pour rediriger vers la connexion.',
    ],
    variations: [
      'Ajouter un refresh token pour prolonger la session sans reconnexion.',
      'Passer le token par un cookie httpOnly au lieu de localStorage.',
      'Ajouter le rôle dans le token pour gérer les permissions.',
    ],
  }),

  // ————— Protéger des routes —————
  guide({
    id: 'GUIDE-W6-126',
    slug: 'proteger-des-routes',
    title: 'Protéger des routes',
    shortTitle: 'Routes protégées',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Empêcher l’accès aux pages privées côté React tant que l’utilisateur n’est pas connecté.',
    objective: 'Des pages accessibles uniquement aux utilisateurs connectés.',
    preview:
      'Un visiteur non connecté qui tente d’ouvrir /profil est automatiquement redirigé vers /login.',
    aliases: ['route protegee', 'proteger route', 'private route', 'guard', 'acces restreint'],
    keywords: ['route protegee', 'private route', 'navigate redirect', 'auth guard', 'outlet'],
    relatedContentIds: [],
    files: ['RouteProtegee.tsx', 'App.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-126-e1',
        title: 'Savoir si l’utilisateur est connecté',
        goal: 'Fournir un test de connexion simple.',
        explanation:
          'Avant de protéger quoi que ce soit, il faut une réponse claire à « suis-je connecté ? ». On se base sur la présence du token dans <code>localStorage</code>. Cette fonction sera le socle de toutes nos protections.',
        files: ['auth.ts'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-126-cb1',
            filename: 'auth.ts',
            language: 'typescript',
            code: `// Vrai si un token est présent dans le navigateur
export function estConnecte(): boolean {
  return localStorage.getItem("token") !== null;
}`,
          },
        ],
        result: 'On sait à tout moment si l’utilisateur est connecté.',
      },
      {
        id: 'GUIDE-W6-126-e2',
        title: 'Un composant garde-barrière',
        goal: 'Rediriger les visiteurs non connectés.',
        explanation:
          'On crée un composant <code>RouteProtegee</code> qui joue le rôle de videur. S’il n’y a pas de token, il renvoie un <code>&lt;Navigate&gt;</code> vers <code>/login</code>. Sinon, il affiche <code>&lt;Outlet /&gt;</code>, l’emplacement où React Router injecte la page demandée.',
        files: ['RouteProtegee.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-126-cb2',
            filename: 'RouteProtegee.tsx',
            language: 'tsx',
            code: `import { Navigate, Outlet } from "react-router-dom";
import { estConnecte } from "../auth";

export function RouteProtegee() {
  // Pas de token → on renvoie vers la page de connexion
  if (!estConnecte()) {
    return <Navigate to="/login" replace />;
  }
  // Connecté → on affiche la page demandée
  return <Outlet />;
}`,
          },
        ],
        result: 'Le composant filtre l’accès aux pages privées.',
      },
      {
        id: 'GUIDE-W6-126-e3',
        title: 'Envelopper les routes privées',
        goal: 'Placer les pages sensibles derrière la garde.',
        explanation:
          'Dans la configuration des routes, on <b>imbrique</b> les pages privées dans une route qui utilise <code>RouteProtegee</code> comme élément. Toutes les routes enfants héritent alors de la protection, sans avoir à la répéter page par page.',
        files: ['App.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-126-cb3',
            filename: 'App.tsx',
            language: 'tsx',
            code: `import { Routes, Route } from "react-router-dom";
import { RouteProtegee } from "./components/RouteProtegee";

<Routes>
  {/* Pages publiques */}
  <Route path="/login" element={<Login />} />

  {/* Pages privées : toutes protégées d'un coup */}
  <Route element={<RouteProtegee />}>
    <Route path="/profil" element={<Profil />} />
    <Route path="/tableau-de-bord" element={<TableauDeBord />} />
  </Route>
</Routes>;`,
          },
        ],
        result: 'Toutes les pages imbriquées sont protégées en bloc.',
      },
      {
        id: 'GUIDE-W6-126-e4',
        title: 'Gérer le retour du serveur',
        goal: 'Déconnecter si le token est refusé.',
        explanation:
          'La présence d’un token ne garantit pas qu’il est encore valide : il a pu expirer. Quand une requête protégée renvoie <code>401</code>, on efface le token et on redirige vers la connexion. Ainsi, un token périmé ne laisse pas l’utilisateur bloqué sur une page vide.',
        files: ['api.ts'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-126-cb4',
            filename: 'api.ts',
            language: 'typescript',
            code: `export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const reponse = await fetch(url, {
    ...options,
    headers: { ...options.headers, Authorization: token ? "Bearer " + token : "" },
  });

  // Token expiré ou refusé : on nettoie et on renvoie vers la connexion
  if (reponse.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return reponse;
}`,
          },
        ],
        result: 'Un token expiré déclenche une reconnexion propre.',
      },
    ],
    finalResult:
      'Des routes protégées côté React : un composant garde-barrière, des pages privées imbriquées et une gestion du token expiré.',
    pitfalls: [
      'Croire que cacher un bouton suffit : sans garde de route, l’URL reste accessible.',
      'Oublier le prop replace sur Navigate : le bouton « retour » ramène sur la page protégée.',
      'Se fier uniquement au front : la vraie sécurité se joue aussi côté serveur avec le middleware.',
    ],
    variations: [
      'Mémoriser la page demandée pour y revenir après la connexion.',
      'Afficher un écran de chargement pendant la vérification du token.',
      'Combiner avec la gestion des rôles pour des pages réservées aux admins.',
    ],
  }),

  // ————— Gérer les rôles : admin et utilisateur —————
  guide({
    id: 'GUIDE-W6-127',
    slug: 'gerer-les-roles-admin-et-utilisateur',
    title: 'Gérer les rôles : admin et utilisateur',
    shortTitle: 'Rôles',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Ajouter un rôle à chaque compte et n’autoriser certaines actions qu’aux administrateurs.',
    objective: 'Des permissions différentes selon le rôle de l’utilisateur.',
    preview:
      'Un utilisateur normal voit son profil ; un admin accède en plus au panneau d’administration.',
    aliases: ['roles', 'admin', 'permissions', 'droits', 'autorisation'],
    keywords: ['role admin', 'permissions', 'autorisation', 'middleware role', 'controle acces'],
    relatedContentIds: [],
    files: ['authController.js', 'role.middleware.js', 'AdminRoute.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-127-e1',
        title: 'Ajouter un rôle en base',
        goal: 'Donner un rôle par défaut à chaque compte.',
        explanation:
          'Le rôle est une donnée du compte : on ajoute une colonne <code>role</code> à la table, avec la valeur <code>utilisateur</code> par défaut. Les administrateurs sont rares, on les promeut donc au cas par cas plutôt que d’en faire la valeur par défaut.',
        files: ['migration.sql'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-127-cb1',
            filename: 'migration.sql',
            language: 'sql',
            code: `-- On ajoute un rôle, "utilisateur" par défaut pour tout nouveau compte
ALTER TABLE utilisateurs
  ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'utilisateur';

-- On promeut un compte précis en administrateur
UPDATE utilisateurs SET role = 'admin' WHERE email = 'chef@exemple.fr';`,
          },
        ],
        result: 'Chaque compte porte désormais un rôle.',
      },
      {
        id: 'GUIDE-W6-127-e2',
        title: 'Mettre le rôle dans le token',
        goal: 'Transporter le rôle à chaque requête.',
        explanation:
          'Pour éviter d’interroger la base à chaque requête, on glisse le <code>role</code> dans le token à la connexion. Comme le token est signé, l’utilisateur ne peut pas le modifier pour se donner des droits. Le middleware pourra lire ce rôle directement.',
        files: ['authController.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-127-cb2',
            filename: 'authController.js',
            language: 'javascript',
            code: `// À la connexion, on ajoute le rôle dans le contenu du token
const token = jwt.sign(
  { id: utilisateur.id, role: utilisateur.role },
  process.env.JWT_SECRET,
  { expiresIn: "2h" }
);
res.json({ token });`,
          },
        ],
        result: 'Le rôle voyage de façon sûre dans le token.',
      },
      {
        id: 'GUIDE-W6-127-e3',
        title: 'Un middleware qui exige un rôle',
        goal: 'Bloquer une route selon le rôle.',
        explanation:
          'On écrit un middleware <b>paramétrable</b> : <code>exigerRole("admin")</code> renvoie une fonction qui vérifie que <code>req.utilisateur.role</code> correspond. Sinon, il répond <code>403</code> (interdit), différent du <code>401</code> (non authentifié) : ici l’utilisateur est connecté mais n’a pas les droits.',
        files: ['role.middleware.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-127-cb3',
            filename: 'role.middleware.js',
            language: 'javascript',
            code: `// Renvoie un middleware qui n'autorise qu'un rôle donné
export function exigerRole(role) {
  return (req, res, next) => {
    // req.utilisateur vient du middleware verifierToken
    if (req.utilisateur.role !== role) {
      return res.status(403).json({ message: "Accès interdit" });
    }
    next();
  };
}`,
          },
        ],
        result: 'On protège une route par rôle en une ligne.',
      },
      {
        id: 'GUIDE-W6-127-e4',
        title: 'Enchaîner les middlewares sur la route',
        goal: 'Vérifier d’abord le token, puis le rôle.',
        explanation:
          'L’ordre compte : <code>verifierToken</code> s’exécute d’abord pour remplir <code>req.utilisateur</code>, puis <code>exigerRole</code> peut lire le rôle. On enchaîne les deux middlewares avant le contrôleur ; Express les exécute de gauche à droite.',
        files: ['admin.routes.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-127-cb4',
            filename: 'admin.routes.js',
            language: 'javascript',
            code: `import { Router } from "express";
import { verifierToken } from "../middleware/auth.middleware.js";
import { exigerRole } from "../middleware/role.middleware.js";

const router = Router();

// D'abord on vérifie le token, ensuite le rôle admin
router.get("/admin/stats", verifierToken, exigerRole("admin"), (req, res) => {
  res.json({ message: "Données réservées aux admins" });
});

export default router;`,
          },
        ],
        result: 'Seuls les admins accèdent à la route sensible.',
      },
      {
        id: 'GUIDE-W6-127-e5',
        title: 'Adapter l’interface au rôle',
        goal: 'Masquer les liens admin aux simples utilisateurs.',
        explanation:
          'Côté React, on décode le rôle contenu dans le token pour afficher ou non les liens d’administration. C’est du <b>confort</b>, pas de la sécurité : la vraie barrière reste le middleware serveur. On cache simplement ce qui serait de toute façon refusé.',
        files: ['AdminRoute.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-127-cb5',
            filename: 'AdminRoute.tsx',
            language: 'tsx',
            code: `import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function roleActuel(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  // On lit le contenu du token pour connaître le rôle
  return jwtDecode<{ role: string }>(token).role;
}

export function AdminRoute() {
  // Réservé aux admins, les autres repartent vers l'accueil
  return roleActuel() === "admin" ? <Outlet /> : <Navigate to="/" replace />;
}`,
          },
        ],
        result: 'L’interface s’adapte, le serveur garde le dernier mot.',
      },
    ],
    finalResult:
      'Une gestion des rôles complète : colonne role en base, rôle signé dans le token, middleware par rôle côté serveur et interface adaptée côté React.',
    pitfalls: [
      'Se fier au rôle affiché côté front : sans middleware serveur, l’API reste ouverte.',
      'Confondre 401 (non connecté) et 403 (connecté mais interdit) : chacun a son sens.',
      'Stocker le rôle uniquement côté front : il doit venir d’un token signé, non modifiable.',
    ],
    variations: [
      'Gérer plusieurs rôles autorisés : exigerRole(["admin", "moderateur"]).',
      'Créer un système de permissions fines plutôt que de simples rôles.',
      'Journaliser les accès refusés pour repérer les tentatives.',
    ],
  }),

  // ————— Créer un mot de passe oublié —————
  guide({
    id: 'GUIDE-W6-128',
    slug: 'creer-un-mot-de-passe-oublie',
    title: 'Créer un mot de passe oublié',
    shortTitle: 'Mot de passe oublié',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Envoyer un lien de réinitialisation par e-mail avec un token temporaire, puis enregistrer le nouveau mot de passe.',
    objective: 'Un parcours complet de réinitialisation de mot de passe par e-mail.',
    preview:
      'L’utilisateur saisit son e-mail, reçoit un lien contenant un token, choisit un nouveau mot de passe et se reconnecte.',
    aliases: ['mot de passe oublie', 'reset password', 'reinitialiser', 'forgot password', 'reinitialisation'],
    keywords: ['mot de passe oublie', 'reset password', 'token temporaire', 'reinitialisation email', 'nouveau mot de passe'],
    relatedContentIds: [],
    files: ['passwordController.js', 'password.routes.js', 'ResetPassword.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-128-e1',
        title: 'Générer un token de réinitialisation',
        goal: 'Créer un jeton temporaire lié au compte.',
        explanation:
          'Quand l’utilisateur demande une réinitialisation, on crée un token JWT <b>court</b> (par exemple 15 minutes) contenant son id. Sa courte durée limite les dégâts s’il est intercepté. On ne révèle jamais si l’e-mail existe, pour ne pas divulguer les comptes.',
        files: ['passwordController.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-128-cb1',
            filename: 'passwordController.js',
            language: 'javascript',
            code: `import jwt from "jsonwebtoken";
import { pool } from "../db.js";

export async function demanderReset(req, res) {
  const { email } = req.body;
  const { rows } = await pool.query(
    "SELECT id FROM utilisateurs WHERE email = $1",
    [email]
  );
  const utilisateur = rows[0];

  // On répond toujours pareil, même si l'e-mail est inconnu
  if (utilisateur) {
    const token = jwt.sign(
      { id: utilisateur.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // lien valable 15 minutes
    );
    await envoyerEmailReset(email, token); // voir étape suivante
  }

  res.json({ message: "Si ce compte existe, un e-mail a été envoyé." });
}`,
          },
        ],
        result: 'Un token temporaire est prêt, sans divulguer les comptes.',
      },
      {
        id: 'GUIDE-W6-128-e2',
        title: 'Envoyer le lien par e-mail',
        goal: 'Transmettre le token dans un lien cliquable.',
        explanation:
          'On envoie un e-mail contenant un lien vers la page de réinitialisation, avec le token en paramètre d’URL. On construit l’URL par concaténation pour éviter toute interpolation. En développement, on peut se contenter d’un service de test comme Nodemailer + Ethereal.',
        files: ['passwordController.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-128-cb2',
            filename: 'passwordController.js',
            language: 'javascript',
            code: `import nodemailer from "nodemailer";

async function envoyerEmailReset(email, token) {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  // On construit le lien par concaténation (pas d'interpolation)
  const lien = "http://localhost:5173/reset?token=" + token;

  await transport.sendMail({
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: "<p>Cliquez ici pour choisir un nouveau mot de passe : "
      + "<a href='" + lien + "'>Réinitialiser</a></p>",
  });
}`,
          },
        ],
        result: 'L’utilisateur reçoit un lien contenant son token.',
      },
      {
        id: 'GUIDE-W6-128-e3',
        title: 'Valider le token et changer le mot de passe',
        goal: 'Enregistrer un nouveau mot de passe si le token est bon.',
        explanation:
          'À la validation, on vérifie le token avec <code>jwt.verify</code> : s’il est expiré ou trafiqué, on refuse. Sinon, on récupère l’id qu’il contient, on hache le nouveau mot de passe et on le met à jour en base. Le token à usage court garantit que seul le destinataire de l’e-mail peut agir.',
        files: ['passwordController.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-128-cb3',
            filename: 'passwordController.js',
            language: 'javascript',
            code: `import bcrypt from "bcrypt";

export async function reinitialiser(req, res) {
  const { token, nouveauMotDePasse } = req.body;

  try {
    // On vérifie que le token est valide et non expiré
    const contenu = jwt.verify(token, process.env.JWT_SECRET);

    // On hache le nouveau mot de passe avant de l'enregistrer
    const hache = await bcrypt.hash(nouveauMotDePasse, 10);
    await pool.query(
      "UPDATE utilisateurs SET mot_de_passe = $1 WHERE id = $2",
      [hache, contenu.id]
    );

    res.json({ message: "Mot de passe mis à jour" });
  } catch {
    res.status(400).json({ message: "Lien invalide ou expiré" });
  }
}`,
          },
        ],
        result: 'Le mot de passe est changé si le lien est valide.',
      },
      {
        id: 'GUIDE-W6-128-e4',
        title: 'La page React de réinitialisation',
        goal: 'Lire le token de l’URL et envoyer le nouveau mot de passe.',
        explanation:
          'La page récupère le token dans l’URL avec <code>useSearchParams</code>. L’utilisateur saisit son nouveau mot de passe, et on envoie le tout à l’API. En cas de succès, on le redirige vers la connexion pour qu’il teste ses nouveaux identifiants.',
        files: ['ResetPassword.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-128-cb4',
            filename: 'ResetPassword.tsx',
            language: 'tsx',
            code: `import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token"); // token présent dans l'URL
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    const reponse = await fetch("http://localhost:3000/api/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, nouveauMotDePasse: motDePasse }),
    });

    if (reponse.ok) {
      navigate("/login"); // succès : on va se reconnecter
    } else {
      setMessage("Lien invalide ou expiré");
    }
  }

  return (
    <form onSubmit={envoyer}>
      <input
        type="password"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        placeholder="Nouveau mot de passe"
      />
      <button type="submit">Valider</button>
      {message && <p>{message}</p>}
    </form>
  );
}`,
          },
        ],
        result: 'L’utilisateur choisit un nouveau mot de passe via le lien reçu.',
      },
    ],
    finalResult:
      'Un parcours « mot de passe oublié » complet : token temporaire par e-mail, validation côté serveur, nouveau mot de passe haché et page React dédiée.',
    pitfalls: [
      'Créer un token sans expiration : un lien de réinitialisation éternel est dangereux.',
      'Révéler que l’e-mail n’existe pas : réponds toujours de la même façon.',
      'Oublier de hacher le nouveau mot de passe : il finirait en clair en base.',
    ],
    variations: [
      'Invalider le token après un seul usage (jeton stocké en base).',
      'Ajouter une confirmation du nouveau mot de passe.',
      'Prévenir l’utilisateur par e-mail que son mot de passe a été changé.',
    ],
  }),
];
