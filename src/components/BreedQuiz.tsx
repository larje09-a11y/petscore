import { useState } from 'react';
import type { Breed } from '@/types/breed';

// ─── Types ────────────────────────────────────────────────────────────────────

type Logement   = 'appartement' | 'maison' | 'grande_propriete';
type Activite   = 'sedentaire'  | 'modere' | 'actif';
type Experience = 'debutant'    | 'intermediaire' | 'expert';
type Budget     = 'serre'       | 'confortable'   | 'genereux';
type Enfants    = 'non'         | 'oui';
type Allergies  = 'non'         | 'oui';

interface Answers {
  logement?:   Logement;
  activite?:   Activite;
  experience?: Experience;
  budget?:     Budget;
  enfants?:    Enfants;
  allergies?:  Allergies;
}

interface BreedResult {
  breed: Breed;
  compatibility: number;
}

// Races hypoallergéniques (faible sécrétion de Fel d1 / peu de poils)
const HYPO_SLUGS = new Set([
  'caniche', 'bichon-frise', 'maltais', 'schnauzer-miniature',
  'bichon-havanais', 'coton-de-tulear', 'basenji', 'yorkshire-terrier',
  'berger-de-shetland',
]);

// ─── Algorithme de compatibilité ─────────────────────────────────────────────

