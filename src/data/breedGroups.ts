export interface BreedGroup {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  traits: string[];
  bestFor: string[];
  watchOut: string[];
  slugs: string[];
}

export const breedGroups: BreedGroup[] = [
  {
    id: 'sportifs',
    name: 'Chiens sportifs',
    emoji: '🏃',
    tagline: 'Retrievers, épagneuls, setters et pointeurs',
    description:
      "Les chiens sportifs ont été sélectionnés pour chasser aux côtés de l'humain — trouver, lever et rapporter le gibier. Ils combinent instinct naturel, endurance et obéissance. Ce sont parmi les races les plus populaires au Québec pour les familles actives.",
    traits: ['Énergie élevée', 'Très affectueux', 'Faciles à dresser', 'Aiment l\'eau'],
    bestFor: ['Familles actives', 'Coureurs et randonneurs', 'Propriétaires d\'une cour'],
    watchOut: ['Ont besoin de 1h30-2h d\'exercice quotidien', 'Peuvent souffrir de dysplasie de hanche'],
    slugs: [
      'labrador-retriever', 'golden-retriever', 'cocker-americain',
      'setter-irlandais', 'weimaraner', 'epagneul-breton',
    ],
  },
  {
    id: 'courants',
    name: 'Chiens courants',
    emoji: '🐕',
    tagline: 'Lévriers, beagles et chasseurs à vue ou à nez',
    description:
      "Les chiens courants chassent à l'odorat (chiens de meute) ou à la vue (lévriers). Robustes et indépendants, ils ont un instinct de chasse très développé. Certaines races comme le Whippet ou le Basenji sont étonnamment calmes à la maison malgré leur vitesse impressionnante.",
    traits: ['Indépendants', 'Fort instinct de chasse', 'Résistants', 'Calmes à la maison'],
    bestFor: ['Propriétaires expérimentés', 'Personnes aimant les longues marches'],
    watchOut: ['Rappel difficile — jamais sans laisse dans un espace ouvert', 'Instinct de poursuite élevé'],
    slugs: [
      'beagle', 'teckel', 'basenji', 'whippet', 'rhodesian-ridgeback',
    ],
  },
  {
    id: 'travail',
    name: 'Chiens de travail',
    emoji: '💪',
    tagline: 'Chiens de traîneau, de garde et de sauvetage',
    description:
      "Sélectionnés pour des tâches physiques exigeantes — tirer des traîneaux, garder des propriétés, secourir des naufragés. Ces races sont puissantes, intelligentes et loyales. La plupart sont bien adaptées aux hivers québécois grâce à leur double pelage.",
    traits: ['Très puissants', 'Loyaux et protecteurs', 'Résistants au froid', 'Autonomes'],
    bestFor: ['Propriétaires expérimentés', 'Grandes propriétés', 'Activités hivernales'],
    watchOut: ['Forte personnalité — éducation ferme nécessaire', 'Besoins d\'exercice très élevés'],
    slugs: [
      'rottweiler', 'boxer', 'husky-siberien', 'dobermann', 'samoyede',
      'terre-neuve', 'malamute-alaska', 'cane-corso', 'saint-bernard', 'dogue-allemand',
    ],
  },
  {
    id: 'terriers',
    name: 'Terriers',
    emoji: '🦾',
    tagline: 'Petits chasseurs au tempérament bien trempé',
    description:
      "Les terriers ont été sélectionnés pour chasser les animaux souterrains (rats, renards). Courageux, tenaces et indépendants bien au-delà de leur taille, ils sont souvent décrits comme «une grande personnalité dans un petit corps». Leur énergie explosive surprend toujours les nouveaux propriétaires.",
    traits: ['Courageux', 'Têtus mais intelligents', 'Énergiques', 'Peu peureux'],
    bestFor: ['Personnes actives', 'Espace de jeu sécurisé (instinct de creuser)'],
    watchOut: ['Tendance à aboyer', 'Instinct de chasse fort — prudence avec les petits animaux'],
    slugs: [
      'yorkshire-terrier', 'jack-russell-terrier', 'west-highland-white-terrier',
      'schnauzer-miniature', 'scottish-terrier',
    ],
  },
  {
    id: 'agrement',
    name: "Chiens d'agrément",
    emoji: '🐩',
    tagline: 'Races toy — compagnons de salon affectueux',
    description:
      "Élevés exclusivement comme compagnons humains, les races d'agrément sont optimisées pour le lien affectif, le confort et la vie en appartement. Malgré leur petite taille, plusieurs ont une forte personnalité et un aboiement bien présent. Ce sont souvent les races avec les coûts dentaires les plus élevés.",
    traits: ['Très affectueux', 'Adaptés à l\'appartement', 'Sociables', 'Peu besoin d\'exercice'],
    bestFor: ['Appartements', 'Personnes âgées', 'Familles avec enfants calmes'],
    watchOut: ['Susceptibles aux problèmes dentaires', 'Certains souffrent d\'anxiété de séparation'],
    slugs: [
      'chihuahua', 'pomeranien', 'carlin', 'cavalier-king-charles-spaniel',
      'bichon-havanais', 'maltais', 'shih-tzu',
    ],
  },
  {
    id: 'compagnie',
    name: 'Chiens de compagnie',
    emoji: '🏡',
    tagline: 'Bouledogues, caniches, dalmatiens et autres',
    description:
      "Le groupe «compagnie/non-sportif» regroupe les races qui ne rentrent pas dans les autres catégories — surtout des races de compagnie polyvalentes. On y trouve certaines des races les plus populaires du Québec, mais aussi les plus coûteuses sur le plan vétérinaire (brachycéphales).",
    traits: ['Grande diversité de caractères', 'Races urbaines populaires', 'Profils de santé très variés'],
    bestFor: ['Tout profil de propriétaire selon la race', 'Appartements (selon énergie)'],
    watchOut: ['Les races brachycéphales (Bouledogue, Carlin) ont des coûts vétérinaires très élevés'],
    slugs: [
      'bouledogue-francais', 'bulldog-anglais', 'dalmatien', 'shar-pei',
      'chow-chow', 'lhassa-apso', 'caniche', 'bichon-frise',
      'coton-de-tulear', 'akita-inu',
    ],
  },
  {
    id: 'berger',
    name: 'Chiens de berger',
    emoji: '🐑',
    tagline: 'Bergers, collies et races de troupeaux',
    description:
      "Les chiens de berger ont été sélectionnés pour guider, rassembler et protéger les troupeaux. Leur intelligence hors du commun, leur énergie inépuisable et leur instinct naturel à «contrôler» font d'eux des chiens magnifiques mais exigeants. Ils ont absolument besoin de stimulation mentale ET physique quotidienne.",
    traits: ['Très intelligents', 'Instinct de rassemblement', 'Énergiques', 'Très entraînables'],
    bestFor: ['Familles très actives', 'Sports canins (agility, canicross, frisbee)'],
    watchOut: ['Peuvent développer des comportements compulsifs sans stimulation', 'Peuvent «héberger» les enfants'],
    slugs: [
      'berger-allemand', 'border-collie', 'berger-australien',
      'berger-de-shetland', 'berger-belge-malinois', 'bouvier-bernois', 'spitz-finlandais',
    ],
  },
];

export const groupById = Object.fromEntries(breedGroups.map(g => [g.id, g]));
