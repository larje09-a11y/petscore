import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface HealthRisk {
  name: string;
  probability: string;
  costRange: string;
}

interface Props {
  name: string;
  petScore: number;
  longevity: string;
  riskLevel: string;
  topRisks: HealthRisk[];
  estimated10YearCost: number;
  description: string;
}

// ─── Constantes SVG ───────────────────────────────────────────────────────────

const STROKE_R = 88;                        // rayon du tracé dans le viewBox 200×200
const CIRCUMFERENCE = 2 * Math.PI * STROKE_R; // ≈ 552.92

const MAX_COST      = 30_000;
const BASELINE_COST = 4_200;
const ANIM_DURATION = 1_500; // ms

// ─── Helpers couleurs ─────────────────────────────────────────────────────────

function getScoreTheme(score: number) {
  if (score > 80) return { hex: '#16A34A', text: 'text-green-600', border: 'border-green-200', label: 'Excellent' };
  if (score >= 65) return { hex: '#D97706', text: 'text-amber-500', border: 'border-amber-200', label: 'Modéré' };
  return              { hex: '#DC2626', text: 'text-red-600',   border: 'border-red-200',   label: 'À risque' };
}

function getRiskTheme(risk: string) {
  if (risk === 'faible') return { badge: 'bg-green-100 text-green-700', label: 'Faible' };
  if (risk === 'moyen')  return { badge: 'bg-amber-100 text-amber-700', label: 'Modéré' };
  return                         { badge: 'bg-red-100 text-red-700',    label: 'Élevé'  };
}

function getProbTheme(prob: string) {
  const p = prob.toLowerCase();
  if (p.includes('faible')) return 'bg-green-100 text-green-700';
  if (p.includes('modér'))  return 'bg-amber-100 text-amber-700';
  return                           'bg-red-100 text-red-700';
}

// ─── Easing & format ─────────────────────────────────────────────────────────

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

const fmtCAD = (n: number) =>
  `${new Intl.NumberFormat('fr-CA').format(Math.round(n))} $`;

// ─── Composant ────────────────────────────────────────────────────────────────