function scoreBreed(breed: Breed, a: Required<Answers>): number {
  let score = 100;

  // Logement × taille / énergie
  if (a.logement === 'appartement') {
    if (breed.size === 'grand') score -= 25;
    if (breed.traits.energy >= 5) score -= 20;
    if (breed.traits.energy <= 2) score += 5;
  } else if (a.logement === 'grande_propriete') {
    if (breed.traits.energy >= 4) score += 8;
    if (breed.size === 'grand')   score += 5;
  }

  // Activité × énergie (diff au carré atténuée)
  const energyTarget = a.activite === 'sedentaire' ? 1.5 : a.activite === 'modere' ? 3 : 5;
  score -= Math.abs(energyTarget - breed.traits.energy) * 12;

  // Expérience × trainabilité
  if (a.experience === 'debutant') {
    if (breed.traits.trainability <= 2) score -= 30;
    if (breed.traits.trainability >= 4) score += 10;
    if (breed.size === 'grand' && breed.traits.energy >= 4) score -= 15;
  } else if (a.experience === 'expert') {
    if (breed.traits.trainability >= 4) score += 5;
  }

  // Budget × coûts vétérinaires
  const budgetMax = a.budget === 'serre' ? 1_000 : a.budget === 'confortable' ? 2_500 : Infinity;
  if (breed.annualVetCost.max > budgetMax) {
    score -= Math.min(40, ((breed.annualVetCost.max - budgetMax) / 500) * 8);
  }

  // Enfants × socialWithKids
  if (a.enfants === 'oui') {
    if (breed.traits.socialWithKids <= 2) score -= 30;
    if (breed.traits.socialWithKids >= 4) score += 10;
  }

  // Allergies × hypoallergénique
  if (a.allergies === 'oui') {
    score += HYPO_SLUGS.has(breed.slug) ? 20 : -20;
  }

  // Bonus santé
  if (breed.score >= 80) score += 5;
  if (breed.riskLevel === 'élevé') score -= 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

// ─── Helpers UI ──────────────────────────────────────────────────────────────

function getScoreHex(score: number) {
  if (score > 80) return '#16A34A';
  if (score >= 65) return '#F59E0B';
  return '#DC2626';
}

function CompatBar({ pct }: { pct: number }) {
  const color = pct >= 75 ? '#16A34A' : pct >= 50 ? '#F59E0B' : '#DC2626';
  return (
    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

// ─── Steps definition ────────────────────────────────────────────────────────

const STEPS = [
  {
    key: 'logement' as const,
    title: 'Votre logement',
    subtitle: 'Quel type de logement habitez-vous ?',
    options: [
      { value: 'appartement',    label: 'Appartement',        emoji: '🏢', desc: 'Sans cour extérieure' },
      { value: 'maison',         label: 'Maison avec cour',   emoji: '🏡', desc: 'Cour clôturée' },
      { value: 'grande_propriete', label: 'Grande propriété', emoji: '🌲', desc: 'Espace extérieur vaste' },
    ],
  },
  {
    key: 'activite' as const,
    title: 'Votre style de vie',
    subtitle: 'Quelle est votre activité physique quotidienne ?',
    options: [
      { value: 'sedentaire', label: 'Calme',     emoji: '🛋️', desc: 'Promenades courtes' },
      { value: 'modere',     label: 'Modéré',    emoji: '🚶', desc: 'Sorties régulières' },
      { value: 'actif',      label: 'Très actif', emoji: '🏃', desc: 'Running, randonnée, sport' },
    ],
  },
  {
    key: 'experience' as const,
    title: 'Votre expérience',
    subtitle: 'Avez-vous déjà eu des chiens ?',
    options: [
      { value: 'debutant',       label: 'Débutant',      emoji: '🌱', desc: 'Premier chien' },
      { value: 'intermediaire',  label: 'Intermédiaire', emoji: '🐾', desc: 'Quelques années d\'expérience' },
      { value: 'expert',         label: 'Expérimenté',   emoji: '🏆', desc: 'Plusieurs races gérées' },
    ],
  },
  {
    key: 'budget' as const,
    title: 'Votre budget vétérinaire',
    subtitle: 'Quel budget annuel prévoyez-vous pour les soins ?',
    options: [
      { value: 'serre',        label: 'Serré',        emoji: '💰',  desc: 'Moins de 1 000 $ / an' },
      { value: 'confortable',  label: 'Confortable',  emoji: '💰💰', desc: '1 000 – 2 500 $ / an' },
      { value: 'genereux',     label: 'Généreux',     emoji: '💰💰💰', desc: 'Plus de 2 500 $ / an' },
    ],
  },
  {
    key: 'enfants' as const,
    title: 'Enfants à la maison',
    subtitle: 'Y a-t-il des enfants dans votre foyer ?',
    options: [
      { value: 'non', label: 'Non',  emoji: '👤', desc: 'Adulte(s) seulement' },
      { value: 'oui', label: 'Oui',  emoji: '👨‍👩‍👧', desc: 'Enfants présents' },
    ],
  },
  {
    key: 'allergies' as const,
    title: 'Allergies',
    subtitle: 'Y a-t-il des allergies aux poils ou à la dander dans votre foyer ?',
    options: [
      { value: 'non', label: 'Non',  emoji: '✅', desc: 'Aucune allergie connue' },
      { value: 'oui', label: 'Oui',  emoji: '🤧', desc: 'Allergie aux poils / dander' },
    ],
  },
] as const;

// ─── Composant principal ──────────────────────────────────────────────────────

interface Props {
  breeds: Breed[];
}

export default function BreedQuiz({ breeds }: Props) {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<BreedResult[] | null>(null);

  const currentStep = STEPS[step];
  const totalSteps  = STEPS.length;
  const progress    = ((step) / totalSteps) * 100;

  function handleAnswer(key: keyof Answers, value: string) {
    const newAnswers = { ...answers, [key]: value } as Answers;
    setAnswers(newAnswers);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Calcul des résultats
      const scored = breeds
        .map((breed) => ({
          breed,
          compatibility: scoreBreed(breed, newAnswers as Required<Answers>),
        }))
        .sort((a, b) => b.compatibility - a.compatibility)
        .slice(0, 3);
      setResults(scored);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setResults(null);
  }

  // ── Écran de résultats ────────────────────────────────────────────────────
  if (results) {
    return (
      <div className="space-y-6 font-sans">
        <div className="text-center">
          <div className="mb-2 text-4xl">🎉</div>
          <h2 className="font-display text-2xl font-bold text-gray-900">
            Vos races idéales
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Basé sur vos réponses — cliquez sur une race pour voir sa fiche complète.
          </p>
        </div>

        <div className="space-y-4">
          {results.map(({ breed, compatibility }, idx) => {
            const hex   = getScoreHex(breed.score);
            const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
            return (
              <a
                key={breed.slug}
                href={`/fr/races/${breed.slug}`}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Médaille + Score SVG */}
                <div className="relative shrink-0">
                  <svg viewBox="0 0 80 80" className="h-16 w-16" aria-hidden="true">
                    <circle cx="40" cy="40" r="35" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                    <circle
                      cx="40" cy="40" r="35" fill="none"
                      stroke={hex} strokeWidth="8"
                      strokeDasharray={`${(breed.score / 100) * 2 * Math.PI * 35} ${2 * Math.PI * 35}`}
                      strokeLinecap="round"
                      transform="rotate(-90 40 40)"
                    />
                    <text x="40" y="38" textAnchor="middle" dominantBaseline="middle"
                      fontSize="20" fontWeight="800" fill={hex} fontFamily="Sora, sans-serif">
                      {breed.score}
                    </text>
                    <text x="40" y="53" textAnchor="middle"
                      fontSize="9" fill="#94A3B8" fontFamily="Inter, sans-serif">
                      /100
                    </text>
                  </svg>
                  <span className="absolute -top-1 -right-1 text-lg">{medal}</span>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-gray-900 hover:text-green-600 transition-colors">
                    {breed.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400 capitalize">
                    {breed.size} · {breed.origin}
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-600">Compatibilité</span>
                      <span className="font-bold" style={{ color: getScoreHex(compatibility) }}>
                        {compatibility} %
                      </span>
                    </div>
                    <CompatBar pct={compatibility} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Résumé des réponses */}
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Vos réponses
          </p>
          <div className="flex flex-wrap gap-2">
            {STEPS.map((s) => {
              const val = answers[s.key as keyof Answers];
              const opt = s.options.find((o) => o.value === val);
              if (!opt) return null;
              return (
                <span key={s.key} className="rounded-full bg-white px-3 py-1 text-xs text-slate-600 shadow-sm border border-gray-100">
                  {opt.emoji} {opt.label}
                </span>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={reset}
          className="w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-gray-50"
        >
          ↩ Recommencer le quiz
        </button>
      </div>
    );
  }

  // ── Étape courante ────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 font-sans">

      {/* Barre de progression */}
      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
          <span>Étape {step + 1} sur {totalSteps}</span>
          <span>{Math.round(progress)} %</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
          {currentStep.title}
        </p>
        <h2 className="mt-1 font-display text-xl font-bold text-gray-900">
          {currentStep.subtitle}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentStep.options.map((opt) => {
          const isSelected = answers[currentStep.key as keyof Answers] === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleAnswer(currentStep.key as keyof Answers, opt.value)}
              className={[
                'flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200',
                isSelected
                  ? 'border-green-400 bg-green-50 shadow-sm'
                  : 'border-gray-100 bg-white hover:border-green-200 hover:bg-green-50/50 shadow-sm',
              ].join(' ')}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl">
                {opt.emoji}
              </span>
              <div>
                <p className="font-display font-semibold text-gray-900">{opt.label}</p>
                <p className="mt-0.5 text-xs text-slate-400">{opt.desc}</p>
              </div>
              {isSelected && (
                <span className="ml-auto text-green-500" aria-hidden="true">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Navigation retour */}
      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Étape précédente
        </button>
      )}
    </div>
  );
}
