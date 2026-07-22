import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const git1Content: ReadyContent[] = [
  // ————— git init et cloner un dépôt —————
  lesson({
    id: 'GIT-F-1100-LESSON',
    slug: 'git-init-et-cloner-un-depot',
    title: 'git init et cloner un dépôt',
    shortTitle: 'init / clone',
    technology: 'git',
    tomeId: 't1',
    summary:
      'Démarrer le suivi Git d’un projet : soit créer un dépôt neuf avec git init, soit récupérer un dépôt existant avec git clone.',
    utility: 'Créer un dépôt Git de zéro, ou récupérer un projet existant sur ta machine.',
    aliases: ['git init', 'git clone', 'cloner', 'initialiser', 'depot', 'repo', 'creer un depot'],
    keywords: [
      'demarrer un projet git',
      'recuperer un projet',
      'cloner un repo',
      'initialiser un depot',
      'telecharger le code',
      'point git',
    ],
    relatedContentIds: [],
    templateId: 'GIT-F-1100-TEMPLATE',
    intro:
      'Il y a deux façons de commencer avec Git. <b>git init</b> transforme un dossier existant en dépôt Git (projet neuf). <b>git clone</b> copie un dépôt <b>déjà en ligne</b> (ex. GitHub) sur ta machine, avec tout son historique.',
    sections: [
      {
        id: 's1',
        title: 'Partir d’un projet existant en ligne',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>récupérer sur mon ordinateur un projet déjà hébergé sur GitHub</b> pour pouvoir travailler dessus.',
          },
          {
            type: 'paragraph',
            html: 'C’est le cas le plus courant en équipe. <code>git clone</code> télécharge le code, tout l’<b>historique</b> et configure automatiquement le lien vers le dépôt distant (appelé <code>origin</code>).',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1100-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Copie le depot distant dans un nouveau dossier
git clone https://github.com/equipe/mon-projet.git

# Entre dans le dossier cree
cd mon-projet

# Verifie que tout est bien la
git status`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À savoir :</b> <code>git clone</code> crée <b>tout seul</b> un dossier au nom du projet. Inutile de créer le dossier avant, place-toi juste là où tu veux le ranger.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Créer un dépôt neuf à partir d’un dossier',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>commencer un nouveau projet vide sur ma machine</b> et le suivre avec Git dès le départ.',
          },
          {
            type: 'paragraph',
            html: '<code>git init</code> crée un dossier caché <code>.git</code> dans ton projet : c’est lui qui contient tout l’historique. À partir de là, le dossier est un <b>dépôt Git</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1100-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Cree le dossier du projet et entre dedans
mkdir mon-projet
cd mon-projet

# Transforme le dossier en depot Git
git init

# Git suit maintenant ce dossier (dossier cache .git cree)
git status`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>git init</code> = poser un carnet de bord vierge dans le projet. <code>git clone</code> = photocopier le carnet complet d’un collègue, pages d’historique comprises.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Relier un projet local à un dépôt distant',
        blocks: [
          {
            type: 'paragraph',
            html: 'Après un <code>git init</code>, ton projet est <b>local</b> uniquement. Pour l’envoyer sur GitHub plus tard, tu dois lui indiquer l’adresse du dépôt distant avec <code>git remote add origin</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1100-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Relie ton depot local au depot distant nomme "origin"
git remote add origin https://github.com/moi/mon-projet.git

# Verifie le lien enregistre
git remote -v`,
            },
          },
          {
            type: 'table',
            headers: ['Commande', 'Quand l’utiliser'],
            rows: [
              ['<code>git clone</code>', 'le projet existe déjà en ligne'],
              ['<code>git init</code>', 'tu pars d’un dossier vide, projet neuf'],
              ['<code>git remote add origin</code>', 'relier un projet local à GitHub après un init'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Faire <code>git init</code> dans un dossier déjà cloné : inutile, le dépôt existe déjà. Vérifie avec <code>git status</code> avant.',
      'Lancer <code>git init</code> dans ton dossier personnel (Home / Bureau) par erreur : tu suis alors <b>tout</b> ton ordinateur. Fais-le uniquement dans le dossier du projet.',
      'Oublier le <code>.git</code> à la fin de l’URL de clone n’est pas grave, mais colle bien l’URL <b>HTTPS ou SSH</b> complète, pas l’adresse de la page web du projet.',
    ],
    takeaways: [
      '<code>git clone URL</code> = récupérer un projet existant (crée le dossier tout seul)',
      '<code>git init</code> = transformer un dossier vide en dépôt Git',
      'après un <code>init</code> : <code>git remote add origin URL</code> pour relier à GitHub',
      '<code>git status</code> confirme qu’un dossier est bien suivi par Git',
    ],
  }),
  template({
    id: 'GIT-F-1100-TEMPLATE',
    slug: 'git-init-et-cloner-un-depot',
    title: 'git init / git clone',
    shortTitle: 'init / clone',
    technology: 'git',
    tomeId: 't1',
    summary: 'Les commandes prêtes à copier pour démarrer un dépôt : clone, init, remote add.',
    lede: 'Démarrer un dépôt Git. Choisis ta situation :',
    aliases: ['git init', 'git clone', 'remote add', 'cloner'],
    keywords: ['demarrer', 'cloner', 'initialiser', 'remote'],
    relatedContentIds: [],
    lessonId: 'GIT-F-1100-LESSON',
    variants: [
      {
        id: 'clone',
        label: 'Cloner (existant)',
        description: 'Le projet est déjà sur GitHub',
        codeBlocks: [
          {
            id: 'GIT-F-1100-t-clone',
            filename: 'terminal',
            language: 'bash',
            code: `git clone https://github.com/equipe/mon-projet.git
cd mon-projet`,
          },
        ],
        replacements: [
          { token: 'https://github.com/equipe/mon-projet.git', description: 'l’URL du dépôt à cloner (bouton Code sur GitHub)' },
        ],
        placement: 'Le cas le plus fréquent en équipe : place-toi dans ton dossier de projets, puis clone.',
      },
      {
        id: 'init',
        label: 'Init (projet neuf)',
        description: 'Tu pars d’un dossier vide',
        codeBlocks: [
          {
            id: 'GIT-F-1100-t-init',
            filename: 'terminal',
            language: 'bash',
            code: `mkdir mon-projet
cd mon-projet
git init`,
          },
        ],
        replacements: [
          { token: 'mon-projet', description: 'le nom du dossier de ton nouveau projet' },
        ],
        placement: 'Quand tu démarres de zéro sur ta machine, avant tout premier commit.',
      },
      {
        id: 'remote',
        label: 'Relier à GitHub',
        description: 'Après un init, lier le distant',
        codeBlocks: [
          {
            id: 'GIT-F-1100-t-remote',
            filename: 'terminal',
            language: 'bash',
            code: `git remote add origin https://github.com/moi/mon-projet.git
git remote -v`,
          },
        ],
        replacements: [
          { token: 'https://github.com/moi/mon-projet.git', description: 'l’URL du dépôt distant que tu as créé sur GitHub' },
        ],
        placement: 'À faire une seule fois, après un git init, pour pouvoir push vers GitHub ensuite.',
      },
    ],
  }),

  // ————— git add et git commit —————
  lesson({
    id: 'GIT-F-1101-LESSON',
    slug: 'git-add-et-git-commit',
    title: 'git add et git commit',
    shortTitle: 'add / commit',
    technology: 'git',
    tomeId: 't1',
    summary:
      'Enregistrer ton travail dans l’historique en deux temps : sélectionner les fichiers (add), puis figer une version datée et nommée (commit).',
    utility: 'Sauvegarder une étape de ton travail dans l’historique Git.',
    aliases: ['git add', 'git commit', 'commit', 'stage', 'index', 'sauvegarder', 'enregistrer'],
    keywords: [
      'sauvegarder mon travail',
      'enregistrer une version',
      'zone de staging',
      'message de commit',
      'ajouter des fichiers',
      'figer une etape',
    ],
    relatedContentIds: [],
    templateId: 'GIT-F-1101-TEMPLATE',
    intro:
      'Enregistrer avec Git se fait en <b>deux temps</b>. <code>git add</code> place les fichiers modifiés dans la <b>zone de staging</b> (ce que tu veux enregistrer). <code>git commit</code> fige ensuite ces fichiers dans l’historique avec un <b>message</b> décrivant le changement.',
    sections: [
      {
        id: 's1',
        title: 'Le cycle add puis commit',
        blocks: [
          {
            type: 'situation',
            html: 'Je viens de <b>terminer une fonctionnalité</b> et je veux l’<b>enregistrer proprement</b> dans l’historique, avec un message qui explique ce que j’ai fait.',
          },
          {
            type: 'paragraph',
            html: 'D’abord <code>git add</code> pour choisir les fichiers, puis <code>git commit -m</code> avec un message court et clair. Le <b>-m</b> permet d’écrire le message directement sur la ligne.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1101-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# 1. Regarde ce qui a change
git status

# 2. Ajoute tous les fichiers modifies a la zone de staging
git add .

# 3. Fige cette version avec un message clair
git commit -m "Ajoute le formulaire de connexion"`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>git add</code> = mettre les articles dans le <b>panier</b>. <code>git commit</code> = passer en <b>caisse</b> et garder le ticket (le message). Tant que tu n’as pas commité, rien n’est enregistré.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Choisir quoi ajouter',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>git add .</code> ajoute <b>tout</b>. Tu peux aussi ajouter <b>un seul fichier</b> pour découper ton travail en commits propres et cohérents.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1101-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Ajoute un seul fichier precis
git add src/Login.tsx

# Ajoute plusieurs fichiers nommes
git add src/Login.tsx src/api.ts

# Ajoute tout ce qui a change dans le projet
git add .`,
            },
          },
          {
            type: 'table',
            headers: ['Commande', 'Ce qu’elle ajoute au staging'],
            rows: [
              ['<code>git add fichier.tsx</code>', 'ce fichier uniquement'],
              ['<code>git add dossier/</code>', 'tout un dossier'],
              ['<code>git add .</code>', 'tous les fichiers modifiés du projet'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Écrire un bon message de commit',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un bon message décrit <b>ce que fait</b> le commit, à l’impératif présent, en une ligne courte. Il aide toute l’équipe (et toi dans six mois) à relire l’historique.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1101-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Clair : on comprend le changement d'un coup d'oeil
git commit -m "Corrige le bug d'envoi du formulaire"

# Vague : a eviter, on ne sait pas ce qui a change
git commit -m "modifs"`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> un message à l’<b>impératif</b> (« Ajoute », « Corrige », « Supprime »), court et précis. Un commit = une idée cohérente.',
          },
        ],
      },
    ],
    pitfalls: [
      'Faire <code>git commit</code> sans avoir fait <code>git add</code> avant : tes modifications ne sont pas dans le staging, le commit est vide (ou incomplet).',
      'Oublier le <code>-m</code> : Git ouvre un éditeur de texte (souvent Vim) qui déroute. Utilise <code>git commit -m "message"</code> pour rester dans le terminal.',
      'Tout commiter d’un coup avec un message vague (<code>"maj"</code>) : préfère des commits ciblés avec des messages parlants.',
    ],
    takeaways: [
      'enregistrer = 2 temps : <code>git add</code> puis <code>git commit</code>',
      '<code>git add .</code> = tout · <code>git add fichier</code> = un seul fichier',
      '<code>git commit -m "message"</code> pour écrire le message sans quitter le terminal',
      'message clair, à l’impératif : « Ajoute… », « Corrige… »',
      'rien n’est enregistré tant que tu n’as pas commité',
    ],
  }),
  template({
    id: 'GIT-F-1101-TEMPLATE',
    slug: 'git-add-et-git-commit',
    title: 'git add / git commit',
    shortTitle: 'add / commit',
    technology: 'git',
    tomeId: 't1',
    summary: 'Enregistrer ton travail : add tout ou un fichier, commit avec message.',
    lede: 'Enregistrer une étape. Choisis le cas :',
    aliases: ['git add', 'git commit', 'commit', 'staging'],
    keywords: ['sauvegarder', 'message', 'staging'],
    relatedContentIds: [],
    lessonId: 'GIT-F-1101-LESSON',
    variants: [
      {
        id: 'tout',
        label: 'Tout enregistrer',
        description: 'Le cas courant',
        codeBlocks: [
          {
            id: 'GIT-F-1101-t-tout',
            filename: 'terminal',
            language: 'bash',
            code: `git add .
git commit -m "Ajoute le formulaire de connexion"`,
          },
        ],
        replacements: [
          { token: 'Ajoute le formulaire de connexion', description: 'ton message de commit, court et à l’impératif' },
        ],
        placement: 'Le combo classique après avoir terminé une étape de travail.',
      },
      {
        id: 'un-fichier',
        label: 'Un fichier précis',
        description: 'Découper en commits propres',
        codeBlocks: [
          {
            id: 'GIT-F-1101-t-fichier',
            filename: 'terminal',
            language: 'bash',
            code: `git add src/Login.tsx
git commit -m "Ajoute la validation du mot de passe"`,
          },
        ],
        replacements: [
          { token: 'src/Login.tsx', description: 'le chemin du fichier à enregistrer' },
          { token: 'Ajoute la validation du mot de passe', description: 'le message décrivant ce changement précis' },
        ],
        placement: 'Quand tu veux un commit ciblé qui ne touche qu’un fichier ou une idée.',
      },
      {
        id: 'add-commit',
        label: 'Add + commit combinés',
        description: 'Raccourci pour les fichiers déjà suivis',
        codeBlocks: [
          {
            id: 'GIT-F-1101-t-am',
            filename: 'terminal',
            language: 'bash',
            code: `git commit -am "Corrige la couleur du bouton"`,
          },
        ],
        replacements: [
          { token: 'Corrige la couleur du bouton', description: 'ton message de commit' },
        ],
        placement: 'L’option -a ajoute et commite en une fois les fichiers DÉJÀ suivis (pas les fichiers tout neufs).',
      },
    ],
  }),

  // ————— git push et git pull —————
  lesson({
    id: 'GIT-F-1102-LESSON',
    slug: 'git-push-et-git-pull',
    title: 'git push et git pull',
    shortTitle: 'push / pull',
    technology: 'git',
    tomeId: 't1',
    summary:
      'Synchroniser ton travail avec le dépôt distant : envoyer tes commits (push) et récupérer ceux des autres (pull).',
    utility: 'Envoyer tes commits sur GitHub et récupérer ceux de l’équipe.',
    aliases: ['git push', 'git pull', 'push', 'pull', 'envoyer', 'recuperer', 'synchroniser', 'origin'],
    keywords: [
      'envoyer mon code',
      'recuperer les changements',
      'mettre a jour depuis github',
      'synchroniser',
      'pousser mes commits',
      'origin main',
    ],
    relatedContentIds: [],
    templateId: 'GIT-F-1102-TEMPLATE',
    intro:
      'Tes commits vivent d’abord <b>sur ta machine</b>. <code>git push</code> les <b>envoie</b> vers le dépôt distant (GitHub). <code>git pull</code> fait l’inverse : il <b>récupère</b> les commits que les autres ont poussés et les intègre chez toi.',
    sections: [
      {
        id: 's1',
        title: 'Envoyer ton travail sur GitHub',
        blocks: [
          {
            type: 'situation',
            html: 'J’ai <b>fait plusieurs commits en local</b> et je veux les <b>partager avec mon équipe</b> en les envoyant sur GitHub.',
          },
          {
            type: 'paragraph',
            html: 'Une fois tes commits faits, <code>git push</code> les envoie vers le dépôt distant. La forme complète précise le distant (<code>origin</code>) et la branche.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1102-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Envoie tes commits vers la branche main du distant origin
git push origin main

# Apres la 1re fois, un simple "git push" suffit souvent
git push`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce :</b> à ton tout premier push d’une branche, utilise <code>git push -u origin main</code>. Le <code>-u</code> mémorise le lien, et ensuite <code>git push</code> seul suffit.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Récupérer le travail des autres',
        blocks: [
          {
            type: 'situation',
            html: 'Un collègue a <b>poussé des changements sur GitHub</b> et je veux <b>mettre à jour mon projet local</b> avant de continuer.',
          },
          {
            type: 'paragraph',
            html: '<code>git pull</code> télécharge les nouveaux commits du distant et les <b>fusionne</b> dans ta branche actuelle. À faire <b>avant</b> de commencer à travailler pour rester à jour.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1102-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Recupere et integre les commits du distant
git pull origin main

# Le bon reflexe : pull AVANT de commencer a coder
git pull`,
            },
          },
          {
            type: 'table',
            headers: ['Commande', 'Sens', 'Rôle'],
            rows: [
              ['<code>git push</code>', 'local → distant', 'envoyer tes commits'],
              ['<code>git pull</code>', 'distant → local', 'récupérer ceux des autres'],
              ['<code>git status</code>', '—', 'voir si tu es en avance ou en retard'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Le bon réflexe : pull avant push',
        blocks: [
          {
            type: 'paragraph',
            html: 'Si Git refuse ton <code>push</code> (« <b>rejected</b> »), c’est que le distant a des commits que tu n’as pas. Fais un <code>git pull</code> d’abord pour te synchroniser, puis <code>push</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1102-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Push refuse ? Recupere d'abord les nouveautes
git pull

# Puis renvoie ton travail
git push`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le dépôt distant est un <b>tableau blanc partagé</b>. <code>push</code> = recopier tes notes dessus. <code>pull</code> = recopier chez toi ce que les autres y ont écrit. On lit avant d’écrire pour ne rien écraser.',
          },
        ],
      },
    ],
    pitfalls: [
      'Faire <code>git push</code> alors que tu as oublié de commiter : Git n’envoie que les <b>commits</b>, pas les modifications non commitées. Commite d’abord.',
      'Push <b>rejeté</b> (« rejected, non-fast-forward ») : le distant est en avance. Fais <code>git pull</code> puis <code>git push</code>.',
      'Ne jamais faire de <code>pull</code> : tu travailles sur une version périmée et tu accumules les conflits. Prends l’habitude de pull en début de session.',
    ],
    takeaways: [
      '<code>git push</code> = envoyer tes commits vers GitHub (local → distant)',
      '<code>git pull</code> = récupérer ceux des autres (distant → local)',
      '1er push d’une branche : <code>git push -u origin main</code>',
      'push refusé ? <code>git pull</code> d’abord, puis <code>git push</code>',
      'réflexe : <code>pull</code> en début de session avant de coder',
    ],
  }),
  template({
    id: 'GIT-F-1102-TEMPLATE',
    slug: 'git-push-et-git-pull',
    title: 'git push / git pull',
    shortTitle: 'push / pull',
    technology: 'git',
    tomeId: 't1',
    summary: 'Synchroniser avec le distant : premier push, push courant, pull.',
    lede: 'Synchroniser avec GitHub. Choisis le cas :',
    aliases: ['git push', 'git pull', 'push', 'pull', 'synchroniser'],
    keywords: ['envoyer', 'recuperer', 'origin'],
    relatedContentIds: [],
    lessonId: 'GIT-F-1102-LESSON',
    variants: [
      {
        id: 'premier-push',
        label: 'Premier push',
        description: 'La toute première fois sur une branche',
        codeBlocks: [
          {
            id: 'GIT-F-1102-t-first',
            filename: 'terminal',
            language: 'bash',
            code: `git push -u origin main`,
          },
        ],
        replacements: [
          { token: 'main', description: 'le nom de ta branche (souvent main)' },
        ],
        placement: 'La première fois : le -u mémorise le lien, pour que git push seul marche ensuite.',
      },
      {
        id: 'push',
        label: 'Push courant',
        description: 'Une fois le lien mémorisé',
        codeBlocks: [
          {
            id: 'GIT-F-1102-t-push',
            filename: 'terminal',
            language: 'bash',
            code: `git push`,
          },
        ],
        replacements: [],
        placement: 'Après le premier push -u, cette seule commande envoie tes nouveaux commits.',
      },
      {
        id: 'pull',
        label: 'Pull (récupérer)',
        description: 'Se mettre à jour',
        codeBlocks: [
          {
            id: 'GIT-F-1102-t-pull',
            filename: 'terminal',
            language: 'bash',
            code: `git pull origin main`,
          },
        ],
        replacements: [
          { token: 'main', description: 'la branche à récupérer' },
        ],
        placement: 'En début de session, ou quand un push est refusé, pour intégrer le travail des autres.',
      },
    ],
  }),

  // ————— Créer une branche : git checkout -b —————
  lesson({
    id: 'GIT-F-1103-LESSON',
    slug: 'creer-une-branche-git-checkout-b',
    title: 'Créer une branche : git checkout -b',
    shortTitle: 'Créer branche',
    technology: 'git',
    tomeId: 't1',
    summary:
      'Ouvrir une ligne de travail isolée pour développer une fonctionnalité sans toucher à la branche principale, avec git checkout -b.',
    utility: 'Travailler sur une nouvelle fonctionnalité sans risquer de casser main.',
    aliases: ['branche', 'branch', 'git checkout -b', 'git branch', 'creer une branche', 'nouvelle branche'],
    keywords: [
      'nouvelle fonctionnalite',
      'isoler mon travail',
      'creer une branche',
      'ne pas casser main',
      'ligne de travail',
      'feature branch',
    ],
    relatedContentIds: [],
    templateId: 'GIT-F-1103-TEMPLATE',
    intro:
      'Une <b>branche</b> est une ligne de travail <b>indépendante</b>. Tu développes ta fonctionnalité dessus sans toucher à <code>main</code>. <code>git checkout -b nom</code> <b>crée</b> la branche et <b>bascule</b> dessus en une seule commande.',
    sections: [
      {
        id: 's1',
        title: 'Créer sa branche de fonctionnalité',
        blocks: [
          {
            type: 'situation',
            html: 'Je vais <b>développer une nouvelle page de profil</b> et je veux <b>isoler ce travail</b> pour ne pas risquer de casser la branche principale.',
          },
          {
            type: 'paragraph',
            html: 'Depuis <code>main</code>, une seule commande crée la branche et te place dessus. Le <code>-b</code> signifie « <b>branch</b> » : crée puis bascule.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1103-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Cree la branche et bascule dessus d'un coup
git checkout -b feature/page-profil

# Verifie sur quelle branche tu es (etoile devant)
git branch`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention de nommage :</b> un préfixe clair + tirets, ex. <code>feature/page-profil</code>, <code>fix/bug-connexion</code>. Pas d’espaces ni d’accents dans les noms de branche.',
          },
        ],
      },
      {
        id: 's2',
        title: 'La version moderne : git switch -c',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les versions récentes de Git proposent <code>git switch -c</code>, plus explicite (<code>-c</code> = <b>create</b>). Il fait exactement la même chose que <code>git checkout -b</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1103-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Equivalent moderne de checkout -b
git switch -c feature/page-profil

# Les deux creent la branche ET basculent dessus`,
            },
          },
          {
            type: 'table',
            headers: ['Commande', 'Effet'],
            rows: [
              ['<code>git checkout -b nom</code>', 'crée la branche + bascule (classique)'],
              ['<code>git switch -c nom</code>', 'crée la branche + bascule (moderne)'],
              ['<code>git branch nom</code>', 'crée la branche SANS basculer dessus'],
              ['<code>git branch</code>', 'liste les branches existantes'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Partir d’une base à jour',
        blocks: [
          {
            type: 'paragraph',
            html: 'Crée toujours ta branche <b>à partir d’une <code>main</code> à jour</b>. Le réflexe : revenir sur <code>main</code>, faire un <code>pull</code>, puis créer la branche.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1103-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# 1. Reviens sur main
git checkout main

# 2. Mets main a jour
git pull

# 3. Cree ta branche depuis cette base propre
git checkout -b feature/page-profil`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une branche = une <b>copie de brouillon</b> du projet. Tu peux tout essayer dessus ; <code>main</code>, la version au propre, reste intacte tant que tu n’as pas fusionné.',
          },
        ],
      },
    ],
    pitfalls: [
      'Créer une branche depuis une <code>main</code> périmée : ta branche part en retard. Fais <code>git pull</code> sur main avant de brancher.',
      'Oublier le <code>-b</code> : <code>git checkout feature/x</code> essaie de <b>basculer</b> sur une branche… qui n’existe pas encore. Le <code>-b</code> la crée.',
      'Mettre des espaces ou des accents dans le nom : <code>ma branche</code> pose problème. Utilise des tirets : <code>ma-branche</code>.',
    ],
    takeaways: [
      '<code>git checkout -b nom</code> = crée la branche ET bascule dessus',
      'équivalent moderne : <code>git switch -c nom</code>',
      '<code>git branch</code> (sans nom) liste les branches et montre où tu es',
      'nommage : <code>feature/…</code>, <code>fix/…</code>, en tirets, sans accents',
      'branche toujours depuis une <code>main</code> à jour (<code>pull</code> avant)',
    ],
  }),
  template({
    id: 'GIT-F-1103-TEMPLATE',
    slug: 'creer-une-branche-git-checkout-b',
    title: 'Créer une branche',
    shortTitle: 'Créer branche',
    technology: 'git',
    tomeId: 't1',
    summary: 'Créer une branche : checkout -b, switch -c, ou depuis une main à jour.',
    lede: 'Créer une branche de travail. Choisis le cas :',
    aliases: ['branche', 'checkout -b', 'switch -c', 'creer branche'],
    keywords: ['nouvelle branche', 'feature', 'isoler'],
    relatedContentIds: [],
    lessonId: 'GIT-F-1103-LESSON',
    variants: [
      {
        id: 'checkout',
        label: 'checkout -b',
        description: 'La commande classique',
        codeBlocks: [
          {
            id: 'GIT-F-1103-t-checkout',
            filename: 'terminal',
            language: 'bash',
            code: `git checkout -b feature/page-profil`,
          },
        ],
        replacements: [
          { token: 'feature/page-profil', description: 'le nom de ta branche (préfixe + tirets, sans accents)' },
        ],
        placement: 'La forme la plus répandue : crée la branche et bascule dessus d’un coup.',
      },
      {
        id: 'switch',
        label: 'switch -c',
        description: 'La commande moderne',
        codeBlocks: [
          {
            id: 'GIT-F-1103-t-switch',
            filename: 'terminal',
            language: 'bash',
            code: `git switch -c feature/page-profil`,
          },
        ],
        replacements: [
          { token: 'feature/page-profil', description: 'le nom de ta branche' },
        ],
        placement: 'Même effet que checkout -b, avec une syntaxe plus explicite (Git récent).',
      },
      {
        id: 'depuis-main',
        label: 'Depuis main à jour',
        description: 'Le réflexe complet',
        codeBlocks: [
          {
            id: 'GIT-F-1103-t-frommain',
            filename: 'terminal',
            language: 'bash',
            code: `git checkout main
git pull
git checkout -b feature/page-profil`,
          },
        ],
        replacements: [
          { token: 'feature/page-profil', description: 'le nom de ta nouvelle branche' },
        ],
        placement: 'La bonne habitude : partir d’une main synchronisée avant de créer ta branche.',
      },
    ],
  }),

  // ————— Changer de branche —————
  lesson({
    id: 'GIT-F-1104-LESSON',
    slug: 'changer-de-branche',
    title: 'Changer de branche',
    shortTitle: 'Changer branche',
    technology: 'git',
    tomeId: 't1',
    summary:
      'Passer d’une branche à une autre pour reprendre un travail en cours ou revenir sur la branche principale, avec checkout ou switch.',
    utility: 'Naviguer entre tes branches sans perdre ton travail.',
    aliases: ['changer de branche', 'git checkout', 'git switch', 'basculer', 'naviguer', 'revenir sur main'],
    keywords: [
      'passer d une branche a l autre',
      'revenir sur main',
      'basculer de branche',
      'reprendre un travail',
      'lister les branches',
      'switch',
    ],
    relatedContentIds: [],
    templateId: 'GIT-F-1104-TEMPLATE',
    intro:
      'Changer de branche, c’est <b>basculer</b> ton dossier de travail sur une autre ligne. Les fichiers affichés changent pour refléter la branche choisie. On utilise <code>git switch nom</code> (moderne) ou <code>git checkout nom</code> (classique).',
    sections: [
      {
        id: 's1',
        title: 'Basculer sur une branche existante',
        blocks: [
          {
            type: 'situation',
            html: 'Je travaille sur une fonctionnalité mais je dois <b>revenir sur <code>main</code></b> pour corriger un bug urgent, puis <b>retourner à mon travail</b> ensuite.',
          },
          {
            type: 'paragraph',
            html: 'Une simple commande te fait passer d’une branche à l’autre. Ton travail sur la branche que tu quittes reste intact, tu le retrouveras en y revenant.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1104-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# Reviens sur la branche principale
git switch main

# ... tu corriges le bug, tu commites ...

# Retourne sur ta fonctionnalite
git switch feature/page-profil`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Deux syntaxes équivalentes :</b> <code>git switch nom</code> (récent, recommandé) ou <code>git checkout nom</code> (plus ancien, toujours valable). Sans <code>-b</code>/<code>-c</code>, on ne crée pas, on bascule.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Voir et revenir en arrière',
        blocks: [
          {
            type: 'paragraph',
            html: '<code>git branch</code> liste tes branches et marque la branche courante d’une <b>étoile</b>. Un raccourci pratique : <code>git switch -</code> revient sur la <b>branche précédente</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1104-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Liste les branches (etoile = branche actuelle)
git branch

# Revient sur la branche precedente (comme "cd -")
git switch -`,
            },
          },
          {
            type: 'table',
            headers: ['Commande', 'Effet'],
            rows: [
              ['<code>git switch main</code>', 'bascule sur main'],
              ['<code>git checkout main</code>', 'bascule sur main (ancienne syntaxe)'],
              ['<code>git switch -</code>', 'revient sur la branche précédente'],
              ['<code>git branch</code>', 'liste les branches et montre la courante'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Attention aux modifications non commitées',
        blocks: [
          {
            type: 'paragraph',
            html: 'Si tu as des modifications <b>en cours non commitées</b>, Git peut refuser de changer de branche pour ne pas les perdre. Le plus simple : <b>commite</b> avant de basculer.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1104-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Verifie s'il te reste des modifs en cours
git status

# Commite ton travail avant de changer de branche
git add .
git commit -m "Travail en cours sur le profil"

# Maintenant tu peux basculer sans risque
git switch main`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> changer de branche = changer de <b>bureau de travail</b>. Range tes affaires (commite) avant de passer à l’autre bureau, sinon Git bloque la porte pour éviter que tu perdes des feuilles.',
          },
        ],
      },
    ],
    pitfalls: [
      'Vouloir changer de branche avec des modifications non commitées : Git refuse parfois (« <b>would be overwritten</b> »). Commite d’abord.',
      'Confondre <code>git switch nom</code> (bascule) et <code>git switch -c nom</code> (crée) : sans <code>-c</code>, la branche doit déjà exister.',
      'Se tromper de branche sans le voir : lance <code>git branch</code> ou regarde ton terminal/éditeur qui affiche souvent la branche courante.',
    ],
    takeaways: [
      '<code>git switch nom</code> = basculer sur une branche existante (moderne)',
      '<code>git checkout nom</code> = même chose (ancienne syntaxe)',
      '<code>git switch -</code> = revenir sur la branche précédente',
      '<code>git branch</code> liste et montre la branche courante (étoile)',
      'commite avant de changer de branche pour ne rien perdre',
    ],
  }),
  template({
    id: 'GIT-F-1104-TEMPLATE',
    slug: 'changer-de-branche',
    title: 'Changer de branche',
    shortTitle: 'Changer branche',
    technology: 'git',
    tomeId: 't1',
    summary: 'Basculer d’une branche à l’autre : switch, checkout, ou branche précédente.',
    lede: 'Passer d’une branche à l’autre. Choisis le cas :',
    aliases: ['changer de branche', 'switch', 'checkout', 'basculer'],
    keywords: ['basculer', 'revenir sur main', 'naviguer'],
    relatedContentIds: [],
    lessonId: 'GIT-F-1104-LESSON',
    variants: [
      {
        id: 'switch',
        label: 'switch (moderne)',
        description: 'La syntaxe recommandée',
        codeBlocks: [
          {
            id: 'GIT-F-1104-t-switch',
            filename: 'terminal',
            language: 'bash',
            code: `git switch main`,
          },
        ],
        replacements: [
          { token: 'main', description: 'le nom de la branche existante où basculer' },
        ],
        placement: 'La commande moderne pour changer de branche (Git récent).',
      },
      {
        id: 'checkout',
        label: 'checkout (classique)',
        description: 'L’ancienne syntaxe',
        codeBlocks: [
          {
            id: 'GIT-F-1104-t-checkout',
            filename: 'terminal',
            language: 'bash',
            code: `git checkout main`,
          },
        ],
        replacements: [
          { token: 'main', description: 'le nom de la branche où basculer' },
        ],
        placement: 'Fait exactement la même chose que switch, tu la croiseras souvent dans les tutos.',
      },
      {
        id: 'precedente',
        label: 'Branche précédente',
        description: 'Revenir d’un coup',
        codeBlocks: [
          {
            id: 'GIT-F-1104-t-prev',
            filename: 'terminal',
            language: 'bash',
            code: `git switch -`,
          },
        ],
        replacements: [],
        placement: 'Le raccourci pour faire l’aller-retour entre deux branches, comme cd - dans le terminal.',
      },
    ],
  }),

  // ————— Fusionner : merge —————
  lesson({
    id: 'GIT-F-1105-LESSON',
    slug: 'fusionner-merge',
    title: 'Fusionner : merge',
    shortTitle: 'merge',
    technology: 'git',
    tomeId: 't1',
    summary:
      'Intégrer le travail d’une branche dans une autre avec git merge, et savoir gérer un conflit quand deux branches modifient la même ligne.',
    utility: 'Rapatrier le travail d’une branche dans main une fois terminé.',
    aliases: ['merge', 'fusionner', 'git merge', 'fusion', 'conflit', 'integrer une branche'],
    keywords: [
      'integrer une branche',
      'rapatrier dans main',
      'fusionner mon travail',
      'resoudre un conflit',
      'terminer une fonctionnalite',
      'reunir deux branches',
    ],
    relatedContentIds: [],
    templateId: 'GIT-F-1105-TEMPLATE',
    intro:
      '<b>Fusionner</b> (merge) intègre les commits d’une branche dans une autre. Une fois ta fonctionnalité prête, tu la <b>rapatries dans <code>main</code></b>. On se place sur la branche <b>qui reçoit</b>, puis on fusionne la branche source.',
    sections: [
      {
        id: 's1',
        title: 'Fusionner une branche dans main',
        blocks: [
          {
            type: 'situation',
            html: 'Ma <b>fonctionnalité est terminée et testée</b> sur sa branche, je veux maintenant l’<b>intégrer dans <code>main</code></b>.',
          },
          {
            type: 'paragraph',
            html: 'Règle clé : on se place d’abord sur la branche <b>qui reçoit</b> (ici <code>main</code>), puis on fusionne la branche source. Le sens compte : on « tire » le travail dans la branche courante.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1105-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# 1. Va sur la branche qui va RECEVOIR le travail
git switch main

# 2. Mets-la a jour avant de fusionner
git pull

# 3. Fusionne ta branche de fonctionnalite dedans
git merge feature/page-profil`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Sens de la fusion :</b> on va sur la branche <b>cible</b> (celle qui reçoit) avant de lancer <code>git merge branche-source</code>. On fusionne <b>vers</b> l’endroit où l’on se trouve.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Gérer un conflit de fusion',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un <b>conflit</b> survient quand les deux branches ont modifié <b>la même ligne</b>. Git marque la zone à trancher avec <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code> et <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>. À toi de choisir le bon code.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1105-l-c2',
              filename: 'Bouton.tsx',
              language: 'text',
              code: `<<<<<<< HEAD
  couleur: "bleu"   // version de main
=======
  couleur: "vert"   // version de ta branche
>>>>>>> feature/page-profil`,
            },
          },
          {
            type: 'paragraph',
            html: 'Tu <b>édites le fichier</b> pour garder la bonne version (et tu supprimes les lignes <code>&lt;&lt;&lt;</code>/<code>===</code>/<code>&gt;&gt;&gt;</code>), puis tu enregistres la résolution avec un <code>add</code> et un <code>commit</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1105-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Apres avoir edite le fichier pour garder le bon code
git add Bouton.tsx

# Termine la fusion en commitant la resolution
git commit -m "Fusionne feature/page-profil dans main"`,
            },
          },
          {
            type: 'table',
            headers: ['Marqueur', 'Signifie'],
            rows: [
              ['<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code>', 'début de la version de la branche courante'],
              ['<code>=======</code>', 'séparation entre les deux versions'],
              ['<code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; branche</code>', 'fin de la version de l’autre branche'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Après la fusion',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une fois fusionnée, la branche de fonctionnalité ne sert plus à grand-chose. On peut la <b>supprimer</b> pour garder un dépôt propre, et pousser le <code>main</code> à jour.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1105-l-c4',
              filename: 'terminal',
              language: 'bash',
              code: `# Envoie le main fusionne sur GitHub
git push

# Supprime la branche devenue inutile (en local)
git branch -d feature/page-profil`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une branche = un affluent de rivière. <code>merge</code> = le moment où l’affluent <b>rejoint le fleuve principal</b>. Le conflit, c’est quand deux courants se disputent le même passage : tu choisis lequel garder.',
          },
        ],
      },
    ],
    pitfalls: [
      'Se tromper de sens : lancer <code>git merge main</code> depuis ta branche fait l’inverse de ce que tu crois. Place-toi d’abord sur la branche qui <b>reçoit</b>.',
      'Paniquer devant un conflit : c’est normal. Édite le fichier, supprime les marqueurs <code>&lt;&lt;&lt;</code>/<code>===</code>/<code>&gt;&gt;&gt;</code>, puis <code>add</code> + <code>commit</code>.',
      'Oublier de supprimer les marqueurs de conflit avant de commiter : ton code contient alors des <code>&lt;&lt;&lt;</code> qui cassent tout.',
    ],
    takeaways: [
      'on se place sur la branche <b>qui reçoit</b> (<code>main</code>), puis <code>git merge branche-source</code>',
      'un conflit = même ligne modifiée des deux côtés : Git marque la zone à trancher',
      'résoudre = éditer, supprimer les <code>&lt;&lt;&lt;</code>/<code>===</code>/<code>&gt;&gt;&gt;</code>, puis <code>add</code> + <code>commit</code>',
      'après fusion : <code>git push</code>, puis <code>git branch -d</code> pour nettoyer',
    ],
  }),
  template({
    id: 'GIT-F-1105-TEMPLATE',
    slug: 'fusionner-merge',
    title: 'git merge',
    shortTitle: 'merge',
    technology: 'git',
    tomeId: 't1',
    summary: 'Fusionner une branche : merge dans main, résoudre un conflit, nettoyer.',
    lede: 'Intégrer une branche. Choisis le cas :',
    aliases: ['merge', 'fusionner', 'conflit', 'integrer'],
    keywords: ['fusionner', 'conflit', 'main'],
    relatedContentIds: [],
    lessonId: 'GIT-F-1105-LESSON',
    variants: [
      {
        id: 'merge',
        label: 'Fusionner dans main',
        description: 'Le cas standard',
        codeBlocks: [
          {
            id: 'GIT-F-1105-t-merge',
            filename: 'terminal',
            language: 'bash',
            code: `git switch main
git pull
git merge feature/page-profil`,
          },
        ],
        replacements: [
          { token: 'feature/page-profil', description: 'le nom de la branche à intégrer dans main' },
        ],
        placement: 'On se place sur la branche cible (main) puis on fusionne la branche source dedans.',
      },
      {
        id: 'conflit',
        label: 'Résoudre un conflit',
        description: 'Quand Git s’arrête',
        codeBlocks: [
          {
            id: 'GIT-F-1105-t-conflit',
            filename: 'terminal',
            language: 'bash',
            code: `# Apres avoir edite les fichiers en conflit
git add .
git commit -m "Resout le conflit de fusion"`,
          },
        ],
        replacements: [
          { token: 'Resout le conflit de fusion', description: 'ton message de commit de résolution' },
        ],
        placement: 'Après avoir édité les fichiers pour garder le bon code et supprimé les marqueurs de conflit.',
      },
      {
        id: 'nettoyer',
        label: 'Nettoyer la branche',
        description: 'Une fois fusionnée',
        codeBlocks: [
          {
            id: 'GIT-F-1105-t-clean',
            filename: 'terminal',
            language: 'bash',
            code: `git push
git branch -d feature/page-profil`,
          },
        ],
        replacements: [
          { token: 'feature/page-profil', description: 'la branche fusionnée à supprimer' },
        ],
        placement: 'Après une fusion réussie : pousse main à jour et supprime la branche devenue inutile.',
      },
    ],
  }),

  // ————— Faire une Pull Request —————
  lesson({
    id: 'GIT-F-1106-LESSON',
    slug: 'faire-une-pull-request',
    title: 'Faire une Pull Request',
    shortTitle: 'Pull Request',
    technology: 'git',
    tomeId: 't1',
    summary:
      'Proposer ton travail à l’équipe via une Pull Request : pousser ta branche, ouvrir la PR sur GitHub, la faire relire puis fusionner.',
    utility: 'Faire relire et valider ton travail avant de l’intégrer à main.',
    aliases: ['pull request', 'pr', 'merge request', 'code review', 'relecture', 'proposer un changement'],
    keywords: [
      'proposer mon travail',
      'demande de fusion',
      'faire relire mon code',
      'ouvrir une pr',
      'revue de code',
      'valider avant merge',
    ],
    relatedContentIds: [],
    templateId: 'GIT-F-1106-TEMPLATE',
    intro:
      'Une <b>Pull Request</b> (PR) est une <b>demande de fusion</b> sur GitHub. Au lieu de fusionner toi-même dans <code>main</code>, tu proposes ta branche à l’équipe, qui la <b>relit</b> et la valide avant l’intégration. C’est la façon standard de travailler à plusieurs.',
    sections: [
      {
        id: 's1',
        title: 'Pousser ta branche pour préparer la PR',
        blocks: [
          {
            type: 'situation',
            html: 'J’ai <b>fini ma fonctionnalité sur ma branche</b> et je veux la <b>faire relire par l’équipe</b> avant qu’elle rejoigne <code>main</code>.',
          },
          {
            type: 'paragraph',
            html: 'Une PR part toujours d’une <b>branche poussée sur GitHub</b>. Tu commites, tu pousses ta branche, et GitHub te propose alors d’ouvrir la Pull Request.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1106-l-c1',
              filename: 'terminal',
              language: 'bash',
              code: `# 1. Enregistre ton travail
git add .
git commit -m "Ajoute la page de profil"

# 2. Pousse ta branche sur GitHub (1re fois : -u)
git push -u origin feature/page-profil`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Note :</b> une PR ne se crée pas dans le terminal avec Git seul, mais sur l’<b>interface GitHub</b> (ou avec l’outil <code>gh</code>). Git sert à pousser la branche ; GitHub gère la relecture.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Ouvrir la PR sur GitHub',
        blocks: [
          {
            type: 'paragraph',
            html: 'Après le push, GitHub affiche un bouton <b>« Compare &amp; pull request »</b>. Tu choisis la branche <b>cible</b> (souvent <code>main</code>), tu donnes un <b>titre</b> et une <b>description</b> claire de ce que fait ta PR.',
          },
          {
            type: 'table',
            headers: ['Étape', 'Où', 'Action'],
            rows: [
              ['Pousser la branche', 'terminal', '<code>git push -u origin ma-branche</code>'],
              ['Ouvrir la PR', 'GitHub', 'bouton « Compare &amp; pull request »'],
              ['Décrire', 'GitHub', 'titre + description du changement'],
              ['Relecture', 'GitHub', 'l’équipe commente et approuve'],
              ['Fusionner', 'GitHub', 'bouton « Merge pull request »'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une PR = <b>rendre une copie à corriger</b>. Tu la déposes (push + ouverture), le correcteur (l’équipe) annote et valide, puis la copie rejoint le classeur commun (<code>main</code>).',
          },
        ],
      },
      {
        id: 's3',
        title: 'Répondre aux retours de relecture',
        blocks: [
          {
            type: 'paragraph',
            html: 'Si un relecteur demande des changements, tu <b>modifies ton code</b>, tu commites et tu <b>repousses</b> sur la <b>même branche</b> : la PR se met à jour <b>toute seule</b>, pas besoin d’en rouvrir une.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1106-l-c2',
              filename: 'terminal',
              language: 'bash',
              code: `# Tu corriges suite aux commentaires, puis :
git add .
git commit -m "Corrige les retours de relecture"

# Repousse sur la MEME branche : la PR se met a jour
git push`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Bonne pratique :</b> une PR = un sujet cohérent, pas trop grosse. Plus une PR est petite et ciblée, plus la relecture est rapide et fiable.',
          },
        ],
      },
      {
        id: 's4',
        title: 'Après la fusion de la PR',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une fois la PR <b>approuvée et fusionnée</b> sur GitHub, tu récupères le <code>main</code> à jour en local et tu supprimes ta branche, désormais intégrée.',
          },
          {
            type: 'code',
            block: {
              id: 'GIT-F-1106-l-c3',
              filename: 'terminal',
              language: 'bash',
              code: `# Reviens sur main et recupere la version fusionnee
git switch main
git pull

# Supprime ta branche locale devenue inutile
git branch -d feature/page-profil`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      'Ouvrir une PR sans avoir <b>poussé</b> ta branche : GitHub n’a rien à comparer. Fais <code>git push</code> d’abord.',
      'Rouvrir une nouvelle PR après chaque retour : inutile. Repousse sur la <b>même branche</b>, la PR existante se met à jour automatiquement.',
      'Faire une PR énorme qui touche à tout : la relecture devient pénible. Découpe en PR plus petites et ciblées.',
    ],
    takeaways: [
      'une PR = demande de fusion relue par l’équipe, sur GitHub',
      'd’abord <code>git push -u origin ma-branche</code>, puis ouvrir la PR sur GitHub',
      'répondre aux retours = commit + <code>push</code> sur la <b>même branche</b> (la PR se met à jour)',
      'après fusion : <code>git switch main</code>, <code>git pull</code>, puis <code>git branch -d</code>',
      'une PR petite et ciblée est relue plus vite',
    ],
  }),
  template({
    id: 'GIT-F-1106-TEMPLATE',
    slug: 'faire-une-pull-request',
    title: 'Pull Request',
    shortTitle: 'Pull Request',
    technology: 'git',
    tomeId: 't1',
    summary: 'Le flux d’une Pull Request : pousser la branche, mettre à jour, nettoyer après merge.',
    lede: 'Proposer ton travail en PR. Choisis l’étape :',
    aliases: ['pull request', 'pr', 'relecture', 'code review'],
    keywords: ['proposer', 'relire', 'fusion'],
    relatedContentIds: [],
    lessonId: 'GIT-F-1106-LESSON',
    variants: [
      {
        id: 'pousser',
        label: 'Pousser la branche',
        description: 'Préparer la PR',
        codeBlocks: [
          {
            id: 'GIT-F-1106-t-push',
            filename: 'terminal',
            language: 'bash',
            code: `git add .
git commit -m "Ajoute la page de profil"
git push -u origin feature/page-profil`,
          },
        ],
        replacements: [
          { token: 'feature/page-profil', description: 'le nom de ta branche à proposer' },
          { token: 'Ajoute la page de profil', description: 'le message de commit' },
        ],
        placement: 'La première étape : pousser ta branche pour que GitHub propose d’ouvrir la PR.',
      },
      {
        id: 'gh',
        label: 'Ouvrir avec gh',
        description: 'En ligne de commande',
        codeBlocks: [
          {
            id: 'GIT-F-1106-t-gh',
            filename: 'terminal',
            language: 'bash',
            code: `gh pr create --base main --title "Page de profil" --body "Ajoute la page de profil utilisateur"`,
          },
        ],
        replacements: [
          { token: 'main', description: 'la branche cible de la fusion' },
          { token: 'Page de profil', description: 'le titre de ta PR' },
          { token: 'Ajoute la page de profil utilisateur', description: 'la description de ta PR' },
        ],
        placement: 'Si tu as l’outil GitHub CLI (gh) installé, tu ouvres la PR sans quitter le terminal.',
      },
      {
        id: 'apres-merge',
        label: 'Après la fusion',
        description: 'Nettoyer en local',
        codeBlocks: [
          {
            id: 'GIT-F-1106-t-after',
            filename: 'terminal',
            language: 'bash',
            code: `git switch main
git pull
git branch -d feature/page-profil`,
          },
        ],
        replacements: [
          { token: 'feature/page-profil', description: 'ta branche fusionnée à supprimer' },
        ],
        placement: 'Une fois la PR mergée sur GitHub : récupère main à jour et supprime ta branche locale.',
      },
    ],
  }),
];
