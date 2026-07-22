import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const databaseContent: ReadyContent[] = [
  // ————— MCD : modèle conceptuel —————
  lesson({
    id: 'DB-F-1100-LESSON',
    slug: 'mcd-modele-conceptuel',
    title: 'MCD : modèle conceptuel',
    shortTitle: 'MCD',
    technology: 'database',
    tomeId: 't14',
    summary:
      'Dessiner ta base « sur le papier » avant de coder : les entités, leurs propriétés et les liens entre elles, sans encore parler de SQL.',
    utility:
      'Poser à plat les données de ton projet et leurs relations, avant de créer la moindre table.',
    aliases: ['mcd', 'modele conceptuel', 'entite association', 'merise', 'schema conceptuel', 'entite'],
    keywords: [
      'penser la base avant de coder',
      'entite',
      'propriete',
      'association',
      'identifiant',
      'merise',
      'schema sur papier',
    ],
    relatedContentIds: [],
    templateId: 'DB-F-1100-TEMPLATE',
    intro:
      'Le <b>MCD</b> (Modèle Conceptuel de Données) est le <b>plan de ta base dessiné sur le papier</b>. On y liste les <b>entités</b> (les « choses » : un Client, une Commande), leurs <b>propriétés</b>, et les <b>associations</b> qui les relient. À ce stade, <b>zéro SQL</b> : on réfléchit au métier, pas à la technique.',
    sections: [
      {
        id: 's1',
        title: 'C’est quoi une entité ?',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>modéliser une boutique en ligne</b> : il y a des clients, des produits et des commandes. Par où commencer avant de créer les tables ?',
          },
          {
            type: 'paragraph',
            html: 'On commence par repérer les <b>entités</b> : les « choses » importantes du projet. Une entité a un <b>nom</b>, un <b>identifiant</b> (souligné) et des <b>propriétés</b>. On ne parle pas encore de types SQL.',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1100-l-c1',
              filename: 'mcd-entites.txt',
              language: 'text',
              code: `CLIENT                 PRODUIT
+------------------+   +------------------+
| id_client (id)   |   | id_produit (id)  |   <- l identifiant est souligne
| nom              |   | nom              |
| email            |   | prix             |
| ville            |   | stock            |
+------------------+   +------------------+

// Chaque entite = une "chose" du metier.
// Ses proprietes = les infos qu on veut retenir.`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> une entité, c’est une <b>fiche cartonnée</b> par type d’objet. Une fiche « Client », une fiche « Produit ». On ne remplit pas encore les fiches, on décide juste quelles cases elles auront.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Relier les entités : les associations',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une <b>association</b> est le <b>verbe</b> entre deux entités : un client <b>passe</b> une commande, une commande <b>contient</b> des produits. On la dessine dans un ovale entre les entités.',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1100-l-c2',
              filename: 'mcd-associations.txt',
              language: 'text',
              code: `CLIENT ---( passe )--- COMMANDE ---( contient )--- PRODUIT

// "passe" et "contient" sont les associations (les verbes).
// Une association peut porter ses propres proprietes :
//   ( contient ) --> quantite`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> une entité se nomme au <b>singulier</b> (<code>CLIENT</code>, pas <code>CLIENTS</code>). L’association se nomme avec un <b>verbe</b> à l’infinitif ou au présent (<code>passer</code>, <code>contient</code>).',
          },
        ],
      },
      {
        id: 's3',
        title: 'Choisir un bon identifiant',
        blocks: [
          {
            type: 'paragraph',
            html: 'Chaque entité doit avoir un <b>identifiant</b> : une propriété (ou un ensemble) qui rend chaque fiche <b>unique</b>. En pratique on ajoute presque toujours un <code>id</code> technique.',
          },
          {
            type: 'table',
            headers: ['Identifiant possible', 'Bon choix ?', 'Pourquoi'],
            rows: [
              ['id_client (numéro auto)', 'Oui', 'toujours unique, ne change jamais'],
              ['email', 'Bof', 'unique mais peut changer'],
              ['nom + prénom', 'Non', 'deux clients peuvent avoir le même'],
            ],
          },
        ],
      },
      {
        id: 's4',
        title: 'Du MCD vers la suite',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le MCD reste <b>abstrait</b> : pas de clés étrangères, pas de types. C’est une étape de <b>réflexion</b>. L’étape suivante, le <b>MLD</b>, traduit ce schéma en tables prêtes pour SQL.',
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le MCD est le <b>croquis de l’architecte</b> ; le MLD sera le <b>plan technique</b> du maçon. On ne coule pas les fondations sur un croquis.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre des clés étrangères dans le MCD : <b>non</b>, les clés étrangères apparaissent seulement au MLD.',
      'Nommer une entité au pluriel (<code>COMMANDES</code>) : par convention, l’entité est au <b>singulier</b>.',
      'Oublier l’identifiant d’une entité : chaque entité doit être <b>identifiable de façon unique</b>.',
      'Confondre propriété et entité : si une « propriété » a elle-même plusieurs infos, c’est sûrement une <b>entité</b> à part.',
    ],
    takeaways: [
      '<b>MCD</b> = le plan de la base sur le papier · aucune notion de SQL',
      '<b>entité</b> = une « chose » du métier (au singulier) avec ses propriétés',
      'chaque entité a un <b>identifiant</b> unique (souligné)',
      '<b>association</b> = le verbe qui relie deux entités (<code>passe</code>, <code>contient</code>)',
      'le MCD précède le <b>MLD</b> : on réfléchit d’abord, on traduit en tables ensuite',
    ],
  }),
  template({
    id: 'DB-F-1100-TEMPLATE',
    slug: 'mcd-modele-conceptuel',
    title: 'MCD : modèle conceptuel',
    shortTitle: 'MCD',
    technology: 'database',
    tomeId: 't14',
    summary: 'Des gabarits de MCD à recopier : une entité seule, deux entités reliées par une association.',
    lede: 'Le squelette de ton MCD prêt à recopier. Choisis ton cas :',
    aliases: ['mcd', 'modele conceptuel', 'entite association', 'schema conceptuel'],
    keywords: ['entite', 'association', 'identifiant', 'propriete', 'merise'],
    relatedContentIds: [],
    lessonId: 'DB-F-1100-LESSON',
    variants: [
      {
        id: 'DB-F-1100-t-v1',
        label: 'Une entité',
        description: 'Le gabarit d’une seule entité avec son identifiant et ses propriétés.',
        codeBlocks: [
          {
            id: 'DB-F-1100-t-v1-c1',
            filename: 'entite.txt',
            language: 'text',
            code: `ENTITE
+---------------------+
| id_entite (id)      |   <- identifiant, souligne
| propriete_1         |
| propriete_2         |
+---------------------+`,
          },
        ],
        replacements: [
          { token: 'ENTITE', description: 'le nom de ta « chose » au singulier (CLIENT, PRODUIT…)' },
          { token: 'id_entite', description: 'l’identifiant unique de l’entité' },
          { token: 'propriete_1', description: 'une info à retenir (nom, email, prix…)' },
        ],
        placement: 'Sur ton brouillon de MCD. Une boîte par entité repérée dans ton projet.',
      },
      {
        id: 'DB-F-1100-t-v2',
        label: 'Deux entités reliées',
        description: 'Deux entités et l’association (le verbe) qui les relie.',
        codeBlocks: [
          {
            id: 'DB-F-1100-t-v2-c1',
            filename: 'association.txt',
            language: 'text',
            code: `ENTITE_A ---( verbe )--- ENTITE_B

// Exemple concret :
CLIENT ---( passe )--- COMMANDE`,
          },
        ],
        replacements: [
          { token: 'ENTITE_A', description: 'la première entité' },
          { token: 'verbe', description: 'l’association qui relie (passer, contenir, réserver…)' },
          { token: 'ENTITE_B', description: 'la seconde entité' },
        ],
        placement: 'Entre deux boîtes de ton MCD. On précisera les cardinalités dans une autre fiche.',
      },
    ],
  }),

  // ————— MLD : modèle logique —————
  lesson({
    id: 'DB-F-1101-LESSON',
    slug: 'mld-modele-logique',
    title: 'MLD : modèle logique',
    shortTitle: 'MLD',
    technology: 'database',
    tomeId: 't14',
    summary:
      'Traduire ton MCD en tables prêtes pour SQL : clés primaires, clés étrangères et types de données.',
    utility:
      'Transformer un schéma conceptuel abstrait en tables concrètes, avec leurs clés, avant d’écrire le CREATE TABLE.',
    aliases: ['mld', 'modele logique', 'cle primaire', 'cle etrangere', 'schema relationnel', 'foreign key'],
    keywords: [
      'traduire mcd en tables',
      'cle primaire',
      'cle etrangere',
      'primary key',
      'foreign key',
      'schema relationnel',
      'passage mcd mld',
    ],
    relatedContentIds: [],
    templateId: 'DB-F-1101-TEMPLATE',
    intro:
      'Le <b>MLD</b> (Modèle Logique de Données) traduit le MCD en <b>tables</b>. C’est ici qu’apparaissent la <b>clé primaire</b> (<code>PK</code>, l’identifiant de la ligne) et la <b>clé étrangère</b> (<code>FK</code>, la référence vers une autre table). On est à <b>un pas du SQL</b>.',
    sections: [
      {
        id: 's1',
        title: 'La règle de traduction',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>transformer mon MCD Client / Commande</b> en vraies tables, avec les liens qui permettront de retrouver « quel client a passé quelle commande ».',
          },
          {
            type: 'paragraph',
            html: 'Règle de base : <b>chaque entité devient une table</b>. Son identifiant devient la <b>clé primaire</b> (<code>PK</code>). Le lien se matérialise par une <b>clé étrangère</b> (<code>FK</code>) placée du côté « plusieurs ».',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1101-l-c1',
              filename: 'mld.txt',
              language: 'text',
              code: `Client (id_client PK, nom, email, ville)

Commande (id_commande PK, date, id_client FK)
//                                  ^^^^^^^^^ FK -> Client.id_client

// La FK id_client dans Commande "pointe" vers le Client concerne.`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> la <b>PK</b> est le <b>numéro de client</b> imprimé sur sa carte. La <b>FK</b> dans Commande est ce <b>même numéro recopié</b> sur le bon de commande pour savoir à qui il appartient.',
          },
        ],
      },
      {
        id: 's2',
        title: 'PK et FK : la différence',
        blocks: [
          {
            type: 'table',
            headers: ['Clé', 'Rôle', 'Où'],
            rows: [
              ['PK (primaire)', 'identifie une ligne de façon unique', 'dans SA table'],
              ['FK (étrangère)', 'pointe vers la PK d’une autre table', 'dans la table qui référence'],
            ],
          },
          {
            type: 'paragraph',
            html: 'Une table a <b>une seule</b> clé primaire (parfois composée de plusieurs colonnes), mais peut avoir <b>plusieurs</b> clés étrangères.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Écrire le MLD en notation texte',
        blocks: [
          {
            type: 'paragraph',
            html: 'On note chaque table sur une ligne : <code>NomTable (colonne PK, autres colonnes, colonne FK)</code>. C’est cette notation qui se traduit ensuite presque mot pour mot en <code>CREATE TABLE</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1101-l-c2',
              filename: 'create-table.sql',
              language: 'sql',
              code: `-- Le MLD ci-dessus donne directement ce SQL :
CREATE TABLE Client (
  id_client INT PRIMARY KEY,   -- la cle primaire
  nom       VARCHAR(100),
  email     VARCHAR(150)
);

CREATE TABLE Commande (
  id_commande INT PRIMARY KEY,
  date        DATE,
  id_client   INT,             -- la cle etrangere
  FOREIGN KEY (id_client) REFERENCES Client(id_client)
);`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Le cas N-N : la table de jonction',
        blocks: [
          {
            type: 'paragraph',
            html: 'Quand deux entités sont reliées « plusieurs à plusieurs » (une commande contient plusieurs produits, un produit est dans plusieurs commandes), le MLD crée une <b>table de jonction</b> qui porte les <b>deux FK</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1101-l-c3',
              filename: 'jonction.txt',
              language: 'text',
              code: `Commande (id_commande PK, date)
Produit  (id_produit PK, nom, prix)

// Table de jonction : les deux FK forment la PK composee
Ligne_Commande (id_commande FK, id_produit FK, quantite)
//              \\________________ PK composee _________/`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> la table de jonction se nomme souvent en associant les deux tables (<code>Ligne_Commande</code>, <code>Client_Role</code>). Sa clé primaire est le <b>couple des deux FK</b>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre la FK du mauvais côté : elle va toujours du côté <b>« plusieurs »</b> (dans Commande, pas dans Client).',
      'Oublier la contrainte <code>FOREIGN KEY … REFERENCES</code> : sans elle, rien ne garantit que la référence existe.',
      'Créer une table de jonction avec un simple <code>id</code> auto et oublier les deux FK : le lien N-N disparaît.',
      'Confondre PK et FK : la PK identifie <b>sa</b> ligne, la FK <b>référence</b> une autre table.',
    ],
    takeaways: [
      '<b>MLD</b> = le MCD traduit en tables · prêt pour <code>CREATE TABLE</code>',
      'chaque entité → une table · son identifiant → <b>clé primaire (PK)</b>',
      'un lien → une <b>clé étrangère (FK)</b>, placée du côté « plusieurs »',
      'relation <b>N-N</b> → une <b>table de jonction</b> portant les deux FK',
      'la notation <code>Table (col PK, …, col FK)</code> se traduit presque mot pour mot en SQL',
    ],
  }),
  template({
    id: 'DB-F-1101-TEMPLATE',
    slug: 'mld-modele-logique',
    title: 'MLD : modèle logique',
    shortTitle: 'MLD',
    technology: 'database',
    tomeId: 't14',
    summary: 'Les gabarits de MLD : table simple, table avec FK, table de jonction N-N.',
    lede: 'La notation MLD prête à copier. Choisis ta situation :',
    aliases: ['mld', 'modele logique', 'cle primaire', 'cle etrangere', 'schema relationnel'],
    keywords: ['table', 'primary key', 'foreign key', 'jonction', 'pk', 'fk'],
    relatedContentIds: [],
    lessonId: 'DB-F-1101-LESSON',
    variants: [
      {
        id: 'DB-F-1101-t-v1',
        label: 'Table simple',
        description: 'Une table avec sa seule clé primaire.',
        codeBlocks: [
          {
            id: 'DB-F-1101-t-v1-c1',
            filename: 'mld.txt',
            language: 'text',
            code: `Table (id_table PK, colonne_1, colonne_2)`,
          },
        ],
        replacements: [
          { token: 'Table', description: 'le nom de ta table (issue d’une entité du MCD)' },
          { token: 'id_table', description: 'la clé primaire de la table' },
          { token: 'colonne_1', description: 'une colonne de données' },
        ],
        placement: 'Une ligne par table sans dépendance. Traduis-la ensuite en CREATE TABLE.',
      },
      {
        id: 'DB-F-1101-t-v2',
        label: 'Table avec FK',
        description: 'Une table qui référence une autre via une clé étrangère.',
        codeBlocks: [
          {
            id: 'DB-F-1101-t-v2-c1',
            filename: 'mld-fk.txt',
            language: 'text',
            code: `Parent (id_parent PK, nom)
Enfant (id_enfant PK, valeur, id_parent FK)
//                              ^^^^^^^^^ FK -> Parent.id_parent`,
          },
        ],
        replacements: [
          { token: 'Parent', description: 'la table du côté « un »' },
          { token: 'Enfant', description: 'la table du côté « plusieurs » qui porte la FK' },
          { token: 'id_parent FK', description: 'la clé étrangère qui pointe vers Parent' },
        ],
        placement: 'La FK va toujours dans la table du côté « plusieurs ».',
      },
      {
        id: 'DB-F-1101-t-v3',
        label: 'Table de jonction (N-N)',
        description: 'Le cas plusieurs-à-plusieurs : une table portant les deux FK.',
        codeBlocks: [
          {
            id: 'DB-F-1101-t-v3-c1',
            filename: 'mld-jonction.txt',
            language: 'text',
            code: `A (id_a PK, ...)
B (id_b PK, ...)
Jonction (id_a FK, id_b FK, attribut)
//        \\____ PK composee ____/`,
          },
        ],
        replacements: [
          { token: 'A', description: 'la première table' },
          { token: 'B', description: 'la seconde table' },
          { token: 'Jonction', description: 'le nom de la table de liaison (Ligne_Commande…)' },
          { token: 'attribut', description: 'une donnée propre au lien (quantité, date…)' },
        ],
        placement: 'À créer dès que deux tables sont en relation N-N. Sa PK = le couple des deux FK.',
      },
    ],
  }),

  // ————— Les cardinalités —————
  lesson({
    id: 'DB-F-1102-LESSON',
    slug: 'les-cardinalites',
    title: 'Les cardinalités',
    shortTitle: 'Cardinalités',
    technology: 'database',
    tomeId: 't14',
    summary:
      'Chiffrer « combien de fois » deux entités se relient : les couples (0,1), (1,1), (0,n), (1,n) posés sur chaque association.',
    utility:
      'Exprimer précisément les règles de gestion : un client a-t-il forcément une commande ? une commande a-t-elle un seul client ?',
    aliases: ['cardinalite', 'cardinalites', '0 n', '1 n', 'multiplicite', 'combien de fois'],
    keywords: [
      'combien de fois relie',
      'cardinalite mini maxi',
      '0 1',
      '1 1',
      '0 n',
      '1 n',
      'regle de gestion',
      'obligatoire ou optionnel',
    ],
    relatedContentIds: [],
    templateId: 'DB-F-1102-TEMPLATE',
    intro:
      'Une <b>cardinalité</b> répond à : « combien de fois <b>au minimum</b> et <b>au maximum</b> une entité participe à l’association ? ». On l’écrit en couple <b>(mini, maxi)</b> collé à chaque entité, par exemple <code>(1,n)</code>.',
    sections: [
      {
        id: 's1',
        title: 'Lire une cardinalité',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>exprimer que « un client peut passer plusieurs commandes, mais une commande appartient à un seul client »</b> sur mon schéma.',
          },
          {
            type: 'paragraph',
            html: 'Le couple <b>(mini, maxi)</b> se lit collé à l’entité. Le <b>mini</b> dit si c’est obligatoire (<code>1</code>) ou optionnel (<code>0</code>). Le <b>maxi</b> dit si c’est un seul (<code>1</code>) ou plusieurs (<code>n</code>).',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1102-l-c1',
              filename: 'cardinalites.txt',
              language: 'text',
              code: `CLIENT  (1,n) ---( passe )--- (1,1)  COMMANDE

// Cote CLIENT (1,n) : un client passe de 1 a plusieurs commandes.
// Cote COMMANDE (1,1) : une commande appartient a 1 seul client.
//
// Astuce de lecture : on lit la cardinalite COLLEE a l entite,
// mais elle decrit la participation de CETTE entite a l association.`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le <b>mini</b> = « faut-il au moins un partenaire pour danser ? ». Le <b>maxi</b> = « peut-on danser avec plusieurs à la fois ? ».',
          },
        ],
      },
      {
        id: 's2',
        title: 'Les 4 couples courants',
        blocks: [
          {
            type: 'table',
            headers: ['Cardinalité', 'Se lit', 'Exemple'],
            rows: [
              ['(0,1)', 'zéro ou un', 'un employé a 0 ou 1 badge'],
              ['(1,1)', 'exactement un', 'une commande a exactement 1 client'],
              ['(0,n)', 'zéro ou plusieurs', 'un client a 0 ou plusieurs avis'],
              ['(1,n)', 'un ou plusieurs', 'une facture a au moins 1 ligne'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> <code>n</code> (ou parfois <code>*</code>) veut dire « plusieurs, sans limite fixée ». On n’écrit <b>jamais</b> un nombre exact comme maxi dans un MCD standard.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Mini = obligatoire ou optionnel',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le <b>mini</b> est une <b>règle de gestion</b> forte. <code>0</code> = la participation est <b>optionnelle</b>. <code>1</code> = elle est <b>obligatoire</b>. C’est souvent là que se cachent les vraies questions métier.',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1102-l-c2',
              filename: 'mini.txt',
              language: 'text',
              code: `// Une commande DOIT avoir un client -> mini = 1
COMMANDE (1,1) ---( passe )--- CLIENT

// Un client PEUT n avoir aucune commande -> mini = 0
CLIENT (0,n) ---( passe )--- COMMANDE`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'De la cardinalité au type de relation',
        blocks: [
          {
            type: 'paragraph',
            html: 'En regardant les deux <b>maxi</b> d’une association, on déduit le type de relation (1-1, 1-N ou N-N), qui dictera la place des clés étrangères au MLD.',
          },
          {
            type: 'table',
            headers: ['Maxi côté A', 'Maxi côté B', 'Relation'],
            rows: [
              ['1', '1', '1-1'],
              ['1', 'n', '1-N'],
              ['n', 'n', 'N-N'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Inverser mini et maxi : on écrit toujours <b>(mini, maxi)</b>, dans cet ordre.',
      'Mettre un maxi chiffré arbitraire (<code>(1,3)</code>) : en MCD standard le maxi est <code>1</code> ou <code>n</code>.',
      'Confondre le côté : la cardinalité collée à une entité décrit <b>la participation de cette entité</b>, pas de l’autre.',
      'Oublier le mini <code>0</code> : dire qu’une relation est optionnelle change tout au moment des <code>NULL</code> en base.',
    ],
    takeaways: [
      '<b>cardinalité</b> = (mini, maxi) : combien de fois au minimum / maximum',
      '<b>mini</b> : <code>0</code> optionnel · <code>1</code> obligatoire',
      '<b>maxi</b> : <code>1</code> un seul · <code>n</code> plusieurs',
      'les 4 couples : <code>(0,1)</code> <code>(1,1)</code> <code>(0,n)</code> <code>(1,n)</code>',
      'les deux <b>maxi</b> donnent le type de relation : 1-1, 1-N ou N-N',
    ],
  }),
  template({
    id: 'DB-F-1102-TEMPLATE',
    slug: 'les-cardinalites',
    title: 'Les cardinalités',
    shortTitle: 'Cardinalités',
    technology: 'database',
    tomeId: 't14',
    summary: 'Les notations de cardinalité à copier selon la règle de gestion : obligatoire, optionnel, un ou plusieurs.',
    lede: 'La cardinalité à poser sur ton association. Choisis ta règle :',
    aliases: ['cardinalite', 'cardinalites', '0 n', '1 n', 'multiplicite'],
    keywords: ['mini maxi', '0 1', '1 1', '0 n', '1 n', 'obligatoire', 'optionnel'],
    relatedContentIds: [],
    lessonId: 'DB-F-1102-LESSON',
    variants: [
      {
        id: 'DB-F-1102-t-v1',
        label: 'Obligatoire, un seul (1,1)',
        description: 'La participation est obligatoire et unique.',
        codeBlocks: [
          {
            id: 'DB-F-1102-t-v1-c1',
            filename: 'card-1-1.txt',
            language: 'text',
            code: `ENTITE (1,1) ---( verbe )--- AUTRE

// Ex : une commande a exactement 1 client.`,
          },
        ],
        replacements: [
          { token: 'ENTITE', description: 'l’entité dont on décrit la participation' },
          { token: 'verbe', description: 'le nom de l’association' },
          { token: 'AUTRE', description: 'l’entité reliée' },
        ],
        placement: 'Colle (1,1) juste à côté de l’entité concernée, sur le trait de l’association.',
      },
      {
        id: 'DB-F-1102-t-v2',
        label: 'Optionnel, plusieurs (0,n)',
        description: 'La participation est facultative et peut se répéter.',
        codeBlocks: [
          {
            id: 'DB-F-1102-t-v2-c1',
            filename: 'card-0-n.txt',
            language: 'text',
            code: `ENTITE (0,n) ---( verbe )--- AUTRE

// Ex : un client a 0 ou plusieurs avis.`,
          },
        ],
        replacements: [
          { token: 'ENTITE', description: 'l’entité dont la participation est optionnelle' },
          { token: 'verbe', description: 'le nom de l’association' },
          { token: 'AUTRE', description: 'l’entité reliée' },
        ],
        placement: 'Utilise (0,n) quand rien n’oblige l’entité à participer.',
      },
      {
        id: 'DB-F-1102-t-v3',
        label: 'Obligatoire, plusieurs (1,n)',
        description: 'La participation est obligatoire et peut se répéter.',
        codeBlocks: [
          {
            id: 'DB-F-1102-t-v3-c1',
            filename: 'card-1-n.txt',
            language: 'text',
            code: `ENTITE (1,n) ---( verbe )--- AUTRE

// Ex : une facture a au moins 1 ligne.`,
          },
        ],
        replacements: [
          { token: 'ENTITE', description: 'l’entité qui participe au moins une fois' },
          { token: 'verbe', description: 'le nom de l’association' },
          { token: 'AUTRE', description: 'l’entité reliée' },
        ],
        placement: 'Utilise (1,n) quand au moins une participation est exigée par le métier.',
      },
    ],
  }),

  // ————— Relation 1-1, 1-N et N-N (modélisation) —————
  lesson({
    id: 'DB-F-1103-LESSON',
    slug: 'relation-1-1-1-n-et-n-n-modelisation',
    title: 'Relation 1-1, 1-N et N-N (modélisation)',
    shortTitle: 'Relations 1-1 / 1-N / N-N',
    technology: 'database',
    tomeId: 't14',
    summary:
      'Les trois formes de relation entre tables et où mettre la clé étrangère (ou la table de jonction) pour chacune.',
    utility:
      'Choisir le bon montage : FK simple, FK côté « plusieurs », ou table de jonction, selon le type de relation.',
    aliases: ['relation 1 1', 'relation 1 n', 'relation n n', 'one to many', 'many to many', 'jointure modelisation'],
    keywords: [
      'ou mettre la cle etrangere',
      'un a un',
      'un a plusieurs',
      'plusieurs a plusieurs',
      'table de jonction',
      'one to one',
      'one to many',
      'many to many',
    ],
    relatedContentIds: [],
    templateId: 'DB-F-1103-TEMPLATE',
    intro:
      'Il existe <b>trois</b> types de relation : <b>1-1</b> (un à un), <b>1-N</b> (un à plusieurs) et <b>N-N</b> (plusieurs à plusieurs). Chacun a une <b>recette</b> précise pour placer la clé étrangère — ou créer une table intermédiaire.',
    sections: [
      {
        id: 's1',
        title: '1-N : le cas le plus fréquent',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>relier des commandes à leur client</b> : un client a plusieurs commandes, une commande a un seul client. Où mettre la clé étrangère ?',
          },
          {
            type: 'paragraph',
            html: 'Dans une relation <b>1-N</b>, la <b>FK va du côté « plusieurs »</b>. Ici, chaque <code>Commande</code> stocke l’<code>id_client</code> de son client. On ne touche <b>pas</b> à la table Client.',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1103-l-c1',
              filename: 'relation-1-n.sql',
              language: 'sql',
              code: `-- 1-N : la FK est cote "plusieurs" (Commande)
CREATE TABLE Client (
  id_client INT PRIMARY KEY,
  nom       VARCHAR(100)
);

CREATE TABLE Commande (
  id_commande INT PRIMARY KEY,
  id_client   INT,   -- FK cote plusieurs
  FOREIGN KEY (id_client) REFERENCES Client(id_client)
);`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> chaque enfant connaît son parent, mais le parent ne liste pas ses enfants dans sa fiche. La <b>FK est chez l’enfant</b> (le côté « plusieurs »).',
          },
        ],
      },
      {
        id: 's2',
        title: 'N-N : la table de jonction',
        blocks: [
          {
            type: 'paragraph',
            html: 'Dans une relation <b>N-N</b>, on <b>ne peut pas</b> poser une FK d’un côté ou de l’autre. On crée une <b>table de jonction</b> qui contient les <b>deux</b> clés étrangères.',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1103-l-c2',
              filename: 'relation-n-n.sql',
              language: 'sql',
              code: `-- N-N : commande <-> produit via une table de jonction
CREATE TABLE Ligne_Commande (
  id_commande INT,
  id_produit  INT,
  quantite    INT,
  PRIMARY KEY (id_commande, id_produit),   -- PK composee
  FOREIGN KEY (id_commande) REFERENCES Commande(id_commande),
  FOREIGN KEY (id_produit)  REFERENCES Produit(id_produit)
);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> la clé primaire de la table de jonction est le <b>couple des deux FK</b>. On peut y ajouter des colonnes propres au lien (<code>quantite</code>, <code>date_ajout</code>…).',
          },
        ],
      },
      {
        id: 's3',
        title: '1-1 : plus rare',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une relation <b>1-1</b> (chaque ligne d’un côté correspond à <b>au plus une</b> ligne de l’autre) se modélise avec une <b>FK unique</b> placée d’un des deux côtés. Souvent, on aurait pu fusionner les deux tables.',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1103-l-c3',
              filename: 'relation-1-1.sql',
              language: 'sql',
              code: `-- 1-1 : un utilisateur a un seul profil detaille
CREATE TABLE Profil (
  id_profil INT PRIMARY KEY,
  bio       TEXT,
  id_user   INT UNIQUE,   -- UNIQUE force le 1-1
  FOREIGN KEY (id_user) REFERENCES Utilisateur(id_user)
);`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Le tableau récap',
        blocks: [
          {
            type: 'table',
            headers: ['Relation', 'Où va la clé', 'Exemple'],
            rows: [
              ['1-1', 'FK <code>UNIQUE</code> d’un côté', 'utilisateur ↔ profil'],
              ['1-N', 'FK côté « plusieurs »', 'client → commandes'],
              ['N-N', 'table de jonction (2 FK)', 'commande ↔ produit'],
            ],
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> 1-N = chaque wagon accroché à une seule locomotive. N-N = un carnet d’adresses partagé où plusieurs personnes connaissent plusieurs personnes : il faut une <b>table « qui connaît qui »</b>.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre la FK côté « un » dans une relation 1-N : elle va <b>toujours</b> côté « plusieurs ».',
      'Tenter de gérer un N-N avec une seule FK : impossible, il <b>faut</b> une table de jonction.',
      'Oublier <code>UNIQUE</code> sur la FK d’un 1-1 : sans elle, tu retombes sur un 1-N.',
      'Créer une table de jonction sans <b>PK composée</b> : deux fois le même couple pourrait alors être inséré.',
    ],
    takeaways: [
      '<b>1-N</b> = FK côté « plusieurs » (le cas le plus courant)',
      '<b>N-N</b> = table de jonction portant les <b>deux</b> FK (PK composée)',
      '<b>1-1</b> = FK <code>UNIQUE</code> placée d’un côté',
      'la FK ne va <b>jamais</b> côté « un » d’un 1-N',
      'le type de relation vient des <b>maxi</b> des cardinalités',
    ],
  }),
  template({
    id: 'DB-F-1103-TEMPLATE',
    slug: 'relation-1-1-1-n-et-n-n-modelisation',
    title: 'Relation 1-1, 1-N et N-N (modélisation)',
    shortTitle: 'Relations 1-1 / 1-N / N-N',
    technology: 'database',
    tomeId: 't14',
    summary: 'Le SQL prêt à copier pour chaque type de relation : 1-N, N-N (jonction) et 1-1.',
    lede: 'Le montage prêt à copier. Choisis ton type de relation :',
    aliases: ['relation 1 1', 'relation 1 n', 'relation n n', 'one to many', 'many to many'],
    keywords: ['foreign key', 'jonction', 'unique', '1 n', 'n n', '1 1'],
    relatedContentIds: [],
    lessonId: 'DB-F-1103-LESSON',
    variants: [
      {
        id: 'DB-F-1103-t-v1',
        label: '1-N (un à plusieurs)',
        description: 'La FK va dans la table du côté « plusieurs ».',
        codeBlocks: [
          {
            id: 'DB-F-1103-t-v1-c1',
            filename: 'relation-1-n.sql',
            language: 'sql',
            code: `CREATE TABLE Enfant (
  id_enfant INT PRIMARY KEY,
  id_parent INT,
  FOREIGN KEY (id_parent) REFERENCES Parent(id_parent)
);`,
          },
        ],
        replacements: [
          { token: 'Enfant', description: 'la table du côté « plusieurs »' },
          { token: 'id_parent', description: 'la FK qui pointe vers la table « un »' },
          { token: 'Parent', description: 'la table du côté « un »' },
        ],
        placement: 'Ajoute la FK dans la table qui peut apparaître plusieurs fois.',
      },
      {
        id: 'DB-F-1103-t-v2',
        label: 'N-N (jonction)',
        description: 'Une table intermédiaire portant les deux FK.',
        codeBlocks: [
          {
            id: 'DB-F-1103-t-v2-c1',
            filename: 'relation-n-n.sql',
            language: 'sql',
            code: `CREATE TABLE Jonction (
  id_a     INT,
  id_b     INT,
  attribut INT,
  PRIMARY KEY (id_a, id_b),
  FOREIGN KEY (id_a) REFERENCES TableA(id_a),
  FOREIGN KEY (id_b) REFERENCES TableB(id_b)
);`,
          },
        ],
        replacements: [
          { token: 'Jonction', description: 'le nom de la table de liaison' },
          { token: 'id_a', description: 'la FK vers la première table' },
          { token: 'id_b', description: 'la FK vers la seconde table' },
          { token: 'attribut', description: 'une colonne propre au lien (quantité, date…)' },
        ],
        placement: 'À créer dès qu’une relation est plusieurs-à-plusieurs. PK = couple des deux FK.',
      },
      {
        id: 'DB-F-1103-t-v3',
        label: '1-1 (un à un)',
        description: 'Une FK unique force la relation un à un.',
        codeBlocks: [
          {
            id: 'DB-F-1103-t-v3-c1',
            filename: 'relation-1-1.sql',
            language: 'sql',
            code: `CREATE TABLE Detail (
  id_detail INT PRIMARY KEY,
  id_princ  INT UNIQUE,
  FOREIGN KEY (id_princ) REFERENCES Principal(id_princ)
);`,
          },
        ],
        replacements: [
          { token: 'Detail', description: 'la table qui porte la FK unique' },
          { token: 'id_princ', description: 'la FK, marquée UNIQUE pour forcer le 1-1' },
          { token: 'Principal', description: 'la table référencée' },
        ],
        placement: 'Le mot-clé UNIQUE sur la FK est ce qui transforme un 1-N en 1-1.',
      },
    ],
  }),

  // ————— MPD : modèle physique —————
  lesson({
    id: 'DB-F-1104-LESSON',
    slug: 'mpd-modele-physique',
    title: 'MPD : modèle physique',
    shortTitle: 'MPD',
    technology: 'database',
    tomeId: 't14',
    summary:
      'La dernière étape de la modélisation : traduire le MLD en vraies tables SQL pour ton SGBD, avec les bons types, AUTO_INCREMENT et les contraintes.',
    utility:
      'Passer du schéma logique au SQL réellement exécutable : types précis, clés auto-incrémentées et contraintes d’intégrité.',
    aliases: ['mpd', 'modele physique', 'modele physique de donnees', 'create table', 'passage mld mpd', 'schema physique'],
    keywords: [
      'mpd',
      'modele physique',
      'create table',
      'types de donnees',
      'auto_increment',
      'contraintes',
      'not null',
      'passage mld vers sql',
    ],
    relatedContentIds: [],
    templateId: 'DB-F-1104-TEMPLATE',
    intro:
      'Le <b>MPD</b> (Modèle Physique de Données) est la <b>traduction du MLD dans un SGBD précis</b> (MySQL, PostgreSQL…). C’est le SQL réellement exécuté : chaque colonne reçoit un <b>type exact</b> (<code>INT</code>, <code>VARCHAR(100)</code>, <code>DATE</code>…), la clé primaire devient souvent <b>auto-incrémentée</b>, et on ajoute les <b>contraintes</b> (<code>NOT NULL</code>, <code>UNIQUE</code>, <code>FOREIGN KEY</code>).',
    sections: [
      {
        id: 's1',
        title: 'Du MLD au MPD',
        blocks: [
          {
            type: 'situation',
            html: 'J’ai mon <b>MLD</b> (<code>Client (id_client PK, nom, email)</code>). Je veux maintenant <b>les vraies tables SQL</b> que MySQL va accepter.',
          },
          {
            type: 'paragraph',
            html: 'Le MPD reprend chaque table du MLD et lui donne sa <b>forme SQL définitive</b> : un <b>type</b> par colonne, la <b>PK auto-incrémentée</b>, et les <b>contraintes</b>. C’est du <code>CREATE TABLE</code> prêt à exécuter.',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1104-l-c1',
              filename: 'mpd-client.sql',
              language: 'sql',
              code: `-- MLD :  Client (id_client PK, nom, email)
-- MPD (MySQL) :
CREATE TABLE Client (
  id_client INT AUTO_INCREMENT PRIMARY KEY,
  nom       VARCHAR(100) NOT NULL,
  email     VARCHAR(150) NOT NULL UNIQUE,
  ville     VARCHAR(80),
  cree_le   DATETIME DEFAULT CURRENT_TIMESTAMP
);`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le MCD est le <b>croquis</b>, le MLD le <b>plan d’architecte</b>, et le MPD la <b>maison construite</b> avec les vrais matériaux (les types) et les normes (les contraintes).',
          },
        ],
      },
      {
        id: 's2',
        title: 'Choisir les bons types',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le passage au physique force à choisir un <b>type</b> pour chaque colonne. Voici les plus courants en MySQL :',
          },
          {
            type: 'table',
            headers: ['Donnée', 'Type SQL', 'Exemple'],
            rows: [
              ['Identifiant', '<code>INT</code> (+ <code>AUTO_INCREMENT</code>)', '1, 2, 3…'],
              ['Texte court', '<code>VARCHAR(n)</code>', 'nom, email'],
              ['Texte long', '<code>TEXT</code>', 'une description'],
              ['Nombre décimal', '<code>DECIMAL(10,2)</code>', 'un prix : 19.99'],
              ['Date', '<code>DATE</code> / <code>DATETIME</code>', '2026-07-22'],
              ['Vrai / faux', '<code>BOOLEAN</code> (<code>TINYINT</code>)', '0 ou 1'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Convention :</b> pour un prix, on utilise <code>DECIMAL</code>, jamais <code>FLOAT</code> : le <code>FLOAT</code> arrondit et fausse les centimes.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Les contraintes physiques',
        blocks: [
          {
            type: 'paragraph',
            html: 'Les <b>contraintes</b> protègent tes données directement dans la base : <code>NOT NULL</code> (obligatoire), <code>UNIQUE</code> (pas de doublon), <code>DEFAULT</code> (valeur par défaut), <code>AUTO_INCREMENT</code> (numérote tout seul).',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1104-l-c2',
              filename: 'contraintes.sql',
              language: 'sql',
              code: `CREATE TABLE Produit (
  id_produit INT AUTO_INCREMENT PRIMARY KEY,  -- numerote automatiquement
  nom        VARCHAR(120) NOT NULL,           -- obligatoire
  reference  VARCHAR(40)  NOT NULL UNIQUE,    -- pas deux fois la meme
  prix       DECIMAL(10,2) NOT NULL,
  actif      BOOLEAN DEFAULT TRUE             -- vaut TRUE si non precise
);`,
            },
          },
        ],
      },
      {
        id: 's4',
        title: 'Les clés étrangères et l’intégrité',
        blocks: [
          {
            type: 'paragraph',
            html: 'La <b>clé étrangère</b> du MLD devient une vraie contrainte <code>FOREIGN KEY … REFERENCES</code>. On peut préciser ce qui se passe si la ligne référencée est supprimée avec <code>ON DELETE</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'DB-F-1104-l-c3',
              filename: 'fk-mpd.sql',
              language: 'sql',
              code: `CREATE TABLE Commande (
  id_commande INT AUTO_INCREMENT PRIMARY KEY,
  date_cmd    DATE NOT NULL,
  id_client   INT NOT NULL,
  FOREIGN KEY (id_client) REFERENCES Client(id_client)
    ON DELETE CASCADE   -- supprime les commandes si le client part
);`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À savoir :</b> <code>ON DELETE CASCADE</code> supprime en cascade · <code>ON DELETE RESTRICT</code> (défaut) empêche la suppression tant qu’il reste des lignes liées.',
          },
        ],
      },
    ],
    pitfalls: [
      'Confondre les 3 modèles : <b>MCD</b> (papier, entités) → <b>MLD</b> (tables + PK/FK) → <b>MPD</b> (SQL avec types). Le MPD est le seul exécutable.',
      'Utiliser <code>FLOAT</code> pour un prix : préfère <code>DECIMAL(10,2)</code> pour éviter les erreurs d’arrondi.',
      'Oublier <code>AUTO_INCREMENT</code> sur la clé primaire : tu devrais alors fournir l’<code>id</code> toi-même à chaque insertion.',
      'Déclarer une <code>FOREIGN KEY</code> avant que la table référencée existe : crée toujours la table « parent » en premier.',
    ],
    takeaways: [
      '<b>MPD</b> = le MLD traduit en <code>CREATE TABLE</code> réel, propre à ton SGBD',
      'chaque colonne reçoit un <b>type</b> · la PK devient <code>INT AUTO_INCREMENT PRIMARY KEY</code>',
      'contraintes : <code>NOT NULL</code>, <code>UNIQUE</code>, <code>DEFAULT</code>, <code>FOREIGN KEY</code>',
      'un prix → <code>DECIMAL(10,2)</code>, jamais <code>FLOAT</code>',
      'la table « parent » se crée <b>avant</b> la table qui la référence',
    ],
  }),
  template({
    id: 'DB-F-1104-TEMPLATE',
    slug: 'mpd-modele-physique',
    title: 'MPD : modèle physique',
    shortTitle: 'MPD',
    technology: 'database',
    tomeId: 't14',
    summary: 'Les gabarits de CREATE TABLE : table simple, table avec clé étrangère, table de jonction N-N.',
    lede: 'Le CREATE TABLE prêt à copier. Choisis ta situation :',
    aliases: ['mpd', 'create table', 'modele physique', 'auto_increment', 'foreign key'],
    keywords: ['create table', 'auto_increment', 'foreign key', 'not null', 'decimal', 'jonction'],
    relatedContentIds: [],
    lessonId: 'DB-F-1104-LESSON',
    variants: [
      {
        id: 'DB-F-1104-t-v1',
        label: 'Table simple',
        description: 'Une table avec sa clé primaire auto-incrémentée et quelques colonnes typées.',
        codeBlocks: [
          {
            id: 'DB-F-1104-t-v1-c1',
            filename: 'create-table.sql',
            language: 'sql',
            code: `CREATE TABLE ma_table (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  nom     VARCHAR(100) NOT NULL,
  cree_le DATETIME DEFAULT CURRENT_TIMESTAMP
);`,
          },
        ],
        replacements: [
          { token: 'ma_table', description: 'le nom de ta table (en minuscules)' },
          { token: 'nom', description: 'une colonne de données à typer' },
          { token: 'VARCHAR(100)', description: 'le type : VARCHAR(n), INT, DATE, DECIMAL(10,2)…' },
        ],
        placement: 'Dans un fichier .sql ou directement dans ton client MySQL. Crée les tables sans FK en premier.',
      },
      {
        id: 'DB-F-1104-t-v2',
        label: 'Table avec clé étrangère',
        description: 'Une table qui référence une autre table via une FK.',
        codeBlocks: [
          {
            id: 'DB-F-1104-t-v2-c1',
            filename: 'create-fk.sql',
            language: 'sql',
            code: `CREATE TABLE enfant (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  valeur    VARCHAR(120) NOT NULL,
  id_parent INT NOT NULL,
  FOREIGN KEY (id_parent) REFERENCES parent(id_parent)
    ON DELETE CASCADE
);`,
          },
        ],
        replacements: [
          { token: 'enfant', description: 'la table du côté « plusieurs » qui porte la FK' },
          { token: 'parent', description: 'la table référencée (à créer avant)' },
          { token: 'id_parent', description: 'la colonne FK et la PK visée dans parent' },
          { token: 'ON DELETE CASCADE', description: 'CASCADE (supprime en cascade) ou RESTRICT (empêche)' },
        ],
        placement: 'Après avoir créé la table « parent ». La FK va dans la table du côté « plusieurs ».',
      },
      {
        id: 'DB-F-1104-t-v3',
        label: 'Table de jonction (N-N)',
        description: 'Le cas plusieurs-à-plusieurs : deux FK qui forment la clé primaire.',
        codeBlocks: [
          {
            id: 'DB-F-1104-t-v3-c1',
            filename: 'create-jonction.sql',
            language: 'sql',
            code: `CREATE TABLE ligne_commande (
  id_commande INT NOT NULL,
  id_produit  INT NOT NULL,
  quantite    INT NOT NULL DEFAULT 1,
  PRIMARY KEY (id_commande, id_produit),   -- PK composee
  FOREIGN KEY (id_commande) REFERENCES commande(id_commande),
  FOREIGN KEY (id_produit)  REFERENCES produit(id_produit)
);`,
          },
        ],
        replacements: [
          { token: 'ligne_commande', description: 'le nom de la table de jonction' },
          { token: 'id_commande', description: 'la FK vers la première table' },
          { token: 'id_produit', description: 'la FK vers la seconde table' },
          { token: 'quantite', description: 'une donnée propre au lien (optionnelle)' },
        ],
        placement: 'Pour une relation N-N. La PRIMARY KEY est le couple des deux FK.',
      },
    ],
  }),
];
