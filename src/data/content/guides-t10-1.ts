import type { ReadyContent } from '@/types/content';
import { guide } from './_factory';

export const guidesT101Content: ReadyContent[] = [
  // ————— Créer une navbar responsive —————
  guide({
    id: 'GUIDE-W6-100',
    slug: 'creer-une-navbar-responsive',
    title: 'Créer une navbar responsive',
    shortTitle: 'Navbar responsive',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Construire une barre de navigation qui s’adapte au mobile et au desktop avec Flexbox et une media query.',
    objective: 'Une navbar propre qui reste lisible sur toutes les tailles d’écran.',
    preview:
      'Sur desktop : logo à gauche, liens alignés à droite. Sur mobile : les liens passent dessous et restent cliquables.',
    aliases: ['navbar', 'barre de navigation', 'menu horizontal', 'header responsive'],
    keywords: ['navbar responsive', 'flexbox navigation', 'media query', 'barre de menu'],
    relatedContentIds: [],
    files: ['Navbar.tsx', 'navbar.css', 'App.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-100-e1',
        title: 'Le composant Navbar en JSX',
        goal: 'Poser la structure de la barre : logo + liens.',
        explanation:
          'On commence par un composant dédié pour <b>isoler</b> la navigation du reste de l’app. La balise <code>&lt;nav&gt;</code> est sémantique : elle indique aux lecteurs d’écran que c’est la zone de navigation. On sépare le logo et la liste de liens en deux blocs, car ce sont eux qu’on alignera ensuite aux deux extrémités.',
        files: ['Navbar.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-100-cb1',
            filename: 'Navbar.tsx',
            language: 'tsx',
            code: `import "./navbar.css";

// Composant réutilisable : on l’importe une fois dans App
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MonSite</div>
      <ul className="navbar-liens">
        <li><a href="#accueil">Accueil</a></li>
        <li><a href="#produits">Produits</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}`,
          },
        ],
        result: 'La navbar existe, mais elle n’est pas encore mise en forme.',
      },
      {
        id: 'GUIDE-W6-100-e2',
        title: 'Aligner logo et liens avec Flexbox',
        goal: 'Mettre le logo à gauche et les liens à droite sur une même ligne.',
        explanation:
          'Flexbox est l’outil idéal pour une barre horizontale. <code>display: flex</code> place les enfants sur une ligne, et <code>justify-content: space-between</code> pousse le logo et les liens aux <b>deux extrémités</b>. <code>align-items: center</code> les centre verticalement pour qu’ils soient bien alignés.',
        files: ['navbar.css'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-100-cb2',
            filename: 'navbar.css',
            language: 'css',
            code: `.navbar {
  display: flex;                 /* logo et liens sur une ligne */
  justify-content: space-between;/* écartés aux deux bouts */
  align-items: center;           /* centrés verticalement */
  padding: 1rem 1.5rem;
  background: #1e293b;
}

.navbar-liens {
  display: flex;
  gap: 1.5rem;      /* espace entre les liens */
  list-style: none; /* enlève les puces */
  margin: 0;
}

.navbar-liens a {
  color: white;
  text-decoration: none;
}`,
          },
        ],
        result: 'Sur grand écran, la barre est parfaitement alignée.',
      },
      {
        id: 'GUIDE-W6-100-e3',
        title: 'Adapter au mobile avec une media query',
        goal: 'Empiler les liens sous le logo sur petit écran.',
        explanation:
          'Sur mobile, aligner tout sur une ligne déborde. Une <b>media query</b> applique des règles CSS uniquement en dessous d’une certaine largeur. Ici, sous 600&nbsp;px, on passe la navbar en colonne avec <code>flex-direction: column</code> pour que les liens s’empilent proprement au lieu de se serrer.',
        files: ['navbar.css'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-100-cb3',
            filename: 'navbar.css',
            language: 'css',
            code: `/* S’applique seulement quand l’écran fait 600px ou moins */
@media (max-width: 600px) {
  .navbar {
    flex-direction: column; /* logo puis liens, l’un sous l’autre */
    gap: 1rem;
  }

  .navbar-liens {
    flex-direction: column;
    align-items: center;
  }
}`,
          },
        ],
        result: 'La barre s’empile proprement sur téléphone, sans débordement.',
      },
      {
        id: 'GUIDE-W6-100-e4',
        title: 'Brancher la navbar dans l’app',
        goal: 'Afficher la navbar en haut de toutes les pages.',
        explanation:
          'On importe le composant dans <code>App</code> et on le place tout en haut du rendu. Comme c’est un composant, on peut le réutiliser partout sans copier-coller. Le reste de la page vient juste après lui.',
        files: ['App.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-100-cb4',
            filename: 'App.tsx',
            language: 'tsx',
            code: `import Navbar from "./Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <h1>Bienvenue</h1>
      </main>
    </>
  );
}`,
          },
        ],
        result: 'La navbar s’affiche en haut et s’adapte à l’écran.',
      },
    ],
    finalResult:
      'Une navbar responsive sans librairie : Flexbox pour le desktop, une media query pour le mobile, le tout dans un composant réutilisable.',
    pitfalls: [
      'Oublier list-style: none : les puces des <li> restent visibles.',
      'Mettre les liens en dur dans App plutôt que dans un composant : impossible à réutiliser.',
      'Choisir un breakpoint trop petit : les liens se chevauchent sur les tablettes.',
    ],
    variations: [
      'Rendre la navbar collante en haut avec position: sticky; top: 0.',
      'Remplacer les <a> par des <Link> de React Router pour une vraie navigation.',
      'Basculer vers un menu burger sur mobile (voir le guide dédié).',
    ],
  }),

  // ————— Créer un menu burger mobile —————
  guide({
    id: 'GUIDE-W6-101',
    slug: 'creer-un-menu-burger-mobile',
    title: 'Créer un menu burger mobile',
    shortTitle: 'Menu burger',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Cacher les liens derrière une icône ☰ sur mobile et les afficher au clic grâce à un state booléen.',
    objective: 'Un menu mobile qui s’ouvre et se ferme au clic sur l’icône burger.',
    preview:
      'Sur mobile, un bouton ☰ apparaît ; cliquer dessus déroule les liens, recliquer les cache.',
    aliases: ['menu burger', 'hamburger menu', 'menu mobile', 'toggle menu'],
    keywords: ['menu burger', 'toggle mobile', 'ouvrir fermer menu', 'navigation mobile'],
    relatedContentIds: [],
    files: ['MenuBurger.tsx', 'menu-burger.css'],
    steps: [
      {
        id: 'GUIDE-W6-101-e1',
        title: 'Un state pour l’ouverture du menu',
        goal: 'Mémoriser si le menu est déroulé ou non.',
        explanation:
          'Un menu burger n’a que deux états : ouvert ou fermé. Un simple booléen dans un <code>useState</code> suffit. On part de <code>false</code> pour que le menu soit <b>fermé au chargement</b>, ce qui est le comportement attendu sur mobile.',
        files: ['MenuBurger.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-101-cb1',
            filename: 'MenuBurger.tsx',
            language: 'tsx',
            code: `import { useState } from "react";
import "./menu-burger.css";

export default function MenuBurger() {
  // false = fermé, true = ouvert
  const [ouvert, setOuvert] = useState(false);
  // ... suite dans l’étape suivante
}`,
          },
        ],
        result: 'On a un interrupteur ouvert / fermé pour le menu.',
      },
      {
        id: 'GUIDE-W6-101-e2',
        title: 'Le bouton burger qui inverse le state',
        goal: 'Basculer entre ouvert et fermé à chaque clic.',
        explanation:
          'Le bouton appelle <code>setOuvert(!ouvert)</code> : il <b>inverse</b> la valeur actuelle. Un clic ouvre, le suivant ferme. On change aussi l’icône (☰ vs ✕) selon l’état pour donner un repère visuel clair à l’utilisateur.',
        files: ['MenuBurger.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-101-cb2',
            filename: 'MenuBurger.tsx',
            language: 'tsx',
            code: `<button
  type="button"
  className="burger"
  aria-label="Ouvrir le menu"
  onClick={() => setOuvert(!ouvert)} // inverse l’état
>
  {ouvert ? "✕" : "☰"}
</button>`,
          },
        ],
        result: 'Le bouton alterne entre ☰ et ✕ à chaque clic.',
      },
      {
        id: 'GUIDE-W6-101-e3',
        title: 'Afficher les liens selon l’état',
        goal: 'Montrer la liste seulement quand le menu est ouvert.',
        explanation:
          'On utilise le rendu conditionnel <code>{ouvert &amp;&amp; (…)}</code> : les liens n’existent dans la page que si <code>ouvert</code> vaut <code>true</code>. C’est plus propre que de les cacher en CSS, car ils sont réellement retirés du DOM quand le menu est fermé.',
        files: ['MenuBurger.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-101-cb3',
            filename: 'MenuBurger.tsx',
            language: 'tsx',
            code: `{ouvert && (
  <ul className="menu-liens">
    <li><a href="#accueil">Accueil</a></li>
    <li><a href="#produits">Produits</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
)}`,
          },
        ],
        result: 'Les liens apparaissent au clic et disparaissent au reclic.',
      },
      {
        id: 'GUIDE-W6-101-e4',
        title: 'Cacher le burger sur desktop',
        goal: 'Réserver le bouton burger aux petits écrans.',
        explanation:
          'Le burger n’a de sens que sur mobile. On le cache par défaut avec <code>display: none</code> et on ne l’affiche qu’en dessous de 600&nbsp;px via une media query. Sur desktop, on affichera les liens normalement.',
        files: ['menu-burger.css'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-101-cb4',
            filename: 'menu-burger.css',
            language: 'css',
            code: `.burger {
  display: none; /* caché par défaut (desktop) */
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

/* On n’affiche le burger que sur mobile */
@media (max-width: 600px) {
  .burger {
    display: block;
  }
}

.menu-liens {
  list-style: none;
  padding: 0;
}`,
          },
        ],
        result: 'Le burger n’apparaît que sur mobile, le menu se déroule au clic.',
      },
    ],
    finalResult:
      'Un menu burger complet : un booléen de state, un bouton qui l’inverse, un rendu conditionnel pour les liens, et une media query pour le réserver au mobile.',
    pitfalls: [
      'Cacher les liens en CSS au lieu du rendu conditionnel : ils restent dans le DOM et accessibles au clavier.',
      'Oublier aria-label sur le bouton : le menu devient illisible pour les lecteurs d’écran.',
      'Ne pas fermer le menu après un clic sur un lien : il reste ouvert par-dessus la page.',
    ],
    variations: [
      'Fermer automatiquement le menu quand on clique sur un lien (setOuvert(false)).',
      'Ajouter une animation de glissement avec transition en CSS.',
      'Combiner ce menu avec la navbar responsive du guide dédié.',
    ],
  }),

  // ————— Créer un système d’onglets —————
  guide({
    id: 'GUIDE-W6-102',
    slug: 'creer-un-systeme-d-onglets',
    title: 'Créer un système d’onglets',
    shortTitle: 'Onglets',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Afficher un contenu différent selon l’onglet actif, mémorisé dans un state.',
    objective: 'Des onglets cliquables qui changent le contenu affiché.',
    preview:
      'Trois boutons « Description / Avis / Livraison » ; cliquer sur l’un affiche son contenu, l’onglet actif est mis en évidence.',
    aliases: ['onglets', 'tabs', 'système d’onglets', 'navigation par onglets'],
    keywords: ['onglets react', 'tabs', 'onglet actif', 'contenu conditionnel'],
    relatedContentIds: [],
    files: ['Onglets.tsx', 'onglets.css'],
    steps: [
      {
        id: 'GUIDE-W6-102-e1',
        title: 'Un state pour l’onglet actif',
        goal: 'Mémoriser quel onglet est sélectionné.',
        explanation:
          'On stocke l’identifiant de l’onglet actif dans un state. On part de <code>"description"</code> pour qu’un onglet soit <b>déjà ouvert</b> au chargement. C’est cette valeur qui décidera à la fois du contenu affiché et de l’onglet mis en surbrillance.',
        files: ['Onglets.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-102-cb1',
            filename: 'Onglets.tsx',
            language: 'tsx',
            code: `import { useState } from "react";
import "./onglets.css";

export default function Onglets() {
  // l’onglet ouvert au départ
  const [actif, setActif] = useState("description");
  // ... suite dans les étapes suivantes
}`,
          },
        ],
        result: 'On sait à tout moment quel onglet est sélectionné.',
      },
      {
        id: 'GUIDE-W6-102-e2',
        title: 'Les boutons d’onglets',
        goal: 'Changer l’onglet actif au clic et marquer le bouton courant.',
        explanation:
          'Chaque bouton appelle <code>setActif</code> avec son propre identifiant. On ajoute la classe <code>actif</code> uniquement au bouton dont l’id correspond au state, grâce à un <b>ternaire</b>. C’est ce qui permet de styliser visuellement l’onglet en cours.',
        files: ['Onglets.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-102-cb2',
            filename: 'Onglets.tsx',
            language: 'tsx',
            code: `<div className="onglets-barre">
  <button
    type="button"
    className={actif === "description" ? "actif" : ""}
    onClick={() => setActif("description")}
  >
    Description
  </button>
  <button
    type="button"
    className={actif === "avis" ? "actif" : ""}
    onClick={() => setActif("avis")}
  >
    Avis
  </button>
  <button
    type="button"
    className={actif === "livraison" ? "actif" : ""}
    onClick={() => setActif("livraison")}
  >
    Livraison
  </button>
</div>`,
          },
        ],
        result: 'Le bon bouton se met en évidence quand on clique dessus.',
      },
      {
        id: 'GUIDE-W6-102-e3',
        title: 'Afficher le contenu du bon onglet',
        goal: 'Montrer un contenu différent selon l’onglet actif.',
        explanation:
          'On affiche un bloc par onglet, chacun conditionné par <code>{actif === "…" &amp;&amp; (…)}</code>. Un seul bloc est visible à la fois, celui qui correspond au state. C’est le même principe de rendu conditionnel qu’une modale, appliqué à plusieurs zones.',
        files: ['Onglets.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-102-cb3',
            filename: 'Onglets.tsx',
            language: 'tsx',
            code: `<div className="onglets-contenu">
  {actif === "description" && <p>Voici la description du produit.</p>}
  {actif === "avis" && <p>Les clients adorent ce produit !</p>}
  {actif === "livraison" && <p>Livraison en 2 à 4 jours ouvrés.</p>}
</div>`,
          },
        ],
        result: 'Le contenu change instantanément selon l’onglet cliqué.',
      },
      {
        id: 'GUIDE-W6-102-e4',
        title: 'Styliser l’onglet actif',
        goal: 'Rendre l’onglet en cours visuellement distinct.',
        explanation:
          'La classe <code>actif</code> ajoutée en JSX sert de cible en CSS. On lui donne une couleur et une bordure basse pour montrer clairement lequel est sélectionné. Sans ce repère visuel, l’utilisateur ne sait pas où il se trouve.',
        files: ['onglets.css'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-102-cb4',
            filename: 'onglets.css',
            language: 'css',
            code: `.onglets-barre button {
  border: none;
  background: none;
  padding: 0.75rem 1rem;
  cursor: pointer;
}

/* l’onglet sélectionné se démarque */
.onglets-barre button.actif {
  color: #2563eb;
  border-bottom: 2px solid #2563eb;
  font-weight: bold;
}`,
          },
        ],
        result: 'L’onglet actif est clairement mis en avant.',
      },
    ],
    finalResult:
      'Un système d’onglets complet : un state pour l’onglet actif, des boutons qui le changent, un rendu conditionnel pour le contenu et un style pour l’onglet courant.',
    pitfalls: [
      'Créer un state par onglet au lieu d’un seul state « actif » : ingérable dès qu’on ajoute un onglet.',
      'Oublier de styliser l’onglet actif : l’utilisateur ne sait pas où il est.',
      'Afficher tous les contenus en même temps : le rendu conditionnel est indispensable.',
    ],
    variations: [
      'Générer les onglets par map à partir d’un tableau de données.',
      'Mémoriser l’onglet actif dans l’URL pour pouvoir la partager.',
      'Ajouter une transition de fondu au changement d’onglet.',
    ],
  }),

  // ————— Créer un accordéon ou FAQ —————
  guide({
    id: 'GUIDE-W6-103',
    slug: 'creer-un-accordeon-ou-faq',
    title: 'Créer un accordéon ou FAQ',
    shortTitle: 'Accordéon',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Afficher une liste de questions dont on déroule la réponse au clic, une seule ouverte à la fois.',
    objective: 'Une FAQ où chaque question ouvre et ferme sa réponse.',
    preview:
      'Une liste de questions ; cliquer sur l’une déroule sa réponse et referme la précédente.',
    aliases: ['accordéon', 'accordion', 'faq', 'questions réponses'],
    keywords: ['accordeon react', 'faq', 'déplier réponse', 'toggle contenu'],
    relatedContentIds: [],
    files: ['Faq.tsx', 'faq.css'],
    steps: [
      {
        id: 'GUIDE-W6-103-e1',
        title: 'Les données de la FAQ',
        goal: 'Stocker les questions et réponses dans un tableau.',
        explanation:
          'Plutôt que d’écrire chaque question à la main dans le JSX, on les met dans un <b>tableau d’objets</b>. Chaque objet a un <code>id</code> unique (essentiel pour la <code>key</code> et pour savoir lequel est ouvert), une question et une réponse. On pourra ainsi tout générer par <code>map</code>.',
        files: ['Faq.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-103-cb1',
            filename: 'Faq.tsx',
            language: 'tsx',
            code: `const questions = [
  { id: 1, q: "Comment commander ?", r: "Ajoute au panier puis valide." },
  { id: 2, q: "Quels délais ?", r: "Entre 2 et 4 jours ouvrés." },
  { id: 3, q: "Puis-je retourner ?", r: "Oui, sous 30 jours." },
];`,
          },
        ],
        result: 'Les questions sont prêtes à être affichées dynamiquement.',
      },
      {
        id: 'GUIDE-W6-103-e2',
        title: 'Un state pour la question ouverte',
        goal: 'Mémoriser quelle question est dépliée.',
        explanation:
          'On stocke l’<code>id</code> de la question ouverte, ou <code>null</code> si tout est fermé. Un seul state pour toute la liste garantit qu’<b>une seule réponse</b> est ouverte à la fois : ouvrir une question referme automatiquement l’autre.',
        files: ['Faq.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-103-cb2',
            filename: 'Faq.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

// null = aucune réponse ouverte
const [ouverte, setOuverte] = useState<number | null>(null);`,
          },
        ],
        result: 'On sait quelle question est dépliée, ou aucune.',
      },
      {
        id: 'GUIDE-W6-103-e3',
        title: 'Basculer l’ouverture au clic',
        goal: 'Ouvrir la question cliquée, ou la refermer si elle l’était déjà.',
        explanation:
          'Au clic, on compare l’<code>id</code> cliqué à celui déjà ouvert. Si c’est le même, on remet <code>null</code> (on referme). Sinon, on ouvre le nouveau. Cette logique <b>toggle</b> permet de refermer une question en recliquant dessus.',
        files: ['Faq.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-103-cb3',
            filename: 'Faq.tsx',
            language: 'tsx',
            code: `function basculer(id: number) {
  // même question déjà ouverte -> on ferme, sinon on ouvre
  setOuverte(ouverte === id ? null : id);
}`,
          },
        ],
        result: 'Cliquer ouvre une question, recliquer la referme.',
      },
      {
        id: 'GUIDE-W6-103-e4',
        title: 'Afficher la liste avec map',
        goal: 'Générer chaque question et n’afficher sa réponse que si elle est ouverte.',
        explanation:
          'On parcourt le tableau avec <code>map</code>. Chaque question est un bouton qui appelle <code>basculer</code>. La réponse n’apparaît que si son <code>id</code> correspond au state, grâce au rendu conditionnel. La <code>key</code> sur chaque élément aide React à suivre la liste.',
        files: ['Faq.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-103-cb4',
            filename: 'Faq.tsx',
            language: 'tsx',
            code: `<div className="faq">
  {questions.map((item) => (
    <div key={item.id} className="faq-item">
      <button type="button" onClick={() => basculer(item.id)}>
        {item.q}
      </button>
      {ouverte === item.id && <p className="faq-reponse">{item.r}</p>}
    </div>
  ))}
</div>`,
          },
        ],
        result: 'La FAQ se déroule question par question, une seule ouverte à la fois.',
      },
    ],
    finalResult:
      'Une FAQ en accordéon : un tableau de données, un state qui retient l’id ouvert, une logique toggle et un rendu conditionnel par map.',
    pitfalls: [
      'Utiliser un booléen par question : on ne peut plus garantir une seule réponse ouverte.',
      'Oublier la key dans le map : React affiche un avertissement et se mélange.',
      'Comparer avec == au lieu de === : source de bugs sur les identifiants.',
    ],
    variations: [
      'Autoriser plusieurs réponses ouvertes en stockant un tableau d’ids.',
      'Animer l’ouverture avec une transition sur max-height.',
      'Charger les questions depuis une API plutôt qu’un tableau en dur.',
    ],
  }),

  // ————— Créer un dark mode —————
  guide({
    id: 'GUIDE-W6-104',
    slug: 'creer-un-dark-mode',
    title: 'Créer un dark mode',
    shortTitle: 'Dark mode',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Basculer entre thème clair et sombre avec une classe sur le body et des variables CSS, mémorisé dans le navigateur.',
    objective: 'Un bouton qui bascule le site en mode sombre et retient le choix.',
    preview:
      'Un bouton 🌙 / ☀️ change les couleurs de toute la page ; le choix est conservé au rechargement.',
    aliases: ['dark mode', 'mode sombre', 'thème sombre', 'theme toggle'],
    keywords: ['dark mode react', 'thème sombre', 'variables css', 'localstorage theme'],
    relatedContentIds: [],
    files: ['ThemeToggle.tsx', 'theme.css'],
    steps: [
      {
        id: 'GUIDE-W6-104-e1',
        title: 'Définir les couleurs en variables CSS',
        goal: 'Préparer deux jeux de couleurs, clair et sombre.',
        explanation:
          'On centralise les couleurs dans des <b>variables CSS</b> sur <code>:root</code>. Quand le body porte la classe <code>sombre</code>, on redéfinit ces mêmes variables. Tout le site utilisant <code>var(--fond)</code>, changer une seule classe suffit à repeindre toute la page.',
        files: ['theme.css'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-104-cb1',
            filename: 'theme.css',
            language: 'css',
            code: `:root {
  --fond: #ffffff;
  --texte: #1e293b;
}

/* quand le body a la classe .sombre, on change les variables */
body.sombre {
  --fond: #0f172a;
  --texte: #f1f5f9;
}

body {
  background: var(--fond);
  color: var(--texte);
}`,
          },
        ],
        result: 'Deux thèmes sont prêts, pilotés par une seule classe.',
      },
      {
        id: 'GUIDE-W6-104-e2',
        title: 'Un state pour le thème',
        goal: 'Mémoriser si le mode sombre est actif.',
        explanation:
          'Un booléen <code>sombre</code> suffit. On l’initialise en <b>lisant le localStorage</b> : si l’utilisateur avait déjà choisi le mode sombre lors d’une visite précédente, on le réapplique. Sinon on part en clair.',
        files: ['ThemeToggle.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-104-cb2',
            filename: 'ThemeToggle.tsx',
            language: 'tsx',
            code: `import { useState, useEffect } from "react";

export default function ThemeToggle() {
  // on relit le choix précédent au démarrage
  const [sombre, setSombre] = useState(
    () => localStorage.getItem("theme") === "sombre"
  );
  // ... suite dans les étapes suivantes
}`,
          },
        ],
        result: 'Le state connaît le thème, même après un rechargement.',
      },
      {
        id: 'GUIDE-W6-104-e3',
        title: 'Appliquer la classe et sauvegarder',
        goal: 'Refléter le state sur le body et le mémoriser.',
        explanation:
          'Un <code>useEffect</code> synchronise le DOM avec le state : il ajoute ou retire la classe <code>sombre</code> sur le <code>&lt;body&gt;</code> et enregistre le choix dans <code>localStorage</code>. Comme il dépend de <code>sombre</code>, il se rejoue à chaque changement de thème.',
        files: ['ThemeToggle.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-104-cb3',
            filename: 'ThemeToggle.tsx',
            language: 'tsx',
            code: `useEffect(() => {
  document.body.classList.toggle("sombre", sombre);
  // on retient le choix pour la prochaine visite
  localStorage.setItem("theme", sombre ? "sombre" : "clair");
}, [sombre]);`,
          },
        ],
        result: 'La page change de thème et le choix est sauvegardé.',
      },
      {
        id: 'GUIDE-W6-104-e4',
        title: 'Le bouton de bascule',
        goal: 'Inverser le thème au clic.',
        explanation:
          'Le bouton appelle <code>setSombre(!sombre)</code> pour inverser le thème. On change l’icône (🌙 ou ☀️) selon l’état pour indiquer clairement l’action. Tout le reste se met à jour tout seul grâce au useEffect.',
        files: ['ThemeToggle.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-104-cb4',
            filename: 'ThemeToggle.tsx',
            language: 'tsx',
            code: `<button
  type="button"
  onClick={() => setSombre(!sombre)}
  aria-label="Changer de thème"
>
  {sombre ? "☀️" : "🌙"}
</button>`,
          },
        ],
        result: 'Un clic bascule tout le site entre clair et sombre.',
      },
    ],
    finalResult:
      'Un dark mode complet : variables CSS pour les deux thèmes, un state booléen, un useEffect qui applique la classe et sauvegarde dans localStorage.',
    pitfalls: [
      'Coder les couleurs en dur partout : impossible de basculer sans variables CSS.',
      'Oublier de sauvegarder dans localStorage : le choix est perdu à chaque rechargement.',
      'Lire localStorage en dehors de l’initialisation : risque de flash de mauvais thème.',
    ],
    variations: [
      'Détecter le thème système avec prefers-color-scheme au premier chargement.',
      'Partager le thème dans toute l’app via un Context React.',
      'Ajouter une transition douce sur les couleurs.',
    ],
  }),

  // ————— Créer des notifications toast —————
  guide({
    id: 'GUIDE-W6-105',
    slug: 'creer-des-notifications-toast',
    title: 'Créer des notifications toast',
    shortTitle: 'Toasts',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Afficher des petits messages temporaires qui apparaissent puis disparaissent tout seuls après quelques secondes.',
    objective: 'Un système de toasts qui empile des messages et les efface automatiquement.',
    preview:
      'Cliquer sur un bouton fait apparaître un message en bas à droite qui s’efface après 3 secondes.',
    aliases: ['toast', 'notification', 'message temporaire', 'snackbar'],
    keywords: ['toast react', 'notification temporaire', 'settimeout', 'message flash'],
    relatedContentIds: [],
    files: ['Toasts.tsx', 'toasts.css'],
    steps: [
      {
        id: 'GUIDE-W6-105-e1',
        title: 'Un tableau de toasts dans le state',
        goal: 'Stocker plusieurs messages affichés en même temps.',
        explanation:
          'Comme plusieurs toasts peuvent coexister, on stocke un <b>tableau</b> dans le state. Chaque toast est un objet avec un <code>id</code> unique (pour la key et pour le supprimer) et un <code>message</code>. Le tableau vide au départ signifie « aucune notification ».',
        files: ['Toasts.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-105-cb1',
            filename: 'Toasts.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

type Toast = { id: number; message: string };

export default function Toasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  // ... suite dans les étapes suivantes
}`,
          },
        ],
        result: 'On peut gérer plusieurs notifications à la fois.',
      },
      {
        id: 'GUIDE-W6-105-e2',
        title: 'Ajouter puis retirer un toast',
        goal: 'Afficher un message et le supprimer après 3 secondes.',
        explanation:
          'La fonction <code>ajouter</code> crée un toast avec un id basé sur <code>Date.now()</code> et l’ajoute au tableau. On programme sa suppression avec <code>setTimeout</code> : après 3&nbsp;s, on <b>filtre</b> le tableau pour retirer ce toast par son id. C’est ce qui rend la notification temporaire.',
        files: ['Toasts.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-105-cb2',
            filename: 'Toasts.tsx',
            language: 'tsx',
            code: `function ajouter(message: string) {
  const id = Date.now();
  // on ajoute le nouveau toast à la liste
  setToasts((liste) => [...liste, { id, message }]);
  // on le retire automatiquement après 3 secondes
  setTimeout(() => {
    setToasts((liste) => liste.filter((t) => t.id !== id));
  }, 3000);
}`,
          },
        ],
        result: 'Un toast apparaît puis s’efface seul au bout de 3 secondes.',
      },
      {
        id: 'GUIDE-W6-105-e3',
        title: 'Afficher la pile de toasts',
        goal: 'Rendre chaque message à l’écran.',
        explanation:
          'On parcourt le tableau avec <code>map</code> pour afficher chaque toast, avec sa <code>key</code>. Un bouton de test appelle <code>ajouter</code>. Le conteneur <code>.toasts</code> sera positionné en fixe pour empiler les messages au même endroit.',
        files: ['Toasts.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-105-cb3',
            filename: 'Toasts.tsx',
            language: 'tsx',
            code: `return (
  <>
    <button type="button" onClick={() => ajouter("Enregistré !")}>
      Tester
    </button>
    <div className="toasts">
      {toasts.map((t) => (
        <div key={t.id} className="toast">{t.message}</div>
      ))}
    </div>
  </>
);`,
          },
        ],
        result: 'Les messages s’empilent visuellement à l’écran.',
      },
      {
        id: 'GUIDE-W6-105-e4',
        title: 'Positionner les toasts en fixe',
        goal: 'Fixer la pile en bas à droite de l’écran.',
        explanation:
          'On utilise <code>position: fixed</code> pour que les toasts restent en bas à droite même quand on scrolle. Un <code>display: flex</code> en colonne les empile proprement. Le <code>z-index</code> élevé les garde au-dessus du reste de la page.',
        files: ['toasts.css'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-105-cb4',
            filename: 'toasts.css',
            language: 'css',
            code: `.toasts {
  position: fixed;   /* reste visible au scroll */
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1000;     /* au-dessus du reste */
}

.toast {
  background: #1e293b;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}`,
          },
        ],
        result: 'Les toasts apparaissent en bas à droite, au-dessus de tout.',
      },
    ],
    finalResult:
      'Un système de toasts autonome : un tableau de messages dans le state, un setTimeout qui les efface, un map pour les afficher et un positionnement fixe.',
    pitfalls: [
      'Utiliser l’index du tableau comme id : deux toasts créés vite peuvent entrer en conflit.',
      'Modifier le tableau directement au lieu de le recréer : React ne détecte pas le changement.',
      'Oublier le z-index : les toasts se cachent derrière d’autres éléments.',
    ],
    variations: [
      'Ajouter des types (succès, erreur) avec une couleur par type.',
      'Permettre de fermer un toast à la main avec une croix.',
      'Extraire la logique dans un Context pour déclencher un toast depuis n’importe où.',
    ],
  }),

  // ————— Créer un loader ou skeleton —————
  guide({
    id: 'GUIDE-W6-106',
    slug: 'creer-un-loader-ou-skeleton',
    title: 'Créer un loader ou skeleton',
    shortTitle: 'Loader / skeleton',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Afficher un indicateur de chargement, du simple spinner au skeleton qui imite la forme du contenu à venir.',
    objective: 'Montrer un état de chargement clair pendant l’attente des données.',
    preview:
      'Pendant le chargement, des blocs gris animés remplacent le contenu ; une fois prêt, les vraies données s’affichent.',
    aliases: ['loader', 'skeleton', 'spinner', 'indicateur de chargement'],
    keywords: ['loader react', 'skeleton screen', 'spinner css', 'état de chargement'],
    relatedContentIds: [],
    files: ['Liste.tsx', 'skeleton.css'],
    steps: [
      {
        id: 'GUIDE-W6-106-e1',
        title: 'Un state de chargement',
        goal: 'Savoir si les données sont prêtes ou non.',
        explanation:
          'On utilise un booléen <code>chargement</code>, à <code>true</code> au départ car on charge dès l’ouverture. Une fois les données récupérées, on le passe à <code>false</code>. C’est ce booléen qui décidera d’afficher le skeleton ou le vrai contenu.',
        files: ['Liste.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-106-cb1',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `import { useState, useEffect } from "react";
import "./skeleton.css";

export default function Liste() {
  const [chargement, setChargement] = useState(true);
  const [donnees, setDonnees] = useState<string[]>([]);
  // ... suite dans les étapes suivantes
}`,
          },
        ],
        result: 'On distingue l’état « en attente » de l’état « prêt ».',
      },
      {
        id: 'GUIDE-W6-106-e2',
        title: 'Simuler un chargement',
        goal: 'Récupérer les données puis couper le loader.',
        explanation:
          'Ici on simule une requête lente avec <code>setTimeout</code> (dans un vrai projet, ce serait un <code>fetch</code>). L’important est de passer <code>chargement</code> à <code>false</code> <b>après</b> avoir reçu les données, pour basculer du skeleton au contenu.',
        files: ['Liste.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-106-cb2',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `useEffect(() => {
  // simulation d’une API qui répond en 1,5 s
  const t = setTimeout(() => {
    setDonnees(["Pomme", "Poire", "Cerise"]);
    setChargement(false); // les données sont là
  }, 1500);
  return () => clearTimeout(t); // nettoyage
}, []);`,
          },
        ],
        result: 'Après un court délai, les données arrivent et le loader se coupe.',
      },
      {
        id: 'GUIDE-W6-106-e3',
        title: 'Afficher le skeleton pendant l’attente',
        goal: 'Montrer des blocs gris tant que ça charge.',
        explanation:
          'Tant que <code>chargement</code> est vrai, on affiche des blocs vides qui <b>imitent la forme</b> du contenu final. C’est mieux qu’un texte « Chargement… » car l’utilisateur perçoit déjà la mise en page. On génère quelques blocs avec <code>Array.from</code>.',
        files: ['Liste.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-106-cb3',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `if (chargement) {
  return (
    <ul>
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="skeleton" />
      ))}
    </ul>
  );
}

return (
  <ul>
    {donnees.map((nom) => <li key={nom}>{nom}</li>)}
  </ul>
);`,
          },
        ],
        result: 'Des blocs gris s’affichent, puis laissent place aux vraies données.',
      },
      {
        id: 'GUIDE-W6-106-e4',
        title: 'Animer le skeleton en CSS',
        goal: 'Donner l’effet de « pulsation » qui signale l’attente.',
        explanation:
          'On anime le fond avec des <code>keyframes</code> qui font varier l’opacité : c’est l’effet « pulse » qui indique visuellement que quelque chose arrive. Une hauteur fixe et un fond gris suffisent à imiter une ligne de contenu.',
        files: ['skeleton.css'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-106-cb4',
            filename: 'skeleton.css',
            language: 'css',
            code: `.skeleton {
  height: 1.5rem;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
  background: #cbd5e1;
  list-style: none;
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; } /* effet de battement */
}`,
          },
        ],
        result: 'Le skeleton pulse doucement, signalant clairement le chargement.',
      },
    ],
    finalResult:
      'Un chargement soigné : un state booléen, un skeleton qui imite le contenu et pulse en CSS, remplacé par les vraies données une fois prêtes.',
    pitfalls: [
      'Laisser l’écran vide pendant l’attente : l’utilisateur croit que ça a planté.',
      'Oublier de repasser chargement à false : le skeleton reste affiché pour toujours.',
      'Faire un skeleton très différent du contenu réel : la page « saute » au chargement.',
    ],
    variations: [
      'Remplacer le skeleton par un simple spinner animé en CSS.',
      'Adapter la forme du skeleton à des cartes plutôt qu’à des lignes.',
      'Combiner avec le guide « Créer une API React » pour un vrai fetch.',
    ],
  }),
];
