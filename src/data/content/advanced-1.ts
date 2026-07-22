import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const advanced1Content: ReadyContent[] = [
  // ————— localStorage et sessionStorage —————
  lesson({
    id: 'ADV-F-1100-LESSON',
    slug: 'localstorage-et-sessionstorage',
    title: 'localStorage et sessionStorage',
    shortTitle: 'localStorage',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Garder une donnée dans le navigateur d’un visiteur (pseudo, panier, thème) qui survit au rechargement de la page.',
    utility:
      'Stocker une donnée côté navigateur pour la retrouver après un rechargement, sans base de données.',
    aliases: ['localstorage', 'sessionstorage', 'stockage navigateur', 'web storage', 'setitem', 'getitem'],
    keywords: [
      'garder une valeur',
      'survivre au rechargement',
      'stocker cote client',
      'panier',
      'preferences utilisateur',
      'json stringify parse',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1100-TEMPLATE',
    intro:
      'Le <b>localStorage</b> et le <b>sessionStorage</b> sont deux petits coffres fournis par le navigateur. Ils stockent des paires <code>clé → valeur</code> sous forme de <b>texte</b>. Le <b>localStorage</b> reste <b>même après fermeture</b> du navigateur ; le <b>sessionStorage</b> disparaît quand on ferme l’onglet.',
    sections: [
      {
        id: 's1',
        title: 'Stocker et lire une valeur',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>retenir le pseudo saisi par l’utilisateur</b> pour le réafficher automatiquement quand il revient sur la page, sans base de données.',
          },
          {
            type: 'paragraph',
            html: 'Trois méthodes suffisent : <code>setItem</code> pour écrire, <code>getItem</code> pour lire, <code>removeItem</code> pour effacer. Tout est stocké en <b>texte</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1100-l-c1',
              filename: 'app.js',
              language: 'javascript',
              code: `// J'ecris une valeur sous une cle
localStorage.setItem("pseudo", "Alice");

// Je lis la valeur (renvoie null si la cle n'existe pas)
const pseudo = localStorage.getItem("pseudo");
console.log(pseudo); // "Alice"

// Je supprime cette cle precise
localStorage.removeItem("pseudo");`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un vestiaire de piscine. Chaque casier a un <b>numéro</b> (la clé) et contient un objet (la valeur). <code>setItem</code> range, <code>getItem</code> récupère, <code>removeItem</code> vide le casier.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Stocker un objet ou un tableau',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le stockage n’accepte que du <b>texte</b>. Pour un objet ou un tableau, on le transforme en texte avec <code>JSON.stringify</code> avant d’écrire, et on le reconstruit avec <code>JSON.parse</code> à la lecture.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1100-l-c2',
              filename: 'panier.js',
              language: 'javascript',
              code: `const panier = [
  { nom: "Café", prix: 3 },
  { nom: "Croissant", prix: 2 },
];

// Objet -> texte JSON avant d'ecrire
localStorage.setItem("panier", JSON.stringify(panier));

// Texte JSON -> objet a la lecture
const enregistre = JSON.parse(localStorage.getItem("panier"));
console.log(enregistre[0].nom); // "Café"`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle :</b> toujours <code>JSON.stringify</code> pour écrire un objet, <code>JSON.parse</code> pour le relire. Oublier le parse te donne la chaîne <code>"[object Object]"</code>.',
          },
        ],
      },
      {
        id: 's3',
        title: 'localStorage ou sessionStorage ?',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les deux ont exactement la <b>même API</b>. La seule différence : la <b>durée de vie</b> de la donnée.',
          },
          {
            type: 'table',
            headers: ['Critère', 'localStorage', 'sessionStorage'],
            rows: [
              ['Durée de vie', 'permanent (jusqu’à suppression)', 'jusqu’à la fermeture de l’onglet'],
              ['Partagé entre onglets', 'oui', 'non (isolé par onglet)'],
              ['Cas typique', 'thème, préférences, panier', 'formulaire en cours, étape temporaire'],
              ['Taille', '≈ 5 à 10 Mo', '≈ 5 Mo'],
            ],
          },
        ],
      },
      {
        id: 's4',
        title: 'Effacer proprement',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>removeItem</code> efface <b>une</b> clé, <code>clear</code> vide <b>tout</b> le stockage du site. À utiliser par exemple à la déconnexion.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1100-l-c3',
              filename: 'deconnexion.js',
              language: 'javascript',
              code: `// Efface une seule cle
localStorage.removeItem("token");

// Vide tout le stockage de ce site
localStorage.clear();

// Verifier si une cle existe avant de lire
if (localStorage.getItem("pseudo") !== null) {
  console.log("Un pseudo est enregistre");
}`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>JSON.parse</code> à la lecture d’un objet : tu récupères une chaîne, pas un objet manipulable.',
      '<code>getItem</code> renvoie <code>null</code> (pas <code>undefined</code>) quand la clé n’existe pas : teste bien <code>!== null</code>.',
      'Stocker des données sensibles (mot de passe, token secret) : le localStorage est lisible par tout script de la page. À éviter.',
      'Croire que <code>sessionStorage</code> est partagé entre onglets : chaque onglet a le sien.',
    ],
    takeaways: [
      '<code>setItem(cle, valeur)</code> · <code>getItem(cle)</code> · <code>removeItem(cle)</code> · <code>clear()</code>',
      'tout est stocké en <b>texte</b> → <code>JSON.stringify</code> pour écrire un objet, <code>JSON.parse</code> pour le relire',
      '<b>localStorage</b> = permanent · <b>sessionStorage</b> = jusqu’à fermeture de l’onglet',
      '<code>getItem</code> renvoie <code>null</code> si la clé est absente',
    ],
  }),
  template({
    id: 'ADV-F-1100-TEMPLATE',
    slug: 'localstorage-et-sessionstorage',
    title: 'localStorage',
    shortTitle: 'localStorage',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Le code prêt à copier pour stocker côté navigateur : chaîne, objet, effacement, hook React.',
    lede: 'Stocker dans le navigateur. Choisis le cas :',
    aliases: ['localstorage', 'sessionstorage', 'setitem', 'getitem'],
    keywords: ['stocker', 'json', 'navigateur'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1100-LESSON',
    variants: [
      {
        id: 'ADV-F-1100-v-chaine',
        label: 'Chaîne simple',
        codeBlocks: [
          {
            id: 'ADV-F-1100-t-chaine',
            filename: 'app.js',
            language: 'javascript',
            code: `localStorage.setItem("cle", "valeur");

const valeur = localStorage.getItem("cle");`,
          },
        ],
        replacements: [
          { token: 'cle', description: 'le nom sous lequel tu ranges la donnée' },
          { token: 'valeur', description: 'la chaîne de texte à stocker' },
        ],
        placement: 'Le cas de base pour une simple chaîne (pseudo, thème, langue…).',
      },
      {
        id: 'ADV-F-1100-v-objet',
        label: 'Objet / tableau',
        codeBlocks: [
          {
            id: 'ADV-F-1100-t-objet',
            filename: 'app.js',
            language: 'javascript',
            code: `// Ecrire un objet
localStorage.setItem("panier", JSON.stringify(panier));

// Relire l'objet
const panier = JSON.parse(localStorage.getItem("panier")) || [];`,
          },
        ],
        replacements: [
          { token: 'panier', description: 'l’objet ou le tableau à stocker' },
          { token: '|| []', description: 'la valeur par défaut si la clé est absente' },
        ],
        placement: 'Dès que tu stockes autre chose qu’une chaîne : stringify à l’écriture, parse à la lecture.',
      },
      {
        id: 'ADV-F-1100-v-effacer',
        label: 'Effacer',
        codeBlocks: [
          {
            id: 'ADV-F-1100-t-effacer',
            filename: 'app.js',
            language: 'javascript',
            code: `// Une seule cle
localStorage.removeItem("token");

// Tout le stockage du site
localStorage.clear();`,
          },
        ],
        replacements: [
          { token: 'token', description: 'la clé précise à effacer' },
        ],
        placement: 'À la déconnexion ou pour nettoyer une donnée devenue obsolète.',
      },
      {
        id: 'ADV-F-1100-v-hook',
        label: 'Hook React',
        description: 'Synchroniser un state React avec le localStorage.',
        codeBlocks: [
          {
            id: 'ADV-F-1100-t-hook',
            filename: 'useLocalStorage.ts',
            language: 'tsx',
            code: `import { useState, useEffect } from "react";

function useLocalStorage(cle: string, valeurInitiale: string) {
  // Au premier rendu, on lit ce qui est deja stocke
  const [valeur, setValeur] = useState(
    () => localStorage.getItem(cle) ?? valeurInitiale
  );

  // A chaque changement, on reecrit dans le stockage
  useEffect(() => {
    localStorage.setItem(cle, valeur);
  }, [cle, valeur]);

  return [valeur, setValeur] as const;
}`,
          },
        ],
        replacements: [
          { token: 'cle', description: 'la clé de stockage' },
          { token: 'valeurInitiale', description: 'la valeur par défaut si rien n’est stocké' },
        ],
        placement: 'Dans un projet React : le state reste synchronisé avec le navigateur automatiquement.',
      },
    ],
  }),

  // ————— Manipuler les dates —————
  lesson({
    id: 'ADV-F-1101-LESSON',
    slug: 'manipuler-les-dates',
    title: 'Manipuler les dates',
    shortTitle: 'Dates',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Créer, afficher et calculer avec des dates en JavaScript : date du jour, format français, différence entre deux dates.',
    utility: 'Afficher une date proprement et faire des calculs de temps (différence, ajout de jours).',
    aliases: ['date', 'dates', 'new date', 'tolocaledatestring', 'timestamp', 'horodatage'],
    keywords: [
      'date du jour',
      'formater une date',
      'date en francais',
      'difference entre deux dates',
      'ajouter des jours',
      'convertir un timestamp',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1101-TEMPLATE',
    intro:
      'En JavaScript, une date est un objet <code>Date</code>. En interne, c’est un <b>nombre de millisecondes</b> écoulées depuis le 1<sup>er</sup> janvier 1970. On crée une date avec <code>new Date()</code>, on l’affiche avec <code>toLocaleDateString</code>, et on calcule en repassant par les millisecondes.',
    sections: [
      {
        id: 's1',
        title: 'Créer une date',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher la date du jour</b> en haut de mon tableau de bord, et aussi pouvoir créer une date précise à partir d’une chaîne reçue d’une API.',
          },
          {
            type: 'paragraph',
            html: '<code>new Date()</code> sans argument donne l’<b>instant présent</b>. Avec une chaîne au format ISO (<code>AAAA-MM-JJ</code>), on crée une date précise.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1101-l-c1',
              filename: 'dates.js',
              language: 'javascript',
              code: `// La date et l'heure de maintenant
const maintenant = new Date();

// Une date precise depuis une chaine ISO (celle des API)
const noel = new Date("2026-12-25");

// Attention : le mois commence a 0 (0 = janvier)
const rentree = new Date(2026, 8, 1); // 1er septembre 2026`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Piège classique :</b> avec <code>new Date(annee, mois, jour)</code>, le mois est <b>numéroté de 0 à 11</b>. Janvier = 0, décembre = 11.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Afficher une date en français',
        blocks: [
          {
            type: 'paragraph',
            html: 'Ne construis <b>jamais</b> la date à la main. <code>toLocaleDateString</code> avec la locale <code>"fr-FR"</code> gère le format français tout seul, y compris le mois en lettres.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1101-l-c2',
              filename: 'format.js',
              language: 'javascript',
              code: `const date = new Date("2026-07-21");

// Format court : 21/07/2026
date.toLocaleDateString("fr-FR");

// Format long : mardi 21 juillet 2026
date.toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Avec l'heure : 21/07/2026 00:00:00
date.toLocaleString("fr-FR");`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>toLocaleDateString</code> = un traducteur automatique. Tu lui donnes la locale <code>"fr-FR"</code> et il écrit la date dans les conventions françaises, sans que tu jongles avec les slashs.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Calculer avec les dates',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour une différence, on soustrait deux dates : on obtient un nombre de <b>millisecondes</b>, qu’on divise pour avoir des jours. Pour ajouter du temps, on passe par <code>setDate</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1101-l-c3',
              filename: 'calculs.js',
              language: 'javascript',
              code: `const debut = new Date("2026-07-01");
const fin = new Date("2026-07-21");

// Difference en millisecondes puis en jours
const ms = fin - debut;
const jours = ms / (1000 * 60 * 60 * 24);
console.log(jours); // 20

// Ajouter 7 jours a une date
const dans7jours = new Date();
dans7jours.setDate(dans7jours.getDate() + 7);`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Les méthodes utiles',
        blocks: [
          {
            type: 'table',
            headers: ['Méthode', 'Renvoie', 'Exemple'],
            rows: [
              ['<code>getFullYear()</code>', 'l’année (4 chiffres)', '2026'],
              ['<code>getMonth()</code>', 'le mois (0 à 11)', '6 pour juillet'],
              ['<code>getDate()</code>', 'le jour du mois (1 à 31)', '21'],
              ['<code>getDay()</code>', 'le jour de la semaine (0 = dimanche)', '2 pour mardi'],
              ['<code>getTime()</code>', 'le timestamp en millisecondes', '1784...'],
              ['<code>toISOString()</code>', 'le format ISO standard', '2026-07-21T00:00:00.000Z'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Le mois est numéroté <b>de 0 à 11</b> : <code>getMonth()</code> renvoie 6 pour juillet, pas 7.',
      'Reconstruire un format à la main (<code>jour + "/" + mois</code>) : utilise <code>toLocaleDateString</code>, il gère les zéros et les cas particuliers.',
      'Comparer deux dates avec <code>===</code> : ça compare les objets, pas les instants. Compare plutôt <code>a.getTime() === b.getTime()</code>.',
      'Oublier que <code>new Date("2026-07-21")</code> est interprétée en <b>UTC</b> : selon le fuseau, l’affichage peut décaler d’un jour.',
    ],
    takeaways: [
      '<code>new Date()</code> = maintenant · <code>new Date("2026-07-21")</code> = date ISO précise',
      'le mois commence à <b>0</b> (janvier = 0, décembre = 11)',
      'afficher en français : <code>date.toLocaleDateString("fr-FR", { … })</code>',
      'différence : soustraire deux dates → millisecondes → diviser par <code>1000 * 60 * 60 * 24</code>',
    ],
  }),
  template({
    id: 'ADV-F-1101-TEMPLATE',
    slug: 'manipuler-les-dates',
    title: 'Dates',
    shortTitle: 'Dates',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Le code dates prêt à copier : date du jour formatée, différence, ajout de jours, parsing ISO.',
    lede: 'Manipuler une date. Choisis le cas :',
    aliases: ['date', 'tolocaledatestring', 'timestamp'],
    keywords: ['format', 'difference', 'jours'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1101-LESSON',
    variants: [
      {
        id: 'ADV-F-1101-v-format',
        label: 'Date formatée',
        codeBlocks: [
          {
            id: 'ADV-F-1101-t-format',
            filename: 'format.js',
            language: 'javascript',
            code: `const date = new Date();

// 21 juillet 2026
date.toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});`,
          },
        ],
        replacements: [
          { token: 'new Date()', description: 'la date à afficher (ici, aujourd’hui)' },
          { token: 'month: "long"', description: 'le style du mois : "long", "short" ou "numeric"' },
        ],
        placement: 'Pour afficher une date lisible à l’écran, en français.',
      },
      {
        id: 'ADV-F-1101-v-diff',
        label: 'Différence en jours',
        codeBlocks: [
          {
            id: 'ADV-F-1101-t-diff',
            filename: 'diff.js',
            language: 'javascript',
            code: `const a = new Date("2026-07-01");
const b = new Date("2026-07-21");

const jours = Math.round((b - a) / (1000 * 60 * 60 * 24));`,
          },
        ],
        replacements: [
          { token: 'a / b', description: 'les deux dates à comparer' },
          { token: '1000 * 60 * 60 * 24', description: 'le nombre de millisecondes dans une journée' },
        ],
        placement: 'Pour compter les jours entre deux dates (durée, âge, échéance…).',
      },
      {
        id: 'ADV-F-1101-v-ajout',
        label: 'Ajouter du temps',
        codeBlocks: [
          {
            id: 'ADV-F-1101-t-ajout',
            filename: 'ajout.js',
            language: 'javascript',
            code: `const date = new Date();

// Ajoute 7 jours
date.setDate(date.getDate() + 7);

// Ajoute 1 mois
date.setMonth(date.getMonth() + 1);`,
          },
        ],
        replacements: [
          { token: '+ 7', description: 'le nombre de jours à ajouter (ou retirer avec un nombre négatif)' },
        ],
        placement: 'Pour calculer une échéance : dans 7 jours, dans 1 mois…',
      },
      {
        id: 'ADV-F-1101-v-parse',
        label: 'Parser une chaîne',
        codeBlocks: [
          {
            id: 'ADV-F-1101-t-parse',
            filename: 'parse.js',
            language: 'javascript',
            code: `// Depuis une chaine ISO (format des API)
const date = new Date("2026-07-21T14:30:00Z");

// Verifier que la date est valide
const valide = !isNaN(date.getTime());`,
          },
        ],
        replacements: [
          { token: '2026-07-21T14:30:00Z', description: 'la chaîne ISO reçue (ex. depuis une API)' },
        ],
        placement: 'Quand tu reçois une date en texte et que tu dois la transformer en objet Date.',
      },
    ],
  }),

  // ————— Les expressions régulières : regex —————
  lesson({
    id: 'ADV-F-1102-LESSON',
    slug: 'les-expressions-regulieres-regex',
    title: 'Les expressions régulières : regex',
    shortTitle: 'Regex',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Décrire un motif de texte pour le valider, l’extraire ou le remplacer : email, numéro de téléphone, code postal.',
    utility: 'Valider ou extraire un motif dans du texte (email, téléphone, mot-clé) en une seule expression.',
    aliases: ['regex', 'regexp', 'expression reguliere', 'motif', 'pattern', 'validation'],
    keywords: [
      'valider un email',
      'chercher un motif',
      'extraire du texte',
      'remplacer du texte',
      'numero de telephone',
      'test match replace',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1102-TEMPLATE',
    intro:
      'Une <b>expression régulière</b> (regex) décrit un <b>motif</b> de texte. On l’écrit entre deux slashs : <code>/motif/</code>. Elle sert à trois choses : <b>vérifier</b> qu’un texte respecte un format (<code>.test</code>), <b>extraire</b> une partie (<code>.match</code>) ou <b>remplacer</b> (<code>.replace</code>).',
    sections: [
      {
        id: 's1',
        title: 'Créer et tester un motif',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>vérifier qu’une adresse email saisie a bien la bonne forme</b> (du texte, un arobase, un point) avant de l’envoyer au serveur.',
          },
          {
            type: 'paragraph',
            html: '<code>.test(texte)</code> renvoie <code>true</code> ou <code>false</code> selon que le motif est trouvé. C’est la méthode idéale pour une <b>validation</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1102-l-c1',
              filename: 'validation.js',
              language: 'javascript',
              code: `// Un motif d'email simple : du texte, un @, un point
const motifEmail = /^[^@ ]+@[^@ ]+\\.[^@ ]+$/;

motifEmail.test("alice@mail.com"); // true
motifEmail.test("bonjour");        // false

// ^ = debut du texte, $ = fin du texte
// [^@ ]+ = un ou plusieurs caracteres sauf @ et espace`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>^</code> ancre le <b>début</b> et <code>$</code> la <b>fin</b>. Sans eux, la regex accepte un texte qui contient le motif quelque part, pas forcément en entier.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les symboles courants',
        blocks: [
          {
            type: 'paragraph',
            html: 'Quelques symboles reviennent tout le temps. Les <b>classes</b> (<code>\\d</code>, <code>\\w</code>) désignent un type de caractère, les <b>quantificateurs</b> (<code>+</code>, <code>*</code>, <code>{2,4}</code>) disent combien de fois.',
          },
          {
            type: 'table',
            headers: ['Symbole', 'Signifie', 'Exemple'],
            rows: [
              ['<code>\\d</code>', 'un chiffre (0-9)', '<code>\\d\\d</code> → 42'],
              ['<code>\\w</code>', 'une lettre, un chiffre ou _', 'un mot'],
              ['<code>.</code>', 'n’importe quel caractère', 'a, 3, @…'],
              ['<code>+</code>', 'une fois ou plus', '<code>a+</code> → aaa'],
              ['<code>*</code>', 'zéro fois ou plus', 'optionnel répété'],
              ['<code>{2,4}</code>', 'entre 2 et 4 fois', '<code>\\d{2,4}</code>'],
              ['<code>[abc]</code>', 'un caractère parmi a, b, c', 'un choix'],
              ['<code>|</code>', 'ou', '<code>chat|chien</code>'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Extraire et remplacer',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>.match</code> sort les morceaux qui correspondent au motif. <code>.replace</code> échange le motif contre autre chose. Le flag <code>g</code> (global) traite <b>toutes</b> les occurrences, pas seulement la première.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1102-l-c2',
              filename: 'extraction.js',
              language: 'javascript',
              code: `const texte = "Commande 42, ligne 7, quantite 128";

// Extraire tous les nombres (flag g = global)
const nombres = texte.match(/\\d+/g);
console.log(nombres); // ["42", "7", "128"]

// Remplacer tous les chiffres par une etoile
const masque = texte.replace(/\\d/g, "*");
console.log(masque); // "Commande **, ligne *, quantite ***"`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> la regex est un <b>tamis</b>. <code>.test</code> demande « est-ce que ça passe ? », <code>.match</code> récupère ce qui reste dans le tamis, <code>.replace</code> remplace au passage.',
          },
        ],
      },
      {
        id: 's4',
        title: 'Les flags (options)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les <b>flags</b> se placent <b>après</b> le dernier slash et changent le comportement de la recherche.',
          },
          {
            type: 'table',
            headers: ['Flag', 'Effet'],
            rows: [
              ['<code>g</code>', 'global : trouve toutes les occurrences'],
              ['<code>i</code>', 'insensible à la casse (Majuscule = minuscule)'],
              ['<code>m</code>', 'multiligne : <code>^</code> et <code>$</code> par ligne'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>^</code> et <code>$</code> pour une validation : le motif peut correspondre à une <b>partie</b> du texte seulement.',
      'Oublier le flag <code>g</code> avec <code>.replace</code> : seule la <b>première</b> occurrence est remplacée.',
      'Vouloir tout valider avec une regex géante (email 100 % conforme) : reste simple, une validation grossière suffit souvent.',
      'Ne pas échapper un point : <code>.</code> signifie « n’importe quel caractère ». Pour un vrai point, écris <code>\\.</code>.',
    ],
    takeaways: [
      'motif entre slashs : <code>/motif/flags</code>',
      '<code>.test()</code> → valider (true/false) · <code>.match()</code> → extraire · <code>.replace()</code> → remplacer',
      '<code>^</code> = début · <code>$</code> = fin · <code>\\d</code> = chiffre · <code>+</code> = une fois ou plus',
      'flags utiles : <code>g</code> (tout), <code>i</code> (casse), <code>m</code> (multiligne)',
    ],
  }),
  template({
    id: 'ADV-F-1102-TEMPLATE',
    slug: 'les-expressions-regulieres-regex',
    title: 'Regex',
    shortTitle: 'Regex',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Les regex prêtes à copier : valider, extraire, remplacer, et motifs courants (email, téléphone).',
    lede: 'Utiliser une regex. Choisis l’usage :',
    aliases: ['regex', 'regexp', 'motif', 'validation'],
    keywords: ['test', 'match', 'replace', 'email'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1102-LESSON',
    variants: [
      {
        id: 'ADV-F-1102-v-valider',
        label: 'Valider (test)',
        codeBlocks: [
          {
            id: 'ADV-F-1102-t-valider',
            filename: 'valider.js',
            language: 'javascript',
            code: `const motif = /^[^@ ]+@[^@ ]+\\.[^@ ]+$/;

const estValide = motif.test(saisie);`,
          },
        ],
        replacements: [
          { token: '/^[^@ ]+@[^@ ]+\\.[^@ ]+$/', description: 'le motif à respecter (ici, un email simple)' },
          { token: 'saisie', description: 'le texte à vérifier' },
        ],
        placement: 'Pour valider un format avant envoi. Renvoie true ou false.',
      },
      {
        id: 'ADV-F-1102-v-extraire',
        label: 'Extraire (match)',
        codeBlocks: [
          {
            id: 'ADV-F-1102-t-extraire',
            filename: 'extraire.js',
            language: 'javascript',
            code: `// Tous les nombres du texte
const nombres = texte.match(/\\d+/g);

// Le premier hashtag
const tag = texte.match(/#\\w+/);`,
          },
        ],
        replacements: [
          { token: '/\\d+/g', description: 'le motif à extraire (ici, tous les nombres)' },
          { token: 'texte', description: 'la chaîne dans laquelle chercher' },
        ],
        placement: 'Pour récupérer les morceaux qui correspondent au motif (renvoie un tableau).',
      },
      {
        id: 'ADV-F-1102-v-remplacer',
        label: 'Remplacer (replace)',
        codeBlocks: [
          {
            id: 'ADV-F-1102-t-remplacer',
            filename: 'remplacer.js',
            language: 'javascript',
            code: `// Remplace tous les espaces par des tirets
const slug = texte.replace(/ +/g, "-");

// Supprime tout ce qui n'est pas une lettre ou un chiffre
const propre = texte.replace(/[^a-z0-9]/gi, "");`,
          },
        ],
        replacements: [
          { token: '/ +/g', description: 'le motif à remplacer' },
          { token: '"-"', description: 'le texte de remplacement' },
        ],
        placement: 'Pour nettoyer ou transformer du texte. N’oublie pas le flag g pour tout remplacer.',
      },
      {
        id: 'ADV-F-1102-v-courants',
        label: 'Motifs courants',
        codeBlocks: [
          {
            id: 'ADV-F-1102-t-courants',
            filename: 'motifs.js',
            language: 'javascript',
            code: `// Telephone francais : 06 12 34 56 78 ou 0612345678
const tel = /^0[1-9](\\s?\\d{2}){4}$/;

// Code postal francais : 5 chiffres
const codePostal = /^\\d{5}$/;

// Uniquement des lettres et espaces
const lettres = /^[a-zA-Z\\s]+$/;`,
          },
        ],
        replacements: [
          { token: 'tel / codePostal / lettres', description: 'garde le motif dont tu as besoin' },
        ],
        placement: 'Des motifs prêts à l’emploi pour les validations les plus fréquentes.',
      },
    ],
  }),

  // ————— Utiliser une API externe avec une clé API —————
  lesson({
    id: 'ADV-F-1103-LESSON',
    slug: 'utiliser-une-api-externe-avec-une-cle-api',
    title: 'Utiliser une API externe avec une clé API',
    shortTitle: 'Clé API',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Appeler un service externe (météo, cartes, IA) qui exige une clé API pour identifier ton application et t’autoriser.',
    utility: 'Appeler une API qui demande une clé, en la transmettant correctement et sans la révéler.',
    aliases: ['api key', 'cle api', 'token', 'authorization', 'bearer', 'api externe'],
    keywords: [
      'appeler une api',
      'cle secrete',
      'header authorization',
      'variable environnement',
      'fetch avec cle',
      'openweather',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1103-TEMPLATE',
    intro:
      'Beaucoup d’API (météo, cartes, IA) demandent une <b>clé API</b> : une longue chaîne secrète qui identifie ton application et compte tes requêtes. On la transmet à chaque appel, soit dans un <b>header</b> <code>Authorization</code>, soit en <b>paramètre d’URL</b>, selon ce que demande le service.',
    sections: [
      {
        id: 's1',
        title: 'Appeler avec un header Authorization',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>récupérer les données d’une API qui exige une clé</b> (par exemple une API d’IA), en envoyant ma clé dans l’en-tête de la requête comme le demande sa documentation.',
          },
          {
            type: 'paragraph',
            html: 'Le cas le plus fréquent : la clé va dans le header <code>Authorization</code>, préfixée par <code>Bearer</code>. On passe un objet <code>headers</code> à <code>fetch</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1103-l-c1',
              filename: 'api.js',
              language: 'javascript',
              code: `const cle = "ma-cle-secrete";

const reponse = await fetch("https://api.exemple.com/data", {
  headers: {
    // On concatene "Bearer " et la cle (pas de guillemets autour)
    Authorization: "Bearer " + cle,
    "Content-Type": "application/json",
  },
});

const data = await reponse.json();`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> le mot <code>Bearer</code> suivi d’un espace puis de la clé. Respecte exactement ce que dit la doc de l’API : certaines veulent <code>Bearer</code>, d’autres un header au nom précis.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Clé en paramètre d’URL',
        blocks: [
          {
            type: 'paragraph',
            html: 'Certaines API attendent la clé directement dans l’<b>URL</b>, en paramètre de requête (<code>?apikey=...</code>). C’est courant pour les API météo publiques.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1103-l-c2',
              filename: 'meteo.js',
              language: 'javascript',
              code: `const cle = "ma-cle-meteo";
const ville = "Paris";

// La cle est ajoutee comme parametre ?apikey=...
const url =
  "https://api.meteo.com/weather?q=" + ville + "&apikey=" + cle;

const reponse = await fetch(url);
const data = await reponse.json();
console.log(data.temperature);`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'Cacher la clé dans un fichier .env',
        blocks: [
          {
            type: 'paragraph',
            html: 'Ne jamais écrire la clé <b>en dur</b> dans le code. On la met dans un fichier <code>.env</code> (jamais poussé sur Git) et on la lit via une variable d’environnement.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1103-l-c3',
              filename: '.env',
              language: 'bash',
              code: `# Prefixe VITE_ obligatoire pour etre lisible cote client avec Vite
VITE_API_KEY=ma-cle-secrete-ici`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1103-l-c4',
              filename: 'api.js',
              language: 'javascript',
              code: `// On lit la cle depuis la variable d'environnement
const cle = import.meta.env.VITE_API_KEY;

// Ne jamais ecrire la vraie cle directement ici !
const reponse = await fetch("https://api.exemple.com/data", {
  headers: { Authorization: "Bearer " + cle },
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Sécurité :</b> ajoute <code>.env</code> à ton <code>.gitignore</code>. Et pour une vraie clé secrète (paiement, IA), fais l’appel depuis un <b>serveur</b>, jamais depuis le navigateur où elle serait visible.',
          },
        ],
      },
      {
        id: 's4',
        title: 'Gérer une erreur',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une clé invalide ou expirée renvoie souvent une erreur <code>401</code> (non autorisé). <code>fetch</code> ne lève pas d’exception dans ce cas : il faut vérifier <code>reponse.ok</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1103-l-c5',
              filename: 'securise.js',
              language: 'javascript',
              code: `const reponse = await fetch(url, {
  headers: { Authorization: "Bearer " + cle },
});

// reponse.ok est false pour un statut 4xx ou 5xx
if (!reponse.ok) {
  throw new Error("Erreur API : " + reponse.status);
}

const data = await reponse.json();`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Écrire la clé <b>en dur</b> dans le code poussé sur GitHub : elle sera volée en quelques minutes. Passe par <code>.env</code>.',
      'Oublier <code>Bearer</code> (avec l’espace) devant la clé dans le header <code>Authorization</code>.',
      'Croire que <code>fetch</code> échoue sur une clé invalide : il faut tester <code>reponse.ok</code> ou le statut <code>401</code>.',
      'Mettre une clé <b>secrète</b> (paiement, IA payante) dans le front : elle est visible par tous. Appelle depuis un serveur.',
    ],
    takeaways: [
      'clé dans le header : <code>Authorization: "Bearer " + cle</code>',
      'ou en paramètre d’URL : <code>?apikey=...</code> selon la doc',
      'jamais en dur → <code>.env</code> + <code>.gitignore</code> · lecture via <code>import.meta.env</code>',
      'clé vraiment secrète = appel depuis un <b>serveur</b>, pas depuis le navigateur',
    ],
  }),
  template({
    id: 'ADV-F-1103-TEMPLATE',
    slug: 'utiliser-une-api-externe-avec-une-cle-api',
    title: 'Clé API',
    shortTitle: 'Clé API',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Le code prêt à copier pour appeler une API avec clé : header Bearer, axios, paramètre d’URL, .env.',
    lede: 'Envoyer une clé API. Choisis la méthode :',
    aliases: ['api key', 'cle api', 'bearer', 'authorization'],
    keywords: ['fetch', 'axios', 'env'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1103-LESSON',
    variants: [
      {
        id: 'ADV-F-1103-v-bearer',
        label: 'Header Bearer (fetch)',
        codeBlocks: [
          {
            id: 'ADV-F-1103-t-bearer',
            filename: 'api.js',
            language: 'javascript',
            code: `const reponse = await fetch("https://api.exemple.com/data", {
  headers: {
    Authorization: "Bearer " + cle,
  },
});

const data = await reponse.json();`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/data', description: 'l’URL de l’API à appeler' },
          { token: 'cle', description: 'ta clé API (idéalement lue depuis .env)' },
        ],
        placement: 'Le cas le plus courant : la clé va dans le header Authorization.',
      },
      {
        id: 'ADV-F-1103-v-axios',
        label: 'Avec axios',
        codeBlocks: [
          {
            id: 'ADV-F-1103-t-axios',
            filename: 'api.js',
            language: 'javascript',
            code: `import axios from "axios";

const { data } = await axios.get("https://api.exemple.com/data", {
  headers: { Authorization: "Bearer " + cle },
});`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/data', description: 'l’URL de l’API' },
          { token: 'cle', description: 'ta clé API' },
        ],
        placement: 'Si tu utilises axios : la réponse JSON est déjà dans data, pas besoin de .json().',
      },
      {
        id: 'ADV-F-1103-v-url',
        label: 'Paramètre d’URL',
        codeBlocks: [
          {
            id: 'ADV-F-1103-t-url',
            filename: 'api.js',
            language: 'javascript',
            code: `const url =
  "https://api.exemple.com/data?apikey=" + cle;

const reponse = await fetch(url);
const data = await reponse.json();`,
          },
        ],
        replacements: [
          { token: 'apikey', description: 'le nom du paramètre attendu par l’API (voir sa doc)' },
          { token: 'cle', description: 'ta clé API' },
        ],
        placement: 'Quand l’API attend la clé dans l’URL plutôt que dans un header.',
      },
      {
        id: 'ADV-F-1103-v-env',
        label: 'Fichier .env',
        codeBlocks: [
          {
            id: 'ADV-F-1103-t-env',
            filename: '.env',
            language: 'bash',
            code: `VITE_API_KEY=ma-cle-secrete-ici`,
          },
          {
            id: 'ADV-F-1103-t-env2',
            filename: 'api.js',
            language: 'javascript',
            code: `const cle = import.meta.env.VITE_API_KEY;`,
          },
        ],
        replacements: [
          { token: 'VITE_API_KEY', description: 'le nom de ta variable (préfixe VITE_ avec Vite)' },
          { token: 'ma-cle-secrete-ici', description: 'ta vraie clé (jamais commitée)' },
        ],
        placement: 'Pour garder la clé hors du code. Ajoute .env à ton .gitignore.',
      },
    ],
  }),

  // ————— Tester une API avec Postman —————
  lesson({
    id: 'ADV-F-1104-LESSON',
    slug: 'tester-une-api-avec-postman',
    title: 'Tester une API avec Postman',
    shortTitle: 'Postman',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Envoyer des requêtes à une API sans écrire de code, pour vérifier une route, un body ou une authentification.',
    utility: 'Tester rapidement une route d’API (GET, POST…) avant de l’intégrer dans le code.',
    aliases: ['postman', 'tester une api', 'requete http', 'client rest', 'insomnia'],
    keywords: [
      'tester une route',
      'envoyer une requete',
      'body json',
      'header authorization',
      'methode post',
      'variable environnement postman',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1104-TEMPLATE',
    intro:
      '<b>Postman</b> est un outil pour envoyer des requêtes HTTP à une API <b>sans écrire de code</b>. On choisit une <b>méthode</b> (GET, POST…), une <b>URL</b>, on ajoute des <b>headers</b> et un <b>body</b>, puis on clique sur « Send » pour voir la réponse. Idéal pour vérifier une route avant de l’intégrer.',
    sections: [
      {
        id: 's1',
        title: 'Envoyer une première requête',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>vérifier que ma route d’API renvoie bien les bonnes données</b> avant d’écrire le <code>fetch</code> dans mon code React.',
          },
          {
            type: 'paragraph',
            html: 'Dans Postman : choisis la méthode <b>GET</b>, colle l’URL, clique <b>Send</b>. La réponse (JSON, statut, temps) s’affiche en bas. L’équivalent en ligne de commande, c’est <code>curl</code> :',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1104-l-c1',
              filename: 'terminal.sh',
              language: 'bash',
              code: `# L'equivalent Postman d'un GET, en ligne de commande
curl https://api.exemple.com/users

# Postman affiche la meme chose : le corps JSON de la reponse
# et le statut (200 OK, 404 Not Found...)`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> Postman = un <b>facteur d’essai</b>. Tu prépares une enveloppe (méthode + URL + contenu), tu l’envoies, et tu lis la réponse — sans écrire une seule ligne de ton appli.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Un POST avec un body JSON',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour <b>créer</b> une ressource, choisis la méthode <b>POST</b>, va dans l’onglet <b>Body</b> → <b>raw</b> → <b>JSON</b>, et écris le corps. Postman ajoute alors le bon header <code>Content-Type</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1104-l-c2',
              filename: 'body.json',
              language: 'json',
              code: `{
  "nom": "Alice",
  "email": "alice@mail.com",
  "role": "admin"
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> en JSON, les clés et les valeurs texte sont entre <b>guillemets doubles</b>, jamais de virgule après le dernier élément. Postman souligne les erreurs de syntaxe.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Ajouter un header d’authentification',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour une route protégée, va dans l’onglet <b>Headers</b> et ajoute une ligne <code>Authorization</code> avec ta clé ou ton token.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1104-l-c3',
              filename: 'headers.txt',
              language: 'text',
              code: `Clé (Key)          Valeur (Value)
------------------ ----------------------------
Content-Type       application/json
Authorization      Bearer mon-token-secret`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Variables d’environnement Postman',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour éviter de recopier l’URL ou le token partout, Postman propose des <b>variables</b>. On les écrit entre doubles accolades et on change de contexte (local, production) en un clic.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1104-l-c4',
              filename: 'requete.txt',
              language: 'text',
              code: `# Definir la variable : base_url = http://localhost:3000
# Puis l'utiliser dans l'URL avec les doubles accolades :

GET  {{base_url}}/users
POST {{base_url}}/users

# Un clic sur "Production" remplace base_url partout`,
            },
          },
          {
            type: 'table',
            headers: ['Méthode', 'Sert à', 'A un body ?'],
            rows: [
              ['<code>GET</code>', 'lire des données', 'non'],
              ['<code>POST</code>', 'créer une ressource', 'oui'],
              ['<code>PUT</code>', 'remplacer une ressource', 'oui'],
              ['<code>PATCH</code>', 'modifier partiellement', 'oui'],
              ['<code>DELETE</code>', 'supprimer', 'rarement'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier de choisir <b>raw → JSON</b> dans l’onglet Body : le serveur reçoit du texte brut et rejette la requête.',
      'Mettre une virgule après le dernier champ du JSON : c’est une erreur de syntaxe, Postman la souligne en rouge.',
      'Oublier le header <code>Authorization</code> sur une route protégée : tu obtiens un <code>401</code>.',
      'Confondre le statut <code>200</code> (succès) avec la présence de données : une réponse peut être <code>200</code> avec un corps vide.',
    ],
    takeaways: [
      'Postman envoie des requêtes HTTP <b>sans code</b> : méthode + URL + headers + body → Send',
      'body JSON : onglet <b>Body → raw → JSON</b>',
      'authentification : header <code>Authorization: Bearer …</code>',
      'variables réutilisables entre doubles accolades : <code>base_url</code>, changeables par environnement',
    ],
  }),
  template({
    id: 'ADV-F-1104-TEMPLATE',
    slug: 'tester-une-api-avec-postman',
    title: 'Postman',
    shortTitle: 'Postman',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Les requêtes types prêtes à reproduire dans Postman : GET, POST avec body, header d’auth, curl.',
    lede: 'Tester une route. Choisis le type de requête :',
    aliases: ['postman', 'requete http', 'curl'],
    keywords: ['get', 'post', 'body'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1104-LESSON',
    variants: [
      {
        id: 'ADV-F-1104-v-get',
        label: 'GET',
        codeBlocks: [
          {
            id: 'ADV-F-1104-t-get',
            filename: 'requete.txt',
            language: 'text',
            code: `Methode : GET
URL     : https://api.exemple.com/users

# Equivalent curl :
# curl https://api.exemple.com/users`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/users', description: 'la route à tester' },
        ],
        placement: 'Pour lire des données. Aucun body : juste la méthode et l’URL, puis Send.',
      },
      {
        id: 'ADV-F-1104-v-post',
        label: 'POST + body',
        codeBlocks: [
          {
            id: 'ADV-F-1104-t-post',
            filename: 'requete.txt',
            language: 'text',
            code: `Methode : POST
URL     : https://api.exemple.com/users
Body    : raw -> JSON`,
          },
          {
            id: 'ADV-F-1104-t-post-body',
            filename: 'body.json',
            language: 'json',
            code: `{
  "nom": "Alice",
  "email": "alice@mail.com"
}`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/users', description: 'la route de création' },
          { token: 'nom / email', description: 'les champs attendus par l’API' },
        ],
        placement: 'Pour créer une ressource. Onglet Body → raw → JSON, puis colle le corps.',
      },
      {
        id: 'ADV-F-1104-v-auth',
        label: 'Header d’auth',
        codeBlocks: [
          {
            id: 'ADV-F-1104-t-auth',
            filename: 'headers.txt',
            language: 'text',
            code: `Onglet Headers :

Authorization    Bearer mon-token-secret
Content-Type     application/json`,
          },
        ],
        replacements: [
          { token: 'mon-token-secret', description: 'ton token ou ta clé API' },
        ],
        placement: 'Pour une route protégée : ajoute la ligne Authorization dans l’onglet Headers.',
      },
      {
        id: 'ADV-F-1104-v-curl',
        label: 'curl équivalent',
        codeBlocks: [
          {
            id: 'ADV-F-1104-t-curl',
            filename: 'terminal.sh',
            language: 'bash',
            code: `curl -X POST https://api.exemple.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer mon-token" \\
  -d '{"nom":"Alice"}'`,
          },
        ],
        replacements: [
          { token: '-X POST', description: 'la méthode HTTP (GET, POST, PUT…)' },
          { token: 'mon-token', description: 'ton token d’authentification' },
        ],
        placement: 'La même requête en ligne de commande, utile dans un script ou un README.',
      },
    ],
  }),

  // ————— React Query et TanStack Query —————
  lesson({
    id: 'ADV-F-1105-LESSON',
    slug: 'react-query-et-tanstack-query',
    title: 'React Query et TanStack Query',
    shortTitle: 'React Query',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Gérer les données d’une API dans React sans jongler avec useState + useEffect : chargement, erreur et cache automatiques.',
    utility: 'Charger et mettre en cache des données d’API dans React avec gestion automatique du loading et des erreurs.',
    aliases: ['react query', 'tanstack query', 'usequery', 'usemutation', 'cache api', 'data fetching'],
    keywords: [
      'charger des donnees',
      'cache automatique',
      'etat de chargement',
      'gerer les erreurs',
      'rafraichir les donnees',
      'invalider le cache',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1105-TEMPLATE',
    intro:
      '<b>TanStack Query</b> (anciennement <b>React Query</b>) gère pour toi les données venues d’une API : le <b>chargement</b>, les <b>erreurs</b>, le <b>cache</b> et les <b>rafraîchissements</b>. Fini le trio <code>useState</code> + <code>useEffect</code> + <code>fetch</code> répété partout : un seul hook, <code>useQuery</code>, fait le gros du travail.',
    sections: [
      {
        id: 's1',
        title: 'Installer et brancher le provider',
        blocks: [
          {
            type: 'paragraph',
            html: 'On installe la librairie, puis on entoure l’application d’un <code>QueryClientProvider</code>. C’est lui qui héberge le <b>cache</b> partagé.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1105-l-c1',
              filename: 'main.tsx',
              language: 'tsx',
              code: `// npm install @tanstack/react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Le client qui contient le cache
const queryClient = new QueryClient();

function Root() {
  return (
    // On enveloppe toute l'appli une seule fois
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Une seule fois :</b> le <code>QueryClientProvider</code> se met tout en haut, autour de <code>&lt;App /&gt;</code>. Tous les composants en dessous peuvent alors utiliser <code>useQuery</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Charger des données avec useQuery',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher la liste des articles venue d’une API</b>, avec un message « Chargement… » puis les données, et un message d’erreur si l’appel échoue — sans écrire toute la mécanique à la main.',
          },
          {
            type: 'paragraph',
            html: '<code>useQuery</code> prend une <b>clé</b> (pour le cache) et une <b>fonction</b> qui va chercher les données. Il renvoie directement <code>data</code>, <code>isLoading</code> et <code>error</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1105-l-c2',
              filename: 'Articles.tsx',
              language: 'tsx',
              code: `import { useQuery } from "@tanstack/react-query";

function Articles() {
  const { data, isLoading, error } = useQuery({
    // La cle unique qui identifie cette donnee dans le cache
    queryKey: ["articles"],
    // La fonction asynchrone qui charge les donnees
    queryFn: async () => {
      const r = await fetch("https://api.exemple.com/articles");
      return r.json();
    },
  });

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Une erreur est survenue</p>;

  // A ce stade, data contient les articles
  return <ul>{data.map((a) => <li key={a.id}>{a.titre}</li>)}</ul>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>useQuery</code> = un assistant qui va chercher les données, retient la réponse (cache) et te tient au courant : « je cherche » (<code>isLoading</code>), « voilà » (<code>data</code>) ou « ça a raté » (<code>error</code>).',
          },
        ],
      },
      {
        id: 's3',
        title: 'Modifier des données avec useMutation',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour <b>créer</b>, <b>modifier</b> ou <b>supprimer</b>, on utilise <code>useMutation</code>. Après succès, on <b>invalide</b> la clé concernée pour que la liste se recharge automatiquement.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1105-l-c3',
              filename: 'AjoutArticle.tsx',
              language: 'tsx',
              code: `import { useMutation, useQueryClient } from "@tanstack/react-query";

function AjoutArticle() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (nouveau) =>
      fetch("https://api.exemple.com/articles", {
        method: "POST",
        body: JSON.stringify(nouveau),
      }),
    onSuccess: () => {
      // On invalide "articles" -> la liste se recharge seule
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ titre: "Nouveau" })}>
      Ajouter
    </button>
  );
}`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Ce que useQuery te donne',
        blocks: [
          {
            type: 'table',
            headers: ['Propriété', 'Contient'],
            rows: [
              ['<code>data</code>', 'les données une fois chargées'],
              ['<code>isLoading</code>', '<code>true</code> pendant le premier chargement'],
              ['<code>isError</code>', '<code>true</code> si l’appel a échoué'],
              ['<code>error</code>', 'l’objet erreur'],
              ['<code>isFetching</code>', '<code>true</code> à chaque rafraîchissement'],
              ['<code>refetch</code>', 'une fonction pour recharger à la demande'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le <code>QueryClientProvider</code> autour de l’appli : <code>useQuery</code> plante avec une erreur de contexte.',
      'Réutiliser la <b>même</b> <code>queryKey</code> pour des données différentes : elles s’écrasent dans le cache.',
      'Mettre du code de mutation (POST) dans <code>useQuery</code> : <code>useQuery</code> est pour lire, <code>useMutation</code> pour écrire.',
      'Oublier <code>invalidateQueries</code> après une mutation : la liste affichée reste périmée.',
    ],
    takeaways: [
      'brancher une fois : <code>&lt;QueryClientProvider&gt;</code> autour de l’appli',
      'lire : <code>useQuery({ queryKey, queryFn })</code> → <code>data</code>, <code>isLoading</code>, <code>error</code>',
      'écrire : <code>useMutation({ mutationFn, onSuccess })</code>',
      'rafraîchir après écriture : <code>queryClient.invalidateQueries({ queryKey })</code>',
    ],
  }),
  template({
    id: 'ADV-F-1105-TEMPLATE',
    slug: 'react-query-et-tanstack-query',
    title: 'React Query',
    shortTitle: 'React Query',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Le code TanStack Query prêt à copier : provider, useQuery, useMutation, invalidation du cache.',
    lede: 'Gérer les données d’API. Choisis l’étape :',
    aliases: ['react query', 'tanstack query', 'usequery', 'usemutation'],
    keywords: ['provider', 'cache', 'invalider'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1105-LESSON',
    variants: [
      {
        id: 'ADV-F-1105-v-provider',
        label: 'Provider',
        codeBlocks: [
          {
            id: 'ADV-F-1105-t-provider',
            filename: 'main.tsx',
            language: 'tsx',
            code: `import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>`,
          },
        ],
        replacements: [
          { token: '<App />', description: 'ton composant racine' },
        ],
        placement: 'À placer une seule fois, tout en haut de l’application.',
      },
      {
        id: 'ADV-F-1105-v-query',
        label: 'useQuery',
        codeBlocks: [
          {
            id: 'ADV-F-1105-t-query',
            filename: 'composant.tsx',
            language: 'tsx',
            code: `const { data, isLoading, error } = useQuery({
  queryKey: ["articles"],
  queryFn: async () => {
    const r = await fetch("https://api.exemple.com/articles");
    return r.json();
  },
});`,
          },
        ],
        replacements: [
          { token: '"articles"', description: 'la clé unique de cette donnée dans le cache' },
          { token: 'https://api.exemple.com/articles', description: 'l’URL à appeler' },
        ],
        placement: 'Pour charger et mettre en cache des données. Gère loading et erreur pour toi.',
      },
      {
        id: 'ADV-F-1105-v-mutation',
        label: 'useMutation',
        codeBlocks: [
          {
            id: 'ADV-F-1105-t-mutation',
            filename: 'composant.tsx',
            language: 'tsx',
            code: `const mutation = useMutation({
  mutationFn: (nouveau) =>
    fetch("https://api.exemple.com/articles", {
      method: "POST",
      body: JSON.stringify(nouveau),
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["articles"] });
  },
});

// Declencher : mutation.mutate({ titre: "..." })`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/articles', description: 'l’URL de création/modification' },
          { token: '["articles"]', description: 'la clé à rafraîchir après succès' },
        ],
        placement: 'Pour créer, modifier ou supprimer. Invalide la clé pour recharger la liste.',
      },
    ],
  }),

  // ————— Les WebSockets : temps réel et chat —————
  lesson({
    id: 'ADV-F-1106-LESSON',
    slug: 'les-websockets-temps-reel-et-chat',
    title: 'Les WebSockets : temps réel et chat',
    shortTitle: 'WebSockets',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Ouvrir un canal permanent entre le navigateur et le serveur pour recevoir des messages en direct : chat, notifications, live.',
    utility: 'Recevoir et envoyer des données en temps réel via une connexion permanente (chat, notifications).',
    aliases: ['websocket', 'websockets', 'temps reel', 'socket.io', 'chat', 'live'],
    keywords: [
      'temps reel',
      'chat en direct',
      'connexion permanente',
      'recevoir des messages',
      'notifications live',
      'socket io',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1106-TEMPLATE',
    intro:
      'Un <b>WebSocket</b> ouvre un <b>canal permanent</b> entre le navigateur et le serveur : les deux peuvent s’envoyer des messages à tout moment, sans que le client redemande sans arrêt. C’est la base du <b>temps réel</b> : chat, notifications, tableaux de bord en direct. Là où <code>fetch</code> pose une question et raccroche, le WebSocket <b>reste en ligne</b>.',
    sections: [
      {
        id: 's1',
        title: 'Ouvrir une connexion',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>construire un chat où les messages des autres apparaissent instantanément</b>, sans que l’utilisateur ait à rafraîchir la page.',
          },
          {
            type: 'paragraph',
            html: 'On crée un <code>WebSocket</code> avec l’adresse du serveur (préfixe <code>ws://</code> ou <code>wss://</code> pour sécurisé). On écoute ensuite ses <b>événements</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1106-l-c1',
              filename: 'chat.js',
              language: 'javascript',
              code: `// On ouvre le canal vers le serveur (wss = securise)
const socket = new WebSocket("wss://chat.exemple.com");

// Quand la connexion est etablie
socket.onopen = () => {
  console.log("Connecte au serveur");
};

// Quand un message arrive du serveur
socket.onmessage = (event) => {
  console.log("Recu :", event.data);
};`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>fetch</code> = un <b>coup de fil</b> : tu demandes, tu obtiens, tu raccroches. Le WebSocket = un <b>talkie-walkie</b> resté ouvert : chacun parle quand il veut, l’autre entend aussitôt.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les quatre événements',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un socket a quatre événements principaux. On leur attache une fonction pour réagir.',
          },
          {
            type: 'table',
            headers: ['Événement', 'Se déclenche quand…'],
            rows: [
              ['<code>onopen</code>', 'la connexion est établie'],
              ['<code>onmessage</code>', 'un message arrive du serveur'],
              ['<code>onclose</code>', 'la connexion se ferme'],
              ['<code>onerror</code>', 'une erreur survient'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Envoyer un message',
        blocks: [
          {
            type: 'paragraph',
            html: 'On envoie avec <code>socket.send</code>. Comme pour le stockage, on transforme un objet en texte avec <code>JSON.stringify</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1106-l-c2',
              filename: 'envoi.js',
              language: 'javascript',
              code: `// Envoyer un texte simple
socket.send("Bonjour tout le monde");

// Envoyer un objet -> on le transforme en texte JSON
socket.send(JSON.stringify({
  auteur: "Alice",
  texte: "Salut !",
}));

// Cote reception, on reconstruit l'objet
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log(message.auteur, ":", message.texte);
};`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Dans React : ouvrir et fermer proprement',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dans React, on ouvre le socket dans un <code>useEffect</code> et on le <b>ferme</b> dans la fonction de nettoyage pour éviter les connexions fantômes.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1106-l-c3',
              filename: 'useChat.ts',
              language: 'tsx',
              code: `import { useEffect, useState } from "react";

function useChat() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket("wss://chat.exemple.com");

    // A chaque message recu, on l'ajoute a la liste
    socket.onmessage = (event) => {
      setMessages((liste) => [...liste, event.data]);
    };

    // Nettoyage : on ferme le socket au demontage
    return () => socket.close();
  }, []);

  return messages;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> toujours <code>socket.close()</code> dans le retour du <code>useEffect</code>. Sinon, chaque rendu ouvre une nouvelle connexion sans fermer les précédentes.',
          },
        ],
      },
      {
        id: 's5',
        title: 'socket.io : la version confortable',
        blocks: [
          {
            type: 'paragraph',
            html: 'La librairie <b>socket.io</b> simplifie tout : reconnexion automatique, événements nommés, salons. Elle est très répandue côté Node.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1106-l-c4',
              filename: 'socketio.js',
              language: 'javascript',
              code: `// npm install socket.io-client
import { io } from "socket.io-client";

const socket = io("https://chat.exemple.com");

// On ecoute un evenement nomme "message"
socket.on("message", (data) => {
  console.log("Nouveau message :", data);
});

// On emet un evenement nomme "message"
socket.emit("message", { texte: "Salut !" });`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>socket.close()</code> dans le nettoyage du <code>useEffect</code> : les connexions s’accumulent à chaque rendu.',
      'Utiliser <code>ws://</code> sur un site en <code>https</code> : le navigateur bloque. Utilise <code>wss://</code> (sécurisé).',
      'Envoyer un objet sans <code>JSON.stringify</code> : le serveur reçoit <code>"[object Object]"</code>.',
      'Confondre <code>send</code> (WebSocket natif) et <code>emit</code> (socket.io) : ce ne sont pas les mêmes API.',
    ],
    takeaways: [
      'WebSocket = <b>canal permanent</b> bidirectionnel · <code>wss://</code> en production',
      'événements : <code>onopen</code>, <code>onmessage</code>, <code>onclose</code>, <code>onerror</code>',
      'envoyer : <code>socket.send(JSON.stringify(obj))</code> · recevoir : <code>JSON.parse(event.data)</code>',
      'dans React : ouvrir dans <code>useEffect</code>, fermer avec <code>socket.close()</code> au nettoyage',
    ],
  }),
  template({
    id: 'ADV-F-1106-TEMPLATE',
    slug: 'les-websockets-temps-reel-et-chat',
    title: 'WebSockets',
    shortTitle: 'WebSockets',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Le code temps réel prêt à copier : WebSocket natif, hook React, socket.io client et serveur.',
    lede: 'Ouvrir un canal temps réel. Choisis l’approche :',
    aliases: ['websocket', 'temps reel', 'socket.io', 'chat'],
    keywords: ['send', 'onmessage', 'emit'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1106-LESSON',
    variants: [
      {
        id: 'ADV-F-1106-v-natif',
        label: 'WebSocket natif',
        codeBlocks: [
          {
            id: 'ADV-F-1106-t-natif',
            filename: 'chat.js',
            language: 'javascript',
            code: `const socket = new WebSocket("wss://chat.exemple.com");

socket.onopen = () => console.log("Connecte");

socket.onmessage = (event) => {
  console.log("Recu :", event.data);
};

socket.send("Bonjour");`,
          },
        ],
        replacements: [
          { token: 'wss://chat.exemple.com', description: 'l’adresse de ton serveur WebSocket' },
          { token: '"Bonjour"', description: 'le message à envoyer' },
        ],
        placement: 'Sans librairie, avec l’API WebSocket fournie par le navigateur.',
      },
      {
        id: 'ADV-F-1106-v-hook',
        label: 'Hook React',
        codeBlocks: [
          {
            id: 'ADV-F-1106-t-hook',
            filename: 'useChat.ts',
            language: 'tsx',
            code: `useEffect(() => {
  const socket = new WebSocket("wss://chat.exemple.com");

  socket.onmessage = (event) => {
    setMessages((liste) => [...liste, event.data]);
  };

  // Fermeture propre au demontage
  return () => socket.close();
}, []);`,
          },
        ],
        replacements: [
          { token: 'wss://chat.exemple.com', description: 'l’adresse du serveur' },
          { token: 'setMessages', description: 'ton setter de state pour stocker les messages reçus' },
        ],
        placement: 'Dans React : ouvre dans useEffect, ferme dans le retour de nettoyage.',
      },
      {
        id: 'ADV-F-1106-v-socketio',
        label: 'socket.io (client)',
        codeBlocks: [
          {
            id: 'ADV-F-1106-t-socketio',
            filename: 'socketio.js',
            language: 'javascript',
            code: `import { io } from "socket.io-client";

const socket = io("https://chat.exemple.com");

socket.on("message", (data) => {
  console.log(data);
});

socket.emit("message", { texte: "Salut" });`,
          },
        ],
        replacements: [
          { token: 'https://chat.exemple.com', description: 'l’adresse du serveur socket.io' },
          { token: '"message"', description: 'le nom de l’événement écouté/émis' },
        ],
        placement: 'Avec la librairie socket.io : reconnexion automatique et événements nommés.',
      },
      {
        id: 'ADV-F-1106-v-serveur',
        label: 'Serveur (Node)',
        codeBlocks: [
          {
            id: 'ADV-F-1106-t-serveur',
            filename: 'serveur.js',
            language: 'javascript',
            code: `// npm install socket.io
import { Server } from "socket.io";

const io = new Server(3000);

io.on("connection", (socket) => {
  // On recoit un message et on le renvoie a tous
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});`,
          },
        ],
        replacements: [
          { token: '3000', description: 'le port d’écoute du serveur' },
          { token: '"message"', description: 'le nom de l’événement' },
        ],
        placement: 'Côté Node : un mini-serveur de chat qui rediffuse chaque message à tous les clients.',
      },
    ],
  }),
];
