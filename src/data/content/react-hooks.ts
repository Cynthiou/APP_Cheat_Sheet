import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const reactHooksContent: ReadyContent[] = [
  // ————— useRef —————
  lesson({
    id: 'REACT-F-16100-LESSON',
    slug: 'useref',
    title: 'useRef',
    shortTitle: 'useRef',
    technology: 'react',
    tomeId: 't6',
    summary:
      'Garder une valeur entre deux rendus SANS déclencher de re-rendu, ou pointer directement vers un élément du DOM.',
    utility:
      'Mémoriser une valeur qui survit aux rendus sans rafraîchir l’écran, ou attraper un élément HTML réel.',
    aliases: ['use ref', 'ref', 'reference', 'useref react', 'dom', 'input focus'],
    keywords: [
      'pointer vers un input',
      'donner le focus',
      'valeur qui persiste',
      'sans re-rendu',
      'current',
      'garder un timer',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-16100-TEMPLATE',
    intro:
      'Le hook <b>useRef</b> crée une <b>boîte persistante</b> qui garde sa valeur entre les rendus. On accède au contenu via <code>.current</code>. Deux usages : <b>pointer vers un élément du DOM</b> (donner le focus, mesurer…) ou <b>stocker une valeur</b> qui ne doit pas provoquer de re-rendu.',
    sections: [
      {
        id: 's1',
        title: 'Attraper un élément du DOM',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>mettre le curseur automatiquement dans un champ de recherche</b> dès que la page s’affiche, sans que l’utilisateur ait à cliquer dessus.',
          },
          {
            type: 'paragraph',
            html: 'On crée une ref, on la branche sur la balise avec l’attribut <code>ref</code>, puis on lit l’élément réel via <code>.current</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-16100-l-c1',
              filename: 'Recherche.tsx',
              language: 'tsx',
              code: `import { useRef, useEffect } from "react";

function Recherche() {
  // 1. Je cree une ref vide (elle pointera vers l'input)
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. Au montage, je donne le focus a l'input reel
  useEffect(() => {
    inputRef.current?.focus(); // .current = l'element du DOM
  }, []);

  // 3. Je branche la ref sur la balise avec ref={...}
  return <input ref={inputRef} placeholder="Rechercher" />;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une ref, c’est une <b>étiquette collée</b> sur un élément. React remplit <code>.current</code> avec l’élément réel une fois affiché — comme un post-it qui te dit « le voici ».',
          },
        ],
      },
      {
        id: 's2',
        title: 'Stocker une valeur sans re-rendu',
        blocks: [
          {
            type: 'paragraph',
            html: 'Contrairement à <code>useState</code>, modifier <code>.current</code> <b>ne redéclenche pas</b> l’affichage. Parfait pour garder l’identifiant d’un <code>setInterval</code>, une valeur précédente, un compteur interne…',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-16100-l-c2',
              filename: 'Chrono.tsx',
              language: 'tsx',
              code: `import { useRef } from "react";

function Chrono() {
  // Je garde l'id du timer dans une ref : il survit aux rendus
  const timerRef = useRef<number | null>(null);

  const demarrer = () => {
    // Je stocke l'id retourne par setInterval
    timerRef.current = window.setInterval(() => {
      console.log("tic");
    }, 1000);
  };

  const arreter = () => {
    // Je relis l'id pour arreter le bon timer
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return <button onClick={demarrer}>Go</button>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle :</b> si la valeur doit s’<b>afficher</b> à l’écran → <code>useState</code>. Si c’est une valeur <b>de coulisses</b> (timer, élément DOM) → <code>useRef</code>.',
          },
        ],
      },
      {
        id: 's3',
        title: 'useRef vs useState',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les deux gardent une valeur entre les rendus. La différence : <b>l’un rafraîchit l’écran, l’autre non</b>.',
          },
          {
            type: 'table',
            headers: ['', 'useState', 'useRef'],
            rows: [
              ['Déclenche un re-rendu ?', 'oui', 'non'],
              ['Accès à la valeur', 'directement', 'via <code>.current</code>'],
              ['Survit aux rendus ?', 'oui', 'oui'],
              ['À utiliser pour', 'une valeur affichée', 'un élément DOM, un timer'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Attendre que modifier <code>.current</code> rafraîchisse l’écran : ce n’est jamais le cas. Pour afficher, utilise <code>useState</code>.',
      'Lire <code>inputRef.current</code> pendant le rendu (avant l’affichage) : il vaut encore <code>null</code>. Lis-le dans un <code>useEffect</code> ou un handler.',
      'Oublier le <code>?.</code> (<code>inputRef.current?.focus()</code>) : la ref peut être <code>null</code> au premier passage.',
    ],
    takeaways: [
      '<b>useRef</b> = boîte persistante · on lit/écrit via <code>.current</code>',
      'modifier <code>.current</code> ne déclenche <b>aucun</b> re-rendu',
      'usage 1 : pointer vers un élément DOM (<code>ref={maRef}</code> puis <code>.current</code>)',
      'usage 2 : garder une valeur de coulisses (id de timer, valeur précédente)',
      'valeur affichée → <code>useState</code> · valeur cachée → <code>useRef</code>',
    ],
  }),
  template({
    id: 'REACT-F-16100-TEMPLATE',
    slug: 'useref',
    title: 'useRef',
    shortTitle: 'useRef',
    technology: 'react',
    tomeId: 't6',
    summary: 'Le code useRef prêt à copier : pointer vers le DOM, ou stocker une valeur sans re-rendu.',
    lede: 'Le code prêt à copier. Choisis ton usage :',
    aliases: ['use ref', 'ref', 'current', 'focus input'],
    keywords: ['dom', 'focus', 'timer', 'valeur persistante'],
    relatedContentIds: [],
    lessonId: 'REACT-F-16100-LESSON',
    variants: [
      {
        id: 'dom',
        label: 'Pointer vers le DOM',
        description: 'Attraper un élément HTML réel pour agir dessus (focus, mesure…).',
        codeBlocks: [
          {
            id: 'REACT-F-16100-t-dom',
            filename: 'Champ.tsx',
            language: 'tsx',
            code: `import { useRef, useEffect } from "react";

const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

// dans le return :
<input ref={inputRef} />`,
          },
        ],
        replacements: [
          { token: 'inputRef', description: 'le nom de ta ref' },
          { token: 'HTMLInputElement', description: 'le type de l’élément visé (HTMLDivElement, HTMLButtonElement…)' },
          { token: '.focus()', description: 'l’action à faire sur l’élément réel' },
        ],
        placement: 'À l’intérieur du composant, avant le return. Branche la ref avec ref={...} sur la balise.',
      },
      {
        id: 'valeur',
        label: 'Valeur sans re-rendu',
        description: 'Garder une valeur entre les rendus sans rafraîchir l’écran.',
        codeBlocks: [
          {
            id: 'REACT-F-16100-t-valeur',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `import { useRef } from "react";

const valeurRef = useRef(0);

// Lire :
console.log(valeurRef.current);

// Ecrire (ne re-rend PAS) :
valeurRef.current = valeurRef.current + 1;`,
          },
        ],
        replacements: [
          { token: 'valeurRef', description: 'le nom de ta ref' },
          { token: '0', description: 'la valeur de départ' },
        ],
        placement: 'Pour une donnée de coulisses (compteur interne, valeur précédente) qui ne doit pas rafraîchir l’écran.',
      },
      {
        id: 'timer',
        label: 'Garder un timer',
        description: 'Mémoriser l’id d’un setInterval / setTimeout pour l’arrêter plus tard.',
        codeBlocks: [
          {
            id: 'REACT-F-16100-t-timer',
            filename: 'Timer.tsx',
            language: 'tsx',
            code: `import { useRef } from "react";

const timerRef = useRef<number | null>(null);

const demarrer = () => {
  timerRef.current = window.setInterval(() => {
    console.log("tic");
  }, 1000);
};

const arreter = () => {
  if (timerRef.current) clearInterval(timerRef.current);
};`,
          },
        ],
        replacements: [
          { token: 'timerRef', description: 'le nom de ta ref' },
          { token: '1000', description: 'l’intervalle en millisecondes' },
          { token: 'console.log("tic")', description: 'ce que fait le timer à chaque tour' },
        ],
        placement: 'Stocke l’id dès la création du timer, relis-le pour l’arrêter (pense à clear dans un cleanup).',
      },
    ],
  }),

  // ————— useContext —————
  lesson({
    id: 'REACT-F-16101-LESSON',
    slug: 'usecontext',
    title: 'useContext',
    shortTitle: 'useContext',
    technology: 'react',
    tomeId: 't6',
    summary:
      'Partager une donnée (thème, utilisateur connecté, langue) à tout un arbre de composants sans la passer de props en props.',
    utility:
      'Rendre une donnée accessible partout dans l’app sans la faire descendre manuellement à chaque niveau.',
    aliases: ['use context', 'context', 'contexte', 'provider', 'usecontext react', 'prop drilling'],
    keywords: [
      'partager une donnee',
      'utilisateur connecte',
      'theme global',
      'eviter les props',
      'createcontext',
      'provider',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-16101-TEMPLATE',
    intro:
      'Le hook <b>useContext</b> permet de lire une donnée <b>partagée</b> sans la passer en props à chaque étage. On crée un contexte avec <code>createContext</code>, on l’enveloppe autour de l’app avec un <code>Provider</code>, puis chaque composant le lit avec <code>useContext</code>.',
    sections: [
      {
        id: 's1',
        title: 'Le problème : le prop drilling',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux que <b>l’utilisateur connecté soit accessible dans toute mon app</b> (avatar, menu, page profil…) sans passer <code>user</code> en props à travers 5 composants intermédiaires qui n’en ont pas besoin.',
          },
          {
            type: 'paragraph',
            html: 'Faire descendre une prop d’étage en étage (le <b>prop drilling</b>) devient vite pénible. Le contexte crée un <b>raccourci</b> : la donnée est disponible directement, où qu’on soit dans l’arbre.',
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le contexte, c’est le <b>Wi-Fi</b> de ton app. Au lieu de tirer un câble (une prop) jusqu’à chaque pièce, tu diffuses la donnée : n’importe quel composant s’y connecte quand il en a besoin.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Créer et fournir le contexte',
        blocks: [
          {
            type: 'paragraph',
            html: 'Trois temps : je crée le contexte avec <code>createContext</code>, j’enveloppe mon app dans son <code>Provider</code>, et je passe la donnée dans <code>value</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-16101-l-c1',
              filename: 'UserContext.tsx',
              language: 'tsx',
              code: `import { createContext } from "react";

// 1. Je cree le contexte (avec une valeur par defaut)
export const UserContext = createContext<string | null>(null);

function App() {
  const user = "Alice";

  // 2. J'enveloppe l'app dans le Provider
  //    et je diffuse la donnee via value
  return (
    <UserContext.Provider value={user}>
      <Page />
    </UserContext.Provider>
  );
}`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'Lire le contexte avec useContext',
        blocks: [
          {
            type: 'paragraph',
            html: 'Depuis <b>n’importe quel composant</b> à l’intérieur du Provider, on lit la donnée d’une seule ligne — aucune prop à passer.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-16101-l-c2',
              filename: 'Avatar.tsx',
              language: 'tsx',
              code: `import { useContext } from "react";
import { UserContext } from "./UserContext";

function Avatar() {
  // Je me branche sur le contexte et je lis la valeur
  const user = useContext(UserContext);

  // Aucune prop recue : la donnee vient directement du Provider
  return <span>Connecte : {user}</span>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> on exporte souvent le contexte depuis son propre fichier, et on donne un nom en <code>XxxContext</code> (<code>ThemeContext</code>, <code>AuthContext</code>…).',
          },
        ],
      },
    ],
    pitfalls: [
      'Lire un contexte hors de son <code>Provider</code> : tu récupères la valeur par défaut de <code>createContext</code>, souvent <code>null</code>.',
      'Mettre tout dans un seul contexte géant : chaque changement de <code>value</code> re-rend tous les consommateurs. Découpe par thème (auth, thème, panier…).',
      'Oublier de passer <code>value</code> au Provider : les consommateurs reçoivent alors la valeur par défaut, pas la tienne.',
    ],
    takeaways: [
      '<b>useContext</b> = lire une donnée partagée sans props intermédiaires',
      '3 étapes : <code>createContext</code> → <code>&lt;Ctx.Provider value={...}&gt;</code> → <code>useContext(Ctx)</code>',
      'le Provider enveloppe la partie de l’app qui a besoin de la donnée',
      'idéal pour : utilisateur connecté, thème, langue, panier',
      'évite le <b>prop drilling</b> (passer une prop d’étage en étage)',
    ],
  }),
  template({
    id: 'REACT-F-16101-TEMPLATE',
    slug: 'usecontext',
    title: 'useContext',
    shortTitle: 'useContext',
    technology: 'react',
    tomeId: 't6',
    summary: 'Le code useContext prêt à copier : contexte simple, ou contexte avec state modifiable.',
    lede: 'Le code prêt à copier. Choisis ton cas :',
    aliases: ['use context', 'context', 'provider', 'createcontext'],
    keywords: ['partager', 'theme', 'utilisateur', 'global'],
    relatedContentIds: [],
    lessonId: 'REACT-F-16101-LESSON',
    variants: [
      {
        id: 'simple',
        label: 'Contexte simple',
        description: 'Diffuser une valeur en lecture seule (langue, thème figé…).',
        codeBlocks: [
          {
            id: 'REACT-F-16101-t-simple',
            filename: 'ThemeContext.tsx',
            language: 'tsx',
            code: `import { createContext, useContext } from "react";

// 1. Creer
export const ThemeContext = createContext("clair");

// 2. Fournir (dans App)
<ThemeContext.Provider value="sombre">
  <Page />
</ThemeContext.Provider>

// 3. Lire (dans n'importe quel enfant)
const theme = useContext(ThemeContext);`,
          },
        ],
        replacements: [
          { token: 'ThemeContext', description: 'le nom de ton contexte' },
          { token: '"clair"', description: 'la valeur par défaut (hors Provider)' },
          { token: '"sombre"', description: 'la valeur réellement diffusée' },
        ],
        placement: 'Le cas de base : une donnée lue partout, mais qui ne change pas depuis les enfants.',
      },
      {
        id: 'state',
        label: 'Contexte + state',
        description: 'Diffuser une valeur ET le moyen de la modifier depuis n’importe où.',
        codeBlocks: [
          {
            id: 'REACT-F-16101-t-state',
            filename: 'AuthContext.tsx',
            language: 'tsx',
            code: `import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

// Le Provider gere le state et le diffuse
export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Les enfants lisent user ET setUser
export function useAuth() {
  return useContext(AuthContext);
}`,
          },
        ],
        replacements: [
          { token: 'AuthContext / AuthProvider', description: 'les noms de ton contexte et de son provider' },
          { token: 'user, setUser', description: 'la donnée et son setter à diffuser' },
          { token: 'string | null', description: 'le type de la donnée partagée' },
        ],
        placement: 'Quand les enfants doivent aussi modifier la donnée (login, changement de thème). On expose value + setter.',
      },
      {
        id: 'hook',
        label: 'Hook dédié',
        description: 'Envelopper useContext dans un hook maison pour un usage plus propre.',
        codeBlocks: [
          {
            id: 'REACT-F-16101-t-hook',
            filename: 'useTheme.ts',
            language: 'tsx',
            code: `import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

// Un hook maison qui cache le useContext
export function useTheme() {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("useTheme doit etre dans un ThemeProvider");
  }
  return theme;
}

// Usage cote composant :
// const theme = useTheme();`,
          },
        ],
        replacements: [
          { token: 'useTheme', description: 'le nom de ton hook maison' },
          { token: 'ThemeContext', description: 'le contexte à lire' },
        ],
        placement: 'Pour un import unique et un message d’erreur clair si on oublie le Provider.',
      },
    ],
  }),

  // ————— useMemo —————
  lesson({
    id: 'REACT-F-16102-LESSON',
    slug: 'usememo',
    title: 'useMemo',
    shortTitle: 'useMemo',
    technology: 'react',
    tomeId: 't6',
    summary:
      'Mettre en cache le RÉSULTAT d’un calcul coûteux pour ne pas le refaire à chaque rendu, tant que ses données ne changent pas.',
    utility:
      'Éviter de recalculer inutilement une valeur lourde à chaque rendu du composant.',
    aliases: ['use memo', 'memo', 'memoisation', 'usememo react', 'cache', 'calcul couteux'],
    keywords: [
      'eviter un recalcul',
      'calcul lourd',
      'filtrer une liste',
      'trier',
      'dependances',
      'performance',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-16102-TEMPLATE',
    intro:
      'Le hook <b>useMemo</b> <b>mémorise le résultat</b> d’un calcul. Tant que ses <b>dépendances</b> ne changent pas, React réutilise la valeur en cache au lieu de tout recalculer. Utile pour un calcul <b>coûteux</b> (tri, filtre sur une grosse liste).',
    sections: [
      {
        id: 's1',
        title: 'Le problème : recalculer à chaque rendu',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>filtrer une liste de 5000 produits</b> selon la recherche, mais ce filtre se relance à chaque frappe au clavier — même quand je change un état qui n’a rien à voir avec la liste.',
          },
          {
            type: 'paragraph',
            html: 'À <b>chaque</b> rendu, tout le corps du composant est ré-exécuté, donc le calcul aussi. Si le calcul est lourd et que ses données n’ont pas bougé, c’est du travail gaspillé.',
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>useMemo</code>, c’est un <b>plat préparé au frigo</b>. Tant que les ingrédients (les dépendances) sont les mêmes, tu ressers le plat déjà prêt au lieu de tout recuisiner.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Mémoriser le résultat',
        blocks: [
          {
            type: 'paragraph',
            html: 'On enveloppe le calcul dans <code>useMemo(() => ..., [deps])</code>. Le calcul ne se refait que si une valeur du <b>tableau de dépendances</b> change.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-16102-l-c1',
              filename: 'Produits.tsx',
              language: 'tsx',
              code: `import { useMemo, useState } from "react";

function Produits({ produits }: { produits: string[] }) {
  const [recherche, setRecherche] = useState("");

  // Le filtre ne se relance QUE si produits ou recherche change
  const filtres = useMemo(() => {
    return produits.filter((p) => p.includes(recherche));
  }, [produits, recherche]); // <- les dependances

  return (
    <>
      <input onChange={(e) => setRecherche(e.target.value)} />
      <p>{filtres.length} resultats</p>
    </>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> le tableau de dépendances liste <b>tout</b> ce que le calcul utilise. Oublier une dépendance = valeur en cache périmée.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Quand l’utiliser (et quand pas)',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>useMemo</code> n’est <b>pas gratuit</b> : React doit comparer les dépendances et stocker le résultat. Ne l’utilise que si le calcul est vraiment coûteux, pas pour une addition.',
          },
          {
            type: 'table',
            headers: ['Situation', 'useMemo ?'],
            rows: [
              ['Filtrer/trier une grosse liste', 'oui'],
              ['Un calcul simple (a + b)', 'non, inutile'],
              ['Stabiliser un objet passé en prop', 'oui, souvent'],
              ['Éviter un re-rendu d’un composant', 'non → c’est <code>React.memo</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre <code>useMemo</code> partout « pour optimiser » : la comparaison des dépendances a un coût. Réserve-le aux calculs lourds.',
      'Oublier une dépendance dans le tableau : le résultat reste figé sur d’anciennes valeurs. Liste tout ce que le calcul lit.',
      'Confondre <code>useMemo</code> (mémorise une <b>valeur</b>) et <code>useCallback</code> (mémorise une <b>fonction</b>).',
    ],
    takeaways: [
      '<b>useMemo</b> = met en cache le <b>résultat</b> d’un calcul',
      'syntaxe : <code>const x = useMemo(() => calcul, [deps])</code>',
      'le calcul ne se refait que si une dépendance change',
      'à réserver aux calculs <b>coûteux</b> (tri, filtre sur grosse liste)',
      'mémorise une valeur · pour une fonction → <code>useCallback</code>',
    ],
  }),
  template({
    id: 'REACT-F-16102-TEMPLATE',
    slug: 'usememo',
    title: 'useMemo',
    shortTitle: 'useMemo',
    technology: 'react',
    tomeId: 't6',
    summary: 'Le code useMemo prêt à copier : mémoriser un calcul, filtrer/trier une liste, stabiliser un objet.',
    lede: 'Le code prêt à copier. Choisis ton cas :',
    aliases: ['use memo', 'memo', 'cache', 'memoisation'],
    keywords: ['calcul', 'filtrer', 'trier', 'dependances'],
    relatedContentIds: [],
    lessonId: 'REACT-F-16102-LESSON',
    variants: [
      {
        id: 'calcul',
        label: 'Calcul mémorisé',
        description: 'Mettre en cache une valeur dérivée coûteuse.',
        codeBlocks: [
          {
            id: 'REACT-F-16102-t-calcul',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `import { useMemo } from "react";

const resultat = useMemo(() => {
  return calculCouteux(a, b);
}, [a, b]);`,
          },
        ],
        replacements: [
          { token: 'resultat', description: 'la valeur mémorisée' },
          { token: 'calculCouteux(a, b)', description: 'le calcul à ne pas refaire inutilement' },
          { token: '[a, b]', description: 'les valeurs qui déclenchent un recalcul' },
        ],
        placement: 'À l’intérieur du composant, avant le return. Liste dans [ ] tout ce que le calcul utilise.',
      },
      {
        id: 'liste',
        label: 'Filtrer / trier',
        description: 'Le cas le plus courant : dériver une liste filtrée ou triée.',
        codeBlocks: [
          {
            id: 'REACT-F-16102-t-liste',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `import { useMemo } from "react";

const visibles = useMemo(() => {
  return items
    .filter((item) => item.actif)
    .sort((a, b) => a.nom.localeCompare(b.nom));
}, [items]);`,
          },
        ],
        replacements: [
          { token: 'visibles', description: 'la liste dérivée' },
          { token: 'items', description: 'la liste source (et la dépendance)' },
          { token: 'item.actif', description: 'ta condition de filtre' },
        ],
        placement: 'Quand tu filtres/tries une liste à l’affichage : évite de tout refaire à chaque frappe ailleurs.',
      },
      {
        id: 'objet',
        label: 'Stabiliser un objet',
        description: 'Garder la même référence d’objet entre les rendus (utile en prop).',
        codeBlocks: [
          {
            id: 'REACT-F-16102-t-objet',
            filename: 'Parent.tsx',
            language: 'tsx',
            code: `import { useMemo } from "react";

// Sans useMemo, ce serait un NOUVEL objet a chaque rendu
const style = useMemo(() => {
  return { couleur, taille };
}, [couleur, taille]);

// <Enfant style={style} /> ne re-rend que si couleur/taille change`,
          },
        ],
        replacements: [
          { token: 'style', description: 'l’objet à stabiliser' },
          { token: '{ couleur, taille }', description: 'le contenu de l’objet' },
          { token: '[couleur, taille]', description: 'les valeurs qui recréent l’objet' },
        ],
        placement: 'Quand tu passes un objet en prop à un composant memoïsé : garde la même référence tant que le contenu ne bouge pas.',
      },
    ],
  }),

  // ————— useCallback —————
  lesson({
    id: 'REACT-F-16103-LESSON',
    slug: 'usecallback',
    title: 'useCallback',
    shortTitle: 'useCallback',
    technology: 'react',
    tomeId: 't6',
    summary:
      'Mémoriser une FONCTION pour qu’elle garde la même identité entre les rendus, au lieu d’en recréer une nouvelle à chaque fois.',
    utility:
      'Éviter de recréer une fonction à chaque rendu, pour ne pas re-rendre inutilement les composants enfants.',
    aliases: ['use callback', 'callback', 'usecallback react', 'fonction stable', 'memo fonction'],
    keywords: [
      'fonction stable',
      'eviter re-rendu enfant',
      'react memo',
      'dependance fonction',
      'reference fonction',
      'handler stable',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-16103-TEMPLATE',
    intro:
      'Le hook <b>useCallback</b> <b>mémorise une fonction</b>. Comme <code>useMemo</code>, mais pour une fonction plutôt qu’une valeur. Sans lui, une nouvelle fonction est recréée à chaque rendu — ce qui peut faire re-rendre inutilement les enfants qui la reçoivent en prop.',
    sections: [
      {
        id: 's1',
        title: 'Le problème : une nouvelle fonction à chaque rendu',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>passer un handler à un composant enfant optimisé</b> (avec <code>React.memo</code>), mais l’enfant se re-rend quand même à chaque rendu du parent — parce que la fonction change d’identité à chaque fois.',
          },
          {
            type: 'paragraph',
            html: 'En JS, deux fonctions écrites pareil ne sont <b>pas</b> égales : <code>() => {} !== () => {}</code>. À chaque rendu, le parent crée une <b>nouvelle</b> fonction, l’enfant voit une prop « différente » et se re-rend.',
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>useCallback</code> garde la <b>même clé</b> d’un rendu à l’autre. Sans lui, tu refais fabriquer une clé identique mais neuve à chaque fois — la serrure (l’enfant) croit que ça a changé.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Mémoriser la fonction',
        blocks: [
          {
            type: 'paragraph',
            html: 'On enveloppe la fonction dans <code>useCallback(fn, [deps])</code>. Tant que les dépendances ne changent pas, React renvoie <b>exactement la même fonction</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-16103-l-c1',
              filename: 'Parent.tsx',
              language: 'tsx',
              code: `import { useCallback, useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // Sans useCallback : nouvelle fonction a CHAQUE rendu
  // Avec : la meme fonction tant que [] ne change pas
  const handleClick = useCallback(() => {
    setCount((c) => c + 1); // forme fonctionnelle : pas besoin de count
  }, []); // aucune dependance -> fonction stable a vie

  return <Enfant onClick={handleClick} />;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce :</b> avec la forme fonctionnelle du setter (<code>setCount((c) => c + 1)</code>), tu n’as pas besoin de mettre <code>count</code> en dépendance — la fonction reste stable.',
          },
        ],
      },
      {
        id: 's3',
        title: 'useCallback vs useMemo',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les deux mémorisent quelque chose entre les rendus. La différence : l’un renvoie une <b>fonction</b>, l’autre le <b>résultat</b> d’un calcul. En fait, <code>useCallback(fn, d)</code> ≈ <code>useMemo(() => fn, d)</code>.',
          },
          {
            type: 'table',
            headers: ['', 'useCallback', 'useMemo'],
            rows: [
              ['Mémorise', 'une fonction', 'une valeur (résultat)'],
              ['Renvoie', 'la fonction elle-même', 'ce que le calcul retourne'],
              ['Cas typique', 'handler passé en prop', 'liste filtrée / triée'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>useCallback</code> partout : inutile si la fonction n’est pas passée à un enfant memoïsé ni en dépendance d’un <code>useEffect</code>.',
      'Oublier une dépendance : la fonction garde en mémoire d’<b>anciennes</b> valeurs (closure périmée). Liste tout ce qu’elle utilise.',
      'Mettre <code>count</code> en dépendance alors que la forme <code>setCount((c) => c + 1)</code> permettrait de s’en passer et de rester stable.',
    ],
    takeaways: [
      '<b>useCallback</b> = mémorise une <b>fonction</b> (même identité entre rendus)',
      'syntaxe : <code>const fn = useCallback(() => ..., [deps])</code>',
      'utile surtout pour un handler passé à un enfant <code>React.memo</code>',
      'forme fonctionnelle du setter → moins de dépendances, fonction plus stable',
      '<code>useCallback(fn, d)</code> ≈ <code>useMemo(() => fn, d)</code>',
    ],
  }),
  template({
    id: 'REACT-F-16103-TEMPLATE',
    slug: 'usecallback',
    title: 'useCallback',
    shortTitle: 'useCallback',
    technology: 'react',
    tomeId: 't6',
    summary: 'Le code useCallback prêt à copier : handler stable, fonction avec dépendances, combo avec React.memo.',
    lede: 'Le code prêt à copier. Choisis ton cas :',
    aliases: ['use callback', 'callback', 'fonction stable', 'react memo'],
    keywords: ['handler', 'dependance', 'reference', 'enfant'],
    relatedContentIds: [],
    lessonId: 'REACT-F-16103-LESSON',
    variants: [
      {
        id: 'stable',
        label: 'Handler stable',
        description: 'Une fonction sans dépendance, stable pour toute la vie du composant.',
        codeBlocks: [
          {
            id: 'REACT-F-16103-t-stable',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `import { useCallback } from "react";

const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []);`,
          },
        ],
        replacements: [
          { token: 'handleClick', description: 'le nom de ta fonction' },
          { token: 'setCount((c) => c + 1)', description: 'le corps de la fonction' },
          { token: '[]', description: 'les dépendances (vide = jamais recréée)' },
        ],
        placement: 'À l’intérieur du composant, avant le return. Idéal pour un handler passé à un enfant memoïsé.',
      },
      {
        id: 'deps',
        label: 'Avec dépendances',
        description: 'Une fonction qui utilise des valeurs : elles doivent figurer dans le tableau.',
        codeBlocks: [
          {
            id: 'REACT-F-16103-t-deps',
            filename: 'Recherche.tsx',
            language: 'tsx',
            code: `import { useCallback } from "react";

const lancerRecherche = useCallback(() => {
  fetch("/api?q=" + query).then((r) => r.json());
}, [query]); // recreee seulement si query change`,
          },
        ],
        replacements: [
          { token: 'lancerRecherche', description: 'le nom de ta fonction' },
          { token: 'query', description: 'la valeur utilisée (et la dépendance)' },
          { token: '"/api?q="', description: 'ce que fait la fonction' },
        ],
        placement: 'Quand la fonction lit une valeur externe : mets-la en dépendance pour éviter une closure périmée.',
      },
      {
        id: 'memo',
        label: 'Combo React.memo',
        description: 'L’usage qui a vraiment un intérêt : enfant memoïsé + handler stable.',
        codeBlocks: [
          {
            id: 'REACT-F-16103-t-memo',
            filename: 'App.tsx',
            language: 'tsx',
            code: `import { memo, useCallback, useState } from "react";

// Enfant qui ne se re-rend que si ses props changent
const Bouton = memo(function Bouton({ onClick }: any) {
  return <button onClick={onClick}>Ajouter</button>;
});

function App() {
  const [n, setN] = useState(0);
  // Handler stable -> Bouton ne se re-rend pas inutilement
  const ajouter = useCallback(() => setN((v) => v + 1), []);
  return <Bouton onClick={ajouter} />;
}`,
          },
        ],
        replacements: [
          { token: 'Bouton', description: 'ton composant enfant memoïsé' },
          { token: 'ajouter', description: 'le handler stable' },
        ],
        placement: 'Le seul cas où useCallback est vraiment utile : sans React.memo côté enfant, il n’apporte rien.',
      },
    ],
  }),

  // ————— Créer son propre hook : custom hook —————
  lesson({
    id: 'REACT-F-16104-LESSON',
    slug: 'creer-son-propre-hook-custom-hook',
    title: 'Créer son propre hook : custom hook',
    shortTitle: 'Custom hook',
    technology: 'react',
    tomeId: 't6',
    summary:
      'Extraire une logique réutilisable (fetch, formulaire, localStorage) dans une fonction useXxx qu’on partage entre plusieurs composants.',
    utility:
      'Sortir une logique répétée des composants pour la réutiliser proprement, sans copier-coller.',
    aliases: ['custom hook', 'hook personnalise', 'creer un hook', 'usexxx', 'hook maison', 'reutiliser logique'],
    keywords: [
      'reutiliser une logique',
      'extraire un hook',
      'usefetch',
      'useform',
      'uselocalstorage',
      'convention use',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-16104-TEMPLATE',
    intro:
      'Un <b>custom hook</b> est simplement une <b>fonction dont le nom commence par <code>use</code></b> et qui utilise d’autres hooks. Il te permet d’<b>extraire une logique</b> (appel API, gestion de formulaire, lecture de <code>localStorage</code>) pour la réutiliser dans plusieurs composants.',
    sections: [
      {
        id: 's1',
        title: 'Extraire une logique répétée',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>gérer un booléen ouvert/fermé</b> (modale, menu, accordéon) dans plusieurs composants, sans réécrire le même <code>useState</code> + les mêmes fonctions <code>ouvrir</code>/<code>fermer</code> partout.',
          },
          {
            type: 'paragraph',
            html: 'On déplace la logique dans une fonction <code>useXxx</code> qui <b>utilise des hooks</b> et <b>retourne</b> ce dont les composants ont besoin.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-16104-l-c1',
              filename: 'useToggle.ts',
              language: 'tsx',
              code: `import { useState } from "react";

// Un custom hook = une fonction qui commence par "use"
export function useToggle(depart = false) {
  const [ouvert, setOuvert] = useState(depart);

  // On prepare les actions pretes a l'emploi
  const ouvrir = () => setOuvert(true);
  const fermer = () => setOuvert(false);
  const basculer = () => setOuvert((o) => !o);

  // On retourne ce que le composant utilisera
  return { ouvert, ouvrir, fermer, basculer };
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle absolue :</b> le nom <b>doit</b> commencer par <code>use</code> (<code>useToggle</code>, <code>useFetch</code>). C’est ce qui autorise React à appeler des hooks à l’intérieur.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Utiliser son hook',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dans le composant, on appelle le hook comme n’importe quel autre et on récupère ce qu’il retourne. Le composant reste <b>court et lisible</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-16104-l-c2',
              filename: 'Modale.tsx',
              language: 'tsx',
              code: `import { useToggle } from "./useToggle";

function Modale() {
  // On reutilise toute la logique en une ligne
  const { ouvert, ouvrir, fermer } = useToggle();

  return (
    <>
      <button onClick={ouvrir}>Ouvrir</button>
      {ouvert && (
        <div className="modale">
          <button onClick={fermer}>Fermer</button>
        </div>
      )}
    </>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un custom hook, c’est une <b>recette écrite une fois</b>. Chaque composant qui l’appelle obtient le même plat, sans réécrire la recette à chaque fois.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Un hook qui fait un fetch',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le cas le plus courant : encapsuler un <b>appel API</b> avec ses états <code>data</code>, <code>loading</code> et <code>error</code>. On combine <code>useState</code> et <code>useEffect</code> à l’intérieur.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-16104-l-c3',
              filename: 'useFetch.ts',
              language: 'tsx',
              code: `import { useState, useEffect } from "react";

export function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // On lance l'appel quand l'url change
    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);

  // Le composant recoit un etat pret a afficher
  return { data, loading };
}`,
            },
          },
          {
            type: 'table',
            headers: ['Règle d’un custom hook', 'Détail'],
            rows: [
              ['Nom en <code>use…</code>', 'obligatoire (<code>useFetch</code>)'],
              ['Appelle d’autres hooks', '<code>useState</code>, <code>useEffect</code>…'],
              ['Retourne ce qu’on veut', 'objet, tableau, valeur'],
              ['Réutilisable partout', 'dans autant de composants que tu veux'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Nommer le hook sans <code>use</code> (<code>getToggle</code>) : React refuse d’y voir un hook et interdit les hooks à l’intérieur.',
      'Appeler un hook dans une condition ou une boucle : les hooks s’appellent toujours <b>au niveau racine</b> du hook/composant.',
      'Croire que deux composants qui utilisent le même hook <b>partagent</b> le state : chaque appel a son propre état indépendant.',
    ],
    takeaways: [
      '<b>custom hook</b> = une fonction <code>useXxx</code> qui utilise d’autres hooks',
      'sert à <b>extraire et réutiliser</b> une logique entre composants',
      'le nom <b>doit</b> commencer par <code>use</code>',
      'il retourne ce que tu veux (objet, tableau, valeur)',
      'chaque appel a son propre état — le state n’est <b>pas</b> partagé',
    ],
  }),
  template({
    id: 'REACT-F-16104-TEMPLATE',
    slug: 'creer-son-propre-hook-custom-hook',
    title: 'Custom hook',
    shortTitle: 'Custom hook',
    technology: 'react',
    tomeId: 't6',
    summary: 'Des custom hooks prêts à copier : useToggle, useFetch, useLocalStorage.',
    lede: 'Un squelette de hook à adapter. Choisis un exemple :',
    aliases: ['custom hook', 'hook maison', 'usexxx', 'reutiliser'],
    keywords: ['usetoggle', 'usefetch', 'uselocalstorage'],
    relatedContentIds: [],
    lessonId: 'REACT-F-16104-LESSON',
    variants: [
      {
        id: 'toggle',
        label: 'useToggle',
        description: 'Gérer un booléen ouvert/fermé réutilisable.',
        codeBlocks: [
          {
            id: 'REACT-F-16104-t-toggle',
            filename: 'useToggle.ts',
            language: 'tsx',
            code: `import { useState } from "react";

export function useToggle(depart = false) {
  const [ouvert, setOuvert] = useState(depart);
  const basculer = () => setOuvert((o) => !o);
  return { ouvert, basculer };
}

// Usage :
// const { ouvert, basculer } = useToggle();`,
          },
        ],
        replacements: [
          { token: 'useToggle', description: 'le nom de ton hook (toujours en use…)' },
          { token: 'depart = false', description: 'la valeur de départ du booléen' },
          { token: 'ouvert, basculer', description: 'ce que le hook expose' },
        ],
        placement: 'Dans son propre fichier. Importe-le dans chaque composant qui a besoin d’un booléen ouvert/fermé.',
      },
      {
        id: 'fetch',
        label: 'useFetch',
        description: 'Encapsuler un appel API avec ses états data / loading.',
        codeBlocks: [
          {
            id: 'REACT-F-16104-t-fetch',
            filename: 'useFetch.ts',
            language: 'tsx',
            code: `import { useState, useEffect } from "react";

export function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}`,
          },
        ],
        replacements: [
          { token: 'useFetch', description: 'le nom de ton hook' },
          { token: 'url', description: 'l’adresse à appeler (mets-la en dépendance)' },
          { token: 'data, loading', description: 'les états retournés au composant' },
        ],
        placement: 'Le hook le plus courant. Le composant fait const { data, loading } = useFetch("/api/...").',
      },
      {
        id: 'storage',
        label: 'useLocalStorage',
        description: 'Un state synchronisé avec le localStorage du navigateur.',
        codeBlocks: [
          {
            id: 'REACT-F-16104-t-storage',
            filename: 'useLocalStorage.ts',
            language: 'tsx',
            code: `import { useState, useEffect } from "react";

export function useLocalStorage(cle: string, initial: string) {
  const [valeur, setValeur] = useState(() => {
    // On lit la valeur sauvegardee au demarrage
    return localStorage.getItem(cle) ?? initial;
  });

  useEffect(() => {
    // On resauvegarde a chaque changement
    localStorage.setItem(cle, valeur);
  }, [cle, valeur]);

  return [valeur, setValeur] as const;
}`,
          },
        ],
        replacements: [
          { token: 'useLocalStorage', description: 'le nom de ton hook' },
          { token: 'cle', description: 'la clé de stockage dans localStorage' },
          { token: 'initial', description: 'la valeur par défaut si rien n’est sauvegardé' },
        ],
        placement: 'Pour persister un choix (thème, panier). S’utilise comme useState : const [x, setX] = useLocalStorage(...).',
      },
    ],
  }),
];
