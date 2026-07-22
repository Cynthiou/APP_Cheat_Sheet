import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const methodology1Content: ReadyContent[] = [
  // ————— La méthode Agile : c’est quoi —————
  lesson({
    id: 'METH-F-1100-LESSON',
    slug: 'la-methode-agile-c-est-quoi',
    title: 'La méthode Agile : c’est quoi',
    shortTitle: 'Agile',
    technology: 'methodology',
    tomeId: 't1b',
    summary:
      'Livrer un produit par petits morceaux utiles plutôt que tout d’un coup, en s’adaptant au fur et à mesure du retour des utilisateurs.',
    utility: 'Comprendre pourquoi une équipe travaille par itérations courtes au lieu d’un gros plan figé.',
    aliases: ['agile', 'agilite', 'methode agile', 'iteration', 'iteratif', 'agile manifesto'],
    keywords: [
      'travailler par petits morceaux',
      'livrer souvent',
      's adapter au changement',
      'iteration courte',
      'cycle en V oppose',
      'valeur utilisateur',
    ],
    relatedContentIds: [],
    templateId: 'METH-F-1100-TEMPLATE',
    intro:
      'L’<b>Agile</b> est une façon de développer un produit par <b>itérations courtes</b> : on livre un petit morceau qui marche, on récolte du retour, on ajuste. À l’opposé du modèle <b>cycle en V</b> où tout est planifié d’avance et livré à la fin.',
    sections: [
      {
        id: 's1',
        title: 'L’idée de base : livrer par morceaux',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>comprendre pourquoi mon équipe ne planifie pas tout le projet d’un coup</b>, mais avance par cycles de deux semaines.',
          },
          {
            type: 'paragraph',
            html: 'Au lieu de construire tout le produit puis de le montrer à la fin (risqué), on découpe le travail en <b>itérations</b>. Chaque itération produit quelque chose d’<b>utilisable</b>, qu’on peut tester et corriger avant la suite.',
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> tu ne construis pas une voiture complète avant de la montrer. Tu livres d’abord une <b>trottinette</b>, puis un <b>vélo</b>, puis une <b>moto</b> — à chaque étape la personne peut déjà se déplacer et te dire ce qui manque.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les 4 valeurs du manifeste Agile',
        blocks: [
          {
            type: 'paragraph',
            html: 'L’Agile repose sur un <b>manifeste</b> de 4 valeurs. À chaque fois, on privilégie l’élément de gauche <b>sans jeter</b> celui de droite.',
          },
          {
            type: 'table',
            headers: ['On privilégie…', 'plutôt que…'],
            rows: [
              ['les individus et leurs échanges', 'les processus et les outils'],
              ['un produit qui marche', 'une documentation exhaustive'],
              ['la collaboration avec le client', 'la négociation d’un contrat'],
              ['l’adaptation au changement', 'le respect d’un plan figé'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> Agile n’est <b>pas</b> une méthode précise, c’est un état d’esprit. <b>Scrum</b> et <b>Kanban</b> sont des façons concrètes de l’appliquer.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Agile vs cycle en V',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <b>cycle en V</b> enchaîne les phases dans l’ordre (analyse → conception → dev → tests → livraison), sans revenir en arrière. L’<b>Agile</b> refait ce mini-cycle à chaque itération.',
          },
          {
            type: 'table',
            headers: ['Aspect', 'Cycle en V', 'Agile'],
            rows: [
              ['Livraison', 'une fois, à la fin', 'souvent, par morceaux'],
              ['Changement', 'coûteux, mal vu', 'attendu, intégré'],
              ['Retour client', 'à la toute fin', 'à chaque itération'],
              ['Risque', 'découvert tard', 'détecté tôt'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Croire qu’Agile veut dire « sans plan ni documentation » : on planifie, mais <b>par itération</b> plutôt que tout d’avance.',
      'Confondre Agile (l’état d’esprit) avec Scrum (une méthode précise pour l’appliquer).',
      'Penser qu’Agile = aller plus vite : le but est de livrer de la <b>valeur utile</b> plus tôt, pas de coder à toute allure.',
    ],
    takeaways: [
      'Agile = livrer par <b>itérations courtes</b>, s’adapter au retour',
      '4 valeurs : individus · produit qui marche · collaboration · adaptation',
      'Agile est un <b>état d’esprit</b> ; Scrum et Kanban sont des mises en œuvre',
      'opposé du <b>cycle en V</b> (tout planifié, livré à la fin)',
    ],
  }),
  template({
    id: 'METH-F-1100-TEMPLATE',
    slug: 'la-methode-agile-c-est-quoi',
    title: 'Agile',
    shortTitle: 'Agile',
    technology: 'methodology',
    tomeId: 't1b',
    summary: 'Les repères Agile prêts à réutiliser : les 4 valeurs, le vocabulaire, un rituel type.',
    lede: 'Les repères Agile à garder sous la main. Choisis la fiche :',
    aliases: ['agile', 'manifeste agile', 'iteration'],
    keywords: ['valeurs agile', 'vocabulaire', 'iteration'],
    relatedContentIds: [],
    lessonId: 'METH-F-1100-LESSON',
    variants: [
      {
        id: 'valeurs',
        label: 'Les 4 valeurs',
        codeBlocks: [
          {
            id: 'METH-F-1100-t-v1',
            filename: 'agile-valeurs.txt',
            language: 'text',
            code: `Les 4 valeurs du manifeste Agile
(on privilegie la gauche, sans jeter la droite)

1. Les individus et leurs echanges  >  les processus et les outils
2. Un produit qui marche             >  une documentation exhaustive
3. La collaboration avec le client   >  la negociation d'un contrat
4. L'adaptation au changement        >  le respect d'un plan fige`,
          },
        ],
        replacements: [],
        placement: 'À relire avant une rétro ou quand une décision d’équipe hésite entre « suivre le plan » et « s’adapter ».',
      },
      {
        id: 'vocabulaire',
        label: 'Le vocabulaire',
        codeBlocks: [
          {
            id: 'METH-F-1100-t-v2',
            filename: 'agile-glossaire.txt',
            language: 'text',
            code: `Iteration / Sprint : cycle court (souvent 2 semaines) qui produit
                     un increment utilisable.
Increment          : le morceau de produit livre a la fin d'un cycle.
Backlog            : la liste priorisee de tout ce qui reste a faire.
Product Owner      : la personne qui priorise le backlog.
Velocite           : la quantite de travail faite par iteration.`,
          },
        ],
        replacements: [],
        placement: 'Le mémo des mots que tu vas entendre chaque jour dans une équipe Agile.',
      },
      {
        id: 'rituel',
        label: 'Un cycle type',
        codeBlocks: [
          {
            id: 'METH-F-1100-t-v3',
            filename: 'agile-cycle.txt',
            language: 'text',
            code: `Deroulement d'une iteration de 2 semaines :

Jour 1     : planification -> on choisit ce qu'on fait ce cycle
Chaque jour: point rapide (15 min) sur l'avancement
Cycle      : on developpe, on teste, on integre au fur et a mesure
Dernier jour (matin): demo du produit a l'equipe / au client
Dernier jour (aprem): retrospective -> on ameliore la facon de bosser`,
          },
        ],
        replacements: [
          { token: '2 semaines', description: 'la durée d’une itération dans ton équipe (souvent 1 à 4 semaines)' },
        ],
        placement: 'La trame d’un cycle Agile, utile pour te situer quand tu arrives dans une nouvelle équipe.',
      },
    ],
  }),

  // ————— Scrum : sprints, daily, rétrospective —————
  lesson({
    id: 'METH-F-1101-LESSON',
    slug: 'scrum-sprints-daily-retrospective',
    title: 'Scrum : sprints, daily, rétrospective',
    shortTitle: 'Scrum',
    technology: 'methodology',
    tomeId: 't1b',
    summary:
      'Le cadre Agile le plus répandu : des sprints de durée fixe rythmés par 4 rituels (planning, daily, review, rétro) et 3 rôles.',
    utility: 'Savoir à quoi servent le sprint, le daily et la rétro quand tu rejoins une équipe Scrum.',
    aliases: ['scrum', 'sprint', 'daily', 'stand up', 'retrospective', 'sprint planning', 'scrum master'],
    keywords: [
      'reunion quotidienne',
      'daily stand up',
      'sprint de deux semaines',
      'retrospective agile',
      'sprint planning',
      'product owner',
    ],
    relatedContentIds: [],
    templateId: 'METH-F-1101-TEMPLATE',
    intro:
      '<b>Scrum</b> est le cadre Agile le plus utilisé. Il découpe le travail en <b>sprints</b> (cycles de durée fixe) rythmés par 4 <b>rituels</b> et portés par 3 <b>rôles</b> (Product Owner, Scrum Master, équipe de dev).',
    sections: [
      {
        id: 's1',
        title: 'Le sprint et ses 4 rituels',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>savoir ce qui m’attend dans une semaine Scrum</b> : quelles réunions, à quoi elles servent, et ce qu’on attend de moi.',
          },
          {
            type: 'paragraph',
            html: 'Un <b>sprint</b> dure en général 2 semaines. Il est encadré par 4 rituels : le <b>planning</b> au début, le <b>daily</b> chaque matin, la <b>review</b> et la <b>rétrospective</b> à la fin.',
          },
          {
            type: 'table',
            headers: ['Rituel', 'Quand', 'À quoi ça sert'],
            rows: [
              ['Sprint planning', 'début du sprint', 'choisir ce qu’on s’engage à faire'],
              ['Daily (stand-up)', 'chaque jour, 15 min', 'se synchroniser, lever les blocages'],
              ['Sprint review', 'fin du sprint', 'montrer le produit livré'],
              ['Rétrospective', 'fin du sprint', 'améliorer la façon de travailler'],
            ],
          },
        ],
      },
      {
        id: 's2',
        title: 'Le daily : 3 questions',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <b>daily</b> (ou stand-up) est un point <b>debout</b> de 15 minutes max. Chacun répond à 3 questions. Ce n’est <b>pas</b> une réunion de résolution de problème : on note les blocages, on les traite après.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1101-l-c1',
              filename: 'mon-daily.txt',
              language: 'text',
              code: `Mon point du jour (a preparer avant le daily) :

1. Hier, j'ai fait...
   -> termine le formulaire de connexion

2. Aujourd'hui, je vais faire...
   -> brancher le bouton "envoyer" a l'API

3. Ce qui me bloque...
   -> j'attends l'URL de l'API de la part de Sarah`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> si un sujet demande une vraie discussion, on dit « on en parle après le daily » entre les personnes concernées, pour ne pas bloquer toute l’équipe.',
          },
        ],
      },
      {
        id: 's3',
        title: 'La rétrospective',
        blocks: [
          {
            type: 'paragraph',
            html: 'La <b>rétro</b> ne parle <b>pas</b> du produit mais de la <b>façon de travailler</b>. Format courant : ce qui a bien marché, ce qui a moins marché, et les actions concrètes pour le prochain sprint.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1101-l-c2',
              filename: 'retro.txt',
              language: 'text',
              code: `Retrospective de sprint

Ce qui a bien marche :
  - le pair programming a debloque le bug de paiement

Ce qui a moins bien marche :
  - les tickets etaient trop gros, difficiles a finir

Actions pour le prochain sprint :
  - decouper les tickets de plus de 2 jours
  - faire un point technique le mercredi`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Les 3 rôles',
        blocks: [
          {
            type: 'paragraph',
            html: 'Scrum définit 3 rôles complémentaires. Comprendre qui fait quoi t’aide à savoir <b>à qui poser ta question</b>.',
          },
          {
            type: 'table',
            headers: ['Rôle', 'Responsabilité'],
            rows: [
              ['Product Owner', 'décide <b>quoi</b> construire et priorise le backlog'],
              ['Scrum Master', 'protège l’équipe, fait tourner les rituels, lève les obstacles'],
              ['Équipe de dev', 'décide <b>comment</b> construire et le fait'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Transformer le <b>daily</b> en réunion de 45 minutes : c’est un point de synchro de 15 min, debout, pas un comité technique.',
      'Sauter la <b>rétro</b> quand ça va vite : c’est justement le moment qui fait progresser l’équipe.',
      'Changer le périmètre d’un sprint en cours : ce qui est engagé au planning reste stable jusqu’à la fin du sprint.',
      'Confondre <b>review</b> (on montre le produit) et <b>rétro</b> (on parle de la façon de travailler).',
    ],
    takeaways: [
      'sprint = cycle de durée fixe (souvent 2 semaines)',
      '4 rituels : planning · daily · review · rétrospective',
      'daily = 15 min, 3 questions : hier / aujourd’hui / blocages',
      'rétro = améliorer la <b>façon de travailler</b>, pas le produit',
      '3 rôles : Product Owner (quoi) · Scrum Master (cadre) · dev (comment)',
    ],
  }),
  template({
    id: 'METH-F-1101-TEMPLATE',
    slug: 'scrum-sprints-daily-retrospective',
    title: 'Scrum',
    shortTitle: 'Scrum',
    technology: 'methodology',
    tomeId: 't1b',
    summary: 'Les trames Scrum prêtes à copier : préparer son daily, animer une rétro, cadrer un sprint.',
    lede: 'Les trames Scrum à copier. Choisis le rituel :',
    aliases: ['scrum', 'daily', 'retrospective', 'sprint'],
    keywords: ['stand up', 'retro', 'sprint planning'],
    relatedContentIds: [],
    lessonId: 'METH-F-1101-LESSON',
    variants: [
      {
        id: 'daily',
        label: 'Mon daily',
        codeBlocks: [
          {
            id: 'METH-F-1101-t-daily',
            filename: 'daily.txt',
            language: 'text',
            code: `Hier      : [ce que j'ai termine]
Aujourd'hui : [ce que je vais faire]
Blocages   : [ce qui m'empeche d'avancer, ou "rien"]`,
          },
        ],
        replacements: [
          { token: '[ce que j\'ai termine]', description: 'la tâche réellement finie hier' },
          { token: '[ce que je vais faire]', description: 'ton objectif concret du jour' },
          { token: '[ce qui m\'empeche d\'avancer, ou "rien"]', description: 'un blocage précis, sinon « rien »' },
        ],
        placement: 'À remplir 2 minutes avant le daily pour parler clair et court le moment venu.',
      },
      {
        id: 'retro',
        label: 'Trame de rétro',
        codeBlocks: [
          {
            id: 'METH-F-1101-t-retro',
            filename: 'retro.txt',
            language: 'text',
            code: `Ce qui a bien marche :
  - ...

Ce qui a moins bien marche :
  - ...

Actions pour le prochain sprint (concretes) :
  - ...`,
          },
        ],
        replacements: [
          { token: 'Actions pour le prochain sprint (concretes)', description: 'des actions mesurables, pas des vœux' },
        ],
        placement: 'Colle-la dans un doc partagé au début de la rétro pour que chacun remplisse sa partie.',
      },
      {
        id: 'sprint',
        label: 'Cadre de sprint',
        codeBlocks: [
          {
            id: 'METH-F-1101-t-sprint',
            filename: 'sprint.txt',
            language: 'text',
            code: `Sprint 12 - du 21 au 31 juillet

Objectif du sprint :
  - permettre a un utilisateur de reinitialiser son mot de passe

Engagements (tickets choisis au planning) :
  - [ ] Ecran "mot de passe oublie"
  - [ ] Envoi de l'email de reinitialisation
  - [ ] Ecran "nouveau mot de passe"`,
          },
        ],
        replacements: [
          { token: 'Sprint 12 - du 21 au 31 juillet', description: 'le numéro et les dates de ton sprint' },
          { token: 'Objectif du sprint', description: 'le but unique et clair du sprint' },
        ],
        placement: 'Le récap d’un sprint, à afficher pour que l’équipe garde l’objectif en tête.',
      },
    ],
  }),

  // ————— Les user stories —————
  lesson({
    id: 'METH-F-1102-LESSON',
    slug: 'les-user-stories',
    title: 'Les user stories',
    shortTitle: 'User stories',
    technology: 'methodology',
    tomeId: 't1b',
    summary:
      'Décrire un besoin du point de vue de l’utilisateur, avec des critères d’acceptation qui disent quand c’est « fini ».',
    utility: 'Écrire un ticket clair qui dit qui veut quoi et pourquoi, pas juste une tâche technique.',
    aliases: ['user story', 'story', 'ticket', 'critere d acceptation', 'given when then', 'backlog item'],
    keywords: [
      'en tant que je veux afin de',
      'critere d acceptation',
      'ticket clair',
      'besoin utilisateur',
      'definition of done',
      'decouper une story',
    ],
    relatedContentIds: [],
    templateId: 'METH-F-1102-TEMPLATE',
    intro:
      'Une <b>user story</b> décrit un besoin du point de vue de la personne qui l’utilise, pas de la technique. Le format classique : <b>En tant que</b> … <b>je veux</b> … <b>afin de</b> …, complété par des <b>critères d’acceptation</b>.',
    sections: [
      {
        id: 's1',
        title: 'Le format « En tant que… »',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>transformer une demande floue (« il faut un login ») en ticket clair</b> que je saurai développer et tester.',
          },
          {
            type: 'paragraph',
            html: 'On répond à 3 questions : <b>qui</b> (le rôle), <b>quoi</b> (l’action voulue) et <b>pourquoi</b> (le bénéfice). Le « pourquoi » est le plus important : il évite de coder pour rien.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1102-l-c1',
              filename: 'story.txt',
              language: 'text',
              code: `En tant que    visiteur non connecte
je veux        me connecter avec mon email et mon mot de passe
afin de        retrouver mon panier et mes commandes

(qui)   -> le role de la personne
(quoi)  -> l'action qu'elle veut faire
(pourquoi) -> le benefice reel pour elle`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une story n’est pas un cahier des charges, c’est une <b>promesse de conversation</b>. Elle dit juste assez pour qu’on en discute avant de coder.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les critères d’acceptation',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les <b>critères d’acceptation</b> disent <b>quand la story est finie</b>. Un format pratique : <b>Étant donné</b> (contexte) … <b>Quand</b> (action) … <b>Alors</b> (résultat attendu).',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1102-l-c2',
              filename: 'criteres.txt',
              language: 'text',
              code: `Criteres d'acceptation de la story "connexion" :

Etant donne un compte existant
Quand je saisis le bon email et le bon mot de passe
Alors je suis redirige vers mon tableau de bord

Etant donne un mot de passe errone
Quand je valide le formulaire
Alors un message "identifiants incorrects" s'affiche`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> une story est « prête » quand elle a un titre, un « pourquoi » et au moins un critère d’acceptation testable. Sinon, on la clarifie avant de la prendre.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Découper une story trop grosse',
        blocks: [
          {
            type: 'paragraph',
            html: 'Si une story ne tient pas dans un sprint, on la <b>découpe</b> en stories plus petites qui apportent chacune de la valeur. Mieux vaut plusieurs petits tickets finis qu’un gros à moitié fait.',
          },
          {
            type: 'table',
            headers: ['Trop gros', 'Découpé en'],
            rows: [
              ['« Gérer son compte »', 'se connecter · modifier son email · changer son mot de passe'],
              ['« Passer une commande »', 'ajouter au panier · saisir l’adresse · payer'],
              ['« Chercher un produit »', 'recherche par mot-clé · filtrer par prix · trier'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Écrire une story purement technique (« créer la table users ») : une story part d’un <b>besoin utilisateur</b>, pas d’une tâche interne.',
      'Oublier le « <b>afin de</b> » : sans le pourquoi, on ne sait pas si la solution proposée répond vraiment au besoin.',
      'Des critères d’acceptation vagues (« ça doit marcher ») : ils doivent être <b>testables</b>, avec un résultat attendu précis.',
      'Une story trop grosse pour un sprint : découpe-la plutôt que de l’étaler sur plusieurs cycles.',
    ],
    takeaways: [
      'format : <b>En tant que</b> (qui) · <b>je veux</b> (quoi) · <b>afin de</b> (pourquoi)',
      'le « pourquoi » évite de coder une fonctionnalité inutile',
      'critères d’acceptation = <b>Étant donné / Quand / Alors</b>, testables',
      'story trop grosse → la découper en petites stories qui livrent chacune de la valeur',
    ],
  }),
  template({
    id: 'METH-F-1102-TEMPLATE',
    slug: 'les-user-stories',
    title: 'User stories',
    shortTitle: 'User stories',
    technology: 'methodology',
    tomeId: 't1b',
    summary: 'Les gabarits de user story prêts à copier : la story, ses critères, la version bug.',
    lede: 'Écrire un bon ticket. Choisis le gabarit :',
    aliases: ['user story', 'ticket', 'critere d acceptation'],
    keywords: ['en tant que', 'given when then', 'bug report'],
    relatedContentIds: [],
    lessonId: 'METH-F-1102-LESSON',
    variants: [
      {
        id: 'story',
        label: 'La story',
        codeBlocks: [
          {
            id: 'METH-F-1102-t-story',
            filename: 'story.txt',
            language: 'text',
            code: `En tant que [role]
je veux     [action]
afin de     [benefice]`,
          },
        ],
        replacements: [
          { token: '[role]', description: 'qui fait l’action (visiteur, client connecté, admin…)' },
          { token: '[action]', description: 'ce que la personne veut pouvoir faire' },
          { token: '[benefice]', description: 'pourquoi : le gain réel pour elle' },
        ],
        placement: 'Le squelette d’un ticket fonctionnel. Colle-le en haut de chaque nouvelle story.',
      },
      {
        id: 'criteres',
        label: 'Critères (Given/When/Then)',
        codeBlocks: [
          {
            id: 'METH-F-1102-t-criteres',
            filename: 'criteres.txt',
            language: 'text',
            code: `Etant donne [contexte de depart]
Quand       [l'action de l'utilisateur]
Alors       [le resultat attendu]`,
          },
        ],
        replacements: [
          { token: '[contexte de depart]', description: 'l’état initial (compte existant, panier vide…)' },
          { token: '[l\'action de l\'utilisateur]', description: 'ce que la personne fait' },
          { token: '[le resultat attendu]', description: 'ce qui doit se produire, vérifiable' },
        ],
        placement: 'À ajouter sous la story. Écris un bloc par cas (succès, erreur, cas limite).',
      },
      {
        id: 'bug',
        label: 'Ticket de bug',
        codeBlocks: [
          {
            id: 'METH-F-1102-t-bug',
            filename: 'bug.txt',
            language: 'text',
            code: `Titre : [resume court du probleme]

Etapes pour reproduire :
  1. ...
  2. ...

Resultat obtenu   : [ce qui se passe]
Resultat attendu  : [ce qui devrait se passer]
Environnement     : [navigateur / OS / version]`,
          },
        ],
        replacements: [
          { token: '[resume court du probleme]', description: 'le bug en une phrase' },
          { token: '[ce qui se passe]', description: 'le comportement observé, avec le message d’erreur si possible' },
          { token: '[ce qui devrait se passer]', description: 'le comportement correct attendu' },
        ],
        placement: 'Pour signaler un bug de façon reproductible : sans les étapes, personne ne pourra le corriger.',
      },
    ],
  }),

  // ————— Le Kanban : Trello et Jira —————
  lesson({
    id: 'METH-F-1103-LESSON',
    slug: 'le-kanban-trello-et-jira',
    title: 'Le Kanban : Trello et Jira',
    shortTitle: 'Kanban',
    technology: 'methodology',
    tomeId: 't1b',
    summary:
      'Visualiser le travail sous forme de cartes qui avancent de colonne en colonne, et limiter le nombre de tâches en cours.',
    utility: 'Suivre l’avancement des tâches sur un tableau et comprendre le flux d’une équipe.',
    aliases: ['kanban', 'trello', 'jira', 'tableau', 'board', 'colonne', 'carte', 'wip'],
    keywords: [
      'tableau de taches',
      'colonnes a faire en cours termine',
      'carte a deplacer',
      'limiter le travail en cours',
      'suivi d avancement',
      'trello jira',
    ],
    relatedContentIds: [],
    templateId: 'METH-F-1103-TEMPLATE',
    intro:
      'Le <b>Kanban</b> visualise le travail sous forme de <b>cartes</b> qui traversent des <b>colonnes</b> (À faire → En cours → Terminé). L’idée clé : <b>limiter le nombre de tâches en cours</b> pour finir avant de commencer.',
    sections: [
      {
        id: 's1',
        title: 'Le tableau : colonnes et cartes',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>voir d’un coup d’œil où en est chaque tâche de l’équipe</b> et savoir sur quoi je dois travailler ensuite.',
          },
          {
            type: 'paragraph',
            html: 'Un tableau Kanban a des <b>colonnes</b> qui représentent les étapes du travail, et des <b>cartes</b> (une par tâche) qu’on <b>déplace</b> de gauche à droite au fil de l’avancement.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1103-l-c1',
              filename: 'tableau.txt',
              language: 'text',
              code: `A FAIRE          | EN COURS         | EN RELECTURE   | TERMINE
-----------------|------------------|----------------|-----------
Ecran profil     | Bouton paiement  | Formulaire     | Page login
Export PDF       |                  | de contact     | Page 404
Filtre par prix  |                  |                |

-> chaque carte est une tache ; on la deplace vers la droite
   au fur et a mesure qu'elle avance`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> pense au tableau blanc avec des post-it. Kanban, c’est exactement ça, en version numérique : chaque post-it (carte) glisse de colonne en colonne.',
          },
        ],
      },
      {
        id: 's2',
        title: 'La limite de travail en cours (WIP)',
        blocks: [
          {
            type: 'paragraph',
            html: 'La règle qui rend Kanban efficace : <b>limiter le nombre de cartes en cours</b> (WIP, <i>work in progress</i>). On <b>finit</b> les tâches commencées avant d’en démarrer de nouvelles.',
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> une colonne « En cours » avec une limite de 2 ou 3 cartes force l’équipe à terminer plutôt qu’à tout ouvrir en même temps. « Stop starting, start finishing. »',
          },
        ],
      },
      {
        id: 's3',
        title: 'Trello vs Jira',
        blocks: [
          {
            type: 'paragraph',
            html: 'Deux outils très courants appliquent le Kanban. <b>Trello</b> est simple et visuel ; <b>Jira</b> est plus riche, orienté équipes de dev et Scrum.',
          },
          {
            type: 'table',
            headers: ['Outil', 'Pour qui', 'Points forts'],
            rows: [
              ['Trello', 'petites équipes, projets simples', 'très visuel, prise en main immédiate'],
              ['Jira', 'équipes de dev, Scrum', 'sprints, rapports, workflows avancés'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Vocabulaire Jira :</b> une carte s’appelle un <b>ticket</b> (ou <i>issue</i>), avec un identifiant du type <code>PROJ-142</code> que tu retrouveras dans les branches Git et les messages de commit.',
          },
        ],
      },
    ],
    pitfalls: [
      'Ouvrir 10 tâches « en cours » en même temps : rien n’avance vraiment. Limite le WIP et <b>termine</b> avant d’ouvrir.',
      'Des colonnes qui ne reflètent pas le vrai flux : adapte-les à ton équipe (ex. ajoute « En relecture » si tu fais des revues).',
      'Laisser des cartes sans responsable : chaque carte « en cours » doit avoir une personne assignée.',
      'Confondre Kanban (flux continu, pas de sprint) et Scrum (cadre par sprints) — on peut d’ailleurs combiner les deux.',
    ],
    takeaways: [
      'Kanban = <b>cartes</b> qui traversent des <b>colonnes</b> (À faire → En cours → Terminé)',
      'règle clé : <b>limiter le travail en cours</b> (WIP), finir avant de commencer',
      'Trello = simple et visuel · Jira = riche, orienté dev et Scrum',
      'un ticket Jira (<code>PROJ-142</code>) se retrouve dans tes branches et commits Git',
    ],
  }),
  template({
    id: 'METH-F-1103-TEMPLATE',
    slug: 'le-kanban-trello-et-jira',
    title: 'Kanban',
    shortTitle: 'Kanban',
    technology: 'methodology',
    tomeId: 't1b',
    summary: 'Modèles Kanban prêts à réutiliser : les colonnes du tableau, une carte type, le lien ticket-Git.',
    lede: 'Mettre en place un tableau. Choisis le modèle :',
    aliases: ['kanban', 'trello', 'jira', 'board'],
    keywords: ['colonnes', 'carte', 'ticket'],
    relatedContentIds: [],
    lessonId: 'METH-F-1103-LESSON',
    variants: [
      {
        id: 'colonnes',
        label: 'Colonnes du tableau',
        codeBlocks: [
          {
            id: 'METH-F-1103-t-colonnes',
            filename: 'colonnes.txt',
            language: 'text',
            code: `Colonnes de base (a adapter a ton equipe) :

Backlog     : idees et taches pas encore pretes
A faire     : pretes a etre prises (priorisees en haut)
En cours    : en dev  (limite conseillee : 2-3 cartes)
En relecture: en attente de revue de code
Terminee    : livree / mergee`,
          },
        ],
        replacements: [
          { token: '2-3 cartes', description: 'ta limite de travail en cours (WIP) par personne ou par équipe' },
        ],
        placement: 'La structure de départ d’un tableau Trello ou Jira. Retire ou ajoute des colonnes selon ton flux réel.',
      },
      {
        id: 'carte',
        label: 'Une carte type',
        codeBlocks: [
          {
            id: 'METH-F-1103-t-carte',
            filename: 'carte.txt',
            language: 'text',
            code: `Titre       : Ajouter un filtre par prix
Assignee    : Cynthia
Etiquettes  : frontend, sprint-12
Description :
  En tant que client, je veux filtrer les produits par prix
  afin de trouver ceux dans mon budget.
Checklist   :
  [ ] Champ prix min / prix max
  [ ] Filtrage de la liste
  [ ] Cas "aucun resultat"`,
          },
        ],
        replacements: [
          { token: 'Ajouter un filtre par prix', description: 'le titre court et actionnable de la tâche' },
          { token: 'Cynthia', description: 'la personne responsable de la carte' },
          { token: 'frontend, sprint-12', description: 'tes étiquettes (domaine, sprint, priorité…)' },
        ],
        placement: 'Le contenu utile d’une carte : un titre clair, un responsable, et une checklist des sous-tâches.',
      },
      {
        id: 'lien-git',
        label: 'Lien ticket ↔ Git',
        codeBlocks: [
          {
            id: 'METH-F-1103-t-git',
            filename: 'lien-git.bash',
            language: 'bash',
            code: `# On reprend l'identifiant du ticket (ex. PROJ-142) partout

# Nom de branche : type/TICKET-description
git checkout -b feature/PROJ-142-filtre-prix

# Message de commit : on prefixe par le ticket
git commit -m "PROJ-142: ajoute le filtre par prix"`,
          },
        ],
        replacements: [
          { token: 'PROJ-142', description: 'l’identifiant réel de ton ticket Jira' },
          { token: 'filtre-prix', description: 'un résumé court de la tâche, en minuscules avec des tirets' },
        ],
        placement: 'Pour relier ton code au ticket : Jira retrouve automatiquement les branches et commits qui citent son identifiant.',
      },
    ],
  }),

  // ————— Le terminal et Git Bash : les commandes de base —————
  lesson({
    id: 'METH-F-1104-LESSON',
    slug: 'le-terminal-et-git-bash-les-commandes-de-base',
    title: 'Le terminal et Git Bash : les commandes de base',
    shortTitle: 'Terminal',
    technology: 'methodology',
    tomeId: 't1b',
    summary:
      'Se déplacer dans les dossiers, lister, créer et supprimer des fichiers en ligne de commande, sans passer par la souris.',
    utility: 'Naviguer et manipuler ses fichiers au clavier, la base pour utiliser Git et lancer des projets.',
    aliases: ['terminal', 'git bash', 'ligne de commande', 'cli', 'shell', 'bash', 'console', 'invite de commande'],
    keywords: [
      'se deplacer dans les dossiers',
      'lister les fichiers',
      'creer un dossier',
      'cd ls mkdir',
      'chemin absolu relatif',
      'commande terminal',
    ],
    relatedContentIds: [],
    templateId: 'METH-F-1104-TEMPLATE',
    intro:
      'Le <b>terminal</b> permet de piloter l’ordinateur au <b>clavier</b> plutôt qu’à la souris. Sous Windows, <b>Git Bash</b> offre les mêmes commandes que Mac/Linux. Tu tapes une commande, tu fais <b>Entrée</b>, elle s’exécute.',
    sections: [
      {
        id: 's1',
        title: 'Se repérer et se déplacer',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>ouvrir mon projet dans le terminal</b> : savoir où je suis, voir ce qu’il y a autour, et entrer dans le bon dossier.',
          },
          {
            type: 'paragraph',
            html: 'Trois commandes pour se repérer : <code>pwd</code> (où suis-je ?), <code>ls</code> (qu’y a-t-il ici ?) et <code>cd</code> (aller dans un dossier).',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1104-l-c1',
              filename: 'terminal.bash',
              language: 'bash',
              code: `pwd          # affiche le dossier courant (print working directory)
ls           # liste les fichiers et dossiers ici
ls -la       # liste tout, y compris les fichiers caches (.git...)

cd projets   # entre dans le dossier "projets"
cd ..        # remonte d'un dossier (le dossier parent)
cd ~         # retourne dans ton dossier personnel (home)`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce clavier :</b> tape les premières lettres d’un nom puis appuie sur <b>Tab</b> : le terminal complète tout seul. La flèche <b>Haut</b> rappelle la commande précédente.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Créer, déplacer, supprimer',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les commandes pour agir sur les fichiers : <code>mkdir</code> (créer un dossier), <code>touch</code> (créer un fichier vide), <code>mv</code> (déplacer/renommer), <code>cp</code> (copier), <code>rm</code> (supprimer).',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1104-l-c2',
              filename: 'fichiers.bash',
              language: 'bash',
              code: `mkdir mon-site        # cree un dossier "mon-site"
cd mon-site           # on entre dedans
touch index.html      # cree un fichier vide

mv index.html accueil.html   # renomme le fichier
cp accueil.html sauvegarde.html # copie le fichier

rm sauvegarde.html    # supprime le fichier (ATTENTION : definitif)`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Prudence :</b> <code>rm</code> supprime <b>sans corbeille</b>, la récupération est impossible. <code>rm -r dossier</code> supprime un dossier entier : vérifie toujours où tu es (<code>pwd</code>) avant.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Chemins absolus et relatifs',
        blocks: [
          {
            type: 'paragraph',
            html: 'Un chemin <b>relatif</b> part de là où tu es (<code>./</code>, <code>../</code>). Un chemin <b>absolu</b> part de la racine et marche depuis n’importe où.',
          },
          {
            type: 'table',
            headers: ['Écriture', 'Signifie'],
            rows: [
              ['<code>.</code>', 'le dossier courant'],
              ['<code>..</code>', 'le dossier parent (au-dessus)'],
              ['<code>~</code>', 'ton dossier personnel (home)'],
              ['<code>./src/app.js</code>', 'chemin relatif depuis ici'],
              ['<code>/home/cynthia/projets</code>', 'chemin absolu (depuis la racine)'],
            ],
          },
        ],
      },
      {
        id: 's4',
        title: 'Enchaîner et effacer',
        blocks: [
          {
            type: 'paragraph',
            html: 'Quelques raccourcis du quotidien : enchaîner deux commandes avec <code>&&</code>, et nettoyer l’écran avec <code>clear</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1104-l-c3',
              filename: 'astuces.bash',
              language: 'bash',
              code: `# Enchaine : la 2e commande ne part que si la 1re a reussi
mkdir site && cd site

clear   # efface l'ecran (le contenu reste dans l'historique)

# Stoppe une commande qui tourne (serveur, etc.) : Ctrl + C`,
            },
          },
        ],
      },
    ],
    pitfalls: [
      '<code>rm</code> ne met <b>rien à la corbeille</b> : une fois supprimé, c’est perdu. Relis la commande avant d’appuyer sur Entrée.',
      'Taper une commande dans le mauvais dossier : fais <code>pwd</code> pour vérifier où tu es avant d’agir.',
      'Les <b>espaces</b> dans les noms posent problème : préfère <code>mon-site</code> à <code>mon site</code>, ou mets des guillemets.',
      'Sous Windows, l’invite de commande classique ne connaît pas <code>ls</code> ni <code>touch</code> : utilise <b>Git Bash</b> pour ces commandes.',
    ],
    takeaways: [
      'se repérer : <code>pwd</code> (où) · <code>ls</code> (quoi) · <code>cd</code> (aller)',
      'agir : <code>mkdir</code> · <code>touch</code> · <code>mv</code> · <code>cp</code> · <code>rm</code> (définitif !)',
      'chemins : <code>.</code> ici · <code>..</code> parent · <code>~</code> home',
      '<b>Tab</b> complète · <b>flèche Haut</b> rappelle · <b>Ctrl + C</b> arrête',
    ],
  }),
  template({
    id: 'METH-F-1104-TEMPLATE',
    slug: 'le-terminal-et-git-bash-les-commandes-de-base',
    title: 'Terminal',
    shortTitle: 'Terminal',
    technology: 'methodology',
    tomeId: 't1b',
    summary: 'Les commandes terminal prêtes à copier : se déplacer, gérer les fichiers, démarrer un projet.',
    lede: 'Les commandes du terminal. Choisis la tâche :',
    aliases: ['terminal', 'git bash', 'commandes', 'bash'],
    keywords: ['cd ls', 'mkdir touch', 'navigation'],
    relatedContentIds: [],
    lessonId: 'METH-F-1104-LESSON',
    variants: [
      {
        id: 'naviguer',
        label: 'Se déplacer',
        codeBlocks: [
          {
            id: 'METH-F-1104-t-nav',
            filename: 'naviguer.bash',
            language: 'bash',
            code: `pwd            # ou suis-je ?
ls             # que contient ce dossier ?
cd nom-dossier # entrer dans un dossier
cd ..          # remonter d'un niveau`,
          },
        ],
        replacements: [
          { token: 'nom-dossier', description: 'le nom du dossier où tu veux entrer' },
        ],
        placement: 'Le trio de base pour se repérer et se déplacer avant toute autre action.',
      },
      {
        id: 'fichiers',
        label: 'Gérer les fichiers',
        codeBlocks: [
          {
            id: 'METH-F-1104-t-files',
            filename: 'fichiers.bash',
            language: 'bash',
            code: `mkdir nom-dossier    # creer un dossier
touch fichier.txt    # creer un fichier vide
mv ancien.txt nouveau.txt # renommer ou deplacer
rm fichier.txt       # supprimer (definitif !)`,
          },
        ],
        replacements: [
          { token: 'nom-dossier', description: 'le nom du dossier à créer' },
          { token: 'fichier.txt', description: 'le nom du fichier concerné' },
        ],
        placement: 'Pour créer, renommer et supprimer. Attention : rm ne passe pas par la corbeille.',
      },
      {
        id: 'projet',
        label: 'Démarrer un projet',
        codeBlocks: [
          {
            id: 'METH-F-1104-t-projet',
            filename: 'demarrer.bash',
            language: 'bash',
            code: `mkdir mon-projet && cd mon-projet  # cree le dossier et entre dedans
npm create vite@latest .           # initialise un projet Vite ici
npm install                        # installe les dependances
npm run dev                        # lance le serveur de dev`,
          },
        ],
        replacements: [
          { token: 'mon-projet', description: 'le nom de ton nouveau projet' },
        ],
        placement: 'La séquence type pour créer un projet front et le lancer. Ctrl + C arrête le serveur.',
      },
    ],
  }),

  // ————— VS Code : raccourcis et extensions utiles —————
  lesson({
    id: 'METH-F-1105-LESSON',
    slug: 'vs-code-raccourcis-et-extensions-utiles',
    title: 'VS Code : raccourcis et extensions utiles',
    shortTitle: 'VS Code',
    technology: 'methodology',
    tomeId: 't1b',
    summary:
      'Aller plus vite dans l’éditeur : la palette de commandes, les raccourcis qui font gagner du temps, et les extensions à installer.',
    utility: 'Gagner en vitesse et en confort dans l’éditeur le plus utilisé pour le développement web.',
    aliases: ['vscode', 'vs code', 'editeur', 'raccourci', 'extension', 'palette de commandes', 'prettier'],
    keywords: [
      'raccourci clavier vscode',
      'palette de commandes',
      'formater le code',
      'prettier eslint',
      'multi curseur',
      'terminal integre',
    ],
    relatedContentIds: [],
    templateId: 'METH-F-1105-TEMPLATE',
    intro:
      '<b>VS Code</b> est l’éditeur le plus répandu en dev web. Deux leviers pour aller vite : la <b>palette de commandes</b> (tout piloter au clavier) et quelques <b>raccourcis</b> et <b>extensions</b> bien choisis.',
    sections: [
      {
        id: 's1',
        title: 'La palette de commandes',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>lancer une action de VS Code sans chercher dans les menus</b> : formater, ouvrir un fichier, changer de thème…',
          },
          {
            type: 'paragraph',
            html: 'La <b>palette de commandes</b> donne accès à <b>toutes</b> les actions. On l’ouvre avec <code>Ctrl + Shift + P</code> (<code>Cmd + Shift + P</code> sur Mac), on tape les premières lettres, on valide.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1105-l-c1',
              filename: 'palette.txt',
              language: 'text',
              code: `Ctrl + Shift + P   -> ouvre la palette de commandes

Exemples a taper dedans :
  "Format Document"      -> reformate le fichier
  "Change Language Mode" -> change la coloration (JS, TS...)
  "Toggle Word Wrap"     -> passe le texte a la ligne

Ctrl + P           -> ouvre vite un fichier par son nom`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>Ctrl + Shift + P</code> = <b>toutes les actions</b>. <code>Ctrl + P</code> = <b>ouvrir un fichier</b> par son nom. Ce sont les deux raccourcis à connaître en premier.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les raccourcis qui font gagner du temps',
        blocks: [
          {
            type: 'paragraph',
            html: 'Quelques raccourcis reviennent tout le temps. Ceux-ci sont pour Windows/Linux ; sur Mac, remplace <code>Ctrl</code> par <code>Cmd</code>.',
          },
          {
            type: 'table',
            headers: ['Raccourci', 'Action'],
            rows: [
              ['<code>Ctrl + S</code>', 'enregistrer le fichier'],
              ['<code>Ctrl + /</code>', 'commenter / décommenter la ligne'],
              ['<code>Alt + ↑ / ↓</code>', 'déplacer la ligne vers le haut / bas'],
              ['<code>Shift + Alt + ↓</code>', 'dupliquer la ligne'],
              ['<code>Ctrl + D</code>', 'sélectionner l’occurrence suivante (multi-curseur)'],
              ['<code>Ctrl + `</code>', 'ouvrir / fermer le terminal intégré'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>Ctrl + D</code> répété, c’est comme surligner un mot puis dire « et le même, et le même… » : tu tapes une fois, ça se répercute sur toutes les occurrences sélectionnées.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Les extensions à installer',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les extensions s’installent depuis l’icône <b>Extensions</b> (ou <code>Ctrl + Shift + X</code>). Voici le kit de départ d’une développeuse front.',
          },
          {
            type: 'table',
            headers: ['Extension', 'À quoi ça sert'],
            rows: [
              ['Prettier', 'formate le code automatiquement à l’enregistrement'],
              ['ESLint', 'souligne les erreurs et mauvaises pratiques JS/TS'],
              ['GitLens', 'voit qui a modifié chaque ligne et quand'],
              ['Auto Rename Tag', 'renomme la balise fermante en même temps que l’ouvrante'],
              ['Error Lens', 'affiche les erreurs directement sur la ligne'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Confort n°1 :</b> active <b>Format On Save</b> (dans les réglages) avec Prettier : ton code est reformaté proprement à chaque <code>Ctrl + S</code>, plus besoin d’y penser.',
          },
        ],
      },
    ],
    pitfalls: [
      'Chercher chaque action dans les menus : la <b>palette</b> (<code>Ctrl + Shift + P</code>) est presque toujours plus rapide.',
      'Installer <b>trop</b> d’extensions : elles ralentissent l’éditeur. Garde l’essentiel.',
      'Formater à la main : laisse <b>Prettier</b> + <b>Format On Save</b> s’en charger, c’est cohérent pour toute l’équipe.',
      'Sur Mac, les raccourcis utilisent <code>Cmd</code> et non <code>Ctrl</code> : adapte les combinaisons.',
    ],
    takeaways: [
      '<code>Ctrl + Shift + P</code> = toutes les actions · <code>Ctrl + P</code> = ouvrir un fichier',
      'multi-curseur : <code>Ctrl + D</code> · commenter : <code>Ctrl + /</code> · terminal : <code>Ctrl + `</code>',
      'kit d’extensions : <b>Prettier</b>, <b>ESLint</b>, <b>GitLens</b>, <b>Error Lens</b>',
      'active <b>Format On Save</b> avec Prettier pour un code toujours propre',
    ],
  }),
  template({
    id: 'METH-F-1105-TEMPLATE',
    slug: 'vs-code-raccourcis-et-extensions-utiles',
    title: 'VS Code',
    shortTitle: 'VS Code',
    technology: 'methodology',
    tomeId: 't1b',
    summary: 'Les repères VS Code : raccourcis essentiels, extensions à installer, réglage Format On Save.',
    lede: 'Configurer et piloter VS Code. Choisis la fiche :',
    aliases: ['vscode', 'raccourci', 'extension', 'prettier'],
    keywords: ['raccourcis', 'extensions', 'format on save'],
    relatedContentIds: [],
    lessonId: 'METH-F-1105-LESSON',
    variants: [
      {
        id: 'raccourcis',
        label: 'Raccourcis clés',
        codeBlocks: [
          {
            id: 'METH-F-1105-t-raccourcis',
            filename: 'raccourcis.txt',
            language: 'text',
            code: `Ctrl + Shift + P : palette de commandes (toutes les actions)
Ctrl + P         : ouvrir un fichier par son nom
Ctrl + /         : commenter / decommenter
Ctrl + D         : selectionner l'occurrence suivante
Alt + Haut/Bas   : deplacer la ligne
Ctrl + backtick  : terminal integre

(Sur Mac : remplacer Ctrl par Cmd)`,
          },
        ],
        replacements: [],
        placement: 'Le mémo à garder ouvert les premiers jours, le temps que les raccourcis rentrent dans les doigts.',
      },
      {
        id: 'extensions',
        label: 'Extensions front',
        codeBlocks: [
          {
            id: 'METH-F-1105-t-extensions',
            filename: 'extensions.txt',
            language: 'text',
            code: `A installer (icone Extensions ou Ctrl + Shift + X) :

Prettier          -> formatage automatique
ESLint            -> detecte les erreurs JS/TS
GitLens           -> historique ligne par ligne
Auto Rename Tag   -> balises HTML synchronisees
Error Lens        -> erreurs affichees sur la ligne`,
          },
        ],
        replacements: [],
        placement: 'Le kit de démarrage pour du dev web. Installe-les une fois, ils te suivront sur tous tes projets.',
      },
      {
        id: 'format-on-save',
        label: 'Format On Save',
        codeBlocks: [
          {
            id: 'METH-F-1105-t-fos',
            filename: '.vscode/settings.json',
            language: 'json',
            code: `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}`,
          },
        ],
        replacements: [
          { token: 'esbenp.prettier-vscode', description: 'l’identifiant du formateur (ici Prettier) ; garde-le tel quel' },
        ],
        placement: 'À placer dans .vscode/settings.json à la racine du projet : le code est reformaté à chaque enregistrement.',
      },
    ],
  }),

  // ————— Figma : lire une maquette et exporter des images —————
  lesson({
    id: 'METH-F-1106-LESSON',
    slug: 'figma-lire-une-maquette-et-exporter-des-images',
    title: 'Figma : lire une maquette et exporter des images',
    shortTitle: 'Figma',
    technology: 'methodology',
    tomeId: 't1b',
    summary:
      'Lire une maquette côté développeur : récupérer couleurs, tailles et espacements, puis exporter les images à intégrer.',
    utility: 'Traduire une maquette Figma en code fidèle : bonnes valeurs, bons assets.',
    aliases: ['figma', 'maquette', 'design', 'mockup', 'export', 'inspect', 'dev mode'],
    keywords: [
      'lire une maquette figma',
      'recuperer une couleur',
      'exporter une image',
      'mode dev figma',
      'espacement taille police',
      'inspecter un element',
    ],
    relatedContentIds: [],
    templateId: 'METH-F-1106-TEMPLATE',
    intro:
      '<b>Figma</b> est l’outil de maquettage le plus courant. Côté dev, tu ne dessines pas : tu <b>lis</b> la maquette pour en extraire les valeurs (couleurs, tailles, espacements) et tu <b>exportes</b> les images à intégrer.',
    sections: [
      {
        id: 's1',
        title: 'Inspecter un élément',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>reproduire fidèlement un bouton de la maquette en CSS</b> : sa couleur exacte, sa taille de police, ses arrondis.',
          },
          {
            type: 'paragraph',
            html: 'On <b>sélectionne</b> l’élément (clic, parfois double-clic pour entrer dans un groupe), puis on lit ses propriétés dans le panneau de droite. En <b>mode Dev</b>, Figma affiche même le CSS approximatif.',
          },
          {
            type: 'code',
            block: {
              id: 'METH-F-1106-l-c1',
              filename: 'valeurs-lues.css',
              language: 'css',
              code: `/* Valeurs relevees sur le bouton de la maquette : */
.bouton {
  background: #2563eb;   /* couleur de fond (clic sur la pastille) */
  color: #ffffff;        /* couleur du texte */
  font-size: 16px;       /* taille de police lue a droite */
  padding: 12px 24px;    /* espacements haut/bas et gauche/droite */
  border-radius: 8px;    /* arrondi des coins (corner radius) */
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Astuce couleur :</b> clique sur la <b>pastille de couleur</b> pour récupérer le code <code>#hexadecimal</code> exact — ne devine jamais une couleur à l’œil.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Mesurer les espacements',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour mesurer la distance entre deux éléments : sélectionne le premier, puis <b>survole le second en maintenant <code>Alt</code></b>. Figma affiche l’écart en pixels — indispensable pour des marges fidèles.',
          },
          {
            type: 'table',
            headers: ['Ce que tu cherches', 'Où le lire dans Figma'],
            rows: [
              ['couleur exacte', 'pastille <b>Fill</b> → code hex'],
              ['taille de police', 'panneau <b>Text</b> → font size'],
              ['largeur / hauteur', 'panneau de droite (W et H)'],
              ['espacement entre 2 blocs', 'survol + touche <b>Alt</b>'],
              ['arrondi des coins', 'panneau <b>Corner radius</b>'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Exporter une image',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour récupérer un logo ou une illustration : sélectionne l’élément, puis dans la section <b>Export</b> (en bas à droite), choisis le format et clique sur <b>Export</b>.',
          },
          {
            type: 'table',
            headers: ['Format', 'Quand l’utiliser'],
            rows: [
              ['<b>SVG</b>', 'logos et icônes (vectoriel, net à toute taille)'],
              ['<b>PNG</b>', 'images avec transparence (@2x pour les écrans nets)'],
              ['<b>JPG</b>', 'photos sans transparence (fichier plus léger)'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> pour les icônes et logos, exporte en <b>SVG</b> : il reste net à n’importe quelle taille et pèse peu. Le PNG est pixellisé si on l’agrandit.',
          },
        ],
      },
    ],
    pitfalls: [
      'Deviner une couleur à l’œil : clique sur la pastille pour lire le <code>#hex</code> exact, sinon le rendu diffère de la maquette.',
      'Exporter un logo en <b>PNG</b> : préfère le <b>SVG</b>, net à toute taille et bien plus léger.',
      'Ignorer les <b>espacements</b> : utilise <code>Alt</code> + survol pour des marges fidèles, ne les estime pas.',
      'Oublier le <b>@2x</b> pour les images matricielles : sur écran Retina, une image en taille exacte paraît floue.',
    ],
    takeaways: [
      'côté dev, on <b>lit</b> la maquette, on ne dessine pas',
      'couleur = pastille <b>Fill</b> (code hex exact) · jamais à l’œil',
      'espacement = <code>Alt</code> + survol · taille = panneau de droite',
      'export : <b>SVG</b> pour logos/icônes · <b>PNG</b> (@2x) pour images à transparence',
    ],
  }),
  template({
    id: 'METH-F-1106-TEMPLATE',
    slug: 'figma-lire-une-maquette-et-exporter-des-images',
    title: 'Figma',
    shortTitle: 'Figma',
    technology: 'methodology',
    tomeId: 't1b',
    summary: 'Les repères Figma côté dev : où lire chaque valeur, quel format d’export, du CSS à recopier.',
    lede: 'Traduire une maquette en code. Choisis la fiche :',
    aliases: ['figma', 'maquette', 'export', 'inspect'],
    keywords: ['lire une valeur', 'export svg png', 'espacement'],
    relatedContentIds: [],
    lessonId: 'METH-F-1106-LESSON',
    variants: [
      {
        id: 'ou-lire',
        label: 'Où lire chaque valeur',
        codeBlocks: [
          {
            id: 'METH-F-1106-t-lire',
            filename: 'figma-inspect.txt',
            language: 'text',
            code: `Couleur      -> clic sur la pastille "Fill" -> code #hex
Police       -> panneau "Text" -> font size + font family
Largeur/Haut -> panneau de droite (W et H)
Espacement   -> selectionne un bloc, survole l'autre avec Alt
Arrondi      -> panneau "Corner radius"`,
          },
        ],
        replacements: [],
        placement: 'Le pense-bête des endroits où trouver chaque valeur quand tu inspectes une maquette.',
      },
      {
        id: 'export',
        label: 'Choisir le format',
        codeBlocks: [
          {
            id: 'METH-F-1106-t-export',
            filename: 'figma-export.txt',
            language: 'text',
            code: `SVG : logos et icones (net a toute taille, tres leger)
PNG : images avec transparence -> exporter en @2x pour les
      ecrans haute densite (Retina)
JPG : photos sans transparence (fichier plus leger)

Ou : selectionner l'element -> section "Export" en bas a droite`,
          },
        ],
        replacements: [],
        placement: 'La règle de choix du format au moment d’exporter un asset depuis Figma.',
      },
      {
        id: 'css',
        label: 'Du Figma au CSS',
        codeBlocks: [
          {
            id: 'METH-F-1106-t-css',
            filename: 'element.css',
            language: 'css',
            code: `.element {
  background: #2563eb;
  color: #ffffff;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
}`,
          },
        ],
        replacements: [
          { token: '#2563eb', description: 'la couleur de fond lue sur la pastille Fill' },
          { token: '16px', description: 'la taille de police relevée dans le panneau Text' },
          { token: '12px 24px', description: 'les espacements internes mesurés (haut/bas puis gauche/droite)' },
          { token: '8px', description: 'l’arrondi des coins lu dans Corner radius' },
        ],
        placement: 'Le squelette CSS à remplir avec les valeurs exactes relevées sur la maquette.',
      },
    ],
  }),
];
