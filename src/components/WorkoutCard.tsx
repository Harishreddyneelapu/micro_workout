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
          <h2 className="text-xl font-bold text-white">
            {workout.name}
          </h2>

          {workout.description && (
            <p className="text-gray-300 text-sm">
              {workout.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 pt-3">
            <Badge>{workout.difficulty}</Badge>
            <Badge>{workout.targetMuscle}</Badge>
            <Badge>{workout.durationMinutes} min</Badge>
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        px-4 py-2 text-xs rounded-full
        bg-blue-800 text-white font-medium capitalize
      "
    >
      {children}
    </span>
  );
}
