import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const javascriptContent: ReadyContent[] = [
  // ————— Variables : let et const —————
  lesson({
    id: 'JS-F-001-LESSON',
    slug: 'variables-let-const',
    title: 'Les variables : let et const',
    shortTitle: 'let / const',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Stocker une valeur : const pour ce qui ne change pas, let pour ce qui change.',
    utility: 'Donner un nom à une valeur pour la réutiliser.',
    aliases: ['variable', 'let', 'const', 'declaration', 'var'],
    keywords: ['stocker une valeur', 'reassigner', 'constante', 'portee'],
    relatedContentIds: ['JS-F-005-LESSON', 'TS-F-001-LESSON'],
    templateId: 'JS-F-001-TEMPLATE',
    intro:
      'Une <b>variable</b> donne un nom à une valeur. En JavaScript moderne, on utilise <b>const</b> par défaut, et <b>let</b> seulement quand la valeur doit changer.',
    sections: [
      {
        id: 's1',
        title: 'const par défaut, let si ça change',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>const</code> = la valeur ne sera pas réassignée. <code>let</code> = tu comptes la changer plus tard. On évite <code>var</code> (règles de portée piégeuses).',
          },
          {
            type: 'code',
            block: {
              id: 'js-var-c1',
              filename: 'script.js',
              language: 'javascript',
              code: `const nom = "Alice";   // ne change pas
let compteur = 0;      // va changer
compteur = compteur + 1;

// const empeche la reassignation :
// nom = "Bob"; ->  TypeError`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle simple :</b> commence toujours par <code>const</code>. Passe à <code>let</code> uniquement si tu obtiens une erreur de réassignation.',
          },
        ],
      },
    ],
    pitfalls: [
      '<code>const</code> n’interdit pas de modifier un objet/tableau, seulement de le <b>réassigner</b>. <code>const t = []; t.push(1)</code> est permis.',
      'Oublier <code>const</code>/<code>let</code> crée une variable globale implicite. Déclare toujours.',
    ],
    takeaways: [
      '<code>const</code> par défaut · <code>let</code> si la valeur change · éviter <code>var</code>',
      '<code>const</code> bloque la réassignation, pas la mutation d’un objet',
    ],
  }),
  template({
    id: 'JS-F-001-TEMPLATE',
    slug: 'variables-let-const',
    title: 'let / const',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Déclarer une variable en JavaScript.',
    lede: 'Déclarer une valeur. Choisis le cas :',
    aliases: ['variable', 'let', 'const'],
    keywords: ['declarer', 'constante'],
    relatedContentIds: [],
    lessonId: 'JS-F-001-LESSON',
    variants: [
      {
        id: 'const',
        label: 'const (fixe)',
        codeBlocks: [
          {
            id: 'js-var-t-const',
            filename: 'script.js',
            language: 'javascript',
            code: `const nom = "valeur";`,
          },
        ],
        replacements: [
          { token: 'nom', description: 'le nom de ta variable' },
          { token: '"valeur"', description: 'la valeur (texte, nombre, objet…)' },
        ],
        placement: 'À privilégier par défaut, avant utilisation.',
      },
      {
        id: 'let',
        label: 'let (change)',
        codeBlocks: [
          {
            id: 'js-var-t-let',
            filename: 'script.js',
            language: 'javascript',
            code: `let compteur = 0;
compteur = compteur + 1;`,
          },
        ],
        replacements: [
          { token: 'compteur', description: 'le nom de ta variable modifiable' },
          { token: '0', description: 'la valeur de départ' },
        ],
        placement: 'Quand la valeur doit être réassignée ensuite.',
      },
      {
        id: 'objet',
        label: 'Objet / tableau',
        codeBlocks: [
          {
            id: 'js-var-t-obj',
            filename: 'script.js',
            language: 'javascript',
            code: `const user = { nom: "Alice", age: 30 };
const liste = [1, 2, 3];

// const : on peut MODIFIER le contenu…
liste.push(4);
// …mais pas RÉASSIGNER : liste = [] -> erreur`,
          },
        ],
        replacements: [
          { token: 'user / liste', description: 'tes données' },
        ],
        placement: 'const convient : on modifie l’intérieur sans réassigner la variable.',
      },
    ],
  }),

  // ————— Les fonctions —————
  lesson({
    id: 'JS-F-005-LESSON',
    slug: 'fonctions',
    title: 'Les fonctions',
    shortTitle: 'Fonctions',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Regrouper des instructions réutilisables qui prennent des entrées et renvoient un résultat.',
    utility: 'Réutiliser un bloc de code avec des valeurs différentes.',
    aliases: ['function', 'fonction', 'arrow', 'flechee', 'callback', 'parametre'],
    keywords: ['reutiliser du code', 'return', 'argument', 'parametre'],
    relatedContentIds: ['JS-F-009-LESSON'],
    templateId: 'JS-F-005-TEMPLATE',
    intro:
      'Une <b>fonction</b> emballe des instructions sous un nom. On lui passe des <b>paramètres</b> et elle peut <b>renvoyer</b> (<code>return</code>) un résultat.',
    sections: [
      {
        id: 's1',
        title: 'Déclaration et fonction fléchée',
        blocks: [
          {
            type: 'paragraph',
            html: 'Deux écritures courantes. La <b>fonction fléchée</b> (<code>=&gt;</code>) est la plus utilisée en React.',
          },
          {
            type: 'code',
            block: {
              id: 'js-fn-c1',
              filename: 'script.js',
              language: 'javascript',
              code: `// Declaration classique
function additionner(a, b) {
  return a + b;
}

// Fonction flechee (equivalent)
const additionner2 = (a, b) => a + b;

additionner(2, 3);  // 5`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une machine à café. Les <b>paramètres</b> = les ingrédients que tu mets. Le <code>return</code> = la tasse qui sort.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>return</code> : la fonction renvoie <code>undefined</code>.',
      'Confondre <b>définir</b> une fonction et l’<b>appeler</b> : <code>maFonction</code> vs <code>maFonction()</code>.',
    ],
    takeaways: [
      'fonction = entrées (paramètres) → sortie (<code>return</code>)',
      'fléchée : <code>const f = (x) =&gt; x * 2</code>',
    ],
  }),
  template({
    id: 'JS-F-005-TEMPLATE',
    slug: 'fonctions',
    title: 'Fonction',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Créer une fonction en JavaScript.',
    lede: 'Une fonction réutilisable. Choisis l’écriture :',
    aliases: ['function', 'fonction', 'flechee'],
    keywords: ['creer fonction'],
    relatedContentIds: [],
    lessonId: 'JS-F-005-LESSON',
    variants: [
      {
        id: 'flechee',
        label: 'Fléchée',
        codeBlocks: [
          {
            id: 'js-fn-t-arrow',
            filename: 'script.js',
            language: 'javascript',
            code: `const nomFonction = (param1, param2) => {
  return param1 + param2;
};`,
          },
        ],
        replacements: [
          { token: 'nomFonction', description: 'le nom de ta fonction' },
          { token: 'param1, param2', description: 'les paramètres attendus' },
        ],
        placement: 'La plus courante en React. Appelle avec nomFonction(a, b).',
      },
      {
        id: 'courte',
        label: 'Fléchée courte',
        codeBlocks: [
          {
            id: 'js-fn-t-short',
            filename: 'script.js',
            language: 'javascript',
            code: `const doubler = (x) => x * 2;`,
          },
        ],
        replacements: [
          { token: 'doubler', description: 'le nom de ta fonction' },
          { token: 'x * 2', description: 'la valeur renvoyée (return implicite)' },
        ],
        placement: 'Quand le corps tient sur une ligne : le return est implicite (pas d’accolades).',
      },
      {
        id: 'declaration',
        label: 'Déclaration',
        codeBlocks: [
          {
            id: 'js-fn-t-decl',
            filename: 'script.js',
            language: 'javascript',
            code: `function nomFonction(param1, param2) {
  return param1 + param2;
}`,
          },
        ],
        replacements: [
          { token: 'nomFonction', description: 'le nom de ta fonction' },
          { token: 'param1, param2', description: 'les paramètres attendus' },
        ],
        placement: 'Utilisable même avant sa ligne de définition (hoisting).',
      },
      {
        id: 'defaut',
        label: 'Param. par défaut',
        codeBlocks: [
          {
            id: 'js-fn-t-def',
            filename: 'script.js',
            language: 'javascript',
            code: `const saluer = (nom = "toi") => {
  return "Bonjour " + nom;
};

saluer();        // "Bonjour toi"
saluer("Alice"); // "Bonjour Alice"`,
          },
        ],
        replacements: [
          { token: 'nom = "toi"', description: 'la valeur utilisée si l’argument est absent' },
        ],
        placement: 'Quand un paramètre est optionnel.',
      },
    ],
  }),

  // ————— map() —————
  lesson({
    id: 'JS-F-009-LESSON',
    slug: 'map',
    title: 'map()',
    shortTitle: 'map()',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Transformer chaque élément d’un tableau et obtenir un nouveau tableau de même longueur.',
    utility: 'Transformer une liste en une autre liste.',
    aliases: ['map', 'transformer', 'iterer', 'liste'],
    keywords: ['parcourir tableau', 'transformer liste', 'afficher une liste', 'render liste'],
    relatedContentIds: ['REACT-F-007-LESSON', 'JS-F-010-LESSON'],
    templateId: 'JS-F-009-TEMPLATE',
    intro:
      '<code>.map()</code> prend un tableau, applique une fonction à <b>chaque élément</b>, et renvoie un <b>nouveau tableau</b> (même longueur). L’original n’est pas modifié.',
    sections: [
      {
        id: 's1',
        title: 'Transformer chaque élément',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'js-map-c1',
              filename: 'script.js',
              language: 'javascript',
              code: `const prix = [10, 20, 30];

const avecTva = prix.map((p) => p * 1.2);
// [12, 24, 36]

const noms = ["ana", "bob"];
const majuscules = noms.map((n) => n.toUpperCase());
// ["ANA", "BOB"]`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>En React :</b> <code>map</code> sert à afficher une liste. Chaque élément rendu a besoin d’une <code>key</code> unique.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier de <code>return</code> dans un <code>map</code> avec accolades → tableau de <code>undefined</code>.',
      'Utiliser <code>map</code> juste pour parcourir (sans réutiliser le résultat) : préfère <code>forEach</code>.',
    ],
    takeaways: [
      '<code>map</code> → <b>nouveau</b> tableau, même longueur',
      'en React : <code>{items.map((it) =&gt; &lt;li key={it.id}&gt;{it.nom}&lt;/li&gt;)}</code>',
    ],
  }),
  template({
    id: 'JS-F-009-TEMPLATE',
    slug: 'map',
    title: 'map()',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Transformer un tableau avec map.',
    lede: 'Transformer chaque élément. Choisis le cas :',
    aliases: ['map', 'transformer'],
    keywords: ['nouveau tableau'],
    relatedContentIds: ['REACT-F-007-TEMPLATE'],
    lessonId: 'JS-F-009-LESSON',
    variants: [
      {
        id: 'transformer',
        label: 'Transformer',
        codeBlocks: [
          {
            id: 'js-map-t-base',
            filename: 'script.js',
            language: 'javascript',
            code: `const resultat = tableau.map((element) => {
  return element * 2; // transforme ici
});`,
          },
        ],
        replacements: [
          { token: 'tableau', description: 'ta liste de départ' },
          { token: 'element * 2', description: 'la transformation à appliquer' },
        ],
        placement: 'Quand tu veux une liste transformée (calcul).',
      },
      {
        id: 'objets',
        label: 'Extraire une propriété',
        codeBlocks: [
          {
            id: 'js-map-t-obj',
            filename: 'script.js',
            language: 'javascript',
            code: `const users = [{ id: 1, nom: "Ana" }, { id: 2, nom: "Bob" }];

const noms = users.map((u) => u.nom);
// ["Ana", "Bob"]`,
          },
        ],
        replacements: [
          { token: 'users', description: 'ta liste d’objets' },
          { token: 'u.nom', description: 'la propriété à extraire' },
        ],
        placement: 'Pour récupérer un champ de chaque objet.',
      },
      {
        id: 'jsx',
        label: 'Vers du JSX (React)',
        codeBlocks: [
          {
            id: 'js-map-t-jsx',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `{items.map((item) => (
  <li key={item.id}>{item.nom}</li>
))}`,
          },
        ],
        replacements: [
          { token: 'items', description: 'ta liste' },
          { token: 'item.id', description: 'un identifiant unique (key)' },
          { token: 'item.nom', description: 'ce que tu affiches' },
        ],
        placement: 'Dans le return d’un composant, pour afficher une liste.',
      },
    ],
  }),

  // ————— filter() —————
  lesson({
    id: 'JS-F-010-LESSON',
    slug: 'filter',
    title: 'filter()',
    shortTitle: 'filter()',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Garder seulement les éléments d’un tableau qui passent un test. Renvoie un nouveau tableau.',
    utility: 'Filtrer une liste selon une condition.',
    aliases: ['filter', 'filtrer', 'condition', 'garder'],
    keywords: ['filtrer une liste', 'recherche', 'sous-ensemble'],
    relatedContentIds: ['JS-F-009-LESSON', 'GUIDE-G-017'],
    templateId: 'JS-F-010-TEMPLATE',
    intro:
      '<code>.filter()</code> garde uniquement les éléments pour lesquels la condition renvoie <b>true</b>, et renvoie un <b>nouveau tableau</b> (souvent plus court).',
    sections: [
      {
        id: 's1',
        title: 'Garder ce qui passe le test',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'js-filter-c1',
              filename: 'script.js',
              language: 'javascript',
              code: `const nombres = [1, 2, 3, 4, 5];

const pairs = nombres.filter((n) => n % 2 === 0);
// [2, 4]

const users = [{ actif: true }, { actif: false }];
const actifs = users.filter((u) => u.actif);
// [{ actif: true }]`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un tamis. <code>filter</code> laisse passer ce qui correspond, retient le reste. <code>find</code> ne garde que <b>le premier</b> qui passe.',
          },
        ],
      },
    ],
    takeaways: [
      '<code>filter</code> → nouveau tableau des éléments qui passent le test',
      'la fonction doit renvoyer un booléen (<code>true</code>/<code>false</code>)',
    ],
  }),
  template({
    id: 'JS-F-010-TEMPLATE',
    slug: 'filter',
    title: 'filter()',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Filtrer un tableau avec filter.',
    lede: 'Garder ce qui passe un test. Choisis le cas :',
    aliases: ['filter', 'filtrer'],
    keywords: ['condition'],
    relatedContentIds: [],
    lessonId: 'JS-F-010-LESSON',
    variants: [
      {
        id: 'nombre',
        label: 'Sur un nombre',
        codeBlocks: [
          {
            id: 'js-filter-t-num',
            filename: 'script.js',
            language: 'javascript',
            code: `const grands = nombres.filter((n) => n >= 18);`,
          },
        ],
        replacements: [
          { token: 'nombres', description: 'ta liste' },
          { token: 'n >= 18', description: 'ta condition' },
        ],
        placement: 'Condition numérique simple.',
      },
      {
        id: 'propriete',
        label: 'Sur une propriété',
        codeBlocks: [
          {
            id: 'js-filter-t-prop',
            filename: 'script.js',
            language: 'javascript',
            code: `const actifs = users.filter((u) => u.actif === true);`,
          },
        ],
        replacements: [
          { token: 'users', description: 'ta liste d’objets' },
          { token: 'u.actif === true', description: 'la condition sur une propriété' },
        ],
        placement: 'Pour garder les objets qui remplissent un critère.',
      },
      {
        id: 'recherche',
        label: 'Recherche texte',
        codeBlocks: [
          {
            id: 'js-filter-t-search',
            filename: 'script.js',
            language: 'javascript',
            code: `const resultats = items.filter((i) =>
  i.nom.toLowerCase().includes(q.toLowerCase())
);`,
          },
        ],
        replacements: [
          { token: 'items', description: 'ta liste' },
          { token: 'i.nom', description: 'le champ où chercher' },
          { token: 'q', description: 'le texte tapé par l’utilisateur' },
        ],
        placement: 'Base d’une barre de recherche : insensible à la casse.',
      },
    ],
  }),

  // ————— fetch —————
  lesson({
    id: 'JS-F-019-LESSON',
    slug: 'fetch',
    title: 'fetch',
    shortTitle: 'fetch',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Récupérer des données depuis une URL (API) et les transformer en objet JavaScript.',
    utility: 'Appeler une API pour récupérer des données.',
    aliases: ['fetch', 'api', 'requete', 'http', 'get', 'json'],
    keywords: ['recuperer des donnees', 'appeler une api', 'json', 'reponse'],
    relatedContentIds: ['JS-F-018-LESSON', 'REACT-F-041-LESSON'],
    templateId: 'JS-F-019-TEMPLATE',
    intro:
      '<code>fetch(url)</code> lance une requête réseau et renvoie une <b>Promesse</b>. On attend la réponse avec <code>await</code>, puis on lit le JSON avec <code>.json()</code>.',
    sections: [
      {
        id: 's1',
        title: 'Récupérer du JSON',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'js-fetch-c1',
              filename: 'api.js',
              language: 'javascript',
              code: `async function chargerUsers() {
  const reponse = await fetch("https://exemple.api/users");
  if (!reponse.ok) throw new Error("Erreur " + reponse.status);
  const data = await reponse.json();
  return data;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Toujours</b> vérifier <code>reponse.ok</code> : <code>fetch</code> ne rejette pas sur une erreur 404/500, il faut la tester soi-même.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le second <code>await</code> sur <code>.json()</code> : tu obtiens une Promesse, pas les données.',
      'Croire que <code>fetch</code> échoue sur un 500 : non, vérifie <code>reponse.ok</code>.',
    ],
    takeaways: [
      '<code>const r = await fetch(url)</code> puis <code>const data = await r.json()</code>',
      'vérifier <code>r.ok</code> · envelopper dans <code>try/catch</code>',
    ],
  }),
  template({
    id: 'JS-F-019-TEMPLATE',
    slug: 'fetch',
    title: 'fetch',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Récupérer des données d’une API avec fetch.',
    lede: 'Appeler une API. Choisis la façon :',
    aliases: ['fetch', 'api', 'get', 'post', 'axios'],
    keywords: ['requete'],
    relatedContentIds: ['REACT-F-041-TEMPLATE'],
    lessonId: 'JS-F-019-LESSON',
    variants: [
      {
        id: 'get-async',
        label: 'GET (async/await)',
        codeBlocks: [
          {
            id: 'js-fetch-t-async',
            filename: 'api.js',
            language: 'javascript',
            code: `async function charger() {
  const reponse = await fetch("URL_DE_L_API");
  if (!reponse.ok) throw new Error("Erreur " + reponse.status);
  return await reponse.json();
}`,
          },
        ],
        replacements: [
          { token: 'URL_DE_L_API', description: 'l’adresse de l’API' },
        ],
        placement: 'La façon moderne recommandée. Appelle dans un try/catch.',
      },
      {
        id: 'get-then',
        label: 'GET (.then)',
        codeBlocks: [
          {
            id: 'js-fetch-t-then',
            filename: 'api.js',
            language: 'javascript',
            code: `fetch("URL_DE_L_API")
  .then((r) => r.json())
  .then((data) => console.log(data))
  .catch((e) => console.error(e));`,
          },
        ],
        replacements: [{ token: 'URL_DE_L_API', description: 'l’adresse de l’API' }],
        placement: 'Sans async/await, avec des chaînes .then(). Même résultat.',
      },
      {
        id: 'post',
        label: 'POST (envoyer)',
        codeBlocks: [
          {
            id: 'js-fetch-t-post',
            filename: 'api.js',
            language: 'javascript',
            code: `const reponse = await fetch("URL_DE_L_API", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nom: "Alice" }),
});
const data = await reponse.json();`,
          },
        ],
        replacements: [
          { token: 'URL_DE_L_API', description: 'l’adresse de l’API' },
          { token: '{ nom: "Alice" }', description: 'les données à envoyer' },
        ],
        placement: 'Pour créer/envoyer : method POST + body en JSON.',
      },
      {
        id: 'axios',
        label: 'Avec Axios',
        codeBlocks: [
          {
            id: 'js-fetch-t-axios',
            filename: 'api.js',
            language: 'javascript',
            code: `import axios from "axios";

const reponse = await axios.get("URL_DE_L_API");
const data = reponse.data; // axios parse le JSON tout seul`,
          },
        ],
        replacements: [{ token: 'URL_DE_L_API', description: 'l’adresse de l’API' }],
        placement: 'Alternative à fetch (à installer : npm i axios). Plus court.',
      },
    ],
  }),

  // ————— async / await —————
  lesson({
    id: 'JS-F-018-LESSON',
    slug: 'async-await',
    title: 'async et await',
    shortTitle: 'async / await',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Écrire du code asynchrone lisible : attendre une Promesse comme si le code était synchrone.',
    utility: 'Attendre un résultat asynchrone sans imbriquer de .then().',
    aliases: ['async', 'await', 'asynchrone', 'promesse', 'attendre'],
    keywords: ['attendre une promesse', 'code asynchrone', 'then'],
    relatedContentIds: ['JS-F-019-LESSON', 'JS-F-020-LESSON'],
    templateId: 'JS-F-018-TEMPLATE',
    intro:
      'Une fonction <code>async</code> peut utiliser <code>await</code> pour <b>attendre</b> une Promesse. Le code se lit de haut en bas, sans chaîne de <code>.then()</code>.',
    sections: [
      {
        id: 's1',
        title: 'await met en pause la fonction',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'js-async-c1',
              filename: 'script.js',
              language: 'javascript',
              code: `async function main() {
  console.log("avant");
  const data = await chargerUsers(); // attend le resultat
  console.log("apres", data);
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<code>await</code> ne s’utilise qu’<b>à l’intérieur</b> d’une fonction <code>async</code>.',
          },
        ],
      },
    ],
    takeaways: [
      '<code>async</code> devant la fonction · <code>await</code> devant la Promesse',
      'toujours gérer l’erreur avec <code>try/catch</code>',
    ],
  }),
  template({
    id: 'JS-F-018-TEMPLATE',
    slug: 'async-await',
    title: 'async / await',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Structure async/await avec gestion d’erreur.',
    lede: 'Attendre une ou plusieurs Promesses. Choisis le cas :',
    aliases: ['async', 'await'],
    keywords: ['asynchrone', 'parallele', 'promise all'],
    relatedContentIds: ['JS-F-020-TEMPLATE'],
    lessonId: 'JS-F-018-LESSON',
    variants: [
      {
        id: 'base',
        label: 'Avec try/catch',
        codeBlocks: [
          {
            id: 'js-async-t-base',
            filename: 'script.js',
            language: 'javascript',
            code: `async function maFonction() {
  try {
    const resultat = await quelqueChoseAsync();
    return resultat;
  } catch (erreur) {
    console.error(erreur);
  }
}`,
          },
        ],
        replacements: [
          { token: 'maFonction', description: 'le nom de ta fonction' },
          { token: 'quelqueChoseAsync()', description: 'l’appel asynchrone (ex. fetch)' },
        ],
        placement: 'Le cas standard : on attend et on gère l’erreur.',
      },
      {
        id: 'sequence',
        label: 'En séquence',
        codeBlocks: [
          {
            id: 'js-async-t-seq',
            filename: 'script.js',
            language: 'javascript',
            code: `const user = await getUser(id);
const posts = await getPosts(user.id); // attend le user d'abord`,
          },
        ],
        replacements: [
          { token: 'getUser / getPosts', description: 'tes appels asynchrones' },
        ],
        placement: 'Quand le 2ᵉ appel a besoin du résultat du 1ᵉʳ.',
      },
      {
        id: 'parallele',
        label: 'En parallèle',
        codeBlocks: [
          {
            id: 'js-async-t-par',
            filename: 'script.js',
            language: 'javascript',
            code: `const [users, produits] = await Promise.all([
  getUsers(),
  getProduits(),
]); // les deux en même temps`,
          },
        ],
        replacements: [
          { token: 'getUsers / getProduits', description: 'tes appels indépendants' },
        ],
        placement: 'Quand les appels sont indépendants : plus rapide (en parallèle).',
      },
    ],
  }),

  // ————— try / catch —————
  lesson({
    id: 'JS-F-020-LESSON',
    slug: 'try-catch',
    title: 'try et catch : gérer les erreurs',
    shortTitle: 'try / catch',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Exécuter du code qui peut échouer et rattraper l’erreur au lieu de planter.',
    utility: 'Empêcher un plantage et réagir proprement à une erreur.',
    aliases: ['try', 'catch', 'erreur', 'exception', 'error handling', 'gerer erreur'],
    keywords: ['gerer une erreur', 'rattraper', 'plantage', 'finally'],
    relatedContentIds: ['JS-F-018-LESSON', 'REACT-F-041-LESSON'],
    templateId: 'JS-F-020-TEMPLATE',
    intro:
      'Le bloc <code>try</code> contient le code risqué ; si une erreur survient, on saute dans <code>catch</code> avec l’erreur, au lieu de tout arrêter.',
    sections: [
      {
        id: 's1',
        title: 'Rattraper une erreur',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'js-try-c1',
              filename: 'script.js',
              language: 'javascript',
              code: `try {
  const data = await chargerUsers();
  afficher(data);
} catch (erreur) {
  console.error("Echec du chargement", erreur);
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un filet de sécurité. <code>try</code> = le trapéziste ; <code>catch</code> = le filet qui rattrape en cas de chute.',
          },
        ],
      },
    ],
    takeaways: [
      '<code>try { risqué } catch (e) { on réagit }</code>',
      'idéal autour d’un <code>await fetch(...)</code>',
    ],
  }),
  template({
    id: 'JS-F-020-TEMPLATE',
    slug: 'try-catch',
    title: 'try / catch',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Structure try/catch pour gérer une erreur.',
    lede: 'Rattraper une erreur. Choisis le cas :',
    aliases: ['try', 'catch', 'erreur', 'finally'],
    keywords: ['exception'],
    relatedContentIds: [],
    lessonId: 'JS-F-020-LESSON',
    variants: [
      {
        id: 'simple',
        label: 'Simple',
        codeBlocks: [
          {
            id: 'js-try-t-simple',
            filename: 'script.js',
            language: 'javascript',
            code: `try {
  // code qui peut echouer
} catch (erreur) {
  console.error(erreur);
}`,
          },
        ],
        replacements: [
          { token: 'code qui peut echouer', description: 'l’opération risquée' },
        ],
        placement: 'Le cas de base.',
      },
      {
        id: 'finally',
        label: 'Avec finally',
        codeBlocks: [
          {
            id: 'js-try-t-finally',
            filename: 'script.js',
            language: 'javascript',
            code: `try {
  // code risque
} catch (erreur) {
  console.error(erreur);
} finally {
  setChargement(false); // s'exécute TOUJOURS
}`,
          },
        ],
        replacements: [
          { token: 'setChargement(false)', description: 'ce qui doit se faire dans tous les cas' },
        ],
        placement: '<code>finally</code> s’exécute succès ou erreur — parfait pour couper un loader.',
      },
      {
        id: 'await',
        label: 'Autour d’un await',
        codeBlocks: [
          {
            id: 'js-try-t-await',
            filename: 'script.js',
            language: 'javascript',
            code: `try {
  const r = await fetch(url);
  if (!r.ok) throw new Error("Erreur " + r.status);
  const data = await r.json();
} catch (erreur) {
  setErreur(erreur.message);
}`,
          },
        ],
        replacements: [
          { token: 'url', description: 'l’adresse de l’API' },
          { token: 'setErreur(...)', description: 'ta réaction à l’erreur' },
        ],
        placement: 'Le cas le plus fréquent : sécuriser un appel réseau.',
      },
    ],
  }),
];
