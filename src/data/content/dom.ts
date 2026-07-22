import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const domContent: ReadyContent[] = [
  // ————— Sélectionner un élément : querySelector —————
  lesson({
    id: 'DOM-F-1100-LESSON',
    slug: 'selectionner-un-element-queryselector',
    title: 'Sélectionner un élément : querySelector',
    shortTitle: 'querySelector',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Aller chercher un élément HTML depuis le JavaScript pour pouvoir le lire ou le modifier, grâce à querySelector.',
    utility: 'Attraper un élément du HTML pour agir dessus depuis le JavaScript.',
    aliases: ['queryselector', 'selectionner', 'getelementbyid', 'cibler', 'dom', 'attraper un element'],
    keywords: [
      'recuperer un element html',
      'cibler un bouton',
      'selectionner par classe',
      'point diese',
      'queryselectorall',
      'liste d elements',
    ],
    relatedContentIds: [],
    templateId: 'DOM-F-1100-TEMPLATE',
    intro:
      'Avant de <b>modifier</b> quoi que ce soit dans une page, il faut d’abord <b>attraper</b> l’élément. <code>document.querySelector</code> prend un <b>sélecteur CSS</b> (comme dans une feuille de style) et te rend l’élément correspondant.',
    sections: [
      {
        id: 's1',
        title: 'Attraper un élément avec querySelector',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>récupérer mon bouton “Valider”</b> dans le JavaScript pour, plus tard, réagir à son clic.',
          },
          {
            type: 'paragraph',
            html: '<code>querySelector</code> utilise la <b>même syntaxe que le CSS</b> : <code>.</code> pour une classe, <code>#</code> pour un id, le nom seul pour une balise. Il renvoie le <b>premier</b> élément qui correspond.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1100-l-c1',
              filename: 'script.js',
              language: 'javascript',
              code: `// Par classe (le point, comme en CSS)
const bouton = document.querySelector(".valider");

// Par id (le diese, comme en CSS)
const titre = document.querySelector("#titre-principal");

// Par balise (le nom seul)
const premierParagraphe = document.querySelector("p");

// On peut afficher l'element pour verifier
console.log(bouton); // <button class="valider">Valider</button>`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> le sélecteur est une <b>chaîne de caractères</b> entre guillemets. On y met exactement ce qu’on écrirait dans un fichier CSS.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Un seul élément ou plusieurs ?',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>querySelector</code> ne rend <b>qu’un seul</b> élément (le premier trouvé). Pour récupérer <b>tous</b> les éléments qui correspondent, on utilise <code>querySelectorAll</code>, qui rend une <b>liste</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1100-l-c2',
              filename: 'script.js',
              language: 'javascript',
              code: `// UN seul element (le premier .carte trouve)
const premiereCarte = document.querySelector(".carte");

// TOUS les elements .carte -> une liste (NodeList)
const cartes = document.querySelectorAll(".carte");

// On parcourt la liste avec forEach
cartes.forEach((carte) => {
  console.log(carte); // chaque carte, une par une
});`,
            },
          },
          {
            type: 'table',
            headers: ['Méthode', 'Rend', 'Quand l’utiliser'],
            rows: [
              ['<code>querySelector</code>', 'un seul élément', 'un bouton, un titre précis'],
              ['<code>querySelectorAll</code>', 'une liste (NodeList)', 'tous les éléments d’une classe'],
              ['<code>getElementById</code>', 'un seul élément', 'variante par id (sans le <code>#</code>)'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>querySelector</code> = tu demandes “le premier gâteau de la vitrine”. <code>querySelectorAll</code> = tu demandes “tous les gâteaux” et on te rend un plateau (la liste).',
          },
        ],
      },
      {
        id: 's3',
        title: 'Vérifier qu’on a bien trouvé l’élément',
        blocks: [
          {
            type: 'paragraph',
            html: 'Si aucun élément ne correspond, <code>querySelector</code> renvoie <code>null</code>. Agir sur <code>null</code> provoque une <b>erreur</b>. Le réflexe : soit vérifier, soit s’assurer que le script s’exécute après le HTML.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1100-l-c3',
              filename: 'script.js',
              language: 'javascript',
              code: `const bouton = document.querySelector(".introuvable");

// bouton vaut null si rien n'est trouve
if (bouton) {
  // on n'entre ici que si l'element existe vraiment
  console.log("Element trouve !");
} else {
  console.log("Attention : aucun element ne correspond.");
}`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le <b>point</b> ou le <b>dièse</b> : <code>querySelector("valider")</code> cherche une balise <code>&lt;valider&gt;</code>, pas <code>class="valider"</code>.',
      'Lancer le script <b>avant</b> le HTML : l’élément n’existe pas encore, <code>querySelector</code> rend <code>null</code>. Place le <code>&lt;script&gt;</code> en bas du <code>&lt;body&gt;</code> ou utilise <code>defer</code>.',
      'Confondre <code>querySelector</code> (un élément) et <code>querySelectorAll</code> (une liste) : on ne peut pas modifier une liste comme un élément unique.',
    ],
    takeaways: [
      '<code>document.querySelector("sélecteur")</code> → le <b>premier</b> élément (même syntaxe que le CSS)',
      'classe = <code>.nom</code> · id = <code>#nom</code> · balise = <code>p</code>',
      '<code>querySelectorAll</code> → <b>tous</b> les éléments, sous forme de liste (à parcourir avec <code>forEach</code>)',
      'rien trouvé → <code>null</code> : vérifie avec <code>if (element)</code> avant d’agir',
    ],
  }),
  template({
    id: 'DOM-F-1100-TEMPLATE',
    slug: 'selectionner-un-element-queryselector',
    title: 'querySelector',
    shortTitle: 'querySelector',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Sélectionner un élément du DOM : par classe, par id, ou tous les éléments d’un coup.',
    lede: 'Attraper un élément du HTML. Choisis la cible :',
    aliases: ['queryselector', 'selectionner', 'getelementbyid'],
    keywords: ['cibler', 'classe', 'id', 'liste'],
    relatedContentIds: [],
    lessonId: 'DOM-F-1100-LESSON',
    variants: [
      {
        id: 'un-element',
        label: 'Un élément',
        codeBlocks: [
          {
            id: 'DOM-F-1100-t-un',
            filename: 'script.js',
            language: 'javascript',
            code: `const element = document.querySelector(".ma-classe");`,
          },
        ],
        replacements: [
          { token: 'element', description: 'le nom de ta variable' },
          { token: '.ma-classe', description: 'le sélecteur CSS (.classe, #id ou une balise)' },
        ],
        placement: 'Le cas par défaut : récupérer un seul élément pour agir dessus ensuite.',
      },
      {
        id: 'par-id',
        label: 'Par id',
        codeBlocks: [
          {
            id: 'DOM-F-1100-t-id',
            filename: 'script.js',
            language: 'javascript',
            code: `const element = document.getElementById("mon-id");`,
          },
        ],
        replacements: [
          { token: 'element', description: 'le nom de ta variable' },
          { token: 'mon-id', description: 'l’id de l’élément, SANS le # (juste le nom)' },
        ],
        placement: 'Variante directe quand l’élément a un id unique. Attention : pas de dièse ici.',
      },
      {
        id: 'tous',
        label: 'Tous les éléments',
        codeBlocks: [
          {
            id: 'DOM-F-1100-t-tous',
            filename: 'script.js',
            language: 'javascript',
            code: `const elements = document.querySelectorAll(".ma-classe");

elements.forEach((element) => {
  console.log(element);
});`,
          },
        ],
        replacements: [
          { token: 'elements', description: 'le nom de ta liste (au pluriel, par convention)' },
          { token: '.ma-classe', description: 'le sélecteur commun à tous les éléments' },
        ],
        placement: 'Quand plusieurs éléments partagent la même classe et que tu veux tous les traiter.',
      },
    ],
  }),

  // ————— Modifier un élément : texte, style et classe —————
  lesson({
    id: 'DOM-F-1101-LESSON',
    slug: 'modifier-un-element-texte-style-et-classe',
    title: 'Modifier un élément : texte, style et classe',
    shortTitle: 'Modifier un élément',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Changer le contenu, l’apparence ou les classes d’un élément déjà sélectionné, avec textContent, style et classList.',
    utility: 'Changer le contenu ou l’apparence d’un élément depuis le JavaScript.',
    aliases: ['textcontent', 'innerhtml', 'classlist', 'style', 'modifier', 'changer le texte'],
    keywords: [
      'changer le texte',
      'modifier la couleur',
      'ajouter une classe',
      'toggle classe',
      'classlist add',
      'innerhtml',
    ],
    relatedContentIds: [],
    templateId: 'DOM-F-1101-TEMPLATE',
    intro:
      'Une fois l’élément <b>attrapé</b>, on peut le transformer : changer son <b>texte</b> avec <code>textContent</code>, son <b>style</b> avec <code>.style</code>, et ses <b>classes</b> avec <code>classList</code>.',
    sections: [
      {
        id: 's1',
        title: 'Changer le texte',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>remplacer le texte d’un titre</b> par un message de bienvenue depuis le JavaScript.',
          },
          {
            type: 'paragraph',
            html: '<code>textContent</code> lit et écrit le <b>texte</b> d’un élément. On lui affecte simplement une chaîne. <code>innerHTML</code> existe aussi mais interprète les <b>balises HTML</b> — à réserver aux cas où on veut vraiment injecter du HTML.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1101-l-c1',
              filename: 'script.js',
              language: 'javascript',
              code: `const titre = document.querySelector("#titre");

// Changer le texte (le plus sur, le plus courant)
titre.textContent = "Bienvenue !";

// Lire le texte actuel
console.log(titre.textContent);

// innerHTML : interprete les balises (a manier avec prudence)
titre.innerHTML = "Bonjour <strong>Alice</strong>";`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Réflexe :</b> privilégie <code>textContent</code>. N’utilise <code>innerHTML</code> que si tu ajoutes volontairement des balises, jamais avec du texte venu d’un utilisateur (risque de sécurité).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Changer le style',
        blocks: [
          {
            type: 'paragraph',
            html: 'La propriété <code>.style</code> donne accès aux styles <b>en ligne</b> de l’élément. Les propriétés CSS s’écrivent en <b>camelCase</b> : <code>background-color</code> devient <code>backgroundColor</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1101-l-c2',
              filename: 'script.js',
              language: 'javascript',
              code: `const carte = document.querySelector(".carte");

// Une propriete CSS = une propriete .style en camelCase
carte.style.color = "white";
carte.style.backgroundColor = "#2563eb"; // background-color
carte.style.borderRadius = "8px";        // border-radius

// Les valeurs sont toujours des chaines (avec l'unite)
carte.style.padding = "16px";`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>.style</code>, c’est comme écrire dans l’attribut <code>style="..."</code> de la balise, mais depuis le JavaScript. Pour beaucoup de changements d’un coup, une <b>classe</b> est plus propre.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Ajouter, retirer ou basculer une classe',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>activer un mode sombre</b> en ajoutant une classe <code>sombre</code> sur le <code>body</code>, plutôt que de changer dix propriétés à la main.',
          },
          {
            type: 'paragraph',
            html: '<code>classList</code> gère les classes de l’élément : <code>add</code> ajoute, <code>remove</code> retire, <code>toggle</code> bascule (ajoute si absente, retire si présente), <code>contains</code> vérifie.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1101-l-c3',
              filename: 'script.js',
              language: 'javascript',
              code: `const body = document.querySelector("body");

body.classList.add("sombre");    // ajoute la classe
body.classList.remove("sombre"); // retire la classe
body.classList.toggle("sombre"); // bascule (present <-> absent)

// Tester la presence d'une classe
if (body.classList.contains("sombre")) {
  console.log("Le mode sombre est actif");
}`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Effet'],
            rows: [
              ['<code>element.textContent</code>', 'lire / changer le texte'],
              ['<code>element.style.couleur</code>', 'changer un style en ligne (camelCase)'],
              ['<code>classList.add</code>', 'ajouter une classe'],
              ['<code>classList.remove</code>', 'retirer une classe'],
              ['<code>classList.toggle</code>', 'basculer une classe'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Écrire <code>element.style.background-color</code> : invalide. En JS c’est du camelCase → <code>element.style.backgroundColor</code>.',
      'Oublier l’<b>unité</b> et les <b>guillemets</b> : <code>style.padding = 16</code> ne marche pas, écris <code>style.padding = "16px"</code>.',
      'Utiliser <code>innerHTML</code> avec du texte utilisateur : c’est une faille de sécurité (XSS). Préfère <code>textContent</code>.',
      'Passer plusieurs classes en une fois mal formées à <code>classList.add("a b")</code> : passe-les séparées → <code>add("a", "b")</code>.',
    ],
    takeaways: [
      '<code>element.textContent = "..."</code> pour le <b>texte</b> (le plus sûr)',
      '<code>element.style.backgroundColor = "#..."</code> pour un <b>style</b> (camelCase, valeur en chaîne)',
      '<code>classList.add / remove / toggle / contains</code> pour les <b>classes</b>',
      'beaucoup de styles d’un coup → ajoute plutôt une <b>classe</b> CSS',
    ],
  }),
  template({
    id: 'DOM-F-1101-TEMPLATE',
    slug: 'modifier-un-element-texte-style-et-classe',
    title: 'Modifier un élément',
    shortTitle: 'Modifier',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Modifier un élément du DOM : son texte, son style en ligne, ou ses classes.',
    lede: 'Transformer un élément déjà sélectionné. Choisis quoi changer :',
    aliases: ['textcontent', 'style', 'classlist', 'modifier'],
    keywords: ['texte', 'couleur', 'classe'],
    relatedContentIds: [],
    lessonId: 'DOM-F-1101-LESSON',
    variants: [
      {
        id: 'texte',
        label: 'Le texte',
        codeBlocks: [
          {
            id: 'DOM-F-1101-t-texte',
            filename: 'script.js',
            language: 'javascript',
            code: `const element = document.querySelector(".cible");

element.textContent = "Nouveau texte";`,
          },
        ],
        replacements: [
          { token: '.cible', description: 'le sélecteur de l’élément à modifier' },
          { token: 'Nouveau texte', description: 'le texte à afficher' },
        ],
        placement: 'Le cas le plus courant : remplacer le contenu textuel d’un élément.',
      },
      {
        id: 'style',
        label: 'Le style',
        codeBlocks: [
          {
            id: 'DOM-F-1101-t-style',
            filename: 'script.js',
            language: 'javascript',
            code: `const element = document.querySelector(".cible");

element.style.backgroundColor = "#2563eb";
element.style.color = "white";`,
          },
        ],
        replacements: [
          { token: '.cible', description: 'le sélecteur de l’élément' },
          { token: 'backgroundColor', description: 'la propriété CSS en camelCase (background-color → backgroundColor)' },
          { token: '#2563eb', description: 'la valeur (avec son unité si besoin, en chaîne)' },
        ],
        placement: 'Pour un ou deux styles ponctuels. Au-delà, préfère l’onglet “Une classe”.',
      },
      {
        id: 'classe',
        label: 'Une classe',
        codeBlocks: [
          {
            id: 'DOM-F-1101-t-classe',
            filename: 'script.js',
            language: 'javascript',
            code: `const element = document.querySelector(".cible");

element.classList.add("active");    // ajouter
element.classList.remove("active"); // retirer
element.classList.toggle("active"); // basculer`,
          },
        ],
        replacements: [
          { token: '.cible', description: 'le sélecteur de l’élément' },
          { token: 'active', description: 'le nom de la classe à gérer' },
        ],
        placement: 'La façon propre de changer l’apparence : le style vit dans le CSS, le JS gère juste la classe.',
      },
    ],
  }),

  // ————— Réagir à un événement : addEventListener —————
  lesson({
    id: 'DOM-F-1102-LESSON',
    slug: 'reagir-a-un-evenement-addeventlistener',
    title: 'Réagir à un événement : addEventListener',
    shortTitle: 'addEventListener',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Exécuter du code quand l’utilisateur agit (clic, saisie, survol) grâce à addEventListener et sa fonction de rappel.',
    utility: 'Lancer du code en réaction à une action de l’utilisateur.',
    aliases: ['addeventlistener', 'evenement', 'event', 'click', 'onclick', 'ecouter un clic'],
    keywords: [
      'reagir a un clic',
      'ecouter un evenement',
      'callback',
      'fonction de rappel',
      'event listener',
      'objet event',
    ],
    relatedContentIds: [],
    templateId: 'DOM-F-1102-TEMPLATE',
    intro:
      'Une page devient <b>interactive</b> quand elle réagit aux actions. <code>addEventListener</code> attache une <b>fonction</b> à un élément : elle s’exécutera <b>à chaque fois</b> que l’événement (clic, saisie…) se produit.',
    sections: [
      {
        id: 's1',
        title: 'Réagir à un clic',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux qu’un <b>message s’affiche quand on clique sur mon bouton</b>.',
          },
          {
            type: 'paragraph',
            html: 'On appelle <code>addEventListener</code> sur l’élément, avec deux arguments : le <b>nom de l’événement</b> (une chaîne, ex. <code>"click"</code>) et la <b>fonction</b> à exécuter quand il arrive.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1102-l-c1',
              filename: 'script.js',
              language: 'javascript',
              code: `// 1. J'attrape le bouton
const bouton = document.querySelector(".valider");

// 2. J'ecoute l'evenement "click"
bouton.addEventListener("click", () => {
  // 3. Ce code s'execute a CHAQUE clic
  console.log("Bouton clique !");
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> le nom de l’événement est <b>sans</b> le préfixe <code>on</code> : c’est <code>"click"</code>, pas <code>"onclick"</code>. Et on <b>passe</b> la fonction, on ne l’appelle pas avec des parenthèses.',
          },
        ],
      },
      {
        id: 's2',
        title: 'La fonction de rappel et l’objet event',
        blocks: [
          {
            type: 'paragraph',
            html: 'La fonction passée s’appelle un <b>callback</b> (fonction de rappel). Elle reçoit automatiquement un <b>objet event</b> qui décrit ce qui s’est passé (quelle touche, quel élément…). On le nomme souvent <code>e</code> ou <code>event</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1102-l-c2',
              filename: 'script.js',
              language: 'javascript',
              code: `const bouton = document.querySelector(".valider");

// e = l'objet event, rempli automatiquement par le navigateur
bouton.addEventListener("click", (e) => {
  // e.target = l'element sur lequel on a clique
  console.log(e.target);

  // Empeche le comportement par defaut (ex. envoi d'un formulaire)
  e.preventDefault();
});`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> l’objet <code>event</code> est la <b>fiche d’incident</b> remplie par le navigateur : où ça s’est passé, quelle touche, quelle position de souris. Tu la consultes si tu en as besoin.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Les événements les plus courants',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le même mécanisme marche pour toutes sortes d’actions : il suffit de changer le <b>nom de l’événement</b>.',
          },
          {
            type: 'table',
            headers: ['Événement', 'Se déclenche quand…'],
            rows: [
              ['<code>"click"</code>', 'on clique sur l’élément'],
              ['<code>"input"</code>', 'on tape dans un champ (à chaque frappe)'],
              ['<code>"change"</code>', 'un champ change et perd le focus'],
              ['<code>"submit"</code>', 'un formulaire est envoyé'],
              ['<code>"mouseenter"</code>', 'la souris entre sur l’élément'],
              ['<code>"keydown"</code>', 'on appuie sur une touche du clavier'],
            ],
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1102-l-c3',
              filename: 'script.js',
              language: 'javascript',
              code: `const champ = document.querySelector(".recherche");

// Reagir a chaque frappe dans le champ
champ.addEventListener("input", (e) => {
  // e.target.value = le texte actuellement saisi
  console.log(e.target.value);
});`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Appeler la fonction au lieu de la passer : <code>addEventListener("click", maFonction())</code> l’exécute tout de suite. Écris <code>maFonction</code> sans parenthèses.',
      'Mettre le préfixe <code>on</code> dans le nom : c’est <code>"click"</code>, pas <code>"onclick"</code> (le <code>on</code> n’existe que sur les attributs HTML).',
      'Attacher l’écouteur avant que l’élément existe : <code>querySelector</code> rend <code>null</code> et <code>addEventListener</code> plante. Lance le script après le HTML.',
      'Oublier <code>e.preventDefault()</code> sur un <code>submit</code> : la page se recharge et tu perds la main.',
    ],
    takeaways: [
      '<code>element.addEventListener("click", callback)</code> : nom d’événement + fonction',
      'nom <b>sans</b> <code>on</code> : <code>"click"</code>, <code>"input"</code>, <code>"submit"</code>…',
      'le callback reçoit un objet <code>event</code> : <code>e.target</code>, <code>e.target.value</code>, <code>e.preventDefault()</code>',
      '<b>passe</b> la fonction (<code>maFonction</code>), ne l’appelle pas (<code>maFonction()</code>)',
    ],
  }),
  template({
    id: 'DOM-F-1102-TEMPLATE',
    slug: 'reagir-a-un-evenement-addeventlistener',
    title: 'addEventListener',
    shortTitle: 'addEventListener',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Écouter un événement du DOM : un clic, une saisie, ou l’envoi d’un formulaire.',
    lede: 'Réagir à une action. Choisis l’événement :',
    aliases: ['addeventlistener', 'evenement', 'click', 'submit'],
    keywords: ['ecouter', 'clic', 'callback'],
    relatedContentIds: [],
    lessonId: 'DOM-F-1102-LESSON',
    variants: [
      {
        id: 'clic',
        label: 'Un clic',
        codeBlocks: [
          {
            id: 'DOM-F-1102-t-clic',
            filename: 'script.js',
            language: 'javascript',
            code: `const bouton = document.querySelector(".cible");

bouton.addEventListener("click", () => {
  console.log("Clique !");
});`,
          },
        ],
        replacements: [
          { token: '.cible', description: 'le sélecteur de l’élément à écouter' },
          { token: 'console.log("Clique !")', description: 'le code à exécuter à chaque clic' },
        ],
        placement: 'Le cas le plus fréquent : lancer une action au clic d’un bouton.',
      },
      {
        id: 'saisie',
        label: 'Une saisie',
        codeBlocks: [
          {
            id: 'DOM-F-1102-t-saisie',
            filename: 'script.js',
            language: 'javascript',
            code: `const champ = document.querySelector(".cible");

champ.addEventListener("input", (e) => {
  console.log(e.target.value);
});`,
          },
        ],
        replacements: [
          { token: '.cible', description: 'le sélecteur du champ (input, textarea)' },
          { token: 'e.target.value', description: 'le texte saisi, récupéré à chaque frappe' },
        ],
        placement: 'Pour réagir en direct à ce que l’utilisateur tape (recherche instantanée, compteur…).',
      },
      {
        id: 'formulaire',
        label: 'Un formulaire',
        codeBlocks: [
          {
            id: 'DOM-F-1102-t-form',
            filename: 'script.js',
            language: 'javascript',
            code: `const formulaire = document.querySelector(".cible");

formulaire.addEventListener("submit", (e) => {
  e.preventDefault(); // empeche le rechargement de la page
  console.log("Formulaire envoye");
});`,
          },
        ],
        replacements: [
          { token: '.cible', description: 'le sélecteur du formulaire (balise <form>)' },
          { token: 'console.log("Formulaire envoye")', description: 'ce que tu veux faire des données' },
        ],
        placement: 'Sur un formulaire : le e.preventDefault() est indispensable pour garder la main en JS.',
      },
    ],
  }),

  // ————— Créer et supprimer un élément —————
  lesson({
    id: 'DOM-F-1103-LESSON',
    slug: 'creer-et-supprimer-un-element',
    title: 'Créer et supprimer un élément',
    shortTitle: 'Créer / supprimer',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Fabriquer un nouvel élément HTML depuis le JavaScript, l’insérer dans la page, puis le retirer, avec createElement, append et remove.',
    utility: 'Ajouter ou enlever des éléments dans la page sans recharger.',
    aliases: ['createelement', 'append', 'appendchild', 'remove', 'creer un element', 'ajouter au dom'],
    keywords: [
      'creer un element',
      'ajouter dans la page',
      'appendchild',
      'supprimer un element',
      'liste dynamique',
      'insérer du html',
    ],
    relatedContentIds: [],
    templateId: 'DOM-F-1103-TEMPLATE',
    intro:
      'On peut <b>fabriquer</b> de nouveaux éléments à la volée : <code>createElement</code> crée l’élément, on le remplit, puis <code>append</code> l’<b>insère</b> dans la page. <code>remove</code> l’enlève.',
    sections: [
      {
        id: 's1',
        title: 'Créer et insérer un élément',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>ajouter une nouvelle tâche dans ma liste</b> quand l’utilisateur en saisit une, sans recharger la page.',
          },
          {
            type: 'paragraph',
            html: 'Trois temps : <code>createElement</code> fabrique l’élément (encore <b>invisible</b>), on le <b>remplit</b> (texte, classe), puis <code>append</code> l’<b>ajoute</b> dans un élément parent déjà présent.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1103-l-c1',
              filename: 'script.js',
              language: 'javascript',
              code: `// 1. Je cree un element <li> (pas encore dans la page)
const item = document.createElement("li");

// 2. Je le remplis
item.textContent = "Acheter du pain";
item.classList.add("tache");

// 3. Je l'ajoute a la fin de la liste existante
const liste = document.querySelector(".liste-taches");
liste.append(item); // il apparait enfin a l'ecran`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> tant qu’on n’a pas fait <code>append</code>, l’élément existe en mémoire mais n’est <b>pas visible</b>. C’est l’insertion dans un parent qui l’affiche.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Supprimer un élément',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour retirer un élément de la page, on l’attrape puis on appelle <code>remove</code> dessus. Simple et direct.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1103-l-c2',
              filename: 'script.js',
              language: 'javascript',
              code: `const item = document.querySelector(".tache");

// Retire l'element de la page
item.remove();

// Cas frequent : supprimer au clic sur un bouton
const boutonSuppr = document.querySelector(".supprimer");
boutonSuppr.addEventListener("click", () => {
  item.remove();
});`,
            },
          },
          {
            type: 'table',
            headers: ['Méthode', 'Rôle'],
            rows: [
              ['<code>createElement("li")</code>', 'fabriquer un nouvel élément'],
              ['<code>textContent</code>', 'lui donner son contenu'],
              ['<code>parent.append(el)</code>', 'l’insérer à la fin du parent'],
              ['<code>parent.prepend(el)</code>', 'l’insérer au début du parent'],
              ['<code>el.remove()</code>', 'le retirer de la page'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>createElement</code> = fabriquer une brique dans ton atelier. <code>append</code> = poser la brique sur le mur. <code>remove</code> = l’enlever du mur.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Un exemple complet : ajouter à une liste',
        blocks: [
          {
            type: 'paragraph',
            html: 'En combinant création et insertion, on construit une <b>liste dynamique</b> qui grandit à chaque ajout.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1103-l-c3',
              filename: 'script.js',
              language: 'javascript',
              code: `const liste = document.querySelector(".liste");

function ajouterTache(texte) {
  // On cree, on remplit, on insere
  const item = document.createElement("li");
  item.textContent = texte;
  liste.append(item);
}

ajouterTache("Ranger le bureau");
ajouterTache("Repondre aux mails");`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>append</code> : l’élément est créé mais <b>n’apparaît pas</b>, car il n’est rattaché à aucun parent.',
      'Faire <code>append</code> sur un parent qui vaut <code>null</code> : vérifie d’abord que <code>querySelector</code> a bien trouvé le parent.',
      'Construire du HTML complexe en concaténant des chaînes dans <code>innerHTML</code> : vite illisible et risqué. Préfère <code>createElement</code>.',
      'Confondre <code>append</code> (à la fin) et <code>prepend</code> (au début) quand l’ordre compte.',
    ],
    takeaways: [
      '<code>document.createElement("balise")</code> fabrique l’élément (invisible tant qu’on ne l’insère pas)',
      'on le remplit (<code>textContent</code>, <code>classList</code>) <b>avant</b> de l’insérer',
      '<code>parent.append(el)</code> l’ajoute à la fin · <code>prepend</code> au début',
      '<code>el.remove()</code> le retire de la page',
    ],
  }),
  template({
    id: 'DOM-F-1103-TEMPLATE',
    slug: 'creer-et-supprimer-un-element',
    title: 'Créer / supprimer un élément',
    shortTitle: 'Créer / supprimer',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Créer un élément et l’insérer dans le DOM, ou retirer un élément existant.',
    lede: 'Ajouter ou enlever un élément. Choisis l’action :',
    aliases: ['createelement', 'append', 'remove'],
    keywords: ['creer', 'ajouter', 'supprimer'],
    relatedContentIds: [],
    lessonId: 'DOM-F-1103-LESSON',
    variants: [
      {
        id: 'creer',
        label: 'Créer + insérer',
        codeBlocks: [
          {
            id: 'DOM-F-1103-t-creer',
            filename: 'script.js',
            language: 'javascript',
            code: `const element = document.createElement("li");
element.textContent = "Mon texte";

const parent = document.querySelector(".liste");
parent.append(element);`,
          },
        ],
        replacements: [
          { token: 'li', description: 'la balise à créer (li, div, p, button…)' },
          { token: 'Mon texte', description: 'le contenu de l’élément' },
          { token: '.liste', description: 'le sélecteur du parent qui va l’accueillir' },
        ],
        placement: 'Le combo de base : créer, remplir, puis insérer dans un parent déjà présent.',
      },
      {
        id: 'supprimer',
        label: 'Supprimer',
        codeBlocks: [
          {
            id: 'DOM-F-1103-t-suppr',
            filename: 'script.js',
            language: 'javascript',
            code: `const element = document.querySelector(".a-supprimer");

element.remove();`,
          },
        ],
        replacements: [
          { token: '.a-supprimer', description: 'le sélecteur de l’élément à retirer' },
        ],
        placement: 'Pour enlever un élément de la page. Souvent déclenché dans un écouteur de clic.',
      },
      {
        id: 'vider',
        label: 'Vider un conteneur',
        codeBlocks: [
          {
            id: 'DOM-F-1103-t-vider',
            filename: 'script.js',
            language: 'javascript',
            code: `const conteneur = document.querySelector(".liste");

// Vide tout le contenu d'un coup
conteneur.innerHTML = "";`,
          },
        ],
        replacements: [
          { token: '.liste', description: 'le sélecteur du conteneur à vider' },
        ],
        placement: 'Pour effacer d’un coup tous les enfants d’un élément (ex. avant de re-remplir une liste).',
      },
    ],
  }),

  // ————— Récupérer la valeur d’un input —————
  lesson({
    id: 'DOM-F-1104-LESSON',
    slug: 'recuperer-la-valeur-d-un-input',
    title: 'Récupérer la valeur d’un input',
    shortTitle: 'Valeur d’un input',
    technology: 'javascript',
    tomeId: 't3',
    summary:
      'Lire ce que l’utilisateur a saisi dans un champ de formulaire avec la propriété value, et selon le type de champ.',
    utility: 'Lire ce que l’utilisateur a tapé ou coché dans un formulaire.',
    aliases: ['value', 'input value', 'recuperer valeur', 'champ', 'formulaire', 'checkbox'],
    keywords: [
      'lire un champ',
      'valeur input',
      'texte saisi',
      'case a cocher',
      'checked',
      'nombre saisi',
    ],
    relatedContentIds: [],
    templateId: 'DOM-F-1104-TEMPLATE',
    intro:
      'Pour lire ce qu’un utilisateur a écrit, on attrape le champ puis on lit sa propriété <code>.value</code>. C’est <b>toujours une chaîne de caractères</b>, même pour un champ nombre.',
    sections: [
      {
        id: 's1',
        title: 'Lire un champ texte',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>récupérer le pseudo saisi</b> dans un champ pour l’afficher dans un message de bienvenue.',
          },
          {
            type: 'paragraph',
            html: 'On sélectionne l’<code>&lt;input&gt;</code> puis on lit <code>.value</code>. On le fait souvent <b>dans un écouteur</b>, au clic d’un bouton ou à l’envoi du formulaire.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1104-l-c1',
              filename: 'script.js',
              language: 'javascript',
              code: `const champ = document.querySelector("#pseudo");
const bouton = document.querySelector(".valider");

bouton.addEventListener("click", () => {
  // .value = le texte actuellement dans le champ
  const pseudo = champ.value;
  console.log("Bonjour " + pseudo);
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>.value</code> est lu <b>au moment</b> où le code s’exécute. Lis-le <b>dans</b> le callback (au clic), pas une fois pour toutes au chargement.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Attention : value est toujours une chaîne',
        blocks: [
          {
            type: 'paragraph',
            html: 'Même sur un <code>&lt;input type="number"&gt;</code>, <code>.value</code> rend une <b>chaîne</b> (<code>"42"</code>, pas <code>42</code>). Pour calculer, il faut la <b>convertir</b> en nombre avec <code>Number()</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1104-l-c2',
              filename: 'script.js',
              language: 'javascript',
              code: `const champAge = document.querySelector("#age");

const texte = champAge.value; // "42" (une chaine !)

// "42" + 1 donnerait "421" (concatenation) : piege classique
const age = Number(champAge.value); // 42 (un vrai nombre)
console.log(age + 1); // 43`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>.value</code> te rend toujours un <b>ticket de caisse</b> (du texte). Si tu veux additionner, tu dois d’abord le lire comme un <b>montant</b> avec <code>Number()</code>.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Cases à cocher et menus déroulants',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une <b>case à cocher</b> ne se lit pas avec <code>.value</code> mais avec <code>.checked</code> (un booléen). Un <b>menu déroulant</b> (<code>&lt;select&gt;</code>) se lit bien avec <code>.value</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'DOM-F-1104-l-c3',
              filename: 'script.js',
              language: 'javascript',
              code: `// Case a cocher : .checked donne true / false
const cgu = document.querySelector("#cgu");
console.log(cgu.checked); // true si cochee

// Menu deroulant : .value donne l'option choisie
const pays = document.querySelector("#pays");
console.log(pays.value); // ex. "france"`,
            },
          },
          {
            type: 'table',
            headers: ['Type de champ', 'Propriété à lire', 'Rend'],
            rows: [
              ['<code>text</code> / <code>email</code>', '<code>.value</code>', 'une chaîne'],
              ['<code>number</code>', '<code>.value</code>', 'une chaîne (à convertir)'],
              ['<code>checkbox</code>', '<code>.checked</code>', 'un booléen'],
              ['<code>&lt;select&gt;</code>', '<code>.value</code>', 'l’option choisie'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que <code>.value</code> d’un champ nombre est un nombre : c’est une <b>chaîne</b>. Convertis avec <code>Number(...)</code> avant de calculer.',
      'Lire <code>.value</code> au chargement du script (le champ est vide) au lieu de le lire <b>dans</b> l’écouteur au bon moment.',
      'Utiliser <code>.value</code> sur une case à cocher : lis <code>.checked</code> (true/false) à la place.',
      'Oublier de gérer le champ <b>vide</b> : <code>.value</code> vaut alors <code>""</code>, à tester avant d’agir.',
    ],
    takeaways: [
      '<code>champ.value</code> = ce que l’utilisateur a saisi (<b>toujours une chaîne</b>)',
      'champ nombre → convertis avec <code>Number(champ.value)</code> avant de calculer',
      'case à cocher → <code>champ.checked</code> (booléen), pas <code>.value</code>',
      'lis <code>.value</code> <b>dans</b> l’écouteur (au clic/submit), pas au chargement',
    ],
  }),
  template({
    id: 'DOM-F-1104-TEMPLATE',
    slug: 'recuperer-la-valeur-d-un-input',
    title: 'Valeur d’un input',
    shortTitle: 'Valeur input',
    technology: 'javascript',
    tomeId: 't3',
    summary: 'Lire la valeur d’un champ de formulaire : texte, nombre, ou case à cocher.',
    lede: 'Lire une saisie utilisateur. Choisis le type de champ :',
    aliases: ['value', 'input', 'checked', 'formulaire'],
    keywords: ['lire un champ', 'valeur', 'checkbox'],
    relatedContentIds: [],
    lessonId: 'DOM-F-1104-LESSON',
    variants: [
      {
        id: 'texte',
        label: 'Champ texte',
        codeBlocks: [
          {
            id: 'DOM-F-1104-t-texte',
            filename: 'script.js',
            language: 'javascript',
            code: `const champ = document.querySelector("#mon-champ");

const valeur = champ.value;`,
          },
        ],
        replacements: [
          { token: '#mon-champ', description: 'le sélecteur de ton input' },
          { token: 'valeur', description: 'le nom de la variable qui reçoit la saisie' },
        ],
        placement: 'Le cas standard : lire le texte d’un input ou d’un textarea.',
      },
      {
        id: 'nombre',
        label: 'Champ nombre',
        codeBlocks: [
          {
            id: 'DOM-F-1104-t-nombre',
            filename: 'script.js',
            language: 'javascript',
            code: `const champ = document.querySelector("#quantite");

// Convertir la chaine en vrai nombre
const nombre = Number(champ.value);`,
          },
        ],
        replacements: [
          { token: '#quantite', description: 'le sélecteur de ton input type="number"' },
          { token: 'nombre', description: 'la variable qui reçoit le nombre converti' },
        ],
        placement: 'Dès que tu vas calculer avec la valeur : Number() évite le piège de la concaténation.',
      },
      {
        id: 'checkbox',
        label: 'Case à cocher',
        codeBlocks: [
          {
            id: 'DOM-F-1104-t-check',
            filename: 'script.js',
            language: 'javascript',
            code: `const caseACocher = document.querySelector("#accepte");

// true si cochee, false sinon
const estCochee = caseACocher.checked;`,
          },
        ],
        replacements: [
          { token: '#accepte', description: 'le sélecteur de ta case à cocher' },
          { token: 'estCochee', description: 'la variable booléenne (true / false)' },
        ],
        placement: 'Pour une checkbox : on lit .checked (booléen), pas .value.',
      },
    ],
  }),
];
