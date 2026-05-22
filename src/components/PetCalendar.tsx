import { useState, useMemo } from 'react';
import type { Breed } from '@/types/breed';

interface CalEvent {
  label: string;
  emoji: string;
  color: string;
  months: number[]; // 0=Jan … 11=Dec
  tip: string;
}

const MONTH_NAMES = [
  'Janvier','Février','Mars','Avril','Mai','Juin',
  'Juillet','Août','Septembre','Octobre','Novembre','Décembre',
];

function buildCalendar(breed: Breed, ageMonths: number): CalEvent[] {
  const isSenior  = ageMonths >= 84;  // 7 ans
  const isLarge   = breed.size === 'grand';
  const highRisk  = breed.riskLevel === 'élevé';
  const medRisk   = breed.riskLevel === 'moyen';
  const needsDent = breed.traits.grooming >= 3;

  return [
    {
      label:  'Vermifugation',
      emoji:  '💊',
      color:  'bg-blue-100 text-blue-700',
      months: [0, 3, 6, 9],
      tip:    'Administrer le vermifuge recommandé par votre vétérinaire. Adultes en bonne santé : 4×/an.',
    },
    {
      label:  'Antiparasitaires (puces/tiques)',
      emoji:  '🛡️',
      color:  'bg-emerald-100 text-emerald-700',
      months: [2, 3, 4, 5, 6, 7, 8, 9],
      tip:    'Saison des tiques au Québec : mars à octobre. Ne pas interrompre en été.',
    },
    {
      label:  'Vaccination rappel',
      emoji:  '💉',
      color:  'bg-purple-100 text-purple-700',
      months: [3],
      tip:    'Vérifier avec votre vétérinaire les vaccins à rappeler : DA2PP, rage (obligatoire QC), leptospirose, Bordetella.',
    },
    {
      label:  'Bilan de santé annuel',
      emoji:  '🩺',
      color:  'bg-green-100 text-green-700',
      months: [3],
      tip:    'Examen physique complet, pesée, vérification des dents et des articulations.',
    },
    {
      label:  'Soins dentaires',
      emoji:  '🦷',
      color:  'bg-yellow-100 text-yellow-700',
      months: needsDent ? [1, 7] : [5],
      tip:    `Brossage recommandé 2–3×/semaine. Détartrage professionnel${needsDent ? ' 2×/an' : ' annuel'} selon l'accumulation.`,
    },
    ...(isSenior ? [{
      label:  'Bilan sanguin senior',
      emoji:  '🔬',
      color:  'bg-red-100 text-red-700',
      months: [3, 9] as number[],
      tip:    'Après 7 ans : bilan complet biannuel recommandé (glycémie, fonction rénale/hépatique, thyroïde).',
    }] : []),
    ...(isLarge ? [{
      label:  'Contrôle articulaire',
      emoji:  '🦴',
      color:  'bg-orange-100 text-orange-700',
      months: [9] as number[],
      tip:    'Grandes races : vérification des hanches et coudes, dépistage précoce de la dysplasie.',
    }] : []),
    ...(highRisk ? [{
      label:  'Consultation spécialiste',
      emoji:  '👨‍⚕️',
      color:  'bg-rose-100 text-rose-700',
      months: [1, 7] as number[],
      tip:    `Race à risque élevé : ${breed.mainHealthRisks.slice(0,2).join(', ')}. Suivi préventif recommandé 2×/an.`,
    }] : medRisk ? [{
      label:  'Suivi préventif',
      emoji:  '📋',
      color:  'bg-amber-100 text-amber-700',
      months: [9] as number[],
      tip:    `Risque modéré : bilan orienté ${breed.mainHealthRisks[0] ?? 'santé générale'} recommandé annuellement.`,
    }] : []),
    {
      label:  'Dépistage ophtalmologique',
      emoji:  '👁️',
      color:  'bg-sky-100 text-sky-700',
      months: [5],
      tip:    'Examen oculaire annuel recommandé pour dépister précocement l\'atrophie rétinienne et la cataracte.',
    },
  ];
}

