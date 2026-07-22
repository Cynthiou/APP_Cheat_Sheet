import type { ReadyContent } from '@/types/content';
import { guide } from './_factory';

export const guidesT171Content: ReadyContent[] = [
  // ————— Une todo app full-stack —————
  guide({
    id: 'GUIDE-W6-136',
    slug: 'une-todo-app-full-stack',
    title: 'Une todo app full-stack',
    shortTitle: 'Todo full-stack',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Relier un front React à une API Express et une base SQLite pour créer, cocher et supprimer des tâches qui restent enregistrées.',
    objective: 'Une liste de tâches persistée en base, pilotée depuis React.',
    preview:
      'Tu tapes une tâche, elle part vers le serveur, s’enregistre en base et réapparaît même après un rechargement de la page.',
    aliases: ['todo', 'todo app', 'liste de taches', 'full stack todo', 'crud taches'],
    keywords: ['todo full stack', 'express react sqlite', 'crud taches', 'api rest todo', 'persistance'],
    relatedContentIds: [],
    files: ['server.js', 'db.js', 'api.ts', 'App.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-136-e1',
        title: 'La base de données SQLite',
        goal: 'Créer la table qui stocke les tâches.',
        explanation:
          'Une todo app n’a de sens que si les tâches <b>survivent</b> au rechargement : il faut donc les écrire quelque part. On ouvre un fichier SQLite avec <code>better-sqlite3</code> (aucun serveur à installer, tout tient dans un fichier <code>todo.db</code>) et on crée la table <code>taches</code> si elle n’existe pas encore. Chaque tâche a un <code>id</code>, un <code>titre</code> et un booléen <code>faite</code> stocké en 0/1.',
        files: ['db.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-136-cb1',
            filename: 'db.js',
            language: 'javascript',
            code: `import Database from "better-sqlite3";

// Ouvre (ou crée) le fichier de base de données
export const db = new Database("todo.db");

// Crée la table une seule fois si elle n'existe pas encore
db.exec("CREATE TABLE IF NOT EXISTS taches (id INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT NOT NULL, faite INTEGER NOT NULL DEFAULT 0)");`,
          },
        ],
        result: 'On a un stockage durable pour les tâches.',
      },
      {
        id: 'GUIDE-W6-136-e2',
        title: 'L’API Express (lister et créer)',
        goal: 'Exposer les tâches via des routes HTTP.',
        explanation:
          'Le front ne parle jamais à la base directement : il passe par une <b>API</b>. On active <code>cors</code> pour autoriser le front à appeler le serveur, et <code>express.json()</code> pour lire le corps JSON des requêtes. La route <code>GET /taches</code> renvoie tout, <code>POST /taches</code> insère une ligne et renvoie la tâche créée avec son nouvel <code>id</code>.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-136-cb2',
            filename: 'server.js',
            language: 'javascript',
            code: `import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(cors());          // autorise le front à appeler l'API
app.use(express.json());  // lit le corps JSON des requêtes

// Lister toutes les tâches
app.get("/taches", (req, res) => {
  const taches = db.prepare("SELECT * FROM taches").all();
  res.json(taches);
});

// Créer une tâche
app.post("/taches", (req, res) => {
  const { titre } = req.body;
  const info = db.prepare("INSERT INTO taches (titre) VALUES (?)").run(titre);
  res.status(201).json({ id: info.lastInsertRowid, titre, faite: 0 });
});

app.listen(3001, () => console.log("API sur http://localhost:3001"));`,
          },
        ],
        result: 'Le serveur répond aux requêtes de lecture et de création.',
      },
      {
        id: 'GUIDE-W6-136-e3',
        title: 'Un petit fichier d’appels API côté front',
        goal: 'Centraliser les appels réseau dans un module.',
        explanation:
          'Plutôt que d’éparpiller des <code>fetch</code> dans les composants, on regroupe les appels dans <code>api.ts</code>. C’est plus lisible et, le jour où l’adresse du serveur change, on ne la modifie qu’à <b>un seul endroit</b>. Chaque fonction renvoie déjà le JSON prêt à l’emploi.',
        files: ['api.ts'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-136-cb3',
            filename: 'api.ts',
            language: 'typescript',
            code: `const BASE = "http://localhost:3001";

// Récupère la liste des tâches
export async function getTaches() {
  const r = await fetch(BASE + "/taches");
  return r.json();
}

// Ajoute une tâche et renvoie celle créée
export async function addTache(titre: string) {
  const r = await fetch(BASE + "/taches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titre }),
  });
  return r.json();
}`,
          },
        ],
        result: 'Tous les appels réseau sont réunis et réutilisables.',
      },
      {
        id: 'GUIDE-W6-136-e4',
        title: 'Le composant React qui charge et ajoute',
        goal: 'Afficher les tâches et en créer de nouvelles.',
        explanation:
          'Au premier rendu, <code>useEffect(..., [])</code> charge les tâches déjà en base. Quand l’utilisateur ajoute une tâche, on attend la réponse du serveur (qui contient le vrai <code>id</code>) puis on l’ajoute à l’écran : le state local reste toujours <b>synchrone</b> avec la base. On vide le champ après l’envoi pour enchaîner.',
        files: ['App.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-136-cb4',
            filename: 'App.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from "react";
import { getTaches, addTache } from "./api";

type Tache = { id: number; titre: string; faite: number };

export default function App() {
  const [taches, setTaches] = useState<Tache[]>([]);
  const [titre, setTitre] = useState("");

  // Charge les tâches existantes au montage
  useEffect(() => {
    getTaches().then(setTaches);
  }, []);

  // Envoie la tâche puis l'ajoute à la liste affichée
  async function ajouter() {
    if (!titre.trim()) return;
    const nouvelle = await addTache(titre);
    setTaches([...taches, nouvelle]);
    setTitre("");
  }

  return (
    <div>
      <input value={titre} onChange={(e) => setTitre(e.target.value)} />
      <button onClick={ajouter}>Ajouter</button>
      <ul>
        {taches.map((t) => <li key={t.id}>{t.titre}</li>)}
      </ul>
    </div>
  );
}`,
          },
        ],
        result: 'Les tâches s’affichent et se créent depuis l’interface.',
      },
      {
        id: 'GUIDE-W6-136-e5',
        title: 'Cocher et supprimer',
        goal: 'Compléter le CRUD avec PATCH et DELETE.',
        explanation:
          'Il manque deux actions pour un vrai CRUD. Côté serveur, <code>PATCH /taches/:id</code> met à jour le champ <code>faite</code> et <code>DELETE /taches/:id</code> retire la ligne. Côté front, après la suppression on filtre la liste locale pour retirer la tâche <b>sans recharger toute la page</b>.',
        files: ['server.js', 'App.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-136-cb5',
            filename: 'server.js',
            language: 'javascript',
            code: `// Cocher / décocher une tâche
app.patch("/taches/:id", (req, res) => {
  db.prepare("UPDATE taches SET faite = ? WHERE id = ?").run(req.body.faite ? 1 : 0, req.params.id);
  res.json({ ok: true });
});

// Supprimer une tâche
app.delete("/taches/:id", (req, res) => {
  db.prepare("DELETE FROM taches WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});`,
          },
          {
            id: 'GUIDE-W6-136-cb6',
            filename: 'App.tsx',
            language: 'tsx',
            code: `// Supprime côté serveur puis retire de la liste locale
async function supprimer(id: number) {
  await fetch("http://localhost:3001/taches/" + id, { method: "DELETE" });
  setTaches(taches.filter((t) => t.id !== id));
}`,
          },
        ],
        result: 'Le cycle complet créer / lire / modifier / supprimer fonctionne.',
      },
    ],
    finalResult:
      'Une todo app full-stack : React pour l’interface, Express pour l’API, SQLite pour la persistance, reliés par un CRUD complet.',
    pitfalls: [
      'Oublier CORS côté serveur : le navigateur bloque tous les appels du front.',
      'Ajouter la tâche à l’écran avant la réponse du serveur : tu n’as pas encore son vrai id.',
    ],
  }),

  // ————— Un blog avec articles et commentaires —————
  guide({
    id: 'GUIDE-W6-137',
    slug: 'un-blog-avec-articles-et-commentaires',
    title: 'Un blog avec articles et commentaires',
    shortTitle: 'Blog + commentaires',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Modéliser une relation un-à-plusieurs entre articles et commentaires, l’exposer en API et l’afficher dans une page de détail React.',
    objective: 'Un blog où chaque article affiche ses commentaires et accepte les nouveaux.',
    preview:
      'Une liste d’articles ; en cliquant sur l’un d’eux, tu vois son contenu et, en dessous, ses commentaires avec un formulaire pour en ajouter.',
    aliases: ['blog', 'articles', 'commentaires', 'blog react', 'relation articles commentaires'],
    keywords: ['blog full stack', 'articles commentaires', 'relation un a plusieurs', 'foreign key', 'page detail'],
    relatedContentIds: [],
    files: ['db.js', 'server.js', 'Articles.tsx', 'Article.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-137-e1',
        title: 'Le schéma : deux tables reliées',
        goal: 'Relier chaque commentaire à un article.',
        explanation:
          'Un article possède <b>plusieurs</b> commentaires : c’est une relation un-à-plusieurs. On la traduit par une clé étrangère <code>article_id</code> dans la table <code>commentaires</code>, qui pointe vers l’<code>id</code> d’un article. Ainsi on retrouve tous les commentaires d’un article avec un simple <code>WHERE article_id = ?</code>.',
        files: ['db.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-137-cb1',
            filename: 'db.js',
            language: 'javascript',
            code: `import Database from "better-sqlite3";

export const db = new Database("blog.db");

// Table des articles
db.exec("CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT, titre TEXT NOT NULL, contenu TEXT NOT NULL)");

// Table des commentaires, reliée à un article via article_id
db.exec("CREATE TABLE IF NOT EXISTS commentaires (id INTEGER PRIMARY KEY AUTOINCREMENT, article_id INTEGER NOT NULL, auteur TEXT NOT NULL, texte TEXT NOT NULL, FOREIGN KEY (article_id) REFERENCES articles(id))");`,
          },
        ],
        result: 'La structure relie chaque commentaire à son article.',
      },
      {
        id: 'GUIDE-W6-137-e2',
        title: 'Les routes des articles',
        goal: 'Lister les articles et en afficher un seul.',
        explanation:
          'Deux besoins : la liste (pour la page d’accueil) et le détail (pour une page article). <code>GET /articles</code> renvoie tout, <code>GET /articles/:id</code> renvoie un seul article. Si l’<code>id</code> n’existe pas, on répond un <code>404</code> clair plutôt qu’un objet vide qui casserait le front.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-137-cb2',
            filename: 'server.js',
            language: 'javascript',
            code: `import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Liste des articles
app.get("/articles", (req, res) => {
  res.json(db.prepare("SELECT * FROM articles").all());
});

// Un article précis
app.get("/articles/:id", (req, res) => {
  const article = db.prepare("SELECT * FROM articles WHERE id = ?").get(req.params.id);
  if (!article) return res.status(404).json({ erreur: "Article introuvable" });
  res.json(article);
});

app.listen(3001);`,
          },
        ],
        result: 'On peut lister les articles et en récupérer un.',
      },
      {
        id: 'GUIDE-W6-137-e3',
        title: 'Lire et ajouter des commentaires',
        goal: 'Exposer les commentaires d’un article.',
        explanation:
          'On imbrique les routes sous un article : <code>GET /articles/:id/commentaires</code> filtre par <code>article_id</code>, et <code>POST /articles/:id/commentaires</code> insère un commentaire <b>rattaché</b> à cet article. L’identifiant vient de l’URL (<code>req.params.id</code>), jamais du corps de la requête, pour éviter qu’un client le falsifie.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-137-cb3',
            filename: 'server.js',
            language: 'javascript',
            code: `// Commentaires d'un article
app.get("/articles/:id/commentaires", (req, res) => {
  const liste = db.prepare("SELECT * FROM commentaires WHERE article_id = ?").all(req.params.id);
  res.json(liste);
});

// Ajouter un commentaire à cet article
app.post("/articles/:id/commentaires", (req, res) => {
  const { auteur, texte } = req.body;
  const info = db
    .prepare("INSERT INTO commentaires (article_id, auteur, texte) VALUES (?, ?, ?)")
    .run(req.params.id, auteur, texte);
  res.status(201).json({ id: info.lastInsertRowid, article_id: Number(req.params.id), auteur, texte });
});`,
          },
        ],
        result: 'Les commentaires sont liés et récupérables par article.',
      },
      {
        id: 'GUIDE-W6-137-e4',
        title: 'La liste des articles en React',
        goal: 'Afficher les articles avec un lien vers le détail.',
        explanation:
          'La page d’accueil charge la liste et affiche chaque titre. On garde ici un <code>onSelect</code> qui remonte l’<code>id</code> choisi au parent : c’est lui qui décidera d’afficher la page de détail. On sépare bien <b>la liste</b> et <b>le détail</b> en deux composants pour que chacun reste simple.',
        files: ['Articles.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-137-cb4',
            filename: 'Articles.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from "react";

type Article = { id: number; titre: string };

export function Articles({ onSelect }: { onSelect: (id: number) => void }) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((r) => r.json())
      .then(setArticles);
  }, []);

  return (
    <ul>
      {articles.map((a) => (
        <li key={a.id}>
          <button onClick={() => onSelect(a.id)}>{a.titre}</button>
        </li>
      ))}
    </ul>
  );
}`,
          },
        ],
        result: 'La liste des articles s’affiche et permet d’ouvrir un article.',
      },
      {
        id: 'GUIDE-W6-137-e5',
        title: 'Le détail de l’article et ses commentaires',
        goal: 'Charger l’article, ses commentaires et le formulaire.',
        explanation:
          'La page de détail charge <b>deux</b> ressources : l’article et ses commentaires. On refait le chargement à chaque changement d’<code>id</code> grâce au tableau de dépendances <code>[id]</code>. Après l’envoi d’un commentaire, on l’ajoute à la liste locale pour un retour visuel immédiat.',
        files: ['Article.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-137-cb5',
            filename: 'Article.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from "react";

type Commentaire = { id: number; auteur: string; texte: string };

export function Article({ id }: { id: number }) {
  const [article, setArticle] = useState<{ titre: string; contenu: string } | null>(null);
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);

  // Recharge dès que l'article sélectionné change
  useEffect(() => {
    fetch("http://localhost:3001/articles/" + id).then((r) => r.json()).then(setArticle);
    fetch("http://localhost:3001/articles/" + id + "/commentaires")
      .then((r) => r.json())
      .then(setCommentaires);
  }, [id]);

  async function ajouterCommentaire(auteur: string, texte: string) {
    const r = await fetch("http://localhost:3001/articles/" + id + "/commentaires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auteur, texte }),
    });
    const nouveau = await r.json();
    setCommentaires([...commentaires, nouveau]);
  }

  if (!article) return <p>Chargement…</p>;
  return (
    <article>
      <h1>{article.titre}</h1>
      <p>{article.contenu}</p>
      <h2>Commentaires</h2>
      {commentaires.map((c) => (
        <p key={c.id}><b>{c.auteur}</b> : {c.texte}</p>
      ))}
      <button onClick={() => ajouterCommentaire("Anonyme", "Super article !")}>
        Commenter
      </button>
    </article>
  );
}`,
          },
        ],
        result: 'La page affiche l’article, ses commentaires et en accepte de nouveaux.',
      },
    ],
    finalResult:
      'Un blog full-stack avec relation articles/commentaires : deux tables reliées, des routes imbriquées et une page de détail React qui charge tout au bon moment.',
    pitfalls: [
      'Prendre l’article_id dans le corps de la requête plutôt que dans l’URL : un client pourrait viser un autre article.',
      'Oublier de recharger sur changement d’id ([id] en dépendance) : le détail resterait figé sur le premier article.',
    ],
  }),

  // ————— Un e-commerce avec produits, panier et commande —————
  guide({
    id: 'GUIDE-W6-138',
    slug: 'un-e-commerce-avec-produits-panier-et-commande',
    title: 'Un e-commerce avec produits, panier et commande',
    shortTitle: 'E-commerce',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Afficher un catalogue venant de l’API, gérer un panier en state React et envoyer la commande finale au serveur.',
    objective: 'Un tunnel d’achat : catalogue, panier, total, validation.',
    preview:
      'Tu ajoutes des produits au panier, le total se met à jour, et « Commander » enregistre la commande côté serveur.',
    aliases: ['e-commerce', 'ecommerce', 'panier', 'boutique', 'commande', 'checkout'],
    keywords: ['boutique react', 'panier state', 'total panier', 'passer commande', 'tunnel achat'],
    relatedContentIds: [],
    files: ['server.js', 'Boutique.tsx', 'Panier.tsx', 'Commande.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-138-e1',
        title: 'L’API du catalogue et des commandes',
        goal: 'Servir les produits et enregistrer une commande.',
        explanation:
          'Le serveur expose les produits en lecture et accepte une commande en écriture. <code>GET /produits</code> renvoie le catalogue ; <code>POST /commandes</code> reçoit les lignes du panier et calcule le total <b>côté serveur</b> — jamais côté client, car un prix envoyé par le navigateur n’est pas fiable.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-138-cb1',
            filename: 'server.js',
            language: 'javascript',
            code: `import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Catalogue
app.get("/produits", (req, res) => {
  res.json(db.prepare("SELECT * FROM produits").all());
});

// Passer commande : on recalcule le total à partir des vrais prix en base
app.post("/commandes", (req, res) => {
  const { lignes } = req.body; // [{ produitId, quantite }]
  let total = 0;
  for (const l of lignes) {
    const p = db.prepare("SELECT prix FROM produits WHERE id = ?").get(l.produitId);
    total += p.prix * l.quantite;
  }
  const info = db.prepare("INSERT INTO commandes (total) VALUES (?)").run(total);
  res.status(201).json({ id: info.lastInsertRowid, total });
});

app.listen(3001);`,
          },
        ],
        result: 'Le catalogue est servi et une commande peut être enregistrée.',
      },
      {
        id: 'GUIDE-W6-138-e2',
        title: 'Le catalogue et l’ajout au panier',
        goal: 'Afficher les produits et remplir le panier.',
        explanation:
          'Le panier est un simple tableau en state, où chaque entrée porte un <code>produitId</code> et une <code>quantite</code>. Quand on ajoute un produit déjà présent, on <b>incrémente</b> sa quantité au lieu de créer un doublon. On remonte le panier au parent via <code>onAjouter</code> pour qu’il soit partagé avec le récapitulatif.',
        files: ['Boutique.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-138-cb2',
            filename: 'Boutique.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from "react";

type Produit = { id: number; nom: string; prix: number };

export function Boutique({ onAjouter }: { onAjouter: (id: number) => void }) {
  const [produits, setProduits] = useState<Produit[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/produits").then((r) => r.json()).then(setProduits);
  }, []);

  return (
    <div>
      {produits.map((p) => (
        <div key={p.id}>
          <span>{p.nom} — {p.prix} €</span>
          <button onClick={() => onAjouter(p.id)}>Ajouter au panier</button>
        </div>
      ))}
    </div>
  );
}`,
          },
        ],
        result: 'Les produits s’affichent et alimentent le panier.',
      },
      {
        id: 'GUIDE-W6-138-e3',
        title: 'La logique du panier',
        goal: 'Ajouter, incrémenter et calculer le total.',
        explanation:
          'On centralise le panier dans le composant parent. La fonction <code>ajouter</code> cherche si le produit existe déjà : si oui elle augmente la quantité, sinon elle crée une ligne. Le total s’obtient par <code>reduce</code> sur les lignes — on le <b>dérive</b> du panier plutôt que de le stocker, pour qu’il reste toujours juste.',
        files: ['Panier.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-138-cb3',
            filename: 'Panier.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

type Ligne = { produitId: number; quantite: number };

export function usePanier() {
  const [lignes, setLignes] = useState<Ligne[]>([]);

  // Ajoute un produit ou incrémente sa quantité
  function ajouter(produitId: number) {
    const existe = lignes.find((l) => l.produitId === produitId);
    if (existe) {
      setLignes(lignes.map((l) => (l.produitId === produitId ? { ...l, quantite: l.quantite + 1 } : l)));
    } else {
      setLignes([...lignes, { produitId, quantite: 1 }]);
    }
  }

  return { lignes, ajouter };
}`,
          },
        ],
        result: 'Le panier gère quantités et doublons proprement.',
      },
      {
        id: 'GUIDE-W6-138-e4',
        title: 'Le récapitulatif avec le total',
        goal: 'Afficher les lignes et le montant à payer.',
        explanation:
          'Pour afficher des noms et des prix, le récapitulatif croise les lignes du panier avec le catalogue chargé. Le total affiché est <b>indicatif</b> : c’est le serveur qui fait foi au moment de la commande. On calcule ici avec <code>reduce</code> pour donner un aperçu instantané à l’utilisateur.',
        files: ['Commande.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-138-cb4',
            filename: 'Commande.tsx',
            language: 'tsx',
            code: `type Produit = { id: number; nom: string; prix: number };
type Ligne = { produitId: number; quantite: number };

export function Recap({ lignes, produits }: { lignes: Ligne[]; produits: Produit[] }) {
  const total = lignes.reduce((somme, l) => {
    const p = produits.find((x) => x.id === l.produitId);
    return somme + (p ? p.prix * l.quantite : 0);
  }, 0);

  return (
    <div>
      {lignes.map((l) => {
        const p = produits.find((x) => x.id === l.produitId);
        return <p key={l.produitId}>{p?.nom} × {l.quantite}</p>;
      })}
      <strong>Total : {total} €</strong>
    </div>
  );
}`,
          },
        ],
        result: 'L’utilisateur voit le détail et le montant estimé.',
      },
      {
        id: 'GUIDE-W6-138-e5',
        title: 'Valider la commande',
        goal: 'Envoyer le panier au serveur.',
        explanation:
          'La validation envoie <b>uniquement</b> les identifiants et les quantités : le serveur recalcule le total avec ses propres prix. On récupère l’<code>id</code> de commande renvoyé pour afficher une confirmation, puis on vide le panier pour repartir propre.',
        files: ['Commande.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-138-cb5',
            filename: 'Commande.tsx',
            language: 'tsx',
            code: `// N'envoie que produitId + quantite ; le serveur fait le calcul officiel
async function commander(lignes: { produitId: number; quantite: number }[]) {
  const r = await fetch("http://localhost:3001/commandes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lignes }),
  });
  const commande = await r.json();
  alert("Commande n°" + commande.id + " enregistrée. Total : " + commande.total + " €");
}`,
          },
        ],
        result: 'La commande part au serveur et l’utilisateur reçoit une confirmation.',
      },
    ],
    finalResult:
      'Un mini e-commerce full-stack : catalogue servi par l’API, panier géré en state React et commande validée dont le total est recalculé côté serveur.',
    pitfalls: [
      'Faire confiance au prix envoyé par le front : recalcule toujours le total côté serveur.',
      'Créer un doublon au lieu d’incrémenter la quantité quand un produit est déjà au panier.',
    ],
  }),

  // ————— Un réseau social simple avec posts et likes —————
  guide({
    id: 'GUIDE-W6-139',
    slug: 'un-reseau-social-simple-avec-posts-et-likes',
    title: 'Un réseau social simple avec posts et likes',
    shortTitle: 'Posts + likes',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Publier des posts, les afficher dans un fil et gérer un compteur de likes qui bascule à chaque clic, front et back synchronisés.',
    objective: 'Un fil de posts likables, persisté en base.',
    preview:
      'Tu écris un post, il apparaît en haut du fil ; le cœur affiche le nombre de likes et s’incrémente au clic.',
    aliases: ['reseau social', 'posts', 'likes', 'fil actualite', 'feed'],
    keywords: ['reseau social react', 'posts likes', 'fil actualite', 'compteur like', 'mise a jour optimiste'],
    relatedContentIds: [],
    files: ['db.js', 'server.js', 'Fil.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-139-e1',
        title: 'La table des posts',
        goal: 'Stocker le contenu et le compteur de likes.',
        explanation:
          'Pour rester simple, on stocke le nombre de likes directement dans une colonne <code>likes</code> du post plutôt qu’une table dédiée. On ajoute un <code>cree_le</code> par défaut pour pouvoir trier le fil du plus récent au plus ancien. C’est un choix pragmatique parfait pour un premier projet.',
        files: ['db.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-139-cb1',
            filename: 'db.js',
            language: 'javascript',
            code: `import Database from "better-sqlite3";

export const db = new Database("social.db");

// Un post : son texte, son compteur de likes, sa date
db.exec("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, texte TEXT NOT NULL, likes INTEGER NOT NULL DEFAULT 0, cree_le TEXT NOT NULL DEFAULT (datetime('now')))");`,
          },
        ],
        result: 'Un post peut être stocké avec son compteur.',
      },
      {
        id: 'GUIDE-W6-139-e2',
        title: 'Lister et publier des posts',
        goal: 'Renvoyer le fil et créer un post.',
        explanation:
          'Le fil se lit trié par date décroissante (<code>ORDER BY cree_le DESC</code>) pour montrer le plus récent en premier. La création insère le texte et renvoie le post complet, likes à zéro, pour que le front l’affiche <b>sans recharger</b> tout le fil.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-139-cb2',
            filename: 'server.js',
            language: 'javascript',
            code: `import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Le fil, du plus récent au plus ancien
app.get("/posts", (req, res) => {
  res.json(db.prepare("SELECT * FROM posts ORDER BY cree_le DESC").all());
});

// Publier un post
app.post("/posts", (req, res) => {
  const info = db.prepare("INSERT INTO posts (texte) VALUES (?)").run(req.body.texte);
  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json(post);
});

app.listen(3001);`,
          },
        ],
        result: 'Le fil se lit et les posts se publient.',
      },
      {
        id: 'GUIDE-W6-139-e3',
        title: 'La route de like',
        goal: 'Incrémenter le compteur d’un post.',
        explanation:
          'On fait incrémenter le compteur <b>par la base</b> avec <code>likes = likes + 1</code> : c’est atomique, donc juste même si plusieurs likes arrivent en même temps. On renvoie le nouveau nombre pour que le front affiche la valeur officielle et ne se contente pas d’une estimation.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-139-cb3',
            filename: 'server.js',
            language: 'javascript',
            code: `// Ajoute un like et renvoie le total à jour
app.post("/posts/:id/like", (req, res) => {
  db.prepare("UPDATE posts SET likes = likes + 1 WHERE id = ?").run(req.params.id);
  const post = db.prepare("SELECT likes FROM posts WHERE id = ?").get(req.params.id);
  res.json({ likes: post.likes });
});`,
          },
        ],
        result: 'Un like s’enregistre et le total revient au front.',
      },
      {
        id: 'GUIDE-W6-139-e4',
        title: 'Le fil en React',
        goal: 'Afficher les posts et publier.',
        explanation:
          'Le composant charge le fil au montage. À la publication, on place le nouveau post <b>en tête</b> du tableau (<code>[nouveau, ...posts]</code>) pour refléter l’ordre du serveur. On garde le texte du champ dans un state contrôlé, qu’on vide après l’envoi.',
        files: ['Fil.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-139-cb4',
            filename: 'Fil.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from "react";

type Post = { id: number; texte: string; likes: number };

export function Fil() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [texte, setTexte] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/posts").then((r) => r.json()).then(setPosts);
  }, []);

  async function publier() {
    const r = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texte }),
    });
    const nouveau = await r.json();
    setPosts([nouveau, ...posts]); // en tête du fil
    setTexte("");
  }

  return (
    <div>
      <textarea value={texte} onChange={(e) => setTexte(e.target.value)} />
      <button onClick={publier}>Publier</button>
      {posts.map((p) => <Carte key={p.id} post={p} posts={posts} setPosts={setPosts} />)}
    </div>
  );
}`,
          },
        ],
        result: 'Le fil s’affiche et accepte de nouvelles publications.',
      },
      {
        id: 'GUIDE-W6-139-e5',
        title: 'Le bouton like',
        goal: 'Mettre à jour le compteur au clic.',
        explanation:
          'Au clic, on appelle la route de like et on remplace le post concerné dans le tableau avec le nombre renvoyé par le serveur. On utilise <code>map</code> pour ne toucher <b>que ce post</b> et garder les autres intacts — c’est la façon immuable de mettre à jour une liste en React.',
        files: ['Fil.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-139-cb5',
            filename: 'Fil.tsx',
            language: 'tsx',
            code: `type Post = { id: number; texte: string; likes: number };

