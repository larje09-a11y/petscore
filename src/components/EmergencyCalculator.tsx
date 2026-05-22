import { useState } from 'react';

interface Symptom {
  id: string;
  label: string;
  urgency: 'critical' | 'urgent' | 'watch';
}

const SYMPTOMS: Symptom[] = [
  // Critique — aller maintenant
  { id: "breathing",    label: "Difficulté respiratoire sévère (souffle rapide, gueule ouverte)",  urgency: "critical" },
  { id: "bloat",        label: "Abdomen très gonflé, dur comme un ballon (possible DTG)",           urgency: "critical" },
  { id: "seizure_long", label: "Convulsions qui durent plus de 5 minutes ou se répètent",          urgency: "critical" },
  { id: "collapse",     label: "Effondrement, perte de connaissance",                               urgency: "critical" },
  { id: "gums",         label: "Gencives blanches, bleues ou grises",                              urgency: "critical" },
  { id: "poison",       label: "Ingestion possible de poison, médicament ou produit chimique",      urgency: "critical" },
  { id: "paralysis",    label: "Paralysie soudaine des pattes arrière",                            urgency: "critical" },
  { id: "trauma",       label: "Trauma sévère (accident de voiture, chute importante)",             urgency: "critical" },
  { id: "bleeding",     label: "Saignement abondant qui ne s'arrête pas après 5 minutes",          urgency: "critical" },

  // Urgent — aujourd'hui
  { id: "vomit",        label: "Vomissements répétés (plus de 3 fois en 24 heures)",              urgency: "urgent" },
  { id: "blood_stool",  label: "Diarrhée avec sang visible",                                      urgency: "urgent" },
  { id: "no_weight",    label: "Boiterie sévère (ne pose plus la patte du tout)",                  urgency: "urgent" },
  { id: "eye_severe",   label: "Oeil très rouge, fermé en permanence ou avec écoulement épais",    urgency: "urgent" },
  { id: "no_eat",       label: "Refus total de manger depuis plus de 24 heures",                   urgency: "urgent" },
  { id: "swelling",     label: "Gonflement rapide d'une zone du corps (visage, patte, abdomen)",  urgency: "urgent" },
  { id: "cry_pain",     label: "Cris ou gémissements de douleur au toucher ou lors du mouvement",  urgency: "urgent" },

  // À surveiller — dans la semaine
  { id: "scratch",      label: "Grattage excessif ou perte de poils depuis plusieurs jours",       urgency: "watch" },
  { id: "bad_breath",   label: "Mauvaise haleine persistante ou tartre important",                 urgency: "watch" },
  { id: "mild_limp",    label: "Légère boiterie (pose la patte mais boite)",                       urgency: "watch" },
  { id: "lump",         label: "Petite masse sous la peau découverte récemment",                   urgency: "watch" },
  { id: "drink_more",   label: "Boit ou urine nettement plus que d'habitude",                     urgency: "watch" },
];

const RESULTS = {
  critical: {
    label: "🚨 Urgence absolue",
    color: "border-red-300 bg-red-50",
    titleColor: "text-red-700",
    text: "Votre chien présente des symptômes qui nécessitent une consultation vétérinaire IMMÉDIATE. Appelez une clinique d'urgence maintenant ou dirigez-vous directement aux urgences vétérinaires. Ne perdez pas de temps.",
    cta: "Trouver une clinique d'urgence",
    ctaHref: "https://www.google.com/search?q=urgence+v%C3%A9t%C3%A9rinaire+pr%C3%A8s+de+moi",
    ctaColor: "bg-red-600 hover:bg-red-700",
  },
  urgent: {
    label: "⚠️ Consultation aujourd'hui",
    color: "border-amber-300 bg-amber-50",
    titleColor: "text-amber-700",
    text: "Ces symptômes nécessitent une consultation vétérinaire dans les prochaines heures. Si votre clinique habituelle est fermée, une clinique d'urgence est recommandée. Surveillez si les symptômes s'aggravent.",
    cta: "Appeler votre vétérinaire",
    ctaHref: "tel:",
    ctaColor: "bg-amber-600 hover:bg-amber-700",
  },
  watch: {
    label: "📋 Rendez-vous cette semaine",
    color: "border-blue-200 bg-blue-50",
    titleColor: "text-blue-700",
    text: "Ces symptômes ne semblent pas urgents mais méritent un examen vétérinaire dans les prochains jours. Notez l'évolution des symptômes pour en parler à votre vétérinaire.",
    cta: "Prendre rendez-vous",
    ctaHref: "https://www.google.com/search?q=v%C3%A9t%C3%A9rinaire+rendez-vous",
    ctaColor: "bg-blue-600 hover:bg-blue-700",
  },
  none: {
    label: "✅ Aucun symptôme sélectionné",
    color: "border-green-200 bg-green-50",
    titleColor: "text-green-700",
    text: "Sélectionnez les symptômes observés chez votre chien pour obtenir une recommandation.",
    cta: "",
    ctaHref: "",
    ctaColor: "",
  },
};

export default function EmergencyCalculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function getUrgencyLevel(): keyof typeof RESULTS {
    if (selected.size === 0) return 'none';
    const hasCritical = SYMPTOMS.some((s) => selected.has(s.id) && s.urgency === 'critical');
    if (hasCritical) return 'critical';
    const hasUrgent = SYMPTOMS.some((s) => selected.has(s.id) && s.urgency === 'urgent');
    if (hasUrgent) return 'urgent';
    return 'watch';
  }

  const level = getUrgencyLevel();
  const result = RESULTS[level];

  const groups: { label: string; urgency: Symptom['urgency']; color: string }[] = [
    { label: 'Urgences absolues', urgency: 'critical', color: 'text-red-600' },
    { label: 'Urgences semi-urgentes',  urgency: 'urgent',   color: 'text-amber-600' },
    { label: 'À surveiller',      urgency: 'watch',    color: 'text-blue-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Symptom groups */}
      {groups.map((group) => (
        <div key={group.urgency}>
          <h3 className={`mb-3 text-sm font-bold uppercase tracking-wide ${group.color}`}>
            {group.label}
          </h3>
          <div className="space-y-2">
            {SYMPTOMS.filter((s) => s.urgency === group.urgency).map((s) => (
              <label
                key={s.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all
                  ${selected.has(s.id)
                    ? group.urgency === 'critical' ? 'border-red-300 bg-red-50'
                    : group.urgency === 'urgent'   ? 'border-amber-300 bg-amber-50'
                    : 'border-blue-200 bg-blue-50'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={selected.has(s.id)}
                  onChange={() => toggle(s.id)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-green-600"
                />
                <span className="text-sm text-gray-700">{s.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Result */}
      {selected.size > 0 && (
        <div className={`rounded-2xl border-2 p-5 ${result.color}`}>
          <p className={`mb-2 font-display text-xl font-bold ${result.titleColor}`}>
            {result.label}
          </p>
          <p className="text-sm leading-relaxed text-gray-700">{result.text}</p>
          {result.cta && (
            <a
              href={result.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 inline-block rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition ${result.ctaColor}`}
            >
              {result.cta} →
            </a>
          )}
        </div>
      )}

      <p className="text-xs text-slate-400">
        ⚠️ Cet outil est indicatif uniquement et ne remplace pas un avis vétérinaire. En cas de doute, consultez toujours un professionnel.
      </p>
    </div>
  );
}
