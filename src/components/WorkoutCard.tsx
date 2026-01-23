import Link from "next/link";

export type WorkoutCardData = {
  id: string;
  name: string;
  description?: string | null;
  difficulty: string;
  targetMuscle: string;
  durationMinutes: number;
};

export default function WorkoutCard({ workout }: { workout: WorkoutCardData }) {
  return (
    <div
      className=" bg-black/30
        rounded-2xl p-6
        backdrop-blur-2xl border border-white/30
        hover:shadow-lg hover:-translate-y-0.5
        transition-transform
      "
    >
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">{workout.name}</h2>

          {workout.description && (
            <p className="text-gray-300 text-sm">{workout.description}</p>
          )}

          <div className="flex flex-wrap gap-2 pt-3">
            {/* ✅ difficulty badge color changes */}
            <Badge variant="difficulty" value={workout.difficulty}>
              {workout.difficulty}
            </Badge>

            <Badge variant="default">{workout.targetMuscle}</Badge>
            <Badge variant="default">{workout.durationMinutes} min</Badge>
          </div>
        </div>

        <Link
          href={`/workouts/${workout.id}`}
          className="
            mt-4 text-indigo-100 font-semibold
            hover:text-indigo-500 hover:underline transition
          "
        >
          View details →
        </Link>
      </div>
    </div>
  );
}

/* ---------- Badge ---------- */

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "difficulty";
  value?: string;
};

function Badge({ children, variant = "default", value }: BadgeProps) {
  const base =
    "px-4 py-2 text-xs rounded-full font-medium capitalize text-white";

  const difficultyClasses = (() => {
    const d = value?.toLowerCase();

    if (d === "easy") return "bg-green-600/80 border border-green-400/40";
    if (d === "medium") return "bg-yellow-600/80 border border-yellow-400/40";
    if (d === "hard") return "bg-red-600/80 border border-red-400/40";

    return "bg-gray-600/80 border border-gray-400/40";
  })();

  const defaultClasses = "bg-blue-800/80 border border-white/10";

  return (
    <span className={`${base} ${variant === "difficulty" ? difficultyClasses : defaultClasses}`}>
      {children}
    </span>
  );
}
