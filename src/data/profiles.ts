import type { Breed } from '@/types/breed';

export interface Profile {
  slug: string;
  title: string;
  h1: string;
  emoji: string;
  metaDescription: string;
  intro: string;
  tip: string;
  filter: (b: Breed) => boolean;
  sort?: (a: Breed, b: Breed) => number;
  limit?: number;
}

const HYPO_SLUGS = new Set([
  'caniche', 'bichon-frise', 'maltais', 'schnauzer-miniature',
  'bichon-havanais', 'coton-de-tulear', 'basenji',
  'yorkshire-terrier', 'berger-de-shetland',
]);

export const profiles: Profile[] = [
  {
    slug: 'appartement',
    title: 'Meilleure race de chien pour appartement au Québec — PetScore™',
    h1: 'Meilleures races de chiens pour appartement',
    emoji: '🏙️',
    metaDescription: 'Quelles races de chiens s\'adaptent le mieux à la vie en appartement à Montréal ou Québec ? PetScore™ sélectionne les races les plus calmes et adaptées au milieu urbain.',
    intro: 'Vivre en appartement ne vous empêche pas d\'avoir un chien. La clé : choisir une race à faible niveau d\'énergie et adaptée aux espaces réduits. Ces races ont été sélectionnées pour leur calme, leur tolérance à la solitude et leur comportement silencieux — idéal pour un condo ou un 3½ à Montréal, Québec ou Laval.',
    tip: 'Le niveau d\'énergie est plus important que la taille. Un Greyhound adulte s\'adapte mieux à un appartement qu\'un Jack Russell.',
    filter: (b) => b.traits.energy <= 2 || (b.traits.energy <= 3 && b.size === 'petit'),
    sort: (a, b) => b.score - a.score,
  },
  {
    slug: 'famille',
    title: 'Meilleures races de chiens pour familles avec enfants — PetScore™ Québec',
    h1: 'Meilleures races de chiens pour familles avec enfants',
    emoji: '👨‍👩‍👧‍👦',
    metaDescription: 'Races de chiens douces, patientes et adorant les enfants au Québec. PetScore™ sélectionne les races avec le meilleur score de sociabilité famille.',
    intro: 'Un chien de famille doit être patient, sociable et suffisamment robuste pour les jeux d\'enfants. Ces races ont obtenu les meilleurs scores de sociabilité avec les enfants selon notre évaluation PetScore™. Toutes sont reconnues pour leur tempérament doux et leur tolérance naturelle.',
    tip: 'Même les races les plus douces nécessitent une supervision avec les très jeunes enfants. Apprenez à votre enfant à respecter l\'espace du chien.',
    filter: (b) => b.traits.socialWithKids >= 4,
    sort: (a, b) => b.score - a.score,
  },
  {
    slug: 'debutants',
    title: 'Meilleures races de chiens pour débutants au Québec — PetScore™',
    h1: 'Meilleures races pour un premier chien',
    emoji: '🎓',
    metaDescription: 'Premier chien ? PetScore™ sélectionne les races faciles à dresser, en bonne santé et adaptées aux propriétaires débutants au Québec.',
    intro: 'Pour un premier chien, privilégiez une race à haute dressabilité, bon caractère et coûts vétérinaires raisonnables. Ces races pardonnent les erreurs de débutants et répondent bien aux techniques de renforcement positif. Elles ont aussi des PetScores élevés — moins de surprises médicales coûteuses.',
    tip: 'Même avec une race facile, un cours d\'obéissance de base (8–10 semaines) change tout. Comptez 300–500 $ à Montréal.',
    filter: (b) => b.traits.trainability >= 4 && b.score >= 68,
    sort: (a, b) => b.traits.trainability - a.traits.trainability || b.score - a.score,
  },
  {
    slug: 'personnes-agees',
    title: 'Meilleures races de chiens pour personnes âgées au Québec — PetScore™',
    h1: 'Meilleures races de chiens pour personnes âgées ou à mobilité réduite',
    emoji: '🧓',
    metaDescription: 'Races de chiens calmes, affectueuses et peu exigeantes physiquement — idéales pour les personnes âgées ou à mobilité réduite au Québec.',
    intro: 'Un compagnon pour une personne âgée doit être calme, affectueux, pas trop imposant physiquement et facile à entretenir. Ces races ont un faible niveau d\'énergie, une excellente sociabilité et des soins vétérinaires prévisibles — des qualités essentielles pour une vie sereine à deux.',
    tip: 'Adoptez plutôt un chien adulte (2–4 ans) qu\'un chiot. L\'énergie débordante d\'un jeune chien peut être épuisante. Les refuges ont souvent d\'excellents chiens adultes.',
    filter: (b) => b.traits.energy <= 2 && b.size !== 'grand' && b.score >= 65,
    sort: (a, b) => a.traits.energy - b.traits.energy || b.score - a.score,
  },
  {
    slug: 'sportifs',
    title: 'Meilleures races de chiens pour personnes sportives et actives au Québec — PetScore™',
    h1: 'Meilleures races de chiens pour coureurs et personnes actives',
    emoji: '🏃',
    metaDescription: 'Vous courez, randonnez ou faites du vélo ? PetScore™ sélectionne les races à énergie élevée et excellent stamina pour accompagner les sportifs québécois.',
    intro: 'Si vous courez 5 km+ par jour, randonnez le week-end ou êtes actif toute la journée, vous avez besoin d\'un partenaire à la hauteur. Ces races ont été sélectionnées pour leur endurance, leur amour du mouvement et leur capacité à suivre un rythme sportif — même lors des hivers québécois.',
    tip: 'Évitez de faire courir un chiot de moins de 18 mois sur de longues distances — les articulations sont encore en développement. Attendez avant les longues randonnées.',
    filter: (b) => b.traits.energy >= 4,
    sort: (a, b) => b.traits.energy - a.traits.energy || b.score - a.score,
  },
  {
    slug: 'allergie',
    title: 'Races de chiens hypoallergéniques au Québec — PetScore™',
    h1: 'Races de chiens hypoallergéniques',
    emoji: '🌿',
    metaDescription: 'Allergique aux chiens ? PetScore™ sélectionne les races produisant le moins d\'allergènes au Québec : Caniche, Bichon frisé, Schnauzer et plus.',
    intro: 'Aucune race n\'est 100 % sans allergènes, mais certaines races produisent nettement moins de Can f 1 (l\'allergène principal) grâce à leur type de pelage. Ces races ont un poil à croissance continue qui perd peu et disperse moins de squames — idéal pour les personnes sensibles.',
    tip: 'Avant d\'adopter, passez 1–2 heures chez un éleveur avec la race choisie. La réaction varie selon les individus et la quantité de Can f 1 produite.',
    filter: (b) => HYPO_SLUGS.has(b.slug),
    sort: (a, b) => b.score - a.score,
  },
  {
    slug: 'petit-budget',
    title: 'Races de chiens les moins chères à entretenir au Québec — PetScore™',
    h1: 'Races de chiens les moins chères à entretenir',
    emoji: '💚',
    metaDescription: 'Quelles races de chiens coûtent le moins cher en frais vétérinaires au Québec ? PetScore™ sélectionne les races les plus abordables avec le meilleur rapport santé/budget.',
    intro: 'Le coût d\'un chien dépasse largement le prix d\'achat. Sur 10 ans, la différence entre une race à faible risque et une race coûteuse peut atteindre 30 000 $. Ces races combinent un excellent PetScore™ (moins de risques héréditaires) avec des coûts vétérinaires annuels parmi les plus bas.',
    tip: 'Un PetScore™ élevé est votre meilleur allié budgétaire. Chaque point de score correspond à moins de risques de dépenses imprévues.',
    filter: (b) => b.annualVetCost.max <= 1600 && b.score >= 70,
    sort: (a, b) => a.annualVetCost.max - b.annualVetCost.max || b.score - a.score,
  },
];
