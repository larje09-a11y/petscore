import { useState, useMemo, useEffect } from 'react';
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

type SortKey = 'popularityRank' | 'score' | 'annualVetCost' | 'lifespan';

interface Props {
  breeds: Breed[];
}

const COST_MAX_LIMIT = 5000;

export default function BreedSearch({ breeds }: Props) {
  const [query,       setQuery]       = useState('');
  const [sizeFilter,  setSizeFilter]  = useState<BreedSize | 'all'>('all');
  const [riskFilter,  setRiskFilter]  = useState<RiskLevel | 'all'>('all');
  const [energyMax,   setEnergyMax]   = useState(5);
  const [groomingMax, setGroomingMax] = useState(5);
  const [kidsMin,     setKidsMin]     = useState(1);
  const [budgetMax,   setBudgetMax]   = useState(COST_MAX_LIMIT);
  const [sortBy,      setSortBy]      = useState<SortKey>('popularityRank');
  const [showAdv,     setShowAdv]     = useState(false);

  // Sync state from URL params on mount
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('q'))        setQuery(p.get('q')!);
    if (p.get('size'))     setSizeFilter(p.get('size') as BreedSize | 'all');
    if (p.get('risk'))     setRiskFilter(p.get('risk') as RiskLevel | 'all');
    if (p.get('energy'))   setEnergyMax(Number(p.get('energy')));
    if (p.get('grooming')) setGroomingMax(Number(p.get('grooming')));
    if (p.get('kids'))     setKidsMin(Number(p.get('kids')));
    if (p.get('budget'))   setBudgetMax(Number(p.get('budget')));
    if (p.get('sort'))     setSortBy(p.get('sort') as SortKey);
    if (p.get('adv') === '1') setShowAdv(true);
  }, []);

  // Sync URL params when filters change
  useEffect(() => {
    const p = new URLSearchParams();
    if (query)                  p.set('q', query);
    if (sizeFilter !== 'all')   p.set('size', sizeFilter);
    if (riskFilter !== 'all')   p.set('risk', riskFilter);
    if (energyMax < 5)          p.set('energy', String(energyMax));
    if (groomingMax < 5)        p.set('grooming', String(groomingMax));
    if (kidsMin > 1)            p.set('kids', String(kidsMin));
    if (budgetMax < COST_MAX_LIMIT) p.set('budget', String(budgetMax));
    if (sortBy !== 'popularityRank') p.set('sort', sortBy);
    if (showAdv)                p.set('adv', '1');
    const url = p.toString() ? `?${p.toString()}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }, [query, sizeFilter, riskFilter, energyMax, groomingMax, kidsMin, budgetMax, sortBy, showAdv]);

  const filtered = useMemo(() => {
    let list = [...breeds];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.origin.toLowerCase().includes(q) ||
        b.mainHealthRisks.some(r => r.toLowerCase().includes(q))
      );
    }
    if (sizeFilter !== 'all')   list = list.filter(b => b.size === sizeFilter);
    if (riskFilter !== 'all')   list = list.filter(b => b.riskLevel === riskFilter);
    if (energyMax < 5)          list = list.filter(b => b.traits.energy <= energyMax);
    if (groomingMax < 5)        list = list.filter(b => b.traits.grooming <= groomingMax);
    if (kidsMin > 1)            list = list.filter(b => b.traits.socialWithKids >= kidsMin);
    if (budgetMax < COST_MAX_LIMIT) list = list.filter(b => b.annualVetCost.max <= budgetMax);
    list.sort((a, b) => {
      if (sortBy === 'score')         return b.score - a.score;
      if (sortBy === 'annualVetCost') return a.annualVetCost.max - b.annualVetCost.max;
      if (sortBy === 'lifespan')      return (b.lifespan.min + b.lifespan.max) - (a.lifespan.min + a.lifespan.max);
      return a.popularityRank - b.popularityRank;
    });
    return list;
  }, [breeds, query, sizeFilter, riskFilter, energyMax, groomingMax, kidsMin, budgetMax, sortBy]);

  const hasAdvFilters = groomingMax < 5 || kidsMin > 1 || budgetMax < COST_MAX_LIMIT;
  const hasFilters = query || sizeFilter !== 'all' || riskFilter !== 'all' ||
    energyMax < 5 || hasAdvFilters || sortBy !== 'popularityRank';

  function resetFilters() {
    setQuery(''); setSizeFilter('all'); setRiskFilter('all');
    setEnergyMax(5); setGroomingMax(5); setKidsMin(1);
    setBudgetMax(COST_MAX_LIMIT); setSortBy('popularityRank');
  }

  const chipBase = 'rounded-full border px-3 py-1 text-xs font-semibold transition-all cursor-pointer';
  const chipOn   = 'border-green-500 bg-green-600 text-white';
  const chipOff  = 'border-gray-200 bg-white text-slate-600 hover:border-green-300';

  const fmtCAD = (n: number) => `${new Intl.NumberFormat('fr-CA').format(n)} $`;

  return (
    <div>
      {/* ── Barre de recherche ── */}
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher une race, une origine, un symptôme…"
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* ── Filtres rapides ── */}
      <div className="mb-3 flex flex-wrap gap-2 items-center">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Taille :</span>
        {(['all', 'petit', 'moyen', 'grand'] as const).map(s => (
          <button key={s} onClick={() => setSizeFilter(s)}
            className={`${chipBase} ${sizeFilter === s ? chipOn : chipOff}`}>
            {s === 'all' ? 'Toutes' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-gray-200" />
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Risque :</span>
        {(['all', 'faible', 'moyen', 'élevé'] as const).map(r => (
          <button key={r} onClick={() => setRiskFilter(r)}
            className={`${chipBase} ${riskFilter === r ? chipOn : chipOff}`}>
            {r === 'all' ? 'Tous' : r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Filtre énergie + tri + reset ── */}
      <div className="mb-3 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">⚡ Énergie max :</span>
          <input type="range" min={1} max={5} value={energyMax}
            onChange={e => setEnergyMax(Number(e.target.value))}
            className="h-1.5 w-24 accent-green-600" />
          <span className="text-xs font-bold text-gray-700 w-6">{energyMax}/5</span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Trier :</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs text-slate-600 focus:outline-none focus:border-green-400">
            <option value="popularityRank">Popularité</option>
            <option value="score">PetScore™ ↓</option>
            <option value="annualVetCost">Coût vét. ↑</option>
            <option value="lifespan">Longévité ↓</option>
          </select>
        </div>
      </div>

      {/* ── Filtres avancés (toggle) ── */}
      <div className="mb-4">
        <button
          onClick={() => setShowAdv(!showAdv)}
          className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${showAdv ? 'border-green-200 bg-green-50 text-green-700' : 'border-gray-200 bg-white text-slate-600 hover:bg-gray-50'}`}
        >
          <span>{showAdv ? '▲' : '▼'}</span>
          Filtres avancés
          {hasAdvFilters && <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-white text-xs">!</span>}
        </button>

        {showAdv && (
          <div className="mt-3 grid gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-3">
            {/* Entretien max */}
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">✂️ Entretien max</p>
              <div className="flex items-center gap-2">
                <input type="range" min={1} max={5} value={groomingMax}
                  onChange={e => setGroomingMax(Number(e.target.value))}
                  className="h-1.5 flex-1 accent-green-600" />
                <span className="text-xs font-bold text-gray-700 w-6">{groomingMax}/5</span>
              </div>
              <div className="mt-1 flex gap-0.5">
                {[1,2,3,4,5].map(d => (
                  <div key={d} className={`h-1.5 flex-1 rounded-full ${d <= groomingMax ? 'bg-green-400' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>

            {/* Sociabilité enfants min */}
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">👶 Enfants min</p>
              <div className="flex items-center gap-2">
                <input type="range" min={1} max={5} value={kidsMin}
                  onChange={e => setKidsMin(Number(e.target.value))}
                  className="h-1.5 flex-1 accent-green-600" />
                <span className="text-xs font-bold text-gray-700 w-6">{kidsMin}/5</span>
              </div>
              <div className="mt-1 flex gap-0.5">
                {[1,2,3,4,5].map(d => (
                  <div key={d} className={`h-1.5 flex-1 rounded-full ${d <= kidsMin ? 'bg-blue-400' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>

            {/* Budget vétérinaire max */}
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">💵 Budget vét. max/an</p>
              <div className="flex items-center gap-2">
                <input type="range" min={500} max={COST_MAX_LIMIT} step={250} value={budgetMax}
                  onChange={e => setBudgetMax(Number(e.target.value))}
                  className="h-1.5 flex-1 accent-green-600" />
              </div>
              <p className="mt-1 text-xs font-bold text-gray-700">
                {budgetMax >= COST_MAX_LIMIT ? 'Tous budgets' : `≤ ${fmtCAD(budgetMax)}`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Barre résultats + reset ── */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          <strong className="font-semibold text-gray-700">{filtered.length}</strong> race{filtered.length !== 1 ? 's' : ''}
          {hasFilters ? ' correspondant aux filtres' : ' au total'}
        </p>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button onClick={resetFilters}
              className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-slate-500 hover:bg-gray-50 transition-colors">
              ✕ Réinitialiser
            </button>
          )}
          <button
            onClick={() => { const url = window.location.href; navigator.clipboard?.writeText(url); }}
            className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-slate-500 hover:bg-gray-50 transition-colors"
            title="Copier le lien avec les filtres actifs"
          >
            🔗 Partager
          </button>
        </div>
      </div>

      {/* ── Grille ── */}
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
                className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <svg viewBox="0 0 100 100" className="h-14 w-14 shrink-0 mt-0.5" aria-hidden="true">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke={hex} strokeWidth="10"
                    strokeDasharray={dash} strokeLinecap="round"
                    transform="rotate(-90 50 50)" />
                  <text x="50" y="50" textAnchor="middle" dominantBaseline="middle"
                    fontSize="26" fontWeight="700" fill={hex} fontFamily="Sora, sans-serif">
                    {breed.score}
                  </text>
                </svg>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold text-gray-900 group-hover:text-green-600 transition-colors truncate">
                    {breed.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400 capitalize">
                    {breed.size} · {breed.lifespan.min}–{breed.lifespan.max} ans
                  </p>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${riskBadge(breed.riskLevel)}`}>
                    {riskLabel(breed.riskLevel)}
                  </span>
                  {/* Traits mini */}
                  <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                    {([
                      { icon: '⚡', val: breed.traits.energy },
                      { icon: '✂️', val: breed.traits.grooming },
                      { icon: '🎓', val: breed.traits.trainability },
                      { icon: '👶', val: breed.traits.socialWithKids },
                    ] as const).map(({ icon, val }) => (
                      <div key={icon} className="flex items-center gap-1">
                        <span className="text-xs">{icon}</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(d => (
                            <div key={d} className={`h-1 w-2.5 rounded-full ${d <= val ? 'bg-green-400' : 'bg-gray-100'}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400">
                    Vét. <span className="font-medium text-gray-600">{fmtCAD(breed.annualVetCost.min)}–{fmtCAD(breed.annualVetCost.max)}/an</span>
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