function Carte(props: {
  post: Post;
  posts: Post[];
  setPosts: (p: Post[]) => void;
}) {
  const { post, posts, setPosts } = props;

  async function liker() {
    const r = await fetch("http://localhost:3001/posts/" + post.id + "/like", { method: "POST" });
    const { likes } = await r.json();
    // Remplace uniquement ce post par sa version à jour
    setPosts(posts.map((p) => (p.id === post.id ? { ...p, likes } : p)));
  }

  return (
    <div>
      <p>{post.texte}</p>
      <button onClick={liker}>♥ {post.likes}</button>
    </div>
  );
}`,
          },
        ],
        result: 'Le compteur de likes se met à jour au clic.',
      },
    ],
    finalResult:
      'Un mini réseau social full-stack : publication de posts, fil trié par date et likes incrémentés atomiquement en base, front et back synchronisés.',
    pitfalls: [
      'Incrémenter le like côté front seulement : le compteur repart à zéro au rechargement.',
      'Muter le tableau de posts au lieu d’un map immuable : React peut ne pas ré-afficher.',
    ],
  }),

  // ————— Un dashboard admin —————
  guide({
    id: 'GUIDE-W6-140',
    slug: 'un-dashboard-admin',
    title: 'Un dashboard admin',
    shortTitle: 'Dashboard admin',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Agréger des chiffres clés en SQL, servir une liste paginée et les afficher dans des cartes de stats et un tableau d’administration React.',
    objective: 'Un tableau de bord avec indicateurs et gestion des utilisateurs.',
    preview:
      'En haut, des cartes « Utilisateurs », « Commandes », « Revenu » ; en dessous, un tableau d’utilisateurs avec un bouton supprimer.',
    aliases: ['dashboard', 'admin', 'tableau de bord', 'back office', 'statistiques'],
    keywords: ['dashboard admin', 'stats sql', 'agregation count sum', 'tableau admin', 'back office react'],
    relatedContentIds: [],
    files: ['server.js', 'Dashboard.tsx', 'Utilisateurs.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-140-e1',
        title: 'La route des statistiques',
        goal: 'Agréger les chiffres clés en une réponse.',
        explanation:
          'Un dashboard affiche des totaux : on les calcule en SQL avec <code>COUNT</code> et <code>SUM</code> plutôt que de rapatrier toutes les lignes pour compter côté JS. <code>COALESCE(SUM(...), 0)</code> renvoie 0 quand il n’y a aucune commande, pour éviter un <code>null</code> qui casserait l’affichage. On renvoie tout dans un <b>seul</b> objet.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-140-cb1',
            filename: 'server.js',
            language: 'javascript',
            code: `import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Indicateurs calculés directement en base
