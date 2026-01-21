import { getAllWorkouts } from "./actions";
import Link from "next/link";
import WorkoutCard from "@/components/WorkoutCard";

export default async function WorkoutsPage() {
  const workouts = await getAllWorkouts();

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            📋 Browse Workouts
          </h1>
          <p className="text-white/70">
            Pick a workout – no randomness required
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
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
