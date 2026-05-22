/**
 * breedPrices.ts
 * Prix d'achat moyens estimés au Québec (CAD) par race.
 * Sources: annonces Kijiji/PuppyFind QC, éleveurs certifiés CKC, 2024-2025.
 */

export interface PurchasePrice {
  min: number;
  max: number;
}

export const breedPurchasePrices: Record<string, PurchasePrice> = {
  "labrador-retriever":         { min: 1500, max: 2500 },
  "golden-retriever":           { min: 1500, max: 2800 },
  "bouledogue-francais":        { min: 3000, max: 5500 },
  "berger-allemand":            { min: 1200, max: 2800 },
  "caniche":                    { min: 1500, max: 2800 },
  "beagle":                     { min:  800, max: 1500 },
  "rottweiler":                 { min: 1500, max: 2500 },
  "yorkshire-terrier":          { min: 1200, max: 2500 },
  "boxer":                      { min: 1200, max: 2200 },
  "border-collie":              { min:  800, max: 1800 },
  "husky-siberien":             { min:  800, max: 1800 },
  "teckel":                     { min: 1000, max: 2000 },
  "cavalier-king-charles-spaniel": { min: 2000, max: 3500 },
  "berger-australien":          { min: 1200, max: 2200 },
  "shih-tzu":                   { min: 1200, max: 2200 },
  "chihuahua":                  { min: 1000, max: 2500 },
  "bichon-frise":               { min: 1200, max: 2200 },
  "pomeranien":                 { min: 1500, max: 3000 },
  "carlin":                     { min: 1500, max: 2800 },
  "bulldog-anglais":            { min: 3000, max: 5500 },
  "cocker-americain":           { min: 1200, max: 2000 },
  "berger-de-shetland":         { min: 1200, max: 2200 },
  "schnauzer-miniature":        { min: 1200, max: 2200 },
  "maltais":                    { min: 1200, max: 2500 },
  "dalmatien":                  { min: 1000, max: 1800 },
  "dobermann":                  { min: 1500, max: 2800 },
  "setter-irlandais":           { min: 1200, max: 2000 },
  "weimaraner":                 { min: 1200, max: 2200 },
  "bouvier-bernois":            { min: 1500, max: 2800 },
  "shar-pei":                   { min: 1200, max: 2500 },
  "samoyede":                   { min: 1500, max: 3000 },
  "terre-neuve":                { min: 1500, max: 2800 },
  "jack-russell-terrier":       { min:  600, max: 1200 },
  "west-highland-white-terrier":{ min: 1200, max: 2200 },
  "bichon-havanais":            { min: 1200, max: 2500 },
  "basenji":                    { min: 1500, max: 2500 },
  "whippet":                    { min: 1000, max: 2000 },
  "rhodesian-ridgeback":        { min: 1200, max: 2500 },
  "malamute-alaska":            { min: 1200, max: 2500 },
  "cane-corso":                 { min: 1500, max: 3000 },
  "saint-bernard":              { min: 1200, max: 2500 },
  "chow-chow":                  { min: 1500, max: 2800 },
  "lhassa-apso":                { min: 1000, max: 2000 },
  "epagneul-breton":            { min:  800, max: 1500 },
  "scottish-terrier":           { min: 1000, max: 1800 },
  "berger-belge-malinois":      { min: 1000, max: 2200 },
  "dogue-allemand":             { min: 1500, max: 3000 },
  "akita-inu":                  { min: 1500, max: 3000 },
  "spitz-finlandais":           { min: 1200, max: 2200 },
  "coton-de-tulear":            { min: 1500, max: 3000 },
};

/** Formater en CAD lisible */
export function fmtPrice(n: number): string {
  return `${new Intl.NumberFormat("fr-CA").format(n)} $`;
}

/** Prix total estimé 10 premières années (achat + vétérinaire) */
export function totalCost10y(
  slug: string,
  annualVetMax: number
): { purchase: PurchasePrice; vet10y: number; total: number } {
  const purchase = breedPurchasePrices[slug] ?? { min: 1000, max: 2000 };
  const vet10y = annualVetMax * 10;
  return { purchase, vet10y, total: purchase.max + vet10y };
}
