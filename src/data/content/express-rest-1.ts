import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const expressRest1Content: ReadyContent[] = [
  // ————— Une route PUT —————
  lesson({
    id: 'EXPRESS-F-1100-LESSON',
    slug: 'une-route-put',
    title: 'Une route PUT',
    shortTitle: 'Route PUT',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Créer une route qui met à jour une ressource existante à partir de son id et des données reçues dans le body.',
    utility: 'Modifier une ressource déjà en base à partir de son identifiant.',
    aliases: ['put', 'update', 'modifier', 'mettre a jour', 'app.put', 'route put'],
    keywords: [
      'modifier une ressource',
      'mettre a jour un utilisateur',
      'app put',
      'params id',
      'body json',
      'edition',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1100-TEMPLATE',
    intro:
      'La méthode <b>PUT</b> sert à <b>modifier</b> une ressource qui existe déjà. On la cible par son <b>id</b> dans l’URL (<code>req.params.id</code>) et on récupère les nouvelles données dans le <b>body</b> (<code>req.body</code>).',
    sections: [
      {
        id: 's1',
        title: 'Le schéma de base',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>modifier le nom d’un utilisateur déjà enregistré</b> en envoyant son nouvel id et son nouveau nom.',
          },
          {
            type: 'paragraph',
            html: 'On déclare la route avec <code>app.put</code>, un <code>:id</code> dans le chemin. On lit l’id via <code>req.params</code>, les nouvelles valeurs via <code>req.body</code>, puis on renvoie la ressource mise à jour.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1100-l-c1',
              filename: 'server.js',
              language: 'javascript',
              code: `// PUT sur /users/:id -> modifie l'utilisateur vise
app.put("/users/:id", (req, res) => {
  // 1. Je recupere l'id depuis l'URL
  const id = Number(req.params.id);

  // 2. Je recupere les nouvelles donnees du body
  const nouveauNom = req.body.nom;

  // 3. Je trouve la ressource concernee
  const user = users.find((u) => u.id === id);

  // 4. Je la modifie
  user.nom = nouveauNom;

  // 5. Je renvoie la version a jour
  res.json(user);
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention REST :</b> <code>PUT /users/:id</code> agit sur <b>une</b> ressource précise. L’id est <b>toujours</b> dans l’URL, jamais dans le body.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Gérer le cas « introuvable »',
        blocks: [
          {
            type: 'paragraph',
            html: 'Si l’id ne correspond à <b>aucune</b> ressource, on répond <code>404</code> au lieu de planter. On teste toujours l’existence <b>avant</b> de modifier.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1100-l-c2',
              filename: 'server.js',
              language: 'javascript',
              code: `app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  // Ressource absente : on repond 404 et on arrete
  if (!user) {
    return res.status(404).json({ erreur: "Utilisateur introuvable" });
  }

  user.nom = req.body.nom;
  res.json(user);
});`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Où le lire', 'Exemple'],
            rows: [
              ['id de la ressource', '<code>req.params.id</code>', 'le <code>:id</code> de l’URL'],
              ['nouvelles données', '<code>req.body</code>', 'le JSON envoyé'],
              ['statut succès', '<code>res.json(...)</code>', '200 par défaut'],
              ['statut absent', '<code>res.status(404)</code>', 'ressource introuvable'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>app.use(express.json())</code> : <code>req.body</code> est <code>undefined</code>, impossible de lire les nouvelles données.',
      'Modifier la ressource <b>avant</b> de vérifier qu’elle existe : plantage si l’id est inconnu. Teste et renvoie <code>404</code> d’abord.',
      'Oublier le <code>return</code> devant <code>res.status(404)...</code> : le code continue et tente de modifier <code>undefined</code>.',
    ],
    takeaways: [
      '<code>app.put("/users/:id", ...)</code> = modifier une ressource ciblée par son id',
      'id dans l’URL (<code>req.params.id</code>) · données dans <code>req.body</code>',
      'toujours vérifier l’existence avant de modifier → sinon <code>404</code>',
      '<code>res.json(user)</code> renvoie la version mise à jour',
    ],
  }),
  template({
    id: 'EXPRESS-F-1100-TEMPLATE',
    slug: 'une-route-put',
    title: 'Route PUT',
    shortTitle: 'Route PUT',
    technology: 'express',
    tomeId: 't12',
    summary: 'La route PUT prête à copier : version simple ou avec vérification 404.',
    lede: 'Modifier une ressource. Choisis la version :',
    aliases: ['put', 'update', 'modifier', 'app.put'],
    keywords: ['mettre a jour', 'params id', 'body'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1100-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1100-t-v1',
        label: 'Simple',
        description: 'Le squelette minimal d’une route PUT.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1100-t-c1',
            filename: 'server.js',
            language: 'javascript',
            code: `app.put("/ressources/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = ressources.find((r) => r.id === id);

  item.nom = req.body.nom;

  res.json(item);
});`,
          },
        ],
        replacements: [
          { token: '/ressources/:id', description: 'le chemin de ta ressource' },
          { token: 'ressources', description: 'ta liste de données (tableau ou modèle)' },
          { token: 'nom', description: 'le ou les champs à mettre à jour' },
        ],
        placement: 'Quand tu es sûr que la ressource existe (prototype, données maîtrisées).',
      },
      {
        id: 'EXPRESS-F-1100-t-v2',
        label: 'Avec 404',
        description: 'La version robuste qui gère l’id inconnu.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1100-t-c2',
            filename: 'server.js',
            language: 'javascript',
            code: `app.put("/ressources/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = ressources.find((r) => r.id === id);

  if (!item) {
    return res.status(404).json({ erreur: "Introuvable" });
  }

  item.nom = req.body.nom;
  res.json(item);
});`,
          },
        ],
        replacements: [
          { token: '/ressources/:id', description: 'le chemin de ta ressource' },
          { token: 'ressources', description: 'ta liste de données' },
          { token: 'nom', description: 'le ou les champs à mettre à jour' },
        ],
        placement: 'La version à utiliser en vrai : elle répond proprement si l’id n’existe pas.',
      },
    ],
  }),

  // ————— Une route DELETE —————
  lesson({
    id: 'EXPRESS-F-1101-LESSON',
    slug: 'une-route-delete',
    title: 'Une route DELETE',
    shortTitle: 'Route DELETE',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Créer une route qui supprime une ressource à partir de son id, puis renvoyer une réponse claire.',
    utility: 'Retirer une ressource de la base à partir de son identifiant.',
    aliases: ['delete', 'supprimer', 'effacer', 'app.delete', 'route delete'],
    keywords: [
      'supprimer une ressource',
      'effacer un utilisateur',
      'app delete',
      'params id',
      'filter',
      'status 204',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1101-TEMPLATE',
    intro:
      'La méthode <b>DELETE</b> supprime une ressource ciblée par son <b>id</b> dans l’URL. Comme il n’y a rien à renvoyer, on répond souvent avec un <b>statut</b> <code>204</code> ou un petit message de confirmation.',
    sections: [
      {
        id: 's1',
        title: 'Supprimer par id',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>supprimer un article de mon blog</b> quand on appelle l’URL avec son id.',
          },
          {
            type: 'paragraph',
            html: 'On lit l’id via <code>req.params</code>, puis on reconstruit la liste <b>sans</b> l’élément visé avec <code>filter</code>. On renvoie ensuite une confirmation.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1101-l-c1',
              filename: 'server.js',
              language: 'javascript',
              code: `// DELETE sur /articles/:id -> supprime l'article vise
app.delete("/articles/:id", (req, res) => {
  // 1. Je recupere l'id depuis l'URL
  const id = Number(req.params.id);

  // 2. Je garde tous les articles SAUF celui-ci
  articles = articles.filter((a) => a.id !== id);

  // 3. Je confirme la suppression
  res.json({ message: "Article supprime" });
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<code>filter</code> renvoie un <b>nouveau tableau</b> qui exclut l’élément supprimé : c’est la façon simple de « retirer » un élément d’une liste en mémoire.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Le statut 204 (pas de contenu)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Quand la suppression réussit et qu’on n’a <b>rien à renvoyer</b>, la convention REST est de répondre <code>204 No Content</code> avec <code>res.status(204).end()</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1101-l-c2',
              filename: 'server.js',
              language: 'javascript',
              code: `app.delete("/articles/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = articles.some((a) => a.id === id);

  // Rien a supprimer : on informe le client
  if (!existe) {
    return res.status(404).json({ erreur: "Article introuvable" });
  }

  articles = articles.filter((a) => a.id !== id);

  // 204 : succes, mais aucun contenu a renvoyer
  res.status(204).end();
});`,
            },
          },
          {
            type: 'table',
            headers: ['Réponse', 'Quand', 'Code'],
            rows: [
              ['confirmation JSON', 'suppression réussie', '<code>res.json({ ... })</code>'],
              ['pas de contenu', 'suppression réussie', '<code>res.status(204).end()</code>'],
              ['introuvable', 'id inconnu', '<code>res.status(404)</code>'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>find</code> au lieu de <code>filter</code> pour supprimer : <code>find</code> ne retire rien, il ne fait que retourner un élément.',
      'Répondre avec <code>res.json(...)</code> après <code>res.status(204)</code> : un 204 ne doit contenir <b>aucun corps</b>. Utilise <code>.end()</code>.',
      'Oublier le cas de l’id inexistant : renvoie <code>404</code> plutôt qu’une fausse confirmation de suppression.',
    ],
    takeaways: [
      '<code>app.delete("/articles/:id", ...)</code> = supprimer une ressource par son id',
      'supprimer d’une liste = <code>filter((x) => x.id !== id)</code> (nouveau tableau)',
      'succès sans contenu → <code>res.status(204).end()</code>',
      'id inconnu → <code>res.status(404)</code>',
    ],
  }),
  template({
    id: 'EXPRESS-F-1101-TEMPLATE',
    slug: 'une-route-delete',
    title: 'Route DELETE',
    shortTitle: 'Route DELETE',
    technology: 'express',
    tomeId: 't12',
    summary: 'La route DELETE prête à copier : confirmation JSON ou 204 No Content.',
    lede: 'Supprimer une ressource. Choisis la réponse :',
    aliases: ['delete', 'supprimer', 'app.delete'],
    keywords: ['filter', 'params id', '204'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1101-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1101-t-v1',
        label: 'Confirmation JSON',
        description: 'Renvoie un message de confirmation.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1101-t-c1',
            filename: 'server.js',
            language: 'javascript',
            code: `app.delete("/ressources/:id", (req, res) => {
  const id = Number(req.params.id);

  ressources = ressources.filter((r) => r.id !== id);

  res.json({ message: "Supprime" });
});`,
          },
        ],
        replacements: [
          { token: '/ressources/:id', description: 'le chemin de ta ressource' },
          { token: 'ressources', description: 'ta liste de données' },
          { token: 'Supprime', description: 'le message de confirmation renvoyé' },
        ],
        placement: 'Quand tu veux confirmer explicitement la suppression côté client.',
      },
      {
        id: 'EXPRESS-F-1101-t-v2',
        label: '204 No Content',
        description: 'Succès sans corps de réponse (convention REST).',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1101-t-c2',
            filename: 'server.js',
            language: 'javascript',
            code: `app.delete("/ressources/:id", (req, res) => {
  const id = Number(req.params.id);

  ressources = ressources.filter((r) => r.id !== id);

  res.status(204).end();
});`,
          },
        ],
        replacements: [
          { token: '/ressources/:id', description: 'le chemin de ta ressource' },
          { token: 'ressources', description: 'ta liste de données' },
        ],
        placement: 'La réponse REST classique : rien à renvoyer, juste un statut de succès.',
      },
    ],
  }),

  // ————— req : la requête —————
  lesson({
    id: 'EXPRESS-F-1102-LESSON',
    slug: 'req-la-requete',
    title: 'req : la requête',
    shortTitle: 'req',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Lire tout ce que le client envoie : les paramètres d’URL, la query string, le body et les headers.',
    utility: 'Récupérer les données envoyées par le client dans une requête.',
    aliases: ['req', 'request', 'requete', 'params', 'query', 'body', 'headers'],
    keywords: [
      'lire les donnees du client',
      'req params',
      'req query',
      'req body',
      'parametre url',
      'query string',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1102-TEMPLATE',
    intro:
      'L’objet <b>req</b> (request) représente la requête reçue. Il contient tout ce que le client envoie : les <b>paramètres d’URL</b> (<code>req.params</code>), la <b>query string</b> (<code>req.query</code>), le <b>corps</b> (<code>req.body</code>) et les <b>en-têtes</b> (<code>req.headers</code>).',
    sections: [
      {
        id: 's1',
        title: 'params, query et body',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher un produit précis, filtré et trié</b> : l’id dans l’URL, l’ordre de tri en query, et les infos dans le body pour une modification.',
          },
          {
            type: 'paragraph',
            html: 'Chaque type de donnée a sa source : <code>req.params</code> pour les segments <code>:variables</code> du chemin, <code>req.query</code> pour ce qui suit le <code>?</code>, <code>req.body</code> pour le JSON envoyé.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1102-l-c1',
              filename: 'server.js',
              language: 'javascript',
              code: `// URL appelee : /produits/42?tri=prix
app.get("/produits/:id", (req, res) => {
  // 1. params : les :variables du chemin -> "42"
  const id = req.params.id;

  // 2. query : ce qui suit le ? -> "prix"
  const tri = req.query.tri;

  // 3. body : le JSON envoye (POST/PUT)
  const donnees = req.body;

  res.json({ id, tri, donnees });
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> <code>req.params</code> et <code>req.query</code> sont <b>toujours des chaînes</b>. Convertis en nombre avec <code>Number(...)</code> quand tu attends un entier.',
          },
        ],
      },
      {
        id: 's2',
        title: 'La query string en détail',
        blocks: [
          {
            type: 'paragraph',
            html: 'La <b>query string</b> sert aux options facultatives : filtres, tri, pagination. Chaque clé après le <code>?</code> devient une propriété de <code>req.query</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1102-l-c2',
              filename: 'server.js',
              language: 'javascript',
              code: `// URL : /articles?categorie=js&page=2
app.get("/articles", (req, res) => {
  // Chaque cle du ? devient une propriete
  const categorie = req.query.categorie; // "js"
  const page = Number(req.query.page);   // 2

  res.json({ categorie, page });
});`,
            },
          },
          {
            type: 'table',
            headers: ['Propriété', 'Contient', 'Vient de'],
            rows: [
              ['<code>req.params</code>', 'les <code>:variables</code>', 'le chemin de l’URL'],
              ['<code>req.query</code>', 'les filtres/options', 'après le <code>?</code>'],
              ['<code>req.body</code>', 'les données envoyées', 'le corps JSON'],
              ['<code>req.headers</code>', 'les métadonnées', 'les en-têtes HTTP'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Traiter <code>req.params.id</code> comme un nombre : c’est une <b>chaîne</b>. Un <code>id === 42</code> échoue, il faut <code>Number(req.params.id)</code>.',
      '<code>req.body</code> vide alors que le client a envoyé du JSON : il manque <code>app.use(express.json())</code>.',
      'Confondre <code>req.query</code> (après le <code>?</code>) et <code>req.params</code> (dans le chemin) : ce ne sont pas les mêmes données.',
    ],
    takeaways: [
      '<code>req.params</code> = les <code>:variables</code> du chemin (toujours des chaînes)',
      '<code>req.query</code> = ce qui suit le <code>?</code> (filtres, tri, pagination)',
      '<code>req.body</code> = le JSON envoyé (nécessite <code>express.json()</code>)',
      'convertis avec <code>Number(...)</code> quand tu attends un entier',
    ],
  }),
  template({
    id: 'EXPRESS-F-1102-TEMPLATE',
    slug: 'req-la-requete',
    title: 'req',
    shortTitle: 'req',
    technology: 'express',
    tomeId: 't12',
    summary: 'Lire les données du client selon leur source : params, query ou body.',
    lede: 'Lire une donnée de la requête. Choisis la source :',
    aliases: ['req', 'params', 'query', 'body'],
    keywords: ['lire donnees', 'parametre', 'filtre'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1102-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1102-t-v1',
        label: 'req.params',
        description: 'Un segment de l’URL (:variable).',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1102-t-c1',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json({ id });
});`,
          },
        ],
        replacements: [
          { token: ':id', description: 'le nom de ton paramètre de chemin' },
          { token: 'id', description: 'la variable qui reçoit la valeur' },
        ],
        placement: 'Pour cibler une ressource précise : /users/42, /articles/7…',
      },
      {
        id: 'EXPRESS-F-1102-t-v2',
        label: 'req.query',
        description: 'Les options après le ?',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1102-t-c2',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/articles", (req, res) => {
  const categorie = req.query.categorie;
  const page = Number(req.query.page);
  res.json({ categorie, page });
});`,
          },
        ],
        replacements: [
          { token: 'categorie', description: 'la clé de query à lire (avant le =)' },
          { token: 'page', description: 'une autre clé de query' },
        ],
        placement: 'Pour les filtres, tri et pagination : /articles?categorie=js&page=2.',
      },
      {
        id: 'EXPRESS-F-1102-t-v3',
        label: 'req.body',
        description: 'Le JSON envoyé dans le corps.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1102-t-c3',
            filename: 'server.js',
            language: 'javascript',
            code: `app.use(express.json());

app.post("/users", (req, res) => {
  const nom = req.body.nom;
  res.json({ nom });
});`,
          },
        ],
        replacements: [
          { token: 'nom', description: 'le champ attendu dans le JSON' },
        ],
        placement: 'Pour les données envoyées en POST/PUT. Nécessite express.json() en amont.',
      },
    ],
  }),

  // ————— res : la réponse —————
  lesson({
    id: 'EXPRESS-F-1103-LESSON',
    slug: 'res-la-reponse',
    title: 'res : la réponse',
    shortTitle: 'res',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Répondre au client : envoyer du JSON, choisir le bon code de statut, ou rediriger.',
    utility: 'Construire et envoyer la réponse au client.',
    aliases: ['res', 'response', 'reponse', 'res.json', 'res.status', 'res.send'],
    keywords: [
      'renvoyer du json',
      'code de statut',
      'res json',
      'res status',
      'res send',
      'repondre au client',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1103-TEMPLATE',
    intro:
      'L’objet <b>res</b> (response) sert à répondre au client. Les méthodes clés : <code>res.json()</code> (envoyer des données), <code>res.status()</code> (choisir le code HTTP) et <code>res.send()</code> (texte brut).',
    sections: [
      {
        id: 's1',
        title: 'json et status',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>renvoyer un utilisateur au format JSON avec le code 201</b> juste après l’avoir créé.',
          },
          {
            type: 'paragraph',
            html: 'On enchaîne <code>res.status(code)</code> puis <code>.json(donnees)</code>. Le <b>statut</b> indique le résultat (200 OK, 201 Créé, 404 Introuvable…), le <b>json</b> transporte les données.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1103-l-c1',
              filename: 'server.js',
              language: 'javascript',
              code: `app.post("/users", (req, res) => {
  const user = { id: 1, nom: req.body.nom };

  // status(201) = "cree", puis json() envoie les donnees
  res.status(201).json(user);
});

app.get("/users/:id", (req, res) => {
  // Sans status explicite, res.json repond 200 par defaut
  res.json({ id: 1, nom: "Alice" });
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Une seule réponse par requête :</b> après un <code>res.json(...)</code>, la requête est terminée. Un second envoi provoque une erreur « headers already sent ».',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les codes de statut courants',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <b>code de statut</b> résume le résultat en un nombre. On les regroupe par familles : 2xx (succès), 4xx (erreur du client), 5xx (erreur serveur).',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1103-l-c2',
              filename: 'server.js',
              language: 'javascript',
              code: `// Succes
res.status(200).json(donnees);         // OK
res.status(201).json(nouvelElement);   // cree
res.status(204).end();                 // ok, aucun contenu

// Erreurs client
res.status(400).json({ erreur: "Requete invalide" });
res.status(404).json({ erreur: "Introuvable" });`,
            },
          },
          {
            type: 'table',
            headers: ['Code', 'Signifie', 'Quand'],
            rows: [
              ['<code>200</code>', 'OK', 'lecture ou mise à jour réussie'],
              ['<code>201</code>', 'Créé', 'après un POST réussi'],
              ['<code>204</code>', 'Pas de contenu', 'suppression réussie'],
              ['<code>400</code>', 'Requête invalide', 'données manquantes/mauvaises'],
              ['<code>404</code>', 'Introuvable', 'ressource inexistante'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Envoyer <b>deux réponses</b> pour une requête : après <code>res.json(...)</code>, ne renvoie plus rien. Pense au <code>return</code>.',
      'Utiliser <code>res.send(objet)</code> quand tu veux du JSON propre : préfère <code>res.json(objet)</code>, qui pose aussi le bon en-tête.',
      'Oublier le code d’erreur : renvoyer <code>200</code> avec un message d’erreur trompe le client. Choisis <code>400</code>/<code>404</code>.',
    ],
    takeaways: [
      '<code>res.json(donnees)</code> = envoyer du JSON (200 par défaut)',
      '<code>res.status(code)</code> se chaîne : <code>res.status(201).json(...)</code>',
      'une <b>seule</b> réponse par requête (sinon « headers already sent »)',
      'codes clés : 200 OK · 201 Créé · 204 Vide · 400/404 erreurs client',
    ],
  }),
  template({
    id: 'EXPRESS-F-1103-TEMPLATE',
    slug: 'res-la-reponse',
    title: 'res',
    shortTitle: 'res',
    technology: 'express',
    tomeId: 't12',
    summary: 'Répondre au client : JSON, statut personnalisé ou redirection.',
    lede: 'Envoyer une réponse. Choisis le cas :',
    aliases: ['res', 'res.json', 'res.status', 'redirect'],
    keywords: ['json', 'statut', 'rediriger'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1103-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1103-t-v1',
        label: 'JSON',
        description: 'Envoyer des données (200 par défaut).',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1103-t-c1',
            filename: 'server.js',
            language: 'javascript',
            code: `res.json({ id: 1, nom: "Alice" });`,
          },
        ],
        replacements: [
          { token: '{ id: 1, nom: "Alice" }', description: 'les données à renvoyer' },
        ],
        placement: 'Le cas le plus courant : renvoyer un objet ou un tableau en JSON.',
      },
      {
        id: 'EXPRESS-F-1103-t-v2',
        label: 'Statut + JSON',
        description: 'Choisir explicitement le code HTTP.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1103-t-c2',
            filename: 'server.js',
            language: 'javascript',
            code: `res.status(201).json({ id: 1, nom: "Alice" });`,
          },
        ],
        replacements: [
          { token: '201', description: 'le code HTTP (201 créé, 400 invalide, 404 introuvable…)' },
          { token: '{ id: 1, nom: "Alice" }', description: 'les données ou le message renvoyé' },
        ],
        placement: 'Quand le code par défaut (200) ne convient pas : création, erreur…',
      },
      {
        id: 'EXPRESS-F-1103-t-v3',
        label: 'Redirection',
        description: 'Renvoyer le client vers une autre URL.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1103-t-c3',
            filename: 'server.js',
            language: 'javascript',
            code: `res.redirect("/connexion");`,
          },
        ],
        replacements: [
          { token: '/connexion', description: 'l’URL de destination' },
        ],
        placement: 'Pour rediriger après une action (connexion, formulaire envoyé…).',
      },
    ],
  }),

  // ————— Le Router Express —————
  lesson({
    id: 'EXPRESS-F-1104-LESSON',
    slug: 'le-router-express',
    title: 'Le Router Express',
    shortTitle: 'Router',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Découper les routes en fichiers séparés avec express.Router, puis les brancher sur l’app.',
    utility: 'Organiser les routes par thème dans des fichiers dédiés.',
    aliases: ['router', 'express.router', 'routes', 'organiser', 'modulariser'],
    keywords: [
      'organiser les routes',
      'separer les fichiers',
      'express router',
      'app use router',
      'prefixe url',
      'modulaire',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1104-TEMPLATE',
    intro:
      'Le <b>Router</b> est un mini-serveur qui regroupe des routes liées (ex. tout <code>/users</code>). On le crée avec <code>express.Router()</code> dans un fichier séparé, puis on le <b>branche</b> sur l’app avec <code>app.use</code>.',
    sections: [
      {
        id: 's1',
        title: 'Créer et brancher un Router',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>sortir toutes mes routes utilisateurs dans leur propre fichier</b>, pour ne pas tout entasser dans <code>server.js</code>.',
          },
          {
            type: 'paragraph',
            html: 'Dans un fichier dédié, on crée un <code>router</code>, on y déclare les routes, on l’<b>exporte</b>. Dans <code>server.js</code>, on le branche avec un <b>préfixe</b> commun.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1104-l-c1',
              filename: 'routes/users.js',
              language: 'javascript',
              code: `import express from "express";

// 1. Je cree un routeur isole
const router = express.Router();

// 2. Les chemins sont RELATIFS au prefixe
router.get("/", (req, res) => {
  res.json({ message: "Liste des users" });
});

router.get("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

// 3. J'exporte le routeur
export default router;`,
            },
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1104-l-c2',
              filename: 'server.js',
              language: 'javascript',
              code: `import express from "express";
import usersRouter from "./routes/users.js";

const app = express();
app.use(express.json());

// Je branche le routeur sous le prefixe /users
// -> router.get("/") repond sur /users
// -> router.get("/:id") repond sur /users/:id
app.use("/users", usersRouter);

app.listen(3000);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Clé à comprendre :</b> dans le routeur, les chemins sont <b>relatifs</b> au préfixe. <code>router.get("/")</code> branché sous <code>/users</code> répond sur <code>/users</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Pourquoi découper',
        blocks: [
          {
            type: 'paragraph',
            html: 'Chaque ressource a son fichier de routes (<code>users.js</code>, <code>articles.js</code>…). Le <code>server.js</code> reste court : il ne fait que <b>brancher</b> les routeurs.',
          },
          {
            type: 'table',
            headers: ['Sans Router', 'Avec Router'],
            rows: [
              ['tout dans <code>server.js</code>', 'un fichier par ressource'],
              ['fichier géant', '<code>server.js</code> court et clair'],
              ['préfixes répétés', 'préfixe défini une fois dans <code>app.use</code>'],
              ['difficile à naviguer', 'chaque thème isolé'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Répéter le préfixe dans le routeur : <code>router.get("/users/:id")</code> branché sous <code>/users</code> répond sur <code>/users/users/:id</code>. Écris juste <code>"/:id"</code>.',
      'Oublier <code>export default router</code> : l’import côté <code>server.js</code> reçoit <code>undefined</code>.',
      'Brancher le routeur <b>après</b> <code>app.listen</code> : place les <code>app.use</code> avant l’écoute.',
    ],
    takeaways: [
      '<code>const router = express.Router()</code> = un groupe de routes isolé',
      'dans le routeur, les chemins sont <b>relatifs</b> au préfixe',
      'on branche avec <code>app.use("/users", usersRouter)</code>',
      'un fichier de routes par ressource → <code>server.js</code> court',
    ],
  }),
  template({
    id: 'EXPRESS-F-1104-TEMPLATE',
    slug: 'le-router-express',
    title: 'Router Express',
    shortTitle: 'Router',
    technology: 'express',
    tomeId: 't12',
    summary: 'Découper les routes avec express.Router : le fichier de routes et le branchement.',
    lede: 'Organiser tes routes. Choisis la partie :',
    aliases: ['router', 'express.router', 'routes'],
    keywords: ['organiser', 'prefixe', 'app use'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1104-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1104-t-v1',
        label: 'Fichier de routes',
        description: 'Le routeur exporté depuis son fichier.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1104-t-c1',
            filename: 'routes/ressource.js',
            language: 'javascript',
            code: `import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Liste" });
});

router.get("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

export default router;`,
          },
        ],
        replacements: [
          { token: 'ressource', description: 'le nom de ta ressource (users, articles…)' },
          { token: '/:id', description: 'les chemins relatifs au préfixe' },
        ],
        placement: 'Dans un dossier routes/ : un fichier par ressource. Chemins relatifs au préfixe.',
      },
      {
        id: 'EXPRESS-F-1104-t-v2',
        label: 'Branchement',
        description: 'Le montage du routeur sur l’app.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1104-t-c2',
            filename: 'server.js',
            language: 'javascript',
            code: `import express from "express";
import ressourceRouter from "./routes/ressource.js";

const app = express();
app.use(express.json());

app.use("/ressources", ressourceRouter);

app.listen(3000);`,
          },
        ],
        replacements: [
          { token: '/ressources', description: 'le préfixe commun à toutes les routes du routeur' },
          { token: 'ressourceRouter', description: 'le routeur importé' },
        ],
        placement: 'Dans server.js : un app.use par routeur, avant app.listen.',
      },
    ],
  }),

  // ————— Un middleware —————
  lesson({
    id: 'EXPRESS-F-1105-LESSON',
    slug: 'un-middleware',
    title: 'Un middleware',
    shortTitle: 'Middleware',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Insérer une fonction qui s’exécute entre la requête et la réponse : log, vérification, préparation.',
    utility: 'Exécuter du code commun avant d’atteindre les routes.',
    aliases: ['middleware', 'next', 'app.use', 'intercepteur', 'chaine'],
    keywords: [
      'code avant la route',
      'middleware express',
      'fonction next',
      'app use',
      'verifier avant',
      'logger les requetes',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1105-TEMPLATE',
    intro:
      'Un <b>middleware</b> est une fonction qui s’exécute <b>entre</b> la requête et la réponse. Elle reçoit <code>(req, res, next)</code> et appelle <code>next()</code> pour passer au maillon suivant de la chaîne.',
    sections: [
      {
        id: 's1',
        title: 'La signature (req, res, next)',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>afficher dans la console chaque requête reçue</b> (méthode + URL), avant qu’elle n’atteigne mes routes.',
          },
          {
            type: 'paragraph',
            html: 'Un middleware reçoit trois arguments. Il fait son travail, puis appelle <code>next()</code> pour passer la main. Sans <code>next()</code>, la requête reste <b>bloquée</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1105-l-c1',
              filename: 'server.js',
              language: 'javascript',
              code: `// Un middleware = fonction (req, res, next)
const logger = (req, res, next) => {
  // 1. Je fais mon travail (ici : afficher la requete)
  console.log(req.method, req.url);

  // 2. Je passe au maillon suivant
  next();
};

// app.use applique le middleware a TOUTES les routes
app.use(logger);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle vitale :</b> un middleware doit <b>toujours</b> soit appeler <code>next()</code>, soit envoyer une réponse. Sinon la requête reste suspendue pour toujours.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Middleware global ou ciblé',
        blocks: [
          {
            type: 'paragraph',
            html: 'Avec <code>app.use(fn)</code>, le middleware s’applique à <b>toutes</b> les routes. Passé <b>en 2ᵉ argument</b> d’une route, il ne protège que <b>cette</b> route.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1105-l-c2',
              filename: 'server.js',
              language: 'javascript',
              code: `// Middleware qui verifie un mot de passe fictif
const verifierAcces = (req, res, next) => {
  if (req.headers.authorization !== "secret") {
    // Pas de next() : on coupe la chaine ici
    return res.status(401).json({ erreur: "Non autorise" });
  }
  next(); // acces valide : on continue
};

// Cible : uniquement cette route est protegee
app.get("/admin", verifierAcces, (req, res) => {
  res.json({ message: "Zone admin" });
});`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Portée', 'Usage'],
            rows: [
              ['<code>app.use(fn)</code>', 'toutes les routes', 'log, CORS, JSON'],
              ['<code>app.get(path, fn, handler)</code>', 'une seule route', 'protéger une route'],
              ['<code>next()</code>', '—', 'passer au suivant'],
              ['<code>res.status(...).json(...)</code>', '—', 'couper la chaîne'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>next()</code> : la requête reste <b>bloquée</b>, le client attend indéfiniment.',
      'Appeler <code>next()</code> <b>après</b> avoir déjà envoyé une réponse : provoque une erreur « headers already sent ».',
      'Placer un middleware <b>après</b> les routes qu’il doit couvrir : l’ordre compte, déclare-le avant.',
    ],
    takeaways: [
      'un middleware = fonction <code>(req, res, next)</code>',
      'toujours appeler <code>next()</code> <b>ou</b> envoyer une réponse',
      '<code>app.use(fn)</code> = global · <code>app.get(path, fn, handler)</code> = ciblé',
      'l’<b>ordre</b> de déclaration détermine l’ordre d’exécution',
    ],
  }),
  template({
    id: 'EXPRESS-F-1105-TEMPLATE',
    slug: 'un-middleware',
    title: 'Middleware',
    shortTitle: 'Middleware',
    technology: 'express',
    tomeId: 't12',
    summary: 'Un middleware Express : global (app.use) ou ciblé sur une route.',
    lede: 'Insérer un middleware. Choisis la portée :',
    aliases: ['middleware', 'next', 'app.use'],
    keywords: ['logger', 'verifier', 'next'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1105-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1105-t-v1',
        label: 'Global (app.use)',
        description: 'S’applique à toutes les routes.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1105-t-c1',
            filename: 'server.js',
            language: 'javascript',
            code: `const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

app.use(logger);`,
          },
        ],
        replacements: [
          { token: 'logger', description: 'le nom de ton middleware' },
          { token: 'console.log(req.method, req.url)', description: 'le travail à faire sur chaque requête' },
        ],
        placement: 'À déclarer avant les routes. Idéal pour log, CORS, parsing.',
      },
      {
        id: 'EXPRESS-F-1105-t-v2',
        label: 'Ciblé (une route)',
        description: 'En 2ᵉ argument d’une route.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1105-t-c2',
            filename: 'server.js',
            language: 'javascript',
            code: `const verifierAcces = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ erreur: "Non autorise" });
  }
  next();
};

app.get("/admin", verifierAcces, (req, res) => {
  res.json({ message: "Zone admin" });
});`,
          },
        ],
        replacements: [
          { token: 'verifierAcces', description: 'ton middleware de vérification' },
          { token: '/admin', description: 'la route à protéger' },
        ],
        placement: 'Quand seule une route doit passer par le middleware (protection, contrôle).',
      },
    ],
  }),

  // ————— Gérer les erreurs (Express) —————
  lesson({
    id: 'EXPRESS-F-1106-LESSON',
    slug: 'gerer-les-erreurs-express',
    title: 'Gérer les erreurs (Express)',
    shortTitle: 'Erreurs',
    technology: 'express',
    tomeId: 't12',
    summary:
      'Centraliser la gestion des erreurs avec un middleware à 4 arguments, et déclencher une erreur avec next(err).',
    utility: 'Attraper toutes les erreurs au même endroit et répondre proprement.',
    aliases: ['erreur', 'error handler', 'next err', 'try catch', 'middleware erreur', '500'],
    keywords: [
      'gerer les erreurs',
      'middleware erreur',
      'next err',
      'error handler',
      'try catch express',
      'statut 500',
    ],
    relatedContentIds: [],
    templateId: 'EXPRESS-F-1106-TEMPLATE',
    intro:
      'Express repère un <b>middleware d’erreur</b> à sa signature à <b>4 arguments</b> : <code>(err, req, res, next)</code>. On y déclenche les erreurs avec <code>next(err)</code>, et il centralise la réponse à envoyer au client.',
    sections: [
      {
        id: 's1',
        title: 'Le middleware d’erreur (4 arguments)',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>éviter que mon serveur crashe</b> quand une route plante, et renvoyer un message d’erreur propre à la place.',
          },
          {
            type: 'paragraph',
            html: 'Un middleware d’erreur se reconnaît à ses <b>4 paramètres</b> (le premier étant <code>err</code>). On le place <b>en dernier</b>, après toutes les routes.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1106-l-c1',
              filename: 'server.js',
              language: 'javascript',
              code: `// Middleware d'erreur : 4 arguments, err en premier
// A placer APRES toutes les routes
app.use((err, req, res, next) => {
  // 1. Je trace l'erreur cote serveur
  console.error(err.message);

  // 2. Je reponds proprement au client
  res.status(500).json({ erreur: "Erreur serveur" });
});`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Signature magique :</b> c’est le fait d’avoir <b>4 paramètres</b> qui dit à Express « ceci est un gestionnaire d’erreurs ». Ne l’oublie jamais, même si <code>next</code> n’est pas utilisé.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Déclencher une erreur avec next(err)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dans une route, on n’envoie pas l’erreur soi-même : on la <b>passe</b> avec <code>next(err)</code>. Express saute alors directement au middleware d’erreur.',
          },
          {
            type: 'code',
            block: {
              id: 'EXPRESS-F-1106-l-c2',
              filename: 'server.js',
              language: 'javascript',
              code: `app.get("/users/:id", (req, res, next) => {
  try {
    const user = trouverUser(req.params.id);

    if (!user) {
      // On cree une erreur et on la transmet
      const err = new Error("Utilisateur introuvable");
      err.status = 404;
      return next(err); // saut vers le middleware d'erreur
    }

    res.json(user);
  } catch (e) {
    next(e); // toute erreur inattendue part au handler
  }
});`,
            },
          },
          {
            type: 'table',
            headers: ['Élément', 'Rôle'],
            rows: [
              ['<code>next(err)</code>', 'envoie l’erreur au handler'],
              ['<code>(err, req, res, next)</code>', 'le handler d’erreur (4 args)'],
              ['<code>err.status</code>', 'code HTTP choisi (404, 400…)'],
              ['<code>res.status(500)</code>', 'repli si aucun statut'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier le 4ᵉ paramètre <code>next</code> : avec seulement <code>(err, req, res)</code>, Express ne reconnaît <b>pas</b> le middleware comme gestionnaire d’erreurs.',
      'Placer le handler d’erreur <b>avant</b> les routes : il doit être déclaré <b>en dernier</b>, sinon il n’attrape rien.',
      'Gérer une erreur async sans <code>try/catch</code> + <code>next(e)</code> : l’erreur file en dehors d’Express et peut crasher le serveur.',
    ],
    takeaways: [
      'handler d’erreur = middleware à <b>4 arguments</b> <code>(err, req, res, next)</code>',
      'à placer <b>en dernier</b>, après toutes les routes',
      'déclencher une erreur = <code>next(err)</code> (pas un <code>res</code> direct)',
      'attache <code>err.status</code> pour choisir le code, sinon <code>500</code>',
    ],
  }),
  template({
    id: 'EXPRESS-F-1106-TEMPLATE',
    slug: 'gerer-les-erreurs-express',
    title: 'Gestion des erreurs',
    shortTitle: 'Erreurs',
    technology: 'express',
    tomeId: 't12',
    summary: 'Gérer les erreurs Express : le handler central et le déclenchement via next(err).',
    lede: 'Gérer les erreurs. Choisis la partie :',
    aliases: ['erreur', 'error handler', 'next err'],
    keywords: ['middleware erreur', 'try catch', '500'],
    relatedContentIds: [],
    lessonId: 'EXPRESS-F-1106-LESSON',
    variants: [
      {
        id: 'EXPRESS-F-1106-t-v1',
        label: 'Handler central',
        description: 'Le middleware d’erreur à placer en dernier.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1106-t-c1',
            filename: 'server.js',
            language: 'javascript',
            code: `// A placer APRES toutes les routes
app.use((err, req, res, next) => {
  console.error(err.message);
  const code = err.status || 500;
  res.status(code).json({ erreur: err.message });
});`,
          },
        ],
        replacements: [
          { token: 'err.message', description: 'le message renvoyé au client (adapte-le)' },
          { token: '500', description: 'le code de repli si err.status est absent' },
        ],
        placement: 'Tout en bas du fichier, juste avant app.listen. Attrape toutes les erreurs.',
      },
      {
        id: 'EXPRESS-F-1106-t-v2',
        label: 'Déclencher (next)',
        description: 'Passer une erreur depuis une route.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1106-t-c2',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/users/:id", (req, res, next) => {
  const user = trouverUser(req.params.id);

  if (!user) {
    const err = new Error("Introuvable");
    err.status = 404;
    return next(err);
  }

  res.json(user);
});`,
          },
        ],
        replacements: [
          { token: 'Introuvable', description: 'le message de l’erreur' },
          { token: '404', description: 'le code HTTP associé à cette erreur' },
        ],
        placement: 'Dans une route : crée l’erreur, fixe son status, passe-la avec next(err).',
      },
      {
        id: 'EXPRESS-F-1106-t-v3',
        label: 'try / catch async',
        description: 'Capturer une erreur asynchrone.',
        codeBlocks: [
          {
            id: 'EXPRESS-F-1106-t-c3',
            filename: 'server.js',
            language: 'javascript',
            code: `app.get("/data", async (req, res, next) => {
  try {
    const data = await chargerData();
    res.json(data);
  } catch (e) {
    next(e); // l'erreur part au handler central
  }
});`,
          },
        ],
        replacements: [
          { token: 'chargerData()', description: 'ton appel asynchrone (base de données, fetch…)' },
        ],
        placement: 'Pour toute route async : entoure le code de try/catch et fais next(e).',
      },
    ],
  }),
];
