import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getById } from '@/data/catalog';
import { useFavorites } from '@/features/favorites';
import { NotionCard } from '@/components/search/NotionCard';
import { groupNotions } from '@/utils/notions';
import { TECHNOLOGY_LABEL } from '@/utils/labels';
import type { Content, Technology } from '@/types/content';

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const [tech, setTech] = useState<Technology | null>(null);

  const contents = favorites.map((id) => getById(id)).filter((c): c is Content => c != null);
  const notions = groupNotions(contents);
  const techs = [...new Set(notions.map((n) => n.technology))];
  const shown = tech ? notions.filter((n) => n.technology === tech) : notions;

  return (
    <div className="reading">
      <header className="toc-head">
        <h1 className="title">Favoris</h1>
        <p className="subtitle">Tes fiches gardées sous la main pour y revenir vite.</p>
      </header>

      {notions.length === 0 ? (
        <div className="empty">
          <h3>Aucun favori</h3>
          <p>Ouvre une fiche et clique sur « Favori » pour la retrouver ici.</p>
          <div className="suggestions">
            <Link className="btn btn-primary" to="/bibliotheque">
              Parcourir la bibliothèque
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="chip-row">
            <button
              type="button"
              className={`lib-chip${!tech ? ' active' : ''}`}
              onClick={() => setTech(null)}
            >
              Tous {notions.length}
            </button>
            {techs.map((t) => (
              <button
                key={t}
                type="button"
                className={`lib-chip${tech === t ? ' active' : ''}`}
                onClick={() => setTech(tech === t ? null : t)}
              >
                {TECHNOLOGY_LABEL[t]}
              </button>
            ))}
          </div>

          <div className="lib-grid" style={{ marginTop: 16 }}>
            {shown.map((n) => (
              <NotionCard key={n.key} notion={n} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
