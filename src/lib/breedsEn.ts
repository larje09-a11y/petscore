import type { Breed } from '@/types/breed';

// ─── Risk / Size label translations ────────────────────────────────────────

export const riskLabelEn: Record<string, string> = {
  faible: 'Low risk',
  moyen: 'Moderate risk',
  'élevé': 'High risk',
};

export const riskBadgeClassEn: Record<string, string> = {
  faible: 'bg-green-100 text-green-700',
  moyen: 'bg-amber-100 text-amber-700',
  'élevé': 'bg-red-100 text-red-700',
};

export const sizeLabelEn: Record<string, string> = {
  petit: 'Small',
  moyen: 'Medium',
  grand: 'Large',
};

// ─── Health condition name translations ────────────────────────────────────

export const healthRiskEn: Record<string, string> = {
  'Allergie alimentaire': 'Food allergy',
  'Allergies cutanées': 'Skin allergies',
  'Allergies cutanées atopiques': 'Atopic dermatitis',
  'Allergies cutanées sévères': 'Severe skin allergies',
  'Alopécie X (syndrome Pom pelé)': 'Alopecia X',
  'Anomalie de l\'œil du Collie (CEA)': 'Collie Eye Anomaly (CEA)',
  'Arythmies cardiaques bénignes': 'Benign cardiac arrhythmias',
  'Ataxie spino-cérébelleuse (SCA)': 'Spinocerebellar ataxia (SCA)',
  'Atrophie rétinienne progressive': 'Progressive retinal atrophy',
  'Atrophie rétinienne progressive (PRA)': 'Progressive retinal atrophy (PRA)',
  'Cancer (histiocytose maligne, mélanome)': 'Cancer (malignant histiocytosis, melanoma)',
  'Cancer (lymphome, ostéosarcome)': 'Cancer (lymphoma, osteosarcoma)',
  'Cancer (mastocytome, lymphome)': 'Cancer (mast cell tumors, lymphoma)',
  'Cancer de la vessie (carcinome à cellules transitionnelles)': 'Bladder cancer (transitional cell carcinoma)',
  'Cancer des os (ostéosarcome)': 'Bone cancer (osteosarcoma)',
  'Cardiomyopathie': 'Cardiomyopathy',
  'Cardiomyopathie dilatée': 'Dilated cardiomyopathy',
  'Cardiomyopathie dilatée (DCM)': 'Dilated cardiomyopathy (DCM)',
  'Cardiomyopathie et sténose sous-aortique (SAS)': 'Cardiomyopathy and subaortic stenosis (SAS)',
  'Cataracte héréditaire': 'Hereditary cataracts',
  'Cataracte précoce': 'Early-onset cataracts',
  'Comédone du Schnauzer': 'Schnauzer comedo syndrome',
  'Déficience en phosphofructokinase (PFK)': 'Phosphofructokinase deficiency (PFK)',
  'Dermatite': 'Dermatitis',
  'Dermatite atopique': 'Atopic dermatitis',
  'Dermatite atopique sévère (syndrome Westie)': 'Severe atopic dermatitis (Westie syndrome)',
  'Dermatite des plis cutanés': 'Skin fold dermatitis',
  'Dermatomyosite': 'Dermatomyositis',
  'Dermoid sinus héréditaire': 'Hereditary dermoid sinus',
  'Diabète': 'Diabetes mellitus',
  'Dilatation-torsion gastrique': 'Gastric dilatation-volvulus (GDV/bloat)',
  'Dilatation-torsion gastrique (DTG)': 'Gastric dilatation-volvulus (GDV/bloat)',
  'Dysplasie de la hanche': 'Hip dysplasia',
  'Dysplasie de la hanche (légère)': 'Hip dysplasia (mild)',
  'Dysplasie de la hanche et du coude': 'Hip and elbow dysplasia',
  'Dysplasie du coude': 'Elbow dysplasia',
  'Ectropion et entropion': 'Ectropion and entropion',
  'Encéphalite du Carlin (NME)': 'Pug encephalitis (NME)',
  'Entropion': 'Entropion',
  'Entropion et ectropion': 'Entropion and ectropion',
  'Entropion et problèmes oculaires': 'Entropion and eye problems',
  'Entropion sévère': 'Severe entropion',
  'Épilepsie': 'Epilepsy',
  'Épilepsie idiopathique': 'Idiopathic epilepsy',
  'Fibrose pulmonaire idiopathique': 'Idiopathic pulmonary fibrosis',
  'Fièvre familiale du Shar Pei (FSF / amyloïdose)': 'Shar Pei fever / amyloidosis',
  'Glomérulopathie du Samoyède (maladie rénale)': 'Samoyed glomerulopathy (renal disease)',
  'Hernie discale intervertébrale (IVDD)': 'Intervertebral disc disease (IVDD)',
  'Hernie ombilicale': 'Umbilical hernia',
  'Hydrocéphalie': 'Hydrocephalus',
  'Hyperlipidémie héréditaire': 'Hereditary hyperlipidemia',
  'Hypersensibilité MDR1': 'MDR1 drug sensitivity',
  'Hypertrophie gastrique': 'Gastric hypertrophy',
  'Hypoadrénocorticisme': 'Hypoadrenocorticism (Addison\'s disease)',
  'Hypoglycémie': 'Hypoglycemia',
  'Hypothyroïdie': 'Hypothyroidism',
  'Hypothyroïdie légère': 'Mild hypothyroidism',
  'Infections d\'oreilles chroniques': 'Chronic ear infections',
  'Kystes et tumeurs cutanées': 'Skin cysts and tumors',
  'Lithiase urinaire (calculs)': 'Urinary stones',
  'Lithiase urinaire à urate': 'Urate urinary stones',
  'Luxation de la rotule': 'Patellar luxation',
  'Maladie d\'Addison': 'Addison\'s disease',
  'Maladie parodontale': 'Periodontal disease',
  'Maladie parodontale sévère': 'Severe periodontal disease',
  'Maladie rénale progressive héréditaire': 'Progressive hereditary renal disease',
  'Maladies dentaires': 'Dental diseases',
  'Malformation de Chiari-Like (CM/SM)': 'Chiari-like malformation (CM/SM)',
  'Méningite artérite (SRMA)': 'Steroid-responsive meningitis-arteritis (SRMA)',
  'Myélopathie dégénérative': 'Degenerative myelopathy',
  'Neuropathie héréditaire du Malamute (HPN)': 'Hereditary polyneuropathy of the Alaskan Malamute (HPAM)',
  'Obésité': 'Obesity',
  'Obésité et problèmes articulaires': 'Obesity and joint problems',
  'Ostéopathie cranio-mandibulaire (CMO)': 'Craniomandibular osteopathy (CMO)',
  'Ostéosarcome': 'Osteosarcoma',
  'Otites chroniques': 'Chronic otitis',
  'Pemphigus (maladie auto-immune)': 'Pemphigus (autoimmune disease)',
  'Polyneuropathie': 'Polyneuropathy',
  'Problèmes cardiaques': 'Heart conditions',
  'Problèmes cardiaques (PDA)': 'Patent ductus arteriosus (PDA)',
  'Problèmes oculaires': 'Eye problems',
  'Problèmes oculaires (ulcères cornéens)': 'Corneal ulcers',
  'Problèmes vertébraux (IVDD)': 'Spinal disc disease (IVDD)',
  'Régurgitation mitrale précoce': 'Early mitral valve disease',
  'Rétinopathie progressive': 'Progressive retinopathy',
  'Scottie cramp (trouble neurologique)': 'Scottie cramp (neurological disorder)',
  'Sensibilité aux anesthésiants (faible masse graisseuse)': 'Anesthesia sensitivity (low body fat)',
  'Sensibilité aux médicaments (MDR1)': 'Drug sensitivity (MDR1)',
  'Sensibilité gastro-intestinale': 'Gastrointestinal sensitivity',
  'Shunt portosystémique': 'Portosystemic shunt',
  'Sténose pulmonaire': 'Pulmonic stenosis',
  'Surdité congénitale': 'Congenital deafness',
  'Surdité héréditaire (BAER)': 'Hereditary deafness (BAER)',
  'Syndrome brachycéphale': 'Brachycephalic obstructive airway syndrome',
  'Syndrome brachycéphale léger': 'Mild brachycephalic syndrome',
  'Syndrome brachycéphale obstructif': 'Brachycephalic obstructive airway syndrome (BOAS)',
  'Syndrome brachycéphale obstructif (BAOS)': 'Brachycephalic obstructive airway syndrome (BOAS)',
  'Syndrome brachycéphale sévère (BAOS)': 'Severe brachycephalic obstructive airway syndrome (BOAS)',
  'Syndrome de Fanconi (maladie rénale héréditaire)': 'Fanconi syndrome (hereditary renal disease)',
  'Syndrome uvéodermatologique (VKH)': 'Uveodermatological syndrome (VKH)',
  'Syringomyélie': 'Syringomyelia',
  'Trachée collabée': 'Tracheal collapse',
  'Ulcères cornéens': 'Corneal ulcers',
  'Von Willebrand de type I': 'Von Willebrand disease type I',
  'Von Willebrand de type III': 'Von Willebrand disease type III',
  'Wobbler syndrome': 'Wobbler syndrome (cervical spondylomyelopathy)',
};

