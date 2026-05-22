import { useState } from 'react';
import type { Breed, BreedSize } from '@/types/breed';

// ─── Coûts estimés par catégorie ─────────────────────────────────────────────

const FOOD_BY_SIZE: Record<BreedSize, number> = {
  petit: 700,
  moyen: 1_100,
  grand: 1_700,
};

const GROOMING_BY_LEVEL: Record<number, number> = {
  1: 0,
  2: 200,
  3: 500,
  4: 900,
  5: 1_400,
};

const MISC_BY_SIZE: Record<BreedSize, number> = {
  petit: 350,
  moyen: 500,
  grand: 700,
};

// Chien croisé de référence
const BASELINE = { food: 900, grooming: 200, vet: 1_200, insurance: 420, misc: 400 };

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmtCAD = (n: number) =>
  `${new Intl.NumberFormat('fr-CA').format(Math.round(n))} $`;

function pct(value: number, max: number) {
  return Math.min(100, Math.round((value / max) * 100));
}

interface CostRow {
  label: string;
  icon: string;
  note: string;
  min: number;
  mid: number;
  max: number;
  baseline: number;
}

// ─── Composant ────────────────────────────────────────────────────────────────

interface Props {
  breed: Breed;
}

export default function BudgetCalculator({ breed }: Props) {
  const [view, setView] = useState<'annuel' | '10ans'>('annuel');

  const food     = FOOD_BY_SIZE[breed.size];
  const grooming = GROOMING_BY_LEVEL[breed.traits.grooming] ?? 500;
  const misc     = MISC_BY_SIZE[breed.size];

  const vetMin = breed.annualVetCost.min;
  const vetMax = breed.annualVetCost.max;
  const vetMid = Math.round((vetMin + vetMax) / 2);

  const insMin = breed.insuranceMonthly.min * 12;
  const insMax = breed.insuranceMonthly.max * 12;
  const insMid = Math.round((insMin + insMax) / 2);

  const totalMin = food + grooming + vetMin + insMin + misc;
  const totalMid = food + grooming + vetMid + insMid + misc;
  const totalMax = food + grooming + vetMax + insMax + misc;

  const baselineTotal =
    BASELINE.food + BASELINE.grooming + BASELINE.vet + BASELINE.insurance + BASELINE.misc;

  const factor = view === '10ans' ? 10 : 1;
  const MAX_BAR = (view === '10ans' ? 50_000 : 6_000);

  const rows: CostRow[] = [
    {
      label: 'Nourriture',
      icon: '🍖',
      note: `Estimé pour une race ${breed.size === 'petit' ? 'petite' : breed.size === 'moyen' ? 'moyenne' : 'grande'}`,
      min: food, mid: food, max: food,
      baseline: BASELINE.food,
    },
    {
      label: 'Toilettage',
      icon: '✂️',
      note: `Niveau ${breed.traits.grooming}/5 — ${breed.traits.grooming >= 4 ? 'entretien intensif' : breed.traits.grooming >= 3 ? 'entretien modéré' : 'entretien minimal'}`,
      min: grooming, mid: grooming, max: grooming,
      baseline: BASELINE.grooming,
    },
    {
      label: 'Soins vétérinaires',
      icon: '🏥',
      note: 'Visites de routine + imprévus estimés pour la race',
      min: vetMin, mid: vetMid, max: vetMax,
      baseline: BASELINE.vet,
    },
    {
      label: 'Assurance santé',
      icon: '🛡️',
      note: `${breed.insuranceMonthly.min}–${breed.insuranceMonthly.max} $/mois (estimation)`,
      min: insMin, mid: insMid, max: insMax,
      baseline: BASELINE.insurance,
    },
    {
      label: 'Accessoires & divers',
      icon: '🎾',
      note: 'Jouets, laisse, collier, literie, transport',
      min: misc, mid: misc, max: misc,
      baseline: BASELINE.misc,
    },
  ];

  return (
    <div className="space-y-5 font-sans">

      {/* En-tête */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Budget réel
          </span>
        </div>
        <h2 className="mt-2 font-display text-xl font-bold text-gray-900">
          Coût total de possession
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Vétérinaire, nourriture, toilettage, assurance — tout compris.
        </p>
      </div>

      {/* Toggle annuel / 10 ans */}
      <div className="flex gap-2 rounded-2xl bg-gray-100 p-1">
        {(['annuel', '10ans'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all duration-200 ${
              view === v ? 'bg-white text-gray-900 shadow-sm' : 'text-slate-500 hover:text-gray-700'
            }`}
          >
            {v === 'annuel' ? 'Par année' : 'Sur 10 ans'}
          </button>
        ))}
      </div>

      {/* Total mis en évidence */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
          Estimation totale {view === '10ans' ? 'sur 10 ans' : 'par année'}
        </p>
        <p className="mt-1 font-display text-4xl font-extrabold text-amber-700">
          {fmtCAD(totalMid * factor)}
        </p>
        <p className="mt-1 text-xs text-amber-600">
          Fourchette : {fmtCAD(totalMin * factor)} – {fmtCAD(totalMax * factor)}
        </p>
      </div>

      {/* Détail par poste */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-50 px-5 py-4">
          <h3 className="font-display text-base font-semibold text-gray-900">
            Répartition des coûts
          </h3>
        </div>

        <div className="divide-y divide-gray-50 px-5">
          {rows.map((row) => {
            const val    = row.mid * factor;
            const valMax = row.max * factor;
            const base   = row.baseline * factor;
            const barW   = pct(valMax, MAX_BAR);
            const baseW  = pct(base, MAX_BAR);
            const isHigher = val > base;

            return (
              <div key={row.label} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">{row.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{row.label}</p>
                      <p className="text-xs text-slate-400">{row.note}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{fmtCAD(val)}</p>
                    {row.min !== row.max && (
                      <p className="text-xs text-slate-400">max {fmtCAD(valMax)}</p>
                    )}
                  </div>
                </div>

                {/* Barre comparative */}
                <div className="relative mt-2.5 h-2.5 w-full overflow-visible rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-700"
                    style={{ width: `${barW}%` }}
                  />
                  {/* Marqueur baseline */}
                  <div
                    className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-slate-400"
                    style={{ left: `${baseW}%` }}
                    title={`Moyenne chien croisé : ${fmtCAD(base)}`}
                  />
                </div>

                {isHigher && (
                  <p className="mt-1 text-right text-xs text-slate-400">
                    +{fmtCAD(val - base)} vs race croisée
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparaison race croisée */}
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">
            🐕 Chien croisé (référence)
          </p>
          <p className="text-sm font-bold text-slate-700">
            {fmtCAD(baselineTotal * factor)}
          </p>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-slate-400"
            style={{ width: `${pct(baselineTotal * factor, MAX_BAR)}%` }}
          />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          ⚠️ <span className="font-medium">Ces estimations sont indicatives</span> et varient
          selon la région du Québec, la clinique vétérinaire et les habitudes de soins.
          Elles n'incluent pas les dépenses exceptionnelles (chirurgies majeures, urgences).
        </p>
      </div>
    </div>
  );
}
