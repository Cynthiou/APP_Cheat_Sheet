import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils';
import { TemplateView } from '@/components/content/TemplateView';
import { LessonView } from '@/components/content/LessonView';
import { GuideView } from '@/components/content/GuideView';
import { ContentSwitch } from '@/components/content/ContentSwitch';
import { useStateTemplate, useStateLesson } from '@/data/content/react-usestate';
import { guidesContent } from '@/data/content/guides';
import { isGuide } from '@/types/content';

const writeText = vi.fn((_text: string) => Promise.resolve());

beforeEach(() => {
  writeText.mockClear();
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
});

describe('Template : variantes et copie', () => {
  it('affiche les onglets et change le code à la sélection', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TemplateView template={useStateTemplate} />);

    expect(screen.getAllByText(/setCount/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('tab', { name: 'Texte' }));
    expect(screen.getAllByText(/setTexte/).length).toBeGreaterThan(0);
  });

  it('copie le code exact de la variante affichée', async () => {
    renderWithProviders(<TemplateView template={useStateTemplate} />);
    const copyBtn = screen.getAllByRole('button', { name: /copier le code/i })[0];
    fireEvent.click(copyBtn);
    await waitFor(() => expect(writeText).toHaveBeenCalled());
    expect(writeText.mock.calls[0][0]).toContain('useState');
  });

  it('rend les sections « À remplacer » et « Où le mettre »', () => {
    renderWithProviders(<TemplateView template={useStateTemplate} />);
    expect(screen.getByText('À remplacer')).toBeInTheDocument();
    expect(screen.getByText('Où le mettre')).toBeInTheDocument();
  });
});

describe('Leçon', () => {
  it('rend le titre, l’idée et le « À retenir »', () => {
    renderWithProviders(<LessonView lesson={useStateLesson} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Utiliser un state' })).toBeInTheDocument();
    expect(screen.getByText(/À retenir/)).toBeInTheDocument();
  });
});

describe('Bascule Comprendre / Template', () => {
  it('propose les deux directions', () => {
    renderWithProviders(<ContentSwitch current="lesson" lessonSlug="usestate" templateSlug="usestate" />);
    expect(screen.getByRole('link', { name: 'Comprendre' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Template' })).toBeInTheDocument();
  });
});

describe('Guide', () => {
  it('rend les étapes du guide', () => {
    const modale = guidesContent.find((g) => g.slug === 'creer-une-modale');
    expect(modale && isGuide(modale)).toBe(true);
    if (modale && isGuide(modale)) {
      renderWithProviders(<GuideView guide={modale} />);
      expect(screen.getByRole('heading', { level: 1, name: /modale/i })).toBeInTheDocument();
      expect(screen.getByText(/Résultat final/)).toBeInTheDocument();
    }
  });
});
