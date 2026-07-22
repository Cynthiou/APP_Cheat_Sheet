import type { Content, ContentKind, Technology } from '@/types/content';
import { ALL_CONTENT } from '@/data/catalog';
import type { CategoryId } from '@/data/categories';
import { CATEGORY_OF } from '@/data/categories';
import { TECHNOLOGY_LABEL } from '@/utils/labels';
import { normalize, tokenize } from '@/utils/normalize';

interface IndexedContent {
  content: Content;
  title: string;
  aliases: string;
  keywords: string;
  summary: string;
  tech: string;
}

const INDEX: IndexedContent[] = ALL_CONTENT.map((c) => ({
  content: c,
  title: normalize(`${c.title} ${c.shortTitle ?? ''}`),
  aliases: normalize(c.aliases.join(' ')),
  keywords: normalize(c.keywords.join(' ')),
  summary: normalize(c.summary),
  tech: normalize(TECHNOLOGY_LABEL[c.technology]),
}));

const STOPWORDS = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'd', 'l', 'et', 'ou', 'en', 'pour', 'a', 'au', 'aux',
  'dans', 'sur', 'avec', 'sans', 'par', 'ne', 'pas', 'plus', 'ce', 'cet', 'cette', 'ces', 'mon', 'ma', 'mes',
  'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'qui', 'que', 'quoi', 'comment', 'quand', 'est', 'sont', 'se', 'je',
  'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles', 'faire', 'fais', 'veux', 'the', 'to', 'of', 'my',
]);

const SYNONYMS: Record<string, string[]> = {
  additionner: ['somme', 'total', 'reduce', 'cumuler'],
  somme: ['reduce', 'total', 'additionner'],
  total: ['reduce', 'somme'],
  moyenne: ['reduce'],
  cumuler: ['reduce'],
  transformer: ['map', 'convertir'],
  convertir: ['map', 'transformer'],
  appliquer: ['map', 'foreach'],
  mapper: ['map'],
  filtrer: ['filter'],
  garder: ['filter'],
  enlever: ['filter', 'splice', 'pop'],
  retirer: ['filter', 'splice', 'pop'],
  exclure: ['filter'],
  parcourir: ['foreach', 'map', 'for'],
  boucler: ['foreach', 'for', 'map'],
  boucle: ['for', 'foreach', 'while', 'map'],
  iterer: ['foreach', 'map'],
  chaque: ['foreach', 'map'],
  trouver: ['find', 'findindex'],
  chercher: ['find', 'includes', 'indexof'],
  recherche: ['find', 'filter'],
  trier: ['sort', 'ordonner'],
  ordonner: ['sort'],
  classer: ['sort'],
  ranger: ['sort'],
  inverser: ['reverse'],
  longueur: ['length', 'taille'],
  taille: ['length'],
  compter: ['length', 'reduce'],
  combien: ['length', 'count'],
  nombre: ['length'],
  ajouter: ['push', 'concat'],
  empiler: ['push'],
  contient: ['includes', 'some'],
  inclut: ['includes'],
  existe: ['some', 'includes', 'find'],
  fusionner: ['concat', 'spread'],
  concatener: ['concat', 'join'],
  joindre: ['join', 'concat'],
  coller: ['join', 'concat'],
  extraire: ['slice'],
  morceau: ['slice'],
  couper: ['slice', 'splice'],
  afficher: ['map', 'render'],
  liste: ['map', 'tableau', 'array'],
  requete: ['fetch', 'api', 'axios'],
  appel: ['fetch', 'api'],
  api: ['fetch'],
  recuperer: ['fetch', 'get'],
  donnees: ['fetch', 'api'],
  etat: ['usestate', 'state'],
  variable: ['usestate', 'let', 'const'],
  effet: ['useeffect'],
  centrer: ['flexbox', 'flex', 'center'],
  responsive: ['media', 'mobile', 'orientation'],
  condition: ['if', 'ternaire'],
  formulaire: ['form', 'input', 'submit'],
  cliquer: ['onclick', 'click', 'tactile'],
  toucher: ['touch', 'tactile', 'pointer'],
  glisser: ['swipe', 'touch'],

  add: ['push', 'concat', 'reduce', 'ajouter'],
  sum: ['reduce', 'somme', 'total'],
  average: ['reduce', 'moyenne'],
  transform: ['map', 'transformer'],
  convert: ['map', 'convertir'],
  loop: ['for', 'foreach', 'boucle'],
  iterate: ['foreach', 'map'],
  each: ['foreach', 'map'],
  remove: ['filter', 'splice', 'pop', 'supprimer'],
  keep: ['filter'],
  search: ['find', 'filter', 'recherche'],
  find: ['find'],
  sort: ['sort', 'trier'],
  order: ['sort', 'trier'],
  reverse: ['reverse', 'inverser'],
  length: ['length', 'longueur', 'taille'],
  count: ['length', 'reduce', 'compter'],
  merge: ['concat', 'spread', 'fusionner'],
  join: ['join', 'concat'],
  split: ['split', 'join'],
  array: ['tableau'],
  list: ['tableau', 'map', 'liste'],
  object: ['objet'],
  string: ['chaine', 'texte'],
  number: ['nombre'],
  date: ['date'],
  function: ['fonction'],
  state: ['etat', 'usestate'],
  component: ['composant'],
  hook: ['hook'],
  fetch: ['fetch'],
  request: ['fetch', 'requete', 'api'],
  promise: ['promesse', 'async'],
  async: ['async', 'await', 'asynchrone'],
  error: ['erreur'],
  event: ['evenement'],
  click: ['onclick', 'clic'],
  touch: ['tactile', 'touch'],
  swipe: ['swipe', 'glisser'],
  form: ['formulaire'],
  input: ['input', 'champ'],
  link: ['lien'],
  image: ['image'],
  color: ['couleur', 'couleurs'],
  font: ['police', 'typographie'],
  shadow: ['ombre', 'box-shadow'],
  gradient: ['degrade'],
  size: ['taille', 'unites'],
  unit: ['unites'],
  grid: ['grid', 'grille'],
  flex: ['flexbox', 'flex'],
  position: ['position'],
  overflow: ['overflow'],
  display: ['display'],
  reset: ['reset'],
  select: ['select', 'requete'],
  query: ['requete', 'sql'],
  database: ['base de donnees', 'bdd', 'sql'],
  table: ['tableau', 'table'],
  insert: ['insert', 'inserer'],
  update: ['update', 'modifier'],
  route: ['route'],
  middleware: ['middleware'],
  token: ['token', 'jwt'],
  login: ['connexion', 'login', 'auth'],
  test: ['test'],
  commit: ['commit'],
  branch: ['branche', 'branch'],
  closure: ['closure'],
  class: ['classe'],
  module: ['module', 'import'],
  import: ['import', 'module'],
};

