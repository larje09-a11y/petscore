export interface Condition {
  slug: string;
  name: string;
  emoji: string;
  severity: "faible" | "moyen" | "élevé";
  description: string;
  symptoms: string[];
  treatments: string[];
  estimatedCost: string;
  prevention: string[];
  affectedBreeds: string[];
}

export const conditions: Condition[] = [
  {
    slug: "dysplasie-hanche",
    name: "Dysplasie de la hanche",
    emoji: "🦴",
    severity: "élevé",
    description:
      "La dysplasie de la hanche est un trouble héréditaire du développement articulaire très répandu chez les grandes races. L'articulation coxo-fémorale se forme anormalement, entraînant douleurs, boiterie et arthrose précoce. C'est l'une des causes les plus fréquentes d'invalidité chez le chien adulte.",
    symptoms: [
      "Boiterie intermittente ou persistante",
      "Difficulté à se lever, s'asseoir ou monter les escaliers",
      "Atrophie musculaire de l'arrière-train",
      "Démarche chaloupée (\"déhanchement\")",
      "Douleur à la palpation de la hanche",
    ],
    treatments: [
      "Gestion du poids et exercice contrôlé",
      "Anti-inflammatoires (AINS) et analgésiques",
      "Physiothérapie et hydrothérapie",
      "Suppléments : glucosamine, oméga-3, chondroïtine",
      "Chirurgie : prothèse totale de hanche (PTH) ou ostéotomie",
    ],
    estimatedCost: "2 000 – 7 000 $ (chirurgie)",
    prevention: [
      "Choisir un éleveur certifié OFA/PennHIP avec bilans parentaux",
      "Limiter le saut et l'exercice intense chez le chiot",
      "Maintenir un poids santé tout au long de la vie",
    ],
    affectedBreeds: [
      "labrador-retriever",
      "golden-retriever",
      "berger-allemand",
      "rottweiler",
      "saint-bernard",
      "leonberger",
      "terre-neuve",
    ],
  },
  {
    slug: "cancer",
    name: "Cancer canin",
    emoji: "🎗️",
    severity: "élevé",
    description:
      "Le cancer est la principale cause de décès chez le chien de plus de 10 ans. Certaines races comme le Golden Retriever ont une prédisposition génétique marquée. Les formes les plus communes incluent le lymphome, l'hémangiosarcome et l'ostéosarcome.",
    symptoms: [
      "Masse ou grosseur anormale qui grossit",
      "Perte de poids inexpliquée",
      "Perte d'appétit et fatigue générale",
      "Boiterie soudaine sans traumatisme apparent",
      "Saignements ou écoulements inhabituels",
    ],
    treatments: [
      "Chirurgie d'exérèse (ablation de la tumeur)",
      "Chimiothérapie (lymphome, hémangiosarcome)",
      "Radiothérapie",
      "Immunothérapie (approches émergentes)",
      "Soins palliatifs et gestion de la douleur",
    ],
    estimatedCost: "3 000 – 20 000 $",
    prevention: [
      "Bilan sanguin annuel après 7 ans",
      "Stérilisation avant le premier chaleur (mammaires)",
      "Éviter les pesticides et produits chimiques domestiques",
    ],
    affectedBreeds: [
      "golden-retriever",
      "boxer",
      "bernois",
      "rottweiler",
      "terre-neuve",
      "leonberger",
    ],
  },
  {
    slug: "epilepsie",
    name: "Épilepsie idiopathique",
    emoji: "⚡",
    severity: "moyen",
    description:
      "L'épilepsie idiopathique est une forme d'épilepsie héréditaire sans cause structurelle identifiable. Les crises convulsives apparaissent généralement entre 1 et 5 ans. Bien que stressant pour les propriétaires, la plupart des chiens épileptiques ont une bonne qualité de vie sous médication.",
    symptoms: [
      "Crises convulsives (tremblements, raideurs, pédaler dans le vide)",
      "Perte de conscience temporaire",
      "Désorientation post-crise (confusion, errance)",
      "Salivation excessive pendant l'épisode",
      "Incontinence urinaire ou fécale lors des crises",
    ],
    treatments: [
      "Phénobarbital (anticonvulsivant de première intention)",
      "Bromure de potassium en complément",
      "Imépitoin (Pexion) — option plus récente",
      "Suivi sanguin régulier pour ajuster les doses",
      "Journalisation des crises pour optimiser le traitement",
    ],
    estimatedCost: "500 – 2 000 $ / an (médication + bilans)",
    prevention: [
      "Sélection génétique chez l'éleveur (parents testés)",
      "Éviter les facteurs déclenchants identifiés (stress, chaleur)",
      "Ne pas reproduire un chien épileptique",
    ],
    affectedBreeds: [
      "berger-belge",
      "labrador-retriever",
      "golden-retriever",
      "border-collie",
      "beagle",
    ],
  },
  {
    slug: "dtg",
    name: "Dilatation-torsion gastrique (DTG)",
    emoji: "🫁",
    severity: "élevé",
    description:
      "La DTG est une urgence vétérinaire mortelle touchant principalement les grandes races à poitrine profonde. L'estomac se dilate de gaz et peut se tordre sur lui-même, coupant la circulation sanguine. Sans intervention chirurgicale d'urgence dans les heures suivantes, le pronostic est fatal.",
    symptoms: [
      "Abdomen distendu et dur comme un ballon",
      "Tentatives infructueuses de vomir",
      "Agitation extrême et inconfort",
      "Respiration laborieuse et superficielle",
      "Effondrement et état de choc",
    ],
    treatments: [
      "Décompression gastrique d'urgence (sonde ou trocard)",
      "Réanimation liquidienne intraveineuse",
      "Chirurgie : repositionnement de l'estomac + gastropexie",
      "Soins intensifs post-opératoires (ECG, surveillance)",
      "Gastropexie prophylactique préventive recommandée",
    ],
    estimatedCost: "4 000 – 10 000 $ (urgence + chirurgie)",
    prevention: [
      "Gastropexie prophylactique lors de la stérilisation (grandes races)",
      "Fractionner les repas (2–3 fois par jour)",
      "Éviter l'exercice intense 1h avant et après les repas",
      "Utiliser un bol anti-glouton",
    ],
    affectedBreeds: [
      "berger-allemand",
      "dobermann",
      "dogue-allemand",
      "saint-bernard",
      "leonberger",
      "weimaraner",
      "terre-neuve",
    ],
  },
  {
    slug: "syndrome-brachycephale",
    name: "Syndrome brachycéphale obstructif (SBO)",
    emoji: "😮‍💨",
    severity: "élevé",
    description:
      "Le SBO regroupe un ensemble d'anomalies anatomiques affectant les voies respiratoires des races à face aplatie (brachycéphales). Narines sténosées, palais mou allongé et trachée hypoplasique rendent la respiration chroniquement difficile. La qualité de vie peut être sévèrement compromise sans intervention chirurgicale.",
    symptoms: [
      "Ronflement fort et ronflements même au repos",
      "Intolérance à l'effort et à la chaleur",
      "Respiration bruyante avec gargouillis",
      "Vomissements ou régurgitations fréquents",
      "Cyanose (muqueuses bleutées) lors d'efforts intenses",
    ],
    treatments: [
      "Chirurgie : élargissement des narines (naseaux)",
      "Chirurgie : raccourcissement du palais mou",
      "Gestion du poids pour réduire la charge respiratoire",
      "Climatisation obligatoire en été",
      "Éviter tout effort intense en période de chaleur",
    ],
    estimatedCost: "2 000 – 7 000 $ (chirurgie correctrice)",
    prevention: [
      "Éviter d'acquérir un individu à face excessivement aplatie",
      "Choisir un éleveur sélectionnant pour une meilleure conformation",
      "Sensibiliser à l'adoption de races à morphologie améliorée",
    ],
    affectedBreeds: [
      "bouledogue-francais",
      "bouledogue-anglais",
      "carlin",
      "shih-tzu",
      "cavalier-king-charles",
    ],
  },
  {
    slug: "cardiomyopathie",
    name: "Cardiomyopathie dilatée (CMD)",
    emoji: "❤️",
    severity: "élevé",
    description:
      "La CMD est une maladie du muscle cardiaque qui provoque un affaiblissement progressif et une dilatation des cavités cardiaques. Fréquente chez les grandes races et le Dobermann en particulier. Elle évolue souvent silencieusement pendant des années avant de causer une insuffisance cardiaque congestive.",
    symptoms: [
      "Toux nocturne persistante",
      "Intolérance à l'exercice et fatigabilité accrue",
      "Syncopes (évanouissements)",
      "Abdomen gonflé (ascite)",
      "Difficultés respiratoires au repos (stade avancé)",
    ],
    treatments: [
      "Médicaments cardiaques : pimobendan, furosémide, énalapril",
      "Antiarythmiques si nécessaire (sotalol, mexilétine)",
      "Régime pauvre en sodium",
      "Repos et activité physique encadrée",
      "Échocardiographie de suivi tous les 6 à 12 mois",
    ],
    estimatedCost: "800 – 3 000 $ / an (médication + suivis)",
    prevention: [
      "Dépistage échocardiographique annuel chez le Dobermann à partir de 3 ans",
      "Sélection génétique (Holter + écho chez les parents)",
      "Supplément en taurine et L-carnitine en discussion avec le vétérinaire",
    ],
    affectedBreeds: [
      "dobermann",
      "dogue-allemand",
      "leonberger",
      "terre-neuve",
      "saint-bernard",
      "boxer",
    ],
  },
  {
    slug: "hypothyroidie",
    name: "Hypothyroïdie",
    emoji: "🦋",
    severity: "moyen",
    description:
      "L'hypothyroïdie est le trouble endocrinien le plus courant chez le chien. La glande thyroïde produit insuffisamment d'hormones, ralentissant le métabolisme. Elle est généralement d'origine immune (thyroïdite lymphocytaire) ou idiopathique, et nécessite un traitement hormonal à vie.",
    symptoms: [
      "Prise de poids sans augmentation de l'appétit",
      "Léthargie et manque d'énergie",
      "Pelage terne, perte de poils symétrique",
      "Intolérance au froid",
      "Peau épaissie, sèche ou hyperpigmentée",
    ],
    treatments: [
      "Lévothyroxine (T4 synthétique) par voie orale, à vie",
      "Dosage ajusté selon bilans thyroïdiens réguliers",
      "Surveillance du poids et de la condition corporelle",
    ],
    estimatedCost: "300 – 1 000 $ / an (médication + bilans)",
    prevention: [
      "Pas de prévention connue (cause immuno-génétique)",
      "Bilan thyroïdien recommandé après 5 ans pour les races à risque",
    ],
    affectedBreeds: [
      "golden-retriever",
      "labrador-retriever",
      "beagle",
      "boxer",
      "cocker-americain",
    ],
  },
  {
    slug: "atrophie-retinienne",
    name: "Atrophie rétinienne progressive (ARP)",
    emoji: "👁️",
    severity: "moyen",
    description:
      "L'ARP est une dégénérescence héréditaire des photorécepteurs de la rétine. Elle progresse lentement vers la cécité totale. La forme tardive (PRCD) est la plus répandue. Il n'existe pas de traitement curatif, mais les chiens aveugles s'adaptent remarquablement bien avec l'aide de leurs propriétaires.",
    symptoms: [
      "Difficulté à voir dans l'obscurité (héméralopie)",
      "Reflets oculaires argentés ou dorés (tapetum)",
      "Trébucher sur les obstacles en faible lumière",
      "Hésitation à descendre les escaliers ou sauter",
      "Pupilles dilatées (mydriase) progressive",
    ],
    treatments: [
      "Aucun traitement curatif disponible",
      "Suppléments antioxydants pour ralentir la progression",
      "Adaptation de l'environnement (repères olfactifs, routines stables)",
    ],
    estimatedCost: "200 – 800 $ (bilan + génotypage)",
    prevention: [
      "Test génétique des parents avant la reproduction (PRCD-PRA optigen)",
      "Ne jamais reproduire deux porteurs (carrier x carrier = 25% atteints)",
      "Certification ophtalmologique pour les éleveurs",
    ],
    affectedBreeds: [
      "labrador-retriever",
      "golden-retriever",
      "caniche",
      "cocker-americain",
    ],
  },
  {
    slug: "luxation-rotule",
    name: "Luxation de la rotule (LP)",
    emoji: "🦵",
    severity: "moyen",
    description:
      "La luxation de rotule est une malformation de l'articulation du genou où la rotule sort de son sillon trochléen. Très fréquente chez les petites races, elle est classée de grade I (subclinique) à IV (permanente). Les grades III et IV requièrent généralement une intervention chirurgicale.",
    symptoms: [
      "Boiterie intermittente ou sautillement à trois pattes",
      "Genou qui claque ou saute lors de la palpation",
      "Douleur à la manipulation du genou",
      "Membres postérieurs en rotation interne",
      "Difficulté à s'élancer ou à sauter",
    ],
    treatments: [
      "Grade I–II : physiothérapie, contrôle du poids, anti-douleurs",
      "Grade III–IV : chirurgie correctrice (trochléoplastie)",
      "Rééducation post-opératoire",
      "Suppléments articulaires préventifs",
    ],
    estimatedCost: "1 500 – 4 500 $ par genou (chirurgie)",
    prevention: [
      "Sélection d'éleveurs certifiant leurs reproducteurs",
      "Maintien d'un poids sain",
      "Éviter les sauts excessifs chez le chiot en croissance",
    ],
    affectedBreeds: [
      "caniche",
      "carlin",
      "bouledogue-francais",
      "chihuahua",
      "bichon-frise",
      "maltais",
      "shih-tzu",
      "yorkshire-terrier",
    ],
  },
  {
    slug: "hernie-discale",
    name: "Hernie discale (IVDD)",
    emoji: "🦴",
    severity: "élevé",
    description:
      "La maladie des disques intervertébraux (IVDD) survient lorsqu'un disque vertébral dégénère et comprime la moelle épinière. La forme de Hansen type I touche les races à pattes courtes et peut causer une paralysie soudaine. C'est une urgence neurologique nécessitant parfois une chirurgie dans les 48 heures.",
    symptoms: [
      "Douleur cervicale ou lombaire intense (dos voûté)",
      "Parésie ou paralysie des membres",
      "Démarche ataxique (chancelante)",
      "Incontinence urinaire ou fécale",
      "Réticence à bouger, sauter ou être touché",
    ],
    treatments: [
      "Cas légers : repos strict 4–6 semaines + anti-inflammatoires",
      "Chirurgie décompressive (hémilaminectomie) pour les cas graves",
      "Physiothérapie et hydrothérapie en rééducation",
      "Chariot de mobilité pour les paralysies permanentes",
    ],
    estimatedCost: "3 000 – 10 000 $ (chirurgie + rééducation)",
    prevention: [
      "Rampes d'accès aux meubles (éviter les sauts)",
      "Éviter l'obésité (poids excessif aggrave la compression)",
      "Harnais plutôt que collier pour les races à risque",
    ],
    affectedBreeds: [
      "dachshund",
      "bouledogue-francais",
      "carlin",
      "shih-tzu",
      "cocker-americain",
      "basset-hound",
    ],
  },
  {
    slug: "allergies-cutanees",
    name: "Dermatite atopique (allergies cutanées)",
    emoji: "🌿",
    severity: "moyen",
    description:
      "La dermatite atopique est une inflammation cutanée chronique d'origine allergique (environnementale, alimentaire ou aux puces). Elle se manifeste par des démangeaisons intenses entraînant auto-traumatismes et infections secondaires. C'est une condition à vie qui nécessite une gestion continue.",
    symptoms: [
      "Prurit intense (léchage, grattage, frottement)",
      "Rougeur et inflammation cutanée",
      "Pertes de poils localisées (alopécie)",
      "Odeur de levure (otites et pododermatites récurrentes)",
      "Peau épaissie, hyperpigmentée (chronicité)",
    ],
    treatments: [
      "Immunothérapie allergénique (désensibilisation)",
      "Apoquel (oclacitinib) ou Cytopoint (lokivetmab) pour le prurit",
      "Corticostéroïdes à court terme lors des poussées",
      "Bains thérapeutiques avec shampooing hydratant",
      "Régime alimentaire hypoallergénique (hydrolysat)",
    ],
    estimatedCost: "600 – 2 500 $ / an (gestion chronique)",
    prevention: [
      "Antiparasitaires mensuels rigoureux (puces = déclencheur majeur)",
      "Alimentation de qualité dès le jeune âge",
      "Sélection de races à faible prédisposition atopique",
    ],
    affectedBreeds: [
      "bouledogue-francais",
      "boxer",
      "labrador-retriever",
      "golden-retriever",
      "cocker-americain",
    ],
  },
  {
    slug: "maladie-parodontale",
    name: "Maladie parodontale",
    emoji: "🦷",
    severity: "faible",
    description:
      "La maladie parodontale est la pathologie la plus répandue chez le chien, touchant plus de 80 % des individus de plus de 3 ans. L'accumulation de plaque et tartre entraîne gingivite, déchaussement des dents et infections qui peuvent affecter le coeur, les reins et le foie si non traitée.",
    symptoms: [
      "Mauvaise haleine persistante (halitose)",
      "Gencives rouges, gonflées ou saignantes",
      "Tartre visible sur les dents",
      "Difficultés à mâcher ou appétit diminué",
      "Dents branlantes ou tombées (stades avancés)",
    ],
    treatments: [
      "Détartrage sous anesthésie générale",
      "Extractions dentaires si nécessaire",
      "Brossage quotidien des dents (prévention)",
      "Gels ou solutions bucco-dentaires vétérinaires",
      "Friandises et jouets dentaires homologués VOHC",
    ],
    estimatedCost: "300 – 1 200 $ (détartrage + anesthésie)",
    prevention: [
      "Brossage quotidien avec dentifrice vétérinaire",
      "Jouets à mâcher et friandises dentaires certifiés",
      "Examen dentaire annuel chez le vétérinaire",
    ],
    affectedBreeds: [
      "caniche",
      "yorkshire-terrier",
      "maltais",
      "carlin",
      "chihuahua",
      "shih-tzu",
      "cavalier-king-charles",
      "bouledogue-francais",
    ],
  },
];

export type { Condition };
