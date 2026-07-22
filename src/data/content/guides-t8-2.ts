import type { ReadyContent } from '@/types/content';
import { guide } from './_factory';

export const guidesT82Content: ReadyContent[] = [
  // ————— Créer un panier e-commerce —————
  guide({
    id: 'GUIDE-W6-118',
    slug: 'creer-un-panier-e-commerce',
    title: 'Créer un panier e-commerce',
    shortTitle: 'Panier',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Ajouter des produits à un panier, gérer les quantités et calculer le total en direct.',
    objective: 'Un panier qui additionne les produits et met à jour le total automatiquement.',
    preview:
      'Une liste de produits avec un bouton « Ajouter » ; le panier affiche chaque ligne, sa quantité, et le total en euros.',
    aliases: ['panier', 'cart', 'e-commerce', 'boutique', 'ajouter au panier'],
    keywords: ['panier react', 'ajouter au panier', 'quantite', 'total prix', 'shopping cart'],
    relatedContentIds: [],
    files: ['Panier.tsx'],
    steps: [
      {
        id: 'w6-118-e1',
        title: 'Un state tableau pour le panier',
        goal: 'Mémoriser les articles ajoutés.',
        explanation:
          'Le panier est une <b>liste d’articles</b>, donc on le stocke dans un <code>useState</code> qui contient un tableau. On part d’un tableau vide : au démarrage, le panier ne contient rien. Chaque article garde son <code>id</code>, son <code>nom</code>, son <code>prix</code> et sa <code>quantite</code>, ce qui suffira pour l’afficher et calculer le total.',
        files: ['Panier.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-118-cb1',
            filename: 'Panier.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

// Le type d'une ligne du panier
type Article = { id: number; nom: string; prix: number; quantite: number };

// Le catalogue des produits proposés à la vente
const catalogue = [
  { id: 1, nom: "T-shirt", prix: 20 },
  { id: 2, nom: "Casquette", prix: 15 },
];

// Le panier démarre vide
const [panier, setPanier] = useState<Article[]>([]);`,
          },
        ],
        result: 'On a un panier vide prêt à recevoir des articles.',
      },
      {
        id: 'w6-118-e2',
        title: 'Ajouter un produit (ou incrémenter)',
        goal: 'Gérer le clic sur « Ajouter ».',
        explanation:
          'Quand on ajoute un produit déjà présent, on ne crée pas une deuxième ligne : on <b>augmente sa quantité</b>. On cherche donc l’article avec <code>find</code>. S’il existe, on renvoie un nouveau tableau où sa quantité est <code>+1</code> (avec <code>map</code>). Sinon, on ajoute une nouvelle ligne avec <code>quantite: 1</code>. On crée toujours un <b>nouveau tableau</b> pour que React détecte le changement.',
        files: ['Panier.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-118-cb2',
            filename: 'Panier.tsx',
            language: 'tsx',
            code: `function ajouter(produit: { id: number; nom: string; prix: number }) {
  setPanier((actuel) => {
    const existant = actuel.find((a) => a.id === produit.id);
    if (existant) {
      // Déjà dans le panier : on augmente juste la quantité
      return actuel.map((a) =>
        a.id === produit.id ? { ...a, quantite: a.quantite + 1 } : a
      );
    }
    // Nouveau produit : on l'ajoute avec une quantité de 1
    return [...actuel, { ...produit, quantite: 1 }];
  });
}`,
          },
        ],
        result: 'Cliquer plusieurs fois sur un produit augmente sa quantité au lieu de le dupliquer.',
      },
      {
        id: 'w6-118-e3',
        title: 'Retirer un article',
        goal: 'Supprimer une ligne du panier.',
        explanation:
          'Pour vider une ligne, on garde tous les articles <b>sauf</b> celui dont l’<code>id</code> correspond, grâce à <code>filter</code>. Comme <code>filter</code> renvoie un nouveau tableau, React ré-affiche le panier sans l’article retiré. C’est la même logique que pour n’importe quelle suppression dans une liste.',
        files: ['Panier.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-118-cb3',
            filename: 'Panier.tsx',
            language: 'tsx',
            code: `function retirer(id: number) {
  // On garde toutes les lignes sauf celle qu'on retire
  setPanier((actuel) => actuel.filter((a) => a.id !== id));
}`,
          },
        ],
        result: 'On peut retirer n’importe quel article du panier.',
      },
      {
        id: 'w6-118-e4',
        title: 'Calculer le total',
        goal: 'Additionner prix × quantité.',
        explanation:
          'Le total ne se stocke <b>pas</b> dans un state : on le <b>dérive</b> du panier à chaque rendu avec <code>reduce</code>. Pour chaque ligne, on ajoute <code>prix × quantite</code> à l’accumulateur qui démarre à <code>0</code>. Ainsi le total reste toujours cohérent avec le contenu du panier, sans risque d’oubli de mise à jour.',
        files: ['Panier.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-118-cb4',
            filename: 'Panier.tsx',
            language: 'tsx',
            code: `// Le total est recalculé à chaque rendu, jamais stocké
const total = panier.reduce(
  (somme, a) => somme + a.prix * a.quantite,
  0
);`,
          },
        ],
        result: 'Le total suit automatiquement les ajouts et retraits.',
      },
      {
        id: 'w6-118-e5',
        title: 'Afficher catalogue et panier',
        goal: 'Relier le tout dans le JSX.',
        explanation:
          'On affiche le catalogue avec un bouton « Ajouter » par produit, et le panier ligne par ligne avec sa quantité et un bouton « Retirer ». Chaque élément listé reçoit une <code>key</code> unique (son <code>id</code>) pour que React suive correctement les lignes. Le total s’affiche en bas, formaté en euros.',
        files: ['Panier.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-118-cb5',
            filename: 'Panier.tsx',
            language: 'tsx',
            code: `return (
  <div>
    <h2>Boutique</h2>
    {catalogue.map((p) => (
      <div key={p.id}>
        {p.nom} — {p.prix} €
        <button type="button" onClick={() => ajouter(p)}>Ajouter</button>
      </div>
    ))}

    <h2>Panier</h2>
    {panier.map((a) => (
      <div key={a.id}>
        {a.nom} × {a.quantite} = {a.prix * a.quantite} €
        <button type="button" onClick={() => retirer(a.id)}>Retirer</button>
      </div>
    ))}

    <p><b>Total : {total} €</b></p>
  </div>
);`,
          },
        ],
        result: 'On ajoute, on retire, et le total se met à jour en direct.',
      },
    ],
    finalResult:
      'Un panier complet : ajout avec incrémentation, retrait, quantités et total dérivé — le tout sans librairie.',
    pitfalls: [
      'Modifier le tableau existant au lieu d’en créer un nouveau : React ne verra pas le changement.',
      'Stocker le total dans un state : il se désynchronise vite, mieux vaut le dériver du panier.',
    ],
    variations: [
      'Ajouter un bouton « + / − » sur chaque ligne pour ajuster la quantité.',
      'Persister le panier dans le localStorage pour le retrouver au rechargement.',
      'Afficher le nombre total d’articles dans une pastille sur l’icône du panier.',
    ],
  }),

  // ————— Créer une todo list —————
  guide({
    id: 'GUIDE-W6-119',
    slug: 'creer-une-todo-list',
    title: 'Créer une todo list',
    shortTitle: 'Todo list',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Ajouter, cocher et supprimer des tâches dans une liste gérée par un state tableau.',
    objective: 'Une liste de tâches où l’on ajoute, coche et supprime chaque item.',
    preview:
      'Un champ « Nouvelle tâche » avec un bouton « Ajouter » ; chaque tâche a une case à cocher et un bouton « Supprimer ».',
    aliases: ['todo', 'todo list', 'liste de taches', 'todolist', 'checklist'],
    keywords: ['todo list react', 'ajouter tache', 'cocher tache', 'supprimer tache', 'liste'],
    relatedContentIds: [],
    files: ['TodoList.tsx'],
    steps: [
      {
        id: 'w6-119-e1',
        title: 'States : liste + saisie',
        goal: 'Préparer les tâches et le champ.',
        explanation:
          'Il faut deux states : un tableau pour les <b>tâches</b> (vide au départ) et une chaîne pour le <b>texte en cours de saisie</b>. Séparer les deux permet de contrôler le champ à la frappe sans toucher à la liste tant que l’utilisateur n’a pas validé. Chaque tâche portera un <code>id</code>, un <code>texte</code> et un booléen <code>fait</code>.',
        files: ['TodoList.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-119-cb1',
            filename: 'TodoList.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

type Tache = { id: number; texte: string; fait: boolean };

// La liste des tâches, vide au démarrage
const [taches, setTaches] = useState<Tache[]>([]);
// Le texte tapé dans le champ (champ contrôlé)
const [saisie, setSaisie] = useState("");`,
          },
        ],
        result: 'On a une liste vide et un champ prêt à recevoir du texte.',
      },
      {
        id: 'w6-119-e2',
        title: 'Ajouter une tâche',
        goal: 'Créer un item à la validation.',
        explanation:
          'À l’ajout, on ignore les saisies vides avec <code>trim()</code> pour ne pas créer de tâche fantôme. On construit une nouvelle tâche avec un <code>id</code> unique (ici <code>Date.now()</code>) et <code>fait: false</code>, puis on l’ajoute à un <b>nouveau tableau</b>. Enfin, on vide le champ pour préparer la saisie suivante.',
        files: ['TodoList.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-119-cb2',
            filename: 'TodoList.tsx',
            language: 'tsx',
            code: `function ajouter() {
  // On ignore une saisie vide ou faite uniquement d'espaces
  if (saisie.trim() === "") return;

  const nouvelle: Tache = {
    id: Date.now(), // identifiant simple et unique
    texte: saisie,
    fait: false,
  };

  setTaches((actuel) => [...actuel, nouvelle]);
  setSaisie(""); // on vide le champ après l'ajout
}`,
          },
        ],
        result: 'Une tâche apparaît en bas de la liste et le champ se vide.',
      },
      {
        id: 'w6-119-e3',
        title: 'Cocher / décocher',
        goal: 'Basculer l’état « fait » d’une tâche.',
        explanation:
          'Cocher une tâche revient à <b>inverser</b> son booléen <code>fait</code>. On parcourt la liste avec <code>map</code> : pour la tâche visée, on renvoie une copie avec <code>fait</code> inversé (<code>!t.fait</code>), les autres restent identiques. On obtient un nouveau tableau, donc React ré-affiche avec la case à jour.',
        files: ['TodoList.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-119-cb3',
            filename: 'TodoList.tsx',
            language: 'tsx',
            code: `function basculer(id: number) {
  setTaches((actuel) =>
    actuel.map((t) =>
      // La tâche visée : on inverse son état "fait"
      t.id === id ? { ...t, fait: !t.fait } : t
    )
  );
}`,
          },
        ],
        result: 'Cliquer sur une case marque la tâche comme faite ou non.',
      },
      {
        id: 'w6-119-e4',
        title: 'Supprimer une tâche',
        goal: 'Retirer un item de la liste.',
        explanation:
          'La suppression garde toutes les tâches <b>sauf</b> celle ciblée grâce à <code>filter</code>. Comme partout, on renvoie un nouveau tableau plutôt que de modifier l’ancien, ce qui garantit un ré-affichage propre.',
        files: ['TodoList.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-119-cb4',
            filename: 'TodoList.tsx',
            language: 'tsx',
            code: `function supprimer(id: number) {
  // On garde toutes les tâches sauf celle qu'on supprime
  setTaches((actuel) => actuel.filter((t) => t.id !== id));
}`,
          },
        ],
        result: 'La tâche disparaît de la liste au clic.',
      },
      {
        id: 'w6-119-e5',
        title: 'Assembler l’interface',
        goal: 'Champ, bouton et rendu des tâches.',
        explanation:
          'Le champ est <b>contrôlé</b> : sa <code>value</code> vient de <code>saisie</code> et <code>onChange</code> la met à jour. On affiche chaque tâche avec sa case cochée selon <code>fait</code>, un texte barré si elle est faite, et un bouton « Supprimer ». La <code>key</code> unique (l’<code>id</code>) aide React à suivre chaque ligne.',
        files: ['TodoList.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-119-cb5',
            filename: 'TodoList.tsx',
            language: 'tsx',
            code: `return (
  <div>
    <input
      value={saisie}
      onChange={(e) => setSaisie(e.target.value)}
      placeholder="Nouvelle tâche"
    />
    <button type="button" onClick={ajouter}>Ajouter</button>

    <ul>
      {taches.map((t) => (
        <li key={t.id}>
          <input
            type="checkbox"
            checked={t.fait}
            onChange={() => basculer(t.id)}
          />
          <span style={{ textDecoration: t.fait ? "line-through" : "none" }}>
            {t.texte}
          </span>
          <button type="button" onClick={() => supprimer(t.id)}>Supprimer</button>
        </li>
      ))}
    </ul>
  </div>
);`,
          },
        ],
        result: 'On ajoute, coche et supprime des tâches, tout se met à jour en direct.',
      },
    ],
    finalResult:
      'Une todo list complète : ajout contrôlé, cases à cocher, suppression — la base parfaite pour s’exercer au state tableau.',
    pitfalls: [
      'Utiliser l’index du tableau comme key : ça casse le suivi après une suppression, préfère un id stable.',
      'Oublier de vider le champ après l’ajout : la saisie précédente reste affichée.',
    ],
    variations: [
      'Sauvegarder les tâches dans le localStorage pour les retrouver au rechargement.',
      'Ajouter un filtre « Toutes / À faire / Faites ».',
      'Permettre de modifier le texte d’une tâche en double-cliquant dessus.',
    ],
  }),

  // ————— Créer un système de likes et de notes —————
  guide({
    id: 'GUIDE-W6-120',
    slug: 'creer-un-systeme-de-likes-et-de-notes',
    title: 'Créer un système de likes et de notes',
    shortTitle: 'Likes & notes',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Ajouter un bouton like qui bascule et une notation par étoiles cliquables.',
    objective: 'Un bouton « J’aime » qui se coche et une note en étoiles cliquable.',
    preview:
      'Un cœur qui passe de vide à plein au clic avec un compteur ; à côté, cinq étoiles où l’on clique pour noter.',
    aliases: ['like', 'likes', 'notes', 'etoiles', 'rating', 'notation'],
    keywords: ['bouton like react', 'systeme de notes', 'etoiles', 'rating', 'compteur likes'],
    relatedContentIds: [],
    files: ['Likes.tsx', 'Etoiles.tsx'],
    steps: [
      {
        id: 'w6-120-e1',
        title: 'Le state du like',
        goal: 'Mémoriser si c’est liké et combien.',
        explanation:
          'Un like a deux informations : est-ce que <b>moi</b> j’ai liké (un booléen) et le <b>nombre total</b> de likes (un nombre). On les stocke dans deux states séparés. Le booléen sert à afficher le cœur plein ou vide, le nombre sert au compteur.',
        files: ['Likes.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-120-cb1',
            filename: 'Likes.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

// Est-ce que l'utilisateur a liké ?
const [likee, setLikee] = useState(false);
// Nombre total de likes affiché
const [total, setTotal] = useState(42);`,
          },
        ],
        result: 'On connaît l’état du like et son compteur.',
      },
      {
        id: 'w6-120-e2',
        title: 'Basculer le like',
        goal: 'Un clic ajoute ou retire le like.',
        explanation:
          'Au clic, on <b>inverse</b> le booléen et on ajuste le compteur en conséquence : <code>+1</code> si on vient de liker, <code>-1</code> si on retire. On calcule d’abord la nouvelle valeur du booléen dans une variable pour l’utiliser à la fois pour le state et pour le compteur, ce qui évite toute incohérence.',
        files: ['Likes.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-120-cb2',
            filename: 'Likes.tsx',
            language: 'tsx',
            code: `function basculerLike() {
  const nouveau = !likee; // l'état visé après le clic
  setLikee(nouveau);
  // On ajoute 1 si on vient de liker, on retire 1 sinon
  setTotal((t) => t + (nouveau ? 1 : -1));
}

return (
  <button type="button" onClick={basculerLike}>
    {likee ? "❤️" : "🤍"} {total}
  </button>
);`,
          },
        ],
        result: 'Le cœur se remplit et le compteur monte, ou l’inverse.',
      },
      {
        id: 'w6-120-e3',
        title: 'Le state de la note',
        goal: 'Mémoriser la note en étoiles.',
        explanation:
          'La notation est un simple nombre de 0 à 5. On le stocke dans un state <code>note</code> (0 = pas encore noté). On prépare aussi un petit tableau <code>[1, 2, 3, 4, 5]</code> pour dessiner cinq étoiles avec <code>map</code> plutôt que d’écrire cinq fois la même chose.',
        files: ['Etoiles.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-120-cb3',
            filename: 'Etoiles.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

// La note choisie, de 0 (aucune) à 5
const [note, setNote] = useState(0);

// Les cinq positions d'étoiles à dessiner
const etoiles = [1, 2, 3, 4, 5];`,
          },
        ],
        result: 'On sait quelle note l’utilisateur a choisie.',
      },
      {
        id: 'w6-120-e4',
        title: 'Étoiles cliquables',
        goal: 'Noter en cliquant sur une étoile.',
        explanation:
          'Pour chaque position, on affiche une étoile pleine si sa valeur est <b>inférieure ou égale</b> à la note choisie, vide sinon. Un clic sur la 4ᵉ étoile appelle <code>setNote(4)</code>, ce qui remplit d’un coup les étoiles 1 à 4. La <code>key</code> est le numéro de l’étoile, unique dans la liste.',
        files: ['Etoiles.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-120-cb4',
            filename: 'Etoiles.tsx',
            language: 'tsx',
            code: `return (
  <div>
    {etoiles.map((valeur) => (
      <button
        key={valeur}
        type="button"
        onClick={() => setNote(valeur)}
      >
        {/* Étoile pleine si sa valeur est atteinte, vide sinon */}
        {valeur <= note ? "★" : "☆"}
      </button>
    ))}
    <p>Note : {note} / 5</p>
  </div>
);`,
          },
        ],
        result: 'Cliquer sur une étoile fixe la note et remplit les précédentes.',
      },
    ],
    finalResult:
      'Un bouton like qui bascule avec son compteur, et une note en étoiles cliquable — deux briques d’interaction très réutilisables.',
    pitfalls: [
      'Oublier d’ajuster le compteur en même temps que le booléen : le cœur et le nombre se contredisent.',
      'Comparer avec < au lieu de <= pour les étoiles : la dernière étoile choisie resterait vide.',
    ],
    variations: [
      'Afficher un survol (hover) qui prévisualise la note avant le clic.',
      'Autoriser les demi-étoiles pour des notes plus fines.',
      'Envoyer le like et la note à une API pour les enregistrer.',
    ],
  }),

  // ————— Créer un upload d’image —————
  guide({
    id: 'GUIDE-W6-121',
    slug: 'creer-un-upload-d-image',
    title: 'Créer un upload d’image',
    shortTitle: 'Upload image',
    technology: 'react',
    tomeId: 't8',
    summary:
      'Sélectionner une image dans un input file et afficher son aperçu avant envoi.',
    objective: 'Un champ qui laisse choisir une image et en montre l’aperçu immédiat.',
    preview:
      'Un bouton « Choisir une image » ; dès qu’un fichier est sélectionné, sa miniature s’affiche en dessous.',
    aliases: ['upload', 'upload image', 'input file', 'apercu image', 'preview'],
    keywords: ['upload image react', 'input file', 'apercu image', 'preview fichier', 'createObjectURL'],
    relatedContentIds: [],
    files: ['UploadImage.tsx'],
    steps: [
      {
        id: 'w6-121-e1',
        title: 'State pour l’aperçu',
        goal: 'Mémoriser l’URL de prévisualisation.',
        explanation:
          'On stocke dans un state l’<b>URL d’aperçu</b> de l’image choisie. Au départ elle est vide (chaîne vide) : aucune image n’est encore sélectionnée. C’est cette URL qui alimentera la balise <code>img</code> plus loin.',
        files: ['UploadImage.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-121-cb1',
            filename: 'UploadImage.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

// L'URL locale de l'image à prévisualiser (vide au départ)
const [apercu, setApercu] = useState("");`,
          },
        ],
        result: 'On a un endroit où ranger l’aperçu de l’image.',
      },
      {
        id: 'w6-121-e2',
        title: 'Le champ input file',
        goal: 'Laisser l’utilisateur choisir un fichier.',
        explanation:
          'On utilise un <code>input</code> de type <code>file</code> limité aux images grâce à <code>accept="image/*"</code>. Contrairement à un champ texte, un input file n’est <b>pas contrôlé</b> par un state : on écoute simplement son événement <code>onChange</code> pour récupérer le fichier choisi.',
        files: ['UploadImage.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-121-cb2',
            filename: 'UploadImage.tsx',
            language: 'tsx',
            code: `<input
  type="file"
  accept="image/*"      // on n'accepte que des images
  onChange={gererFichier}
/>`,
          },
        ],
        result: 'L’utilisateur peut ouvrir sa galerie et choisir une image.',
      },
      {
        id: 'w6-121-e3',
        title: 'Récupérer le fichier et créer l’aperçu',
        goal: 'Transformer le fichier en URL affichable.',
        explanation:
          'Le fichier choisi se trouve dans <code>e.target.files[0]</code> (le premier, s’il existe). Pour l’afficher sans l’envoyer sur un serveur, on génère une URL locale et temporaire avec <code>URL.createObjectURL(fichier)</code>. On range cette URL dans le state <code>apercu</code>, ce qui déclenche le ré-affichage de la miniature.',
        files: ['UploadImage.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-121-cb3',
            filename: 'UploadImage.tsx',
            language: 'tsx',
            code: `function gererFichier(e: React.ChangeEvent<HTMLInputElement>) {
  const fichier = e.target.files?.[0];
  if (!fichier) return; // l'utilisateur a annulé

  // URL locale temporaire pour afficher l'image tout de suite
  const url = URL.createObjectURL(fichier);
  setApercu(url);
}`,
          },
        ],
        result: 'Dès qu’un fichier est choisi, son URL d’aperçu est prête.',
      },
      {
        id: 'w6-121-e4',
        title: 'Afficher la miniature',
        goal: 'Montrer l’image seulement si elle existe.',
        explanation:
          'On n’affiche la balise <code>img</code> que si <code>apercu</code> contient une URL, grâce au rendu conditionnel <code>{apercu && ( … )}</code>. Tant qu’aucune image n’est choisie, rien ne s’affiche. On limite la largeur pour obtenir une vraie miniature.',
        files: ['UploadImage.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'w6-121-cb4',
            filename: 'UploadImage.tsx',
            language: 'tsx',
            code: `return (
  <div>
    <input type="file" accept="image/*" onChange={gererFichier} />

    {/* L'aperçu n'apparaît que si une image a été choisie */}
    {apercu && (
      <img src={apercu} alt="Aperçu" style={{ maxWidth: 200 }} />
    )}
  </div>
);`,
          },
        ],
        result: 'La miniature de l’image choisie s’affiche instantanément.',
      },
    ],
    finalResult:
      'Un upload d’image avec aperçu immédiat : input file + URL.createObjectURL + rendu conditionnel, sans aucun envoi réseau.',
    pitfalls: [
      'Oublier de vérifier que files[0] existe : cliquer « Annuler » planterait le code.',
      'Croire que l’image est enregistrée : createObjectURL ne fait qu’un aperçu local, il faut ensuite l’envoyer à un serveur.',
    ],
    variations: [
      'Envoyer réellement le fichier à une API avec FormData.',
      'Autoriser plusieurs images en parcourant tout e.target.files.',
      'Valider la taille du fichier avant d’accepter l’aperçu.',
    ],
  }),
];
