import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const cssExtra2Content: ReadyContent[] = [
  lesson({
    id: 'CSS-F-016-LESSON',
    slug: 'display-css',
    title: 'La propriété display : block, inline, inline-block, none',
    shortTitle: 'display',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Choisir comment un élément occupe l’espace : sur toute la largeur (block), au fil du texte (inline), un mélange des deux (inline-block) ou masqué (none).',
    utility:
      'Contrôler la nature d’affichage d’un élément : prend-il toute la ligne, se met-il dans le texte, ou disparaît-il ?',
    aliases: ['display', 'block', 'inline', 'inline-block', 'display none', 'masquer un element', 'cacher'],
    keywords: [
      'display block',
      'display inline',
      'inline block',
      'display none',
      'masquer un element',
      'cacher un element',
      'largeur sur toute la ligne',
      'mettre sur la meme ligne',
    ],
    relatedContentIds: ['CSS-F-002-LESSON'],
    templateId: 'CSS-F-016-TEMPLATE',
    intro:
      'La propriété <code>display</code> décide de la <b>nature d’affichage</b> d’un élément. <code>block</code> prend toute la largeur, <code>inline</code> se place au fil du texte, <code>inline-block</code> combine les deux, et <code>none</code> le fait <b>disparaître</b> complètement.',
    sections: [
      {
        id: 's1',
        title: 'block, inline, inline-block',
        blocks: [
          {
            type: 'situation',
            html: 'Mon <code>&lt;span&gt;</code> refuse de prendre une <b>largeur</b> et une <b>hauteur</b>, alors que mon <code>&lt;div&gt;</code> passe tout seul à la ligne. Pourquoi ce comportement différent ?',
          },
          {
            type: 'paragraph',
            html: 'Un élément <b>block</b> (comme <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>) occupe <b>toute la largeur</b> disponible et force un retour à la ligne. Un élément <b>inline</b> (comme <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>) reste <b>dans le flux du texte</b> et ignore <code>width</code>/<code>height</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-016-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `/* Prend toute la largeur, passe a la ligne */
.bloc {
  display: block;
  width: 200px;   /* respecte width/height */
  height: 60px;
}

/* Reste dans le texte, width/height ignores */
.en-ligne {
  display: inline;
}

/* Dans le texte MAIS accepte width/height/marges verticales */
.mixte {
  display: inline-block;
  width: 120px;
  padding: 8px 0;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>inline-block</code> est le compromis — l’élément reste sur la même ligne que ses voisins <b>tout en</b> acceptant une largeur, une hauteur et des marges verticales.',
          },
          {
            type: 'table',
            headers: ['Valeur', 'Sur la même ligne ?', 'width / height ?'],
            rows: [
              ['<code>block</code>', 'non (toute la largeur)', 'oui'],
              ['<code>inline</code>', 'oui', 'non (ignorés)'],
              ['<code>inline-block</code>', 'oui', 'oui'],
            ],
          },
        ],
      },
      {
        id: 's2',
        title: 'display: none (vs visibility)',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>display: none</code> <b>retire</b> l’élément de la page : il ne s’affiche plus et ne prend <b>aucune place</b>. À ne pas confondre avec <code>visibility: hidden</code>, qui le cache mais <b>garde son espace</b> réservé.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-016-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `/* L'element disparait ET libere sa place */
.cache {
  display: none;
}

/* L'element devient invisible MAIS garde son espace (un trou) */
.invisible {
  visibility: hidden;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>display: none</code>, c’est enlever une chaise de la table (les autres se rapprochent). <code>visibility: hidden</code>, c’est rendre la chaise transparente : la place reste vide.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre <code>width</code>/<code>height</code> sur un élément <code>inline</code> : ils sont <b>ignorés</b>. Passe en <code>inline-block</code> ou <code>block</code>.',
      'Confondre <code>display: none</code> (aucune place) et <code>visibility: hidden</code> (place réservée, trou visible).',
      'Espace fantôme entre des <code>inline-block</code> : les retours à la ligne dans le HTML créent un petit blanc. Souvent, un parent en <code>flex</code> règle mieux le problème.',
    ],
    takeaways: [
      '<code>block</code> = toute la largeur + retour à la ligne · <code>inline</code> = au fil du texte',
      '<code>inline</code> ignore <code>width</code>/<code>height</code> · <code>inline-block</code> les accepte',
      '<code>display: none</code> retire l’élément et libère sa place',
      '<code>visibility: hidden</code> le cache mais garde son espace',
    ],
  }),
  template({
    id: 'CSS-F-016-TEMPLATE',
    slug: 'display-css',
    title: 'display',
    technology: 'css',
    tomeId: 't2',
    summary: 'Régler l’affichage d’un élément : block, inline-block ou masqué.',
    lede: 'Choisir la nature d’affichage. Choisis le cas :',
    aliases: ['display', 'inline-block', 'display none', 'masquer'],
    keywords: ['block', 'inline', 'inline-block', 'cacher'],
    relatedContentIds: [],
    lessonId: 'CSS-F-016-LESSON',
    variants: [
      {
        id: 'inline-block',
        label: 'inline-block',
        description: 'Sur la même ligne, mais avec largeur et hauteur.',
        codeBlocks: [
          {
            id: 'CSS-F-016-t-ib',
            filename: 'styles.css',
            language: 'css',
            code: `.etiquette {
  display: inline-block;
  width: 120px;
  padding: 6px 12px;
}`,
          },
        ],
        replacements: [
          { token: '.etiquette', description: 'l’élément à garder dans le texte tout en le dimensionnant' },
          { token: '120px', description: 'la largeur souhaitée (possible grâce à inline-block)' },
        ],
        placement: 'Quand un élément doit rester au fil du texte mais accepter une taille (badge, bouton, étiquette).',
      },
      {
        id: 'masquer',
        label: 'Masquer (none)',
        codeBlocks: [
          {
            id: 'CSS-F-016-t-none',
            filename: 'styles.css',
            language: 'css',
            code: `.element {
  display: none;
}`,
          },
        ],
        replacements: [
          { token: '.element', description: 'l’élément à faire disparaître (sans laisser d’espace)' },
        ],
        placement: 'Pour retirer un élément de l’affichage sans le supprimer du HTML (menu fermé, message caché).',
      },
    ],
  }),

  lesson({
    id: 'CSS-F-017-LESSON',
    slug: 'overflow',
    title: 'overflow : gérer le débordement',
    shortTitle: 'overflow',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Décider ce qui se passe quand le contenu dépasse de son conteneur : le couper, ajouter une barre de défilement, ou couper le texte avec des points de suspension.',
    utility:
      'Contrôler ce qui déborde d’une boîte : masquer, faire défiler, ou tronquer proprement.',
    aliases: ['overflow', 'debordement', 'barre de defilement', 'scroll', 'couper le texte', 'ellipsis', 'text-overflow'],
    keywords: [
      'overflow hidden',
      'overflow auto',
      'overflow scroll',
      'barre de defilement',
      'zone qui defile',
      'couper le texte',
      'points de suspension',
      'ellipsis',
    ],
    relatedContentIds: ['CSS-F-002-LESSON'],
    templateId: 'CSS-F-017-TEMPLATE',
    intro:
      'Quand un contenu est <b>plus grand que sa boîte</b>, il déborde. La propriété <code>overflow</code> décide du comportement : tout <b>afficher</b>, <b>couper</b>, ou ajouter une <b>barre de défilement</b>. On peut aussi tronquer un texte trop long avec des <b>points de suspension</b>.',
    sections: [
      {
        id: 's1',
        title: 'auto, hidden, scroll',
        blocks: [
          {
            type: 'situation',
            html: 'J’ai une <b>zone de hauteur fixe</b> qui contient une longue liste. Je veux qu’elle <b>défile à l’intérieur</b> au lieu d’étirer toute la page.',
          },
          {
            type: 'paragraph',
            html: '<code>overflow: auto</code> ajoute une barre de défilement <b>seulement si nécessaire</b>. <code>hidden</code> <b>coupe</b> ce qui dépasse. <code>scroll</code> force une barre <b>en permanence</b>. On peut cibler un seul axe avec <code>overflow-x</code> ou <code>overflow-y</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-017-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `/* Zone de hauteur fixe qui defile si besoin */
.liste {
  height: 300px;
  overflow-y: auto;   /* barre verticale seulement si necessaire */
}

/* On coupe tout ce qui depasse, sans barre */
.vignette {
  overflow: hidden;
}

/* Defilement horizontal uniquement */
.galerie {
  overflow-x: scroll;  /* barre horizontale toujours visible */
  overflow-y: hidden;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> préfère <code>auto</code> à <code>scroll</code> — la barre n’apparaît que quand elle sert vraiment, ce qui reste plus propre.',
          },
          {
            type: 'table',
            headers: ['Valeur', 'Effet'],
            rows: [
              ['<code>visible</code>', 'le contenu déborde (par défaut)'],
              ['<code>hidden</code>', 'coupe ce qui dépasse, sans barre'],
              ['<code>scroll</code>', 'barre de défilement toujours affichée'],
              ['<code>auto</code>', 'barre seulement si nécessaire'],
            ],
          },
        ],
      },
      {
        id: 's2',
        title: 'Couper le texte avec text-overflow',
        blocks: [
          {
            type: 'situation',
            html: 'Un <b>titre trop long</b> casse ma mise en page. Je veux le couper sur une seule ligne et finir par <b>« … »</b>.',
          },
          {
            type: 'paragraph',
            html: 'Le combo classique : empêcher le retour à la ligne avec <code>white-space: nowrap</code>, cacher le débordement avec <code>overflow: hidden</code>, puis afficher les points de suspension avec <code>text-overflow: ellipsis</code>. Les trois sont <b>indispensables ensemble</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-017-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `.titre {
  white-space: nowrap;      /* pas de retour a la ligne */
  overflow: hidden;         /* cache ce qui depasse */
  text-overflow: ellipsis;  /* affiche les points ... */
  max-width: 240px;
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> comme un aperçu de nom de fichier trop long dans l’explorateur : « rapport-annuel-fin… » — le début est lisible, la fin est remplacée par des points.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>white-space: nowrap</code> : sans lui, <code>text-overflow: ellipsis</code> ne s’applique pas et le texte passe à la ligne.',
      'Utiliser <code>scroll</code> partout : la barre reste visible même quand elle ne sert à rien. Préfère <code>auto</code>.',
      '<code>overflow: hidden</code> sur un conteneur qui abrite un menu déroulant : il coupe aussi le menu qui devait dépasser.',
    ],
    takeaways: [
      '<code>overflow: auto</code> = barre seulement si nécessaire · <code>scroll</code> = barre toujours là',
      '<code>hidden</code> coupe ce qui dépasse · <code>overflow-x</code>/<code>overflow-y</code> ciblent un axe',
      'zone qui défile = hauteur fixe + <code>overflow-y: auto</code>',
      'texte tronqué « … » = <code>nowrap</code> + <code>overflow: hidden</code> + <code>text-overflow: ellipsis</code>',
    ],
  }),
  template({
    id: 'CSS-F-017-TEMPLATE',
    slug: 'overflow',
    title: 'overflow',
    technology: 'css',
    tomeId: 't2',
    summary: 'Gérer le débordement : zone qui défile ou texte coupé avec « … ».',
    lede: 'Gérer ce qui dépasse d’une boîte. Choisis le cas :',
    aliases: ['overflow', 'barre de defilement', 'couper le texte', 'ellipsis'],
    keywords: ['scroll', 'overflow auto', 'text-overflow'],
    relatedContentIds: [],
    lessonId: 'CSS-F-017-LESSON',
    variants: [
      {
        id: 'zone-scroll',
        label: 'Zone qui défile',
        codeBlocks: [
          {
            id: 'CSS-F-017-t-scroll',
            filename: 'styles.css',
            language: 'css',
            code: `.zone {
  height: 300px;
  overflow-y: auto;
}`,
          },
        ],
        replacements: [
          { token: '.zone', description: 'le conteneur à hauteur fixe' },
          { token: '300px', description: 'la hauteur au-delà de laquelle ça défile' },
        ],
        placement: 'Pour une liste ou un panneau qui défile à l’intérieur au lieu d’étirer la page.',
      },
      {
        id: 'texte-ellipsis',
        label: 'Texte coupé (…)',
        codeBlocks: [
          {
            id: 'CSS-F-017-t-ellipsis',
            filename: 'styles.css',
            language: 'css',
            code: `.titre {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 240px;
}`,
          },
        ],
        replacements: [
          { token: '.titre', description: 'l’élément dont le texte doit être tronqué' },
          { token: '240px', description: 'la largeur au-delà de laquelle le texte est coupé' },
        ],
        placement: 'Pour couper un texte trop long sur une ligne et finir par des points de suspension.',
      },
    ],
  }),

  lesson({
    id: 'CSS-F-018-LESSON',
    slug: 'box-shadow',
    title: 'box-shadow : les ombres',
    shortTitle: 'box-shadow',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Ajouter des ombres à une boîte pour créer de la profondeur : ombre portée douce d’une carte, ombre intérieure, ou léger relief au survol d’un bouton.',
    utility:
      'Donner du relief et de la profondeur à un élément grâce à une ou plusieurs ombres.',
    aliases: ['box-shadow', 'ombre', 'ombre portee', 'ombre interieure', 'inset', 'relief', 'profondeur'],
    keywords: [
      'box-shadow',
      'ombre portee',
      'ombre douce',
      'ombre carte',
      'ombre bouton',
      'ombre interieure inset',
      'relief',
      'profondeur',
    ],
    relatedContentIds: ['CSS-F-002-LESSON'],
    templateId: 'CSS-F-018-TEMPLATE',
    intro:
      'La propriété <code>box-shadow</code> projette une <b>ombre</b> autour d’un élément. Sa syntaxe suit un ordre précis : <b>décalage horizontal</b>, <b>décalage vertical</b>, <b>flou</b>, <b>étalement</b>, puis <b>couleur</b>. Le mot-clé <code>inset</code> la place à l’<b>intérieur</b>.',
    sections: [
      {
        id: 's1',
        title: 'La syntaxe : offset, flou, étalement, couleur',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux que mes <b>cartes semblent décoller de la page</b> avec une ombre douce en dessous, comme les cartes des interfaces modernes.',
          },
          {
            type: 'paragraph',
            html: 'On lit les valeurs dans l’ordre : <code>offset-x</code> (droite/gauche), <code>offset-y</code> (bas/haut), <code>blur</code> (plus il est grand, plus l’ombre est floue), <code>spread</code> (taille de l’ombre) et la <b>couleur</b>. Une couleur <b>semi-transparente</b> (rgba) donne un rendu bien plus naturel.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-018-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `.carte {
  /* offset-x | offset-y | blur | spread | couleur */
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
}

/* Ombre plus marquee au survol : effet de levitation */
.carte:hover {
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.15);
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> une ombre douce et réaliste utilise un décalage vertical léger, un <b>flou généreux</b> et une couleur noire très transparente (ex. <code>rgba(0,0,0,0.1)</code>) — jamais un noir opaque.',
          },
          {
            type: 'table',
            headers: ['Valeur', 'Rôle'],
            rows: [
              ['<code>offset-x</code>', 'décalage horizontal (positif = vers la droite)'],
              ['<code>offset-y</code>', 'décalage vertical (positif = vers le bas)'],
              ['<code>blur</code>', 'intensité du flou (0 = net)'],
              ['<code>spread</code>', 'agrandit (positif) ou réduit (négatif) l’ombre'],
              ['<code>couleur</code>', 'la teinte, souvent en rgba semi-transparent'],
            ],
          },
        ],
      },
      {
        id: 's2',
        title: 'inset et exemple de bouton',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le mot-clé <code>inset</code> place l’ombre <b>à l’intérieur</b> de la boîte : utile pour un effet « enfoncé » (champ, bouton pressé). On peut aussi cumuler <b>plusieurs ombres</b> séparées par des virgules.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-018-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `/* Ombre INTERIEURE : effet enfonce */
.champ {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Bouton avec ombre + relief au survol */
.bouton {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.bouton:active {
  /* enfonce au clic */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Plusieurs ombres cumulees (separees par une virgule) */
.relief {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1),
              0 8px 16px rgba(0, 0, 0, 0.1);
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une ombre normale, c’est le trait sombre <b>sous</b> un objet posé sur une table. <code>inset</code>, c’est l’ombre <b>à l’intérieur</b> d’un creux, comme au fond d’une boîte.',
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser un noir opaque (<code>#000</code>) : l’ombre paraît dure et artificielle. Préfère du <code>rgba</code> très transparent.',
      'Confondre <code>box-shadow</code> (ombre de la boîte) et <code>text-shadow</code> (ombre du texte) : ce sont deux propriétés distinctes.',
      'Oublier que <code>box-shadow</code> ne prend <b>pas</b> de place : l’ombre déborde et peut être coupée par un parent en <code>overflow: hidden</code>.',
    ],
    takeaways: [
      'ordre des valeurs : <code>offset-x offset-y blur spread couleur</code>',
      'ombre douce = petit décalage + flou généreux + <code>rgba</code> transparent',
      '<code>inset</code> place l’ombre à l’intérieur (effet enfoncé)',
      'plusieurs ombres se cumulent, séparées par une virgule',
    ],
  }),
  template({
    id: 'CSS-F-018-TEMPLATE',
    slug: 'box-shadow',
    title: 'box-shadow',
    technology: 'css',
    tomeId: 't2',
    summary: 'Des ombres prêtes à copier : carte qui décolle, bouton, ombre intérieure.',
    lede: 'Ajouter une ombre. Choisis le cas :',
    aliases: ['box-shadow', 'ombre', 'ombre portee', 'inset'],
    keywords: ['ombre carte', 'ombre bouton', 'inset', 'relief'],
    relatedContentIds: [],
    lessonId: 'CSS-F-018-LESSON',
    variants: [
      {
        id: 'carte',
        label: 'Carte (ombre douce)',
        codeBlocks: [
          {
            id: 'CSS-F-018-t-carte',
            filename: 'styles.css',
            language: 'css',
            code: `.carte {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}`,
          },
        ],
        replacements: [
          { token: '4px', description: 'le décalage vertical de l’ombre' },
          { token: '12px', description: 'le flou (plus grand = plus doux)' },
          { token: '0.1', description: 'l’opacité de l’ombre (0 à 1)' },
        ],
        placement: 'Le classique pour une carte qui semble décoller légèrement de la page.',
      },
      {
        id: 'bouton',
        label: 'Bouton (relief au survol)',
        codeBlocks: [
          {
            id: 'CSS-F-018-t-bouton',
            filename: 'styles.css',
            language: 'css',
            code: `.bouton {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease;
}
.bouton:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}`,
          },
        ],
        replacements: [
          { token: '.bouton', description: 'le bouton à mettre en relief' },
          { token: '0.25', description: 'l’opacité de l’ombre au survol' },
        ],
        placement: 'Pour un bouton qui semble se soulever quand la souris passe dessus.',
      },
      {
        id: 'inset',
        label: 'Ombre intérieure (inset)',
        codeBlocks: [
          {
            id: 'CSS-F-018-t-inset',
            filename: 'styles.css',
            language: 'css',
            code: `.champ {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}`,
          },
        ],
        replacements: [
          { token: '.champ', description: 'l’élément à creuser (champ, zone enfoncée)' },
          { token: 'inset', description: 'le mot-clé qui place l’ombre à l’intérieur' },
        ],
        placement: 'Pour un effet « enfoncé » : champ de saisie, bouton pressé, zone en creux.',
      },
    ],
  }),
];
