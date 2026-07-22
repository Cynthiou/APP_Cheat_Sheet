import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const cssContent: ReadyContent[] = [
  // ————— Les sélecteurs CSS —————
  lesson({
    id: 'CSS-F-001-LESSON',
    slug: 'selecteurs-css',
    title: 'Les sélecteurs CSS',
    shortTitle: 'Sélecteurs',
    technology: 'css',
    tomeId: 't2',
    summary: 'Cibler les bons éléments HTML pour leur appliquer un style : par balise, par classe ou par id.',
    utility: 'Choisir précisément quels éléments HTML vont recevoir un style.',
    aliases: ['selecteur', 'selector', 'classe', 'class', 'id', 'cibler', 'balise'],
    keywords: [
      'styliser un element',
      'cibler une classe',
      'point classe',
      'diese id',
      'appliquer un style',
      'descendant',
    ],
    relatedContentIds: [],
    templateId: 'CSS-F-001-TEMPLATE',
    intro:
      'Un <b>sélecteur</b> désigne les éléments HTML à styliser. Les trois de base : la <b>balise</b> (<code>p</code>), la <b>classe</b> (<code>.carte</code>, réutilisable) et l’<b>id</b> (<code>#menu</code>, unique).',
    sections: [
      {
        id: 's1',
        title: 'Cibler par classe',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>colorer en bleu tous les boutons “primaire”</b> de ma page, sans toucher aux autres boutons.',
          },
          {
            type: 'paragraph',
            html: 'On met une <b>classe</b> sur les éléments à cibler, puis on écrit le sélecteur avec un <b>point</b> devant le nom de la classe.',
          },
          {
            type: 'code',
            block: {
              id: 'css-sel-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `/* Cible tous les elements avec class="primaire" */
.primaire {
  background: #2563eb;
  color: white;
}

/* Cible la balise <p> (tous les paragraphes) */
p {
  line-height: 1.6;
}

/* Cible l'element unique id="menu" */
#menu {
  position: sticky;
  top: 0;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> on style surtout par <b>classe</b> (<code>.</code>) — réutilisable et sans conflit. L’<b>id</b> (<code>#</code>) est unique par page, à réserver aux ancres et cas précis.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Combiner les sélecteurs',
        blocks: [
          {
            type: 'paragraph',
            html: 'On peut cibler un élément <b>à l’intérieur</b> d’un autre (descendant), ou appliquer un style au <b>survol</b> avec une pseudo-classe.',
          },
          {
            type: 'code',
            block: {
              id: 'css-sel-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `/* Les <a> DANS un element .menu */
.menu a {
  text-decoration: none;
}

/* Plusieurs cibles a la fois (virgule) */
h1, h2, h3 {
  font-family: sans-serif;
}

/* Au survol de la souris */
.bouton:hover {
  background: #1e40af;
}`,
            },
          },
          {
            type: 'table',
            headers: ['Sélecteur', 'Cible', 'Exemple'],
            rows: [
              ['<code>p</code>', 'une balise', 'tous les paragraphes'],
              ['<code>.carte</code>', 'une classe', 'les <code>class="carte"</code>'],
              ['<code>#menu</code>', 'un id (unique)', 'l’élément <code>id="menu"</code>'],
              ['<code>.menu a</code>', 'un descendant', 'les liens dans <code>.menu</code>'],
              ['<code>:hover</code>', 'un état', 'au survol de la souris'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le <b>point</b> devant une classe : <code>carte {}</code> cible la balise <code>&lt;carte&gt;</code> (inexistante), pas <code>class="carte"</code>.',
      'Réutiliser un même <b>id</b> sur plusieurs éléments : l’id doit être <b>unique</b> par page. Utilise une classe.',
      'Un sélecteur trop spécifique (<code>#menu ul li a</code>) devient difficile à surcharger : préfère des classes simples.',
    ],
    takeaways: [
      'classe = <code>.nom</code> (réutilisable) · id = <code>#nom</code> (unique) · balise = <code>p</code>',
      'descendant = <code>.parent .enfant</code> (espace) · plusieurs cibles = virgule',
      'état au survol = <code>.bouton:hover</code>',
      'à privilégier au quotidien : les <b>classes</b>',
    ],
  }),
  template({
    id: 'CSS-F-001-TEMPLATE',
    slug: 'selecteurs-css',
    title: 'Sélecteurs CSS',
    technology: 'css',
    tomeId: 't2',
    summary: 'Les sélecteurs CSS prêts à copier : classe, id, descendant, état.',
    lede: 'Cibler les bons éléments. Choisis le type de sélecteur :',
    aliases: ['selecteur', 'classe', 'id', 'hover'],
    keywords: ['cibler', 'point classe', 'descendant'],
    relatedContentIds: [],
    lessonId: 'CSS-F-001-LESSON',
    variants: [
      {
        id: 'classe',
        label: 'Par classe',
        codeBlocks: [
          {
            id: 'css-sel-t-classe',
            filename: 'styles.css',
            language: 'css',
            code: `.nom-de-classe {
  color: #2563eb;
}`,
          },
        ],
        replacements: [
          { token: 'nom-de-classe', description: 'le nom de ta classe (sans le point dans le HTML)' },
          { token: 'color: #2563eb', description: 'les propriétés à appliquer' },
        ],
        placement: 'Le cas par défaut : réutilisable sur autant d’éléments que tu veux (class="nom-de-classe").',
      },
      {
        id: 'id',
        label: 'Par id',
        codeBlocks: [
          {
            id: 'css-sel-t-id',
            filename: 'styles.css',
            language: 'css',
            code: `#identifiant {
  padding: 16px;
}`,
          },
        ],
        replacements: [
          { token: 'identifiant', description: 'l’id unique de l’élément (id="identifiant")' },
        ],
        placement: 'Quand un seul élément est concerné (ancre, cible unique). Un id ne se répète jamais sur la page.',
      },
      {
        id: 'descendant',
        label: 'Descendant',
        codeBlocks: [
          {
            id: 'css-sel-t-desc',
            filename: 'styles.css',
            language: 'css',
            code: `.parent .enfant {
  margin: 0;
}`,
          },
        ],
        replacements: [
          { token: '.parent', description: 'le conteneur' },
          { token: '.enfant', description: 'l’élément à cibler à l’intérieur' },
        ],
        placement: 'Pour cibler un élément uniquement quand il est à l’intérieur d’un autre (espace entre les deux).',
      },
      {
        id: 'etat',
        label: 'État (:hover)',
        codeBlocks: [
          {
            id: 'css-sel-t-etat',
            filename: 'styles.css',
            language: 'css',
            code: `.bouton:hover {
  background: #1e40af;
}`,
          },
        ],
        replacements: [
          { token: '.bouton', description: 'l’élément concerné' },
          { token: ':hover', description: 'l’état visé (:hover, :focus, :active…)' },
        ],
        placement: 'Pour réagir à une interaction : survol (:hover), focus clavier (:focus), clic (:active).',
      },
    ],
  }),

  // ————— Le box model —————
  lesson({
    id: 'CSS-F-002-LESSON',
    slug: 'box-model',
    title: 'Le box model : marges et bordures',
    shortTitle: 'Box model',
    technology: 'css',
    tomeId: 't2',
    summary: 'Comprendre les 4 couches d’un élément — contenu, padding, bordure, marge — pour maîtriser les espacements.',
    utility: 'Gérer l’espace autour et à l’intérieur d’un élément.',
    aliases: ['box model', 'boite', 'margin', 'padding', 'border', 'marge', 'bordure', 'espacement'],
    keywords: [
      'espace interieur',
      'espace exterieur',
      'ajouter une bordure',
      'aerer un element',
      'box sizing',
      'largeur reelle',
    ],
    relatedContentIds: ['CSS-F-001-LESSON'],
    templateId: 'CSS-F-002-TEMPLATE',
    intro:
      'Chaque élément est une <b>boîte</b> en 4 couches : le <b>contenu</b>, le <b>padding</b> (espace intérieur), la <b>bordure</b>, et la <b>marge</b> (espace extérieur).',
    sections: [
      {
        id: 's1',
        title: 'Padding, bordure, marge',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux une <b>carte qui respire</b> : du blanc autour du texte à l’intérieur, un trait fin autour, et de l’espace qui la sépare des autres cartes.',
          },
          {
            type: 'paragraph',
            html: '<code>padding</code> = l’air <b>dedans</b> (entre le texte et la bordure). <code>margin</code> = l’air <b>dehors</b> (entre la boîte et ses voisines).',
          },
          {
            type: 'code',
            block: {
              id: 'css-box-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `.carte {
  padding: 24px;              /* air a l'interieur */
  border: 1px solid #e5e7eb; /* le trait autour */
  margin: 16px;              /* air a l'exterieur */
  border-radius: 8px;        /* coins arrondis */
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un cadre photo. Le <b>padding</b> = le passe-partout blanc entre la photo et le cadre. La <b>bordure</b> = le cadre. La <b>marge</b> = l’espace entre ce cadre et le suivant sur le mur.',
          },
        ],
      },
      {
        id: 's2',
        title: 'box-sizing : la largeur réelle',
        blocks: [
          {
            type: 'paragraph',
            html: 'Par défaut, <code>width</code> ne compte <b>que le contenu</b> : padding et bordure s’ajoutent par-dessus. Avec <code>box-sizing: border-box</code>, la largeur inclut padding + bordure — bien plus prévisible.',
          },
          {
            type: 'code',
            block: {
              id: 'css-box-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `/* A mettre une fois pour toute la page */
* {
  box-sizing: border-box;
}

.boite {
  width: 200px;   /* largeur TOTALE, padding compris */
  padding: 20px;
}
/* La boite fait bien 200px de large, pas 240px */`,
            },
          },
          {
            type: 'table',
            headers: ['Propriété', 'Effet', 'Sens'],
            rows: [
              ['<code>padding</code>', 'espace intérieur', 'entre contenu et bordure'],
              ['<code>border</code>', 'le trait', 'contour de la boîte'],
              ['<code>margin</code>', 'espace extérieur', 'entre la boîte et ses voisines'],
              ['<code>box-sizing</code>', 'mode de calcul', '<code>border-box</code> = largeur totale'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Deux marges verticales voisines <b>fusionnent</b> (margin collapsing) : 20px + 20px = 20px, pas 40px.',
      'Oublier <code>box-sizing: border-box</code> : un <code>width: 100%</code> + <code>padding</code> déborde du conteneur.',
      'Confondre <code>padding</code> (dedans) et <code>margin</code> (dehors) : la couleur de fond suit le padding, pas la marge.',
    ],
    takeaways: [
      '4 couches : contenu → <code>padding</code> → <code>border</code> → <code>margin</code>',
      '<code>padding</code> = intérieur · <code>margin</code> = extérieur',
      '<code>* { box-sizing: border-box }</code> → <code>width</code> = largeur totale',
      'ordre des raccourcis : <code>margin: haut droite bas gauche</code>',
    ],
  }),
  template({
    id: 'CSS-F-002-TEMPLATE',
    slug: 'box-model',
    title: 'Box model',
    technology: 'css',
    tomeId: 't2',
    summary: 'Gérer padding, bordure et marge d’un élément.',
    lede: 'Régler les espacements d’une boîte. Choisis le cas :',
    aliases: ['margin', 'padding', 'border', 'box sizing'],
    keywords: ['espacement', 'bordure', 'marge'],
    relatedContentIds: [],
    lessonId: 'CSS-F-002-LESSON',
    variants: [
      {
        id: 'carte',
        label: 'Carte complète',
        codeBlocks: [
          {
            id: 'css-box-t-carte',
            filename: 'styles.css',
            language: 'css',
            code: `.carte {
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 16px;
}`,
          },
        ],
        replacements: [
          { token: '24px', description: 'l’espace intérieur autour du contenu' },
          { token: '1px solid #e5e7eb', description: 'épaisseur, style et couleur de la bordure' },
          { token: '16px', description: 'l’espace sous la carte' },
        ],
        placement: 'Le combo classique pour une carte qui respire.',
      },
      {
        id: 'border-box',
        label: 'box-sizing',
        codeBlocks: [
          {
            id: 'css-box-t-bs',
            filename: 'styles.css',
            language: 'css',
            code: `*,
*::before,
*::after {
  box-sizing: border-box;
}`,
          },
        ],
        replacements: [],
        placement: 'À placer une seule fois tout en haut de ta feuille de style. Rend toutes les largeurs prévisibles.',
      },
      {
        id: 'raccourci',
        label: 'Marges (raccourci)',
        codeBlocks: [
          {
            id: 'css-box-t-short',
            filename: 'styles.css',
            language: 'css',
            code: `.element {
  /* haut | droite | bas | gauche */
  margin: 8px 16px 8px 16px;

  /* ou vertical | horizontal */
  padding: 12px 20px;
}`,
          },
        ],
        replacements: [
          { token: '8px 16px 8px 16px', description: 'les 4 côtés dans l’ordre haut, droite, bas, gauche' },
          { token: '12px 20px', description: 'raccourci à 2 valeurs : vertical puis horizontal' },
        ],
        placement: 'Quand tu veux des valeurs différentes selon les côtés, sans écrire 4 lignes.',
      },
    ],
  }),

  // ————— Flexbox —————
  lesson({
    id: 'CSS-F-003-LESSON',
    slug: 'flexbox',
    title: 'Flexbox',
    shortTitle: 'Flexbox',
    technology: 'css',
    tomeId: 't2',
    summary: 'Aligner et répartir des éléments sur une ligne (ou une colonne) sans galérer avec les floats.',
    utility: 'Aligner des éléments côte à côte et gérer leur répartition.',
    aliases: ['flex', 'flexbox', 'justify-content', 'align-items', 'centrer', 'aligner'],
    keywords: [
      'centrer un element',
      'aligner horizontalement',
      'repartir espace',
      'barre de navigation',
      'mettre cote a cote',
      'centrer verticalement',
    ],
    relatedContentIds: ['CSS-F-004-LESSON'],
    templateId: 'CSS-F-003-TEMPLATE',
    intro:
      'Flexbox aligne des éléments sur <b>un axe</b> (ligne ou colonne). On active <code>display: flex</code> sur le <b>parent</b>, puis on aligne avec <code>justify-content</code> et <code>align-items</code>.',
    sections: [
      {
        id: 's1',
        title: 'Centrer un élément',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>centrer un logo parfaitement au milieu</b> d’un bandeau, aussi bien horizontalement que verticalement.',
          },
          {
            type: 'paragraph',
            html: 'Le duo magique : <code>justify-content: center</code> (axe horizontal) + <code>align-items: center</code> (axe vertical), sur le parent.',
          },
          {
            type: 'code',
            block: {
              id: 'css-flex-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `.bandeau {
  display: flex;            /* active flexbox */
  justify-content: center; /* centre sur l'axe horizontal */
  align-items: center;     /* centre sur l'axe vertical */
  height: 200px;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>display: flex</code> se met sur le <b>parent</b>, jamais sur les enfants. Ce sont les enfants qui se laissent aligner.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Répartir et changer de sens',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>justify-content</code> gère l’<b>espace</b> le long de l’axe principal. <code>gap</code> ajoute un écart régulier. <code>flex-direction: column</code> passe en <b>colonne</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'css-flex-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `.barre {
  display: flex;
  justify-content: space-between; /* logo a gauche, menu a droite */
  align-items: center;
  gap: 16px;                      /* espace entre les enfants */
}

.colonne {
  display: flex;
  flex-direction: column; /* empile de haut en bas */
  gap: 12px;
}`,
            },
          },
          {
            type: 'table',
            headers: ['<code>justify-content</code>', 'Effet'],
            rows: [
              ['<code>center</code>', 'tout au centre'],
              ['<code>space-between</code>', 'collés aux deux bords, espace au milieu'],
              ['<code>space-around</code>', 'espace égal autour de chaque élément'],
              ['<code>flex-start</code>', 'collés au début (défaut)'],
              ['<code>flex-end</code>', 'collés à la fin'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre <code>display: flex</code> sur l’enfant au lieu du parent : rien ne s’aligne. C’est le <b>conteneur</b> qui devient flex.',
      'Confondre les axes : en <code>flex-direction: column</code>, <code>justify-content</code> devient vertical et <code>align-items</code> horizontal.',
      'Utiliser des <code>margin</code> partout pour espacer alors que <code>gap</code> fait le travail proprement.',
    ],
    takeaways: [
      '<code>display: flex</code> sur le <b>parent</b>',
      '<code>justify-content</code> = axe principal · <code>align-items</code> = axe secondaire',
      'centrer parfait : <code>justify-content: center</code> + <code>align-items: center</code>',
      '<code>gap</code> pour l’espace entre enfants · <code>flex-direction: column</code> pour empiler',
    ],
  }),
  template({
    id: 'CSS-F-003-TEMPLATE',
    slug: 'flexbox',
    title: 'Flexbox',
    technology: 'css',
    tomeId: 't2',
    summary: 'Aligner des éléments avec flexbox : centrer, répartir, empiler.',
    lede: 'Aligner des éléments sur un axe. Choisis la disposition :',
    aliases: ['flex', 'flexbox', 'centrer', 'aligner'],
    keywords: ['justify-content', 'align-items', 'gap'],
    relatedContentIds: ['CSS-F-004-TEMPLATE'],
    lessonId: 'CSS-F-003-LESSON',
    variants: [
      {
        id: 'centrer',
        label: 'Centrer',
        codeBlocks: [
          {
            id: 'css-flex-t-center',
            filename: 'styles.css',
            language: 'css',
            code: `.conteneur {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
          },
        ],
        replacements: [
          { token: '.conteneur', description: 'le parent qui contient l’élément à centrer' },
        ],
        placement: 'Quand tu veux un contenu pile au milieu, horizontalement et verticalement.',
      },
      {
        id: 'repartir',
        label: 'Répartir',
        codeBlocks: [
          {
            id: 'css-flex-t-between',
            filename: 'styles.css',
            language: 'css',
            code: `.barre {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
          },
        ],
        replacements: [
          { token: '.barre', description: 'le parent (ex. une barre de navigation)' },
          { token: 'space-between', description: 'la répartition (space-between, space-around…)' },
        ],
        placement: 'Idéal pour une navbar : logo collé à gauche, menu collé à droite.',
      },
      {
        id: 'colonne',
        label: 'Colonne',
        codeBlocks: [
          {
            id: 'css-flex-t-col',
            filename: 'styles.css',
            language: 'css',
            code: `.pile {
  display: flex;
  flex-direction: column;
  gap: 12px;
}`,
          },
        ],
        replacements: [
          { token: '.pile', description: 'le parent qui empile ses enfants' },
          { token: '12px', description: 'l’espace vertical entre chaque élément' },
        ],
        placement: 'Pour empiler des éléments de haut en bas avec un espacement régulier.',
      },
    ],
  }),

  // ————— Grid —————
  lesson({
    id: 'CSS-F-004-LESSON',
    slug: 'grid',
    title: 'Grid',
    shortTitle: 'Grid',
    technology: 'css',
    tomeId: 't2',
    summary: 'Disposer des éléments en grille sur deux dimensions : des lignes ET des colonnes.',
    utility: 'Construire une mise en page en colonnes et lignes.',
    aliases: ['grid', 'grille', 'colonnes', 'grid-template-columns', 'layout'],
    keywords: [
      'grille de cartes',
      'plusieurs colonnes',
      'galerie',
      'mise en page',
      'colonnes egales',
      'colonnes automatiques',
    ],
    relatedContentIds: ['CSS-F-003-LESSON'],
    templateId: 'CSS-F-004-TEMPLATE',
    intro:
      'Grid dispose les éléments sur <b>deux axes</b> à la fois (lignes et colonnes). On active <code>display: grid</code> sur le parent, puis on définit les colonnes avec <code>grid-template-columns</code>.',
    sections: [
      {
        id: 's1',
        title: 'Une grille de cartes',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher mes produits en grille de 3 colonnes égales</b>, avec un espace régulier entre chaque carte.',
          },
          {
            type: 'paragraph',
            html: 'L’unité <code>fr</code> = une <b>fraction</b> de l’espace disponible. <code>1fr 1fr 1fr</code> = 3 colonnes de taille égale. <code>repeat(3, 1fr)</code> écrit la même chose en plus court.',
          },
          {
            type: 'code',
            block: {
              id: 'css-grid-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `.grille {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colonnes egales */
  gap: 16px;                             /* espace entre les cases */
}
/* Chaque enfant se place tout seul dans une case */`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une boîte à œufs. Tu définis le nombre de cases (colonnes), et chaque élément vient se ranger tout seul dans la case suivante.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Colonnes automatiques (responsive)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour une grille qui s’adapte seule au nombre de colonnes possible, on combine <code>auto-fit</code> et <code>minmax()</code> : « autant de colonnes que possible, chacune d’au moins 200px ».',
          },
          {
            type: 'code',
            block: {
              id: 'css-grid-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `.grille-auto {
  display: grid;
  /* colonnes d'au moins 200px, qui remplissent la largeur */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
/* 4 colonnes sur grand ecran, 1 sur mobile, sans media query */`,
            },
          },
          {
            type: 'table',
            headers: ['Valeur', 'Signifie'],
            rows: [
              ['<code>1fr</code>', 'une part égale de l’espace'],
              ['<code>repeat(3, 1fr)</code>', '3 colonnes identiques'],
              ['<code>200px 1fr</code>', 'une colonne fixe + une élastique'],
              ['<code>auto-fit</code>', 'autant de colonnes que possible'],
              ['<code>minmax(200px, 1fr)</code>', 'au moins 200px, au plus 1 part'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>display: grid</code> sur le parent : <code>grid-template-columns</code> n’a aucun effet.',
      'Utiliser des largeurs fixes (<code>px</code>) partout : la grille ne s’adapte plus. Préfère <code>fr</code> et <code>minmax</code>.',
      'Confondre Flexbox (un seul axe) et Grid (deux axes) : pour une vraie grille, c’est Grid.',
    ],
    takeaways: [
      '<code>display: grid</code> sur le parent · colonnes via <code>grid-template-columns</code>',
      '<code>fr</code> = fraction de l’espace · <code>repeat(3, 1fr)</code> = 3 colonnes égales',
      'grille responsive sans media query : <code>repeat(auto-fit, minmax(200px, 1fr))</code>',
      '<code>gap</code> gère l’espace entre les cases',
    ],
  }),
  template({
    id: 'CSS-F-004-TEMPLATE',
    slug: 'grid',
    title: 'Grid',
    technology: 'css',
    tomeId: 't2',
    summary: 'Créer une grille CSS : colonnes fixes, colonnes auto, ou zones nommées.',
    lede: 'Disposer en grille. Choisis le type de grille :',
    aliases: ['grid', 'grille', 'colonnes'],
    keywords: ['grid-template-columns', 'auto-fit', 'zones'],
    relatedContentIds: ['CSS-F-003-TEMPLATE'],
    lessonId: 'CSS-F-004-LESSON',
    variants: [
      {
        id: 'colonnes-egales',
        label: '2 colonnes',
        codeBlocks: [
          {
            id: 'css-grid-t-2col',
            filename: 'styles.css',
            language: 'css',
            code: `.grille {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}`,
          },
        ],
        replacements: [
          { token: '1fr 1fr', description: 'le nombre et la taille des colonnes (ici 2 égales)' },
          { token: '16px', description: 'l’espace entre les cases' },
        ],
        placement: 'Quand tu connais le nombre exact de colonnes voulu.',
      },
      {
        id: 'colonnes-auto',
        label: 'Colonnes auto',
        codeBlocks: [
          {
            id: 'css-grid-t-auto',
            filename: 'styles.css',
            language: 'css',
            code: `.grille {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}`,
          },
        ],
        replacements: [
          { token: '200px', description: 'la largeur minimale d’une carte avant de passer à la ligne' },
        ],
        placement: 'Pour une galerie responsive : le nombre de colonnes s’ajuste seul, sans media query.',
      },
      {
        id: 'zones',
        label: 'Zones nommées',
        codeBlocks: [
          {
            id: 'css-grid-t-zones',
            filename: 'styles.css',
            language: 'css',
            code: `.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "entete entete"
    "menu   contenu";
  gap: 16px;
}

.entete  { grid-area: entete; }
.menu    { grid-area: menu; }
.contenu { grid-area: contenu; }`,
          },
        ],
        replacements: [
          { token: 'entete / menu / contenu', description: 'les noms de tes zones de mise en page' },
          { token: '200px 1fr', description: 'la largeur du menu puis du contenu' },
        ],
        placement: 'Pour un gabarit de page complet (en-tête, menu, contenu) lisible d’un coup d’œil.',
      },
    ],
  }),

  // ————— Le responsive : media queries —————
  lesson({
    id: 'CSS-F-005-LESSON',
    slug: 'responsive-media-queries',
    title: 'Le responsive : media queries',
    shortTitle: 'Media queries',
    technology: 'css',
    tomeId: 't2',
    summary: 'Adapter le style selon la largeur de l’écran pour un rendu propre sur mobile, tablette et desktop.',
    utility: 'Changer la mise en page selon la taille de l’écran.',
    aliases: ['responsive', 'media query', 'mobile', 'breakpoint', 'adaptatif', 'ecran'],
    keywords: [
      'adapter au mobile',
      'point de rupture',
      'affichage tablette',
      'max-width',
      'min-width',
      'mobile first',
    ],
    relatedContentIds: ['CSS-F-003-LESSON', 'CSS-F-004-LESSON'],
    templateId: 'CSS-F-005-TEMPLATE',
    intro:
      'Une <b>media query</b> applique des règles CSS <b>seulement</b> à certaines largeurs d’écran. C’est la base du <b>responsive</b> : le même HTML, un rendu adapté à chaque appareil.',
    sections: [
      {
        id: 's1',
        title: 'Adapter selon la largeur',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux que ma <b>grille passe de 3 colonnes sur ordinateur à 1 seule colonne sur mobile</b>, pour rester lisible.',
          },
          {
            type: 'paragraph',
            html: 'On écrit d’abord le style <b>mobile</b>, puis on ajoute des règles pour les écrans plus larges avec <code>@media (min-width: ...)</code>. C’est l’approche <b>mobile first</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'css-resp-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `/* Style de base : mobile (1 colonne) */
.grille {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* A partir de 768px (tablette et +) : 3 colonnes */
@media (min-width: 768px) {
  .grille {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Mobile first :</b> commence par le plus petit écran, puis <b>ajoute</b> avec <code>min-width</code>. Plus simple à maintenir que l’inverse.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les points de rupture courants',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un <b>breakpoint</b> (point de rupture) est la largeur à laquelle la mise en page change. Quelques valeurs classiques :',
          },
          {
            type: 'table',
            headers: ['Breakpoint', 'Appareil visé', 'Media query'],
            rows: [
              ['&lt; 640px', 'mobile', 'style de base (aucune query)'],
              ['640px', 'grand mobile', '<code>@media (min-width: 640px)</code>'],
              ['768px', 'tablette', '<code>@media (min-width: 768px)</code>'],
              ['1024px', 'ordinateur', '<code>@media (min-width: 1024px)</code>'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Rappel :</b> le responsive suppose la balise <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code> dans le <code>&lt;head&gt;</code> du HTML.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Portrait ou paysage : l’orientation',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux un affichage <b>différent quand on tourne le téléphone</b> (ou la tablette) en paysage — par exemple mettre la vidéo en plein écran.',
          },
          {
            type: 'paragraph',
            html: 'La media query <code>orientation</code> détecte le sens de l’écran : <b>portrait</b> (plus haut que large) ou <b>paysage</b> (plus large que haut). C’est ce qui change quand on <b>tourne l’appareil</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'css-resp-l-c-orient',
              filename: 'orientation.css',
              language: 'css',
              code: `/* Par defaut : portrait (telephone tenu droit) */
.player { height: 220px; }

/* Ecran tourne en paysage */
@media (orientation: landscape) {
  .player { height: 100vh; }
}

/* On peut combiner avec la largeur */
@media (max-width: 900px) and (orientation: landscape) {
  .barre { display: none; } /* gagner de la hauteur */
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce hauteur mobile :</b> sur mobile, <code>100vh</code> déborde à cause de la barre du navigateur. Préfère <code>100dvh</code> (<i>dynamic viewport height</i>) qui s’ajuste quand la barre apparaît ou disparaît.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier la balise <code>&lt;meta viewport&gt;</code> : le mobile zoome sur la version desktop, les media queries semblent ignorées.',
      'Mélanger <code>min-width</code> et <code>max-width</code> au hasard : choisis une approche (mobile first = <code>min-width</code>) et garde-la.',
      'Multiplier les breakpoints : quelques points bien choisis suffisent, inutile d’en mettre un tous les 50px.',
      'Se fier à <code>orientation</code> pour deviner « mobile » : une fenêtre d’ordinateur étroite est aussi en « portrait ». Combine avec <code>max-width</code>.',
    ],
    takeaways: [
      '<code>@media (min-width: 768px) { ... }</code> = règles à partir de 768px',
      'mobile first : style de base pour mobile, puis <code>min-width</code> pour agrandir',
      'breakpoints courants : 640 · 768 · 1024px',
      '<code>@media (orientation: landscape)</code> = quand on tourne l’appareil',
      'sur mobile, <code>100dvh</code> plutôt que <code>100vh</code> pour la hauteur plein écran',
      'indispensable : la balise <code>&lt;meta viewport&gt;</code> dans le HTML',
    ],
  }),
  template({
    id: 'CSS-F-005-TEMPLATE',
    slug: 'responsive-media-queries',
    title: 'Media queries',
    technology: 'css',
    tomeId: 't2',
    summary: 'Adapter le CSS selon la largeur d’écran avec les media queries.',
    lede: 'Adapter selon l’écran. Choisis le cas :',
    aliases: ['responsive', 'media query', 'breakpoint'],
    keywords: ['min-width', 'mobile', 'tablette'],
    relatedContentIds: [],
    lessonId: 'CSS-F-005-LESSON',
    variants: [
      {
        id: 'mobile-first',
        label: 'Mobile first',
        codeBlocks: [
          {
            id: 'css-resp-t-mf',
            filename: 'styles.css',
            language: 'css',
            code: `/* Base : mobile */
.element {
  font-size: 16px;
}

/* Ordinateur : a partir de 1024px */
@media (min-width: 1024px) {
  .element {
    font-size: 20px;
  }
}`,
          },
        ],
        replacements: [
          { token: '1024px', description: 'le point de rupture (largeur à partir de laquelle la règle s’applique)' },
          { token: '.element', description: 'l’élément à adapter' },
        ],
        placement: 'L’approche recommandée : petit écran par défaut, on agrandit avec min-width.',
      },
      {
        id: 'plage',
        label: 'Plage précise',
        codeBlocks: [
          {
            id: 'css-resp-t-range',
            filename: 'styles.css',
            language: 'css',
            code: `/* Uniquement la tablette : entre 768px et 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  .menu {
    display: none;
  }
}`,
          },
        ],
        replacements: [
          { token: '768px', description: 'largeur minimale de la plage' },
          { token: '1023px', description: 'largeur maximale de la plage' },
        ],
        placement: 'Quand une règle ne doit s’appliquer que dans un intervalle précis (ex. tablette seule).',
      },
      {
        id: 'viewport',
        label: 'Balise viewport',
        codeBlocks: [
          {
            id: 'css-resp-t-vp',
            filename: 'index.html',
            language: 'html',
            code: `<!-- Dans le <head> : indispensable au responsive -->
<meta name="viewport"
      content="width=device-width, initial-scale=1" />`,
          },
        ],
        replacements: [],
        placement: 'À placer une fois dans le <head>. Sans elle, le mobile affiche la version desktop rétrécie.',
      },
      {
        id: 'orientation',
        label: 'Selon l’orientation',
        description: 'Réagir quand on tourne le téléphone ou la tablette.',
        codeBlocks: [
          {
            id: 'css-resp-t-orient',
            filename: 'styles.css',
            language: 'css',
            code: `/* Quand l'ecran est tourne en paysage */
@media (orientation: landscape) {
  .element {
    height: 100dvh;
  }
}`,
          },
        ],
        replacements: [
          { token: '.element', description: 'l’élément à adapter au paysage' },
          { token: '100dvh', description: 'hauteur plein écran fiable sur mobile (dynamic viewport height)' },
        ],
        placement: 'Pour un rendu spécifique quand l’appareil est tenu à l’horizontale.',
      },
    ],
  }),

  // ————— Les variables CSS —————
  lesson({
    id: 'CSS-F-006-LESSON',
    slug: 'variables-css',
    title: 'Les variables CSS',
    shortTitle: 'Variables CSS',
    technology: 'css',
    tomeId: 't2',
    summary: 'Stocker une valeur (couleur, espacement) une seule fois et la réutiliser partout via var().',
    utility: 'Centraliser les couleurs et valeurs réutilisées d’un site.',
    aliases: ['variable', 'custom property', 'var', 'propriete personnalisee', 'theme', 'couleurs'],
    keywords: [
      'centraliser une couleur',
      'reutiliser une valeur',
      'changer le theme',
      'palette',
      'root',
      'mode sombre',
    ],
    relatedContentIds: ['CSS-F-001-LESSON'],
    templateId: 'CSS-F-006-TEMPLATE',
    intro:
      'Une <b>variable CSS</b> (custom property) stocke une valeur sous un nom (<code>--couleur</code>). On la définit une fois, on la réutilise partout avec <code>var(--couleur)</code>.',
    sections: [
      {
        id: 's1',
        title: 'Définir et réutiliser',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>définir ma couleur de marque à un seul endroit</b> et la réutiliser sur mes boutons, liens et titres — pour la changer partout en une ligne.',
          },
          {
            type: 'paragraph',
            html: 'On déclare les variables dans <code>:root</code> (la racine du document), avec un nom qui commence par <code>--</code>. On les lit avec <code>var(--nom)</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'css-var-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `:root {
  --couleur-primaire: #2563eb;
  --espacement: 16px;
  --rayon: 8px;
}

.bouton {
  background: var(--couleur-primaire); /* reutilise la variable */
  padding: var(--espacement);
  border-radius: var(--rayon);
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> les variables globales se déclarent dans <code>:root</code>. Le nom commence <b>toujours</b> par deux tirets : <code>--nom</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Valeur de repli et thème',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>var()</code> accepte une <b>valeur de repli</b> (2ᵉ argument) si la variable n’existe pas. Et comme les variables suivent la cascade, on peut <b>changer un thème</b> en les redéfinissant sur une classe.',
          },
          {
            type: 'code',
            block: {
              id: 'css-var-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `/* Valeur de repli si --texte n'est pas defini */
.carte {
  color: var(--texte, #111827);
}

/* Theme sombre : on redefinit les memes variables */
.theme-sombre {
  --couleur-primaire: #60a5fa;
  --texte: #f9fafb;
}`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Rôle'],
            rows: [
              ['<code>--nom: valeur</code>', 'définir une variable'],
              ['<code>var(--nom)</code>', 'utiliser la variable'],
              ['<code>var(--nom, repli)</code>', 'valeur de secours si absente'],
              ['<code>:root { }</code>', 'variables globales du site'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier les <b>deux tirets</b> : une variable CSS s’écrit <code>--nom</code>, pas <code>-nom</code> ni <code>$nom</code> (ça c’est Sass).',
      'Écrire <code>color: --texte</code> au lieu de <code>color: var(--texte)</code> : sans <code>var()</code>, la valeur n’est pas lue.',
      'Déclarer une variable dans un sélecteur trop profond : elle n’est visible que dans cet élément et ses enfants.',
    ],
    takeaways: [
      'définir : <code>--nom: valeur</code> (souvent dans <code>:root</code>)',
      'utiliser : <code>var(--nom)</code> · repli : <code>var(--nom, defaut)</code>',
      'nom toujours préfixé de <code>--</code>',
      'changer un thème = redéfinir les variables sur une classe',
    ],
  }),
  template({
    id: 'CSS-F-006-TEMPLATE',
    slug: 'variables-css',
    title: 'Variables CSS',
    technology: 'css',
    tomeId: 't2',
    summary: 'Définir et utiliser des variables CSS (custom properties).',
    lede: 'Centraliser une valeur. Choisis le cas :',
    aliases: ['variable', 'var', 'custom property', 'theme'],
    keywords: ['root', 'couleur', 'reutiliser'],
    relatedContentIds: [],
    lessonId: 'CSS-F-006-LESSON',
    variants: [
      {
        id: 'definir',
        label: 'Définir + utiliser',
        codeBlocks: [
          {
            id: 'css-var-t-base',
            filename: 'styles.css',
            language: 'css',
            code: `:root {
  --couleur-primaire: #2563eb;
}

.bouton {
  background: var(--couleur-primaire);
}`,
          },
        ],
        replacements: [
          { token: '--couleur-primaire', description: 'le nom de ta variable (toujours préfixé de --)' },
          { token: '#2563eb', description: 'la valeur stockée (couleur, taille…)' },
        ],
        placement: 'Le cas de base : déclare dans :root, réutilise partout avec var().',
      },
      {
        id: 'repli',
        label: 'Valeur de repli',
        codeBlocks: [
          {
            id: 'css-var-t-fallback',
            filename: 'styles.css',
            language: 'css',
            code: `.texte {
  color: var(--couleur-texte, #111827);
}`,
          },
        ],
        replacements: [
          { token: '--couleur-texte', description: 'la variable souhaitée' },
          { token: '#111827', description: 'la valeur utilisée si la variable n’existe pas' },
        ],
        placement: 'Quand la variable peut être absente : le 2ᵉ argument sert de secours.',
      },
      {
        id: 'theme',
        label: 'Thème (sombre)',
        codeBlocks: [
          {
            id: 'css-var-t-theme',
            filename: 'styles.css',
            language: 'css',
            code: `:root {
  --fond: white;
  --texte: #111827;
}

.theme-sombre {
  --fond: #111827;
  --texte: #f9fafb;
}

body {
  background: var(--fond);
  color: var(--texte);
}`,
          },
        ],
        replacements: [
          { token: '--fond / --texte', description: 'les variables qui changent selon le thème' },
          { token: '.theme-sombre', description: 'la classe qui active le thème (sur body ou html)' },
        ],
        placement: 'Pour basculer un thème clair/sombre : redéfinis les mêmes variables sur une classe.',
      },
    ],
  }),

  // ————— position : relative, absolute et fixed —————
  lesson({
    id: 'CSS-F-007-LESSON',
    slug: 'position-css',
    title: 'position : relative, absolute et fixed',
    shortTitle: 'position',
    technology: 'css',
    tomeId: 't2',
    summary: 'Sortir un élément du flux normal pour le placer précisément : badge, menu collant, superposition.',
    utility: 'Placer un élément à un endroit précis, hors du flux normal.',
    aliases: ['position', 'relative', 'absolute', 'fixed', 'sticky', 'superposer', 'z-index'],
    keywords: [
      'placer un badge',
      'menu qui reste en haut',
      'superposer deux elements',
      'positionner precisement',
      'coller en haut',
      'par dessus',
    ],
    relatedContentIds: ['CSS-F-002-LESSON'],
    templateId: 'CSS-F-007-TEMPLATE',
    intro:
      'La propriété <code>position</code> contrôle comment un élément est placé. <code>relative</code>, <code>absolute</code> et <code>fixed</code> permettent de le décaler ou de le sortir du flux normal.',
    sections: [
      {
        id: 's1',
        title: 'Un badge dans un coin',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>coller un badge “-50%” dans le coin haut-droit d’une carte produit</b>, par-dessus l’image.',
          },
          {
            type: 'paragraph',
            html: 'La combinaison de référence : le parent en <code>position: relative</code>, l’enfant en <code>position: absolute</code> avec <code>top</code>/<code>right</code>. L’enfant se place <b>par rapport au parent</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'css-pos-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `.carte {
  position: relative; /* devient le repere de l'enfant */
}

.badge {
  position: absolute; /* sort du flux, se cale sur le parent */
  top: 8px;
  right: 8px;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle d’or :</b> pour placer un enfant en <code>absolute</code>, mets le parent en <code>position: relative</code>. Sinon l’enfant se cale sur la fenêtre entière.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les valeurs de position',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>fixed</code> colle l’élément à la <b>fenêtre</b> (il reste visible au scroll). <code>sticky</code> le laisse défiler puis le <b>fige</b> à un seuil. <code>z-index</code> gère qui passe <b>devant</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'css-pos-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `/* Barre qui reste en haut meme au scroll */
.barre {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100; /* passe au-dessus du reste */
}

/* Titre qui se fige en haut quand on le depasse */
.titre-section {
  position: sticky;
  top: 0;
}`,
            },
          },
          {
            type: 'table',
            headers: ['Valeur', 'Se place par rapport à…', 'Dans le flux ?'],
            rows: [
              ['<code>static</code>', 'position normale (défaut)', 'oui'],
              ['<code>relative</code>', 'sa propre position d’origine', 'oui'],
              ['<code>absolute</code>', 'le parent positionné le plus proche', 'non'],
              ['<code>fixed</code>', 'la fenêtre', 'non'],
              ['<code>sticky</code>', 'défile puis se fige', 'oui puis non'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Un enfant <code>absolute</code> qui se cale sur toute la page : tu as oublié <code>position: relative</code> sur le parent.',
      '<code>top</code>/<code>left</code> sans <code>position</code> : ils n’ont aucun effet sur un élément <code>static</code>.',
      'Empiler des <code>z-index</code> énormes (<code>9999</code>) au hasard : garde une échelle simple et cohérente.',
    ],
    takeaways: [
      '<code>relative</code> = décale + sert de repère · <code>absolute</code> = se cale sur le parent positionné',
      'combo badge : parent <code>relative</code> + enfant <code>absolute</code> + <code>top</code>/<code>right</code>',
      '<code>fixed</code> = collé à la fenêtre · <code>sticky</code> = défile puis se fige',
      '<code>z-index</code> décide qui passe devant',
    ],
  }),
  template({
    id: 'CSS-F-007-TEMPLATE',
    slug: 'position-css',
    title: 'position',
    technology: 'css',
    tomeId: 't2',
    summary: 'Positionner un élément : badge en absolute, barre fixed, titre sticky.',
    lede: 'Placer un élément précisément. Choisis le cas :',
    aliases: ['position', 'absolute', 'fixed', 'sticky'],
    keywords: ['badge', 'barre collante', 'superposer'],
    relatedContentIds: [],
    lessonId: 'CSS-F-007-LESSON',
    variants: [
      {
        id: 'badge',
        label: 'Badge (absolute)',
        codeBlocks: [
          {
            id: 'css-pos-t-badge',
            filename: 'styles.css',
            language: 'css',
            code: `.carte {
  position: relative;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}`,
          },
        ],
        replacements: [
          { token: '.carte', description: 'le parent qui sert de repère' },
          { token: 'top: 8px; right: 8px', description: 'la position dans le coin voulu' },
        ],
        placement: 'Pour poser un élément dans un coin d’un autre : parent relative + enfant absolute.',
      },
      {
        id: 'fixed',
        label: 'Barre (fixed)',
        codeBlocks: [
          {
            id: 'css-pos-t-fixed',
            filename: 'styles.css',
            language: 'css',
            code: `.barre {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}`,
          },
        ],
        replacements: [
          { token: '.barre', description: 'la barre à figer (navbar, bandeau…)' },
          { token: '100', description: 'le z-index pour rester au-dessus du contenu' },
        ],
        placement: 'Pour une barre toujours visible, collée à la fenêtre même quand on scrolle.',
      },
      {
        id: 'sticky',
        label: 'Titre (sticky)',
        codeBlocks: [
          {
            id: 'css-pos-t-sticky',
            filename: 'styles.css',
            language: 'css',
            code: `.titre-section {
  position: sticky;
  top: 0;
  background: white;
}`,
          },
        ],
        replacements: [
          { token: '.titre-section', description: 'l’élément qui doit se figer' },
          { token: 'top: 0', description: 'le seuil à partir duquel il se fige' },
        ],
        placement: 'Pour un en-tête de section qui défile normalement puis reste collé en haut.',
      },
    ],
  }),

  // ————— Les animations et transitions —————
  lesson({
    id: 'CSS-F-008-LESSON',
    slug: 'animations-transitions',
    title: 'Les animations et transitions',
    shortTitle: 'Animations',
    technology: 'css',
    tomeId: 't2',
    summary: 'Rendre les changements de style fluides (transition) et créer des mouvements en boucle (animation).',
    utility: 'Adoucir les changements de style et créer du mouvement.',
    aliases: ['transition', 'animation', 'keyframes', 'transform', 'hover', 'fluide', 'mouvement'],
    keywords: [
      'effet au survol',
      'apparition en douceur',
      'faire tourner',
      'agrandir au survol',
      'fondu',
      'animer en boucle',
    ],
    relatedContentIds: ['CSS-F-001-LESSON'],
    templateId: 'CSS-F-008-TEMPLATE',
    intro:
      'Une <b>transition</b> adoucit un changement de style d’un état A à un état B (ex. au survol). Une <b>animation</b> enchaîne plusieurs étapes définies par des <code>@keyframes</code>.',
    sections: [
      {
        id: 's1',
        title: 'Une transition au survol',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux qu’un <b>bouton grossisse et change de couleur en douceur au survol</b>, plutôt que de changer d’un coup.',
          },
          {
            type: 'paragraph',
            html: 'On met <code>transition</code> sur l’état <b>normal</b> (pas sur <code>:hover</code>), en précisant quelle propriété animer et en combien de temps. Le changement devient fluide dans les deux sens.',
          },
          {
            type: 'code',
            block: {
              id: 'css-anim-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `.bouton {
  background: #2563eb;
  /* propriete(s) a animer + duree + courbe */
  transition: transform 0.2s ease, background 0.2s ease;
}

.bouton:hover {
  transform: scale(1.05); /* grossit de 5% */
  background: #1e40af;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> la <code>transition</code> se déclare sur l’état de <b>départ</b>, pas dans <code>:hover</code>. Sinon l’effet n’est fluide qu’à l’aller.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Une animation avec @keyframes',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour un mouvement en plusieurs étapes ou en boucle, on décrit les étapes avec <code>@keyframes</code>, puis on l’applique avec <code>animation</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'css-anim-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `/* On decrit les etapes du mouvement */
@keyframes apparition {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.carte {
  /* nom | duree | courbe */
  animation: apparition 0.4s ease-out;
}

/* Rotation infinie (spinner) */
@keyframes tourner {
  to { transform: rotate(360deg); }
}
.spinner {
  animation: tourner 1s linear infinite;
}`,
            },
          },
          {
            type: 'table',
            headers: ['Notion', 'Rôle'],
            rows: [
              ['<code>transition</code>', 'adoucit un changement A → B'],
              ['<code>@keyframes</code>', 'décrit les étapes d’un mouvement'],
              ['<code>animation</code>', 'applique des keyframes à un élément'],
              ['<code>transform</code>', 'déplace, tourne, agrandit (performant)'],
              ['<code>infinite</code>', 'répète l’animation en boucle'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre <code>transition</code> dans <code>:hover</code> : l’effet n’est fluide qu’à l’aller, brutal au retour. Mets-la sur l’état normal.',
      'Animer <code>width</code>/<code>top</code> plutôt que <code>transform</code> : moins fluide. Préfère <code>transform</code> et <code>opacity</code>.',
      'Oublier l’unité de durée : <code>0.2</code> est invalide, écris <code>0.2s</code> (ou <code>200ms</code>).',
    ],
    takeaways: [
      '<code>transition</code> = passage fluide entre 2 états (sur l’état normal)',
      '<code>@keyframes</code> + <code>animation</code> = mouvement en étapes ou en boucle',
      'anime de préférence <code>transform</code> et <code>opacity</code> (plus fluides)',
      '<code>infinite</code> pour boucler · toujours une unité de durée (<code>s</code>/<code>ms</code>)',
    ],
  }),
  template({
    id: 'CSS-F-008-TEMPLATE',
    slug: 'animations-transitions',
    title: 'Animations & transitions',
    technology: 'css',
    tomeId: 't2',
    summary: 'Adoucir un survol (transition) ou animer un élément (@keyframes).',
    lede: 'Ajouter du mouvement. Choisis le cas :',
    aliases: ['transition', 'animation', 'keyframes', 'hover'],
    keywords: ['survol', 'fondu', 'spinner'],
    relatedContentIds: [],
    lessonId: 'CSS-F-008-LESSON',
    variants: [
      {
        id: 'transition',
        label: 'Transition au survol',
        codeBlocks: [
          {
            id: 'css-anim-t-trans',
            filename: 'styles.css',
            language: 'css',
            code: `.bouton {
  transition: transform 0.2s ease;
}

.bouton:hover {
  transform: scale(1.05);
}`,
          },
        ],
        replacements: [
          { token: 'transform', description: 'la propriété à animer (transform, background, opacity…)' },
          { token: '0.2s', description: 'la durée du passage' },
          { token: 'scale(1.05)', description: 'l’état visé au survol' },
        ],
        placement: 'Pour rendre un effet de survol fluide. La transition va sur l’état normal.',
      },
      {
        id: 'apparition',
        label: 'Apparition (fondu)',
        codeBlocks: [
          {
            id: 'css-anim-t-fade',
            filename: 'styles.css',
            language: 'css',
            code: `@keyframes apparition {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.carte {
  animation: apparition 0.4s ease-out;
}`,
          },
        ],
        replacements: [
          { token: 'apparition', description: 'le nom de ton animation' },
          { token: '0.4s', description: 'la durée de l’apparition' },
          { token: '.carte', description: 'l’élément qui apparaît' },
        ],
        placement: 'Pour faire apparaître un élément en douceur au chargement.',
      },
      {
        id: 'boucle',
        label: 'Boucle (spinner)',
        codeBlocks: [
          {
            id: 'css-anim-t-loop',
            filename: 'styles.css',
            language: 'css',
            code: `@keyframes tourner {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: tourner 1s linear infinite;
}`,
          },
        ],
        replacements: [
          { token: 'tourner', description: 'le nom de l’animation' },
          { token: '1s', description: 'la durée d’un tour' },
          { token: '.spinner', description: 'l’élément à faire tourner' },
        ],
        placement: 'Pour un mouvement continu (indicateur de chargement) : le mot-clé infinite boucle.',
      },
    ],
  }),

  lesson({
    id: 'CSS-F-009-LESSON',
    slug: 'reset-css',
    title: 'Le reset CSS : partir sur des bases propres',
    shortTitle: 'Reset CSS',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Remettre à zéro les styles par défaut du navigateur (marges, box-sizing, images) pour démarrer chaque projet sur une base propre et prévisible.',
    utility:
      'Éviter les marges et espacements mystérieux en neutralisant les styles par défaut avant d’écrire son CSS.',
    aliases: ['reset css', 'reset', 'normalize', 'base css', 'box-sizing', 'marges par defaut', 'reinitialiser le css'],
    keywords: [
      'reset css',
      'box-sizing border-box',
      'enlever les marges par defaut',
      'normalize',
      'base propre',
      'espace sous les images',
      'demarrer un projet css',
    ],
    relatedContentIds: ['CSS-F-002-LESSON'],
    templateId: 'CSS-F-009-TEMPLATE',
    intro:
      'Chaque navigateur applique ses <b>propres styles par défaut</b> : des marges sur le <code>&lt;body&gt;</code> et les titres, un <code>box-sizing</code> peu pratique, un petit espace sous les images… Un <b>reset CSS</b> neutralise tout ça au début du projet pour partir d’une <b>base propre et identique partout</b>.',
    sections: [
      {
        id: 's1',
        title: 'D’où viennent ces marges ?',
        blocks: [
          {
            type: 'situation',
            html: 'Je n’ai écrit <b>aucune marge</b>, pourtant il y a un <b>espace blanc autour de ma page</b> et un <b>petit décalage sous mes images</b>. D’où ça sort ?',
          },
          {
            type: 'paragraph',
            html: 'Ce sont les <b>styles par défaut du navigateur</b> : une marge sur le <code>&lt;body&gt;</code>, des marges sur <code>h1</code>/<code>p</code>, et les images en <code>inline</code> qui laissent un espace. Les deux règles qui règlent 90&nbsp;% des soucis :',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-009-l-c1',
              filename: 'base.css',
              language: 'css',
              code: `/* 1. Un box-sizing sain : padding et bordure INCLUS dans la largeur */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 2. On enleve les marges par defaut partout */
* {
  margin: 0;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b><code>border-box</code> :</b> avec lui, <code>width: 200px</code> reste 200px même avec du padding et une bordure. Sans lui, ils s’ajoutent et cassent tes mises en page.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Un reset moderne minimal',
        blocks: [
          {
            type: 'paragraph',
            html: 'Voici un reset court et suffisant pour un projet actuel. On le colle <b>tout en haut</b> de son CSS (ou dans un fichier <code>reset.css</code> importé en premier).',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-009-l-c2',
              filename: 'reset.css',
              language: 'css',
              code: `*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  min-height: 100vh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

h1, h2, h3, h4, p {
  overflow-wrap: break-word;
}`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'Ce que fait chaque règle',
        blocks: [
          {
            type: 'table',
            headers: ['Règle', 'Effet'],
            rows: [
              ['<code>box-sizing: border-box</code>', 'padding + bordure inclus dans la largeur'],
              ['<code>margin: 0</code>', 'supprime les marges par défaut du navigateur'],
              ['<code>line-height: 1.5</code>', 'un interligne lisible sur tout le texte'],
              ['<code>img { display: block }</code>', 'enlève l’espace fantôme sous les images'],
              ['<code>max-width: 100%</code>', 'les médias ne débordent jamais de leur conteneur'],
              ['<code>input… { font: inherit }</code>', 'les champs héritent de ta police (sinon police système)'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le <code>box-sizing: border-box</code> : les largeurs cassent dès qu’on ajoute du padding.',
      'Placer le reset <b>après</b> son CSS : il écraserait ton propre style. Le reset va <b>en premier</b>.',
      'Oublier <code>font: inherit</code> sur les champs : les <code>input</code> et <code>button</code> gardent la police système, pas la tienne.',
      'Confondre <b>reset</b> (tout remettre à zéro) et <b>Normalize.css</b> (harmoniser en gardant des valeurs utiles) : deux approches, choisis-en une.',
    ],
    takeaways: [
      'un <b>reset</b> neutralise les styles par défaut pour une base identique partout',
      'les deux essentiels : <code>box-sizing: border-box</code> + <code>margin: 0</code>',
      '<code>img { display: block }</code> supprime l’espace sous les images',
      '<code>input, button… { font: inherit }</code> pour que les champs héritent de ta police',
      'le reset se place <b>tout en haut</b> du CSS, avant tes propres règles',
    ],
  }),
  template({
    id: 'CSS-F-009-TEMPLATE',
    slug: 'reset-css',
    title: 'Reset CSS',
    technology: 'css',
    tomeId: 't2',
    summary: 'Un reset CSS prêt à coller en haut de ton projet.',
    lede: 'À coller tout en haut de ton CSS. Choisis ta version :',
    aliases: ['reset css', 'reset', 'box-sizing', 'base css'],
    keywords: ['reset', 'box-sizing', 'border-box', 'margin 0'],
    relatedContentIds: [],
    lessonId: 'CSS-F-009-LESSON',
    variants: [
      {
        id: 'minimal',
        label: 'L’essentiel (3 lignes)',
        description: 'Le strict minimum qui règle la plupart des soucis.',
        codeBlocks: [
          {
            id: 'CSS-F-009-t-min',
            filename: 'reset.css',
            language: 'css',
            code: `*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
}`,
          },
        ],
        replacements: [],
        placement: 'Tout en haut de ton fichier CSS, avant tes propres règles.',
      },
      {
        id: 'complet',
        label: 'Reset complet (moderne)',
        description: 'Un reset court mais complet pour un projet actuel.',
        codeBlocks: [
          {
            id: 'CSS-F-009-t-full',
            filename: 'reset.css',
            language: 'css',
            code: `*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  min-height: 100vh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

h1, h2, h3, h4, p {
  overflow-wrap: break-word;
}`,
          },
        ],
        replacements: [],
        placement: 'Dans un fichier reset.css importé en premier, ou en tête de ton CSS global.',
      },
    ],
  }),

  lesson({
    id: 'CSS-F-010-LESSON',
    slug: 'scss-sass',
    title: 'SCSS (Sass) : le CSS avec des super-pouvoirs',
    shortTitle: 'SCSS',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Écrire du CSS plus confortable avec des variables, de l’imbrication, le & et des mixins réutilisables — compilé ensuite en CSS classique.',
    utility:
      'Gagner du temps et éviter les répétitions grâce aux variables, à l’imbrication et aux mixins.',
    aliases: ['scss', 'sass', 'preprocesseur', 'variables scss', 'nesting', 'mixin', 'imbrication'],
    keywords: [
      'scss',
      'sass',
      'preprocesseur css',
      'variable scss',
      'imbrication nesting',
      'mixin include',
      'partial use import',
    ],
    relatedContentIds: ['CSS-F-006-LESSON'],
    templateId: 'CSS-F-010-TEMPLATE',
    intro:
      'Le <b>SCSS</b> (une syntaxe de <b>Sass</b>) est un <b>sur-ensemble de CSS</b> : tout ton CSS reste valide, mais tu gagnes des <b>variables</b>, l’<b>imbrication</b>, le <b>&</b> et des <b>mixins</b>. Un outil le <b>compile</b> ensuite en CSS normal que le navigateur comprend.',
    sections: [
      {
        id: 's1',
        title: 'Variables et imbrication',
        blocks: [
          {
            type: 'situation',
            html: 'Je répète la <b>même couleur</b> partout et je réécris <code>.card</code> devant chaque sélecteur enfant. Je veux <b>factoriser</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-010-l-c1',
              filename: 'styles.scss',
              language: 'scss',
              code: `$primary: #3b5bfe;      // variable
$radius: 10px;

.card {
  border-radius: $radius;

  .title {              // imbrication => .card .title
    color: $primary;
    font-weight: 600;
  }
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Variable :</b> en SCSS elle commence par <code>$</code>. (En CSS pur, ce sont les <i>custom properties</i> <code>--nom</code> — les deux coexistent très bien.)',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le & et les mixins',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <code>&</code> représente le <b>sélecteur parent</b> : pratique pour les <code>:hover</code> ou les variantes. Un <b>mixin</b> est un bloc de règles <b>réutilisable</b> qu’on appelle avec <code>@include</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-010-l-c2',
              filename: 'styles.scss',
              language: 'scss',
              code: `@mixin bouton($bg) {
  padding: 10px 16px;
  border-radius: 8px;
  background: $bg;
  color: #fff;
}

.btn {
  @include bouton(#3b5bfe);

  &:hover {            // => .btn:hover
    filter: brightness(1.1);
  }
  &.danger {           // => .btn.danger
    @include bouton(#ef4444);
  }
}`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'Découper en fichiers',
        blocks: [
          {
            type: 'paragraph',
            html: 'On range le style en <b>partials</b> (fichiers commençant par <code>_</code>) qu’on assemble avec <code>@use</code>. Chaque morceau reste petit et réutilisable.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-010-l-c3',
              filename: 'main.scss',
              language: 'scss',
              code: `// _variables.scss, _boutons.scss ... puis :
@use 'variables';
@use 'boutons';

// On accede a une variable du module avec son prefixe :
body { background: variables.$fond; }`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À savoir :</b> il faut un outil qui compile le SCSS (Vite le fait si tu installes <code>sass</code> : <code>npm i -D sass</code>, puis tu importes un fichier <code>.scss</code>).',
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que le navigateur lit le SCSS : il faut le <b>compiler</b> en CSS d’abord (via Vite + <code>sass</code>, par ex.).',
      'Imbriquer trop profond : au-delà de 2–3 niveaux, les sélecteurs deviennent lourds et difficiles à surcharger.',
      'Confondre <code>$variable</code> (SCSS, figée à la compilation) et <code>--variable</code> (CSS, modifiable en direct dans le navigateur).',
      'Oublier d’installer <code>sass</code> : l’import d’un <code>.scss</code> échoue au build.',
    ],
    takeaways: [
      'SCSS = CSS + <b>variables</b> (<code>$</code>), <b>imbrication</b>, <code>&</code> et <b>mixins</b>',
      'le <code>&</code> = le sélecteur parent (<code>&:hover</code> → <code>.btn:hover</code>)',
      '<code>@mixin</code> + <code>@include</code> pour réutiliser un bloc de règles',
      '<code>@use</code> assemble des <b>partials</b> (<code>_fichier.scss</code>)',
      'il faut <b>compiler</b> le SCSS en CSS (Vite + <code>sass</code>)',
    ],
  }),
  template({
    id: 'CSS-F-010-TEMPLATE',
    slug: 'scss-sass',
    title: 'SCSS (Sass)',
    technology: 'css',
    tomeId: 't2',
    summary: 'Les briques SCSS prêtes à copier : variables + imbrication, et mixin réutilisable.',
    lede: 'Choisis ce dont tu as besoin :',
    aliases: ['scss', 'sass', 'mixin', 'variable scss'],
    keywords: ['scss', 'mixin', 'nesting', 'variable'],
    relatedContentIds: [],
    lessonId: 'CSS-F-010-LESSON',
    variants: [
      {
        id: 'variables-nesting',
        label: 'Variables + imbrication',
        codeBlocks: [
          {
            id: 'CSS-F-010-t-v1',
            filename: 'styles.scss',
            language: 'scss',
            code: `$primary: #3b5bfe;

.card {
  padding: 16px;

  .title {
    color: $primary;
  }
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,.1);
  }
}`,
          },
        ],
        replacements: [
          { token: '$primary', description: 'ta variable (couleur, taille…)' },
          { token: '.card', description: 'le composant que tu styles' },
        ],
        placement: 'Dans un fichier .scss compilé par Vite (npm i -D sass).',
      },
      {
        id: 'mixin',
        label: 'Mixin réutilisable',
        codeBlocks: [
          {
            id: 'CSS-F-010-t-v2',
            filename: 'styles.scss',
            language: 'scss',
            code: `@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  @include flex-center;
}`,
          },
        ],
        replacements: [
          { token: 'flex-center', description: 'le nom de ton mixin' },
          { token: '.box', description: 'l’élément qui réutilise le bloc' },
        ],
        placement: 'Définis le mixin une fois, réutilise-le avec @include partout.',
      },
    ],
  }),

  lesson({
    id: 'CSS-F-011-LESSON',
    slug: 'css-modules',
    title: 'Les CSS Modules : du style local au composant',
    shortTitle: 'CSS Modules',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Écrire du CSS dont les classes sont automatiquement uniques et limitées à un composant, pour ne plus jamais avoir de collision de noms.',
    utility:
      'Styler un composant React sans craindre qu’un nom de classe entre en conflit avec un autre.',
    aliases: ['css modules', 'module css', 'style local', 'scope css', 'styles module', 'classe locale'],
    keywords: [
      'css modules',
      'module.css',
      'style local composant',
      'scope',
      'collision de classes',
      'import styles',
      'react css',
    ],
    relatedContentIds: [],
    templateId: 'CSS-F-011-TEMPLATE',
    intro:
      'En CSS classique, un nom de classe est <b>global</b> : deux <code>.title</code> dans deux fichiers se marchent dessus. Les <b>CSS Modules</b> rendent chaque classe <b>locale à un composant</b> : le nom est rendu <b>unique</b> automatiquement. On les utilise beaucoup en React / Vite.',
    sections: [
      {
        id: 's1',
        title: 'Le problème des noms globaux',
        blocks: [
          {
            type: 'situation',
            html: 'J’ai une classe <code>.card</code> dans deux composants différents, avec des styles différents. <b>Elles se mélangent</b> et l’un casse l’autre.',
          },
          {
            type: 'paragraph',
            html: 'Un fichier nommé <code>Xxx.module.css</code> est un <b>CSS Module</b> : ses classes ne fuient pas à l’extérieur. Chaque <code>.card</code> devient un nom unique du genre <code>Card_card_a1b2</code>, sans collision possible.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Un fichier .module.css',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'CSS-F-011-l-c1',
              filename: 'Button.module.css',
              language: 'css',
              code: `.button {
  padding: 10px 16px;
  border-radius: 8px;
  background: #3b5bfe;
  color: #fff;
}
.danger {
  background: #ef4444;
}`,
            },
          },
          {
            type: 'paragraph',
            html: 'On l’importe dans le composant comme un <b>objet</b> <code>styles</code>, puis on lit chaque classe avec <code>styles.nom</code> :',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-011-l-c2',
              filename: 'Button.tsx',
              language: 'tsx',
              code: `import styles from './Button.module.css';

export function Button() {
  return <button className={styles.button}>Valider</button>;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Nommage :</b> le fichier <b>doit</b> finir par <code>.module.css</code> (ou <code>.module.scss</code>). C’est ce suffixe qui active le scoping.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Combiner plusieurs classes',
        blocks: [
          {
            type: 'paragraph',
            html: 'Comme <code>styles.x</code> n’est qu’une chaîne, on combine les classes avec un <i>template string</i>, y compris de façon <b>conditionnelle</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-011-l-c3',
              filename: 'Button.tsx',
              language: 'tsx',
              code: `<button className={\`\${styles.button} \${danger ? styles.danger : ''}\`}>
  Supprimer
</button>`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le suffixe <code>.module.css</code> : sans lui, les classes restent <b>globales</b> (pas de scoping).',
      'Écrire <code>className="button"</code> au lieu de <code>className={styles.button}</code> : la vraie classe générée ne s’applique pas.',
      'Utiliser un tiret dans le nom (<code>.mon-bouton</code>) puis <code>styles.mon-bouton</code> : invalide en JS. Préfère <code>styles["mon-bouton"]</code> ou du camelCase.',
      'Confondre CSS Modules (scoping, natif dans Vite) et une librairie CSS-in-JS : ce n’est pas la même chose.',
    ],
    takeaways: [
      'CSS Modules = classes <b>locales</b> à un composant, noms rendus uniques',
      'le fichier doit s’appeler <code>Nom.module.css</code>',
      'on importe <code>styles</code> puis on lit <code>styles.maClasse</code>',
      'combiner des classes = un template string <code>{`${styles.a} ${styles.b}`}</code>',
      'natif dans Vite, très courant en React pour éviter les collisions',
    ],
  }),
  template({
    id: 'CSS-F-011-TEMPLATE',
    slug: 'css-modules',
    title: 'CSS Modules',
    technology: 'css',
    tomeId: 't2',
    summary: 'Un CSS Module et son import dans un composant React.',
    lede: 'Choisis ton cas :',
    aliases: ['css modules', 'module.css', 'style local'],
    keywords: ['css modules', 'module.css', 'styles import'],
    relatedContentIds: [],
    lessonId: 'CSS-F-011-LESSON',
    variants: [
      {
        id: 'fichier-import',
        label: 'Fichier + import',
        codeBlocks: [
          {
            id: 'CSS-F-011-t-v1',
            filename: 'Carte.module.css',
            language: 'css',
            code: `.carte {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #eee;
}`,
          },
          {
            id: 'CSS-F-011-t-v1b',
            filename: 'Carte.tsx',
            language: 'tsx',
            code: `import styles from './Carte.module.css';

export function Carte() {
  return <div className={styles.carte}>…</div>;
}`,
          },
        ],
        replacements: [
          { token: 'carte', description: 'le nom de ta classe (locale au composant)' },
          { token: 'Carte', description: 'le nom de ton composant' },
        ],
        placement: 'Deux fichiers côte à côte : le .module.css et le composant.',
      },
      {
        id: 'classe-conditionnelle',
        label: 'Classe conditionnelle',
        codeBlocks: [
          {
            id: 'CSS-F-011-t-v2',
            filename: 'Carte.tsx',
            language: 'tsx',
            code: `<div className={\`\${styles.carte} \${actif ? styles.actif : ''}\`}>
  …
</div>`,
          },
        ],
        replacements: [
          { token: 'actif', description: 'ta condition (booléen)' },
          { token: 'styles.actif', description: 'la classe ajoutée quand la condition est vraie' },
        ],
        placement: 'Pour appliquer une classe seulement dans certains cas.',
      },
    ],
  }),
];
