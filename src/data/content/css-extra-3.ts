import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const cssExtra3Content: ReadyContent[] = [
  lesson({
    id: 'CSS-F-019-LESSON',
    slug: 'specificite-cascade',
    title: 'La spécificité et la cascade : pourquoi mon style ne s’applique pas',
    shortTitle: 'Spécificité',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Comprendre comment le navigateur choisit la règle gagnante quand plusieurs styles ciblent le même élément : poids des sélecteurs, ordre d’écriture et rôle de !important.',
    utility:
      'Savoir pourquoi une règle CSS est ignorée et corriger le conflit sans sortir l’artillerie lourde.',
    aliases: [
      'specificite',
      'cascade',
      'pourquoi mon style ne marche pas',
      'pourquoi mon style ne s applique pas',
      'important',
      'priorite css',
      'conflit css',
    ],
    keywords: [
      'specificite css',
      'cascade css',
      'priorite des selecteurs',
      'element classe id',
      'important',
      'regle qui gagne',
      'style ignore',
    ],
    relatedContentIds: ['CSS-F-001-LESSON'],
    templateId: 'CSS-F-019-TEMPLATE',
    intro:
      'Quand <b>plusieurs règles</b> visent le même élément, le navigateur en choisit une seule par propriété. Il tranche avec la <b>spécificité</b> (le poids du sélecteur) puis, à égalité, avec la <b>cascade</b> (l’ordre d’écriture). Comprendre ces deux règles, c’est arrêter de deviner pourquoi un style est ignoré.',
    sections: [
      {
        id: 's1',
        title: 'Qui gagne : élément < classe < id',
        blocks: [
          {
            type: 'situation',
            html: 'J’ai écrit <code>p { color: black }</code> puis <code>.intro { color: blue }</code>, mais mon paragraphe reste… <b>bleu</b> alors que la règle noire est plus bas. Pourquoi ?',
          },
          {
            type: 'paragraph',
            html: 'Chaque sélecteur a un <b>poids</b>. Une <b>classe</b> (<code>.intro</code>) pèse plus qu’une <b>balise</b> (<code>p</code>), donc elle gagne <b>même si elle est écrite avant</b>. L’ordre ne départage que les règles de <b>même poids</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-019-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `/* Poids faible : une simple balise */
p {
  color: black;
}

/* Poids plus fort : une classe -> c'est elle qui gagne */
.intro {
  color: blue;
}

/* Poids encore plus fort : un id */
#accroche {
  color: red;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> le poids compte <b>avant</b> l’ordre. balise (<code>p</code>) &lt; classe (<code>.intro</code>) &lt; id (<code>#accroche</code>) &lt; style <code>inline</code> (attribut <code>style=""</code>).',
          },
        ],
      },
      {
        id: 's2',
        title: 'La cascade et le piège de !important',
        blocks: [
          {
            type: 'paragraph',
            html: 'À <b>spécificité égale</b>, c’est la <b>dernière règle écrite</b> qui l’emporte : c’est la <b>cascade</b>. Le <code>!important</code> court-circuite tout ce classement — d’où le fait qu’il crée plus de problèmes qu’il n’en règle.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-019-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `/* Meme poids (deux classes) : la derniere gagne */
.bouton { background: blue; }
.bouton { background: green; } /* vert applique */

/* !important force la valeur, meme contre un id */
.bouton { color: white !important; }
#special { color: black; } /* perd malgre l'id */`,
            },
          },
          {
            type: 'table',
            headers: ['Type de sélecteur', 'Poids', 'Exemple'],
            rows: [
              ['balise', 'faible', '<code>p</code>, <code>div</code>'],
              ['classe / pseudo-classe', 'moyen', '<code>.intro</code>, <code>:hover</code>'],
              ['id', 'fort', '<code>#accroche</code>'],
              ['style inline', 'très fort', '<code>style="color:red"</code>'],
              ['<code>!important</code>', 'écrase tout', 'à éviter'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Bonne pratique :</b> plutôt que <code>!important</code>, augmente la spécificité proprement (ajoute une classe, ou écris la règle plus loin) ou réorganise ton CSS.',
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que « la dernière règle gagne toujours » : l’ordre ne départage qu’à <b>spécificité égale</b>. Une classe bat une balise même écrite avant.',
      'Dégainer <code>!important</code> pour forcer un style : ça marche une fois, puis il faut un autre <code>!important</code> pour le surcharger. Cercle vicieux.',
      'Empiler des sélecteurs très spécifiques (<code>#menu ul li a.actif</code>) : le style devient impossible à surcharger ensuite.',
      'Oublier que le <code>style=""</code> inline dans le HTML bat quasiment toutes les règles du fichier CSS.',
    ],
    takeaways: [
      'poids des sélecteurs : balise &lt; classe &lt; id &lt; inline',
      'le poids passe <b>avant</b> l’ordre ; l’ordre ne départage qu’à poids égal',
      'à spécificité égale, la <b>dernière règle écrite</b> gagne (la cascade)',
      '<code>!important</code> écrase tout : à éviter, il crée des conflits en chaîne',
      'pour gagner proprement : ajoute une classe, ne monte pas la spécificité à l’aveugle',
    ],
  }),
  template({
    id: 'CSS-F-019-TEMPLATE',
    slug: 'specificite-cascade',
    title: 'Spécificité & cascade',
    technology: 'css',
    tomeId: 't2',
    summary: 'Résoudre un conflit de styles : augmenter la spécificité proprement plutôt que forcer.',
    lede: 'Ta règle est ignorée ? Choisis la bonne approche :',
    aliases: ['specificite', 'cascade', 'important', 'priorite css'],
    keywords: ['conflit css', 'style ignore', 'priorite'],
    relatedContentIds: [],
    lessonId: 'CSS-F-019-LESSON',
    variants: [
      {
        id: 'monter-specificite',
        label: 'Monter la spécificité',
        description: 'Faire gagner une règle sans !important, en ajoutant une classe.',
        codeBlocks: [
          {
            id: 'CSS-F-019-t-v1',
            filename: 'styles.css',
            language: 'css',
            code: `/* Trop faible : une balise seule perd contre une classe */
button {
  color: gray;
}

/* On cible via une classe : poids plus eleve, la regle gagne */
.barre .bouton {
  color: white;
}`,
          },
        ],
        replacements: [
          { token: '.barre .bouton', description: 'le contexte + la classe qui augmentent le poids' },
          { token: 'color: white', description: 'la propriété que tu veux voir appliquée' },
        ],
        placement: 'Quand ta règle est ignorée : rends son sélecteur un peu plus spécifique.',
      },
      {
        id: 'ordre-cascade',
        label: 'Jouer sur l’ordre',
        description: 'À poids égal, la dernière règle écrite l’emporte.',
        codeBlocks: [
          {
            id: 'CSS-F-019-t-v2',
            filename: 'styles.css',
            language: 'css',
            code: `.carte {
  background: white;
}

/* Meme poids, ecrite plus bas : c'est elle qui s'applique */
.carte {
  background: #f3f4f6;
}`,
          },
        ],
        replacements: [
          { token: '.carte', description: 'l’élément visé par les deux règles' },
          { token: '#f3f4f6', description: 'la valeur finale (règle placée en dernier)' },
        ],
        placement: 'Quand deux règles ont le même poids : place la bonne en dernier.',
      },
    ],
  }),

  lesson({
    id: 'CSS-F-020-LESSON',
    slug: 'pseudo-elements',
    title: 'Les pseudo-éléments ::before et ::after',
    shortTitle: '::before / ::after',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Ajouter du contenu décoratif avant ou après un élément, sans toucher au HTML, grâce à ::before, ::after et la propriété content.',
    utility:
      'Insérer une icône, un trait ou une décoration en CSS pur, sans polluer le HTML.',
    aliases: [
      'pseudo-element',
      'pseudo element',
      'before after',
      'double deux points',
      'content css',
      'decoration css',
      'clearfix',
    ],
    keywords: [
      'before after',
      'content css',
      'ajouter une icone css',
      'decoration sans html',
      'pseudo element vs pseudo classe',
      'clearfix',
      'element decoratif',
    ],
    relatedContentIds: ['CSS-F-001-LESSON'],
    templateId: 'CSS-F-020-TEMPLATE',
    intro:
      'Un <b>pseudo-élément</b> comme <code>::before</code> ou <code>::after</code> crée un <b>faux élément</b> à l’intérieur d’un autre, <b>sans rien ajouter au HTML</b>. Il sert à insérer des décorations : une icône, un trait, un guillemet. Il a besoin de la propriété <code>content</code> pour exister.',
    sections: [
      {
        id: 's1',
        title: 'content : la clé pour les faire apparaître',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux ajouter une <b>petite flèche après chaque lien</b> et un <b>trait décoratif sous mes titres</b>, sans alourdir mon HTML avec des balises en plus.',
          },
          {
            type: 'paragraph',
            html: 'On écrit le sélecteur suivi de <code>::before</code> (avant le contenu) ou <code>::after</code> (après). Sans <code>content</code>, <b>rien ne s’affiche</b> : c’est la propriété qui donne vie au pseudo-élément (même vide, <code>content: ""</code>).',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-020-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `/* Une fleche apres chaque lien externe */
.lien-externe::after {
  content: " \\2192"; /* le caractere fleche */
}

/* Un trait decoratif sous les titres */
.titre::after {
  content: "";        /* vide mais obligatoire */
  display: block;
  width: 40px;
  height: 3px;
  background: #3b5bfe;
  margin-top: 8px;
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle d’or :</b> pas de <code>content</code>, pas de pseudo-élément. Pour une décoration purement graphique, mets <code>content: ""</code> puis stylise-le comme une boîte.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Cas d’usage et différence avec :hover',
        blocks: [
          {
            type: 'paragraph',
            html: 'Ne confonds pas <b>pseudo-élément</b> (<code>::</code>, crée un morceau de contenu) et <b>pseudo-classe</b> (<code>:</code>, cible un <b>état</b> comme <code>:hover</code>). Les deux se combinent : un <code>::before</code> peut réagir au survol du parent.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-020-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `/* Astuce clearfix : forcer un parent a contenir ses flottants */
.groupe::after {
  content: "";
  display: block;
  clear: both;
}

/* Un pseudo-element qui reagit au survol du parent */
.bouton::before {
  content: "\\2605 "; /* une etoile */
}
.bouton:hover::before {
  content: "\\2606 "; /* etoile vide au survol */
}`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Nature', 'Rôle'],
            rows: [
              ['<code>::before</code>', 'pseudo-élément', 'ajoute du contenu avant'],
              ['<code>::after</code>', 'pseudo-élément', 'ajoute du contenu après'],
              ['<code>:hover</code>', 'pseudo-classe', 'cible un état (survol)'],
              ['<code>:first-child</code>', 'pseudo-classe', 'cible une position'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le pseudo-élément est un <b>Post-it</b> collé sur ta boîte. Il n’est pas dans le carton (le HTML), mais il se voit et se décore comme s’il en faisait partie.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>content</code> : sans lui, le <code>::before</code> / <code>::after</code> n’apparaît <b>jamais</b>, même bien stylé.',
      'Mettre du <b>contenu important</b> dans <code>content</code> : c’est décoratif et souvent ignoré par les lecteurs d’écran. Le texte utile reste dans le HTML.',
      'Écrire un seul deux-points (<code>:before</code>) : ça marche par tolérance, mais la norme moderne est le double (<code>::before</code>).',
      'Confondre <code>::before</code> (contenu) et <code>:hover</code> (état) : l’un ajoute quelque chose, l’autre réagit à une interaction.',
    ],
    takeaways: [
      '<code>::before</code> / <code>::after</code> ajoutent du contenu décoratif sans toucher au HTML',
      'la propriété <code>content</code> est <b>obligatoire</b> (même vide : <code>content: ""</code>)',
      'usages : icône, trait, guillemet, clearfix (<code>content:""; display:block; clear:both</code>)',
      'double deux-points pour un pseudo-élément (<code>::</code>), simple pour une pseudo-classe (<code>:</code>)',
      'à réserver au <b>décoratif</b> : le contenu utile reste dans le HTML',
    ],
  }),
  template({
    id: 'CSS-F-020-TEMPLATE',
    slug: 'pseudo-elements',
    title: '::before & ::after',
    technology: 'css',
    tomeId: 't2',
    summary: 'Insérer une décoration avec ::before / ::after : icône, trait, clearfix.',
    lede: 'Ajouter un élément décoratif en CSS. Choisis le cas :',
    aliases: ['pseudo-element', 'before after', 'content css'],
    keywords: ['before', 'after', 'content', 'decoration'],
    relatedContentIds: [],
    lessonId: 'CSS-F-020-LESSON',
    variants: [
      {
        id: 'icone',
        label: 'Icône / caractère',
        codeBlocks: [
          {
            id: 'CSS-F-020-t-v1',
            filename: 'styles.css',
            language: 'css',
            code: `.lien::after {
  content: " \\2192";
  color: #3b5bfe;
}`,
          },
        ],
        replacements: [
          { token: '.lien', description: 'l’élément qui reçoit la décoration' },
          { token: '\\2192', description: 'le caractère à afficher (flèche, étoile…)' },
        ],
        placement: 'Pour ajouter un petit symbole avant ou après un texte.',
      },
      {
        id: 'trait',
        label: 'Trait décoratif',
        codeBlocks: [
          {
            id: 'CSS-F-020-t-v2',
            filename: 'styles.css',
            language: 'css',
            code: `.titre::after {
  content: "";
  display: block;
  width: 40px;
  height: 3px;
  background: #3b5bfe;
  margin-top: 8px;
}`,
          },
        ],
        replacements: [
          { token: '.titre', description: 'l’élément sous lequel dessiner le trait' },
          { token: '40px', description: 'la largeur du trait' },
          { token: '#3b5bfe', description: 'la couleur du trait' },
        ],
        placement: 'Pour un soulignement graphique sous un titre, sans balise en plus.',
      },
      {
        id: 'clearfix',
        label: 'Clearfix',
        codeBlocks: [
          {
            id: 'CSS-F-020-t-v3',
            filename: 'styles.css',
            language: 'css',
            code: `.groupe::after {
  content: "";
  display: block;
  clear: both;
}`,
          },
        ],
        replacements: [
          { token: '.groupe', description: 'le parent qui doit contenir ses éléments flottants' },
        ],
        placement: 'Sur un conteneur d’éléments en float, pour qu’il reprenne leur hauteur.',
      },
    ],
  }),

  lesson({
    id: 'CSS-F-021-LESSON',
    slug: 'object-fit-aspect-ratio',
    title: 'Images : object-fit et aspect-ratio',
    shortTitle: 'object-fit',
    technology: 'css',
    tomeId: 't2',
    summary:
      'Remplir un cadre avec une image sans la déformer (object-fit) et garder un rapport largeur/hauteur constant (aspect-ratio).',
    utility:
      'Afficher des images de tailles variées dans un même cadre, proprement et sans écrasement.',
    aliases: [
      'object-fit',
      'aspect-ratio',
      'image deformee',
      'image ecrasee',
      'cover contain',
      'ratio image',
      'recadrer une image css',
    ],
    keywords: [
      'object-fit cover',
      'object-fit contain',
      'aspect-ratio',
      'image deformee',
      'image ecrasee',
      'garder le ratio',
      'cadre image uniforme',
    ],
    relatedContentIds: ['CSS-F-002-LESSON'],
    templateId: 'CSS-F-021-TEMPLATE',
    intro:
      'Quand on fixe la <b>largeur et la hauteur</b> d’une image, elle se retrouve souvent <b>écrasée</b>. <code>object-fit</code> décide comment l’image <b>remplit son cadre</b> sans se déformer, et <code>aspect-ratio</code> impose un <b>rapport largeur/hauteur</b> constant à n’importe quelle boîte.',
    sections: [
      {
        id: 's1',
        title: 'object-fit : remplir sans déformer',
        blocks: [
          {
            type: 'situation',
            html: 'Mes vignettes ont toutes la même taille de cadre, mais les <b>images arrivent en portrait et en paysage</b> : résultat, elles sont <b>étirées et déformées</b>. Je veux qu’elles remplissent proprement.',
          },
          {
            type: 'paragraph',
            html: 'Par défaut, une image forcée à une taille se <b>déforme</b>. <code>object-fit: cover</code> la <b>recadre</b> pour remplir le cadre en gardant ses proportions ; <code>object-fit: contain</code> l’<b>affiche entière</b> quitte à laisser des vides.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-021-l-c1',
              filename: 'styles.css',
              language: 'css',
              code: `.vignette {
  width: 200px;
  height: 200px;
  object-fit: cover;    /* remplit le cadre, recadre le trop-plein */
}

.logo {
  width: 200px;
  height: 120px;
  object-fit: contain;  /* image entiere, sans rognage */
}`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>cover</code> = une photo qu’on <b>zoome pour remplir</b> un cadre (les bords dépassent et sont coupés). <code>contain</code> = la photo <b>entière posée</b> dans le cadre (des bandes vides autour si besoin).',
          },
        ],
      },
      {
        id: 's2',
        title: 'aspect-ratio : garder les proportions',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>aspect-ratio</code> fixe le <b>rapport largeur/hauteur</b> : il suffit de donner la largeur, la hauteur se calcule seule. Idéal pour des vignettes ou des vidéos en 16/9 qui gardent leur forme sur tous les écrans.',
          },
          {
            type: 'code',
            block: {
              id: 'CSS-F-021-l-c2',
              filename: 'styles.css',
              language: 'css',
              code: `/* Une vignette toujours carree */
.vignette {
  width: 100%;
  aspect-ratio: 1 / 1;   /* largeur = hauteur */
  object-fit: cover;
}

/* Un cadre video en 16/9 */
.video {
  width: 100%;
  aspect-ratio: 16 / 9;  /* hauteur calculee automatiquement */
}`,
            },
          },
          {
            type: 'table',
            headers: ['Propriété / valeur', 'Effet'],
            rows: [
              ['<code>object-fit: cover</code>', 'remplit le cadre, recadre le surplus'],
              ['<code>object-fit: contain</code>', 'image entière, laisse des vides'],
              ['<code>object-fit: fill</code>', 'étire pour remplir (déforme) — le défaut'],
              ['<code>aspect-ratio: 1 / 1</code>', 'cadre carré'],
              ['<code>aspect-ratio: 16 / 9</code>', 'format vidéo classique'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Le duo qui marche :</b> <code>aspect-ratio</code> fixe la <b>forme</b> du cadre, <code>object-fit: cover</code> garantit que l’image le <b>remplit</b> sans se déformer.',
          },
        ],
      },
    ],
    pitfalls: [
      'Fixer <code>width</code> et <code>height</code> sans <code>object-fit</code> : l’image s’<b>étire</b> (comportement par défaut <code>fill</code>).',
      'Utiliser <code>object-fit</code> sur autre chose qu’un média : il n’agit que sur <code>img</code>, <code>video</code>, etc. — pas sur une <code>div</code> de fond (là c’est <code>background-size</code>).',
      'Oublier de recadrer le point d’intérêt : avec <code>cover</code>, ajoute <code>object-position</code> pour choisir la partie gardée (ex. <code>object-position: top</code>).',
      'Croire <code>aspect-ratio</code> incompatible partout : il est bien supporté aujourd’hui, mais prévois une hauteur de secours si tu vises de très vieux navigateurs.',
    ],
    takeaways: [
      '<code>object-fit: cover</code> remplit le cadre en recadrant, sans déformer',
      '<code>object-fit: contain</code> montre l’image entière, avec des vides éventuels',
      'le défaut (<code>fill</code>) <b>étire</b> l’image : c’est ce qui déforme',
      '<code>aspect-ratio: 16 / 9</code> impose un rapport constant, hauteur calculée seule',
      'combo gagnant : <code>aspect-ratio</code> pour la forme + <code>object-fit: cover</code> pour le remplissage',
    ],
  }),
  template({
    id: 'CSS-F-021-TEMPLATE',
    slug: 'object-fit-aspect-ratio',
    title: 'object-fit & aspect-ratio',
    technology: 'css',
    tomeId: 't2',
    summary: 'Afficher des images proprement : remplir un cadre et garder un ratio.',
    lede: 'Maîtriser tes images. Choisis le cas :',
    aliases: ['object-fit', 'aspect-ratio', 'cover', 'image deformee'],
    keywords: ['object-fit', 'aspect-ratio', 'cover', 'ratio'],
    relatedContentIds: [],
    lessonId: 'CSS-F-021-LESSON',
    variants: [
      {
        id: 'vignette-cover',
        label: 'Vignette (cover)',
        codeBlocks: [
          {
            id: 'CSS-F-021-t-v1',
            filename: 'styles.css',
            language: 'css',
            code: `.vignette {
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: center;
}`,
          },
        ],
        replacements: [
          { token: '200px', description: 'la taille du cadre (largeur et hauteur)' },
          { token: 'center', description: 'la partie de l’image à garder (center, top…)' },
        ],
        placement: 'Pour des vignettes uniformes à partir d’images de tailles variées.',
      },
      {
        id: 'ratio',
        label: 'Cadre à ratio fixe',
        codeBlocks: [
          {
            id: 'CSS-F-021-t-v2',
            filename: 'styles.css',
            language: 'css',
            code: `.media {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}`,
          },
        ],
        replacements: [
          { token: '16 / 9', description: 'le rapport largeur/hauteur voulu (1/1, 4/3…)' },
          { token: '.media', description: 'l’image ou la vidéo à cadrer' },
        ],
        placement: 'Pour un cadre qui garde toujours la même forme, quelle que soit la largeur.',
      },
    ],
  }),
];
