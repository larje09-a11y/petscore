import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Deductible    = 100 | 250 | 500;
type Reimbursement = 70  | 80  | 90;

interface Props {
  basePremium: number;
}

// ─── Algorithme exact (spec) ──────────────────────────────────────────────────

function calculatePremium(
  basePremium: number,
  dogAge: number,
  deductible: Deductible,
  reimbursement: Reimbursement,
): number {
  const ageFactor           = 1 + dogAge * 0.08;
  const deductibleFactor    = deductible    === 100 ? 1.15 : deductible    === 250 ? 1.0 : 0.80;
  const reimbursementFactor = reimbursement === 70  ? 0.90 : reimbursement === 80  ? 1.0 : 1.20;
  return Math.round(basePremium * ageFactor * deductibleFactor * reimbursementFactor);
}

// ─── Données assureurs ────────────────────────────────────────────────────────

const INSURERS = [
  {
    id:         'spot',
    multiplier: 1.00,
    featured:   true,
    badge:      '🏆 Plus populaire',
    badgeClass: 'bg-green-100 text-green-700',
    href:       'https://www.spotpet.com',
    benefits: [
      'Couverture des maladies héréditaires incluse',
      'Délai de carence de seulement 14 jours',
      'Télémédecine vétérinaire 24/7 offerte',
    ],
  },
  {
    id:         'trupanion',
    multiplier: 1.12,
    featured:   false,
    badge:      '🏥 Paiement direct vétérinaire',
    badgeClass: 'bg-blue-100 text-blue-700',
    href:       'https://trupanion.com/canada',
    benefits: [
      'Paiement direct à votre clinique vétérinaire',
      'Aucun plafond annuel de remboursement',
      'Couverture à vie des conditions chroniques',
    ],
  },
  {
    id:         'desjardins',
    multiplier: 0.94,
    featured:   false,
    badge:      '🍁 Confiance locale',
    badgeClass: 'bg-slate-100 text-slate-600',
    href:       'https://www.desjardins.com/assurance-animaux',
    benefits: [
      'Service client 100 % en français au Québec',
      'Rabais membres Desjardins disponibles',
      'Remboursement rapide sous 5 jours ouvrables',
    ],
  },
] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ageLabel(age: number) {
  if (age === 0) return 'moins de 1 an';
  return `${age} an${age > 1 ? 's' : ''}`;
}

// ─── Logo textuel par assureur ────────────────────────────────────────────────

