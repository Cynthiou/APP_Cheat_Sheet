# Cheat Sheet 📘

> Fiches mémo et code prêt à copier pour le développement web.
> _Je bloque → je cherche → je trouve le bon code → je l'adapte → je continue._

🔗 **Démo en ligne : [app-cheat-sheet.vercel.app](https://app-cheat-sheet.vercel.app/)**

---

## À propos

**Cheat Sheet** est une application de référence pour développeurs, pensée avec une philosophie **« copie d'abord »** : trouver vite, copier en un clic, comprendre seulement si besoin.

Chaque notion s'ouvre de deux façons :

- **Comprendre** — la leçon claire, avec exemples, pièges fréquents et récap.
- **Code prêt à copier** — le template directement réutilisable, avec les valeurs à remplacer.

Projet conçu et développé de A à Z dans le cadre de ma reconversion en développement web.

## ✨ Fonctionnalités

- 🔎 **Recherche intelligente** — comprend l'intention et les synonymes (FR **et** EN) : « additionner un tableau » trouve `reduce`, « sort an array » trouve la bonne fiche.
- 🧭 **Recherche non bloquante** — si le mot n'est pas dans la catégorie courante, l'app indique où le trouver et t'y emmène avec ta recherche.
- 📚 **Bibliothèque** organisée par catégories (Front-end, Back-end, Base de données, Outils) et filtrable par technologie.
- 📖 **Guides** pas-à-pas pour construire des projets concrets.
- 🔗 **Ressources & outils** — doc officielle, outils gratuits et tutos en français sur chaque fiche.
- ⭐ **Favoris** et 🕑 **Historique**.
- ⌨️ **Palette de commandes** (`Ctrl/Cmd + K`) et autocomplétion.
- 🌗 **Thème clair / sombre**.
- 📱 **Responsive**.

## 🛠️ Stack technique

- **React 19** + **TypeScript**
- **Vite**
- **React Router**
- **Vitest** + **Testing Library**
- CSS moderne (design tokens, thème clair/sombre)

## 🚀 Lancer le projet en local

```bash
git clone https://github.com/Cynthiou/APP_Cheat_Sheet.git
cd APP_Cheat_Sheet
npm install
npm run dev
```

L'app démarre sur `http://localhost:5173`.

## 📜 Scripts

| Commande          | Description                   |
| ----------------- | ---------------------------- |
| `npm run dev`     | Serveur de développement     |
| `npm run build`   | Build de production (`dist/`)|
| `npm run preview` | Prévisualiser le build       |
| `npx vitest`      | Lancer les tests             |

## ☁️ Déploiement

Déployée sur **Vercel**, avec redéploiement automatique à chaque `git push` sur `main`.

---

Développé par **Cynthia Flores** — [github.com/Cynthiou](https://github.com/Cynthiou)
