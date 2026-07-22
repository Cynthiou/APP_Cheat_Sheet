import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const testingContent: ReadyContent[] = [
  // ————— Les tests : Jest et Vitest —————
  lesson({
    id: 'TEST-F-1100-LESSON',
    slug: 'les-tests-jest-et-vitest',
    title: 'Les tests : Jest et Vitest',
    shortTitle: 'Jest / Vitest',
    technology: 'testing',
    tomeId: 't17',
    summary:
      'Écrire des tests automatiques qui vérifient que ton code fait bien ce qu’il doit faire, avec Jest ou Vitest.',
    utility: 'Vérifier automatiquement qu’une fonction renvoie le bon résultat, à chaque modification.',
    aliases: ['jest', 'vitest', 'test unitaire', 'tests automatiques', 'expect', 'describe', 'it'],
    keywords: [
      'ecrire un test',
      'tester une fonction',
      'test unitaire',
      'expect toBe',
      'lancer les tests',
      'assertion',
    ],
    relatedContentIds: [],
    templateId: 'TEST-F-1100-TEMPLATE',
    intro:
      'Un <b>test</b> est un petit bout de code qui vérifie qu’un autre bout de code marche. Tu écris ce que tu <b>attends</b> (<code>expect</code>), et l’outil (<b>Jest</b> ou <b>Vitest</b>) te dit si c’est vert (ça passe) ou rouge (ça casse).',
    sections: [
      {
        id: 's1',
        title: 'À quoi ça sert ?',
        blocks: [
          {
            type: 'paragraph',
            html: 'Sans tests, tu vérifies tout <b>à la main</b> après chaque changement. Avec des tests, l’ordinateur le fait pour toi en une seconde, et te prévient dès que quelque chose casse. <b>Jest</b> et <b>Vitest</b> font la même chose : Vitest est plus rapide et conçu pour les projets <b>Vite</b>, Jest est le plus répandu.',
          },
          {
            type: 'table',
            headers: ['Outil', 'Ce que c’est', 'Quand l’utiliser'],
            rows: [
              ['Jest', 'le testeur historique, très répandu', 'projets Create React App, Node classique'],
              ['Vitest', 'le testeur moderne et rapide', 'projets Vite (le cas le plus courant aujourd’hui)'],
              ['<code>expect</code>', 'l’assertion : ce que tu attends', 'dans les deux, syntaxe identique'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un test, c’est un <b>vigile</b> à l’entrée. Tu lui donnes une règle (« seuls les majeurs passent ») et il contrôle chaque personne à ta place, sans se fatiguer.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Écrire un premier test',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>vérifier automatiquement qu’une fonction <code>addition</code> renvoie bien la somme</b> de deux nombres, sans avoir à l’essayer à la main.',
          },
          {
            type: 'paragraph',
            html: 'La structure d’un test tient en 3 mots : <code>test</code> (ou <code>it</code>) décrit le cas, <code>expect</code> prend le résultat, et le <b>matcher</b> (<code>toBe</code>) dit à quoi il doit être égal.',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1100-l-c1',
              filename: 'addition.test.js',
              language: 'javascript',
              code: `// La fonction qu'on veut tester
function addition(a, b) {
  return a + b;
}

// 1. test() = un cas de test, avec une phrase qui le decrit
test("additionne deux nombres", () => {
  // 2. expect() = le resultat obtenu
  // 3. toBe() = la valeur attendue
  expect(addition(2, 3)).toBe(5);
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> un fichier de test se nomme <code>xxx.test.js</code> ou <code>xxx.spec.js</code>. L’outil les trouve tout seul grâce à ce suffixe.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Regrouper avec describe',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>describe</code> range plusieurs tests liés sous un même titre. Chaque <code>test</code> vérifie <b>un seul</b> comportement — un test qui échoue pointe alors précisément le problème.',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1100-l-c2',
              filename: 'addition.test.js',
              language: 'javascript',
              code: `import { addition } from "./addition";

// describe = un dossier qui regroupe des tests
describe("addition", () => {
  test("additionne deux positifs", () => {
    expect(addition(2, 3)).toBe(5);
  });

  test("gere les negatifs", () => {
    expect(addition(-2, 5)).toBe(3);
  });

  test("additionne avec zero", () => {
    expect(addition(0, 7)).toBe(7);
  });
});`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Les matchers courants',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un <b>matcher</b> est la façon de comparer. <code>toBe</code> compare des valeurs simples (nombre, texte), <code>toEqual</code> compare le <b>contenu</b> d’un objet ou d’un tableau.',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1100-l-c3',
              filename: 'matchers.test.js',
              language: 'javascript',
              code: `test("les matchers utiles", () => {
  // Valeur exacte (nombre, texte, booleen)
  expect(2 + 2).toBe(4);

  // Contenu d'un objet ou d'un tableau
  expect({ nom: "Alice" }).toEqual({ nom: "Alice" });

  // Vrai / faux
  expect(3 > 2).toBe(true);

  // Contient un element
  expect([1, 2, 3]).toContain(2);

  // Le contraire, avec .not
  expect(5).not.toBe(4);
});`,
            },
          },
          {
            type: 'table',
            headers: ['Matcher', 'Vérifie'],
            rows: [
              ['<code>toBe(x)</code>', 'égalité stricte (valeurs simples)'],
              ['<code>toEqual(x)</code>', 'égalité de contenu (objet, tableau)'],
              ['<code>toContain(x)</code>', 'un tableau contient l’élément'],
              ['<code>toBeTruthy()</code>', 'la valeur est « vraie »'],
              ['<code>.not.toBe(x)</code>', 'l’inverse d’un matcher'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>toBe</code> sur un objet ou un tableau : <code>toBe</code> compare la <b>référence</b>, pas le contenu. Pour un objet, utilise <code>toEqual</code>.',
      'Oublier le suffixe <code>.test.js</code> : l’outil ne trouvera pas ton fichier et n’exécutera aucun test.',
      'Écrire un test qui vérifie <b>plusieurs choses</b> à la fois : garde un comportement par <code>test</code>, sinon l’échec est difficile à situer.',
      'Oublier de <code>return</code> ou d’<code>await</code> un test asynchrone : Jest croit le test réussi avant même la fin.',
    ],
    takeaways: [
      'un test = <code>test("...", () => { expect(...).toBe(...) })</code>',
      '<code>toBe</code> = valeurs simples · <code>toEqual</code> = objets et tableaux',
      '<code>describe</code> regroupe des tests liés · un comportement par test',
      'fichier nommé <code>xxx.test.js</code> · Vitest et Jest partagent la même syntaxe',
      'lancer : <code>npx vitest</code> ou <code>npx jest</code>',
    ],
  }),
  template({
    id: 'TEST-F-1100-TEMPLATE',
    slug: 'les-tests-jest-et-vitest',
    title: 'Jest / Vitest',
    shortTitle: 'Jest / Vitest',
    technology: 'testing',
    tomeId: 't17',
    summary: 'Le squelette d’un test prêt à copier : Vitest, Jest, ou test d’une fonction asynchrone.',
    lede: 'Écrire un test. Choisis l’outil ou le cas :',
    aliases: ['jest', 'vitest', 'test unitaire', 'expect'],
    keywords: ['ecrire un test', 'describe', 'toBe', 'async'],
    relatedContentIds: [],
    lessonId: 'TEST-F-1100-LESSON',
    variants: [
      {
        id: 'vitest',
        label: 'Vitest',
        description: 'Le testeur moderne, à privilégier sur un projet Vite.',
        codeBlocks: [
          {
            id: 'TEST-F-1100-t-vitest',
            filename: 'somme.test.js',
            language: 'javascript',
            code: `import { describe, test, expect } from "vitest";
import { somme } from "./somme";

describe("somme", () => {
  test("additionne deux nombres", () => {
    expect(somme(2, 3)).toBe(5);
  });
});`,
          },
        ],
        replacements: [
          { token: 'somme', description: 'la fonction que tu veux tester' },
          { token: 'somme(2, 3)', description: 'l’appel à tester (les entrées)' },
          { token: '5', description: 'le résultat attendu' },
        ],
        placement: 'Fichier nommé xxx.test.js à côté du fichier testé. Lancer avec npx vitest.',
      },
      {
        id: 'jest',
        label: 'Jest',
        description: 'La même chose avec Jest — describe/test/expect sont globaux, pas besoin d’import.',
        codeBlocks: [
          {
            id: 'TEST-F-1100-t-jest',
            filename: 'somme.test.js',
            language: 'javascript',
            code: `const { somme } = require("./somme");

describe("somme", () => {
  test("additionne deux nombres", () => {
    expect(somme(2, 3)).toBe(5);
  });
});`,
          },
        ],
        replacements: [
          { token: 'somme', description: 'la fonction que tu veux tester' },
          { token: 'somme(2, 3)', description: 'l’appel à tester' },
          { token: '5', description: 'le résultat attendu' },
        ],
        placement: 'Avec Jest, describe/test/expect sont disponibles partout. Lancer avec npx jest.',
      },
      {
        id: 'async',
        label: 'Fonction async',
        description: 'Pour tester une fonction qui renvoie une promesse : test async + await.',
        codeBlocks: [
          {
            id: 'TEST-F-1100-t-async',
            filename: 'api.test.js',
            language: 'javascript',
            code: `import { test, expect } from "vitest";
import { chargerUtilisateur } from "./api";

test("charge un utilisateur", async () => {
  const user = await chargerUtilisateur(1);
  expect(user.nom).toBe("Alice");
});`,
          },
        ],
        replacements: [
          { token: 'chargerUtilisateur', description: 'ta fonction asynchrone' },
          { token: 'user.nom', description: 'la propriété du résultat à vérifier' },
          { token: 'Alice', description: 'la valeur attendue' },
        ],
        placement: 'Ajoute async devant la fonction de test et await devant l’appel, sinon le test finit trop tôt.',
      },
    ],
  }),

  // ————— Testing Library : tester un composant React —————
  lesson({
    id: 'TEST-F-1101-LESSON',
    slug: 'testing-library-tester-un-composant-react',
    title: 'Testing Library : tester un composant React',
    shortTitle: 'Testing Library',
    technology: 'testing',
    tomeId: 't17',
    summary:
      'Vérifier qu’un composant React affiche le bon contenu et réagit aux clics, comme le ferait une vraie utilisatrice.',
    utility: 'Tester un composant React du point de vue de l’utilisateur : ce qui s’affiche et ce qui se passe au clic.',
    aliases: ['testing library', 'render', 'screen', 'fireEvent', 'userEvent', 'tester un composant'],
    keywords: [
      'tester un composant react',
      'render screen',
      'getByText',
      'getByRole',
      'simuler un clic',
      'tester un bouton',
    ],
    relatedContentIds: [],
    templateId: 'TEST-F-1101-TEMPLATE',
    intro:
      '<b>Testing Library</b> teste un composant comme un vrai utilisateur : elle le <b>rend</b> (<code>render</code>), <b>cherche</b> à l’écran ce qui est affiché (<code>screen</code>), et <b>simule</b> des interactions (clic, saisie). On ne teste pas le code interne, mais le <b>résultat visible</b>.',
    sections: [
      {
        id: 's1',
        title: 'Le trio render / screen / matcher',
        blocks: [
          {
            type: 'paragraph',
            html: 'Trois pièces reviennent toujours : <code>render</code> affiche le composant dans un faux DOM, <code>screen</code> cherche un élément dedans, et un matcher comme <code>toBeInTheDocument</code> vérifie qu’il est bien là.',
          },
          {
            type: 'table',
            headers: ['Outil', 'Rôle'],
            rows: [
              ['<code>render(...)</code>', 'monte le composant en mémoire'],
              ['<code>screen</code>', 'accède à ce qui est affiché'],
              ['<code>getByText</code>', 'trouve par le texte visible'],
              ['<code>getByRole</code>', 'trouve par le rôle (bouton, lien…)'],
              ['<code>toBeInTheDocument()</code>', 'vérifie la présence à l’écran'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> Testing Library, c’est une <b>fausse utilisatrice</b>. Elle regarde l’écran (« je vois le texte “Bienvenue” ? »), clique sur les boutons, tape dans les champs — sans jamais lire ton code source.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Tester qu’un texte s’affiche',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>vérifier que mon composant <code>Bonjour</code> affiche bien le prénom passé en props</b> à l’écran.',
          },
          {
            type: 'paragraph',
            html: 'On rend le composant, puis on cherche le texte avec <code>screen.getByText</code>, et on vérifie sa présence avec <code>toBeInTheDocument</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1101-l-c1',
              filename: 'Bonjour.test.tsx',
              language: 'tsx',
              code: `import { render, screen } from "@testing-library/react";
import { Bonjour } from "./Bonjour";

test("affiche le prenom", () => {
  // 1. Je monte le composant avec ses props
  render(<Bonjour prenom="Alice" />);

  // 2. Je cherche le texte a l'ecran
  const titre = screen.getByText("Bonjour Alice");

  // 3. Je verifie qu'il est bien affiche
  expect(titre).toBeInTheDocument();
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> privilégie <code>getByRole</code> et <code>getByText</code> — ce que l’utilisateur voit. Évite de chercher par classe CSS ou par id, plus fragiles.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Simuler un clic',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>vérifier qu’un compteur passe de 0 à 1 quand on clique sur le bouton</b>, comme le ferait une vraie personne.',
          },
          {
            type: 'paragraph',
            html: 'On trouve le bouton par son rôle, on simule le clic avec <code>userEvent</code>, puis on vérifie le nouvel affichage. <code>userEvent</code> imite un vrai utilisateur mieux que <code>fireEvent</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1101-l-c2',
              filename: 'Compteur.test.tsx',
              language: 'tsx',
              code: `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Compteur } from "./Compteur";

test("incremente au clic", async () => {
  render(<Compteur />);

  // Je trouve le bouton par son texte accessible
  const bouton = screen.getByRole("button", { name: /ajouter/i });

  // Je simule un vrai clic (await car userEvent est async)
  await userEvent.click(bouton);

  // Le compteur affiche maintenant 1
  expect(screen.getByText("1")).toBeInTheDocument();
});`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'get, query, find : lequel choisir',
        blocks: [
          {
            type: 'paragraph',
            html: 'Trois familles de recherche selon le cas : <code>getBy</code> quand l’élément <b>doit</b> exister, <code>queryBy</code> pour vérifier une <b>absence</b>, <code>findBy</code> quand l’élément <b>arrive plus tard</b> (asynchrone).',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1101-l-c3',
              filename: 'recherche.test.tsx',
              language: 'tsx',
              code: `// getBy : l'element DOIT etre la (sinon erreur)
screen.getByText("Bienvenue");

// queryBy : renvoie null si absent -> tester une absence
expect(screen.queryByText("Erreur")).not.toBeInTheDocument();

// findBy : attend qu'un element apparaisse (async)
const message = await screen.findByText("Chargement termine");
expect(message).toBeInTheDocument();`,
            },
          },
          {
            type: 'table',
            headers: ['Préfixe', 'Si absent', 'Usage'],
            rows: [
              ['<code>getBy</code>', 'lève une erreur', 'l’élément est déjà présent'],
              ['<code>queryBy</code>', 'renvoie <code>null</code>', 'vérifier une absence'],
              ['<code>findBy</code>', 'attend puis échoue', 'l’élément apparaît plus tard'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>await</code> devant <code>userEvent.click</code> ou <code>findBy</code> : le test continue avant la mise à jour et échoue à tort.',
      'Utiliser <code>getBy</code> pour tester une absence : il lève une erreur au lieu de renvoyer <code>null</code>. Utilise <code>queryBy</code>.',
      'Chercher par classe CSS ou id interne : au moindre refactor, le test casse. Cherche par <b>rôle</b> et par <b>texte</b>.',
      'Oublier d’installer/importer <code>@testing-library/jest-dom</code> : les matchers comme <code>toBeInTheDocument</code> n’existent pas sans lui.',
    ],
    takeaways: [
      '<code>render(...)</code> monte le composant · <code>screen</code> cherche à l’écran',
      'trouver : <code>getByRole</code> et <code>getByText</code> (ce que l’utilisateur voit)',
      'cliquer : <code>await userEvent.click(bouton)</code>',
      '<code>getBy</code> (présent) · <code>queryBy</code> (absent) · <code>findBy</code> (asynchrone)',
      '<code>toBeInTheDocument()</code> vient de <code>@testing-library/jest-dom</code>',
    ],
  }),
  template({
    id: 'TEST-F-1101-TEMPLATE',
    slug: 'testing-library-tester-un-composant-react',
    title: 'Testing Library',
    shortTitle: 'Testing Library',
    technology: 'testing',
    tomeId: 't17',
    summary: 'Tester un composant React prêt à copier : afficher un texte, simuler un clic, tester une saisie.',
    lede: 'Tester un composant React. Choisis le cas :',
    aliases: ['testing library', 'render', 'screen', 'userEvent'],
    keywords: ['getByText', 'getByRole', 'simuler un clic', 'input'],
    relatedContentIds: [],
    lessonId: 'TEST-F-1101-LESSON',
    variants: [
      {
        id: 'affichage',
        label: 'Vérifier un affichage',
        description: 'Le cas de base : le composant affiche-t-il le bon texte ?',
        codeBlocks: [
          {
            id: 'TEST-F-1101-t-render',
            filename: 'Carte.test.tsx',
            language: 'tsx',
            code: `import { render, screen } from "@testing-library/react";
import { Carte } from "./Carte";

test("affiche le titre", () => {
  render(<Carte titre="Mon produit" />);
  expect(screen.getByText("Mon produit")).toBeInTheDocument();
});`,
          },
        ],
        replacements: [
          { token: 'Carte', description: 'le composant à tester' },
          { token: 'titre="Mon produit"', description: 'les props à passer' },
          { token: 'Mon produit', description: 'le texte que tu t’attends à voir' },
        ],
        placement: 'Le point de départ de tout test de composant : rendre puis chercher un texte visible.',
      },
      {
        id: 'clic',
        label: 'Simuler un clic',
        description: 'Vérifier qu’une interaction change l’affichage.',
        codeBlocks: [
          {
            id: 'TEST-F-1101-t-click',
            filename: 'Bouton.test.tsx',
            language: 'tsx',
            code: `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Compteur } from "./Compteur";

test("incremente au clic", async () => {
  render(<Compteur />);
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByText("1")).toBeInTheDocument();
});`,
          },
        ],
        replacements: [
          { token: 'Compteur', description: 'le composant interactif' },
          { token: '"button"', description: 'le rôle de l’élément cliqué' },
          { token: '1', description: 'le texte attendu après le clic' },
        ],
        placement: 'Pour tester un bouton, un toggle, un ajout au panier. N’oublie pas async + await.',
      },
      {
        id: 'saisie',
        label: 'Tester une saisie',
        description: 'Taper dans un champ et vérifier le résultat.',
        codeBlocks: [
          {
            id: 'TEST-F-1101-t-type',
            filename: 'Champ.test.tsx',
            language: 'tsx',
            code: `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Recherche } from "./Recherche";

test("affiche la saisie", async () => {
  render(<Recherche />);
  const champ = screen.getByRole("textbox");
  await userEvent.type(champ, "chaussures");
  expect(champ).toHaveValue("chaussures");
});`,
          },
        ],
        replacements: [
          { token: 'Recherche', description: 'le composant avec un champ' },
          { token: '"textbox"', description: 'le rôle du champ (textbox pour un input texte)' },
          { token: 'chaussures', description: 'le texte tapé et attendu' },
        ],
        placement: 'Pour un champ de formulaire ou de recherche : userEvent.type simule la frappe caractère par caractère.',
      },
    ],
  }),

  // ————— ESLint, Prettier et Biome : formatage automatique —————
  lesson({
    id: 'TEST-F-1102-LESSON',
    slug: 'eslint-prettier-et-biome-formatage-automatique',
    title: 'ESLint, Prettier et Biome : formatage automatique',
    shortTitle: 'ESLint / Prettier',
    technology: 'testing',
    tomeId: 't17',
    summary:
      'Repérer les erreurs et mettre en forme ton code automatiquement, pour un projet propre et cohérent.',
    utility: 'Garder un code propre et uniforme : détecter les erreurs (ESLint) et formater (Prettier ou Biome).',
    aliases: ['eslint', 'prettier', 'biome', 'linter', 'formatage', 'lint', 'formater le code'],
    keywords: [
      'formater le code',
      'detecter les erreurs',
      'linter',
      'indentation automatique',
      'code propre',
      'regles de style',
    ],
    relatedContentIds: [],
    templateId: 'TEST-F-1102-TEMPLATE',
    intro:
      '<b>ESLint</b> analyse ton code pour repérer les <b>erreurs et mauvaises pratiques</b>. <b>Prettier</b> le <b>met en forme</b> (indentation, guillemets, points-virgules). <b>Biome</b> fait les <b>deux à la fois</b>, en plus rapide.',
    sections: [
      {
        id: 's1',
        title: 'Linter vs formateur',
        blocks: [
          {
            type: 'paragraph',
            html: 'Ne pas confondre : un <b>linter</b> juge la <b>qualité</b> (variable inutilisée, bug potentiel), un <b>formateur</b> juge l’<b>apparence</b> (espaces, retours à la ligne). Les deux se complètent.',
          },
          {
            type: 'table',
            headers: ['Outil', 'Rôle', 'Exemple de ce qu’il attrape'],
            rows: [
              ['ESLint', 'linter (qualité)', 'une variable jamais utilisée'],
              ['Prettier', 'formateur (style)', 'une indentation irrégulière'],
              ['Biome', 'linter + formateur', 'les deux, en un seul outil rapide'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> ESLint est le <b>correcteur d’orthographe et de grammaire</b> (fautes, tournures douteuses). Prettier est la <b>mise en page</b> (marges, alignement). L’un vérifie le fond, l’autre la forme.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Installer et lancer',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>vérifier mon code et le reformater d’une seule commande</b> avant de committer, pour livrer quelque chose de propre.',
          },
          {
            type: 'paragraph',
            html: 'On lance ESLint pour détecter, puis Prettier pour formater. L’option <code>--fix</code> d’ESLint corrige tout seul ce qui peut l’être.',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1102-l-c1',
              filename: 'terminal.sh',
              language: 'bash',
              code: `# Analyser le code et signaler les problemes
npx eslint .

# Corriger automatiquement ce qui peut l'etre
npx eslint . --fix

# Reformater tous les fichiers avec Prettier
npx prettier --write .

# Avec Biome : lint + format en une commande
npx @biomejs/biome check --write .`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> on met ces commandes dans les <code>scripts</code> du <code>package.json</code> (<code>npm run lint</code>, <code>npm run format</code>) pour ne pas les retaper.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Configurer les règles',
        blocks: [
          {
            type: 'paragraph',
            html: 'Chaque outil a son fichier de config à la racine. On y active des règles et on ajuste le style (guillemets, points-virgules). Voici un <code>.prettierrc</code> minimal.',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1102-l-c2',
              filename: '.prettierrc.json',
              language: 'json',
              code: `{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all"
}`,
            },
          },
          {
            type: 'paragraph',
            html: 'Côté ESLint (config plate moderne), on part souvent de la config recommandée puis on ajoute ses propres règles.',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1102-l-c3',
              filename: 'eslint.config.js',
              language: 'javascript',
              code: `import js from "@eslint/js";

export default [
  js.configs.recommended, // les regles de base recommandees
  {
    rules: {
      // Interdit les variables jamais utilisees
      "no-unused-vars": "warn",
      // Interdit les console.log oublies
      "no-console": "warn",
    },
  },
];`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Formater à la sauvegarde',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le plus confortable : que ton éditeur formate <b>à chaque sauvegarde</b>. Dans VS Code, on l’active avec un fichier <code>.vscode/settings.json</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1102-l-c4',
              filename: '.vscode/settings.json',
              language: 'json',
              code: `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce équipe :</b> commit ces fichiers de config. Tout le monde a alors le même style, et fini les diffs Git remplis de différences d’espaces.',
          },
        ],
      },
    ],
    pitfalls: [
      'Faire gérer le <b>style</b> à la fois par ESLint et Prettier : ils se contredisent. Laisse le formatage à Prettier (ou passe à Biome).',
      'Lancer <code>eslint --fix</code> sur du code non commité sans relire : il modifie tes fichiers, vérifie le résultat avant de committer.',
      'Oublier le fichier de config à la racine : sans lui, l’outil applique des réglages par défaut, différents d’une machine à l’autre.',
      'Ignorer les avertissements en boucle : un <code>warn</code> qui traîne finit par cacher une vraie erreur. Traite-les régulièrement.',
    ],
    takeaways: [
      'ESLint = qualité (bugs, mauvaises pratiques) · Prettier = mise en forme',
      'Biome = linter + formateur en un seul outil, très rapide',
      'corriger : <code>eslint . --fix</code> · formater : <code>prettier --write .</code>',
      'config à la racine (<code>.prettierrc</code>, <code>eslint.config.js</code>), à committer',
      'idéal : <code>formatOnSave</code> dans l’éditeur pour ne plus y penser',
    ],
  }),
  template({
    id: 'TEST-F-1102-TEMPLATE',
    slug: 'eslint-prettier-et-biome-formatage-automatique',
    title: 'ESLint / Prettier / Biome',
    shortTitle: 'ESLint / Prettier',
    technology: 'testing',
    tomeId: 't17',
    summary: 'Config prête à copier pour formater et linter : Prettier, ESLint plat, ou Biome tout-en-un.',
    lede: 'Formater et vérifier ton code. Choisis l’outil :',
    aliases: ['eslint', 'prettier', 'biome', 'linter'],
    keywords: ['formater', 'lint', 'config', 'prettierrc'],
    relatedContentIds: [],
    lessonId: 'TEST-F-1102-LESSON',
    variants: [
      {
        id: 'prettier',
        label: 'Prettier',
        description: 'Formater le style (guillemets, indentation, points-virgules).',
        codeBlocks: [
          {
            id: 'TEST-F-1102-t-prettier',
            filename: '.prettierrc.json',
            language: 'json',
            code: `{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all"
}`,
          },
          {
            id: 'TEST-F-1102-t-prettier-cmd',
            filename: 'terminal.sh',
            language: 'bash',
            code: `npm install --save-dev prettier
npx prettier --write .`,
          },
        ],
        replacements: [
          { token: 'singleQuote', description: 'true pour des apostrophes, false pour des guillemets doubles' },
          { token: '100', description: 'la largeur maximale d’une ligne avant retour' },
        ],
        placement: 'Le formateur le plus répandu. Fichier .prettierrc.json à la racine, puis prettier --write.',
      },
      {
        id: 'eslint',
        label: 'ESLint',
        description: 'Détecter les erreurs et mauvaises pratiques (config plate moderne).',
        codeBlocks: [
          {
            id: 'TEST-F-1102-t-eslint',
            filename: 'eslint.config.js',
            language: 'javascript',
            code: `import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
];`,
          },
        ],
        replacements: [
          { token: 'no-unused-vars', description: 'la règle à activer (voir la doc ESLint)' },
          { token: 'warn', description: 'le niveau : "off", "warn" ou "error"' },
        ],
        placement: 'Fichier eslint.config.js à la racine. Lancer avec npx eslint . (ajoute --fix pour corriger).',
      },
      {
        id: 'biome',
        label: 'Biome',
        description: 'Un seul outil pour linter ET formater, sans config compliquée.',
        codeBlocks: [
          {
            id: 'TEST-F-1102-t-biome',
            filename: 'terminal.sh',
            language: 'bash',
            code: `npm install --save-dev @biomejs/biome
npx @biomejs/biome init

# Verifie et corrige lint + format d'un coup
npx @biomejs/biome check --write .`,
          },
        ],
        replacements: [
          { token: 'check --write .', description: 'analyse et corrige tous les fichiers du dossier' },
        ],
        placement: 'La solution moderne tout-en-un : remplace ESLint + Prettier par un seul outil rapide.',
      },
    ],
  }),

  // ————— Débugger : console et DevTools du navigateur —————
  lesson({
    id: 'TEST-F-1103-LESSON',
    slug: 'debugger-console-et-devtools-du-navigateur',
    title: 'Débugger : console et DevTools du navigateur',
    shortTitle: 'Débugger',
    technology: 'testing',
    tomeId: 't17',
    summary:
      'Comprendre pourquoi ton code ne marche pas grâce à la console, aux breakpoints et aux DevTools du navigateur.',
    utility: 'Trouver l’origine d’un bug : afficher des valeurs, poser des points d’arrêt, inspecter le réseau.',
    aliases: ['debug', 'debugger', 'console.log', 'devtools', 'breakpoint', 'point d arret', 'inspecter'],
    keywords: [
      'trouver un bug',
      'console log',
      'point d arret',
      'inspecter le reseau',
      'debugger',
      'erreur dans la console',
    ],
    relatedContentIds: [],
    templateId: 'TEST-F-1103-TEMPLATE',
    intro:
      'Débugger, c’est <b>enquêter</b> : comprendre ce que fait vraiment ton code. Deux outils clés : la <b>console</b> (<code>console.log</code> pour afficher des valeurs) et les <b>DevTools</b> du navigateur (breakpoints, réseau, éléments).',
    sections: [
      {
        id: 's1',
        title: 'console.log et ses variantes',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>savoir quelle valeur a réellement ma variable</b> à un moment donné, parce que le résultat affiché n’est pas celui que j’attendais.',
          },
          {
            type: 'paragraph',
            html: 'Le réflexe de base : <code>console.log</code> pour afficher une valeur. Il existe aussi <code>console.table</code> (pour un tableau), <code>console.error</code> et <code>console.warn</code> (messages colorés).',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1103-l-c1',
              filename: 'debug.js',
              language: 'javascript',
              code: `const utilisateur = { nom: "Alice", age: 30 };

// Afficher une valeur
console.log(utilisateur);

// Etiqueter pour s'y retrouver quand il y en a plusieurs
console.log("utilisateur :", utilisateur);

// Afficher un tableau de facon lisible
console.table([utilisateur, { nom: "Bob", age: 25 }]);

// Message d'erreur (rouge) ou d'avertissement (jaune)
console.error("Quelque chose a casse");
console.warn("Attention, valeur inattendue");`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce :</b> étiquette toujours tes logs (<code>console.log("panier :", panier)</code>). Sans étiquette, impossible de savoir quel <code>console.log</code> a produit quelle ligne.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Ouvrir les DevTools',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les <b>DevTools</b> s’ouvrent avec <b>F12</b> (ou clic droit → « Inspecter »). Chaque onglet a un rôle précis pour enquêter.',
          },
          {
            type: 'table',
            headers: ['Onglet', 'À quoi il sert'],
            rows: [
              ['Console', 'voir les <code>console.log</code> et les erreurs'],
              ['Elements', 'inspecter le HTML et le CSS appliqué'],
              ['Network', 'voir les requêtes réseau (API, images)'],
              ['Sources', 'poser des breakpoints dans le code'],
              ['Application', 'inspecter le localStorage, les cookies'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> les DevTools sont le <b>tableau de bord d’un garagiste</b>. La Console écoute le moteur, l’onglet Network surveille les entrées/sorties, et les breakpoints figent la voiture pour regarder sous le capot.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Poser un point d’arrêt',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>mettre mon code sur pause à une ligne précise</b> et regarder la valeur de chaque variable, plutôt que de semer des <code>console.log</code> partout.',
          },
          {
            type: 'paragraph',
            html: 'Un <b>breakpoint</b> met le code en pause. Le mot-clé <code>debugger</code> dans le code fait la même chose quand les DevTools sont ouverts : l’exécution s’arrête là, et tu inspectes tout.',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1103-l-c2',
              filename: 'panier.js',
              language: 'javascript',
              code: `function calculerTotal(articles) {
  let total = 0;

  for (const article of articles) {
    // L'execution s'arrete ici quand les DevTools sont ouverts
    debugger;
    total += article.prix;
  }

  return total;
}`,
            },
          },
          {
            type: 'paragraph',
            html: 'Une fois en pause, on avance <b>pas à pas</b> : « Step over » exécute la ligne suivante, « Resume » reprend jusqu’au prochain arrêt. On survole les variables pour voir leur valeur.',
          },
        ],
      },
      {
        id: 's4',
        title: 'Lire une erreur',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une erreur dans la console n’est pas une punition : c’est une <b>piste</b>. Le message dit <b>quoi</b>, la première ligne de la <b>stack trace</b> dit <b>où</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'TEST-F-1103-l-c3',
              filename: 'console.txt',
              language: 'text',
              code: `TypeError: Cannot read properties of undefined (reading 'nom')
    at afficherProfil (profil.js:12:20)
    at App (App.jsx:8:5)

// Traduction :
// QUOI  : tu lis .nom sur une valeur undefined
// OU    : fichier profil.js, ligne 12
// PISTE : la variable avant .nom est undefined, verifie-la`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Réflexe :</b> lis l’erreur en entier et clique sur le lien du fichier (ex. <code>profil.js:12</code>). Il t’emmène pile à la ligne fautive.',
          },
        ],
      },
    ],
    pitfalls: [
      'Laisser des <code>console.log</code> partout et livrer en production : nettoie-les (ou laisse la règle ESLint <code>no-console</code> te les signaler).',
      'Ignorer le message d’erreur et deviner au hasard : la <b>stack trace</b> te donne le fichier et la ligne exacts, lis-la.',
      'Mettre <code>console.log(maFonction)</code> au lieu de <code>console.log(maFonction())</code> : tu affiches la fonction, pas son résultat.',
      'Oublier le mot-clé <code>debugger</code> dans le code livré : retire-le, il fige l’app dès que quelqu’un ouvre les DevTools.',
    ],
    takeaways: [
      '<code>console.log("label :", valeur)</code> : toujours étiqueter',
      'variantes utiles : <code>console.table</code>, <code>console.error</code>, <code>console.warn</code>',
      'DevTools : <b>F12</b> · Console, Elements, Network, Sources',
      'pause dans le code : un <b>breakpoint</b> ou le mot-clé <code>debugger</code>',
      'une erreur = une piste : lis le message + la première ligne de la stack trace',
    ],
  }),
  template({
    id: 'TEST-F-1103-TEMPLATE',
    slug: 'debugger-console-et-devtools-du-navigateur',
    title: 'Débugger',
    shortTitle: 'Débugger',
    technology: 'testing',
    tomeId: 't17',
    summary: 'Outils de débogage prêts à copier : logs étiquetés, point d’arrêt, mesure de temps.',
    lede: 'Enquêter sur un bug. Choisis l’outil :',
    aliases: ['console.log', 'debugger', 'devtools', 'breakpoint'],
    keywords: ['afficher une valeur', 'point d arret', 'trouver un bug'],
    relatedContentIds: [],
    lessonId: 'TEST-F-1103-LESSON',
    variants: [
      {
        id: 'log',
        label: 'Log étiqueté',
        description: 'Afficher une valeur avec une étiquette pour s’y retrouver.',
        codeBlocks: [
          {
            id: 'TEST-F-1103-t-log',
            filename: 'debug.js',
            language: 'javascript',
            code: `console.log("panier :", panier);

// Objet affiche en tableau lisible
console.table(articles);`,
          },
        ],
        replacements: [
          { token: 'panier :', description: 'l’étiquette qui identifie ce log' },
          { token: 'panier', description: 'la variable à inspecter' },
        ],
        placement: 'Le réflexe de base. Étiquette toujours, sinon impossible de savoir quel log affiche quoi.',
      },
      {
        id: 'breakpoint',
        label: 'Point d’arrêt',
        description: 'Mettre le code en pause pour inspecter les variables.',
        codeBlocks: [
          {
            id: 'TEST-F-1103-t-debugger',
            filename: 'code.js',
            language: 'javascript',
            code: `function calculer(valeur) {
  // Pause ici quand les DevTools sont ouverts
  debugger;
  return valeur * 2;
}`,
          },
        ],
        replacements: [
          { token: 'debugger', description: 'la ligne où mettre l’exécution en pause' },
        ],
        placement: 'Ouvre les DevTools (F12) puis déclenche le code : il s’arrête sur debugger. Retire-le avant de livrer.',
      },
      {
        id: 'temps',
        label: 'Mesurer un temps',
        description: 'Savoir combien de temps prend un bout de code.',
        codeBlocks: [
          {
            id: 'TEST-F-1103-t-time',
            filename: 'perf.js',
            language: 'javascript',
            code: `console.time("chargement");

// ... le code a mesurer ...

console.timeEnd("chargement");
// Affiche : chargement: 42 ms`,
          },
        ],
        replacements: [
          { token: 'chargement', description: 'un nom d’étiquette (identique pour time et timeEnd)' },
        ],
        placement: 'Pour repérer un traitement trop lent. Le même libellé doit passer à time et à timeEnd.',
      },
    ],
  }),
];
