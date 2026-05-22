import { useState } from 'react';

interface Props {
  breedName: string;
  /** Formspree form ID — replace with your own at https://formspree.io */
  formId?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function LeadGenForm({ breedName, formId = 'YOUR_FORMSPREE_ID' }: Props) {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          breed:   breedName,
          subject: `Alerte santé PetScore™ — ${breedName}`,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-2xl mb-2">🎉</p>
        <p className="font-semibold text-green-800">Vous êtes inscrit !</p>
        <p className="mt-1 text-sm text-green-700">
          Vous recevrez nos conseils santé pour le {breedName} directement dans votre boîte courriel.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <span className="text-2xl">📬</span>
        <div>
          <h2 className="font-display text-lg font-bold text-gray-900">
            Conseils santé pour le {breedName}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Recevez nos fiches santé, alertes de rappels vétérinaires et conseils budgétaires
            adaptés à votre race. Gratuit, sans spam.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@courriel.com"
          aria-label="Adresse courriel"
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-slate-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? 'Envoi…' : 'Recevoir les conseils 🐾'}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-600">
          Une erreur est survenue. Veuillez réessayer ou nous écrire à info@petscore.ca.
        </p>
      )}

      <p className="mt-3 text-xs text-slate-400">
        🔒 Vos données ne sont jamais vendues. Désabonnement en un clic.
      </p>
    </div>
  );
}
