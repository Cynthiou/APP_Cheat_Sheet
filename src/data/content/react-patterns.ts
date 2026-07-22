import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const reactPatternsContent: ReadyContent[] = [
  // ————— Le Context API —————
  lesson({
    id: 'REACT-F-2100-LESSON',
    slug: 'le-context-api',
    title: 'Le Context API',
    shortTitle: 'Context',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Partager une donnée (thème, utilisateur connecté, panier) avec tout un arbre de composants sans la passer de prop en prop.',
    utility:
      'Rendre une valeur accessible partout dans l’app sans la faire descendre manuellement à chaque niveau.',
    aliases: ['context', 'context api', 'usecontext', 'provider', 'createcontext', 'prop drilling'],
    keywords: [
      'partager une donnee globale',
      'eviter le prop drilling',
      'utilisateur connecte',
      'theme sombre',
      'provider',
      'consommer un context',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-2100-TEMPLATE',
    intro:
      'Le <b>Context</b> permet de partager une valeur avec <b>tous les composants d’un arbre</b>, sans la passer en prop à chaque étage. On crée un contexte avec <code>createContext</code>, on l’expose avec un <b>Provider</b>, et on le lit avec <code>useContext</code>.',
    sections: [
      {
        id: 's1',
        title: 'Le problème : le prop drilling',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher le nom de l’utilisateur connecté</b> dans un composant profond, mais je ne veux pas passer la prop <code>user</code> à travers cinq composants qui ne s’en servent même pas.',
          },
          {
            type: 'paragraph',
            html: 'Faire descendre une donnée de parent en enfant sur plusieurs niveaux s’appelle le <b>prop drilling</b>. C’est lourd et fragile. Le Context court-circuite tout ça : la donnée est disponible <b>directement</b> là où on en a besoin.',
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le prop drilling, c’est faire passer un plat de main en main jusqu’au bout de la table. Le Context, c’est un <b>buffet central</b> : chacun se sert directement, sans faire circuler le plat.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Créer et fournir un contexte',
        blocks: [
          {
            type: 'paragraph',
            html: 'On crée le contexte avec <code>createContext</code> (en lui donnant une valeur par défaut), puis on enveloppe l’arbre avec le <b>Provider</b>. La prop <code>value</code> du Provider est la donnée partagée.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2100-l-c1',
              filename: 'ThemeContext.tsx',
              language: 'tsx',
              code: `import { createContext } from "react";

// 1. Je cree le contexte avec une valeur par defaut
export const ThemeContext = createContext("clair");

// 2. J'enveloppe l'arbre avec le Provider
function App() {
  return (
    <ThemeContext.Provider value="sombre">
      {/* Tous les enfants ont acces a "sombre" */}
      <Page />
    </ThemeContext.Provider>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> on nomme le contexte avec un suffixe <code>Context</code> (<code>ThemeContext</code>, <code>UserContext</code>) et on l’<b>exporte</b> pour pouvoir le consommer ailleurs.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Consommer le contexte avec useContext',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dans n’importe quel composant enfant, on lit la valeur avec le hook <code>useContext</code>. Pas besoin de props : on récupère directement ce que le Provider a fourni.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2100-l-c2',
              filename: 'Bouton.tsx',
              language: 'tsx',
              code: `import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Bouton() {
  // Je lis la valeur fournie par le Provider le plus proche
  const theme = useContext(ThemeContext);

  // theme vaut "sombre" ici
  return <button className={theme}>Valider</button>;
}`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Rôle'],
            rows: [
              ['<code>createContext(defaut)</code>', 'crée le contexte'],
              ['<code>&lt;Context.Provider value={…}&gt;</code>', 'fournit la valeur à l’arbre'],
              ['<code>useContext(Context)</code>', 'lit la valeur dans un enfant'],
            ],
          },
        ],
      },
      {
        id: 's4',
        title: 'Un contexte avec un state (le cas courant)',
        blocks: [
          {
            type: 'paragraph',
            html: 'En vrai, on partage souvent une valeur <b>modifiable</b>. On crée alors un composant Provider qui gère un <code>useState</code> et expose <b>la valeur ET son setter</b> dans un objet.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2100-l-c3',
              filename: 'UserProvider.tsx',
              language: 'tsx',
              code: `import { createContext, useState } from "react";

export const UserContext = createContext(null);

// Un Provider maison qui gere le state
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Je partage la valeur ET la fonction pour la changer
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le Provider maison, c’est le <b>gérant du buffet</b> : il tient le stock (<code>user</code>) et la louche (<code>setUser</code>), et laisse tout le monde y accéder.',
          },
        ],
      },
    ],
    pitfalls: [
      'Consommer un contexte <b>hors</b> de son Provider : on récupère la valeur par défaut de <code>createContext</code>, souvent <code>null</code>, et l’app plante à l’usage.',
      'Mettre <b>toute</b> l’app dans un seul Context géant : chaque changement re-rend tout. Sépare les contextes par thème (user, thème, panier…).',
      'Oublier d’envelopper l’arbre avec le <code>Provider</code> : le <code>useContext</code> renvoie alors toujours la valeur par défaut.',
      'Utiliser un Context pour une donnée qui ne concerne que 2 composants voisins : de simples props suffisent.',
    ],
    takeaways: [
      '<b>Context</b> = partager une valeur avec tout un arbre, sans prop drilling',
      '3 temps : <code>createContext</code> → <code>&lt;Provider value={…}&gt;</code> → <code>useContext</code>',
      'pour une valeur modifiable, expose <code>{ valeur, setValeur }</code> dans <code>value</code>',
      'consommer hors du Provider = valeur par défaut (souvent un bug)',
      'un Context par thème (user, thème…), pas un seul fourre-tout',
    ],
  }),
  template({
    id: 'REACT-F-2100-TEMPLATE',
    slug: 'le-context-api',
    title: 'Context API',
    shortTitle: 'Context',
    technology: 'react',
    tomeId: 't10',
    summary: 'Le code du Context prêt à copier : créer, fournir, consommer, ou un Provider avec state.',
    lede: 'Partager une donnée sans prop drilling. Choisis l’étape :',
    aliases: ['context', 'usecontext', 'provider', 'createcontext'],
    keywords: ['partager', 'global', 'provider', 'consommer'],
    relatedContentIds: [],
    lessonId: 'REACT-F-2100-LESSON',
    variants: [
      {
        id: 'creer',
        label: 'Créer + fournir',
        codeBlocks: [
          {
            id: 'REACT-F-2100-t-creer',
            filename: 'MonContext.tsx',
            language: 'tsx',
            code: `import { createContext } from "react";

export const MonContext = createContext(null);

function App() {
  return (
    <MonContext.Provider value={maValeur}>
      <Page />
    </MonContext.Provider>
  );
}`,
          },
        ],
        replacements: [
          { token: 'MonContext', description: 'le nom de ton contexte (suffixe Context)' },
          { token: 'null', description: 'la valeur par défaut si aucun Provider' },
          { token: 'maValeur', description: 'la donnée à partager avec l’arbre' },
        ],
        placement:
          'Crée le contexte dans son propre fichier, puis enveloppe la partie de l’arbre qui doit y accéder.',
      },
      {
        id: 'consommer',
        label: 'Consommer',
        codeBlocks: [
          {
            id: 'REACT-F-2100-t-conso',
            filename: 'Enfant.tsx',
            language: 'tsx',
            code: `import { useContext } from "react";
import { MonContext } from "./MonContext";

function Enfant() {
  const valeur = useContext(MonContext);

  return <p>{valeur}</p>;
}`,
          },
        ],
        replacements: [
          { token: 'MonContext', description: 'le contexte à lire (le même que dans le Provider)' },
          { token: 'valeur', description: 'le nom de la donnée récupérée' },
        ],
        placement:
          'Dans n’importe quel composant sous le Provider. Aucune prop à passer : useContext lit directement.',
      },
      {
        id: 'provider-state',
        label: 'Provider + state',
        description: 'Le cas courant : une valeur modifiable partagée.',
        codeBlocks: [
          {
            id: 'REACT-F-2100-t-provstate',
            filename: 'MonProvider.tsx',
            language: 'tsx',
            code: `import { createContext, useState } from "react";

export const MonContext = createContext(null);

export function MonProvider({ children }) {
  const [valeur, setValeur] = useState(valeurInitiale);

  return (
    <MonContext.Provider value={{ valeur, setValeur }}>
      {children}
    </MonContext.Provider>
  );
}`,
          },
        ],
        replacements: [
          { token: 'valeur / setValeur', description: 'la donnée partagée et son setter' },
          { token: 'valeurInitiale', description: 'la valeur de départ du state' },
        ],
        placement:
          'Quand la donnée doit changer (user, thème, panier). Les enfants lisent { valeur, setValeur } via useContext.',
      },
    ],
  }),

  // ————— Remonter l’état : lifting state up —————
  lesson({
    id: 'REACT-F-2101-LESSON',
    slug: 'remonter-l-etat-lifting-state-up',
    title: 'Remonter l’état : lifting state up',
    shortTitle: 'Lifting state',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Faire vivre un state dans le parent commun pour que deux composants frères partagent et synchronisent la même donnée.',
    utility:
      'Synchroniser deux composants qui doivent partager la même donnée : on remonte le state dans leur parent.',
    aliases: ['lifting state up', 'remonter etat', 'state partage', 'source unique', 'parent commun'],
    keywords: [
      'partager un state entre freres',
      'synchroniser deux composants',
      'remonter le state',
      'source unique de verite',
      'parent commun',
      'donnee partagee',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-2101-TEMPLATE',
    intro:
      'Quand <b>deux composants frères</b> doivent partager la même donnée, on ne duplique pas le state : on le <b>remonte</b> dans leur <b>parent commun</b>. Le parent devient la <b>source unique de vérité</b> et distribue la valeur et son setter par les props.',
    sections: [
      {
        id: 's1',
        title: 'Le problème : deux frères désynchronisés',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux qu’un <b>champ de recherche mette à jour une liste affichée juste à côté</b>. Les deux sont des composants frères : comment le champ parle-t-il à la liste ?',
          },
          {
            type: 'paragraph',
            html: 'Deux composants frères ne peuvent <b>pas se parler directement</b>. Si chacun garde son propre state, ils se désynchronisent. La solution : déplacer le state dans leur <b>parent commun</b>, qui le passe aux deux.',
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> deux enfants qui veulent la même info demandent au <b>parent</b>, pas l’un à l’autre. Le parent détient la vérité et la répète à chacun.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Étape 1 : le state descend',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le parent déclare le <code>useState</code> et <b>descend la valeur</b> à l’enfant qui l’affiche. Cet enfant devient « bête » : il ne fait qu’afficher ce qu’on lui donne.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2101-l-c1',
              filename: 'Parent.tsx',
              language: 'tsx',
              code: `import { useState } from "react";

function Parent() {
  // Le state vit ICI, dans le parent commun
  const [recherche, setRecherche] = useState("");

  return (
    <div>
      {/* Je descends la valeur a l'enfant qui affiche */}
      <Liste filtre={recherche} />
    </div>
  );
}`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'Étape 2 : le setter descend aussi',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour que l’autre enfant puisse <b>modifier</b> la donnée, le parent lui passe le <b>setter</b> (ou une fonction qui l’appelle). L’enfant remonte l’info en appelant cette fonction.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2101-l-c2',
              filename: 'Parent.tsx',
              language: 'tsx',
              code: `function Parent() {
  const [recherche, setRecherche] = useState("");

  return (
    <div>
      {/* L'enfant de saisie recoit le setter */}
      <Champ valeur={recherche} onChange={setRecherche} />

      {/* L'enfant d'affichage recoit la valeur */}
      <Liste filtre={recherche} />
    </div>
  );
}

// L'enfant appelle onChange -> le parent met a jour -> tout se resynchronise
function Champ({ valeur, onChange }) {
  return (
    <input
      value={valeur}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> la prop qui descend la valeur est un <b>nom</b> (<code>valeur</code>, <code>filtre</code>), celle qui remonte le changement commence par <code>on</code> (<code>onChange</code>).',
          },
        ],
      },
      {
        id: 's4',
        title: 'Le principe : source unique de vérité',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une donnée ne doit exister qu’à <b>un seul endroit</b>. On la place dans le <b>plus proche parent commun</b> des composants qui en ont besoin. Ce parent la distribue ; les enfants la lisent et demandent des changements.',
          },
          {
            type: 'table',
            headers: ['Qui', 'Rôle'],
            rows: [
              ['Parent commun', 'détient le state (source unique)'],
              ['Enfant qui affiche', 'reçoit la <b>valeur</b> en prop'],
              ['Enfant qui modifie', 'reçoit une fonction <code>on…</code> et l’appelle'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Dupliquer le state dans chaque frère : ils se désynchronisent aussitôt. Une seule source, dans le parent.',
      'Remonter le state <b>trop haut</b> (dans <code>App</code> alors que le parent direct suffit) : ça complique tout inutilement.',
      'Vouloir faire communiquer deux frères <b>directement</b> : impossible en React, ça passe forcément par le parent.',
      'Passer le setter mais oublier de câbler <code>value</code> sur l’input : le champ devient non contrôlé et « saute ».',
    ],
    takeaways: [
      '<b>lifting state up</b> = remonter le state dans le parent commun',
      'le parent est la <b>source unique de vérité</b> ; les frères ne se parlent jamais directement',
      'la <b>valeur</b> descend en prop · le <b>changement</b> remonte via une fonction <code>on…</code>',
      'place le state dans le <b>plus proche</b> parent commun, pas plus haut que nécessaire',
    ],
  }),
  template({
    id: 'REACT-F-2101-TEMPLATE',
    slug: 'remonter-l-etat-lifting-state-up',
    title: 'Lifting state up',
    shortTitle: 'Lifting state',
    technology: 'react',
    tomeId: 't10',
    summary: 'Le schéma pour partager un state entre frères : state dans le parent, valeur + setter en props.',
    lede: 'Synchroniser deux composants. Choisis le rôle :',
    aliases: ['lifting state', 'remonter etat', 'state partage'],
    keywords: ['parent commun', 'synchroniser', 'source unique'],
    relatedContentIds: [],
    lessonId: 'REACT-F-2101-LESSON',
    variants: [
      {
        id: 'parent',
        label: 'Le parent (source)',
        codeBlocks: [
          {
            id: 'REACT-F-2101-t-parent',
            filename: 'Parent.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

function Parent() {
  const [valeur, setValeur] = useState(valeurInitiale);

  return (
    <>
      <ChampEnfant valeur={valeur} onChange={setValeur} />
      <AffichageEnfant valeur={valeur} />
    </>
  );
}`,
          },
        ],
        replacements: [
          { token: 'valeur / setValeur', description: 'la donnée partagée et son setter' },
          { token: 'valeurInitiale', description: 'la valeur de départ' },
        ],
        placement:
          'Le parent commun des deux composants. Il déclare le state et le distribue en props.',
      },
      {
        id: 'enfant-modifie',
        label: 'Enfant qui modifie',
        codeBlocks: [
          {
            id: 'REACT-F-2101-t-modif',
            filename: 'ChampEnfant.tsx',
            language: 'tsx',
            code: `function ChampEnfant({ valeur, onChange }) {
  return (
    <input
      value={valeur}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}`,
          },
        ],
        replacements: [
          { token: 'valeur', description: 'la valeur reçue du parent (lecture)' },
          { token: 'onChange', description: 'la fonction du parent pour remonter le changement' },
        ],
        placement:
          'L’enfant contrôlé : il lit valeur et appelle onChange à chaque saisie. Aucun state local.',
      },
      {
        id: 'enfant-affiche',
        label: 'Enfant qui affiche',
        codeBlocks: [
          {
            id: 'REACT-F-2101-t-affiche',
            filename: 'AffichageEnfant.tsx',
            language: 'tsx',
            code: `function AffichageEnfant({ valeur }) {
  return <p>Valeur actuelle : {valeur}</p>;
}`,
          },
        ],
        replacements: [
          { token: 'valeur', description: 'la donnée reçue du parent, en lecture seule' },
        ],
        placement:
          'L’enfant « bête » : il ne fait qu’afficher la valeur. Il reste synchronisé automatiquement.',
      },
    ],
  }),

  // ————— Créer un composant réutilisable —————
  lesson({
    id: 'REACT-F-2102-LESSON',
    slug: 'creer-un-composant-reutilisable',
    title: 'Créer un composant réutilisable',
    shortTitle: 'Composant réutilisable',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Extraire une brique d’UI (bouton, carte) paramétrable par props, avec des valeurs par défaut et le contenu passé via children.',
    utility:
      'Écrire une fois une brique d’UI et la réutiliser partout en la paramétrant par les props.',
    aliases: ['composant reutilisable', 'props', 'children', 'valeur par defaut', 'brique ui', 'bouton reutilisable'],
    keywords: [
      'creer un bouton reutilisable',
      'passer des props',
      'valeur par defaut',
      'children',
      'composant parametrable',
      'factoriser un composant',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-2102-TEMPLATE',
    intro:
      'Un composant réutilisable est une <b>brique d’UI paramétrable</b> : on l’écrit une fois, puis on l’adapte à chaque usage via ses <b>props</b>. Le contenu à l’intérieur des balises arrive par la prop spéciale <code>children</code>.',
    sections: [
      {
        id: 's1',
        title: 'Un bouton paramétrable',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>un seul composant Bouton</b> que je peux réutiliser partout, en changeant juste sa couleur et son texte, plutôt que de copier-coller le même JSX dix fois.',
          },
          {
            type: 'paragraph',
            html: 'On déclare les <b>props</b> dont le composant a besoin, on les déstructure dans les paramètres, et on les branche dans le JSX. Chaque appel fournit ses propres valeurs.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2102-l-c1',
              filename: 'Bouton.tsx',
              language: 'tsx',
              code: `// Je declare les props que j'accepte
function Bouton({ couleur, children }) {
  return (
    <button style={{ background: couleur }}>
      {children} {/* le contenu passe entre les balises */}
    </button>
  );
}

// Je le reutilise avec des valeurs differentes
<Bouton couleur="blue">Valider</Bouton>
<Bouton couleur="red">Supprimer</Bouton>`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le composant, c’est un <b>moule à gâteau</b>. Les props sont les ingrédients : même moule, gâteaux différents selon ce qu’on verse dedans.',
          },
        ],
      },
      {
        id: 's2',
        title: 'children : le contenu passé entre les balises',
        blocks: [
          {
            type: 'paragraph',
            html: 'La prop <code>children</code> est <b>spéciale</b> : elle contient tout ce que tu écris <b>entre</b> la balise ouvrante et fermante du composant. Idéale pour les conteneurs (carte, modale, encadré).',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2102-l-c2',
              filename: 'Carte.tsx',
              language: 'tsx',
              code: `function Carte({ titre, children }) {
  return (
    <div className="carte">
      <h2>{titre}</h2>
      <div>{children}</div> {/* contenu libre */}
    </div>
  );
}

// Ce qui est entre les balises devient children
<Carte titre="Profil">
  <p>Bonjour Alice</p>
  <button>Modifier</button>
</Carte>`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> une prop = une <b>donnée</b> (texte, couleur, booléen) ; <code>children</code> = du <b>JSX</b> (le contenu à envelopper).',
          },
        ],
      },
      {
        id: 's3',
        title: 'Valeurs par défaut',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour qu’une prop soit <b>optionnelle</b>, on lui donne une <b>valeur par défaut</b> directement dans la déstructuration. Si l’appelant ne la fournit pas, c’est le défaut qui s’applique.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2102-l-c3',
              filename: 'Bouton.tsx',
              language: 'tsx',
              code: `// couleur vaut "gris" si on ne la precise pas
function Bouton({ couleur = "gris", taille = "moyen", children }) {
  return (
    <button className={taille} style={{ background: couleur }}>
      {children}
    </button>
  );
}

<Bouton>Par defaut</Bouton>            {/* gris, moyen */}
<Bouton couleur="blue">Bleu</Bouton>   {/* bleu, moyen */}`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Rôle'],
            rows: [
              ['<code>{ prop }</code>', 'récupère une prop'],
              ['<code>{ prop = defaut }</code>', 'prop optionnelle avec valeur par défaut'],
              ['<code>{ children }</code>', 'le contenu entre les balises'],
            ],
          },
        ],
      },
      {
        id: 's4',
        title: 'Typer les props (TypeScript)',
        blocks: [
          {
            type: 'paragraph',
            html: 'En TypeScript, on décrit la <b>forme des props</b> avec un <code>type</code>. On gagne l’autocomplétion et une erreur immédiate si on oublie une prop obligatoire. Le <code>?</code> marque une prop optionnelle.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2102-l-c4',
              filename: 'Bouton.tsx',
              language: 'tsx',
              code: `import { ReactNode } from "react";

type BoutonProps = {
  couleur?: string;      // optionnelle (le ?)
  children: ReactNode;   // obligatoire : du JSX
};

function Bouton({ couleur = "gris", children }: BoutonProps) {
  return <button style={{ background: couleur }}>{children}</button>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> le type des props se nomme <code>NomDuComposant</code> + <code>Props</code> (<code>BoutonProps</code>). Le type de <code>children</code> est <code>ReactNode</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier de déstructurer les props : sans <code>{ couleur }</code>, il faut écrire <code>props.couleur</code> partout.',
      'Rendre <code>children</code> obligatoire alors que le composant peut être vide, ou l’inverse : réfléchis à l’usage.',
      'Nommer un composant en minuscule (<code>bouton</code>) : React le prend pour une balise HTML. Toujours une <b>majuscule</b>.',
      'Multiplier les props (<code>couleur</code>, <code>couleurTexte</code>, <code>couleurBord</code>…) : au-delà de 5-6, repense le découpage.',
    ],
    takeaways: [
      'un composant réutilisable = une brique <b>paramétrée par ses props</b>',
      '<code>children</code> = le contenu écrit entre les balises (du JSX)',
      'prop optionnelle : valeur par défaut dans la déstructuration <code>{ x = defaut }</code>',
      'nom du composant <b>toujours en majuscule</b> (<code>Bouton</code>, pas <code>bouton</code>)',
      'en TS : un type <code>NomProps</code> · <code>children: ReactNode</code>',
    ],
  }),
  template({
    id: 'REACT-F-2102-TEMPLATE',
    slug: 'creer-un-composant-reutilisable',
    title: 'Composant réutilisable',
    shortTitle: 'Composant réutilisable',
    technology: 'react',
    tomeId: 't10',
    summary: 'Le squelette d’un composant paramétrable : props simples, children, valeurs par défaut, version TS.',
    lede: 'Créer une brique d’UI réutilisable. Choisis la variante :',
    aliases: ['composant reutilisable', 'props', 'children', 'valeur par defaut'],
    keywords: ['bouton', 'carte', 'parametrable'],
    relatedContentIds: [],
    lessonId: 'REACT-F-2102-LESSON',
    variants: [
      {
        id: 'props',
        label: 'Avec props',
        codeBlocks: [
          {
            id: 'REACT-F-2102-t-props',
            filename: 'MonComposant.tsx',
            language: 'tsx',
            code: `function MonComposant({ titre, couleur }) {
  return <div style={{ color: couleur }}>{titre}</div>;
}

<MonComposant titre="Bonjour" couleur="blue" />`,
          },
        ],
        replacements: [
          { token: 'MonComposant', description: 'le nom du composant (toujours en majuscule)' },
          { token: 'titre, couleur', description: 'les props que le composant accepte' },
        ],
        placement: 'Le cas de base : des données passées en props, branchées dans le JSX.',
      },
      {
        id: 'children',
        label: 'Avec children',
        codeBlocks: [
          {
            id: 'REACT-F-2102-t-children',
            filename: 'Conteneur.tsx',
            language: 'tsx',
            code: `function Conteneur({ children }) {
  return <div className="boite">{children}</div>;
}

<Conteneur>
  <p>N'importe quel contenu ici</p>
</Conteneur>`,
          },
        ],
        replacements: [
          { token: 'Conteneur', description: 'le nom de ton composant enveloppe' },
          { token: 'boite', description: 'la classe CSS du conteneur' },
        ],
        placement:
          'Pour un composant qui enveloppe du contenu libre (carte, modale, encadré) via children.',
      },
      {
        id: 'defaut',
        label: 'Valeurs par défaut',
        codeBlocks: [
          {
            id: 'REACT-F-2102-t-defaut',
            filename: 'Bouton.tsx',
            language: 'tsx',
            code: `function Bouton({ couleur = "gris", children }) {
  return (
    <button style={{ background: couleur }}>
      {children}
    </button>
  );
}`,
          },
        ],
        replacements: [
          { token: 'couleur = "gris"', description: 'la prop optionnelle et sa valeur par défaut' },
        ],
        placement:
          'Quand une prop peut être omise : le défaut s’applique si l’appelant ne la fournit pas.',
      },
      {
        id: 'typescript',
        label: 'Typé (TS)',
        codeBlocks: [
          {
            id: 'REACT-F-2102-t-ts',
            filename: 'Bouton.tsx',
            language: 'tsx',
            code: `import { ReactNode } from "react";

type BoutonProps = {
  couleur?: string;
  children: ReactNode;
};

function Bouton({ couleur = "gris", children }: BoutonProps) {
  return <button style={{ background: couleur }}>{children}</button>;
}`,
          },
        ],
        replacements: [
          { token: 'BoutonProps', description: 'le type des props (NomComposant + Props)' },
          { token: 'couleur?: string', description: 'chaque prop et son type (? = optionnelle)' },
        ],
        placement:
          'La version TypeScript : un type décrit les props, children est de type ReactNode.',
      },
    ],
  }),

  // ————— Passer une fonction en prop —————
  lesson({
    id: 'REACT-F-2103-LESSON',
    slug: 'passer-une-fonction-en-prop',
    title: 'Passer une fonction en prop',
    shortTitle: 'Fonction en prop',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Permettre à un enfant de prévenir son parent d’un événement (clic, suppression) en lui passant une fonction de rappel.',
    utility:
      'Faire remonter une action de l’enfant vers le parent : l’enfant appelle la fonction, le parent réagit.',
    aliases: ['fonction en prop', 'callback', 'onclick prop', 'communication enfant parent', 'handler prop'],
    keywords: [
      'enfant previent le parent',
      'callback',
      'remonter une action',
      'onclick en prop',
      'passer une fonction',
      'transmettre une donnee au parent',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-2103-TEMPLATE',
    intro:
      'Les props descendent du parent vers l’enfant. Pour faire l’inverse — que l’<b>enfant prévienne le parent</b> — on passe une <b>fonction en prop</b> (un <i>callback</i>). L’enfant l’appelle au bon moment ; le parent, qui l’a écrite, réagit.',
    sections: [
      {
        id: 's1',
        title: 'L’enfant prévient le parent',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux qu’un <b>bouton Supprimer dans une carte enfant déclenche une action définie dans le parent</b> (retirer l’élément de la liste). Comment l’enfant déclenche-t-il du code du parent ?',
          },
          {
            type: 'paragraph',
            html: 'Le parent <b>écrit</b> la fonction et la <b>passe en prop</b>. L’enfant reçoit cette fonction et l’<b>appelle</b> quand l’événement arrive. La logique reste dans le parent.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2103-l-c1',
              filename: 'Parent.tsx',
              language: 'tsx',
              code: `function Parent() {
  // Le parent DEFINIT ce qui doit se passer
  const handleSupprimer = () => {
    console.log("Element supprime !");
  };

  // Il PASSE la fonction en prop a l'enfant
  return <Carte onSupprimer={handleSupprimer} />;
}

function Carte({ onSupprimer }) {
  // L'enfant APPELLE la fonction au clic
  return <button onClick={onSupprimer}>Supprimer</button>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> la prop qui reçoit une fonction commence par <code>on</code> (<code>onSupprimer</code>, <code>onClick</code>), et la fonction du parent par <code>handle</code> (<code>handleSupprimer</code>).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Passer une donnée au parent',
        blocks: [
          {
            type: 'paragraph',
            html: 'Souvent, l’enfant doit dire <b>quoi</b> supprimer. Il passe alors une <b>valeur en argument</b> quand il appelle la fonction. Le parent la récupère comme paramètre.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2103-l-c2',
              filename: 'Parent.tsx',
              language: 'tsx',
              code: `function Parent() {
  // Le parent recoit l'id en parametre
  const handleSupprimer = (id) => {
    console.log("Supprimer l'element", id);
  };

  return <Carte id={42} onSupprimer={handleSupprimer} />;
}

function Carte({ id, onSupprimer }) {
  // On enveloppe dans une fleche pour PASSER l'id
  return (
    <button onClick={() => onSupprimer(id)}>
      Supprimer
    </button>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le parent tend une <b>télécommande</b> (la fonction) à l’enfant. L’enfant appuie sur le bouton quand il veut, et peut préciser sur quoi (<code>id</code>). C’est toujours le parent qui a programmé la télécommande.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Passer, ne pas appeler',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le piège classique : <b>appeler</b> la fonction au lieu de la <b>passer</b>. Sans argument, on passe la référence directement. Avec un argument, on enveloppe dans une <b>flèche</b> pour ne pas l’exécuter au rendu.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2103-l-c3',
              filename: 'Carte.tsx',
              language: 'tsx',
              code: `// Sans argument : on passe la reference
<button onClick={onSupprimer}>OK</button>       // correct
<button onClick={onSupprimer()}>OK</button>     // FAUX : appelee au rendu

// Avec argument : on enveloppe dans une fleche
<button onClick={() => onSupprimer(id)}>OK</button>   // correct
<button onClick={onSupprimer(id)}>OK</button>         // FAUX : appelee au rendu`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Ce qui se passe'],
            rows: [
              ['<code>onClick={fn}</code>', 'passe la fonction (correct, sans argument)'],
              ['<code>onClick={() => fn(x)}</code>', 'passe la fonction avec un argument (correct)'],
              ['<code>onClick={fn()}</code>', 'appelle la fonction <b>au rendu</b> (bug)'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      '<code>onClick={onSupprimer()}</code> appelle la fonction <b>au rendu</b>, pas au clic. Passe la référence : <code>onClick={onSupprimer}</code>.',
      'Vouloir passer un argument sans flèche (<code>onClick={fn(id)}</code>) : ça l’exécute tout de suite. Enveloppe : <code>onClick={() => fn(id)}</code>.',
      'Définir la logique dans l’enfant alors qu’elle concerne le parent : garde la décision côté parent, l’enfant ne fait que signaler.',
      'Nommer la prop sans préfixe <code>on</code> : on perd la convention qui rend le sens évident.',
    ],
    takeaways: [
      'pour que l’<b>enfant prévienne le parent</b> → passe une fonction en prop',
      'le parent <b>écrit</b> la fonction, l’enfant l’<b>appelle</b>',
      'passer une donnée au parent : <code>onClick={() => onXxx(valeur)}</code>',
      'sans argument : <code>onClick={fn}</code> (réf.) · jamais <code>onClick={fn()}</code>',
      'convention : prop en <code>on…</code>, fonction du parent en <code>handle…</code>',
    ],
  }),
  template({
    id: 'REACT-F-2103-TEMPLATE',
    slug: 'passer-une-fonction-en-prop',
    title: 'Fonction en prop',
    shortTitle: 'Fonction en prop',
    technology: 'react',
    tomeId: 't10',
    summary: 'Le schéma enfant → parent : fonction simple, fonction avec argument, ou fonction typée (TS).',
    lede: 'Faire remonter une action au parent. Choisis le cas :',
    aliases: ['callback', 'fonction en prop', 'onclick prop'],
    keywords: ['enfant parent', 'remonter action', 'handler'],
    relatedContentIds: [],
    lessonId: 'REACT-F-2103-LESSON',
    variants: [
      {
        id: 'simple',
        label: 'Sans argument',
        codeBlocks: [
          {
            id: 'REACT-F-2103-t-simple',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `function Parent() {
  const handleAction = () => {
    // ce que fait le parent
  };
  return <Enfant onAction={handleAction} />;
}

function Enfant({ onAction }) {
  return <button onClick={onAction}>Agir</button>;
}`,
          },
        ],
        replacements: [
          { token: 'handleAction', description: 'la fonction du parent (préfixe handle)' },
          { token: 'onAction', description: 'la prop qui transporte la fonction (préfixe on)' },
        ],
        placement:
          'Le cas simple : l’enfant signale un événement sans donnée à transmettre. On passe la référence.',
      },
      {
        id: 'argument',
        label: 'Avec argument',
        codeBlocks: [
          {
            id: 'REACT-F-2103-t-arg',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `function Parent() {
  const handleSupprimer = (id) => {
    // le parent sait quoi supprimer
  };
  return <Enfant id={42} onSupprimer={handleSupprimer} />;
}

function Enfant({ id, onSupprimer }) {
  return (
    <button onClick={() => onSupprimer(id)}>
      Supprimer
    </button>
  );
}`,
          },
        ],
        replacements: [
          { token: 'id', description: 'la donnée que l’enfant transmet au parent' },
          { token: 'onSupprimer', description: 'la prop fonction appelée avec l’argument' },
        ],
        placement:
          'Quand l’enfant doit dire quoi traiter : on enveloppe dans une flèche pour passer l’argument.',
      },
      {
        id: 'typescript',
        label: 'Typé (TS)',
        codeBlocks: [
          {
            id: 'REACT-F-2103-t-ts',
            filename: 'Enfant.tsx',
            language: 'tsx',
            code: `type EnfantProps = {
  onSupprimer: (id: number) => void;
};

function Enfant({ onSupprimer }: EnfantProps) {
  return (
    <button onClick={() => onSupprimer(42)}>
      Supprimer
    </button>
  );
}`,
          },
        ],
        replacements: [
          { token: 'onSupprimer', description: 'le nom de la prop fonction' },
          { token: '(id: number) => void', description: 'la signature : arguments attendus et retour' },
        ],
        placement:
          'La version TypeScript : on type la fonction avec ses arguments et son retour (void = ne renvoie rien).',
      },
    ],
  }),

  // ————— Les listes filtrées et triées —————
  lesson({
    id: 'REACT-F-2104-LESSON',
    slug: 'les-listes-filtrees-et-triees',
    title: 'Les listes filtrées et triées',
    shortTitle: 'Listes filtrées',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Afficher une liste que l’utilisateur peut filtrer et trier, en dérivant l’affichage depuis la donnée source avec filter, sort et map.',
    utility:
      'Filtrer et trier une liste à l’affichage, sans jamais modifier la donnée source.',
    aliases: ['liste filtree', 'filter', 'sort', 'map', 'recherche liste', 'trier une liste'],
    keywords: [
      'filtrer une liste',
      'trier une liste',
      'barre de recherche',
      'afficher un tableau',
      'filter sort map',
      'donnee derivee',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-2104-TEMPLATE',
    intro:
      'Une liste filtrée/triée se construit en <b>dérivant</b> l’affichage depuis la <b>donnée source</b>. On garde la liste complète dans un state, un critère (recherche, tri) dans un autre, et on calcule la liste visible avec <code>filter</code>, <code>sort</code> puis <code>map</code> — <b>sans</b> toucher à la source.',
    sections: [
      {
        id: 's1',
        title: 'Filtrer selon une recherche',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>une barre de recherche qui filtre ma liste de produits en temps réel</b> : je tape « pom », il ne reste que « pomme ».',
          },
          {
            type: 'paragraph',
            html: 'Deux states : la <b>liste complète</b> et le <b>texte recherché</b>. À chaque rendu, on calcule la liste visible avec <code>filter</code>. La source n’est jamais modifiée : on la <b>dérive</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2104-l-c1',
              filename: 'Liste.tsx',
              language: 'tsx',
              code: `import { useState } from "react";

function Liste() {
  const [produits] = useState(["Pomme", "Poire", "Banane"]);
  const [recherche, setRecherche] = useState("");

  // Je DERIVE la liste visible depuis la source
  const visibles = produits.filter((p) =>
    p.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <>
      <input
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />
      <ul>
        {visibles.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> on ne stocke <b>pas</b> la liste filtrée dans un state. On la <b>recalcule</b> à chaque rendu depuis la source. Deux sources de vérité pour la même donnée = bugs garantis.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Trier sans muter la source',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>sort()</code> <b>modifie le tableau d’origine</b> — interdit sur un state. On copie d’abord avec <code>[...liste]</code>, puis on trie la copie. Pour du texte, <code>localeCompare</code> gère les accents.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2104-l-c2',
              filename: 'Liste.tsx',
              language: 'tsx',
              code: `// FAUX : sort() mute le tableau du state
const trie = produits.sort();

// CORRECT : on copie AVANT de trier
const triAlpha = [...produits].sort((a, b) =>
  a.localeCompare(b)
);

// Trier des objets par une propriete (prix croissant)
const parPrix = [...articles].sort((a, b) => a.prix - b.prix);`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>sort()</code> range directement <b>ton</b> classeur (la source). <code>[...liste].sort()</code> range une <b>photocopie</b> : l’original reste intact, React voit bien un nouveau tableau.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Enchaîner filter, sort et map',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le pipeline complet se lit dans l’ordre : on <b>filtre</b>, puis on <b>trie la copie</b>, puis on <b>affiche</b> avec <code>map</code>. Chaque étape renvoie un nouveau tableau, la source reste intacte.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2104-l-c3',
              filename: 'Liste.tsx',
              language: 'tsx',
              code: `// 1. filtrer  ->  2. trier la copie  ->  3. afficher
const visibles = [...produits]
  .filter((p) => p.includes(recherche)) // 1. je garde les correspondances
  .sort((a, b) => a.localeCompare(b));  // 2. je trie la copie

return (
  <ul>
    {visibles.map((p) => (
      <li key={p}>{p}</li> // 3. une <li> par element, avec une key
    ))}
  </ul>
);`,
            },
          },
          {
            type: 'table',
            headers: ['Méthode', 'Renvoie', 'Rôle'],
            rows: [
              ['<code>filter</code>', 'un tableau', 'garde les éléments qui passent le test'],
              ['<code>sort</code>', 'le tableau trié', 'ordonne (muter → copier d’abord)'],
              ['<code>map</code>', 'un tableau de JSX', 'transforme chaque élément en <code>&lt;li&gt;</code>'],
            ],
          },
        ],
      },
      {
        id: 's4',
        title: 'La key : indispensable et stable',
        blocks: [
          {
            type: 'paragraph',
            html: 'Chaque élément d’une liste a besoin d’une <code>key</code> <b>unique et stable</b> pour que React suive les éléments. On utilise un <b>id</b> ; l’<b>index</b> est déconseillé dès que la liste peut être filtrée, triée ou réordonnée.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2104-l-c4',
              filename: 'Liste.tsx',
              language: 'tsx',
              code: `// BIEN : une key stable et unique (l'id de l'element)
{articles.map((a) => (
  <li key={a.id}>{a.nom}</li>
))}

// A EVITER si la liste bouge : l'index change au tri/filtre
{articles.map((a, index) => (
  <li key={index}>{a.nom}</li>
))}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> <code>key</code> = un identifiant <b>propre à la donnée</b> (<code>a.id</code>). Jamais l’index dès qu’on filtre ou trie, sinon React mélange les lignes.',
          },
        ],
      },
    ],
    pitfalls: [
      'Stocker la liste filtrée dans un <b>state séparé</b> : elle se désynchronise de la source. Dérive-la à chaque rendu.',
      '<code>sort()</code> directement sur le state : ça <b>mute</b> le tableau. Copie d’abord avec <code>[...liste]</code>.',
      'Utiliser l’<b>index</b> comme <code>key</code> sur une liste filtrée/triée : React réutilise mal les lignes (contenu qui saute).',
      'Oublier <code>key</code> dans un <code>map</code> : React affiche un avertissement et le rendu devient imprévisible.',
    ],
    takeaways: [
      'liste visible = <b>dérivée</b> de la source à chaque rendu (jamais un state à part)',
      'pipeline : <code>filter</code> → <code>sort</code> (sur une copie) → <code>map</code>',
      '<code>sort()</code> mute : copie d’abord avec <code>[...liste]</code>',
      'texte : <code>a.localeCompare(b)</code> · nombres : <code>a - b</code>',
      '<code>key</code> = un <b>id stable</b> · jamais l’index si la liste bouge',
    ],
  }),
  template({
    id: 'REACT-F-2104-TEMPLATE',
    slug: 'les-listes-filtrees-et-triees',
    title: 'Listes filtrées et triées',
    shortTitle: 'Listes filtrées',
    technology: 'react',
    tomeId: 't10',
    summary: 'Le code prêt à copier pour filtrer, trier ou combiner : filter, sort sans mutation, pipeline complet.',
    lede: 'Filtrer et trier une liste à l’affichage. Choisis le cas :',
    aliases: ['filter', 'sort', 'map', 'liste filtree', 'recherche'],
    keywords: ['filtrer', 'trier', 'barre de recherche'],
    relatedContentIds: [],
    lessonId: 'REACT-F-2104-LESSON',
    variants: [
      {
        id: 'filtrer',
        label: 'Filtrer',
        codeBlocks: [
          {
            id: 'REACT-F-2104-t-filter',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `const visibles = liste.filter((item) =>
  item.nom.toLowerCase().includes(recherche.toLowerCase())
);

{visibles.map((item) => (
  <li key={item.id}>{item.nom}</li>
))}`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'la liste source complète (un state)' },
          { token: 'recherche', description: 'le texte saisi (un autre state)' },
          { token: 'item.nom', description: 'la propriété sur laquelle filtrer' },
        ],
        placement:
          'Pour une barre de recherche : on dérive la liste visible depuis la source à chaque rendu.',
      },
      {
        id: 'trier',
        label: 'Trier (sans muter)',
        codeBlocks: [
          {
            id: 'REACT-F-2104-t-sort',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `// Texte : localeCompare gere les accents
const parNom = [...liste].sort((a, b) =>
  a.nom.localeCompare(b.nom)
);

// Nombre : difference des deux valeurs
const parPrix = [...liste].sort((a, b) => a.prix - b.prix);`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'la liste à trier (on copie avant avec ...)' },
          { token: 'a.nom / a.prix', description: 'la propriété qui sert de critère de tri' },
        ],
        placement:
          'Toujours copier avec [...liste] avant sort() : sinon on mute le state. localeCompare pour du texte, a - b pour des nombres.',
      },
      {
        id: 'pipeline',
        label: 'Filtrer + trier',
        codeBlocks: [
          {
            id: 'REACT-F-2104-t-pipeline',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `const visibles = [...liste]
  .filter((item) => item.nom.includes(recherche))
  .sort((a, b) => a.nom.localeCompare(b.nom));

{visibles.map((item) => (
  <li key={item.id}>{item.nom}</li>
))}`,
          },
        ],
        replacements: [
          { token: 'liste', description: 'la liste source' },
          { token: 'recherche', description: 'le critère de filtre' },
          { token: 'item.nom', description: 'la propriété filtrée puis triée' },
        ],
        placement:
          'Le pipeline complet : on copie, on filtre, on trie, puis on affiche avec map et une key stable.',
      },
    ],
  }),

  // ————— Événements : clic et tactile —————
  lesson({
    id: 'REACT-F-2105-LESSON',
    slug: 'evenements-clic-et-tactile',
    title: 'Le clic et le tactile',
    shortTitle: 'Clic & tactile',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Gérer les interactions au doigt comme à la souris : le tap déclenche déjà onClick, et les pointer events couvrent souris, doigt et stylet d’un coup.',
    utility:
      'Faire des composants qui marchent aussi bien à la souris qu’au doigt, sans double gestion.',
    aliases: ['tactile', 'touch', 'onclick', 'pointer events', 'ontouchstart', 'clic vs touche', 'mobile'],
    keywords: [
      'evenement tactile',
      'onclick',
      'onpointerdown',
      'ontouchstart',
      'pointer events',
      'souris et doigt',
      'tap',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-2105-TEMPLATE',
    intro:
      'Bonne nouvelle : sur mobile, un <b>tap déclenche déjà <code>onClick</code></b>. Pour la plupart des boutons, tu n’as <b>rien de spécial à faire</b>. Le tactile devient utile quand tu veux suivre le doigt (glisser, dessiner) : là, les <b>pointer events</b> gèrent <b>souris + doigt + stylet</b> avec le même code.',
    sections: [
      {
        id: 's1',
        title: 'Le tap déclenche déjà onClick',
        blocks: [
          {
            type: 'situation',
            html: 'Je me demande si mon <code>&lt;button onClick&gt;</code> va <b>marcher au doigt</b> sur mobile, ou s’il faut ajouter un événement tactile.',
          },
          {
            type: 'paragraph',
            html: 'Un <code>onClick</code> sur un vrai <code>&lt;button&gt;</code> se déclenche <b>au clic ET au tap</b>. Inutile d’ajouter <code>onTouchStart</code> : tu risquerais même un <b>double déclenchement</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2105-l-c1',
              filename: 'Bouton.tsx',
              language: 'tsx',
              code: `// Suffit pour la souris ET le doigt :
<button onClick={() => ouvrir()}>Ouvrir</button>

// A EVITER : double gestion => peut se declencher 2 fois
<button onClick={ouvrir} onTouchStart={ouvrir}>Ouvrir</button>`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Piège hover :</b> au doigt, il n’y a <b>pas de survol</b>. Ne cache jamais une action derrière un <code>:hover</code> seul — elle serait invisible sur mobile.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Pointer events : souris + doigt d’un coup',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour <b>suivre le pointeur</b> (glisser, dessiner, un curseur maison), les <b>pointer events</b> unifient tout : <code>onPointerDown</code>, <code>onPointerMove</code>, <code>onPointerUp</code>. Un seul code pour la souris et le tactile.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2105-l-c2',
              filename: 'Zone.tsx',
              language: 'tsx',
              code: `function Zone() {
  function onDown(e: React.PointerEvent) {
    // e.pointerType vaut 'mouse', 'touch' ou 'pen'
    console.log('appui avec', e.pointerType, 'en', e.clientX, e.clientY);
  }
  return <div onPointerDown={onDown} style={{ touchAction: 'none' }} />;
}`,
            },
          },
          {
            type: 'table',
            headers: ['Événement', 'Souris', 'Doigt'],
            rows: [
              ['<code>onClick</code>', 'clic', 'tap ✅'],
              ['<code>onPointerDown/Move/Up</code>', 'oui', 'oui (recommandé)'],
              ['<code>onTouchStart/Move/End</code>', 'non', 'oui (multi-touch)'],
              ['<code>onMouseEnter</code> (hover)', 'oui', 'non ❌'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b><code>touch-action</code> :</b> mets <code>touch-action: none</code> (CSS) sur la zone qu’on fait glisser, sinon le navigateur scrolle la page au lieu de suivre ton geste.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Quand utiliser les touch events',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les <b>touch events</b> restent utiles pour le <b>multi-touch</b> (pincer pour zoomer, deux doigts). Ils exposent <code>e.touches</code>, la liste des doigts posés.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2105-l-c3',
              filename: 'Tactile.tsx',
              language: 'tsx',
              code: `function onTouchStart(e: React.TouchEvent) {
  const doigt = e.touches[0];            // premier doigt
  console.log(doigt.clientX, doigt.clientY);
  console.log(e.touches.length, 'doigt(s)'); // 2 => pincement possible
}`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Ajouter <code>onTouchStart</code> en plus de <code>onClick</code> « pour le mobile » : le tap fait déjà les deux, tu déclenches deux fois.',
      'Mettre une action seulement au <code>:hover</code> : invisible au doigt (pas de survol sur tactile).',
      'Oublier <code>touch-action: none</code> sur une zone qu’on fait glisser : la page scrolle au lieu de suivre le doigt.',
      'Utiliser un <code>&lt;div onClick&gt;</code> au lieu d’un <code>&lt;button&gt;</code> : moins accessible et pas déclenché au clavier.',
    ],
    takeaways: [
      'un <code>onClick</code> sur un <code>&lt;button&gt;</code> marche au clic <b>et</b> au tap',
      'pour suivre le pointeur : <b>pointer events</b> (souris + doigt + stylet)',
      '<code>e.pointerType</code> = <code>mouse</code> / <code>touch</code> / <code>pen</code>',
      'touch events (<code>e.touches</code>) surtout pour le multi-touch',
      'jamais d’action réservée au <code>:hover</code> · pense <code>touch-action</code> pour les gestes',
    ],
  }),
  template({
    id: 'REACT-F-2105-TEMPLATE',
    slug: 'evenements-clic-et-tactile',
    title: 'Le clic et le tactile',
    shortTitle: 'Clic & tactile',
    technology: 'react',
    tomeId: 't10',
    summary: 'Gérer clic et tactile proprement avec les pointer events.',
    lede: 'Choisis ton cas :',
    aliases: ['pointer events', 'ontouchstart', 'onclick tactile'],
    keywords: ['onpointerdown', 'pointertype', 'touch-action'],
    relatedContentIds: [],
    lessonId: 'REACT-F-2105-LESSON',
    variants: [
      {
        id: 'clic-tactile',
        label: 'Clic + tactile (pointer)',
        description: 'Un même handler pour la souris et le doigt.',
        codeBlocks: [
          {
            id: 'REACT-F-2105-t-v1',
            filename: 'Draggable.tsx',
            language: 'tsx',
            code: `function onPointerDown(e: React.PointerEvent) {
  const startX = e.clientX;
  // ... suivre le mouvement avec onPointerMove ...
}

<div onPointerDown={onPointerDown} style={{ touchAction: 'none' }} />`,
          },
        ],
        replacements: [
          { token: 'onPointerDown', description: 'ajoute onPointerMove / onPointerUp pour suivre le geste' },
          { token: 'touchAction: \'none\'', description: 'empêche la page de scroller pendant le geste' },
        ],
        placement: 'Sur toute zone qu’on fait glisser (curseur, carte déplaçable…).',
      },
      {
        id: 'type-pointeur',
        label: 'Souris ou doigt ?',
        description: 'Réagir différemment selon le type de pointeur.',
        codeBlocks: [
          {
            id: 'REACT-F-2105-t-v2',
            filename: 'detect.tsx',
            language: 'tsx',
            code: `function onDown(e: React.PointerEvent) {
  if (e.pointerType === 'touch') {
    // comportement au doigt
  } else {
    // souris / stylet
  }
}`,
          },
        ],
        replacements: [{ token: "'touch'", description: "'mouse', 'touch' ou 'pen'" }],
        placement: 'Quand le doigt et la souris doivent se comporter différemment.',
      },
    ],
  }),

  // ————— Modale accessible et bottom sheet —————
  lesson({
    id: 'REACT-F-2106-LESSON',
    slug: 'modale-et-bottom-sheet',
    title: 'Modale accessible et bottom sheet',
    shortTitle: 'Modale & sheet',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Afficher un panneau par-dessus la page : une modale centrée sur ordinateur, une bottom sheet qui monte du bas sur mobile — avec les bons réflexes d’accessibilité.',
    utility:
      'Construire une fenêtre superposée propre et utilisable au clavier comme au doigt.',
    aliases: ['modale', 'modal', 'dialog', 'bottom sheet', 'popup', 'fenetre', 'overlay'],
    keywords: [
      'modale',
      'dialog',
      'bottom sheet',
      'overlay',
      'fermer avec echap',
      'bloquer le scroll',
      'accessibilite modale',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-2106-TEMPLATE',
    intro:
      'Une <b>modale</b> affiche un panneau <b>par-dessus</b> la page, avec un fond sombre (le <i>backdrop</i>). Sur <b>ordinateur</b> on la centre ; sur <b>mobile</b>, une <b>bottom sheet</b> (panneau qui monte du bas) est souvent plus naturelle au pouce. Même code React, juste un placement différent.',
    sections: [
      {
        id: 's1',
        title: 'Une modale simple',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>demander une confirmation</b> dans un panneau au-dessus de la page, qu’on ferme avec le bouton, le fond, ou la touche <code>Échap</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2106-l-c1',
              filename: 'Modale.tsx',
              language: 'tsx',
              code: `function Modale({ open, onClose, children }) {
  // Fermer avec la touche Echap + bloquer le scroll du fond
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="panel" role="dialog" aria-modal="true"
           onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Le <code>stopPropagation</code></b> sur le panneau évite qu’un clic <i>dans</i> la modale ne la ferme : seul le clic sur le fond ferme.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Ordinateur : modale · Mobile : bottom sheet',
        blocks: [
          {
            type: 'paragraph',
            html: 'C’est le <b>même composant</b> ; seul le CSS change. Sur mobile, on colle le panneau <b>en bas</b> et on l’étire sur toute la largeur : c’est la <b>bottom sheet</b>, plus facile à atteindre au pouce.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2106-l-c2',
              filename: 'modale.css',
              language: 'css',
              code: `.backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.5);
  display: flex; justify-content: center;
  align-items: center;              /* ordinateur : centre */
}
.panel { border-radius: 14px; }

/* Mobile : le panneau devient une bottom sheet */
@media (max-width: 640px) {
  .backdrop { align-items: flex-end; }        /* colle en bas */
  .panel {
    width: 100%;
    border-radius: 16px 16px 0 0;             /* coins hauts arrondis */
  }
}`,
            },
          },
          {
            type: 'table',
            headers: ['', 'Modale (desktop)', 'Bottom sheet (mobile)'],
            rows: [
              ['Position', 'centrée', 'collée en bas'],
              ['Largeur', 'contenue', 'pleine largeur'],
              ['Ferme au geste', 'clic sur le fond', 'glisser vers le bas'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Accessibilité : les réflexes',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une modale bien faite se manipule <b>au clavier comme au doigt</b>. Les 5 réflexes :',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2106-l-c3',
              filename: 'checklist.txt',
              language: 'text',
              code: `1. role="dialog" + aria-modal="true"
2. Fermeture avec la touche Echap
3. Bloquer le scroll du fond (body overflow: hidden)
4. Mettre le focus dans la modale a l'ouverture
5. Rendre le focus au bouton d'origine a la fermeture`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier de <b>bloquer le scroll</b> du fond : la page défile derrière la modale.',
      'Ne pas gérer <code>Échap</code> ni le clic sur le fond : l’utilisateur se sent « piégé » dans la modale.',
      'Mettre une bottom sheet trop haute : garde une marge en haut pour qu’on voie qu’il y a une page derrière.',
      'Oublier le focus : au clavier, on doit entrer dans la modale, pas rester bloqué sur la page.',
    ],
    takeaways: [
      'modale = panneau + <b>backdrop</b> par-dessus la page',
      'desktop → centrée · mobile → <b>bottom sheet</b> (même composant, CSS différent)',
      'toujours : <code>Échap</code>, clic sur le fond, <b>scroll du fond bloqué</b>',
      '<code>role="dialog"</code> + <code>aria-modal="true"</code> + gestion du focus',
      '<code>stopPropagation</code> sur le panneau pour ne pas fermer au clic interne',
    ],
  }),
  template({
    id: 'REACT-F-2106-TEMPLATE',
    slug: 'modale-et-bottom-sheet',
    title: 'Modale accessible et bottom sheet',
    shortTitle: 'Modale & sheet',
    technology: 'react',
    tomeId: 't10',
    summary: 'Le squelette d’une modale et son passage en bottom sheet sur mobile.',
    lede: 'Choisis ce dont tu as besoin :',
    aliases: ['modale', 'bottom sheet', 'dialog'],
    keywords: ['modale', 'sheet', 'backdrop', 'escape'],
    relatedContentIds: [],
    lessonId: 'REACT-F-2106-LESSON',
    variants: [
      {
        id: 'modale',
        label: 'Modale (React)',
        description: 'Un composant modale réutilisable, fermable au clavier.',
        codeBlocks: [
          {
            id: 'REACT-F-2106-t-v1',
            filename: 'Modale.tsx',
            language: 'tsx',
            code: `export function Modale({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="panel" role="dialog" aria-modal="true"
           onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}`,
          },
        ],
        replacements: [
          { token: 'open', description: 'un booléen d’état : la modale est ouverte ou non' },
          { token: 'onClose', description: 'la fonction qui passe open à false' },
        ],
        placement: 'Enveloppe le contenu à afficher au-dessus de la page.',
      },
      {
        id: 'sheet-css',
        label: 'Bottom sheet (CSS)',
        description: 'Le CSS qui transforme la modale en sheet sur mobile.',
        codeBlocks: [
          {
            id: 'REACT-F-2106-t-v2',
            filename: 'modale.css',
            language: 'css',
            code: `.backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.5);
  display: flex; align-items: center; justify-content: center;
}
@media (max-width: 640px) {
  .backdrop { align-items: flex-end; }
  .panel { width: 100%; border-radius: 16px 16px 0 0; }
}`,
          },
        ],
        replacements: [{ token: '640px', description: 'la largeur en dessous de laquelle on passe en sheet' }],
        placement: 'À ajouter au CSS de ta modale pour l’adapter au mobile.',
      },
    ],
  }),

  // ————— Détecter un swipe (glisser) —————
  lesson({
    id: 'REACT-F-2107-LESSON',
    slug: 'detecter-un-swipe',
    title: 'Détecter un swipe (glisser)',
    shortTitle: 'Swipe',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Repérer un glissement du doigt pour ouvrir ou fermer un panneau : on mémorise le début, on mesure la fin, et au-delà d’un seuil c’est un swipe.',
    utility:
      'Ajouter des gestes tactiles simples (glisser pour fermer un menu ou une sheet).',
    aliases: ['swipe', 'glisser', 'geste', 'gesture', 'glisser pour fermer', 'tactile'],
    keywords: [
      'swipe',
      'glisser pour fermer',
      'geste tactile',
      'touchstart touchend',
      'seuil de swipe',
      'ouvrir fermer au doigt',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-2107-TEMPLATE',
    intro:
      'Un <b>swipe</b>, c’est un <b>glissement du doigt</b> dans une direction. Le principe est simple : on note où le doigt <b>commence</b>, on regarde où il <b>finit</b>, et si l’écart dépasse un <b>seuil</b>, c’est un swipe. On s’en sert pour <b>ouvrir ou fermer</b> un menu ou une sheet.',
    sections: [
      {
        id: 's1',
        title: 'Le principe : début, fin, différence',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>fermer mon menu latéral en le glissant vers la gauche</b> avec le doigt.',
          },
          {
            type: 'paragraph',
            html: 'On mémorise la position au <b>touchstart</b>, puis au <b>touchend</b> on calcule la <b>différence</b>. Si elle dépasse le seuil (ex. 60&nbsp;px) dans le bon sens, on déclenche l’action.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2107-l-c1',
              filename: 'Menu.tsx',
              language: 'tsx',
              code: `function Menu({ onClose }) {
  const startX = useRef(0);

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;   // debut
  }
  function onTouchEnd(e: React.TouchEvent) {
    const delta = e.changedTouches[0].clientX - startX.current;
    if (delta < -60) onClose();              // glisse vers la gauche => ferme
  }

  return <aside onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>…</aside>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Seuil :</b> exige un minimum (50–80&nbsp;px) pour ne pas confondre un simple tap avec un swipe. En dessous, on ignore.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Un hook réutilisable',
        blocks: [
          {
            type: 'paragraph',
            html: 'On peut ranger cette logique dans un <b>hook</b> <code>useSwipe</code> et le réutiliser sur n’importe quel élément.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-2107-l-c2',
              filename: 'useSwipe.ts',
              language: 'tsx',
              code: `export function useSwipe(onSwipeLeft: () => void, seuil = 60) {
  const startX = useRef(0);
  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const delta = e.changedTouches[0].clientX - startX.current;
      if (delta < -seuil) onSwipeLeft();
    },
  };
}

// Utilisation :
const swipe = useSwipe(() => setOuvert(false));
<div {...swipe}>…</div>`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Scroll vs geste :</b> si tu suis le doigt en direct, ajoute <code>touch-action: pan-y</code> (CSS) pour autoriser le scroll vertical tout en captant le glissement horizontal.',
          },
        ],
      },
    ],
    pitfalls: [
      'Ne pas mettre de <b>seuil</b> : un simple tap est alors pris pour un mini-swipe.',
      'Confondre <code>e.touches</code> (doigts encore posés) et <code>e.changedTouches</code> (celui qui vient de se lever) au <code>touchend</code> : au relâcher, c’est <code>changedTouches</code>.',
      'Bloquer tout le scroll avec <code>touch-action: none</code> alors qu’on ne swipe que sur un axe : préfère <code>pan-y</code> ou <code>pan-x</code>.',
      'Faire du swipe le <b>seul</b> moyen de fermer : garde toujours un bouton visible en secours.',
    ],
    takeaways: [
      'swipe = position de <b>début</b> (touchstart) → position de <b>fin</b> (touchend) → différence',
      'au-delà d’un <b>seuil</b> (50–80 px) dans le bon sens = geste validé',
      'au relâcher, lis <code>e.changedTouches[0]</code>, pas <code>e.touches</code>',
      'un hook <code>useSwipe</code> rend le geste réutilisable',
      'garde toujours un bouton de secours : le swipe est un <b>plus</b>, pas le seul chemin',
    ],
  }),
  template({
    id: 'REACT-F-2107-TEMPLATE',
    slug: 'detecter-un-swipe',
    title: 'Détecter un swipe (glisser)',
    shortTitle: 'Swipe',
    technology: 'react',
    tomeId: 't10',
    summary: 'Détecter un glissement du doigt, en direct ou dans un hook réutilisable.',
    lede: 'Choisis ta version :',
    aliases: ['swipe', 'glisser', 'geste tactile'],
    keywords: ['touchstart', 'touchend', 'seuil', 'useswipe'],
    relatedContentIds: [],
    lessonId: 'REACT-F-2107-LESSON',
    variants: [
      {
        id: 'detecter-sens',
        label: 'Détecter le sens',
        description: 'Reconnaître un glissement gauche / droite.',
        codeBlocks: [
          {
            id: 'REACT-F-2107-t-v1',
            filename: 'swipe.tsx',
            language: 'tsx',
            code: `const startX = useRef(0);

function onTouchStart(e: React.TouchEvent) {
  startX.current = e.touches[0].clientX;
}
function onTouchEnd(e: React.TouchEvent) {
  const delta = e.changedTouches[0].clientX - startX.current;
  if (delta < -60) onSwipeLeft();      // vers la gauche
  else if (delta > 60) onSwipeRight(); // vers la droite
}`,
          },
        ],
        replacements: [
          { token: '60', description: 'le seuil en pixels (au-delà = swipe)' },
          { token: 'onSwipeLeft', description: 'ce qui se passe au glissement vers la gauche' },
        ],
        placement: 'Sur l’élément qu’on veut faire réagir au glissement.',
      },
      {
        id: 'hook-swipe',
        label: 'Hook useSwipe',
        description: 'La logique rangée dans un hook réutilisable.',
        codeBlocks: [
          {
            id: 'REACT-F-2107-t-v2',
            filename: 'useSwipe.ts',
            language: 'tsx',
            code: `export function useSwipe(onSwipeLeft: () => void, seuil = 60) {
  const startX = useRef(0);
  return {
    onTouchStart: (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; },
    onTouchEnd: (e: React.TouchEvent) => {
      if (e.changedTouches[0].clientX - startX.current < -seuil) onSwipeLeft();
    },
  };
}`,
          },
        ],
        replacements: [
          { token: 'onSwipeLeft', description: 'l’action au glissement (ex. fermer)' },
          { token: 'seuil = 60', description: 'la distance minimale du geste' },
        ],
        placement: 'À importer, puis étaler sur l’élément : <div {...useSwipe(fermer)} />.',
      },
    ],
  }),
];
