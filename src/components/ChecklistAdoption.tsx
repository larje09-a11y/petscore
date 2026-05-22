import { useState, useEffect } from 'react';

interface CheckItem {
  id: string;
  label: string;
  detail?: string;
  link?: { text: string; href: string };
}

interface Section {
  title: string;
  icon: string;
  items: CheckItem[];
}

const SECTIONS: Section[] = [
  {
    title: "Avant d'adopter",
    icon: "🔍",
    items: [
      { id: "a1", label: "Choisir sa race selon son style de vie", detail: "Énergie, taille, budget, présence d'enfants.", link: { text: "Faire le quiz", href: "/fr/quiz/" } },
      { id: "a2", label: "Lire la fiche race et le PetScore™", detail: "Comprendre les risques de santé et les coûts prévisibles." },
      { id: "a3", label: "Rechercher un éleveur certifié CKC ou un refuge", detail: "Vérifier les tests génétiques OFA, visiter l'élevage." },
      { id: "a4", label: "Calculer le budget annuel complet", detail: "Nourriture + vétérinaire + toilettage + assurance + accessoires.", link: { text: "Calculateur budget", href: "/fr/races/" } },
      { id: "a5", label: "Souscrire une assurance santé animale", detail: "Idéalement avant la première visite vétérinaire.", link: { text: "Comparer assurances", href: "/fr/assurance/" } },
      { id: "a6", label: "Vérifier les règlements locaux", detail: "Certaines races sont réglementées ou interdites selon la municipalité au Québec.", link: { text: "Races réglementées", href: "/fr/races/races-interdites-quebec" } },
      { id: "a7", label: "Préparer la maison : zones de danger", detail: "Fil électriques, produits ménagers, plantes toxiques rangés hors de portée.", link: { text: "Plantes toxiques", href: "/fr/blog/plantes-toxiques-chien-quebec" } },
      { id: "a8", label: "Acheter les équipements de base", detail: "Laisse, collier, gamelles, cage/caisse, jouets, litière et brosse adaptée." },
    ],
  },
  {
    title: "Le jour J — arrivée du chien",
    icon: "🐶",
    items: [
      { id: "b1", label: "Récupérer le carnet de santé et vaccins", detail: "DHPP, rage, leptospirose — à apporter au premier vétérinaire." },
      { id: "b2", label: "Récupérer le contrat de vente ou d'adoption", detail: "Conserver précieusement avec les documents vétérinaires." },
      { id: "b3", label: "Installer la zone de couchage dès l'arrivée", detail: "Un endroit calme et sécurisé réduit le stress d'arrivée." },
      { id: "b4", label: "Présenter la maison calmement", detail: "Pas de sur-stimulation les premiers jours. Laissez le chien explorer à son rythme." },
      { id: "b5", label: "Établir une routine alimentation / sorties", detail: "Même horaires dès le premier jour : crée la sécurité et facilite l'apprentissage de la propreté." },
      { id: "b6", label: "Ne pas inviter de visiteurs les 2-3 premiers jours", detail: "Laissez le chien se familiariser avec le noyau familial d'abord." },
    ],
  },
  {
    title: "Semaine 1 — santé et administratif",
    icon: "🏥",
    items: [
      { id: "c1", label: "Prendre rendez-vous chez le vétérinaire (dans les 72h)", detail: "Bilan de santé complet, vérification des vaccins, parasites.", link: { text: "Urgence vétérinaire", href: "/fr/urgence/" } },
      { id: "c2", label: "Faire poser une micropuce (si pas encore fait)", detail: "Obligatoire dans plusieurs municipalités au Québec. Coût : 30–60 $." },
      { id: "c3", label: "Enregistrer le chien auprès de la ville", detail: "Médaille de chien requise dans la plupart des municipalités QC. Coût : 20–60 $." },
      { id: "c4", label: "Prendre une photo du chien avec description", detail: "En cas de fugue. Inclure la couleur, la taille, les marquages distinctifs." },
      { id: "c5", label: "Commencer la vermifugation et antiparasitaires", detail: "Selon le protocole vétérinaire, souvent toutes les 2-3 semaines chez le chiot." },
      { id: "c6", label: "Enregistrer l'assurance santé", detail: "Envoyer les documents à l'assureur dans les délais prévus au contrat." },
    ],
  },
  {
    title: "Premier mois — socialisation et éducation",
    icon: "🎓",
    items: [
      { id: "d1", label: "Commencer les cours d'obéissance de base", detail: "Assis, couché, rappel, marche en laisse. Dès 8 semaines pour les chiots." },
      { id: "d2", label: "Socialiser avec d'autres chiens (vaccinés)", detail: "Parcs canins, rencontres organisées. Crucial entre 3 et 14 semaines." },
      { id: "d3", label: "Habituer aux bruits, voyages, manipulations", detail: "Brosser, toucher les pattes, les oreilles, la bouche — prépare aux soins vétérinaires." },
      { id: "d4", label: "Commencer l'apprentissage de la propreté", detail: "Sortir immédiatement après les repas, le réveil, les jeux. Récompenser chaque succès." },
      { id: "d5", label: "Planifier la stérilisation / castration", detail: "Discuter avec le vétérinaire du bon timing selon la race et la taille.", link: { text: "Article stérilisation", href: "/fr/blog/sterilisation-chien" } },
      { id: "d6", label: "Programmer le calendrier de vaccins et soins", detail: "Rappels de vaccins, traitements antiparasitaires, détartrage annuel.", link: { text: "PetCalendar™", href: "/fr/calendrier/" } },
    ],
  },
  {
    title: "La première année — santé préventive",
    icon: "📅",
    items: [
      { id: "e1", label: "Visite vétérinaire annuelle planifiée", detail: "Même en l'absence de symptômes. Détection précoce = économies à long terme." },
      { id: "e2", label: "Alimentation adaptée à la phase de croissance", detail: "Croquettes junior jusqu'à 12-18 mois selon la race.", link: { text: "Alimentation croquettes", href: "/fr/blog/alimentation-croquettes-vs-raw" } },
      { id: "e3", label: "Tests génétiques OFA recommandés (si applicable)", detail: "Hanche, coude, yeux — selon la race. Résultats à conserver dans le dossier." },
      { id: "e4", label: "Traitement antiparasitaire printanier (tiques/puces)", detail: "Commencer avant mai au Québec. Tiques actives dès +4°C.", link: { text: "Guide tiques/puces", href: "/fr/blog/tiques-puces-chien-quebec" } },
      { id: "e5", label: "Renouveler l'assurance et vérifier la couverture", detail: "Vérifier les exclusions pour conditions préexistantes déclarées en cours d'année." },
      { id: "e6", label: "Mettre à jour l'enregistrement municipal", detail: "Annuel dans la plupart des villes. Nouvelle médaille ou renouvellement." },
    ],
  },
];

