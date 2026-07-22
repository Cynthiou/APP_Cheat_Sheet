import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="reading">
      <div className="empty">
        <h3>Page introuvable</h3>
        <p>Cette adresse ne correspond à aucun contenu.</p>
        <div className="suggestions">
          <Link className="btn btn-primary" to="/recherche">
            Rechercher
          </Link>
          <Link className="btn" to="/">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
