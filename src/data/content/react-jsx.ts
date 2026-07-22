import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const reactJsxContent: ReadyContent[] = [
  // ————— C’est quoi le JSX —————
  lesson({
    id: 'REACT-F-15100-LESSON',
    slug: 'c-est-quoi-le-jsx',
    title: 'C’est quoi le JSX',
    shortTitle: 'JSX',
    technology: 'react',
    tomeId: 't5',
    summary:
      'Le JSX, c’est écrire du HTML directement dans ton JavaScript : la syntaxe de base d’un composant React.',
    utility:
      'Comprendre cette syntaxe mi-HTML mi-JavaScript qu’on retourne dans chaque composant React.',
    aliases: ['jsx', 'html dans js', 'return jsx', 'syntaxe react', 'balise react'],
    keywords: [
      'ecrire du html dans js',
      'retourner du jsx',
      'un seul element parent',
      'fragment',
      'accolades jsx',
      'className',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-15100-TEMPLATE',
    intro:
      'Le <b>JSX</b> est la syntaxe de React qui te laisse écrire du <b>HTML directement dans ton JavaScript</b>. Un composant est une fonction qui <code>return</code> du JSX, et React le transforme en vrais éléments à l’écran.',
    sections: [
      {
        id: 's1',
        title: 'Retourner du JSX depuis un composant',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher un titre et un paragraphe</b> à l’écran depuis mon tout premier composant React.',
          },
          {
            type: 'paragraph',
            html: 'Un <b>composant</b> = une fonction qui commence par une <b>majuscule</b> et retourne du JSX. Ce JSX ressemble à du HTML mais vit dans un fichier <code>.tsx</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15100-l-c1',
              filename: 'Accueil.tsx',
              language: 'tsx',
              code: `// Un composant = une fonction qui retourne du JSX
function Accueil() {
  // Ce return ressemble a du HTML, mais c'est du JSX
  return (
    <div>
      <h1>Bonjour</h1>
      <p>Ma premiere page React.</p>
    </div>
  );
}

export default Accueil;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> le nom d’un composant commence <b>toujours</b> par une majuscule (<code>Accueil</code>, pas <code>accueil</code>). React distingue tes composants des balises HTML natives grâce à ça.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Un seul élément parent',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un composant ne peut retourner <b>qu’un seul élément parent</b>. Si tu as plusieurs balises côte à côte, enveloppe-les dans un <code>&lt;div&gt;</code> ou dans un <b>Fragment</b> vide <code>&lt;&gt;...&lt;/&gt;</code> (qui n’ajoute aucune balise au HTML final).',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15100-l-c2',
              filename: 'Carte.tsx',
              language: 'tsx',
              code: `// FAUX : deux balises au meme niveau, pas de parent
// return (
//   <h1>Titre</h1>
//   <p>Texte</p>
// );

// BON : un Fragment <> </> enveloppe le tout
function Carte() {
  return (
    <>
      <h1>Titre</h1>
      <p>Texte</p>
    </>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le Fragment <code>&lt;&gt;&lt;/&gt;</code> = un sac transparent. Il regroupe tes éléments pour les transporter, mais il disparaît une fois posé : il n’apparaît pas dans le HTML.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Les différences avec le HTML',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le JSX suit les règles du <b>JavaScript</b>, pas celles du HTML. Quelques attributs changent de nom, et toute balise doit être <b>fermée</b>.',
          },
          {
            type: 'table',
            headers: ['En HTML', 'En JSX', 'Pourquoi'],
            rows: [
              ['<code>class</code>', '<code>className</code>', '<code>class</code> est un mot réservé en JS'],
              ['<code>for</code>', '<code>htmlFor</code>', '<code>for</code> est un mot réservé en JS'],
              ['<code>&lt;br&gt;</code>', '<code>&lt;br /&gt;</code>', 'toute balise doit être fermée'],
              ['<code>onclick</code>', '<code>onClick</code>', 'les événements sont en camelCase'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> en JSX on écrit <code>className</code> (jamais <code>class</code>) et les balises solitaires se ferment elles-mêmes : <code>&lt;img /&gt;</code>, <code>&lt;input /&gt;</code>, <code>&lt;br /&gt;</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Retourner plusieurs balises sans parent commun : entoure-les d’un <code>&lt;div&gt;</code> ou d’un Fragment <code>&lt;&gt;...&lt;/&gt;</code>.',
      'Écrire <code>class="..."</code> au lieu de <code>className="..."</code> : en JSX c’est toujours <code>className</code>.',
      'Oublier de fermer une balise : <code>&lt;img&gt;</code> passe en HTML mais casse en JSX. Écris <code>&lt;img /&gt;</code>.',
      'Nommer un composant en minuscule (<code>accueil</code>) : React le prend pour une balise HTML. Majuscule obligatoire.',
    ],
    takeaways: [
      'JSX = écrire du <b>HTML dans du JavaScript</b>, retourné par un composant',
      'un composant = une <b>fonction à majuscule</b> qui <code>return</code> du JSX',
      'un seul élément parent → sinon un <code>&lt;div&gt;</code> ou un Fragment <code>&lt;&gt;...&lt;/&gt;</code>',
      '<code>class</code> → <code>className</code> · <code>for</code> → <code>htmlFor</code> · balises auto-fermées <code>&lt;img /&gt;</code>',
    ],
  }),
  template({
    id: 'REACT-F-15100-TEMPLATE',
    slug: 'c-est-quoi-le-jsx',
    title: 'C’est quoi le JSX',
    shortTitle: 'JSX',
    technology: 'react',
    tomeId: 't5',
    summary: 'Le squelette d’un composant JSX prêt à copier : élément simple, plusieurs éléments, Fragment.',
    lede: 'Le point de départ d’un composant. Choisis le cas :',
    aliases: ['jsx', 'composant', 'fragment', 'return jsx'],
    keywords: ['squelette composant', 'un seul parent', 'fragment'],
    relatedContentIds: [],
    lessonId: 'REACT-F-15100-LESSON',
    variants: [
      {
        id: 'simple',
        label: 'Composant simple',
        codeBlocks: [
          {
            id: 'REACT-F-15100-t-v1',
            filename: 'MonComposant.tsx',
            language: 'tsx',
            code: `function MonComposant() {
  return (
    <div className="boite">
      <h1>Titre</h1>
    </div>
  );
}

export default MonComposant;`,
          },
        ],
        replacements: [
          { token: 'MonComposant', description: 'le nom de ton composant (toujours une majuscule)' },
          { token: 'boite', description: 'la classe CSS de ton élément' },
        ],
        placement: 'Le squelette de base : un seul élément parent qui contient tout le reste.',
      },
      {
        id: 'fragment',
        label: 'Plusieurs éléments (Fragment)',
        description: 'Quand tu as plusieurs balises au même niveau sans vouloir de div en plus.',
        codeBlocks: [
          {
            id: 'REACT-F-15100-t-v2',
            filename: 'MonComposant.tsx',
            language: 'tsx',
            code: `function MonComposant() {
  return (
    <>
      <h1>Titre</h1>
      <p>Un paragraphe.</p>
    </>
  );
}

export default MonComposant;`,
          },
        ],
        replacements: [
          { token: 'MonComposant', description: 'le nom de ton composant' },
        ],
        placement: 'Le Fragment <> </> regroupe tes éléments sans ajouter de balise au HTML final.',
      },
      {
        id: 'div-parent',
        label: 'Avec un div parent',
        description: 'Quand tu veux un vrai conteneur stylable autour de tes éléments.',
        codeBlocks: [
          {
            id: 'REACT-F-15100-t-v3',
            filename: 'MonComposant.tsx',
            language: 'tsx',
            code: `function MonComposant() {
  return (
    <div className="conteneur">
      <h1>Titre</h1>
      <p>Un paragraphe.</p>
    </div>
  );
}

export default MonComposant;`,
          },
        ],
        replacements: [
          { token: 'conteneur', description: 'la classe CSS du conteneur' },
        ],
        placement: 'Choisis un <div> plutôt qu’un Fragment quand tu as besoin de styliser le parent.',
      },
    ],
  }),

  // ————— Afficher une variable dans le JSX —————
  lesson({
    id: 'REACT-F-15101-LESSON',
    slug: 'afficher-une-variable-dans-le-jsx',
    title: 'Afficher une variable dans le JSX',
    shortTitle: 'Variables en JSX',
    technology: 'react',
    tomeId: 't5',
    summary:
      'Injecter une valeur JavaScript dans ton JSX grâce aux accolades : texte, calcul, propriété d’objet.',
    utility: 'Afficher dynamiquement une valeur JavaScript au milieu de ton JSX.',
    aliases: ['accolades jsx', 'interpolation', 'afficher variable', 'expression jsx', 'curly braces'],
    keywords: [
      'afficher une variable',
      'accolades dans le jsx',
      'expression javascript',
      'calcul dans le jsx',
      'attribut dynamique',
      'map liste',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-15101-TEMPLATE',
    intro:
      'Pour afficher une valeur JavaScript dans ton JSX, tu l’entoures d’<b>accolades</b> <code>{ }</code>. Tout ce qui est entre accolades est évalué comme une <b>expression JavaScript</b>, puis affiché.',
    sections: [
      {
        id: 's1',
        title: 'Afficher une variable',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher le prénom de l’utilisateur</b> dans mon titre, au lieu d’un texte écrit en dur.',
          },
          {
            type: 'paragraph',
            html: 'Tu déclares ta variable au-dessus du <code>return</code>, puis tu la places entre <b>accolades</b> à l’endroit voulu dans le JSX.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15101-l-c1',
              filename: 'Bienvenue.tsx',
              language: 'tsx',
              code: `function Bienvenue() {
  // 1. Je declare ma variable avant le return
  const prenom = "Alice";

  return (
    <h1>
      {/* 2. Je l'affiche entre accolades */}
      Bonjour {prenom} !
    </h1>
  );
  // Resultat affiche : Bonjour Alice !
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> les accolades <code>{ }</code> = une fenêtre découpée dans le JSX. Par cette fenêtre, React regarde vers ton JavaScript et affiche ce qu’il y trouve.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Des expressions, pas des instructions',
        blocks: [
          {
            type: 'paragraph',
            html: 'Entre accolades, tu peux mettre <b>toute expression qui produit une valeur</b> : un calcul, une propriété d’objet, un appel de fonction. En revanche, pas de <code>if</code> ni de boucle <code>for</code> (ce sont des instructions, pas des expressions).',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15101-l-c2',
              filename: 'Profil.tsx',
              language: 'tsx',
              code: `function Profil() {
  const user = { prenom: "Alice", age: 30 };
  const prix = 20;

  return (
    <div>
      {/* Propriete d'un objet */}
      <p>{user.prenom}</p>

      {/* Un calcul */}
      <p>Total : {prix * 2} EUR</p>

      {/* Un appel de methode */}
      <p>{user.prenom.toUpperCase()}</p>
    </div>
  );
}`,
            },
          },
          {
            type: 'table',
            headers: ['Entre accolades', 'Autorisé ?'],
            rows: [
              ['<code>{prenom}</code>', 'oui — une variable'],
              ['<code>{prix * 2}</code>', 'oui — un calcul'],
              ['<code>{user.prenom}</code>', 'oui — une propriété'],
              ['<code>{if (x) {...}}</code>', 'non — un <code>if</code> est une instruction'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Une variable dans un attribut',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les accolades marchent aussi <b>dans les attributs</b>. Attention : <b>sans guillemets</b> autour des accolades, sinon la valeur devient du texte littéral.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15101-l-c3',
              filename: 'Avatar.tsx',
              language: 'tsx',
              code: `function Avatar() {
  const url = "https://exemple.com/photo.jpg";
  const description = "Photo de profil";

  return (
    // Accolades directement, PAS de guillemets autour
    <img src={url} alt={description} />
  );

  // FAUX : src="{url}" afficherait le texte "{url}"
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle :</b> valeur fixe → guillemets (<code>src="photo.jpg"</code>). Valeur dynamique → accolades sans guillemets (<code>src={url}</code>).',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre des guillemets autour des accolades (<code>src="{url}"</code>) : React affiche alors le texte <code>{url}</code>, pas la valeur.',
      'Essayer un <code>if</code> entre accolades : impossible. Utilise un ternaire ou prépare la valeur avant le <code>return</code>.',
      'Afficher un objet entier (<code>{user}</code>) : React plante. Affiche une propriété (<code>{user.prenom}</code>).',
      'Confondre les accolades JSX <code>{ }</code> avec les accolades d’un objet : <code>{{ ... }}</code> = accolades JSX + objet à l’intérieur.',
    ],
    takeaways: [
      'afficher une valeur JS dans le JSX → <b>accolades</b> <code>{ }</code>',
      'entre accolades : uniquement des <b>expressions</b> (valeur), pas de <code>if</code>/<code>for</code>',
      'attribut dynamique → <code>src={url}</code> (sans guillemets)',
      'jamais afficher un <b>objet entier</b> : cible une propriété',
    ],
  }),
  template({
    id: 'REACT-F-15101-TEMPLATE',
    slug: 'afficher-une-variable-dans-le-jsx',
    title: 'Afficher une variable dans le JSX',
    shortTitle: 'Variables en JSX',
    technology: 'react',
    tomeId: 't5',
    summary: 'Injecter une valeur JavaScript dans le JSX : dans le texte, dans un attribut, un calcul.',
    lede: 'Afficher une valeur dynamique. Choisis le cas :',
    aliases: ['accolades', 'interpolation', 'afficher variable'],
    keywords: ['expression', 'attribut dynamique', 'calcul'],
    relatedContentIds: [],
    lessonId: 'REACT-F-15101-LESSON',
    variants: [
      {
        id: 'texte',
        label: 'Dans le texte',
        codeBlocks: [
          {
            id: 'REACT-F-15101-t-v1',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `const prenom = "Alice";

return <h1>Bonjour {prenom} !</h1>;`,
          },
        ],
        replacements: [
          { token: 'prenom', description: 'le nom de la variable à afficher' },
          { token: 'Bonjour', description: 'le texte fixe qui entoure la variable' },
        ],
        placement: 'Le cas le plus courant : glisser une valeur au milieu d’un texte.',
      },
      {
        id: 'attribut',
        label: 'Dans un attribut',
        description: 'Pour un src, un href, un alt… qui dépend d’une variable.',
        codeBlocks: [
          {
            id: 'REACT-F-15101-t-v2',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `const url = "https://exemple.com/photo.jpg";

return <img src={url} alt="Photo" />;`,
          },
        ],
        replacements: [
          { token: 'url', description: 'la variable qui contient la valeur de l’attribut' },
          { token: 'src', description: 'l’attribut à remplir dynamiquement (src, href…)' },
        ],
        placement: 'Accolades sans guillemets : src={url}, jamais src="{url}".',
      },
      {
        id: 'calcul',
        label: 'Un calcul / une méthode',
        description: 'Quand la valeur affichée est le résultat d’une expression.',
        codeBlocks: [
          {
            id: 'REACT-F-15101-t-v3',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `const prix = 20;
const quantite = 3;

return <p>Total : {prix * quantite} EUR</p>;`,
          },
        ],
        replacements: [
          { token: 'prix * quantite', description: 'l’expression à évaluer (calcul, appel de méthode…)' },
        ],
        placement: 'Tout ce qui produit une valeur passe entre accolades : calcul, .toUpperCase(), etc.',
      },
    ],
  }),

  // ————— Typer les props (React) —————
  lesson({
    id: 'REACT-F-15102-LESSON',
    slug: 'typer-les-props-react',
    title: 'Typer les props (React)',
    shortTitle: 'Typer les props',
    technology: 'react',
    tomeId: 't5',
    summary:
      'Décrire les props reçues par un composant avec un type TypeScript pour être guidée et éviter les erreurs.',
    utility: 'Donner un type aux props d’un composant pour sécuriser et documenter son usage.',
    aliases: ['props', 'typer props', 'type props', 'interface props', 'props typescript'],
    keywords: [
      'typer les props',
      'passer des props',
      'type d un composant',
      'destructurer les props',
      'prop optionnelle',
      'children',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-15102-TEMPLATE',
    intro:
      'Les <b>props</b> sont les données qu’un composant reçoit de son parent. En TypeScript, on décrit leur forme avec un <b>type</b> : React te prévient alors si tu oublies une prop ou si tu te trompes de type.',
    sections: [
      {
        id: 's1',
        title: 'Typer et recevoir les props',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux un composant <b>Carte</b> réutilisable qui reçoit un <b>titre</b> et un <b>prix</b> depuis son parent, en étant sûre du type de chaque valeur.',
          },
          {
            type: 'paragraph',
            html: 'On décrit les props dans un <code>type</code> (ou une <code>interface</code>), puis on les <b>destructure</b> dans les paramètres du composant. TypeScript vérifie tout à l’usage.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15102-l-c1',
              filename: 'Carte.tsx',
              language: 'tsx',
              code: `// 1. Je decris la forme des props
type CarteProps = {
  titre: string;
  prix: number;
};

// 2. Je destructure les props recues
function Carte({ titre, prix }: CarteProps) {
  return (
    <div className="carte">
      <h2>{titre}</h2>
      <p>{prix} EUR</p>
    </div>
  );
}

export default Carte;`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> on nomme le type <code>NomDuComposant</code> + <code>Props</code> (ici <code>CarteProps</code>). C’est la norme dans la plupart des projets React + TypeScript.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Passer les props depuis le parent',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le parent passe les props <b>comme des attributs</b>. Une chaîne va entre guillemets, une valeur non-texte (nombre, booléen, variable) entre <b>accolades</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15102-l-c2',
              filename: 'App.tsx',
              language: 'tsx',
              code: `import Carte from "./Carte";

function App() {
  return (
    <div>
      {/* titre = chaine (guillemets) */}
      {/* prix = nombre (accolades) */}
      <Carte titre="Clavier" prix={49} />
      <Carte titre="Souris" prix={25} />
    </div>
  );
}`,
            },
          },
          {
            type: 'table',
            headers: ['Type de prop', 'Comment la passer', 'Exemple'],
            rows: [
              ['<code>string</code>', 'guillemets', '<code>titre="Clavier"</code>'],
              ['<code>number</code>', 'accolades', '<code>prix={49}</code>'],
              ['<code>boolean</code>', 'accolades', '<code>actif={true}</code>'],
              ['variable', 'accolades', '<code>titre={monTitre}</code>'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Props optionnelles, valeurs par défaut et children',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un <code>?</code> rend une prop <b>optionnelle</b>. On peut lui donner une <b>valeur par défaut</b> à la destructuration. Et <code>children</code> (de type <code>ReactNode</code>) reçoit ce qui est placé <b>entre les balises</b> du composant.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15102-l-c3',
              filename: 'Bouton.tsx',
              language: 'tsx',
              code: `import type { ReactNode } from "react";

type BoutonProps = {
  couleur?: string;   // le ? = prop optionnelle
  children: ReactNode; // le contenu entre les balises
};

// Valeur par defaut si couleur n'est pas fournie
function Bouton({ couleur = "bleu", children }: BoutonProps) {
  return <button className={couleur}>{children}</button>;
}

// Usage : <Bouton>Valider</Bouton>
//         -> "Valider" arrive dans children`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>children</code> = le colis livré à l’intérieur du composant. Tout ce que tu écris entre <code>&lt;Bouton&gt;</code> et <code>&lt;/Bouton&gt;</code> arrive dans <code>children</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Passer un nombre entre guillemets (<code>prix="49"</code>) : c’est une chaîne, TypeScript refuse. Utilise <code>prix={49}</code>.',
      'Oublier une prop obligatoire : TypeScript signale l’erreur au parent. Ajoute la prop ou marque-la optionnelle avec <code>?</code>.',
      'Muter une prop dans le composant : les props sont en <b>lecture seule</b>. Pour une valeur qui change, utilise un state.',
      'Typer <code>children</code> en <code>string</code> : préfère <code>ReactNode</code> pour accepter du texte comme du JSX.',
    ],
    takeaways: [
      'décrire les props → un <code>type NomProps = { ... }</code>',
      'les recevoir → destructuration : <code>function Carte({ titre, prix }: CarteProps)</code>',
      'les passer → attributs : chaîne entre <b>guillemets</b>, reste entre <b>accolades</b>',
      'prop optionnelle → <code>?</code> · valeur par défaut à la destructuration · contenu → <code>children: ReactNode</code>',
    ],
  }),
  template({
    id: 'REACT-F-15102-TEMPLATE',
    slug: 'typer-les-props-react',
    title: 'Typer les props',
    shortTitle: 'Typer les props',
    technology: 'react',
    tomeId: 't5',
    summary: 'Typer les props d’un composant : type simple, prop optionnelle, children.',
    lede: 'Décrire les props d’un composant. Choisis le cas :',
    aliases: ['props', 'type props', 'children'],
    keywords: ['interface props', 'optionnelle', 'reactnode'],
    relatedContentIds: [],
    lessonId: 'REACT-F-15102-LESSON',
    variants: [
      {
        id: 'simple',
        label: 'Props typées',
        codeBlocks: [
          {
            id: 'REACT-F-15102-t-v1',
            filename: 'Carte.tsx',
            language: 'tsx',
            code: `type CarteProps = {
  titre: string;
  prix: number;
};

function Carte({ titre, prix }: CarteProps) {
  return (
    <div>
      <h2>{titre}</h2>
      <p>{prix} EUR</p>
    </div>
  );
}`,
          },
        ],
        replacements: [
          { token: 'CarteProps', description: 'le nom du type (par convention NomDuComposant + Props)' },
          { token: 'titre: string; prix: number;', description: 'les props et leur type' },
        ],
        placement: 'Le cas standard : un type pour décrire les props, destructuré dans le composant.',
      },
      {
        id: 'optionnelle',
        label: 'Prop optionnelle + défaut',
        description: 'Quand une prop peut être omise et a une valeur par défaut.',
        codeBlocks: [
          {
            id: 'REACT-F-15102-t-v2',
            filename: 'Badge.tsx',
            language: 'tsx',
            code: `type BadgeProps = {
  texte: string;
  couleur?: string; // optionnelle
};

function Badge({ texte, couleur = "gris" }: BadgeProps) {
  return <span className={couleur}>{texte}</span>;
}`,
          },
        ],
        replacements: [
          { token: 'couleur?', description: 'la prop optionnelle (le ? la rend facultative)' },
          { token: '"gris"', description: 'la valeur par défaut si la prop n’est pas fournie' },
        ],
        placement: 'Le ? marque l’option ; la valeur par défaut se met à la destructuration.',
      },
      {
        id: 'children',
        label: 'Avec children',
        description: 'Pour un composant enveloppe qui affiche ce qu’on met entre ses balises.',
        codeBlocks: [
          {
            id: 'REACT-F-15102-t-v3',
            filename: 'Boite.tsx',
            language: 'tsx',
            code: `import type { ReactNode } from "react";

type BoiteProps = {
  children: ReactNode;
};

function Boite({ children }: BoiteProps) {
  return <div className="boite">{children}</div>;
}

// Usage : <Boite>Contenu ici</Boite>`,
          },
        ],
        replacements: [
          { token: 'Boite', description: 'le nom de ton composant enveloppe' },
          { token: 'boite', description: 'la classe CSS du conteneur' },
        ],
        placement: 'children reçoit tout ce qui est placé entre les balises ouvrante et fermante.',
      },
    ],
  }),

  // ————— Les conditions en JSX : et logique, ternaire —————
  lesson({
    id: 'REACT-F-15103-LESSON',
    slug: 'les-conditions-en-jsx-et-logique-ternaire',
    title: 'Les conditions en JSX : et logique, ternaire',
    shortTitle: 'Conditions en JSX',
    technology: 'react',
    tomeId: 't5',
    summary:
      'Afficher un élément selon une condition dans le JSX, avec le et logique (&&) ou le ternaire (? :).',
    utility: 'Afficher ou masquer un élément selon une condition, directement dans le JSX.',
    aliases: ['condition jsx', 'affichage conditionnel', 'ternaire', 'et logique', 'and && jsx'],
    keywords: [
      'afficher si',
      'masquer un element',
      'condition dans le jsx',
      'ternaire react',
      'et logique',
      'sinon afficher',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-15103-TEMPLATE',
    intro:
      'On ne peut pas mettre de <code>if</code> dans le JSX. Pour afficher conditionnellement, on utilise le <b>et logique</b> <code>&&</code> (afficher <b>si</b>) ou le <b>ternaire</b> <code>? :</code> (afficher <b>ceci sinon cela</b>).',
    sections: [
      {
        id: 's1',
        title: 'Afficher si : le et logique &&',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher un message “Panier vide” uniquement quand le panier est vide</b>, et ne rien afficher sinon.',
          },
          {
            type: 'paragraph',
            html: 'Le <code>&&</code> affiche l’élément à droite <b>seulement si</b> la condition à gauche est vraie. Si elle est fausse, rien ne s’affiche. Parfait quand il n’y a <b>pas de “sinon”</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15103-l-c1',
              filename: 'Panier.tsx',
              language: 'tsx',
              code: `function Panier({ articles }: { articles: string[] }) {
  return (
    <div>
      {/* Si le panier est vide -> affiche le message */}
      {articles.length === 0 && <p>Panier vide</p>}

      {/* Sinon (au moins 1 article) -> rien de ce cote */}
    </div>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le <code>&&</code> = un interrupteur. Condition vraie → la lumière (l’élément) s’allume. Condition fausse → rien, l’interrupteur reste éteint.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Ceci ou cela : le ternaire ? :',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <b>ternaire</b> <code>condition ? siVrai : siFaux</code> choisit entre <b>deux</b> affichages. Idéal quand tu as un « sinon » : connecté ou pas, chargement ou contenu…',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15103-l-c2',
              filename: 'Header.tsx',
              language: 'tsx',
              code: `function Header({ connecte }: { connecte: boolean }) {
  return (
    <header>
      {/* condition ? ce qu'on montre si VRAI : si FAUX */}
      {connecte
        ? <span>Bienvenue !</span>
        : <button>Se connecter</button>}
    </header>
  );
}`,
            },
          },
          {
            type: 'table',
            headers: ['Besoin', 'Outil', 'Forme'],
            rows: [
              ['afficher <b>si</b> (pas de sinon)', '<code>&&</code>', '<code>{cond && <A />}</code>'],
              ['afficher <b>A ou B</b>', 'ternaire', '<code>{cond ? <A /> : <B />}</code>'],
              ['ne rien afficher', '<code>null</code>', '<code>{cond ? <A /> : null}</code>'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Le piège du zéro avec &&',
        blocks: [
          {
            type: 'paragraph',
            html: 'Attention avec <code>&&</code> : si la valeur de gauche est le <b>nombre <code>0</code></b>, React affiche <b>0</b> à l’écran au lieu de rien. Compare toujours explicitement pour éviter la surprise.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15103-l-c3',
              filename: 'Compteur.tsx',
              language: 'tsx',
              code: `function Compteur({ nombre }: { nombre: number }) {
  return (
    <div>
      {/* PIEGE : si nombre vaut 0, React affiche "0" ! */}
      {nombre && <p>Il reste {nombre} places</p>}

      {/* BON : on compare explicitement */}
      {nombre > 0 && <p>Il reste {nombre} places</p>}
    </div>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Réflexe :</b> avec <code>&&</code>, mets à gauche un <b>vrai booléen</b> (<code>nombre &gt; 0</code>, <code>liste.length &gt; 0</code>), jamais un nombre brut.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre un <code>if</code> dans le JSX : impossible. Utilise <code>&&</code>, un ternaire, ou calcule la valeur avant le <code>return</code>.',
      'Le piège du <code>0</code> : <code>{liste.length && ...}</code> affiche <code>0</code> si la liste est vide. Écris <code>{liste.length > 0 && ...}</code>.',
      'Imbriquer plusieurs ternaires : illisible. Extrais la logique dans une variable ou une fonction avant le <code>return</code>.',
      'Oublier le <code>: null</code> attendu : avec un ternaire, précise toujours les deux branches (dont <code>null</code> si « rien »).',
    ],
    takeaways: [
      'pas de <code>if</code> dans le JSX → <code>&&</code> ou ternaire <code>? :</code>',
      '<code>&&</code> = afficher <b>si</b> (pas de sinon) · ternaire = afficher <b>A ou B</b>',
      'piège du zéro : compare (<code>nombre &gt; 0 &&</code>) plutôt qu’un nombre brut',
      'logique complexe → calcule <b>avant</b> le <code>return</code>, pas dans le JSX',
    ],
  }),
  template({
    id: 'REACT-F-15103-TEMPLATE',
    slug: 'les-conditions-en-jsx-et-logique-ternaire',
    title: 'Conditions en JSX',
    shortTitle: 'Conditions en JSX',
    technology: 'react',
    tomeId: 't5',
    summary: 'Afficher conditionnellement en JSX : et logique &&, ternaire, ou rien.',
    lede: 'Afficher selon une condition. Choisis le cas :',
    aliases: ['condition jsx', 'ternaire', 'et logique'],
    keywords: ['afficher si', 'sinon', 'masquer'],
    relatedContentIds: [],
    lessonId: 'REACT-F-15103-LESSON',
    variants: [
      {
        id: 'et-logique',
        label: 'Afficher si (&&)',
        codeBlocks: [
          {
            id: 'REACT-F-15103-t-v1',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `{estVisible && <p>Message visible</p>}`,
          },
        ],
        replacements: [
          { token: 'estVisible', description: 'la condition (un booléen — ex. liste.length > 0)' },
          { token: '<p>Message visible</p>', description: 'l’élément à afficher si la condition est vraie' },
        ],
        placement: 'Quand il n’y a pas de « sinon » : on affiche l’élément, ou rien.',
      },
      {
        id: 'ternaire',
        label: 'A ou B (ternaire)',
        description: 'Quand tu dois choisir entre deux affichages.',
        codeBlocks: [
          {
            id: 'REACT-F-15103-t-v2',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `{connecte
  ? <span>Bienvenue</span>
  : <button>Se connecter</button>}`,
          },
        ],
        replacements: [
          { token: 'connecte', description: 'la condition' },
          { token: '<span>Bienvenue</span>', description: 'l’affichage si la condition est vraie' },
          { token: '<button>Se connecter</button>', description: 'l’affichage si la condition est fausse' },
        ],
        placement: 'Le ternaire couvre les deux cas : condition ? siVrai : siFaux.',
      },
      {
        id: 'ou-rien',
        label: 'A ou rien',
        description: 'Un ternaire dont la branche « sinon » n’affiche rien.',
        codeBlocks: [
          {
            id: 'REACT-F-15103-t-v3',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `{chargement ? <Spinner /> : null}`,
          },
        ],
        replacements: [
          { token: 'chargement', description: 'la condition' },
          { token: '<Spinner />', description: 'l’élément affiché quand la condition est vraie' },
        ],
        placement: 'Le : null est explicite et évite le piège du 0 du && sur les nombres.',
      },
    ],
  }),

  // ————— Le style dans React : className et style —————
  lesson({
    id: 'REACT-F-15104-LESSON',
    slug: 'le-style-dans-react-classname-et-style',
    title: 'Le style dans React : className et style',
    shortTitle: 'Style en React',
    technology: 'react',
    tomeId: 't5',
    summary:
      'Styliser un composant React avec className (classes CSS) ou l’attribut style (styles en ligne, objet JS).',
    utility: 'Appliquer du style à un élément React, par classe CSS ou en ligne.',
    aliases: ['className', 'style react', 'style inline', 'classe css react', 'style dynamique'],
    keywords: [
      'appliquer une classe',
      'style en ligne react',
      'objet style',
      'classe conditionnelle',
      'style dynamique',
      'camelCase css',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-15104-TEMPLATE',
    intro:
      'En React, on applique une classe CSS avec <code>className</code> (jamais <code>class</code>). Pour un style en ligne, l’attribut <code>style</code> attend un <b>objet JavaScript</b> aux propriétés en <b>camelCase</b>.',
    sections: [
      {
        id: 's1',
        title: 'Styliser avec className',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>appliquer ma classe CSS “carte” à un élément</b> React, comme je le ferais avec <code>class</code> en HTML.',
          },
          {
            type: 'paragraph',
            html: 'La méthode par défaut : une classe dans ton fichier CSS, appliquée avec <code>className</code>. C’est l’équivalent React de l’attribut <code>class</code> du HTML.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15104-l-c1',
              filename: 'Carte.tsx',
              language: 'tsx',
              code: `import "./Carte.css"; // j'importe ma feuille de style

function Carte() {
  // className, PAS class (mot reserve en JS)
  return <div className="carte">Contenu</div>;
}

// Dans Carte.css :
// .carte { padding: 16px; border-radius: 8px; }`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> le style par classe (<code>className</code>) est le choix par défaut. Il garde le CSS séparé du composant et reste réutilisable.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le style en ligne : un objet JS',
        blocks: [
          {
            type: 'paragraph',
            html: 'L’attribut <code>style</code> attend un <b>objet JavaScript</b>, d’où la double accolade <code>style={{ ... }}</code> : une pour le JSX, une pour l’objet. Les propriétés sont en <b>camelCase</b> et les valeurs en <b>chaînes</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15104-l-c2',
              filename: 'Alerte.tsx',
              language: 'tsx',
              code: `function Alerte() {
  // style = un OBJET -> double accolade {{ }}
  // camelCase : backgroundColor, pas background-color
  return (
    <div style={{ backgroundColor: "red", padding: "16px" }}>
      Attention
    </div>
  );
}`,
            },
          },
          {
            type: 'table',
            headers: ['En CSS', 'En objet style React'],
            rows: [
              ['<code>background-color: red</code>', '<code>backgroundColor: "red"</code>'],
              ['<code>font-size: 16px</code>', '<code>fontSize: "16px"</code>'],
              ['<code>margin-top: 8px</code>', '<code>marginTop: "8px"</code>'],
              ['<code>border-radius: 8px</code>', '<code>borderRadius: "8px"</code>'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> la double accolade <code>{{ }}</code> = les accolades JSX qui contiennent… un objet JavaScript (lui-même en accolades). Rien de magique, juste deux paires empilées.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Classe et style dynamiques',
        blocks: [
          {
            type: 'paragraph',
            html: 'Comme <code>className</code> et <code>style</code> acceptent des <b>expressions</b>, tu peux les rendre dynamiques : choisir une classe selon un état, ou construire l’objet <code>style</code> à partir de variables.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-15104-l-c3',
              filename: 'Bouton.tsx',
              language: 'tsx',
              code: `function Bouton({ actif }: { actif: boolean }) {
  return (
    <>
      {/* Classe conditionnelle via un ternaire */}
      <button className={actif ? "actif" : "inactif"}>
        Ok
      </button>

      {/* Style qui depend d'une variable */}
      <span style={{ color: actif ? "green" : "gray" }}>
        Statut
      </span>
    </>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> pour du dynamique ponctuel, un ternaire suffit. Quand ça se complique, prépare la classe dans une variable avant le <code>return</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Écrire <code>class="..."</code> au lieu de <code>className="..."</code> : React ignore <code>class</code> et prévient dans la console.',
      'Une seule accolade sur <code>style</code> (<code>style={ ... }</code>) : <code>style</code> attend un <b>objet</b>, donc <code>style={{ ... }}</code>.',
      'Garder le tiret CSS dans l’objet style (<code>background-color</code>) : passe en camelCase (<code>backgroundColor</code>).',
      'Oublier les guillemets sur les valeurs de l’objet style : <code>fontSize: 16px</code> est invalide, écris <code>fontSize: "16px"</code>.',
    ],
    takeaways: [
      'classe CSS → <code>className</code> (jamais <code>class</code>) : le choix par défaut',
      'style en ligne → un <b>objet JS</b> : <code>style={{ ... }}</code> (double accolade)',
      'propriétés en <b>camelCase</b> : <code>backgroundColor</code>, <code>fontSize</code>…',
      'dynamique → ternaire dans <code>className</code> ou dans l’objet <code>style</code>',
    ],
  }),
  template({
    id: 'REACT-F-15104-TEMPLATE',
    slug: 'le-style-dans-react-classname-et-style',
    title: 'Style en React',
    shortTitle: 'Style en React',
    technology: 'react',
    tomeId: 't5',
    summary: 'Styliser un élément React : className, style en ligne, classe conditionnelle.',
    lede: 'Appliquer du style. Choisis le cas :',
    aliases: ['className', 'style react', 'style inline'],
    keywords: ['classe css', 'objet style', 'camelCase'],
    relatedContentIds: [],
    lessonId: 'REACT-F-15104-LESSON',
    variants: [
      {
        id: 'classname',
        label: 'Classe CSS',
        codeBlocks: [
          {
            id: 'REACT-F-15104-t-v1',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `<div className="carte">Contenu</div>`,
          },
        ],
        replacements: [
          { token: 'carte', description: 'le nom de ta classe CSS (définie dans un fichier .css)' },
        ],
        placement: 'Le choix par défaut : className remplace l’attribut class du HTML.',
      },
      {
        id: 'style-inline',
        label: 'Style en ligne',
        description: 'Pour un style ponctuel, sans passer par un fichier CSS.',
        codeBlocks: [
          {
            id: 'REACT-F-15104-t-v2',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `<div style={{ backgroundColor: "red", padding: "16px" }}>
  Contenu
</div>`,
          },
        ],
        replacements: [
          { token: 'backgroundColor: "red"', description: 'les propriétés en camelCase, valeurs en chaînes' },
        ],
        placement: 'Double accolade : {{ }} = accolades JSX + objet JS. Propriétés en camelCase.',
      },
      {
        id: 'classe-conditionnelle',
        label: 'Classe conditionnelle',
        description: 'Quand la classe dépend d’un état ou d’une prop.',
        codeBlocks: [
          {
            id: 'REACT-F-15104-t-v3',
            filename: 'Composant.tsx',
            language: 'tsx',
            code: `<button className={actif ? "actif" : "inactif"}>
  Ok
</button>`,
          },
        ],
        replacements: [
          { token: 'actif', description: 'la condition (état ou prop booléenne)' },
          { token: '"actif"', description: 'la classe si la condition est vraie' },
          { token: '"inactif"', description: 'la classe si la condition est fausse' },
        ],
        placement: 'Un ternaire dans className pour changer d’apparence selon l’état.',
      },
    ],
  }),
];
