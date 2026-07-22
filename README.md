# React Memo

**L'outil de codage et de référence rapide.** Tu bloques, tu cherches, tu trouves le bon code, tu l'adaptes et tu continues.

React Memo n'est **pas** une plateforme de formation : aucune durée, aucun niveau, aucun score, aucune progression imposée. Tout le contenu est accessible immédiatement, le code est prioritaire, et la copie est une action de premier plan.

## Démarrer

```bash
npm install      # installer les dépendances
npm run dev      # lancer en développement (http://localhost:5173)
npm run build    # build de production (dossier dist/)
npm run preview  # prévisualiser le build
npm test         # lancer les tests (Vitest)
```

## Stack

React 19 · TypeScript · Vite · React Router · prism-react-renderer (coloration) · Vitest + Testing Library. Aucun back-end, aucune base de données, aucun compte : application **statique**, déployable telle quelle (Vercel, Netlify, hébergement de fichiers).

## Principe : moteur piloté par les données

Le contenu **n'est jamais codé en dur dans les pages**. Il vit dans `src/data/` sous forme d'objets typés (`src/types/content.ts`). Les pages Leçon / Template / Guide sont **génériques** : elles affichent n'importe quel contenu du bon type. Ajouter une fiche = ajouter une entrée de données, **sans** écrire de page. L'architecture supporte plus de 200 contenus.

### Trois types de contenu

- **Leçon** (bleu) — comprendre une notion : idée, sections, exemples, erreurs fréquentes, « À retenir », lien vers le Template.
- **Template** (orange) — le code prêt à copier : variantes par onglets, bouton Copier, « À remplacer », « Où le mettre », lien vers la Leçon.
- **Guide** (vert) — construire une fonctionnalité en réutilisant les fiches, étape par étape, sans verrou.

## Arborescence

```
src/
  app (App.tsx)      routeur + providers
  components/        UI : code/, common/, content/, navigation/, search/
  data/              LE CONTENU : content/ (rédigé) + planned.ts (sommaire) + catalog.ts
  features/          thème, favoris, historique, toast (localStorage)
  layouts/           RootLayout (sidebar + mobile + raccourci "/")
  pages/             Home, Explore, Search, Favorites, Lesson, Template, Guide, 404
  search/            moteur de recherche (normalisation, scoring, filtres)
  types/             modèle de données
  utils/             normalize/slug, highlight, labels, paths
  test/              tests Vitest
```

## Routes

`/` accueil · `/explorer` sommaire complet · `/recherche?q=&tech=&kind=` · `/favoris` · `/lecon/:slug` · `/template/:slug` · `/guide/:slug` · `*` page 404.

## État du contenu

- **Rédigé (prêt)** : la Leçon + le Template `useState` (fidèles aux modèles de référence), un premier lot JavaScript (variables, fonctions, map, filter, fetch, async/await, try/catch), TypeScript (types, typer les props), React (composant, props, liste map/key, useEffect, onClick, input contrôlé, formulaire, fetch une liste, routes, route dynamique), Express (serveur, GET, POST), SQL (SELECT, INSERT, WHERE), et **5 guides** (modale, recherche, filtre par catégorie, pagination, API React).
- **À rédiger (planifié)** : tout le reste du sommaire est présent dans le catalogue avec le statut `planned`, affiché honnêtement comme « À rédiger » dans l'Explorer et la recherche. Rien n'est perdu du programme.

## Ajouter un contenu

1. Ouvre le fichier de données du bon domaine dans `src/data/content/` (ex. `react-core.ts`).
2. Ajoute un objet `lesson({...})`, `template({...})` ou `guide({...})` conforme à `src/types/content.ts`.
3. Renseigne `aliases` et `keywords` (FR/EN) pour la recherche, et relie Leçon ↔ Template (`lessonId` / `templateId`).
4. Réfère-le dans `src/data/content/index.ts` si c'est un nouveau fichier.
5. `npm test` vérifie l'intégrité (ids uniques, aucun lien mort, chaque Template a du code, aucune clé de gamification).

Aucune page à écrire : le rendu est générique.

## Garde-fous (vérifiés par les tests)

Identifiants uniques · couples (type, slug) uniques · aucun lien interne mort · réciprocité Leçon ↔ Template · chaque Template a au moins une variante avec du code · **aucune clé de gamification** (durée, niveau, score, points, badge, progression).
