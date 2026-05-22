import { useState, useMemo } from 'react';
import type { Breed, RiskLevel, BreedSize } from '@/types/breed';

const CIRCUMFERENCE = 2 * Math.PI * 44;

function scoreHex(s: number) {
  if (s > 80) return '#16A34A';
  if (s >= 65) return '#F59E0B';
  return '#DC2626';
}
function dashArray(s: number) {
  const f = (s / 100) * CIRCUMFERENCE;
  return `${f.toFixed(1)} ${CIRCUMFERENCE.toFixed(1)}`;
}
function riskBadge(r: RiskLevel) {
  const m: Record<RiskLevel, string> = {
    faible: 'bg-green-100 text-green-700',
    moyen:  'bg-amber-100 text-amber-700',
    élevé:  'bg-red-100 text-red-700',
  };
  return m[r];
}
function riskLabel(r: RiskLevel) {
  const m: Record<RiskLevel, string> = {
    faible: 'Risque faible',
    moyen:  'Risque modéré',
    élevé:  'Risque élevé',
  };
  return m[r];
}

type SortKey = 'popularityRank' | 'score' | 'annualVetCost';

interface Props {
  breeds: Breed[];
}

export default function BreedSearch({ breeds }: Props) {
  const [query,      setQuery]      = useState('');
  const [sizeFilter, setSizeFilter] = useState<BreedSize | 'all'>('all');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');
  const [energyMax,  setEnergyMax]  = useState<number>(5);
  const [sortBy,     setSortBy]     = useState<SortKey>('popularityRank');

  const filtered = useMemo(() => {
    let list = [...breeds];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.origin.toLowerCase().includes(q),
      );
    }
    if (sizeFilter !== 'all') list = list.filter(b => b.size === sizeFilter);
    if (riskFilter !== 'all') list = list.filter(b => b.riskLevel === riskFilter);
    if (energyMax < 5)        list = list.filter(b => b.traits.energy <= energyMax);
    list.sort((a, b) => {
      if (sortBy === 'score')          return b.score - a.score;
      if (sortBy === 'annualVetCost')  return a.annualVetCost.max - b.annualVetCost.max;
      return a.popularityRank - b.popularityRank;
    });
    return list;
  }, [breeds, query, sizeFilter, riskFilter, energyMax, sortBy]);

  function resetFilters() {
    setQuery(''); setSizeFilter('all'); setRiskFilter('all');
    setEnergyMax(5); setSortBy('popularityRank');
  }

  const hasFilters = query || sizeFilter !== 'all' || riskFilter !== 'all' || energyMax < 5 || sortBy !== 'popularityRank';

  const chipBase = 'rounded-full border px-3 py-1 text-xs font-semibold transition-all cursor-pointer';
  const chipOn   = 'border-green-500 bg-green-600 text-white';
  const chipOff  = 'border-gray-200 bg-white text-slate-600 hover:border-green-300';

  return (
    <div>
      {/* ── Search bar ── */}
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher une race ou une origine…"
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* ── Filters ── */}
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        {/* Taille */}
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Taille :</span>
        {(['all', 'petit', 'moyen', 'grand'] as const).map(s => (
          <button key={s} onClick={() => setSizeFilter(s)}
            className={`${chipBase} ${sizeFilter === s ? chipOn : chipOff}`}>
            {s === 'all' ? 'Toutes' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-gray-200" />
        {/* Risque */}
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Risque :</span>
        {(['all', 'faible', 'moyen', 'élevé'] as const).map(r => (
          <button key={r} onClick={() => setRiskFilter(r)}
            className={`${chipBase} ${riskFilter === r ? chipOn : chipOff}`}>
            {r === 'all' ? 'Tous' : r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Sort + energy + reset ── */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
            Énergie max :
          </label>
          <input type="range" min={1} max={5} value={energyMax}
            onChange={e => setEnergyMax(Number(e.target.value))}
            className="h-1.5 w-24 accent-green-600" />
          <span className="text-xs font-bold text-gray-700">{energyMax}/5</span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Trier :</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs text-slate-600 focus:outline-none focus:border-green-400">
            <option value="popularityRank">Popularité</option>
            <option value="score">PetScore™ ↓</option>
            <option value="annualVetCost">Coût vét. ↑</option>
          </select>
          {hasFilters && (
            <button onClick={resetFilters}
              className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-slate-500 hover:bg-gray-50 transition-colors">
              ✕ Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* ── Results count ── */}
      <p className="mb-4 text-sm text-slate-400">
        <strong className="font-semibold text-gray-700">{filtered.length}</strong> race{filtered.length !== 1 ? 's' : ''}
        {hasFilters ? ' correspondant aux filtres' : ' au total'}
      </p>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 py-12 text-center">
          <p className="text-slate-500">Aucune race ne correspond à ces filtres.</p>
          <button onClick={resetFilters} className="mt-3 text-sm text-green-600 hover:underline">
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(breed => {
            const hex  = scoreHex(breed.score);
            const dash = dashArray(breed.score);
            return (
              <a key={breed.slug} href={`/fr/races/${breed.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <svg viewBox="0 0 100 100" className="h-14 w-14 shrink-0" aria-hidden="true">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke={hex} strokeWidth="10"
                    strokeDasharray={dash} strokeLinecap="round"
                    transform="rotate(-90 50 50)" />
                  <text x="50" y="50" textAnchor="middle" dominantBaseline="middle"
                    fontSize="26" fontWeight="700" fill={hex} fontFamily="Sora, sans-serif">
                    {breed.score}
                  </text>
                </svg>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-gray-900 group-hover:text-green-600 transition-colors truncate">
                    {breed.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400 capitalize">{breed.size} · {breed.origin}</p>
                  <span className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${riskBadge(breed.riskLevel)}`}>
                    {riskLabel(breed.riskLevel)}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
