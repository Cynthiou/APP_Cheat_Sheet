import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const reactRouterContent: ReadyContent[] = [
  // ————— Installer React Router —————
  lesson({
    id: 'REACT-F-19100-LESSON',
    slug: 'installer-react-router',
    title: 'Installer React Router',
    shortTitle: 'Installer Router',
    technology: 'react',
    tomeId: 't9',
    summary:
      'Ajouter la navigation entre plusieurs pages dans une app React : installer react-router-dom, brancher le Router et déclarer ses routes.',
    utility: 'Transformer une app React en site à plusieurs pages, sans recharger le navigateur.',
    aliases: [
      'react router',
      'installer router',
      'react-router-dom',
      'routes',
      'BrowserRouter',
      'plusieurs pages',
    ],
    keywords: [
      'installer react router',
      'plusieurs pages react',
      'browserrouter',
      'route path element',
      'routes',
      'navigation spa',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-19100-TEMPLATE',
    intro:
      'React Router permet d’afficher <b>plusieurs pages</b> dans une seule app React, en fonction de l’<b>URL</b>, sans recharger le navigateur. On installe le paquet <code>react-router-dom</code>, on entoure l’app d’un <code>BrowserRouter</code>, puis on déclare les <code>Route</code>.',
    sections: [
      {
        id: 's1',
        title: 'Installer le paquet',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>que mon app affiche une page d’accueil et une page “à propos”</b> selon l’adresse, comme un vrai site.',
          },
          {
            type: 'paragraph',
            html: 'React Router n’est <b>pas fourni</b> avec React : on l’ajoute avec le gestionnaire de paquets. Le paquet à installer pour le web s’appelle <code>react-router-dom</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19100-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Installe React Router pour le web
npm install react-router-dom

# Avec yarn si tu preferes
yarn add react-router-dom`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Attention au nom :</b> pour une app web c’est <code>react-router-dom</code> (avec <code>-dom</code>), pas <code>react-router</code> tout court.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Brancher le Router autour de l’app',
        blocks: [
          {
            type: 'paragraph',
            html: 'On entoure toute l’application d’un <code>BrowserRouter</code>, <b>une seule fois</b>, au point d’entrée (<code>main.tsx</code>). C’est lui qui écoute l’URL et prévient les composants.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19100-l-c2',
              filename: 'main.tsx',
              language: 'tsx',
              code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // on importe le Router
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* BrowserRouter entoure TOUTE l'app, une seule fois */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le <code>BrowserRouter</code> est le <b>standardiste</b> du site. Il écoute l’adresse tapée et redirige vers le bon bureau (la bonne page). Il n’y en a qu’un pour tout l’immeuble.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Déclarer les routes',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dans <code>App</code>, on liste les pages avec <code>Routes</code> (la liste) et <code>Route</code> (chaque page). Chaque <code>Route</code> associe un <code>path</code> (l’URL) à un <code>element</code> (le composant à afficher).',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19100-l-c3',
              filename: 'App.tsx',
              language: 'tsx',
              code: `import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import APropos from "./pages/APropos";

function App() {
  return (
    // Routes = la liste des pages possibles
    <Routes>
      {/* path = l'URL, element = le composant affiche */}
      <Route path="/" element={<Accueil />} />
      <Route path="/a-propos" element={<APropos />} />
    </Routes>
  );
}

export default App;`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Rôle'],
            rows: [
              ['<code>BrowserRouter</code>', 'écoute l’URL — une seule fois, autour de l’app'],
              ['<code>Routes</code>', 'la liste des pages possibles'],
              ['<code>Route</code>', 'une page : un <code>path</code> + un <code>element</code>'],
              ['<code>path="/"</code>', 'l’URL qui déclenche la page (ici l’accueil)'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Installer <code>react-router</code> au lieu de <code>react-router-dom</code> : pour le web, c’est bien la version <b>-dom</b>.',
      'Mettre plusieurs <code>BrowserRouter</code> : il n’en faut <b>qu’un</b>, tout en haut. Sinon la navigation se comporte bizarrement.',
      'Oublier le <code>path="/"</code> pour l’accueil : la page d’accueil ne s’affiche jamais.',
      'Écrire <code>element={Accueil}</code> au lieu de <code>element={<Accueil />}</code> : il faut passer l’élément JSX, pas la fonction.',
    ],
    takeaways: [
      'installer : <code>npm install react-router-dom</code>',
      '<code>BrowserRouter</code> entoure l’app <b>une seule fois</b> (dans <code>main.tsx</code>)',
      '<code>Routes</code> = la liste · <code>Route</code> = une page (<code>path</code> + <code>element</code>)',
      '<code>element={<Page />}</code> avec les chevrons, pas le nom seul',
    ],
  }),
  template({
    id: 'REACT-F-19100-TEMPLATE',
    slug: 'installer-react-router',
    title: 'Installer React Router',
    shortTitle: 'Installer Router',
    technology: 'react',
    tomeId: 't9',
    summary: 'Le code prêt à copier pour installer et brancher React Router.',
    lede: 'Brancher React Router. Choisis l’étape :',
    aliases: ['react router', 'react-router-dom', 'browserrouter', 'routes'],
    keywords: ['installer', 'browserrouter', 'route path element'],
    relatedContentIds: [],
    lessonId: 'REACT-F-19100-LESSON',
    variants: [
      {
        id: 'install',
        label: 'Installation',
        codeBlocks: [
          {
            id: 'REACT-F-19100-t-install',
            filename: 'terminal',
            language: 'bash',
            code: `npm install react-router-dom`,
          },
        ],
        replacements: [],
        placement: 'Dans le dossier du projet, une seule fois. Redémarre le serveur de dev ensuite.',
      },
      {
        id: 'brancher',
        label: 'Brancher le Router',
        codeBlocks: [
          {
            id: 'REACT-F-19100-t-brancher',
            filename: 'main.tsx',
            language: 'tsx',
            code: `import { BrowserRouter } from "react-router-dom";

<BrowserRouter>
  <App />
</BrowserRouter>`,
          },
        ],
        replacements: [
          { token: '<App />', description: 'ton composant racine' },
        ],
        placement: 'Au point d’entrée (main.tsx), autour de <App />. Une seule fois pour toute l’app.',
      },
      {
        id: 'routes',
        label: 'Déclarer les routes',
        codeBlocks: [
          {
            id: 'REACT-F-19100-t-routes',
            filename: 'App.tsx',
            language: 'tsx',
            code: `import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Accueil />} />
  <Route path="/a-propos" element={<APropos />} />
</Routes>`,
          },
        ],
        replacements: [
          { token: '/a-propos', description: 'l’URL de la page' },
          { token: '<APropos />', description: 'le composant à afficher pour cette URL' },
        ],
        placement: 'Dans le composant App. Ajoute autant de <Route> que de pages.',
      },
    ],
  }),

  // ————— Link et NavLink —————
  lesson({
    id: 'REACT-F-19101-LESSON',
    slug: 'link-et-navlink',
    title: 'Link et NavLink',
    shortTitle: 'Link / NavLink',
    technology: 'react',
    tomeId: 't9',
    summary:
      'Naviguer entre les pages par clic, sans recharger le navigateur, avec Link — et styliser le lien actif avec NavLink.',
    utility: 'Créer des liens de navigation internes qui ne rechargent pas la page.',
    aliases: ['link', 'navlink', 'lien', 'menu', 'navigation', 'lien actif'],
    keywords: [
      'lien entre pages',
      'menu navigation',
      'lien actif',
      'sans recharger',
      'to prop',
      'classe active',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-19101-TEMPLATE',
    intro:
      'Pour naviguer sans recharger la page, on remplace la balise <code>&lt;a&gt;</code> par <code>Link</code>. Sa cible se met dans <code>to</code> (pas <code>href</code>). <code>NavLink</code> fait pareil mais sait quand le lien est <b>actif</b>, pour le styliser.',
    sections: [
      {
        id: 's1',
        title: 'Link : le lien interne',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>un menu avec des liens vers mes pages</b> qui changent l’affichage instantanément, sans le rechargement blanc du navigateur.',
          },
          {
            type: 'paragraph',
            html: 'Un <code>&lt;a href&gt;</code> classique <b>recharge</b> toute la page. Avec <code>Link</code>, React Router intercepte le clic et change juste le contenu. La destination va dans <code>to</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19101-l-c1',
              filename: 'Menu.tsx',
              language: 'tsx',
              code: `import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav>
      {/* to = la destination (et non href) */}
      <Link to="/">Accueil</Link>
      <Link to="/a-propos">À propos</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle :</b> avec <code>Link</code>, on écrit <code>to</code>, jamais <code>href</code>. Le <code>href</code> classique recharge la page et casse l’effet SPA.',
          },
        ],
      },
      {
        id: 's2',
        title: 'NavLink : styliser le lien actif',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>NavLink</code> est un <code>Link</code> qui <b>sait s’il pointe vers la page courante</b>. Sa prop <code>className</code> peut être une fonction qui reçoit <code>isActive</code> — pratique pour souligner l’onglet en cours.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19101-l-c2',
              filename: 'Menu.tsx',
              language: 'tsx',
              code: `import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav>
      {/* isActive vaut true quand l'URL correspond au to */}
      <NavLink
        to="/a-propos"
        className={(props) => (props.isActive ? "actif" : "")}
      >
        À propos
      </NavLink>
    </nav>
  );
}`,
            },
          },
          {
            type: 'table',
            headers: ['Composant', 'À utiliser pour…'],
            rows: [
              ['<code>Link</code>', 'un lien interne simple'],
              ['<code>NavLink</code>', 'un lien de menu qui doit se styliser quand il est actif'],
              ['<code>to</code>', 'la destination du lien (remplace <code>href</code>)'],
              ['<code>isActive</code>', 'vrai quand le lien pointe vers la page courante'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>NavLink</code> = l’onglet du navigateur qui <b>s’allume</b> quand tu es dessus. Tu vois d’un coup d’œil où tu te trouves dans le site.',
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>href</code> avec <code>Link</code> : la bonne prop est <code>to</code>. Le <code>href</code> recharge la page.',
      'Garder des <code>&lt;a&gt;</code> pour les liens internes : ils rechargent tout. Réserve <code>&lt;a&gt;</code> aux liens <b>externes</b>.',
      'Oublier que <code>className</code> de <code>NavLink</code> reçoit une <b>fonction</b> avec <code>isActive</code> : c’est ce qui différencie le lien actif.',
      'Mettre les <code>Link</code> en dehors du <code>BrowserRouter</code> : ils plantent. Ils doivent être dans l’arbre du Router.',
    ],
    takeaways: [
      '<code>Link</code> remplace <code>&lt;a&gt;</code> pour les liens internes · destination dans <code>to</code>',
      'pas de rechargement : c’est le principe de la navigation SPA',
      '<code>NavLink</code> = <code>Link</code> + connaissance du lien <b>actif</b> (<code>isActive</code>)',
      '<code>&lt;a&gt;</code> reste valable pour les liens <b>externes</b>',
    ],
  }),
  template({
    id: 'REACT-F-19101-TEMPLATE',
    slug: 'link-et-navlink',
    title: 'Link et NavLink',
    shortTitle: 'Link / NavLink',
    technology: 'react',
    tomeId: 't9',
    summary: 'Les liens de navigation prêts à copier : Link simple ou NavLink avec état actif.',
    lede: 'Créer un lien interne. Choisis le cas :',
    aliases: ['link', 'navlink', 'lien', 'menu'],
    keywords: ['lien interne', 'lien actif', 'to'],
    relatedContentIds: [],
    lessonId: 'REACT-F-19101-LESSON',
    variants: [
      {
        id: 'link',
        label: 'Link simple',
        codeBlocks: [
          {
            id: 'REACT-F-19101-t-link',
            filename: 'Menu.tsx',
            language: 'tsx',
            code: `import { Link } from "react-router-dom";

<Link to="/a-propos">À propos</Link>`,
          },
        ],
        replacements: [
          { token: '/a-propos', description: 'la destination du lien' },
          { token: 'À propos', description: 'le texte affiché' },
        ],
        placement: 'Pour tout lien interne. Remplace directement une balise <a> vers une page du site.',
      },
      {
        id: 'navlink',
        label: 'NavLink (actif)',
        codeBlocks: [
          {
            id: 'REACT-F-19101-t-navlink',
            filename: 'Menu.tsx',
            language: 'tsx',
            code: `import { NavLink } from "react-router-dom";

<NavLink
  to="/a-propos"
  className={(props) => (props.isActive ? "actif" : "")}
>
  À propos
</NavLink>`,
          },
        ],
        replacements: [
          { token: '/a-propos', description: 'la destination du lien' },
          { token: 'actif', description: 'la classe CSS appliquée quand le lien est actif' },
        ],
        placement: 'Pour un menu où l’onglet courant doit se démarquer (souligné, surligné…).',
      },
      {
        id: 'menu',
        label: 'Menu complet',
        codeBlocks: [
          {
            id: 'REACT-F-19101-t-menu',
            filename: 'Menu.tsx',
            language: 'tsx',
            code: `import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/a-propos">À propos</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}`,
          },
        ],
        replacements: [
          { token: '/contact', description: 'l’URL de chaque page' },
          { token: 'Contact', description: 'le libellé affiché dans le menu' },
        ],
        placement: 'Une barre de navigation entière. Duplique les <Link> selon tes pages.',
      },
    ],
  }),

  // ————— useParams —————
  lesson({
    id: 'REACT-F-19102-LESSON',
    slug: 'useparams',
    title: 'useParams',
    shortTitle: 'useParams',
    technology: 'react',
    tomeId: 't9',
    summary:
      'Lire une partie variable de l’URL (un id, un slug) pour afficher la bonne fiche : la route dynamique et le hook useParams.',
    utility: 'Récupérer un paramètre dynamique de l’URL (comme un id de produit).',
    aliases: ['useparams', 'parametre url', 'route dynamique', 'id url', 'slug', 'params'],
    keywords: [
      'lire id dans url',
      'route dynamique',
      'page detail',
      'fiche produit',
      'parametre url',
      'deux points path',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-19102-TEMPLATE',
    intro:
      'Une <b>route dynamique</b> contient une partie variable, notée avec deux-points : <code>/produit/:id</code>. Le hook <code>useParams</code> lit cette valeur dans le composant pour afficher le bon contenu.',
    sections: [
      {
        id: 's1',
        title: 'Déclarer une route dynamique',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>une seule page “fiche produit” qui affiche le bon produit selon l’URL</b> : <code>/produit/12</code>, <code>/produit/34</code>… sans écrire une page par produit.',
          },
          {
            type: 'paragraph',
            html: 'Dans le <code>path</code>, la partie variable commence par <b>deux-points</b> : <code>:id</code>. Elle correspond à n’importe quelle valeur et devient accessible sous ce nom.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19102-l-c1',
              filename: 'App.tsx',
              language: 'tsx',
              code: `import { Routes, Route } from "react-router-dom";
import FicheProduit from "./pages/FicheProduit";

<Routes>
  {/* :id est une partie variable de l'URL */}
  <Route path="/produit/:id" element={<FicheProduit />} />
</Routes>;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Le nom compte :</b> le mot après les deux-points (<code>:id</code>) est la <b>clé</b> que tu liras avec <code>useParams</code>. Ici ce sera <code>params.id</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Lire le paramètre avec useParams',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dans le composant de la page, <code>useParams</code> retourne un objet avec les parties variables de l’URL. On y lit <code>id</code> (le même nom que dans le <code>path</code>).',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19102-l-c2',
              filename: 'FicheProduit.tsx',
              language: 'tsx',
              code: `import { useParams } from "react-router-dom";

function FicheProduit() {
  // On recupere le meme nom que dans le path (:id)
  const params = useParams();
  const id = params.id;

  return <h1>Fiche du produit numero {id}</h1>;
}

export default FicheProduit;`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> la route <code>/produit/:id</code> est un <b>formulaire à trou</b>. <code>useParams</code> te rend ce que le visiteur a écrit dans le trou (<code>12</code>, <code>34</code>…).',
          },
        ],
      },
      {
        id: 's3',
        title: 'Du lien au chargement des données',
        blocks: [
          {
            type: 'paragraph',
            html: 'On construit le lien vers la fiche avec le bon id, puis on utilise <code>id</code> pour charger la donnée correspondante (souvent dans un <code>useEffect</code>).',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19102-l-c3',
              filename: 'exemples.tsx',
              language: 'tsx',
              code: `import { Link } from "react-router-dom";

// 1. Un lien vers la fiche du produit 12
<Link to="/produit/12">Voir le produit</Link>;

// 2. Dans la page, on se sert de l'id pour charger la donnee
const params = useParams();
const produit = tousLesProduits.find(
  (p) => String(p.id) === params.id
);
// Note : params.id est TOUJOURS une chaine de caracteres`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Rôle'],
            rows: [
              ['<code>path="/produit/:id"</code>', 'déclare la partie variable'],
              ['<code>useParams()</code>', 'lit les parties variables de l’URL'],
              ['<code>params.id</code>', 'la valeur (toujours une <b>chaîne</b>)'],
              ['<code>Link to="/produit/12"</code>', 'un lien vers une valeur précise'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier les <b>deux-points</b> dans le <code>path</code> : <code>/produit/id</code> attend le texte littéral « id », pas une valeur variable.',
      'Utiliser un nom différent : la clé de <code>useParams</code> doit être <b>identique</b> à celle du <code>path</code> (<code>:id</code> → <code>params.id</code>).',
      'Oublier que <code>params.id</code> est une <b>chaîne</b> : compare avec <code>String(p.id)</code> ou convertis avec <code>Number(params.id)</code>.',
      'Placer le <code>useParams</code> dans un composant affiché <b>hors</b> de la route dynamique : il renvoie <code>undefined</code>.',
    ],
    takeaways: [
      'route dynamique : <code>path="/produit/:id"</code> (partie variable après <code>:</code>)',
      'lire la valeur : <code>const params = useParams()</code> puis <code>params.id</code>',
      'la clé lue = le nom après les deux-points, à l’identique',
      '<code>params.id</code> est <b>toujours une chaîne</b> — convertis si besoin',
    ],
  }),
  template({
    id: 'REACT-F-19102-TEMPLATE',
    slug: 'useparams',
    title: 'useParams',
    shortTitle: 'useParams',
    technology: 'react',
    tomeId: 't9',
    summary: 'Lire un paramètre d’URL prêt à copier : route dynamique et hook useParams.',
    lede: 'Lire une valeur de l’URL. Choisis l’étape :',
    aliases: ['useparams', 'route dynamique', 'parametre url', 'id url'],
    keywords: ['deux points path', 'lire id', 'page detail'],
    relatedContentIds: [],
    lessonId: 'REACT-F-19102-LESSON',
    variants: [
      {
        id: 'route',
        label: 'La route',
        codeBlocks: [
          {
            id: 'REACT-F-19102-t-route',
            filename: 'App.tsx',
            language: 'tsx',
            code: `<Route path="/produit/:id" element={<FicheProduit />} />`,
          },
        ],
        replacements: [
          { token: 'produit', description: 'le segment fixe de l’URL' },
          { token: ':id', description: 'le nom du paramètre variable' },
          { token: '<FicheProduit />', description: 'la page à afficher' },
        ],
        placement: 'Dans <Routes>. Le mot après les deux-points sera la clé lue par useParams.',
      },
      {
        id: 'lire',
        label: 'Lire le paramètre',
        codeBlocks: [
          {
            id: 'REACT-F-19102-t-lire',
            filename: 'FicheProduit.tsx',
            language: 'tsx',
            code: `import { useParams } from "react-router-dom";

const params = useParams();
const id = params.id;`,
          },
        ],
        replacements: [
          { token: 'id', description: 'le nom du paramètre, identique à celui du path (:id)' },
        ],
        placement: 'En haut du composant de la page. La clé doit correspondre exactement au path.',
      },
      {
        id: 'nombre',
        label: 'Convertir en nombre',
        codeBlocks: [
          {
            id: 'REACT-F-19102-t-nombre',
            filename: 'FicheProduit.tsx',
            language: 'tsx',
            code: `import { useParams } from "react-router-dom";

const params = useParams();
// params.id est une chaine -> on la convertit
const id = Number(params.id);`,
          },
        ],
        replacements: [
          { token: 'id', description: 'le nom du paramètre à convertir' },
        ],
        placement: 'Quand tu dois comparer l’id à des nombres. useParams renvoie toujours une chaîne.',
      },
    ],
  }),

  // ————— useNavigate —————
  lesson({
    id: 'REACT-F-19103-LESSON',
    slug: 'usenavigate',
    title: 'useNavigate',
    shortTitle: 'useNavigate',
    technology: 'react',
    tomeId: 't9',
    summary:
      'Changer de page depuis le code (après un envoi de formulaire, une connexion…) plutôt que par un clic sur un lien, avec useNavigate.',
    utility: 'Rediriger l’utilisateur par le code, sans qu’il clique sur un lien.',
    aliases: ['usenavigate', 'rediriger', 'redirection', 'navigate', 'changer de page', 'programmatique'],
    keywords: [
      'rediriger apres formulaire',
      'redirection code',
      'navigate',
      'retour en arriere',
      'apres connexion',
      'changer page programmatiquement',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-19103-TEMPLATE',
    intro:
      'Parfois on veut changer de page <b>sans clic sur un lien</b> : après un formulaire envoyé, une connexion réussie… Le hook <code>useNavigate</code> donne une fonction qui déclenche la navigation depuis le code.',
    sections: [
      {
        id: 's1',
        title: 'Rediriger après une action',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>renvoyer l’utilisateur sur la page d’accueil une fois son formulaire envoyé</b>, automatiquement, sans qu’il ait à cliquer.',
          },
          {
            type: 'paragraph',
            html: 'On appelle <code>useNavigate</code> pour récupérer une fonction (souvent nommée <code>navigate</code>). On l’appelle ensuite avec la destination, au bon moment.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19103-l-c1',
              filename: 'Formulaire.tsx',
              language: 'tsx',
              code: `import { useNavigate } from "react-router-dom";

function Formulaire() {
  // 1. On recupere la fonction de navigation
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... on enregistre les donnees ...

    // 2. On redirige vers l'accueil
    navigate("/");
  };

  return <form onSubmit={handleSubmit}>{/* champs */}</form>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Link ou navigate ?</b> Un <b>clic</b> de l’utilisateur → <code>Link</code>. Une redirection <b>décidée par le code</b> (après une action) → <code>navigate</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Retour arrière et options',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>navigate(-1)</code> revient à la page précédente (comme le bouton « retour » du navigateur). L’option <code>replace</code> remplace l’entrée d’historique au lieu d’en ajouter une.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19103-l-c2',
              filename: 'exemples.tsx',
              language: 'tsx',
              code: `const navigate = useNavigate();

// Aller a une page precise
navigate("/profil");

// Revenir en arriere (page precedente)
navigate(-1);

// Rediriger SANS pouvoir revenir en arriere
// (utile apres une connexion)
navigate("/tableau-de-bord", { replace: true });`,
            },
          },
          {
            type: 'table',
            headers: ['Appel', 'Effet'],
            rows: [
              ['<code>navigate("/profil")</code>', 'va vers <code>/profil</code>'],
              ['<code>navigate(-1)</code>', 'revient à la page précédente'],
              ['<code>navigate(1)</code>', 'avance d’une page dans l’historique'],
              ['<code>{ replace: true }</code>', 'remplace l’historique (pas de retour possible)'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>navigate</code> est la <b>télécommande</b> du site : tu changes de chaîne (de page) toi-même, au lieu d’attendre que le visiteur clique.',
          },
        ],
      },
    ],
    pitfalls: [
      'Appeler <code>useNavigate()</code> <b>pendant le rendu</b> pour rediriger : ça provoque des erreurs. Fais-le dans un handler ou un <code>useEffect</code>.',
      'Confondre la valeur et l’appel : <code>const navigate = useNavigate()</code> puis <code>navigate("/")</code>. On appelle <code>navigate</code>, pas <code>useNavigate</code>.',
      'Utiliser <code>navigate</code> là où un simple <code>Link</code> suffirait : pour un clic direct de l’utilisateur, préfère <code>Link</code>.',
      'Oublier <code>replace: true</code> après une connexion : l’utilisateur peut revenir en arrière sur la page de login.',
    ],
    takeaways: [
      '<code>const navigate = useNavigate()</code> puis <code>navigate("/cible")</code>',
      'pour rediriger <b>par le code</b> (après une action), pas pour un clic simple',
      '<code>navigate(-1)</code> = retour arrière · <code>navigate(1)</code> = avancer',
      '<code>{ replace: true }</code> = sans retour possible (idéal après connexion)',
    ],
  }),
  template({
    id: 'REACT-F-19103-TEMPLATE',
    slug: 'usenavigate',
    title: 'useNavigate',
    shortTitle: 'useNavigate',
    technology: 'react',
    tomeId: 't9',
    summary: 'Rediriger par le code prêt à copier : vers une page, en arrière, ou sans retour.',
    lede: 'Changer de page par le code. Choisis le cas :',
    aliases: ['usenavigate', 'rediriger', 'redirection', 'navigate'],
    keywords: ['redirection', 'retour arriere', 'apres formulaire'],
    relatedContentIds: [],
    lessonId: 'REACT-F-19103-LESSON',
    variants: [
      {
        id: 'vers',
        label: 'Vers une page',
        codeBlocks: [
          {
            id: 'REACT-F-19103-t-vers',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

navigate("/accueil");`,
          },
        ],
        replacements: [
          { token: '/accueil', description: 'la page de destination' },
        ],
        placement: 'Dans un handler (après un submit, un clic personnalisé…). Pas pendant le rendu.',
      },
      {
        id: 'retour',
        label: 'Retour arrière',
        codeBlocks: [
          {
            id: 'REACT-F-19103-t-retour',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

navigate(-1);`,
          },
        ],
        replacements: [
          { token: '-1', description: 'le nombre de pages à reculer (-1 = précédente)' },
        ],
        placement: 'Pour un bouton « Retour » maison, qui revient à la page d’où l’on vient.',
      },
      {
        id: 'replace',
        label: 'Sans retour',
        codeBlocks: [
          {
            id: 'REACT-F-19103-t-replace',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

navigate("/tableau-de-bord", { replace: true });`,
          },
        ],
        replacements: [
          { token: '/tableau-de-bord', description: 'la page de destination' },
        ],
        placement: 'Après une connexion : l’utilisateur ne pourra pas revenir sur la page de login.',
      },
    ],
  }),

  // ————— Une page 404 —————
  lesson({
    id: 'REACT-F-19104-LESSON',
    slug: 'une-page-404',
    title: 'Une page 404',
    shortTitle: 'Page 404',
    technology: 'react',
    tomeId: 't9',
    summary:
      'Afficher une page « introuvable » quand l’URL ne correspond à aucune route, grâce à la route attrape-tout path="*".',
    utility: 'Gérer proprement les URLs inconnues au lieu d’une page vide.',
    aliases: ['404', 'page introuvable', 'not found', 'attrape tout', 'catch all', 'etoile path'],
    keywords: [
      'page 404',
      'url inconnue',
      'introuvable',
      'route etoile',
      'catch all',
      'page par defaut',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-19104-TEMPLATE',
    intro:
      'Quand l’URL ne correspond à <b>aucune</b> route déclarée, React Router n’affiche rien. On ajoute une route « attrape-tout » avec <code>path="*"</code> pour montrer une page 404 propre.',
    sections: [
      {
        id: 's1',
        title: 'La route attrape-tout',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher une jolie page “oups, page introuvable” quand quelqu’un tape une adresse qui n’existe pas</b>, plutôt qu’un écran blanc.',
          },
          {
            type: 'paragraph',
            html: 'L’étoile <code>*</code> comme <code>path</code> correspond à <b>toute URL non déjà prise</b>. On la place <b>en dernier</b>, après toutes les autres routes.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19104-l-c1',
              filename: 'App.tsx',
              language: 'tsx',
              code: `import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import PageIntrouvable from "./pages/PageIntrouvable";

<Routes>
  <Route path="/" element={<Accueil />} />
  <Route path="/a-propos" element={<APropos />} />

  {/* En DERNIER : attrape toutes les URL inconnues */}
  <Route path="*" element={<PageIntrouvable />} />
</Routes>;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Ordre important :</b> la route <code>path="*"</code> va <b>tout en bas</b>. Placée trop haut, elle capturerait tout et masquerait tes vraies pages.',
          },
        ],
      },
      {
        id: 's2',
        title: 'La page 404 elle-même',
        blocks: [
          {
            type: 'paragraph',
            html: 'C’est un composant comme un autre. On y met un message clair et souvent un <code>Link</code> pour revenir à l’accueil.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19104-l-c2',
              filename: 'PageIntrouvable.tsx',
              language: 'tsx',
              code: `import { Link } from "react-router-dom";

function PageIntrouvable() {
  return (
    <div>
      <h1>404 — Page introuvable</h1>
      <p>Cette page n'existe pas ou a ete deplacee.</p>
      {/* On propose un retour vers l'accueil */}
      <Link to="/">Retour a l'accueil</Link>
    </div>
  );
}

export default PageIntrouvable;`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Rôle'],
            rows: [
              ['<code>path="*"</code>', 'correspond à toute URL non prise'],
              ['position', 'toujours <b>en dernier</b> dans <code>Routes</code>'],
              ['<code>Link to="/"</code>', 'proposer un retour à l’accueil'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>path="*"</code> est le <b>filet de sécurité</b> tout en bas : tout ce qui n’a pas trouvé sa place tombe dedans, et on l’accueille poliment.',
          },
        ],
      },
    ],
    pitfalls: [
      'Placer <code>path="*"</code> <b>avant</b> les autres routes : elle capture tout, et plus aucune vraie page ne s’affiche.',
      'Oublier complètement la route 404 : les URLs inconnues donnent une page <b>vide</b>, déroutante pour l’utilisateur.',
      'Mettre un <code>&lt;a href="/"&gt;</code> dans la 404 : préfère <code>Link</code> pour rester dans la navigation SPA.',
      'Confondre 404 « front » et vrai statut HTTP : côté client, la page s’affiche mais le serveur peut renvoyer 200. C’est normal pour une SPA.',
    ],
    takeaways: [
      'route attrape-tout : <code>&lt;Route path="*" element={<Page404 />} /&gt;</code>',
      'toujours en <b>dernier</b> dans <code>Routes</code>',
      'la page 404 est un composant normal · propose un <code>Link</code> vers l’accueil',
      'évite l’écran blanc sur les URLs inconnues',
    ],
  }),
  template({
    id: 'REACT-F-19104-TEMPLATE',
    slug: 'une-page-404',
    title: 'Page 404',
    shortTitle: 'Page 404',
    technology: 'react',
    tomeId: 't9',
    summary: 'La page « introuvable » prête à copier : route attrape-tout et composant 404.',
    lede: 'Gérer les URLs inconnues. Choisis l’étape :',
    aliases: ['404', 'page introuvable', 'not found', 'attrape tout'],
    keywords: ['route etoile', 'url inconnue', 'catch all'],
    relatedContentIds: [],
    lessonId: 'REACT-F-19104-LESSON',
    variants: [
      {
        id: 'route',
        label: 'La route',
        codeBlocks: [
          {
            id: 'REACT-F-19104-t-route',
            filename: 'App.tsx',
            language: 'tsx',
            code: `<Route path="*" element={<PageIntrouvable />} />`,
          },
        ],
        replacements: [
          { token: '<PageIntrouvable />', description: 'ta page 404' },
        ],
        placement: 'En DERNIER dans <Routes>, après toutes les autres routes.',
      },
      {
        id: 'page',
        label: 'La page 404',
        codeBlocks: [
          {
            id: 'REACT-F-19104-t-page',
            filename: 'PageIntrouvable.tsx',
            language: 'tsx',
            code: `import { Link } from "react-router-dom";

function PageIntrouvable() {
  return (
    <div>
      <h1>404 — Page introuvable</h1>
      <Link to="/">Retour a l'accueil</Link>
    </div>
  );
}

export default PageIntrouvable;`,
          },
        ],
        replacements: [
          { token: '404 — Page introuvable', description: 'ton message d’erreur' },
        ],
        placement: 'Un composant de page classique, avec un lien de retour vers l’accueil.',
      },
    ],
  }),

  // ————— Routes protégées —————
  lesson({
    id: 'REACT-F-19105-LESSON',
    slug: 'routes-protegees',
    title: 'Routes protégées',
    shortTitle: 'Routes protégées',
    technology: 'react',
    tomeId: 't9',
    summary:
      'Réserver certaines pages aux utilisateurs connectés : un composant garde qui redirige vers la connexion si l’accès n’est pas autorisé.',
    utility: 'Empêcher l’accès à une page tant que l’utilisateur n’est pas connecté.',
    aliases: [
      'route protegee',
      'private route',
      'auth',
      'connexion requise',
      'garde',
      'rediriger si non connecte',
    ],
    keywords: [
      'page reservee connectes',
      'proteger une route',
      'rediriger vers login',
      'Navigate composant',
      'utilisateur connecte',
      'private route',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-19105-TEMPLATE',
    intro:
      'Certaines pages (profil, tableau de bord) ne doivent s’afficher que si l’utilisateur est <b>connecté</b>. On crée un composant <b>garde</b> qui, selon l’état de connexion, affiche la page ou <b>redirige</b> vers la connexion avec <code>Navigate</code>.',
    sections: [
      {
        id: 's1',
        title: 'Le composant garde',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>que la page “mon profil” renvoie vers la page de connexion si l’utilisateur n’est pas connecté</b>, au lieu de la lui montrer.',
          },
          {
            type: 'paragraph',
            html: 'On crée un composant qui reçoit la page à protéger dans <code>children</code>. S’il n’y a pas d’utilisateur, il retourne <code>Navigate</code> (redirection). Sinon, il affiche <code>children</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19105-l-c1',
              filename: 'RouteProtegee.tsx',
              language: 'tsx',
              code: `import { Navigate } from "react-router-dom";

function RouteProtegee({ children, estConnecte }) {
  // Pas connecte -> on redirige vers la connexion
  if (!estConnecte) {
    return <Navigate to="/connexion" replace />;
  }

  // Connecte -> on affiche la page demandee
  return children;
}

export default RouteProtegee;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À noter :</b> <code>Navigate</code> (un composant JSX) redirige <b>pendant le rendu</b>. C’est différent de <code>useNavigate</code>, qui s’appelle dans un handler.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Protéger une route',
        blocks: [
          {
            type: 'paragraph',
            html: 'On enveloppe la page sensible avec le garde dans l’<code>element</code> de la <code>Route</code>. Seuls les utilisateurs connectés verront le contenu.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19105-l-c2',
              filename: 'App.tsx',
              language: 'tsx',
              code: `import { Routes, Route } from "react-router-dom";
import RouteProtegee from "./RouteProtegee";
import Profil from "./pages/Profil";

<Routes>
  <Route path="/connexion" element={<Connexion />} />

  {/* La page Profil est enveloppee par le garde */}
  <Route
    path="/profil"
    element={
      <RouteProtegee estConnecte={estConnecte}>
        <Profil />
      </RouteProtegee>
    }
  />
</Routes>;`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Rôle'],
            rows: [
              ['<code>RouteProtegee</code>', 'décide : afficher ou rediriger'],
              ['<code>children</code>', 'la page à protéger'],
              ['<code>Navigate</code>', 'redirige pendant le rendu (composant)'],
              ['<code>replace</code>', 'évite de garder la page privée dans l’historique'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>RouteProtegee</code> est le <b>videur</b> devant la porte : badge valide (connecté) → tu entres ; sinon → on te raccompagne vers l’accueil des visiteurs (la connexion).',
          },
        ],
      },
      {
        id: 's3',
        title: 'D’où vient « estConnecte » ?',
        blocks: [
          {
            type: 'paragraph',
            html: 'L’état de connexion vient de ton système d’auth (un <code>state</code>, un contexte, un token en mémoire…). Le garde ne fait que <b>le lire</b>. Ici, une version simple avec un booléen passé en prop.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-19105-l-c3',
              filename: 'App.tsx',
              language: 'tsx',
              code: `import { useState } from "react";

function App() {
  // En vrai : issu d'un contexte, d'un token, d'une API...
  const [estConnecte, setEstConnecte] = useState(false);

  // ... on passe estConnecte au garde (voir plus haut) ...
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Sécurité :</b> une route protégée côté React <b>cache</b> une page, elle ne <b>sécurise</b> rien. Le vrai contrôle se fait <b>côté serveur</b>, sur chaque requête.',
          },
        ],
      },
    ],
    pitfalls: [
      'Croire qu’une route protégée sécurise les données : elle masque juste l’affichage. La <b>vraie</b> protection est côté serveur.',
      'Utiliser <code>useNavigate</code> pendant le rendu pour rediriger : ici c’est <code>Navigate</code> (le composant) qu’il faut retourner.',
      'Oublier <code>replace</code> sur <code>Navigate</code> : l’utilisateur peut revenir en arrière sur la page privée via l’historique.',
      'Lire un état de connexion pas encore chargé : pendant le chargement, prévois un état « en cours » pour ne pas rediriger à tort.',
    ],
    takeaways: [
      'un composant <b>garde</b> décide : afficher <code>children</code> ou rediriger',
      'redirection dans le rendu : <code>return <Navigate to="/connexion" replace /></code>',
      'on enveloppe la page sensible dans l’<code>element</code> de la <code>Route</code>',
      'côté React = affichage seulement · la vraie sécurité est <b>serveur</b>',
    ],
  }),
  template({
    id: 'REACT-F-19105-TEMPLATE',
    slug: 'routes-protegees',
    title: 'Routes protégées',
    shortTitle: 'Routes protégées',
    technology: 'react',
    tomeId: 't9',
    summary: 'Réserver une page aux connectés : composant garde et route enveloppée, prêts à copier.',
    lede: 'Protéger une page. Choisis l’étape :',
    aliases: ['route protegee', 'private route', 'auth', 'garde'],
    keywords: ['rediriger login', 'connexion requise', 'navigate'],
    relatedContentIds: [],
    lessonId: 'REACT-F-19105-LESSON',
    variants: [
      {
        id: 'garde',
        label: 'Le composant garde',
        codeBlocks: [
          {
            id: 'REACT-F-19105-t-garde',
            filename: 'RouteProtegee.tsx',
            language: 'tsx',
            code: `import { Navigate } from "react-router-dom";

function RouteProtegee({ children, estConnecte }) {
  if (!estConnecte) {
    return <Navigate to="/connexion" replace />;
  }
  return children;
}

export default RouteProtegee;`,
          },
        ],
        replacements: [
          { token: 'estConnecte', description: 'ta condition d’accès (booléen de connexion)' },
          { token: '/connexion', description: 'la page vers laquelle rediriger si refusé' },
        ],
        placement: 'Un composant réutilisable pour toutes tes pages privées.',
      },
      {
        id: 'route',
        label: 'Protéger la route',
        codeBlocks: [
          {
            id: 'REACT-F-19105-t-route',
            filename: 'App.tsx',
            language: 'tsx',
            code: `<Route
  path="/profil"
  element={
    <RouteProtegee estConnecte={estConnecte}>
      <Profil />
    </RouteProtegee>
  }
/>`,
          },
        ],
        replacements: [
          { token: '/profil', description: 'l’URL de la page à protéger' },
          { token: '<Profil />', description: 'la page réservée aux connectés' },
        ],
        placement: 'Dans <Routes>. Enveloppe chaque page sensible avec le garde.',
      },
      {
        id: 'redirection',
        label: 'Redirection seule',
        codeBlocks: [
          {
            id: 'REACT-F-19105-t-redirect',
            filename: 'Page.tsx',
            language: 'tsx',
            code: `import { Navigate } from "react-router-dom";

if (!estConnecte) {
  return <Navigate to="/connexion" replace />;
}`,
          },
        ],
        replacements: [
          { token: 'estConnecte', description: 'la condition d’accès' },
          { token: '/connexion', description: 'la destination de la redirection' },
        ],
        placement: 'Pour rediriger pendant le rendu, sans passer par un composant garde dédié.',
      },
    ],
  }),
];
