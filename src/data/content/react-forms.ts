import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const reactFormsContent: ReadyContent[] = [
  // ————— Gérer plusieurs champs —————
  lesson({
    id: 'REACT-F-17100-LESSON',
    slug: 'gerer-plusieurs-champs',
    title: 'Gérer plusieurs champs',
    shortTitle: 'Plusieurs champs',
    technology: 'react',
    tomeId: 't7',
    summary:
      'Regrouper tous les champs d’un formulaire dans un seul objet de state, et les mettre à jour avec un seul handler générique.',
    utility:
      'Éviter un useState par champ : un seul objet, un seul handler, un formulaire qui grandit sans se répéter.',
    aliases: ['plusieurs champs', 'formulaire objet', 'handlechange', 'input controle', 'form state'],
    keywords: [
      'formulaire react',
      'plusieurs inputs',
      'objet de state',
      'name attribut',
      'handler generique',
      'spread state',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-17100-TEMPLATE',
    intro:
      'Quand un formulaire a plusieurs champs, on évite un <code>useState</code> par champ. On regroupe tout dans <b>un seul objet</b> et on écrit <b>un seul handler</b> qui met à jour la bonne clé grâce à l’attribut <code>name</code> de l’input.',
    sections: [
      {
        id: 's1',
        title: 'Le réflexe : un objet plutôt que dix states',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux un <b>formulaire d’inscription avec un prénom, un email et un mot de passe</b>, sans écrire trois <code>useState</code> et trois handlers différents.',
          },
          {
            type: 'paragraph',
            html: 'On met tous les champs dans un <b>objet</b>. Chaque input porte un attribut <code>name</code> qui correspond à une clé de l’objet. Un seul handler lit ce <code>name</code> et met à jour la bonne clé.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17100-l-c1',
              filename: 'Inscription.tsx',
              language: 'tsx',
              code: `import { useState } from "react";

function Inscription() {
  // 1. Un SEUL objet pour tous les champs
  const [form, setForm] = useState({
    prenom: "",
    email: "",
    motDePasse: "",
  });

  // 2. Un SEUL handler pour tous les inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // name = la cle a modifier
    setForm({ ...form, [name]: value }); // 3. on copie puis on remplace
  };

  return (
    <form>
      <input name="prenom" value={form.prenom} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="motDePasse" value={form.motDePasse} onChange={handleChange} />
    </form>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Règle clé :</b> le <code>name</code> de chaque input doit être <b>exactement</b> le même que la clé dans l’objet de state. C’est ce lien qui fait marcher le handler générique.',
          },
        ],
      },
      {
        id: 's2',
        title: 'La clé dynamique [name]',
        blocks: [
          {
            type: 'paragraph',
            html: 'La syntaxe <code>[name]</code> dans l’objet s’appelle une <b>clé dynamique</b> (computed property). Sans les crochets, tu créerais une clé littérale nommée « name » au lieu d’utiliser la valeur de la variable.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17100-l-c2',
              filename: 'exemple.tsx',
              language: 'tsx',
              code: `const name = "email";

// AVEC crochets : la cle devient la valeur de name -> "email"
setForm({ ...form, [name]: "a@b.fr" }); // { email: "a@b.fr" }

// SANS crochets : la cle est le texte "name" (faux !)
setForm({ ...form, name: "a@b.fr" }); // { name: "a@b.fr" }`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> l’objet <code>form</code> est un casier avec des tiroirs étiquetés. Le <code>...form</code> recopie tous les tiroirs, et <code>[name]: value</code> ouvre <b>le seul tiroir concerné</b> pour y ranger la nouvelle valeur.',
          },
        ],
      },
      {
        id: 's3',
        title: 'Toujours copier l’objet avant de le modifier',
        blocks: [
          {
            type: 'paragraph',
            html: 'React ne détecte un changement que si tu passes une <b>nouvelle référence</b>. On recopie donc l’objet avec <code>...form</code> avant de remplacer une clé. Modifier <code>form</code> en place ne déclenche aucun rendu.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17100-l-c3',
              filename: 'exemple.tsx',
              language: 'tsx',
              code: `// Interdit — mutation en place, React ne voit rien
form.email = "a@b.fr";
setForm(form);

// Correct — un nouvel objet a chaque fois
setForm({ ...form, email: "a@b.fr" });

// Version fonctionnelle (recommandee si maj rapprochees)
setForm((prev) => ({ ...prev, email: "a@b.fr" }));`,
            },
          },
          {
            type: 'table',
            headers: ['Écriture', 'Effet'],
            rows: [
              ['<code>{ ...form }</code>', 'copie tout l’objet (nouvelle référence)'],
              ['<code>[name]: value</code>', 'remplace une seule clé, choisie dynamiquement'],
              ['<code>e.target.name</code>', 'le <code>name</code> de l’input qui a changé'],
              ['<code>e.target.value</code>', 'la nouvelle valeur saisie'],
            ],
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier l’attribut <code>name</code> sur un input : <code>e.target.name</code> vaut <code>""</code> et le handler écrase une clé vide.',
      'Écrire <code>name:</code> sans crochets dans le setter : tu crées une clé littérale « name » au lieu de la clé dynamique.',
      'Oublier le <code>...form</code> : tu remplaces tout l’objet par une seule clé et tu perds les autres champs.',
      'Muter <code>form</code> en place (<code>form.email = …</code>) : aucune nouvelle référence, donc aucun rendu.',
    ],
    takeaways: [
      'un seul objet de state + un seul handler pour tout le formulaire',
      'chaque input a un <code>name</code> = à une clé de l’objet',
      'le handler : <code>setForm({ ...form, [name]: value })</code>',
      'clé dynamique = crochets <code>[name]</code> · toujours copier avec <code>...form</code>',
    ],
  }),
  template({
    id: 'REACT-F-17100-TEMPLATE',
    slug: 'gerer-plusieurs-champs',
    title: 'Gérer plusieurs champs',
    shortTitle: 'Plusieurs champs',
    technology: 'react',
    tomeId: 't7',
    summary: 'Le code prêt à copier pour un formulaire multi-champs : handler générique, version typée, version fonctionnelle.',
    lede: 'Regrouper les champs dans un objet. Choisis ta version :',
    aliases: ['plusieurs champs', 'formulaire objet', 'handlechange'],
    keywords: ['name attribut', 'cle dynamique', 'spread'],
    relatedContentIds: [],
    lessonId: 'REACT-F-17100-LESSON',
    variants: [
      {
        id: 'REACT-F-17100-t-v1',
        label: 'Handler générique',
        description: 'Le schéma standard : un objet, un handler pour tous les inputs.',
        codeBlocks: [
          {
            id: 'REACT-F-17100-t-v1-c1',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `import { useState } from "react";

const [form, setForm] = useState({ prenom: "", email: "" });

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};

// <input name="prenom" value={form.prenom} onChange={handleChange} />`,
          },
        ],
        replacements: [
          { token: '{ prenom: "", email: "" }', description: 'la forme de ton objet (une clé par champ)' },
          { token: 'form / setForm', description: 'le nom de ton objet de state + son setter' },
        ],
        placement: 'À l’intérieur du composant, avant le return. Chaque input reçoit name + value + onChange={handleChange}.',
      },
      {
        id: 'REACT-F-17100-t-v2',
        label: 'Version typée (TS)',
        description: 'Avec un type pour l’objet et l’événement, pour attraper les fautes de frappe.',
        codeBlocks: [
          {
            id: 'REACT-F-17100-t-v2-c1',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `import { useState, ChangeEvent } from "react";

type FormState = { prenom: string; email: string };

const [form, setForm] = useState<FormState>({ prenom: "", email: "" });

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};`,
          },
        ],
        replacements: [
          { token: 'FormState', description: 'le type de ton objet (une propriété par champ)' },
          { token: 'prenom: string; email: string', description: 'les champs et leurs types' },
        ],
        placement: 'Quand tu es en TypeScript : le type FormState documente les champs et sécurise le setter.',
      },
      {
        id: 'REACT-F-17100-t-v3',
        label: 'Setter fonctionnel',
        description: 'La forme prev => ... quand plusieurs mises à jour peuvent s’enchaîner.',
        codeBlocks: [
          {
            id: 'REACT-F-17100-t-v3-c1',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};`,
          },
        ],
        replacements: [
          { token: 'prev', description: 'la valeur précédente de l’objet, garantie à jour' },
        ],
        placement: 'À privilégier si des mises à jour rapprochées peuvent se chevaucher : prev est toujours la valeur la plus fraîche.',
      },
    ],
  }),

  // ————— Valider un formulaire —————
  lesson({
    id: 'REACT-F-17101-LESSON',
    slug: 'valider-un-formulaire',
    title: 'Valider un formulaire',
    shortTitle: 'Validation',
    technology: 'react',
    tomeId: 't7',
    summary:
      'Vérifier les champs avant l’envoi, stocker les messages d’erreur dans un state et les afficher sous chaque input.',
    utility:
      'Bloquer un envoi invalide et guider l’utilisateur avec des messages d’erreur clairs, champ par champ.',
    aliases: ['validation', 'valider formulaire', 'erreurs', 'champ obligatoire', 'preventdefault'],
    keywords: [
      'verifier les champs',
      'message erreur',
      'champ requis',
      'validation email',
      'bloquer envoi',
      'onsubmit',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-17101-TEMPLATE',
    intro:
      'Valider = <b>vérifier chaque champ avant l’envoi</b>. On stocke les erreurs dans un objet de state (<code>errors</code>), on empêche l’envoi par défaut avec <code>e.preventDefault()</code>, et on affiche le message sous le champ fautif.',
    sections: [
      {
        id: 's1',
        title: 'Valider au moment de l’envoi',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>empêcher l’envoi tant que l’email est vide ou mal formé</b>, et afficher un message rouge sous le champ concerné.',
          },
          {
            type: 'paragraph',
            html: 'On écrit une fonction <code>validate</code> qui construit un objet d’erreurs. Dans <code>handleSubmit</code>, on appelle <code>e.preventDefault()</code> (pour ne pas recharger la page), on valide, et on n’envoie que si l’objet d’erreurs est <b>vide</b>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17101-l-c1',
              filename: 'Formulaire.tsx',
              language: 'tsx',
              code: `import { useState } from "react";

function Formulaire() {
  const [form, setForm] = useState({ email: "" });
  const [errors, setErrors] = useState({}); // 1. les messages d'erreur

  // 2. On construit un objet { champ: message }
  const validate = () => {
    const e = {};
    if (!form.email) e.email = "L'email est obligatoire";
    else if (!form.email.includes("@")) e.email = "Email invalide";
    return e;
  };

  const handleSubmit = (event) => {
    event.preventDefault();       // 3. pas de rechargement
    const found = validate();
    setErrors(found);             // 4. on affiche les erreurs
    if (Object.keys(found).length === 0) {
      console.log("Envoi OK", form); // 5. valide -> on envoie
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      <button type="submit">Envoyer</button>
    </form>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Toujours</b> <code>e.preventDefault()</code> dans <code>onSubmit</code> : sans lui, le navigateur recharge la page et tu perds ton state.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Afficher l’erreur sous le bon champ',
        blocks: [
          {
            type: 'paragraph',
            html: 'On affiche le message avec l’affichage conditionnel <code>{errors.champ && …}</code> : le paragraphe n’apparaît que si une erreur existe pour ce champ précis.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17101-l-c2',
              filename: 'Champ.tsx',
              language: 'tsx',
              code: `// L'erreur ne s'affiche que si elle existe pour ce champ
<input name="email" value={form.email} onChange={handleChange} />
{errors.email && <span className="erreur">{errors.email}</span>}

// Plusieurs champs -> une ligne d'erreur par champ
{errors.motDePasse && <span className="erreur">{errors.motDePasse}</span>}`,
            },
          },
          {
            type: 'table',
            headers: ['Vérification', 'Condition', 'Message type'],
            rows: [
              ['Champ requis', '<code>!form.champ</code>', '« Ce champ est obligatoire »'],
              ['Email', '<code>!form.email.includes("@")</code>', '« Email invalide »'],
              ['Longueur mini', '<code>form.mdp.length &lt; 8</code>', '« 8 caractères minimum »'],
              ['Deux champs égaux', '<code>form.a !== form.b</code>', '« Les valeurs diffèrent »'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Savoir si le formulaire est valide',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le formulaire est valide quand l’objet d’erreurs <b>n’a aucune clé</b>. On teste ça avec <code>Object.keys(errors).length === 0</code>. Pratique aussi pour désactiver le bouton d’envoi.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17101-l-c3',
              filename: 'exemple.tsx',
              language: 'tsx',
              code: `// Nombre d'erreurs -> 0 = tout est bon
const estValide = Object.keys(errors).length === 0;

// Desactiver le bouton tant que ce n'est pas valide
<button type="submit" disabled={!estValide}>Envoyer</button>`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> <code>validate</code> est un videur à l’entrée. Il note sur un carnet (<code>errors</code>) tous ceux qui ne respectent pas les règles. Si le carnet est <b>vide</b>, tout le monde entre : le formulaire part.',
          },
        ],
      },
    ],
    pitfalls: [
      'Oublier <code>e.preventDefault()</code> : la page se recharge à l’envoi et le state est perdu.',
      'Tester la validité juste après <code>setErrors</code> en relisant <code>errors</code> : le state n’est pas encore à jour. Teste l’objet <b>retourné</b> par <code>validate</code>.',
      'Valider uniquement au submit sans jamais vider une erreur corrigée : recalcule les erreurs à chaque tentative.',
      'Afficher <code>{errors.email}</code> sans garde : si la clé n’existe pas, tu affiches <code>undefined</code>. Utilise <code>errors.email &&</code>.',
    ],
    takeaways: [
      'un objet <code>errors</code> = { champ: message } dans un state',
      'toujours <code>e.preventDefault()</code> dans <code>onSubmit</code>',
      'valide si <code>Object.keys(errors).length === 0</code>',
      'affichage conditionnel : <code>{errors.champ && &lt;p&gt;…&lt;/p&gt;}</code>',
      'teste l’objet retourné par <code>validate</code>, pas le state pas encore à jour',
    ],
  }),
  template({
    id: 'REACT-F-17101-TEMPLATE',
    slug: 'valider-un-formulaire',
    title: 'Valider un formulaire',
    shortTitle: 'Validation',
    technology: 'react',
    tomeId: 't7',
    summary: 'Le code de validation prêt à copier : au submit, en direct pendant la saisie, ou bouton désactivé.',
    lede: 'Valider les champs. Choisis la stratégie :',
    aliases: ['validation', 'erreurs', 'preventdefault'],
    keywords: ['champ requis', 'message erreur', 'onsubmit'],
    relatedContentIds: [],
    lessonId: 'REACT-F-17101-LESSON',
    variants: [
      {
        id: 'REACT-F-17101-t-v1',
        label: 'Au submit',
        description: 'On valide tout au moment de l’envoi (le cas le plus courant).',
        codeBlocks: [
          {
            id: 'REACT-F-17101-t-v1-c1',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `const [errors, setErrors] = useState({});

const validate = () => {
  const e = {};
  if (!form.email) e.email = "L'email est obligatoire";
  return e;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const found = validate();
  setErrors(found);
  if (Object.keys(found).length === 0) {
    // envoi ici
  }
};`,
          },
        ],
        replacements: [
          { token: 'form.email', description: 'le champ à vérifier' },
          { token: 'L\'email est obligatoire', description: 'le message affiché en cas d’erreur' },
        ],
        placement: 'Le cas par défaut : la validation se déclenche quand l’utilisateur clique sur Envoyer.',
      },
      {
        id: 'REACT-F-17101-t-v2',
        label: 'En direct (onChange)',
        description: 'On revalide un champ à chaque frappe pour un retour immédiat.',
        codeBlocks: [
          {
            id: 'REACT-F-17101-t-v2-c1',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });

  // Revalide seulement ce champ
  setErrors((prev) => ({
    ...prev,
    [name]: value ? "" : "Ce champ est obligatoire",
  }));
};`,
          },
        ],
        replacements: [
          { token: 'value ? "" : "Ce champ est obligatoire"', description: 'la règle de ce champ (vide = pas d’erreur)' },
        ],
        placement: 'Quand tu veux un feedback instantané pendant la saisie, sans attendre le clic sur Envoyer.',
      },
      {
        id: 'REACT-F-17101-t-v3',
        label: 'Bouton désactivé',
        description: 'On empêche carrément le clic tant que le formulaire est invalide.',
        codeBlocks: [
          {
            id: 'REACT-F-17101-t-v3-c1',
            filename: 'Formulaire.tsx',
            language: 'tsx',
            code: `const estValide =
  form.email.includes("@") && form.motDePasse.length >= 8;

<button type="submit" disabled={!estValide}>
  Envoyer
</button>`,
          },
        ],
        replacements: [
          { token: 'form.email.includes("@") && form.motDePasse.length >= 8', description: 'la condition qui rend le formulaire valide' },
        ],
        placement: 'Pour interdire l’envoi tant que les règles ne sont pas remplies : le bouton reste grisé.',
      },
    ],
  }),

  // ————— Cases à cocher et boutons radio —————
  lesson({
    id: 'REACT-F-17102-LESSON',
    slug: 'cases-a-cocher-et-boutons-radio',
    title: 'Cases à cocher et boutons radio',
    shortTitle: 'Checkbox & radio',
    technology: 'react',
    tomeId: 't7',
    summary:
      'Contrôler une case à cocher avec checked, un groupe de radios avec une seule valeur, et une liste de cases multiples.',
    utility:
      'Gérer les choix oui/non (checkbox) et les choix exclusifs (radio) dans un formulaire React contrôlé.',
    aliases: ['checkbox', 'case a cocher', 'radio', 'bouton radio', 'checked', 'choix'],
    keywords: [
      'case a cocher react',
      'bouton radio react',
      'checked contient',
      'choix exclusif',
      'cases multiples',
      'e target checked',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-17102-TEMPLATE',
    intro:
      'Une case à cocher se contrôle avec <code>checked</code> (un booléen), pas <code>value</code>. On lit son état via <code>e.target.checked</code>. Un groupe de <b>radios</b> partage le même <code>name</code> et une seule valeur sélectionnée.',
    sections: [
      {
        id: 's1',
        title: 'Une case à cocher (oui / non)',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux une <b>case « J’accepte les conditions »</b> dont l’état vrai/faux pilote l’activation du bouton d’envoi.',
          },
          {
            type: 'paragraph',
            html: 'Une checkbox se lie à un <b>booléen</b> via <code>checked</code> (et non <code>value</code>). Dans le handler, on lit <code>e.target.checked</code>, pas <code>e.target.value</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17102-l-c1',
              filename: 'Conditions.tsx',
              language: 'tsx',
              code: `import { useState } from "react";

function Conditions() {
  // 1. Un booleen pour l'etat de la case
  const [accepte, setAccepte] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        checked={accepte}                    // 2. checked, pas value
        onChange={(e) => setAccepte(e.target.checked)} // 3. .checked
      />
      J'accepte les conditions
    </label>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>À retenir :</b> checkbox = <code>checked</code> + <code>e.target.checked</code> (booléen). Input texte = <code>value</code> + <code>e.target.value</code> (chaîne). Ne les mélange pas.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Un groupe de boutons radio (choix unique)',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux laisser choisir <b>une seule taille parmi S, M, L</b> — un choix exclusif.',
          },
          {
            type: 'paragraph',
            html: 'Les radios d’un même groupe partagent le <b>même</b> <code>name</code>. Chacun est <code>checked</code> quand le state vaut sa <code>value</code>. Le handler stocke la <code>value</code> choisie.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17102-l-c2',
              filename: 'Taille.tsx',
              language: 'tsx',
              code: `const [taille, setTaille] = useState("M");

// Meme name -> un seul choix possible dans le groupe
<label>
  <input
    type="radio"
    name="taille"
    value="S"
    checked={taille === "S"}            // coche si le state vaut "S"
    onChange={(e) => setTaille(e.target.value)}
  />
  S
</label>
<label>
  <input
    type="radio"
    name="taille"
    value="M"
    checked={taille === "M"}
    onChange={(e) => setTaille(e.target.value)}
  />
  M
</label>`,
            },
          },
          {
            type: 'table',
            headers: ['Type', 'Lié à', 'Dans le handler'],
            rows: [
              ['<code>checkbox</code>', '<code>checked</code> (booléen)', '<code>e.target.checked</code>'],
              ['<code>radio</code>', '<code>checked={state === value}</code>', '<code>e.target.value</code>'],
              ['<code>text</code>', '<code>value</code> (chaîne)', '<code>e.target.value</code>'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Plusieurs cases (une liste de choix)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour plusieurs cases indépendantes (choix multiples), on stocke un <b>tableau</b> des valeurs cochées. On <b>ajoute</b> ou on <b>retire</b> selon <code>e.target.checked</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17102-l-c3',
              filename: 'Options.tsx',
              language: 'tsx',
              code: `const [choix, setChoix] = useState([]); // tableau des valeurs cochees

const handleCheck = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    setChoix([...choix, value]);          // ajoute la valeur
  } else {
    setChoix(choix.filter((v) => v !== value)); // retire la valeur
  }
};

// checked = true si la valeur est deja dans le tableau
<input
  type="checkbox"
  value="newsletter"
  checked={choix.includes("newsletter")}
  onChange={handleCheck}
/>`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le tableau <code>choix</code> est un panier. Cocher = ajouter l’article au panier (<code>[...choix, value]</code>), décocher = l’en retirer (<code>filter</code>). Une case est cochée si son article est déjà dedans (<code>includes</code>).',
          },
        ],
      },
    ],
    pitfalls: [
      'Utiliser <code>value</code> au lieu de <code>checked</code> pour une checkbox : la case ne reflète pas le state.',
      'Lire <code>e.target.value</code> pour une checkbox : ça vaut toujours <code>"on"</code>. Lis <code>e.target.checked</code>.',
      'Oublier de donner le <b>même</b> <code>name</code> à des radios du même groupe : ils deviennent tous cochables ensemble.',
      'Pour des cases multiples, faire <code>choix.push(value)</code> : mutation en place, aucun rendu. Crée un nouveau tableau.',
    ],
    takeaways: [
      'checkbox = <code>checked</code> + <code>e.target.checked</code> (booléen)',
      'radio = même <code>name</code> · <code>checked={state === value}</code> · stocke <code>e.target.value</code>',
      'cases multiples = un tableau · ajout <code>[...choix, value]</code> · retrait <code>filter</code>',
      'case cochée si <code>choix.includes(value)</code>',
    ],
  }),
  template({
    id: 'REACT-F-17102-TEMPLATE',
    slug: 'cases-a-cocher-et-boutons-radio',
    title: 'Cases à cocher et boutons radio',
    shortTitle: 'Checkbox & radio',
    technology: 'react',
    tomeId: 't7',
    summary: 'Le code prêt à copier : une checkbox simple, un groupe de radios, une liste de cases multiples.',
    lede: 'Gérer les choix. Choisis le type de champ :',
    aliases: ['checkbox', 'radio', 'case a cocher', 'checked'],
    keywords: ['choix unique', 'cases multiples', 'e target checked'],
    relatedContentIds: [],
    lessonId: 'REACT-F-17102-LESSON',
    variants: [
      {
        id: 'REACT-F-17102-t-v1',
        label: 'Checkbox simple',
        description: 'Une case oui/non liée à un booléen.',
        codeBlocks: [
          {
            id: 'REACT-F-17102-t-v1-c1',
            filename: 'Case.tsx',
            language: 'tsx',
            code: `const [accepte, setAccepte] = useState(false);

<input
  type="checkbox"
  checked={accepte}
  onChange={(e) => setAccepte(e.target.checked)}
/>`,
          },
        ],
        replacements: [
          { token: 'accepte / setAccepte', description: 'le nom de ton booléen + son setter' },
          { token: 'false', description: 'l’état de départ (cochée ou non)' },
        ],
        placement: 'Pour une case unique (conditions acceptées, se souvenir de moi…). Toujours checked, jamais value.',
      },
      {
        id: 'REACT-F-17102-t-v2',
        label: 'Groupe de radios',
        description: 'Un choix exclusif parmi plusieurs options.',
        codeBlocks: [
          {
            id: 'REACT-F-17102-t-v2-c1',
            filename: 'Radios.tsx',
            language: 'tsx',
            code: `const [choix, setChoix] = useState("M");

<label>
  <input
    type="radio"
    name="taille"
    value="S"
    checked={choix === "S"}
    onChange={(e) => setChoix(e.target.value)}
  />
  S
</label>`,
          },
        ],
        replacements: [
          { token: 'name="taille"', description: 'le même name pour toutes les options du groupe' },
          { token: 'value="S"', description: 'la valeur de cette option' },
          { token: '"M"', description: 'l’option sélectionnée par défaut' },
        ],
        placement: 'Duplique le <label> pour chaque option en changeant value. Le même name garantit un seul choix.',
      },
      {
        id: 'REACT-F-17102-t-v3',
        label: 'Cases multiples',
        description: 'Plusieurs cases cochables, stockées dans un tableau.',
        codeBlocks: [
          {
            id: 'REACT-F-17102-t-v3-c1',
            filename: 'Multi.tsx',
            language: 'tsx',
            code: `const [choix, setChoix] = useState([]);

const handleCheck = (e) => {
  const { value, checked } = e.target;
  setChoix(
    checked
      ? [...choix, value]
      : choix.filter((v) => v !== value)
  );
};

<input
  type="checkbox"
  value="newsletter"
  checked={choix.includes("newsletter")}
  onChange={handleCheck}
/>`,
          },
        ],
        replacements: [
          { token: 'choix / setChoix', description: 'le tableau des valeurs cochées + son setter' },
          { token: 'value="newsletter"', description: 'la valeur propre à cette case' },
        ],
        placement: 'Pour une liste d’options indépendantes : chaque case ajoute/retire sa valeur du tableau.',
      },
    ],
  }),

  // ————— Menu déroulant : select —————
  lesson({
    id: 'REACT-F-17103-LESSON',
    slug: 'menu-deroulant-select',
    title: 'Menu déroulant : select',
    shortTitle: 'select',
    technology: 'react',
    tomeId: 't7',
    summary:
      'Contrôler un menu déroulant avec value sur le select, gérer l’option par défaut et le cas de la sélection multiple.',
    utility:
      'Proposer un choix dans une liste déroulante contrôlée par le state, avec placeholder et valeur par défaut.',
    aliases: ['select', 'menu deroulant', 'liste deroulante', 'dropdown', 'option', 'choix liste'],
    keywords: [
      'select react',
      'menu deroulant react',
      'option par defaut',
      'placeholder select',
      'select multiple',
      'value sur select',
    ],
    relatedContentIds: [],
    templateId: 'REACT-F-17103-TEMPLATE',
    intro:
      'En React, un <code>&lt;select&gt;</code> contrôlé porte l’attribut <code>value</code> <b>sur le select lui-même</b> (pas <code>selected</code> sur les options, comme en HTML). On lit le choix via <code>e.target.value</code>.',
    sections: [
      {
        id: 's1',
        title: 'Un menu déroulant contrôlé',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux un <b>menu déroulant pour choisir un pays</b>, dont la valeur est pilotée par mon state.',
          },
          {
            type: 'paragraph',
            html: 'On met <code>value</code> et <code>onChange</code> sur le <code>&lt;select&gt;</code>. Chaque <code>&lt;option&gt;</code> porte une <code>value</code>. L’option affichée est celle dont la <code>value</code> correspond au state.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17103-l-c1',
              filename: 'Pays.tsx',
              language: 'tsx',
              code: `import { useState } from "react";

function Pays() {
  // 1. Le state contient la value de l'option choisie
  const [pays, setPays] = useState("fr");

  return (
    <select
      value={pays}                              // 2. value SUR le select
      onChange={(e) => setPays(e.target.value)} // 3. e.target.value
    >
      <option value="fr">France</option>
      <option value="be">Belgique</option>
      <option value="ca">Canada</option>
    </select>
  );
}`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Différence avec le HTML :</b> en React on ne met <b>pas</b> <code>selected</code> sur une option. C’est <code>value</code> sur le <code>&lt;select&gt;</code> qui décide de l’option affichée.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Un placeholder et une option désactivée',
        blocks: [
          {
            type: 'paragraph',
            html: 'Pour un « — Choisir — » de départ, on met une première option avec une <code>value</code> vide. On peut la rendre non sélectionnable après coup avec <code>disabled</code>, et cacher le vide avec <code>hidden</code>.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17103-l-c2',
              filename: 'Pays.tsx',
              language: 'tsx',
              code: `const [pays, setPays] = useState(""); // vide au depart

<select value={pays} onChange={(e) => setPays(e.target.value)}>
  {/* Placeholder : value vide, non re-selectionnable */}
  <option value="" disabled hidden>
    -- Choisir un pays --
  </option>
  <option value="fr">France</option>
  <option value="be">Belgique</option>
</select>`,
            },
          },
          {
            type: 'table',
            headers: ['Attribut', 'Sur quoi', 'Rôle'],
            rows: [
              ['<code>value</code>', 'le <code>&lt;select&gt;</code>', 'l’option actuellement choisie'],
              ['<code>value</code>', 'chaque <code>&lt;option&gt;</code>', 'ce que vaut ce choix'],
              ['<code>disabled</code>', 'une <code>&lt;option&gt;</code>', 'la rend non sélectionnable'],
              ['<code>onChange</code>', 'le <code>&lt;select&gt;</code>', 'appelé à chaque changement'],
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'Générer les options depuis un tableau',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le plus souvent, les options viennent d’un tableau de données. On les génère avec <code>.map()</code>, en donnant une <code>key</code> unique à chaque option.',
          },
          {
            type: 'code',
            block: {
              id: 'REACT-F-17103-l-c3',
              filename: 'Pays.tsx',
              language: 'tsx',
              code: `const listePays = [
  { code: "fr", nom: "France" },
  { code: "be", nom: "Belgique" },
  { code: "ca", nom: "Canada" },
];

<select value={pays} onChange={(e) => setPays(e.target.value)}>
  {listePays.map((p) => (
    <option key={p.code} value={p.code}>
      {p.nom}
    </option>
  ))}
</select>`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Image :</b> le <code>&lt;select&gt;</code> est un juke-box. Le <code>value</code> du select est le bouton actuellement enfoncé ; chaque <code>&lt;option&gt;</code> est un disque avec son étiquette. On appuie, <code>onChange</code> change le disque en cours.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre <code>selected</code> sur une <code>&lt;option&gt;</code> comme en HTML : React l’ignore et prévient. Utilise <code>value</code> sur le <code>&lt;select&gt;</code>.',
      'Un <code>value</code> de select qui ne correspond à aucune option : rien n’est affiché comme sélectionné.',
      'Oublier la <code>key</code> quand tu génères les options avec <code>.map()</code> : React affiche un avertissement.',
      'Comparer un <code>value</code> nombre à une <code>value</code> d’option : les valeurs d’option sont des <b>chaînes</b>. Convertis si besoin.',
    ],
    takeaways: [
      '<code>value</code> se met sur le <code>&lt;select&gt;</code>, pas <code>selected</code> sur l’option',
      'chaque <code>&lt;option&gt;</code> a une <code>value</code> · on lit <code>e.target.value</code>',
      'placeholder = première option <code>value=""</code> + <code>disabled hidden</code>',
      'options dynamiques : <code>.map()</code> avec une <code>key</code> unique',
      'les valeurs d’option sont des chaînes de caractères',
    ],
  }),
  template({
    id: 'REACT-F-17103-TEMPLATE',
    slug: 'menu-deroulant-select',
    title: 'Menu déroulant : select',
    shortTitle: 'select',
    technology: 'react',
    tomeId: 't7',
    summary: 'Le code prêt à copier pour un select contrôlé : options fixes, générées via map, ou avec placeholder.',
    lede: 'Créer un menu déroulant. Choisis le cas :',
    aliases: ['select', 'menu deroulant', 'dropdown', 'option'],
    keywords: ['option par defaut', 'map options', 'placeholder'],
    relatedContentIds: [],
    lessonId: 'REACT-F-17103-LESSON',
    variants: [
      {
        id: 'REACT-F-17103-t-v1',
        label: 'Options fixes',
        description: 'Un select simple avec des options écrites à la main.',
        codeBlocks: [
          {
            id: 'REACT-F-17103-t-v1-c1',
            filename: 'Select.tsx',
            language: 'tsx',
            code: `const [pays, setPays] = useState("fr");

<select value={pays} onChange={(e) => setPays(e.target.value)}>
  <option value="fr">France</option>
  <option value="be">Belgique</option>
  <option value="ca">Canada</option>
</select>`,
          },
        ],
        replacements: [
          { token: 'pays / setPays', description: 'le nom de ton state + son setter' },
          { token: '"fr"', description: 'la value sélectionnée par défaut' },
          { token: 'value="fr">France', description: 'la value technique et le libellé affiché' },
        ],
        placement: 'Quand tu as peu d’options connues à l’avance. value sur le select, pas selected sur l’option.',
      },
      {
        id: 'REACT-F-17103-t-v2',
        label: 'Options via map',
        description: 'Les options générées à partir d’un tableau de données.',
        codeBlocks: [
          {
            id: 'REACT-F-17103-t-v2-c1',
            filename: 'Select.tsx',
            language: 'tsx',
            code: `const options = [
  { code: "fr", nom: "France" },
  { code: "be", nom: "Belgique" },
];

<select value={pays} onChange={(e) => setPays(e.target.value)}>
  {options.map((o) => (
    <option key={o.code} value={o.code}>
      {o.nom}
    </option>
  ))}
</select>`,
          },
        ],
        replacements: [
          { token: 'options', description: 'ton tableau de données' },
          { token: 'o.code', description: 'la valeur unique de chaque option (sert aussi de key)' },
          { token: 'o.nom', description: 'le libellé affiché de l’option' },
        ],
        placement: 'Le cas courant : les options viennent d’une API ou d’une constante. N’oublie pas la key.',
      },
      {
        id: 'REACT-F-17103-t-v3',
        label: 'Avec placeholder',
        description: 'Une première option « — Choisir — » non sélectionnable.',
        codeBlocks: [
          {
            id: 'REACT-F-17103-t-v3-c1',
            filename: 'Select.tsx',
            language: 'tsx',
            code: `const [pays, setPays] = useState("");

<select value={pays} onChange={(e) => setPays(e.target.value)}>
  <option value="" disabled hidden>
    -- Choisir un pays --
  </option>
  <option value="fr">France</option>
  <option value="be">Belgique</option>
</select>`,
          },
        ],
        replacements: [
          { token: '""', description: 'le state vide au départ (rien de choisi)' },
          { token: '-- Choisir un pays --', description: 'le texte du placeholder' },
        ],
        placement: 'Pour forcer un choix explicite : l’option vide est disabled hidden, donc non re-sélectionnable.',
      },
    ],
  }),
];
