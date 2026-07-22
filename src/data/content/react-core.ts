import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const reactContent: ReadyContent[] = [
  // ————— Créer un composant —————
  lesson({
    id: 'REACT-F-001-LESSON',
    slug: 'creer-un-composant',
    title: 'Créer un composant',
    shortTitle: 'Composant',
    technology: 'react',
    tomeId: 't5',
    summary: 'Une fonction qui renvoie du JSX : la brique de base de toute application React.',
    utility: 'Découper l’interface en morceaux réutilisables.',
    aliases: ['composant', 'component', 'function component', 'react'],
    keywords: ['creer composant', 'brique', 'jsx', 'reutiliser interface'],
    relatedContentIds: ['REACT-F-004-LESSON', 'REACT-F-007-LESSON'],
    templateId: 'REACT-F-001-TEMPLATE',
    intro:
      'Un <b>composant</b> est une fonction dont le nom commence par une <b>majuscule</b> et qui <b>renvoie du JSX</b>. On l’utilise ensuite comme une balise : <code>&lt;MonComposant /&gt;</code>.',
    sections: [
      {
        id: 's1',
        title: 'Une fonction qui renvoie du JSX',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'react-comp-c1',
              filename: 'Bonjour.tsx',
              language: 'tsx',
              code: `function Bonjour() {
  return <h1>Bonjour !</h1>;
}

// Utilisation :
// <Bonjour />`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Le nom d’un composant commence <b>toujours</b> par une majuscule (<code>Bonjour</code>), sinon React le prend pour une balise HTML.',
          },
        ],
      },
    ],
    pitfalls: [
      'Nom en minuscule (<code>bonjour</code>) : React croit à une balise HTML inconnue.',
      'Renvoyer plusieurs éléments sans wrapper : entoure-les d’un <code>&lt;&gt;...&lt;/&gt;</code> (fragment).',
    ],
    takeaways: [
      'composant = fonction en <b>PascalCase</b> qui <code>return</code> du JSX',
      's’utilise comme une balise : <code>&lt;MonComposant /&gt;</code>',
    ],
  }),
  template({
    id: 'REACT-F-001-TEMPLATE',
    slug: 'creer-un-composant',
    title: 'Composant',
    technology: 'react',
    tomeId: 't5',
    summary: 'Squelette d’un composant React.',
    lede: 'Un composant de base. Choisis la version :',
    aliases: ['composant', 'component', 'javascript', 'typescript'],
    keywords: ['squelette'],
    relatedContentIds: ['REACT-F-004-TEMPLATE'],
    lessonId: 'REACT-F-001-LESSON',
    variants: [
      {
        id: 'tsx',
        label: 'TypeScript',
        codeBlocks: [
          {
            id: 'react-comp-t-ts',
            filename: 'MonComposant.tsx',
            language: 'tsx',
            code: `function MonComposant() {
  return (
    <div>
      Contenu
    </div>
  );
}

export default MonComposant;`,
          },
        ],
        replacements: [
          { token: 'MonComposant', description: 'le nom (PascalCase)' },
          { token: 'Contenu', description: 'le JSX à afficher' },
        ],
        placement: 'Un fichier .tsx par composant.',
      },
      {
        id: 'jsx',
        label: 'JavaScript',
        codeBlocks: [
          {
            id: 'react-comp-t-js',
            filename: 'MonComposant.jsx',
            language: 'jsx',
            code: `function MonComposant() {
  return (
    <div>
      Contenu
    </div>
  );
}

export default MonComposant;`,
          },
        ],
        replacements: [
          { token: 'MonComposant', description: 'le nom (PascalCase)' },
        ],
        placement: 'Version .jsx pour un projet sans TypeScript.',
      },
      {
        id: 'avec-props',
        label: 'Avec props',
        codeBlocks: [
          {
            id: 'react-comp-t-props',
            filename: 'Carte.tsx',
            language: 'tsx',
            code: `interface CarteProps {
  titre: string;
}

function Carte({ titre }: CarteProps) {
  return <div>{titre}</div>;
}`,
          },
        ],
        replacements: [
          { token: 'Carte', description: 'le nom du composant' },
          { token: 'titre', description: 'la donnée reçue du parent' },
        ],
        placement: 'Quand le composant reçoit des données.',
      },
    ],
  }),

  // ————— Les props —————
  lesson({
    id: 'REACT-F-004-LESSON',
    slug: 'props',
    title: 'Les props : passer des données',
    shortTitle: 'Props',
    technology: 'react',
    tomeId: 't5',
    summary: 'Passer des données d’un composant parent à un composant enfant, en lecture seule.',
    utility: 'Configurer un composant depuis l’extérieur.',
    aliases: ['props', 'proprietes', 'passer des donnees', 'parent enfant'],
    keywords: ['passer donnees', 'parametrer composant', 'lecture seule'],
    relatedContentIds: ['TS-F-009-LESSON', 'REACT-F-001-LESSON'],
    templateId: 'REACT-F-004-TEMPLATE',
    intro:
      'Les <b>props</b> sont les données qu’un parent passe à un enfant, comme des attributs de balise. L’enfant les <b>lit</b> mais ne les modifie pas.',
    sections: [
      {
        id: 's1',
        title: 'Passer et recevoir des props',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'react-props-c1',
              filename: 'App.tsx',
              language: 'tsx',
              code: `function Salutation({ prenom }: { prenom: string }) {
  return <p>Bonjour {prenom}</p>;
}

function App() {
  return <Salutation prenom="Alice" />;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> les props = les réglages d’une machine à laver. Le parent choisit le programme, l’enfant l’exécute mais ne change pas les réglages tout seul.',
          },
        ],
      },
    ],
    pitfalls: [
      'Modifier une prop dans l’enfant : interdit, elles sont en lecture seule. Pour un état modifiable, utilise <code>useState</code>.',
    ],
    takeaways: [
      'props = données parent → enfant, en <b>lecture seule</b>',
      'on les déstructure : <code>function X({ prop1, prop2 })</code>',
    ],
  }),
  template({
    id: 'REACT-F-004-TEMPLATE',
    slug: 'props',
    title: 'Props',
    technology: 'react',
    tomeId: 't5',
    summary: 'Recevoir des props.',
    lede: 'Passer et recevoir des props. Choisis le cas :',
    aliases: ['props', 'typescript', 'javascript'],
    keywords: ['parent enfant'],
    relatedContentIds: ['TS-F-009-TEMPLATE'],
    lessonId: 'REACT-F-004-LESSON',
    variants: [
      {
        id: 'ts',
        label: 'TypeScript',
        codeBlocks: [
          {
            id: 'react-props-t-ts',
            filename: 'Enfant.tsx',
            language: 'tsx',
            code: `interface EnfantProps {
  titre: string;
}

function Enfant({ titre }: EnfantProps) {
  return <h2>{titre}</h2>;
}

// Parent : <Enfant titre="Bonjour" />`,
          },
        ],
        replacements: [
          { token: 'Enfant', description: 'le nom du composant' },
          { token: 'titre', description: 'le nom de la prop' },
        ],
        placement: 'Version typée (recommandée).',
      },
      {
        id: 'js',
        label: 'JavaScript',
        codeBlocks: [
          {
            id: 'react-props-t-js',
            filename: 'Enfant.jsx',
            language: 'jsx',
            code: `function Enfant({ titre }) {
  return <h2>{titre}</h2>;
}

// Parent : <Enfant titre="Bonjour" />`,
          },
        ],
        replacements: [{ token: 'titre', description: 'le nom de la prop' }],
        placement: 'Version sans types.',
      },
      {
        id: 'plusieurs',
        label: 'Plusieurs props',
        codeBlocks: [
          {
            id: 'react-props-t-multi',
            filename: 'Carte.tsx',
            language: 'tsx',
            code: `interface CarteProps {
  titre: string;
  prix: number;
  enPromo?: boolean; // optionnelle
}

function Carte({ titre, prix, enPromo }: CarteProps) {
  return <div>{titre} — {prix}€ {enPromo && "🔥"}</div>;
}`,
          },
        ],
        replacements: [
          { token: 'titre, prix, enPromo', description: 'tes props' },
        ],
        placement: 'Le <code>?</code> rend une prop facultative.',
      },
    ],
  }),

  // ————— Afficher une liste —————
  lesson({
    id: 'REACT-F-007-LESSON',
    slug: 'afficher-une-liste',
    title: 'Afficher une liste : map et key',
    shortTitle: 'Liste (map/key)',
    technology: 'react',
    tomeId: 't5',
    summary: 'Transformer un tableau de données en éléments JSX avec map, en donnant une key unique.',
    utility: 'Afficher dynamiquement une liste de données.',
    aliases: ['liste', 'map', 'key', 'afficher liste', 'boucle jsx'],
    keywords: ['afficher un tableau', 'render liste', 'cle unique', 'map jsx'],
    relatedContentIds: ['JS-F-009-LESSON', 'REACT-F-041-LESSON'],
    templateId: 'REACT-F-007-TEMPLATE',
    intro:
      'Pour afficher une liste, on <code>map</code> le tableau vers du JSX. Chaque élément a besoin d’une <b>key</b> unique et stable pour que React suive les changements.',
    sections: [
      {
        id: 's1',
        title: 'map + key',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'react-list-c1',
              filename: 'Liste.tsx',
              language: 'tsx',
              code: `const fruits = [
  { id: 1, nom: "Pomme" },
  { id: 2, nom: "Banane" },
];

function Liste() {
  return (
    <ul>
      {fruits.map((f) => (
        <li key={f.id}>{f.nom}</li>
      ))}
    </ul>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'La <code>key</code> doit être <b>unique et stable</b> (un <code>id</code>). Évite l’index du tableau si la liste peut changer d’ordre.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>key</code> : avertissement React et bugs d’affichage lors des mises à jour.',
      'Utiliser l’index comme key sur une liste réordonnable : sources de bugs subtils.',
    ],
    takeaways: [
      '<code>{items.map((it) =&gt; &lt;li key={it.id}&gt;{it.nom}&lt;/li&gt;)}</code>',
      'key unique et stable, idéalement un <code>id</code>',
    ],
  }),
  template({
    id: 'REACT-F-007-TEMPLATE',
    slug: 'afficher-une-liste',
    title: 'Liste (map / key)',
    technology: 'react',
    tomeId: 't5',
    summary: 'Afficher un tableau avec map et key.',
    lede: 'Afficher une liste. Choisis le cas :',
    aliases: ['liste', 'map', 'key'],
    keywords: ['render liste'],
    relatedContentIds: ['JS-F-009-TEMPLATE'],
    lessonId: 'REACT-F-007-LESSON',
    variants: [
      {
        id: 'objets',
        label: 'Liste d’objets',
        codeBlocks: [
          {
            id: 'react-list-t-obj',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `<ul>
  {items.map((item) => (
    <li key={item.id}>{item.nom}</li>
  ))}
</ul>`,
          },
        ],
        replacements: [
          { token: 'items', description: 'ton tableau d’objets' },
          { token: 'item.id', description: 'un identifiant unique (key)' },
          { token: 'item.nom', description: 'ce que tu affiches' },
        ],
        placement: 'Le cas standard, avec une vraie clé unique.',
      },
      {
        id: 'strings',
        label: 'Liste de textes',
        codeBlocks: [
          {
            id: 'react-list-t-str',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `const villes = ["Paris", "Lyon", "Nice"];

<ul>
  {villes.map((ville, index) => (
    <li key={index}>{ville}</li>
  ))}
</ul>`,
          },
        ],
        replacements: [
          { token: 'villes', description: 'ton tableau de chaînes' },
        ],
        placement: 'Sans id : l’index sert de key (ok si la liste ne bouge pas).',
      },
      {
        id: 'cartes',
        label: 'En cartes',
        codeBlocks: [
          {
            id: 'react-list-t-card',
            filename: 'Grille.tsx',
            language: 'tsx',
            code: `<div className="grille">
  {produits.map((p) => (
    <article key={p.id} className="carte">
      <h3>{p.nom}</h3>
      <p>{p.prix} €</p>
    </article>
  ))}
</div>`,
          },
        ],
        replacements: [
          { token: 'produits', description: 'ta liste' },
          { token: 'p.nom / p.prix', description: 'les champs à afficher' },
        ],
        placement: 'Pour une grille de cartes plutôt qu’une simple liste.',
      },
    ],
  }),

  // ————— useEffect —————
  lesson({
    id: 'REACT-F-021-LESSON',
    slug: 'useeffect',
    title: 'useEffect',
    shortTitle: 'useEffect',
    technology: 'react',
    tomeId: 't6',
    summary: 'Lancer un effet (fetch, abonnement, timer) après le rendu, contrôlé par ses dépendances.',
    utility: 'Exécuter du code au montage ou quand une valeur change.',
    aliases: ['useeffect', 'effet', 'montage', 'dependances', 'cycle de vie', 'side effect'],
    keywords: ['au chargement', 'apres le rendu', 'dependances', 'nettoyage', 'fetch au montage'],
    relatedContentIds: ['REACT-F-020-LESSON', 'REACT-F-041-LESSON'],
    templateId: 'REACT-F-021-TEMPLATE',
    intro:
      '<code>useEffect</code> exécute du code <b>après</b> le rendu. Le tableau de <b>dépendances</b> décide quand : vide = une seule fois (au montage), avec des valeurs = à chaque changement.',
    sections: [
      {
        id: 's1',
        title: 'Effet au montage',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'react-effect-c1',
              filename: 'App.tsx',
              language: 'tsx',
              code: `import { useEffect, useState } from "react";

function App() {
  const [heure, setHeure] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHeure((h) => h + 1), 1000);
    return () => clearInterval(id); // nettoyage
  }, []); // [] = une seule fois au montage

  return <p>{heure}s</p>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Le <code>return</code> d’un effet est la fonction de <b>nettoyage</b> (annuler un timer, se désabonner). Mets dans <code>[]</code> toutes les valeurs utilisées par l’effet.',
          },
        ],
      },
    ],
    pitfalls: [
      'Dépendances manquantes : l’effet utilise une valeur qui n’est pas dans le tableau → comportement figé.',
      'Boucle infinie : mettre à jour un state utilisé comme dépendance sans condition.',
    ],
    takeaways: [
      '<code>useEffect(fn, [])</code> = au montage · <code>[x]</code> = quand x change',
      'le <code>return</code> = nettoyage',
    ],
  }),
  template({
    id: 'REACT-F-021-TEMPLATE',
    slug: 'useeffect',
    title: 'useEffect',
    technology: 'react',
    tomeId: 't6',
    summary: 'Structure d’un useEffect.',
    lede: 'Lancer un effet. Choisis le cas :',
    aliases: ['useeffect', 'effet', 'montage', 'cleanup'],
    keywords: ['montage', 'dependance', 'nettoyage'],
    relatedContentIds: ['REACT-F-041-TEMPLATE'],
    lessonId: 'REACT-F-021-LESSON',
    variants: [
      {
        id: 'montage',
        label: 'Au montage',
        codeBlocks: [
          {
            id: 'react-effect-t1',
            filename: 'App.tsx',
            language: 'tsx',
            code: `import { useEffect } from "react";

useEffect(() => {
  // code lance une seule fois au montage
}, []);`,
          },
        ],
        replacements: [
          { token: 'code lance une seule fois au montage', description: 'ton effet (fetch…)' },
        ],
        placement: 'Le plus fréquent : charger des données à l’ouverture.',
      },
      {
        id: 'dependance',
        label: 'Sur changement',
        codeBlocks: [
          {
            id: 'react-effect-t2',
            filename: 'App.tsx',
            language: 'tsx',
            code: `useEffect(() => {
  // relance quand "valeur" change
}, [valeur]);`,
          },
        ],
        replacements: [{ token: 'valeur', description: 'la donnée à surveiller (id, filtre…)' }],
        placement: 'Quand l’effet dépend d’une valeur.',
      },
      {
        id: 'cleanup',
        label: 'Avec nettoyage',
        codeBlocks: [
          {
            id: 'react-effect-t3',
            filename: 'App.tsx',
            language: 'tsx',
            code: `useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // nettoyage au démontage
}, []);`,
          },
        ],
        replacements: [
          { token: 'setInterval(tick, 1000)', description: 'ton abonnement / timer' },
          { token: 'clearInterval(id)', description: 'comment l’annuler' },
        ],
        placement: 'Timer, abonnement, écouteur : le return nettoie.',
      },
    ],
  }),

  // ————— onClick —————
  lesson({
    id: 'REACT-F-030-LESSON',
    slug: 'onclick',
    title: 'Réagir à un clic : onClick',
    shortTitle: 'onClick',
    technology: 'react',
    tomeId: 't7',
    summary: 'Exécuter une fonction quand l’utilisateur clique, en passant le handler (sans l’appeler).',
    utility: 'Déclencher une action au clic.',
    aliases: ['onclick', 'clic', 'bouton', 'evenement', 'handler', 'handleclick'],
    keywords: ['au clic', 'bouton', 'declencher action', 'ecouter clic'],
    relatedContentIds: ['REACT-F-020-LESSON', 'REACT-F-031-LESSON'],
    templateId: 'REACT-F-030-TEMPLATE',
    intro:
      'On met <code>onClick</code> directement sur la balise et on lui <b>passe</b> la fonction : <code>onClick={handleClick}</code>. Avec des parenthèses, elle serait appelée tout de suite.',
    sections: [
      {
        id: 's1',
        title: 'Passer le handler',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'react-onclick-c1',
              filename: 'Bouton.tsx',
              language: 'tsx',
              code: `function Bouton() {
  const handleClick = () => {
    console.log("clic !");
  };

  return <button onClick={handleClick}>Cliquer</button>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<code>onClick={handleClick}</code> ✓ — <code>onClick={handleClick()}</code> ✗ (appelée au rendu). Nomme le handler <code>handleClick</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      '<code>onClick={handleClick()}</code> exécute la fonction immédiatement au rendu.',
      'Besoin d’un argument ? Enveloppe : <code>onClick={() =&gt; handleClick(id)}</code>.',
    ],
    takeaways: [
      '<code>onClick={handleClick}</code> — on passe, on n’appelle pas',
      'avec argument : <code>onClick={() =&gt; faire(x)}</code>',
    ],
  }),
  template({
    id: 'REACT-F-030-TEMPLATE',
    slug: 'onclick',
    title: 'onClick',
    technology: 'react',
    tomeId: 't7',
    summary: 'Gérer un clic.',
    lede: 'Réagir à un clic. Choisis le cas :',
    aliases: ['onclick', 'clic'],
    keywords: ['bouton', 'argument', 'toggle'],
    relatedContentIds: ['REACT-F-020-TEMPLATE'],
    lessonId: 'REACT-F-030-LESSON',
    variants: [
      {
        id: 'handler',
        label: 'Handler',
        codeBlocks: [
          {
            id: 'react-onclick-t-h',
            filename: 'Bouton.tsx',
            language: 'tsx',
            code: `const handleClick = () => {
  // action au clic
};

<button type="button" onClick={handleClick}>Cliquer</button>`,
          },
        ],
        replacements: [
          { token: 'action au clic', description: 'ce qui se passe au clic' },
        ],
        placement: 'Le cas standard : on passe la fonction.',
      },
      {
        id: 'inline',
        label: 'En ligne',
        codeBlocks: [
          {
            id: 'react-onclick-t-inline',
            filename: 'Bouton.tsx',
            language: 'tsx',
            code: `<button type="button" onClick={() => setCount(count + 1)}>
  +1
</button>`,
          },
        ],
        replacements: [{ token: 'setCount(count + 1)', description: 'l’action courte' }],
        placement: 'Pour une action simple, sans fonction séparée.',
      },
      {
        id: 'argument',
        label: 'Avec un argument',
        codeBlocks: [
          {
            id: 'react-onclick-t-arg',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `<button type="button" onClick={() => supprimer(item.id)}>
  Supprimer
</button>`,
          },
        ],
        replacements: [
          { token: 'supprimer(item.id)', description: 'ta fonction + son argument' },
        ],
        placement: 'Enveloppe dans une flèche pour passer un argument.',
      },
      {
        id: 'toggle',
        label: 'Basculer (toggle)',
        codeBlocks: [
          {
            id: 'react-onclick-t-toggle',
            filename: 'Modale.tsx',
            language: 'tsx',
            code: `<button type="button" onClick={() => setOuvert(!ouvert)}>
  Ouvrir / Fermer
</button>`,
          },
        ],
        replacements: [{ token: 'ouvert / setOuvert', description: 'ton booléen + setter' }],
        placement: 'Inverser un booléen (afficher/masquer).',
      },
    ],
  }),

  // ————— Input contrôlé —————
  lesson({
    id: 'REACT-F-031-LESSON',
    slug: 'input-controle',
    title: 'Un champ contrôlé : input et onChange',
    shortTitle: 'Input contrôlé',
    technology: 'react',
    tomeId: 't7',
    summary: 'Lier un input à un state : value + onChange, pour que React soit la source de vérité.',
    utility: 'Récupérer et contrôler ce que l’utilisateur tape.',
    aliases: ['input controle', 'onchange', 'controlled', 'champ', 'value'],
    keywords: ['recuperer valeur input', 'champ controle', 'saisie', 'formulaire'],
    relatedContentIds: ['REACT-F-020-LESSON', 'REACT-F-032-LESSON'],
    templateId: 'REACT-F-031-TEMPLATE',
    intro:
      'Un champ <b>contrôlé</b> tire sa valeur d’un state (<code>value</code>) et la met à jour à chaque frappe (<code>onChange</code>). React connaît toujours la valeur exacte.',
    sections: [
      {
        id: 's1',
        title: 'value + onChange',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'react-input-c1',
              filename: 'Champ.tsx',
              language: 'tsx',
              code: `import { useState } from "react";

function Champ() {
  const [texte, setTexte] = useState("");

  return (
    <input
      value={texte}
      onChange={(e) => setTexte(e.target.value)}
      placeholder="Tape ici"
    />
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un miroir. Le state est la réalité, l’input l’affiche ; quand tu tapes, tu mets à jour la réalité (le state), et le miroir suit.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre <code>value</code> sans <code>onChange</code> : le champ devient en lecture seule.',
      'Lire <code>e.target.value</code> est indispensable pour récupérer la saisie.',
    ],
    takeaways: [
      '<code>value={texte}</code> + <code>onChange={(e) =&gt; setTexte(e.target.value)}</code>',
      'le state est la source de vérité',
    ],
  }),
  template({
    id: 'REACT-F-031-TEMPLATE',
    slug: 'input-controle',
    title: 'Input contrôlé',
    technology: 'react',
    tomeId: 't7',
    summary: 'Champ lié à un state.',
    lede: 'Un champ contrôlé. Choisis le type :',
    aliases: ['input', 'onchange', 'champ', 'checkbox', 'textarea', 'select'],
    keywords: ['controle'],
    relatedContentIds: ['REACT-F-020-TEMPLATE'],
    lessonId: 'REACT-F-031-LESSON',
    variants: [
      {
        id: 'texte',
        label: 'Texte',
        codeBlocks: [
          {
            id: 'react-input-t-text',
            filename: 'Champ.tsx',
            language: 'tsx',
            code: `const [valeur, setValeur] = useState("");

<input
  value={valeur}
  onChange={(e) => setValeur(e.target.value)}
/>`,
          },
        ],
        replacements: [{ token: 'valeur / setValeur', description: 'ton state et son setter' }],
        placement: 'Le champ texte classique.',
      },
      {
        id: 'nombre',
        label: 'Nombre',
        codeBlocks: [
          {
            id: 'react-input-t-num',
            filename: 'Champ.tsx',
            language: 'tsx',
            code: `const [age, setAge] = useState(0);

<input
  type="number"
  value={age}
  onChange={(e) => setAge(Number(e.target.value))}
/>`,
          },
        ],
        replacements: [{ token: 'age / setAge', description: 'ton state numérique' }],
        placement: 'On convertit avec Number() (la valeur d’un input est toujours du texte).',
      },
      {
        id: 'checkbox',
        label: 'Case à cocher',
        codeBlocks: [
          {
            id: 'react-input-t-check',
            filename: 'Champ.tsx',
            language: 'tsx',
            code: `const [accepte, setAccepte] = useState(false);

<input
  type="checkbox"
  checked={accepte}
  onChange={(e) => setAccepte(e.target.checked)}
/>`,
          },
        ],
        replacements: [{ token: 'accepte / setAccepte', description: 'ton booléen' }],
        placement: 'On lit <code>e.target.checked</code> (pas value) et on met <code>checked</code>.',
      },
      {
        id: 'select',
        label: 'Menu déroulant',
        codeBlocks: [
          {
            id: 'react-input-t-select',
            filename: 'Champ.tsx',
            language: 'tsx',
            code: `const [ville, setVille] = useState("paris");

<select value={ville} onChange={(e) => setVille(e.target.value)}>
  <option value="paris">Paris</option>
  <option value="lyon">Lyon</option>
</select>`,
          },
        ],
        replacements: [{ token: 'ville / setVille', description: 'ton state' }],
        placement: 'Un select se contrôle comme un input (value + onChange).',
      },
    ],
  }),

  // ————— Formulaire onSubmit —————
  lesson({
    id: 'REACT-F-032-LESSON',
    slug: 'formulaire-onsubmit',
    title: 'Un formulaire complet : onSubmit',
    shortTitle: 'Formulaire',
    technology: 'react',
    tomeId: 't7',
    summary: 'Gérer l’envoi d’un formulaire avec onSubmit et preventDefault pour éviter le rechargement.',
    utility: 'Traiter les données d’un formulaire à l’envoi.',
    aliases: ['formulaire', 'onsubmit', 'form', 'preventdefault', 'envoyer'],
    keywords: ['envoyer formulaire', 'soumettre', 'preventdefault', 'submit'],
    relatedContentIds: ['REACT-F-031-LESSON', 'GUIDE-G-017'],
    templateId: 'REACT-F-032-TEMPLATE',
    intro:
      'On écoute <code>onSubmit</code> sur la balise <code>&lt;form&gt;</code> et on appelle <code>e.preventDefault()</code> pour empêcher le rechargement de la page, puis on traite les données.',
    sections: [
      {
        id: 's1',
        title: 'onSubmit + preventDefault',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'react-form-c1',
              filename: 'Formulaire.tsx',
              language: 'tsx',
              code: `import { useState } from "react";

function Formulaire() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Envoi :", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Envoyer</button>
    </form>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Le bouton d’envoi est <code>type="submit"</code>. <code>preventDefault()</code> est indispensable, sinon la page se recharge.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>e.preventDefault()</code> : la page se recharge et tu perds tout.',
      'Mettre <code>onClick</code> sur le bouton au lieu de <code>onSubmit</code> sur le form : la touche Entrée ne marchera pas.',
    ],
    takeaways: [
      '<code>&lt;form onSubmit={handleSubmit}&gt;</code> + <code>e.preventDefault()</code>',
      'bouton <code>type="submit"</code>',
    ],
  }),
  template({
    id: 'REACT-F-032-TEMPLATE',
    slug: 'formulaire-onsubmit',
    title: 'Formulaire (onSubmit)',
    technology: 'react',
    tomeId: 't7',
    summary: 'Formulaire contrôlé avec envoi.',
    lede: 'Gérer l’envoi. Choisis le cas :',
    aliases: ['formulaire', 'onsubmit', 'form'],
    keywords: ['envoyer', 'plusieurs champs'],
    relatedContentIds: ['REACT-F-031-TEMPLATE'],
    lessonId: 'REACT-F-032-LESSON',
    variants: [
      {
        id: 'simple',
        label: '1 champ',
        codeBlocks: [
          {
            id: 'react-form-t-simple',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log(email);
};

<form onSubmit={handleSubmit}>
  <input value={email} onChange={(e) => setEmail(e.target.value)} />
  <button type="submit">Envoyer</button>
</form>`,
          },
        ],
        replacements: [{ token: 'email', description: 'ton state de champ' }],
        placement: 'Le cas simple, un seul champ.',
      },
      {
        id: 'multi',
        label: 'Plusieurs champs',
        codeBlocks: [
          {
            id: 'react-form-t-multi',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `const [form, setForm] = useState({ nom: "", email: "" });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

<form onSubmit={handleSubmit}>
  <input name="nom" value={form.nom} onChange={handleChange} />
  <input name="email" value={form.email} onChange={handleChange} />
  <button type="submit">Envoyer</button>
</form>`,
          },
        ],
        replacements: [
          { token: 'nom / email', description: 'les noms de tes champs (attribut name)' },
        ],
        placement: 'Un seul state objet + un handler générique via <code>name</code>.',
      },
      {
        id: 'envoi',
        label: 'Envoi vers une API',
        codeBlocks: [
          {
            id: 'react-form-t-api',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};`,
          },
        ],
        replacements: [
          { token: '/api/contact', description: 'ton endpoint' },
          { token: '{ email }', description: 'les données à envoyer' },
        ],
        placement: 'Handler async : on envoie les données en POST.',
      },
    ],
  }),

  // ————— fetch une liste (React) —————
  lesson({
    id: 'REACT-F-041-LESSON',
    slug: 'fetch-une-liste',
    title: 'fetch une liste',
    shortTitle: 'Fetch une liste',
    technology: 'react',
    tomeId: 't8',
    summary: 'Charger des données au montage avec useEffect + useState, en gérant chargement et erreur.',
    utility: 'Afficher des données venant d’une API.',
    aliases: ['fetch liste', 'api react', 'afficher donnees', 'useeffect fetch', 'loader'],
    keywords: ['charger des donnees', 'api', 'loader', 'chargement', 'erreur', 'liste'],
    relatedContentIds: ['REACT-F-021-LESSON', 'JS-F-019-LESSON', 'GUIDE-G-013'],
    templateId: 'REACT-F-041-TEMPLATE',
    intro:
      'Le trio gagnant : un <b>state</b> pour les données, un <b>useEffect</b> pour charger au montage, et deux états <b>chargement</b> / <b>erreur</b> pour une bonne expérience.',
    sections: [
      {
        id: 's1',
        title: 'Données + chargement + erreur',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'react-fetchlist-c1',
              filename: 'Users.tsx',
              language: 'tsx',
              code: `import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState<{ id: number; nom: string }[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    fetch("https://exemple.api/users")
      .then((r) => {
        if (!r.ok) throw new Error("Erreur " + r.status);
        return r.json();
      })
      .then(setUsers)
      .catch((e) => setErreur(e.message))
      .finally(() => setChargement(false));
  }, []);

  if (chargement) return <p>Chargement…</p>;
  if (erreur) return <p>Erreur : {erreur}</p>;

  return (
    <ul>
      {users.map((u) => <li key={u.id}>{u.nom}</li>)}
    </ul>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Toujours 3 états : <b>données</b>, <b>chargement</b>, <b>erreur</b>. On teste <code>r.ok</code> et on coupe le loader dans <code>finally</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier l’état de chargement : l’utilisateur voit un écran vide sans savoir pourquoi.',
      'Ne pas gérer l’erreur : une API qui tombe casse silencieusement la page.',
    ],
    takeaways: [
      'state <b>données</b> + <b>chargement</b> + <b>erreur</b>',
      'chargement dans <code>useEffect(..., [])</code>',
    ],
  }),
  template({
    id: 'REACT-F-041-TEMPLATE',
    slug: 'fetch-une-liste',
    title: 'Fetch une liste',
    technology: 'react',
    tomeId: 't8',
    summary: 'Charger une liste depuis une API avec états loader/erreur.',
    lede: 'Charger et afficher des données. Choisis la façon :',
    aliases: ['fetch liste', 'api react', 'loader', 'axios', 'async'],
    keywords: ['chargement', 'erreur'],
    relatedContentIds: ['REACT-F-021-TEMPLATE', 'JS-F-019-TEMPLATE'],
    lessonId: 'REACT-F-041-LESSON',
    variants: [
      {
        id: 'fetch',
        label: 'Avec fetch (.then)',
        codeBlocks: [
          {
            id: 'react-fetchlist-t-fetch',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `const [data, setData] = useState<Type[]>([]);
const [chargement, setChargement] = useState(true);
const [erreur, setErreur] = useState("");

useEffect(() => {
  fetch("URL_API")
    .then((r) => {
      if (!r.ok) throw new Error("Erreur " + r.status);
      return r.json();
    })
    .then(setData)
    .catch((e) => setErreur(e.message))
    .finally(() => setChargement(false));
}, []);`,
          },
        ],
        replacements: [
          { token: 'Type', description: 'le type d’un élément' },
          { token: 'URL_API', description: 'l’adresse de ton API' },
        ],
        placement: 'Sans dépendance à installer.',
      },
      {
        id: 'async',
        label: 'Avec async/await',
        codeBlocks: [
          {
            id: 'react-fetchlist-t-async',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `useEffect(() => {
  const charger = async () => {
    try {
      const r = await fetch("URL_API");
      if (!r.ok) throw new Error("Erreur " + r.status);
      setData(await r.json());
    } catch (e) {
      setErreur((e as Error).message);
    } finally {
      setChargement(false);
    }
  };
  charger();
}, []);`,
          },
        ],
        replacements: [{ token: 'URL_API', description: 'l’adresse de ton API' }],
        placement: 'On définit une fonction async DANS l’effet (useEffect n’est pas async).',
      },
      {
        id: 'axios',
        label: 'Avec Axios',
        codeBlocks: [
          {
            id: 'react-fetchlist-t-axios',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `import axios from "axios";

useEffect(() => {
  axios
    .get("URL_API")
    .then((r) => setData(r.data))
    .catch((e) => setErreur(e.message))
    .finally(() => setChargement(false));
}, []);`,
          },
        ],
        replacements: [{ token: 'URL_API', description: 'l’adresse de ton API' }],
        placement: 'Axios parse le JSON tout seul (npm i axios).',
      },
    ],
  }),

  // ————— Définir des routes —————
  lesson({
    id: 'REACT-F-061-LESSON',
    slug: 'definir-des-routes',
    title: 'Définir des routes',
    shortTitle: 'Routes',
    technology: 'react',
    tomeId: 't9',
    summary: 'Associer des URLs à des composants avec React Router : Routes, Route et BrowserRouter.',
    utility: 'Avoir plusieurs pages dans une application React.',
    aliases: ['routes', 'react router', 'browserrouter', 'path', 'navigation'],
    keywords: ['plusieurs pages', 'url', 'router', 'route element'],
    relatedContentIds: ['REACT-F-063-LESSON', 'REACT-F-041-LESSON'],
    templateId: 'REACT-F-061-TEMPLATE',
    intro:
      'React Router relie une <b>URL</b> à un <b>composant</b>. On enveloppe l’app dans <code>BrowserRouter</code>, puis on liste des <code>Route</code> dans <code>Routes</code>.',
    sections: [
      {
        id: 's1',
        title: 'BrowserRouter + Routes',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'react-routes-c1',
              filename: 'App.tsx',
              language: 'tsx',
              code: `import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="*" element={<PageIntrouvable />} />
      </Routes>
    </BrowserRouter>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'La route <code>path="*"</code> attrape toutes les URLs inconnues → parfaite pour une page 404.',
          },
        ],
      },
    ],
    takeaways: [
      '<code>&lt;Route path="/x" element={&lt;X /&gt;} /&gt;</code> dans <code>&lt;Routes&gt;</code>',
      '<code>path="*"</code> = page 404',
    ],
  }),
  template({
    id: 'REACT-F-061-TEMPLATE',
    slug: 'definir-des-routes',
    title: 'Routes',
    technology: 'react',
    tomeId: 't9',
    summary: 'Définir des routes avec React Router.',
    lede: 'Relier des URLs à des composants. Choisis le cas :',
    aliases: ['routes', 'react router', 'link', 'navlink'],
    keywords: ['pages'],
    relatedContentIds: ['REACT-F-063-TEMPLATE'],
    lessonId: 'REACT-F-061-LESSON',
    variants: [
      {
        id: 'base',
        label: 'Routes de base',
        codeBlocks: [
          {
            id: 'react-routes-t-base',
            filename: 'App.tsx',
            language: 'tsx',
            code: `import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Accueil />} />
    <Route path="/CHEMIN" element={<MaPage />} />
    <Route path="*" element={<PageIntrouvable />} />
  </Routes>
</BrowserRouter>`,
          },
        ],
        replacements: [
          { token: '/CHEMIN', description: 'l’URL de ta page' },
          { token: 'MaPage', description: 'le composant à afficher' },
        ],
        placement: 'Au sommet de l’app (npm i react-router-dom).',
      },
      {
        id: 'liens',
        label: 'Liens (navigation)',
        codeBlocks: [
          {
            id: 'react-routes-t-link',
            filename: 'Menu.tsx',
            language: 'tsx',
            code: `import { Link, NavLink } from "react-router-dom";

<Link to="/produits">Produits</Link>

// NavLink ajoute une classe quand le lien est actif :
<NavLink to="/produits" className={({ isActive }) =>
  isActive ? "actif" : ""
}>Produits</NavLink>`,
          },
        ],
        replacements: [{ token: '/produits', description: 'l’URL cible' }],
        placement: 'Pour naviguer sans recharger la page. NavLink pour le menu actif.',
      },
      {
        id: 'layout',
        label: 'Avec layout imbriqué',
        codeBlocks: [
          {
            id: 'react-routes-t-layout',
            filename: 'App.tsx',
            language: 'tsx',
            code: `<Routes>
  <Route element={<Layout />}> {/* barre + <Outlet /> */}
    <Route path="/" element={<Accueil />} />
    <Route path="/produits" element={<Produits />} />
  </Route>
</Routes>`,
          },
        ],
        replacements: [{ token: 'Layout', description: 'ton gabarit commun (avec <Outlet />)' }],
        placement: 'Pour partager une barre/menu entre plusieurs pages.',
      },
    ],
  }),

  // ————— Route dynamique + useParams —————
  lesson({
    id: 'REACT-F-063-LESSON',
    slug: 'route-dynamique',
    title: 'Une route dynamique : /produit/:id',
    shortTitle: 'Route dynamique',
    technology: 'react',
    tomeId: 't9',
    summary: 'Créer une page de détail avec un paramètre d’URL (:id) récupéré via useParams.',
    utility: 'Afficher une page différente selon un identifiant dans l’URL.',
    aliases: ['route dynamique', 'params', 'useparams', 'id url', 'page detail'],
    keywords: ['parametre url', 'detail', 'produit id', 'useparams'],
    relatedContentIds: ['REACT-F-061-LESSON', 'REACT-F-041-LESSON'],
    templateId: 'REACT-F-063-TEMPLATE',
    intro:
      'Une partie de l’URL devient un <b>paramètre</b> avec <code>:id</code>. Dans la page, <code>useParams()</code> permet de le lire pour charger la bonne donnée.',
    sections: [
      {
        id: 's1',
        title: ':id dans la route + useParams',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'react-dynroute-c1',
              filename: 'App.tsx',
              language: 'tsx',
              code: `// Route
<Route path="/produit/:id" element={<Produit />} />

// Dans la page Produit
import { useParams } from "react-router-dom";

function Produit() {
  const { id } = useParams();
  return <p>Produit numéro {id}</p>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: 'Le nom après <code>:</code> (ici <code>id</code>) doit correspondre à la clé lue dans <code>useParams()</code>.',
          },
        ],
      },
    ],
    takeaways: [
      '<code>path="/produit/:id"</code> puis <code>const { id } = useParams()</code>',
      'combine avec un fetch de l’élément par <code>id</code>',
    ],
  }),
  template({
    id: 'REACT-F-063-TEMPLATE',
    slug: 'route-dynamique',
    title: 'Route dynamique',
    technology: 'react',
    tomeId: 't9',
    summary: 'Route avec paramètre + useParams.',
    lede: 'Une page de détail par identifiant. Choisis le cas :',
    aliases: ['route dynamique', 'useparams', 'params', 'usenavigate'],
    keywords: ['id url'],
    relatedContentIds: ['REACT-F-061-TEMPLATE'],
    lessonId: 'REACT-F-063-LESSON',
    variants: [
      {
        id: 'base',
        label: 'Lire le paramètre',
        codeBlocks: [
          {
            id: 'react-dynroute-t-base',
            filename: 'Detail.tsx',
            language: 'tsx',
            code: `// Route : <Route path="/ENTITE/:id" element={<Detail />} />

import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  return <div>Élément {id}</div>;
}`,
          },
        ],
        replacements: [
          { token: 'ENTITE', description: 'ta ressource (produit, article…)' },
        ],
        placement: 'useParams lit le :id de l’URL.',
      },
      {
        id: 'fetch',
        label: 'Charger l’élément',
        codeBlocks: [
          {
            id: 'react-dynroute-t-fetch',
            filename: 'Detail.tsx',
            language: 'tsx',
            code: `const { id } = useParams();
const [item, setItem] = useState(null);

useEffect(() => {
  fetch("/api/ENTITE/" + id)
    .then((r) => r.json())
    .then(setItem);
}, [id]); // relance si l'id change`,
          },
        ],
        replacements: [
          { token: 'ENTITE', description: 'ta ressource' },
        ],
        placement: 'On met <code>[id]</code> en dépendance pour recharger au changement d’URL.',
      },
      {
        id: 'navigate',
        label: 'Naviguer par code',
        codeBlocks: [
          {
            id: 'react-dynroute-t-nav',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

<button onClick={() => navigate("/produit/" + item.id)}>
  Voir le détail
</button>`,
          },
        ],
        replacements: [{ token: 'item.id', description: 'l’id vers lequel aller' }],
        placement: 'useNavigate pour rediriger après un clic/une action.',
      },
    ],
  }),
];
