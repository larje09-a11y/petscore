import { useState, useEffect } from 'react';

const STORAGE_PREFIX = 'petscore_rating_';
const FORM_ID = 'YOUR_FORMSPREE_RATING_ID'; // Remplacer par votre ID Formspree

interface Props {
  breedSlug: string;
  breedName: string;
}

export default function RatingWidget({ breedSlug, breedName }: Props) {
  const storageKey = `${STORAGE_PREFIX}${breedSlug}`;
  const [hover,       setHover]       = useState(0);
  const [selected,    setSelected]    = useState(0);
  const [submitted,   setSubmitted]   = useState(false);
  const [showThanks,  setShowThanks]  = useState(false);

  useEffect(() => {
    const saved = parseInt(localStorage.getItem(storageKey) ?? '0', 10);
    if (saved > 0) { setSelected(saved); setSubmitted(true); }
  }, [storageKey]);

  async function rate(stars: number) {
    if (submitted) return;
    setSelected(stars);
    setSubmitted(true);
    setShowThanks(true);
    localStorage.setItem(storageKey, String(stars));

    // Envoi silencieux à Formspree (best effort)
    try {
      await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ breed: breedName, slug: breedSlug, rating: stars }),
      });
    } catch { /* silencieux */ }
  }

  const displayStars = hover || selected;

  if (showThanks) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 p-4">
        <span className="text-2xl">🙏</span>
        <div>
          <p className="text-sm font-semibold text-green-800">Merci pour votre avis !</p>
          <p className="text-xs text-green-600">
            Vous avez noté la fiche {breedName} : {'⭐'.repeat(selected)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-gray-700">
        Cette fiche vous a-t-elle été utile ?
      </p>
      <div className="flex items-center gap-1" onMouseLeave={() => !submitted && setHover(0)}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            disabled={submitted}
            onMouseEnter={() => !submitted && setHover(star)}
            onClick={() => rate(star)}
            aria-label={`Donner ${star} étoile${star > 1 ? 's' : ''}`}
            className={`text-3xl transition-transform ${submitted ? 'cursor-default' : 'cursor-pointer hover:scale-125'}`}
          >
            {star <= displayStars ? '⭐' : '☆'}
          </button>
        ))}
        {submitted && selected > 0 && (
          <span className="ml-2 text-xs text-slate-400">Votre note : {selected}/5</span>
        )}
      </div>
      {!submitted && (
        <p className="mt-2 text-xs text-slate-400">Cliquez pour évaluer · Anonyme</p>
      )}
    </div>
  );
}
