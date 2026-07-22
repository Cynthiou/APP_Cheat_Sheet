import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const tsExtra1Content: ReadyContent[] = [
  // ————— Typer l'asynchrone —————
  lesson({
    id: 'TS-F-020-LESSON',
    slug: 'typer-async',
    title: 'Typer l’asynchrone : Promise<T> et async',
    shortTitle: 'Typer l’async',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Le type de retour d’une fonction async est toujours Promise<T> ; await donne le T.',
    utility: 'Décrire ce que renvoie une fonction asynchrone (fetch, requête…) et sécuriser le await.',
    aliases: ['promise', 'async', 'await', 'typer async', 'fonction asynchrone'],
    keywords: ['promise t', 'async await', 'typer fetch', 'retour asynchrone'],
    relatedContentIds: [],
    templateId: 'TS-F-020-TEMPLATE',
    intro:
      'Une fonction <code>async</code> renvoie <b>toujours</b> une <code>Promise&lt;T&gt;</code>, où <code>T</code> est la valeur finale. Faire <code>await</code> sur cette promesse te redonne un <code>T</code> déjà typé.',
    sections: [
      {
        id: 's1',
        title: 'Promise<T> et await',
        blocks: [
          {
            type: 'paragraph',
            html: 'Tu annotes le retour avec <code>Promise&lt;T&gt;</code>. À l’intérieur, tu renvoies un <code>T</code> ; à l’extérieur, <code>await</code> déballe la promesse et te rend le <code>T</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-async-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `interface User {
  id: number;
  nom: string;
}

// Le retour est une Promise qui contiendra un User
async function getUser(id: number): Promise<User> {
  const res = await fetch("/api/users/" + id);
  return res.json(); // devient le User attendu
}

// await deballe la Promise -> user est un User
const user = await getUser(1);
console.log(user.nom);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Même si tu renvoies une valeur simple, une fonction <code>async</code> l’emballe dans une <code>Promise</code>. Écrire <code>: Promise&lt;User&gt;</code> documente clairement le résultat.',
          },
        ],
      },
    ],
    pitfalls: [
      'oublier le <code>await</code> : tu manipules la <code>Promise</code> elle-même, pas le <code>T</code>.',
      'annoter <code>: User</code> au lieu de <code>: Promise&lt;User&gt;</code> sur une fonction <code>async</code>.',
      'penser que <code>res.json()</code> est typé : il renvoie <code>Promise&lt;any&gt;</code>, précise le type attendu.',
    ],
    takeaways: [
      'une fonction <code>async</code> renvoie toujours <code>Promise&lt;T&gt;</code>',
      '<code>await</code> déballe la promesse et donne le <code>T</code>',
      'annote le retour : <code>async function f(): Promise&lt;User&gt;</code>',
      '<code>res.json()</code> renvoie <code>Promise&lt;any&gt;</code> : type-le toi-même',
    ],
  }),
  template({
    id: 'TS-F-020-TEMPLATE',
    slug: 'typer-async',
    title: 'Typer l’asynchrone',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Typer une fonction async et son await.',
    lede: 'Typer l’asynchrone. Choisis le cas :',
    aliases: ['promise', 'async', 'await', 'typer fetch'],
    keywords: ['promise t async await'],
    relatedContentIds: [],
    lessonId: 'TS-F-020-LESSON',
    variants: [
      {
        id: 'fetch',
        label: 'Fonction qui fetch',
        codeBlocks: [
          {
            id: 'ts-async-t-fetch',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `interface Produit {
  id: number;
  nom: string;
}

async function getProduit(id: number): Promise<Produit> {
  const res = await fetch("/api/produits/" + id);
  return res.json();
}`,
          },
        ],
        replacements: [
          { token: 'Produit', description: 'le type de la valeur finale' },
          { token: 'Promise<Produit>', description: 'le retour d’une fonction async' },
        ],
        placement: 'Pour une fonction qui va chercher des données.',
      },
      {
        id: 'await',
        label: 'Consommer avec await',
        codeBlocks: [
          {
            id: 'ts-async-t-await',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `const produit = await getProduit(1);
// produit est un Produit, pas une Promise
console.log(produit.nom);`,
          },
        ],
        replacements: [
          { token: 'getProduit(1)', description: 'l’appel qui renvoie la Promise' },
        ],
        placement: 'Dans une fonction elle-même <code>async</code>.',
      },
    ],
  }),

  // ————— Les utility types —————
  lesson({
    id: 'TS-F-021-LESSON',
    slug: 'utility-types',
    title: 'Les utility types : Partial, Pick, Omit, Record',
    shortTitle: 'Utility types',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Transformer un type existant sans le réécrire : rendre optionnel, choisir, retirer, indexer.',
    utility: 'Dériver de nouveaux types à partir d’un type de base, sans duplication.',
    aliases: ['partial', 'pick', 'omit', 'record', 'utility types', 'rendre optionnel', 'choisir des champs'],
    keywords: ['transformer un type', 'champs optionnels', 'retirer des champs', 'dictionnaire type'],
    relatedContentIds: ['TS-F-009-LESSON'],
    templateId: 'TS-F-021-TEMPLATE',
    intro:
      'Les <b>utility types</b> fabriquent un nouveau type à partir d’un type existant. Plutôt que de recopier une interface, tu la <b>transformes</b> : tout rendre optionnel, garder certains champs, en retirer, ou construire un dictionnaire.',
    sections: [
      {
        id: 's1',
        title: 'Les quatre plus utiles',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'ts-utility-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `interface User {
  id: number;
  nom: string;
  email: string;
}

// Partial : tous les champs deviennent optionnels
type UserPatch = Partial<User>; // { id?, nom?, email? }

// Pick : on garde seulement certains champs
type Apercu = Pick<User, "id" | "nom">; // { id, nom }

// Omit : on retire certains champs
type SansId = Omit<User, "id">; // { nom, email }

// Record : un dictionnaire cle -> valeur
type ParId = Record<number, User>; // { [id: number]: User }`,
            },
          },
          {
            type: 'table',
            headers: ['Utility', 'Effet'],
            rows: [
              ['<code>Partial&lt;T&gt;</code>', 'rend tous les champs optionnels'],
              ['<code>Pick&lt;T, K&gt;</code>', 'garde seulement les champs <code>K</code>'],
              ['<code>Omit&lt;T, K&gt;</code>', 'retire les champs <code>K</code>'],
              ['<code>Record&lt;K, V&gt;</code>', 'construit un dictionnaire <code>K → V</code>'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Ces types se combinent avec le reste. Ex. une fonction de mise à jour prend souvent un <code>Partial&lt;User&gt;</code> pour n’envoyer que les champs modifiés.',
          },
        ],
      },
    ],
    pitfalls: [
      'confondre <code>Pick</code> (on garde) et <code>Omit</code> (on retire).',
      'oublier les guillemets : les clés se passent en littéraux, ex. <code>Pick&lt;User, "id"&gt;</code>.',
      'abuser de <code>Partial</code> partout : un objet où tout est optionnel n’attrape plus les oublis.',
    ],
    takeaways: [
      '<code>Partial&lt;T&gt;</code> rend tout optionnel',
      '<code>Pick&lt;T, K&gt;</code> garde des champs, <code>Omit&lt;T, K&gt;</code> en retire',
      '<code>Record&lt;K, V&gt;</code> construit un dictionnaire',
      'on transforme un type existant au lieu de le recopier',
    ],
  }),
  template({
    id: 'TS-F-021-TEMPLATE',
    slug: 'utility-types',
    title: 'Utility types',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Dériver un type depuis un type existant.',
    lede: 'Transformer un type. Choisis le cas :',
    aliases: ['partial', 'pick', 'omit', 'record'],
    keywords: ['transformer un type existant'],
    relatedContentIds: [],
    lessonId: 'TS-F-021-LESSON',
    variants: [
      {
        id: 'partial-pick-omit',
        label: 'Partial / Pick / Omit',
        codeBlocks: [
          {
            id: 'ts-utility-t-ppo',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `interface User {
  id: number;
  nom: string;
  email: string;
}

type UserPatch = Partial<User>;
type Apercu = Pick<User, "id" | "nom">;
type SansId = Omit<User, "id">;`,
          },
        ],
        replacements: [
          { token: 'User', description: 'le type de base à transformer' },
          { token: '"id" | "nom"', description: 'les champs à garder (Pick) ou retirer (Omit)' },
        ],
        placement: 'Pour dériver une variante d’un type existant.',
      },
      {
        id: 'record',
        label: 'Record (dictionnaire)',
        codeBlocks: [
          {
            id: 'ts-utility-t-record',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `type Role = "admin" | "membre";

// Chaque role pointe vers un libelle
type Libelles = Record<Role, string>;

const libelles: Libelles = {
  admin: "Administrateur",
  membre: "Membre",
};`,
          },
        ],
        replacements: [
          { token: 'Role', description: 'le type des clés' },
          { token: 'string', description: 'le type des valeurs' },
        ],
        placement: 'Pour un objet dont toutes les clés partagent le même type de valeur.',
      },
    ],
  }),

  // ————— unknown vs any —————
  lesson({
    id: 'TS-F-022-LESSON',
    slug: 'unknown-vs-any',
    title: 'unknown vs any : la sécurité du typage',
    shortTitle: 'unknown vs any',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'any désactive les vérifications ; unknown force à vérifier le type avant de s’en servir.',
    utility: 'Choisir un type sûr quand on ne connaît pas encore la forme d’une valeur.',
    aliases: ['unknown', 'any', 'type inconnu', 'securite typage'],
    keywords: ['any dangereux', 'unknown', 'verification de type', 'typeof narrowing'],
    relatedContentIds: ['TS-F-001-LESSON'],
    templateId: 'TS-F-022-TEMPLATE',
    intro:
      '<code>any</code> et <code>unknown</code> acceptent tous les deux n’importe quelle valeur, mais l’un est dangereux et l’autre sûr. <code>any</code> <b>coupe</b> les vérifications ; <code>unknown</code> t’<b>oblige</b> à vérifier avant d’utiliser la valeur.',
    sections: [
      {
        id: 's1',
        title: 'Deux comportements opposés',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'ts-unknown-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `let a: any = "coucou";
a.toFixed(2); // aucune erreur... mais plante a l'execution

let u: unknown = "coucou";
// u.toFixed(2); // Erreur : TypeScript refuse tant qu'on n'a pas verifie

if (typeof u === "string") {
  u.toUpperCase(); // ici u est un string, c'est sur
}`,
            },
          },
          {
            type: 'situation',
            html: 'Tu reçois une donnée d’une API dont tu n’es pas sûr de la forme. Typée <code>unknown</code>, TypeScript te force à vérifier (<code>typeof</code>, un test…) avant de l’utiliser : le bug est attrapé à la compilation, pas en production.',
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Préfère <code>unknown</code> à <code>any</code> pour toute valeur d’origine incertaine. <code>any</code> est un dernier recours, à isoler et commenter.',
          },
        ],
      },
    ],
    pitfalls: [
      'utiliser <code>any</code> « pour aller vite » : tu perds toute la sécurité sur cette valeur et celles qui en découlent.',
      'oublier le test de type sur un <code>unknown</code> : TypeScript refuse, mais on est tenté de forcer avec <code>as</code>.',
      'croire que <code>unknown</code> et <code>any</code> sont interchangeables : seul <code>any</code> laisse tout passer.',
    ],
    takeaways: [
      '<code>any</code> désactive les vérifications : dangereux',
      '<code>unknown</code> force à vérifier le type avant usage',
      'on rétrécit un <code>unknown</code> avec <code>typeof</code> ou un test',
      'par défaut, choisis <code>unknown</code> plutôt que <code>any</code>',
    ],
  }),
  template({
    id: 'TS-F-022-TEMPLATE',
    slug: 'unknown-vs-any',
    title: 'unknown vs any',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Manipuler une valeur de type incertain, sans danger.',
    lede: 'Valeur incertaine. Choisis le cas :',
    aliases: ['unknown', 'any', 'type inconnu'],
    keywords: ['securite typage'],
    relatedContentIds: [],
    lessonId: 'TS-F-022-LESSON',
    variants: [
      {
        id: 'unknown-safe',
        label: 'unknown (sûr)',
        codeBlocks: [
          {
            id: 'ts-unknown-t-safe',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `function afficher(valeur: unknown) {
  if (typeof valeur === "string") {
    console.log(valeur.toUpperCase());
  } else if (typeof valeur === "number") {
    console.log(valeur.toFixed(2));
  }
}`,
          },
        ],
        replacements: [
          { token: 'valeur', description: 'la donnée de type incertain' },
          { token: 'typeof valeur === "string"', description: 'le test qui restreint le type' },
        ],
        placement: 'Pour toute donnée dont tu ne connais pas la forme.',
      },
    ],
  }),

  // ————— Les enum —————
  lesson({
    id: 'TS-F-023-LESSON',
    slug: 'enum-typescript',
    title: 'Les enum : un ensemble de valeurs nommées',
    shortTitle: 'Les enum',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Regrouper des valeurs fixes (statuts, rôles) sous des noms lisibles.',
    utility: 'Nommer un ensemble fermé de valeurs pour éviter les chaînes magiques.',
    aliases: ['enum', 'enumeration', 'valeurs nommees', 'as const'],
    keywords: ['enum statuts roles', 'union de litteraux', 'as const', 'valeurs fixes'],
    relatedContentIds: ['TS-F-001-LESSON'],
    templateId: 'TS-F-023-TEMPLATE',
    intro:
      'Un <b>enum</b> regroupe un ensemble <b>fixe</b> de valeurs sous des noms parlants (statuts, rôles…). Il évite les chaînes de caractères éparpillées et donne l’autocomplétion.',
    sections: [
      {
        id: 's1',
        title: 'enum ou union de littéraux',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'ts-enum-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `enum Statut {
  Actif = "actif",
  Inactif = "inactif",
  Suspendu = "suspendu",
}

function afficher(s: Statut) {
  return "Statut : " + s;
}

afficher(Statut.Actif); // autocompletion sur les valeurs`,
            },
          },
          {
            type: 'paragraph',
            html: 'Beaucoup préfèrent aujourd’hui une <b>union de littéraux</b> avec <code>as const</code> : plus légère à la compilation et tout aussi sûre.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-enum-c2',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `const STATUTS = ["actif", "inactif", "suspendu"] as const;

// Le type est genere depuis le tableau
type Statut = (typeof STATUTS)[number]; // "actif" | "inactif" | "suspendu"

const s: Statut = "actif";`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<code>as const</code> fige les valeurs en littéraux exacts. L’union <code>"actif" | "inactif" | ...</code> est souvent préférée à un <code>enum</code> dans les projets récents.',
          },
        ],
      },
    ],
    pitfalls: [
      'utiliser un <code>enum</code> numérique par défaut : les valeurs implicites (0, 1, 2) sont moins lisibles qu’un <code>enum</code> de chaînes.',
      'oublier <code>as const</code> sur le tableau : sans lui, le type retombe sur <code>string</code>.',
      'multiplier les chaînes magiques ailleurs dans le code au lieu de réutiliser l’enum ou l’union.',
    ],
    takeaways: [
      'un <code>enum</code> nomme un ensemble fixe de valeurs',
      'préfère souvent une union de littéraux + <code>as const</code>',
      '<code>(typeof T)[number]</code> génère l’union depuis un tableau',
      'évite les chaînes magiques : autocomplétion et sécurité',
    ],
  }),
  template({
    id: 'TS-F-023-TEMPLATE',
    slug: 'enum-typescript',
    title: 'Les enum',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Définir un ensemble fermé de valeurs nommées.',
    lede: 'Valeurs fixes. Choisis le cas :',
    aliases: ['enum', 'union de litteraux', 'as const'],
    keywords: ['valeurs nommees'],
    relatedContentIds: [],
    lessonId: 'TS-F-023-LESSON',
    variants: [
      {
        id: 'enum',
        label: 'enum',
        codeBlocks: [
          {
            id: 'ts-enum-t-enum',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `enum Role {
  Admin = "admin",
  Membre = "membre",
  Invite = "invite",
}

const r: Role = Role.Admin;`,
          },
        ],
        replacements: [
          { token: 'Role', description: 'le nom de l’ensemble' },
          { token: 'Admin = "admin"', description: 'chaque nom et sa valeur' },
        ],
        placement: 'Quand tu veux un objet nommé, importable partout.',
      },
      {
        id: 'union-const',
        label: 'Union + as const',
        codeBlocks: [
          {
            id: 'ts-enum-t-union',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `const ROLES = ["admin", "membre", "invite"] as const;

type Role = (typeof ROLES)[number];

const r: Role = "admin";`,
          },
        ],
        replacements: [
          { token: 'ROLES', description: 'le tableau des valeurs autorisées' },
          { token: 'Role', description: 'le type union généré' },
        ],
        placement: 'L’approche légère, souvent préférée aux enum.',
      },
    ],
  }),

  // ————— Les types intersection —————
  lesson({
    id: 'TS-F-024-LESSON',
    slug: 'intersection-types',
    title: 'Les types intersection : combiner avec &',
    shortTitle: 'Intersection &',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'A & B fabrique un type qui possède tout de A ET tout de B.',
    utility: 'Fusionner plusieurs types en un seul qui cumule leurs propriétés.',
    aliases: ['intersection', 'type intersection', 'combiner types', 'et logique'],
    keywords: ['a et b', 'fusionner types', 'difference union intersection', 'cumuler proprietes'],
    relatedContentIds: ['TS-F-001-LESSON'],
    templateId: 'TS-F-024-TEMPLATE',
    intro:
      'Le <code>&amp;</code> (intersection) combine deux types en un seul qui possède <b>tout des deux à la fois</b>. C’est le pendant du <code>|</code> (union), qui lui n’accepte que <b>l’un OU l’autre</b>.',
    sections: [
      {
        id: 's1',
        title: 'A & B cumule les propriétés',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'ts-inter-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `interface Identifiable {
  id: number;
}

interface Datee {
  creeLe: string;
}

// Un Entree a la fois un id ET une date
type Entree = Identifiable & Datee;

const e: Entree = {
  id: 1,
  creeLe: "2026-01-01",
}; // les deux champs sont obligatoires`,
            },
          },
          {
            type: 'table',
            headers: ['Opérateur', 'Sens', 'Exemple'],
            rows: [
              ['<code>&amp;</code> (intersection)', 'tout de A ET de B', 'a un <code>id</code> ET une <code>date</code>'],
              ['<code>|</code> (union)', 'A OU B', 'est un <code>string</code> OU un <code>number</code>'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Retiens l’image : <code>&amp;</code> <b>additionne</b> les propriétés (l’objet doit tout avoir), <code>|</code> <b>offre un choix</b> (la valeur est l’une des options).',
          },
        ],
      },
    ],
    pitfalls: [
      'confondre <code>&amp;</code> et <code>|</code> : l’intersection cumule, l’union laisse le choix.',
      'intersecter des types incompatibles (ex. <code>string &amp; number</code>) : le résultat est <code>never</code>, inutilisable.',
      'oublier qu’avec <code>&amp;</code> <b>tous</b> les champs des deux types deviennent obligatoires.',
    ],
    takeaways: [
      '<code>A &amp; B</code> = un type qui a tout de A ET de B',
      '<code>|</code> = l’un OU l’autre ; <code>&amp;</code> = les deux à la fois',
      'l’intersection rend obligatoires les champs des deux types',
      'intersecter des types incompatibles donne <code>never</code>',
    ],
  }),
  template({
    id: 'TS-F-024-TEMPLATE',
    slug: 'intersection-types',
    title: 'Types intersection',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Combiner plusieurs types avec &.',
    lede: 'Combiner des types. Choisis le cas :',
    aliases: ['intersection', 'combiner types', 'et logique'],
    keywords: ['a et b'],
    relatedContentIds: [],
    lessonId: 'TS-F-024-LESSON',
    variants: [
      {
        id: 'combiner',
        label: 'Combiner deux types',
        codeBlocks: [
          {
            id: 'ts-inter-t-combine',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `interface Base {
  id: number;
}

interface AvecNom {
  nom: string;
}

type Complet = Base & AvecNom;

const x: Complet = { id: 1, nom: "Alice" };`,
          },
        ],
        replacements: [
          { token: 'Base / AvecNom', description: 'les types à fusionner' },
          { token: 'Complet', description: 'le type résultant, qui a tout des deux' },
        ],
        placement: 'Pour cumuler les propriétés de plusieurs types.',
      },
      {
        id: 'etendre',
        label: 'Étendre à la volée',
        codeBlocks: [
          {
            id: 'ts-inter-t-extend',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `interface User {
  nom: string;
}

// On ajoute un champ sans modifier User
type UserAdmin = User & { role: "admin" };

const a: UserAdmin = { nom: "Ana", role: "admin" };`,
          },
        ],
        replacements: [
          { token: 'User', description: 'le type de départ' },
          { token: '{ role: "admin" }', description: 'les propriétés ajoutées' },
        ],
        placement: 'Pour enrichir un type existant ponctuellement.',
      },
    ],
  }),
];