function InsurerLogo({ id }: { id: string }) {
  if (id === 'spot')
    return (
      <span className="font-display text-2xl font-extrabold text-green-600 tracking-tight">
        🐾 Spot
      </span>
    );
  if (id === 'trupanion')
    return (
      <span className="font-display text-2xl font-extrabold text-blue-600 tracking-tight">
        ✚ Trupanion
      </span>
    );
  return (
    <span className="font-display text-2xl font-extrabold text-red-600 tracking-tight">
      🍁 Desjardins
    </span>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function InsuranceCalculator({ basePremium }: Props) {
  const [dogAge,        setDogAge]        = useState(1);
  const [deductible,    setDeductible]    = useState<Deductible>(250);
  const [reimbursement, setReimbursement] = useState<Reimbursement>(80);

  const baseCalc = calculatePremium(basePremium, dogAge, deductible, reimbursement);

  return (
    <div className="space-y-6 font-sans">

      {/* ── En-tête ─────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Estimateur de coûts
          </span>
        </div>
        <h2 className="mt-2 font-display text-xl font-bold text-gray-900">
          Comparez les assurances santé
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Ajustez les paramètres ci-dessous — les primes se recalculent instantanément.
        </p>
      </div>

      {/* ── Contrôles ───────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="space-y-5">

          {/* Slider — Âge */}
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label htmlFor="dog-age" className="text-sm font-semibold text-gray-700">
                Âge du chien
              </label>
              <span className="rounded-full bg-green-100 px-3 py-0.5 text-sm font-bold text-green-700">
                {ageLabel(dogAge)}
              </span>
            </div>
            <input
              id="dog-age"
              type="range"
              min={0}
              max={10}
              step={1}
              value={dogAge}
              onChange={(e) => setDogAge(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-green-600"
              aria-label={`Âge du chien : ${ageLabel(dogAge)}`}
              aria-valuenow={dogAge}
              aria-valuemin={0}
              aria-valuemax={10}
            />
            <div className="mt-1.5 flex justify-between text-xs text-slate-400">
              <span>Chiot</span>
              <span>5 ans</span>
              <span>10 ans</span>
            </div>
          </div>

          <div className="h-px bg-gray-100" aria-hidden="true" />

          {/* Franchise */}
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">Franchise annuelle</p>
              <span className="text-xs text-slate-400">
                {deductible === 100 ? '↑ coût ↑ protection' : deductible === 500 ? '↓ coût ↓ protection' : 'équilibre recommandé'}
              </span>
            </div>
            <div role="radiogroup" aria-label="Franchise annuelle" className="flex gap-2">
              {([100, 250, 500] as Deductible[]).map((val) => (
                <button
                  key={val}
                  type="button"
                  role="radio"
                  aria-checked={deductible === val}
                  onClick={() => setDeductible(val)}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                    deductible === val
                      ? 'bg-green-600 text-white shadow-sm scale-[1.02]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {val} $
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100" aria-hidden="true" />

          {/* Remboursement */}
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">Taux de remboursement</p>
              <span className="text-xs text-slate-400">
                {reimbursement === 90 ? 'couverture maximale' : reimbursement === 70 ? 'économique' : 'couverture standard'}
              </span>
            </div>
            <div role="radiogroup" aria-label="Taux de remboursement" className="flex gap-2">
              {([70, 80, 90] as Reimbursement[]).map((val) => (
                <button
                  key={val}
                  type="button"
                  role="radio"
                  aria-checked={reimbursement === val}
                  onClick={() => setReimbursement(val)}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                    reimbursement === val
                      ? 'bg-blue-600 text-white shadow-sm scale-[1.02]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {val} %
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Cartes assureurs ─────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-3 sm:items-center">
        {INSURERS.map((insurer) => {
          const monthly = Math.round(baseCalc * insurer.multiplier);

          return (
            <article
              key={insurer.id}
              className={[
                'flex flex-col rounded-2xl bg-white p-5',
                'transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5',
                insurer.featured
                  ? 'border-2 border-green-400 shadow-md sm:scale-105 sm:z-10'
                  : 'border border-gray-100 shadow-sm',
              ].join(' ')}
            >
              {/* Logo + badge */}
              <div className="mb-4 space-y-2">
                <InsurerLogo id={insurer.id} />
                <div>
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${insurer.badgeClass}`}>
                    {insurer.badge}
                  </span>
                </div>
              </div>

              {/* Prime calculée */}
              <div className={`mb-4 rounded-xl p-4 text-center ${insurer.featured ? 'bg-green-50' : 'bg-gray-50'}`}>
                <p className="text-xs font-medium text-slate-400">Prime estimée</p>
                <p className={`mt-0.5 font-display text-4xl font-extrabold ${insurer.featured ? 'text-green-600' : 'text-gray-800'}`}>
                  {monthly} $
                </p>
                <p className="text-xs text-slate-400">par mois</p>
              </div>

              {/* Avantages */}
              <ul className="mb-5 flex-1 space-y-2.5">
                {insurer.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-100"
                      aria-hidden="true"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={insurer.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full rounded-xl bg-green-600 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Obtenir ma soumission gratuite →
              </a>
            </article>
          );
        })}
      </div>

      {/* ── Note légale ──────────────────────────────────────────────────────── */}
      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-xs leading-relaxed text-slate-500">
          ⚠️{' '}
          <span className="font-medium text-slate-600">Les primes affichées sont des estimations simulées à titre informatif.</span>{' '}
          Obtenez une soumission officielle directement auprès de l'assureur pour connaître
          votre prix réel.
        </p>
      </div>
    </div>
  );
}
