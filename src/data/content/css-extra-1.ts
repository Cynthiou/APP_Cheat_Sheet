import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const cssExtra1Content: ReadyContent[] = [
  // ————— Les unités CSS —————
  lesson({
    id: 'CSS-F-012-LESSON',
    slug: 'unites-css',
    title: 'Les unités CSS : px, rem, em, %, vh/vw',
    shortTitle: 'Unités CSS',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Comprendre les principales unités de taille (px, rem, em, %, vh/vw) et savoir laquelle choisir selon le besoin, notamment pour l’accessibilité.',
    utility:
      'Choisir la bonne unité pour des tailles fixes, adaptables ou relatives à l’écran.',
    aliases: ['unite', 'unites', 'px', 'rem', 'em', 'pourcentage', 'vh', 'vw', 'taille'],
    keywords: [
      'taille de police',
      'unite relative',
      'unite fixe',
      'responsive',
      'accessibilite',
      'hauteur de la fenetre',
      'pixel rem em',
    ],
    relatedContentIds: ['CSS-F-013-LESSON'],
    templateId: 'CSS-F-012-TEMPLATE',
    intro:
      'Une <b>unité</b> précise « combien » pour une taille. Il y a les <b>fixes</b> (<code>px</code>), les <b>relatives à la police</b> (<code>rem</code>, <code>em</code>), les <b>relatives au parent</b> (<code>%</code>) et les <b>relatives à l’écran</b> (<code>vh</code>, <code>vw</code>).',
    sections: [
      {
        id: 's1',
        title: 'px, rem et em',
        blocks: [
          {
            type: 'situation',
            html: 'Un utilisateur <b>augmente la taille du texte</b> dans son navigateur, mais mon texte fixé en <code>px</code> ne bouge pas. Je veux qu’il <b>respecte ce réglage</b>.',
          },
          {
            type: 'paragraph',
            html: '<code>px</code> est une taille <b>figée</b>. <code>rem</code> est relatif à la taille de police <b>de la racine</b> (<code>html</code>, 16px par défaut) : <code>1rem = 16px</code>. <code>em</code> est relatif à la taille de police de <b>l’élément lui-même</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-012-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `.titre {
  font-size: 2rem;    /* 2 x 16px = 32px, suit le reglage utilisateur */
}

.bouton {
  font-size: 16px;    /* taille figee, ignore le reglage utilisateur */
  padding: 0.75em;    /* 0.75 x la taille de police du bouton */
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Accessibilité :</b> préfère <code>rem</code> pour les tailles de police. Si l’utilisateur agrandit le texte par défaut du navigateur, tes tailles suivent — ce que <code>px</code> empêche.',
          },
        ],
      },
      {
        id: 's2',
        title: '%, vh et vw',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <code>%</code> est relatif au <b>parent</b> (ex. <code>width: 50%</code> = la moitié du conteneur). <code>vw</code> et <code>vh</code> sont relatifs à la <b>fenêtre</b> : <code>1vw</code> = 1&nbsp;% de la largeur, <code>1vh</code> = 1&nbsp;% de la hauteur visible.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-012-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `.colonne {
  width: 50%;      /* moitie de la largeur du parent */
}

.banniere {
  height: 100vh;   /* toute la hauteur de la fenetre */
  width: 100vw;    /* toute la largeur de la fenetre */
}`,
            },
          },
          {
            type: 'table',
            headers: ['Unité', 'Relative à…', 'Usage typique'],
            rows: [
              ['<code>px</code>', 'rien (figée)', 'bordures, ombres, petits détails'],
              ['<code>rem</code>', 'la police racine (<code>html</code>)', 'tailles de police, espacements'],
              ['<code>em</code>', 'la police de l’élément', 'padding proportionnel au texte'],
              ['<code>%</code>', 'le parent', 'largeurs fluides'],
              ['<code>vh</code> / <code>vw</code>', 'la fenêtre', 'sections plein écran'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Tout mettre en <code>px</code> pour les polices : le texte n’écoute plus le réglage d’accessibilité du navigateur. Préfère <code>rem</code>.',
      'Empiler des <code>em</code> imbriqués : chaque niveau se multiplie par le parent, les tailles s’emballent vite. <code>rem</code> reste stable.',
      'Sur mobile, <code>100vh</code> déborde à cause de la barre du navigateur : préfère <code>100dvh</code> pour le plein écran.',
    ],
    takeaways: [
      '<code>px</code> = figée · <code>rem</code> = relative à <code>html</code> (16px) · <code>em</code> = relative à l’élément',
      '<code>%</code> = relative au parent · <code>vh</code>/<code>vw</code> = relative à la fenêtre',
      'polices : <code>rem</code> pour respecter l’accessibilité, pas <code>px</code>',
      '<code>1rem = 16px</code> par défaut',
      'sur mobile, <code>100dvh</code> plutôt que <code>100vh</code>',
    ],
  }),
  template({
    id: 'CSS-F-012-TEMPLATE',
    slug: 'unites-css',
    title: 'Unités CSS',
    technology: 'css',
    tomeId: 't2',
    summary: 'Les unités CSS prêtes à copier : rem pour les polices, % et vh/vw pour les dimensions.',
    lede: 'Choisir la bonne unité. Choisis le cas :',
    aliases: ['unite', 'px', 'rem', 'em', 'vh', 'vw'],
    keywords: ['taille de police', 'responsive', 'accessibilite'],
    relatedContentIds: [],
    lessonId: 'CSS-F-012-LESSON',
    variants: [
      {
        id: 'rem-police',
        label: 'Police en rem',
        description: 'La bonne pratique pour l’accessibilité.',
        codeBlocks: [
          {
            id: 'CSS-F-012-t-rem',
            filename: 'styles.css',
            language: 'css',
            code: `.texte {
  font-size: 1rem;   /* 16px, suit le reglage utilisateur */
}

.titre {
  font-size: 2rem;   /* 32px */
}`,
          },
        ],
        replacements: [
          { token: '1rem', description: 'la taille voulue (1rem = 16px par défaut)' },
          { token: '.texte', description: 'l’élément à styliser' },
        ],
        placement: 'Pour toutes les tailles de police : respecte le réglage d’accessibilité du navigateur.',
      },
      {
        id: 'plein-ecran',
        label: 'Section plein écran',
        codeBlocks: [
          {
            id: 'CSS-F-012-t-vh',
            filename: 'styles.css',
            language: 'css',
            code: `.banniere {
  min-height: 100dvh;   /* toute la hauteur visible, fiable sur mobile */
  width: 100%;
}`,
          },
        ],
        replacements: [
          { token: '.banniere', description: 'la section à afficher en plein écran' },
          { token: '100dvh', description: 'la hauteur de la fenêtre (dvh = fiable sur mobile)' },
        ],
        placement: 'Pour une bannière ou un héro qui occupe toute la hauteur de l’écran.',
      },
    ],
  }),

  // ————— La typographie —————
  lesson({
    id: 'CSS-F-013-LESSON',
    slug: 'typographie',
    title: 'La typographie : font-family, size, weight',
    shortTitle: 'Typographie',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Régler l’apparence du texte : la police et son fallback, la taille, la graisse, l’interligne, l’alignement et l’espacement des lettres.',
    utility:
      'Rendre le texte lisible et cohérent en maîtrisant police, taille, graisse et interligne.',
    aliases: ['typographie', 'police', 'font', 'font-family', 'font-size', 'font-weight', 'texte'],
    keywords: [
      'changer la police',
      'taille du texte',
      'texte en gras',
      'interligne',
      'aligner le texte',
      'espacement des lettres',
      'pile de polices',
    ],
    relatedContentIds: ['CSS-F-012-LESSON'],
    templateId: 'CSS-F-013-TEMPLATE',
    intro:
      'La <b>typographie</b> se règle avec quelques propriétés : <code>font-family</code> (la police), <code>font-size</code> (la taille), <code>font-weight</code> (la graisse) et <code>line-height</code> (l’interligne). Bien réglées, elles rendent le texte lisible et soigné.',
    sections: [
      {
        id: 's1',
        title: 'Police, taille et graisse',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>choisir une police lisible</b> pour tout mon site, avec un <b>secours</b> au cas où elle ne se charge pas, et des <b>titres bien plus gros</b> que le texte.',
          },
          {
            type: 'paragraph',
            html: '<code>font-family</code> prend une <b>liste</b> (pile de polices) : le navigateur essaie la première, puis les suivantes en secours. On termine toujours par une famille générique (<code>sans-serif</code>, <code>serif</code>).',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-013-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `body {
  /* police souhaitee, puis secours, puis famille generique */
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  font-size: 1rem;      /* taille de base */
  font-weight: 400;     /* graisse normale */
  line-height: 1.6;     /* interligne confortable */
}

.titre {
  font-size: 2rem;
  font-weight: 700;     /* gras */
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Fallback :</b> mets toujours au moins une police de secours et une famille générique en fin de liste. Si la première police échoue, le texte reste lisible.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Interligne, alignement, espacement',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>line-height</code> gère l’<b>interligne</b> (sans unité, c’est un multiple de la police). <code>text-align</code> aligne le texte, et <code>letter-spacing</code> ajuste l’espace <b>entre les lettres</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-013-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `.paragraphe {
  line-height: 1.6;        /* 1.6 x la taille de police */
  text-align: left;        /* left, center, right, justify */
}

.etiquette {
  text-transform: uppercase;
  letter-spacing: 0.05em;  /* petit espace entre les lettres */
}`,
            },
          },
          {
            type: 'table',
            headers: ['Propriété', 'Rôle', 'Valeur courante'],
            rows: [
              ['<code>font-family</code>', 'la police + son fallback', '<code>\'Inter\', sans-serif</code>'],
              ['<code>font-size</code>', 'la taille du texte', '<code>1rem</code>'],
              ['<code>font-weight</code>', 'la graisse', '<code>400</code> / <code>700</code>'],
              ['<code>line-height</code>', 'l’interligne', '<code>1.5</code> – <code>1.6</code>'],
              ['<code>text-align</code>', 'l’alignement', '<code>left</code> / <code>center</code>'],
              ['<code>letter-spacing</code>', 'l’espace entre lettres', '<code>0.05em</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier la famille générique en fin de <code>font-family</code> : si toutes les polices échouent, le rendu est imprévisible.',
      'Mettre une unité à <code>line-height</code> (<code>1.6px</code>) : sans unité (<code>1.6</code>), il s’adapte proportionnellement à chaque taille de police.',
      'Abuser de <code>text-align: justify</code> sur des colonnes étroites : ça crée des « rivières » de blancs peu lisibles.',
    ],
    takeaways: [
      '<code>font-family</code> = une <b>liste</b> qui finit par une famille générique (<code>sans-serif</code>)',
      '<code>font-size</code> en <code>rem</code> · <code>font-weight: 400</code> (normal) ou <code>700</code> (gras)',
      '<code>line-height</code> sans unité (ex. <code>1.6</code>) pour un interligne proportionnel',
      '<code>text-align</code> pour aligner · <code>letter-spacing</code> pour espacer les lettres',
    ],
  }),
  template({
    id: 'CSS-F-013-TEMPLATE',
    slug: 'typographie',
    title: 'Typographie',
    technology: 'css',
    tomeId: 't2',
    summary: 'Régler la police d’un site : pile de polices, taille, graisse et interligne.',
    lede: 'Régler le texte. Choisis le cas :',
    aliases: ['typographie', 'police', 'font-family', 'font-size'],
    keywords: ['changer la police', 'taille du texte', 'interligne'],
    relatedContentIds: [],
    lessonId: 'CSS-F-013-LESSON',
    variants: [
      {
        id: 'police-base',
        label: 'Police du site',
        codeBlocks: [
          {
            id: 'CSS-F-013-t-base',
            filename: 'styles.css',
            language: 'css',
            code: `body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}`,
          },
        ],
        replacements: [
          { token: '\'Inter\'', description: 'ta police principale' },
          { token: '\'Segoe UI\', Arial, sans-serif', description: 'les polices de secours (finir par une famille générique)' },
        ],
        placement: 'Sur le body : donne la police de base à tout le texte du site.',
      },
      {
        id: 'titre',
        label: 'Titre',
        codeBlocks: [
          {
            id: 'CSS-F-013-t-titre',
            filename: 'styles.css',
            language: 'css',
            code: `.titre {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}`,
          },
        ],
        replacements: [
          { token: '2rem', description: 'la taille du titre' },
          { token: '700', description: 'la graisse (400 normal, 700 gras)' },
        ],
        placement: 'Pour un titre : plus gros, plus gras, un interligne plus serré que le corps de texte.',
      },
    ],
  }),

  // ————— Les couleurs et les dégradés —————
  lesson({
    id: 'CSS-F-014-LESSON',
    slug: 'couleurs-et-degrades',
    title: 'Les couleurs et les dégradés',
    shortTitle: 'Couleurs',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Écrire une couleur (hex, rgb/rgba, hsl), distinguer texte et fond, et créer des dégradés avec linear-gradient et radial-gradient.',
    utility:
      'Colorer le texte et les fonds, gérer la transparence et créer des dégradés.',
    aliases: ['couleur', 'couleurs', 'hex', 'rgb', 'rgba', 'hsl', 'degrade', 'gradient', 'background'],
    keywords: [
      'code couleur',
      'couleur hexadecimale',
      'transparence',
      'couleur du texte',
      'couleur de fond',
      'degrade lineaire',
      'degrade radial',
    ],
    relatedContentIds: ['CSS-F-006-LESSON'],
    templateId: 'CSS-F-014-TEMPLATE',
    intro:
      'Une couleur s’écrit de plusieurs façons : <b>hexadécimal</b> (<code>#2563eb</code>), <b>rgb/rgba</b> (avec transparence) ou <b>hsl</b> (teinte, saturation, luminosité). On l’applique au texte avec <code>color</code> et au fond avec <code>background</code>. Les <b>dégradés</b> vont plus loin.',
    sections: [
      {
        id: 's1',
        title: 'Écrire une couleur : hex, rgb, hsl',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux un <b>fond bleu semi-transparent</b> par-dessus une image, et pouvoir <b>ajuster facilement la luminosité</b> de ma couleur de marque.',
          },
          {
            type: 'paragraph',
            html: '<code>rgba()</code> ajoute un canal <b>alpha</b> (transparence, de 0 à 1). <code>hsl()</code> décrit la couleur par sa <b>teinte</b>, sa <b>saturation</b> et sa <b>luminosité</b> — idéal pour éclaircir ou assombrir en changeant juste la 3ᵉ valeur.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-014-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `.boite {
  color: #ffffff;                    /* hexadecimal */
  background: rgb(37, 99, 235);      /* rouge, vert, bleu */
}

.calque {
  /* bleu a 50% de transparence */
  background: rgba(37, 99, 235, 0.5);
}

.marque {
  /* teinte 220, saturation 90%, luminosite 55% */
  color: hsl(220, 90%, 55%);
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>color</code> colore le <b>texte</b>, <code>background</code> colore le <b>fond</b>. Deux propriétés distinctes qu’on confond souvent.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les dégradés',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un <b>dégradé</b> se déclare comme un <code>background</code>. <code>linear-gradient()</code> fait passer d’une couleur à l’autre sur une <b>direction</b>. <code>radial-gradient()</code> part d’un <b>point central</b> vers l’extérieur.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-014-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `.entete {
  /* direction, puis les couleurs a enchainer */
  background: linear-gradient(to right, #2563eb, #9333ea);
}

.halo {
  /* du centre vers les bords */
  background: radial-gradient(circle, #fef08a, #f59e0b);
}`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Signifie'],
            rows: [
              ['<code>#2563eb</code>', 'couleur en hexadécimal'],
              ['<code>rgb(37, 99, 235)</code>', 'rouge, vert, bleu (0–255)'],
              ['<code>rgba(…, 0.5)</code>', 'idem + transparence (0 à 1)'],
              ['<code>hsl(220, 90%, 55%)</code>', 'teinte, saturation, luminosité'],
              ['<code>linear-gradient(...)</code>', 'dégradé en ligne droite'],
              ['<code>radial-gradient(...)</code>', 'dégradé depuis un centre'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Confondre <code>color</code> (le texte) et <code>background</code> (le fond) : vérifie bien laquelle tu règles.',
      'Écrire un dégradé sur <code>color</code> : un <code>gradient()</code> est une <b>image de fond</b>, il va sur <code>background</code>, pas sur <code>color</code>.',
      'Oublier la <b>direction</b> ou une <b>deuxième couleur</b> dans <code>linear-gradient</code> : il en faut au moins deux pour voir un dégradé.',
    ],
    takeaways: [
      'couleur : <code>#hex</code> · <code>rgb()</code> · <code>rgba()</code> (transparence) · <code>hsl()</code>',
      '<code>hsl()</code> = teinte, saturation, luminosité — pratique pour éclaircir/assombrir',
      '<code>color</code> = texte · <code>background</code> = fond',
      'dégradés : <code>linear-gradient()</code> (direction) · <code>radial-gradient()</code> (centre)',
      'un dégradé est un fond → il va sur <code>background</code>',
    ],
  }),
  template({
    id: 'CSS-F-014-TEMPLATE',
    slug: 'couleurs-et-degrades',
    title: 'Couleurs et dégradés',
    technology: 'css',
    tomeId: 't2',
    summary: 'Écrire une couleur (hex, rgba, hsl) et créer un dégradé.',
    lede: 'Colorer un élément. Choisis le cas :',
    aliases: ['couleur', 'rgba', 'hsl', 'degrade', 'gradient'],
    keywords: ['code couleur', 'transparence', 'degrade lineaire'],
    relatedContentIds: [],
    lessonId: 'CSS-F-014-LESSON',
    variants: [
      {
        id: 'couleur-transparence',
        label: 'Couleur + transparence',
        codeBlocks: [
          {
            id: 'CSS-F-014-t-rgba',
            filename: 'styles.css',
            language: 'css',
            code: `.element {
  color: #ffffff;
  background: rgba(37, 99, 235, 0.5);
}`,
          },
        ],
        replacements: [
          { token: '#ffffff', description: 'la couleur du texte' },
          { token: '37, 99, 235', description: 'les valeurs rouge, vert, bleu (0 à 255)' },
          { token: '0.5', description: 'la transparence, de 0 (invisible) à 1 (opaque)' },
        ],
        placement: 'Quand il faut un fond semi-transparent, par-dessus une image par exemple.',
      },
      {
        id: 'degrade',
        label: 'Dégradé',
        codeBlocks: [
          {
            id: 'CSS-F-014-t-grad',
            filename: 'styles.css',
            language: 'css',
            code: `.entete {
  background: linear-gradient(to right, #2563eb, #9333ea);
}`,
          },
        ],
        replacements: [
          { token: 'to right', description: 'la direction (to right, to bottom, 45deg…)' },
          { token: '#2563eb, #9333ea', description: 'les couleurs de départ et d’arrivée' },
        ],
        placement: 'Pour un fond dégradé : va sur background, avec au moins deux couleurs.',
      },
    ],
  }),

  // ————— calc() —————
  lesson({
    id: 'CSS-F-015-LESSON',
    slug: 'calc',
    title: 'calc() : mélanger les unités',
    shortTitle: 'calc()',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Calculer une valeur directement en CSS et combiner des unités différentes (ex. 100% - 40px) que rien d’autre ne permet de mélanger.',
    utility:
      'Combiner des unités incompatibles (pourcentage et pixels) dans une seule valeur.',
    aliases: ['calc', 'calcul', 'combiner unites', 'melanger unites', 'largeur calculee'],
    keywords: [
      'combiner des unites',
      'pourcentage moins pixels',
      'largeur moins une marge',
      'calcul css',
      'soustraire des pixels',
      'valeur dynamique',
    ],
    relatedContentIds: ['CSS-F-012-LESSON'],
    templateId: 'CSS-F-015-TEMPLATE',
    intro:
      '<code>calc()</code> effectue un <b>calcul</b> directement dans une valeur CSS. Sa force : <b>mélanger des unités</b> différentes (comme <code>%</code> et <code>px</code>) que rien d’autre ne sait combiner.',
    sections: [
      {
        id: 's1',
        title: 'Combiner % et px',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux qu’un bloc prenne <b>toute la largeur du parent, moins une gouttière fixe de 40px</b>. Impossible à écrire en un seul <code>%</code> ou un seul <code>px</code>.',
          },
          {
            type: 'paragraph',
            html: 'Avec <code>calc()</code>, on combine les deux : <code>calc(100% - 40px)</code>. Le navigateur calcule la largeur réelle à l’exécution, quelle que soit la taille du parent.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-015-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `.contenu {
  /* toute la largeur, moins 40px de gouttiere */
  width: calc(100% - 40px);
}

.zone {
  /* toute la hauteur de l'ecran, moins une barre de 64px */
  height: calc(100vh - 64px);
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Espaces obligatoires :</b> autour de <code>-</code> et <code>+</code>, il faut des espaces. <code>calc(100%-40px)</code> est invalide, <code>calc(100% - 40px)</code> est correct.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Cas d’usage et variables',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>calc()</code> se marie très bien avec les <b>variables CSS</b> : on stocke une valeur, puis on l’ajuste au calcul. Les quatre opérations sont disponibles (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>).',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-015-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `:root {
  --barre: 64px;
}

.panneau {
  /* la variable participe au calcul */
  height: calc(100vh - var(--barre));
}

.demi {
  /* multiplication et division aussi permises */
  width: calc(100% / 3);   /* un tiers exact */
}`,
            },
          },
          {
            type: 'table',
            headers: ['Exemple', 'Résultat'],
            rows: [
              ['<code>calc(100% - 40px)</code>', 'largeur du parent moins 40px'],
              ['<code>calc(100vh - 64px)</code>', 'hauteur écran moins une barre'],
              ['<code>calc(100% / 3)</code>', 'un tiers exact du parent'],
              ['<code>calc(var(--x) + 8px)</code>', 'une variable ajustée de 8px'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier les <b>espaces</b> autour de <code>-</code> et <code>+</code> : <code>calc(100%-40px)</code> ne fonctionne pas.',
      'Croire qu’on peut mélanger les unités sans <code>calc()</code> : <code>width: 100% - 40px</code> seul est invalide, il faut <code>calc()</code>.',
      'Imbriquer des <code>calc()</code> inutilement : les parenthèses suffisent, <code>calc((100% - 40px) / 2)</code> reste un seul <code>calc()</code>.',
    ],
    takeaways: [
      '<code>calc()</code> calcule une valeur et <b>mélange les unités</b> (<code>%</code>, <code>px</code>, <code>vh</code>…)',
      'cas type : <code>width: calc(100% - 40px)</code>',
      'espaces <b>obligatoires</b> autour de <code>-</code> et <code>+</code>',
      'les 4 opérations : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>',
      'se combine parfaitement avec <code>var(--nom)</code>',
    ],
  }),
  template({
    id: 'CSS-F-015-TEMPLATE',
    slug: 'calc',
    title: 'calc()',
    technology: 'css',
    tomeId: 't2',
    summary: 'Combiner des unités avec calc() : largeur ou hauteur moins une valeur fixe.',
    lede: 'Mélanger des unités. Choisis le cas :',
    aliases: ['calc', 'calcul', 'combiner unites'],
    keywords: ['pourcentage moins pixels', 'largeur calculee', 'calcul css'],
    relatedContentIds: [],
    lessonId: 'CSS-F-015-LESSON',
    variants: [
      {
        id: 'largeur',
        label: 'Largeur - marge',
        codeBlocks: [
          {
            id: 'CSS-F-015-t-largeur',
            filename: 'styles.css',
            language: 'css',
            code: `.contenu {
  width: calc(100% - 40px);
}`,
          },
        ],
        replacements: [
          { token: '100%', description: 'la base (souvent la largeur du parent)' },
          { token: '40px', description: 'la valeur fixe à retirer (marge, gouttière…)' },
        ],
        placement: 'Quand un bloc doit remplir le parent en laissant une marge fixe.',
      },
      {
        id: 'hauteur-barre',
        label: 'Hauteur - barre',
        codeBlocks: [
          {
            id: 'CSS-F-015-t-hauteur',
            filename: 'styles.css',
            language: 'css',
            code: `:root {
  --barre: 64px;
}

.zone {
  height: calc(100vh - var(--barre));
}`,
          },
        ],
        replacements: [
          { token: '--barre', description: 'la hauteur de la barre à soustraire' },
          { token: '100vh', description: 'la hauteur de la fenêtre' },
        ],
        placement: 'Pour une zone qui occupe l’écran sous une barre de navigation fixe.',
      },
    ],
  }),
];
