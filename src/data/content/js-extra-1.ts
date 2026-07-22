import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const jsExtra1Content: ReadyContent[] = [
  // ————— Les closures —————
  lesson({
    id: 'JS-F-1300-LESSON',
    slug: 'closures',
    title: 'Les closures : une fonction qui se souvient',
    shortTitle: 'Closures',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Comprendre qu’une fonction interne garde accès aux variables de la fonction qui l’a créée, même après que celle-ci a fini de s’exécuter.',
    utility: 'Créer des fonctions qui gardent une mémoire privée : compteurs, usines de fonctions, données protégées.',
    aliases: ['closure', 'fermeture', 'fonction qui se souvient', 'portee', 'fonction interne', 'variable privee'],
    keywords: [
      'fonction dans une fonction',
      'garder acces aux variables',
      'memoire privee',
      'compteur avec closure',
      'usine de fonctions',
      'portee des variables',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1300-TEMPLATE',
    intro:
      'Une <b>closure</b> (fermeture) se produit quand une <b>fonction interne</b> garde accès aux variables de la <b>fonction externe</b> qui l’a créée — même après que cette fonction externe a terminé. La fonction interne « se souvient » de l’environnement dans lequel elle est née. C’est le mécanisme derrière les compteurs privés et les usines de fonctions.',
    sections: [
      {
        id: 's1',
        title: 'Une fonction qui garde une mémoire',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux un <b>compteur</b> qui garde son total en mémoire entre deux appels, sans utiliser de variable globale que n’importe qui pourrait modifier.',
          },
          {
            type: 'paragraph',
            html: 'La fonction externe crée une variable, puis renvoie une fonction interne qui l’utilise. Chaque fois qu’on appelle la fonction interne, elle retrouve <b>sa</b> variable, protégée du reste du code.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1300-l-c1',
              filename: 'compteur.js',
              language: 'javascript',
              code: `function creerCompteur() {
  let total = 0; // variable "privee"

  // la fonction interne garde acces a total
  return function () {
    total = total + 1;
    return total;
  };
}

const compter = creerCompteur();
console.log(compter()); // 1
console.log(compter()); // 2
console.log(compter()); // 3
// total n'est accessible que via compter()`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une closure, c’est un sac à dos. Quand la fonction interne « part » (est renvoyée), elle emporte dans son sac les variables dont elle avait besoin. Même loin de sa maison d’origine, elle peut encore fouiller dans son sac.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Une usine de fonctions',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le second usage classique : une fonction qui <b>fabrique</b> des fonctions personnalisées. Chaque fonction produite se souvient de l’argument avec lequel elle a été créée.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1300-l-c2',
              filename: 'usine.js',
              language: 'javascript',
              code: `function multiplierPar(facteur) {
  // chaque fonction renvoyee "retient" son facteur
  return function (nombre) {
    return nombre * facteur;
  };
}

const doubler = multiplierPar(2);
const tripler = multiplierPar(3);

console.log(doubler(10)); // 20
console.log(tripler(10)); // 30
// doubler se souvient de facteur = 2, tripler de facteur = 3`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Bon à savoir :</b> chaque appel de la fonction externe crée une closure <b>indépendante</b>. <code>doubler</code> et <code>tripler</code> ont chacun leur propre <code>facteur</code> — ils ne se marchent pas dessus.',
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que la variable est partagée entre tous les appels : chaque appel de la fonction externe crée une closure <b>neuve</b> avec ses propres variables.',
      'Oublier de <b>renvoyer</b> la fonction interne : sans <code>return</code>, tu n’as aucun moyen de rappeler la fonction plus tard.',
      'Penser que la variable disparaît quand la fonction externe se termine : justement non, la closure la garde en vie tant que la fonction interne existe.',
    ],
    takeaways: [
      'closure = une fonction interne qui <b>garde accès</b> aux variables de la fonction externe',
      'la variable survit à la fin de la fonction externe : elle est « retenue »',
      'usage n°1 : une <b>mémoire privée</b> (compteur) inaccessible de l’extérieur',
      'usage n°2 : une <b>usine</b> qui fabrique des fonctions personnalisées',
    ],
  }),
  template({
    id: 'JS-F-1300-TEMPLATE',
    slug: 'closures',
    title: 'Les closures',
    shortTitle: 'Closures',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code des closures prêt à copier : compteur privé ou usine de fonctions.',
    lede: 'Une fonction qui se souvient. Choisis l’usage :',
    aliases: ['closure', 'fermeture', 'compteur', 'usine de fonctions'],
    keywords: ['memoire privee', 'fonction interne', 'portee'],
    relatedContentIds: [],
    lessonId: 'JS-F-1300-LESSON',
    variants: [
      {
        id: 'compteur',
        label: 'Compteur privé',
        codeBlocks: [
          {
            id: 'JS-F-1300-t-compteur',
            filename: 'closure.js',
            language: 'javascript',
            code: `function creerCompteur() {
  let total = 0;
  return function () {
    total = total + 1;
    return total;
  };
}

const compter = creerCompteur();
compter(); // 1
compter(); // 2`,
          },
        ],
        replacements: [
          { token: 'total', description: 'la donnée privée gardée en mémoire' },
          { token: 'creerCompteur', description: 'le nom de ta fonction fabricante' },
        ],
        placement: 'Quand tu veux une valeur qui persiste entre les appels, sans variable globale exposée.',
      },
      {
        id: 'usine',
        label: 'Usine de fonctions',
        codeBlocks: [
          {
            id: 'JS-F-1300-t-usine',
            filename: 'closure.js',
            language: 'javascript',
            code: `function multiplierPar(facteur) {
  return function (nombre) {
    return nombre * facteur;
  };
}

const doubler = multiplierPar(2);
doubler(10); // 20`,
          },
        ],
        replacements: [
          { token: 'facteur', description: 'le paramètre que la fonction produite retiendra' },
          { token: 'nombre * facteur', description: 'ce que fait la fonction fabriquée' },
        ],
        placement: 'Quand tu veux fabriquer plusieurs fonctions similaires, chacune configurée différemment.',
      },
    ],
  }),

  // ————— Truthy et falsy —————
  lesson({
    id: 'JS-F-1301-LESSON',
    slug: 'truthy-falsy',
    title: 'Truthy et falsy : ce que JS considère vrai ou faux',
    shortTitle: 'Truthy / falsy',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Savoir quelles valeurs JavaScript traite comme « fausses » dans un test, et comment cela pilote if, &&, || et ??.',
    utility: 'Écrire des conditions justes en sachant quand une valeur compte comme vraie ou fausse.',
    aliases: ['truthy', 'falsy', 'vrai ou faux', 'valeur fausse', 'valeur vraie', 'condition', 'booleen implicite'],
    keywords: [
      'valeur consideree vraie',
      'valeur consideree fausse',
      'condition if',
      'valeur par defaut',
      'chaine vide fausse',
      'zero est faux',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1301-TEMPLATE',
    intro:
      'Dans un test, JavaScript convertit toute valeur en <b>vrai</b> ou <b>faux</b>. Il n’existe que <b>six</b> valeurs <b>falsy</b> (considérées fausses) : <code>false</code>, <code>0</code>, <code>""</code> (chaîne vide), <code>null</code>, <code>undefined</code> et <code>NaN</code>. <b>Tout le reste</b> est <b>truthy</b> (considéré vrai) — y compris <code>"0"</code>, <code>[]</code> et <code>{}</code>.',
    sections: [
      {
        id: 's1',
        title: 'Les six valeurs falsy à connaître par cœur',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>vérifier si une variable a une valeur utile</b> avant de m’en servir, mais je ne sais pas exactement quand <code>if (x)</code> est vrai.',
          },
          {
            type: 'paragraph',
            html: 'Retiens la liste des falsy : si ta valeur n’en fait pas partie, alors elle est truthy. C’est aussi simple que ça.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1301-l-c1',
              filename: 'falsy.js',
              language: 'javascript',
              code: `// Les 6 valeurs FALSY (le if ne passe pas)
if (false) {}     // faux
if (0) {}         // faux
if ("") {}        // faux (chaine vide)
if (null) {}      // faux
if (undefined) {} // faux
if (NaN) {}       // faux

// TRUTHY (le if passe) : tout le reste
if ("0") {}   // VRAI : chaine non vide !
if ([]) {}    // VRAI : tableau vide mais existant
if ({}) {}    // VRAI : objet vide mais existant`,
            },
          },
          {
            type: 'table',
            headers: ['Valeur', 'Traitée comme'],
            rows: [
              ['<code>false</code>, <code>0</code>, <code>NaN</code>', '<b>falsy</b>'],
              ['<code>""</code> (chaîne vide)', '<b>falsy</b>'],
              ['<code>null</code>, <code>undefined</code>', '<b>falsy</b>'],
              ['<code>"0"</code>, <code>"false"</code>', '<b>truthy</b> (chaîne non vide)'],
              ['<code>[]</code>, <code>{}</code>', '<b>truthy</b> (existent)'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le <code>if</code> est un videur. Il ne refuse que six têtes connues (les falsy). Tout le monde d’autre entre, même un sac vide (<code>[]</code>) ou une boîte vide (<code>{}</code>).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Impact sur &&, || et ??',
        blocks: [
          {
            type: 'paragraph',
            html: 'Ces opérateurs ne renvoient pas <code>true</code>/<code>false</code> mais <b>une des valeurs</b>. <code>||</code> prend un repli si la gauche est falsy. <code>??</code> ne prend un repli que si la gauche est <code>null</code> ou <code>undefined</code> — la différence est cruciale.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1301-l-c2',
              filename: 'operateurs.js',
              language: 'javascript',
              code: `// || : repli si la gauche est FALSY
const nom = saisie || "Anonyme";

// Piege : 0 est falsy, donc || le remplace
const quantite = 0 || 10; // 10 (pas 0 !)

// ?? : repli SEULEMENT si null ou undefined
const q2 = 0 ?? 10; // 0 (0 est garde)
const q3 = null ?? 10; // 10

// && : renvoie la droite si la gauche est truthy
const actif = user && user.actif;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Réflexe :</b> pour une valeur par défaut sur un nombre ou un booléen qui peut légitimement valoir <code>0</code> ou <code>false</code>, utilise <code>??</code> plutôt que <code>||</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que <code>[]</code> ou <code>{}</code> sont falsy : ils sont <b>truthy</b>. Un tableau vide passe le <code>if</code>.',
      'Utiliser <code>||</code> pour une valeur par défaut alors que <code>0</code> ou <code>""</code> sont des valeurs valides : ils seront écrasés. Préfère <code>??</code>.',
      'Confondre <code>"0"</code> (chaîne, truthy) et <code>0</code> (nombre, falsy) : les guillemets changent tout.',
      'Tester la présence d’une clé avec <code>if (obj.age)</code> : si <code>age</code> vaut <code>0</code>, le test échoue à tort.',
    ],
    takeaways: [
      '6 valeurs falsy : <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>',
      'tout le reste est truthy — y compris <code>"0"</code>, <code>[]</code> et <code>{}</code>',
      '<code>||</code> = repli si <b>falsy</b> · <code>??</code> = repli si <b>null/undefined</b> seulement',
      'pour une valeur par défaut qui peut valoir <code>0</code>/<code>false</code>, utilise <code>??</code>',
    ],
  }),
  template({
    id: 'JS-F-1301-TEMPLATE',
    slug: 'truthy-falsy',
    title: 'Truthy et falsy',
    shortTitle: 'Truthy / falsy',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code des tests de vérité prêt à copier : valeur par défaut, présence.',
    lede: 'Tester une valeur. Choisis le cas :',
    aliases: ['truthy', 'falsy', 'valeur par defaut', 'condition'],
    keywords: ['vrai ou faux', 'repli', 'presence'],
    relatedContentIds: [],
    lessonId: 'JS-F-1301-LESSON',
    variants: [
      {
        id: 'defaut',
        label: 'Valeur par défaut',
        codeBlocks: [
          {
            id: 'JS-F-1301-t-defaut',
            filename: 'valeur.js',
            language: 'javascript',
            code: `// ?? : garde 0 et "", ne remplace que null/undefined
const valeur = source ?? "par defaut";

// || : remplace toute valeur falsy (0, "", ...)
const nom = source || "Anonyme";`,
          },
        ],
        replacements: [
          { token: 'source', description: 'la variable qui peut être absente' },
          { token: '"par defaut"', description: 'la valeur de repli' },
        ],
        placement: 'Pour fournir un repli. ?? si 0/"" sont valides, || sinon.',
      },
      {
        id: 'presence',
        label: 'Tester la présence',
        codeBlocks: [
          {
            id: 'JS-F-1301-t-presence',
            filename: 'valeur.js',
            language: 'javascript',
            code: `// Vrai seulement si valeur existe ET n'est pas vide
if (texte) {
  console.log("texte rempli");
}

// Pour un nombre qui peut valoir 0, sois explicite
if (age !== undefined) {
  console.log("age fourni, meme si 0");
}`,
          },
        ],
        replacements: [
          { token: 'texte', description: 'la variable à tester' },
          { token: 'age', description: 'le nombre qui peut légitimement valoir 0' },
        ],
        placement: 'Pour vérifier qu’une valeur est utilisable. Attention au cas 0 : teste explicitement.',
      },
    ],
  }),

  // ————— Valeur vs référence —————
  lesson({
    id: 'JS-F-1302-LESSON',
    slug: 'valeur-vs-reference',
    title: 'Valeur vs référence : copier sans tout casser',
    shortTitle: 'Valeur / référence',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Comprendre pourquoi copier un nombre est sans risque, mais copier un tableau ou un objet partage le même contenu — et comment copier vraiment.',
    utility: 'Éviter le bug où modifier une « copie » modifie aussi l’original, surtout en React.',
    aliases: [
      'valeur',
      'reference',
      'copier un tableau',
      'modifier copie modifie original',
      'copie superficielle',
      'spread',
      'partage de reference',
    ],
    keywords: [
      'copier un objet',
      'copier un tableau',
      'modifier la copie modifie l original',
      'primitive vs objet',
      'copie par reference',
      'bug react state',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1302-TEMPLATE',
    intro:
      'JavaScript traite les données de deux façons. Les <b>primitives</b> (nombre, chaîne, booléen) sont copiées <b>par valeur</b> : la copie est indépendante. Les <b>objets et tableaux</b> sont copiés <b>par référence</b> : la copie pointe vers le <b>même</b> contenu. D’où le bug classique : modifier une « copie » modifie aussi l’original.',
    sections: [
      {
        id: 's1',
        title: 'Le piège : copier ne copie pas toujours',
        blocks: [
          {
            type: 'situation',
            html: 'Je copie mon tableau dans une nouvelle variable, je modifie la copie… et mon tableau d’origine change aussi. Pourquoi ?',
          },
          {
            type: 'paragraph',
            html: 'Un nombre copié est indépendant. Mais un tableau copié avec <code>=</code> ne crée pas un nouveau tableau : les deux variables désignent le <b>même</b> tableau en mémoire.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1302-l-c1',
              filename: 'reference.js',
              language: 'javascript',
              code: `// PRIMITIVE : copie independante
let a = 5;
let b = a;
b = 10;
console.log(a); // 5 (a n'a pas bouge)

// OBJET / TABLEAU : meme reference !
const liste = [1, 2, 3];
const copie = liste;   // PAS une vraie copie
copie.push(4);

console.log(liste); // [1, 2, 3, 4] <- l'original a change !
console.log(copie === liste); // true : meme tableau`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une primitive, c’est une photocopie de feuille — tu peux gribouiller dessus sans toucher l’original. Un objet, c’est une adresse : donner l’adresse à un ami ne construit pas une seconde maison, vous partagez la même.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Copier pour de vrai avec le spread',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour une vraie copie <b>superficielle</b>, on utilise le <b>spread</b> <code>...</code>. Il crée un nouveau tableau (ou objet) avec les mêmes valeurs, mais une <b>nouvelle référence</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1302-l-c2',
              filename: 'copie.js',
              language: 'javascript',
              code: `const liste = [1, 2, 3];

// Vraie copie : nouveau tableau
const copie = [...liste];
copie.push(4);

console.log(liste); // [1, 2, 3] (intact !)
console.log(copie); // [1, 2, 3, 4]

// Meme principe pour un objet
const user = { nom: "Alice", age: 30 };
const modifie = { ...user, age: 31 };
console.log(user.age); // 30 (intact)`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Attention :</b> le spread copie <b>en surface</b>. Un objet imbriqué reste partagé. Pour une copie profonde, utilise <code>structuredClone(obj)</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que <code>const copie = liste</code> copie le tableau : les deux pointent vers le <b>même</b> tableau. Utilise <code>[...liste]</code>.',
      'En React, muter le state directement (<code>state.push(x)</code>) : React ne détecte pas le changement car la référence n’a pas changé. Crée une nouvelle référence.',
      'Penser que le spread copie en profondeur : un objet imbriqué reste partagé. Utilise <code>structuredClone</code> si besoin.',
      'Comparer deux objets avec <code>===</code> pour tester leur contenu : <code>===</code> compare la <b>référence</b>, pas les valeurs. <code>{a:1} === {a:1}</code> vaut <code>false</code>.',
    ],
    takeaways: [
      'primitives (nombre, texte, booléen) = copiées <b>par valeur</b>, indépendantes',
      'objets et tableaux = copiés <b>par référence</b>, ils partagent le contenu',
      'vraie copie = <code>[...liste]</code> ou <code>{ ...objet }</code> (nouvelle référence)',
      'spread = copie <b>superficielle</b> · profonde = <code>structuredClone</code> · réflexe React',
    ],
  }),
  template({
    id: 'JS-F-1302-TEMPLATE',
    slug: 'valeur-vs-reference',
    title: 'Valeur vs référence',
    shortTitle: 'Valeur / référence',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code pour copier proprement prêt à copier : tableau, objet, profond.',
    lede: 'Copier sans casser l’original. Choisis le cas :',
    aliases: ['copier un tableau', 'copier un objet', 'spread', 'reference'],
    keywords: ['copie', 'clone', 'sans muter'],
    relatedContentIds: [],
    lessonId: 'JS-F-1302-LESSON',
    variants: [
      {
        id: 'superficielle',
        label: 'Copie (tableau / objet)',
        codeBlocks: [
          {
            id: 'JS-F-1302-t-superficielle',
            filename: 'copie.js',
            language: 'javascript',
            code: `// Tableau
const copieTab = [...liste];

// Objet (avec une propriete changee)
const copieObj = { ...user, age: 31 };`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'le tableau à copier' },
          { token: 'user', description: 'l’objet à copier' },
        ],
        placement: 'Le réflexe de tous les jours : nouvelle référence, original préservé.',
      },
      {
        id: 'profonde',
        label: 'Copie profonde',
        codeBlocks: [
          {
            id: 'JS-F-1302-t-profonde',
            filename: 'copie.js',
            language: 'javascript',
            code: `// Copie tous les niveaux (objets imbriques inclus)
const clone = structuredClone(original);`,
          },
        ],
        replacements: [
          { token: 'original', description: 'l’objet ou tableau contenant des données imbriquées' },
        ],
        placement: 'Quand l’objet contient d’autres objets/tableaux et que le spread ne suffit pas.',
      },
    ],
  }),

  // ————— Les dates —————
  lesson({
    id: 'JS-F-1303-LESSON',
    slug: 'les-dates',
    title: 'Les dates en JavaScript',
    shortTitle: 'Dates',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Créer une date, en extraire le jour/mois/année/heure, l’afficher joliment et comparer deux dates.',
    utility: 'Manipuler des dates : afficher « aujourd’hui », formater une date, savoir laquelle est la plus récente.',
    aliases: ['date', 'new date', 'heure', 'jour mois annee', 'formater une date', 'comparer des dates', 'timestamp'],
    keywords: [
      'creer une date',
      'date du jour',
      'recuperer l annee',
      'formater une date',
      'afficher la date en francais',
      'comparer deux dates',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1303-TEMPLATE',
    intro:
      'L’objet <code>Date</code> représente un instant précis. On le crée avec <code>new Date()</code> (maintenant) ou avec une date précise. On en extrait ensuite les morceaux (jour, mois, année, heure), on le formate pour l’affichage, et on compare deux dates entre elles.',
    sections: [
      {
        id: 's1',
        title: 'Créer une date et lire ses morceaux',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher la date du jour</b> et récupérer séparément l’année et l’heure pour les afficher dans mon interface.',
          },
          {
            type: 'paragraph',
            html: '<code>new Date()</code> donne l’instant présent. Des méthodes <code>get…</code> en extraient chaque partie. <b>Piège classique :</b> les mois vont de <code>0</code> (janvier) à <code>11</code> (décembre).',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1303-l-c1',
              filename: 'dates.js',
              language: 'javascript',
              code: `// Maintenant
const maintenant = new Date();

// Une date precise (annee, mois, jour)
// ATTENTION : mois 0 = janvier, 11 = decembre
const noel = new Date(2026, 11, 25); // 25 dec. 2026

// Extraire les morceaux
maintenant.getFullYear(); // ex. 2026
maintenant.getMonth();    // 0 a 11 (ajoute +1 pour l'humain)
maintenant.getDate();     // le jour du mois (1 a 31)
maintenant.getHours();    // l'heure (0 a 23)
maintenant.getDay();      // jour de semaine (0 = dimanche)`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Le piège des mois :</b> <code>getMonth()</code> renvoie <code>0</code> pour janvier. Pour un affichage humain, pense à ajouter <code>+ 1</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Formater et comparer',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour un affichage propre en français, <code>toLocaleDateString("fr-FR")</code> fait le travail. Pour comparer deux dates, les opérateurs <code>&lt;</code> et <code>&gt;</code> suffisent (JS compare l’instant sous-jacent).',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1303-l-c2',
              filename: 'format.js',
              language: 'javascript',
              code: `const date = new Date(2026, 6, 22);

// Format francais : "22/07/2026"
date.toLocaleDateString("fr-FR");

// Format long : "mercredi 22 juillet 2026"
date.toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Comparer deux dates
const a = new Date(2026, 0, 1);
const b = new Date(2026, 11, 31);
console.log(a < b);  // true (a est avant b)`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une <code>Date</code>, c’est un nombre de millisecondes depuis 1970 déguisé en calendrier. Comparer deux dates, c’est comparer ces deux nombres — d’où <code>&lt;</code> et <code>&gt;</code> qui marchent directement.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier que <code>getMonth()</code> commence à <b>0</b> : janvier vaut <code>0</code>, décembre <code>11</code>. Ajoute <code>+ 1</code> pour l’affichage.',
      'Comparer deux dates avec <code>===</code> : ça compare les objets (références), jamais l’instant. Utilise <code>&lt;</code>, <code>&gt;</code> ou <code>.getTime()</code>.',
      'Confondre <code>getDate()</code> (jour du mois, 1–31) et <code>getDay()</code> (jour de semaine, 0–6).',
      'Créer une date depuis une chaîne au format ambigu : préfère <code>new Date(annee, mois, jour)</code> ou le format ISO <code>"2026-07-22"</code>.',
    ],
    takeaways: [
      '<code>new Date()</code> = maintenant · <code>new Date(2026, 11, 25)</code> = date précise (mois de 0 à 11)',
      'extraire : <code>getFullYear</code>, <code>getMonth</code> (+1 !), <code>getDate</code>, <code>getHours</code>',
      'afficher : <code>toLocaleDateString("fr-FR", …)</code>',
      'comparer : <code>&lt;</code> / <code>&gt;</code> directement (jamais <code>===</code>)',
    ],
  }),
  template({
    id: 'JS-F-1303-TEMPLATE',
    slug: 'les-dates',
    title: 'Les dates',
    shortTitle: 'Dates',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code des dates prêt à copier : créer, formater, comparer.',
    lede: 'Manipuler une date. Choisis le cas :',
    aliases: ['date', 'new date', 'formater', 'comparer'],
    keywords: ['heure', 'annee', 'affichage'],
    relatedContentIds: [],
    lessonId: 'JS-F-1303-LESSON',
    variants: [
      {
        id: 'creer',
        label: 'Créer + extraire',
        codeBlocks: [
          {
            id: 'JS-F-1303-t-creer',
            filename: 'dates.js',
            language: 'javascript',
            code: `const d = new Date();

const annee = d.getFullYear();
const mois = d.getMonth() + 1; // +1 : janvier = 0
const jour = d.getDate();
const heure = d.getHours();`,
          },
        ],
        replacements: [
          { token: 'new Date()', description: 'remplace par new Date(2026, 11, 25) pour une date précise' },
        ],
        placement: 'Le point de départ : obtenir maintenant, puis extraire chaque morceau.',
      },
      {
        id: 'formater',
        label: 'Formater (français)',
        codeBlocks: [
          {
            id: 'JS-F-1303-t-formater',
            filename: 'format.js',
            language: 'javascript',
            code: `// "22/07/2026"
const court = d.toLocaleDateString("fr-FR");

// "mercredi 22 juillet 2026"
const long = d.toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});`,
          },
        ],
        replacements: [
          { token: 'd', description: 'ta date à afficher' },
        ],
        placement: 'Pour afficher une date lisible. Retire les options pour le format court jj/mm/aaaa.',
      },
    ],
  }),

  // ————— L'objet Math —————
  lesson({
    id: 'JS-F-1304-LESSON',
    slug: 'math',
    title: 'L’objet Math : arrondir, aléatoire, min/max',
    shortTitle: 'Math',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Utiliser les outils mathématiques prêts à l’emploi : arrondir, tirer un nombre au hasard, trouver le min/max, la valeur absolue.',
    utility: 'Faire des calculs courants sans réinventer la roue : arrondis, hasard, extrêmes.',
    aliases: ['math', 'arrondir', 'aleatoire', 'random', 'min max', 'valeur absolue', 'floor', 'ceil'],
    keywords: [
      'arrondir un nombre',
      'nombre aleatoire',
      'tirer au hasard',
      'plus grand plus petit',
      'valeur absolue',
      'arrondi inferieur superieur',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1304-TEMPLATE',
    intro:
      '<code>Math</code> est une boîte à outils mathématiques toujours disponible. On ne l’instancie pas : on appelle directement ses méthodes. Les plus utiles au quotidien : arrondir (<code>round</code>, <code>floor</code>, <code>ceil</code>), tirer un nombre au hasard (<code>random</code>), trouver les extrêmes (<code>min</code>, <code>max</code>) et la valeur absolue (<code>abs</code>).',
    sections: [
      {
        id: 's1',
        title: 'Arrondir un nombre',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>arrondir un prix</b> ou une moyenne, parfois à l’entier le plus proche, parfois toujours vers le bas.',
          },
          {
            type: 'paragraph',
            html: 'Trois arrondis à distinguer : <code>round</code> (au plus proche), <code>floor</code> (toujours vers le bas), <code>ceil</code> (toujours vers le haut).',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1304-l-c1',
              filename: 'arrondi.js',
              language: 'javascript',
              code: `Math.round(4.4); // 4 (au plus proche)
Math.round(4.6); // 5

Math.floor(4.9); // 4 (toujours vers le bas)
Math.ceil(4.1);  // 5 (toujours vers le haut)

Math.abs(-7);    // 7 (valeur absolue)

// Arrondir a 2 decimales : truc classique
Math.round(3.14159 * 100) / 100; // 3.14`,
            },
          },
          {
            type: 'table',
            headers: ['Méthode', 'Fait quoi', 'Exemple'],
            rows: [
              ['<code>Math.round</code>', 'au plus proche', '<code>4.6 → 5</code>'],
              ['<code>Math.floor</code>', 'toujours vers le bas', '<code>4.9 → 4</code>'],
              ['<code>Math.ceil</code>', 'toujours vers le haut', '<code>4.1 → 5</code>'],
              ['<code>Math.abs</code>', 'valeur absolue', '<code>-7 → 7</code>'],
            ],
          },
        ],
      },
      {
        id: 's2',
        title: 'Hasard et extrêmes',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>Math.random()</code> donne un décimal entre <code>0</code> (inclus) et <code>1</code> (exclu). Pour un entier dans un intervalle, on le multiplie puis on l’arrondit vers le bas. <code>min</code> et <code>max</code> trouvent le plus petit / grand.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1304-l-c2',
              filename: 'hasard.js',
              language: 'javascript',
              code: `// Decimal entre 0 (inclus) et 1 (exclu)
Math.random(); // ex. 0.472...

// Entier aleatoire entre min et max INCLUS
function entreDeux(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
entreDeux(1, 6); // un de a 6 faces : 1 a 6

// Le plus petit / le plus grand
Math.min(3, 8, 1); // 1
Math.max(3, 8, 1); // 8

// Sur un tableau : avec le spread
const notes = [12, 18, 9];
Math.max(...notes); // 18`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>Math.random()</code> lance une roue graduée de 0 à presque 1. Pour en faire un dé, on étire la roue à la taille voulue (× nombre de faces) et on garde la partie entière.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier que <code>Math.random()</code> ne renvoie <b>jamais</b> 1 : l’intervalle est <code>[0, 1[</code>. Adapte la formule pour inclure la borne haute.',
      'Passer un tableau directement à <code>Math.max([1,2,3])</code> : ça renvoie <code>NaN</code>. Utilise le spread : <code>Math.max(...tab)</code>.',
      'Confondre <code>floor</code> et <code>round</code> : <code>floor(4.9)</code> vaut <code>4</code>, pas <code>5</code>.',
      'Croire que <code>Math.round</code> gère les négatifs comme les positifs : <code>Math.round(-0.5)</code> vaut <code>0</code>, pas <code>-1</code>.',
    ],
    takeaways: [
      'arrondir : <code>round</code> (au plus proche) · <code>floor</code> (bas) · <code>ceil</code> (haut)',
      'hasard : <code>Math.random()</code> ∈ <code>[0, 1[</code> · entier = <code>Math.floor(random * n) + min</code>',
      'extrêmes : <code>Math.min</code> / <code>Math.max</code> · sur un tableau = <code>Math.max(...tab)</code>',
      'valeur absolue : <code>Math.abs(-7)</code> → <code>7</code>',
    ],
  }),
  template({
    id: 'JS-F-1304-TEMPLATE',
    slug: 'math',
    title: 'L’objet Math',
    shortTitle: 'Math',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code de Math prêt à copier : arrondir, nombre aléatoire, min/max.',
    lede: 'Un calcul courant. Choisis l’outil :',
    aliases: ['math', 'arrondir', 'random', 'min max'],
    keywords: ['aleatoire', 'floor', 'valeur absolue'],
    relatedContentIds: [],
    lessonId: 'JS-F-1304-LESSON',
    variants: [
      {
        id: 'arrondir',
        label: 'Arrondir',
        codeBlocks: [
          {
            id: 'JS-F-1304-t-arrondir',
            filename: 'math.js',
            language: 'javascript',
            code: `Math.round(x); // au plus proche
Math.floor(x); // vers le bas
Math.ceil(x);  // vers le haut

// Arrondir a 2 decimales
Math.round(x * 100) / 100;`,
          },
        ],
        replacements: [
          { token: 'x', description: 'le nombre à arrondir' },
        ],
        placement: 'Pour arrondir. round = classique, floor/ceil pour forcer le sens.',
      },
      {
        id: 'aleatoire',
        label: 'Nombre aléatoire',
        codeBlocks: [
          {
            id: 'JS-F-1304-t-aleatoire',
            filename: 'math.js',
            language: 'javascript',
            code: `// Entier aleatoire entre min et max INCLUS
function hasard(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

hasard(1, 6); // 1 a 6`,
          },
        ],
        replacements: [
          { token: 'min', description: 'la borne basse (incluse)' },
          { token: 'max', description: 'la borne haute (incluse)' },
        ],
        placement: 'Pour tirer un entier au hasard dans un intervalle, bornes incluses.',
      },
      {
        id: 'extremes',
        label: 'Min / Max',
        codeBlocks: [
          {
            id: 'JS-F-1304-t-extremes',
            filename: 'math.js',
            language: 'javascript',
            code: `Math.min(3, 8, 1); // 1
Math.max(3, 8, 1); // 8

// Sur un tableau : spread obligatoire
Math.max(...liste);`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'ton tableau de nombres' },
        ],
        placement: 'Pour le plus petit ou le plus grand. Sur un tableau, n’oublie pas le spread.',
      },
    ],
  }),

  // ————— L'event loop —————
  lesson({
    id: 'JS-F-1305-LESSON',
    slug: 'event-loop',
    title: 'L’event loop : pourquoi le code s’exécute « plus tard »',
    shortTitle: 'Event loop',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Comprendre pourquoi un setTimeout ou une promesse s’exécute après le reste du code, même écrit avant — le fonctionnement mono-thread de JavaScript.',
    utility: 'Prévoir l’ordre réel d’exécution et arrêter d’être surpris par le code asynchrone.',
    aliases: [
      'event loop',
      'boucle evenementielle',
      'asynchrone',
      'settimeout',
      'ordre execution',
      'mono thread',
      'pile appels',
    ],
    keywords: [
      'ordre d execution du code',
      'code execute plus tard',
      'pourquoi settimeout apres',
      'javascript mono thread',
      'pile d appels',
      'tache asynchrone',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1305-TEMPLATE',
    intro:
      'JavaScript est <b>mono-thread</b> : il ne fait qu’<b>une chose à la fois</b>. Il exécute d’abord tout le code <b>synchrone</b> (ligne après ligne). Les tâches <b>asynchrones</b> (<code>setTimeout</code>, promesses, <code>fetch</code>) sont mises de côté et exécutées <b>après</b>, une fois la pile vide. C’est l’<b>event loop</b> qui orchestre cette attente.',
    sections: [
      {
        id: 's1',
        title: 'Le synchrone d’abord, l’asynchrone ensuite',
        blocks: [
          {
            type: 'situation',
            html: 'J’écris un <code>setTimeout</code> avec un délai de <code>0</code>, avant une autre ligne… et pourtant l’autre ligne s’affiche <b>en premier</b>. Pourquoi ?',
          },
          {
            type: 'paragraph',
            html: 'Même avec un délai de <code>0</code>, <code>setTimeout</code> ne s’exécute pas tout de suite : sa fonction est mise en <b>file d’attente</b> et ne part qu’une fois <b>tout</b> le code synchrone terminé.',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1305-l-c1',
              filename: 'ordre.js',
              language: 'javascript',
              code: `console.log("1 : debut");

setTimeout(() => {
  console.log("3 : le timeout (plus tard)");
}, 0); // meme avec 0 !

console.log("2 : fin");

// Affiche dans l'ordre :
// 1 : debut
// 2 : fin
// 3 : le timeout (plus tard)
// Le synchrone (1, 2) passe AVANT l'asynchrone (3)`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> JS est un cuisinier seul en cuisine (mono-thread). Les commandes normales, il les fait à la chaîne. Un <code>setTimeout</code>, c’est un minuteur posé de côté : il ne s’en occupe que quand il a fini <b>tout</b> le reste sur son plan de travail.',
          },
        ],
      },
      {
        id: 's2',
        title: 'La pile, la file, et l’ordre des priorités',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le code synchrone s’empile sur la <b>pile d’appels</b> et s’exécute d’abord. Ensuite, l’event loop pioche les tâches en attente. Subtilité utile : les <b>promesses</b> (microtâches) passent <b>avant</b> les <code>setTimeout</code> (macrotâches).',
          },
          {
            type: 'code',
            block: {
              id: 'JS-F-1305-l-c2',
              filename: 'priorites.js',
              language: 'javascript',
              code: `console.log("A : synchrone");

setTimeout(() => console.log("D : setTimeout"), 0);

Promise.resolve().then(() => console.log("C : promesse"));

console.log("B : synchrone");

// Ordre reel :
// A : synchrone
// B : synchrone
// C : promesse   <- les promesses passent avant
// D : setTimeout <- setTimeout en dernier`,
            },
          },
          {
            type: 'table',
            headers: ['Priorité', 'Type', 'Exemples'],
            rows: [
              ['1 (d’abord)', 'code synchrone', '<code>console.log</code>, calculs'],
              ['2', 'microtâches', 'promesses (<code>.then</code>, <code>await</code>)'],
              ['3 (ensuite)', 'macrotâches', '<code>setTimeout</code>, <code>setInterval</code>'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> tout le synchrone passe en premier, puis les <b>promesses</b>, puis les <code>setTimeout</code>. Un <code>setTimeout(…, 0)</code> ne veut pas dire « maintenant », mais « dès que la pile est vide ».',
          },
        ],
      },
    ],
    pitfalls: [
      'Croire qu’un <code>setTimeout(…, 0)</code> s’exécute immédiatement : il attend que <b>tout</b> le code synchrone soit fini.',
      'Attendre le résultat d’un <code>fetch</code> ou d’une promesse sur la ligne suivante sans <code>await</code> : le code continue sans attendre, la valeur n’est pas encore là.',
      'Penser que JS fait plusieurs choses en parallèle : il est <b>mono-thread</b>, une seule à la fois. L’asynchrone n’est pas du parallélisme.',
      'Bloquer la pile avec une boucle très longue : rien d’autre (ni clic, ni timeout) ne peut s’exécuter tant qu’elle tourne.',
    ],
    takeaways: [
      'JS est <b>mono-thread</b> : une seule chose à la fois',
      'le code <b>synchrone</b> s’exécute en entier <b>avant</b> l’asynchrone',
      'ordre : synchrone → <b>promesses</b> (microtâches) → <code>setTimeout</code> (macrotâches)',
      '<code>setTimeout(…, 0)</code> = « dès que la pile est vide », pas « tout de suite »',
    ],
  }),
  template({
    id: 'JS-F-1305-TEMPLATE',
    slug: 'event-loop',
    title: 'L’event loop',
    shortTitle: 'Event loop',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code pour visualiser l’ordre d’exécution prêt à copier.',
    lede: 'Comprendre l’ordre. Choisis l’exemple :',
    aliases: ['event loop', 'asynchrone', 'settimeout', 'ordre execution'],
    keywords: ['mono thread', 'promesse', 'plus tard'],
    relatedContentIds: [],
    lessonId: 'JS-F-1305-LESSON',
    variants: [
      {
        id: 'ordre',
        label: 'Sync vs setTimeout',
        codeBlocks: [
          {
            id: 'JS-F-1305-t-ordre',
            filename: 'ordre.js',
            language: 'javascript',
            code: `console.log("1");
setTimeout(() => console.log("3 (plus tard)"), 0);
console.log("2");

// Ordre : 1, 2, puis 3`,
          },
        ],
        replacements: [
          { token: '"3 (plus tard)"', description: 'le code différé, exécuté en dernier' },
        ],
        placement: 'Pour visualiser que le synchrone passe toujours avant un setTimeout, même à 0.',
      },
      {
        id: 'priorites',
        label: 'Promesse vs timeout',
        codeBlocks: [
          {
            id: 'JS-F-1305-t-priorites',
            filename: 'ordre.js',
            language: 'javascript',
            code: `setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promesse"));

// Ordre : promesse AVANT timeout`,
          },
        ],
        replacements: [
          { token: '"promesse"', description: 'la microtâche (prioritaire sur le timeout)' },
          { token: '"timeout"', description: 'la macrotâche (exécutée en dernier)' },
        ],
        placement: 'Pour se souvenir que les promesses passent avant les setTimeout.',
      },
    ],
  }),
];
