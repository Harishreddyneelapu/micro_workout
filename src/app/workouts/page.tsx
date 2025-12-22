// "use client";

// import { useState } from "react";
// interface Workout {
//   name: string;
//   duration: number;
//   difficulty: string;
//   targetMuscle: string;
// }
// export default function WorkoutsPage() {
// const [workout, setWorkout] = useState<Workout | null>(null);

//   async function fetchWorkout() {
//     const res = await fetch("/api/workouts");
//     const data = await res.json();
//     setWorkout(data);
//   }

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Workout Roulette</h1>

//       <button
//         onClick={fetchWorkout}
//         className="px-4 py-2 bg-green-600 text-white rounded-md"
//       >
//         Spin Workout
//       </button>

//       {workout && (
//         <div className="mt-6 p-4 border rounded-lg">
//           <h2 className="text-xl font-semibold">{workout.name}</h2>
//           <p>Duration: {workout.duration} min</p>
//           <p>Difficulty: {workout.difficulty}</p>
//           <p>Muscle: {workout.targetMuscle}</p>
//         </div>
//       )}
//     </main>
//   );
// }

import { getAllWorkouts } from "./actions";
import Link from "next/link";

export default async function WorkoutsPage() {
  const workouts = await getAllWorkouts();

  return (
    <div className="max-w-5xl mx-auto mt-12 space-y-8">
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
            className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-black">
                {workout.name}
              </h2>

              {workout.description && (
                <p className="text-gray-600 text-sm">
                  {workout.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge>{workout.difficulty}</Badge>
                <Badge>{workout.targetMuscle}</Badge>
                <Badge>{workout.durationMinutes} min</Badge>
              </div>
            </div>

            <Link
              href={`/workouts/${workout.id}`}
              className="mt-4 text-indigo-600 font-semibold hover:underline"
            >
              View details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium">
      {children}
    </span>
  );
}