app.get("/stats", (req, res) => {
  const nbUsers = db.prepare("SELECT COUNT(*) AS n FROM utilisateurs").get().n;
  const nbCommandes = db.prepare("SELECT COUNT(*) AS n FROM commandes").get().n;
  const revenu = db.prepare("SELECT COALESCE(SUM(total), 0) AS s FROM commandes").get().s;
  res.json({ nbUsers, nbCommandes, revenu });
});

app.listen(3001);`,
          },
        ],
        result: 'Les indicateurs sont calculés efficacement côté base.',
      },
      {
        id: 'GUIDE-W6-140-e2',
        title: 'La liste paginée des utilisateurs',
        goal: 'Servir les utilisateurs page par page.',
        explanation:
          'Un tableau d’admin peut contenir des milliers de lignes : on pagine <b>côté serveur</b> avec <code>LIMIT</code> et <code>OFFSET</code>. La page vient d’un paramètre d’URL, converti en nombre et borné à 1 minimum. On renvoie aussi le total pour que le front calcule le nombre de pages.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-140-cb2',
            filename: 'server.js',
            language: 'javascript',
            code: `const PAR_PAGE = 10;

app.get("/utilisateurs", (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const offset = (page - 1) * PAR_PAGE;
  const lignes = db.prepare("SELECT id, nom, email FROM utilisateurs LIMIT ? OFFSET ?").all(PAR_PAGE, offset);
  const total = db.prepare("SELECT COUNT(*) AS n FROM utilisateurs").get().n;
  res.json({ lignes, total, page });
});

