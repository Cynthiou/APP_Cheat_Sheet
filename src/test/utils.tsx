import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@/features/theme';
import { FavoritesProvider } from '@/features/favorites';
import { HistoryProvider } from '@/features/history';
import { ToastProvider } from '@/features/toast';

function Providers({ children, route }: { children: ReactNode; route: string }) {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <HistoryProvider>
          <ToastProvider>
            <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
          </ToastProvider>
        </HistoryProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export function renderWithProviders(ui: ReactElement, route = '/') {
  return render(<Providers route={route}>{ui}</Providers>);
}
