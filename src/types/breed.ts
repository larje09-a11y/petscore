export interface CostRange {
  min: number;
  max: number;
}

export interface BreedTraits {
  energy: number;        // 1–5
  grooming: number;      // 1–5
  trainability: number;  // 1–5
  socialWithKids: number; // 1–5
}

export type RiskLevel = 'faible' | 'moyen' | 'élevé';
export type BreedSize = 'petit' | 'moyen' | 'grand';

export interface HealthRiskWithCost {
  name: string;
  estimatedCost: string;
}

export interface Breed {
  name: string;
  slug: string;
  popularityRank: number;
  score: number;
  riskLevel: RiskLevel;
  size: BreedSize;
  weight: CostRange;
  lifespan: CostRange;
  origin: string;
  description: string;
  mainHealthRisks: string[];
  healthRisksWithCosts?: HealthRiskWithCost[];
  annualVetCost: CostRange;
  insuranceMonthly: CostRange;
  traits: BreedTraits;
}
