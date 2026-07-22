import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const jsMethodsContent: ReadyContent[] = [
  // ————— Les template literals —————
  lesson({
    id: 'JS-F-1140-LESSON',
    slug: 'les-template-literals',
    title: 'Les template literals',
    shortTitle: 'Template literals',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Construire une chaîne de caractères avec des variables à l’intérieur, sans se battre avec les + de la concaténation.',
    utility: 'Insérer des variables et des calculs directement dans une chaîne de texte.',
    aliases: ['template literal', 'template string', 'backtick', 'interpolation', 'chaine gabarit', 'litteraux de gabarit'],
    keywords: [
      'inserer une variable dans un texte',
      'concatener autrement',
      'chaine sur plusieurs lignes',
      'accent grave',
      'interpolation',
      'construire un message',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1140-TEMPLATE',
    intro:
      'Un <b>template literal</b> est une chaîne de caractères écrite entre <b>backticks</b> (l’accent grave <code>`</code>) au lieu de guillemets. Sa force : tu peux glisser une variable ou un calcul directement dans le texte avec <code>${…}</code>, et écrire sur <b>plusieurs lignes</b> sans effort.',
    sections: [
      {
        id: 's1',
        title: 'Insérer une variable dans un texte',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher « Bonjour Alice, tu as 30 ans » </b> en assemblant un prénom et un âge stockés dans des variables.',
          },
          {
            type: 'paragraph',
            html: 'Avant, on collait les morceaux avec des <code>+</code> (la <b>concaténation</b>). Avec un template literal, on écrit le texte d’un bloc et on insère les variables avec <code>${nom}</code> — bien plus lisible.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1140-l-c1',
              filename: 'message.js',
              language: 'javascript',
              code: `const prenom = "Alice";
const age = 30;

// L'ancienne facon : la concatenation avec des +
const message1 = "Bonjour " + prenom + ", tu as " + age + " ans.";

// La nouvelle facon : un template literal entre backticks
// La variable se glisse dans le texte avec dollar puis accolades
const message2 = \`Bonjour \${prenom}, tu as \${age} ans.\`;

console.log(message2); // Bonjour Alice, tu as 30 ans.`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Le backtick</b> n’est pas l’apostrophe : c’est l’<b>accent grave</b> <code>`</code> (touche à côté du 1 sur un clavier AZERTY, ou AltGr + 7). Sans backtick, <code>${…}</code> reste du texte brut.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Calculs et plusieurs lignes',
        blocks: [
          {
            type: 'paragraph',
            html: 'Entre <code>${…}</code> tu peux mettre <b>n’importe quelle expression</b> : un calcul, un appel de fonction, une condition ternaire. Et un template literal respecte les <b>retours à la ligne</b> tels quels.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1140-l-c2',
              filename: 'facture.js',
              language: 'javascript',
              code: `const prix = 20;
const quantite = 3;

// On peut mettre un vrai calcul entre les accolades
const total = \`Total : \${prix * quantite} euros\`;
console.log(total); // Total : 60 euros

// Un template literal peut s'ecrire sur plusieurs lignes
const carte = \`
  Nom : \${"Alice"}
  Panier : \${total}
\`;`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> la concaténation avec <code>+</code>, c’est coudre des bouts de tissu un par un. Le template literal, c’est une <b>feuille de texte à trous</b> où tu déposes chaque variable à sa place.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Comparer les deux écritures',
        blocks: [
          {
            type: 'table',
            headers: ['Besoin', 'Concaténation', 'Template literal'],
            rows: [
              ['Insérer une variable', '<code>"Salut " + nom</code>', '<code>`Salut ${nom}`</code>'],
              ['Un calcul dans le texte', '<code>"= " + (a + b)</code>', '<code>`= ${a + b}`</code>'],
              ['Plusieurs lignes', '<code>"..." + "\\n" + "..."</code>', 'saut de ligne réel dans les backticks'],
              ['Guillemets dans le texte', 'échappement pénible', 'aucun souci'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Réflexe :</b> dès qu’une chaîne mélange du texte fixe et des variables, passe en template literal. On garde les guillemets simples/doubles pour les chaînes courtes et sans variable.',
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser des guillemets au lieu de backticks : <code>"Bonjour ${nom}"</code> affiche littéralement <code>${nom}</code>, sans remplacer la variable.',
      'Confondre l’accent grave <code>`</code> et l’apostrophe <code>\'</code> : seul le backtick active l’interpolation.',
      'Oublier le <code>$</code> devant les accolades : <code>`Bonjour {nom}`</code> ne remplace rien.',
      'Mettre une instruction (un <code>if</code>, une boucle) entre <code>${…}</code> : seules les <b>expressions</b> qui renvoient une valeur sont acceptées.',
    ],
    takeaways: [
      'template literal = chaîne entre <b>backticks</b> <code>`…`</code>',
      'insérer une valeur : <code>${variableOuCalcul}</code>',
      'gère les <b>retours à la ligne</b> sans <code>\\n</code>',
      'à privilégier dès qu’il y a une variable dans le texte',
    ],
  }),
  template({
    id: 'JS-F-1140-TEMPLATE',
    slug: 'les-template-literals',
    title: 'Template literals',
    shortTitle: 'Template literals',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code des template literals prêt à copier : variable simple, calcul, multiligne.',
    lede: 'Construire une chaîne avec des variables. Choisis le cas :',
    aliases: ['template literal', 'backtick', 'interpolation'],
    keywords: ['inserer variable', 'chaine multiligne', 'calcul dans texte'],
    relatedContentIds: [],
    lessonId: 'JS-F-1140-LESSON',
    variants: [
      {
        id: 'js-1140-var',
        label: 'Variable simple',
        codeBlocks: [
          {
            id: 'js-1140-t-var',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const message = \`Bonjour \${prenom} !\`;`,
          },
        ],
        replacements: [
          { token: 'prenom', description: 'la variable à insérer dans le texte' },
          { token: 'Bonjour', description: 'le texte fixe autour de la variable' },
        ],
        placement: 'Le cas de base : glisse une variable dans une phrase. Attention à bien utiliser des backticks, pas des guillemets.',
      },
      {
        id: 'js-1140-calc',
        label: 'Calcul / expression',
        codeBlocks: [
          {
            id: 'js-1140-t-calc',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const total = \`Total : \${prix * quantite} euros\`;`,
          },
        ],
        replacements: [
          { token: 'prix * quantite', description: 'l’expression à calculer (calcul, appel de fonction, ternaire…)' },
          { token: 'Total :', description: 'le libellé affiché devant la valeur' },
        ],
        placement: 'Quand la valeur à afficher demande un calcul. Tout ce qui renvoie une valeur peut aller entre les accolades.',
      },
      {
        id: 'js-1140-multi',
        label: 'Plusieurs lignes',
        codeBlocks: [
          {
            id: 'js-1140-t-multi',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const bloc = \`
  Nom : \${nom}
  Age : \${age}
\`;`,
          },
        ],
        replacements: [
          { token: 'nom', description: 'la première valeur à insérer' },
          { token: 'age', description: 'la seconde valeur à insérer' },
        ],
        placement: 'Pour un texte sur plusieurs lignes (mail, petit gabarit) : les sauts de ligne sont conservés tels quels.',
      },
    ],
  }),

  // ————— Les Promesses —————
  lesson({
    id: 'JS-F-1141-LESSON',
    slug: 'les-promesses',
    title: 'Les Promesses',
    shortTitle: 'Promesses',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Gérer une opération qui prend du temps (appel réseau, minuteur) et réagir quand elle réussit… ou échoue.',
    utility: 'Attendre le résultat d’une tâche asynchrone puis enchaîner la suite.',
    aliases: ['promise', 'promesse', 'asynchrone', 'then', 'catch', 'async await', 'await'],
    keywords: [
      'attendre un resultat',
      'appel reseau',
      'code asynchrone',
      'reussite ou echec',
      'enchainer des taches',
      'gerer une erreur',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1141-TEMPLATE',
    intro:
      'Une <b>Promesse</b> (Promise) représente un résultat qui n’est <b>pas encore là</b> — une valeur qui arrivera plus tard. Elle finit dans un de deux états : <b>résolue</b> (succès, via <code>then</code>) ou <b>rejetée</b> (échec, via <code>catch</code>).',
    sections: [
      {
        id: 's1',
        title: 'Consommer une promesse',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>récupérer des données depuis un serveur</b> puis afficher le résultat, sans bloquer le reste de la page pendant l’attente.',
          },
          {
            type: 'paragraph',
            html: 'Une fonction asynchrone (comme <code>fetch</code>) renvoie une promesse. On branche <code>.then()</code> pour le succès et <code>.catch()</code> pour l’erreur. Le code après continue de tourner : c’est ça, l’<b>asynchrone</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1141-l-c1',
              filename: 'donnees.js',
              language: 'javascript',
              code: `// fetch renvoie une promesse
fetch("https://api.exemple.com/users")
  .then((reponse) => reponse.json()) // 1. on transforme la reponse
  .then((donnees) => {
    // 2. ici, les donnees sont arrivees
    console.log(donnees);
  })
  .catch((erreur) => {
    // 3. si ca echoue, on passe ici
    console.log("Echec :", erreur);
  });

console.log("Cette ligne s'affiche AVANT les donnees");`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une promesse, c’est le <b>ticket du pressing</b>. On te le donne tout de suite, mais le vêtement (la valeur) n’est prêt que plus tard. <code>then</code> = tu récupères ton vêtement. <code>catch</code> = ils l’ont abîmé.',
          },
        ],
      },
      {
        id: 's2',
        title: 'async / await : la version lisible',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>async</code> et <code>await</code> font la <b>même chose</b> que <code>then</code>, mais le code se lit de haut en bas comme du code normal. <code>await</code> met en pause jusqu’au résultat, et on gère l’erreur avec <code>try / catch</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1141-l-c2',
              filename: 'donnees.js',
              language: 'javascript',
              code: `// Le mot-cle async devant la fonction autorise await
async function chargerUsers() {
  try {
    // await attend que la promesse soit resolue
    const reponse = await fetch("https://api.exemple.com/users");
    const donnees = await reponse.json();
    console.log(donnees);
  } catch (erreur) {
    // toute erreur du bloc try atterrit ici
    console.log("Echec :", erreur);
  }
}

chargerUsers();`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle :</b> <code>await</code> ne s’utilise qu’à l’intérieur d’une fonction marquée <code>async</code>. En dehors, il provoque une erreur.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Créer sa propre promesse',
        blocks: [
          {
            type: 'paragraph',
            html: 'Plus rare, mais utile : on peut <b>fabriquer</b> une promesse avec <code>new Promise</code>. On reçoit deux fonctions : <code>resolve</code> (succès) et <code>reject</code> (échec).',
          },
          {
            type: 'code',
            block: {
              id: 'js-1141-l-c3',
              filename: 'attendre.js',
              language: 'javascript',
              code: `// Une promesse qui se resout apres un delai
function attendre(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      reject("Delai negatif"); // echec
      return;
    }
    setTimeout(() => resolve("Termine"), ms); // succes
  });
}

attendre(1000).then((message) => console.log(message));`,
            },
          },
          {
            type: 'table',
            headers: ['État', 'Déclenché par', 'On le lit avec'],
            rows: [
              ['en attente', 'la promesse vient de démarrer', '—'],
              ['résolue', '<code>resolve(valeur)</code>', '<code>.then()</code> / <code>await</code>'],
              ['rejetée', '<code>reject(erreur)</code>', '<code>.catch()</code> / <code>try…catch</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>await</code> (ou <code>.then</code>) : tu récupères la promesse elle-même, pas la valeur. <code>console.log</code> affiche alors <code>Promise { … }</code>.',
      'Utiliser <code>await</code> hors d’une fonction <code>async</code> : erreur de syntaxe.',
      'Oublier <code>.catch()</code> ou le <code>try/catch</code> : une erreur réseau passe inaperçue et casse la suite.',
      'Croire que le code attend : sans <code>await</code>, les lignes suivantes s’exécutent <b>avant</b> que la promesse soit résolue.',
    ],
    takeaways: [
      'une promesse = une valeur qui arrive <b>plus tard</b> (succès ou échec)',
      '<code>.then()</code> = succès · <code>.catch()</code> = erreur',
      '<code>async/await</code> = même chose, écrit de haut en bas + <code>try/catch</code>',
      '<code>await</code> uniquement dans une fonction <code>async</code>',
    ],
  }),
  template({
    id: 'JS-F-1141-TEMPLATE',
    slug: 'les-promesses',
    title: 'Promesses',
    shortTitle: 'Promesses',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code asynchrone prêt à copier : then/catch, async/await, création de promesse.',
    lede: 'Gérer une opération asynchrone. Choisis le style :',
    aliases: ['promise', 'promesse', 'async await', 'then', 'catch'],
    keywords: ['asynchrone', 'attendre resultat', 'fetch'],
    relatedContentIds: [],
    lessonId: 'JS-F-1141-LESSON',
    variants: [
      {
        id: 'js-1141-await',
        label: 'async / await',
        codeBlocks: [
          {
            id: 'js-1141-t-await',
            filename: 'exemple.js',
            language: 'javascript',
            code: `async function charger() {
  try {
    const reponse = await fetch(url);
    const donnees = await reponse.json();
    console.log(donnees);
  } catch (erreur) {
    console.log(erreur);
  }
}`,
          },
        ],
        replacements: [
          { token: 'url', description: 'l’adresse à appeler' },
          { token: 'charger', description: 'le nom de ta fonction' },
        ],
        placement: 'Le style recommandé au quotidien : lisible de haut en bas, erreurs gérées par try/catch.',
      },
      {
        id: 'js-1141-then',
        label: 'then / catch',
        codeBlocks: [
          {
            id: 'js-1141-t-then',
            filename: 'exemple.js',
            language: 'javascript',
            code: `fetch(url)
  .then((reponse) => reponse.json())
  .then((donnees) => console.log(donnees))
  .catch((erreur) => console.log(erreur));`,
          },
        ],
        replacements: [
          { token: 'url', description: 'l’adresse à appeler' },
        ],
        placement: 'Le style chaîné, courant dans le code existant. Chaque .then reçoit le résultat du précédent.',
      },
      {
        id: 'js-1141-new',
        label: 'Créer une promesse',
        codeBlocks: [
          {
            id: 'js-1141-t-new',
            filename: 'exemple.js',
            language: 'javascript',
            code: `function maTache() {
  return new Promise((resolve, reject) => {
    if (toutVaBien) {
      resolve(valeur);
    } else {
      reject("Echec");
    }
  });
}`,
          },
        ],
        replacements: [
          { token: 'toutVaBien', description: 'la condition de succès' },
          { token: 'valeur', description: 'la valeur renvoyée en cas de succès' },
        ],
        placement: 'Pour transformer une API à callback (setTimeout, etc.) en promesse que l’on peut await.',
      },
    ],
  }),

  // ————— Les méthodes de texte —————
  lesson({
    id: 'JS-F-1142-LESSON',
    slug: 'les-methodes-de-texte-touppercase-split-slice',
    title: 'Les méthodes de texte : toUpperCase, split, slice',
    shortTitle: 'Méthodes de texte',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Transformer et découper une chaîne : mettre en majuscules, couper en morceaux, extraire une partie.',
    utility: 'Manipuler du texte : casse, découpage, extraction.',
    aliases: ['string', 'chaine', 'touppercase', 'tolowercase', 'split', 'slice', 'trim', 'methodes texte'],
    keywords: [
      'mettre en majuscules',
      'couper une chaine',
      'extraire une partie',
      'decouper une phrase',
      'transformer du texte',
      'nettoyer les espaces',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1142-TEMPLATE',
    intro:
      'Une chaîne de caractères possède des <b>méthodes</b> intégrées pour la transformer. Les plus utiles : <code>toUpperCase()</code> (majuscules), <code>split()</code> (couper en tableau) et <code>slice()</code> (extraire une portion). Elles renvoient une <b>nouvelle</b> chaîne, sans modifier l’originale.',
    sections: [
      {
        id: 's1',
        title: 'Changer la casse et nettoyer',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>normaliser un email saisi par l’utilisateur</b> : tout en minuscules et sans espaces autour, avant de l’enregistrer.',
          },
          {
            type: 'paragraph',
            html: '<code>toLowerCase()</code> et <code>toUpperCase()</code> changent la casse. <code>trim()</code> retire les espaces au début et à la fin. On les <b>enchaîne</b> à la suite.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1142-l-c1',
              filename: 'texte.js',
              language: 'javascript',
              code: `const saisie = "  Alice@Exemple.COM  ";

// trim() enleve les espaces au debut et a la fin
// toLowerCase() met tout en minuscules
const email = saisie.trim().toLowerCase();
console.log(email); // "alice@exemple.com"

// toUpperCase() met tout en majuscules
console.log("bonjour".toUpperCase()); // "BONJOUR"`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Important :</b> ces méthodes ne modifient <b>pas</b> la variable d’origine, elles renvoient une <b>nouvelle</b> chaîne. Pense à récupérer le résultat dans une variable.',
          },
        ],
      },
      {
        id: 's2',
        title: 'split : couper en tableau',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>split(separateur)</code> découpe la chaîne à chaque séparateur et renvoie un <b>tableau</b>. Très pratique pour transformer une phrase en liste de mots, ou une ligne CSV en colonnes.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1142-l-c2',
              filename: 'texte.js',
              language: 'javascript',
              code: `const phrase = "pomme,banane,cerise";

// On coupe a chaque virgule -> un tableau
const fruits = phrase.split(",");
console.log(fruits); // ["pomme", "banane", "cerise"]

// Couper a chaque espace pour compter les mots
const mots = "j aime le code".split(" ");
console.log(mots.length); // 4

// split("") coupe chaque caractere
console.log("abc".split("")); // ["a", "b", "c"]`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>split</code>, c’est le <b>massicot</b> : tu poses la bande de texte, tu indiques où couper (le séparateur), et tu récupères une pile de morceaux (le tableau).',
          },
        ],
      },
      {
        id: 's3',
        title: 'slice : extraire une portion',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>slice(debut, fin)</code> extrait une portion de la chaîne, du caractère <code>debut</code> (inclus) jusqu’à <code>fin</code> (exclu). Les positions commencent à <b>0</b>. Un nombre négatif compte à partir de la fin.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1142-l-c3',
              filename: 'texte.js',
              language: 'javascript',
              code: `const mot = "JavaScript";

// De la position 0 (incluse) a 4 (exclue)
console.log(mot.slice(0, 4)); // "Java"

// A partir de la position 4 jusqu'a la fin
console.log(mot.slice(4)); // "Script"

// Un nombre negatif part de la fin
console.log(mot.slice(-6)); // "Script"`,
            },
          },
          {
            type: 'table',
            headers: ['Méthode', 'Rôle', 'Renvoie'],
            rows: [
              ['<code>toUpperCase()</code>', 'tout en majuscules', 'une chaîne'],
              ['<code>toLowerCase()</code>', 'tout en minuscules', 'une chaîne'],
              ['<code>trim()</code>', 'enlève les espaces aux extrémités', 'une chaîne'],
              ['<code>split(sep)</code>', 'coupe en morceaux', 'un tableau'],
              ['<code>slice(a, b)</code>', 'extrait une portion', 'une chaîne'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que la variable est modifiée : <code>texte.toUpperCase()</code> ne change pas <code>texte</code>. Récupère le résultat : <code>const t = texte.toUpperCase()</code>.',
      'Oublier les parenthèses : <code>texte.toUpperCase</code> (sans <code>()</code>) renvoie la fonction, pas le texte transformé.',
      'Se tromper d’indice avec <code>slice</code> : la <b>fin est exclue</b>. <code>slice(0, 4)</code> prend 4 caractères (positions 0 à 3).',
      'Confondre <code>split("")</code> (coupe chaque caractère) et <code>split(" ")</code> (coupe à chaque espace).',
    ],
    takeaways: [
      '<code>toUpperCase()</code> / <code>toLowerCase()</code> = changer la casse',
      '<code>trim()</code> = enlever les espaces au début et à la fin',
      '<code>split(sep)</code> = chaîne → <b>tableau</b> · <code>slice(a, b)</code> = extraire une portion (fin exclue)',
      'ces méthodes renvoient une <b>nouvelle</b> chaîne, elles ne modifient pas l’originale',
    ],
  }),
  template({
    id: 'JS-F-1142-TEMPLATE',
    slug: 'les-methodes-de-texte-touppercase-split-slice',
    title: 'Méthodes de texte',
    shortTitle: 'Méthodes de texte',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Les méthodes de chaîne prêtes à copier : casse, découpage, extraction.',
    lede: 'Transformer une chaîne. Choisis l’opération :',
    aliases: ['string', 'touppercase', 'split', 'slice', 'trim'],
    keywords: ['majuscules', 'couper chaine', 'extraire texte'],
    relatedContentIds: [],
    lessonId: 'JS-F-1142-LESSON',
    variants: [
      {
        id: 'js-1142-casse',
        label: 'Casse + trim',
        codeBlocks: [
          {
            id: 'js-1142-t-casse',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const propre = texte.trim().toLowerCase();`,
          },
        ],
        replacements: [
          { token: 'texte', description: 'la chaîne à normaliser' },
          { token: 'toLowerCase', description: 'toLowerCase pour minuscules, toUpperCase pour majuscules' },
        ],
        placement: 'Pour nettoyer une saisie utilisateur (email, identifiant) avant de la stocker ou de la comparer.',
      },
      {
        id: 'js-1142-split',
        label: 'split (couper)',
        codeBlocks: [
          {
            id: 'js-1142-t-split',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const morceaux = texte.split(",");`,
          },
        ],
        replacements: [
          { token: 'texte', description: 'la chaîne à découper' },
          { token: '","', description: 'le séparateur (virgule, espace " ", ou "" pour chaque caractère)' },
        ],
        placement: 'Pour transformer une chaîne en tableau : mots d’une phrase, valeurs d’une ligne CSV, etc.',
      },
      {
        id: 'js-1142-slice',
        label: 'slice (extraire)',
        codeBlocks: [
          {
            id: 'js-1142-t-slice',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const portion = texte.slice(0, 5);`,
          },
        ],
        replacements: [
          { token: 'texte', description: 'la chaîne source' },
          { token: '0, 5', description: 'position de début (incluse) et de fin (exclue)' },
        ],
        placement: 'Pour extraire un extrait : les 5 premiers caractères, une sous-chaîne, un aperçu tronqué.',
      },
    ],
  }),

  // ————— Les méthodes de nombre —————
  lesson({
    id: 'JS-F-1143-LESSON',
    slug: 'les-methodes-de-nombre-tofixed-parseint',
    title: 'Les méthodes de nombre : toFixed, parseInt',
    shortTitle: 'Méthodes de nombre',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Arrondir un nombre à x décimales (toFixed) et convertir une chaîne en nombre (parseInt, parseFloat, Number).',
    utility: 'Formater un nombre pour l’affichage et convertir du texte en nombre.',
    aliases: ['number', 'nombre', 'tofixed', 'parseint', 'parsefloat', 'arrondir', 'convertir en nombre'],
    keywords: [
      'arrondir un nombre',
      'deux decimales',
      'afficher un prix',
      'convertir texte en nombre',
      'chaine vers nombre',
      'nettoyer un input',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1143-TEMPLATE',
    intro:
      'Deux besoins fréquents avec les nombres : les <b>afficher</b> proprement (arrondir un prix à 2 décimales avec <code>toFixed()</code>) et <b>convertir</b> un texte en nombre (<code>parseInt()</code>, <code>Number()</code>) — car un champ de formulaire renvoie toujours du texte.',
    sections: [
      {
        id: 's1',
        title: 'toFixed : arrondir pour afficher',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher un prix comme « 19.90 € »</b> alors que mon calcul me donne <code>19.9</code> ou <code>19.8999999</code>.',
          },
          {
            type: 'paragraph',
            html: '<code>toFixed(n)</code> arrondit à <code>n</code> décimales et renvoie une <b>chaîne</b> (parfait pour l’affichage). Attention : le résultat n’est plus un nombre.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1143-l-c1',
              filename: 'nombre.js',
              language: 'javascript',
              code: `const prix = 19.8999999;

// toFixed(2) arrondit a 2 decimales -> une CHAINE
const affiche = prix.toFixed(2);
console.log(affiche); // "19.90"

// Il complete avec des zeros si besoin
console.log((5).toFixed(2)); // "5.00"

// Attention : le resultat est du texte, plus un nombre
console.log(typeof affiche); // "string"`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>toFixed()</code> sert à l’<b>affichage</b>, pas au calcul. Ne réutilise pas son résultat dans une addition sans le reconvertir en nombre.',
          },
        ],
      },
      {
        id: 's2',
        title: 'parseInt et parseFloat : texte → nombre',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>parseInt()</code> lit un <b>entier</b> au début d’une chaîne, <code>parseFloat()</code> lit un nombre à <b>virgule</b>. Ils tolèrent le texte qui traîne après le nombre (comme <code>"px"</code>).',
          },
          {
            type: 'code',
            block: {
              id: 'js-1143-l-c2',
              filename: 'nombre.js',
              language: 'javascript',
              code: `// parseInt lit un entier au debut de la chaine
console.log(parseInt("42")); // 42
console.log(parseInt("16px")); // 16 (ignore "px")

// parseFloat garde les decimales
console.log(parseFloat("3.14 metres")); // 3.14

// Si ca ne commence pas par un chiffre -> NaN
console.log(parseInt("abc")); // NaN (Not a Number)`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>parseInt</code> lit la chaîne <b>de gauche à droite</b> et s’arrête au premier caractère qui n’est pas un chiffre — comme quelqu’un qui recopie un numéro et lâche le stylo dès qu’il voit une lettre.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Number : la conversion stricte',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>Number()</code> convertit la chaîne <b>entière</b> en nombre : elle doit être un nombre <b>propre</b>, sinon c’est <code>NaN</code>. Plus strict que <code>parseInt</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1143-l-c3',
              filename: 'nombre.js',
              language: 'javascript',
              code: `console.log(Number("42")); // 42
console.log(Number("3.14")); // 3.14

// Toute la chaine doit etre un nombre valide
console.log(Number("16px")); // NaN
console.log(Number("")); // 0`,
            },
          },
          {
            type: 'table',
            headers: ['Outil', 'Convertit', 'Cas particulier'],
            rows: [
              ['<code>parseInt(x)</code>', 'un entier', 'ignore le texte après'],
              ['<code>parseFloat(x)</code>', 'un décimal', 'ignore le texte après'],
              ['<code>Number(x)</code>', 'toute la chaîne', '<code>NaN</code> si pas propre'],
              ['<code>n.toFixed(2)</code>', 'nombre → chaîne', 'arrondi pour l’affichage'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Additionner sans convertir : <code>"2" + 3</code> donne <code>"23"</code> (une chaîne), pas <code>5</code>. Convertis d’abord avec <code>Number()</code>.',
      'Oublier que <code>toFixed()</code> renvoie une <b>chaîne</b> : <code>prix.toFixed(2) + 1</code> concatène au lieu d’ajouter.',
      'Utiliser <code>parseInt</code> sur <code>"16px"</code> puis s’étonner qu’il vaille <code>16</code> : il ignore volontairement la suite.',
      'Ne pas tester <code>NaN</code> après conversion : vérifie avec <code>Number.isNaN(valeur)</code> avant de calculer.',
    ],
    takeaways: [
      '<code>toFixed(n)</code> = arrondir à n décimales → renvoie une <b>chaîne</b> (affichage)',
      '<code>parseInt</code> / <code>parseFloat</code> = lire un nombre au <b>début</b> d’une chaîne',
      '<code>Number()</code> = convertir toute la chaîne (plus strict, <code>NaN</code> si invalide)',
      'un champ de formulaire renvoie toujours du <b>texte</b> : convertis avant de calculer',
    ],
  }),
  template({
    id: 'JS-F-1143-TEMPLATE',
    slug: 'les-methodes-de-nombre-tofixed-parseint',
    title: 'Méthodes de nombre',
    shortTitle: 'Méthodes de nombre',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Formater et convertir un nombre : toFixed, parseInt, Number.',
    lede: 'Formater ou convertir un nombre. Choisis le cas :',
    aliases: ['tofixed', 'parseint', 'number', 'arrondir'],
    keywords: ['arrondir', 'convertir nombre', 'decimales'],
    relatedContentIds: [],
    lessonId: 'JS-F-1143-LESSON',
    variants: [
      {
        id: 'js-1143-fixed',
        label: 'Arrondir (toFixed)',
        codeBlocks: [
          {
            id: 'js-1143-t-fixed',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const affiche = prix.toFixed(2);`,
          },
        ],
        replacements: [
          { token: 'prix', description: 'le nombre à arrondir' },
          { token: '2', description: 'le nombre de décimales voulues' },
        ],
        placement: 'Pour afficher un prix ou un pourcentage. Le résultat est une chaîne, à ne pas réutiliser dans un calcul.',
      },
      {
        id: 'js-1143-parseint',
        label: 'Texte → entier',
        codeBlocks: [
          {
            id: 'js-1143-t-parseint',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const n = parseInt(texte, 10);`,
          },
        ],
        replacements: [
          { token: 'texte', description: 'la chaîne contenant le nombre' },
          { token: '10', description: 'la base (10 = décimal, à préciser par sécurité)' },
        ],
        placement: 'Pour lire un entier issu d’un champ ou d’une valeur CSS ("16px"). parseFloat si tu veux les décimales.',
      },
      {
        id: 'js-1143-number',
        label: 'Conversion stricte',
        codeBlocks: [
          {
            id: 'js-1143-t-number',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const n = Number(texte);
if (Number.isNaN(n)) {
  console.log("Ce n'est pas un nombre valide");
}`,
          },
        ],
        replacements: [
          { token: 'texte', description: 'la chaîne à convertir entièrement' },
        ],
        placement: 'Quand la chaîne doit être un nombre propre. Vérifie NaN avant de t’en servir dans un calcul.',
      },
    ],
  }),

  // ————— JSON.parse et JSON.stringify —————
  lesson({
    id: 'JS-F-1144-LESSON',
    slug: 'json-parse-et-json-stringify',
    title: 'JSON.parse et JSON.stringify',
    shortTitle: 'JSON',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Convertir un objet JavaScript en texte (stringify) et retransformer ce texte en objet (parse) — pour stocker ou envoyer des données.',
    utility: 'Passer d’un objet JS à du texte et inversement, pour stocker ou transmettre.',
    aliases: ['json', 'parse', 'stringify', 'serialisation', 'localstorage', 'objet en texte'],
    keywords: [
      'objet en texte',
      'texte en objet',
      'stocker un objet',
      'localstorage',
      'envoyer des donnees',
      'serialiser',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1144-TEMPLATE',
    intro:
      'Le <b>JSON</b> est un format texte pour représenter des données. <code>JSON.stringify()</code> transforme un objet JS en <b>chaîne</b> (pour l’enregistrer ou l’envoyer), et <code>JSON.parse()</code> refait le chemin inverse : <b>chaîne → objet</b>.',
    sections: [
      {
        id: 's1',
        title: 'Objet → texte pour stocker',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>enregistrer le panier de l’utilisateur dans le localStorage</b>, qui n’accepte que du texte, pas des objets.',
          },
          {
            type: 'paragraph',
            html: '<code>localStorage</code> ne stocke que des chaînes. On transforme donc l’objet en texte avec <code>JSON.stringify()</code> avant de l’enregistrer.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1144-l-c1',
              filename: 'panier.js',
              language: 'javascript',
              code: `const panier = { produit: "Livre", quantite: 2 };

// JSON.stringify transforme l'objet en texte
const texte = JSON.stringify(panier);
console.log(texte); // {"produit":"Livre","quantite":2}

// On peut alors le stocker (localStorage n'accepte que du texte)
localStorage.setItem("panier", texte);`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>stringify</code>, c’est <b>mettre à plat un meuble en kit</b> pour le glisser dans un carton (le texte). <code>parse</code>, c’est le <b>remonter</b> à l’arrivée pour retrouver l’objet utilisable.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Texte → objet pour relire',
        blocks: [
          {
            type: 'paragraph',
            html: 'Au moment de relire la donnée, on récupère du <b>texte</b>. <code>JSON.parse()</code> le retransforme en objet, avec ses propriétés à nouveau accessibles.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1144-l-c2',
              filename: 'panier.js',
              language: 'javascript',
              code: `// On relit le texte stocke
const texte = localStorage.getItem("panier");

// JSON.parse retransforme le texte en objet
const panier = JSON.parse(texte);

// On peut de nouveau acceder aux proprietes
console.log(panier.produit); // "Livre"
console.log(panier.quantite); // 2`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Le duo va toujours ensemble :</b> <code>stringify</code> pour sortir (stocker/envoyer), <code>parse</code> pour rentrer (relire). L’un annule l’autre.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Affichage lisible et pièges',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>JSON.stringify()</code> accepte deux arguments en plus pour un rendu <b>indenté</b> et lisible — pratique pour déboguer ou écrire dans un fichier.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1144-l-c3',
              filename: 'debug.js',
              language: 'javascript',
              code: `const user = { nom: "Alice", roles: ["admin"] };

// Le 3e argument = nombre d'espaces d'indentation
const joli = JSON.stringify(user, null, 2);
console.log(joli);
// {
//   "nom": "Alice",
//   "roles": [
//     "admin"
//   ]
// }`,
            },
          },
          {
            type: 'table',
            headers: ['Méthode', 'Sens', 'Résultat'],
            rows: [
              ['<code>JSON.stringify(obj)</code>', 'objet → texte', 'une chaîne'],
              ['<code>JSON.parse(txt)</code>', 'texte → objet', 'un objet'],
              ['<code>stringify(obj, null, 2)</code>', 'objet → texte indenté', 'chaîne lisible'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Stocker un objet directement dans <code>localStorage</code> : il devient <code>"[object Object]"</code>. Passe par <code>JSON.stringify</code>.',
      '<code>JSON.parse</code> sur un texte invalide (ou <code>null</code>) lève une erreur : entoure-le d’un <code>try/catch</code>.',
      'Perdre certaines valeurs : <code>stringify</code> ignore les <code>undefined</code> et les fonctions, et transforme les <code>Date</code> en chaîne.',
      'Oublier de <code>parse</code> à la relecture : tu manipules du texte et <code>panier.produit</code> vaut <code>undefined</code>.',
    ],
    takeaways: [
      '<code>JSON.stringify(obj)</code> = objet → <b>texte</b> (pour stocker / envoyer)',
      '<code>JSON.parse(txt)</code> = texte → <b>objet</b> (pour relire)',
      'le duo va toujours ensemble : l’un fait l’aller, l’autre le retour',
      '<code>JSON.stringify(obj, null, 2)</code> = version indentée lisible',
    ],
  }),
  template({
    id: 'JS-F-1144-TEMPLATE',
    slug: 'json-parse-et-json-stringify',
    title: 'JSON.parse / stringify',
    shortTitle: 'JSON',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Convertir objet ↔ texte : stringify, parse, localStorage.',
    lede: 'Passer d’un objet à du texte et retour. Choisis le sens :',
    aliases: ['json', 'stringify', 'parse', 'localstorage'],
    keywords: ['objet en texte', 'stocker objet', 'serialiser'],
    relatedContentIds: [],
    lessonId: 'JS-F-1144-LESSON',
    variants: [
      {
        id: 'js-1144-stringify',
        label: 'Objet → texte',
        codeBlocks: [
          {
            id: 'js-1144-t-stringify',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const texte = JSON.stringify(objet);`,
          },
        ],
        replacements: [
          { token: 'objet', description: 'l’objet ou le tableau à transformer en texte' },
        ],
        placement: 'Avant de stocker (localStorage) ou d’envoyer (corps d’une requête) : les données doivent être du texte.',
      },
      {
        id: 'js-1144-parse',
        label: 'Texte → objet',
        codeBlocks: [
          {
            id: 'js-1144-t-parse',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const objet = JSON.parse(texte);`,
          },
        ],
        replacements: [
          { token: 'texte', description: 'la chaîne JSON à retransformer en objet' },
        ],
        placement: 'À la relecture d’une donnée stockée ou reçue, pour retrouver un objet manipulable.',
      },
      {
        id: 'js-1144-storage',
        label: 'localStorage (aller-retour)',
        codeBlocks: [
          {
            id: 'js-1144-t-storage',
            filename: 'exemple.js',
            language: 'javascript',
            code: `// Enregistrer
localStorage.setItem("cle", JSON.stringify(objet));

// Relire
const objet = JSON.parse(localStorage.getItem("cle"));`,
          },
        ],
        replacements: [
          { token: '"cle"', description: 'le nom sous lequel tu stockes la donnée' },
          { token: 'objet', description: 'l’objet à enregistrer puis relire' },
        ],
        placement: 'Le combo complet pour persister un objet côté navigateur : stringify à l’écriture, parse à la lecture.',
      },
    ],
  }),

  // ————— setTimeout et setInterval —————
  lesson({
    id: 'JS-F-1145-LESSON',
    slug: 'settimeout-et-setinterval',
    title: 'setTimeout et setInterval',
    shortTitle: 'setTimeout / setInterval',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Exécuter du code plus tard (setTimeout) ou de façon répétée à intervalle régulier (setInterval), et savoir les arrêter.',
    utility: 'Déclencher du code après un délai ou de façon répétée.',
    aliases: ['settimeout', 'setinterval', 'cleartimeout', 'clearinterval', 'delai', 'minuteur', 'timer'],
    keywords: [
      'executer plus tard',
      'attendre un delai',
      'repeter toutes les secondes',
      'minuteur',
      'arreter un timer',
      'compte a rebours',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1145-TEMPLATE',
    intro:
      'Deux fonctions pour piloter le temps : <code>setTimeout</code> exécute du code <b>une fois</b>, après un délai. <code>setInterval</code> le répète <b>en boucle</b>, à intervalle régulier. Chacune renvoie un <b>identifiant</b> qui permet de l’annuler.',
    sections: [
      {
        id: 's1',
        title: 'setTimeout : une fois, plus tard',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher un message de bienvenue 3 secondes après le chargement</b> de la page, une seule fois.',
          },
          {
            type: 'paragraph',
            html: '<code>setTimeout(fonction, delai)</code> attend le délai (en <b>millisecondes</b>) puis exécute la fonction une fois. <code>1000</code> ms = 1 seconde.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1145-l-c1',
              filename: 'timer.js',
              language: 'javascript',
              code: `// Apres 3000 ms (3 secondes), on execute la fonction
setTimeout(() => {
  console.log("Bienvenue !");
}, 3000);

console.log("Ceci s'affiche tout de suite");
// La fonction du setTimeout passe APRES, 3 s plus tard`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Attention :</b> le délai est en <b>millisecondes</b>, pas en secondes. Pour 2 secondes, écris <code>2000</code>, pas <code>2</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'setInterval : en boucle',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>setInterval(fonction, delai)</code> répète la fonction <b>toutes les</b> <code>delai</code> ms, sans s’arrêter. Il faut penser à l’<b>annuler</b> avec <code>clearInterval</code>, sinon il tourne indéfiniment.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1145-l-c2',
              filename: 'timer.js',
              language: 'javascript',
              code: `let secondes = 0;

// On garde l'identifiant renvoye par setInterval
const id = setInterval(() => {
  secondes = secondes + 1;
  console.log(secondes);

  // On arrete apres 5 tours
  if (secondes >= 5) {
    clearInterval(id); // stoppe la boucle
  }
}, 1000);`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>setTimeout</code> = un <b>minuteur de cuisine</b> qui sonne une fois. <code>setInterval</code> = une <b>horloge</b> qui tique sans fin — tant que tu ne débranches pas (<code>clearInterval</code>).',
          },
        ],
      },
      {
        id: 's3',
        title: 'Annuler un timer',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les deux fonctions renvoient un <b>identifiant</b>. On le passe à <code>clearTimeout</code> ou <code>clearInterval</code> pour annuler avant qu’il ne se déclenche (ou pour stopper la boucle).',
          },
          {
            type: 'code',
            block: {
              id: 'js-1145-l-c3',
              filename: 'timer.js',
              language: 'javascript',
              code: `// On recupere l'identifiant
const idTimeout = setTimeout(() => {
  console.log("Trop tard");
}, 5000);

// Finalement, on annule avant les 5 s
clearTimeout(idTimeout); // la fonction ne s'executera jamais`,
            },
          },
          {
            type: 'table',
            headers: ['Fonction', 'Effet', 'Pour annuler'],
            rows: [
              ['<code>setTimeout(f, ms)</code>', 'exécute <b>une fois</b> après ms', '<code>clearTimeout(id)</code>'],
              ['<code>setInterval(f, ms)</code>', 'répète <b>toutes les</b> ms', '<code>clearInterval(id)</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Donner le délai en secondes : <code>setTimeout(f, 3)</code> attend 3 <b>millisecondes</b>, pas 3 secondes. Écris <code>3000</code>.',
      'Oublier <code>clearInterval</code> : la boucle continue en arrière-plan et peut consommer des ressources (voire s’empiler).',
      'Appeler la fonction au lieu de la passer : <code>setTimeout(f(), 1000)</code> l’exécute <b>tout de suite</b>. Passe <code>f</code> ou <code>() => f()</code>.',
      'Perdre l’identifiant : sans lui, impossible d’annuler le timer. Range-le dans une variable.',
    ],
    takeaways: [
      '<code>setTimeout</code> = <b>une fois</b> après un délai · <code>setInterval</code> = <b>en boucle</b>',
      'le délai est en <b>millisecondes</b> (1000 = 1 s)',
      'chaque timer renvoie un <b>id</b> → <code>clearTimeout(id)</code> / <code>clearInterval(id)</code>',
      'toujours prévoir comment <b>arrêter</b> un <code>setInterval</code>',
    ],
  }),
  template({
    id: 'JS-F-1145-TEMPLATE',
    slug: 'settimeout-et-setinterval',
    title: 'setTimeout / setInterval',
    shortTitle: 'Timers',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code des timers prêt à copier : délai unique, répétition, annulation.',
    lede: 'Déclencher du code dans le temps. Choisis le cas :',
    aliases: ['settimeout', 'setinterval', 'timer', 'delai'],
    keywords: ['executer plus tard', 'repeter', 'arreter timer'],
    relatedContentIds: [],
    lessonId: 'JS-F-1145-LESSON',
    variants: [
      {
        id: 'js-1145-timeout',
        label: 'Une fois (setTimeout)',
        codeBlocks: [
          {
            id: 'js-1145-t-timeout',
            filename: 'exemple.js',
            language: 'javascript',
            code: `setTimeout(() => {
  console.log("Plus tard");
}, 2000);`,
          },
        ],
        replacements: [
          { token: 'console.log("Plus tard")', description: 'le code à exécuter après le délai' },
          { token: '2000', description: 'le délai en millisecondes (2000 = 2 secondes)' },
        ],
        placement: 'Pour retarder une action unique : afficher un message, rediriger, masquer une notification.',
      },
      {
        id: 'js-1145-interval',
        label: 'Répéter (setInterval)',
        codeBlocks: [
          {
            id: 'js-1145-t-interval',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const id = setInterval(() => {
  console.log("Tic");
}, 1000);`,
          },
        ],
        replacements: [
          { token: 'console.log("Tic")', description: 'le code à répéter à chaque intervalle' },
          { token: '1000', description: 'l’intervalle entre deux exécutions, en millisecondes' },
        ],
        placement: 'Pour une action répétée : horloge, compte à rebours, rafraîchissement. Garde l’id pour l’arrêter.',
      },
      {
        id: 'js-1145-clear',
        label: 'Annuler',
        codeBlocks: [
          {
            id: 'js-1145-t-clear',
            filename: 'exemple.js',
            language: 'javascript',
            code: `const id = setInterval(tick, 1000);

// Plus tard, pour tout arreter :
clearInterval(id);`,
          },
        ],
        replacements: [
          { token: 'tick', description: 'la fonction répétée' },
          { token: 'clearInterval', description: 'clearInterval pour setInterval, clearTimeout pour setTimeout' },
        ],
        placement: 'Dès qu’un timer doit pouvoir s’arrêter (condition atteinte, composant démonté) : range son id et annule-le.',
      },
    ],
  }),

  // ————— Les classes —————
  lesson({
    id: 'JS-F-1146-LESSON',
    slug: 'les-classes',
    title: 'Les classes',
    shortTitle: 'Classes',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Définir un modèle (class) pour créer des objets qui partagent la même structure et les mêmes méthodes.',
    utility: 'Créer un modèle réutilisable pour fabriquer des objets similaires.',
    aliases: ['class', 'classe', 'constructor', 'new', 'this', 'methode', 'extends', 'heritage'],
    keywords: [
      'creer un modele d objet',
      'constructeur',
      'instancier',
      'mot cle new',
      'methode d objet',
      'heritage',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1146-TEMPLATE',
    intro:
      'Une <b>classe</b> est un <b>modèle</b> (un plan) pour fabriquer des objets qui se ressemblent. Le <code>constructor</code> initialise chaque objet, les <b>méthodes</b> définissent ce qu’il sait faire, et <code>new</code> crée un exemplaire (une <b>instance</b>).',
    sections: [
      {
        id: 's1',
        title: 'Définir une classe et l’instancier',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>créer plusieurs comptes utilisateurs</b> qui ont tous un nom, un solde, et savent afficher leur solde — sans réécrire le même code à chaque fois.',
          },
          {
            type: 'paragraph',
            html: 'On écrit le modèle une fois avec <code>class</code>. Le <code>constructor</code> reçoit les valeurs de départ et les range dans <code>this</code>. Ensuite, <code>new</code> fabrique autant d’objets qu’on veut.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1146-l-c1',
              filename: 'compte.js',
              language: 'javascript',
              code: `class Compte {
  // Le constructor initialise chaque nouvel objet
  constructor(nom, solde) {
    this.nom = nom;     // this = l'objet en cours de creation
    this.solde = solde;
  }

  // Une methode : ce que l'objet sait faire
  afficher() {
    console.log(this.nom + " : " + this.solde + " euros");
  }
}

// new fabrique une instance a partir du modele
const compte1 = new Compte("Alice", 100);
compte1.afficher(); // Alice : 100 euros`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> un nom de classe commence par une <b>majuscule</b> (<code>Compte</code>, <code>User</code>). Et on n’oublie jamais le mot-clé <code>new</code> pour créer une instance.',
          },
        ],
      },
      {
        id: 's2',
        title: 'this et les méthodes',
        blocks: [
          {
            type: 'paragraph',
            html: 'À l’intérieur d’une méthode, <code>this</code> désigne l’objet <b>sur lequel on l’appelle</b>. Une méthode peut lire et modifier les données de l’objet via <code>this</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1146-l-c2',
              filename: 'compte.js',
              language: 'javascript',
              code: `class Compte {
  constructor(nom, solde) {
    this.nom = nom;
    this.solde = solde;
  }

  // Cette methode modifie les donnees de l'objet
  deposer(montant) {
    this.solde = this.solde + montant;
  }
}

const compte = new Compte("Bob", 50);
compte.deposer(30);
console.log(compte.solde); // 80`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> la classe est le <b>moule à gaufres</b>, chaque <code>new</code> produit une <b>gaufre</b> (une instance). Toutes ont la même forme, mais chacune a sa propre garniture (ses propres valeurs).',
          },
        ],
      },
      {
        id: 's3',
        title: 'Hériter d’une classe (extends)',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>extends</code> crée une classe <b>fille</b> qui reprend tout d’une classe <b>parente</b>, et peut ajouter ou remplacer des choses. <code>super()</code> appelle le constructeur du parent.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1146-l-c3',
              filename: 'compte.js',
              language: 'javascript',
              code: `class ComptePremium extends Compte {
  constructor(nom, solde, bonus) {
    super(nom, solde); // appelle le constructor parent
    this.bonus = bonus;
  }

  // On ajoute une methode propre a la classe fille
  afficherBonus() {
    console.log("Bonus : " + this.bonus);
  }
}

const vip = new ComptePremium("Chloe", 200, 50);
vip.afficher();      // methode heritee du parent
vip.afficherBonus(); // methode propre`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Rôle'],
            rows: [
              ['<code>class Nom</code>', 'définit le modèle'],
              ['<code>constructor()</code>', 'initialise chaque instance'],
              ['<code>this</code>', 'l’objet en cours'],
              ['<code>new Nom()</code>', 'crée une instance'],
              ['<code>extends</code> / <code>super()</code>', 'hériter d’une classe parente'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>new</code> : <code>Compte("Alice", 100)</code> sans <code>new</code> ne crée pas d’objet et casse <code>this</code>.',
      'Oublier <code>this</code> dans une méthode : <code>solde</code> tout seul ne désigne pas la propriété de l’objet.',
      'Oublier <code>super()</code> dans le constructeur d’une classe fille : erreur avant même de pouvoir utiliser <code>this</code>.',
      'Mettre une virgule entre les méthodes (comme dans un objet) : dans une classe, les méthodes ne sont <b>pas</b> séparées par des virgules.',
    ],
    takeaways: [
      '<code>class</code> = modèle · <code>new</code> = fabrique une instance',
      '<code>constructor</code> initialise l’objet · <code>this</code> = l’objet en cours',
      'les <b>méthodes</b> définissent ce que l’objet sait faire',
      '<code>extends</code> + <code>super()</code> = hériter d’une classe parente',
    ],
  }),
  template({
    id: 'JS-F-1146-TEMPLATE',
    slug: 'les-classes',
    title: 'Classes',
    shortTitle: 'Classes',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code des classes prêt à copier : classe simple, méthode, héritage.',
    lede: 'Créer un modèle d’objet. Choisis le cas :',
    aliases: ['class', 'classe', 'constructor', 'extends'],
    keywords: ['modele objet', 'constructeur', 'heritage'],
    relatedContentIds: [],
    lessonId: 'JS-F-1146-LESSON',
    variants: [
      {
        id: 'js-1146-base',
        label: 'Classe simple',
        codeBlocks: [
          {
            id: 'js-1146-t-base',
            filename: 'exemple.js',
            language: 'javascript',
            code: `class Produit {
  constructor(nom, prix) {
    this.nom = nom;
    this.prix = prix;
  }
}

const p = new Produit("Livre", 15);`,
          },
        ],
        replacements: [
          { token: 'Produit', description: 'le nom de ta classe (majuscule)' },
          { token: 'nom, prix', description: 'les propriétés de départ de l’objet' },
        ],
        placement: 'Le squelette de base : un constructor qui range les valeurs dans this, puis new pour instancier.',
      },
      {
        id: 'js-1146-methode',
        label: 'Avec méthode',
        codeBlocks: [
          {
            id: 'js-1146-t-methode',
            filename: 'exemple.js',
            language: 'javascript',
            code: `class Produit {
  constructor(nom, prix) {
    this.nom = nom;
    this.prix = prix;
  }

  resume() {
    return this.nom + " : " + this.prix + " euros";
  }
}`,
          },
        ],
        replacements: [
          { token: 'resume', description: 'le nom de la méthode (ce que l’objet sait faire)' },
          { token: 'this.nom + " : " + this.prix', description: 'ce que la méthode calcule ou renvoie' },
        ],
        placement: 'Quand l’objet doit savoir faire quelque chose : une méthode lit/modifie ses données via this.',
      },
      {
        id: 'js-1146-extends',
        label: 'Héritage (extends)',
        codeBlocks: [
          {
            id: 'js-1146-t-extends',
            filename: 'exemple.js',
            language: 'javascript',
            code: `class ProduitPromo extends Produit {
  constructor(nom, prix, remise) {
    super(nom, prix);
    this.remise = remise;
  }
}`,
          },
        ],
        replacements: [
          { token: 'ProduitPromo', description: 'la classe fille' },
          { token: 'Produit', description: 'la classe parente dont on hérite' },
          { token: 'remise', description: 'la propriété ajoutée par la classe fille' },
        ],
        placement: 'Pour spécialiser une classe existante : extends reprend tout, super() appelle le constructeur parent.',
      },
    ],
  }),

  // ————— Les modules : import et export —————
  lesson({
    id: 'JS-F-1147-LESSON',
    slug: 'les-modules-import-et-export',
    title: 'Les modules : import et export',
    shortTitle: 'Modules',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Découper le code en fichiers réutilisables : exporter une fonction d’un fichier et l’importer dans un autre.',
    utility: 'Partager fonctions, variables et composants entre fichiers.',
    aliases: ['import', 'export', 'module', 'export default', 'named export', 'esm', 'from'],
    keywords: [
      'partager entre fichiers',
      'importer une fonction',
      'exporter du code',
      'export par defaut',
      'export nomme',
      'reutiliser du code',
    ],
    relatedContentIds: [],
    templateId: 'JS-F-1147-TEMPLATE',
    intro:
      'Un <b>module</b> = un fichier. Pour utiliser dans un fichier ce qui est défini dans un autre, on l’<b>exporte</b> d’un côté (<code>export</code>) et on l’<b>importe</b> de l’autre (<code>import</code>). Deux styles : l’export <b>nommé</b> et l’export <b>par défaut</b>.',
    sections: [
      {
        id: 's1',
        title: 'Export nommé',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>ranger mes fonctions utilitaires dans un fichier à part</b> (<code>utils.js</code>) et les réutiliser dans plusieurs autres fichiers.',
          },
          {
            type: 'paragraph',
            html: 'Avec l’export <b>nommé</b>, on peut exporter <b>plusieurs</b> choses d’un même fichier. À l’import, on les récupère par leur <b>nom exact</b>, entre accolades.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1147-l-c1',
              filename: 'utils.js',
              language: 'javascript',
              code: `// utils.js — on exporte deux fonctions par leur nom
export function additionner(a, b) {
  return a + b;
}

export function soustraire(a, b) {
  return a - b;
}`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'js-1147-l-c2',
              filename: 'app.js',
              language: 'javascript',
              code: `// app.js — on importe par le nom exact, entre accolades
import { additionner, soustraire } from "./utils.js";

console.log(additionner(2, 3)); // 5
console.log(soustraire(5, 1));  // 4`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle :</b> pour un export <b>nommé</b>, le nom à l’import doit être <b>identique</b> à celui de l’export, et entouré d’<b>accolades</b>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Export par défaut',
        blocks: [
          {
            type: 'paragraph',
            html: 'L’export <b>par défaut</b> désigne l’élément <b>principal</b> d’un fichier : <b>un seul</b> par fichier. À l’import, <b>pas d’accolades</b>, et tu choisis librement le nom.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1147-l-c3',
              filename: 'Bouton.js',
              language: 'javascript',
              code: `// Bouton.js — un seul export default par fichier
export default function Bouton() {
  return "Je suis un bouton";
}`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'js-1147-l-c4',
              filename: 'app.js',
              language: 'javascript',
              code: `// app.js — pas d'accolades, nom libre
import Bouton from "./Bouton.js";
// On aurait pu ecrire : import MonBouton from "./Bouton.js";

console.log(Bouton());`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> l’export <b>par défaut</b>, c’est le <b>produit vedette</b> en vitrine (un seul, tu le prends sans étiquette). Les exports <b>nommés</b> sont les articles en rayon : tu dois demander chacun par son <b>nom exact</b>.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Mélanger et renommer',
        blocks: [
          {
            type: 'paragraph',
            html: 'On peut combiner un export par défaut et des exports nommés dans un même import. Et renommer un import nommé avec <code>as</code> en cas de conflit.',
          },
          {
            type: 'code',
            block: {
              id: 'js-1147-l-c5',
              filename: 'app.js',
              language: 'javascript',
              code: `// Le default hors accolades, les nommes dedans
import Bouton, { additionner } from "./index.js";

// Renommer un import nomme avec "as"
import { additionner as add } from "./utils.js";
console.log(add(1, 2)); // 3`,
            },
          },
          {
            type: 'table',
            headers: ['Type', 'À l’export', 'À l’import'],
            rows: [
              ['Nommé', '<code>export function f() {}</code>', '<code>import { f } from …</code>'],
              ['Par défaut', '<code>export default f</code>', '<code>import f from …</code>'],
              ['Renommer', '—', '<code>import { f as g } from …</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre des accolades sur un export <b>par défaut</b> (<code>import { Bouton }</code>) : il faut <code>import Bouton</code> sans accolades.',
      'Oublier les accolades sur un export <b>nommé</b> : <code>import additionner</code> échoue, écris <code>import { additionner }</code>.',
      'Se tromper de nom d’export nommé : il doit être <b>identique</b> (à la casse près) à celui exporté.',
      'Oublier le chemin relatif <code>./</code> ou l’extension : <code>import x from "utils.js"</code> peut ne pas être trouvé.',
    ],
    takeaways: [
      'export <b>nommé</b> : plusieurs par fichier · import <b>avec accolades</b> et nom exact',
      'export <b>par défaut</b> : un seul par fichier · import <b>sans accolades</b>, nom libre',
      'on peut mélanger : <code>import Defaut, { nomme } from …</code>',
      'renommer un import nommé avec <code>as</code>',
    ],
  }),
  template({
    id: 'JS-F-1147-TEMPLATE',
    slug: 'les-modules-import-et-export',
    title: 'Modules (import / export)',
    shortTitle: 'Modules',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Le code des modules prêt à copier : export nommé, export par défaut, import mixte.',
    lede: 'Partager du code entre fichiers. Choisis le style :',
    aliases: ['import', 'export', 'module', 'export default'],
    keywords: ['exporter fonction', 'importer', 'partager code'],
    relatedContentIds: [],
    lessonId: 'JS-F-1147-LESSON',
    variants: [
      {
        id: 'js-1147-named',
        label: 'Export nommé',
        codeBlocks: [
          {
            id: 'js-1147-t-named-a',
            filename: 'utils.js',
            language: 'javascript',
            code: `export function maFonction() {
  // ...
}`,
          },
          {
            id: 'js-1147-t-named-b',
            filename: 'app.js',
            language: 'javascript',
            code: `import { maFonction } from "./utils.js";`,
          },
        ],
        replacements: [
          { token: 'maFonction', description: 'ce que tu exportes (même nom à l’import)' },
          { token: './utils.js', description: 'le chemin relatif vers le fichier source' },
        ],
        placement: 'Pour partager plusieurs éléments d’un même fichier. Import avec accolades, nom identique.',
      },
      {
        id: 'js-1147-default',
        label: 'Export par défaut',
        codeBlocks: [
          {
            id: 'js-1147-t-default-a',
            filename: 'Bouton.js',
            language: 'javascript',
            code: `export default function Bouton() {
  // ...
}`,
          },
          {
            id: 'js-1147-t-default-b',
            filename: 'app.js',
            language: 'javascript',
            code: `import Bouton from "./Bouton.js";`,
          },
        ],
        replacements: [
          { token: 'Bouton', description: 'l’élément principal du fichier (un seul default)' },
          { token: './Bouton.js', description: 'le chemin relatif vers le fichier source' },
        ],
        placement: 'Pour l’export principal d’un fichier (un composant, une classe). Import sans accolades, nom libre.',
      },
      {
        id: 'js-1147-mix',
        label: 'Import mixte',
        codeBlocks: [
          {
            id: 'js-1147-t-mix',
            filename: 'app.js',
            language: 'javascript',
            code: `import Defaut, { nomme, autre } from "./module.js";`,
          },
        ],
        replacements: [
          { token: 'Defaut', description: 'l’export par défaut (hors accolades)' },
          { token: 'nomme, autre', description: 'les exports nommés (entre accolades)' },
        ],
        placement: 'Quand un fichier expose un export par défaut ET des exports nommés : combine les deux en une ligne.',
      },
    ],
  }),
];
