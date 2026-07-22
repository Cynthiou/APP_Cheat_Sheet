import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const typescriptRestContent: ReadyContent[] = [
  // ————— Typer une variable —————
  lesson({
    id: 'TS-F-002-LESSON',
    slug: 'typer-une-variable',
    title: 'Typer une variable',
    shortTitle: 'Typer une variable',
    technology: 'typescript',
    tomeId: 't4',
    summary:
      'Annoter une variable avec un type pour verrouiller la forme de sa valeur.',
    utility: 'Dire à TypeScript quel genre de valeur une variable va contenir.',
    aliases: ['annotation', 'typer variable', 'type variable', 'annoter', 'ts variable'],
    keywords: ['string', 'number', 'boolean', 'annotation', 'inference', 'deux points'],
    relatedContentIds: [],
    templateId: 'TS-F-002-TEMPLATE',
    intro:
      'Pour <b>typer une variable</b>, on écrit <code>: type</code> juste après son nom. TypeScript refuse alors toute valeur qui ne correspond pas à ce type.',
    sections: [
      {
        id: 's1',
        title: 'La syntaxe deux-points',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>garantir qu’une variable reste un nombre</b> et que TypeScript m’avertisse si je lui mets du texte par erreur.',
          },
          {
            type: 'paragraph',
            html: 'On colle l’annotation <code>: type</code> après le nom, avant le <code>=</code>. Les types de base sont <code>string</code>, <code>number</code> et <code>boolean</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-var-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `// On annote apres le nom, avant le =
let age: number = 25;
let nom: string = "Alice";
let actif: boolean = true;

// Erreur detectee tout de suite :
// age = "vingt"; -> Type 'string' n'est pas assignable a 'number'`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Très souvent TypeScript <b>devine</b> le type (inférence) : <code>let age = 25</code> est déjà un <code>number</code>. Tu annotes surtout quand la valeur de départ ne suffit pas à deviner.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Inférence vs annotation explicite',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'ts-var-c2',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `// Infere : TypeScript comprend "number" tout seul
let score = 0;

// Explicite : utile quand la valeur arrive plus tard
let total: number;
total = 10;`,
            },
          },
          {
            type: 'table',
            headers: ['Type', 'Exemple de valeur'],
            rows: [
              ['string', '"Alice", "bonjour"'],
              ['number', '25, 3.14, -7'],
              ['boolean', 'true, false'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Confondre l’annotation <code>: number</code> (le type) et l’affectation <code>= 25</code> (la valeur).',
      'Sur-annoter : quand l’inférence suffit, une annotation en trop alourdit le code.',
    ],
    takeaways: [
      'syntaxe : <code>let nom: type = valeur</code> (deux-points avant le <code>=</code>)',
      'types de base : <code>string</code>, <code>number</code>, <code>boolean</code>',
      'l’inférence devine souvent le type : on n’annote pas partout',
    ],
  }),
  template({
    id: 'TS-F-002-TEMPLATE',
    slug: 'typer-une-variable',
    title: 'Typer une variable',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Annoter une variable avec un type de base.',
    lede: 'Typer une variable. Choisis le cas :',
    aliases: ['annotation', 'typer variable', 'type variable'],
    keywords: ['string number boolean', 'annoter'],
    relatedContentIds: [],
    lessonId: 'TS-F-002-LESSON',
    variants: [
      {
        id: 'base',
        label: 'Types de base',
        codeBlocks: [
          {
            id: 'ts-var-t-base',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `const nom: string = "valeur";
const total: number = 0;
const actif: boolean = false;`,
          },
        ],
        replacements: [
          { token: 'nom / total / actif', description: 'le nom de ta variable' },
          { token: 'string / number / boolean', description: 'le type qui décrit la valeur' },
        ],
        placement:
          'À la déclaration, avant le <code>=</code>. Quand tu veux verrouiller le type d’une valeur.',
      },
      {
        id: 'differee',
        label: 'Valeur différée',
        codeBlocks: [
          {
            id: 'ts-var-t-diff',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `let total: number;
// ... plus loin dans le code
total = 42;`,
          },
        ],
        replacements: [
          { token: 'total', description: 'le nom de ta variable' },
          { token: 'number', description: 'le type attendu' },
        ],
        placement:
          'Quand tu déclares d’abord et affectes plus tard : l’annotation est ici obligatoire (rien à inférer).',
      },
      {
        id: 'inference',
        label: 'Inférence (sans annoter)',
        codeBlocks: [
          {
            id: 'ts-var-t-inf',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `// Pas d'annotation : TypeScript devine
let score = 0;      // number
let label = "ok";   // string
let ouvert = true;  // boolean`,
          },
        ],
        replacements: [
          { token: 'score / label / ouvert', description: 'tes variables' },
        ],
        placement:
          'Quand la valeur de départ suffit à deviner le type : plus court, tout aussi sûr.',
      },
    ],
  }),

  // ————— Les types objet —————
  lesson({
    id: 'TS-F-003-LESSON',
    slug: 'types-objet',
    title: 'Les types objet',
    shortTitle: 'Types objet',
    technology: 'typescript',
    tomeId: 't4',
    summary:
      'Décrire la forme d’un objet : quelles propriétés il a et de quel type chacune.',
    utility: 'Garantir qu’un objet a bien les bonnes propriétés, du bon type.',
    aliases: ['objet', 'type objet', 'forme objet', 'proprietes', 'shape'],
    keywords: ['accolades', 'propriete', 'point virgule', 'forme', 'structure objet'],
    relatedContentIds: ['TS-F-006-LESSON', 'TS-F-007-LESSON'],
    templateId: 'TS-F-003-TEMPLATE',
    intro:
      'Un <b>type objet</b> décrit sa forme entre accolades : chaque <b>propriété</b> reçoit son propre type. TypeScript vérifie ensuite que l’objet respecte cette forme.',
    sections: [
      {
        id: 's1',
        title: 'Décrire la forme entre accolades',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>être sûr qu’un objet « utilisateur » contient bien un nom (texte) et un âge (nombre)</b>, sans propriété manquante.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-obj-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `// La forme est decrite entre accolades
const user: { nom: string; age: number } = {
  nom: "Alice",
  age: 30,
};

// Erreur si une propriete manque ou a le mauvais type :
// const mauvais: { nom: string; age: number } = { nom: "Bob" };
// -> La propriete 'age' est manquante`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Dans un type, on sépare les propriétés par un <code>;</code> (point-virgule). Dans la valeur, on les sépare par une <code>,</code> (virgule).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Objet imbriqué',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une propriété peut elle-même être un objet : on décrit sa forme à l’intérieur.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-obj-c2',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `const produit: {
  nom: string;
  prix: number;
  stock: { quantite: number; enRupture: boolean };
} = {
  nom: "Clavier",
  prix: 49,
  stock: { quantite: 12, enRupture: false },
};`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Écrire le type d’objet à la main partout : dès qu’il est réutilisé, préfère une <b>interface</b> ou un <code>type</code>.',
      'Oublier une propriété obligatoire : TypeScript refuse l’objet tant qu’elle manque.',
    ],
    takeaways: [
      'un type objet décrit sa forme entre accolades : <code>{ nom: string; age: number }</code>',
      'dans le type on sépare par <code>;</code>, dans la valeur par <code>,</code>',
      'chaque propriété a son propre type (imbrication possible)',
    ],
  }),
  template({
    id: 'TS-F-003-TEMPLATE',
    slug: 'types-objet',
    title: 'Type objet',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Décrire la forme d’un objet.',
    lede: 'Typer un objet. Choisis le cas :',
    aliases: ['objet', 'type objet', 'forme'],
    keywords: ['proprietes', 'accolades'],
    relatedContentIds: ['TS-F-007-TEMPLATE'],
    lessonId: 'TS-F-003-LESSON',
    variants: [
      {
        id: 'inline',
        label: 'En ligne',
        codeBlocks: [
          {
            id: 'ts-obj-t-inline',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `const user: { nom: string; age: number } = {
  nom: "Alice",
  age: 30,
};`,
          },
        ],
        replacements: [
          { token: 'user', description: 'le nom de ta variable' },
          { token: 'nom: string; age: number', description: 'les propriétés et leurs types' },
        ],
        placement:
          'Quand l’objet est utilisé une seule fois : la forme est décrite directement sur place.',
      },
      {
        id: 'alias',
        label: 'Via un type',
        codeBlocks: [
          {
            id: 'ts-obj-t-alias',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `type User = {
  nom: string;
  age: number;
};

const user: User = { nom: "Alice", age: 30 };`,
          },
        ],
        replacements: [
          { token: 'User', description: 'le nom de ton type' },
          { token: 'nom / age', description: 'les propriétés' },
        ],
        placement:
          'Quand la forme est réutilisée : on la nomme une fois et on réutilise le nom.',
      },
      {
        id: 'imbrique',
        label: 'Imbriqué',
        codeBlocks: [
          {
            id: 'ts-obj-t-nested',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `type Produit = {
  nom: string;
  stock: { quantite: number; enRupture: boolean };
};`,
          },
        ],
        replacements: [
          { token: 'stock', description: 'la propriété qui est elle-même un objet' },
          { token: 'quantite / enRupture', description: 'les propriétés internes' },
        ],
        placement:
          'Quand une propriété contient un sous-objet : on décrit sa forme à l’intérieur.',
      },
    ],
  }),

  // ————— Les tableaux : Type[] —————
  lesson({
    id: 'TS-F-004-LESSON',
    slug: 'tableaux-type',
    title: 'Les tableaux : Type[]',
    shortTitle: 'Tableaux Type[]',
    technology: 'typescript',
    tomeId: 't4',
    summary:
      'Typer un tableau en précisant le type de ses éléments avec la notation Type[].',
    utility: 'Garantir que tous les éléments d’un tableau sont du même type.',
    aliases: ['tableau', 'array', 'liste', 'crochets', 'type tableau'],
    keywords: ['string[]', 'number[]', 'array', 'crochets', 'elements', 'liste typee'],
    relatedContentIds: ['TS-F-003-LESSON'],
    templateId: 'TS-F-004-TEMPLATE',
    intro:
      'Un tableau se type avec le <b>type de ses éléments suivi de</b> <code>[]</code>. <code>string[]</code> = « un tableau de chaînes ». Tous les éléments doivent respecter ce type.',
    sections: [
      {
        id: 's1',
        title: 'La notation crochets',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>une liste où chaque élément est forcément un nombre</b>, pour être averti si un texte s’y glisse.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-arr-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `// Type des elements + []
const noms: string[] = ["Ana", "Bob"];
const ages: number[] = [20, 30];
const actifs: boolean[] = [true, false];

// Erreur : un texte dans un tableau de nombres
// const scores: number[] = [1, "deux"];
// -> Type 'string' n'est pas assignable a 'number'`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Deux écritures équivalentes : <code>string[]</code> (la plus courante) et <code>Array&lt;string&gt;</code>. On préfère <code>string[]</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Tableau d’objets',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le type des éléments peut être un objet : on décrit la forme, puis on ajoute <code>[]</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-arr-c2',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `type User = { nom: string; age: number };

// Un tableau d'objets User
const users: User[] = [
  { nom: "Ana", age: 20 },
  { nom: "Bob", age: 30 },
];`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier les <code>[]</code> : <code>string</code> décrit une seule chaîne, pas un tableau.',
      'Mélanger des types dans un tableau simple : préfère une <b>union</b> (<code>(string | number)[]</code>) si c’est voulu.',
    ],
    takeaways: [
      'un tableau de X se note <code>X[]</code> : <code>string[]</code>, <code>number[]</code>…',
      'tous les éléments doivent respecter le type des éléments',
      'tableau d’objets : <code>User[]</code>',
    ],
  }),
  template({
    id: 'TS-F-004-TEMPLATE',
    slug: 'tableaux-type',
    title: 'Tableaux Type[]',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Typer un tableau avec la notation Type[].',
    lede: 'Typer un tableau. Choisis le cas :',
    aliases: ['tableau', 'array', 'liste'],
    keywords: ['string[] number[]', 'crochets'],
    relatedContentIds: [],
    lessonId: 'TS-F-004-LESSON',
    variants: [
      {
        id: 'primitifs',
        label: 'De primitifs',
        codeBlocks: [
          {
            id: 'ts-arr-t-prim',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `const noms: string[] = ["Ana", "Bob"];
const ages: number[] = [20, 30];`,
          },
        ],
        replacements: [
          { token: 'noms / ages', description: 'le nom de ta liste' },
          { token: 'string[] / number[]', description: 'le type des éléments + []' },
        ],
        placement:
          'Quand tous les éléments sont du même type simple (texte, nombre…).',
      },
      {
        id: 'objets',
        label: 'D’objets',
        codeBlocks: [
          {
            id: 'ts-arr-t-obj',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `type User = { nom: string; age: number };

const users: User[] = [
  { nom: "Ana", age: 20 },
];`,
          },
        ],
        replacements: [
          { token: 'User', description: 'le type de chaque élément' },
          { token: 'users', description: 'le nom de ta liste' },
        ],
        placement:
          'Quand chaque élément est un objet : on type d’abord l’élément, puis on ajoute [].',
      },
      {
        id: 'vide',
        label: 'Vide (à remplir)',
        codeBlocks: [
          {
            id: 'ts-arr-t-vide',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `// Un tableau vide au depart : le type est obligatoire
const items: string[] = [];
items.push("premier");`,
          },
        ],
        replacements: [
          { token: 'items', description: 'le nom de ta liste' },
          { token: 'string[]', description: 'le type des éléments futurs' },
        ],
        placement:
          'Quand le tableau part vide : sans annotation TypeScript le type any[] (perte de sécurité).',
      },
    ],
  }),

  // ————— Les types union —————
  lesson({
    id: 'TS-F-005-LESSON',
    slug: 'types-union',
    title: 'Les types union',
    shortTitle: 'Types union',
    technology: 'typescript',
    tomeId: 't4',
    summary:
      'Autoriser une valeur à être de plusieurs types (ou plusieurs valeurs précises) grâce au symbole |.',
    utility: 'Dire qu’une valeur peut être l’un OU l’autre parmi plusieurs choix.',
    aliases: ['union', 'ou', 'pipe', 'literal', 'plusieurs types'],
    keywords: ['barre verticale', 'l un ou l autre', 'literal', 'statut', 'valeurs autorisees'],
    relatedContentIds: ['TS-F-010-LESSON'],
    templateId: 'TS-F-005-TEMPLATE',
    intro:
      'Une <b>union</b> combine plusieurs types avec le symbole <code>|</code> : la valeur peut être <b>l’un OU l’autre</b>. On peut aussi lister des <b>valeurs précises</b> (types littéraux).',
    sections: [
      {
        id: 's1',
        title: 'Le symbole | = « ou »',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>une variable « identifiant » qui accepte aussi bien un nombre qu’un texte</b>, mais rien d’autre.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-union-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `// L'un OU l'autre
let id: string | number = 42;
id = "abc"; // ok aussi

// Valeurs precises (types litteraux)
let statut: "actif" | "inactif" | "en attente" = "actif";

// Erreur : une valeur hors de la liste
// statut = "supprime"; -> non assignable`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Une union de <b>valeurs littérales</b> (<code>"actif" | "inactif"</code>) est parfaite pour un statut : seules ces chaînes exactes sont permises.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Restreindre avant d’utiliser (narrowing)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Quand une valeur peut être de deux types, on teste souvent son type avant de l’utiliser, pour rester en sécurité.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-union-c2',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `function afficher(id: string | number) {
  if (typeof id === "string") {
    // ici, TypeScript sait que id est une string
    return id.toUpperCase();
  }
  // ici, id est un number
  return id.toFixed(0);
}`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Appeler une méthode propre à un seul type sans tester d’abord (<code>id.toUpperCase()</code> alors que <code>id</code> peut être un nombre).',
      'Oublier une valeur dans une union littérale : la valeur oubliée sera refusée.',
    ],
    takeaways: [
      'union : <code>string | number</code> = l’un OU l’autre',
      'littéraux : <code>"actif" | "inactif"</code> = seulement ces valeurs',
      'tester le type (<code>typeof</code>) avant d’utiliser une méthode spécifique',
    ],
  }),
  template({
    id: 'TS-F-005-TEMPLATE',
    slug: 'types-union',
    title: 'Types union',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Autoriser plusieurs types avec |.',
    lede: 'Une valeur, plusieurs possibilités. Choisis le cas :',
    aliases: ['union', 'ou', 'pipe'],
    keywords: ['literal', 'statut'],
    relatedContentIds: [],
    lessonId: 'TS-F-005-LESSON',
    variants: [
      {
        id: 'types',
        label: 'Plusieurs types',
        codeBlocks: [
          {
            id: 'ts-union-t-types',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `let id: string | number = 42;`,
          },
        ],
        replacements: [
          { token: 'id', description: 'le nom de ta variable' },
          { token: 'string | number', description: 'les types autorisés, séparés par |' },
        ],
        placement:
          'Quand une valeur peut réellement avoir deux formes (ex. un id texte ou numérique).',
      },
      {
        id: 'litteraux',
        label: 'Valeurs précises',
        codeBlocks: [
          {
            id: 'ts-union-t-lit',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `let statut: "actif" | "inactif" | "en attente" = "actif";`,
          },
        ],
        replacements: [
          { token: 'statut', description: 'le nom de ta variable' },
          { token: '"actif" | "inactif" | "en attente"', description: 'les valeurs exactes autorisées' },
        ],
        placement:
          'Pour un statut ou un mode : seule une des chaînes listées est acceptée.',
      },
      {
        id: 'narrowing',
        label: 'Tester avant d’utiliser',
        codeBlocks: [
          {
            id: 'ts-union-t-narrow',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `function afficher(valeur: string | number) {
  if (typeof valeur === "string") {
    return valeur.toUpperCase();
  }
  return valeur.toFixed(0);
}`,
          },
        ],
        replacements: [
          { token: 'valeur', description: 'le paramètre de type union' },
          { token: 'string | number', description: 'les types possibles' },
        ],
        placement:
          'Quand tu dois utiliser une valeur union : teste son type avant d’appeler une méthode spécifique.',
      },
    ],
  }),

  // ————— Les propriétés optionnelles —————
  lesson({
    id: 'TS-F-006-LESSON',
    slug: 'proprietes-optionnelles',
    title: 'Les propriétés optionnelles',
    shortTitle: 'Optionnelles ?',
    technology: 'typescript',
    tomeId: 't4',
    summary:
      'Rendre une propriété facultative avec le point d’interrogation : elle peut être présente ou absente.',
    utility: 'Autoriser une donnée à manquer sans provoquer d’erreur.',
    aliases: ['optionnel', 'facultatif', 'point interrogation', 'propriete optionnelle', 'undefined'],
    keywords: ['point interrogation', 'facultatif', 'peut manquer', 'undefined', 'optionnel'],
    relatedContentIds: ['TS-F-003-LESSON', 'TS-F-007-LESSON'],
    templateId: 'TS-F-006-TEMPLATE',
    intro:
      'Un <code>?</code> après le nom d’une propriété la rend <b>optionnelle</b> : l’objet reste valide qu’elle soit présente ou non. Sa valeur peut alors être <code>undefined</code>.',
    sections: [
      {
        id: 's1',
        title: 'Le point d’interrogation',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>un objet « produit » où le prix promo n’existe pas toujours</b>, sans que TypeScript exige cette propriété à chaque fois.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-opt-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `type Produit = {
  nom: string;
  prix: number;
  prixPromo?: number; // optionnel : peut manquer
};

// Les deux sont valides :
const a: Produit = { nom: "Clavier", prix: 49 };
const b: Produit = { nom: "Souris", prix: 19, prixPromo: 12 };`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Une propriété optionnelle vaut <code>undefined</code> quand elle est absente. Le <code>?</code> se place <b>avant</b> les deux-points : <code>prixPromo?: number</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Se protéger avant de lire',
        blocks: [
          {
            type: 'paragraph',
            html: 'Comme une propriété optionnelle peut être absente, on vérifie sa présence, ou on utilise <code>?.</code> et <code>??</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-opt-c2',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `function prixFinal(p: Produit) {
  // ?? donne une valeur de secours si prixPromo est absent
  return p.prixPromo ?? p.prix;
}

// Acces securise a une propriete d'un objet peut-etre absent :
// user.adresse?.ville`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Lire une propriété optionnelle sans vérifier : elle peut valoir <code>undefined</code>.',
      'Placer le <code>?</code> au mauvais endroit : c’est <code>nom?: type</code>, pas <code>nom: ?type</code>.',
    ],
    takeaways: [
      '<code>?</code> après le nom = propriété optionnelle (peut manquer)',
      'absente → sa valeur est <code>undefined</code>',
      'se protéger avec <code>?.</code> (accès) et <code>??</code> (valeur de secours)',
    ],
  }),
  template({
    id: 'TS-F-006-TEMPLATE',
    slug: 'proprietes-optionnelles',
    title: 'Propriétés optionnelles',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Rendre une propriété facultative avec ?.',
    lede: 'Une propriété facultative. Choisis le cas :',
    aliases: ['optionnel', 'facultatif', 'point interrogation'],
    keywords: ['undefined', 'peut manquer'],
    relatedContentIds: ['TS-F-003-TEMPLATE'],
    lessonId: 'TS-F-006-LESSON',
    variants: [
      {
        id: 'declarer',
        label: 'Déclarer optionnelle',
        codeBlocks: [
          {
            id: 'ts-opt-t-decl',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `type Produit = {
  nom: string;
  prixPromo?: number; // optionnel
};`,
          },
        ],
        replacements: [
          { token: 'prixPromo', description: 'la propriété facultative' },
          { token: 'number', description: 'son type quand elle est présente' },
        ],
        placement:
          'Dans le type/l’interface : ajoute <code>?</code> avant les deux-points de la propriété facultative.',
      },
      {
        id: 'secours',
        label: 'Valeur de secours (??)',
        codeBlocks: [
          {
            id: 'ts-opt-t-nullish',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `// Utilise prixPromo s'il existe, sinon prix
const affiche = produit.prixPromo ?? produit.prix;`,
          },
        ],
        replacements: [
          { token: 'produit.prixPromo', description: 'la propriété optionnelle' },
          { token: 'produit.prix', description: 'la valeur de secours si elle est absente' },
        ],
        placement:
          'Quand tu lis une propriété qui peut manquer et veux une valeur par défaut.',
      },
      {
        id: 'chainage',
        label: 'Accès sécurisé (?.)',
        codeBlocks: [
          {
            id: 'ts-opt-t-chain',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `// Ne plante pas si adresse est absente
const ville = user.adresse?.ville;`,
          },
        ],
        replacements: [
          { token: 'user.adresse', description: 'l’objet peut-être absent' },
          { token: 'ville', description: 'la propriété à lire dedans' },
        ],
        placement:
          'Pour lire une propriété au fond d’un objet dont un maillon peut être absent.',
      },
    ],
  }),

  // ————— Les interfaces —————
  lesson({
    id: 'TS-F-007-LESSON',
    slug: 'interfaces',
    title: 'Les interfaces',
    shortTitle: 'Interfaces',
    technology: 'typescript',
    tomeId: 't4',
    summary:
      'Nommer la forme d’un objet une fois avec interface, puis la réutiliser partout.',
    utility: 'Donner un nom réutilisable à la forme d’un objet.',
    aliases: ['interface', 'contrat', 'forme nommee', 'extends', 'type objet nomme'],
    keywords: ['interface', 'reutiliser', 'contrat', 'extends', 'forme nommee'],
    relatedContentIds: ['TS-F-003-LESSON', 'TS-F-006-LESSON'],
    templateId: 'TS-F-007-TEMPLATE',
    intro:
      'Une <b>interface</b> donne un nom à la forme d’un objet. On la déclare une fois, puis on l’utilise comme un type partout où cette forme apparaît.',
    sections: [
      {
        id: 's1',
        title: 'Nommer une forme, la réutiliser',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>décrire une seule fois la forme d’un utilisateur</b> et la réutiliser dans plusieurs fonctions sans tout réécrire.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-iface-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `interface User {
  nom: string;
  age: number;
  email?: string; // optionnel
}

const alice: User = { nom: "Alice", age: 30 };

function saluer(u: User) {
  return "Bonjour " + u.nom;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Le nom d’une interface commence par une <b>majuscule</b> (<code>User</code>, <code>Produit</code>). Pas de <code>=</code> après le nom, contrairement à <code>type</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'interface ou type ?',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour décrire un objet, <code>interface</code> et <code>type</code> font quasi la même chose. On peut étendre une interface avec <code>extends</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-iface-c2',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `interface Personne {
  nom: string;
}

// Admin herite de tout Personne, et ajoute role
interface Admin extends Personne {
  role: string;
}

const chef: Admin = { nom: "Ana", role: "super" };`,
            },
          },
          {
            type: 'table',
            headers: ['', 'interface', 'type'],
            rows: [
              ['Objets', 'oui', 'oui'],
              ['Union / littéraux', 'non', 'oui'],
              ['Héritage', 'extends', '&'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre un <code>=</code> après le nom d’une interface : c’est <code>interface User { ... }</code>, sans <code>=</code>.',
      'Vouloir une union avec une interface : impossible, utilise plutôt <code>type</code>.',
    ],
    takeaways: [
      '<code>interface Nom { ... }</code> nomme la forme d’un objet',
      'nom en majuscule, pas de <code>=</code>',
      '<code>extends</code> pour hériter d’une autre interface',
      'objet → <code>interface</code> ou <code>type</code> ; union → <code>type</code>',
    ],
  }),
  template({
    id: 'TS-F-007-TEMPLATE',
    slug: 'interfaces',
    title: 'Interfaces',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Nommer la forme d’un objet avec interface.',
    lede: 'Nommer une forme réutilisable. Choisis le cas :',
    aliases: ['interface', 'extends', 'type'],
    keywords: ['forme nommee', 'contrat'],
    relatedContentIds: ['TS-F-003-TEMPLATE'],
    lessonId: 'TS-F-007-LESSON',
    variants: [
      {
        id: 'base',
        label: 'interface',
        codeBlocks: [
          {
            id: 'ts-iface-t-base',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `interface User {
  nom: string;
  age: number;
}

const alice: User = { nom: "Alice", age: 30 };`,
          },
        ],
        replacements: [
          { token: 'User', description: 'le nom de ton interface (majuscule)' },
          { token: 'nom / age', description: 'les propriétés et leurs types' },
        ],
        placement:
          'La forme la plus courante pour décrire un objet réutilisé.',
      },
      {
        id: 'extends',
        label: 'Héritage (extends)',
        codeBlocks: [
          {
            id: 'ts-iface-t-extends',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `interface Personne {
  nom: string;
}

interface Admin extends Personne {
  role: string;
}`,
          },
        ],
        replacements: [
          { token: 'Personne', description: 'l’interface de base' },
          { token: 'Admin', description: 'l’interface qui hérite + ajoute' },
        ],
        placement:
          'Quand une forme reprend une autre en ajoutant des propriétés.',
      },
      {
        id: 'type',
        label: 'Équivalent type',
        codeBlocks: [
          {
            id: 'ts-iface-t-type',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `type User = {
  nom: string;
  age: number;
};`,
          },
        ],
        replacements: [
          { token: 'User', description: 'le nom de ton type' },
          { token: 'nom / age', description: 'les propriétés' },
        ],
        placement:
          'Quand ton équipe préfère <code>type</code>, ou pour une union (impossible avec interface).',
      },
    ],
  }),

  // ————— Typer une fonction —————
  lesson({
    id: 'TS-F-008-LESSON',
    slug: 'typer-une-fonction',
    title: 'Typer une fonction',
    shortTitle: 'Typer une fonction',
    technology: 'typescript',
    tomeId: 't4',
    summary:
      'Annoter le type des paramètres et de la valeur de retour d’une fonction.',
    utility: 'Garantir qu’une fonction reçoit et renvoie les bons types.',
    aliases: ['fonction typee', 'parametres types', 'retour', 'void', 'typer fonction'],
    keywords: ['parametre type', 'valeur de retour', 'void', 'flechee typee', 'signature'],
    relatedContentIds: ['JS-F-005-LESSON'],
    templateId: 'TS-F-008-TEMPLATE',
    intro:
      'On type une fonction en annotant ses <b>paramètres</b> et sa <b>valeur de retour</b>. Le retour se place après la parenthèse : <code>(x: number): string</code>.',
    sections: [
      {
        id: 's1',
        title: 'Paramètres et retour',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>une fonction qui n’accepte que des nombres et renvoie forcément un nombre</b>, pour éviter les additions de texte par erreur.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-fn-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `// (parametres types): type de retour
function additionner(a: number, b: number): number {
  return a + b;
}

// Version flechee, meme principe
const doubler = (x: number): number => x * 2;

// Erreur : un texte au lieu d'un nombre
// additionner(2, "3"); -> non assignable`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Souvent, le type de retour est <b>inféré</b> : on peut l’omettre. On l’écrit surtout pour se forcer à respecter un contrat précis.',
          },
        ],
      },
      {
        id: 's2',
        title: 'void : ne renvoie rien',
        blocks: [
          {
            type: 'paragraph',
            html: 'Quand une fonction ne renvoie rien (elle agit seulement), son type de retour est <code>void</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-fn-c2',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `// Ne retourne rien -> void
function logger(message: string): void {
  console.log(message);
}

// En React, un callback sans retour :
// onClick: () => void`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Placer le type de retour au mauvais endroit : il vient <b>après</b> la parenthèse fermante, avant le corps.',
      'Confondre <code>void</code> (ne renvoie rien) et <code>undefined</code> comme valeur explicite.',
    ],
    takeaways: [
      'paramètres : <code>(a: number, b: number)</code>',
      'retour après la parenthèse : <code>): number</code>',
      '<code>void</code> = ne renvoie rien',
      'le retour est souvent inféré : annoter reste optionnel',
    ],
  }),
  template({
    id: 'TS-F-008-TEMPLATE',
    slug: 'typer-une-fonction',
    title: 'Typer une fonction',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Annoter paramètres et retour d’une fonction.',
    lede: 'Typer une fonction. Choisis l’écriture :',
    aliases: ['fonction typee', 'void', 'retour'],
    keywords: ['parametres', 'signature'],
    relatedContentIds: [],
    lessonId: 'TS-F-008-LESSON',
    variants: [
      {
        id: 'flechee',
        label: 'Fléchée',
        codeBlocks: [
          {
            id: 'ts-fn-t-arrow',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `const additionner = (a: number, b: number): number => {
  return a + b;
};`,
          },
        ],
        replacements: [
          { token: 'additionner', description: 'le nom de ta fonction' },
          { token: 'a: number, b: number', description: 'les paramètres typés' },
          { token: ': number', description: 'le type de retour' },
        ],
        placement:
          'La plus courante en React. Le type de retour peut être omis (inféré).',
      },
      {
        id: 'declaration',
        label: 'Déclaration',
        codeBlocks: [
          {
            id: 'ts-fn-t-decl',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `function additionner(a: number, b: number): number {
  return a + b;
}`,
          },
        ],
        replacements: [
          { token: 'additionner', description: 'le nom de ta fonction' },
          { token: 'a: number, b: number', description: 'les paramètres typés' },
        ],
        placement:
          'Écriture classique avec <code>function</code>, utilisable avant sa définition (hoisting).',
      },
      {
        id: 'void',
        label: 'Sans retour (void)',
        codeBlocks: [
          {
            id: 'ts-fn-t-void',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `function logger(message: string): void {
  console.log(message);
}`,
          },
        ],
        replacements: [
          { token: 'logger', description: 'le nom de ta fonction' },
          { token: 'message: string', description: 'le paramètre typé' },
        ],
        placement:
          'Quand la fonction agit sans rien renvoyer (log, setState, callback…).',
      },
    ],
  }),

  // ————— L’assertion as —————
  lesson({
    id: 'TS-F-010-LESSON',
    slug: 'assertion-as',
    title: 'L’assertion as',
    shortTitle: 'Assertion as',
    technology: 'typescript',
    tomeId: 't4',
    summary:
      'Forcer TypeScript à considérer une valeur comme un type précis, quand toi seul connais sa vraie forme.',
    utility: 'Dire à TypeScript « fais-moi confiance, c’est ce type » quand il ne peut pas deviner.',
    aliases: ['as', 'assertion', 'cast', 'transtypage', 'forcer type'],
    keywords: ['as', 'cast', 'forcer type', 'assertion', 'dom', 'json'],
    relatedContentIds: ['TS-F-005-LESSON'],
    templateId: 'TS-F-010-TEMPLATE',
    intro:
      'L’<b>assertion</b> <code>as</code> dit à TypeScript de traiter une valeur comme un type précis. C’est utile quand tu en sais <b>plus que lui</b> — mais il ne vérifie rien, à utiliser avec prudence.',
    sections: [
      {
        id: 's1',
        title: 'Forcer un type avec as',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>récupérer un champ du DOM en tant qu’input</b>, alors que TypeScript ne connaît que le type générique « élément HTML ».',
          },
          {
            type: 'code',
            block: {
              id: 'ts-as-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `// TypeScript renvoie un HTMLElement generique.
// Moi je SAIS que c'est un input :
const champ = document.getElementById("email") as HTMLInputElement;
champ.value = "test@mail.com"; // .value dispo grace a l'assertion

// Donnee JSON dont on connait la forme :
const data = reponse as { nom: string; age: number };`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<code>as</code> ne <b>convertit rien</b> à l’exécution : il change seulement ce que TypeScript croit. Si tu te trompes, l’erreur surgira au runtime.',
          },
        ],
      },
      {
        id: 's2',
        title: 'À utiliser avec parcimonie',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une annotation ou un test de type sont plus sûrs. Réserve <code>as</code> aux cas où TypeScript ne peut vraiment pas deviner (DOM, JSON externe…).',
          },
          {
            type: 'code',
            block: {
              id: 'ts-as-c2',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `// Prudence : as ne verifie pas la realite
const valeur = "123" as unknown as number; // dangereux

// Prefere, quand c'est possible :
const n = Number("123"); // vraie conversion`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      '<code>as</code> ne convertit pas la valeur : il ment à TypeScript. Une assertion fausse plante à l’exécution.',
      'L’utiliser pour faire taire une erreur au lieu de comprendre le vrai type.',
    ],
    takeaways: [
      '<code>valeur as Type</code> force TypeScript à voir un type précis',
      'aucune vérification à l’exécution : à utiliser avec prudence',
      'cas typiques : éléments du DOM, données JSON dont tu connais la forme',
    ],
  }),
  template({
    id: 'TS-F-010-TEMPLATE',
    slug: 'assertion-as',
    title: 'Assertion as',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Forcer un type avec as.',
    lede: 'Forcer un type. Choisis le cas :',
    aliases: ['as', 'assertion', 'cast'],
    keywords: ['forcer type', 'dom'],
    relatedContentIds: [],
    lessonId: 'TS-F-010-LESSON',
    variants: [
      {
        id: 'base',
        label: 'Sur une valeur',
        codeBlocks: [
          {
            id: 'ts-as-t-base',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `const data = reponse as { nom: string; age: number };`,
          },
        ],
        replacements: [
          { token: 'reponse', description: 'la valeur dont TypeScript ignore la forme' },
          { token: '{ nom: string; age: number }', description: 'le type que tu affirmes' },
        ],
        placement:
          'Quand tu connais la forme d’une donnée (JSON, API) que TypeScript voit comme inconnue.',
      },
      {
        id: 'dom',
        label: 'Élément du DOM',
        codeBlocks: [
          {
            id: 'ts-as-t-dom',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `const champ = document.getElementById("email") as HTMLInputElement;
champ.value = "test@mail.com";`,
          },
        ],
        replacements: [
          { token: '"email"', description: 'l’id de l’élément' },
          { token: 'HTMLInputElement', description: 'le type précis de l’élément' },
        ],
        placement:
          'Pour accéder à des propriétés spécifiques (ex. .value d’un input) que le type générique n’expose pas.',
      },
      {
        id: 'const',
        label: 'as const',
        codeBlocks: [
          {
            id: 'ts-as-t-const',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `// Fige les valeurs en litteraux exacts
const roles = ["admin", "user"] as const;
// type : readonly ["admin", "user"]`,
          },
        ],
        replacements: [
          { token: 'roles', description: 'le tableau/objet à figer' },
        ],
        placement:
          'Quand tu veux des valeurs littérales exactes et en lecture seule (utile pour des unions).',
      },
    ],
  }),

  // ————— Les génériques : introduction —————
  lesson({
    id: 'TS-F-011-LESSON',
    slug: 'generiques',
    title: 'Les génériques : introduction',
    shortTitle: 'Génériques',
    technology: 'typescript',
    tomeId: 't4',
    summary:
      'Écrire du code réutilisable qui s’adapte au type qu’on lui passe, grâce à un paramètre de type.',
    utility: 'Réutiliser une fonction ou un type avec n’importe quel type, sans perdre la vérification.',
    aliases: ['generique', 'generics', 'parametre de type', 'chevrons', 'T'],
    keywords: ['generique', 'parametre de type', 'chevrons', 'reutilisable', 'T', 'useState type'],
    relatedContentIds: ['TS-F-004-LESSON'],
    templateId: 'TS-F-011-TEMPLATE',
    intro:
      'Un <b>générique</b> est un <b>paramètre de type</b> (souvent <code>T</code>) placé entre chevrons <code>&lt;&gt;</code>. Il rend un code réutilisable avec n’importe quel type, tout en gardant la vérification.',
    sections: [
      {
        id: 's1',
        title: 'Un type en paramètre',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>une fonction qui renvoie exactement ce qu’on lui donne</b> — un nombre si je passe un nombre, une chaîne si je passe une chaîne — sans écrire deux versions.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-gen-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `// T est un type variable, choisi a l'appel
function premier<T>(liste: T[]): T {
  return liste[0];
}

const n = premier([1, 2, 3]);       // T = number -> n est number
const s = premier(["a", "b"]);      // T = string -> s est string`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Par convention, on nomme le paramètre de type <code>T</code> (pour « Type »). Pour plusieurs, on continue : <code>T</code>, <code>U</code>, <code>K</code>…',
          },
        ],
      },
      {
        id: 's2',
        title: 'Tu en utilises déjà',
        blocks: [
          {
            type: 'paragraph',
            html: 'Beaucoup d’outils sont génériques. <code>useState</code> en React, ou <code>Array</code>, prennent un type entre chevrons.',
          },
          {
            type: 'code',
            block: {
              id: 'ts-gen-c2',
              filename: 'exemple.tsx',
              language: 'tsx',
              code: `import { useState } from "react";

// On precise le type stocke entre chevrons :
const [items, setItems] = useState<string[]>([]);
const [user, setUser] = useState<User | null>(null);`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Sens'],
            rows: [
              ['&lt;T&gt;', 'un paramètre de type nommé T'],
              ['useState&lt;string&gt;', 'un state de type string'],
              ['Array&lt;number&gt;', 'équivalent de number[]'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Confondre le paramètre de type (<code>&lt;T&gt;</code>, à la définition) et le type concret (<code>&lt;string&gt;</code>, à l’usage).',
      'Vouloir tout rendre générique : réserve-le au code réellement réutilisable avec plusieurs types.',
    ],
    takeaways: [
      'un générique = un paramètre de type entre chevrons <code>&lt;T&gt;</code>',
      'le type réel est choisi à l’appel (souvent deviné)',
      'déjà partout : <code>useState&lt;T&gt;</code>, <code>Array&lt;T&gt;</code>',
      'convention : <code>T</code>, puis <code>U</code>, <code>K</code>…',
    ],
  }),
  template({
    id: 'TS-F-011-TEMPLATE',
    slug: 'generiques',
    title: 'Génériques',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Introduire un paramètre de type générique.',
    lede: 'Rendre un code générique. Choisis le cas :',
    aliases: ['generique', 'generics', 'T'],
    keywords: ['parametre de type', 'chevrons'],
    relatedContentIds: [],
    lessonId: 'TS-F-011-LESSON',
    variants: [
      {
        id: 'fonction',
        label: 'Fonction générique',
        codeBlocks: [
          {
            id: 'ts-gen-t-fn',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `function premier<T>(liste: T[]): T {
  return liste[0];
}

const n = premier([1, 2, 3]); // T = number`,
          },
        ],
        replacements: [
          { token: 'premier', description: 'le nom de ta fonction' },
          { token: 'T', description: 'le paramètre de type (choisi à l’appel)' },
        ],
        placement:
          'Quand une fonction doit marcher avec plusieurs types en gardant le lien entrée/sortie.',
      },
      {
        id: 'usestate',
        label: 'useState<T>',
        codeBlocks: [
          {
            id: 'ts-gen-t-usestate',
            filename: 'exemple.tsx',
            language: 'tsx',
            code: `const [items, setItems] = useState<string[]>([]);
const [user, setUser] = useState<User | null>(null);`,
          },
        ],
        replacements: [
          { token: 'string[] / User | null', description: 'le type stocké dans le state' },
        ],
        placement:
          'En React, pour préciser le type d’un state que la valeur de départ ne suffit pas à deviner.',
      },
      {
        id: 'type',
        label: 'Type générique',
        codeBlocks: [
          {
            id: 'ts-gen-t-type',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `// Une reponse d'API qui enveloppe n'importe quelle donnee
type Reponse<T> = {
  data: T;
  ok: boolean;
};

const r: Reponse<User> = { data: alice, ok: true };`,
          },
        ],
        replacements: [
          { token: 'Reponse', description: 'le nom de ton type générique' },
          { token: 'T', description: 'le type enveloppé (choisi à l’usage)' },
        ],
        placement:
          'Quand une structure (enveloppe, conteneur) doit s’adapter au type qu’elle contient.',
      },
    ],
  }),
];
