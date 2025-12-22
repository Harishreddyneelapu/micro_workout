"use client";

import { useState, useTransition } from "react";
import { spinWorkout } from "./actions";
import { markWorkoutCompleted } from "./complete";
import type { WorkoutWithExercises } from "@/types/workout";
import { motion } from "framer-motion";

export default function SpinPage() {
  const [result, setResult] = useState<WorkoutWithExercises | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSpin() {
    startTransition(async () => {
      const data = await spinWorkout();
      setResult(data);
    });
  }

  async function handleComplete() {
    if (!result) return;
    await markWorkoutCompleted(result.workout.id);
    alert("Workout logged 🎉");
    setResult(null);
  }

  return (
    <div className="max-w-xl mx-auto mt-20 space-y-6 text-center">
      <h1 className="text-3xl font-bold">🎰 Workout Roulette</h1>

      {!result && (
        <button
          onClick={handleSpin}
          disabled={isPending}
          className="px-6 py-3 rounded-xl bg-black text-white text-lg"
        >
          {isPending ? "Spinning..." : "SPIN"}
        </button>
      )}

      {result && (
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: "spring" }}
          className="p-6 bg-white rounded-xl shadow space-y-4"
        >
          <h2 className="text-xl font-bold">
            {result.workout.name}
          </h2>

          <p>{result.workout.description}</p>

          <p className="text-sm text-gray-500">
            {result.workout.durationMinutes} min ·{" "}
            {result.workout.difficulty}
          </p>

          <ul className="text-left list-disc list-inside">
            {result.exercises.map((item) => (
              <li key={item.id}>
                {item.exercise.name}
                {item.durationSeconds
                  ? ` — ${item.durationSeconds}s`
                  : null}
              </li>
            ))}
          </ul>

          <button
            onClick={handleComplete}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Mark Completed
          </button>
        </motion.div>
      )}
    </div>
  );
}
