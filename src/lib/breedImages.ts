/**
 * breedImages.ts
 * Generates consistent picsum.photos seed URLs per breed slug.
 * Same slug → same seed → same image across builds.
 */

/** Simple djb2 hash → deterministic positive integer */
function slugToSeed(slug: string): number {
  let hash = 5381;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) + hash) ^ slug.charCodeAt(i);
    hash = hash >>> 0; // keep unsigned 32-bit
  }
  // picsum seeds 1-999 give good variety
  return (hash % 999) + 1;
}

/** Full-size breed hero image (400×280) */
export function getBreedImageUrl(slug: string): string {
  return `https://picsum.photos/seed/${slugToSeed(slug)}/400/280`;
}

/** Small thumbnail for cards (120×80) */
export function getBreedThumbUrl(slug: string): string {
  return `https://picsum.photos/seed/${slugToSeed(slug)}/120/80`;
}

/** Square avatar for comparison / similar breeds (80×80) */
export function getBreedAvatarUrl(slug: string): string {
  return `https://picsum.photos/seed/${slugToSeed(slug)}/80/80`;
}