export function translateHealthRisk(frName: string): string {
  return healthRiskEn[frName] ?? frName;
}

// ─── English descriptions (template-generated) ────────────────────────────

const breedDescriptionsEn: Record<string, string> = {
  'labrador-retriever': "The Labrador Retriever is Quebec's most popular dog breed. Affectionate, active and highly trainable, it is unfortunately predisposed to several hereditary conditions common in large breeds, including hip dysplasia and obesity.",
  'golden-retriever': "The Golden Retriever is known for its gentle temperament and unwavering loyalty. Unfortunately, it is one of the breeds most affected by cancer, which significantly impacts its PetScore. Budget planning is essential for this breed.",
  'bouledogue-francais': "Very popular in urban environments, the French Bulldog suffers from numerous health problems related to its brachycephalic morphology. Veterinary costs are among the highest of all breeds — pet insurance is strongly recommended.",
  'berger-allemand': "The German Shepherd is a versatile working and family dog. Highly intelligent and trainable, it is predisposed to degenerative myelopathy and hip dysplasia. Regular health screening is essential.",
  'bulldog-anglais': "The English Bulldog has serious health challenges due to its brachycephalic structure. Respiratory and orthopedic issues are common throughout its life, making it one of the most expensive breeds to maintain medically.",
  'caniche-standard': "The Standard Poodle combines intelligence, elegance and relatively good health. With a low-shedding coat, it is a popular choice for allergy sufferers. Main concerns include hip dysplasia and Addison's disease.",
  'caniche-nain': "The Miniature Poodle is one of the healthiest small breeds. Highly intelligent and adaptable, it excels in obedience training. Watch for patellar luxation and eye conditions.",
  'caniche-toy': "The Toy Poodle is a lively, intelligent companion well-suited to apartment living. Main health concerns include patellar luxation, dental disease, and hypoglycemia in puppies.",
  'beagle': "The Beagle is a cheerful, curious and sociable breed. Health-wise, it is generally robust, but tends toward obesity and can suffer from epilepsy and eye conditions. Its strong nose makes it prone to wandering.",
  'rottweiler': "The Rottweiler is a powerful, loyal working dog. While devoted to its family, it requires experienced ownership. Health risks include hip dysplasia, cardiac conditions, and osteosarcoma — especially with early neutering.",
  'yorkshire-terrier': "The Yorkshire Terrier is a bold, spirited little dog in a compact package. Despite its small size, it is prone to several hereditary conditions including tracheal collapse, patellar luxation, and dental disease.",
  'boxer': "The Boxer is an energetic, playful breed that bonds deeply with its family. Unfortunately, it has one of the highest cancer rates of any breed. Heart conditions (subaortic stenosis) and hip dysplasia are also common concerns.",
  'husky-siberien': "The Siberian Husky is built for the Quebec winter. This athletic, independent breed excels at sledding and canicross. Health-wise it is relatively robust, but can suffer from hereditary eye conditions and hip dysplasia.",
  'berger-australien': "The Australian Shepherd is an agile, highly intelligent herding breed. It thrives with active owners and mental stimulation. MDR1 drug sensitivity is an important genetic consideration — always inform your vet.",
  'border-collie': "The Border Collie is widely regarded as the most intelligent dog breed. It needs extensive physical and mental exercise daily. Watch for Collie Eye Anomaly (CEA), epilepsy, and MDR1 drug sensitivity.",
  'dalmatien': "The Dalmatian is a distinctive, energetic breed with endurance built for long distances. Hereditary deafness affects a significant portion of the breed. Urate urinary stones require a low-purine diet.",
  'dobermann': "The Dobermann is an alert, loyal and powerful protection dog. Dilated cardiomyopathy (DCM) is the most serious health concern — cardiac screening is strongly recommended after age 5.",
  'saint-bernard': "The Saint Bernard is a gentle giant, calm and devoted. Its size comes with orthopedic challenges: hip and elbow dysplasia are common. Bloat (GDV) is a life-threatening risk requiring preventive measures.",
  'teckel-standard': "The Dachshund's long spine makes it extremely prone to intervertebral disc disease (IVDD). Spinal surgery can cost $4,000–$10,000. Weight management is critical throughout its long life.",
  'teckel-nain': "The Miniature Dachshund shares the same spinal risks as the standard version. Its long low body makes IVDD a constant concern. Ramps instead of stairs, and strict weight control, are essential preventive measures.",
  'chihuahua': "The Chihuahua is the smallest breed with one of the biggest personalities. Key health concerns include patellar luxation, hydrocephalus, and heart conditions. The soft spot (molera) on the skull requires careful handling.",
  'shih-tzu': "The Shih Tzu is a gentle, affectionate companion bred for palace life. Its brachycephalic features cause breathing challenges. Eye problems and dental disease are also common in this breed.",
  'bichon-frise': "The Bichon Frisé is a cheerful, low-shedding companion well-suited to allergy sufferers. Generally healthy, it is predisposed to bladder stones, dental disease, and skin allergies.",
  'cocker-spaniel-americain': "The American Cocker Spaniel is an affectionate, adaptable family dog. Its long droopy ears make it prone to chronic ear infections. Eye conditions and hip dysplasia are also monitored in responsible breeding.",
  'cocker-spaniel-anglais': "The English Cocker Spaniel is an energetic, enthusiastic sporting dog. Familial nephropathy (renal disease) is a serious hereditary concern. Eye conditions and ear infections should be monitored regularly.",
  'epagneul-breton': "The Brittany Spaniel is a versatile hunting and sporting dog with remarkable endurance. It is one of the healthiest medium-sized breeds in terms of hereditary conditions, making it a great choice for active owners.",
  'jack-russell-terrier': "The Jack Russell Terrier is a small dog packed with energy and determination. Remarkably hardy and long-lived, its main health concerns include patellar luxation, lens luxation, and deafness.",
  'westie': "The West Highland White Terrier is spirited, confident and independent. 'Westie syndrome' (severe atopic dermatitis) is a hallmark of the breed. Pulmonary fibrosis and liver disease are serious concerns in older dogs.",
  'cavalier-king-charles': "The Cavalier King Charles Spaniel is one of the gentlest, most affectionate breeds. Unfortunately, virtually all Cavaliers develop mitral valve disease by age 10 — cardiac monitoring from age 1 is essential.",
  'samoyede': "The Samoyed is a striking white Arctic breed with a playful, gentle nature. Samoyed hereditary glomerulopathy (renal disease) is a serious genetic condition. Hip dysplasia and progressive retinal atrophy also require monitoring.",
  'malamute-alaska': "The Alaskan Malamute is a powerful Arctic working breed. It requires extensive exercise and thrives in cold climates. Hereditary polyneuropathy and inherited cataracts are key genetic concerns.",
  'bernois': "The Bernese Mountain Dog is a gentle, affectionate giant from the Swiss Alps. Its lifespan is unfortunately short (7–9 years), and cancer rates are very high. Joint problems and heart conditions are also common.",
  'great-dane': "The Great Dane is the gentle giant of dogs — affectionate and calm despite its imposing size. Its short lifespan (6–8 years) reflects its significant health burdens, including cardiomyopathy and GDV (bloat).",
  'malinois': "The Belgian Malinois is a high-drive working dog used by police and military worldwide. It requires an experienced, very active owner. Hip dysplasia and eye conditions are the primary genetic concerns.",
  'bull-terrier': "The Bull Terrier is a playful, affectionate and stubborn breed. Hereditary nephritis (renal disease) is a serious concern. Deafness and skin allergies also affect the breed.",
  'staffordshire-bull-terrier': "The Staffordshire Bull Terrier is a loyal, courageous and affectionate family dog. Generally healthy, it faces restrictions under Quebec's BSL legislation. Skin allergies and cataracts are the main health concerns.",
  'bouvier-des-flandres': "The Bouvier des Flandres is a sturdy, versatile working dog. Hip dysplasia and hypothyroidism are the primary health concerns. It excels as a service dog, police dog, and companion for active families.",
  'vizsla': "The Vizsla is an athletic, affectionate Hungarian hunting dog. Called the 'velcro dog' for its attachment to its owner, it is well-suited to Quebec's climate. Watch for hip dysplasia and progressive retinal atrophy.",
  'epagneul-springer-anglais': "The English Springer Spaniel is a versatile, enthusiastic sporting dog excellent with families and children. Chronic ear infections are a common concern due to its floppy ears. Hip dysplasia and progressive retinal atrophy are the main hereditary risks.",
  'labradoodle': "The Labradoodle (Labrador × Poodle) combines the Labrador's sociability with the Poodle's low-shedding coat. Very popular in Quebec, it inherits qualities — and health risks — from both parent breeds. Coat type and temperament vary significantly by generation (F1, F1b, F2).",
  'goldendoodle': "The Goldendoodle (Golden Retriever × Poodle) is one of the most popular hybrid breeds in Quebec. Its often curly, low-shedding coat and gentle temperament make it a sought-after family dog. Cancer risk inherited from the Golden Retriever side means pet insurance is strongly recommended.",
  'leonberg': "The Leonberg is a magnificent giant bred from Newfoundland, Saint Bernard, and Chow Chow. Despite its imposing size, it is gentle and devoted to its family. Its short lifespan (8–10 years) and Leonberg polyneuropathy (LPN) are key health challenges. Veterinary costs are among the highest of all breeds.",
  'levrier-greyhound': "The Greyhound is the world's fastest dog — yet surprisingly calm and gentle at home. Often adopted from racing retirement, it adapts well to apartment living. Anesthetic sensitivity requires specialized veterinary attention. Generally robust health with few hereditary conditions.",
  'montagne-des-pyrenees': "The Great Pyrenees (Patou) is a majestic livestock guardian popular with rural Quebec families. Independent and calm, it requires less obedience-style training than herding breeds. Its thick white double coat needs significant grooming. Large size means higher veterinary costs throughout its life.",
  'berger-blanc-suisse': "The White Swiss Shepherd shares the German Shepherd's intelligence and trainability but with a calmer, more sensitive temperament. Its solid white coat requires regular brushing. Growing in popularity in Quebec, it is generally healthier than its German cousin while sharing some hereditary predispositions.",
  'nova-scotia-duck-tolling-retriever': "The Nova Scotia Duck Tolling Retriever (Toller) is Canada's only officially recognized native breed, developed in Nova Scotia. Energetic, intelligent and affectionate, it excels with active Quebec families. Addison's disease and progressive retinal atrophy are the primary genetic concerns to screen for.",
  'weimaraner': "The Weimaraner is an elegant, high-energy German hunting breed. It requires significant daily exercise. GDV (bloat) is a serious concern due to its deep chest. Spinal dysraphism is a hereditary condition to screen for.",
  'setter-irlandais': "The Irish Setter is a joyful, energetic and beautiful sporting breed. Progressive retinal atrophy and epilepsy are the primary hereditary concerns. It needs extensive daily exercise and thrives with active owners.",
  'rhodesian-ridgeback': "The Rhodesian Ridgeback is a powerful, independent breed from Southern Africa. Dermoid sinus is a serious hereditary condition unique to the breed. Hip dysplasia and hyperthyroidism also require monitoring.",
  'akita': "The Akita is a dignified, powerful Japanese breed with deep loyalty to its family. Autoimmune conditions (uveodermatological syndrome) and progressive retinal atrophy are key genetic concerns.",
  'shar-pei': "The Shar Pei is unmistakable with its deep wrinkles and blue-black tongue. Shar Pei fever (familial amyloidosis) is a serious hereditary condition. Skin fold infections and eye problems require vigilant care.",
  'chow-chow': "The Chow Chow is an aloof, dignified breed with ancient origins. Its dense double coat requires regular grooming. Hip and elbow dysplasia, entropion, and hypothyroidism are the main health concerns.",
  'lhassa-apso': "The Lhasa Apso is an ancient Tibetan companion breed, spirited and independent. Renal dysplasia is a serious hereditary concern. Its dense coat requires regular professional grooming.",
  'canaan-dog': "The Canaan Dog is one of the world's most ancient breeds. Primitive and intelligent, it is naturally healthy with few hereditary conditions. It excels in obedience and agility.",
  'pinscher-nain': "The Miniature Pinscher is a fearless, energetic toy breed. Despite its small size, it has a bold personality. Patellar luxation, Legg-Calvé-Perthes disease, and hypothyroidism are the main health considerations.",
  'carlin': "The Pug is a charming, affectionate companion with a comic personality. As a brachycephalic breed, it faces significant respiratory challenges. Pug encephalitis (NME) is a serious breed-specific condition.",
  'berger-shetland': "The Shetland Sheepdog (Sheltie) is an intelligent, sensitive herding breed. Collie Eye Anomaly (CEA) and MDR1 drug sensitivity are the primary genetic concerns. It excels in agility and obedience.",
  'schnauzer-nain': "The Miniature Schnauzer is a sturdy, spirited terrier with a distinctive beard. Hereditary hyperlipidemia is a breed-specific condition. Bladder stones and pancreatitis are also common considerations.",
  'terrier-australien': "The Australian Terrier is a spirited, hardy small terrier. Legg-Calvé-Perthes disease and diabetes mellitus are the primary health concerns. It is well-adapted to various living environments.",
};

export function getBreedDescriptionEn(breed: Breed): string {
  const custom = breedDescriptionsEn[breed.slug];
  if (custom) return custom;
  // Fallback for any breed without a custom description
  const riskStr = { faible: 'low', moyen: 'moderate', 'élevé': 'high' }[breed.riskLevel] ?? breed.riskLevel;
  const sizeStr = { petit: 'small', moyen: 'medium', grand: 'large' }[breed.size] ?? breed.size;
  return `The ${breed.name} is a ${sizeStr}-sized breed originally from ${breed.origin}. With a PetScore™ of ${breed.score}/100, this breed presents a ${riskStr} level of hereditary health risk. Annual veterinary costs are estimated at $${breed.annualVetCost.min}–$${breed.annualVetCost.max} CAD.`;
}

// ─── Score color helpers (same as FR) ──────────────────────────────────────

export function getScoreLabelEn(score: number): string {
  if (score >= 80) return 'Excellent health profile';
  if (score >= 65) return 'Good health profile';
  if (score >= 50) return 'Average health profile';
  return 'High-risk health profile';
}
