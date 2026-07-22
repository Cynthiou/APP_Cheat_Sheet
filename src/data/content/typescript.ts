import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const typescriptContent: ReadyContent[] = [
  // ————— C'est quoi un type —————
  lesson({
    id: 'TS-F-001-LESSON',
    slug: 'cest-quoi-un-type',
    title: 'C’est quoi un type',
    shortTitle: 'Les types',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Décrire la forme d’une valeur pour attraper les erreurs avant l’exécution.',
    utility: 'Dire à l’avance quelle forme a une valeur (texte, nombre, objet…).',
    aliases: ['type', 'typescript', 'typage', 'ts'],
    keywords: ['annotation', 'typage statique', 'securite', 'erreur avant execution'],
    relatedContentIds: ['TS-F-009-LESSON', 'JS-F-001-LESSON'],
    templateId: 'TS-F-001-TEMPLATE',
    intro:
      'Un <b>type</b> décrit la forme d’une valeur. TypeScript vérifie ces types <b>pendant que tu écris</b> et signale les erreurs avant même de lancer le code.',
    sections: [
      {
        id: 's1',
        title: 'Annoter une valeur',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'ts-type-c1',
              filename: 'exemple.ts',
              language: 'typescript',
              code: `let age: number = 25;
let nom: string = "Alice";
let actif: boolean = true;

// Erreur detectee tout de suite :
// age = "vingt"; -> Type 'string' is not assignable to 'number'`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Souvent, TypeScript <b>devine</b> le type (inférence) : <code>let age = 25</code> est déjà un <code>number</code>. On annote surtout les paramètres et les objets.',
          },
        ],
      },
    ],
    takeaways: [
      'un type décrit la forme : <code>string</code>, <code>number</code>, <code>boolean</code>…',
      'TypeScript attrape l’erreur <b>avant</b> l’exécution',
    ],
  }),
  template({
    id: 'TS-F-001-TEMPLATE',
    slug: 'cest-quoi-un-type',
    title: 'Types de base',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Annoter une valeur avec un type.',
    lede: 'Déclarer une valeur typée. Choisis le cas :',
    aliases: ['type', 'annotation', 'tableau', 'objet', 'union'],
    keywords: ['string number boolean'],
    relatedContentIds: [],
    lessonId: 'TS-F-001-LESSON',
    variants: [
      {
        id: 'base',
        label: 'Types de base',
        codeBlocks: [
          {
            id: 'ts-type-t-base',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `const nom: string = "valeur";
const total: number = 0;
const actif: boolean = false;`,
          },
        ],
        replacements: [
          { token: 'string / number / boolean', description: 'le type qui décrit la valeur' },
        ],
        placement: 'À la déclaration (souvent facultatif : inférence).',
      },
      {
        id: 'tableau',
        label: 'Tableau',
        codeBlocks: [
          {
            id: 'ts-type-t-arr',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `const noms: string[] = ["Ana", "Bob"];
const ages: number[] = [20, 30];`,
          },
        ],
        replacements: [{ token: 'string[]', description: 'le type des éléments + []' }],
        placement: 'Un tableau de X se note <code>X[]</code>.',
      },
      {
        id: 'objet',
        label: 'Objet',
        codeBlocks: [
          {
            id: 'ts-type-t-obj',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `const user: { nom: string; age: number } = {
  nom: "Alice",
  age: 30,
};`,
          },
        ],
        replacements: [
          { token: 'nom / age', description: 'les propriétés et leurs types' },
        ],
        placement: 'On décrit la forme entre accolades (souvent via une interface, voir onglet suivant).',
      },
      {
        id: 'union',
        label: 'Union (plusieurs)',
        codeBlocks: [
          {
            id: 'ts-type-t-union',
            filename: 'exemple.ts',
            language: 'typescript',
            code: `let statut: "actif" | "inactif" = "actif";
let id: string | number = 42;`,
          },
        ],
        replacements: [
          { token: '"actif" | "inactif"', description: 'les valeurs/types autorisés' },
        ],
        placement: 'Le <code>|</code> = « l’un OU l’autre ».',
      },
    ],
  }),

  // ————— Typer les props —————
  lesson({
    id: 'TS-F-009-LESSON',
    slug: 'typer-les-props',
    title: 'Typer les props',
    shortTitle: 'Typer les props',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Décrire les props qu’un composant React attend, avec une interface.',
    utility: 'Sécuriser et documenter les données reçues par un composant.',
    aliases: ['props typees', 'interface props', 'react typescript', 'typer props'],
    keywords: ['props react', 'interface', 'type props', 'composant type'],
    relatedContentIds: ['REACT-F-004-LESSON', 'TS-F-001-LESSON'],
    templateId: 'TS-F-009-TEMPLATE',
    intro:
      'On décrit les props avec une <b>interface</b>, puis on la branche sur le composant. TypeScript vérifie alors que le parent passe les bonnes données.',
    sections: [
      {
        id: 's1',
        title: 'Une interface pour les props',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'ts-props-c1',
              filename: 'Carte.tsx',
              language: 'tsx',
              code: `interface CarteProps {
  titre: string;
  prix: number;
  enPromo?: boolean; // optionnel
}

function Carte({ titre, prix, enPromo }: CarteProps) {
  return <div>{titre} — {prix}€ {enPromo && "🔥"}</div>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Le <code>?</code> rend une prop <b>optionnelle</b>. Nomme l’interface <code>XxxProps</code> (ex. <code>CarteProps</code>).',
          },
        ],
      },
    ],
    takeaways: [
      '<code>interface XxxProps { ... }</code> puis <code>function X({ ... }: XxxProps)</code>',
      '<code>?</code> = prop optionnelle',
    ],
  }),
  template({
    id: 'TS-F-009-TEMPLATE',
    slug: 'typer-les-props',
    title: 'Typer les props',
    technology: 'typescript',
    tomeId: 't4',
    summary: 'Décrire les props d’un composant.',
    lede: 'Typer les props. Choisis le cas :',
    aliases: ['props typees', 'interface props', 'children'],
    keywords: ['react typescript'],
    relatedContentIds: ['REACT-F-004-TEMPLATE'],
    lessonId: 'TS-F-009-LESSON',
    variants: [
      {
        id: 'interface',
        label: 'interface',
        codeBlocks: [
          {
            id: 'ts-props-t-iface',
            filename: 'MonComposant.tsx',
            language: 'tsx',
            code: `interface MonComposantProps {
  titre: string;
  actif?: boolean;
}

function MonComposant({ titre, actif }: MonComposantProps) {
  return <div>{titre}</div>;
}`,
          },
        ],
        replacements: [
          { token: 'MonComposant', description: 'le nom du composant' },
          { token: 'titre / actif', description: 'les props' },
        ],
        placement: 'La forme la plus courante.',
      },
      {
        id: 'type',
        label: 'type',
        codeBlocks: [
          {
            id: 'ts-props-t-type',
            filename: 'MonComposant.tsx',
            language: 'tsx',
            code: `type MonComposantProps = {
  titre: string;
  actif?: boolean;
};

function MonComposant({ titre, actif }: MonComposantProps) {
  return <div>{titre}</div>;
}`,
          },
        ],
        replacements: [{ token: 'titre / actif', description: 'les props' }],
        placement: '<code>type</code> fait la même chose qu’<code>interface</code> ici. Choix d’équipe.',
      },
      {
        id: 'fonction',
        label: 'Fonction en prop',
        codeBlocks: [
          {
            id: 'ts-props-t-fn',
            filename: 'Bouton.tsx',
            language: 'tsx',
            code: `interface BoutonProps {
  label: string;
  onClick: () => void; // fonction sans retour
}

function Bouton({ label, onClick }: BoutonProps) {
  return <button onClick={onClick}>{label}</button>;
}`,
          },
        ],
        replacements: [
          { token: 'onClick: () => void', description: 'le type d’une fonction passée en prop' },
        ],
        placement: 'Quand le parent passe une fonction (callback).',
      },
      {
        id: 'children',
        label: 'Avec children',
        codeBlocks: [
          {
            id: 'ts-props-t-children',
            filename: 'Boite.tsx',
            language: 'tsx',
            code: `import { ReactNode } from "react";

interface BoiteProps {
  children: ReactNode; // le contenu entre les balises
}

function Boite({ children }: BoiteProps) {
  return <div className="boite">{children}</div>;
}`,
          },
        ],
        replacements: [
          { token: 'children: ReactNode', description: 'le contenu placé entre <Boite>…</Boite>' },
        ],
        placement: 'Pour un composant conteneur (wrapper).',
      },
    ],
  }),
];
