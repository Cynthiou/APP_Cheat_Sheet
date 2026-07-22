export type Level = 'debutant' | 'intermediaire' | 'avance';

const LEVEL_BY_TOME: Record<string, Level> = {
  t0: 'debutant',
  t1: 'debutant',
  t1b: 'debutant',
  t2: 'debutant',
  t3: 'debutant',
  t4: 'debutant',
  t5: 'debutant',
  t11: 'debutant',
  t13: 'debutant',
  t6: 'intermediaire',
  t7: 'intermediaire',
  t8: 'intermediaire',
  t9: 'intermediaire',
  t12: 'intermediaire',
  t14: 'intermediaire',
  t15: 'intermediaire',
  t16: 'intermediaire',
  t10: 'avance',
  t17: 'avance',
};

export function levelOfTome(tomeId: string): Level {
  return LEVEL_BY_TOME[tomeId] ?? 'intermediaire';
}

export const LEVEL_LABEL: Record<Level, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
};

export const LEVELS: Level[] = ['debutant', 'intermediaire', 'avance'];
