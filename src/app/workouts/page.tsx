"use client";

import { useState } from "react";
interface Workout {
  name: string;
  duration: number;
  difficulty: string;
  targetMuscle: string;
}
export default function WorkoutsPage() {
const [workout, setWorkout] = useState<Workout | null>(null);

  async function fetchWorkout() {
    const res = await fetch("/api/workouts");
    const data = await res.json();
    setWorkout(data);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Workout Roulette</h1>

      <button
        onClick={fetchWorkout}
        className="px-4 py-2 bg-green-600 text-white rounded-md"
      >
        Spin Workout
      </button>

      {workout && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">{workout.name}</h2>
          <p>Duration: {workout.duration} min</p>
          <p>Difficulty: {workout.difficulty}</p>
          <p>Muscle: {workout.targetMuscle}</p>
        </div>
      )}
    </main>
  );
}