// Suppression d'un utilisateur
app.delete("/utilisateurs/:id", (req, res) => {
  db.prepare("DELETE FROM utilisateurs WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});`,
          },
        ],
        result: 'Les utilisateurs arrivent par pages et sont supprimables.',
      },
      {
        id: 'GUIDE-W6-140-e3',
        title: 'Les cartes de statistiques',
        goal: 'Afficher les indicateurs en haut du dashboard.',
        explanation:
          'On charge <code>/stats</code> une fois au montage et on affiche chaque chiffre dans une carte. Un petit composant <code>Stat</code> réutilisable évite de répéter le même bloc trois fois : on lui passe un libellé et une valeur en props.',
        files: ['Dashboard.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-140-cb3',
            filename: 'Dashboard.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from "react";

type Stats = { nbUsers: number; nbCommandes: number; revenu: number };

function Stat({ label, valeur }: { label: string; valeur: number }) {
  return (
    <div className="carte">
      <span>{label}</span>
      <strong>{valeur}</strong>
    </div>
  );
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/stats").then((r) => r.json()).then(setStats);
  }, []);

  if (!stats) return <p>Chargement…</p>;
  return (
    <div className="grille">
      <Stat label="Utilisateurs" valeur={stats.nbUsers} />
      <Stat label="Commandes" valeur={stats.nbCommandes} />
      <Stat label="Revenu (€)" valeur={stats.revenu} />
    </div>
  );
}`,
          },
        ],
        result: 'Les indicateurs clés s’affichent en cartes.',
      },
      {
        id: 'GUIDE-W6-140-e4',
        title: 'Le tableau des utilisateurs',
        goal: 'Lister, paginer et supprimer.',
        explanation:
          'Le tableau recharge dès que la <code>page</code> change grâce à <code>[page]</code> en dépendance. La suppression appelle la route <code>DELETE</code> puis retire la ligne du state local pour un effet immédiat. Les boutons de pagination sont bornés pour ne jamais dépasser le nombre total de pages calculé à partir de <code>total</code>.',
        files: ['Utilisateurs.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-140-cb4',
            filename: 'Utilisateurs.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from "react";

type User = { id: number; nom: string; email: string };

export function Utilisateurs() {
  const [lignes, setLignes] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(total / 10));

  // Recharge à chaque changement de page
  useEffect(() => {
    fetch("http://localhost:3001/utilisateurs?page=" + page)
      .then((r) => r.json())
      .then((d) => {
        setLignes(d.lignes);
        setTotal(d.total);
      });
  }, [page]);

  async function supprimer(id: number) {
    await fetch("http://localhost:3001/utilisateurs/" + id, { method: "DELETE" });
    setLignes(lignes.filter((u) => u.id !== id));
  }

  return (
    <div>
      <table>
        <tbody>
          {lignes.map((u) => (
            <tr key={u.id}>
              <td>{u.nom}</td>
              <td>{u.email}</td>
              <td><button onClick={() => supprimer(u.id)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Précédent</button>
      <span>Page {page} / {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Suivant</button>
    </div>
  );
}`,
          },
        ],
        result: 'Le tableau se pagine et gère la suppression.',
      },
    ],
    finalResult:
      'Un dashboard admin full-stack : indicateurs agrégés en SQL, liste paginée côté serveur et interface React avec cartes de stats et tableau d’administration.',
    pitfalls: [
      'Compter en JS après avoir tout rapatrié : fais COUNT/SUM en SQL pour rester rapide.',
      'Oublier de borner la pagination : une page hors limites renvoie un tableau vide.',
    ],
  }),

  // ————— Une app météo avec API externe —————
  guide({
    id: 'GUIDE-W6-141',
    slug: 'une-app-meteo-avec-api-externe',
    title: 'Une app météo avec API externe',
    shortTitle: 'App météo',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Chercher une ville, la convertir en coordonnées puis interroger une API météo publique, en gérant chargement et erreurs.',
    objective: 'Afficher la météo actuelle d’une ville saisie par l’utilisateur.',
    preview:
      'Tu tapes « Paris », l’app trouve ses coordonnées puis affiche la température actuelle ; un message clair apparaît si la ville est introuvable.',
    aliases: ['meteo', 'weather', 'api meteo', 'open-meteo', 'temperature'],
    keywords: ['app meteo react', 'api externe', 'geocodage', 'open-meteo', 'chargement erreur fetch'],
    relatedContentIds: [],
    files: ['Meteo.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-141-e1',
        title: 'Le champ ville et les états',
        goal: 'Préparer la saisie et les moments de la requête.',
        explanation:
          'Comme tout appel réseau, la météo a trois moments : le <code>résultat</code>, le <code>chargement</code> et l’<code>erreur</code>. On ajoute un state <code>ville</code> pour le champ contrôlé. On part sans chargement actif : la requête ne se déclenchera qu’au clic, pas au montage.',
        files: ['Meteo.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-141-cb1',
            filename: 'Meteo.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

type Resultat = { ville: string; temperature: number };

export function Meteo() {
  const [ville, setVille] = useState("");
  const [resultat, setResultat] = useState<Resultat | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");
  // ... suite dans les étapes suivantes
}`,
          },
        ],
        result: 'Les states nécessaires sont en place.',
      },
      {
        id: 'GUIDE-W6-141-e2',
        title: 'Transformer la ville en coordonnées',
        goal: 'Utiliser l’API de géocodage.',
        explanation:
          'L’API météo veut une latitude et une longitude, pas un nom de ville. On passe donc d’abord par une API de <b>géocodage</b> qui transforme « Paris » en coordonnées. Si aucun résultat ne revient, on lève une erreur pour l’afficher à l’utilisateur plutôt que de continuer avec des données vides.',
        files: ['Meteo.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-141-cb2',
            filename: 'Meteo.tsx',
            language: 'tsx',
            code: `// Renvoie { latitude, longitude, name } pour une ville
async function geocoder(nom: string) {
  const url = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(nom) + "&count=1";
  const r = await fetch(url);
  const data = await r.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("Ville introuvable");
  }
  return data.results[0];
}`,
          },
        ],
        result: 'On sait convertir un nom de ville en coordonnées.',
      },
      {
        id: 'GUIDE-W6-141-e3',
        title: 'Appeler l’API météo',
        goal: 'Récupérer la température aux coordonnées.',
        explanation:
          'Avec les coordonnées, on interroge l’API météo en demandant la donnée <code>current=temperature_2m</code>. On construit l’URL par concaténation avec les latitude et longitude obtenues à l’étape précédente. La réponse contient la température actuelle qu’on renvoie prête à afficher.',
        files: ['Meteo.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-141-cb3',
            filename: 'Meteo.tsx',
            language: 'tsx',
            code: `// Renvoie la température actuelle à ces coordonnées
async function temperatureActuelle(lat: number, lon: number) {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m";
  const r = await fetch(url);
  if (!r.ok) throw new Error("Service météo indisponible");
  const data = await r.json();
  return data.current.temperature_2m;
}`,
          },
        ],
        result: 'On obtient la température pour des coordonnées.',
      },
      {
        id: 'GUIDE-W6-141-e4',
        title: 'Enchaîner et afficher',
        goal: 'Relier les deux appels et gérer les états.',
        explanation:
          'On enchaîne géocodage puis météo dans un <code>try/catch/finally</code> : <code>try</code> pour le succès, <code>catch</code> pour afficher un message d’erreur, <code>finally</code> pour couper le loader dans tous les cas. On active le chargement au début et on remet l’erreur à vide pour ne pas garder l’ancienne. L’affichage teste les états dans l’ordre.',
        files: ['Meteo.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-141-cb4',
            filename: 'Meteo.tsx',
            language: 'tsx',
            code: `async function chercher() {
  setChargement(true);
  setErreur("");
  try {
    const lieu = await geocoder(ville);
    const temp = await temperatureActuelle(lieu.latitude, lieu.longitude);
    setResultat({ ville: lieu.name, temperature: temp });
  } catch (e) {
    setErreur((e as Error).message);
    setResultat(null);
  } finally {
    setChargement(false);
  }
}

return (
  <div>
    <input value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Ville" />
    <button onClick={chercher}>Chercher</button>
    {chargement && <p>Chargement…</p>}
    {erreur && <p>Erreur : {erreur}</p>}
    {resultat && <p>{resultat.ville} : {resultat.temperature} °C</p>}
  </div>
);`,
          },
        ],
        result: 'L’app affiche la météo, un loader ou une erreur selon le cas.',
      },
    ],
    finalResult:
      'Une app météo qui enchaîne deux API publiques (géocodage puis météo), avec gestion propre du chargement et des erreurs — aucune clé requise avec Open-Meteo.',
    pitfalls: [
      'Envoyer le nom de ville directement à l’API météo : elle attend des coordonnées, pas un nom.',
      'Ne pas encoder la saisie : une ville avec espace ou accent casse l’URL sans encodeURIComponent.',
    ],
  }),

  // ————— Une app de recettes de cuisine avec API externe —————
  guide({
    id: 'GUIDE-W6-142',
    slug: 'une-app-de-recettes-de-cuisine-avec-api-externe',
    title: 'Une app de recettes de cuisine avec API externe',
    shortTitle: 'App recettes',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Rechercher des recettes via une API publique, afficher les résultats en grille et ouvrir le détail d’une recette avec ses ingrédients.',
    objective: 'Chercher des recettes et consulter leur détail.',
    preview:
      'Tu tapes « chicken », une grille de plats s’affiche avec leur photo ; cliquer sur l’un ouvre ses ingrédients et sa préparation.',
    aliases: ['recettes', 'cuisine', 'themealdb', 'api recettes', 'meals'],
    keywords: ['app recettes react', 'api externe', 'themealdb', 'recherche recettes', 'grille cartes'],
    relatedContentIds: [],
    files: ['Recettes.tsx', 'DetailRecette.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-142-e1',
        title: 'Le champ de recherche et les états',
        goal: 'Préparer la saisie et l’affichage des résultats.',
        explanation:
          'On stocke la requête tapée dans un state contrôlé et la liste des recettes trouvées dans un autre. On ajoute un <code>chargement</code> pour montrer un retour pendant l’appel. La recherche se lance sur validation, ce qui évite d’appeler l’API à chaque frappe.',
        files: ['Recettes.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-142-cb1',
            filename: 'Recettes.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

type Recette = { idMeal: string; strMeal: string; strMealThumb: string };

export function Recettes() {
  const [requete, setRequete] = useState("");
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [chargement, setChargement] = useState(false);
  // ... la recherche arrive à l'étape suivante
}`,
          },
        ],
        result: 'La saisie et l’état d’affichage sont prêts.',
      },
      {
        id: 'GUIDE-W6-142-e2',
        title: 'Appeler l’API de recherche',
        goal: 'Récupérer les recettes correspondant à la requête.',
        explanation:
          'On interroge TheMealDB avec le paramètre <code>s</code> (search). L’API renvoie un objet dont la clé <code>meals</code> vaut <code>null</code> quand rien ne correspond : on remplace alors par un tableau vide pour que <code>map</code> ne plante pas. On coupe le loader dans <code>finally</code>.',
        files: ['Recettes.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-142-cb2',
            filename: 'Recettes.tsx',
            language: 'tsx',
            code: `async function chercher() {
  setChargement(true);
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(requete);
    const r = await fetch(url);
    const data = await r.json();
    // meals vaut null quand il n'y a aucun résultat
    setRecettes(data.meals || []);
  } finally {
    setChargement(false);
  }
}`,
          },
        ],
        result: 'Les recettes correspondant à la recherche sont chargées.',
      },
      {
        id: 'GUIDE-W6-142-e3',
        title: 'La grille de résultats',
        goal: 'Afficher chaque recette en carte cliquable.',
        explanation:
          'On affiche chaque recette avec sa photo (<code>strMealThumb</code>) et son nom, dans une carte cliquable. Le clic remonte l’<code>idMeal</code> via <code>onOuvrir</code> pour charger le détail. La <code>key</code> utilise l’identifiant unique fourni par l’API.',
        files: ['Recettes.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-142-cb3',
            filename: 'Recettes.tsx',
            language: 'tsx',
            code: `return (
  <div>
    <input value={requete} onChange={(e) => setRequete(e.target.value)} />
    <button onClick={chercher}>Rechercher</button>
    {chargement && <p>Chargement…</p>}
    <div className="grille">
      {recettes.map((rec) => (
        <button key={rec.idMeal} onClick={() => onOuvrir(rec.idMeal)}>
          <img src={rec.strMealThumb} alt={rec.strMeal} width={120} />
          <span>{rec.strMeal}</span>
        </button>
      ))}
    </div>
  </div>
);`,
          },
        ],
        result: 'Les recettes s’affichent en grille et sont cliquables.',
      },
      {
        id: 'GUIDE-W6-142-e4',
        title: 'Le détail d’une recette',
        goal: 'Charger et afficher ingrédients et préparation.',
        explanation:
          'Le détail se charge par identifiant via la route <code>lookup.php?i=</code>. Les ingrédients sont éparpillés dans des champs numérotés (<code>strIngredient1</code> à 20) : on les rassemble par une boucle en ignorant les cases vides. On recharge à chaque changement d’<code>id</code>.',
        files: ['DetailRecette.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-142-cb4',
            filename: 'DetailRecette.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from "react";

export function DetailRecette({ id }: { id: string }) {
  const [recette, setRecette] = useState<any>(null);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
      .then((r) => r.json())
      .then((d) => setRecette(d.meals[0]));
  }, [id]);

  if (!recette) return <p>Chargement…</p>;

  // Rassemble les ingrédients non vides (champs numérotés 1 à 20)
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const nom = recette["strIngredient" + i];
    if (nom && nom.trim()) ingredients.push(nom);
  }

  return (
    <div>
      <h1>{recette.strMeal}</h1>
      <ul>{ingredients.map((ing) => <li key={ing}>{ing}</li>)}</ul>
      <p>{recette.strInstructions}</p>
    </div>
  );
}`,
          },
        ],
        result: 'Le détail montre les ingrédients et la préparation.',
      },
    ],
    finalResult:
      'Une app de recettes qui consomme TheMealDB : recherche, grille de résultats et page de détail rassemblant les ingrédients dispersés de l’API.',
    pitfalls: [
      'Faire map sur data.meals sans gérer le null renvoyé quand aucune recette ne correspond.',
      'Oublier de recharger le détail au changement d’id : la fiche resterait bloquée sur la première recette.',
    ],
  }),

  // ————— Une application full-stack complète de A à Z —————
  guide({
    id: 'GUIDE-W6-143',
    slug: 'une-application-full-stack-complete-de-a-a-z',
    title: 'Une application full-stack complète de A à Z',
    shortTitle: 'Full-stack A à Z',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Assembler une application complète : structure du projet, base de données, API REST, authentification par token, front connecté et mise en production.',
    objective: 'Le squelette complet d’une app full-stack authentifiée, prête à déployer.',
    preview:
      'Un projet organisé front/back, une base initialisée, une API protégée par token, un front qui se connecte et un rappel des variables d’environnement pour déployer.',
    aliases: ['full stack', 'application complete', 'de a a z', 'projet complet', 'authentification jwt'],
    keywords: ['full stack complet', 'architecture projet', 'api rest', 'authentification jwt', 'deploiement'],
    relatedContentIds: [],
    files: ['db.js', 'auth.js', 'server.js', 'api.ts', 'App.tsx'],
    steps: [
      {
        id: 'GUIDE-W6-143-e1',
        title: 'La structure du projet',
        goal: 'Séparer clairement le front et le back.',
        explanation:
          'Un projet full-stack se lit mieux avec deux dossiers distincts : <code>server/</code> (l’API et la base) et <code>client/</code> (le front React). Chacun a son <code>package.json</code> et ses dépendances. Cette séparation permet de déployer les deux <b>indépendamment</b> et d’éviter de mélanger le code serveur et le code navigateur.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-143-cb1',
            filename: 'structure.txt',
            language: 'text',
            code: `mon-app/
  server/            # API Express + base SQLite
    server.js        # point d'entrée du serveur
    db.js            # connexion et schéma
    auth.js          # middleware d'authentification
    package.json
  client/            # front React (Vite)
    src/
      App.tsx
      api.ts         # appels vers l'API
    package.json`,
          },
        ],
        result: 'Le projet est organisé en front et back séparés.',
      },
      {
        id: 'GUIDE-W6-143-e2',
        title: 'La base et le schéma',
        goal: 'Créer les tables utilisateurs et tâches.',
        explanation:
          'On initialise la base avec deux tables : <code>utilisateurs</code> (avec un <code>hash</code> de mot de passe, jamais le mot de passe en clair) et <code>taches</code> reliée à son propriétaire via <code>user_id</code>. Chaque donnée appartient ainsi à un utilisateur, ce qui rendra les requêtes <b>filtrées par personne connectée</b>.',
        files: ['db.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-143-cb2',
            filename: 'db.js',
            language: 'javascript',
            code: `import Database from "better-sqlite3";

