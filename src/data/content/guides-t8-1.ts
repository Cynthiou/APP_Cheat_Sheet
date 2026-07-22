import type { ReadyContent } from '@/types/content';
import { guide } from './_factory';

export const guidesT81Content: ReadyContent[] = [
  // ————— Créer une page détail avec /produit/:id —————
  guide({
    id: 'GUIDE-W6-111',
    slug: 'creer-une-page-detail-avec-produit-id',
    title: 'Créer une page détail avec /produit/:id',
    shortTitle: 'Page détail :id',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Afficher une page dédiée à un seul élément dont l’identifiant est lu dans l’URL.',
    objective:
      'Une page détail qui lit l’id dans l’URL et affiche le bon produit, avec chargement et erreur.',
    preview:
      'Depuis la liste, cliquer sur un produit ouvre /produit/42 et affiche le nom, le prix et la description de ce produit-là.',
    aliases: ['page detail', 'route dynamique', 'useParams', 'produit id', 'detail'],
    keywords: ['route parametree', 'useparams', 'page detail', 'id dans url', 'react router'],
    relatedContentIds: [],
    files: ['App.tsx', 'PageProduit.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-111-e1',
        title: 'Déclarer la route dynamique',
        goal: 'Créer une route qui accepte n’importe quel id.',
        explanation:
          'La partie <code>:id</code> est un <b>segment dynamique</b> : elle correspond à n’importe quelle valeur (42, 7, abc…). Une seule route sert donc pour tous les produits. React Router place ce qui remplace <code>:id</code> dans les paramètres, on le récupérera à l’étape suivante.',
        files: ['App.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-111-cb1',
            filename: 'App.tsx',
            language: 'tsx',
            code: `import { Routes, Route } from "react-router-dom";
import PageProduit from "./PageProduit";

// Le :id accepte n'importe quelle valeur dans l'URL
<Routes>
  <Route path="/produit/:id" element={<PageProduit />} />
</Routes>`,
          },
        ],
        result: 'Toutes les URLs du type /produit/xxx mènent à la même page.',
      },
      {
        id: 'GUIDE-W6-111-e2',
        title: 'Lire l’id avec useParams',
        goal: 'Récupérer l’identifiant présent dans l’URL.',
        explanation:
          '<code>useParams</code> renvoie un objet contenant les segments dynamiques de la route. Comme la route est <code>/produit/:id</code>, on récupère <code>id</code> par déstructuration. Cette valeur est toujours une <b>chaîne</b> : on la convertira en nombre si l’API attend un nombre.',
        files: ['PageProduit.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-111-cb2',
            filename: 'PageProduit.tsx',
            language: 'tsx',
            code: `import { useParams } from "react-router-dom";

// id est la valeur qui remplace :id dans l'URL (toujours une string)
const { id } = useParams();`,
          },
        ],
        result: 'On connaît l’id du produit à afficher.',
      },
      {
        id: 'GUIDE-W6-111-e3',
        title: 'Charger le bon produit',
        goal: 'Aller chercher les données de cet id précis.',
        explanation:
          'On appelle l’API avec l’id dans l’URL pour ne récupérer <b>qu’un seul</b> produit. Le tableau de dépendances <code>[id]</code> est essentiel : si l’utilisateur passe de /produit/1 à /produit/2 sans quitter la page, l’effet se relance et recharge le bon produit. On coupe le loader dans <code>finally</code>.',
        files: ['PageProduit.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-111-cb3',
            filename: 'PageProduit.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from "react";

const [produit, setProduit] = useState(null);
const [chargement, setChargement] = useState(true);

useEffect(() => {
  // On concatène l'id pour cibler un seul produit
  fetch("https://exemple.api/produits/" + id)
    .then((r) => r.json())
    .then(setProduit)
    .finally(() => setChargement(false));
}, [id]); // se relance si l'id change`,
          },
        ],
        result: 'Les données du produit demandé arrivent dans le state.',
      },
      {
        id: 'GUIDE-W6-111-e4',
        title: 'Afficher selon l’état',
        goal: 'Gérer le chargement et le produit introuvable.',
        explanation:
          'On teste les cas dans l’ordre : d’abord le chargement, puis l’absence de produit (id inexistant), et seulement ensuite l’affichage réel. Ce <code>return</code> précoce évite de lire <code>produit.nom</code> alors que <code>produit</code> vaut encore <code>null</code>, ce qui ferait planter la page.',
        files: ['PageProduit.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-111-cb4',
            filename: 'PageProduit.tsx',
            language: 'tsx',
            code: `if (chargement) return <p>Chargement…</p>;
if (!produit) return <p>Produit introuvable.</p>;

return (
  <article>
    <h1>{produit.nom}</h1>
    <p>{produit.prix} €</p>
    <p>{produit.description}</p>
  </article>
);`,
          },
        ],
        result: 'La page affiche toujours un état clair, jamais un écran cassé.',
      },
    ],
    finalResult:
      'Une page détail réutilisable : une route :id, useParams pour lire l’identifiant, un fetch relancé quand l’id change, et un affichage protégé contre le produit introuvable.',
    pitfalls: [
      'Oublier [id] dans le useEffect : la page ne se met pas à jour quand on change de produit.',
      'Lire produit.nom sans vérifier que produit existe : la page plante pendant le chargement.',
      'Comparer l’id string à un id number sans conversion (Number(id)).',
    ],
    variations: [
      'Ajouter un bouton « Retour » avec useNavigate.',
      'Afficher un vrai message d’erreur si le fetch échoue (state erreur).',
      'Précharger le produit depuis la liste pour éviter un temps de chargement.',
    ],
  }),

  // ————— Créer un formulaire avec envoi —————
  guide({
    id: 'GUIDE-W6-112',
    slug: 'creer-un-formulaire-avec-envoi',
    title: 'Créer un formulaire avec envoi',
    shortTitle: 'Formulaire + envoi',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Saisir des champs contrôlés puis les envoyer à une API en POST, avec état d’envoi.',
    objective:
      'Un formulaire qui récupère la saisie et l’envoie à une API, en bloquant le double-clic.',
    preview:
      'L’utilisateur remplit nom et email, clique « Envoyer » ; le bouton se désactive, puis un message de succès apparaît.',
    aliases: ['formulaire', 'envoi form', 'post api', 'submit', 'form react'],
    keywords: ['formulaire controle', 'onsubmit', 'envoyer donnees', 'post fetch', 'envoi formulaire'],
    relatedContentIds: [],
    files: ['Formulaire.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-112-e1',
        title: 'Des champs contrôlés',
        goal: 'Stocker la saisie dans un state.',
        explanation:
          'Chaque champ est <b>contrôlé</b> : sa valeur vient d’un state et chaque frappe met ce state à jour via <code>onChange</code>. React devient ainsi la source de vérité de ce que contient le formulaire, ce qui rend l’envoi trivial : on enverra simplement le state.',
        files: ['Formulaire.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-112-cb1',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

const [nom, setNom] = useState("");
const [email, setEmail] = useState("");

<input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" />
<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />`,
          },
        ],
        result: 'La saisie est toujours connue de React.',
      },
      {
        id: 'GUIDE-W6-112-e2',
        title: 'Intercepter la soumission',
        goal: 'Empêcher le rechargement de la page.',
        explanation:
          'Un <code>form</code> HTML recharge la page par défaut au submit, ce qui casse une app React. On met donc l’action sur <code>onSubmit</code> du <code>form</code> (et non sur le clic du bouton) puis on appelle <code>e.preventDefault()</code> pour bloquer ce rechargement. Passer par <code>onSubmit</code> permet aussi la validation native et l’envoi avec la touche Entrée.',
        files: ['Formulaire.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-112-cb2',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `function envoyer(e) {
  e.preventDefault(); // évite le rechargement de la page
  // ... l'appel API arrive à l'étape suivante
}

<form onSubmit={envoyer}>
  {/* champs ici */}
  <button type="submit">Envoyer</button>
</form>`,
          },
        ],
        result: 'La soumission est capturée sans recharger la page.',
      },
      {
        id: 'GUIDE-W6-112-e3',
        title: 'Envoyer en POST',
        goal: 'Transmettre les données à l’API.',
        explanation:
          'On envoie les données avec la méthode <code>POST</code>. Le corps doit être une chaîne JSON (<code>JSON.stringify</code>) et l’en-tête <code>Content-Type</code> prévient le serveur qu’il reçoit du JSON. Sans cet en-tête, beaucoup d’API refusent de lire le corps.',
        files: ['Formulaire.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-112-cb3',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `async function envoyer(e) {
  e.preventDefault();
  await fetch("https://exemple.api/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, email }), // le state devient le corps
  });
}`,
          },
        ],
        result: 'Les données partent vers l’API au bon format.',
      },
      {
        id: 'GUIDE-W6-112-e4',
        title: 'Bloquer le double-envoi',
        goal: 'Désactiver le bouton pendant l’envoi.',
        explanation:
          'Un envoi prend du temps ; sans garde-fou, l’utilisateur peut cliquer plusieurs fois et créer des doublons. Un state <code>envoi</code> passe à <code>true</code> avant l’appel et retombe à <code>false</code> dans <code>finally</code>. On l’utilise pour <code>disabled</code> et pour changer le texte du bouton.',
        files: ['Formulaire.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-112-cb4',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `const [envoi, setEnvoi] = useState(false);

async function envoyer(e) {
  e.preventDefault();
  setEnvoi(true); // verrouille pendant la requête
  try {
    await fetch("https://exemple.api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, email }),
    });
  } finally {
    setEnvoi(false); // déverrouille dans tous les cas
  }
}

<button type="submit" disabled={envoi}>
  {envoi ? "Envoi…" : "Envoyer"}
</button>`,
          },
        ],
        result: 'Impossible d’envoyer deux fois par mégarde.',
      },
    ],
    finalResult:
      'Un formulaire complet : champs contrôlés, soumission interceptée, envoi POST en JSON, et bouton verrouillé pendant la requête.',
    pitfalls: [
      'Oublier e.preventDefault() : la page se recharge et l’envoi est perdu.',
      'Envoyer un objet brut sans JSON.stringify : l’API reçoit [object Object].',
      'Oublier l’en-tête Content-Type : le serveur ne lit pas le corps.',
    ],
    variations: [
      'Afficher un message de succès ou d’erreur après l’envoi.',
      'Vider les champs après un envoi réussi.',
      'Valider les champs avant l’envoi (email non vide, format correct).',
    ],
  }),

  // ————— Créer un formulaire multi-étapes —————
  guide({
    id: 'GUIDE-W6-113',
    slug: 'creer-un-formulaire-multi-etapes',
    title: 'Créer un formulaire multi-étapes',
    shortTitle: 'Form multi-étapes',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Découper un long formulaire en plusieurs écrans successifs avec un state d’étape.',
    objective:
      'Un formulaire en plusieurs pages qui conserve les données et avance étape par étape.',
    preview:
      'Étape 1 : identité. Étape 2 : adresse. Étape 3 : récapitulatif. Les boutons « Suivant » et « Précédent » naviguent sans rien perdre.',
    aliases: ['formulaire multi etapes', 'wizard', 'stepper', 'form etapes', 'assistant'],
    keywords: ['formulaire etapes', 'wizard react', 'stepper', 'form multi pages', 'etape suivante'],
    relatedContentIds: [],
    files: ['FormMultiEtapes.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-113-e1',
        title: 'Un state pour l’étape courante',
        goal: 'Savoir quel écran afficher.',
        explanation:
          'Le cœur d’un formulaire multi-étapes est un simple <b>numéro d’étape</b> stocké dans un state. Toutes les données restent dans le même composant : changer d’étape ne fait que changer <b>ce qui est affiché</b>, jamais ce qui est mémorisé. C’est pour ça que rien n’est perdu en naviguant.',
        files: ['FormMultiEtapes.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-113-cb1',
            filename: 'FormMultiEtapes.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

const [etape, setEtape] = useState(1); // on démarre à l'étape 1`,
          },
        ],
        result: 'On sait à tout moment quelle étape montrer.',
      },
      {
        id: 'GUIDE-W6-113-e2',
        title: 'Un seul objet pour toutes les données',
        goal: 'Rassembler les champs de toutes les étapes.',
        explanation:
          'Plutôt qu’un state par champ, on regroupe tout dans un <b>objet</b>. Une fonction générique met à jour un champ en recopiant l’objet existant (<code>...form</code>) et en écrasant la clé modifiée. Ainsi les données des étapes 1 et 2 cohabitent sans se marcher dessus.',
        files: ['FormMultiEtapes.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-113-cb2',
            filename: 'FormMultiEtapes.tsx',
            language: 'tsx',
            code: `const [form, setForm] = useState({ nom: "", ville: "" });

// Met à jour un seul champ sans effacer les autres
function maj(champ, valeur) {
  setForm((f) => ({ ...f, [champ]: valeur }));
}`,
          },
        ],
        result: 'Toutes les étapes écrivent dans le même objet.',
      },
      {
        id: 'GUIDE-W6-113-e3',
        title: 'Naviguer entre les étapes',
        goal: 'Avancer et reculer sans dépasser les bornes.',
        explanation:
          'Deux fonctions <code>suivant</code> et <code>precedent</code> ajustent le numéro d’étape. On borne avec <code>Math.min</code> et <code>Math.max</code> pour ne jamais sortir de la plage 1 à 3. Comme les données vivent en dehors des écrans, revenir en arrière retrouve les champs déjà remplis.',
        files: ['FormMultiEtapes.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-113-cb3',
            filename: 'FormMultiEtapes.tsx',
            language: 'tsx',
            code: `const TOTAL = 3;

function suivant() {
  setEtape((e) => Math.min(e + 1, TOTAL)); // jamais au-delà de 3
}
function precedent() {
  setEtape((e) => Math.max(e - 1, 1)); // jamais en-dessous de 1
}`,
          },
        ],
        result: 'On circule dans les étapes sans jamais sortir des bornes.',
      },
      {
        id: 'GUIDE-W6-113-e4',
        title: 'Afficher l’écran de l’étape',
        goal: 'Montrer le bon contenu selon le numéro.',
        explanation:
          'Le rendu conditionnel affiche l’écran correspondant à <code>etape</code>. La dernière étape sert de <b>récapitulatif</b> avant l’envoi. Les boutons de navigation sont communs : « Précédent » est masqué à l’étape 1, « Suivant » devient « Terminer » à la dernière.',
        files: ['FormMultiEtapes.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-113-cb4',
            filename: 'FormMultiEtapes.tsx',
            language: 'tsx',
            code: `{etape === 1 && (
  <input value={form.nom} onChange={(e) => maj("nom", e.target.value)} placeholder="Nom" />
)}
{etape === 2 && (
  <input value={form.ville} onChange={(e) => maj("ville", e.target.value)} placeholder="Ville" />
)}
{etape === 3 && (
  <p>Récapitulatif : {form.nom}, {form.ville}</p>
)}

{etape > 1 && <button type="button" onClick={precedent}>Précédent</button>}
<button type="button" onClick={suivant}>
  {etape === TOTAL ? "Terminer" : "Suivant"}
</button>`,
          },
        ],
        result: 'Chaque étape montre ses champs, le récap récapitule.',
      },
    ],
    finalResult:
      'Un formulaire multi-étapes propre : un numéro d’étape, un objet de données partagé, une navigation bornée, et un rendu conditionnel qui n’oublie rien en chemin.',
    pitfalls: [
      'Créer un state par étape : les données se perdent en changeant d’écran.',
      'Oublier de borner l’étape : les boutons peuvent afficher un écran inexistant.',
      'Démonter les champs à chaque étape sans stocker les données ailleurs.',
    ],
    variations: [
      'Afficher une barre de progression « Étape 2 / 3 ».',
      'Valider chaque étape avant d’autoriser « Suivant ».',
      'Envoyer l’objet form complet à une API à la dernière étape.',
    ],
  }),

  // ————— Créer une recherche avec autocomplétion —————
  guide({
    id: 'GUIDE-W6-114',
    slug: 'creer-une-recherche-avec-autocompletion',
    title: 'Créer une recherche avec autocomplétion',
    shortTitle: 'Autocomplétion',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Proposer une liste de suggestions sous un champ de recherche, cliquables pour compléter.',
    objective:
      'Un champ qui affiche des suggestions filtrées et remplit le champ au clic.',
    preview:
      'Taper « pa » fait apparaître « Paris », « Pau », « Pantin » sous le champ ; cliquer sur « Paris » complète le champ et ferme la liste.',
    aliases: ['autocompletion', 'autocomplete', 'suggestions', 'recherche suggestions', 'completion'],
    keywords: ['autocompletion', 'suggestions liste', 'autocomplete react', 'completion champ', 'recherche suggeree'],
    relatedContentIds: [],
    files: ['Autocomplete.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-114-e1',
        title: 'Le champ contrôlé',
        goal: 'Suivre ce que tape l’utilisateur.',
        explanation:
          'Comme toute recherche, on lie le champ à un state <code>q</code>. Cette valeur servira à <b>deux</b> choses : afficher ce qui est tapé et calculer les suggestions. Un seul state, deux usages.',
        files: ['Autocomplete.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-114-cb1',
            filename: 'Autocomplete.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

const villes = ["Paris", "Pau", "Pantin", "Lyon", "Lille"];
const [q, setQ] = useState("");

<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ville" />`,
          },
        ],
        result: 'La saisie est connue et prête à filtrer.',
      },
      {
        id: 'GUIDE-W6-114-e2',
        title: 'Calculer les suggestions',
        goal: 'Filtrer la liste selon la saisie.',
        explanation:
          'On <b>dérive</b> les suggestions à partir de <code>q</code> : pas de state supplémentaire. On ne propose rien tant que le champ est vide (sinon toute la liste s’affiche au chargement). La comparaison passe en minuscules avec <code>toLowerCase()</code> pour ignorer la casse.',
        files: ['Autocomplete.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-114-cb2',
            filename: 'Autocomplete.tsx',
            language: 'tsx',
            code: `// Rien tant que le champ est vide, sinon on filtre
const suggestions = q === ""
  ? []
  : villes.filter((v) => v.toLowerCase().includes(q.toLowerCase()));`,
          },
        ],
        result: 'La liste de suggestions se calcule à chaque frappe.',
      },
      {
        id: 'GUIDE-W6-114-e3',
        title: 'Afficher et choisir une suggestion',
        goal: 'Cliquer une suggestion pour remplir le champ.',
        explanation:
          'On affiche les suggestions dans une liste sous le champ. Au clic, on écrit la valeur choisie dans <code>q</code> : comme les suggestions sont dérivées de <code>q</code>, la liste devient alors identique à la saisie et pourrait rester ouverte. On ajoutera donc un état d’ouverture juste après pour la refermer.',
        files: ['Autocomplete.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-114-cb3',
            filename: 'Autocomplete.tsx',
            language: 'tsx',
            code: `<ul>
  {suggestions.map((v) => (
    <li key={v} onClick={() => setQ(v)}>{v}</li>
  ))}
</ul>`,
          },
        ],
        result: 'Cliquer une suggestion complète le champ.',
      },
      {
        id: 'GUIDE-W6-114-e4',
        title: 'Fermer la liste après un choix',
        goal: 'Masquer les suggestions une fois choisi.',
        explanation:
          'Un booléen <code>ouvert</code> contrôle l’affichage de la liste. Il repasse à <code>true</code> dès qu’on tape (nouvelles suggestions) et à <code>false</code> quand on clique une suggestion. On combine ce booléen avec le rendu conditionnel pour n’afficher la liste que quand c’est pertinent.',
        files: ['Autocomplete.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-114-cb4',
            filename: 'Autocomplete.tsx',
            language: 'tsx',
            code: `const [ouvert, setOuvert] = useState(false);

<input
  value={q}
  onChange={(e) => { setQ(e.target.value); setOuvert(true); }}
  placeholder="Ville"
/>

{ouvert && suggestions.length > 0 && (
  <ul>
    {suggestions.map((v) => (
      <li key={v} onClick={() => { setQ(v); setOuvert(false); }}>{v}</li>
    ))}
  </ul>
)}`,
          },
        ],
        result: 'Les suggestions s’ouvrent à la frappe et se ferment au choix.',
      },
    ],
    finalResult:
      'Une autocomplétion complète : champ contrôlé, suggestions dérivées et filtrées, choix au clic, et fermeture propre de la liste.',
    pitfalls: [
      'Afficher toute la liste quand le champ est vide : filtre d’abord sur q non vide.',
      'Oublier de refermer la liste après un clic : elle reste collée sous le champ.',
      'Comparer sans toLowerCase : « Paris » ne matcherait pas « paris ».',
    ],
    variations: [
      'Naviguer dans les suggestions au clavier (flèches + Entrée).',
      'Charger les suggestions depuis une API avec un debounce.',
      'Surligner la partie tapée dans chaque suggestion.',
    ],
  }),

  // ————— Créer un tri : A-Z, prix —————
  guide({
    id: 'GUIDE-W6-115',
    slug: 'creer-un-tri-a-z-prix',
    title: 'Créer un tri : A-Z, prix',
    shortTitle: 'Tri A-Z / prix',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Trier une liste par nom ou par prix selon une option choisie dans un menu.',
    objective:
      'Une liste que l’on peut trier alphabétiquement ou par prix via un sélecteur.',
    preview:
      'Un menu déroulant « Trier par » propose « Nom (A-Z) » et « Prix croissant » ; choisir une option réordonne la liste immédiatement.',
    aliases: ['tri', 'trier', 'sort', 'tri liste', 'ordre alphabetique'],
    keywords: ['trier liste', 'sort react', 'tri alphabetique', 'tri prix', 'ordre a-z'],
    relatedContentIds: [],
    files: ['Tri.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-115-e1',
        title: 'Un state pour le critère de tri',
        goal: 'Mémoriser l’option choisie.',
        explanation:
          'On stocke le critère de tri dans un state (<code>"nom"</code> ou <code>"prix"</code>). Cette chaîne pilotera la façon de trier. On part de <code>"nom"</code> pour proposer un ordre lisible par défaut.',
        files: ['Tri.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-115-cb1',
            filename: 'Tri.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

const [tri, setTri] = useState("nom"); // "nom" ou "prix"`,
          },
        ],
        result: 'Le critère de tri est mémorisé.',
      },
      {
        id: 'GUIDE-W6-115-e2',
        title: 'Le menu de tri',
        goal: 'Laisser choisir le critère.',
        explanation:
          'Un <code>select</code> contrôlé lit et écrit le state <code>tri</code>. Chaque <code>option</code> a une <code>value</code> qui correspond exactement aux valeurs attendues (<code>"nom"</code>, <code>"prix"</code>). Le libellé affiché peut être plus parlant que la valeur technique.',
        files: ['Tri.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-115-cb2',
            filename: 'Tri.tsx',
            language: 'tsx',
            code: `<select value={tri} onChange={(e) => setTri(e.target.value)}>
  <option value="nom">Nom (A-Z)</option>
  <option value="prix">Prix croissant</option>
</select>`,
          },
        ],
        result: 'L’utilisateur peut changer de critère.',
      },
      {
        id: 'GUIDE-W6-115-e3',
        title: 'Trier sans muter la liste',
        goal: 'Produire une copie triée.',
        explanation:
          '<code>sort</code> modifie le tableau <b>sur place</b>, ce qui peut casser React. On copie donc d’abord la liste avec <code>[...produits]</code> avant de trier. Pour du texte on utilise <code>localeCompare</code> (gère les accents), pour des nombres on soustrait les prix.',
        files: ['Tri.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-115-cb3',
            filename: 'Tri.tsx',
            language: 'tsx',
            code: `// Copie d'abord pour ne pas muter le tableau d'origine
const tries = [...produits].sort((a, b) => {
  if (tri === "prix") return a.prix - b.prix; // tri numérique
  return a.nom.localeCompare(b.nom); // tri alphabétique
});`,
          },
        ],
        result: 'On obtient une liste triée sans abîmer l’originale.',
      },
      {
        id: 'GUIDE-W6-115-e4',
        title: 'Afficher la liste triée',
        goal: 'Rendre le résultat.',
        explanation:
          'On affiche <code>tries</code> avec <code>map</code>. Comme la liste triée est <b>dérivée</b> à chaque rendu depuis <code>produits</code> et <code>tri</code>, changer l’option suffit à réordonner l’affichage : aucun state de plus n’est nécessaire.',
        files: ['Tri.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-115-cb4',
            filename: 'Tri.tsx',
            language: 'tsx',
            code: `<ul>
  {tries.map((p) => (
    <li key={p.id}>{p.nom} — {p.prix} €</li>
  ))}
</ul>`,
          },
        ],
        result: 'La liste se réordonne dès qu’on change de critère.',
      },
    ],
    finalResult:
      'Un tri propre : un state de critère, un select contrôlé, une copie triée avec localeCompare ou soustraction, et un affichage dérivé sans state superflu.',
    pitfalls: [
      'Trier produits directement avec sort : on mute la liste d’origine.',
      'Comparer des chaînes avec a - b : le résultat est NaN, l’ordre est faux.',
      'Trier du texte avec >/< sans localeCompare : les accents se classent mal.',
    ],
    variations: [
      'Ajouter un tri décroissant (inverser le résultat de la comparaison).',
      'Combiner le tri avec une recherche ou un filtre par catégorie.',
      'Mémoriser le critère choisi dans l’URL ou le localStorage.',
    ],
  }),

  // ————— Créer un infinite scroll —————
  guide({
    id: 'GUIDE-W6-116',
    slug: 'creer-un-infinite-scroll',
    title: 'Créer un infinite scroll',
    shortTitle: 'Infinite scroll',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Charger plus d’éléments automatiquement quand l’utilisateur atteint le bas de la liste.',
    objective:
      'Une liste qui s’allonge toute seule à l’approche du bas grâce à un observateur.',
    preview:
      'On scrolle une liste ; en arrivant en bas, 10 éléments de plus apparaissent sans cliquer sur rien.',
    aliases: ['infinite scroll', 'scroll infini', 'charger plus', 'intersection observer', 'defilement infini'],
    keywords: ['infinite scroll', 'scroll infini', 'intersectionobserver', 'charger plus', 'pagination scroll'],
    relatedContentIds: [],
    files: ['InfiniteScroll.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-116-e1',
        title: 'Un state de « nombre visible »',
        goal: 'Contrôler combien d’éléments on montre.',
        explanation:
          'On ne charge pas tout d’un coup : on garde un nombre <code>visible</code> et on n’affiche que les premiers éléments avec <code>slice</code>. Augmenter ce nombre suffit à « charger plus ». C’est la mécanique la plus simple, idéale quand les données sont déjà en mémoire.',
        files: ['InfiniteScroll.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-116-cb1',
            filename: 'InfiniteScroll.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

const PAS = 10;
const [visible, setVisible] = useState(PAS);

// On n'affiche que les premiers éléments
const affiches = items.slice(0, visible);`,
          },
        ],
        result: 'On affiche une tranche croissante de la liste.',
      },
      {
        id: 'GUIDE-W6-116-e2',
        title: 'Une sentinelle en bas de liste',
        goal: 'Placer un repère à observer.',
        explanation:
          'On ajoute un <b>élément vide invisible</b> (la « sentinelle ») juste après la liste, ciblé par une <code>ref</code>. Quand cet élément entre dans l’écran, c’est le signal qu’on est arrivé en bas. On le détectera avec un observateur à l’étape suivante.',
        files: ['InfiniteScroll.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-116-cb2',
            filename: 'InfiniteScroll.tsx',
            language: 'tsx',
            code: `import { useRef } from "react";

const sentinelle = useRef(null);

<ul>
  {affiches.map((it) => <li key={it.id}>{it.nom}</li>)}
</ul>

{/* Repère invisible en bas de la liste */}
<div ref={sentinelle} />`,
          },
        ],
        result: 'Un repère marque la fin de la liste affichée.',
      },
      {
        id: 'GUIDE-W6-116-e3',
        title: 'Observer avec IntersectionObserver',
        goal: 'Détecter l’arrivée en bas.',
        explanation:
          '<code>IntersectionObserver</code> prévient quand la sentinelle devient visible à l’écran, sans écouter chaque pixel de scroll (bien plus performant). Quand <code>isIntersecting</code> est vrai, on augmente <code>visible</code>. On <b>déconnecte</b> l’observateur au démontage pour éviter les fuites.',
        files: ['InfiniteScroll.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-116-cb3',
            filename: 'InfiniteScroll.tsx',
            language: 'tsx',
            code: `import { useEffect } from "react";

useEffect(() => {
  const cible = sentinelle.current;
  if (!cible) return;

  const obs = new IntersectionObserver((entries) => {
    // La sentinelle est visible : on montre plus d'éléments
    if (entries[0].isIntersecting) {
      setVisible((v) => v + PAS);
    }
  });

  obs.observe(cible);
  return () => obs.disconnect(); // nettoyage au démontage
}, []);`,
          },
        ],
        result: 'La liste s’allonge dès qu’on atteint le bas.',
      },
      {
        id: 'GUIDE-W6-116-e4',
        title: 'S’arrêter à la fin',
        goal: 'Ne pas charger au-delà de la liste.',
        explanation:
          'Sans garde-fou, <code>visible</code> continuerait de grimper dans le vide. On masque la sentinelle quand tout est affiché : plus rien à observer, donc plus de déclenchement. On peut aussi afficher un message de fin.',
        files: ['InfiniteScroll.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-116-cb4',
            filename: 'InfiniteScroll.tsx',
            language: 'tsx',
            code: `const finAtteinte = visible >= items.length;

{!finAtteinte && <div ref={sentinelle} />}
{finAtteinte && <p>Fin de la liste.</p>}`,
          },
        ],
        result: 'Le chargement s’arrête proprement à la fin.',
      },
    ],
    finalResult:
      'Un infinite scroll léger : un nombre visible qui grandit, une sentinelle observée par IntersectionObserver, et un arrêt net une fois la liste épuisée.',
    pitfalls: [
      'Oublier obs.disconnect() : l’observateur survit et provoque des fuites.',
      'Laisser la sentinelle affichée à la fin : le chargement boucle dans le vide.',
      'Écouter l’événement scroll à la main : lourd et saccadé face à IntersectionObserver.',
    ],
    variations: [
      'Charger chaque page depuis une API au lieu d’une liste en mémoire.',
      'Afficher un « Chargement… » pendant l’arrivée des nouveaux éléments.',
      'Remplacer par un bouton « Voir plus » si l’auto-chargement gêne.',
    ],
  }),

  // ————— Créer des favoris —————
  guide({
    id: 'GUIDE-W6-117',
    slug: 'creer-des-favoris',
    title: 'Créer des favoris',
    shortTitle: 'Favoris',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Marquer des éléments comme favoris et garder ce choix même après un rechargement.',
    objective:
      'Un bouton favori par élément dont l’état persiste dans le localStorage.',
    preview:
      'Cliquer le cœur d’un produit le met en favori ; recharger la page conserve les favoris cochés.',
    aliases: ['favoris', 'favorites', 'like', 'wishlist', 'coeur'],
    keywords: ['favoris react', 'localstorage favoris', 'wishlist', 'ajouter favori', 'persistance favoris'],
    relatedContentIds: [],
    files: ['Favoris.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-117-e1',
        title: 'Stocker les ids favoris',
        goal: 'Représenter l’ensemble des favoris.',
        explanation:
          'Un favori est simplement un <b>id présent ou absent</b> d’une liste. On stocke donc un tableau d’ids dans un state. On initialise ce state en <b>lisant le localStorage</b> une fois, pour retrouver les favoris de la session précédente dès le premier rendu.',
        files: ['Favoris.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-117-cb1',
            filename: 'Favoris.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

// Lecture initiale depuis le localStorage (une seule fois)
const [favoris, setFavoris] = useState(() => {
  const brut = localStorage.getItem("favoris");
  return brut ? JSON.parse(brut) : [];
});`,
          },
        ],
        result: 'Les favoris sauvegardés sont chargés au démarrage.',
      },
      {
        id: 'GUIDE-W6-117-e2',
        title: 'Basculer un favori',
        goal: 'Ajouter ou retirer un id.',
        explanation:
          'Un seul bouton sert à ajouter <b>et</b> retirer : c’est une bascule. Si l’id est déjà présent, on le retire avec <code>filter</code> ; sinon on l’ajoute avec <code>[...favoris, id]</code>. On ne mute jamais le tableau, on en crée un nouveau pour que React détecte le changement.',
        files: ['Favoris.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-117-cb2',
            filename: 'Favoris.tsx',
            language: 'tsx',
            code: `function basculer(id) {
  setFavoris((liste) =>
    liste.includes(id)
      ? liste.filter((x) => x !== id) // déjà favori : on retire
      : [...liste, id]                // sinon : on ajoute
  );
}`,
          },
        ],
        result: 'Un clic ajoute ou retire l’élément des favoris.',
      },
      {
        id: 'GUIDE-W6-117-e3',
        title: 'Persister à chaque changement',
        goal: 'Sauvegarder dans le localStorage.',
        explanation:
          'Un <code>useEffect</code> qui dépend de <code>favoris</code> réécrit le localStorage à chaque modification. Le localStorage ne stocke que du texte : on transforme donc le tableau en chaîne avec <code>JSON.stringify</code>. Ainsi, un rechargement retrouve exactement l’état sauvegardé.',
        files: ['Favoris.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-117-cb3',
            filename: 'Favoris.tsx',
            language: 'tsx',
            code: `import { useEffect } from "react";

useEffect(() => {
  // Le localStorage ne stocke que du texte
  localStorage.setItem("favoris", JSON.stringify(favoris));
}, [favoris]); // à chaque changement des favoris`,
          },
        ],
        result: 'Chaque modification est sauvegardée durablement.',
      },
      {
        id: 'GUIDE-W6-117-e4',
        title: 'Le bouton favori',
        goal: 'Afficher l’état et déclencher la bascule.',
        explanation:
          'Pour chaque élément, on regarde si son id est dans <code>favoris</code> avec <code>includes</code> afin de choisir l’icône (cœur plein ou vide). Le clic appelle <code>basculer</code>. L’attribut <code>aria-pressed</code> annonce l’état aux lecteurs d’écran.',
        files: ['Favoris.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-117-cb4',
            filename: 'Favoris.tsx',
            language: 'tsx',
            code: `{produits.map((p) => {
  const estFavori = favoris.includes(p.id);
  return (
    <li key={p.id}>
      {p.nom}
      <button
        type="button"
        aria-pressed={estFavori}
        onClick={() => basculer(p.id)}
      >
        {estFavori ? "★" : "☆"}
      </button>
    </li>
  );
})}`,
          },
        ],
        result: 'Chaque produit affiche et change son état de favori.',
      },
    ],
    finalResult:
      'Des favoris persistants : un tableau d’ids initialisé depuis le localStorage, une bascule immuable, une sauvegarde automatique, et un bouton accessible qui reflète l’état.',
    pitfalls: [
      'Muter le tableau avec push : React ne voit pas le changement, l’écran ne bouge pas.',
      'Oublier JSON.stringify/parse : le localStorage ne stocke que des chaînes.',
      'Relire le localStorage à chaque rendu : fais-le une seule fois dans l’init du state.',
    ],
    variations: [
      'Afficher une page « Mes favoris » filtrée sur les ids retenus.',
      'Synchroniser les favoris avec un compte utilisateur via une API.',
      'Afficher un compteur du nombre de favoris dans l’en-tête.',
    ],
  }),
];
