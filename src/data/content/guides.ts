import type { ReadyContent } from '@/types/content';
import { guide } from './_factory';

export const guidesContent: ReadyContent[] = [
  // ————— Créer une modale —————
  guide({
    id: 'GUIDE-G-003',
    slug: 'creer-une-modale',
    title: 'Créer une modale ou popup',
    shortTitle: 'Modale',
    technology: 'react',
    tomeId: 't10',
    summary: 'Afficher une fenêtre par-dessus la page, ouverte/fermée par un booléen de state.',
    objective: 'Une modale qui s’ouvre au clic et se ferme, réutilisable.',
    preview:
      'Un bouton « Ouvrir » affiche une fenêtre centrée avec un fond sombre ; un bouton « Fermer » la masque.',
    aliases: ['modale', 'popup', 'dialog', 'overlay', 'fenetre'],
    keywords: ['ouvrir fermer', 'popup', 'fenetre modale', 'overlay'],
    relatedContentIds: ['REACT-F-020-LESSON', 'REACT-F-030-LESSON'],
    usesContentIds: ['REACT-F-020-LESSON', 'REACT-F-030-LESSON'],
    files: ['Modale.tsx', 'App.tsx'],
    steps: [
      {
        id: 'e1',
        title: 'Un state booléen pour l’ouverture',
        goal: 'Mémoriser si la modale est ouverte.',
        explanation:
          'Une modale n’a que deux états : ouverte ou fermée. Un booléen suffit donc. On le met dans un <code>useState</code> pour que React ré-affiche automatiquement dès qu’il change. On part de <code>false</code> : la modale est fermée au chargement.',
        files: ['App.tsx'],
        relatedContentIds: ['REACT-F-020-TEMPLATE'],
        codeBlocks: [
          {
            id: 'guide-modale-1',
            filename: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

const [ouvert, setOuvert] = useState(false);`,
          },
        ],
        result: 'On a un interrupteur ouvert / fermé.',
      },
      {
        id: 'e2',
        title: 'Ouvrir et fermer au clic',
        goal: 'Deux boutons qui changent le booléen.',
        explanation:
          'Le bouton « Ouvrir » passe le booléen à <code>true</code>, celui « Fermer » à <code>false</code>. L’astuce clé est le rendu conditionnel <code>{ouvert && ( … )}</code> : la fenêtre n’existe dans la page que si <code>ouvert</code> vaut <code>true</code>. Le fond sombre (<code>.backdrop</code>) recouvre la page, la boîte <code>.modale</code> est au centre.',
        files: ['App.tsx'],
        relatedContentIds: ['REACT-F-030-TEMPLATE'],
        codeBlocks: [
          {
            id: 'guide-modale-2',
            filename: 'App.tsx',
            language: 'tsx',
            code: `<button type="button" onClick={() => setOuvert(true)}>Ouvrir</button>

{ouvert && (
  <div className="backdrop">
    <div className="modale">
      <p>Contenu de la modale</p>
      <button type="button" onClick={() => setOuvert(false)}>Fermer</button>
    </div>
  </div>
)}`,
          },
        ],
        result: 'La modale apparaît quand ouvert est vrai, disparaît sinon.',
      },
    ],
    finalResult:
      'Une modale contrôlée par un booléen : ouverture/fermeture instantanées, sans librairie.',
    pitfalls: [
      'Oublier de fermer au clic sur le fond : ajoute onClick sur .backdrop → setOuvert(false).',
      'Ne pas gérer la touche Échap : ajoute un useEffect qui écoute keydown.',
    ],
    variations: [
      'Fermer au clic sur le fond sombre (onClick sur .backdrop).',
      'Fermer avec la touche Échap (useEffect + keydown).',
      'Ajouter une animation d’apparition en CSS (opacity + transform).',
    ],
  }),

  // ————— Créer une recherche —————
  guide({
    id: 'GUIDE-G-017',
    slug: 'creer-une-recherche',
    title: 'Créer une recherche',
    shortTitle: 'Recherche',
    technology: 'react',
    tomeId: 't8',
    summary: 'Filtrer une liste en direct selon ce que l’utilisateur tape.',
    objective: 'Un champ qui filtre une liste à la frappe.',
    preview: 'Un champ de recherche au-dessus d’une liste ; taper « ba » ne garde que « Banane ».',
    aliases: ['recherche', 'search', 'filtrer', 'barre de recherche'],
    keywords: ['filtrer liste', 'rechercher', 'search input', 'temps reel'],
    relatedContentIds: ['REACT-F-031-LESSON', 'JS-F-010-LESSON'],
    usesContentIds: ['REACT-F-031-LESSON', 'JS-F-010-LESSON', 'REACT-F-007-LESSON'],
    files: ['Recherche.tsx'],
    steps: [
      {
        id: 'e1',
        title: 'Un champ contrôlé pour la requête',
        goal: 'Stocker la saisie dans un state.',
        explanation:
          'La recherche a besoin de connaître ce que l’utilisateur tape, à chaque frappe. On lie donc l’<code>input</code> à un state (<code>q</code>) : c’est un « champ contrôlé ». À chaque frappe, <code>onChange</code> met à jour <code>q</code>, et React ré-affiche la liste filtrée.',
        files: ['Recherche.tsx'],
        relatedContentIds: ['REACT-F-031-TEMPLATE'],
        codeBlocks: [
          {
            id: 'guide-search-1',
            filename: 'Recherche.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

const [q, setQ] = useState("");

<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher" />`,
          },
        ],
        result: 'La requête est toujours connue de React.',
      },
      {
        id: 'e2',
        title: 'Filtrer la liste avec filter',
        goal: 'Ne garder que ce qui correspond.',
        explanation:
          'On ne stocke pas une deuxième liste : on <b>dérive</b> les résultats à partir de la liste d’origine et de <code>q</code>. <code>filter</code> garde les éléments dont le nom contient la requête. On passe tout en minuscules avec <code>toLowerCase()</code> pour que « Banane » corresponde à « banane ». Puis <code>map</code> affiche le résultat.',
        files: ['Recherche.tsx'],
        relatedContentIds: ['JS-F-010-TEMPLATE', 'REACT-F-007-TEMPLATE'],
        codeBlocks: [
          {
            id: 'guide-search-2',
            filename: 'Recherche.tsx',
            language: 'tsx',
            code: `const resultats = fruits.filter((f) =>
  f.nom.toLowerCase().includes(q.toLowerCase())
);

<ul>
  {resultats.map((f) => <li key={f.id}>{f.nom}</li>)}
</ul>`,
          },
        ],
        result: 'La liste se réduit en direct à chaque frappe.',
      },
    ],
    finalResult: 'Une recherche instantanée : champ contrôlé + filter + map, insensible à la casse.',
    pitfalls: [
      'Comparer sans normaliser la casse : « Banane » ne matcherait pas « banane ».',
      'Filtrer une très grande liste à chaque frappe : pense au debounce plus tard.',
    ],
    variations: [
      'Ignorer aussi les accents (normalize + remplacement des diacritiques).',
      'Ajouter une autocomplétion (liste de suggestions sous le champ).',
      'Retarder le filtrage avec un debounce si la liste est énorme.',
    ],
  }),

  // ————— Créer un filtre par catégorie —————
  guide({
    id: 'GUIDE-G-019',
    slug: 'creer-un-filtre-par-categorie',
    title: 'Créer un filtre par catégorie',
    shortTitle: 'Filtre catégorie',
    technology: 'react',
    tomeId: 't8',
    summary: 'Afficher des boutons de catégorie et filtrer la liste selon la catégorie choisie.',
    objective: 'Des boutons de catégorie qui filtrent une liste.',
    preview: 'Des puces « Tout / Fruits / Légumes » ; cliquer sur « Fruits » ne montre que les fruits.',
    aliases: ['filtre', 'categorie', 'filtrer par categorie', 'tags'],
    keywords: ['filtrer categorie', 'boutons filtre', 'onglets liste'],
    relatedContentIds: ['REACT-F-020-LESSON', 'JS-F-010-LESSON'],
    usesContentIds: ['REACT-F-020-LESSON', 'JS-F-010-LESSON', 'REACT-F-030-LESSON'],
    files: ['Filtre.tsx'],
    steps: [
      {
        id: 'e1',
        title: 'Un state pour la catégorie active',
        goal: 'Mémoriser la catégorie choisie.',
        explanation:
          'On garde dans un state la catégorie sélectionnée. La valeur de départ <code>"tout"</code> sert à afficher toute la liste tant que l’utilisateur n’a rien choisi.',
        files: ['Filtre.tsx'],
        relatedContentIds: ['REACT-F-020-TEMPLATE'],
        codeBlocks: [
          {
            id: 'guide-filtre-1',
            filename: 'Filtre.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

const [categorie, setCategorie] = useState("tout");`,
          },
        ],
        result: 'On sait quelle catégorie est sélectionnée.',
      },
      {
        id: 'e2',
        title: 'Boutons + filtrage',
        goal: 'Changer la catégorie et filtrer.',
        explanation:
          'Chaque bouton appelle <code>setCategorie</code> avec sa valeur. Le filtrage garde un produit si la catégorie active est <code>"tout"</code> <b>ou</b> si le produit appartient à la catégorie choisie. Ce « ou » est indispensable pour que « Tout » n’élimine rien.',
        files: ['Filtre.tsx'],
        relatedContentIds: ['REACT-F-030-TEMPLATE', 'JS-F-010-TEMPLATE'],
        codeBlocks: [
          {
            id: 'guide-filtre-2',
            filename: 'Filtre.tsx',
            language: 'tsx',
            code: `<button type="button" onClick={() => setCategorie("fruits")}>Fruits</button>

const visibles = produits.filter(
  (p) => categorie === "tout" || p.categorie === categorie
);`,
          },
        ],
        result: 'La liste s’adapte à la catégorie active.',
      },
    ],
    finalResult: 'Un filtre par catégorie : un state + des boutons + un filter conditionnel.',
    pitfalls: ['Oublier l’option « tout » : l’utilisateur ne peut plus voir la liste complète.'],
    variations: [
      'Autoriser plusieurs catégories cochées en même temps (tableau de catégories).',
      'Combiner ce filtre avec la recherche texte du guide « Créer une recherche ».',
    ],
  }),

  // ————— Créer une pagination —————
  guide({
    id: 'GUIDE-G-021',
    slug: 'creer-une-pagination',
    title: 'Créer une pagination',
    shortTitle: 'Pagination',
    technology: 'react',
    tomeId: 't8',
    summary: 'Découper une longue liste en pages avec slice et un state de page courante.',
    objective: 'Afficher une liste page par page.',
    preview: 'Une liste montre 5 éléments ; « Suivant » affiche les 5 suivants.',
    aliases: ['pagination', 'pages', 'page suivante', 'slice'],
    keywords: ['pagination', 'page par page', 'suivant precedent', 'slice'],
    relatedContentIds: ['REACT-F-020-LESSON', 'REACT-F-007-LESSON'],
    usesContentIds: ['REACT-F-020-LESSON', 'REACT-F-007-LESSON', 'REACT-F-030-LESSON'],
    files: ['Pagination.tsx'],
    steps: [
      {
        id: 'e1',
        title: 'State de page + découpe',
        goal: 'Calculer les éléments de la page courante.',
        explanation:
          'On stocke le numéro de page courante. Pour savoir quels éléments montrer, on calcule l’index de début (<code>(page - 1) × PAR_PAGE</code>) puis on prend une tranche du tableau avec <code>slice(debut, debut + PAR_PAGE)</code>. On n’affiche donc jamais toute la liste, seulement une page.',
        files: ['Pagination.tsx'],
        relatedContentIds: ['REACT-F-020-TEMPLATE'],
        codeBlocks: [
          {
            id: 'guide-pagi-1',
            filename: 'Pagination.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

const PAR_PAGE = 5;
const [page, setPage] = useState(1);

const debut = (page - 1) * PAR_PAGE;
const visibles = items.slice(debut, debut + PAR_PAGE);`,
          },
        ],
        result: 'On affiche uniquement les éléments de la page.',
      },
      {
        id: 'e2',
        title: 'Boutons précédent / suivant',
        goal: 'Changer de page sans dépasser les bornes.',
        explanation:
          'Le nombre total de pages se calcule avec <code>Math.ceil(total / PAR_PAGE)</code>. On désactive « Précédent » sur la page 1 et « Suivant » sur la dernière (<code>disabled</code>) pour ne jamais sortir des bornes.',
        files: ['Pagination.tsx'],
        relatedContentIds: ['REACT-F-030-TEMPLATE'],
        codeBlocks: [
          {
            id: 'guide-pagi-2',
            filename: 'Pagination.tsx',
            language: 'tsx',
            code: `const totalPages = Math.ceil(items.length / PAR_PAGE);

<button type="button" disabled={page === 1}
  onClick={() => setPage(page - 1)}>Précédent</button>

<span>Page {page} / {totalPages}</span>

<button type="button" disabled={page === totalPages}
  onClick={() => setPage(page + 1)}>Suivant</button>`,
          },
        ],
        result: 'On navigue de page en page, boutons désactivés aux extrêmes.',
      },
    ],
    finalResult: 'Une pagination côté client : slice + page courante + boutons bornés.',
    pitfalls: [
      'Oublier de borner : dépasser la dernière page affiche une liste vide.',
      'Ne pas revenir en page 1 après un filtrage : la page courante peut devenir invalide.',
    ],
    variations: [
      'Afficher des numéros de page cliquables plutôt que Précédent/Suivant.',
      'Passer à une pagination côté serveur (LIMIT/OFFSET) pour de gros volumes.',
    ],
  }),

  // ————— Créer une API React pour afficher des données —————
  guide({
    id: 'GUIDE-G-013',
    slug: 'creer-une-api-react',
    title: 'Créer une API React pour afficher des données',
    shortTitle: 'API React',
    technology: 'react',
    tomeId: 't8',
    summary: 'Récupérer des données d’une API et les afficher, avec chargement et erreur.',
    objective: 'Afficher une liste venant d’une API réelle.',
    preview: 'Au chargement : « Chargement… », puis la liste des éléments, ou un message d’erreur.',
    aliases: ['api react', 'fetch', 'afficher donnees', 'appeler api'],
    keywords: ['consommer api', 'fetch useeffect', 'afficher donnees', 'loader erreur'],
    relatedContentIds: ['REACT-F-041-LESSON', 'REACT-F-021-LESSON'],
    usesContentIds: ['REACT-F-041-LESSON', 'REACT-F-021-LESSON', 'REACT-F-007-LESSON', 'JS-F-019-LESSON'],
    files: ['Produits.tsx'],
    steps: [
      {
        id: 'e1',
        title: 'Trois états : données, chargement, erreur',
        goal: 'Préparer les states nécessaires.',
        explanation:
          'Appeler une API prend du temps et peut échouer. On représente donc <b>trois</b> moments : les <code>données</code> (vides au départ), le <code>chargement</code> en cours (<code>true</code> au départ, car on charge dès l’ouverture) et une éventuelle <code>erreur</code> (chaîne vide = pas d’erreur). Ces trois states permettent d’afficher toujours quelque chose de clair à l’utilisateur.',
        files: ['Produits.tsx'],
        relatedContentIds: ['REACT-F-041-TEMPLATE'],
        codeBlocks: [
          {
            id: 'guide-api-1',
            filename: 'Produits.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from "react";

const [produits, setProduits] = useState<{ id: number; nom: string }[]>([]);
const [chargement, setChargement] = useState(true);
const [erreur, setErreur] = useState("");`,
          },
        ],
        result: 'On peut représenter les trois moments de la requête.',
      },
      {
        id: 'e2',
        title: 'Charger au montage (2 façons)',
        goal: 'Appeler l’API une seule fois, à l’ouverture.',
        explanation:
          '<code>useEffect(..., [])</code> lance le chargement <b>une seule fois</b>, quand le composant apparaît (le tableau vide <code>[]</code> veut dire « aucune dépendance »). On récupère les données, on attrape l’erreur avec <code>.catch</code>, et on coupe le loader dans <code>.finally</code> (qui s’exécute dans tous les cas). Voici <b>deux façons</b> de faire le même travail : <code>fetch</code> (natif, rien à installer) ou <code>axios</code> (une librairie qui simplifie un peu). Choisis un onglet.',
        files: ['Produits.tsx'],
        relatedContentIds: ['REACT-F-021-TEMPLATE', 'JS-F-019-TEMPLATE'],
        codeBlocks: [
          {
            id: 'guide-api-2-fetch',
            label: 'Avec fetch',
            filename: 'Produits.tsx',
            language: 'tsx',
            code: `useEffect(() => {
  fetch("https://exemple.api/produits")
    .then((r) => {
      if (!r.ok) throw new Error("Erreur " + r.status);
      return r.json();
    })
    .then(setProduits)
    .catch((e) => setErreur(e.message))
    .finally(() => setChargement(false));
}, []);`,
          },
          {
            id: 'guide-api-2-axios',
            label: 'Avec Axios',
            filename: 'Produits.tsx',
            language: 'tsx',
            code: `import axios from "axios";

useEffect(() => {
  axios
    .get("https://exemple.api/produits")
    .then((r) => setProduits(r.data)) // axios parse le JSON tout seul
    .catch((e) => setErreur(e.message))
    .finally(() => setChargement(false));
}, []);`,
          },
        ],
        result: 'Les données arrivent, l’erreur est capturée, le loader se coupe.',
      },
      {
        id: 'e3',
        title: 'Afficher selon l’état',
        goal: 'Montrer le loader, l’erreur, ou la liste.',
        explanation:
          'On teste les états dans l’ordre : si ça charge, on montre « Chargement… » et on s’arrête là (<code>return</code>). Sinon, s’il y a une erreur, on l’affiche. Sinon seulement, on affiche la liste avec <code>map</code> (chaque élément a une <code>key</code>). Résultat : l’écran n’est jamais vide sans explication.',
        files: ['Produits.tsx'],
        relatedContentIds: ['REACT-F-007-TEMPLATE'],
        codeBlocks: [
          {
            id: 'guide-api-3',
            filename: 'Produits.tsx',
            language: 'tsx',
            code: `if (chargement) return <p>Chargement…</p>;
if (erreur) return <p>Erreur : {erreur}</p>;

return (
  <ul>
    {produits.map((p) => <li key={p.id}>{p.nom}</li>)}
  </ul>
);`,
          },
        ],
        result: 'L’utilisateur voit toujours un état clair : chargement, erreur, ou données.',
      },
    ],
    finalResult:
      'Un composant qui consomme une API proprement : données + chargement + erreur, affichés au bon moment — au choix avec fetch ou Axios.',
    pitfalls: [
      'Mettre à jour un state après démontage : dans un vrai projet, gère l’annulation (AbortController).',
      'Oublier le cas erreur : l’API tombe et la page semble vide.',
    ],
    variations: [
      'Mettre en cache et rafraîchir automatiquement avec React Query / TanStack Query.',
      'Recharger les données sur un bouton ou après une action (re-fetch).',
      'Ajouter un « skeleton » à la place du texte « Chargement… ».',
    ],
  }),
];