export const db = new Database("app.db");

// On ne stocke jamais le mot de passe en clair, seulement son hash
db.exec("CREATE TABLE IF NOT EXISTS utilisateurs (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, hash TEXT NOT NULL)");

// Chaque tâche appartient à un utilisateur
db.exec("CREATE TABLE IF NOT EXISTS taches (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, titre TEXT NOT NULL, faite INTEGER NOT NULL DEFAULT 0)");`,
          },
        ],
        result: 'La base est prête avec des données rattachées aux utilisateurs.',
      },
      {
        id: 'GUIDE-W6-143-e3',
        title: 'L’inscription et la connexion',
        goal: 'Créer un compte et délivrer un token.',
        explanation:
          'À l’inscription, on hache le mot de passe avec <code>bcrypt</code> avant de l’enregistrer. À la connexion, on compare le mot de passe fourni au hash stocké ; si ça correspond, on délivre un <b>token JWT</b> signé qui prouvera l’identité de l’utilisateur sur les prochaines requêtes. Le secret vient d’une variable d’environnement.',
        files: ['server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-143-cb3',
            filename: 'server.js',
            language: 'javascript',
            code: `import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "dev-secret";

// Créer un compte
app.post("/inscription", (req, res) => {
  const { email, motDePasse } = req.body;
  const hash = bcrypt.hashSync(motDePasse, 10);
  const info = db.prepare("INSERT INTO utilisateurs (email, hash) VALUES (?, ?)").run(email, hash);
  const token = jwt.sign({ id: info.lastInsertRowid }, SECRET, { expiresIn: "7d" });
  res.status(201).json({ token });
});

