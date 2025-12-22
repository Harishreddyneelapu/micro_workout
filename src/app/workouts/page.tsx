import { getAllWorkouts } from "./actions";
import Link from "next/link";


export default async function WorkoutsPage() {
  const workouts = await getAllWorkouts();

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">📋 Browse Workouts</h1>
          <p className="text-white/70">
            Pick a workout - no randomness required
          </p>
        </div>

        <Link
          href="/spin"
          className="px-4 py-2 rounded-xl bg-white text-gray-800 font-semibold"
        >
          🎰 Spin Roulette
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className={`rounded-2xl p-6  hover:shadow-lg hover:-translate-y-0.5 transition-transform

      backdrop-blur-2xl border border-white/30
      `}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">{workout.name}</h2>

                {workout.description && (
                  <p className="text-gray-300 text-sm">{workout.description}</p>
                )}

                <div className="flex flex-wrap gap-2 pt-3">
                  <Badge>{workout.difficulty}</Badge>
                  <Badge>{workout.targetMuscle}</Badge>
                  <Badge>{workout.durationMinutes} min</Badge>
                </div>
              </div>

              <Link
                href={`/workouts/${workout.id}`}
                className="mt-4 text-indigo-100 font-semibold hover:text-indigo-500  hover:underline transition"
              >
                View details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-4 py-2 text-xs rounded-full
      bg-blue-800 text-white font-medium capitalize"
    >
      {children}
    </span>
  );
}
