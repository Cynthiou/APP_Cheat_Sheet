import { useEffect } from 'react';
import { useHistory } from '@/features/history';
import type { FicheTab } from '@/features/history';

export function useTrackHistory(id: string | undefined, tab?: FicheTab) {
  const { push } = useHistory();
  useEffect(() => {
    if (id) push(id, tab);
  }, [id, tab, push]);
}
