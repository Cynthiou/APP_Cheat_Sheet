import type { LessonContent, TemplateContent } from '@/types/content';

export const useStateLesson: LessonContent = {
  id: 'REACT-F-020-LESSON',
  slug: 'usestate',
  kind: 'lesson',
  status: 'ready',
  title: 'Utiliser un state',
  shortTitle: 'useState',
  technology: 'react',
  tomeId: 't6',
  summary:
    'Rendre un composant vivant : une valeur qui change et met à jour l’écran toute seule, via useState et son setter.',
  utility:
    'Rendre un composant vivant : une valeur qui change et met à jour l’écran toute seule.',
  aliases: ['use state', 'state', 'etat', 'hook state', 'setter', 'usestate react'],
  keywords: [
    'valeur qui change',
    'mettre a jour affichage',
    'compteur',
    'setcount',
    'reactif',
    'hook',
    'const tableau deux elements',
  ],
  relatedContentIds: ['REACT-F-021-LESSON', 'REACT-F-030-LESSON', 'GUIDE-G-003'],
  templateId: 'REACT-F-020-TEMPLATE',
  intro:
    'Le <b>state</b> est une valeur <b>dynamique</b> gérée à l’intérieur d’un composant. Quand elle change via le <b>setter</b>, React met à jour l’affichage <b>automatiquement et immédiatement</b> — sans recharger la page.',
  sections: [
    {
      id: 's1',
      title: 'C’est quoi le state ?',
      blocks: [
        {
          type: 'paragraph',
          html: 'Le <b>state</b> = une valeur dynamique qui <b>appartient au composant</b>. Quand elle change → React met à jour l’affichage. À ne pas confondre avec les autres façons de stocker une valeur :',
        },
        {
          type: 'table',
          headers: ['Type', 'Ce que c’est'],
          rows: [
            ['const', 'valeur fixe — ne change jamais'],
            ['let', 'variable JS — change, mais <b>sans</b> mettre à jour l’affichage'],
            ['useState', 'valeur <b>affichée</b> qui change en temps réel'],
            ['props', 'donnée reçue du parent — lecture seule'],
          ],
        },
        {
          type: 'note',
          variant: 'image',
          html: '<b>Image :</b> le tableau de bord d’une voiture. <code>let</code> = un calcul <b>dans ta tête</b> (personne ne le voit). <code>useState</code> = le <b>compteur de vitesse affiché</b> : dès que ça change, tout le monde voit la nouvelle valeur.',
        },
      ],
    },
    {
      id: 's2',
      title: 'useState : la syntaxe',
      blocks: [
        {
          type: 'paragraph',
          html: 'Le hook <code>useState</code> retourne un <b>tableau de 2 éléments</b> — on les déstructure directement : la valeur, et le setter (la fonction qui la change).',
        },
        {
          type: 'code',
          block: {
            id: 'usestate-l-c1',
            filename: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from "react"; // toujours importer !

const [count, setCount] = useState(0);
//      valeur   setter        valeur de depart

// Autres exemples :
const [nom, setNom] = useState("Alice");
const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState<string[]>([]);`,
          },
        },
        {
          type: 'note',
          variant: 'convention',
          html: '<b>Convention obligatoire :</b> le setter = <code>set</code> + nom de la variable (<code>setCount</code> pour <code>count</code>). Toujours <code>const</code>, jamais <code>let</code>.',
        },
      ],
    },
    {
      id: 's3',
      title: 'Le schéma de base : un composant interactif',
      blocks: [
        {
          type: 'situation',
          html: 'Je veux un <b>bouton qui compte combien de fois on clique dessus</b> et qui affiche le total à l’écran, sans recharger la page.',
        },
        {
          type: 'paragraph',
          html: 'Les 5 temps d’un composant qui réagit : je déclare le state → je crée un handler → le handler active le setter → j’écoute l’événement → j’affiche la valeur.',
        },
        {
          type: 'code',
          block: {
            id: 'usestate-l-c2',
            filename: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

function App() {
  // 1. Je declare mon state
  const [count, setCount] = useState(0);

  // 2. Mon handler (la fonction du clic)
  const handleClick = () => {
    setCount(count + 1); // 3. J'active le setter
  };

  return (
    <button onClick={handleClick}> {/* 4. J'ecoute le clic */}
      {count}                      {/* 5. J'affiche la valeur */}
    </button>
  );
}`,
          },
        },
        {
          type: 'note',
          variant: 'image',
          html: '<b>Image :</b> une alarme. Modifier <code>count</code> directement = changer l’horloge en douce (React ne voit rien). Appeler <code>setCount</code> = <b>appuyer sur l’alarme</b> : React se réveille et met à jour l’affichage.',
        },
      ],
    },
    {
      id: 's4',
      title: 'Les événements en React',
      blocks: [
        {
          type: 'paragraph',
          html: 'En React, <b>plus de</b> <code>addEventListener</code> : on met l’attribut <b>directement sur la balise</b>. Et on <b>passe</b> la fonction, on ne l’<b>appelle</b> pas.',
        },
        {
          type: 'code',
          block: {
            id: 'usestate-l-c3',
            filename: 'Bouton.tsx',
            language: 'tsx',
            code: `// JS vanilla — on oublie ca en React
btn.addEventListener("click", handleClick);

// React — onClick directement sur la balise
<button onClick={handleClick}>Click</button>

// Passer la fonction, PAS l'appeler :
onClick={handleClick}   // ok : fonction passee
onClick={handleClick()} // faux : appelee tout de suite`,
          },
        },
        {
          type: 'table',
          headers: ['Événement JS', 'En React', 'Ça écoute quoi ?'],
          rows: [
            ['onclick', 'onClick', 'le clic'],
            ['onchange', 'onChange', 'une saisie qui change'],
            ['onmouseleave', 'onMouseLeave', 'la souris qui quitte l’élément'],
            ['onsubmit', 'onSubmit', 'l’envoi d’un formulaire'],
          ],
        },
        {
          type: 'note',
          variant: 'convention',
          html: '<b>Convention handler :</b> il commence toujours par <code>handle</code> + nom de l’événement → <code>handleClick</code>, <code>handleChange</code>, <code>handleMouseEnter</code>.',
        },
      ],
    },
    {
      id: 's5',
      title: 'State avec objets, et .find()',
      blocks: [
        {
          type: 'paragraph',
          html: 'Pour un objet, <b>toujours créer un nouvel objet</b> — jamais le modifier directement (sinon React ne voit pas le changement). Et <code>.find()</code> pour sortir <b>un seul</b> élément d’un tableau.',
        },
        {
          type: 'code',
          block: {
            id: 'usestate-l-c4',
            filename: 'App.tsx',
            language: 'tsx',
            code: `// Interdit — React ne voit pas le changement
user.name = "Alice";

// Obligatoire — un nouvel objet via le setter
setUser({ ...user, name: "Alice" });

// .find() — sort UN seul element du tableau
const trouve = liste.find(
  (item) => item.id === idChoisi
);
// .filter() -> un TABLEAU  ·  .find() -> UN element`,
          },
        },
        {
          type: 'note',
          variant: 'image',
          html: '<b>Image :</b> <code>.find()</code> = le vendeur qui va te chercher <b>une seule</b> banane précise dans le stock. <code>.filter()</code> = il revient avec <b>tout un cageot</b> (un tableau).',
        },
      ],
    },
  ],
  pitfalls: [
    '<code>onClick={handleClick()}</code> appelle la fonction <b>tout de suite</b> au rendu. Passe la référence : <code>onClick={handleClick}</code>.',
    'Modifier la valeur directement (<code>count = count + 1</code>) ne déclenche <b>aucun</b> rendu. Passe par <code>setCount</code>.',
    'Muter un objet/tableau en place (<code>user.name = …</code>, <code>items.push(…)</code>) : React ne détecte rien. Crée une <b>nouvelle</b> référence.',
    'Utiliser <code>let</code> pour le state : toujours <code>const [x, setX] = useState(...)</code>.',
  ],
  takeaways: [
    '<b>useState</b> = valeur affichée en temps réel · toujours <code>const</code> · <code>import { useState } from "react"</code>',
    'syntaxe : <code>const [valeur, setValeur] = useState(valeurDeDepart)</code>',
    'pour modifier → <b>toujours le setter</b>, jamais la valeur directement',
    '<code>onClick={handleClick}</code> ✓ · <code>onClick={handleClick()}</code> ✗ (appelée tout de suite)',
    'convention handler : <code>handleClick</code>, <code>handleChange</code>, <code>handleMouseEnter</code>…',
    '<code>.find()</code> = sort UN élément · <code>.filter()</code> = sort un tableau',
    'state objet → toujours un <b>nouvel objet</b> avec <code>setXxx({ … })</code>',
  ],
};