const STORAGE_KEY = 'petscore_checklist_v1';

export default function ChecklistAdoption() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setChecked(new Set(JSON.parse(saved))); } catch {}
    }
    setLoaded(true);
  }, []);

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  function reset() {
    setChecked(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }

  const total   = SECTIONS.reduce((s, sec) => s + sec.items.length, 0);
  const done    = checked.size;
  const pct     = Math.round((done / total) * 100);

  const barColor = pct === 100 ? 'bg-green-500' : pct >= 50 ? 'bg-blue-500' : 'bg-amber-400';

  if (!loaded) return null;

  return (
    <div>
      {/* Barre de progression */}
      <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-display font-semibold text-gray-900">
              Progression : {done} / {total} étapes
            </p>
            <p className="text-xs text-slate-400">
              {pct === 100 ? '🎉 Félicitations ! Vous êtes prêt·e !' : `${pct}% complété — continuez !`}
            </p>
          </div>
          <span className="text-2xl font-bold text-gray-800">{pct}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
          <div className={`h-3 rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 rounded-xl border border-gray-200 py-2 text-xs font-semibold text-slate-600 hover:bg-gray-50 transition-colors"
          >
            🖨️ Imprimer
          </button>
          {done > 0 && (
            <button
              onClick={reset}
              className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-gray-50 transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {SECTIONS.map(section => {
          const sectionDone = section.items.filter(i => checked.has(i.id)).length;
          const allDone = sectionDone === section.items.length;
          return (
            <section key={section.title}>
              <div className={`mb-4 flex items-center justify-between rounded-xl px-4 py-3 ${allDone ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'}`}>
                <h2 className="flex items-center gap-2 font-display text-base font-bold text-gray-900">
                  <span>{section.icon}</span> {section.title}
                </h2>
                <span className={`text-xs font-semibold ${allDone ? 'text-green-600' : 'text-slate-400'}`}>
                  {allDone ? '✓ Terminé' : `${sectionDone}/${section.items.length}`}
                </span>
              </div>
              <div className="space-y-2">
                {section.items.map(item => {
                  const isChecked = checked.has(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-150 ${isChecked ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'}`}
                    >
                      {/* Checkbox */}
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${isChecked ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'}`}>
                        {isChecked && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-semibold ${isChecked ? 'text-green-700 line-through decoration-green-400/60' : 'text-gray-800'}`}>
                          {item.label}
                        </p>
                        {item.detail && (
                          <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{item.detail}</p>
                        )}
                        {item.link && !isChecked && (
                          <a
                            href={item.link.href}
                            onClick={e => e.stopPropagation()}
                            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:underline"
                          >
                            {item.link.text} →
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {pct === 100 && (
        <div className="mt-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 text-center">
          <p className="text-3xl mb-2">🎉</p>
          <p className="font-display text-xl font-bold text-green-800">Félicitations !</p>
          <p className="mt-1 text-sm text-green-700">Vous avez complété toutes les étapes. Votre chien est entre de bonnes mains !</p>
          <a href="/fr/calendrier/" className="mt-4 inline-block rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors">
            Voir le calendrier santé →
          </a>
        </div>
      )}
    </div>
  );
}