const WEAK = new Set([
  'tableau', 'tableaux', 'liste', 'listes', 'element', 'elements', 'fonction', 'fonctions', 'variable',
  'variables', 'valeur', 'valeurs', 'objet', 'objets', 'chaine', 'chaines', 'nombre', 'nombres', 'code',
  'page', 'pages', 'donnee', 'donnees', 'texte', 'type', 'types', 'methode', 'methodes', 'truc', 'chose',
]);

export interface SearchFilters {
  category?: CategoryId | null;
  technology?: Technology | null;
  kind?: ContentKind | null;
}

const FIELDS: { key: keyof IndexedContent; score: number }[] = [
  { key: 'aliases', score: 6 },
  { key: 'keywords', score: 4 },
  { key: 'tech', score: 3 },
  { key: 'summary', score: 2 },
];

function matchTerm(entry: IndexedContent, term: string): number {
  if (entry.title.includes(term)) return entry.title.startsWith(term) ? 12 : 8;
  for (const f of FIELDS) {
    if ((entry[f.key] as string).includes(term)) return f.score;
  }
  return 0;
}

function scoreEntry(entry: IndexedContent, tokens: string[]): { score: number; matched: number } {
  let score = 0;
  let matched = 0;
  for (const token of tokens) {
    const weak = WEAK.has(token);
    const direct = matchTerm(entry, token);
    if (direct > 0) {
      score += weak ? 1 : direct;
      matched += 1;
      continue;
    }
    let best = 0;
    for (const syn of SYNONYMS[token] ?? []) {
      best = Math.max(best, Math.min(matchTerm(entry, syn), 5));
    }
    if (best > 0) {
      score += weak ? 1 : best;
      matched += 1;
    }
  }
  if (entry.content.status === 'ready') score += 1;
  return { score, matched };
}

export function searchContent(query: string, filters: SearchFilters = {}): Content[] {
  const raw = tokenize(query);
  let tokens = raw.filter((t) => t.length > 1 && !STOPWORDS.has(t));
  if (tokens.length === 0) tokens = raw;

  const filtered = INDEX.filter((e) => {
    if (filters.category && CATEGORY_OF[e.content.technology] !== filters.category) return false;
    if (filters.technology && e.content.technology !== filters.technology) return false;
    if (filters.kind && e.content.kind !== filters.kind) return false;
    return true;
  });

  if (tokens.length === 0) {
    return filtered
      .map((e) => e.content)
      .sort((a, b) => Number(b.status === 'ready') - Number(a.status === 'ready'));
  }

  return filtered
    .map((e) => ({ content: e.content, ...scoreEntry(e, tokens) }))
    .filter((r) => r.matched > 0)
    .sort((a, b) => b.matched - a.matched || b.score - a.score)
    .map((r) => r.content);
}
