import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const jsBasicsContent: ReadyContent[] = [
  // ————— Les types : nombre, texte et booléen —————
  lesson({
    id: 'JS-F-1100-LESSON',
    slug: 'les-types-nombre-texte-et-booleen',
    title: 'Les types : nombre, texte et booléen',
    shortTitle: 'Les types',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Les trois types de base pour stocker une donnée en JavaScript : un nombre, une chaîne de texte ou un booléen vrai/faux.',
    utility: 'Choisir la bonne façon de stocker une valeur selon ce qu’elle représente.',
    aliases: ['type', 'types', 'number', 'string', 'boolean', 'nombre', 'texte', 'booleen', 'variable'],
    keywords: [
      'stocker une valeur',
      'declarer une variable',
      'nombre ou texte',
      'vrai ou faux',
      'concatener du texte',
      'template literal',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1100-TEMPLATE',
    intro:
      'JavaScript range chaque valeur dans un <b>type</b>. Les trois plus courants : le <b>number</b> (un nombre), la <b>string</b> (du texte entre guillemets) et le <b>boolean</b> (<code>true</code> ou <code>false</code>).',
    sections: [
      {
        id: 's1',
        title: 'Déclarer une variable',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>stocker l’âge d’un utilisateur, son prénom et s’il est connecté</b> dans trois variables, pour les réutiliser plus loin.',
          },
          {
            type: 'paragraph',
            html: 'On déclare une variable avec <code>const</code> (valeur fixe) ou <code>let</code> (valeur qui changera). Le type est <b>déduit tout seul</b> selon ce qu’on met dedans.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1100-l-c1',
              filename: 'types.js',
              language: 'javascript',
              code: `// number : un nombre (entier ou decimal, sans guillemets)
const age = 25;
const prix = 19.9;

// string : du texte, TOUJOURS entre guillemets
const prenom = "Alice";

// boolean : vrai ou faux, rien d'autre
const estConnecte = true;

// let quand la valeur va changer plus tard
let score = 0;
score = 10;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> utilise <code>const</code> par défaut. Passe à <code>let</code> uniquement si tu comptes réassigner la variable. On n’utilise plus <code>var</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Assembler du texte',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour insérer une variable dans du texte, le plus lisible est le <b>template literal</b> : des accents graves (backticks) et la variable entre accolades précédées d’un dollar.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1100-l-c2',
              filename: 'types.js',
              language: 'javascript',
              code: `const prenom = "Alice";
const age = 25;

// Ancienne facon : concatenation avec le +
const message = "Bonjour " + prenom + ", tu as " + age + " ans";

// Facon moderne : template literal (accents graves)
// -> on ecrit la variable dans accolades precedees d'un dollar
const moderne = "Bonjour, tu as ton age ans"; // voir le template pour la vraie syntaxe

// Verifier le type d'une valeur
console.log(typeof prenom); // "string"
console.log(typeof age);    // "number"`,
            },
          },
          {
            type: 'table',
            headers: ['Type', 'Exemple', 'À quoi ça sert'],
            rows: [
              ['<code>number</code>', '<code>25</code>, <code>19.9</code>', 'compter, calculer'],
              ['<code>string</code>', '<code>"Alice"</code>', 'du texte'],
              ['<code>boolean</code>', '<code>true</code> / <code>false</code>', 'un état vrai/faux'],
              ['<code>typeof</code>', '<code>typeof x</code>', 'connaître le type d’une valeur'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un type, c’est l’étiquette d’un carton de déménagement. Un carton « vaisselle » (number) et un carton « livres » (string) ne se manipulent pas pareil, même si les deux sont des cartons.',
          },
        ],
      },
    ],
    pitfalls: [
      'Écrire un nombre entre guillemets (<code>"25"</code>) : c’est une <b>string</b>, pas un number. <code>"25" + 1</code> donne <code>"251"</code>, pas <code>26</code>.',
      'Confondre <code>=</code> (assigner une valeur) et <code>===</code> (comparer). Dans une variable, c’est toujours un seul <code>=</code>.',
      'Réassigner une variable déclarée avec <code>const</code> : ça lève une erreur. Utilise <code>let</code> si la valeur doit changer.',
    ],
    takeaways: [
      '<code>const</code> par défaut · <code>let</code> si la valeur change · plus de <code>var</code>',
      '3 types de base : <code>number</code> · <code>string</code> (guillemets) · <code>boolean</code> (<code>true</code>/<code>false</code>)',
      'assembler du texte : template literal (accents graves) plutôt que <code>+</code>',
      '<code>typeof x</code> révèle le type d’une valeur',
    ],
  }),
  template({
    id: 'JS-F-1100-TEMPLATE',
    slug: 'les-types-nombre-texte-et-booleen',
    title: 'Les types',
    shortTitle: 'Les types',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Déclarer une variable selon son type : nombre, texte, booléen, ou texte assemblé.',
    lede: 'Stocker une valeur. Choisis le type de donnée :',
    aliases: ['type', 'number', 'string', 'boolean', 'const', 'let'],
    keywords: ['nombre', 'texte', 'booleen', 'template literal'],
    relatedContentIds: [],
    lessonId: 'JS-F-1100-LESSON',
    variants: [
      {
        id: 'JS-F-1100-v-nombre',
        label: 'Nombre',
        codeBlocks: [
          {
            id: 'JS-F-1100-t-nombre',
            filename: 'types.js',
            language: 'javascript',
            code: `const age = 25;
let score = 0;`,
          },
        ],
        replacements: [
          { token: 'age', description: 'le nom de ta variable' },
          { token: '25', description: 'la valeur de départ (un nombre)' },
        ],
        placement: 'Pour tout ce qui se compte ou se calcule. Pas de guillemets autour d’un nombre.',
      },
      {
        id: 'JS-F-1100-v-texte',
        label: 'Texte',
        codeBlocks: [
          {
            id: 'JS-F-1100-t-texte',
            filename: 'types.js',
            language: 'javascript',
            code: `const prenom = "Alice";`,
          },
        ],
        replacements: [
          { token: 'prenom', description: 'le nom de ta variable' },
          { token: '"Alice"', description: 'le texte, entre guillemets simples ou doubles' },
        ],
        placement: 'Pour du texte. Toujours entre guillemets, sinon JavaScript croit à un nom de variable.',
      },
      {
        id: 'JS-F-1100-v-booleen',
        label: 'Booléen',
        codeBlocks: [
          {
            id: 'JS-F-1100-t-booleen',
            filename: 'types.js',
            language: 'javascript',
            code: `const estConnecte = true;
const estVide = false;`,
          },
        ],
        replacements: [
          { token: 'estConnecte', description: 'le nom de ton booléen (souvent préfixé est/a/peut)' },
          { token: 'true', description: 'la valeur : true ou false uniquement' },
        ],
        placement: 'Pour un état oui/non. Idéal dans les conditions : if (estConnecte) { ... }.',
      },
      {
        id: 'JS-F-1100-v-literal',
        label: 'Texte assemblé',
        description: 'Insérer une variable dans une chaîne',
        codeBlocks: [
          {
            id: 'JS-F-1100-t-literal',
            filename: 'types.js',
            language: 'javascript',
            code: `const prenom = "Alice";

// Accents graves + variable entre accolades precedees d'un dollar
const message = "Bonjour " + prenom + " !";`,
          },
        ],
        replacements: [
          { token: 'prenom', description: 'la variable à insérer dans le texte' },
          { token: 'Bonjour', description: 'le texte fixe autour de la variable' },
        ],
        placement: 'Quand tu mélanges texte fixe et variables. Le template literal évite les enchaînements de +.',
      },
    ],
  }),

  // ————— Les conditions : if et else —————
  lesson({
    id: 'JS-F-1101-LESSON',
    slug: 'les-conditions-if-et-else',
    title: 'Les conditions : if et else',
    shortTitle: 'if / else',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Exécuter du code seulement si une condition est vraie, et prévoir un plan B avec else.',
    utility: 'Faire réagir ton code différemment selon la situation.',
    aliases: ['if', 'else', 'else if', 'condition', 'si', 'sinon', 'test'],
    keywords: [
      'executer si vrai',
      'sinon faire autre chose',
      'plusieurs cas',
      'tester une valeur',
      'brancher le code',
      'condition multiple',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1101-TEMPLATE',
    intro:
      'Une <b>condition</b> exécute un bloc de code <b>seulement si</b> un test est vrai. <code>if</code> teste, <code>else if</code> ajoute d’autres cas, et <code>else</code> attrape tout le reste.',
    sections: [
      {
        id: 's1',
        title: 'if et else',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher « Majeur » si l’âge est d’au moins 18 ans, et « Mineur » sinon</b>.',
          },
          {
            type: 'paragraph',
            html: 'On met le test entre parenthèses après <code>if</code>. Si le test est <b>vrai</b>, le premier bloc s’exécute ; sinon, c’est le bloc <code>else</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1101-l-c1',
              filename: 'conditions.js',
              language: 'javascript',
              code: `const age = 20;

// Si la condition entre parentheses est vraie...
if (age >= 18) {
  console.log("Majeur"); // ...ce bloc s'execute
} else {
  console.log("Mineur"); // sinon, c'est celui-ci
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> le test compare avec <code>===</code> (égal), <code>&gt;=</code>, <code>&lt;</code>, etc. Un seul <code>=</code> <b>assigne</b> une valeur, il ne compare pas.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Enchaîner plusieurs cas',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour plus de deux cas, on enchaîne avec <code>else if</code>. JavaScript teste de haut en bas et <b>s’arrête au premier vrai</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1101-l-c2',
              filename: 'conditions.js',
              language: 'javascript',
              code: `const note = 14;

if (note >= 16) {
  console.log("Tres bien");
} else if (note >= 12) {
  console.log("Bien");       // ce cas est retenu
} else if (note >= 10) {
  console.log("Passable");
} else {
  console.log("Insuffisant"); // aucun cas au-dessus n'a matche
}`,
            },
          },
          {
            type: 'table',
            headers: ['Mot-clé', 'Rôle'],
            rows: [
              ['<code>if</code>', 'teste une première condition'],
              ['<code>else if</code>', 'teste un autre cas si le précédent a échoué'],
              ['<code>else</code>', 'attrape tout le reste (aucun test)'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un aiguillage de train. Le train descend les rails un par un ; dès qu’un aiguillage s’ouvre (condition vraie), il part sur cette voie et ignore les suivantes.',
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>=</code> au lieu de <code>===</code> dans le test : <code>if (x = 5)</code> assigne 5 et vaut toujours vrai. Compare avec <code>===</code>.',
      'Multiplier les <code>if</code> séparés là où un <code>else if</code> suffirait : plusieurs blocs peuvent alors s’exécuter en même temps.',
      'Oublier les accolades sur un <code>if</code> multi-lignes : seule la première ligne serait conditionnée.',
    ],
    takeaways: [
      '<code>if (condition) { ... }</code> exécute le bloc seulement si le test est vrai',
      '<code>else</code> = le plan B · <code>else if</code> = un cas intermédiaire',
      'comparer avec <code>===</code>, <code>&gt;=</code>, <code>&lt;</code>… jamais un seul <code>=</code>',
      'l’enchaînement s’arrête au <b>premier</b> cas vrai',
    ],
  }),
  template({
    id: 'JS-F-1101-TEMPLATE',
    slug: 'les-conditions-if-et-else',
    title: 'if / else',
    shortTitle: 'if / else',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le squelette d’une condition : simple, avec else, ou avec plusieurs cas.',
    lede: 'Brancher ton code selon un test. Choisis le cas :',
    aliases: ['if', 'else', 'else if', 'condition'],
    keywords: ['si', 'sinon', 'plusieurs cas'],
    relatedContentIds: [],
    lessonId: 'JS-F-1101-LESSON',
    variants: [
      {
        id: 'JS-F-1101-v-simple',
        label: 'if seul',
        codeBlocks: [
          {
            id: 'JS-F-1101-t-simple',
            filename: 'conditions.js',
            language: 'javascript',
            code: `if (condition) {
  // code execute si la condition est vraie
}`,
          },
        ],
        replacements: [
          { token: 'condition', description: 'le test à évaluer (ex. age >= 18)' },
        ],
        placement: 'Quand tu veux agir seulement dans un cas, sans plan B.',
      },
      {
        id: 'JS-F-1101-v-else',
        label: 'if / else',
        codeBlocks: [
          {
            id: 'JS-F-1101-t-else',
            filename: 'conditions.js',
            language: 'javascript',
            code: `if (condition) {
  // cas vrai
} else {
  // cas faux
}`,
          },
        ],
        replacements: [
          { token: 'condition', description: 'le test à évaluer' },
        ],
        placement: 'Quand il y a exactement deux issues : soit l’une, soit l’autre.',
      },
      {
        id: 'JS-F-1101-v-multi',
        label: 'Plusieurs cas',
        codeBlocks: [
          {
            id: 'JS-F-1101-t-multi',
            filename: 'conditions.js',
            language: 'javascript',
            code: `if (condition1) {
  // premier cas
} else if (condition2) {
  // deuxieme cas
} else {
  // tout le reste
}`,
          },
        ],
        replacements: [
          { token: 'condition1', description: 'le premier test (le plus prioritaire)' },
          { token: 'condition2', description: 'le test suivant si le premier échoue' },
        ],
        placement: 'Pour trois issues ou plus. Au-delà de 3-4 cas sur une même valeur, préfère switch.',
      },
    ],
  }),

  // ————— Les boucles : for et while —————
  lesson({
    id: 'JS-F-1102-LESSON',
    slug: 'les-boucles-for-et-while',
    title: 'Les boucles : for et while',
    shortTitle: 'for / while',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Répéter du code plusieurs fois : un nombre connu de tours avec for, ou tant qu’une condition tient avec while.',
    utility: 'Répéter une action sans copier-coller le même code.',
    aliases: ['for', 'while', 'boucle', 'loop', 'repeter', 'iterer', 'for of'],
    keywords: [
      'repeter du code',
      'parcourir un tableau',
      'compter de 0 a n',
      'tant que',
      'iteration',
      'boucler',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1102-TEMPLATE',
    intro:
      'Une <b>boucle</b> répète un bloc de code. <code>for</code> sert quand on connaît le <b>nombre de tours</b>, <code>while</code> quand on répète <b>tant qu’une condition</b> reste vraie.',
    sections: [
      {
        id: 's1',
        title: 'La boucle for',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher les nombres de 1 à 5</b> sans écrire cinq lignes identiques.',
          },
          {
            type: 'paragraph',
            html: 'La boucle <code>for</code> a trois parties : le <b>départ</b>, la <b>condition</b> (tant qu’elle est vraie on continue) et le <b>pas</b> (ce qu’on fait à chaque tour).',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1102-l-c1',
              filename: 'boucles.js',
              language: 'javascript',
              code: `// depart ; condition ; pas
for (let i = 1; i <= 5; i++) {
  console.log(i); // 1, puis 2, ... jusqu'a 5
}
// i commence a 1, on continue tant que i <= 5,
// et i++ ajoute 1 a chaque tour`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> par habitude, le compteur s’appelle <code>i</code> (index). Pour des boucles imbriquées, on continue avec <code>j</code> puis <code>k</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Parcourir un tableau',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour parcourir chaque élément d’un tableau, <code>for...of</code> est le plus lisible : il te donne directement chaque valeur, sans gérer d’index.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1102-l-c2',
              filename: 'boucles.js',
              language: 'javascript',
              code: `const fruits = ["pomme", "poire", "kiwi"];

// for...of : chaque tour donne un element
for (const fruit of fruits) {
  console.log(fruit); // "pomme", puis "poire", puis "kiwi"
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>for</code> classique = tu comptes les marches d’un escalier (1, 2, 3…). <code>for...of</code> = tu sors les objets d’un carton un par un sans compter.',
          },
        ],
      },
      {
        id: 's3',
        title: 'La boucle while',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>while</code> répète <b>tant que</b> sa condition est vraie. Utile quand on ne connaît pas le nombre de tours à l’avance. Attention : il faut que la condition finisse par devenir fausse.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1102-l-c3',
              filename: 'boucles.js',
              language: 'javascript',
              code: `let compte = 3;

// tant que compte est superieur a 0
while (compte > 0) {
  console.log(compte); // 3, 2, 1
  compte--;            // ESSENTIEL : rapproche de la sortie
}
console.log("Decollage !");`,
            },
          },
          {
            type: 'table',
            headers: ['Boucle', 'Quand l’utiliser'],
            rows: [
              ['<code>for</code>', 'nombre de tours connu (0 à n)'],
              ['<code>for...of</code>', 'parcourir les éléments d’un tableau'],
              ['<code>while</code>', 'répéter tant qu’une condition tient'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier de faire évoluer la condition d’un <code>while</code> (le <code>compte--</code>) : la boucle tourne à l’infini et fige la page.',
      'Se tromper sur <code>&lt;</code> et <code>&lt;=</code> dans un <code>for</code> : un tour de trop ou de moins (erreur classique dite « off-by-one »).',
      'Modifier la longueur d’un tableau pendant qu’on le parcourt : les index se décalent et des éléments sont sautés.',
    ],
    takeaways: [
      '<code>for (let i = 0; i &lt; n; i++)</code> = un nombre de tours connu',
      '<code>for...of</code> = parcourir chaque élément d’un tableau, sans index',
      '<code>while (condition)</code> = répéter tant que c’est vrai',
      'toujours faire évoluer la condition, sinon boucle infinie',
    ],
  }),
  template({
    id: 'JS-F-1102-TEMPLATE',
    slug: 'les-boucles-for-et-while',
    title: 'for / while',
    shortTitle: 'for / while',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Répéter du code : for classique, for...of sur un tableau, ou while.',
    lede: 'Répéter une action. Choisis la boucle :',
    aliases: ['for', 'while', 'for of', 'boucle'],
    keywords: ['repeter', 'parcourir', 'compteur'],
    relatedContentIds: [],
    lessonId: 'JS-F-1102-LESSON',
    variants: [
      {
        id: 'JS-F-1102-v-for',
        label: 'for classique',
        codeBlocks: [
          {
            id: 'JS-F-1102-t-for',
            filename: 'boucles.js',
            language: 'javascript',
            code: `for (let i = 0; i < 10; i++) {
  console.log(i);
}`,
          },
        ],
        replacements: [
          { token: '0', description: 'la valeur de départ du compteur' },
          { token: '10', description: 'la limite (on s’arrête avant cette valeur)' },
        ],
        placement: 'Quand tu connais le nombre de tours ou que tu as besoin de l’index i.',
      },
      {
        id: 'JS-F-1102-v-of',
        label: 'for...of',
        codeBlocks: [
          {
            id: 'JS-F-1102-t-of',
            filename: 'boucles.js',
            language: 'javascript',
            code: `for (const element of liste) {
  console.log(element);
}`,
          },
        ],
        replacements: [
          { token: 'element', description: 'le nom donné à l’élément courant' },
          { token: 'liste', description: 'le tableau à parcourir' },
        ],
        placement: 'La façon la plus lisible pour parcourir chaque élément d’un tableau.',
      },
      {
        id: 'JS-F-1102-v-while',
        label: 'while',
        codeBlocks: [
          {
            id: 'JS-F-1102-t-while',
            filename: 'boucles.js',
            language: 'javascript',
            code: `let i = 0;

while (i < 10) {
  console.log(i);
  i++; // fait avancer vers la sortie
}`,
          },
        ],
        replacements: [
          { token: 'i < 10', description: 'la condition de poursuite (tant qu’elle est vraie)' },
          { token: 'i++', description: 'la ligne qui rapproche de la fin (indispensable)' },
        ],
        placement: 'Quand le nombre de tours dépend d’une condition, pas d’un compteur fixe.',
      },
    ],
  }),

  // ————— Les fonctions fléchées —————
  lesson({
    id: 'JS-F-1103-LESSON',
    slug: 'les-fonctions-flechees',
    title: 'Les fonctions fléchées',
    shortTitle: 'Fonctions fléchées',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Écrire une fonction de façon courte avec la syntaxe fléchée, avec ou sans return implicite.',
    utility: 'Créer une fonction concise, notamment pour les handlers et les callbacks.',
    aliases: ['arrow function', 'fonction flechee', 'fleche', '=>', 'callback', 'fonction anonyme'],
    keywords: [
      'ecrire une fonction',
      'fonction courte',
      'return implicite',
      'passer une fonction',
      'callback',
      'handler',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1103-TEMPLATE',
    intro:
      'Une <b>fonction fléchée</b> est une écriture courte d’une fonction, avec la flèche <code>=&gt;</code>. On la croise partout en React (handlers, <code>map</code>, <code>filter</code>…).',
    sections: [
      {
        id: 's1',
        title: 'De la fonction classique à la flèche',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>une petite fonction qui double un nombre</b>, la plus courte possible à écrire.',
          },
          {
            type: 'paragraph',
            html: 'La fonction fléchée se stocke souvent dans une <code>const</code>. Les paramètres vont entre parenthèses, puis la flèche <code>=&gt;</code>, puis le corps.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1103-l-c1',
              filename: 'fonctions.js',
              language: 'javascript',
              code: `// Fonction classique
function doubler(n) {
  return n * 2;
}

// Meme chose en fonction flechee
const doublerFleche = (n) => {
  return n * 2;
};

console.log(doublerFleche(5)); // 10`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> en JavaScript moderne, on utilise la fonction fléchée pour les fonctions courtes et les callbacks. On la stocke dans une <code>const</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le return implicite',
        blocks: [
          {
            type: 'paragraph',
            html: 'Si le corps tient sur <b>une seule expression</b>, on peut retirer les accolades et le mot <code>return</code> : la valeur est renvoyée automatiquement. C’est le <b>return implicite</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1103-l-c2',
              filename: 'fonctions.js',
              language: 'javascript',
              code: `// Avec accolades : return explicite
const doubler = (n) => {
  return n * 2;
};

// Sur une ligne : accolades et return retires
const doublerCourt = (n) => n * 2;

// Un seul parametre : les parentheses sont optionnelles
const doublerTresCourt = n => n * 2;

// Zero parametre : parentheses vides obligatoires
const direBonjour = () => "Bonjour";`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'return ?'],
            rows: [
              ['<code>(n) =&gt; { return n * 2; }</code>', 'explicite (accolades)'],
              ['<code>(n) =&gt; n * 2</code>', 'implicite (une expression)'],
              ['<code>() =&gt; "Bonjour"</code>', 'implicite, sans paramètre'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> les accolades sont un tiroir. Avec le tiroir, tu dois sortir la valeur à la main (<code>return</code>). Sans tiroir, la valeur est déjà posée sur la table.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre des accolades <b>et</b> attendre un return implicite : <code>(n) =&gt; { n * 2 }</code> ne renvoie rien. Ajoute <code>return</code>, ou retire les accolades.',
      'Vouloir renvoyer un objet en implicite : <code>() =&gt; { a: 1 }</code> est vu comme un bloc. Entoure-le de parenthèses : <code>() =&gt; ({ a: 1 })</code>.',
      'Oublier les parenthèses vides quand il n’y a aucun paramètre : elles restent obligatoires.',
    ],
    takeaways: [
      'syntaxe : <code>const nom = (params) =&gt; { ... }</code>',
      'corps sur une expression → return implicite : <code>(n) =&gt; n * 2</code>',
      'un seul paramètre → parenthèses optionnelles · zéro paramètre → <code>()</code> obligatoire',
      'renvoyer un objet en implicite → l’entourer de parenthèses <code>({ ... })</code>',
    ],
  }),
  template({
    id: 'JS-F-1103-TEMPLATE',
    slug: 'les-fonctions-flechees',
    title: 'Fonctions fléchées',
    shortTitle: 'Fléchées',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'La syntaxe fléchée : return explicite, return implicite, ou sans paramètre.',
    lede: 'Écrire une fonction courte. Choisis la forme :',
    aliases: ['arrow function', 'fonction flechee', '=>', 'callback'],
    keywords: ['fleche', 'return implicite', 'handler'],
    relatedContentIds: [],
    lessonId: 'JS-F-1103-LESSON',
    variants: [
      {
        id: 'JS-F-1103-v-bloc',
        label: 'Avec accolades',
        codeBlocks: [
          {
            id: 'JS-F-1103-t-bloc',
            filename: 'fonctions.js',
            language: 'javascript',
            code: `const maFonction = (param) => {
  // plusieurs lignes possibles
  return param * 2;
};`,
          },
        ],
        replacements: [
          { token: 'maFonction', description: 'le nom de ta fonction' },
          { token: 'param', description: 'le ou les paramètres' },
        ],
        placement: 'Quand le corps fait plusieurs lignes. Le return est alors obligatoire.',
      },
      {
        id: 'JS-F-1103-v-implicite',
        label: 'Return implicite',
        codeBlocks: [
          {
            id: 'JS-F-1103-t-implicite',
            filename: 'fonctions.js',
            language: 'javascript',
            code: `const maFonction = (param) => param * 2;`,
          },
        ],
        replacements: [
          { token: 'maFonction', description: 'le nom de ta fonction' },
          { token: 'param * 2', description: 'l’expression renvoyée automatiquement' },
        ],
        placement: 'Quand tout tient sur une expression. Parfait pour map, filter, callbacks.',
      },
      {
        id: 'JS-F-1103-v-sans-param',
        label: 'Sans paramètre',
        codeBlocks: [
          {
            id: 'JS-F-1103-t-sans-param',
            filename: 'fonctions.js',
            language: 'javascript',
            code: `const handleClick = () => {
  console.log("Clic !");
};`,
          },
        ],
        replacements: [
          { token: 'handleClick', description: 'le nom de ta fonction (souvent un handler)' },
        ],
        placement: 'Pour un handler d’événement sans argument. Les parenthèses vides restent obligatoires.',
      },
    ],
  }),

  // ————— Le ternaire : condition ? a : b —————
  lesson({
    id: 'JS-F-1104-LESSON',
    slug: 'le-ternaire-condition-a-b',
    title: 'Le ternaire : condition ? a : b',
    shortTitle: 'Ternaire',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Choisir entre deux valeurs sur une seule ligne, avec l’opérateur ternaire condition ? a : b.',
    utility: 'Choisir une valeur parmi deux, en une expression compacte.',
    aliases: ['ternaire', 'ternary', 'condition ? :', 'operateur conditionnel', 'if court'],
    keywords: [
      'condition sur une ligne',
      'choisir entre deux',
      'if inline',
      'afficher selon',
      'valeur conditionnelle',
      'jsx condition',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1104-TEMPLATE',
    intro:
      'Le <b>ternaire</b> renvoie une valeur parmi deux selon un test : <code>condition ? valeurSiVrai : valeurSiFaux</code>. C’est un <code>if/else</code> condensé en une <b>expression</b>.',
    sections: [
      {
        id: 's1',
        title: 'La syntaxe',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>ranger « Majeur » ou « Mineur » dans une variable</b> selon l’âge, en une seule ligne.',
          },
          {
            type: 'paragraph',
            html: 'On lit le ternaire ainsi : « <b>si</b> la condition, <b>alors</b> la valeur avant les deux-points, <b>sinon</b> celle après ». Le <code>?</code> ouvre, le <code>:</code> sépare les deux issues.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1104-l-c1',
              filename: 'ternaire.js',
              language: 'javascript',
              code: `const age = 20;

// condition ? valeur si vrai : valeur si faux
const statut = age >= 18 ? "Majeur" : "Mineur";

console.log(statut); // "Majeur"

// L'equivalent en if/else, plus long :
let statut2;
if (age >= 18) {
  statut2 = "Majeur";
} else {
  statut2 = "Mineur";
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> le ternaire <b>renvoie</b> une valeur, donc il se met dans une variable, un <code>return</code> ou du JSX. Un <code>if</code>, lui, ne renvoie rien.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le ternaire dans le JSX',
        blocks: [
          {
            type: 'paragraph',
            html: 'C’est l’outil idéal en React pour afficher <b>une chose ou une autre</b> directement dans le rendu, là où un <code>if</code> ne passe pas.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1104-l-c2',
              filename: 'Profil.jsx',
              language: 'jsx',
              code: `function Profil({ estConnecte }) {
  return (
    <div>
      {/* selon estConnecte, on affiche un texte ou l'autre */}
      {estConnecte ? <p>Bienvenue !</p> : <p>Connecte-toi</p>}
    </div>
  );
}`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Signifie'],
            rows: [
              ['<code>condition</code>', 'le test évalué'],
              ['<code>?</code>', 'ouvre le choix'],
              ['<code>valeurSiVrai</code>', 'renvoyée si le test est vrai'],
              ['<code>:</code>', 'sépare les deux issues'],
              ['<code>valeurSiFaux</code>', 'renvoyée sinon'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Empiler plusieurs ternaires imbriqués : vite illisible. Au-delà de deux issues, repasse à <code>if/else</code> ou <code>switch</code>.',
      'Vouloir juste exécuter du code (pas renvoyer de valeur) avec un ternaire : utilise un <code>if</code>. Le ternaire sert à <b>choisir une valeur</b>.',
      'Oublier le <code>:</code> et l’issue « sinon » : un ternaire a toujours <b>deux</b> branches, contrairement à un <code>if</code> seul.',
    ],
    takeaways: [
      'syntaxe : <code>condition ? valeurSiVrai : valeurSiFaux</code>',
      'c’est une <b>expression</b> : elle renvoie une valeur (variable, return, JSX)',
      'idéal pour afficher une chose ou une autre dans le JSX',
      'pour plus de deux cas : reviens à <code>if/else</code> ou <code>switch</code>',
    ],
  }),
  template({
    id: 'JS-F-1104-TEMPLATE',
    slug: 'le-ternaire-condition-a-b',
    title: 'Ternaire',
    shortTitle: 'Ternaire',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'L’opérateur ternaire : dans une variable, dans le JSX, ou pour un affichage conditionnel.',
    lede: 'Choisir entre deux valeurs. Choisis le cas :',
    aliases: ['ternaire', 'condition ? :', 'if court'],
    keywords: ['une ligne', 'jsx', 'choisir'],
    relatedContentIds: [],
    lessonId: 'JS-F-1104-LESSON',
    variants: [
      {
        id: 'JS-F-1104-v-variable',
        label: 'Dans une variable',
        codeBlocks: [
          {
            id: 'JS-F-1104-t-variable',
            filename: 'ternaire.js',
            language: 'javascript',
            code: `const statut = age >= 18 ? "Majeur" : "Mineur";`,
          },
        ],
        replacements: [
          { token: 'age >= 18', description: 'la condition à tester' },
          { token: '"Majeur"', description: 'la valeur si vrai' },
          { token: '"Mineur"', description: 'la valeur si faux' },
        ],
        placement: 'Pour ranger dans une variable l’une de deux valeurs selon un test.',
      },
      {
        id: 'JS-F-1104-v-jsx',
        label: 'Dans le JSX',
        codeBlocks: [
          {
            id: 'JS-F-1104-t-jsx',
            filename: 'Composant.jsx',
            language: 'jsx',
            code: `{estConnecte ? <p>Bienvenue</p> : <p>Connecte-toi</p>}`,
          },
        ],
        replacements: [
          { token: 'estConnecte', description: 'la condition à tester' },
          { token: '<p>Bienvenue</p>', description: 'ce qui s’affiche si vrai' },
          { token: '<p>Connecte-toi</p>', description: 'ce qui s’affiche sinon' },
        ],
        placement: 'Dans le rendu React, entre accolades, pour afficher un élément ou un autre.',
      },
      {
        id: 'JS-F-1104-v-court',
        label: 'Afficher si vrai',
        description: 'Avec && quand il n’y a pas de « sinon »',
        codeBlocks: [
          {
            id: 'JS-F-1104-t-court',
            filename: 'Composant.jsx',
            language: 'jsx',
            code: `{estAdmin && <button>Supprimer</button>}`,
          },
        ],
        replacements: [
          { token: 'estAdmin', description: 'la condition à tester' },
          { token: '<button>Supprimer</button>', description: 'ce qui s’affiche seulement si vrai' },
        ],
        placement: 'Quand il n’y a rien à afficher dans le cas faux : le && évite un ternaire avec null.',
      },
    ],
  }),

  // ————— switch —————
  lesson({
    id: 'JS-F-1105-LESSON',
    slug: 'switch',
    title: 'switch',
    shortTitle: 'switch',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Comparer une même valeur à plusieurs cas de façon lisible, avec case, break et default.',
    utility: 'Brancher proprement selon la valeur d’une variable, sans empiler les else if.',
    aliases: ['switch', 'case', 'break', 'default', 'aiguillage', 'switch case'],
    keywords: [
      'plusieurs cas',
      'comparer une valeur',
      'remplacer else if',
      'menu de choix',
      'branchement',
      'default',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1105-TEMPLATE',
    intro:
      'Le <b>switch</b> compare une valeur à une liste de <code>case</code>. C’est plus lisible qu’une longue chaîne de <code>else if</code> quand on teste <b>la même variable</b>.',
    sections: [
      {
        id: 's1',
        title: 'La structure de base',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher un message différent selon le rôle</b> de l’utilisateur : admin, éditeur ou visiteur.',
          },
          {
            type: 'paragraph',
            html: 'On donne la variable à <code>switch</code>, puis un <code>case</code> par valeur possible. Le <code>break</code> stoppe après le bon cas, et <code>default</code> gère tout le reste.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1105-l-c1',
              filename: 'switch.js',
              language: 'javascript',
              code: `const role = "editeur";

switch (role) {
  case "admin":
    console.log("Acces total");
    break; // stoppe ici
  case "editeur":
    console.log("Peut modifier"); // ce cas matche
    break;
  default:
    console.log("Lecture seule"); // aucun case ci-dessus
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> chaque <code>case</code> se termine par <code>break</code>. Le <code>switch</code> compare avec <code>===</code> (égalité stricte, type compris).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le rôle du break et de default',
        blocks: [
          {
            type: 'paragraph',
            html: 'Sans <code>break</code>, l’exécution <b>continue sur le cas suivant</b> (le « fall-through »). On peut s’en servir volontairement pour <b>regrouper</b> plusieurs valeurs sur un même traitement.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1105-l-c2',
              filename: 'switch.js',
              language: 'javascript',
              code: `const jour = "samedi";

switch (jour) {
  case "samedi":
  case "dimanche":
    // pas de break au-dessus : les deux cas partagent ce code
    console.log("Week-end");
    break;
  default:
    console.log("Jour de semaine");
}`,
            },
          },
          {
            type: 'table',
            headers: ['Mot-clé', 'Rôle'],
            rows: [
              ['<code>switch (x)</code>', 'la valeur à comparer'],
              ['<code>case v:</code>', 'un cas possible (comparé avec <code>===</code>)'],
              ['<code>break</code>', 'stoppe le switch après le cas'],
              ['<code>default</code>', 'exécuté si aucun case ne correspond'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un distributeur de boissons. Tu appuies sur un bouton (la valeur), le bon produit tombe (<code>case</code>), et <code>default</code> c’est le message « produit indisponible ».',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>break</code> : l’exécution déborde sur les cas suivants et plusieurs blocs s’exécutent sans le vouloir.',
      'Oublier <code>default</code> : si aucune valeur ne correspond, rien ne se passe et le bug est silencieux.',
      'Utiliser <code>switch</code> pour des intervalles (<code>note &gt;= 12</code>) : il compare des égalités exactes. Pour des plages, reste sur <code>if/else if</code>.',
    ],
    takeaways: [
      'idéal quand on compare <b>une même variable</b> à plusieurs valeurs exactes',
      'chaque <code>case</code> se termine par <code>break</code>',
      '<code>default</code> = le cas « aucun des précédents »',
      'plusieurs <code>case</code> collés (sans break) = un traitement partagé',
    ],
  }),
  template({
    id: 'JS-F-1105-TEMPLATE',
    slug: 'switch',
    title: 'switch',
    shortTitle: 'switch',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le squelette d’un switch : cas simples, ou plusieurs valeurs regroupées.',
    lede: 'Comparer une valeur à plusieurs cas. Choisis le modèle :',
    aliases: ['switch', 'case', 'break', 'default'],
    keywords: ['plusieurs cas', 'aiguillage'],
    relatedContentIds: [],
    lessonId: 'JS-F-1105-LESSON',
    variants: [
      {
        id: 'JS-F-1105-v-base',
        label: 'switch de base',
        codeBlocks: [
          {
            id: 'JS-F-1105-t-base',
            filename: 'switch.js',
            language: 'javascript',
            code: `switch (valeur) {
  case "a":
    // traitement du cas "a"
    break;
  case "b":
    // traitement du cas "b"
    break;
  default:
    // aucun cas ci-dessus
}`,
          },
        ],
        replacements: [
          { token: 'valeur', description: 'la variable à comparer' },
          { token: '"a"', description: 'la première valeur attendue' },
          { token: '"b"', description: 'la deuxième valeur attendue' },
        ],
        placement: 'Le cas courant : un traitement distinct par valeur, chacun clos par break.',
      },
      {
        id: 'JS-F-1105-v-groupe',
        label: 'Cas regroupés',
        codeBlocks: [
          {
            id: 'JS-F-1105-t-groupe',
            filename: 'switch.js',
            language: 'javascript',
            code: `switch (valeur) {
  case "samedi":
  case "dimanche":
    // code partage par les deux valeurs
    break;
  default:
    // le reste
}`,
          },
        ],
        replacements: [
          { token: 'valeur', description: 'la variable à comparer' },
          { token: '"samedi"', description: 'la première valeur du groupe' },
          { token: '"dimanche"', description: 'la deuxième valeur du groupe' },
        ],
        placement: 'Quand plusieurs valeurs doivent déclencher le même code : on colle les case sans break.',
      },
    ],
  }),

  // ————— Les opérateurs : égalité, et, ou, optional chaining —————
  lesson({
    id: 'JS-F-1106-LESSON',
    slug: 'les-operateurs-egalite-et-ou-optional-chaining',
    title: 'Les opérateurs : égalité, et, ou, optional chaining',
    shortTitle: 'Opérateurs',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Les opérateurs du quotidien : comparer (===), combiner des conditions (&& / ||) et accéder sans planter (?.).',
    utility: 'Comparer des valeurs et combiner des conditions sans se faire piéger.',
    aliases: [
      'operateur',
      'egalite',
      'triple egal',
      'et logique',
      'ou logique',
      'optional chaining',
      '&&',
      '||',
      '?.',
      '??',
    ],
    keywords: [
      'comparer deux valeurs',
      'egalite stricte',
      'combiner conditions',
      'et ou',
      'eviter undefined',
      'valeur par defaut',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1106-TEMPLATE',
    intro:
      'Quatre familles d’opérateurs reviennent sans cesse : l’<b>égalité</b> (<code>===</code>), le <b>et</b> (<code>&amp;&amp;</code>), le <b>ou</b> (<code>||</code>) et l’<b>optional chaining</b> (<code>?.</code>) pour accéder sans planter.',
    sections: [
      {
        id: 's1',
        title: 'Comparer : === plutôt que ==',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>vérifier si une valeur vaut exactement 5</b>, sans que « 5 » écrit en texte soit considéré comme égal.',
          },
          {
            type: 'paragraph',
            html: 'On compare avec <code>===</code> (égalité <b>stricte</b> : même valeur ET même type). Le <code>==</code> convertit les types en douce et provoque des surprises : on l’évite.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1106-l-c1',
              filename: 'operateurs.js',
              language: 'javascript',
              code: `// === compare la valeur ET le type
console.log(5 === 5);   // true
console.log(5 === "5"); // false : number vs string

// == convertit les types : source de bugs, a eviter
console.log(5 == "5");  // true (piege !)

// Different strict : !==
console.log(5 !== 3);   // true`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle :</b> toujours <code>===</code> et <code>!==</code>. Oublie <code>==</code> et <code>!=</code>, qui comparent après conversion de type.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Combiner : et (&&), ou (||)',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>&amp;&amp;</code> (<b>et</b>) est vrai si <b>les deux</b> côtés le sont. <code>||</code> (<b>ou</b>) est vrai si <b>au moins un</b> l’est. <code>!</code> inverse une condition.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1106-l-c2',
              filename: 'operateurs.js',
              language: 'javascript',
              code: `const age = 25;
const aBillet = true;
const jour = "samedi";
const estOuvert = false;

// ET : les deux conditions doivent etre vraies
if (age >= 18 && aBillet) {
  console.log("Entree autorisee");
}

// OU : au moins une condition vraie suffit
const estWeekend = jour === "samedi" || jour === "dimanche";

// NON : inverse un booleen
const estFerme = !estOuvert;`,
            },
          },
          {
            type: 'table',
            headers: ['Opérateur', 'Nom', 'Vrai quand…'],
            rows: [
              ['<code>===</code>', 'égalité stricte', 'même valeur et même type'],
              ['<code>&amp;&amp;</code>', 'et', 'les deux côtés sont vrais'],
              ['<code>||</code>', 'ou', 'au moins un côté est vrai'],
              ['<code>!</code>', 'non', 'inverse la valeur'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Accéder sans planter : ?. et ??',
        blocks: [
          {
            type: 'paragraph',
            html: 'L’<b>optional chaining</b> <code>?.</code> accède à une propriété <b>seulement si</b> l’objet existe, sinon il renvoie <code>undefined</code> au lieu de planter. Le <b>nullish</b> <code>??</code> fournit une valeur de repli.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1106-l-c3',
              filename: 'operateurs.js',
              language: 'javascript',
              code: `const user = { nom: "Alice" };

// Sans ?. : plante si user.adresse est undefined
// console.log(user.adresse.ville); // Erreur !

// Avec ?. : renvoie undefined au lieu de planter
console.log(user.adresse?.ville); // undefined

// ?? : une valeur de repli si null ou undefined
const ville = user.adresse?.ville ?? "Inconnue";
console.log(ville); // "Inconnue"`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>?.</code> = frapper à une porte avant d’entrer. Si la pièce n’existe pas, tu repars poliment (undefined) au lieu de foncer dans le mur (erreur).',
          },
        ],
      },
    ],
    pitfalls: [
      'Comparer avec <code>==</code> : <code>0 == ""</code> ou <code>1 == true</code> valent <code>true</code> à cause de la conversion. Utilise <code>===</code>.',
      'Confondre <code>||</code> et <code>??</code> pour une valeur par défaut : <code>0 || 10</code> donne <code>10</code> (car 0 est « falsy »), alors que <code>0 ?? 10</code> donne <code>0</code>.',
      'Mettre <code>?.</code> partout par réflexe : ne l’utilise que là où la valeur peut réellement être absente.',
    ],
    takeaways: [
      'comparer : toujours <code>===</code> / <code>!==</code>, jamais <code>==</code>',
      '<code>&amp;&amp;</code> = les deux vrais · <code>||</code> = au moins un vrai · <code>!</code> = inverse',
      '<code>?.</code> accède sans planter si l’objet est absent (renvoie <code>undefined</code>)',
      '<code>??</code> = repli si <code>null</code>/<code>undefined</code> (contrairement à <code>||</code>, garde <code>0</code> et <code>""</code>)',
    ],
  }),
  template({
    id: 'JS-F-1106-TEMPLATE',
    slug: 'les-operateurs-egalite-et-ou-optional-chaining',
    title: 'Opérateurs',
    shortTitle: 'Opérateurs',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Les opérateurs clés : égalité stricte, et/ou, optional chaining et valeur de repli.',
    lede: 'Comparer et combiner. Choisis l’opérateur :',
    aliases: ['operateur', 'egalite', '&&', '||', '?.', '??'],
    keywords: ['comparer', 'et ou', 'optional chaining'],
    relatedContentIds: [],
    lessonId: 'JS-F-1106-LESSON',
    variants: [
      {
        id: 'JS-F-1106-v-egalite',
        label: 'Égalité (===)',
        codeBlocks: [
          {
            id: 'JS-F-1106-t-egalite',
            filename: 'operateurs.js',
            language: 'javascript',
            code: `if (valeur === attendu) {
  // valeur et attendu sont identiques (valeur + type)
}`,
          },
        ],
        replacements: [
          { token: 'valeur', description: 'la valeur à comparer' },
          { token: 'attendu', description: 'la valeur de référence' },
        ],
        placement: 'Pour tester une égalité exacte. Toujours ===, jamais ==.',
      },
      {
        id: 'JS-F-1106-v-etou',
        label: 'Et / Ou',
        codeBlocks: [
          {
            id: 'JS-F-1106-t-etou',
            filename: 'operateurs.js',
            language: 'javascript',
            code: `// ET : les deux conditions vraies
if (conditionA && conditionB) { }

// OU : au moins une vraie
if (conditionA || conditionB) { }`,
          },
        ],
        replacements: [
          { token: 'conditionA', description: 'la première condition' },
          { token: 'conditionB', description: 'la seconde condition' },
        ],
        placement: 'Pour combiner deux tests : && exige les deux, || se contente d’un seul.',
      },
      {
        id: 'JS-F-1106-v-chaining',
        label: 'Optional chaining',
        codeBlocks: [
          {
            id: 'JS-F-1106-t-chaining',
            filename: 'operateurs.js',
            language: 'javascript',
            code: `// Accede seulement si objet existe, sinon undefined
const valeur = objet?.propriete;`,
          },
        ],
        replacements: [
          { token: 'objet', description: 'l’objet qui peut être absent (null/undefined)' },
          { token: 'propriete', description: 'la propriété à lire en sécurité' },
        ],
        placement: 'Quand un objet peut être absent : ?. évite le plantage et renvoie undefined.',
      },
      {
        id: 'JS-F-1106-v-repli',
        label: 'Valeur de repli',
        codeBlocks: [
          {
            id: 'JS-F-1106-t-repli',
            filename: 'operateurs.js',
            language: 'javascript',
            code: `// Repli si la valeur est null ou undefined
const affichage = valeur ?? "Par defaut";`,
          },
        ],
        replacements: [
          { token: 'valeur', description: 'la valeur qui peut être null/undefined' },
          { token: '"Par defaut"', description: 'la valeur de secours' },
        ],
        placement: 'Pour une valeur par défaut. ?? garde 0 et "" (contrairement à ||).',
      },
    ],
  }),
];
