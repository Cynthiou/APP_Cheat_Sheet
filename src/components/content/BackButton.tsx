import { useNavigate } from 'react-router-dom';

export function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="back-btn"
      onClick={() => {
        if (window.history.length > 1) navigate(-1);
        else navigate('/explorer');
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Retour
    </button>
  );
}