// Se connecter
app.post("/connexion", (req, res) => {
  const { email, motDePasse } = req.body;
  const user = db.prepare("SELECT * FROM utilisateurs WHERE email = ?").get(email);
  if (!user || !bcrypt.compareSync(motDePasse, user.hash)) {
    return res.status(401).json({ erreur: "Identifiants invalides" });
  }
  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "7d" });
  res.json({ token });
});`,
          },
        ],
        result: 'Les utilisateurs peuvent s’inscrire et se connecter.',
      },
      {
        id: 'GUIDE-W6-143-e4',
        title: 'Protéger les routes',
        goal: 'N’autoriser que les requêtes authentifiées.',
        explanation:
          'Un middleware <code>auth</code> lit le token dans l’en-tête <code>Authorization</code>, le vérifie et attache l’utilisateur à <code>req.user</code>. Placé devant une route, il bloque tout accès sans token valide (<code>401</code>). Les routes protégées filtrent alors sur <code>req.user.id</code> pour ne montrer que les données de la personne connectée.',
        files: ['auth.js', 'server.js'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-143-cb4',
            filename: 'auth.js',
            language: 'javascript',
            code: `import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";

// Vérifie le token et attache l'utilisateur à la requête
export function auth(req, res, next) {
  const entete = req.headers.authorization || "";
  const token = entete.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ erreur: "Non autorisé" });
  }
}`,
          },
          {
            id: 'GUIDE-W6-143-cb5',
            filename: 'server.js',
            language: 'javascript',
            code: `import { auth } from "./auth.js";

