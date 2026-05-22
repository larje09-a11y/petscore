import type { Breed, RiskLevel } from '@/types/breed';

// Score thresholds
export function getScoreColor(score: number): string {
  if (score > 80) return 'text-green-600';
  if (score >= 65) return 'text-amber-500';
  return 'text-red-600';
}

export function getScoreBgColor(score: number): string {
  if (score > 80) return 'bg-green-600';
  if (score >= 65) return 'bg-amber-500';
  return 'bg-red-600';
}

export function getScoreHex(score: number): string {
  if (score > 80) return '#16A34A';
  if (score >= 65) return '#F59E0B';
  return '#DC2626';
}

export function getRiskLabel(riskLevel: RiskLevel): string {
  const labels: Record<RiskLevel, string> = {
    faible: 'Risque faible',
    moyen: 'Risque modéré',
    élevé: 'Risque élevé',
  };
  return labels[riskLevel];
}

export function getRiskBadgeClass(riskLevel: RiskLevel): string {
  const classes: Record<RiskLevel, string> = {
    faible: 'bg-green-100 text-green-700',
    moyen: 'bg-amber-100 text-amber-700',
    élevé: 'bg-red-100 text-red-700',
  };
  return classes[riskLevel];
}

export function getSimilarBreeds(breeds: Breed[], current: Breed, count = 3): Breed[] {
  return breeds
    .filter((b) => b.size === current.size && b.slug !== current.slug)
    .slice(0, count);
}

// SVG circle stroke-dasharray for score ring (r=44, circumference≈276.46)
const CIRCUMFERENCE = 2 * Math.PI * 44;
export function getScoreDashArray(score: number): string {
  const filled = (score / 100) * CIRCUMFERENCE;
  return `${filled.toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}`;
}

// AdoptScore — composite score (0–100) combining health, trainability, cost & family fit
export function computeAdoptScore(breed: Breed): number {
  const healthPts  = (breed.score / 100) * 40;
  const trainPts   = (breed.traits.trainability / 5) * 20;
  const costPts    = (1 - Math.min(breed.annualVetCost.max / 3_500, 1)) * 20;
  const socialPts  = (breed.traits.socialWithKids / 5) * 20;
  return Math.round(healthPts + trainPts + costPts + socialPts);
}

export function getAdoptScoreLabel(score: number): { label: string; colorClass: string } {
  if (score >= 80) return { label: 'Excellent choix',       colorClass: 'text-green-600'  };
  if (score >= 65) return { label: 'Bon choix',             colorClass: 'text-amber-500'  };
  if (score >= 50) return { label: 'Choix intermédiaire',   colorClass: 'text-orange-500' };
  return               { label: 'Nécessite expérience',     colorClass: 'text-red-600'    };
}

export function getAdoptScoreHex(score: number): string {
  if (score >= 80) return '#16A34A';
  if (score >= 65) return '#F59E0B';
  if (score >= 50) return '#F97316';
  return '#DC2626';
}
