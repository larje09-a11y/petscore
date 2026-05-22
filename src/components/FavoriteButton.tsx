import { useState, useEffect } from 'react';

const STORAGE_KEY = 'petscore_favorites';

function getFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function toggleFavorite(slug: string): boolean {
  const favs = getFavorites();
  const idx = favs.indexOf(slug);
  if (idx === -1) {
    favs.push(slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    return true;
  } else {
    favs.splice(idx, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    return false;
  }
}

interface Props {
  slug: string;
  name: string;
}

export default function FavoriteButton({ slug, name }: Props) {
  const [saved, setSaved] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setSaved(getFavorites().includes(slug));
  }, [slug]);

  function handleClick() {
    const nowSaved = toggleFavorite(slug);
    setSaved(nowSaved);
    setFlash(true);
    setTimeout(() => setFlash(false), 1200);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? `Retirer ${name} des favoris` : `Ajouter ${name} aux favoris`}
      title={saved ? 'Retirer des favoris' : 'Sauvegarder cette race'}
      className={`
        inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium
        transition-all duration-200
        ${saved
          ? 'border-pink-200 bg-pink-50 text-pink-600 hover:bg-pink-100'
          : 'border-gray-200 bg-white text-slate-500 hover:border-pink-200 hover:text-pink-500'
        }
        ${flash ? 'scale-110' : 'scale-100'}
      `}
    >
      <span className="text-base leading-none">{saved ? '❤️' : '🤍'}</span>
      <span>{saved ? 'Sauvegardé' : 'Sauvegarder'}</span>
    </button>
  );
}

// ── Composant mini (icône seule, pour les cartes) ──────────────
export function FavoriteIcon({ slug }: { slug: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getFavorites().includes(slug));
  }, [slug]);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault(); // ne pas naviguer si le bouton est dans un <a>
    const nowSaved = toggleFavorite(slug);
    setSaved(nowSaved);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className="absolute right-3 top-3 text-xl transition-transform hover:scale-125"
    >
      {saved ? '❤️' : '🤍'}
    </button>
  );
}