interface Props {
  breeds: Breed[];
}

export default function PetCalendar({ breeds }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string>(breeds[0]?.slug ?? '');
  const [ageYears,     setAgeYears]     = useState(2);

  const breed = breeds.find(b => b.slug === selectedSlug) ?? breeds[0];
  const calendar = useMemo(
    () => buildCalendar(breed, ageYears * 12),
    [breed, ageYears],
  );

  // Group events by month
  const byMonth = useMemo(() => {
    const map: Record<number, CalEvent[]> = {};
    for (let m = 0; m < 12; m++) map[m] = [];
    calendar.forEach(ev => ev.months.forEach(m => map[m].push(ev)));
    return map;
  }, [calendar]);

  const [activeEvent, setActiveEvent] = useState<CalEvent | null>(null);

  return (
    <div>
      {/* ── Sélecteurs ── */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Race de votre chien
          </label>
          <select
            value={selectedSlug}
            onChange={e => setSelectedSlug(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
          >
            {breeds.map(b => (
              <option key={b.slug} value={b.slug}>{b.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Âge de votre chien : <span className="text-green-600">{ageYears} an{ageYears > 1 ? 's' : ''}</span>
          </label>
          <input
            type="range" min={0} max={15} value={ageYears}
            onChange={e => setAgeYears(Number(e.target.value))}
            className="w-full accent-green-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-0.5">
            <span>Chiot</span>
            <span>Senior (7 ans+)</span>
            <span>15 ans</span>
          </div>
        </div>
      </div>

      {/* ── Résumé race ── */}
      {breed && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl bg-gray-50 p-4 text-sm">
          <span className="font-semibold text-gray-800">{breed.name}</span>
          <span className="text-slate-400">·</span>
          <span className="capitalize text-slate-600">{breed.size}</span>
          <span className="text-slate-400">·</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            breed.riskLevel === 'faible' ? 'bg-green-100 text-green-700' :
            breed.riskLevel === 'moyen'  ? 'bg-amber-100 text-amber-700' :
            'bg-red-100 text-red-700'
          }`}>
            {breed.riskLevel === 'élevé' ? 'Risque élevé' : breed.riskLevel === 'moyen' ? 'Risque modéré' : 'Risque faible'}
          </span>
          {ageYears >= 7 && (
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
              🧓 Senior — suivi renforcé
            </span>
          )}
        </div>
      )}

      {/* ── Calendrier 12 mois ── */}
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {MONTH_NAMES.map((month, idx) => (
          <div key={idx} className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">{month}</p>
            {byMonth[idx].length === 0 ? (
              <p className="text-xs text-slate-300 italic">Aucun soin prévu</p>
            ) : (
              <div className="flex flex-col gap-1">
                {byMonth[idx].map((ev, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveEvent(activeEvent?.label === ev.label ? null : ev)}
                    className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-left text-xs font-medium transition-all ${ev.color}
                      ${activeEvent?.label === ev.label ? 'ring-2 ring-offset-1 ring-current' : 'hover:opacity-80'}`}
                  >
                    <span>{ev.emoji}</span>
                    <span className="truncate">{ev.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Tooltip détail ── */}
      {activeEvent && (
        <div className={`mt-4 rounded-2xl border p-4 text-sm ${activeEvent.color.replace('100', '50')}`}>
          <p className="font-semibold">{activeEvent.emoji} {activeEvent.label}</p>
          <p className="mt-1 leading-relaxed opacity-90">{activeEvent.tip}</p>
          <button onClick={() => setActiveEvent(null)}
            className="mt-2 text-xs underline opacity-60">
            Fermer
          </button>
        </div>
      )}

      {/* ── Légende ── */}
      <div className="mt-6 rounded-2xl bg-gray-50 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Légende</p>
        <div className="flex flex-wrap gap-2">
          {calendar.map((ev, i) => (
            <span key={i} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${ev.color}`}>
              {ev.emoji} {ev.label}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        ℹ️ Ce calendrier est indicatif. Consultez votre vétérinaire pour adapter le programme de soins à votre chien.
      </p>
    </div>
  );
}