export const useStateTemplate: TemplateContent = {
  id: 'REACT-F-020-TEMPLATE',
  slug: 'usestate',
  kind: 'template',
  status: 'ready',
  title: 'useState',
  shortTitle: 'useState',
  technology: 'react',
  tomeId: 't6',
  summary: 'Le code useState prêt à copier, par type de donnée : nombre, texte, booléen, liste, objet.',
  lede: 'Le code prêt à copier. Choisis le type de donnée :',
  aliases: ['use state', 'state', 'setter', 'setcount', 'usestate react'],
  keywords: ['nombre', 'texte', 'booleen', 'liste', 'objet', 'compteur', 'toggle'],
  relatedContentIds: ['REACT-F-030-TEMPLATE', 'REACT-F-021-TEMPLATE'],
  lessonId: 'REACT-F-020-LESSON',
  variants: [
    {
      id: 'nombre',
      label: 'Nombre',
      codeBlocks: [
        {
          id: 'usestate-t-nombre',
          filename: 'Compteur.tsx',
          language: 'tsx',
          code: `import { useState } from "react";

const [count, setCount] = useState(0);

setCount(count + 1);`,
        },
      ],
      replacements: [
        { token: 'count / setCount', description: 'le nom de ta donnée + son setter' },
        { token: '0', description: 'la valeur de départ (un nombre)' },
      ],
      placement:
        'À l’intérieur du composant, tout en haut (avant le return). Le setter s’appelle dans un handler (onClick, onChange…).',
    },
    {
      id: 'texte',
      label: 'Texte',
      codeBlocks: [
        {
          id: 'usestate-t-texte',
          filename: 'Champ.tsx',
          language: 'tsx',
          code: `import { useState } from "react";

const [texte, setTexte] = useState("");

setTexte("Bonjour");`,
        },
      ],
      replacements: [
        { token: 'texte / setTexte', description: 'le nom de ta donnée + son setter' },
        { token: '""', description: 'la valeur de départ (une chaîne)' },
      ],
      placement: 'Parfait pour un champ contrôlé : value={texte} onChange={(e) => setTexte(e.target.value)}.',
    },
    {
      id: 'booleen',
      label: 'Booléen',
      codeBlocks: [
        {
          id: 'usestate-t-booleen',
          filename: 'Modale.tsx',
          language: 'tsx',
          code: `import { useState } from "react";

const [ouvert, setOuvert] = useState(false);

setOuvert(!ouvert);`,
        },
      ],
      replacements: [
        { token: 'ouvert / setOuvert', description: 'le nom de ton booléen + son setter' },
        { token: 'false', description: 'la valeur de départ (true / false)' },
      ],
      placement: 'Idéal pour afficher/masquer : {ouvert && <Modale />}. Le clic fait setOuvert(!ouvert).',
    },
    {
      id: 'liste',
      label: 'Liste',
      codeBlocks: [
        {
          id: 'usestate-t-liste',
          filename: 'Liste.tsx',
          language: 'tsx',
          code: `import { useState } from "react";

const [items, setItems] = useState<string[]>([]);

setItems([...items, "nouveau"]);`,
        },
      ],
      replacements: [
        { token: 'items / setItems', description: 'le nom de ta liste + son setter' },
        { token: 'string[]', description: 'le type des éléments (string, number, un type à toi…)' },
        { token: '"nouveau"', description: 'l’élément à ajouter' },
      ],
      placement:
        'Toujours créer un NOUVEAU tableau ([...items, x]) — ne jamais faire items.push(). Sinon React ne re-rend pas.',
    },
    {
      id: 'objet',
      label: 'Objet',
      codeBlocks: [
        {
          id: 'usestate-t-objet',
          filename: 'Profil.tsx',
          language: 'tsx',
          code: `import { useState } from "react";

const [user, setUser] = useState({ nom: "", age: 0 });

setUser({ ...user, nom: "Alice" });`,
        },
      ],
      replacements: [
        { token: 'user / setUser', description: 'le nom de ton objet + son setter' },
        { token: '{ nom: "", age: 0 }', description: 'la forme de départ de l’objet' },
        { token: 'nom: "Alice"', description: 'la ou les propriétés à mettre à jour' },
      ],
      placement:
        'Copie l’objet existant avec ...user, puis remplace la propriété voulue. Ne modifie jamais user directement.',
    },
  ],
};
