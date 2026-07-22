import type { ReadyContent } from '@/types/content';
import { lesson, template } from './_factory';

export const advancedExtraContent: ReadyContent[] = [
  lesson({
    id: 'ADV-F-1120-LESSON',
    slug: 'encaissement-stripe',
    title: 'Encaisser un paiement avec Stripe',
    shortTitle: 'Paiement (Stripe)',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Accepter une carte bancaire sans jamais toucher les données bancaires : un prestataire (Stripe) s’occupe de la carte et de la sécurité, ton back crée le paiement, ton front redirige.',
    utility: 'Faire payer un client sur ton site sans gérer toi-même les cartes ni la sécurité bancaire.',
    aliases: ['stripe', 'paiement', 'encaissement', 'carte bancaire', 'payer', 'checkout', 'paypal', 'e-commerce'],
    keywords: [
      'encaisser un paiement',
      'stripe checkout',
      'payment intent',
      'carte bancaire',
      'prestataire de paiement',
      'webhook stripe',
      'ne jamais stocker la carte',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1120-TEMPLATE',
    intro:
      'Tu ne relies <b>jamais</b> ton site directement à une banque. Tu passes par un <b>prestataire</b> (Stripe, PayPal) qui gère la carte et la sécurité. Le principe : ton <b>back-end crée le paiement</b> (avec ta clé secrète), ton <b>front redirige</b> vers la page sécurisée du prestataire, et Stripe <b>prévient ton serveur</b> quand c’est payé. Tu ne stockes <b>jamais</b> de numéro de carte.',
    sections: [
      {
        id: 's1',
        title: 'Les 3 acteurs',
        blocks: [
          {
            type: 'situation',
            html: 'Je veux <b>faire payer 19,99 €</b> pour un produit, sans avoir à gérer la sécurité des cartes ni être conforme aux normes bancaires.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1120-l-c1',
              filename: 'flux.txt',
              language: 'text',
              code: `1. FRONT   -> demande a TON back de creer un paiement
2. TON BACK -> appelle l'API Stripe (cle SECRETE) et renvoie une URL
3. FRONT   -> redirige le client vers la page Stripe (carte)
4. STRIPE  -> debite la carte, puis appelle TON back (webhook)
5. TON BACK -> marque la commande comme payee

La carte ne passe JAMAIS par ton code.`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Deux clés :</b> la clé <b>secrète</b> (<code>sk_...</code>) reste sur le <b>back</b>, jamais dans le front. La clé <b>publique</b> (<code>pk_...</code>) peut être côté front. En test, elles commencent par <code>sk_test_</code> / <code>pk_test_</code>.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Côté back : créer la session de paiement',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le back crée une <b>Checkout Session</b> Stripe et renvoie son <code>url</code>. Le montant est en <b>centimes</b> (1999 = 19,99 €).',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1120-l-c2',
              filename: 'server.js',
              language: 'javascript',
              code: `import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: { name: 'Mon produit' },
        unit_amount: 1999,           // 19,99 EUR en centimes
      },
      quantity: 1,
    }],
    success_url: 'https://monsite.fr/succes',
    cancel_url: 'https://monsite.fr/panier',
  });
  res.json({ url: session.url });
});`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'Côté front : rediriger vers Stripe',
        blocks: [
          {
            type: 'code',
            block: {
              id: 'ADV-F-1120-l-c3',
              filename: 'Panier.jsx',
              language: 'jsx',
              code: `async function payer() {
  const res = await fetch('/api/checkout', { method: 'POST' });
  const { url } = await res.json();
  window.location.href = url;   // redirige vers la page Stripe
}

<button onClick={payer}>Payer 19,99 €</button>`,
            },
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Le webhook :</b> ne considère <b>jamais</b> une commande payée juste parce que le front est revenu sur <code>success_url</code> (l’utilisateur peut tricher). C’est le <b>webhook</b> Stripe (<code>checkout.session.completed</code>), reçu côté serveur, qui fait foi.',
          },
        ],
      },
    ],
    pitfalls: [
      'Mettre la clé <b>secrète</b> (<code>sk_...</code>) dans le front : n’importe qui peut la voler. Elle reste sur le serveur.',
      'Stocker un numéro de carte : <b>interdit</b> et inutile — c’est tout l’intérêt de Stripe.',
      'Valider la commande sur <code>success_url</code> au lieu du <b>webhook</b> : facilement contournable.',
      'Oublier que le montant est en <b>centimes</b> : <code>1999</code>, pas <code>19.99</code>.',
    ],
    takeaways: [
      'tu passes par un <b>prestataire</b> (Stripe) : jamais la banque en direct',
      'clé <b>secrète</b> côté back, clé <b>publique</b> côté front',
      'back → crée la session · front → redirige · Stripe → débite',
      'la commande est payée quand le <b>webhook</b> le confirme, pas avant',
      'tu ne stockes <b>jamais</b> de données bancaires',
    ],
  }),
  template({
    id: 'ADV-F-1120-TEMPLATE',
    slug: 'encaissement-stripe',
    title: 'Encaisser un paiement avec Stripe',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Le paiement Stripe prêt à copier : session côté back, redirection côté front.',
    lede: 'Les deux morceaux à copier :',
    aliases: ['stripe', 'paiement', 'checkout'],
    keywords: ['stripe', 'checkout', 'paiement'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1120-LESSON',
    variants: [
      {
        id: 'back',
        label: 'Back : créer la session',
        description: 'Une route Express qui crée le paiement Stripe.',
        codeBlocks: [
          {
            id: 'ADV-F-1120-t-v1',
            filename: 'server.js',
            language: 'javascript',
            code: `import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: { name: 'NOM_PRODUIT' },
        unit_amount: 1999,
      },
      quantity: 1,
    }],
    success_url: 'URL_SUCCES',
    cancel_url: 'URL_ANNULATION',
  });
  res.json({ url: session.url });
});`,
          },
        ],
        replacements: [
          { token: 'NOM_PRODUIT', description: 'le nom affiché sur la page de paiement' },
          { token: '1999', description: 'le montant EN CENTIMES (1999 = 19,99 €)' },
          { token: 'URL_SUCCES', description: 'la page où revenir après paiement' },
          { token: 'STRIPE_SECRET_KEY', description: 'ta clé secrète Stripe, dans le .env (jamais dans le front)' },
        ],
        placement: 'Sur ton serveur Express. Installe d’abord : npm i stripe.',
      },
      {
        id: 'front',
        label: 'Front : rediriger',
        description: 'Le bouton qui envoie le client vers Stripe.',
        codeBlocks: [
          {
            id: 'ADV-F-1120-t-v2',
            filename: 'Panier.jsx',
            language: 'jsx',
            code: `async function payer() {
  const res = await fetch('/api/checkout', { method: 'POST' });
  const { url } = await res.json();
  window.location.href = url;
}

<button onClick={payer}>Payer</button>`,
          },
        ],
        replacements: [{ token: '/api/checkout', description: 'l’URL de ta route back qui crée la session' }],
        placement: 'Sur ton bouton « Payer ». Le client est redirigé vers la page sécurisée Stripe.',
      },
    ],
  }),

  lesson({
    id: 'ADV-F-1121-LESSON',
    slug: 'rgpd-le-minimum',
    title: 'RGPD : le minimum légal pour ton site',
    shortTitle: 'RGPD',
    technology: 'advanced',
    tomeId: 't17',
    summary:
      'Ce que la loi demande dès que ton site collecte des données personnelles : informer, demander le consentement pour les cookies non essentiels, et permettre la suppression.',
    utility: 'Savoir ce qu’il faut mettre en place légalement selon ce que ton site collecte.',
    aliases: ['rgpd', 'gdpr', 'cookies', 'consentement', 'confidentialite', 'cgu', 'donnees personnelles', 'vie privee'],
    keywords: [
      'rgpd',
      'consentement cookies',
      'politique de confidentialite',
      'bandeau cookies',
      'donnees personnelles',
      'droit a la suppression',
      'mentions legales',
    ],
    relatedContentIds: [],
    templateId: 'ADV-F-1121-TEMPLATE',
    intro:
      'Le <b>RGPD</b> s’applique dès que tu traites des <b>données personnelles</b> (email, compte, adresse IP via un tracker…). Trois obligations de base : <b>informer</b> (page confidentialité), obtenir le <b>consentement</b> pour les cookies non essentiels, et permettre la <b>suppression</b> des données. Si ton site ne stocke qu’en <code>localStorage</code> sans tracker, tu n’as presque rien à faire.',
    sections: [
      {
        id: 's1',
        title: 'De quoi tu as besoin, selon ton cas',
        blocks: [
          {
            type: 'table',
            headers: ['Ton site…', 'Ce qu’il te faut'],
            rows: [
              ['Juste du <code>localStorage</code>, aucun tracker', 'presque rien (une courte page « confidentialité » suffit)'],
              ['Comptes / emails (inscription)', 'page confidentialité + droit à la suppression du compte'],
              ['Google Analytics / pub / tracker', 'un <b>bandeau de consentement</b> AVANT de charger le tracker'],
              ['Formulaire de contact', 'préciser à quoi servent les données, ne garder que le nécessaire'],
            ],
          },
          {
            type: 'note',
            variant: 'convention',
            html: '<b>Cookies essentiels vs non essentiels :</b> ceux qui font <b>fonctionner</b> le site (panier, session) ne demandent <b>pas</b> de consentement. Ceux de <b>mesure/pub</b> (Analytics) en demandent un, <b>avant</b> de se charger.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Un bandeau de consentement (React)',
        blocks: [
          {
            type: 'paragraph',
            html: 'Le principe : on demande, on <b>mémorise le choix</b>, et on ne charge le tracker <b>que si</b> l’utilisateur a accepté.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1121-l-c1',
              filename: 'BandeauCookies.jsx',
              language: 'jsx',
              code: `function BandeauCookies() {
  const [choix, setChoix] = useState(() => localStorage.getItem('consent'));
  if (choix) return null;               // deja repondu : rien a afficher

  function repondre(valeur) {
    localStorage.setItem('consent', valeur);
    setChoix(valeur);
    if (valeur === 'oui') chargerAnalytics(); // SEULEMENT apres accord
  }

  return (
    <div className="bandeau-cookies">
      <p>On utilise des cookies de mesure d'audience.</p>
      <button onClick={() => repondre('non')}>Refuser</button>
      <button onClick={() => repondre('oui')}>Accepter</button>
    </div>
  );
}`,
            },
          },
        ],
      },
      {
        id: 's3',
        title: 'La page « politique de confidentialité »',
        blocks: [
          {
            type: 'paragraph',
            html: 'Une page simple et honnête, qui répond à : <b>quelles</b> données, <b>pourquoi</b>, <b>combien de temps</b>, et <b>comment</b> les supprimer.',
          },
          {
            type: 'code',
            block: {
              id: 'ADV-F-1121-l-c2',
              filename: 'confidentialite.txt',
              language: 'text',
              code: `A inclure sur la page :
- Qui est responsable (ton nom / ton entreprise, un contact)
- Quelles donnees sont collectees (email, nom...)
- Pourquoi (creer un compte, envoyer une commande...)
- Combien de temps elles sont gardees
- Les cookies utilises (essentiels vs mesure)
- Comment demander la suppression de ses donnees
- La date de derniere mise a jour`,
            },
          },
          {
            type: 'note',
            variant: 'image',
            html: '<b>Pour un portfolio :</b> si tu ne collectes rien (pas de compte, pas de tracker), une phrase suffit : « Ce site ne collecte aucune donnée personnelle et n’utilise aucun cookie de suivi. »',
          },
        ],
      },
    ],
    pitfalls: [
      'Charger Google Analytics <b>avant</b> le consentement : c’est justement ce qui est interdit.',
      'Cocher « Accepter » par défaut : le consentement doit être un <b>choix actif</b>, pas pré-coché.',
      'Oublier le <b>droit à la suppression</b> dès que tu as des comptes utilisateurs.',
      'Copier un texte de CGU d’un autre site sans l’adapter : il doit correspondre à ce que TON site fait vraiment.',
    ],
    takeaways: [
      'RGPD = dès qu’il y a des <b>données personnelles</b> (email, compte, tracker)',
      '3 bases : <b>informer</b>, <b>consentement</b> cookies non essentiels, <b>suppression</b>',
      'cookies essentiels (panier, session) = <b>pas</b> de consentement requis',
      'ne charge un tracker <b>qu’après</b> l’accord de l’utilisateur',
      'site sans collecte ni tracker → une simple phrase suffit',
    ],
  }),
  template({
    id: 'ADV-F-1121-TEMPLATE',
    slug: 'rgpd-le-minimum',
    title: 'RGPD : bandeau et confidentialité',
    technology: 'advanced',
    tomeId: 't17',
    summary: 'Un bandeau de consentement React et la trame d’une page confidentialité.',
    lede: 'Choisis ce dont tu as besoin :',
    aliases: ['rgpd', 'cookies', 'consentement', 'confidentialite'],
    keywords: ['rgpd', 'cookies', 'consentement'],
    relatedContentIds: [],
    lessonId: 'ADV-F-1121-LESSON',
    variants: [
      {
        id: 'bandeau',
        label: 'Bandeau cookies (React)',
        description: 'Demande le consentement et mémorise le choix.',
        codeBlocks: [
          {
            id: 'ADV-F-1121-t-v1',
            filename: 'BandeauCookies.jsx',
            language: 'jsx',
            code: `function BandeauCookies() {
  const [choix, setChoix] = useState(() => localStorage.getItem('consent'));
  if (choix) return null;

  function repondre(valeur) {
    localStorage.setItem('consent', valeur);
    setChoix(valeur);
    if (valeur === 'oui') chargerAnalytics();
  }

  return (
    <div className="bandeau-cookies">
      <p>On utilise des cookies de mesure d'audience.</p>
      <button onClick={() => repondre('non')}>Refuser</button>
      <button onClick={() => repondre('oui')}>Accepter</button>
    </div>
  );
}`,
          },
        ],
        replacements: [
          { token: 'chargerAnalytics', description: 'la fonction qui charge ton tracker (appelée seulement si accepté)' },
        ],
        placement: 'À afficher une fois, en bas de page, tant que le choix n’est pas fait.',
      },
      {
        id: 'confidentialite',
        label: 'Page confidentialité',
        description: 'La liste des points à couvrir.',
        codeBlocks: [
          {
            id: 'ADV-F-1121-t-v2',
            filename: 'confidentialite.txt',
            language: 'text',
            code: `- Responsable + contact
- Donnees collectees
- Finalite (pourquoi)
- Duree de conservation
- Cookies (essentiels / mesure)
- Droit a la suppression + comment
- Date de mise a jour`,
          },
        ],
        replacements: [],
        placement: 'Une page /confidentialite, adaptée à ce que TON site collecte vraiment.',
      },
    ],
  }),
];