// Route protégée : ne renvoie que les tâches de l'utilisateur connecté
app.get("/taches", auth, (req, res) => {
  const taches = db.prepare("SELECT * FROM taches WHERE user_id = ?").all(req.user.id);
  res.json(taches);
});`,
          },
        ],
        result: 'Les routes sensibles exigent un token valide.',
      },
      {
        id: 'GUIDE-W6-143-e5',
        title: 'Le front connecté',
        goal: 'Stocker le token et l’envoyer à chaque appel.',
        explanation:
          'Après connexion, on garde le token dans <code>localStorage</code> pour survivre au rechargement. Chaque appel protégé ajoute l’en-tête <code>Authorization: Bearer &lt;token&gt;</code>. On centralise ça dans <code>api.ts</code> pour ne pas répéter l’en-tête partout et le gérer d’un seul endroit.',
        files: ['api.ts', 'App.tsx'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-143-cb6',
            filename: 'api.ts',
            language: 'typescript',
            code: `const BASE = "http://localhost:3001";

export async function connexion(email: string, motDePasse: string) {
  const r = await fetch(BASE + "/connexion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, motDePasse }),
  });
  const { token } = await r.json();
  localStorage.setItem("token", token); // survit au rechargement
  return token;
}

// Appel protégé : joint le token dans l'en-tête
export async function getTaches() {
  const r = await fetch(BASE + "/taches", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return r.json();
}`,
          },
        ],
        result: 'Le front s’authentifie et accède aux routes protégées.',
      },
      {
        id: 'GUIDE-W6-143-e6',
        title: 'La mise en production',
        goal: 'Construire le front et configurer l’hébergeur.',
        explanation:
          'En production, on <b>construit</b> le front avec <code>npm run build</code> (des fichiers statiques optimisés) et on héberge l’API séparément. Les valeurs sensibles (secret JWT, port, base) ne sont <b>jamais</b> écrites en dur : on les définit en variables d’environnement chez l’hébergeur. Le front pointe alors vers l’URL publique de l’API, pas vers localhost.',
        files: ['deploiement.txt'],
        relatedContentIds: [],
        codeBlocks: [
          {
            id: 'GUIDE-W6-143-cb7',
            filename: 'deploiement.sh',
            language: 'bash',
            code: `# 1. Construire le front pour la production
cd client
npm run build   # génère client/dist, des fichiers statiques

# 2. Variables d'environnement à définir sur l'hébergeur (Render, Railway...)
#    JWT_SECRET = une longue chaîne aléatoire (jamais dans le code)
#    PORT       = le port fourni par l'hébergeur
#    Le front utilise l'URL publique de l'API, pas http://localhost`,
          },
        ],
        result: 'L’app est prête à être déployée en toute sécurité.',
      },
    ],
    finalResult:
      'Une application full-stack complète : structure claire, base relationnelle, API REST protégée par JWT, front authentifié et bonnes pratiques de déploiement — le squelette réutilisable de tous tes projets.',
    pitfalls: [
      'Stocker le mot de passe en clair : hache-le toujours avec bcrypt avant de l’enregistrer.',
      'Écrire le secret JWT en dur dans le code : mets-le en variable d’environnement, surtout en production.',
      'Laisser une route sensible sans middleware auth : n’importe qui accéderait aux données.',
    ],
  }),
];
