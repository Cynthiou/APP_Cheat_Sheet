import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const authContent: ReadyContent[] = [
  // ————— Hasher un mot de passe avec bcrypt —————
  lesson({
    id: 'AUTH-F-1100-LESSON',
    slug: 'hasher-un-mot-de-passe-avec-bcrypt',
    title: 'Hasher un mot de passe avec bcrypt',
    shortTitle: 'bcrypt',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Ne jamais stocker un mot de passe en clair : le transformer en empreinte irréversible avec bcrypt, puis le comparer à la connexion.',
    utility: 'Enregistrer un mot de passe sans jamais garder sa version lisible.',
    aliases: ['bcrypt', 'hash', 'hasher', 'mot de passe', 'password', 'salt', 'crypter mot de passe'],
    keywords: [
      'stocker un mot de passe',
      'hacher un mot de passe',
      'comparer un mot de passe',
      'inscription',
      'sel',
      'empreinte irreversible',
    ],
    relatedContentIds: [],
    templateId: 'AUTH-F-1100-TEMPLATE',
    intro:
      'Un mot de passe ne se stocke <b>jamais</b> en clair. On le passe dans <code>bcrypt</code> qui produit une <b>empreinte</b> (un hash) impossible à inverser. À la connexion, on ne « décrypte » rien : on <b>compare</b> le mot de passe saisi au hash enregistré.',
    sections: [
      {
        id: 's1',
        title: 'Hasher à l’inscription',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>enregistrer un nouvel utilisateur</b> sans jamais garder son mot de passe lisible en base de données.',
          },
          {
            type: 'paragraph',
            html: '<code>bcrypt.hash</code> prend le mot de passe en clair et un <b>coût</b> (le nombre de tours de salage, souvent 10). Il renvoie le hash à stocker à la place du mot de passe.',
          },
          {
            type: 'code',
            block: {
              id: 'AUTH-F-1100-l-c1',
              filename: 'auth.service.js',
              language: 'javascript',
              code: `const bcrypt = require("bcrypt");

// 1. Le cout : plus il est haut, plus c'est lent et sur (10 est un bon defaut)
const SALT_ROUNDS = 10;

// 2. On hache le mot de passe recu du formulaire
const hash = await bcrypt.hash(motDePasseEnClair, SALT_ROUNDS);

// 3. On stocke le HASH en base, jamais le mot de passe d'origine
await db.user.create({ email, password: hash });`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> bcrypt est un hachoir. Tu passes le mot de passe dedans, tu récupères de la viande hachée. Impossible de reconstituer le steak d’origine à partir de la viande.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Comparer à la connexion',
        blocks: [
          {
            type: 'paragraph',
            html: 'À la connexion, on ne peut pas « lire » le hash. On utilise <code>bcrypt.compare</code> : il rehache le mot de passe saisi et regarde s’il correspond au hash stocké. Il renvoie un booléen.',
          },
          {
            type: 'code',
            block: {
              id: 'AUTH-F-1100-l-c2',
              filename: 'auth.service.js',
              language: 'javascript',
              code: `// On recupere l'utilisateur par son email
const user = await db.user.findByEmail(email);

// bcrypt.compare(saisi, hashStocke) -> true ou false
const motDePasseValide = await bcrypt.compare(motDePasseSaisi, user.password);

if (!motDePasseValide) {
  // Message volontairement vague : on ne dit pas SI c'est l'email ou le mot de passe
  throw new Error("Identifiants invalides");
}`,
            },
          },
          {
            type: 'table',
            headers: ['Fonction', 'Rôle', 'Renvoie'],
            rows: [
              ['<code>bcrypt.hash(mdp, cout)</code>', 'créer l’empreinte à l’inscription', 'le hash (string)'],
              ['<code>bcrypt.compare(mdp, hash)</code>', 'vérifier à la connexion', 'un booléen'],
              ['<code>SALT_ROUNDS</code>', 'coût de calcul (lenteur)', 'un nombre (souvent 10)'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>hash</code> et <code>compare</code> sont <b>asynchrones</b> — toujours les préfixer par <code>await</code> (dans une fonction <code>async</code>).',
          },
        ],
      },
    ],
    pitfalls: [
      'Stocker le mot de passe en clair ou le chiffrer de façon réversible : bcrypt est <b>irréversible</b>, c’est le but.',
      'Oublier <code>await</code> devant <code>hash</code>/<code>compare</code> : tu stockes ou compares une <code>Promise</code>, pas le hash.',
      'Comparer avec <code>===</code> au lieu de <code>bcrypt.compare</code> : deux hachages du même mot de passe sont différents (à cause du sel).',
      'Renvoyer un message qui précise « email inconnu » vs « mauvais mot de passe » : ça aide un attaquant. Reste vague.',
    ],
    takeaways: [
      'jamais de mot de passe en clair : on stocke un <b>hash</b> bcrypt',
      'inscription : <code>await bcrypt.hash(mdp, 10)</code>',
      'connexion : <code>await bcrypt.compare(saisi, hash)</code> → booléen',
      'bcrypt est <b>irréversible</b> : on compare, on ne décrypte jamais',
    ],
  }),
  template({
    id: 'AUTH-F-1100-TEMPLATE',
    slug: 'hasher-un-mot-de-passe-avec-bcrypt',
    title: 'Hasher un mot de passe',
    technology: 'auth',
    tomeId: 't15',
    summary: 'Le code bcrypt prêt à copier : hacher à l’inscription, comparer à la connexion.',
    lede: 'Sécuriser un mot de passe. Choisis l’étape :',
    aliases: ['bcrypt', 'hash', 'mot de passe', 'password'],
    keywords: ['hacher', 'comparer', 'inscription', 'connexion'],
    relatedContentIds: [],
    lessonId: 'AUTH-F-1100-LESSON',
    variants: [
      {
        id: 'hash',
        label: 'Hacher (inscription)',
        codeBlocks: [
          {
            id: 'AUTH-F-1100-t-hash',
            filename: 'auth.service.js',
            language: 'javascript',
            code: `const bcrypt = require("bcrypt");

const hash = await bcrypt.hash(motDePasse, 10);
// stocke "hash" en base, pas motDePasse`,
          },
        ],
        replacements: [
          { token: 'motDePasse', description: 'le mot de passe en clair reçu du formulaire' },
          { token: '10', description: 'le coût (SALT_ROUNDS) : 10 est un bon défaut' },
        ],
        placement: 'À l’inscription, avant d’enregistrer l’utilisateur. Toujours dans une fonction async.',
      },
      {
        id: 'compare',
        label: 'Comparer (connexion)',
        codeBlocks: [
          {
            id: 'AUTH-F-1100-t-compare',
            filename: 'auth.service.js',
            language: 'javascript',
            code: `const bcrypt = require("bcrypt");

const valide = await bcrypt.compare(motDePasseSaisi, user.password);

if (!valide) {
  throw new Error("Identifiants invalides");
}`,
          },
        ],
        replacements: [
          { token: 'motDePasseSaisi', description: 'le mot de passe tapé par l’utilisateur' },
          { token: 'user.password', description: 'le hash récupéré en base de données' },
        ],
        placement: 'À la connexion, après avoir retrouvé l’utilisateur par son email.',
      },
      {
        id: 'import',
        label: 'Import ESM',
        description: 'La même chose avec la syntaxe import moderne.',
        codeBlocks: [
          {
            id: 'AUTH-F-1100-t-esm',
            filename: 'auth.service.js',
            language: 'javascript',
            code: `import bcrypt from "bcrypt";

const hash = await bcrypt.hash(motDePasse, 10);
const valide = await bcrypt.compare(motDePasseSaisi, hash);`,
          },
        ],
        replacements: [
          { token: 'motDePasse', description: 'le mot de passe en clair à hacher' },
          { token: 'motDePasseSaisi', description: 'le mot de passe à vérifier' },
        ],
        placement: 'Si ton projet utilise import/export (type: "module") plutôt que require.',
      },
    ],
  }),

  // ————— Créer un token avec JWT —————
  lesson({
    id: 'AUTH-F-1101-LESSON',
    slug: 'creer-un-token-avec-jwt',
    title: 'Créer un token avec JWT',
    shortTitle: 'Signer un JWT',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Fabriquer, après une connexion réussie, un jeton signé qui prouve l’identité de l’utilisateur sur les requêtes suivantes.',
    utility: 'Donner à l’utilisateur connecté une preuve d’identité à présenter ensuite.',
    aliases: ['jwt', 'token', 'jeton', 'sign', 'signer', 'json web token', 'creer un token'],
    keywords: [
      'generer un token',
      'signer un jwt',
      'apres connexion',
      'payload',
      'secret',
      'expiration token',
    ],
    relatedContentIds: [],
    templateId: 'AUTH-F-1101-TEMPLATE',
    intro:
      'Un <b>JWT</b> (JSON Web Token) est un jeton <b>signé</b> par le serveur. Une fois l’utilisateur authentifié, on lui remet ce token. Il le renverra à chaque requête pour prouver qui il est, sans avoir à se reconnecter.',
    sections: [
      {
        id: 's1',
        title: 'Signer un token après connexion',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux, <b>juste après avoir vérifié le mot de passe</b>, remettre à l’utilisateur un jeton qui le représente pour les prochaines requêtes.',
          },
          {
            type: 'paragraph',
            html: '<code>jwt.sign</code> prend trois arguments : le <b>payload</b> (les données à embarquer, jamais de mot de passe), le <b>secret</b> du serveur, et des <b>options</b> (comme l’expiration).',
          },
          {
            type: 'code',
            block: {
              id: 'AUTH-F-1101-l-c1',
              filename: 'auth.controller.js',
              language: 'javascript',
              code: `const jwt = require("jsonwebtoken");

// 1. Le payload : des donnees NON sensibles qui identifient l'utilisateur
const payload = { id: user.id, role: user.role };

// 2. On signe : payload + secret + duree de vie
const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: "1h", // le token expire dans 1 heure
});

// 3. On renvoie le token au client
res.json({ token });`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le token est un bracelet de festival tamponné à l’entrée. Tu le montres pour entrer partout, sans re-payer. Le tampon (la signature) prouve qu’il est officiel.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le contenu d’un token',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un JWT est <b>lisible par tout le monde</b> (il est encodé, pas chiffré). Ne mets <b>jamais</b> de donnée secrète dans le payload. Seule la <b>signature</b> protège contre la falsification.',
          },
          {
            type: 'table',
            headers: ['Partie du token', 'Contient', 'À mettre dedans ?'],
            rows: [
              ['header', 'l’algorithme utilisé', 'automatique'],
              ['payload', 'id, rôle, expiration…', 'infos non sensibles seulement'],
              ['signature', 'preuve avec le secret', 'jamais partager le secret'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> le secret vit dans une <b>variable d’environnement</b> (<code>process.env.JWT_SECRET</code>), jamais écrit en dur dans le code ni commité sur Git.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre le mot de passe (même haché) dans le payload : le JWT est lisible par n’importe qui.',
      'Écrire le secret en dur dans le code : place-le dans <code>.env</code> et charge-le via <code>process.env</code>.',
      'Oublier <code>expiresIn</code> : un token sans expiration reste valable pour toujours.',
      'Confondre <b>encodé</b> et <b>chiffré</b> : le payload d’un JWT se lit facilement, il n’est pas secret.',
    ],
    takeaways: [
      '<code>jwt.sign(payload, secret, options)</code> après une connexion réussie',
      'payload = infos <b>non sensibles</b> (id, rôle) — jamais de mot de passe',
      'secret dans <code>process.env.JWT_SECRET</code>, jamais en dur',
      'toujours une expiration : <code>expiresIn: "1h"</code>',
    ],
  }),
  template({
    id: 'AUTH-F-1101-TEMPLATE',
    slug: 'creer-un-token-avec-jwt',
    title: 'Créer un token JWT',
    technology: 'auth',
    tomeId: 't15',
    summary: 'Le code jwt.sign prêt à copier : token simple, avec rôle, ou avec durée personnalisée.',
    lede: 'Signer un jeton après connexion. Choisis le cas :',
    aliases: ['jwt', 'token', 'sign', 'signer'],
    keywords: ['payload', 'secret', 'expiration'],
    relatedContentIds: [],
    lessonId: 'AUTH-F-1101-LESSON',
    variants: [
      {
        id: 'simple',
        label: 'Token simple',
        codeBlocks: [
          {
            id: 'AUTH-F-1101-t-simple',
            filename: 'auth.controller.js',
            language: 'javascript',
            code: `const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { id: user.id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);`,
          },
        ],
        replacements: [
          { token: 'id: user.id', description: 'les données à embarquer (non sensibles)' },
          { token: '1h', description: 'la durée de vie du token (1h, 7d, 30m…)' },
        ],
        placement: 'Juste après avoir validé le mot de passe, avant de renvoyer la réponse.',
      },
      {
        id: 'role',
        label: 'Avec rôle',
        codeBlocks: [
          {
            id: 'AUTH-F-1101-t-role',
            filename: 'auth.controller.js',
            language: 'javascript',
            code: `const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);`,
          },
        ],
        replacements: [
          { token: 'role: user.role', description: 'le rôle pour gérer les permissions plus tard' },
          { token: '1h', description: 'la durée de vie du token' },
        ],
        placement: 'Quand tu as besoin du rôle (admin/user) pour protéger certaines routes.',
      },
      {
        id: 'refresh',
        label: 'Longue durée',
        description: 'Un token à durée de vie plus longue (ex. « rester connecté »).',
        codeBlocks: [
          {
            id: 'AUTH-F-1101-t-long',
            filename: 'auth.controller.js',
            language: 'javascript',
            code: `const token = jwt.sign(
  { id: user.id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);`,
          },
        ],
        replacements: [
          { token: '7d', description: 'la durée (7d = 7 jours) pour un « se souvenir de moi »' },
        ],
        placement: 'Pour une session qui dure plusieurs jours. Plus la durée est longue, plus le vol de token est risqué.',
      },
    ],
  }),

  // ————— Vérifier un token —————
  lesson({
    id: 'AUTH-F-1102-LESSON',
    slug: 'verifier-un-token',
    title: 'Vérifier un token',
    shortTitle: 'Vérifier un JWT',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Contrôler qu’un jeton reçu est authentique et non expiré, puis récupérer les infos de l’utilisateur qu’il contient.',
    utility: 'S’assurer qu’un token présenté est valide avant de faire confiance à l’utilisateur.',
    aliases: ['jwt verify', 'verifier token', 'valider token', 'decoder token', 'jwt.verify'],
    keywords: [
      'valider un token',
      'token expire',
      'token invalide',
      'decoder un jwt',
      'recuperer id utilisateur',
      'signature',
    ],
    relatedContentIds: [],
    templateId: 'AUTH-F-1102-TEMPLATE',
    intro:
      '<code>jwt.verify</code> refait le calcul de signature avec le <b>secret</b> du serveur. Si la signature colle et que le token n’a pas expiré, il renvoie le <b>payload</b>. Sinon, il <b>lève une erreur</b> — à toujours entourer d’un <code>try/catch</code>.',
    sections: [
      {
        id: 's1',
        title: 'Vérifier et lire le payload',
        blocks: [
          {
            type: 'situation',
            html: 'Je reçois un token dans une requête et je veux <b>savoir s’il est authentique</b>, puis récupérer l’<code>id</code> de l’utilisateur qu’il contient.',
          },
          {
            type: 'paragraph',
            html: '<code>jwt.verify(token, secret)</code> renvoie le payload décodé si tout est bon. En cas de token trafiqué ou expiré, il <b>throw</b> : d’où le <code>try/catch</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'AUTH-F-1102-l-c1',
              filename: 'verifyToken.js',
              language: 'javascript',
              code: `const jwt = require("jsonwebtoken");

try {
  // 1. Verifie la signature ET l'expiration avec le meme secret
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  // 2. Si on arrive ici, le token est valide : on lit son contenu
  console.log(payload.id);   // l'id qu'on avait mis a la signature
  console.log(payload.role); // le role, si on l'avait ajoute
} catch (err) {
  // 3. Signature fausse OU token expire -> on refuse
  console.log("Token invalide ou expire");
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> le secret de <code>verify</code> doit être <b>exactement le même</b> que celui utilisé pour <code>sign</code>. Un secret différent = signature invalide.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Distinguer les erreurs',
        blocks: [
          {
            type: 'paragraph',
            html: 'L’erreur levée porte un <code>name</code> qui indique la cause : token expiré ou signature invalide. Utile pour renvoyer un message adapté au client.',
          },
          {
            type: 'code',
            block: {
              id: 'AUTH-F-1102-l-c2',
              filename: 'verifyToken.js',
              language: 'javascript',
              code: `try {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
} catch (err) {
  if (err.name === "TokenExpiredError") {
    // Le token etait valide mais sa duree est ecoulee
    throw new Error("Session expiree, reconnecte-toi");
  }
  // Signature fausse, token trafique, format invalide...
  throw new Error("Token invalide");
}`,
            },
          },
          {
            type: 'table',
            headers: ['err.name', 'Cause', 'Réaction'],
            rows: [
              ['<code>TokenExpiredError</code>', 'la durée de vie est passée', 'demander une reconnexion'],
              ['<code>JsonWebTokenError</code>', 'signature fausse ou format cassé', 'refuser la requête (401)'],
              ['aucune erreur', 'token authentique et à jour', 'utiliser le payload'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Appeler <code>jwt.verify</code> sans <code>try/catch</code> : la moindre erreur fait planter le serveur.',
      'Utiliser <code>jwt.decode</code> à la place de <code>verify</code> : <code>decode</code> lit le payload <b>sans vérifier la signature</b> — aucune sécurité.',
      'Vérifier avec un secret différent de celui de la signature : le token valide sera rejeté.',
      'Faire confiance au payload sans avoir appelé <code>verify</code> : n’importe qui peut forger un JSON.',
    ],
    takeaways: [
      '<code>jwt.verify(token, secret)</code> → renvoie le payload si tout est bon',
      'toujours dans un <code>try/catch</code> : token trafiqué ou expiré = throw',
      'même secret pour <code>sign</code> et <code>verify</code>',
      '<code>decode</code> ≠ <code>verify</code> : <code>decode</code> ne contrôle <b>pas</b> la signature',
    ],
  }),
  template({
    id: 'AUTH-F-1102-TEMPLATE',
    slug: 'verifier-un-token',
    title: 'Vérifier un token JWT',
    technology: 'auth',
    tomeId: 't15',
    summary: 'Le code jwt.verify prêt à copier : vérification simple ou avec gestion de l’expiration.',
    lede: 'Contrôler un jeton reçu. Choisis le cas :',
    aliases: ['jwt verify', 'verifier token', 'valider token'],
    keywords: ['payload', 'expire', 'signature'],
    relatedContentIds: [],
    lessonId: 'AUTH-F-1102-LESSON',
    variants: [
      {
        id: 'simple',
        label: 'Vérification simple',
        codeBlocks: [
          {
            id: 'AUTH-F-1102-t-simple',
            filename: 'verifyToken.js',
            language: 'javascript',
            code: `const jwt = require("jsonwebtoken");

try {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  // payload.id est disponible
} catch (err) {
  // token invalide ou expire
}`,
          },
        ],
        replacements: [
          { token: 'token', description: 'le jeton reçu (souvent extrait du header Authorization)' },
          { token: 'process.env.JWT_SECRET', description: 'le même secret que pour la signature' },
        ],
        placement: 'Partout où tu dois valider un token avant de faire confiance à l’utilisateur.',
      },
      {
        id: 'erreurs',
        label: 'Avec gestion d’erreur',
        codeBlocks: [
          {
            id: 'AUTH-F-1102-t-err',
            filename: 'verifyToken.js',
            language: 'javascript',
            code: `try {
  return jwt.verify(token, process.env.JWT_SECRET);
} catch (err) {
  if (err.name === "TokenExpiredError") {
    throw new Error("Session expiree");
  }
  throw new Error("Token invalide");
}`,
          },
        ],
        replacements: [
          { token: 'token', description: 'le jeton à vérifier' },
          { token: 'Session expiree', description: 'le message renvoyé si le token a expiré' },
        ],
        placement: 'Quand tu veux distinguer « expiré » (reconnexion) de « invalide » (rejet net).',
      },
      {
        id: 'decode',
        label: 'Lire sans vérifier',
        description: 'À n’utiliser que pour du debug — aucune sécurité.',
        codeBlocks: [
          {
            id: 'AUTH-F-1102-t-decode',
            filename: 'debug.js',
            language: 'javascript',
            code: `// ATTENTION : ne verifie PAS la signature, pour inspecter uniquement
const payload = jwt.decode(token);
console.log(payload);`,
          },
        ],
        replacements: [
          { token: 'token', description: 'le jeton à inspecter' },
        ],
        placement: 'Seulement pour regarder le contenu en développement. Jamais pour autoriser une requête.',
      },
    ],
  }),

  // ————— Middleware d’authentification —————
  lesson({
    id: 'AUTH-F-1103-LESSON',
    slug: 'middleware-d-authentification',
    title: 'Middleware d’authentification',
    shortTitle: 'Middleware auth',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Écrire une fonction Express qui garde les routes privées : elle lit le token, le vérifie, et laisse passer ou bloque.',
    utility: 'Protéger d’un coup toutes les routes qui exigent d’être connecté.',
    aliases: ['middleware', 'auth middleware', 'protéger une route', 'requireAuth', 'bearer', 'next'],
    keywords: [
      'proteger une route',
      'route privee',
      'header authorization',
      'bearer token',
      'req.user',
      'renvoyer 401',
    ],
    relatedContentIds: [],
    templateId: 'AUTH-F-1103-TEMPLATE',
    intro:
      'Un <b>middleware</b> est une fonction qui s’exécute <b>avant</b> le contrôleur d’une route. Pour l’auth, il lit le token dans l’en-tête <code>Authorization</code>, le vérifie, attache l’utilisateur à <code>req</code>, puis appelle <code>next()</code> — ou renvoie une erreur <b>401</b>.',
    sections: [
      {
        id: 's1',
        title: 'Le middleware qui garde la porte',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux qu’une route comme <code>GET /profil</code> ne réponde <b>qu’aux utilisateurs connectés</b>, et rejette tous les autres avec une erreur claire.',
          },
          {
            type: 'paragraph',
            html: 'Le token arrive dans l’en-tête <code>Authorization</code> sous la forme <code>Bearer &lt;token&gt;</code>. On isole le token, on le vérifie, on pose le payload sur <code>req.user</code>, puis <code>next()</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'AUTH-F-1103-l-c1',
              filename: 'authMiddleware.js',
              language: 'javascript',
              code: `const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  // 1. On lit l'en-tete : "Bearer eyJhbGci..."
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token manquant" });
  }

  // 2. On enleve le prefixe "Bearer " pour garder le token seul
  const token = header.split(" ")[1];

  try {
    // 3. On verifie, et on attache l'utilisateur a la requete
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    // 4. Tout est bon -> on passe au controleur suivant
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalide" });
  }
}

module.exports = requireAuth;`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le middleware est le videur à l’entrée. Il vérifie le bracelet (le token) avant de te laisser entrer dans la salle (le contrôleur). Pas de bracelet valide, pas d’entrée.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Brancher le middleware sur une route',
        blocks: [
          {
            type: 'paragraph',
            html: 'On glisse le middleware <b>entre</b> le chemin et le contrôleur. Il ne s’exécute que sur les routes où on le place. Le contrôleur peut ensuite lire <code>req.user</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'AUTH-F-1103-l-c2',
              filename: 'routes.js',
              language: 'javascript',
              code: `const requireAuth = require("./authMiddleware");

// Route publique : pas de middleware
app.get("/", (req, res) => res.send("Accueil"));

// Route privee : requireAuth s'execute AVANT le controleur
app.get("/profil", requireAuth, (req, res) => {
  // req.user a ete rempli par le middleware
  res.json({ message: "Bienvenue", userId: req.user.id });
});`,
            },
          },
          {
            type: 'table',
            headers: ['Étape du middleware', 'Rôle'],
            rows: [
              ['lire <code>req.headers.authorization</code>', 'récupérer l’en-tête'],
              ['<code>.split(" ")[1]</code>', 'isoler le token après « Bearer »'],
              ['<code>jwt.verify(...)</code>', 'valider le token'],
              ['<code>req.user = payload</code>', 'transmettre l’utilisateur au contrôleur'],
              ['<code>next()</code> ou <code>401</code>', 'laisser passer ou bloquer'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>next()</code> quand tout est valide : la requête reste bloquée pour toujours.',
      'Ne pas gérer le header absent : <code>header.split</code> plante si <code>authorization</code> est <code>undefined</code>.',
      'Renvoyer une réponse <b>et</b> appeler <code>next()</code> : choisis l’un ou l’autre, jamais les deux.',
      'Placer le middleware après le contrôleur : il doit venir <b>avant</b> dans la liste des arguments.',
    ],
    takeaways: [
      'un middleware auth : lit le token → <code>verify</code> → <code>req.user</code> → <code>next()</code>',
      'le token arrive dans <code>Authorization: Bearer &lt;token&gt;</code>',
      'token absent ou invalide → <code>res.status(401)</code>, pas de <code>next()</code>',
      'on branche : <code>app.get("/route", requireAuth, controleur)</code>',
    ],
  }),
  template({
    id: 'AUTH-F-1103-TEMPLATE',
    slug: 'middleware-d-authentification',
    title: 'Middleware d’authentification',
    technology: 'auth',
    tomeId: 't15',
    summary: 'Le middleware Express prêt à copier : version de base, avec contrôle de rôle, ou branchement.',
    lede: 'Protéger tes routes privées. Choisis le cas :',
    aliases: ['middleware', 'requireAuth', 'proteger une route', 'bearer'],
    keywords: ['401', 'req.user', 'next'],
    relatedContentIds: [],
    lessonId: 'AUTH-F-1103-LESSON',
    variants: [
      {
        id: 'base',
        label: 'Middleware de base',
        codeBlocks: [
          {
            id: 'AUTH-F-1103-t-base',
            filename: 'authMiddleware.js',
            language: 'javascript',
            code: `function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "Token manquant" });
  }
  const token = header.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalide" });
  }
}`,
          },
        ],
        replacements: [
          { token: 'process.env.JWT_SECRET', description: 'le secret utilisé pour signer les tokens' },
          { token: 'req.user', description: 'le nom sous lequel tu exposes l’utilisateur' },
        ],
        placement: 'Dans un fichier à part, exporté puis importé là où tu protèges des routes.',
      },
      {
        id: 'role',
        label: 'Contrôle de rôle',
        description: 'Un middleware qui exige un rôle précis (admin).',
        codeBlocks: [
          {
            id: 'AUTH-F-1103-t-role',
            filename: 'requireAdmin.js',
            language: 'javascript',
            code: `function requireAdmin(req, res, next) {
  // requireAuth doit avoir rempli req.user AVANT
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acces refuse" });
  }
  next();
}`,
          },
        ],
        replacements: [
          { token: 'admin', description: 'le rôle exigé pour accéder à la route' },
        ],
        placement: 'À chaîner APRÈS requireAuth : app.get("/admin", requireAuth, requireAdmin, controleur).',
      },
      {
        id: 'branchement',
        label: 'Brancher sur une route',
        codeBlocks: [
          {
            id: 'AUTH-F-1103-t-branch',
            filename: 'routes.js',
            language: 'javascript',
            code: `app.get("/profil", requireAuth, (req, res) => {
  res.json({ userId: req.user.id });
});`,
          },
        ],
        replacements: [
          { token: '/profil', description: 'le chemin de la route à protéger' },
          { token: 'requireAuth', description: 'ton middleware d’authentification' },
        ],
        placement: 'Le middleware se place entre le chemin et le contrôleur.',
      },
    ],
  }),

  // ————— Login et logout côté React —————
  lesson({
    id: 'AUTH-F-1104-LESSON',
    slug: 'login-et-logout-cote-react',
    title: 'Login et logout côté React',
    shortTitle: 'Login / logout',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Envoyer les identifiants au serveur, récupérer le token, le garder, et se déconnecter proprement côté client React.',
    utility: 'Gérer la connexion et la déconnexion d’un utilisateur dans une app React.',
    aliases: ['login', 'logout', 'connexion', 'deconnexion', 'se connecter', 'formulaire login react'],
    keywords: [
      'envoyer identifiants',
      'recuperer le token',
      'formulaire de connexion',
      'se deconnecter',
      'fetch login',
      'rediriger apres login',
    ],
    relatedContentIds: [],
    templateId: 'AUTH-F-1104-TEMPLATE',
    intro:
      'Côté React, se <b>connecter</b> revient à envoyer email + mot de passe au serveur, recevoir un <b>token</b>, et le conserver. Se <b>déconnecter</b> revient à <b>effacer</b> ce token. L’interface s’adapte selon qu’un token est présent ou non.',
    sections: [
      {
        id: 's1',
        title: 'Se connecter et récupérer le token',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux qu’à la <b>soumission de mon formulaire de connexion</b>, l’app envoie les identifiants, récupère le token renvoyé et le garde pour la suite.',
          },
          {
            type: 'paragraph',
            html: 'On envoie une requête <code>POST</code> avec les identifiants en JSON. Si la réponse contient un token, on l’enregistre (ici dans <code>localStorage</code>) et on peut rediriger.',
          },
          {
            type: 'code',
            block: {
              id: 'AUTH-F-1104-l-c1',
              filename: 'Login.jsx',
              language: 'jsx',
              code: `async function handleLogin(email, motDePasse) {
  // 1. On envoie les identifiants au serveur
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, motDePasse }),
  });

  // 2. Si le serveur refuse, on arrete
  if (!res.ok) {
    throw new Error("Identifiants incorrects");
  }

  // 3. On recupere le token et on le garde
  const data = await res.json();
  localStorage.setItem("token", data.token);
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> côté React, on ne « connaît » pas l’utilisateur : on possède seulement un <b>token</b>. Sa présence = connecté, son absence = déconnecté.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Se déconnecter et lire l’état',
        blocks: [
          {
            type: 'paragraph',
            html: 'Se déconnecter = <b>supprimer</b> le token. Pour savoir si l’utilisateur est connecté, on regarde simplement si un token existe.',
          },
          {
            type: 'code',
            block: {
              id: 'AUTH-F-1104-l-c2',
              filename: 'auth.js',
              language: 'javascript',
              code: `// Se deconnecter : on efface le token
function logout() {
  localStorage.removeItem("token");
  // puis on redirige vers la page de connexion
}

// Savoir si on est connecte : le token existe-t-il ?
function estConnecte() {
  return Boolean(localStorage.getItem("token"));
}`,
            },
          },
          {
            type: 'table',
            headers: ['Action', 'Ce qu’on fait avec le token'],
            rows: [
              ['se connecter', 'on <b>enregistre</b> le token reçu'],
              ['rester connecté', 'le token reste stocké'],
              ['se déconnecter', 'on <b>supprime</b> le token'],
              ['afficher l’état', 'on <b>teste la présence</b> du token'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>headers: { "Content-Type": "application/json" }</code> : le serveur ne lit pas le corps JSON.',
      'Ne pas vérifier <code>res.ok</code> : une erreur 401 passe inaperçue et tu enregistres un token vide.',
      'Croire qu’effacer le token « déconnecte » côté serveur : le serveur ne sait rien, seul le client oublie le token.',
      'Lire l’utilisateur alors qu’on n’a qu’un token : pour ses infos, il faut appeler une route protégée.',
    ],
    takeaways: [
      'connexion = <code>POST</code> des identifiants → on récupère et on stocke le token',
      'toujours vérifier <code>res.ok</code> avant d’enregistrer le token',
      'déconnexion = <code>removeItem("token")</code> côté client',
      'connecté ou non = simple présence du token',
    ],
  }),
  template({
    id: 'AUTH-F-1104-TEMPLATE',
    slug: 'login-et-logout-cote-react',
    title: 'Login / logout React',
    technology: 'auth',
    tomeId: 't15',
    summary: 'Le code React prêt à copier : connexion (fetch), déconnexion, et requête authentifiée.',
    lede: 'Gérer connexion et déconnexion. Choisis le cas :',
    aliases: ['login', 'logout', 'connexion', 'deconnexion'],
    keywords: ['fetch', 'token', 'localStorage'],
    relatedContentIds: [],
    lessonId: 'AUTH-F-1104-LESSON',
    variants: [
      {
        id: 'login',
        label: 'Connexion',
        codeBlocks: [
          {
            id: 'AUTH-F-1104-t-login',
            filename: 'Login.jsx',
            language: 'jsx',
            code: `const res = await fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, motDePasse }),
});

if (!res.ok) throw new Error("Identifiants incorrects");

const data = await res.json();
localStorage.setItem("token", data.token);`,
          },
        ],
        replacements: [
          { token: '/api/login', description: 'l’URL de ta route de connexion' },
          { token: 'email, motDePasse', description: 'les champs de ton formulaire' },
        ],
        placement: 'Dans le handler de soumission de ton formulaire de connexion.',
      },
      {
        id: 'logout',
        label: 'Déconnexion',
        codeBlocks: [
          {
            id: 'AUTH-F-1104-t-logout',
            filename: 'auth.js',
            language: 'javascript',
            code: `function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}`,
          },
        ],
        replacements: [
          { token: '/login', description: 'la page vers laquelle rediriger après déconnexion' },
        ],
        placement: 'Sur ton bouton de déconnexion (onClick={logout}).',
      },
      {
        id: 'requete',
        label: 'Requête authentifiée',
        description: 'Renvoyer le token au serveur sur une route protégée.',
        codeBlocks: [
          {
            id: 'AUTH-F-1104-t-fetch',
            filename: 'api.js',
            language: 'javascript',
            code: `const token = localStorage.getItem("token");

const res = await fetch("/api/profil", {
  headers: {
    Authorization: "Bearer " + token,
  },
});`,
          },
        ],
        replacements: [
          { token: '/api/profil', description: 'la route protégée à appeler' },
          { token: 'Bearer " + token', description: 'le format attendu par le middleware' },
        ],
        placement: 'Chaque fois que tu appelles une route qui exige d’être connecté.',
      },
    ],
  }),

  // ————— Stocker le token —————
  lesson({
    id: 'AUTH-F-1105-LESSON',
    slug: 'stocker-le-token',
    title: 'Stocker le token',
    shortTitle: 'Stocker le token',
    technology: 'auth',
    tomeId: 't15',
    summary:
      'Choisir où garder le token côté client (localStorage, sessionStorage, cookie) et comprendre ce que chaque option implique.',
    utility: 'Décider où conserver le token pour le retrouver aux requêtes suivantes.',
    aliases: ['localStorage', 'sessionStorage', 'cookie', 'stocker token', 'garder le token', 'storage'],
    keywords: [
      'ou garder le token',
      'localstorage vs cookie',
      'session storage',
      'persistance token',
      'rester connecte',
      'xss',
    ],
    relatedContentIds: [],
    templateId: 'AUTH-F-1105-TEMPLATE',
    intro:
      'Une fois le token reçu, il faut le <b>garder quelque part</b> pour le renvoyer aux requêtes suivantes. Trois options courantes : <code>localStorage</code> (persistant), <code>sessionStorage</code> (le temps de l’onglet) et le <b>cookie</b> (envoyé automatiquement).',
    sections: [
      {
        id: 's1',
        title: 'localStorage : simple et persistant',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux que l’utilisateur <b>reste connecté même après avoir fermé son navigateur</b>, sans avoir à retaper son mot de passe.',
          },
          {
            type: 'paragraph',
            html: '<code>localStorage</code> garde le token <b>jusqu’à ce qu’on l’efface</b>, même après fermeture. On écrit avec <code>setItem</code>, on lit avec <code>getItem</code>, on supprime avec <code>removeItem</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'AUTH-F-1105-l-c1',
              filename: 'storage.js',
              language: 'javascript',
              code: `// Enregistrer le token (persiste apres fermeture du navigateur)
localStorage.setItem("token", token);

// Le relire plus tard (par exemple au chargement de l'app)
const token = localStorage.getItem("token");

// L'effacer a la deconnexion
localStorage.removeItem("token");`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>localStorage</code> = un tiroir de bureau qui reste rangé même quand tu éteins la lumière. <code>sessionStorage</code> = un post-it qui part à la poubelle dès que tu fermes l’onglet.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Choisir le bon emplacement',
        blocks: [
          {
            type: 'paragraph',
            html: 'Chaque emplacement a un compromis entre <b>durée de vie</b> et <b>sécurité</b>. <code>localStorage</code> est simple mais lisible par du JavaScript (risque <b>XSS</b>). Le cookie <code>httpOnly</code> est plus sûr mais se gère côté serveur.',
          },
          {
            type: 'table',
            headers: ['Emplacement', 'Durée', 'À savoir'],
            rows: [
              ['<code>localStorage</code>', 'jusqu’à suppression', 'simple, mais lisible en JS (XSS)'],
              ['<code>sessionStorage</code>', 'le temps de l’onglet', 'effacé à la fermeture de l’onglet'],
              ['cookie <code>httpOnly</code>', 'réglable', 'invisible au JS, envoyé auto — plus sûr'],
            ],
          },
          {
            type: 'code',
            block: {
              id: 'AUTH-F-1105-l-c2',
              filename: 'storage.js',
              language: 'javascript',
              code: `// sessionStorage : meme API, mais efface a la fermeture de l'onglet
sessionStorage.setItem("token", token);
const token = sessionStorage.getItem("token");
sessionStorage.removeItem("token");

// Regle simple pour debuter :
// - "rester connecte" -> localStorage
// - session courte / poste partage -> sessionStorage`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Sécurité :</b> pour une app sensible, le cookie <code>httpOnly</code> (posé par le serveur) évite que le token soit volé par un script malveillant. <code>localStorage</code> reste parfait pour apprendre et prototyper.',
          },
        ],
      },
    ],
    pitfalls: [
      'Stocker le token dans une variable JS simple : elle disparaît au rechargement de la page.',
      'Croire que <code>localStorage</code> est sécurisé : tout script de la page peut le lire (attaque XSS).',
      'Mettre des données sensibles à côté du token : le storage est lisible dans les outils du navigateur.',
      'Oublier de vider le storage à la déconnexion : le token traîne et reste réutilisable.',
    ],
    takeaways: [
      '<code>localStorage</code> = persiste après fermeture · <code>sessionStorage</code> = le temps de l’onglet',
      'même API : <code>setItem</code> · <code>getItem</code> · <code>removeItem</code>',
      '<code>localStorage</code> est lisible en JS → risque <b>XSS</b>',
      'app sensible : préférer un cookie <code>httpOnly</code> posé par le serveur',
    ],
  }),
  template({
    id: 'AUTH-F-1105-TEMPLATE',
    slug: 'stocker-le-token',
    title: 'Stocker le token',
    technology: 'auth',
    tomeId: 't15',
    summary: 'Le code prêt à copier pour garder le token : localStorage, sessionStorage ou cookie.',
    lede: 'Choisir où garder le token. Choisis l’emplacement :',
    aliases: ['localStorage', 'sessionStorage', 'cookie', 'stocker token'],
    keywords: ['setItem', 'getItem', 'removeItem'],
    relatedContentIds: [],
    lessonId: 'AUTH-F-1105-LESSON',
    variants: [
      {
        id: 'local',
        label: 'localStorage',
        codeBlocks: [
          {
            id: 'AUTH-F-1105-t-local',
            filename: 'storage.js',
            language: 'javascript',
            code: `localStorage.setItem("token", token);
const token = localStorage.getItem("token");
localStorage.removeItem("token");`,
          },
        ],
        replacements: [
          { token: '"token"', description: 'la clé sous laquelle tu ranges le jeton' },
          { token: 'token', description: 'la valeur du jeton à stocker' },
        ],
        placement: 'Le choix par défaut pour « rester connecté » : persiste après fermeture du navigateur.',
      },
      {
        id: 'session',
        label: 'sessionStorage',
        codeBlocks: [
          {
            id: 'AUTH-F-1105-t-session',
            filename: 'storage.js',
            language: 'javascript',
            code: `sessionStorage.setItem("token", token);
const token = sessionStorage.getItem("token");
sessionStorage.removeItem("token");`,
          },
        ],
        replacements: [
          { token: '"token"', description: 'la clé du jeton' },
          { token: 'token', description: 'la valeur à stocker' },
        ],
        placement: 'Pour une session courte : le token disparaît à la fermeture de l’onglet (poste partagé).',
      },
      {
        id: 'cookie',
        label: 'Cookie (serveur)',
        description: 'Le cookie httpOnly est posé par le serveur, pas par React.',
        codeBlocks: [
          {
            id: 'AUTH-F-1105-t-cookie',
            filename: 'auth.controller.js',
            language: 'javascript',
            code: `// Cote serveur (Express) : cookie invisible au JavaScript
res.cookie("token", token, {
  httpOnly: true,   // inaccessible en JS -> protege du XSS
  secure: true,     // uniquement en HTTPS
  maxAge: 3600000,  // duree de vie en millisecondes (1h)
});`,
          },
        ],
        replacements: [
          { token: '"token"', description: 'le nom du cookie' },
          { token: '3600000', description: 'la durée de vie en millisecondes' },
        ],
        placement: 'L’option la plus sûre pour une app sensible. Le cookie est renvoyé automatiquement par le navigateur.',
      },
    ],
  }),
];
