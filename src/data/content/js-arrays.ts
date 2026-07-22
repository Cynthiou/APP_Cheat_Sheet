import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const jsArraysContent: ReadyContent[] = [
  // ————— Les tableaux : arrays —————
  lesson({
    id: 'JS-F-1120-LESSON',
    slug: 'les-tableaux-arrays',
    title: 'Les tableaux : arrays',
    shortTitle: 'Arrays',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Stocker une liste ordonnée de valeurs dans une seule variable, y accéder par leur position, et la faire grandir ou rétrécir.',
    utility: 'Ranger plusieurs valeurs dans une seule variable et les manipuler comme une liste.',
    aliases: ['array', 'tableau', 'liste', 'index', 'push', 'length', 'crochets'],
    keywords: [
      'liste de valeurs',
      'stocker plusieurs elements',
      'acceder par index',
      'ajouter un element',
      'longueur du tableau',
      'parcourir une liste',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1120-TEMPLATE',
    intro:
      'Un <b>tableau</b> (array) est une liste <b>ordonnée</b> de valeurs, rangées entre <b>crochets</b> <code>[ ]</code>. Chaque valeur a une <b>position</b> (un index) qui commence à <b>0</b>. C’est la structure de base pour manipuler une collection : une liste de courses, des utilisateurs, des messages…',
    sections: [
      {
        id: 's1',
        title: 'Créer un tableau et lire une valeur',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>stocker ma liste de courses</b> dans une seule variable et pouvoir récupérer le premier article.',
          },
          {
            type: 'paragraph',
            html: 'On déclare le tableau avec des <b>crochets</b>. On lit ensuite un élément par son <b>index</b>, entre crochets aussi. Attention : le premier élément est à l’index <code>0</code>, pas <code>1</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1120-l-c1',
              filename: 'courses.js',
              language: 'javascript',
              code: `// Un tableau de chaines de caracteres
const courses = ["pain", "lait", "oeufs"];

// On lit par index (le premier est a 0)
console.log(courses[0]); // "pain"
console.log(courses[2]); // "oeufs"

// Le nombre d'elements = .length
console.log(courses.length); // 3

// Le dernier element = length - 1
console.log(courses[courses.length - 1]); // "oeufs"`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un tableau, c’est une rangée de casiers numérotés. Le premier casier porte le numéro <b>0</b>. Pour prendre un objet, tu donnes le numéro du casier, pas le nom de l’objet.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Ajouter et retirer des éléments',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les méthodes qui <b>modifient</b> le tableau : <code>push</code> (ajoute à la fin), <code>pop</code> (retire le dernier), <code>unshift</code> (ajoute au début), <code>shift</code> (retire le premier).',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1120-l-c2',
              filename: 'panier.js',
              language: 'javascript',
              code: `const panier = ["pomme"];

// Ajouter a la fin
panier.push("banane");   // ["pomme", "banane"]

// Ajouter au debut
panier.unshift("kiwi");  // ["kiwi", "pomme", "banane"]

// Retirer le dernier (et le recuperer)
const dernier = panier.pop(); // dernier = "banane"

// Retirer le premier
panier.shift(); // enleve "kiwi"

console.log(panier); // ["pomme"]`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Bon à savoir :</b> <code>push</code> et <code>pop</code> travaillent à la <b>fin</b> du tableau — ce sont les plus rapides et les plus courants. Retiens ce duo en priorité.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Parcourir un tableau',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour agir sur <b>chaque</b> élément, on parcourt le tableau. La façon moderne et lisible : <code>for...of</code> (ou <code>forEach</code>, vu plus loin).',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1120-l-c3',
              filename: 'affichage.js',
              language: 'javascript',
              code: `const notes = [12, 15, 8, 18];

// for...of : on recupere directement chaque valeur
for (const note of notes) {
  console.log("Note :", note);
}

// Si tu as besoin de l'index en plus, .entries()
for (const [index, note] of notes.entries()) {
  console.log("Position", index, "->", note);
}`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Les méthodes à connaître',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un tableau vient avec beaucoup de méthodes prêtes à l’emploi. Les plus utiles au quotidien, classées par usage :',
          },
          {
            type: 'table',
            headers: ['Méthode', 'Ce qu’elle fait', 'Renvoie'],
            rows: [
              ['<code>push / pop</code>', 'ajoute / retire à la fin', 'la nouvelle longueur / l’élément'],
              ['<code>map</code>', 'transforme chaque élément', 'un <b>nouveau</b> tableau'],
              ['<code>filter</code>', 'garde ceux qui passent un test', 'un <b>nouveau</b> tableau'],
              ['<code>find</code>', 'trouve le premier qui passe un test', '<b>un seul</b> élément'],
              ['<code>includes</code>', 'vérifie une présence', '<code>true</code> / <code>false</code>'],
              ['<code>join</code>', 'colle tout en une chaîne', 'une chaîne'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>map</code> = repeindre chaque voiture d’un parking (autant de voitures, couleur changée). <code>filter</code> = ne garder que les voitures rouges (moins de voitures, inchangées).',
          },
        ],
      },
    ],
    pitfalls: [
      'Compter les index à partir de <b>1</b> : le premier élément est à <code>0</code>, le dernier à <code>length - 1</code>.',
      'Confondre <code>map</code> (renvoie un nouveau tableau) et <code>forEach</code> (ne renvoie rien) : si tu veux récupérer un résultat, c’est <code>map</code>.',
      'Modifier un tableau avec <code>push</code> alors que tu voulais une copie : en React notamment, crée une <b>nouvelle</b> référence avec <code>[...tab, x]</code>.',
      'Lire un index qui n’existe pas (<code>tab[99]</code>) : ça ne plante pas, ça renvoie <code>undefined</code>.',
    ],
    takeaways: [
      'un tableau = liste ordonnée entre <code>[ ]</code> · index à partir de <b>0</b>',
      'nombre d’éléments = <code>tab.length</code> · dernier = <code>tab[tab.length - 1]</code>',
      'ajouter/retirer à la fin = <code>push</code> / <code>pop</code> (les plus courants)',
      'parcourir = <code>for...of</code> · transformer = <code>map</code> · filtrer = <code>filter</code>',
    ],
  }),
  template({
    id: 'JS-F-1120-TEMPLATE',
    slug: 'les-tableaux-arrays',
    title: 'Les tableaux',
    shortTitle: 'Arrays',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code des tableaux prêt à copier : créer, ajouter/retirer, parcourir.',
    lede: 'Manipuler une liste. Choisis l’opération :',
    aliases: ['array', 'tableau', 'push', 'length'],
    keywords: ['liste', 'ajouter', 'parcourir', 'index'],
    relatedContentIds: [],
    lessonId: 'JS-F-1120-LESSON',
    variants: [
      {
        id: 'creer',
        label: 'Créer + lire',
        codeBlocks: [
          {
            id: 'JS-F-1120-t-creer',
            filename: 'tableau.js',
            language: 'javascript',
            code: `const fruits = ["pomme", "banane", "kiwi"];

const premier = fruits[0];              // "pomme"
const dernier = fruits[fruits.length - 1]; // "kiwi"`,
          },
        ],
        replacements: [
          { token: 'fruits', description: 'le nom de ta liste' },
          { token: '"pomme", "banane", "kiwi"', description: 'les valeurs de départ' },
        ],
        placement: 'Le point de départ : déclare la liste, puis accède à un élément par son index (0 = premier).',
      },
      {
        id: 'modifier',
        label: 'Ajouter / retirer',
        codeBlocks: [
          {
            id: 'JS-F-1120-t-modifier',
            filename: 'tableau.js',
            language: 'javascript',
            code: `const liste = ["a", "b"];

liste.push("c");    // ajoute a la fin -> ["a", "b", "c"]
liste.pop();        // retire le dernier -> ["a", "b"]
liste.unshift("z"); // ajoute au debut -> ["z", "a", "b"]
liste.shift();      // retire le premier -> ["a", "b"]`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau à modifier' },
          { token: '"c"', description: 'l’élément à ajouter' },
        ],
        placement: 'Quand tu veux faire grandir ou rétrécir la liste sur place. push/pop sont les plus courants.',
      },
      {
        id: 'copie',
        label: 'Ajouter sans muter',
        codeBlocks: [
          {
            id: 'JS-F-1120-t-copie',
            filename: 'tableau.js',
            language: 'javascript',
            code: `const liste = ["a", "b"];

// Cree un NOUVEAU tableau (l'original reste intact)
const nouvelle = [...liste, "c"]; // ["a", "b", "c"]`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'le tableau d’origine (non modifié)' },
          { token: '"c"', description: 'l’élément à ajouter dans la copie' },
        ],
        placement: 'Le réflexe React : ne jamais muter, créer une nouvelle référence avec le spread [...liste, x].',
      },
    ],
  }),

  // ————— Les objets —————
  lesson({
    id: 'JS-F-1121-LESSON',
    slug: 'les-objets',
    title: 'Les objets',
    shortTitle: 'Objets',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Regrouper des données liées sous des noms parlants (clé : valeur) dans une seule variable, plutôt que des variables éparpillées.',
    utility: 'Rassembler les propriétés d’une même chose (un utilisateur, un produit) sous des noms clairs.',
    aliases: ['objet', 'object', 'cle valeur', 'propriete', 'accolades', 'point', 'clef'],
    keywords: [
      'regrouper des donnees',
      'cle valeur',
      'acceder a une propriete',
      'modifier une propriete',
      'notation point',
      'objet imbrique',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1121-TEMPLATE',
    intro:
      'Un <b>objet</b> regroupe des données sous forme de paires <b>clé : valeur</b>, entre <b>accolades</b> <code>{ }</code>. Là où un tableau range par position, l’objet range par <b>nom</b>. Idéal pour décrire une entité : un utilisateur a un <code>nom</code>, un <code>age</code>, un <code>email</code>…',
    sections: [
      {
        id: 's1',
        title: 'Créer un objet et lire ses propriétés',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>décrire un utilisateur</b> (son prénom, son âge, s’il est actif) dans une seule variable, sans créer trois variables séparées.',
          },
          {
            type: 'paragraph',
            html: 'On regroupe tout dans un objet. On lit ensuite une valeur avec la <b>notation point</b> : <code>objet.propriete</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1121-l-c1',
              filename: 'user.js',
              language: 'javascript',
              code: `// Un objet decrit une seule "chose"
const user = {
  prenom: "Alice",
  age: 30,
  actif: true,
};

// On lit avec un point
console.log(user.prenom); // "Alice"
console.log(user.age);    // 30

// Notation crochets : utile si la cle est dans une variable
const cle = "actif";
console.log(user[cle]); // true`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un objet, c’est une fiche d’identité. Chaque ligne a une <b>étiquette</b> (la clé) et une <b>valeur</b> en face. Tu retrouves une info par son étiquette, pas par sa position.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Ajouter et modifier une propriété',
        blocks: [
          {
            type: 'paragraph',
            html: 'On modifie ou on ajoute une propriété avec le <b>signe égal</b>. Si la clé existe, elle est remplacée ; sinon, elle est créée.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1121-l-c2',
              filename: 'user.js',
              language: 'javascript',
              code: `const user = { prenom: "Alice", age: 30 };

// Modifier une propriete existante
user.age = 31;

// Ajouter une nouvelle propriete
user.email = "alice@mail.com";

// Supprimer une propriete
delete user.age;

console.log(user); // { prenom: "Alice", email: "alice@mail.com" }`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>En React :</b> ne modifie pas l’objet directement. Crée une <b>copie</b> avec le spread et change la propriété voulue : <code>setUser({ ...user, age: 31 })</code>.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Objets imbriqués et tableaux d’objets',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une valeur peut elle-même être un objet ou un tableau. On enchaîne alors les points. Et un <b>tableau d’objets</b> est le format le plus courant des données d’une API.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1121-l-c3',
              filename: 'donnees.js',
              language: 'javascript',
              code: `const user = {
  prenom: "Alice",
  adresse: { ville: "Lyon", cp: "69000" },
};

// On enchaine les points pour descendre
console.log(user.adresse.ville); // "Lyon"

// Le format tres courant : un tableau d'objets
const users = [
  { id: 1, prenom: "Alice" },
  { id: 2, prenom: "Bob" },
];

console.log(users[0].prenom); // "Alice"`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Parcourir un objet',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour lister les clés, les valeurs ou les deux, on utilise les méthodes <code>Object.keys</code>, <code>Object.values</code> et <code>Object.entries</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1121-l-c4',
              filename: 'parcours.js',
              language: 'javascript',
              code: `const user = { prenom: "Alice", age: 30 };

Object.keys(user);   // ["prenom", "age"]
Object.values(user); // ["Alice", 30]

// entries : chaque paire [cle, valeur]
for (const [cle, valeur] of Object.entries(user)) {
  console.log(cle, "->", valeur);
}`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Renvoie', 'Exemple'],
            rows: [
              ['<code>Object.keys(o)</code>', 'les clés', '<code>["prenom", "age"]</code>'],
              ['<code>Object.values(o)</code>', 'les valeurs', '<code>["Alice", 30]</code>'],
              ['<code>Object.entries(o)</code>', 'les paires', '<code>[["prenom", "Alice"], …]</code>'],
              ['<code>"age" in o</code>', 'présence d’une clé', '<code>true</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier que l’ordre d’un objet n’est pas garanti comme celui d’un tableau : pour une liste ordonnée, utilise un <b>tableau</b>.',
      'Écrire <code>user["prenom"]</code> avec des guillemets vs <code>user[prenom]</code> sans : sans guillemets, JS cherche une <b>variable</b> nommée <code>prenom</code>.',
      'Muter un objet en place en React (<code>user.age = 31</code>) : React ne voit rien. Fais <code>{ ...user, age: 31 }</code>.',
      'Accéder à une propriété d’un objet absent (<code>user.adresse.ville</code> quand <code>adresse</code> n’existe pas) : ça plante. Vérifie avant, ou utilise <code>user.adresse?.ville</code>.',
    ],
    takeaways: [
      'objet = paires <b>clé : valeur</b> entre <code>{ }</code> · accès par <b>nom</b>',
      'lire = <code>user.prenom</code> · ajouter/modifier = <code>user.email = …</code>',
      'copie sans muter = <code>{ ...user, age: 31 }</code> (réflexe React)',
      'parcourir = <code>Object.keys / values / entries</code>',
    ],
  }),
  template({
    id: 'JS-F-1121-TEMPLATE',
    slug: 'les-objets',
    title: 'Les objets',
    shortTitle: 'Objets',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code des objets prêt à copier : créer, modifier, parcourir.',
    lede: 'Manipuler un objet. Choisis l’opération :',
    aliases: ['objet', 'object', 'propriete', 'cle valeur'],
    keywords: ['regrouper', 'point', 'accolades'],
    relatedContentIds: [],
    lessonId: 'JS-F-1121-LESSON',
    variants: [
      {
        id: 'creer',
        label: 'Créer + lire',
        codeBlocks: [
          {
            id: 'JS-F-1121-t-creer',
            filename: 'objet.js',
            language: 'javascript',
            code: `const user = {
  prenom: "Alice",
  age: 30,
};

const nom = user.prenom; // "Alice"`,
          },
        ],
        replacements: [
          { token: 'user', description: 'le nom de ton objet' },
          { token: 'prenom: "Alice"', description: 'les paires clé : valeur' },
        ],
        placement: 'Le cas de base : regroupe les infos d’une entité, puis lis-les avec un point.',
      },
      {
        id: 'modifier',
        label: 'Modifier (muter)',
        codeBlocks: [
          {
            id: 'JS-F-1121-t-modifier',
            filename: 'objet.js',
            language: 'javascript',
            code: `const user = { prenom: "Alice", age: 30 };

user.age = 31;               // modifie
user.email = "a@mail.com";   // ajoute
delete user.age;             // supprime`,
          },
        ],
        replacements: [
          { token: 'age', description: 'la propriété à modifier ou créer' },
          { token: '31', description: 'la nouvelle valeur' },
        ],
        placement: 'Pour changer un objet sur place (hors React). Le signe = ajoute la clé si elle n’existe pas.',
      },
      {
        id: 'copie',
        label: 'Copier sans muter',
        codeBlocks: [
          {
            id: 'JS-F-1121-t-copie',
            filename: 'objet.js',
            language: 'javascript',
            code: `const user = { prenom: "Alice", age: 30 };

// Nouvel objet : copie + propriete changee
const modifie = { ...user, age: 31 };`,
          },
        ],
        replacements: [
          { token: 'user', description: 'l’objet d’origine (non modifié)' },
          { token: 'age: 31', description: 'la ou les propriétés à remplacer' },
        ],
        placement: 'Le réflexe React : copie l’objet avec ...user, puis écrase la propriété voulue.',
      },
    ],
  }),

  // ————— find() —————
  lesson({
    id: 'JS-F-1122-LESSON',
    slug: 'find',
    title: 'find()',
    shortTitle: 'find()',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Récupérer le premier élément d’un tableau qui remplit une condition — un seul élément, pas un tableau.',
    utility: 'Retrouver UN élément précis dans une liste selon un critère (souvent par id).',
    aliases: ['find', 'trouver', 'chercher', 'findindex', 'premier element', 'par id'],
    keywords: [
      'trouver un element',
      'chercher par id',
      'premier qui correspond',
      'un seul resultat',
      'find vs filter',
      'position dans le tableau',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1122-TEMPLATE',
    intro:
      '<code>find</code> parcourt un tableau et renvoie le <b>premier</b> élément qui passe un test. Il renvoie <b>un seul</b> élément (ou <code>undefined</code> s’il n’en trouve aucun) — contrairement à <code>filter</code> qui renvoie toujours un tableau.',
    sections: [
      {
        id: 's1',
        title: 'Trouver un élément par son id',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>récupérer l’utilisateur dont l’id vaut 2</b> dans ma liste, pour afficher sa fiche.',
          },
          {
            type: 'paragraph',
            html: 'On passe à <code>find</code> une fonction qui reçoit chaque élément et renvoie <code>true</code> quand c’est le bon. Dès qu’un élément passe le test, <code>find</code> s’arrête et le renvoie.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1122-l-c1',
              filename: 'find.js',
              language: 'javascript',
              code: `const users = [
  { id: 1, prenom: "Alice" },
  { id: 2, prenom: "Bob" },
  { id: 3, prenom: "Chloe" },
];

// Le test : "cet element a-t-il l'id 2 ?"
const trouve = users.find((user) => user.id === 2);

console.log(trouve); // { id: 2, prenom: "Bob" }
console.log(trouve.prenom); // "Bob"`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>find</code> = le vendeur qui va chercher <b>la seule</b> paire de chaussures à ta pointure et revient avec. <code>filter</code> = il revient avec <b>tout le rayon</b> de ta pointure (un tableau).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Gérer le cas "rien trouvé"',
        blocks: [
          {
            type: 'paragraph',
            html: 'Si <b>aucun</b> élément ne passe le test, <code>find</code> renvoie <code>undefined</code>. Il faut le prévoir, sinon lire une propriété dessus plante.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1122-l-c2',
              filename: 'find.js',
              language: 'javascript',
              code: `const users = [{ id: 1, prenom: "Alice" }];

const trouve = users.find((user) => user.id === 99);
console.log(trouve); // undefined

// Danger : trouve.prenom planterait ici
// On verifie d'abord :
if (trouve) {
  console.log(trouve.prenom);
} else {
  console.log("Aucun utilisateur trouve");
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Réflexe :</b> après un <code>find</code>, teste toujours le résultat (<code>if (trouve)</code>) ou utilise l’accès optionnel <code>trouve?.prenom</code> avant de lire une propriété.',
          },
        ],
      },
      {
        id: 's3',
        title: 'find vs findIndex vs filter',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>findIndex</code> renvoie la <b>position</b> (l’index) au lieu de l’élément — pratique pour ensuite modifier ou supprimer. Comparons les trois :',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1122-l-c3',
              filename: 'comparaison.js',
              language: 'javascript',
              code: `const notes = [8, 12, 15, 18];

// find -> la valeur
notes.find((n) => n > 10);      // 12

// findIndex -> la position (ou -1 si absent)
notes.findIndex((n) => n > 10); // 1

// filter -> TOUTES les valeurs (un tableau)
notes.filter((n) => n > 10);    // [12, 15, 18]`,
            },
          },
          {
            type: 'table',
            headers: ['Méthode', 'Renvoie', 'Si rien trouvé'],
            rows: [
              ['<code>find</code>', 'le premier élément', '<code>undefined</code>'],
              ['<code>findIndex</code>', 'la position (index)', '<code>-1</code>'],
              ['<code>filter</code>', 'tous les éléments (tableau)', '<code>[]</code> (tableau vide)'],
              ['<code>some</code>', 'un booléen (au moins un ?)', '<code>false</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Attendre un tableau de <code>find</code> : il renvoie <b>un seul</b> élément. Pour plusieurs résultats, c’est <code>filter</code>.',
      'Oublier le cas <code>undefined</code> : lire <code>trouve.prenom</code> quand rien n’a été trouvé fait planter le code.',
      'Confondre <code>find</code> (l’élément) et <code>findIndex</code> (la position) : choisis selon ce dont tu as besoin ensuite.',
      'Utiliser <code>==</code> au lieu de <code>===</code> dans le test : privilégie toujours l’égalité stricte <code>===</code>.',
    ],
    takeaways: [
      '<code>find</code> = le <b>premier</b> élément qui passe le test (un seul)',
      'rien trouvé → <code>undefined</code> : teste toujours le résultat avant de l’utiliser',
      '<code>findIndex</code> = la position (ou <code>-1</code>) · <code>filter</code> = tous (un tableau)',
      'test typique : <code>tab.find((x) => x.id === monId)</code>',
    ],
  }),
  template({
    id: 'JS-F-1122-TEMPLATE',
    slug: 'find',
    title: 'find()',
    shortTitle: 'find()',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code de find() prêt à copier : par id, avec repli, ou la position.',
    lede: 'Trouver un élément. Choisis le cas :',
    aliases: ['find', 'trouver', 'findindex', 'par id'],
    keywords: ['chercher', 'un seul', 'position'],
    relatedContentIds: [],
    lessonId: 'JS-F-1122-LESSON',
    variants: [
      {
        id: 'par-id',
        label: 'Par id',
        codeBlocks: [
          {
            id: 'JS-F-1122-t-parid',
            filename: 'find.js',
            language: 'javascript',
            code: `const trouve = liste.find((item) => item.id === idCible);`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau d’objets' },
          { token: 'item.id', description: 'la propriété testée' },
          { token: 'idCible', description: 'la valeur recherchée' },
        ],
        placement: 'Le cas le plus courant : retrouver un objet précis par son identifiant.',
      },
      {
        id: 'avec-repli',
        label: 'Avec valeur de repli',
        codeBlocks: [
          {
            id: 'JS-F-1122-t-repli',
            filename: 'find.js',
            language: 'javascript',
            code: `const trouve = liste.find((item) => item.id === idCible);

// Nom sûr, même si rien n'est trouvé
const nom = trouve?.nom ?? "Inconnu";`,
          },
        ],
        replacements: [
          { token: 'trouve?.nom', description: 'la propriété à lire en toute sécurité' },
          { token: '"Inconnu"', description: 'la valeur par défaut si rien trouvé' },
        ],
        placement: 'Quand le résultat peut être undefined : ?. évite le crash, ?? fournit un repli.',
      },
      {
        id: 'index',
        label: 'La position (findIndex)',
        codeBlocks: [
          {
            id: 'JS-F-1122-t-index',
            filename: 'find.js',
            language: 'javascript',
            code: `const position = liste.findIndex((item) => item.id === idCible);

// -1 si absent
if (position !== -1) {
  // ... faire quelque chose avec l'index
}`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau' },
          { token: 'item.id === idCible', description: 'le test de recherche' },
        ],
        placement: 'Quand tu as besoin de la position (pour modifier ou supprimer l’élément ensuite).',
      },
    ],
  }),

  // ————— sort() —————
  lesson({
    id: 'JS-F-1123-LESSON',
    slug: 'sort',
    title: 'sort()',
    shortTitle: 'sort()',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Trier un tableau selon un critère : nombres, textes, ou objets par une de leurs propriétés — croissant ou décroissant.',
    utility: 'Ranger une liste dans l’ordre voulu (du plus petit au plus grand, alphabétique, par date…).',
    aliases: ['sort', 'trier', 'ordre', 'croissant', 'decroissant', 'ranger', 'alphabetique'],
    keywords: [
      'trier des nombres',
      'trier par ordre alphabetique',
      'ordre croissant',
      'ordre decroissant',
      'trier des objets',
      'fonction de comparaison',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1123-TEMPLATE',
    intro:
      '<code>sort</code> range un tableau. Par défaut, il trie comme du <b>texte</b> (ce qui casse les nombres). Le vrai outil, c’est la <b>fonction de comparaison</b> <code>(a, b) => …</code> : renvoie un nombre <b>négatif</b> pour placer <code>a</code> avant <code>b</code>, positif pour l’inverse.',
    sections: [
      {
        id: 's1',
        title: 'Trier des nombres correctement',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>classer des scores du plus petit au plus grand</b>, mais <code>sort()</code> tout seul me donne un ordre bizarre.',
          },
          {
            type: 'paragraph',
            html: 'Sans fonction, <code>sort</code> compare les valeurs comme du texte : <code>"10"</code> passe avant <code>"9"</code>. Pour des nombres, on donne la comparaison <code>(a, b) => a - b</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1123-l-c1',
              filename: 'sort.js',
              language: 'javascript',
              code: `const scores = [10, 1, 9, 2];

// FAUX : tri texte -> [1, 10, 2, 9]
scores.sort();

// BON : croissant -> [1, 2, 9, 10]
scores.sort((a, b) => a - b);

// Decroissant -> [10, 9, 2, 1]
scores.sort((a, b) => b - a);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> pour des nombres, <code>a - b</code> = croissant, <code>b - a</code> = décroissant. Ne jamais utiliser <code>sort()</code> nu sur des nombres.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Trier du texte (alphabétique)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour des chaînes, <code>localeCompare</code> gère correctement les accents et la casse selon la langue.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1123-l-c2',
              filename: 'sort.js',
              language: 'javascript',
              code: `const prenoms = ["Chloe", "alice", "Bob"];

// localeCompare : ordre alphabetique propre (accents, casse)
prenoms.sort((a, b) => a.localeCompare(b));
// ["alice", "Bob", "Chloe"]

// Ordre inverse : on echange a et b
prenoms.sort((a, b) => b.localeCompare(a));`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'Trier un tableau d’objets',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le cas le plus courant en vrai : trier des objets par une de leurs propriétés (âge, date, prix…). On compare la propriété, pas l’objet entier.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1123-l-c3',
              filename: 'sort.js',
              language: 'javascript',
              code: `const users = [
  { prenom: "Alice", age: 30 },
  { prenom: "Bob", age: 25 },
  { prenom: "Chloe", age: 35 },
];

// Par age croissant
users.sort((a, b) => a.age - b.age);
// Bob (25), Alice (30), Chloe (35)

// Par prenom alphabetique
users.sort((a, b) => a.prenom.localeCompare(b.prenom));`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Attention :</b> <code>sort</code> modifie le tableau <b>d’origine</b> (il mute). Pour garder l’original intact, trie une <b>copie</b> : <code>[...users].sort(...)</code>.',
          },
        ],
      },
      {
        id: 's4',
        title: 'Le résumé de la comparaison',
        blocks: [
          {
            type: 'table',
            headers: ['Je veux…', 'Fonction de comparaison'],
            rows: [
              ['nombres croissant', '<code>(a, b) => a - b</code>'],
              ['nombres décroissant', '<code>(a, b) => b - a</code>'],
              ['texte A → Z', '<code>(a, b) => a.localeCompare(b)</code>'],
              ['objets par âge', '<code>(a, b) => a.age - b.age</code>'],
              ['sans muter l’original', '<code>[...tab].sort(...)</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>sort()</code> nu sur des nombres : il trie comme du texte (<code>[1, 10, 2]</code>). Donne toujours <code>(a, b) => a - b</code>.',
      '<code>sort</code> <b>mute</b> le tableau d’origine : en React, trie une copie <code>[...tab].sort(...)</code>.',
      'Oublier de <code>return</code> dans une comparaison à accolades : <code>(a, b) => { a - b }</code> ne renvoie rien. Utilise la forme courte ou ajoute <code>return</code>.',
      'Comparer l’objet entier (<code>a - b</code>) au lieu d’une propriété (<code>a.age - b.age</code>).',
    ],
    takeaways: [
      'nombres : <code>(a, b) => a - b</code> (croissant) · <code>b - a</code> (décroissant)',
      'texte : <code>(a, b) => a.localeCompare(b)</code>',
      'objets : compare une <b>propriété</b> — <code>a.age - b.age</code>',
      '<code>sort</code> mute → trie une copie <code>[...tab].sort(...)</code> pour préserver l’original',
    ],
  }),
  template({
    id: 'JS-F-1123-TEMPLATE',
    slug: 'sort',
    title: 'sort()',
    shortTitle: 'sort()',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code de sort() prêt à copier : nombres, texte, objets.',
    lede: 'Trier une liste. Choisis le type de données :',
    aliases: ['sort', 'trier', 'ordre', 'alphabetique'],
    keywords: ['croissant', 'decroissant', 'comparaison'],
    relatedContentIds: [],
    lessonId: 'JS-F-1123-LESSON',
    variants: [
      {
        id: 'nombres',
        label: 'Nombres',
        codeBlocks: [
          {
            id: 'JS-F-1123-t-nombres',
            filename: 'sort.js',
            language: 'javascript',
            code: `// Croissant
liste.sort((a, b) => a - b);

// Decroissant
liste.sort((a, b) => b - a);`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau de nombres' },
        ],
        placement: 'Pour des nombres. a - b = du plus petit au plus grand, b - a = l’inverse.',
      },
      {
        id: 'texte',
        label: 'Texte (A → Z)',
        codeBlocks: [
          {
            id: 'JS-F-1123-t-texte',
            filename: 'sort.js',
            language: 'javascript',
            code: `liste.sort((a, b) => a.localeCompare(b));`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau de chaînes' },
        ],
        placement: 'Pour de l’alphabétique propre (accents, majuscules gérés). Inverse : b.localeCompare(a).',
      },
      {
        id: 'objets',
        label: 'Objets (copie)',
        codeBlocks: [
          {
            id: 'JS-F-1123-t-objets',
            filename: 'sort.js',
            language: 'javascript',
            code: `// [...liste] : trie une COPIE, l'original reste intact
const triee = [...liste].sort((a, b) => a.age - b.age);`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau d’objets' },
          { token: 'a.age', description: 'la propriété sur laquelle trier' },
        ],
        placement: 'Le cas réel : trie des objets par une propriété, sans muter l’original (réflexe React).',
      },
    ],
  }),

  // ————— reduce() —————
  lesson({
    id: 'JS-F-1124-LESSON',
    slug: 'reduce',
    title: 'reduce()',
    shortTitle: 'reduce()',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Réduire un tableau entier à une seule valeur : une somme, un total, un objet de comptage — en accumulant élément par élément.',
    utility: 'Combiner tous les éléments d’un tableau en un seul résultat (total, moyenne, regroupement).',
    aliases: ['reduce', 'accumulateur', 'somme', 'total', 'additionner', 'reducer'],
    keywords: [
      'additionner un tableau',
      'faire une somme',
      'calculer un total',
      'accumulateur',
      'compter les occurrences',
      'valeur initiale',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1124-TEMPLATE',
    intro:
      '<code>reduce</code> transforme un tableau en <b>une seule valeur</b>. Il parcourt les éléments en gardant un <b>accumulateur</b> qui se met à jour à chaque tour. On lui donne une fonction <code>(acc, item) => …</code> et une <b>valeur de départ</b>.',
    sections: [
      {
        id: 's1',
        title: 'Additionner un tableau de nombres',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>calculer le total d’un panier</b> à partir de la liste des prix de chaque article.',
          },
          {
            type: 'paragraph',
            html: 'L’accumulateur (<code>total</code>) démarre à la valeur initiale (ici <code>0</code>), puis on lui ajoute chaque élément. Ce qu’on renvoie devient l’accumulateur du tour suivant.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1124-l-c1',
              filename: 'reduce.js',
              language: 'javascript',
              code: `const prix = [10, 25, 5];

// acc = accumulateur, p = element courant, 0 = depart
const total = prix.reduce((acc, p) => acc + p, 0);

console.log(total); // 40

// Deroule :
// depart 0 -> 0 + 10 = 10 -> 10 + 25 = 35 -> 35 + 5 = 40`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un caddie à la caisse. L’<b>accumulateur</b> = le total qui s’affiche. Chaque article scanné (<code>p</code>) s’ajoute au total. À la fin, il ne reste qu’un chiffre.',
          },
        ],
      },
      {
        id: 's2',
        title: 'La valeur initiale est cruciale',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <b>2ᵉ argument</b> de <code>reduce</code> est la valeur de départ de l’accumulateur. Elle donne aussi le <b>type</b> du résultat : <code>0</code> pour un nombre, <code>[]</code> pour un tableau, <code>{}</code> pour un objet.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1124-l-c2',
              filename: 'reduce.js',
              language: 'javascript',
              code: `const paniers = [
  { article: "pain", prix: 2 },
  { article: "lait", prix: 1 },
];

// On additionne la propriete .prix de chaque objet
const total = paniers.reduce((acc, p) => acc + p.prix, 0);
console.log(total); // 3

// Sans valeur initiale sur un tableau vide -> ERREUR
// Mets TOUJOURS la valeur de depart (ici 0)`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Toujours</b> fournir la valeur initiale (le 2ᵉ argument). Sans elle, un tableau vide fait planter <code>reduce</code>, et le comportement devient imprévisible.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Compter et regrouper',
        blocks: [
          {
            type: 'paragraph',
            html: 'Avec un <b>objet</b> comme accumulateur, <code>reduce</code> sait compter les occurrences ou regrouper des éléments — des choses impossibles avec un simple total.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1124-l-c3',
              filename: 'reduce.js',
              language: 'javascript',
              code: `const fruits = ["pomme", "kiwi", "pomme", "pomme"];

// On compte combien de fois chaque fruit apparait
const compte = fruits.reduce((acc, fruit) => {
  // si absent, on part de 0, puis on ajoute 1
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc; // ne pas oublier de renvoyer l'accumulateur !
}, {});

console.log(compte); // { pomme: 3, kiwi: 1 }`,
            },
          },
          {
            type: 'table',
            headers: ['Valeur initiale', 'Usage typique'],
            rows: [
              ['<code>0</code>', 'somme, total, moyenne'],
              ['<code>{}</code>', 'compter, regrouper par clé'],
              ['<code>[]</code>', 'construire un nouveau tableau'],
              ['<code>""</code>', 'concaténer en une chaîne'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier de <code>return</code> l’accumulateur dans la version à accolades : le tour suivant reçoit <code>undefined</code>.',
      'Omettre la <b>valeur initiale</b> (2ᵉ argument) : sur un tableau vide, <code>reduce</code> plante.',
      'Vouloir un total mais additionner l’objet entier au lieu d’une propriété : c’est <code>acc + p.prix</code>, pas <code>acc + p</code>.',
      'Utiliser <code>reduce</code> là où <code>map</code> ou <code>filter</code> suffit : garde <code>reduce</code> pour <b>combiner</b> en une seule valeur.',
    ],
    takeaways: [
      '<code>reduce</code> = tout un tableau → <b>une seule</b> valeur',
      'syntaxe : <code>tab.reduce((acc, item) => …, valeurInitiale)</code>',
      'toujours fournir la <b>valeur initiale</b> · toujours <code>return</code> l’accumulateur',
      'somme = départ <code>0</code> · comptage/regroupement = départ <code>{}</code>',
    ],
  }),
  template({
    id: 'JS-F-1124-TEMPLATE',
    slug: 'reduce',
    title: 'reduce()',
    shortTitle: 'reduce()',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code de reduce() prêt à copier : somme, somme d’objets, comptage.',
    lede: 'Réduire à une valeur. Choisis le cas :',
    aliases: ['reduce', 'somme', 'total', 'accumulateur'],
    keywords: ['additionner', 'compter', 'regrouper'],
    relatedContentIds: [],
    lessonId: 'JS-F-1124-LESSON',
    variants: [
      {
        id: 'somme',
        label: 'Somme de nombres',
        codeBlocks: [
          {
            id: 'JS-F-1124-t-somme',
            filename: 'reduce.js',
            language: 'javascript',
            code: `const total = nombres.reduce((acc, n) => acc + n, 0);`,
          },
        ],
        replacements: [
          { token: 'nombres', description: 'ton tableau de nombres' },
          { token: '0', description: 'la valeur de départ (0 pour une somme)' },
        ],
        placement: 'Le cas classique : faire un total à partir d’une liste de nombres.',
      },
      {
        id: 'somme-objets',
        label: 'Somme d’une propriété',
        codeBlocks: [
          {
            id: 'JS-F-1124-t-somme-obj',
            filename: 'reduce.js',
            language: 'javascript',
            code: `const total = panier.reduce((acc, item) => acc + item.prix, 0);`,
          },
        ],
        replacements: [
          { token: 'panier', description: 'ton tableau d’objets' },
          { token: 'item.prix', description: 'la propriété à additionner' },
        ],
        placement: 'Pour totaliser une propriété (prix, quantité…) d’un tableau d’objets.',
      },
      {
        id: 'comptage',
        label: 'Comptage',
        codeBlocks: [
          {
            id: 'JS-F-1124-t-comptage',
            filename: 'reduce.js',
            language: 'javascript',
            code: `const compte = liste.reduce((acc, valeur) => {
  acc[valeur] = (acc[valeur] || 0) + 1;
  return acc;
}, {});`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'le tableau dont tu comptes les valeurs' },
          { token: 'valeur', description: 'l’élément qui sert de clé de comptage' },
        ],
        placement: 'Pour compter les occurrences : accumulateur objet {} au départ, +1 par valeur rencontrée.',
      },
    ],
  }),

  // ————— forEach —————
  lesson({
    id: 'JS-F-1125-LESSON',
    slug: 'foreach',
    title: 'forEach',
    shortTitle: 'forEach',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Exécuter une action pour chaque élément d’un tableau, sans construire de nouveau tableau — juste faire quelque chose à chaque tour.',
    utility: 'Parcourir un tableau pour agir sur chaque élément (afficher, envoyer, cumuler un effet).',
    aliases: ['foreach', 'parcourir', 'boucle', 'iterer', 'pour chaque', 'callback'],
    keywords: [
      'parcourir un tableau',
      'faire une action',
      'boucle moderne',
      'foreach vs map',
      'index dans foreach',
      'effet de bord',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1125-TEMPLATE',
    intro:
      '<code>forEach</code> exécute une fonction <b>pour chaque</b> élément d’un tableau. Contrairement à <code>map</code>, il ne <b>renvoie rien</b> : on l’utilise pour son <b>effet</b> (afficher, ajouter au DOM, envoyer…), pas pour produire un nouveau tableau.',
    sections: [
      {
        id: 's1',
        title: 'Agir sur chaque élément',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher chaque tâche de ma liste dans la console</b>, une par une, sans créer de nouvelle liste.',
          },
          {
            type: 'paragraph',
            html: 'On passe à <code>forEach</code> une fonction qui reçoit chaque élément. Elle s’exécute une fois par élément, dans l’ordre.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1125-l-c1',
              filename: 'foreach.js',
              language: 'javascript',
              code: `const taches = ["Coder", "Tester", "Livrer"];

// La fonction s'execute pour chaque tache
taches.forEach((tache) => {
  console.log("A faire :", tache);
});

// Affiche :
// A faire : Coder
// A faire : Tester
// A faire : Livrer`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>forEach</code> = passer devant chaque invité pour lui serrer la main. Tu ne fabriques rien de neuf, tu fais juste une action à chacun.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Récupérer l’index',
        blocks: [
          {
            type: 'paragraph',
            html: 'La fonction reçoit un <b>2ᵉ argument</b> : la position de l’élément. Pratique pour numéroter ou traiter différemment selon le rang.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1125-l-c2',
              filename: 'foreach.js',
              language: 'javascript',
              code: `const gagnants = ["Alice", "Bob", "Chloe"];

// item, puis index (la position, a partir de 0)
gagnants.forEach((nom, index) => {
  console.log((index + 1) + ". " + nom);
});

// 1. Alice
// 2. Bob
// 3. Chloe`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'forEach vs map : lequel choisir ?',
        blocks: [
          {
            type: 'paragraph',
            html: 'La règle simple : tu veux <b>récupérer</b> un tableau transformé → <code>map</code>. Tu veux juste <b>faire une action</b> → <code>forEach</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1125-l-c3',
              filename: 'comparaison.js',
              language: 'javascript',
              code: `const prix = [10, 20];

// map : je veux un NOUVEAU tableau
const avecTaxe = prix.map((p) => p * 1.2);
console.log(avecTaxe); // [12, 24]

// forEach : je veux juste agir, pas de retour
prix.forEach((p) => console.log(p));
const rien = prix.forEach((p) => p * 1.2);
console.log(rien); // undefined (forEach ne renvoie rien)`,
            },
          },
          {
            type: 'table',
            headers: ['Besoin', 'Méthode', 'Renvoie'],
            rows: [
              ['transformer et récupérer', '<code>map</code>', 'un nouveau tableau'],
              ['juste faire une action', '<code>forEach</code>', '<code>undefined</code>'],
              ['garder certains éléments', '<code>filter</code>', 'un nouveau tableau'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À savoir :</b> on ne peut pas <code>break</code> dans un <code>forEach</code>. Si tu as besoin d’<b>arrêter</b> en cours de route, utilise plutôt <code>for...of</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Attendre une valeur de retour : <code>forEach</code> renvoie toujours <code>undefined</code>. Pour un résultat, utilise <code>map</code>.',
      'Vouloir <code>break</code> ou <code>continue</code> dans un <code>forEach</code> : impossible. Passe à <code>for...of</code> pour pouvoir t’arrêter.',
      'Utiliser <code>map</code> juste pour un effet (afficher) sans utiliser le tableau renvoyé : dans ce cas, <code>forEach</code> exprime mieux l’intention.',
      'Oublier que <code>forEach</code> ignore la valeur renvoyée par la fonction : <code>(p) => p * 2</code> ne sert à rien ici.',
    ],
    takeaways: [
      '<code>forEach</code> = une action pour chaque élément, <b>sans</b> retour',
      'signature : <code>tab.forEach((item, index) => …)</code>',
      'besoin d’un tableau résultat → <code>map</code> · juste agir → <code>forEach</code>',
      'pas de <code>break</code> possible : pour t’arrêter, utilise <code>for...of</code>',
    ],
  }),
  template({
    id: 'JS-F-1125-TEMPLATE',
    slug: 'foreach',
    title: 'forEach',
    shortTitle: 'forEach',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code de forEach prêt à copier : action simple, avec index, ou for...of.',
    lede: 'Parcourir pour agir. Choisis le cas :',
    aliases: ['foreach', 'parcourir', 'boucle'],
    keywords: ['iterer', 'index', 'for of'],
    relatedContentIds: [],
    lessonId: 'JS-F-1125-LESSON',
    variants: [
      {
        id: 'simple',
        label: 'Action simple',
        codeBlocks: [
          {
            id: 'JS-F-1125-t-simple',
            filename: 'foreach.js',
            language: 'javascript',
            code: `liste.forEach((item) => {
  console.log(item);
});`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau à parcourir' },
          { token: 'console.log(item)', description: 'l’action à faire pour chaque élément' },
        ],
        placement: 'Le cas de base : exécuter une action pour chaque élément, sans rien récupérer.',
      },
      {
        id: 'index',
        label: 'Avec index',
        codeBlocks: [
          {
            id: 'JS-F-1125-t-index',
            filename: 'foreach.js',
            language: 'javascript',
            code: `liste.forEach((item, index) => {
  console.log(index, item);
});`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau' },
          { token: 'index', description: 'la position (commence à 0)' },
        ],
        placement: 'Quand tu as besoin de la position de chaque élément (numérotation, cas particuliers).',
      },
      {
        id: 'for-of',
        label: 'for...of (arrêtable)',
        codeBlocks: [
          {
            id: 'JS-F-1125-t-forof',
            filename: 'foreach.js',
            language: 'javascript',
            code: `for (const item of liste) {
  if (item === cible) break; // on peut s'arreter
  console.log(item);
}`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau' },
          { token: 'cible', description: 'la condition d’arrêt' },
        ],
        placement: 'À utiliser quand tu dois pouvoir interrompre la boucle (break) — impossible avec forEach.',
      },
    ],
  }),

  // ————— includes et indexOf —————
  lesson({
    id: 'JS-F-1126-LESSON',
    slug: 'includes-et-indexof',
    title: 'includes et indexOf',
    shortTitle: 'includes / indexOf',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Vérifier qu’une valeur est présente dans un tableau (ou une chaîne), et retrouver sa position.',
    utility: 'Savoir si un élément existe dans une liste, et à quelle position il se trouve.',
    aliases: ['includes', 'indexof', 'contient', 'presence', 'position', 'existe', 'chercher'],
    keywords: [
      'verifier une presence',
      'element existe',
      'contient une valeur',
      'position d un element',
      'includes vs indexof',
      'trouver dans une chaine',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1126-TEMPLATE',
    intro:
      '<code>includes</code> répond à une question simple : « cette valeur est-elle là ? » et renvoie <code>true</code> ou <code>false</code>. <code>indexOf</code> répond « à quelle position ? » et renvoie l’<b>index</b> (ou <code>-1</code> si absent). Les deux marchent sur les <b>tableaux</b> et les <b>chaînes</b>.',
    sections: [
      {
        id: 's1',
        title: 'Vérifier une présence avec includes',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>savoir si "admin" fait partie des rôles</b> d’un utilisateur avant de lui donner accès à une page.',
          },
          {
            type: 'paragraph',
            html: '<code>includes</code> renvoie directement un booléen : parfait pour un <code>if</code>. Bien plus lisible que de vérifier une position.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1126-l-c1',
              filename: 'includes.js',
              language: 'javascript',
              code: `const roles = ["user", "admin", "editor"];

// Reponse directe : true / false
console.log(roles.includes("admin")); // true
console.log(roles.includes("boss"));  // false

// Ideal dans une condition
if (roles.includes("admin")) {
  console.log("Acces autorise");
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Réflexe moderne :</b> pour tester une présence, préfère <code>includes</code> (lisible, renvoie un booléen) plutôt que <code>indexOf(...) !== -1</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Retrouver la position avec indexOf',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>indexOf</code> renvoie l’<b>index</b> de la première occurrence, ou <code>-1</code> si la valeur est absente. Utile quand tu as besoin de la position ensuite.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1126-l-c2',
              filename: 'indexof.js',
              language: 'javascript',
              code: `const fruits = ["pomme", "kiwi", "banane"];

console.log(fruits.indexOf("kiwi"));  // 1
console.log(fruits.indexOf("mangue")); // -1 (absent)

// Le vieux test de presence (avant includes)
if (fruits.indexOf("kiwi") !== -1) {
  console.log("Kiwi present");
}`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'Ça marche aussi sur les chaînes',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les deux méthodes existent sur les <b>chaînes de caractères</b> : <code>includes</code> teste si un mot est présent, <code>indexOf</code> donne la position du caractère.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1126-l-c3',
              filename: 'chaine.js',
              language: 'javascript',
              code: `const phrase = "Bonjour le monde";

phrase.includes("monde"); // true
phrase.includes("Monde"); // false (sensible a la casse)
phrase.indexOf("le");     // 8 (position du caractere)

// Astuce : ignorer la casse -> tout en minuscules
phrase.toLowerCase().includes("bonjour"); // true`,
            },
          },
          {
            type: 'table',
            headers: ['Méthode', 'Question', 'Renvoie'],
            rows: [
              ['<code>includes</code>', 'est-ce présent ?', '<code>true</code> / <code>false</code>'],
              ['<code>indexOf</code>', 'à quelle position ?', 'l’index ou <code>-1</code>'],
              ['<code>some</code>', 'un élément passe un test ?', '<code>true</code> / <code>false</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      '<code>indexOf</code> renvoie <code>0</code> quand l’élément est en première position : <code>0</code> est « faux » en JS. Teste <code>!== -1</code>, jamais la valeur brute dans un <code>if</code>.',
      'Oublier que la comparaison est <b>sensible à la casse</b> : <code>"Monde"</code> ≠ <code>"monde"</code>. Passe en minuscules si besoin.',
      '<code>includes</code> sur des <b>objets</b> compare les références, pas le contenu : deux objets identiques mais distincts ne matchent pas. Utilise <code>some</code>.',
      'Confondre <code>includes</code> (présence, booléen) et <code>indexOf</code> (position) : choisis selon ce que tu veux vraiment.',
    ],
    takeaways: [
      '<code>includes</code> = présence → <code>true</code> / <code>false</code> (le plus lisible)',
      '<code>indexOf</code> = position → l’index ou <code>-1</code> si absent',
      'les deux fonctionnent sur <b>tableaux</b> et <b>chaînes</b>',
      'sensible à la casse · pour des objets, préfère <code>some</code>',
    ],
  }),
  template({
    id: 'JS-F-1126-TEMPLATE',
    slug: 'includes-et-indexof',
    title: 'includes / indexOf',
    shortTitle: 'includes / indexOf',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code prêt à copier : tester une présence, trouver une position, chercher un objet.',
    lede: 'Vérifier une présence. Choisis le cas :',
    aliases: ['includes', 'indexof', 'contient', 'presence'],
    keywords: ['existe', 'position', 'some'],
    relatedContentIds: [],
    lessonId: 'JS-F-1126-LESSON',
    variants: [
      {
        id: 'presence',
        label: 'Présence (includes)',
        codeBlocks: [
          {
            id: 'JS-F-1126-t-presence',
            filename: 'includes.js',
            language: 'javascript',
            code: `if (liste.includes(valeur)) {
  // la valeur est presente
}`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau (ou ta chaîne)' },
          { token: 'valeur', description: 'la valeur cherchée' },
        ],
        placement: 'Le cas courant : savoir si une valeur simple (texte, nombre) est dans la liste.',
      },
      {
        id: 'position',
        label: 'Position (indexOf)',
        codeBlocks: [
          {
            id: 'JS-F-1126-t-position',
            filename: 'indexof.js',
            language: 'javascript',
            code: `const position = liste.indexOf(valeur); // -1 si absent

if (position !== -1) {
  // trouve a l'index "position"
}`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau' },
          { token: 'valeur', description: 'la valeur dont tu veux la position' },
        ],
        placement: 'Quand tu as besoin de l’index (pour ensuite modifier ou retirer l’élément).',
      },
      {
        id: 'objet',
        label: 'Chercher un objet (some)',
        codeBlocks: [
          {
            id: 'JS-F-1126-t-objet',
            filename: 'some.js',
            language: 'javascript',
            code: `const existe = liste.some((item) => item.id === idCible);`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau d’objets' },
          { token: 'item.id === idCible', description: 'le test de présence' },
        ],
        placement: 'Pour des objets : includes compare les références, some teste le contenu réel.',
      },
    ],
  }),

  // ————— La déstructuration —————
  lesson({
    id: 'JS-F-1127-LESSON',
    slug: 'la-destructuration',
    title: 'La déstructuration',
    shortTitle: 'Déstructuration',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Extraire des valeurs d’un objet ou d’un tableau vers des variables en une seule ligne, au lieu de les recopier une par une.',
    utility: 'Sortir rapidement des propriétés ou des éléments dans des variables nommées.',
    aliases: ['destructuration', 'destructuring', 'extraire', 'decomposer', 'props', 'valeur par defaut'],
    keywords: [
      'extraire des proprietes',
      'sortir des valeurs',
      'destructurer un objet',
      'destructurer un tableau',
      'valeur par defaut',
      'renommer une variable',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1127-TEMPLATE',
    intro:
      'La <b>déstructuration</b> extrait des valeurs d’un objet ou d’un tableau et les range dans des variables, en une ligne. Objet → on extrait par <b>nom</b> (<code>{ }</code>). Tableau → on extrait par <b>position</b> (<code>[ ]</code>). C’est partout en JavaScript moderne et en React.',
    sections: [
      {
        id: 's1',
        title: 'Déstructurer un objet',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>sortir le prénom et l’âge d’un objet user</b> dans deux variables, sans écrire <code>user.prenom</code> et <code>user.age</code> partout.',
          },
          {
            type: 'paragraph',
            html: 'On met à gauche les <b>noms des propriétés</b> voulues entre accolades. JS crée les variables correspondantes.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1127-l-c1',
              filename: 'objet.js',
              language: 'javascript',
              code: `const user = { prenom: "Alice", age: 30, ville: "Lyon" };

// Sans destructuration
const prenom1 = user.prenom;
const age1 = user.age;

// Avec destructuration : une seule ligne
const { prenom, age } = user;

console.log(prenom, age); // "Alice" 30`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> déballer un colis. L’objet, c’est le carton fermé. La déstructuration sort directement les articles voulus et les pose sur la table, étiquetés.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Valeur par défaut et renommage',
        blocks: [
          {
            type: 'paragraph',
            html: 'On peut donner une <b>valeur par défaut</b> (si la propriété manque) avec <code>=</code>, et <b>renommer</b> la variable avec <code>:</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1127-l-c2',
              filename: 'objet.js',
              language: 'javascript',
              code: `const user = { prenom: "Alice" };

// age absent -> valeur par defaut 18
const { prenom, age = 18 } = user;
console.log(age); // 18

// Renommer : prenom devient "nom"
const { prenom: nom } = user;
console.log(nom); // "Alice"

// Combiner renommage + defaut
const { role: r = "user" } = user;
console.log(r); // "user"`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>En React :</b> la déstructuration des props est la norme — <code>function Carte({ titre, prix }) { … }</code> au lieu de <code>props.titre</code>.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Déstructurer un tableau',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour un tableau, on extrait par <b>position</b> avec des crochets. C’est exactement ce que fait <code>useState</code> en React.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1127-l-c3',
              filename: 'tableau.js',
              language: 'javascript',
              code: `const couleurs = ["rouge", "vert", "bleu"];

// Par position (l'ordre compte)
const [premiere, deuxieme] = couleurs;
console.log(premiere, deuxieme); // "rouge" "vert"

// Sauter un element avec une virgule vide
const [, , troisieme] = couleurs;
console.log(troisieme); // "bleu"

// Le pattern React :
// const [count, setCount] = useState(0);`,
            },
          },
          {
            type: 'table',
            headers: ['Source', 'Syntaxe', 'Extrait par'],
            rows: [
              ['objet', '<code>const { a, b } = obj</code>', 'nom de propriété'],
              ['tableau', '<code>const [a, b] = tab</code>', 'position'],
              ['défaut', '<code>const { a = 1 } = obj</code>', 'valeur de repli'],
              ['renommage', '<code>const { a: x } = obj</code>', 'nouveau nom'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Confondre les délimiteurs : <b>objet = accolades</b> <code>{ }</code> (par nom), <b>tableau = crochets</b> <code>[ ]</code> (par position).',
      'Se tromper sur l’ordre d’un tableau : <code>const [a, b]</code> dépend de la position, pas du nom des variables.',
      'Oublier que le nom doit correspondre à la propriété pour un objet : <code>const { pseudo }</code> sur un objet sans <code>pseudo</code> donne <code>undefined</code>.',
      'Déstructurer un objet potentiellement <code>null</code> : <code>const { a } = null</code> plante. Vérifie ou mets <code>= {}</code> par défaut.',
    ],
    takeaways: [
      'objet = par <b>nom</b> : <code>const { prenom, age } = user</code>',
      'tableau = par <b>position</b> : <code>const [a, b] = tab</code>',
      'valeur par défaut = <code>const { age = 18 } = user</code> · renommage = <code>{ prenom: nom }</code>',
      'omniprésent en React : props (<code>{ titre }</code>) et <code>useState</code>',
    ],
  }),
  template({
    id: 'JS-F-1127-TEMPLATE',
    slug: 'la-destructuration',
    title: 'La déstructuration',
    shortTitle: 'Déstructuration',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code de déstructuration prêt à copier : objet, tableau, valeurs par défaut.',
    lede: 'Extraire des valeurs. Choisis la source :',
    aliases: ['destructuration', 'extraire', 'props'],
    keywords: ['objet', 'tableau', 'defaut'],
    relatedContentIds: [],
    lessonId: 'JS-F-1127-LESSON',
    variants: [
      {
        id: 'objet',
        label: 'Objet',
        codeBlocks: [
          {
            id: 'JS-F-1127-t-objet',
            filename: 'destructure.js',
            language: 'javascript',
            code: `const { prenom, age } = user;`,
          },
        ],
        replacements: [
          { token: 'prenom, age', description: 'les propriétés à extraire (mêmes noms que dans l’objet)' },
          { token: 'user', description: 'l’objet source' },
        ],
        placement: 'Le cas le plus fréquent : sortir des propriétés d’un objet (dont les props React).',
      },
      {
        id: 'tableau',
        label: 'Tableau',
        codeBlocks: [
          {
            id: 'JS-F-1127-t-tableau',
            filename: 'destructure.js',
            language: 'javascript',
            code: `const [premier, deuxieme] = liste;`,
          },
        ],
        replacements: [
          { token: 'premier, deuxieme', description: 'tes noms de variables (par ordre de position)' },
          { token: 'liste', description: 'le tableau source' },
        ],
        placement: 'Pour extraire par position — exactement le pattern de useState en React.',
      },
      {
        id: 'defaut',
        label: 'Défaut + renommage',
        codeBlocks: [
          {
            id: 'JS-F-1127-t-defaut',
            filename: 'destructure.js',
            language: 'javascript',
            code: `// = valeur par defaut si absente, : renomme la variable
const { role = "user", prenom: nom } = user;`,
          },
        ],
        replacements: [
          { token: 'role = "user"', description: 'propriété + valeur de repli si absente' },
          { token: 'prenom: nom', description: 'propriété source : nouveau nom de variable' },
        ],
        placement: 'Quand une propriété peut manquer (=) ou quand tu veux un autre nom de variable (:).',
      },
    ],
  }),

  // ————— Le spread et le rest —————
  lesson({
    id: 'JS-F-1128-LESSON',
    slug: 'le-spread-et-le-rest',
    title: 'Le spread et le rest',
    shortTitle: 'Spread / rest',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Les trois points « ... » : étaler le contenu d’un tableau/objet (spread) pour le copier ou le fusionner, ou regrouper plusieurs valeurs en une (rest).',
    utility: 'Copier et fusionner des tableaux/objets sans les muter, et regrouper des arguments.',
    aliases: ['spread', 'rest', 'trois points', 'copie', 'fusion', 'operateur spread', 'points de suspension'],
    keywords: [
      'copier un tableau',
      'copier un objet',
      'fusionner deux objets',
      'trois points',
      'regrouper des arguments',
      'immutabilite react',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1128-TEMPLATE',
    intro:
      'Les trois points <code>...</code> ont deux rôles opposés. En <b>spread</b>, ils <b>étalent</b> le contenu d’un tableau ou d’un objet (pour copier, fusionner, ajouter). En <b>rest</b>, ils <b>rassemblent</b> plusieurs valeurs en un seul tableau ou objet. Le contexte décide lequel des deux.',
    sections: [
      {
        id: 's1',
        title: 'Spread : copier sans muter',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>ajouter un élément à un tableau tout en gardant l’original intact</b> — le réflexe indispensable en React.',
          },
          {
            type: 'paragraph',
            html: 'Le spread <b>recopie</b> le contenu dans un nouveau tableau (ou objet). On obtient une <b>nouvelle référence</b> : l’original n’est jamais modifié.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1128-l-c1',
              filename: 'spread.js',
              language: 'javascript',
              code: `const liste = ["a", "b"];

// Copier + ajouter (l'original ne bouge pas)
const nouvelle = [...liste, "c"]; // ["a", "b", "c"]

// Ajouter au debut
const avant = ["z", ...liste]; // ["z", "a", "b"]

console.log(liste); // ["a", "b"] -> intact !`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le spread, c’est vider un sac sur la table pour en remplir un neuf. Le sac d’origine reste là, plein ; tu travailles sur la copie.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Spread : copier et fusionner des objets',
        blocks: [
          {
            type: 'paragraph',
            html: 'Sur un objet, le spread copie les propriétés. Si une clé est répétée, c’est la <b>dernière</b> qui gagne — d’où le pattern « copie + remplace une propriété ».',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1128-l-c2',
              filename: 'spread.js',
              language: 'javascript',
              code: `const user = { prenom: "Alice", age: 30 };

// Copie + modification d'une propriete (la derniere gagne)
const modifie = { ...user, age: 31 };
console.log(modifie); // { prenom: "Alice", age: 31 }

// Fusionner deux objets
const reglages = { theme: "clair", langue: "fr" };
const perso = { theme: "sombre" };
const final = { ...reglages, ...perso };
console.log(final); // { theme: "sombre", langue: "fr" }`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Le pattern React :</b> <code>setUser({ ...user, age: 31 })</code> — on copie tout, puis on écrase juste la propriété à changer. Jamais de mutation directe.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Rest : rassembler plusieurs valeurs',
        blocks: [
          {
            type: 'paragraph',
            html: 'Mêmes trois points, rôle inverse : le <b>rest</b> regroupe « tout le reste » dans un tableau ou un objet. Utile en déstructuration et pour des fonctions à nombre d’arguments variable.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1128-l-c3',
              filename: 'rest.js',
              language: 'javascript',
              code: `// Rest en destructuration : le reste dans un tableau
const [premier, ...autres] = [1, 2, 3, 4];
console.log(premier); // 1
console.log(autres);  // [2, 3, 4]

// Rest sur un objet : tout sauf age
const { age, ...reste } = { prenom: "Alice", age: 30, ville: "Lyon" };
console.log(reste); // { prenom: "Alice", ville: "Lyon" }

// Rest en parametres : un nombre variable d'arguments
function somme(...nombres) {
  return nombres.reduce((acc, n) => acc + n, 0);
}
console.log(somme(1, 2, 3)); // 6`,
            },
          },
          {
            type: 'table',
            headers: ['Rôle', 'Où', 'Ce que font les <code>...</code>'],
            rows: [
              ['spread', 'à droite (valeur)', 'étalent le contenu (copie, fusion)'],
              ['rest', 'à gauche (déstructuration)', 'regroupent le reste dans un tableau/objet'],
              ['rest', 'paramètres de fonction', 'rassemblent les arguments'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que le spread copie « en profondeur » : il est <b>superficiel</b>. Les objets imbriqués restent partagés — les modifier affecte l’original.',
      'Confondre spread et rest : c’est le <b>contexte</b> qui tranche. À droite d’un <code>=</code> = spread (étale) ; dans une déstructuration ou des paramètres = rest (regroupe).',
      'Mauvais ordre en fusion d’objets : la <b>dernière</b> clé écrase. <code>{ ...defauts, ...perso }</code> pour que <code>perso</code> l’emporte.',
      'Le rest doit toujours être en <b>dernier</b> : <code>[...autres, dernier]</code> en déstructuration est invalide.',
    ],
    takeaways: [
      'spread <code>...</code> = <b>étale</b> : copier (<code>[...tab]</code>), fusionner (<code>{ ...a, ...b }</code>)',
      'rest <code>...</code> = <b>regroupe</b> : <code>const [x, ...reste]</code>, <code>function f(...args)</code>',
      'réflexe React : <code>{ ...user, champ: valeur }</code> — copier sans muter',
      'copie <b>superficielle</b> · fusion : la dernière clé gagne · rest toujours en dernier',
    ],
  }),
  template({
    id: 'JS-F-1128-TEMPLATE',
    slug: 'le-spread-et-le-rest',
    title: 'Le spread et le rest',
    shortTitle: 'Spread / rest',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code des trois points prêt à copier : copier, fusionner, regrouper.',
    lede: 'Utiliser les « ... ». Choisis le cas :',
    aliases: ['spread', 'rest', 'copie', 'fusion'],
    keywords: ['copier', 'fusionner', 'arguments'],
    relatedContentIds: [],
    lessonId: 'JS-F-1128-LESSON',
    variants: [
      {
        id: 'copie',
        label: 'Copier (spread)',
        codeBlocks: [
          {
            id: 'JS-F-1128-t-copie',
            filename: 'spread.js',
            language: 'javascript',
            code: `// Tableau : copie + ajout
const nouveau = [...liste, element];

// Objet : copie + propriete changee
const modifie = { ...objet, cle: valeur };`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'le tableau à copier' },
          { token: 'objet', description: 'l’objet à copier' },
          { token: 'cle: valeur', description: 'la propriété à écraser dans la copie' },
        ],
        placement: 'Le réflexe React : produire une nouvelle référence sans muter l’original.',
      },
      {
        id: 'fusion',
        label: 'Fusionner (spread)',
        codeBlocks: [
          {
            id: 'JS-F-1128-t-fusion',
            filename: 'spread.js',
            language: 'javascript',
            code: `// La derniere source ecrase les cles en commun
const final = { ...defauts, ...perso };`,
          },
        ],
        replacements: [
          { token: 'defauts', description: 'les valeurs de base' },
          { token: 'perso', description: 'les valeurs prioritaires (écrasent defauts)' },
        ],
        placement: 'Pour combiner deux objets : place en dernier celui qui doit l’emporter.',
      },
      {
        id: 'rest',
        label: 'Regrouper (rest)',
        codeBlocks: [
          {
            id: 'JS-F-1128-t-rest',
            filename: 'rest.js',
            language: 'javascript',
            code: `// Le reste des elements dans un tableau
const [premier, ...autres] = liste;

// Un nombre variable d'arguments
function f(...args) {
  // args est un tableau
}`,
          },
        ],
        replacements: [
          { token: 'premier', description: 'le premier élément extrait' },
          { token: 'autres', description: 'le tableau qui reçoit tout le reste' },
        ],
        placement: 'Quand tu veux séparer le premier du reste, ou accepter un nombre libre d’arguments.',
      },
    ],
  }),

  lesson({
    id: 'JS-F-1130-LESSON',
    slug: 'every-et-some',
    title: 'every() et some() : tester tout un tableau',
    shortTitle: 'every / some',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Vérifier une condition sur un tableau : every() renvoie true si TOUS les éléments la respectent, some() si AU MOINS UN la respecte.',
    utility: 'Répondre par oui/non à « est-ce que tous… ? » ou « est-ce qu’au moins un… ? ».',
    aliases: ['every', 'some', 'tous', 'au moins un', 'verifier tableau', 'tout respecte', 'il existe'],
    keywords: ['every', 'some', 'tous les elements', 'au moins un', 'condition tableau', 'true false'],
    relatedContentIds: [],
    templateId: 'JS-F-1130-TEMPLATE',
    intro:
      '<code>every()</code> et <code>some()</code> renvoient un <b>booléen</b>. <code>every()</code> = « <b>tous</b> respectent la condition ? », <code>some()</code> = « <b>au moins un</b> la respecte ? ». On leur passe une fonction qui renvoie true/false pour chaque élément.',
    sections: [
      {
        id: 's1',
        title: 'Tous, ou au moins un',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux savoir si <b>tous les âges sont majeurs</b>, et séparément si <b>au moins un produit est en promo</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1130-l-c1',
              filename: 'every-some.js',
              language: 'javascript',
              code: `const ages = [22, 19, 31];
ages.every(a => a >= 18);   // true  (tous majeurs)
ages.some(a => a < 18);     // false (aucun mineur)

const produits = [{ promo: false }, { promo: true }];
produits.some(p => p.promo); // true  (au moins un en promo)`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Court-circuit :</b> <code>every</code> s’arrête au premier <b>false</b>, <code>some</code> s’arrête au premier <b>true</b>. Efficace sur les gros tableaux.',
          },
        ],
      },
    ],
    pitfalls: [
      '<code>every()</code> sur un tableau <b>vide</b> renvoie <b>true</b> (vacuously true) — attention si ça peut arriver.',
      'Confondre <code>some()</code> (booléen : « existe-t-il ? ») et <code>find()</code> (renvoie l’élément trouvé).',
    ],
    takeaways: [
      '<code>every()</code> → true si <b>tous</b> respectent la condition',
      '<code>some()</code> → true si <b>au moins un</b> la respecte',
      'les deux renvoient un <b>booléen</b> et s’arrêtent dès que possible',
    ],
  }),
  template({
    id: 'JS-F-1130-TEMPLATE',
    slug: 'every-et-some',
    title: 'every() et some()',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Tester tout un tableau : tous, ou au moins un.',
    lede: 'Choisis la question :',
    aliases: ['every', 'some'],
    keywords: ['every', 'some'],
    relatedContentIds: [],
    lessonId: 'JS-F-1130-LESSON',
    variants: [
      {
        id: 'every',
        label: 'Tous (every)',
        codeBlocks: [
          { id: 'JS-F-1130-t-v1', filename: 'every.js', language: 'javascript', code: `const ok = liste.every(item => condition);` },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau' },
          { token: 'condition', description: 'le test à vérifier sur chaque élément (ex. item > 0)' },
        ],
        placement: 'Pour « est-ce que TOUS respectent… ? ».',
      },
      {
        id: 'some',
        label: 'Au moins un (some)',
        codeBlocks: [
          { id: 'JS-F-1130-t-v2', filename: 'some.js', language: 'javascript', code: `const existe = liste.some(item => condition);` },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau' },
          { token: 'condition', description: 'le test (ex. item.actif === true)' },
        ],
        placement: 'Pour « est-ce qu’AU MOINS UN respecte… ? ».',
      },
    ],
  }),

  lesson({
    id: 'JS-F-1131-LESSON',
    slug: 'splice',
    title: 'splice() : ajouter ou retirer au milieu',
    shortTitle: 'splice',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Insérer, supprimer ou remplacer des éléments à une position précise d’un tableau — attention, splice() modifie le tableau d’origine.',
    utility: 'Modifier le contenu d’un tableau à un endroit précis (pas seulement au début ou à la fin).',
    aliases: ['splice', 'retirer au milieu', 'inserer', 'supprimer element', 'remplacer element'],
    keywords: ['splice', 'inserer', 'supprimer', 'remplacer', 'position', 'index', 'modifie le tableau'],
    relatedContentIds: [],
    templateId: 'JS-F-1131-TEMPLATE',
    intro:
      '<code>splice(debut, combien, ...ajouts)</code> agit <b>au milieu</b> d’un tableau : il <b>retire</b> <code>combien</code> éléments à partir de <code>debut</code>, et peut en <b>insérer</b> à la place. ⚠️ Il <b>modifie le tableau d’origine</b> (contrairement à <code>slice</code>).',
    sections: [
      {
        id: 's1',
        title: 'Retirer, insérer, remplacer',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'JS-F-1131-l-c1',
              filename: 'splice.js',
              language: 'javascript',
              code: `const fruits = ['pomme', 'kiwi', 'poire'];

// Retirer 1 element a l'index 1
fruits.splice(1, 1);            // fruits = ['pomme', 'poire']

// Inserer sans rien retirer (combien = 0)
fruits.splice(1, 0, 'banane');  // ['pomme', 'banane', 'poire']

// Remplacer : retirer 1 et ajouter 1
fruits.splice(0, 1, 'cerise');  // ['cerise', 'banane', 'poire']`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>splice vs slice :</b> <code>splice</code> <b>modifie</b> l’original et renvoie les éléments retirés ; <code>slice</code> ne touche à rien et renvoie une <b>copie</b> d’un morceau.',
          },
        ],
      },
    ],
    pitfalls: [
      '<code>splice()</code> <b>modifie</b> le tableau d’origine : en React, ne l’utilise pas directement sur un state (crée une copie d’abord).',
      'Inverser les arguments : c’est <code>splice(index, combien)</code>, pas l’inverse.',
      'Confondre avec <code>slice()</code> (copie, ne modifie rien).',
    ],
    takeaways: [
      '<code>splice(debut, combien, ...ajouts)</code> agit à une position précise',
      '<code>combien = 0</code> → insertion pure, sans rien retirer',
      '⚠️ <code>splice</code> <b>modifie</b> le tableau d’origine',
      'pour un state React, copie le tableau avant de le modifier',
    ],
  }),
  template({
    id: 'JS-F-1131-TEMPLATE',
    slug: 'splice',
    title: 'splice()',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Insérer ou retirer au milieu d’un tableau.',
    lede: 'Choisis l’action :',
    aliases: ['splice', 'inserer', 'retirer'],
    keywords: ['splice', 'index'],
    relatedContentIds: [],
    lessonId: 'JS-F-1131-LESSON',
    variants: [
      {
        id: 'retirer',
        label: 'Retirer',
        codeBlocks: [
          { id: 'JS-F-1131-t-v1', filename: 'splice.js', language: 'javascript', code: `liste.splice(index, 1); // retire 1 element a la position index` },
        ],
        replacements: [
          { token: 'index', description: 'la position où retirer (0 = premier)' },
          { token: '1', description: 'le nombre d’éléments à retirer' },
        ],
        placement: 'Pour supprimer un élément à une position connue.',
      },
      {
        id: 'inserer',
        label: 'Insérer',
        codeBlocks: [
          { id: 'JS-F-1131-t-v2', filename: 'splice.js', language: 'javascript', code: `liste.splice(index, 0, valeur); // insere valeur a la position index` },
        ],
        replacements: [
          { token: 'index', description: 'où insérer' },
          { token: 'valeur', description: 'ce que tu ajoutes' },
        ],
        placement: 'Le 0 = « ne retire rien, insère seulement ».',
      },
    ],
  }),

  lesson({
    id: 'JS-F-1132-LESSON',
    slug: 'join-tableau',
    title: 'join() : transformer un tableau en texte',
    shortTitle: 'join',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Coller tous les éléments d’un tableau en une seule chaîne, séparés par ce que tu veux (virgule, espace, tiret…). L’inverse de split().',
    utility: 'Afficher une liste sous forme de texte (ex. « pomme, poire, kiwi »).',
    aliases: ['join', 'tableau en texte', 'coller', 'separateur', 'liste en chaine', 'split'],
    keywords: ['join', 'separateur', 'tableau vers chaine', 'concatener liste', 'split inverse'],
    relatedContentIds: [],
    templateId: 'JS-F-1132-TEMPLATE',
    intro:
      '<code>join(separateur)</code> assemble tout un tableau en <b>une chaîne</b>, en intercalant le <b>séparateur</b> entre les éléments. Par défaut c’est une virgule. L’opération inverse (chaîne → tableau) est <code>split()</code>.',
    sections: [
      {
        id: 's1',
        title: 'Coller avec un séparateur',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'JS-F-1132-l-c1',
              filename: 'join.js',
              language: 'javascript',
              code: `const fruits = ['pomme', 'poire', 'kiwi'];

fruits.join();       // "pomme,poire,kiwi"  (virgule par defaut)
fruits.join(', ');   // "pomme, poire, kiwi"
fruits.join(' - ');  // "pomme - poire - kiwi"

// Inverse : d'une chaine vers un tableau
"a,b,c".split(',');  // ['a', 'b', 'c']`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le séparateur : <code>join()</code> met une <b>virgule</b> par défaut, pas un espace.',
      'Confondre <code>join()</code> (tableau → texte) et <code>split()</code> (texte → tableau).',
    ],
    takeaways: [
      '<code>join(sep)</code> = tableau → chaîne, avec <code>sep</code> entre les éléments',
      'par défaut, le séparateur est une <b>virgule</b>',
      'l’inverse est <code>split(sep)</code> : chaîne → tableau',
    ],
  }),
  template({
    id: 'JS-F-1132-TEMPLATE',
    slug: 'join-tableau',
    title: 'join()',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Assembler un tableau en une chaîne.',
    lede: 'Le code prêt à copier :',
    aliases: ['join', 'separateur'],
    keywords: ['join'],
    relatedContentIds: [],
    lessonId: 'JS-F-1132-LESSON',
    variants: [
      {
        id: 'join',
        label: 'Tableau → texte',
        codeBlocks: [
          { id: 'JS-F-1132-t-v1', filename: 'join.js', language: 'javascript', code: `const texte = liste.join(', ');` },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau' },
          { token: "', '", description: 'le séparateur entre les éléments (virgule, tiret, espace…)' },
        ],
        placement: 'Pour afficher un tableau sous forme lisible.',
      },
    ],
  }),

  lesson({
    id: 'JS-F-1133-LESSON',
    slug: 'concat-et-spread',
    title: 'Assembler des tableaux : concat() et le spread',
    shortTitle: 'concat / spread',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Réunir plusieurs tableaux en un seul, avec concat() ou l’opérateur spread […]. Les deux créent un nouveau tableau sans toucher aux originaux.',
    utility: 'Fusionner deux listes (ex. ajouter de nouveaux résultats aux anciens).',
    aliases: ['concat', 'spread', 'fusionner tableaux', 'assembler tableaux', 'reunir listes', 'trois points'],
    keywords: ['concat', 'spread', 'fusionner', 'assembler', 'operateur trois points', 'combiner tableaux'],
    relatedContentIds: [],
    templateId: 'JS-F-1133-TEMPLATE',
    intro:
      'Pour <b>réunir des tableaux</b>, deux façons : <code>a.concat(b)</code>, ou le <b>spread</b> <code>[...a, ...b]</code>. Les deux renvoient un <b>nouveau tableau</b> et ne modifient pas les originaux. Le spread est le plus courant aujourd’hui.',
    sections: [
      {
        id: 's1',
        title: 'concat() ou [...a, ...b]',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'JS-F-1133-l-c1',
              filename: 'concat.js',
              language: 'javascript',
              code: `const a = [1, 2];
const b = [3, 4];

a.concat(b);        // [1, 2, 3, 4]
[...a, ...b];       // [1, 2, 3, 4]  (spread, plus moderne)

// Le spread permet aussi d'ajouter un element au passage
[...a, 99, ...b];   // [1, 2, 99, 3, 4]`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>En React :</b> le spread est parfait pour mettre à jour un state sans le modifier : <code>setListe([...liste, nouveau])</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>push()</code> pour fusionner : ça modifie le tableau d’origine. <code>concat</code> / spread créent une copie.',
      'Oublier les <code>...</code> devant chaque tableau dans le spread : <code>[a, b]</code> crée un tableau de tableaux, pas une fusion.',
    ],
    takeaways: [
      '<code>a.concat(b)</code> ou <code>[...a, ...b]</code> réunissent deux tableaux',
      'les deux renvoient un <b>nouveau</b> tableau (originaux intacts)',
      'le <b>spread</b> <code>[...a, ...b]</code> est le plus courant',
      'idéal en React : <code>setListe([...liste, nouveau])</code>',
    ],
  }),
  template({
    id: 'JS-F-1133-TEMPLATE',
    slug: 'concat-et-spread',
    title: 'concat() et spread',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Fusionner des tableaux.',
    lede: 'Deux façons de réunir :',
    aliases: ['concat', 'spread', 'fusionner'],
    keywords: ['concat', 'spread'],
    relatedContentIds: [],
    lessonId: 'JS-F-1133-LESSON',
    variants: [
      {
        id: 'spread',
        label: 'Spread (moderne)',
        codeBlocks: [
          { id: 'JS-F-1133-t-v1', filename: 'fusion.js', language: 'javascript', code: `const tout = [...premiere, ...deuxieme];` },
        ],
        replacements: [
          { token: 'premiere', description: 'le premier tableau' },
          { token: 'deuxieme', description: 'le second tableau' },
        ],
        placement: 'La façon recommandée pour fusionner (et mettre à jour un state React).',
      },
      {
        id: 'concat',
        label: 'concat()',
        codeBlocks: [
          { id: 'JS-F-1133-t-v2', filename: 'fusion.js', language: 'javascript', code: `const tout = premiere.concat(deuxieme);` },
        ],
        replacements: [
          { token: 'premiere', description: 'le premier tableau' },
          { token: 'deuxieme', description: 'le second tableau' },
        ],
        placement: 'Équivalent, plus classique.',
      },
    ],
  }),

  lesson({
    id: 'JS-F-1134-LESSON',
    slug: 'reverse',
    title: 'reverse() : inverser l’ordre',
    shortTitle: 'reverse',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Retourner l’ordre des éléments d’un tableau. Attention : reverse() modifie le tableau d’origine.',
    utility: 'Afficher une liste du dernier au premier (ex. messages les plus récents en haut).',
    aliases: ['reverse', 'inverser', 'renverser', 'ordre inverse', 'dernier en premier'],
    keywords: ['reverse', 'inverser ordre', 'renverser tableau', 'du dernier au premier', 'modifie le tableau'],
    relatedContentIds: [],
    templateId: 'JS-F-1134-TEMPLATE',
    intro:
      '<code>reverse()</code> inverse l’<b>ordre</b> des éléments : le dernier devient le premier. ⚠️ Il <b>modifie le tableau d’origine</b>. Pour garder l’original, copie-le d’abord.',
    sections: [
      {
        id: 's1',
        title: 'Inverser (et garder l’original)',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'JS-F-1134-l-c1',
              filename: 'reverse.js',
              language: 'javascript',
              code: `const nums = [1, 2, 3];
nums.reverse();          // [3, 2, 1]  (nums est MODIFIE)

// Pour ne pas toucher l'original : on copie d'abord
const copie = [...nums].reverse();

// Astuce fréquente : trier PUIS inverser (ordre decroissant)
[5, 2, 9].sort((a, b) => a - b).reverse(); // [9, 5, 2]`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      '<code>reverse()</code> <b>modifie</b> le tableau d’origine : copie-le (<code>[...arr].reverse()</code>) si tu veux le garder.',
      'En React, ne jamais <code>reverse()</code> un state directement : passe par une copie.',
    ],
    takeaways: [
      '<code>reverse()</code> inverse l’ordre (dernier → premier)',
      '⚠️ il <b>modifie</b> le tableau d’origine',
      'pour garder l’original : <code>[...arr].reverse()</code>',
    ],
  }),
  template({
    id: 'JS-F-1134-TEMPLATE',
    slug: 'reverse',
    title: 'reverse()',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Inverser l’ordre d’un tableau.',
    lede: 'Le code prêt à copier :',
    aliases: ['reverse', 'inverser'],
    keywords: ['reverse'],
    relatedContentIds: [],
    lessonId: 'JS-F-1134-LESSON',
    variants: [
      {
        id: 'reverse',
        label: 'Inverser (copie)',
        codeBlocks: [
          { id: 'JS-F-1134-t-v1', filename: 'reverse.js', language: 'javascript', code: `const inverse = [...liste].reverse();` },
        ],
        replacements: [{ token: 'liste', description: 'ton tableau (la copie évite de modifier l’original)' }],
        placement: 'Pour afficher du dernier au premier sans casser l’ordre d’origine.',
      },
    ],
  }),
];