export default function ScoreDashboard({
  name,
  petScore,
  longevity,
  riskLevel,
  topRisks,
  estimated10YearCost,
  description,
}: Props) {
  // État animé
  const [strokeOffset, setStrokeOffset] = useState(CIRCUMFERENCE);
  const [counter, setCounter]           = useState(0);
  const [barPct, setBarPct]             = useState(0);
  // Accordion
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const rafRef = useRef<number>(0);

  // ── Animation au montage ──────────────────────────────────────────────────
  useEffect(() => {
    const targetOffset = CIRCUMFERENCE * (1 - petScore / 100);
    const targetBar    = (Math.min(estimated10YearCost, MAX_COST) / MAX_COST) * 100;
    let startTs        = 0;

    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const raw = Math.min((ts - startTs) / ANIM_DURATION, 1);
      const t   = easeOutCubic(raw);

      setStrokeOffset(CIRCUMFERENCE + t * (targetOffset - CIRCUMFERENCE));
      setCounter(Math.round(t * petScore));
      setBarPct(t * targetBar);

      if (raw < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [petScore, estimated10YearCost]);

  // ── Thèmes dérivés ────────────────────────────────────────────────────────
  const sc = getScoreTheme(petScore);
  const rc = getRiskTheme(riskLevel);
  const baselinePct = (BASELINE_COST / MAX_COST) * 100;

  return (
    <div className="space-y-5 font-sans">
      {/* ══════════════════════════════════════════════════════════════════════
          BLOC 1 — Score principal
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-3">
          {/* Cercle SVG animé */}
          <svg
            viewBox="0 0 200 200"
            className="w-44 h-44"
            role="img"
            aria-label={`PetScore ${petScore} sur 100`}
          >
            {/* Anneau de fond */}
            <circle
              cx="100" cy="100" r={STROKE_R}
              fill="none" stroke="#E5E7EB" strokeWidth="16"
            />
            {/* Anneau de progression */}
            <circle
              cx="100" cy="100" r={STROKE_R}
              fill="none"
              stroke={sc.hex}
              strokeWidth="16"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
            {/* Score numérique */}
            <text
              x="100" y="88"
              textAnchor="middle" dominantBaseline="middle"
              fontSize="58" fontWeight="800"
              fill={sc.hex} fontFamily="Sora, sans-serif"
            >
              {counter}
            </text>
            <text
              x="100" y="135"
              textAnchor="middle"
              fontSize="20" fill="#94A3B8"
              fontFamily="Inter, sans-serif"
            >
              / 100
            </text>
          </svg>

          {/* Label PetScore™ */}
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            PetScore™
          </p>

          {/* Description */}
          <p className="max-w-md text-center text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOC 2 — Pills résumé rapide
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap justify-center gap-3">
        {/* Espérance de vie */}
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs text-slate-400">Espérance de vie</span>
          <span className="text-sm font-semibold text-gray-800">{longevity}</span>
        </div>

        {/* Score global */}
        <div className={`flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm ${sc.border} ${sc.text}`}>
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-xs opacity-70">Score global</span>
          <span className="text-sm font-semibold">{sc.label}</span>
        </div>

        {/* Niveau de risque */}
        <div className={`flex items-center gap-2 rounded-full px-4 py-2 shadow-sm ${rc.badge}`}>
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-xs opacity-70">Niveau de risque</span>
          <span className="text-sm font-semibold">{rc.label}</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOC 3 — Accordion risques de santé
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-50 px-5 py-4">
          <h3 className="font-display text-base font-semibold text-gray-900">
            Principaux risques de santé
          </h3>
        </div>

        <div className="divide-y divide-gray-50">
          {topRisks.map((risk, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={risk.name}>
                {/* En-tête accordéon */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-150 hover:bg-gray-50"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`risk-panel-${i}`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="truncate text-sm font-medium text-gray-800">
                      {risk.name}
                    </span>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${getProbTheme(risk.probability)}`}>
                      {risk.probability}
                    </span>
                  </span>
                  <ChevronDown
                    className={`ml-3 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {/* Contenu déployable */}
                <div
                  id={`risk-panel-${i}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-3 px-5 pb-5 pt-1">
                    {/* Coût mis en évidence */}
                    <div className="rounded-xl border border-red-100 bg-red-50 p-3.5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
                        Coût estimé au Québec
                      </p>
                      <p className="mt-1 text-xl font-bold text-red-700">{risk.costRange}</p>
                    </div>
                    {/* Phrase explicative */}
                    <p className="text-xs leading-relaxed text-slate-500">
                      Chez le{' '}
                      <span className="font-medium text-slate-700">{name}</span>, cette
                      condition présente une probabilité{' '}
                      <span className="font-medium text-slate-700">
                        {risk.probability.toLowerCase()}
                      </span>
                      . Un dépistage précoce et des visites régulières permettent d'en limiter
                      l'impact sur la qualité de vie et de réduire les coûts à long terme.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOC 4 — Thermomètre financier
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="font-display text-base font-semibold text-gray-900">
          Coût estimé sur 10 ans sans assurance
        </h3>

        {/* Montant mis en évidence */}
        <p className="mt-1 font-display text-5xl font-extrabold text-red-600">
          {fmtCAD(estimated10YearCost)}
        </p>

        {/* Barre de progression */}
        <div className="relative mt-6">
          <div className="h-5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-600"
              style={{ width: `${barPct}%` }}
              role="progressbar"
              aria-valuenow={Math.round((estimated10YearCost / MAX_COST) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progression du coût estimé"
            />
          </div>

          {/* Marqueur coût moyen */}
          <div
            className="absolute top-0 h-5 w-0.5 bg-slate-500/60"
            style={{ left: `${baselinePct}%` }}
            aria-hidden="true"
          />
          <p
            className="absolute top-6 -translate-x-1/2 whitespace-nowrap text-xs text-slate-400"
            style={{ left: `${baselinePct}%` }}
          >
            ↑ Moyen
          </p>
        </div>

        {/* Graduation */}
        <div className="mt-8 flex justify-between text-xs text-slate-400">
          <span>0 $</span>
          <span>15 000 $</span>
          <span>30 000 $</span>
        </div>

        {/* Sous-textes */}
        <p className="mt-5 text-sm leading-relaxed text-slate-500">
          Ce montant représente les soins vétérinaires moyens estimés pour cette race au Québec.
        </p>
        <div className="mt-3 rounded-xl bg-slate-50 p-4">
          <p className="text-xs leading-relaxed text-slate-500">
            <span className="font-semibold text-slate-700">À titre de comparaison</span>, le coût
            moyen pour un chien croisé en bonne santé est d'environ{' '}
            <span className="font-semibold text-slate-700">{fmtCAD(BASELINE_COST)}</span> sur
            10 ans.
          </p>
        </div>
      </div>
    </div>
  );
}
