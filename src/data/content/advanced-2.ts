import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const advanced2Content: ReadyContent[] = [
  // ————— Zustand —————
  lesson({
    id: 'ADV-F-1107-LESSON',
    slug: 'zustand',
    title: 'Zustand',
    shortTitle: 'Zustand',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Un state global léger et sans boilerplate : un seul store, un hook, et tes composants lisent la donnée partagée sans passer par les props.',
    utility: 'Partager un état entre des composants éloignés sans props ni Context lourd.',
    aliases: ['zustand', 'store global', 'state global', 'create store', 'gestion etat'],
    keywords: [
      'partager un etat',
      'panier',
      'store leger',
      'sans props drilling',
      'hook global',
      'setter global',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1107-TEMPLATE',
    intro:
      'Zustand est une <b>librairie de state global</b> minimaliste. Tu crées un <b>store</b> avec <code>create</code>, il te rend un <b>hook</b>, et n’importe quel composant peut lire ou modifier la donnée — sans <code>Provider</code> ni props qui traversent dix niveaux.',
    sections: [
      {
        id: 's1',
        title: 'Créer un store',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux un <b>compteur de panier accessible partout</b> : le bouton « Ajouter » l’incrémente, et l’icône panier dans le header affiche le total, alors qu’ils sont à l’opposé de l’arbre.',
          },
          {
            type: 'paragraph',
            html: 'Un store Zustand = une fonction <code>create</code> qui reçoit <code>set</code>. Tu y déclares ton <b>état</b> et les <b>actions</b> qui le modifient. Le résultat est un hook, par convention nommé <code>useQuelqueChoseStore</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1107-l-c1',
              filename: 'store.ts',
              language: 'typescript',
              code: `import { create } from "zustand";

// 1. create recoit "set" pour modifier l'etat
export const usePanier = create((set) => ({
  // 2. l'etat de depart
  total: 0,
  // 3. les actions qui appellent set
  ajouter: () => set((state) => ({ total: state.total + 1 })),
  vider: () => set({ total: 0 }),
}));`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> nomme ton hook <code>useXxx</code> (comme un hook React) et déclare état + actions <b>dans le même objet</b>. Les actions vivent à côté de la donnée qu’elles modifient.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Lire le store dans un composant',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dans le composant, tu appelles le hook avec un <b>sélecteur</b> : une petite fonction qui pioche <b>uniquement</b> le morceau dont tu as besoin. Le composant ne se re-rend que si ce morceau change.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1107-l-c2',
              filename: 'Panier.tsx',
              language: 'tsx',
              code: `import { usePanier } from "./store";

function IconePanier() {
  // je selectionne UNIQUEMENT total
  const total = usePanier((state) => state.total);
  return <span>Panier : {total}</span>;
}

function BoutonAjouter() {
  // je selectionne UNIQUEMENT l'action ajouter
  const ajouter = usePanier((state) => state.ajouter);
  return <button onClick={ajouter}>Ajouter</button>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le store est un <b>tableau blanc</b> au centre du bureau. Chaque composant regarde juste la case qui l’intéresse (le total), et n’importe qui peut écrire dessus (l’action). Pas besoin de faire passer un post-it de main en main.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Zustand vs les autres',
        blocks: [
          {
            type: 'paragraph',
            html: 'Zustand se place entre le <code>useState</code> local (un seul composant) et Redux (gros projets, beaucoup de règles). Il vise le <b>state partagé simple</b>, avec très peu de code.',
          },
          {
            type: 'table',
            headers: ['Outil', 'Portée', 'Quand'],
            rows: [
              ['<code>useState</code>', 'un composant', 'donnée locale'],
              ['Context', 'un sous-arbre', 'valeur rarement modifiée (thème, user)'],
              ['Zustand', 'toute l’app', 'state partagé, peu de boilerplate'],
              ['Redux', 'toute l’app', 'gros projet, historique, middlewares'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Lire tout le store (<code>const state = usePanier()</code>) sans sélecteur : le composant se re-rend à <b>chaque</b> changement, même sans rapport.',
      'Modifier l’état sans passer par <code>set</code> : Zustand ne détecte rien. Toujours une action qui appelle <code>set</code>.',
      'Recréer le store à l’intérieur d’un composant : <code>create</code> se met <b>en dehors</b>, une seule fois, dans un fichier dédié.',
    ],
    takeaways: [
      'store = <code>create((set) => ({ etat, actions }))</code> hors du composant',
      'lecture avec un <b>sélecteur</b> : <code>useStore((s) => s.morceau)</code>',
      'modifier = une action qui appelle <code>set</code> (jamais l’état directement)',
      'ni <code>Provider</code> ni props drilling : le hook s’importe partout',
    ],
  }),
  template({
    id: 'ADV-F-1107-TEMPLATE',
    slug: 'zustand',
    title: 'Zustand',
    shortTitle: 'Zustand',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Un store Zustand prêt à copier : store de base, sélecteur, ou store typé en TypeScript.',
    lede: 'Un state global léger. Choisis ton cas :',
    aliases: ['zustand', 'store', 'create', 'state global'],
    keywords: ['store', 'selecteur', 'set', 'typescript'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1107-LESSON',
    variants: [
      {
        id: 'store-base',
        label: 'Store de base',
        description: 'Le store minimal en JavaScript.',
        codeBlocks: [
          {
            id: 'ADV-F-1107-t-v1',
            filename: 'store.js',
            language: 'javascript',
            code: `import { create } from "zustand";

export const useStore = create((set) => ({
  valeur: 0,
  incrementer: () => set((state) => ({ valeur: state.valeur + 1 })),
  reset: () => set({ valeur: 0 }),
}));`,
          },
        ],
        replacements: [
          { token: 'useStore', description: 'le nom de ton hook (useXxx)' },
          { token: 'valeur', description: 'le nom de ta donnée partagée' },
          { token: 'incrementer / reset', description: 'les actions qui modifient l’état' },
        ],
        placement: 'Dans un fichier store à part, hors de tout composant. Importe le hook où tu veux.',
      },
      {
        id: 'selecteur',
        label: 'Lecture (sélecteur)',
        description: 'Lire un seul morceau pour éviter les re-rendus inutiles.',
        codeBlocks: [
          {
            id: 'ADV-F-1107-t-v2',
            filename: 'Composant.jsx',
            language: 'jsx',
            code: `import { useStore } from "./store";

function Compteur() {
  const valeur = useStore((state) => state.valeur);
  const incrementer = useStore((state) => state.incrementer);

  return <button onClick={incrementer}>{valeur}</button>;
}`,
          },
        ],
        replacements: [
          { token: 'state.valeur', description: 'le morceau précis à lire' },
          { token: 'state.incrementer', description: 'l’action à récupérer' },
        ],
        placement: 'Un sélecteur par donnée : le composant ne se re-rend que si ce morceau change.',
      },
      {
        id: 'typescript',
        label: 'Store typé (TS)',
        description: 'Le même store avec une interface TypeScript.',
        codeBlocks: [
          {
            id: 'ADV-F-1107-t-v3',
            filename: 'store.ts',
            language: 'typescript',
            code: `import { create } from "zustand";

interface PanierState {
  total: number;
  ajouter: () => void;
  vider: () => void;
}

export const usePanier = create<PanierState>((set) => ({
  total: 0,
  ajouter: () => set((state) => ({ total: state.total + 1 })),
  vider: () => set({ total: 0 }),
}));`,
          },
        ],
        replacements: [
          { token: 'PanierState', description: 'le nom de ton interface' },
          { token: 'total', description: 'ta donnée + son type' },
          { token: 'ajouter / vider', description: 'tes actions typées' },
        ],
        placement: 'Passe le type à create<...>() : l’auto-complétion et les erreurs deviennent fiables.',
      },
    ],
  }),

  // ————— Redux : introduction —————
  lesson({
    id: 'ADV-F-1108-LESSON',
    slug: 'redux-introduction',
    title: 'Redux : introduction',
    shortTitle: 'Redux',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Le state global à l’ancienne, remis au propre avec Redux Toolkit : un store central, des slices, et un flux de données prévisible.',
    utility: 'Comprendre le flux Redux et créer un state global structuré avec Redux Toolkit.',
    aliases: ['redux', 'redux toolkit', 'store', 'slice', 'reducer', 'dispatch', 'action'],
    keywords: [
      'state global structure',
      'flux de donnees',
      'store central',
      'dispatch une action',
      'createslice',
      'useselector',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1108-TEMPLATE',
    intro:
      'Redux centralise tout l’état de l’app dans un <b>store</b> unique. On ne le modifie jamais directement : on <b>dispatche</b> une action, un <b>reducer</b> calcule le nouvel état. Aujourd’hui on l’écrit avec <b>Redux Toolkit</b>, qui supprime l’essentiel du boilerplate.',
    sections: [
      {
        id: 's1',
        title: 'Le flux Redux',
        blocks: [
          {
            type: 'paragraph',
            html: 'Redux suit toujours le même sens unique : un composant <b>dispatche</b> une action → le <b>reducer</b> reçoit l’état + l’action et renvoie le <b>nouvel</b> état → les composants abonnés se mettent à jour. Un flux <b>prévisible</b>, facile à déboguer.',
          },
          {
            type: 'table',
            headers: ['Terme', 'Rôle'],
            rows: [
              ['<code>store</code>', 'le conteneur unique de tout l’état'],
              ['<code>action</code>', 'un objet qui décrit « ce qui s’est passé »'],
              ['<code>reducer</code>', 'une fonction état + action → nouvel état'],
              ['<code>dispatch</code>', 'envoyer une action au store'],
              ['<code>slice</code>', 'un morceau du store (état + reducers) via Toolkit'],
            ],
          },
        ],
      },
      {
        id: 's2',
        title: 'Créer un slice',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux un <b>compteur global</b> que plusieurs écrans partagent, avec des actions <code>incrementer</code> et <code>ajouterMontant</code>, dans une architecture claire et testable.',
          },
          {
            type: 'paragraph',
            html: 'Avec <code>createSlice</code>, tu déclares en un bloc : le <b>nom</b>, l’<b>état initial</b> et les <b>reducers</b>. Toolkit génère automatiquement les actions correspondantes. Tu peux « muter » l’état : Toolkit utilise Immer en coulisse pour produire un nouvel état immuable.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1108-l-c1',
              filename: 'compteurSlice.ts',
              language: 'typescript',
              code: `import { createSlice } from "@reduxjs/toolkit";

const compteurSlice = createSlice({
  name: "compteur",          // 1. nom du slice
  initialState: { valeur: 0 }, // 2. etat de depart
  reducers: {
    // 3. grace a Immer, on peut "muter" state
    incrementer: (state) => {
      state.valeur += 1;
    },
    ajouterMontant: (state, action) => {
      state.valeur += action.payload; // la donnee envoyee
    },
  },
});

// Toolkit genere les actions tout seul
export const { incrementer, ajouterMontant } = compteurSlice.actions;
export default compteurSlice.reducer;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> la donnée transmise avec une action s’appelle le <code>payload</code>. On l’envoie via <code>dispatch(ajouterMontant(10))</code> et on la lit dans <code>action.payload</code>.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Brancher le store et lire l’état',
        blocks: [
          {
            type: 'paragraph',
            html: 'On assemble les slices dans le <b>store</b>, on l’enveloppe autour de l’app avec <code>Provider</code>, puis on lit avec <code>useSelector</code> et on modifie avec <code>useDispatch</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1108-l-c2',
              filename: 'App.tsx',
              language: 'tsx',
              code: `import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";
import compteurReducer, { incrementer } from "./compteurSlice";

// 1. Le store rassemble les reducers
const store = configureStore({
  reducer: { compteur: compteurReducer },
});

function Compteur() {
  // 2. lire l'etat
  const valeur = useSelector((state) => state.compteur.valeur);
  // 3. recuperer dispatch
  const dispatch = useDispatch();
  // 4. dispatcher une action au clic
  return <button onClick={() => dispatch(incrementer())}>{valeur}</button>;
}

// 5. Provider rend le store dispo dans toute l'app
export default function App() {
  return (
    <Provider store={store}>
      <Compteur />
    </Provider>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le store est un <b>guichet unique</b>. Tu ne fouilles pas dans la caisse toi-même : tu remplis un formulaire (l’action) et tu le déposes (<code>dispatch</code>). L’employé (le reducer) applique la règle et met à jour le registre.',
          },
        ],
      },
    ],
    pitfalls: [
      'Muter l’état hors d’un reducer Toolkit : la « mutation » n’est autorisée que <b>dans</b> <code>createSlice</code> (grâce à Immer). Ailleurs, reste immuable.',
      'Oublier d’envelopper l’app dans <code>&lt;Provider store={store}&gt;</code> : <code>useSelector</code> plante faute de store.',
      'Mettre TOUT dans Redux, même l’état local d’un champ : garde le local en <code>useState</code>, Redux pour le <b>partagé</b>.',
    ],
    takeaways: [
      'flux : <code>dispatch(action)</code> → <code>reducer</code> → nouvel état → re-rendu',
      'Redux Toolkit = <code>createSlice</code> (état + reducers) + <code>configureStore</code>',
      'lire : <code>useSelector</code> · modifier : <code>useDispatch</code> + une action',
      'la donnée d’une action = son <code>payload</code>',
    ],
  }),
  template({
    id: 'ADV-F-1108-TEMPLATE',
    slug: 'redux-introduction',
    title: 'Redux Toolkit',
    shortTitle: 'Redux',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Le squelette Redux Toolkit prêt à copier : un slice, le store, et la lecture dans un composant.',
    lede: 'Mettre en place Redux Toolkit. Choisis l’étape :',
    aliases: ['redux', 'toolkit', 'createslice', 'store', 'useselector'],
    keywords: ['slice', 'reducer', 'dispatch', 'provider'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1108-LESSON',
    variants: [
      {
        id: 'slice',
        label: 'Un slice',
        description: 'Le morceau de state avec ses reducers.',
        codeBlocks: [
          {
            id: 'ADV-F-1108-t-v1',
            filename: 'monSlice.js',
            language: 'javascript',
            code: `import { createSlice } from "@reduxjs/toolkit";

const monSlice = createSlice({
  name: "mon",
  initialState: { valeur: 0 },
  reducers: {
    incrementer: (state) => {
      state.valeur += 1;
    },
    definir: (state, action) => {
      state.valeur = action.payload;
    },
  },
});

export const { incrementer, definir } = monSlice.actions;
export default monSlice.reducer;`,
          },
        ],
        replacements: [
          { token: 'mon', description: 'le nom de ton slice' },
          { token: 'valeur', description: 'l’état géré par ce slice' },
          { token: 'incrementer / definir', description: 'les reducers (deviennent des actions)' },
        ],
        placement: 'Un fichier par slice. Exporte les actions et le reducer par défaut.',
      },
      {
        id: 'store',
        label: 'Le store + Provider',
        description: 'Assembler les reducers et exposer le store.',
        codeBlocks: [
          {
            id: 'ADV-F-1108-t-v2',
            filename: 'main.jsx',
            language: 'jsx',
            code: `import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import monReducer from "./monSlice";

const store = configureStore({
  reducer: { mon: monReducer },
});

export default function Root({ children }) {
  return <Provider store={store}>{children}</Provider>;
}`,
          },
        ],
        replacements: [
          { token: 'mon: monReducer', description: 'chaque clé = un slice de ton app' },
          { token: 'Root', description: 'le composant qui enveloppe ton app' },
        ],
        placement: 'Autour de la racine de l’app, une seule fois. Chaque slice ajoute une clé dans reducer.',
      },
      {
        id: 'lecture',
        label: 'Lire + dispatcher',
        description: 'Utiliser le state dans un composant.',
        codeBlocks: [
          {
            id: 'ADV-F-1108-t-v3',
            filename: 'Compteur.jsx',
            language: 'jsx',
            code: `import { useSelector, useDispatch } from "react-redux";
import { incrementer } from "./monSlice";

function Compteur() {
  const valeur = useSelector((state) => state.mon.valeur);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(incrementer())}>{valeur}</button>
  );
}`,
          },
        ],
        replacements: [
          { token: 'state.mon.valeur', description: 'le chemin vers ta donnée dans le store' },
          { token: 'incrementer', description: 'l’action à dispatcher' },
        ],
        placement: 'useSelector pour lire, useDispatch pour envoyer une action. Jamais de mutation directe.',
      },
    ],
  }),

  // ————— Next.js : introduction —————
  lesson({
    id: 'ADV-F-1109-LESSON',
    slug: 'next-js-introduction',
    title: 'Next.js : introduction',
    shortTitle: 'Next.js',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Le framework React de production : routing par fichiers, rendu côté serveur et Server Components, pour des apps rapides et bien référencées.',
    utility: 'Découvrir Next.js : le routing par dossiers, les Server Components et le rendu serveur.',
    aliases: ['next', 'nextjs', 'app router', 'server component', 'ssr', 'framework react'],
    keywords: [
      'framework react',
      'routing par fichiers',
      'rendu serveur',
      'server component',
      'app router',
      'seo react',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1109-TEMPLATE',
    intro:
      'Next.js est un <b>framework</b> construit sur React. Il ajoute ce que React seul n’a pas : un <b>routing par fichiers</b>, le <b>rendu côté serveur</b> (meilleur SEO et démarrage plus rapide) et les <b>Server Components</b>. On l’écrit aujourd’hui avec l’<b>App Router</b> (dossier <code>app/</code>).',
    sections: [
      {
        id: 's1',
        title: 'Le routing par fichiers',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>une page « /à-propos » sans configurer de routeur</b> : juste créer un fichier et qu’elle soit accessible.',
          },
          {
            type: 'paragraph',
            html: 'Dans l’App Router, chaque <b>dossier</b> de <code>app/</code> est une <b>route</b>, et le fichier <code>page.tsx</code> qu’il contient est la page affichée. Pas de configuration : l’arborescence <b>est</b> le routeur.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1109-l-c1',
              filename: 'arborescence.txt',
              language: 'text',
              code: `app/
  page.tsx          ->  la route  /
  about/
    page.tsx        ->  la route  /about
  blog/
    page.tsx        ->  la route  /blog
    [slug]/
      page.tsx      ->  la route  /blog/mon-article (dynamique)
  layout.tsx        ->  l'habillage commun a toutes les pages`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Fichiers spéciaux :</b> <code>page.tsx</code> = la page, <code>layout.tsx</code> = l’habillage partagé, <code>loading.tsx</code> = l’état de chargement. Les crochets <code>[slug]</code> = un segment dynamique.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Une page = un composant exporté',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une page est un simple composant React exporté <b>par défaut</b>. Par défaut dans l’App Router, c’est un <b>Server Component</b> : il s’exécute sur le serveur, peut lire des données directement, et n’envoie que du HTML léger au navigateur.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1109-l-c2',
              filename: 'app/blog/[slug]/page.tsx',
              language: 'tsx',
              code: `// Server Component par defaut : peut etre async !
export default async function Article({ params }) {
  // params.slug = le segment dynamique de l'URL
  const article = await fetchArticle(params.slug);

  return (
    <main>
      <h1>{article.titre}</h1>
      <p>{article.contenu}</p>
    </main>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un Server Component est un plat <b>préparé en cuisine</b> (le serveur) puis servi tout chaud. Le client reçoit l’assiette finie, il n’a pas à cuisiner — d’où un affichage rapide et un bon référencement.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Server vs Client Components',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un Server Component ne peut pas utiliser <code>useState</code>, <code>useEffect</code> ni les événements (<code>onClick</code>). Dès qu’il te faut de l’<b>interactivité</b>, tu passes en <b>Client Component</b> avec la directive <code>"use client"</code> en tête de fichier.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1109-l-c3',
              filename: 'app/Compteur.tsx',
              language: 'tsx',
              code: `"use client"; // <- indispensable pour l'interactivite

import { useState } from "react";

export default function Compteur() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}`,
            },
          },
          {
            type: 'table',
            headers: ['Besoin', 'Type de composant'],
            rows: [
              ['Lire des données, du HTML statique', 'Server (défaut)'],
              ['<code>useState</code>, <code>useEffect</code>', 'Client (<code>"use client"</code>)'],
              ['<code>onClick</code> et autres événements', 'Client'],
              ['Accès direct à la base / secrets', 'Server'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>useState</code> ou <code>onClick</code> dans un Server Component : erreur. Ajoute <code>"use client"</code> en haut du fichier.',
      'Oublier d’exporter la page <b>par défaut</b> : un <code>page.tsx</code> sans <code>export default</code> n’affiche rien.',
      'Mettre <code>"use client"</code> partout « au cas où » : tu perds les avantages du serveur. Ne le mets que sur les composants interactifs.',
    ],
    takeaways: [
      'routing par fichiers : un dossier = une route, <code>page.tsx</code> = la page',
      'App Router : composants <b>Server</b> par défaut (rapides, bon SEO)',
      'interactivité (<code>useState</code>, <code>onClick</code>) → <code>"use client"</code>',
      'segment dynamique = dossier <code>[slug]</code>, lu via <code>params</code>',
    ],
  }),
  template({
    id: 'ADV-F-1109-TEMPLATE',
    slug: 'next-js-introduction',
    title: 'Next.js (App Router)',
    shortTitle: 'Next.js',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Les briques de base Next.js prêtes à copier : une page, un layout, et un Client Component.',
    lede: 'Démarrer avec l’App Router. Choisis la brique :',
    aliases: ['next', 'nextjs', 'app router', 'page', 'layout', 'use client'],
    keywords: ['page', 'layout', 'server component', 'client component'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1109-LESSON',
    variants: [
      {
        id: 'page',
        label: 'Une page',
        description: 'Le composant affiché pour une route.',
        codeBlocks: [
          {
            id: 'ADV-F-1109-t-v1',
            filename: 'app/about/page.tsx',
            language: 'tsx',
            code: `export default function AboutPage() {
  return (
    <main>
      <h1>A propos</h1>
      <p>Bienvenue sur la page a propos.</p>
    </main>
  );
}`,
          },
        ],
        replacements: [
          { token: 'about', description: 'le nom du dossier = le chemin de l’URL' },
          { token: 'AboutPage', description: 'le nom de ton composant de page' },
        ],
        placement: 'Un fichier page.tsx dans un dossier de app/. Toujours exporté par défaut.',
      },
      {
        id: 'layout',
        label: 'Un layout',
        description: 'L’habillage commun (header, footer) partagé par les pages.',
        codeBlocks: [
          {
            id: 'ADV-F-1109-t-v2',
            filename: 'app/layout.tsx',
            language: 'tsx',
            code: `export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <header>Mon site</header>
        {children}
        <footer>2026</footer>
      </body>
    </html>
  );
}`,
          },
        ],
        replacements: [
          { token: 'header / footer', description: 'les éléments communs à toutes les pages' },
          { token: 'children', description: 'l’emplacement où s’insère chaque page' },
        ],
        placement: 'app/layout.tsx enveloppe toutes les pages. children reçoit la page courante.',
      },
      {
        id: 'client',
        label: 'Client Component',
        description: 'Un composant interactif (state, événements).',
        codeBlocks: [
          {
            id: 'ADV-F-1109-t-v3',
            filename: 'app/Bouton.tsx',
            language: 'tsx',
            code: `"use client";

import { useState } from "react";

export default function Bouton() {
  const [actif, setActif] = useState(false);
  return (
    <button onClick={() => setActif(!actif)}>
      {actif ? "Actif" : "Inactif"}
    </button>
  );
}`,
          },
        ],
        replacements: [
          { token: 'actif', description: 'ton state local' },
          { token: 'Bouton', description: 'le nom de ton composant interactif' },
        ],
        placement: 'Dès que tu as besoin de useState, useEffect ou onClick : "use client" en première ligne.',
      },
    ],
  }),

  // ————— L'accessibilité : a11y —————
  lesson({
    id: 'ADV-F-1110-LESSON',
    slug: 'l-accessibilite-a11y',
    title: 'L’accessibilité : a11y',
    shortTitle: 'a11y',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Rendre une interface utilisable par tout le monde, y compris au clavier et au lecteur d’écran : HTML sémantique, labels, alt et attributs ARIA.',
    utility: 'Construire des interfaces utilisables au clavier et par les lecteurs d’écran.',
    aliases: ['accessibilite', 'a11y', 'aria', 'lecteur ecran', 'clavier', 'label', 'alt'],
    keywords: [
      'accessible a tous',
      'lecteur d ecran',
      'navigation clavier',
      'texte alternatif',
      'aria label',
      'html semantique',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1110-TEMPLATE',
    intro:
      'L’<b>accessibilité</b> (abrégée <b>a11y</b> : « a » + 11 lettres + « y ») rend ton interface utilisable par <b>tout le monde</b>, y compris les personnes qui naviguent au clavier ou avec un lecteur d’écran. La base : du <b>HTML sémantique</b>, des <b>labels</b>, des <b>alt</b>, et de l’ARIA seulement en dernier recours.',
    sections: [
      {
        id: 's1',
        title: 'La bonne balise avant tout',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux un <b>« bouton » cliquable qui marche aussi au clavier</b> et que le lecteur d’écran annonce comme un bouton — sans code en plus.',
          },
          {
            type: 'paragraph',
            html: 'Le réflexe numéro un : utiliser la <b>vraie balise</b>. Un <code>&lt;button&gt;</code> est focusable, activable avec Entrée/Espace et annoncé comme un bouton, gratuitement. Un <code>&lt;div onClick&gt;</code> n’a rien de tout ça.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1110-l-c1',
              filename: 'Bouton.tsx',
              language: 'tsx',
              code: `// Mauvais : invisible au clavier et au lecteur d'ecran
<div onClick={valider}>Valider</div>

// Bon : focusable, activable au clavier, annonce "bouton"
<button onClick={valider}>Valider</button>

// Un vrai lien pour naviguer, un vrai bouton pour agir
<a href="/panier">Voir le panier</a>`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle d’or :</b> une action → <code>&lt;button&gt;</code> ; une navigation → <code>&lt;a href&gt;</code>. Le HTML sémantique fait 80 % de l’accessibilité tout seul.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Labels, alt et champs de formulaire',
        blocks: [
          {
            type: 'paragraph',
            html: 'Chaque champ a besoin d’un <b>label associé</b> (via <code>htmlFor</code> qui pointe l’<code>id</code>), et chaque image d’un <b>texte alternatif</b> <code>alt</code>. Une image décorative reçoit un <code>alt=""</code> vide pour être ignorée.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1110-l-c2',
              filename: 'Formulaire.tsx',
              language: 'tsx',
              code: `// Label relie au champ par htmlFor / id
<label htmlFor="email">Adresse e-mail</label>
<input id="email" type="email" />

// alt decrit l'image pour le lecteur d'ecran
<img src="/logo.png" alt="Logo de la boutique" />

// Image purement decorative : alt vide (ignoree)
<img src="/vague.svg" alt="" />`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le <code>alt</code> est la <b>description audio</b> d’un film pour une personne qui ne voit pas l’écran. « Logo de la boutique » est utile ; « image123.png » ne sert à rien.',
          },
        ],
      },
      {
        id: 's3',
        title: 'ARIA : le complément, pas le remplaçant',
        blocks: [
          {
            type: 'paragraph',
            html: 'Quand aucune balise native ne suffit (icône seule, état dynamique), les attributs <b>ARIA</b> ajoutent l’information manquante. <code>aria-label</code> donne un nom, <code>aria-expanded</code> annonce ouvert/fermé, <code>aria-hidden</code> masque au lecteur.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1110-l-c3',
              filename: 'Menu.tsx',
              language: 'tsx',
              code: `// Bouton avec juste une icone : on lui donne un nom
<button aria-label="Fermer la fenetre">X</button>

// Etat annonce : ouvert ou ferme
<button aria-expanded={ouvert} onClick={basculer}>
  Menu
</button>

// Icone decorative masquee au lecteur d'ecran
<span aria-hidden="true">*</span>`,
            },
          },
          {
            type: 'table',
            headers: ['Attribut', 'Rôle'],
            rows: [
              ['<code>aria-label</code>', 'donne un nom accessible (icône seule)'],
              ['<code>aria-expanded</code>', 'annonce ouvert / fermé'],
              ['<code>aria-hidden</code>', 'masque un élément au lecteur d’écran'],
              ['<code>role</code>', 'précise le rôle si la balise ne suffit pas'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Remplacer un <code>&lt;button&gt;</code> par un <code>&lt;div onClick&gt;</code> : plus de focus clavier ni d’annonce. Utilise la vraie balise.',
      'Un <code>&lt;input&gt;</code> sans <code>&lt;label&gt;</code> associé : le lecteur d’écran ne sait pas à quoi sert le champ.',
      'Abuser d’ARIA pour compenser du mauvais HTML : « no ARIA is better than bad ARIA ». D’abord la bonne balise, ARIA ensuite.',
    ],
    takeaways: [
      'HTML sémantique d’abord : <code>&lt;button&gt;</code> pour agir, <code>&lt;a href&gt;</code> pour naviguer',
      'chaque champ un <code>&lt;label htmlFor&gt;</code>, chaque image un <code>alt</code> (vide si décorative)',
      'ARIA en complément : <code>aria-label</code>, <code>aria-expanded</code>, <code>aria-hidden</code>',
      'teste au clavier seul (Tab, Entrée) : si ça marche, c’est déjà solide',
    ],
  }),
  template({
    id: 'ADV-F-1110-TEMPLATE',
    slug: 'l-accessibilite-a11y',
    title: 'Accessibilité (a11y)',
    shortTitle: 'a11y',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Les patterns d’accessibilité prêts à copier : label de champ, image alt, et bouton-icône ARIA.',
    lede: 'Rendre l’interface accessible. Choisis le cas :',
    aliases: ['accessibilite', 'a11y', 'label', 'alt', 'aria'],
    keywords: ['label', 'alt', 'aria-label', 'clavier'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1110-LESSON',
    variants: [
      {
        id: 'champ',
        label: 'Champ + label',
        description: 'Un champ de formulaire correctement étiqueté.',
        codeBlocks: [
          {
            id: 'ADV-F-1110-t-v1',
            filename: 'Champ.tsx',
            language: 'tsx',
            code: `<label htmlFor="nom">Nom complet</label>
<input id="nom" name="nom" type="text" />`,
          },
        ],
        replacements: [
          { token: 'nom', description: 'l’id du champ, repris dans htmlFor (doit correspondre)' },
          { token: 'Nom complet', description: 'le texte du label' },
        ],
        placement: 'htmlFor du label = id de l’input. C’est ce lien qui rend le champ accessible.',
      },
      {
        id: 'image',
        label: 'Image + alt',
        description: 'Texte alternatif informatif ou décoratif.',
        codeBlocks: [
          {
            id: 'ADV-F-1110-t-v2',
            filename: 'Image.tsx',
            language: 'tsx',
            code: `// Image porteuse de sens : alt descriptif
<img src="/produit.jpg" alt="Chaussure de running bleue" />

// Image decorative : alt vide pour l'ignorer
<img src="/deco.svg" alt="" />`,
          },
        ],
        replacements: [
          { token: 'Chaussure de running bleue', description: 'la description utile de l’image' },
        ],
        placement: 'alt descriptif si l’image apporte de l’info, alt="" si elle est purement décorative.',
      },
      {
        id: 'bouton-icone',
        label: 'Bouton-icône ARIA',
        description: 'Un bouton sans texte visible, nommé pour le lecteur d’écran.',
        codeBlocks: [
          {
            id: 'ADV-F-1110-t-v3',
            filename: 'BoutonIcone.tsx',
            language: 'tsx',
            code: `<button aria-label="Rechercher" onClick={rechercher}>
  <span aria-hidden="true">O</span>
</button>`,
          },
        ],
        replacements: [
          { token: 'Rechercher', description: 'le nom accessible annoncé par le lecteur d’écran' },
          { token: 'rechercher', description: 'la fonction déclenchée au clic' },
        ],
        placement: 'aria-label nomme le bouton, aria-hidden masque l’icône décorative au lecteur.',
      },
    ],
  }),

  // ————— Optimiser les performances React —————
  lesson({
    id: 'ADV-F-1111-LESSON',
    slug: 'optimiser-les-performances-react',
    title: 'Optimiser les performances React',
    shortTitle: 'Perfs React',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Réduire les rendus inutiles avec memo, useMemo et useCallback — après avoir mesuré, sans optimiser à l’aveugle.',
    utility: 'Éviter les rendus et calculs inutiles pour une app React plus fluide.',
    aliases: ['performance', 'perf', 'memo', 'usememo', 'usecallback', 'optimisation', 'rerender'],
    keywords: [
      'eviter les rerenders',
      'memoriser un calcul',
      'app qui rame',
      'liste lente',
      'stabiliser une fonction',
      'react memo',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1111-TEMPLATE',
    intro:
      'React re-rend un composant à chaque changement de state ou de props. La plupart du temps c’est rapide. Quand ça rame, trois outils ciblent le gaspillage : <code>memo</code> (éviter un re-rendu), <code>useMemo</code> (mémoriser un calcul), <code>useCallback</code> (stabiliser une fonction). <b>On mesure d’abord</b>, on optimise ensuite.',
    sections: [
      {
        id: 's1',
        title: 'memo : éviter un re-rendu',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux qu’un <b>gros composant enfant arrête de se re-rendre quand ses props n’ont pas changé</b>, alors que le parent, lui, se met à jour souvent.',
          },
          {
            type: 'paragraph',
            html: '<code>memo</code> enveloppe un composant : React <b>saute</b> son re-rendu si ses <b>props sont identiques</b> au rendu précédent. Idéal pour un enfant coûteux dont le parent change pour d’autres raisons.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1111-l-c1',
              filename: 'Liste.tsx',
              language: 'tsx',
              code: `import { memo } from "react";

// Sans memo : re-rendu a chaque rendu du parent
function ListeBase({ items }) {
  return <ul>{items.map((i) => <li key={i.id}>{i.nom}</li>)}</ul>;
}

// Avec memo : re-rendu SEULEMENT si "items" change
export const Liste = memo(ListeBase);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>memo</code> compare les props en <b>surface</b>. Si tu passes un nouvel objet/fonction à chaque rendu, la comparaison échoue toujours — d’où <code>useMemo</code> et <code>useCallback</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'useMemo : mémoriser un calcul',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>useMemo</code> garde en mémoire le <b>résultat d’un calcul coûteux</b> et ne le refait que si ses <b>dépendances</b> changent. Entre-temps, il renvoie la valeur mémorisée.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1111-l-c2',
              filename: 'Tableau.tsx',
              language: 'tsx',
              code: `import { useMemo } from "react";

function Tableau({ produits, tri }) {
  // Le tri ne se refait que si produits OU tri change
  const tries = useMemo(() => {
    return [...produits].sort((a, b) => a[tri] - b[tri]);
  }, [produits, tri]); // <- tableau de dependances

  return <ul>{tries.map((p) => <li key={p.id}>{p.nom}</li>)}</ul>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>useMemo</code> = une <b>note collée sur le frigo</b> avec le résultat d’un long calcul. Tant que les ingrédients ne changent pas, tu relis la note au lieu de tout recalculer.',
          },
        ],
      },
      {
        id: 's3',
        title: 'useCallback : stabiliser une fonction',
        blocks: [
          {
            type: 'paragraph',
            html: 'À chaque rendu, une fonction déclarée dans le composant est <b>recréée</b> (nouvelle référence). Si tu la passes à un enfant <code>memo</code>, tu casses sa mémorisation. <code>useCallback</code> garde la <b>même référence</b> tant que ses dépendances ne bougent pas.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1111-l-c3',
              filename: 'Parent.tsx',
              language: 'tsx',
              code: `import { useCallback, useState } from "react";
import { Liste } from "./Liste";

function Parent({ items }) {
  const [n, setN] = useState(0);

  // Meme reference tant que rien ne change dans []
  const gererClic = useCallback((id) => {
    console.log("clic sur", id);
  }, []);

  return (
    <>
      <button onClick={() => setN(n + 1)}>{n}</button>
      <Liste items={items} onClic={gererClic} />
    </>
  );
}`,
            },
          },
          {
            type: 'table',
            headers: ['Outil', 'Mémorise…', 'Quand'],
            rows: [
              ['<code>memo</code>', 'un composant', 'enfant coûteux, props stables'],
              ['<code>useMemo</code>', 'une valeur calculée', 'calcul lourd répété'],
              ['<code>useCallback</code>', 'une fonction', 'fonction passée à un enfant <code>memo</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Optimiser sans mesurer : <code>memo</code>/<code>useMemo</code> partout ajoute de la complexité pour rien. Profile d’abord (React DevTools).',
      'Oublier le <b>tableau de dépendances</b> de <code>useMemo</code>/<code>useCallback</code> : sans lui, la mémorisation ne sert à rien.',
      'Mémoriser un calcul trivial : <code>useMemo(() => a + b, [a, b])</code> coûte plus cher que l’addition elle-même.',
    ],
    takeaways: [
      'mesure d’abord (React DevTools Profiler), optimise ensuite',
      '<code>memo</code> = saute le re-rendu d’un composant aux props stables',
      '<code>useMemo</code> = mémorise une <b>valeur</b> · <code>useCallback</code> = mémorise une <b>fonction</b>',
      'toujours renseigner le tableau de dépendances <code>[…]</code>',
    ],
  }),
  template({
    id: 'ADV-F-1111-TEMPLATE',
    slug: 'optimiser-les-performances-react',
    title: 'Performances React',
    shortTitle: 'Perfs React',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Les outils de perf React prêts à copier : memo, useMemo et useCallback.',
    lede: 'Réduire les rendus inutiles. Choisis l’outil :',
    aliases: ['memo', 'usememo', 'usecallback', 'performance'],
    keywords: ['rerender', 'memoriser', 'dependances'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1111-LESSON',
    variants: [
      {
        id: 'memo',
        label: 'memo',
        description: 'Empêcher le re-rendu d’un composant aux props inchangées.',
        codeBlocks: [
          {
            id: 'ADV-F-1111-t-v1',
            filename: 'Enfant.jsx',
            language: 'jsx',
            code: `import { memo } from "react";

function EnfantBase({ valeur }) {
  return <p>{valeur}</p>;
}

export const Enfant = memo(EnfantBase);`,
          },
        ],
        replacements: [
          { token: 'EnfantBase', description: 'ton composant d’origine' },
          { token: 'valeur', description: 'les props surveillées pour décider du re-rendu' },
        ],
        placement: 'Autour d’un composant coûteux dont les props changent rarement.',
      },
      {
        id: 'usememo',
        label: 'useMemo',
        description: 'Mémoriser le résultat d’un calcul lourd.',
        codeBlocks: [
          {
            id: 'ADV-F-1111-t-v2',
            filename: 'calcul.jsx',
            language: 'jsx',
            code: `import { useMemo } from "react";

const resultat = useMemo(() => {
  return calculLourd(donnees);
}, [donnees]);`,
          },
        ],
        replacements: [
          { token: 'calculLourd(donnees)', description: 'le calcul coûteux à mémoriser' },
          { token: '[donnees]', description: 'les dépendances : on recalcule seulement si elles changent' },
        ],
        placement: 'Dans le composant, avant le return. Réservé aux calculs réellement lourds.',
      },
      {
        id: 'usecallback',
        label: 'useCallback',
        description: 'Garder une fonction stable entre les rendus.',
        codeBlocks: [
          {
            id: 'ADV-F-1111-t-v3',
            filename: 'handler.jsx',
            language: 'jsx',
            code: `import { useCallback } from "react";

const gererClic = useCallback((id) => {
  faireAction(id);
}, []);`,
          },
        ],
        replacements: [
          { token: 'gererClic', description: 'le nom de ta fonction stabilisée' },
          { token: '[]', description: 'les dépendances (vide = référence figée)' },
        ],
        placement: 'Quand tu passes une fonction à un enfant memo, pour ne pas casser sa mémorisation.',
      },
    ],
  }),

  // ————— Les bonnes pratiques et le clean code —————
  lesson({
    id: 'ADV-F-1112-LESSON',
    slug: 'les-bonnes-pratiques-et-le-clean-code',
    title: 'Les bonnes pratiques et le clean code',
    shortTitle: 'Clean code',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Écrire du code lisible et durable : noms parlants, fonctions courtes à responsabilité unique, sortie anticipée et suppression des répétitions.',
    utility: 'Rendre son code lisible, maintenable et facile à relire en équipe.',
    aliases: ['clean code', 'bonnes pratiques', 'lisibilite', 'refactoring', 'dry', 'nommage'],
    keywords: [
      'code lisible',
      'nommer une variable',
      'fonction courte',
      'eviter les repetitions',
      'early return',
      'responsabilite unique',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1112-TEMPLATE',
    intro:
      'Le <b>clean code</b>, c’est du code qu’une autre personne (ou toi dans six mois) comprend <b>sans effort</b>. Quelques principes portent l’essentiel : des <b>noms parlants</b>, des <b>fonctions courtes</b> qui font une seule chose, la <b>sortie anticipée</b>, et pas de <b>répétition</b> (DRY).',
    sections: [
      {
        id: 's1',
        title: 'Des noms qui parlent',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux qu’un collègue <b>comprenne ma fonction rien qu’à son nom et ses variables</b>, sans lire les commentaires ni me demander « c’est quoi <code>d</code> ? ».',
          },
          {
            type: 'paragraph',
            html: 'Un bon nom <b>dit l’intention</b>. Les booléens commencent par <code>est</code>/<code>a</code>/<code>peut</code>, les fonctions par un <b>verbe</b>. Le code se lit alors comme une phrase.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1112-l-c1',
              filename: 'nommage.ts',
              language: 'typescript',
              code: `// Illisible : que representent d, x, tmp ?
const d = 7;
const x = u.filter((i) => i.a);

// Clair : le nom porte l'intention
const delaiLivraisonJours = 7;
const utilisateursActifs = utilisateurs.filter((u) => u.estActif);

// Fonction = un verbe d'action
function calculerTotalPanier(articles) { /* ... */ }`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> booléen → <code>estActif</code>, <code>aAccepte</code>, <code>peutModifier</code>. Fonction → <code>calculer…</code>, <code>envoyer…</code>, <code>valider…</code>. Un nom explicite vaut mieux qu’un commentaire.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Une fonction = une responsabilité',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une fonction qui valide, calcule <b>et</b> enregistre est difficile à relire et à tester. Découpe-la : chaque fonction fait <b>une seule chose</b>, et son nom le dit.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1112-l-c2',
              filename: 'responsabilite.ts',
              language: 'typescript',
              code: `// Trop de casquettes : dur a lire et a tester
function traiter(commande) {
  // valide... calcule... enregistre... envoie un mail...
}

// Une chose chacune : lisible et testable
function validerCommande(commande) { /* ... */ }
function calculerTotal(commande) { /* ... */ }
function enregistrerCommande(commande) { /* ... */ }

// La fonction chef d'orchestre reste courte
function traiterCommande(commande) {
  validerCommande(commande);
  const total = calculerTotal(commande);
  enregistrerCommande(commande);
  return total;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une fonction = un <b>outil</b>. Un tournevis fait une chose, très bien. Un couteau suisse qui tente tout est plus dur à saisir. Préfère plusieurs outils simples.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Early return et DRY',
        blocks: [
          {
            type: 'paragraph',
            html: 'La <b>sortie anticipée</b> (early return) traite les cas particuliers d’abord et évite les <code>if</code> imbriqués. Et le principe <b>DRY</b> (Don’t Repeat Yourself) : une logique dupliquée devient une fonction réutilisable.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1112-l-c3',
              filename: 'early-return.ts',
              language: 'typescript',
              code: `// Imbrique : la logique se perd dans les if
function prix(user) {
  if (user) {
    if (user.estPremium) {
      return 0;
    } else {
      return 10;
    }
  }
  return null;
}

// Early return : on sort tot, code a plat
function prixClair(user) {
  if (!user) return null;       // cas limite d'abord
  if (user.estPremium) return 0;
  return 10;
}`,
            },
          },
          {
            type: 'table',
            headers: ['Principe', 'Idée'],
            rows: [
              ['Noms parlants', 'le nom dit l’intention'],
              ['Responsabilité unique', 'une fonction = une chose'],
              ['Early return', 'traiter les cas limites d’abord'],
              ['DRY', 'ne pas répéter la même logique'],
              ['KISS', 'la solution la plus simple qui marche'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Noms abrégés (<code>d</code>, <code>tmp</code>, <code>data2</code>) : personne ne devine leur sens. Nomme l’intention.',
      'Commenter du code obscur au lieu de le clarifier : un bon nom remplace la plupart des commentaires.',
      'Optimiser ou généraliser trop tôt (over-engineering) : commence simple (KISS), refactorise quand le besoin réel apparaît.',
    ],
    takeaways: [
      'noms parlants : booléen <code>estActif</code>, fonction = verbe',
      'une fonction = <b>une</b> responsabilité, courte et testable',
      'early return : cas limites d’abord, moins de <code>if</code> imbriqués',
      'DRY (pas de répétition) + KISS (rester simple) avant tout',
    ],
  }),
  template({
    id: 'ADV-F-1112-TEMPLATE',
    slug: 'les-bonnes-pratiques-et-le-clean-code',
    title: 'Clean code',
    shortTitle: 'Clean code',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Des refactors clean code prêts à copier : nommage, responsabilité unique, early return.',
    lede: 'Nettoyer son code. Choisis le principe :',
    aliases: ['clean code', 'refactoring', 'nommage', 'early return', 'dry'],
    keywords: ['lisibilite', 'fonction courte', 'responsabilite'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1112-LESSON',
    variants: [
      {
        id: 'nommage',
        label: 'Nommage',
        description: 'Remplacer un nom vague par un nom parlant.',
        codeBlocks: [
          {
            id: 'ADV-F-1112-t-v1',
            filename: 'avant-apres.js',
            language: 'javascript',
            code: `// Avant : illisible
const l = p.filter((i) => i.q > 0);

// Apres : le nom dit tout
const articlesDisponibles = produits.filter((p) => p.quantite > 0);`,
          },
        ],
        replacements: [
          { token: 'articlesDisponibles', description: 'un nom qui décrit le contenu' },
          { token: 'quantite', description: 'des propriétés lisibles plutôt que des lettres' },
        ],
        placement: 'Partout : dès qu’un nom demande une explication, renomme-le.',
      },
      {
        id: 'responsabilite',
        label: 'Responsabilité unique',
        description: 'Découper une grosse fonction en petites fonctions.',
        codeBlocks: [
          {
            id: 'ADV-F-1112-t-v2',
            filename: 'decoupe.js',
            language: 'javascript',
            code: `function traiterCommande(commande) {
  validerCommande(commande);
  const total = calculerTotal(commande);
  enregistrerCommande(commande, total);
  return total;
}`,
          },
        ],
        replacements: [
          { token: 'traiterCommande', description: 'la fonction chef d’orchestre, qui reste courte' },
          {
            token: 'validerCommande / calculerTotal / enregistrerCommande',
            description: 'une sous-fonction par responsabilité',
          },
        ],
        placement: 'Quand une fonction fait plusieurs choses : extrais chaque étape dans sa propre fonction.',
      },
      {
        id: 'early-return',
        label: 'Early return',
        description: 'Aplatir les if imbriqués en sortant tôt.',
        codeBlocks: [
          {
            id: 'ADV-F-1112-t-v3',
            filename: 'early.js',
            language: 'javascript',
            code: `function accesAutorise(user) {
  if (!user) return false;        // cas limite d'abord
  if (!user.estActif) return false;
  return user.role === "admin";
}`,
          },
        ],
        replacements: [
          { token: 'accesAutorise', description: 'ta fonction de vérification' },
          { token: '!user / !user.estActif', description: 'les cas limites traités en premier' },
        ],
        placement: 'Traite les cas d’exclusion en haut avec return, garde le cas nominal à plat en bas.',
      },
    ],
  }),

  // ————— Docker : introduction —————
  lesson({
    id: 'ADV-F-1113-LESSON',
    slug: 'docker-introduction',
    title: 'Docker : introduction',
    shortTitle: 'Docker',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Emballer une app et son environnement dans un conteneur reproductible : image, conteneur, Dockerfile et docker-compose.',
    utility: 'Comprendre les conteneurs Docker et packager une app pour qu’elle tourne partout pareil.',
    aliases: ['docker', 'conteneur', 'container', 'image', 'dockerfile', 'docker-compose'],
    keywords: [
      'ca marche chez moi',
      'environnement reproductible',
      'conteneur',
      'image docker',
      'dockerfile',
      'docker compose',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1113-TEMPLATE',
    intro:
      'Docker emballe une app <b>avec tout son environnement</b> (Node, dépendances, config) dans un <b>conteneur</b> qui tourne à l’identique sur n’importe quelle machine. Fini le « ça marche chez moi ». Deux notions clés : l’<b>image</b> (le modèle) et le <b>conteneur</b> (une instance qui tourne).',
    sections: [
      {
        id: 's1',
        title: 'Image vs conteneur',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une <b>image</b> est un modèle figé et réutilisable (ton app + son environnement). Un <b>conteneur</b> est une <b>instance en cours d’exécution</b> de cette image. Une image → autant de conteneurs que tu veux.',
          },
          {
            type: 'table',
            headers: ['Terme', 'Ce que c’est'],
            rows: [
              ['<code>image</code>', 'le modèle figé (app + environnement)'],
              ['<code>conteneur</code>', 'une instance qui tourne, à partir d’une image'],
              ['<code>Dockerfile</code>', 'la recette pour construire l’image'],
              ['<code>docker-compose</code>', 'lancer plusieurs conteneurs ensemble'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une <b>image</b> Docker = le moule à gaufres. Le <b>conteneur</b> = la gaufre qui en sort. Avec un seul moule, tu produis autant de gaufres identiques que tu veux.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Écrire un Dockerfile',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>empaqueter mon app Node pour qu’elle démarre pareil chez moi, chez un collègue et en production</b>, sans installer Node à la main partout.',
          },
          {
            type: 'paragraph',
            html: 'Le <b>Dockerfile</b> est la recette de l’image, étape par étape : partir d’une base, copier le code, installer les dépendances, lancer l’app. Chaque instruction crée une couche mise en cache.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1113-l-c1',
              filename: 'Dockerfile',
              language: 'text',
              code: `# 1. Partir d'une image de base avec Node
FROM node:20

# 2. Dossier de travail dans le conteneur
WORKDIR /app

# 3. Copier d'abord les manifestes (cache des deps)
COPY package.json package-lock.json ./
RUN npm install

# 4. Copier le reste du code
COPY . .

# 5. Port expose par l'app
EXPOSE 3000

# 6. Commande de demarrage
CMD ["npm", "start"]`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce cache :</b> copie <code>package.json</code> et lance <code>npm install</code> <b>avant</b> de copier tout le code. Tant que les dépendances ne changent pas, Docker réutilise le cache — builds bien plus rapides.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Construire et lancer',
        blocks: [
          {
            type: 'paragraph',
            html: 'On <b>construit</b> l’image avec <code>docker build</code>, puis on <b>lance</b> un conteneur avec <code>docker run</code>. L’option <code>-p</code> relie un port de ta machine à celui du conteneur.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1113-l-c2',
              filename: 'terminal.sh',
              language: 'bash',
              code: `# Construire l'image (le point = dossier courant)
docker build -t mon-app .

# Lancer un conteneur nomme, port 3000 machine -> 3000 conteneur
docker run --name mon-app -p 3000:3000 mon-app

# Voir les conteneurs qui tournent
docker ps

# Arreter le conteneur par son nom
docker stop mon-app`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Option <code>-p</code> :</b> elle s’écrit <code>-p hote:conteneur</code>. <code>-p 3000:3000</code> = le port 3000 de ta machine pointe vers le port 3000 dans le conteneur.',
          },
        ],
      },
      {
        id: 's4',
        title: 'Plusieurs services : docker-compose',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une vraie app a souvent plusieurs services (l’app <b>+</b> une base de données). <code>docker-compose</code> les décrit dans un seul fichier YAML et les lance ensemble avec <code>docker compose up</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1113-l-c3',
              filename: 'docker-compose.yml',
              language: 'text',
              code: `services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>docker-compose</code> est le <b>chef d’orchestre</b>. Au lieu de lancer chaque musicien (app, base, cache) à la main, tu donnes un seul départ et tout joue ensemble.',
          },
        ],
      },
    ],
    pitfalls: [
      'Copier tout le code <b>avant</b> <code>npm install</code> : chaque changement de code invalide le cache des dépendances et ralentit le build.',
      'Oublier <code>-p</code> au <code>docker run</code> : l’app tourne dans le conteneur mais reste injoignable depuis ta machine.',
      'Confondre <b>image</b> (le modèle figé) et <b>conteneur</b> (l’instance qui tourne) : on construit une image, on lance un conteneur.',
    ],
    takeaways: [
      'image = modèle figé · conteneur = instance qui tourne',
      '<code>Dockerfile</code> = la recette (FROM, COPY, RUN, CMD)',
      'build puis run : <code>docker build -t nom .</code> → <code>docker run -p 3000:3000 nom</code>',
      'plusieurs services ensemble = <code>docker-compose</code> + <code>docker compose up</code>',
    ],
  }),
  template({
    id: 'ADV-F-1113-TEMPLATE',
    slug: 'docker-introduction',
    title: 'Docker',
    shortTitle: 'Docker',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Les fichiers Docker prêts à copier : Dockerfile Node, commandes de base, docker-compose.',
    lede: 'Conteneuriser une app. Choisis la brique :',
    aliases: ['docker', 'dockerfile', 'docker-compose', 'conteneur'],
    keywords: ['dockerfile', 'build', 'run', 'compose'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1113-LESSON',
    variants: [
      {
        id: 'dockerfile',
        label: 'Dockerfile (Node)',
        description: 'La recette pour construire l’image d’une app Node.',
        codeBlocks: [
          {
            id: 'ADV-F-1113-t-v1',
            filename: 'Dockerfile',
            language: 'text',
            code: `FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
          },
        ],
        replacements: [
          { token: 'node:20', description: 'l’image de base (version de Node)' },
          { token: '3000', description: 'le port exposé par ton app' },
          { token: 'npm start', description: 'la commande de démarrage' },
        ],
        placement: 'À la racine du projet, nommé exactement Dockerfile (sans extension).',
      },
      {
        id: 'commandes',
        label: 'Build + run',
        description: 'Construire l’image puis lancer un conteneur.',
        codeBlocks: [
          {
            id: 'ADV-F-1113-t-v2',
            filename: 'terminal.sh',
            language: 'bash',
            code: `# Construire l'image
docker build -t mon-app .

# Lancer un conteneur (port hote:conteneur)
docker run -p 3000:3000 mon-app`,
          },
        ],
        replacements: [
          { token: 'mon-app', description: 'le nom que tu donnes à ton image' },
          { token: '3000:3000', description: 'port de ta machine : port dans le conteneur' },
        ],
        placement: 'Depuis le dossier qui contient le Dockerfile (le point = dossier courant).',
      },
      {
        id: 'compose',
        label: 'docker-compose',
        description: 'Lancer plusieurs services d’un coup (app + base).',
        codeBlocks: [
          {
            id: 'ADV-F-1113-t-v3',
            filename: 'docker-compose.yml',
            language: 'text',
            code: `services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret`,
          },
        ],
        replacements: [
          { token: 'app / db', description: 'les noms de tes services' },
          { token: 'postgres:16', description: 'l’image du service de base de données' },
          { token: 'secret', description: 'le mot de passe (via variable d’environnement)' },
        ],
        placement: 'À la racine du projet. Lance tout avec docker compose up.',
      },
    ],
  }),
];
