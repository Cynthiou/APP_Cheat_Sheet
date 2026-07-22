import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const htmlContent: ReadyContent[] = [
  // ————— La structure d’une page HTML —————
  lesson({
    id: 'HTML-F-001-LESSON',
    slug: 'structure-page-html',
    title: 'La structure d’une page HTML',
    shortTitle: 'Structure HTML',
    technology: 'html',
    tomeId: 't2',
    summary:
      'Le squelette minimal d’une page web : doctype, html, head et body — les fondations que tout navigateur attend.',
    utility: 'Poser le squelette valide sur lequel viendra se greffer tout le contenu.',
    aliases: [
      'structure html',
      'squelette html',
      'boilerplate',
      'doctype',
      'head',
      'body',
      'html skeleton',
      'page structure',
    ],
    keywords: [
      'creer une page',
      'structure de base',
      'doctype html',
      'balise head',
      'balise body',
      'meta charset',
      'lang fr',
    ],
    relatedContentIds: [],
    templateId: 'HTML-F-001-TEMPLATE',
    intro:
      'Toute page web repose sur un <b>squelette</b> fixe. Le <code>&lt;!DOCTYPE html&gt;</code> annonce la version, <code>&lt;head&gt;</code> contient les infos invisibles (encodage, titre) et <code>&lt;body&gt;</code> contient tout ce qui s’affiche à l’écran.',
    sections: [
      {
        id: 's1',
        title: 'Le squelette de départ',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>créer une nouvelle page web à partir de zéro</b>, avec les fondations que tous les navigateurs attendent.',
          },
          {
            type: 'paragraph',
            html: 'Chaque page suit toujours le même schéma : une déclaration, une balise <code>&lt;html&gt;</code> qui enveloppe tout, un <code>&lt;head&gt;</code> pour la configuration et un <code>&lt;body&gt;</code> pour le contenu visible.',
          },
          {
            type: 'code',
            block: {
              id: 'html-struct-c1',
              filename: 'index.html',
              language: 'html',
              code: `<!DOCTYPE html>
<!-- Indique la langue de la page (utile pour l'accessibilite) -->
<html lang="fr">
  <head>
    <!-- Encodage des caracteres : accents, emojis... -->
    <meta charset="UTF-8" />
    <!-- Adapte la page a la largeur de l'ecran (mobile) -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Titre affiche dans l'onglet du navigateur -->
    <title>Ma page</title>
  </head>
  <body>
    <!-- Tout le contenu VISIBLE se place ici -->
    <h1>Bonjour !</h1>
  </body>
</html>`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une maison. Le <code>&lt;head&gt;</code> = le compteur électrique et les branchements (invisibles mais essentiels). Le <code>&lt;body&gt;</code> = les pièces où tu vis, celles que les invités voient.',
          },
        ],
      },
      {
        id: 's2',
        title: 'head ou body : où placer quoi ?',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <code>&lt;head&gt;</code> ne s’affiche pas : il configure la page. Le <code>&lt;body&gt;</code> contient tout ce qui apparaît à l’écran.',
          },
          {
            type: 'table',
            headers: ['Balise', 'Rôle', 'Où'],
            rows: [
              ['&lt;meta charset&gt;', 'encodage des caractères', 'head'],
              ['&lt;title&gt;', 'titre de l’onglet', 'head'],
              ['&lt;link&gt;', 'lier une feuille CSS', 'head'],
              ['&lt;h1&gt;, &lt;p&gt;…', 'contenu visible', 'body'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> une seule balise <code>&lt;h1&gt;</code> par page (le titre principal), et un <code>&lt;title&gt;</code> clair car c’est lui que voient Google et les onglets.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>&lt;meta charset="UTF-8"&gt;</code> : les accents s’affichent en caractères bizarres.',
      'Mettre du contenu visible dans le <code>&lt;head&gt;</code> : il ne s’affichera pas.',
      'Oublier <code>lang="fr"</code> sur <code>&lt;html&gt;</code> : mauvais pour l’accessibilité et le référencement.',
    ],
    takeaways: [
      '<code>&lt;!DOCTYPE html&gt;</code> en toute première ligne',
      '<code>&lt;head&gt;</code> = config invisible · <code>&lt;body&gt;</code> = contenu visible',
      'toujours <code>&lt;meta charset="UTF-8"&gt;</code> et un <code>&lt;title&gt;</code>',
    ],
  }),
  template({
    id: 'HTML-F-001-TEMPLATE',
    slug: 'structure-page-html',
    title: 'Structure HTML',
    technology: 'html',
    tomeId: 't2',
    summary: 'Le squelette d’une page HTML prêt à copier.',
    lede: 'Le squelette de page prêt à copier. Choisis la version :',
    aliases: ['structure html', 'squelette', 'boilerplate', 'doctype'],
    keywords: ['page de base', 'demarrer une page'],
    relatedContentIds: [],
    lessonId: 'HTML-F-001-LESSON',
    variants: [
      {
        id: 'minimal',
        label: 'Minimal',
        codeBlocks: [
          {
            id: 'html-struct-t-min',
            filename: 'index.html',
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>TITRE</title>
  </head>
  <body>
    <!-- Ton contenu ici -->
  </body>
</html>`,
          },
        ],
        replacements: [{ token: 'TITRE', description: 'le titre affiché dans l’onglet' }],
        placement: 'Quand tu veux démarrer une page rapidement, sans fioritures.',
      },
      {
        id: 'complet',
        label: 'Complet (recommandé)',
        codeBlocks: [
          {
            id: 'html-struct-t-full',
            filename: 'index.html',
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TITRE</title>
  </head>
  <body>
    <h1>TITRE</h1>
  </body>
</html>`,
          },
        ],
        replacements: [{ token: 'TITRE', description: 'le titre de ta page' }],
        placement: 'À utiliser par défaut : gère le mobile grâce à la balise viewport.',
      },
      {
        id: 'avec-css',
        label: 'Avec CSS lié',
        codeBlocks: [
          {
            id: 'html-struct-t-css',
            filename: 'index.html',
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TITRE</title>
    <!-- Lie une feuille de style externe -->
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>TITRE</h1>
  </body>
</html>`,
          },
        ],
        replacements: [
          { token: 'TITRE', description: 'le titre de ta page' },
          { token: 'style.css', description: 'le chemin de ta feuille de style' },
        ],
        placement: 'Quand tu ajoutes une feuille de style externe : le <link> va dans le head.',
      },
    ],
  }),

  // ————— Les balises courantes —————
  lesson({
    id: 'HTML-F-002-LESSON',
    slug: 'balises-courantes',
    title: 'Les balises courantes',
    shortTitle: 'Balises',
    technology: 'html',
    tomeId: 't2',
    summary:
      'Les balises du quotidien : titres, paragraphes, listes et conteneurs pour structurer le contenu d’une page.',
    utility: 'Organiser et hiérarchiser le texte d’une page avec les bonnes balises.',
    aliases: [
      'balises html',
      'titre',
      'paragraphe',
      'liste',
      'div',
      'span',
      'headings',
      'paragraph',
      'list',
    ],
    keywords: [
      'titre h1 h2',
      'paragraphe p',
      'liste a puces',
      'liste numerotee',
      'ul li',
      'div conteneur',
      'strong em',
    ],
    relatedContentIds: ['HTML-F-001-LESSON'],
    templateId: 'HTML-F-002-TEMPLATE',
    intro:
      'Une balise <b>entoure</b> un contenu pour lui donner un sens : <code>&lt;h1&gt;</code> pour un titre, <code>&lt;p&gt;</code> pour un paragraphe, <code>&lt;ul&gt;</code> pour une liste. Bien choisir sa balise, c’est structurer proprement.',
    sections: [
      {
        id: 's1',
        title: 'Titres et paragraphes',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>écrire un titre et un paragraphe de texte</b> correctement hiérarchisés sur ma page.',
          },
          {
            type: 'code',
            block: {
              id: 'html-bal-c1',
              filename: 'index.html',
              language: 'html',
              code: `<!-- Titre principal : un seul par page -->
<h1>Mon blog</h1>

<!-- Sous-titre de section -->
<h2>Dernier article</h2>

<!-- Un paragraphe de texte -->
<p>Bienvenue sur mon blog perso.</p>

<!-- Mise en valeur DANS un texte -->
<p>Un mot <strong>important</strong> et un mot <em>en italique</em>.</p>`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> les titres vont de <code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code>, dans l’ordre. On ne saute pas de <code>&lt;h1&gt;</code> à <code>&lt;h4&gt;</code> juste pour la taille (ça, c’est le rôle du CSS).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Listes et conteneurs',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'html-bal-c2',
              filename: 'index.html',
              language: 'html',
              code: `<!-- Liste a puces (unordered) -->
<ul>
  <li>Pommes</li>
  <li>Bananes</li>
</ul>

<!-- Liste numerotee (ordered) -->
<ol>
  <li>Premiere etape</li>
  <li>Deuxieme etape</li>
</ol>

<!-- div = conteneur de bloc pour grouper -->
<div>
  <p>Un groupe d'elements.</p>
</div>`,
            },
          },
          {
            type: 'table',
            headers: ['Balise', 'Rôle'],
            rows: [
              ['&lt;ul&gt; / &lt;ol&gt;', 'liste à puces / numérotée'],
              ['&lt;li&gt;', 'un élément de liste'],
              ['&lt;div&gt;', 'conteneur de bloc (groupe)'],
              ['&lt;span&gt;', 'conteneur en ligne (dans un texte)'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un <code>&lt;div&gt;</code> = un carton de déménagement (il prend toute la largeur). Un <code>&lt;span&gt;</code> = un surligneur sur un mot au milieu d’une phrase.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre un <code>&lt;li&gt;</code> en dehors d’un <code>&lt;ul&gt;</code> ou <code>&lt;ol&gt;</code> : toujours à l’intérieur.',
      'Choisir un titre pour sa taille (<code>&lt;h3&gt;</code> car « plus petit ») : la taille se règle en CSS, pas en choisissant la balise.',
      'Utiliser <code>&lt;div&gt;</code> partout alors qu’une balise sémantique (<code>&lt;ul&gt;</code>, <code>&lt;p&gt;</code>) existe.',
    ],
    takeaways: [
      '<code>&lt;h1&gt;</code>…<code>&lt;h6&gt;</code> pour les titres, dans l’ordre',
      '<code>&lt;p&gt;</code> paragraphe · <code>&lt;strong&gt;</code>/<code>&lt;em&gt;</code> pour mettre en valeur',
      '<code>&lt;ul&gt;</code>/<code>&lt;ol&gt;</code> + <code>&lt;li&gt;</code> pour les listes',
      '<code>&lt;div&gt;</code> = bloc · <code>&lt;span&gt;</code> = en ligne',
    ],
  }),
  template({
    id: 'HTML-F-002-TEMPLATE',
    slug: 'balises-courantes',
    title: 'Balises',
    technology: 'html',
    tomeId: 't2',
    summary: 'Les balises HTML de base prêtes à copier.',
    lede: 'Les balises du quotidien. Choisis le besoin :',
    aliases: ['balises', 'titre', 'paragraphe', 'liste', 'div'],
    keywords: ['h1', 'p', 'ul', 'li'],
    relatedContentIds: [],
    lessonId: 'HTML-F-002-LESSON',
    variants: [
      {
        id: 'titres',
        label: 'Titres et texte',
        codeBlocks: [
          {
            id: 'html-bal-t-titres',
            filename: 'index.html',
            language: 'html',
            code: `<h1>Titre principal</h1>
<h2>Sous-titre</h2>
<p>Un paragraphe de texte.</p>`,
          },
        ],
        replacements: [
          { token: 'Titre principal', description: 'le titre de ta page (un seul h1)' },
          { token: 'Un paragraphe de texte.', description: 'ton contenu' },
        ],
        placement: 'Pour du contenu textuel simple, dans le <body>.',
      },
      {
        id: 'liste-puces',
        label: 'Liste à puces',
        codeBlocks: [
          {
            id: 'html-bal-t-ul',
            filename: 'index.html',
            language: 'html',
            code: `<ul>
  <li>Element 1</li>
  <li>Element 2</li>
  <li>Element 3</li>
</ul>`,
          },
        ],
        replacements: [{ token: 'Element 1', description: 'chaque ligne de ta liste' }],
        placement: 'Quand l’ordre n’a pas d’importance (puces).',
      },
      {
        id: 'liste-num',
        label: 'Liste numérotée',
        codeBlocks: [
          {
            id: 'html-bal-t-ol',
            filename: 'index.html',
            language: 'html',
            code: `<ol>
  <li>Premiere etape</li>
  <li>Deuxieme etape</li>
</ol>`,
          },
        ],
        replacements: [{ token: 'Premiere etape', description: 'chaque étape ordonnée' }],
        placement: 'Quand l’ordre compte (étapes, classement).',
      },
      {
        id: 'conteneur',
        label: 'Conteneurs',
        codeBlocks: [
          {
            id: 'html-bal-t-div',
            filename: 'index.html',
            language: 'html',
            code: `<div class="carte">
  <h2>Titre de la carte</h2>
  <p>Texte avec un mot <span class="surligne">important</span>.</p>
</div>`,
          },
        ],
        replacements: [
          { token: 'carte', description: 'le nom de classe du conteneur' },
          { token: 'surligne', description: 'la classe du span en ligne' },
        ],
        placement: 'Pour grouper des éléments : <div> en bloc, <span> à l’intérieur d’un texte.',
      },
    ],
  }),

  // ————— Les liens et les images —————
  lesson({
    id: 'HTML-F-003-LESSON',
    slug: 'liens-images',
    title: 'Les liens et les images',
    shortTitle: 'Liens & images',
    technology: 'html',
    tomeId: 't2',
    summary:
      'Relier des pages avec &lt;a&gt; et afficher des visuels avec &lt;img&gt; : les deux balises qui donnent vie à une page.',
    utility: 'Naviguer entre les pages et afficher des images.',
    aliases: [
      'lien html',
      'ancre',
      'href',
      'image html',
      'img',
      'src',
      'alt',
      'link',
      'image',
      'anchor',
    ],
    keywords: [
      'creer un lien',
      'balise a href',
      'ouvrir dans un nouvel onglet',
      'afficher une image',
      'balise img src',
      'texte alternatif alt',
      'lien vers une page',
    ],
    relatedContentIds: ['HTML-F-002-LESSON'],
    templateId: 'HTML-F-003-TEMPLATE',
    intro:
      'La balise <code>&lt;a&gt;</code> crée un <b>lien</b> vers une autre page grâce à <code>href</code>. La balise <code>&lt;img&gt;</code> affiche une <b>image</b> via <code>src</code>, avec un texte de secours <code>alt</code>.',
    sections: [
      {
        id: 's1',
        title: 'Créer un lien',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>ajouter un lien cliquable</b> qui envoie vers un autre site, en l’ouvrant dans un nouvel onglet.',
          },
          {
            type: 'code',
            block: {
              id: 'html-lien-c1',
              filename: 'index.html',
              language: 'html',
              code: `<!-- Lien vers un site externe -->
<a href="https://example.com">Visiter le site</a>

<!-- Lien vers une autre page du site -->
<a href="contact.html">Contact</a>

<!-- Ouvrir dans un nouvel onglet (target) -->
<!-- rel="noopener" pour la securite -->
<a href="https://example.com" target="_blank" rel="noopener">
  Nouvel onglet
</a>`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> pour un lien externe ouvert dans un nouvel onglet (<code>target="_blank"</code>), ajoute toujours <code>rel="noopener"</code> — c’est plus sûr.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Afficher une image',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'html-lien-c2',
              filename: 'index.html',
              language: 'html',
              code: `<!-- src = chemin de l'image, alt = texte de secours -->
<img src="chat.jpg" alt="Un chat roux endormi" />

<!-- Image cliquable : on entoure l'img d'un lien -->
<a href="galerie.html">
  <img src="miniature.jpg" alt="Voir la galerie" />
</a>`,
            },
          },
          {
            type: 'table',
            headers: ['Attribut', 'Rôle'],
            rows: [
              ['href', 'destination du lien (&lt;a&gt;)'],
              ['src', 'chemin de l’image (&lt;img&gt;)'],
              ['alt', 'texte affiché si l’image ne charge pas'],
              ['target="_blank"', 'ouvrir dans un nouvel onglet'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> l’attribut <code>alt</code> = la légende qu’un ami te lit au téléphone quand tu ne vois pas la photo. Indispensable pour l’accessibilité.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>alt</code> sur une <code>&lt;img&gt;</code> : mauvais pour l’accessibilité et le référencement.',
      'Se tromper de chemin dans <code>src</code> ou <code>href</code> : l’image ne s’affiche pas, le lien ne mène nulle part.',
      'Mettre <code>target="_blank"</code> sans <code>rel="noopener"</code> : petit risque de sécurité.',
    ],
    takeaways: [
      '<code>&lt;a href="..."&gt;texte&lt;/a&gt;</code> pour un lien',
      '<code>&lt;img src="..." alt="..." /&gt;</code> pour une image',
      'toujours un <code>alt</code> descriptif sur les images',
      '<code>target="_blank"</code> + <code>rel="noopener"</code> pour un nouvel onglet',
    ],
  }),
  template({
    id: 'HTML-F-003-TEMPLATE',
    slug: 'liens-images',
    title: 'Liens & images',
    technology: 'html',
    tomeId: 't2',
    summary: 'Les balises de lien et d’image prêtes à copier.',
    lede: 'Lier une page ou afficher un visuel. Choisis le cas :',
    aliases: ['lien', 'image', 'href', 'img', 'src'],
    keywords: ['a href', 'img alt', 'nouvel onglet'],
    relatedContentIds: [],
    lessonId: 'HTML-F-003-LESSON',
    variants: [
      {
        id: 'lien-simple',
        label: 'Lien simple',
        codeBlocks: [
          {
            id: 'html-lien-t-a',
            filename: 'index.html',
            language: 'html',
            code: `<a href="https://example.com">Texte du lien</a>`,
          },
        ],
        replacements: [
          { token: 'https://example.com', description: 'l’adresse de destination' },
          { token: 'Texte du lien', description: 'le texte cliquable' },
        ],
        placement: 'Pour un lien classique vers une page.',
      },
      {
        id: 'lien-onglet',
        label: 'Nouvel onglet',
        codeBlocks: [
          {
            id: 'html-lien-t-blank',
            filename: 'index.html',
            language: 'html',
            code: `<a href="https://example.com" target="_blank" rel="noopener">
  Texte du lien
</a>`,
          },
        ],
        replacements: [
          { token: 'https://example.com', description: 'l’adresse externe' },
          { token: 'Texte du lien', description: 'le texte cliquable' },
        ],
        placement: 'Pour un lien externe qui s’ouvre à côté, sans quitter ta page.',
      },
      {
        id: 'image',
        label: 'Image',
        codeBlocks: [
          {
            id: 'html-lien-t-img',
            filename: 'index.html',
            language: 'html',
            code: `<img src="image.jpg" alt="Description de l'image" />`,
          },
        ],
        replacements: [
          { token: 'image.jpg', description: 'le chemin de ton image' },
          { token: "Description de l'image", description: 'le texte alternatif (accessibilité)' },
        ],
        placement: 'Pour afficher un visuel. Toujours renseigner alt.',
      },
      {
        id: 'image-lien',
        label: 'Image cliquable',
        codeBlocks: [
          {
            id: 'html-lien-t-imglink',
            filename: 'index.html',
            language: 'html',
            code: `<a href="page.html">
  <img src="miniature.jpg" alt="Voir la page" />
</a>`,
          },
        ],
        replacements: [
          { token: 'page.html', description: 'la destination du clic' },
          { token: 'miniature.jpg', description: 'l’image à afficher' },
        ],
        placement: 'Quand une image doit servir de lien : on l’entoure d’une balise <a>.',
      },
    ],
  }),

  // ————— Les formulaires HTML —————
  lesson({
    id: 'HTML-F-004-LESSON',
    slug: 'formulaires-html',
    title: 'Les formulaires HTML',
    shortTitle: 'Formulaires',
    technology: 'html',
    tomeId: 't2',
    summary:
      'Collecter des données de l’utilisateur : champs, cases, boutons, le tout regroupé dans une balise &lt;form&gt;.',
    utility: 'Recueillir des informations saisies par l’utilisateur (connexion, contact…).',
    aliases: [
      'formulaire html',
      'form',
      'input',
      'champ de saisie',
      'label',
      'bouton envoyer',
      'submit',
      'checkbox',
      'radio',
    ],
    keywords: [
      'creer un formulaire',
      'champ texte input',
      'email et mot de passe',
      'case a cocher',
      'bouton radio',
      'bouton envoyer submit',
      'label for',
    ],
    relatedContentIds: ['HTML-F-002-LESSON'],
    templateId: 'HTML-F-004-TEMPLATE',
    intro:
      'Un <b>formulaire</b> (<code>&lt;form&gt;</code>) regroupe des <b>champs</b> pour recueillir des données. Chaque champ (<code>&lt;input&gt;</code>) est décrit par un <code>&lt;label&gt;</code>, et un bouton <code>submit</code> envoie le tout.',
    sections: [
      {
        id: 's1',
        title: 'Un champ avec son label',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>demander le prénom de l’utilisateur</b> dans un champ de saisie clairement étiqueté.',
          },
          {
            type: 'code',
            block: {
              id: 'html-form-c1',
              filename: 'index.html',
              language: 'html',
              code: `<form>
  <!-- Le label decrit le champ. for = id de l'input -->
  <label for="prenom">Prenom</label>
  <!-- name = nom envoye, type = genre de champ -->
  <input type="text" id="prenom" name="prenom" />
</form>`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> relie toujours un <code>&lt;label&gt;</code> à son champ via <code>for="id"</code>. Cliquer sur le label place alors le curseur dans le champ — et c’est essentiel pour l’accessibilité.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les types de champs et l’envoi',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'html-form-c2',
              filename: 'index.html',
              language: 'html',
              code: `<form>
  <label for="email">Email</label>
  <!-- type="email" -> clavier et validation adaptes -->
  <input type="email" id="email" name="email" required />

  <label for="mdp">Mot de passe</label>
  <!-- type="password" -> masque la saisie -->
  <input type="password" id="mdp" name="mdp" />

  <!-- Bouton qui envoie le formulaire -->
  <button type="submit">Se connecter</button>
</form>`,
            },
          },
          {
            type: 'table',
            headers: ['type', 'Champ obtenu'],
            rows: [
              ['text', 'texte libre sur une ligne'],
              ['email', 'adresse email (avec validation)'],
              ['password', 'saisie masquée'],
              ['checkbox', 'case à cocher'],
              ['radio', 'choix unique dans un groupe'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> un formulaire papier au guichet. Les <code>&lt;input&gt;</code> = les cases à remplir, le <code>&lt;label&gt;</code> = l’intitulé au-dessus, le bouton <code>submit</code> = quand tu déposes la feuille au guichet.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier l’attribut <code>name</code> sur un champ : sa valeur ne sera pas envoyée.',
      'Ne pas relier <code>&lt;label&gt;</code> et champ (<code>for</code> ↔ <code>id</code>) : nuit à l’accessibilité.',
      'Utiliser <code>type="text"</code> pour un email : tu perds la validation et le bon clavier mobile.',
    ],
    takeaways: [
      '<code>&lt;form&gt;</code> enveloppe les champs',
      'chaque champ : un <code>&lt;label for&gt;</code> + un <code>&lt;input id name type&gt;</code>',
      'le bon <code>type</code> (email, password…) améliore saisie et validation',
      '<code>&lt;button type="submit"&gt;</code> envoie le formulaire',
    ],
  }),
  template({
    id: 'HTML-F-004-TEMPLATE',
    slug: 'formulaires-html',
    title: 'Formulaires',
    technology: 'html',
    tomeId: 't2',
    summary: 'Les briques de formulaire HTML prêtes à copier.',
    lede: 'Recueillir une saisie. Choisis le type de champ :',
    aliases: ['formulaire', 'form', 'input', 'champ', 'submit'],
    keywords: ['champ texte', 'email mot de passe', 'case a cocher', 'radio', 'envoyer'],
    relatedContentIds: [],
    lessonId: 'HTML-F-004-LESSON',
    variants: [
      {
        id: 'champ-texte',
        label: 'Champ texte',
        codeBlocks: [
          {
            id: 'html-form-t-text',
            filename: 'index.html',
            language: 'html',
            code: `<label for="prenom">Prenom</label>
<input type="text" id="prenom" name="prenom" placeholder="Ton prenom" />`,
          },
        ],
        replacements: [
          { token: 'prenom', description: 'l’id et le name du champ (identiques)' },
          { token: 'Prenom', description: 'l’étiquette visible' },
          { token: 'Ton prenom', description: 'le texte d’aide (placeholder)' },
        ],
        placement: 'Pour un texte libre sur une ligne (nom, ville…).',
      },
      {
        id: 'email-mdp',
        label: 'Email + mot de passe',
        codeBlocks: [
          {
            id: 'html-form-t-login',
            filename: 'index.html',
            language: 'html',
            code: `<label for="email">Email</label>
<input type="email" id="email" name="email" required />

<label for="mdp">Mot de passe</label>
<input type="password" id="mdp" name="mdp" required />`,
          },
        ],
        replacements: [
          { token: 'email', description: 'l’id/name du champ email' },
          { token: 'mdp', description: 'l’id/name du champ mot de passe' },
        ],
        placement: 'La base d’un formulaire de connexion. required rend le champ obligatoire.',
      },
      {
        id: 'case-radio',
        label: 'Case à cocher / radio',
        codeBlocks: [
          {
            id: 'html-form-t-check',
            filename: 'index.html',
            language: 'html',
            code: `<!-- Case a cocher : plusieurs choix possibles -->
<label>
  <input type="checkbox" name="cgu" />
  J'accepte les conditions
</label>

<!-- Radio : un seul choix, meme name pour le groupe -->
<label><input type="radio" name="taille" value="s" /> S</label>
<label><input type="radio" name="taille" value="m" /> M</label>`,
          },
        ],
        replacements: [
          { token: 'cgu', description: 'le name de la case à cocher' },
          { token: 'taille', description: 'le name commun au groupe de radios' },
          { token: 'value="s"', description: 'la valeur envoyée pour ce choix' },
        ],
        placement: 'Checkbox = plusieurs choix indépendants. Radio = un seul choix (même name).',
      },
      {
        id: 'envoi',
        label: 'Envoi (form complet)',
        codeBlocks: [
          {
            id: 'html-form-t-submit',
            filename: 'index.html',
            language: 'html',
            code: `<form action="/connexion" method="post">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />

  <button type="submit">Envoyer</button>
</form>`,
          },
        ],
        replacements: [
          { token: '/connexion', description: 'l’URL qui reçoit les données (action)' },
          { token: 'post', description: 'la méthode HTTP (post ou get)' },
        ],
        placement: 'Le formulaire complet : action indique où envoyer, method comment envoyer.',
      },
    ],
  }),
];
