import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { ThemeProvider } from '@/features/theme';
import { FavoritesProvider } from '@/features/favorites';
import { HistoryProvider } from '@/features/history';
import { ToastProvider } from '@/features/toast';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { SearchPage } from '@/pages/SearchPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { FichePage } from '@/pages/FichePage';
import { GuidesPage } from '@/pages/GuidesPage';
import { GuidePage } from '@/pages/GuidePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function RedirectToFiche({ vue }: { vue?: boolean }) {
  const { slug } = useParams();
  return <Navigate to={`/fiche/${slug}${vue ? '?vue=comprendre' : ''}`} replace />;
}

export function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <HistoryProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<RootLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explorer" element={<ExplorePage />} />
                  <Route path="/bibliotheque" element={<ExplorePage />} />
                  <Route path="/recherche" element={<SearchPage />} />
                  <Route path="/favoris" element={<FavoritesPage />} />
                  <Route path="/historique" element={<HistoryPage />} />
                  <Route path="/guides" element={<GuidesPage />} />
                  <Route path="/fiche/:slug" element={<FichePage />} />
                  <Route path="/lecon/:slug" element={<RedirectToFiche vue />} />
                  <Route path="/template/:slug" element={<RedirectToFiche />} />
                  <Route path="/guide/:slug" element={<GuidePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </HistoryProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
