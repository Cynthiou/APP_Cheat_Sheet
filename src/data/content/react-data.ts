import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const reactDataContent: ReadyContent[] = [
  // ————— fetch un seul objet —————
  lesson({
    id: 'REACT-F-18100-LESSON',
    slug: 'fetch-un-seul-objet',
    title: 'fetch un seul objet',
    shortTitle: 'fetch objet',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Aller chercher une donnée sur une API et l’afficher : le combo useState + useEffect + fetch pour récupérer un seul objet.',
    utility: 'Récupérer une donnée depuis une API et l’afficher dans un composant.',
    aliases: ['fetch', 'requete', 'api', 'useeffect fetch', 'recuperer donnee', 'get'],
    keywords: [
      'aller chercher une donnee',
      'appeler une api',
      'afficher un objet',
      'useeffect fetch',
      'json',
      'tableau de dependances vide',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-18100-TEMPLATE',
    intro:
      'Pour afficher une donnée qui vient d’une <b>API</b>, il faut trois briques : un <b>state</b> pour stocker la donnée (<code>useState</code>), un <b>effet</b> pour lancer la requête au bon moment (<code>useEffect</code>), et <code>fetch</code> pour aller la chercher.',
    sections: [
      {
        id: 's1',
        title: 'Le trio useState + useEffect + fetch',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher les infos d’un utilisateur</b> (nom, email) que je récupère depuis une API, dès que la page s’ouvre.',
          },
          {
            type: 'paragraph',
            html: 'On stocke la donnée dans un <b>state</b> (vide au départ), on lance <code>fetch</code> dans un <code>useEffect</code>, et quand la réponse arrive on remplit le state avec le setter. React ré-affiche tout seul.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18100-l-c1',
              filename: 'Profil.tsx',
              language: 'tsx',
              code: `import { useState, useEffect } from "react";

function Profil() {
  // 1. Un state pour stocker l'objet (null au depart : rien encore)
  const [user, setUser] = useState(null);

  // 2. useEffect lance la requete UNE fois, a l'ouverture
  useEffect(() => {
    fetch("https://api.exemple.com/users/1") // 3. On va chercher la donnee
      .then((reponse) => reponse.json())     // 4. On lit le corps en JSON
      .then((data) => setUser(data));        // 5. On range dans le state
  }, []); // tableau vide = une seule fois

  // 6. Tant que user est null, on n'affiche rien de cassant
  if (!user) return <p>...</p>;

  // 7. La donnee est la : on l'affiche
  return <h1>{user.name}</h1>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> tu commandes un plat au restaurant. Tu passes commande (<code>fetch</code>), tu attends (<code>user</code> est <code>null</code>), puis l’assiette arrive et tu la poses sur la table (<code>setUser</code>) : tout le monde la voit.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Pourquoi le tableau de dépendances vide',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le second argument de <code>useEffect</code> décide <b>quand</b> l’effet se relance. Un tableau <b>vide</b> <code>[]</code> = « une seule fois, au montage ». C’est ce qu’on veut pour charger une donnée à l’ouverture.',
          },
          {
            type: 'table',
            headers: ['Tableau', 'L’effet se lance…'],
            rows: [
              ['<code>[]</code>', 'une seule fois, à l’affichage du composant'],
              ['<code>[id]</code>', 'à l’affichage <b>et</b> à chaque changement de <code>id</code>'],
              ['absent', 'à <b>chaque</b> rendu (à éviter : boucle de requêtes)'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Piège classique :</b> oublier le <code>[]</code> déclenche une requête à chaque rendu, donc une boucle infinie. Mets toujours le tableau de dépendances.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Lire la réponse : le double .then',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>fetch</code> renvoie d’abord une <b>réponse brute</b>. Il faut un premier <code>.then</code> pour la convertir en JSON avec <code>.json()</code>, puis un second <code>.then</code> pour récupérer les vraies données.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18100-l-c2',
              filename: 'exemple.js',
              language: 'javascript',
              code: `fetch("https://api.exemple.com/users/1")
  .then((reponse) => reponse.json()) // etape 1 : lire le corps
  .then((data) => {
    // etape 2 : ici data est un vrai objet JS
    console.log(data.name);
    console.log(data.email);
  });`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>.json()</code> est <b>obligatoire</b>. Sans lui, tu manipules la réponse brute (un objet <code>Response</code>), pas tes données.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le tableau <code>[]</code> dans <code>useEffect</code> : la requête se relance à chaque rendu → boucle infinie.',
      'Afficher <code>user.name</code> alors que <code>user</code> est encore <code>null</code> : plante. Garde un <code>if (!user) return …</code> avant.',
      'Oublier <code>.then((r) => r.json())</code> : tu récupères la réponse brute, pas les données.',
      'Mettre <code>async</code> directement sur la fonction du <code>useEffect</code> : interdit. Passe par <code>.then</code> ou une fonction interne.',
    ],
    takeaways: [
      'le trio : <code>useState</code> (stocker) + <code>useEffect</code> (déclencher) + <code>fetch</code> (chercher)',
      'state initial à <code>null</code> · <code>if (!user) return …</code> tant que rien n’est chargé',
      '<code>useEffect(() => { … }, [])</code> = charge une seule fois à l’ouverture',
      'lire la réponse : <code>.then((r) => r.json())</code> puis <code>.then((data) => setUser(data))</code>',
    ],
  }),
  template({
    id: 'REACT-F-18100-TEMPLATE',
    slug: 'fetch-un-seul-objet',
    title: 'fetch un seul objet',
    shortTitle: 'fetch objet',
    technology: 'react',
    tomeId: 't8',
    summary: 'Le code prêt à copier pour aller chercher un objet sur une API et l’afficher.',
    lede: 'Récupérer un objet depuis une API. Choisis la forme :',
    aliases: ['fetch', 'api', 'useeffect', 'recuperer objet'],
    keywords: ['fetch objet', 'appel api', 'json'],
    relatedContentIds: [],
    lessonId: 'REACT-F-18100-LESSON',
    variants: [
      {
        id: 'then',
        label: 'Avec .then',
        codeBlocks: [
          {
            id: 'REACT-F-18100-t-then',
            filename: 'Profil.tsx',
            language: 'tsx',
            code: `import { useState, useEffect } from "react";

function Profil() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.exemple.com/users/1")
      .then((r) => r.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>...</p>;

  return <h1>{data.name}</h1>;
}`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/users/1', description: 'l’URL de l’objet à récupérer' },
          { token: 'data / setData', description: 'le nom de ton state et de son setter' },
          { token: 'data.name', description: 'la propriété à afficher' },
        ],
        placement: 'Le cas de base : un composant qui charge un objet à l’ouverture avec la syntaxe .then.',
      },
      {
        id: 'depend-id',
        label: 'Selon un id',
        codeBlocks: [
          {
            id: 'REACT-F-18100-t-id',
            filename: 'Profil.tsx',
            language: 'tsx',
            code: `import { useState, useEffect } from "react";

function Profil({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.exemple.com/users/" + id)
      .then((r) => r.json())
      .then((json) => setData(json));
  }, [id]); // recharge quand id change

  if (!data) return <p>...</p>;

  return <h1>{data.name}</h1>;
}`,
          },
        ],
        replacements: [
          { token: 'id', description: 'la valeur (souvent une prop) qui identifie l’objet' },
          { token: 'https://api.exemple.com/users/', description: 'la base de l’URL, avant l’id' },
        ],
        placement: 'Quand l’objet dépend d’un id : mets id dans le tableau de dépendances pour recharger au changement.',
      },
    ],
  }),

  // ————— fetch avec async et await —————
  lesson({
    id: 'REACT-F-18101-LESSON',
    slug: 'fetch-avec-async-et-await',
    title: 'fetch avec async et await',
    shortTitle: 'async / await',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Écrire un fetch qui se lit de haut en bas avec async/await, au lieu d’enchaîner les .then — et le brancher correctement dans un useEffect.',
    utility: 'Écrire des requêtes plus lisibles avec async/await dans un composant.',
    aliases: ['async', 'await', 'async await', 'fonction asynchrone', 'fetch async'],
    keywords: [
      'attendre une reponse',
      'code lisible haut en bas',
      'remplacer then',
      'fonction async',
      'await fetch',
      'useeffect async',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-18101-TEMPLATE',
    intro:
      '<code>async/await</code> est une autre façon d’écrire une requête : au lieu d’enchaîner les <code>.then</code>, on écrit le code <b>de haut en bas</b>. <code>await</code> met en pause jusqu’à ce que la réponse arrive.',
    sections: [
      {
        id: 's1',
        title: 'La syntaxe async/await',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>récupérer une donnée d’API mais en écrivant un code qui se lit ligne par ligne</b>, sans la cascade de <code>.then</code> qui me perd.',
          },
          {
            type: 'paragraph',
            html: 'On marque la fonction <code>async</code>, puis on met <code>await</code> devant chaque opération qui prend du temps. Chaque <code>await</code> attend le résultat avant de passer à la ligne suivante.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18101-l-c1',
              filename: 'chargement.js',
              language: 'javascript',
              code: `// async devant la fonction : elle devient asynchrone
async function chargerUser() {
  // await attend la reponse avant de continuer
  const reponse = await fetch("https://api.exemple.com/users/1");

  // await attend la conversion en JSON
  const data = await reponse.json();

  // ici data est pret a etre utilise
  return data;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>await</code> = tu attends que le micro-ondes sonne avant de sortir le plat. Le code s’arrête poliment sur cette ligne, puis reprend quand c’est prêt.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le brancher dans un useEffect',
        blocks: [
          {
            type: 'paragraph',
            html: 'On ne peut <b>pas</b> mettre <code>async</code> directement sur la fonction passée à <code>useEffect</code>. La solution : déclarer une fonction <code>async</code> <b>à l’intérieur</b>, puis l’appeler.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18101-l-c2',
              filename: 'Profil.tsx',
              language: 'tsx',
              code: `import { useState, useEffect } from "react";

function Profil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. On declare une fonction async DEDANS
    async function charger() {
      const reponse = await fetch("https://api.exemple.com/users/1");
      const data = await reponse.json();
      setUser(data); // 2. On range dans le state
    }

    // 3. On l'appelle
    charger();
  }, []);

  if (!user) return <p>...</p>;
  return <h1>{user.name}</h1>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle :</b> <code>useEffect(async () => …)</code> est <b>interdit</b>. Déclare une fonction <code>async</code> interne et appelle-la — c’est le schéma standard.',
          },
        ],
      },
      {
        id: 's3',
        title: 'then ou await : le même travail',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les deux écritures font <b>exactement</b> la même chose. <code>await</code> est souvent plus lisible dès qu’il y a plusieurs étapes ou une gestion d’erreur.',
          },
          {
            type: 'table',
            headers: ['Avec .then', 'Avec async/await'],
            rows: [
              ['<code>fetch(url).then(r => r.json())</code>', '<code>const r = await fetch(url)</code>'],
              ['enchaînement en cascade', 'lecture de haut en bas'],
              ['erreurs via <code>.catch()</code>', 'erreurs via <code>try / catch</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Écrire <code>useEffect(async () => { … })</code> : interdit. Déclare une fonction <code>async</code> interne et appelle-la.',
      'Oublier un <code>await</code> devant <code>reponse.json()</code> : tu récupères une promesse au lieu des données.',
      'Oublier <code>async</code> sur la fonction : <code>await</code> provoque alors une erreur de syntaxe.',
      'Croire qu’<code>await</code> bloque toute la page : il ne met en pause que la fonction, pas le reste de l’app.',
    ],
    takeaways: [
      '<code>async</code> sur la fonction + <code>await</code> devant chaque opération lente',
      'schéma : <code>const r = await fetch(url)</code> puis <code>const data = await r.json()</code>',
      'dans <code>useEffect</code> : fonction <code>async</code> <b>interne</b> puis on l’appelle',
      'jamais <code>useEffect(async () => …)</code> directement',
    ],
  }),
  template({
    id: 'REACT-F-18101-TEMPLATE',
    slug: 'fetch-avec-async-et-await',
    title: 'fetch avec async et await',
    shortTitle: 'async / await',
    technology: 'react',
    tomeId: 't8',
    summary: 'Le code async/await prêt à copier, en fonction utilitaire ou directement dans un useEffect.',
    lede: 'Écrire une requête en async/await. Choisis le contexte :',
    aliases: ['async', 'await', 'fonction async', 'fetch async'],
    keywords: ['await fetch', 'useeffect async', 'lisible'],
    relatedContentIds: [],
    lessonId: 'REACT-F-18101-LESSON',
    variants: [
      {
        id: 'dans-useeffect',
        label: 'Dans useEffect',
        codeBlocks: [
          {
            id: 'REACT-F-18101-t-effect',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `import { useState, useEffect } from "react";

function Composant() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function charger() {
      const r = await fetch("https://api.exemple.com/donnees");
      const json = await r.json();
      setData(json);
    }
    charger();
  }, []);

  if (!data) return <p>...</p>;
  return <div>{data.titre}</div>;
}`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/donnees', description: 'l’URL de l’API' },
          { token: 'data / setData', description: 'ton state et son setter' },
          { token: 'data.titre', description: 'la donnée à afficher' },
        ],
        placement: 'Le schéma standard : fonction async interne déclarée puis appelée dans le useEffect.',
      },
      {
        id: 'fonction-utilitaire',
        label: 'Fonction utilitaire',
        codeBlocks: [
          {
            id: 'REACT-F-18101-t-util',
            filename: 'api.js',
            language: 'javascript',
            code: `// Fonction reutilisable, isolee du composant
export async function getUser(id) {
  const reponse = await fetch("https://api.exemple.com/users/" + id);
  const data = await reponse.json();
  return data;
}

// Utilisation ailleurs :
// const user = await getUser(1);`,
          },
        ],
        replacements: [
          { token: 'getUser', description: 'le nom de ta fonction' },
          { token: 'https://api.exemple.com/users/', description: 'la base de l’URL' },
          { token: 'id', description: 'le paramètre variable de la requête' },
        ],
        placement: 'Pour isoler la requête dans un fichier à part et la réutiliser depuis plusieurs composants.',
      },
    ],
  }),

  // ————— Afficher un loader : chargement —————
  lesson({
    id: 'REACT-F-18102-LESSON',
    slug: 'afficher-un-loader-chargement',
    title: 'Afficher un loader : chargement',
    shortTitle: 'Loader',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Montrer un message ou un spinner pendant que la requête tourne, grâce à un state booléen isLoading que l’on passe à true puis false.',
    utility: 'Afficher un indicateur pendant le chargement d’une requête.',
    aliases: ['loader', 'loading', 'chargement', 'spinner', 'isloading', 'en cours'],
    keywords: [
      'afficher chargement',
      'spinner pendant fetch',
      'etat de chargement',
      'isloading',
      'patienter',
      'skeleton',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-18102-TEMPLATE',
    intro:
      'Une requête prend du temps. Pour ne pas laisser un écran vide, on ajoute un <b>state booléen</b> <code>isLoading</code> : <code>true</code> avant la requête, <code>false</code> quand la donnée arrive. Tant qu’il est <code>true</code>, on affiche un loader.',
    sections: [
      {
        id: 's1',
        title: 'Le state isLoading',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher “Chargement…” pendant que ma requête tourne</b>, puis basculer sur les données une fois qu’elles sont arrivées.',
          },
          {
            type: 'paragraph',
            html: 'On part de <code>isLoading = true</code> (on charge dès l’ouverture). Une fois la donnée reçue, on passe à <code>false</code>. Le rendu regarde ce booléen pour choisir quoi afficher.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18102-l-c1',
              filename: 'Profil.tsx',
              language: 'tsx',
              code: `import { useState, useEffect } from "react";

function Profil() {
  const [user, setUser] = useState(null);
  // 1. On demarre en mode chargement
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function charger() {
      const r = await fetch("https://api.exemple.com/users/1");
      const data = await r.json();
      setUser(data);
      setIsLoading(false); // 2. Fini de charger
    }
    charger();
  }, []);

  // 3. Tant que ca charge, on affiche le loader
  if (isLoading) return <p>Chargement...</p>;

  // 4. Sinon, les donnees sont pretes
  return <h1>{user.name}</h1>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> la roue qui tourne quand une vidéo se charge. <code>isLoading</code> = cette roue. Dès que la vidéo est prête, la roue disparaît et l’image s’affiche.',
          },
        ],
      },
      {
        id: 's2',
        title: 'try / finally : toujours arrêter le loader',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le bloc <code>finally</code> s’exécute <b>quoi qu’il arrive</b> (succès ou erreur). C’est l’endroit idéal pour <code>setIsLoading(false)</code> : le loader s’arrête même si la requête échoue.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18102-l-c2',
              filename: 'Profil.tsx',
              language: 'tsx',
              code: `async function charger() {
  try {
    const r = await fetch("https://api.exemple.com/users/1");
    const data = await r.json();
    setUser(data);
  } finally {
    // S'execute toujours : succes OU echec
    setIsLoading(false);
  }
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Bon réflexe :</b> mets <code>setIsLoading(false)</code> dans un <code>finally</code>. Sinon, en cas d’erreur, le loader tourne à l’infini.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Les trois états d’un affichage de données',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un composant qui charge des données passe par trois moments. Les traiter séparément rend le rendu clair et sans plantage.',
          },
          {
            type: 'table',
            headers: ['Moment', 'État', 'Ce qu’on affiche'],
            rows: [
              ['pendant', '<code>isLoading === true</code>', 'un loader / “Chargement…”'],
              ['après (ok)', '<code>user</code> rempli', 'les données'],
              ['après (vide)', '<code>user === null</code>', 'un message “aucune donnée”'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>setIsLoading(false)</code> : le loader tourne pour toujours. Mets-le dans un <code>finally</code>.',
      'Démarrer <code>isLoading</code> à <code>false</code> alors qu’on charge dès l’ouverture : un flash d’écran vide avant le loader.',
      'Afficher les données <b>et</b> le loader en même temps : gère les cas avec des <code>if … return</code> séparés.',
      'Remettre <code>isLoading</code> à <code>true</code> nulle part quand on relance une requête : le loader ne réapparaît pas.',
    ],
    takeaways: [
      'un state booléen <code>isLoading</code> : <code>true</code> au départ, <code>false</code> à la fin',
      '<code>if (isLoading) return &lt;Loader /&gt;</code> avant d’afficher les données',
      '<code>setIsLoading(false)</code> dans un <code>finally</code> → s’arrête même en cas d’erreur',
      'penser aux trois états : chargement · données · vide',
    ],
  }),
  template({
    id: 'REACT-F-18102-TEMPLATE',
    slug: 'afficher-un-loader-chargement',
    title: 'Afficher un loader',
    shortTitle: 'Loader',
    technology: 'react',
    tomeId: 't8',
    summary: 'Le code prêt à copier pour afficher un indicateur de chargement pendant une requête.',
    lede: 'Montrer un état de chargement. Choisis la forme :',
    aliases: ['loader', 'loading', 'chargement', 'spinner'],
    keywords: ['isloading', 'patienter', 'finally'],
    relatedContentIds: [],
    lessonId: 'REACT-F-18102-LESSON',
    variants: [
      {
        id: 'simple',
        label: 'Message simple',
        codeBlocks: [
          {
            id: 'REACT-F-18102-t-simple',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function charger() {
    const r = await fetch("https://api.exemple.com/donnees");
    setData(await r.json());
    setIsLoading(false);
  }
  charger();
}, []);

if (isLoading) return <p>Chargement...</p>;`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/donnees', description: 'l’URL de l’API' },
          { token: 'Chargement...', description: 'le texte affiché pendant l’attente' },
        ],
        placement: 'Le cas le plus courant : un texte “Chargement…” tant que la donnée n’est pas là.',
      },
      {
        id: 'finally',
        label: 'Avec try / finally',
        codeBlocks: [
          {
            id: 'REACT-F-18102-t-finally',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `useEffect(() => {
  async function charger() {
    try {
      const r = await fetch("https://api.exemple.com/donnees");
      setData(await r.json());
    } finally {
      setIsLoading(false); // s'arrete meme en cas d'erreur
    }
  }
  charger();
}, []);`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/donnees', description: 'l’URL de l’API' },
          { token: 'setData', description: 'le setter de ta donnée' },
        ],
        placement: 'Version robuste : le loader s’arrête même si la requête échoue, grâce au finally.',
      },
      {
        id: 'spinner',
        label: 'Spinner (composant)',
        codeBlocks: [
          {
            id: 'REACT-F-18102-t-spinner',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `function Spinner() {
  return <div className="spinner" aria-label="Chargement" />;
}

// Dans le composant qui charge :
if (isLoading) return <Spinner />;

return <h1>{data.name}</h1>;`,
          },
        ],
        replacements: [
          { token: 'Spinner', description: 'ton composant d’indicateur visuel' },
          { token: 'spinner', description: 'la classe CSS qui anime la roue' },
          { token: 'data.name', description: 'la donnée à afficher une fois chargée' },
        ],
        placement: 'Quand tu veux une vraie roue animée plutôt qu’un texte : un petit composant Spinner dédié.',
      },
    ],
  }),

  // ————— Gérer une erreur de requête —————
  lesson({
    id: 'REACT-F-18103-LESSON',
    slug: 'gerer-une-erreur-de-requete',
    title: 'Gérer une erreur de requête',
    shortTitle: 'Erreur requête',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Attraper les erreurs d’une requête (réseau coupé, 404, 500) avec try/catch et un state error, pour afficher un message au lieu d’un écran cassé.',
    utility: 'Afficher un message clair quand une requête échoue.',
    aliases: ['erreur', 'error', 'catch', 'try catch', 'gestion erreur', 'requete echouee'],
    keywords: [
      'gerer une erreur',
      'requete echoue',
      'try catch',
      'message erreur',
      'reseau coupe',
      'reponse ok',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-18103-TEMPLATE',
    intro:
      'Une requête peut échouer : réseau coupé, serveur en panne, ressource introuvable. On entoure le <code>fetch</code> d’un <code>try / catch</code> et on stocke le souci dans un state <code>error</code> pour afficher un message propre.',
    sections: [
      {
        id: 's1',
        title: 'try / catch autour du fetch',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher “Impossible de charger” si la requête échoue</b>, au lieu de laisser la page planter ou rester vide.',
          },
          {
            type: 'paragraph',
            html: 'On met la requête dans un <code>try</code>. Si quoi que ce soit échoue, le <code>catch</code> se déclenche : on y range l’erreur dans un state pour l’afficher.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18103-l-c1',
              filename: 'Profil.tsx',
              language: 'tsx',
              code: `import { useState, useEffect } from "react";

function Profil() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // 1. Un state pour l'erreur

  useEffect(() => {
    async function charger() {
      try {
        const r = await fetch("https://api.exemple.com/users/1");
        const data = await r.json();
        setUser(data);
      } catch (e) {
        // 2. En cas de souci, on stocke le message
        setError("Impossible de charger les donnees");
      }
    }
    charger();
  }, []);

  // 3. On affiche l'erreur en priorite
  if (error) return <p>{error}</p>;
  if (!user) return <p>Chargement...</p>;

  return <h1>{user.name}</h1>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un filet de sécurité sous un trapéziste. Le <code>try</code> = le numéro. Le <code>catch</code> = le filet : si ça tombe, on rattrape proprement au lieu de s’écraser.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Attention : fetch ne rejette pas les 404',
        blocks: [
          {
            type: 'paragraph',
            html: 'Piège majeur : <code>fetch</code> ne déclenche <b>pas</b> le <code>catch</code> pour un statut 404 ou 500. Il ne rejette que sur une panne <b>réseau</b>. Pour les erreurs HTTP, il faut vérifier <code>reponse.ok</code> soi-même.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18103-l-c2',
              filename: 'Profil.tsx',
              language: 'tsx',
              code: `async function charger() {
  try {
    const reponse = await fetch("https://api.exemple.com/users/1");

    // reponse.ok est faux pour un statut 400 a 599
    if (!reponse.ok) {
      // On declenche manuellement une erreur -> part dans le catch
      throw new Error("Erreur " + reponse.status);
    }

    const data = await reponse.json();
    setUser(data);
  } catch (e) {
    setError("Impossible de charger les donnees");
  }
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> teste toujours <code>if (!reponse.ok) throw …</code> après un <code>fetch</code>. Sinon un 404 passe inaperçu et tu essaies de lire un corps vide.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Loader + erreur ensemble',
        blocks: [
          {
            type: 'paragraph',
            html: 'En vrai on combine les deux : un state <code>isLoading</code>, un state <code>error</code>, et un <code>finally</code> pour toujours arrêter le loader.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18103-l-c3',
              filename: 'Profil.tsx',
              language: 'tsx',
              code: `async function charger() {
  try {
    const r = await fetch("https://api.exemple.com/users/1");
    if (!r.ok) throw new Error("Erreur " + r.status);
    setUser(await r.json());
  } catch (e) {
    setError("Impossible de charger les donnees");
  } finally {
    setIsLoading(false); // toujours, quoi qu'il arrive
  }
}

// Rendu : on traite chaque cas
// if (isLoading) return <p>Chargement...</p>;
// if (error)     return <p>{error}</p>;
// return <h1>{user.name}</h1>;`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que <code>fetch</code> part dans le <code>catch</code> sur un 404 : faux. Vérifie <code>if (!reponse.ok) throw …</code>.',
      'Oublier le state <code>error</code> : l’utilisateur voit un écran blanc sans comprendre pourquoi.',
      'Afficher <code>user.name</code> sans traiter l’erreur avant : plante si <code>user</code> est resté <code>null</code>.',
      'Mettre un message technique brut (<code>e.message</code>) à l’écran : préfère un texte clair pour l’utilisateur.',
    ],
    takeaways: [
      'entoure la requête d’un <code>try / catch</code> · stocke le souci dans un state <code>error</code>',
      '<code>fetch</code> ne rejette pas les 404/500 : ajoute <code>if (!reponse.ok) throw …</code>',
      'affiche l’erreur en priorité : <code>if (error) return &lt;p&gt;…&lt;/p&gt;</code>',
      'combo complet : <code>isLoading</code> + <code>error</code> + <code>finally</code>',
    ],
  }),
  template({
    id: 'REACT-F-18103-TEMPLATE',
    slug: 'gerer-une-erreur-de-requete',
    title: 'Gérer une erreur de requête',
    shortTitle: 'Erreur requête',
    technology: 'react',
    tomeId: 't8',
    summary: 'Le code prêt à copier pour attraper une erreur de requête et afficher un message.',
    lede: 'Gérer l’échec d’une requête. Choisis le niveau :',
    aliases: ['erreur', 'catch', 'try catch', 'gestion erreur'],
    keywords: ['error', 'reponse ok', 'message erreur'],
    relatedContentIds: [],
    lessonId: 'REACT-F-18103-LESSON',
    variants: [
      {
        id: 'catch-simple',
        label: 'try / catch',
        codeBlocks: [
          {
            id: 'REACT-F-18103-t-catch',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `const [data, setData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
  async function charger() {
    try {
      const r = await fetch("https://api.exemple.com/donnees");
      setData(await r.json());
    } catch (e) {
      setError("Impossible de charger les donnees");
    }
  }
  charger();
}, []);

if (error) return <p>{error}</p>;`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/donnees', description: 'l’URL de l’API' },
          { token: 'Impossible de charger les donnees', description: 'le message affiché à l’utilisateur' },
        ],
        placement: 'La base : attraper toute erreur et afficher un message. Couvre les pannes réseau.',
      },
      {
        id: 'reponse-ok',
        label: 'Avec reponse.ok',
        codeBlocks: [
          {
            id: 'REACT-F-18103-t-ok',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `async function charger() {
  try {
    const reponse = await fetch("https://api.exemple.com/donnees");
    if (!reponse.ok) {
      throw new Error("Erreur " + reponse.status);
    }
    setData(await reponse.json());
  } catch (e) {
    setError("Impossible de charger les donnees");
  }
}`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/donnees', description: 'l’URL de l’API' },
          { token: 'Erreur ', description: 'le préfixe du message technique (interne)' },
        ],
        placement: 'Indispensable pour attraper aussi les 404 et 500, que fetch ignore par défaut.',
      },
      {
        id: 'complet',
        label: 'Complet (loader + erreur)',
        codeBlocks: [
          {
            id: 'REACT-F-18103-t-complet',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `const [data, setData] = useState(null);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function charger() {
    try {
      const r = await fetch("https://api.exemple.com/donnees");
      if (!r.ok) throw new Error("Erreur " + r.status);
      setData(await r.json());
    } catch (e) {
      setError("Impossible de charger les donnees");
    } finally {
      setIsLoading(false);
    }
  }
  charger();
}, []);

if (isLoading) return <p>Chargement...</p>;
if (error) return <p>{error}</p>;
return <div>{data.titre}</div>;`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/donnees', description: 'l’URL de l’API' },
          { token: 'data.titre', description: 'la donnée à afficher au succès' },
        ],
        placement: 'Le patron complet, prêt pour la production : chargement, erreur et succès traités séparément.',
      },
    ],
  }),

  // ————— Axios : alternative à fetch —————
  lesson({
    id: 'REACT-F-18104-LESSON',
    slug: 'axios-alternative-a-fetch',
    title: 'Axios : alternative à fetch',
    shortTitle: 'Axios',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Utiliser la librairie axios au lieu de fetch : JSON automatique, erreurs HTTP dans le catch, et syntaxe plus courte.',
    utility: 'Faire des requêtes avec axios, plus court et plus pratique que fetch.',
    aliases: ['axios', 'librairie requete', 'axios get', 'axios post', 'alternative fetch'],
    keywords: [
      'installer axios',
      'axios get',
      'json automatique',
      'response data',
      'requete plus courte',
      'erreur http catch',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-18104-TEMPLATE',
    intro:
      '<b>axios</b> est une librairie qui fait des requêtes comme <code>fetch</code>, mais en plus pratique : le JSON est <b>converti automatiquement</b> (dans <code>reponse.data</code>) et les erreurs HTTP (404, 500) partent <b>directement dans le catch</b>.',
    sections: [
      {
        id: 's1',
        title: 'Installer et faire un GET',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>récupérer une donnée sans écrire le double <code>.json()</code> ni vérifier <code>reponse.ok</code></b> à chaque fois.',
          },
          {
            type: 'paragraph',
            html: 'On installe axios une fois, on l’importe, puis <code>axios.get(url)</code> renvoie une réponse dont la donnée est <b>déjà prête</b> dans <code>reponse.data</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18104-l-c1',
              filename: 'terminal.bash',
              language: 'bash',
              code: `# On installe la librairie une fois
npm install axios`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18104-l-c2',
              filename: 'Profil.tsx',
              language: 'tsx',
              code: `import { useState, useEffect } from "react";
import axios from "axios"; // on importe axios

function Profil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function charger() {
      // axios.get -> pas de .json() a faire
      const reponse = await axios.get("https://api.exemple.com/users/1");
      // la donnee est deja prete dans reponse.data
      setUser(reponse.data);
    }
    charger();
  }, []);

  if (!user) return <p>Chargement...</p>;
  return <h1>{user.name}</h1>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> avec axios, la donnée est dans <code>reponse.data</code> — pas besoin de <code>.json()</code>. C’est la différence la plus visible avec <code>fetch</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'fetch vs axios',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les deux font le même travail. axios ajoute surtout du confort. Voici les différences qui comptent au quotidien.',
          },
          {
            type: 'table',
            headers: ['Point', 'fetch', 'axios'],
            rows: [
              ['conversion JSON', 'manuelle (<code>.json()</code>)', 'automatique (<code>.data</code>)'],
              ['erreur 404/500', 'à gérer soi-même', 'part dans le <code>catch</code>'],
              ['installation', 'intégré au navigateur', '<code>npm install axios</code>'],
              ['syntaxe POST', 'options à écrire', '<code>axios.post(url, objet)</code>'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'POST et gestion d’erreur',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour <b>envoyer</b> des données, <code>axios.post(url, objet)</code> suffit : l’objet est converti en JSON tout seul. Et comme les erreurs HTTP partent dans le <code>catch</code>, la gestion d’erreur est plus directe.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18104-l-c3',
              filename: 'envoyer.js',
              language: 'javascript',
              code: `import axios from "axios";

async function creerUser() {
  try {
    // 2e argument = le corps, converti en JSON automatiquement
    const reponse = await axios.post("https://api.exemple.com/users", {
      name: "Alice",
      email: "alice@exemple.com",
    });
    console.log(reponse.data); // l'objet cree, renvoye par l'API
  } catch (e) {
    // Un 400 ou 500 arrive directement ici
    console.log("Echec de la creation");
  }
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>fetch</code> = une voiture manuelle (tu passes les vitesses toi-même : <code>.json()</code>, <code>reponse.ok</code>). axios = une automatique : ça roule pareil, avec moins de gestes.',
          },
        ],
      },
    ],
    pitfalls: [
      'Lire <code>reponse</code> directement au lieu de <code>reponse.data</code> : avec axios, la donnée est <b>dans</b> <code>.data</code>.',
      'Refaire <code>.json()</code> avec axios : inutile, la conversion est déjà faite.',
      'Oublier <code>npm install axios</code> : l’import échoue (contrairement à <code>fetch</code>, intégré au navigateur).',
      'Croire qu’axios est obligatoire : <code>fetch</code> fait très bien le travail. axios est un confort, pas une nécessité.',
    ],
    takeaways: [
      'axios = librairie à installer (<code>npm install axios</code>) puis à importer',
      'la donnée est dans <code>reponse.data</code> — <b>pas</b> de <code>.json()</code>',
      'les erreurs HTTP (404, 500) partent <b>directement</b> dans le <code>catch</code>',
      'envoyer : <code>axios.post(url, objet)</code> · l’objet devient du JSON tout seul',
    ],
  }),
  template({
    id: 'REACT-F-18104-TEMPLATE',
    slug: 'axios-alternative-a-fetch',
    title: 'Axios',
    shortTitle: 'Axios',
    technology: 'react',
    tomeId: 't8',
    summary: 'Le code axios prêt à copier : GET, POST, et la version complète avec loader et erreur.',
    lede: 'Faire une requête avec axios. Choisis le cas :',
    aliases: ['axios', 'axios get', 'axios post'],
    keywords: ['response data', 'librairie', 'requete'],
    relatedContentIds: [],
    lessonId: 'REACT-F-18104-LESSON',
    variants: [
      {
        id: 'get',
        label: 'GET',
        codeBlocks: [
          {
            id: 'REACT-F-18104-t-get',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `import { useState, useEffect } from "react";
import axios from "axios";

function Composant() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function charger() {
      const reponse = await axios.get("https://api.exemple.com/donnees");
      setData(reponse.data); // deja en JSON
    }
    charger();
  }, []);

  if (!data) return <p>Chargement...</p>;
  return <div>{data.titre}</div>;
}`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/donnees', description: 'l’URL de l’API' },
          { token: 'data.titre', description: 'la donnée à afficher' },
        ],
        placement: 'Le cas de base : récupérer une donnée. La réponse est déjà prête dans reponse.data.',
      },
      {
        id: 'post',
        label: 'POST',
        codeBlocks: [
          {
            id: 'REACT-F-18104-t-post',
            filename: 'envoyer.js',
            language: 'javascript',
            code: `import axios from "axios";

async function envoyer() {
  const reponse = await axios.post("https://api.exemple.com/users", {
    name: "Alice",
    email: "alice@exemple.com",
  });
  return reponse.data;
}`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/users', description: 'l’URL où envoyer les données' },
          { token: 'name: "Alice", email: "alice@exemple.com"', description: 'l’objet à envoyer (converti en JSON tout seul)' },
        ],
        placement: 'Pour créer/envoyer une donnée : le 2e argument est le corps de la requête.',
      },
      {
        id: 'complet',
        label: 'Complet (loader + erreur)',
        codeBlocks: [
          {
            id: 'REACT-F-18104-t-complet',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `import { useState, useEffect } from "react";
import axios from "axios";

function Composant() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function charger() {
      try {
        const r = await axios.get("https://api.exemple.com/donnees");
        setData(r.data);
      } catch (e) {
        setError("Impossible de charger les donnees");
      } finally {
        setIsLoading(false);
      }
    }
    charger();
  }, []);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  return <div>{data.titre}</div>;
}`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/donnees', description: 'l’URL de l’API' },
          { token: 'data.titre', description: 'la donnée à afficher au succès' },
        ],
        placement: 'Le patron complet avec axios : les erreurs HTTP tombent seules dans le catch.',
      },
    ],
  }),

  // ————— Rafraîchir les données —————
  lesson({
    id: 'REACT-F-18105-LESSON',
    slug: 'rafraichir-les-donnees',
    title: 'Rafraîchir les données',
    shortTitle: 'Rafraîchir',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Relancer une requête après le premier chargement : au clic sur un bouton, ou automatiquement quand une valeur change grâce aux dépendances de useEffect.',
    utility: 'Recharger les données à la demande ou quand une valeur change.',
    aliases: ['rafraichir', 'refresh', 'recharger', 'refetch', 'relancer requete', 'reload'],
    keywords: [
      'recharger les donnees',
      'bouton rafraichir',
      'relancer fetch',
      'dependance useeffect',
      'refetch',
      'trigger requete',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-18105-TEMPLATE',
    intro:
      'Charger une fois au montage ne suffit pas toujours : on veut parfois <b>relancer</b> la requête. Deux façons : un <b>bouton</b> qui rappelle la fonction de chargement, ou une <b>dépendance</b> de <code>useEffect</code> qui redéclenche l’effet.',
    sections: [
      {
        id: 's1',
        title: 'Un bouton “Rafraîchir”',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>un bouton “Rafraîchir” qui recharge la liste</b> quand l’utilisateur clique dessus, sans recharger toute la page.',
          },
          {
            type: 'paragraph',
            html: 'On sort la logique de chargement dans une <b>fonction nommée</b>. Le <code>useEffect</code> l’appelle au montage, et le bouton la rappelle au clic. Même fonction, deux déclencheurs.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18105-l-c1',
              filename: 'Liste.tsx',
              language: 'tsx',
              code: `import { useState, useEffect } from "react";

function Liste() {
  const [items, setItems] = useState([]);

  // 1. Une fonction reutilisable qui charge les donnees
  async function charger() {
    const r = await fetch("https://api.exemple.com/items");
    setItems(await r.json());
  }

  // 2. Au montage, on charge une premiere fois
  useEffect(() => {
    charger();
  }, []);

  return (
    <div>
      {/* 3. Le bouton rappelle la meme fonction */}
      <button onClick={charger}>Rafraichir</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.nom}</li>
        ))}
      </ul>
    </div>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le geste de tirer vers le bas pour rafraîchir dans une app mobile. Tu redemandes les mêmes données, l’écran se met à jour sans tout recharger.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Rafraîchir quand une valeur change',
        blocks: [
          {
            type: 'paragraph',
            html: 'Autre besoin : recharger <b>automatiquement</b> quand un filtre ou un id change. On met cette valeur dans le <b>tableau de dépendances</b> : dès qu’elle change, <code>useEffect</code> relance la requête.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18105-l-c2',
              filename: 'Liste.tsx',
              language: 'tsx',
              code: `function Liste() {
  const [categorie, setCategorie] = useState("livres");
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function charger() {
      const r = await fetch("https://api.exemple.com/items?cat=" + categorie);
      setItems(await r.json());
    }
    charger();
  }, [categorie]); // relance des que categorie change

  return (
    <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
      <option value="livres">Livres</option>
      <option value="films">Films</option>
    </select>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> tout ce dont dépend la requête (id, filtre, page…) va dans le tableau de dépendances. React relance l’effet à chaque changement.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Forcer un rechargement avec un compteur',
        blocks: [
          {
            type: 'paragraph',
            html: 'Astuce pour un bouton « Rafraîchir » qui passe par <code>useEffect</code> : un state <b>compteur</b> qu’on incrémente au clic, placé dans les dépendances. Chaque incrément relance l’effet.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-18105-l-c3',
              filename: 'Liste.tsx',
              language: 'tsx',
              code: `const [items, setItems] = useState([]);
// Un compteur qui sert de "declencheur"
const [refresh, setRefresh] = useState(0);

useEffect(() => {
  async function charger() {
    const r = await fetch("https://api.exemple.com/items");
    setItems(await r.json());
  }
  charger();
}, [refresh]); // relance a chaque changement de refresh

// Le clic incremente -> useEffect se relance
// <button onClick={() => setRefresh(refresh + 1)}>Rafraichir</button>`,
            },
          },
          {
            type: 'table',
            headers: ['Méthode', 'Quand l’utiliser'],
            rows: [
              ['bouton → fonction', 'rafraîchir à la demande, simple'],
              ['dépendance <code>[valeur]</code>', 'recharger quand un filtre/id change'],
              ['compteur <code>[refresh]</code>', 'forcer un refetch via <code>useEffect</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Copier-coller la logique de <code>fetch</code> dans le bouton et dans le <code>useEffect</code> : extrais une fonction <code>charger</code> réutilisable.',
      'Oublier de mettre le filtre dans les dépendances : la requête ne se relance pas quand la valeur change.',
      'Mettre trop de dépendances : l’effet se relance sans arrêt. N’y mets que ce qui doit vraiment déclencher un refetch.',
      'Ne pas remettre <code>isLoading</code> à <code>true</code> au rafraîchissement : aucun retour visuel pendant le rechargement.',
    ],
    takeaways: [
      'extrais une fonction <code>charger()</code> : appelée au montage <b>et</b> au clic',
      'bouton simple : <code>&lt;button onClick={charger}&gt;</code>',
      'recharge auto : mets la valeur (id, filtre) dans le tableau de dépendances',
      'forcer un refetch : un state compteur <code>refresh</code> dans les dépendances',
    ],
  }),
  template({
    id: 'REACT-F-18105-TEMPLATE',
    slug: 'rafraichir-les-donnees',
    title: 'Rafraîchir les données',
    shortTitle: 'Rafraîchir',
    technology: 'react',
    tomeId: 't8',
    summary: 'Le code prêt à copier pour relancer une requête : bouton, dépendance ou compteur.',
    lede: 'Recharger les données. Choisis le déclencheur :',
    aliases: ['rafraichir', 'refresh', 'recharger', 'refetch'],
    keywords: ['bouton rafraichir', 'dependance', 'relancer'],
    relatedContentIds: [],
    lessonId: 'REACT-F-18105-LESSON',
    variants: [
      {
        id: 'bouton',
        label: 'Bouton',
        codeBlocks: [
          {
            id: 'REACT-F-18105-t-bouton',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `const [items, setItems] = useState([]);

async function charger() {
  const r = await fetch("https://api.exemple.com/items");
  setItems(await r.json());
}

useEffect(() => {
  charger();
}, []);

// Dans le return :
// <button onClick={charger}>Rafraichir</button>`,
          },
        ],
        replacements: [
          { token: 'https://api.exemple.com/items', description: 'l’URL de l’API' },
          { token: 'charger', description: 'le nom de ta fonction de chargement' },
        ],
        placement: 'La méthode la plus simple : une fonction charger() appelée au montage et au clic du bouton.',
      },
      {
        id: 'dependance',
        label: 'Selon une valeur',
        codeBlocks: [
          {
            id: 'REACT-F-18105-t-dep',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `const [filtre, setFiltre] = useState("tout");
const [items, setItems] = useState([]);

useEffect(() => {
  async function charger() {
    const r = await fetch("https://api.exemple.com/items?f=" + filtre);
    setItems(await r.json());
  }
  charger();
}, [filtre]); // relance quand filtre change`,
          },
        ],
        replacements: [
          { token: 'filtre', description: 'la valeur qui déclenche le rechargement (filtre, id, page…)' },
          { token: 'https://api.exemple.com/items?f=', description: 'l’URL avec le paramètre variable' },
        ],
        placement: 'Pour recharger automatiquement dès qu’un filtre ou un id change : mets-le dans les dépendances.',
      },
      {
        id: 'compteur',
        label: 'Compteur (force)',
        codeBlocks: [
          {
            id: 'REACT-F-18105-t-compteur',
            filename: 'Liste.tsx',
            language: 'tsx',
            code: `const [items, setItems] = useState([]);
const [refresh, setRefresh] = useState(0);

useEffect(() => {
  async function charger() {
    const r = await fetch("https://api.exemple.com/items");
    setItems(await r.json());
  }
  charger();
}, [refresh]);

// <button onClick={() => setRefresh(refresh + 1)}>Rafraichir</button>`,
          },
        ],
        replacements: [
          { token: 'refresh', description: 'le compteur déclencheur' },
          { token: 'https://api.exemple.com/items', description: 'l’URL de l’API' },
        ],
        placement: 'Quand tu veux forcer un refetch en passant par useEffect : incrémente un compteur au clic.',
      },
    ],
  }),
];
