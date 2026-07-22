import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const git2Content: ReadyContent[] = [
  // ————— Le fichier .gitignore —————
  lesson({
    id: 'GIT-F-1107-LESSON',
    slug: 'le-fichier-gitignore',
    title: 'Le fichier .gitignore',
    shortTitle: '.gitignore',
    technology: 'git',
    tomeId: 't1',
    summary:
      'Dire à Git quels fichiers ignorer pour ne jamais versionner node_modules, les fichiers .env ou les fichiers système.',
    utility:
      'Empêcher Git de suivre les fichiers qui ne doivent jamais partir sur le dépôt (dépendances, secrets, fichiers générés).',
    aliases: ['gitignore', 'git ignore', 'ignorer des fichiers', 'exclure', 'node_modules', 'env'],
    keywords: [
      'ignorer un fichier',
      'ne pas versionner',
      'node modules',
      'fichier env secret',
      'exclure du depot',
      'ds store',
      'motif glob',
    ],
    relatedContentIds: [],
    templateId: 'GIT-F-1107-TEMPLATE',
    intro:
      'Le <b>.gitignore</b> est un simple fichier texte, placé à la <b>racine</b> du projet, qui liste ce que Git doit <b>ignorer</b>. Les fichiers cités n’apparaissent plus dans <code>git status</code> et ne partent jamais dans un commit.',
    sections: [
      {
        id: 's1',
        title: 'Créer son .gitignore',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>que mon dossier node_modules et mon fichier .env ne partent jamais sur GitHub</b> : trop lourd pour l’un, secret pour l’autre.',
          },
          {
            type: 'paragraph',
            html: 'On crée un fichier nommé <b>exactement</b> <code>.gitignore</code> (avec le point, sans extension) à la racine du dépôt, et on y écrit <b>une règle par ligne</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1107-l-c1',
              filename: '.gitignore',
              language: 'bash',
              code: `# Dependances : jamais versionnees, on les reinstalle avec npm install
node_modules/

# Secrets et variables d'environnement
.env
.env.local

# Dossier de build genere automatiquement
dist/
build/

# Fichiers systeme (Mac / Windows)
.DS_Store
Thumbs.db`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> un <code>.gitignore</code> à la racine, créé <b>dès le début</b> du projet. Une ligne = une règle. Les lignes qui commencent par <code>#</code> sont des commentaires.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les motifs les plus courants',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les règles acceptent des <b>motifs</b> : un <code>/</code> à la fin cible un dossier, <code>*</code> remplace n’importe quel texte, et <code>!</code> fait une <b>exception</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1107-l-c2',
              filename: '.gitignore',
              language: 'bash',
              code: `# Un dossier entier (le / final)
node_modules/

# Tous les fichiers .log, ou qu'ils soient
*.log

# Un fichier precis a la racine
config.secret.js

# Ignorer tout le contenu du dossier logs SAUF un fichier garde
logs/*
!logs/.gitkeep`,
            },
          },
          {
            type: 'table',
            headers: ['Motif', 'Ce qu’il ignore'],
            rows: [
              ['<code>node_modules/</code>', 'le dossier <code>node_modules</code> entier'],
              ['<code>*.log</code>', 'tous les fichiers finissant par <code>.log</code>'],
              ['<code>.env</code>', 'le fichier <code>.env</code> exact'],
              ['<code>build/</code>', 'le dossier de build généré'],
              ['<code>!logs/.gitkeep</code>', 'exception : on garde ce fichier'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Un fichier déjà suivi n’est plus ignoré',
        blocks: [
          {
            type: 'paragraph',
            html: 'Piège classique : le <code>.gitignore</code> n’agit que sur les fichiers <b>pas encore suivis</b>. Si tu as déjà commité un fichier avant de l’ignorer, il faut le <b>retirer du suivi</b> avec <code>git rm --cached</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1107-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# 1. J'ai oublie d'ignorer .env et il est deja commite
#    J'ajoute .env dans .gitignore, puis :

# 2. Je retire le fichier du suivi (il reste sur mon disque)
git rm --cached .env

# 3. Pour un dossier entier, on ajoute -r (recursif)
git rm -r --cached node_modules

# 4. Je valide le retrait
git commit -m "Retire .env et node_modules du suivi"`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le <code>.gitignore</code> est un videur à l’entrée. Il refuse les <b>nouveaux</b> arrivants, mais ceux qui sont <b>déjà dans la salle</b> (déjà commités) doivent être sortis à la main avec <code>git rm --cached</code>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Croire que <code>.gitignore</code> retire un fichier <b>déjà commité</b> : non, il faut <code>git rm --cached</code> puis recommiter.',
      'Nommer le fichier <code>gitignore</code> (sans le point) : Git ne le reconnaît pas. Le nom exact est <code>.gitignore</code>.',
      'Commiter <code>.env</code> avant d’y penser : le secret reste dans l’<b>historique</b> même après suppression. Change la clé compromise.',
      'Oublier le <code>/</code> final pour un dossier : <code>build</code> et <code>build/</code> ne ciblent pas tout à fait la même chose.',
    ],
    takeaways: [
      'un fichier <code>.gitignore</code> à la racine, une règle par ligne',
      'à ignorer toujours : <code>node_modules/</code>, <code>.env</code>, <code>dist/</code>, <code>.DS_Store</code>',
      '<code>*.log</code> = motif · <code>dossier/</code> = dossier entier · <code>!fichier</code> = exception',
      'déjà commité ? → <code>git rm --cached fichier</code> puis <code>git commit</code>',
      'un secret déjà poussé reste dans l’historique : régénère-le',
    ],
  }),
  template({
    id: 'GIT-F-1107-TEMPLATE',
    slug: 'le-fichier-gitignore',
    title: '.gitignore',
    shortTitle: '.gitignore',
    technology: 'git',
    tomeId: 't1',
    summary: 'Des .gitignore prêts à copier : projet Node, motifs courants, retrait d’un fichier déjà suivi.',
    lede: 'Ignorer les bons fichiers. Choisis ton cas :',
    aliases: ['gitignore', 'git ignore', 'ignorer', 'node_modules', 'env'],
    keywords: ['ignorer', 'exclure', 'rm cached', 'motif'],
    relatedContentIds: [],
    lessonId: 'GIT-F-1107-LESSON',
    variants: [
      {
        id: 'node',
        label: 'Projet Node / React',
        codeBlocks: [
          {
            id: 'GIT-F-1107-t-node',
            filename: '.gitignore',
            language: 'bash',
            code: `# Dependances
node_modules/

# Variables d'environnement
.env
.env.local

# Build de production
dist/
build/

# Logs
*.log

# Fichiers systeme
.DS_Store
Thumbs.db`,
          },
        ],
        replacements: [
          { token: 'dist/', description: 'le dossier de build de ton outil (dist, build, .next…)' },
        ],
        placement: 'Le point de départ pour n’importe quel projet JavaScript. À placer à la racine, avant le premier commit.',
      },
      {
        id: 'motifs',
        label: 'Motifs utiles',
        codeBlocks: [
          {
            id: 'GIT-F-1107-t-motifs',
            filename: '.gitignore',
            language: 'bash',
            code: `# Un dossier entier
cache/

# Tous les fichiers d'un type
*.log
*.tmp

# Un fichier precis
secrets.json

# Une exception (on garde ce fichier)
logs/*
!logs/.gitkeep`,
          },
        ],
        replacements: [
          { token: 'cache/', description: 'le dossier à ignorer (le / final vise un dossier)' },
          { token: '*.log', description: 'l’extension à ignorer partout' },
          { token: '!logs/.gitkeep', description: 'le fichier à conserver malgré la règle du dessus' },
        ],
        placement: 'Quand tu veux composer tes propres règles : dossier, extension, fichier précis ou exception.',
      },
      {
        id: 'deja-suivi',
        label: 'Fichier déjà suivi',
        codeBlocks: [
          {
            id: 'GIT-F-1107-t-cached',
            filename: 'terminal',
            language: 'bash',
            code: `# Retirer un fichier deja commite du suivi
git rm --cached .env

# Retirer un dossier entier (recursif)
git rm -r --cached node_modules

# Puis valider
git commit -m "Retire du suivi"`,
          },
        ],
        replacements: [
          { token: '.env', description: 'le fichier à retirer du suivi (il reste sur ton disque)' },
          { token: 'node_modules', description: 'le dossier à retirer du suivi' },
        ],
        placement: 'Quand un fichier est déjà versionné : l’ajouter au .gitignore ne suffit pas, retire-le d’abord du suivi.',
      },
    ],
  }),

  // ————— Corriger un commit et annuler —————
  lesson({
    id: 'GIT-F-1108-LESSON',
    slug: 'corriger-un-commit-et-annuler',
    title: 'Corriger un commit et annuler',
    shortTitle: 'Corriger / annuler',
    technology: 'git',
    tomeId: 't1',
    summary:
      'Rattraper une erreur : corriger le dernier commit, remettre des fichiers hors du stage, ou revenir en arrière sans casser l’historique.',
    utility:
      'Réparer les erreurs courantes de Git : mauvais message, oubli de fichier, changement à annuler.',
    aliases: ['amend', 'reset', 'revert', 'restore', 'annuler un commit', 'corriger un commit', 'undo git'],
    keywords: [
      'corriger le dernier commit',
      'changer le message',
      'annuler un git add',
      'revenir en arriere',
      'defaire un commit',
      'annuler une modification',
      'restaurer un fichier',
    ],
    relatedContentIds: [],
    templateId: 'GIT-F-1108-TEMPLATE',
    intro:
      'Git garde <b>tout</b> : presque aucune erreur n’est définitive. Le trio à connaître : <code>--amend</code> (corriger le dernier commit), <code>restore</code> (annuler des changements) et <code>revert</code> (défaire un commit sans réécrire l’historique).',
    sections: [
      {
        id: 's1',
        title: 'Corriger le dernier commit',
        blocks: [
          {
            type: 'situation',
            html: 'Je viens de commiter mais je me suis <b>trompée dans le message</b>, ou j’ai <b>oublié d’ajouter un fichier</b> : je veux réparer sans créer un deuxième commit.',
          },
          {
            type: 'paragraph',
            html: '<code>git commit --amend</code> <b>remplace</b> le dernier commit. On peut juste corriger le message, ou d’abord ajouter le fichier oublié puis refaire l’amend.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1108-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Cas 1 : juste corriger le message du dernier commit
git commit --amend -m "Le bon message cette fois"

# Cas 2 : j'ai oublie un fichier
#   a) je l'ajoute au stage
git add fichier-oublie.js
#   b) je le glisse dans le dernier commit sans changer le message
git commit --amend --no-edit`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle de sécurité :</b> n’utilise <code>--amend</code> que sur un commit <b>pas encore poussé</b>. Il réécrit l’historique — dangereux si d’autres ont déjà récupéré le commit.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Annuler avant le commit',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>retirer un fichier du stage</b> (je l’ai ajouté par erreur avec git add), ou <b>jeter mes modifications</b> pour revenir à la dernière version commitée.',
          },
          {
            type: 'paragraph',
            html: '<code>git restore --staged</code> sort un fichier du stage (sans toucher au contenu). <code>git restore</code> tout court <b>écrase</b> tes changements avec la version commitée.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1108-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Retirer du stage un fichier ajoute par erreur
#   (le fichier garde tes modifications, il n'est juste plus "en attente")
git restore --staged fichier.js

# Jeter les modifications d'un fichier (ATTENTION : irreversible)
#   il revient a la derniere version commitee
git restore fichier.js

# Tout jeter d'un coup (tous les fichiers modifies)
git restore .`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>restore --staged</code> = sortir un article du panier de courses (il reste en rayon). <code>restore</code> tout court = <b>remettre l’article dans son état d’origine</b> et perdre ce que tu avais changé dessus.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Annuler un commit déjà fait',
        blocks: [
          {
            type: 'paragraph',
            html: 'Deux façons de défaire un commit. <code>git revert</code> crée un <b>nouveau</b> commit qui inverse le précédent (sûr, garde l’historique). <code>git reset</code> <b>supprime</b> le commit de l’historique (à réserver au local).',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1108-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# SUR : annule un commit en creant un commit inverse
#   parfait meme si le commit est deja pousse
git revert HEAD

# LOCAL : defait le dernier commit mais GARDE les changements
#   les modifs restent dans le stage, pretes a etre recommitees
git reset --soft HEAD~1

# DANGER : defait le commit ET efface les changements
git reset --hard HEAD~1`,
            },
          },
          {
            type: 'table',
            headers: ['Commande', 'Effet', 'Historique'],
            rows: [
              ['<code>--amend</code>', 'corrige le dernier commit', 'réécrit'],
              ['<code>revert</code>', 'commit inverse', 'conservé (sûr)'],
              ['<code>reset --soft</code>', 'défait, garde les changements', 'réécrit'],
              ['<code>reset --hard</code>', 'défait et efface tout', 'réécrit (danger)'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> commit déjà <b>poussé</b> → <code>git revert</code> (sûr). Commit encore <b>local</b> → <code>git reset</code>. Ne <code>reset</code> jamais un historique partagé.',
          },
        ],
      },
    ],
    pitfalls: [
      '<code>git reset --hard</code> efface tes modifications <b>définitivement</b> : vérifie deux fois avant de l’exécuter.',
      'Faire <code>--amend</code> ou <code>reset</code> sur un commit <b>déjà poussé</b> : ça réécrit l’historique et casse le dépôt des autres. Utilise <code>revert</code>.',
      'Confondre <code>git restore fichier</code> (jette les modifs) et <code>git restore --staged fichier</code> (sort juste du stage).',
      'Croire <code>HEAD~1</code> = « le dernier commit » : c’est le commit <b>d’avant</b> HEAD. <code>HEAD</code> désigne le dernier.',
    ],
    takeaways: [
      'mauvais message / fichier oublié → <code>git commit --amend</code> (jamais après un push)',
      'sortir du stage → <code>git restore --staged fichier</code> · jeter les modifs → <code>git restore fichier</code>',
      'commit poussé à annuler → <code>git revert</code> (crée un commit inverse, sûr)',
      'commit local à défaire → <code>git reset --soft HEAD~1</code> (garde les changements)',
      '<code>--hard</code> efface tout : à manier avec prudence',
    ],
  }),
  template({
    id: 'GIT-F-1108-TEMPLATE',
    slug: 'corriger-un-commit-et-annuler',
    title: 'Corriger / annuler',
    shortTitle: 'Corriger / annuler',
    technology: 'git',
    tomeId: 't1',
    summary: 'Les commandes prêtes à copier pour rattraper une erreur Git : amend, restore, revert, reset.',
    lede: 'Rattraper une erreur. Choisis ta situation :',
    aliases: ['amend', 'restore', 'revert', 'reset', 'annuler', 'corriger'],
    keywords: ['corriger commit', 'annuler add', 'revenir en arriere', 'undo'],
    relatedContentIds: [],
    lessonId: 'GIT-F-1108-LESSON',
    variants: [
      {
        id: 'amend',
        label: 'Corriger le dernier commit',
        codeBlocks: [
          {
            id: 'GIT-F-1108-t-amend',
            filename: 'terminal',
            language: 'bash',
            code: `# Corriger le message
git commit --amend -m "Le bon message"

# Ajouter un fichier oublie au dernier commit
git add fichier-oublie.js
git commit --amend --no-edit`,
          },
        ],
        replacements: [
          { token: 'Le bon message', description: 'le message corrigé du commit' },
          { token: 'fichier-oublie.js', description: 'le fichier que tu avais oublié d’ajouter' },
        ],
        placement: 'Seulement sur un commit pas encore poussé : --amend réécrit le dernier commit.',
      },
      {
        id: 'restore',
        label: 'Annuler avant commit',
        codeBlocks: [
          {
            id: 'GIT-F-1108-t-restore',
            filename: 'terminal',
            language: 'bash',
            code: `# Retirer un fichier du stage (garde tes modifs)
git restore --staged fichier.js

# Jeter les modifs d'un fichier (irreversible)
git restore fichier.js`,
          },
        ],
        replacements: [
          { token: 'fichier.js', description: 'le fichier concerné' },
        ],
        placement: 'Avant le commit : --staged sort du stage, sans --staged jette les modifications.',
      },
      {
        id: 'revert',
        label: 'Annuler un commit poussé',
        codeBlocks: [
          {
            id: 'GIT-F-1108-t-revert',
            filename: 'terminal',
            language: 'bash',
            code: `# Cree un nouveau commit qui inverse le dernier
git revert HEAD

# Inverser un commit precis (par son identifiant)
git revert a1b2c3d`,
          },
        ],
        replacements: [
          { token: 'a1b2c3d', description: 'l’identifiant (hash) du commit à annuler' },
        ],
        placement: 'La méthode sûre quand le commit est déjà partagé : l’historique est conservé.',
      },
      {
        id: 'reset',
        label: 'Défaire un commit local',
        codeBlocks: [
          {
            id: 'GIT-F-1108-t-reset',
            filename: 'terminal',
            language: 'bash',
            code: `# Defait le dernier commit, GARDE les changements
git reset --soft HEAD~1

# Defait le dernier commit ET efface tout (danger)
git reset --hard HEAD~1`,
          },
        ],
        replacements: [
          { token: 'HEAD~1', description: 'le nombre de commits à défaire (HEAD~2 pour deux…)' },
        ],
        placement: 'Uniquement en local, avant un push : --soft garde ton travail, --hard l’efface définitivement.',
      },
    ],
  }),
];
