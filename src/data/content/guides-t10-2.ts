import type { ReadyContent } from '@/types/content';
import { guide } from './_factory';

export const guidesT102Content: ReadyContent[] = [
  // ————— Créer un carrousel ou slider —————
  guide({
    id: 'GUIDE-W6-107',
    slug: 'creer-un-carrousel-ou-slider',
    title: 'Créer un carrousel ou slider',
    shortTitle: 'Carrousel',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Faire défiler une série d’images une par une, avec des flèches précédent / suivant et un state d’index.',
    objective: 'Un carrousel qui affiche une image à la fois et défile au clic.',
    preview:
      'Une grande image au centre, deux flèches « ‹ » et « › » sur les côtés ; cliquer change l’image affichée, en boucle.',
    aliases: ['carrousel', 'carousel', 'slider', 'diaporama', 'slideshow'],
    keywords: ['carrousel', 'slider', 'image suivante', 'index actif', 'defilement'],
    relatedContentIds: [],
    files: ['Carrousel.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-107-e1',
        title: 'Un state pour l’index affiché',
        goal: 'Mémoriser quelle image est visible.',
        explanation:
          'Le carrousel ne montre qu’<b>une</b> image à la fois : il suffit donc de retenir sa position dans le tableau. On stocke cet index dans un <code>useState</code> initialisé à <code>0</code> (la première image). Comme c’est un state, chaque changement d’index redéclenche l’affichage automatiquement.',
        files: ['Carrousel.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-107-cb1',
            filename: 'Carrousel.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

// La liste des images à faire défiler
const images = [
  "/photos/1.jpg",
  "/photos/2.jpg",
  "/photos/3.jpg",
];

// index = position de l'image actuellement affichée
const [index, setIndex] = useState(0);`,
          },
        ],
        result: 'React sait en permanence quelle image montrer.',
      },
      {
        id: 'GUIDE-W6-107-e2',
        title: 'Afficher l’image active',
        goal: 'Montrer uniquement l’image correspondant à l’index.',
        explanation:
          'On n’affiche pas toutes les images : on pioche seulement <code>images[index]</code>. Le reste du tableau existe toujours, mais on n’en montre qu’un élément. C’est ce qui donne l’impression d’un seul visuel qui change.',
        files: ['Carrousel.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-107-cb2',
            filename: 'Carrousel.tsx',
            language: 'tsx',
            code: `<div className="carrousel">
  {/* On affiche seulement l'image dont la position est index */}
  <img src={images[index]} alt={"Image " + (index + 1)} />
</div>`,
          },
        ],
        result: 'Une seule image s’affiche à la fois, celle de l’index courant.',
      },
      {
        id: 'GUIDE-W6-107-e3',
        title: 'Les flèches précédent / suivant',
        goal: 'Changer d’image au clic, en bouclant.',
        explanation:
          'Chaque flèche modifie l’index. L’astuce pour <b>boucler</b> sans jamais sortir du tableau est le modulo <code>%</code> : pour avancer on fait <code>(index + 1) % longueur</code>, ce qui ramène à <code>0</code> après la dernière image. Pour reculer, on ajoute <code>longueur</code> avant le modulo afin d’éviter un index négatif.',
        files: ['Carrousel.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-107-cb3',
            filename: 'Carrousel.tsx',
            language: 'tsx',
            code: `const total = images.length;

// Avancer : après la dernière image, on revient à la première
const suivant = () => setIndex((index + 1) % total);

// Reculer : + total évite un index négatif avant le modulo
const precedent = () => setIndex((index - 1 + total) % total);

<button type="button" onClick={precedent}>‹</button>
<button type="button" onClick={suivant}>›</button>`,
          },
        ],
        result: 'Les flèches font défiler les images en boucle, sans erreur de bornes.',
      },
      {
        id: 'GUIDE-W6-107-e4',
        title: 'Des puces indicatrices',
        goal: 'Montrer la position et permettre un saut direct.',
        explanation:
          'Sous l’image, on affiche une puce par photo avec un <code>map</code>. On compare la position de chaque puce à <code>index</code> pour lui donner une classe <code>active</code>, ce qui la met en évidence. Cliquer sur une puce appelle <code>setIndex</code> avec sa position : on saute directement à cette image.',
        files: ['Carrousel.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-107-cb4',
            filename: 'Carrousel.tsx',
            language: 'tsx',
            code: `<div className="puces">
  {images.map((_, i) => (
    <button
      key={i}
      type="button"
      // La puce de la photo courante est mise en avant
      className={i === index ? "puce active" : "puce"}
      onClick={() => setIndex(i)}
    />
  ))}
</div>`,
          },
        ],
        result: 'On visualise la position courante et on peut sauter à n’importe quelle image.',
      },
    ],
    finalResult:
      'Un carrousel complet : un state d’index, une image active, des flèches qui bouclent avec le modulo et des puces de navigation — sans aucune librairie.',
    pitfalls: [
      'Oublier le modulo : arrivé à la dernière image, « Suivant » afficherait un index inexistant et une image vide.',
      'Faire défiler automatiquement sans setInterval nettoyé : pense à un useEffect avec un clearInterval dans le retour.',
    ],
    variations: [
      'Ajouter un défilement automatique toutes les 4 secondes (useEffect + setInterval).',
      'Permettre le glissement au doigt sur mobile (événements touch).',
      'Animer la transition entre deux images en CSS (opacity ou translateX).',
    ],
  }),

  // ————— Créer une galerie d’images avec lightbox —————
  guide({
    id: 'GUIDE-W6-108',
    slug: 'creer-une-galerie-d-images-avec-lightbox',
    title: 'Créer une galerie d’images avec lightbox',
    shortTitle: 'Galerie lightbox',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Afficher une grille de miniatures et, au clic, ouvrir l’image en grand par-dessus la page.',
    objective: 'Une galerie de vignettes qui ouvre l’image cliquée en plein écran.',
    preview:
      'Une grille de petites images ; cliquer sur l’une d’elles l’affiche en grand sur un fond sombre, refermable au clic.',
    aliases: ['galerie', 'gallery', 'lightbox', 'grille images', 'zoom image'],
    keywords: ['galerie images', 'lightbox', 'grille', 'agrandir image', 'overlay'],
    relatedContentIds: [],
    files: ['Galerie.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-108-e1',
        title: 'Afficher la grille de miniatures',
        goal: 'Boucler sur les images pour créer la grille.',
        explanation:
          'On part d’un tableau d’images et on le parcourt avec <code>map</code> pour afficher une vignette chacune. Chaque miniature reçoit une <code>key</code> unique, indispensable pour que React suive correctement la liste. La mise en grille se fait ensuite en CSS (par exemple un <code>display: grid</code>).',
        files: ['Galerie.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-108-cb1',
            filename: 'Galerie.tsx',
            language: 'tsx',
            code: `const images = [
  { id: 1, src: "/photos/1.jpg", alt: "Plage" },
  { id: 2, src: "/photos/2.jpg", alt: "Montagne" },
  { id: 3, src: "/photos/3.jpg", alt: "Forêt" },
];

<div className="grille">
  {images.map((img) => (
    <img key={img.id} src={img.src} alt={img.alt} className="vignette" />
  ))}
</div>`,
          },
        ],
        result: 'Toutes les miniatures s’affichent dans une grille.',
      },
      {
        id: 'GUIDE-W6-108-e2',
        title: 'Un state pour l’image agrandie',
        goal: 'Retenir quelle image est ouverte en grand.',
        explanation:
          'La lightbox est soit fermée, soit ouverte sur une image précise. On stocke donc l’image sélectionnée dans un state : <code>null</code> quand rien n’est ouvert, ou l’objet image cliqué sinon. Ce seul state suffit à savoir si la lightbox doit s’afficher et quoi montrer.',
        files: ['Galerie.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-108-cb2',
            filename: 'Galerie.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

type Image = { id: number; src: string; alt: string };

// null = lightbox fermée ; un objet = image ouverte en grand
const [active, setActive] = useState<Image | null>(null);`,
          },
        ],
        result: 'On peut mémoriser l’image ouverte, ou l’absence d’ouverture.',
      },
      {
        id: 'GUIDE-W6-108-e3',
        title: 'Ouvrir au clic sur une vignette',
        goal: 'Sélectionner l’image cliquée.',
        explanation:
          'On ajoute un <code>onClick</code> sur chaque miniature qui appelle <code>setActive</code> avec l’objet image correspondant. À partir de là, le state <code>active</code> contient l’image voulue et n’est plus <code>null</code> : la lightbox pourra donc s’afficher à l’étape suivante.',
        files: ['Galerie.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-108-cb3',
            filename: 'Galerie.tsx',
            language: 'tsx',
            code: `{images.map((img) => (
  <img
    key={img.id}
    src={img.src}
    alt={img.alt}
    className="vignette"
    // Au clic, on mémorise l'image à afficher en grand
    onClick={() => setActive(img)}
  />
))}`,
          },
        ],
        result: 'Cliquer une vignette enregistre l’image à agrandir.',
      },
      {
        id: 'GUIDE-W6-108-e4',
        title: 'Afficher la lightbox',
        goal: 'Montrer l’image en grand sur un fond sombre, refermable.',
        explanation:
          'On affiche la lightbox seulement si <code>active</code> existe, grâce au rendu conditionnel <code>{active && ( … )}</code>. Le fond sombre <code>.lightbox</code> recouvre la page et son <code>onClick</code> remet <code>active</code> à <code>null</code> pour refermer. On met <code>stopPropagation</code> sur l’image pour qu’un clic <b>sur</b> la photo ne referme pas la fenêtre.',
        files: ['Galerie.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-108-cb4',
            filename: 'Galerie.tsx',
            language: 'tsx',
            code: `{active && (
  <div className="lightbox" onClick={() => setActive(null)}>
    {/* stopPropagation : cliquer l'image ne ferme pas le fond */}
    <img
      src={active.src}
      alt={active.alt}
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}`,
          },
        ],
        result: 'L’image cliquée s’ouvre en grand et se ferme au clic sur le fond.',
      },
    ],
    finalResult:
      'Une galerie complète : une grille de miniatures, un state pour l’image active et une lightbox conditionnelle qui s’ouvre au clic et se referme sur le fond sombre.',
    pitfalls: [
      'Oublier stopPropagation sur l’image : le moindre clic dessus refermerait la lightbox.',
      'Utiliser l’index du map comme key alors que la liste peut changer : préfère un id stable.',
    ],
    variations: [
      'Naviguer entre images dans la lightbox avec des flèches (comme le carrousel).',
      'Fermer avec la touche Échap (useEffect + keydown).',
      'Charger les grandes images seulement à l’ouverture pour alléger la page.',
    ],
  }),

  // ————— Créer une barre de progression —————
  guide({
    id: 'GUIDE-W6-109',
    slug: 'creer-une-barre-de-progression',
    title: 'Créer une barre de progression',
    shortTitle: 'Barre de progression',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Afficher visuellement un pourcentage d’avancement avec une barre qui se remplit selon un state.',
    objective: 'Une barre qui se remplit de 0 à 100 % selon une valeur.',
    preview:
      'Une barre grise qui se remplit en couleur au fur et à mesure, avec le pourcentage affiché à côté.',
    aliases: ['barre de progression', 'progress bar', 'progression', 'pourcentage', 'jauge'],
    keywords: ['barre progression', 'progress bar', 'pourcentage', 'avancement', 'width dynamique'],
    relatedContentIds: [],
    files: ['Progression.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-109-e1',
        title: 'Un state pour le pourcentage',
        goal: 'Stocker la valeur d’avancement.',
        explanation:
          'La barre reflète une seule donnée : un nombre entre <code>0</code> et <code>100</code>. On le met dans un <code>useState</code> pour que la barre se redessine à chaque changement. On part ici de <code>30</code> pour voir tout de suite un remplissage partiel.',
        files: ['Progression.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-109-cb1',
            filename: 'Progression.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

// valeur = pourcentage d'avancement, entre 0 et 100
const [valeur, setValeur] = useState(30);`,
          },
        ],
        result: 'On dispose d’une valeur pilotable pour l’avancement.',
      },
      {
        id: 'GUIDE-W6-109-e2',
        title: 'Structurer la barre en HTML',
        goal: 'Créer une piste et un remplissage.',
        explanation:
          'La barre se compose de deux éléments imbriqués : une <b>piste</b> extérieure (le fond gris, largeur fixe) et un <b>remplissage</b> intérieur dont la largeur variera. C’est cette largeur intérieure, exprimée en pourcentage, qui donnera l’effet de progression. On la stylise en CSS pour la couleur et la hauteur.',
        files: ['Progression.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-109-cb2',
            filename: 'Progression.tsx',
            language: 'css',
            code: `/* La piste : le fond gris de la barre */
.piste {
  width: 100%;
  height: 16px;
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

/* Le remplissage : la partie colorée qui grandit */
.remplissage {
  height: 100%;
  background: #2563eb;
  transition: width 0.3s; /* rend l'évolution fluide */
}`,
          },
        ],
        result: 'La structure visuelle de la barre est prête.',
      },
      {
        id: 'GUIDE-W6-109-e3',
        title: 'Lier la largeur au state',
        goal: 'Faire varier le remplissage selon la valeur.',
        explanation:
          'On applique la valeur au style en ligne du remplissage : sa <code>width</code> devient la valeur suivie de <code>"%"</code>. Comme <code>valeur</code> est un state, chaque mise à jour recalcule la largeur et la barre bouge toute seule. On ajoute des attributs <code>role</code> et <code>aria</code> pour l’accessibilité.',
        files: ['Progression.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-109-cb3',
            filename: 'Progression.tsx',
            language: 'tsx',
            code: `<div className="piste">
  <div
    className="remplissage"
    // La largeur suit directement la valeur du state
    style={{ width: valeur + "%" }}
    role="progressbar"
    aria-valuenow={valeur}
    aria-valuemin={0}
    aria-valuemax={100}
  />
</div>
<span>{valeur}%</span>`,
          },
        ],
        result: 'La barre se remplit proportionnellement à la valeur.',
      },
      {
        id: 'GUIDE-W6-109-e4',
        title: 'Faire évoluer la valeur',
        goal: 'Incrémenter sans jamais dépasser 100.',
        explanation:
          'Un bouton (ou un vrai téléchargement) fait progresser la valeur. On borne avec <code>Math.min(valeur + 10, 100)</code> pour ne jamais dépasser <code>100 %</code>, sinon la barre déborderait de sa piste. Le même principe avec <code>Math.max(..., 0)</code> permettrait de reculer sans passer sous zéro.',
        files: ['Progression.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-109-cb4',
            filename: 'Progression.tsx',
            language: 'tsx',
            code: `// Math.min borne la valeur : elle ne dépasse jamais 100
const avancer = () => setValeur(Math.min(valeur + 10, 100));

<button type="button" onClick={avancer}>+ 10 %</button>`,
          },
        ],
        result: 'La barre avance par paliers et se bloque proprement à 100 %.',
      },
    ],
    finalResult:
      'Une barre de progression réutilisable : un state en pourcentage, une piste et un remplissage dont la largeur suit la valeur, bornée entre 0 et 100 %.',
    pitfalls: [
      'Oublier de borner à 100 : le remplissage dépasserait visuellement sa piste.',
      'Mettre une valeur hors de l’intervalle 0–100 : la barre paraît vide ou débordante.',
    ],
    variations: [
      'Brancher la valeur sur la vraie progression d’un upload (onUploadProgress d’Axios).',
      'Changer la couleur selon le seuil (rouge sous 30 %, vert au-dessus de 70 %).',
      'Afficher une barre indéterminée (animation) quand le total est inconnu.',
    ],
  }),

  // ————— Créer un tooltip —————
  guide({
    id: 'GUIDE-W6-110',
    slug: 'creer-un-tooltip',
    title: 'Créer un tooltip',
    shortTitle: 'Tooltip',
    technology: 'react',
    tomeId: 't10',
    summary:
      'Afficher une petite bulle d’aide au survol d’un élément, pilotée par un state de survol.',
    objective: 'Une infobulle qui apparaît au survol et disparaît quand on s’en va.',
    preview:
      'Passer la souris sur un bouton fait apparaître une petite bulle de texte juste au-dessus.',
    aliases: ['tooltip', 'infobulle', 'bulle aide', 'info-bulle', 'title'],
    keywords: ['tooltip', 'infobulle', 'survol', 'hover', 'bulle aide'],
    relatedContentIds: [],
    files: ['Tooltip.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-110-e1',
        title: 'Un state de survol',
        goal: 'Mémoriser si la souris est sur l’élément.',
        explanation:
          'Un tooltip n’a que deux états : visible ou caché. Un booléen suffit donc, stocké dans un <code>useState</code> initialisé à <code>false</code> (caché au départ). C’est ce state qui décidera d’afficher ou non la bulle.',
        files: ['Tooltip.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-110-cb1',
            filename: 'Tooltip.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

// visible = true quand la souris survole l'élément
const [visible, setVisible] = useState(false);`,
          },
        ],
        result: 'React sait si la souris survole l’élément.',
      },
      {
        id: 'GUIDE-W6-110-e2',
        title: 'Détecter l’entrée et la sortie de la souris',
        goal: 'Basculer le state au survol.',
        explanation:
          'On enveloppe l’élément dans un conteneur qui écoute deux événements : <code>onMouseEnter</code> passe <code>visible</code> à <code>true</code> quand la souris arrive, et <code>onMouseLeave</code> le remet à <code>false</code> quand elle repart. Le conteneur est en <code>position: relative</code> pour servir de repère au positionnement de la bulle.',
        files: ['Tooltip.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-110-cb2',
            filename: 'Tooltip.tsx',
            language: 'tsx',
            code: `<span
  className="tooltip-conteneur"
  // La souris entre : on montre la bulle
  onMouseEnter={() => setVisible(true)}
  // La souris part : on la cache
  onMouseLeave={() => setVisible(false)}
>
  <button type="button">Survole-moi</button>
</span>`,
          },
        ],
        result: 'Le state bascule à l’entrée et à la sortie de la souris.',
      },
      {
        id: 'GUIDE-W6-110-e3',
        title: 'Afficher la bulle conditionnellement',
        goal: 'Montrer le texte seulement au survol.',
        explanation:
          'Grâce au rendu conditionnel <code>{visible && ( … )}</code>, la bulle n’existe dans la page que lorsque <code>visible</code> vaut <code>true</code>. On la place à l’intérieur du conteneur pour pouvoir la positionner par rapport à lui à l’étape suivante.',
        files: ['Tooltip.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-110-cb3',
            filename: 'Tooltip.tsx',
            language: 'tsx',
            code: `<span
  className="tooltip-conteneur"
  onMouseEnter={() => setVisible(true)}
  onMouseLeave={() => setVisible(false)}
>
  <button type="button">Survole-moi</button>

  {/* La bulle n'apparaît que si visible est vrai */}
  {visible && <span className="bulle">Voici une aide</span>}
</span>`,
          },
        ],
        result: 'Le texte d’aide apparaît et disparaît avec le survol.',
      },
      {
        id: 'GUIDE-W6-110-e4',
        title: 'Positionner la bulle en CSS',
        goal: 'Placer la bulle juste au-dessus de l’élément.',
        explanation:
          'La bulle est en <code>position: absolute</code> par rapport au conteneur <code>relative</code>. On la colle au-dessus avec <code>bottom: 100%</code> et on la centre avec <code>left: 50%</code> puis <code>transform: translateX(-50%)</code>. Le <code>white-space: nowrap</code> évite que le texte court passe à la ligne.',
        files: ['Tooltip.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-110-cb4',
            filename: 'Tooltip.tsx',
            language: 'css',
            code: `.tooltip-conteneur {
  position: relative; /* repère pour la bulle */
  display: inline-block;
}

.bulle {
  position: absolute;
  bottom: 100%;            /* juste au-dessus de l'élément */
  left: 50%;
  transform: translateX(-50%); /* centrage horizontal */
  margin-bottom: 8px;
  background: #111827;
  color: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  white-space: nowrap;     /* le texte reste sur une ligne */
  font-size: 13px;
}`,
          },
        ],
        result: 'La bulle s’affiche proprement centrée au-dessus de l’élément.',
      },
    ],
    finalResult:
      'Un tooltip réutilisable : un state booléen de survol, les événements onMouseEnter / onMouseLeave, un rendu conditionnel et un positionnement CSS absolu au-dessus de l’élément.',
    pitfalls: [
      'Oublier position: relative sur le conteneur : la bulle se positionnerait par rapport à toute la page.',
      'Se reposer uniquement sur le survol : au clavier ou sur mobile, ajoute onFocus / onBlur pour l’accessibilité.',
    ],
    variations: [
      'Ouvrir aussi au focus clavier (onFocus / onBlur) pour l’accessibilité.',
      'Placer la bulle en dessous ou sur le côté selon la place disponible.',
      'Ajouter un petit délai avant l’apparition (setTimeout dans un useEffect).',
    ],
  }),
];
