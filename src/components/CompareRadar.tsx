import type { Breed } from "@/types/breed";

interface Props {
  breed1: Breed;
  breed2: Breed;
}

const AXES = [
  { key: "score",           label: "Santé",        max: 100 },
  { key: "energy",          label: "Énergie",       max: 5   },
  { key: "trainability",    label: "Dressage",      max: 5   },
  { key: "socialWithKids",  label: "Enfants",       max: 5   },
  { key: "grooming",        label: "Entretien ↓",   max: 5, invert: true },
] as const;

const N = AXES.length;
const CX = 150;
const CY = 150;
const R  = 110;

function polar(angle: number, radius: number): [number, number] {
  const rad = (angle - 90) * (Math.PI / 180);
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)];
}

function getVal(breed: Breed, key: string, max: number, invert?: boolean): number {
  let raw: number;
  if (key === "score") {
    raw = breed.score / 100;
  } else {
    raw = (breed.traits as unknown as Record<string, number>)[key] / max;
  }
  return invert ? 1 - raw : raw;
}

function buildPath(breed: Breed): string {
  return AXES.map((axis, i) => {
    const angle = (360 / N) * i;
    const frac  = getVal(breed, axis.key, axis.max, "invert" in axis ? axis.invert : undefined);
    const [x, y] = polar(angle, R * frac);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ") + " Z";
}

export default function CompareRadar({ breed1, breed2 }: Props) {
  const path1 = buildPath(breed1);
  const path2 = buildPath(breed2);

  const hex1 = "#16A34A";
  const hex2 = "#3B82F6";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
        Profil comparé
      </p>
      <svg viewBox="0 0 300 300" className="mx-auto w-full max-w-xs" aria-label="Radar de comparaison">
        {/* Grilles de fond */}
        {[0.25, 0.5, 0.75, 1].map((frac) => (
          <polygon
            key={frac}
            points={AXES.map((_, i) => {
              const [x, y] = polar((360 / N) * i, R * frac);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(" ")}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {AXES.map((_, i) => {
          const [x, y] = polar((360 / N) * i, R);
          return (
            <line
              key={i}
              x1={CX} y1={CY}
              x2={x.toFixed(1)} y2={y.toFixed(1)}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          );
        })}

        {/* Race 1 */}
        <path d={path1} fill={hex1} fillOpacity={0.15} stroke={hex1} strokeWidth="2" strokeLinejoin="round" />

        {/* Race 2 */}
        <path d={path2} fill={hex2} fillOpacity={0.15} stroke={hex2} strokeWidth="2" strokeLinejoin="round" />

        {/* Labels axes */}
        {AXES.map((axis, i) => {
          const [x, y] = polar((360 / N) * i, R + 18);
          return (
            <text
              key={i}
              x={x.toFixed(1)}
              y={y.toFixed(1)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fontFamily="Inter, sans-serif"
              fill="#6B7280"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>

      {/* Légende */}
      <div className="mt-3 flex justify-center gap-6 text-xs font-medium">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: hex1 }} />
          {breed1.name}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: hex2 }} />
          {breed2.name}
        </span>
      </div>
    </div>
  );
}
