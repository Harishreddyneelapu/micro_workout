"use client";

import { useEffect, useState, useTransition } from "react";
import type { WorkoutWithExercises } from "@/types/workout";
import { motion, AnimatePresence } from "framer-motion";
import { spinWorkout } from "../api/spin/actions";
import { markWorkoutCompleted } from "../api/spin/complete";
import { fireConfetti } from "@/lib/confetti";
import { RouletteWheel } from "@/components/roulette-wheel";
import { startSpinSound, stopSpinSound } from "@/lib/sound";
import LoadingIndicator from "@/components/loading-indicator";

export default function SpinPage() {
  const [result, setResult] = useState<WorkoutWithExercises | null>(null);
  const [isPending, startTransition] = useTransition();
  const [spinning, setSpinning] = useState(false);
  const [finalIndex, setFinalIndex] = useState<number | null>(null);

  function handleSpin() {
    if (spinning) return;

    // 🎯 pick where the wheel should stop
    const index = Math.floor(Math.random() * 6);
    setFinalIndex(index);

    setSpinning(true);
    startSpinSound();

    startTransition(async () => {
      const data = await spinWorkout();
      if (isPending) {
        <LoadingIndicator />;
      }
      setTimeout(() => {
        stopSpinSound();
        setResult(data);
        setSpinning(false);
      }, 1400);
    });
  }

  useEffect(() => {
    return () => {
      stopSpinSound();
    };
  }, []);
  async function handleComplete() {
    if (!result) return;

    await markWorkoutCompleted(result.workout.id);
    fireConfetti();

    setTimeout(() => {
      setResult(null);
    }, 900);
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-white">
          🎰 Workout Roulette
        </h1>
        <p className="text-white">Spin the wheel and get a micro workout</p>
      </div>

      {/* Roulette */}
      {!result && (
        <div className="flex flex-col gap-4 text-center">
          <RouletteWheel spinning={spinning} finalIndex={finalIndex} />{" "}
          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSpin}
              disabled={spinning}
              className="px-4 rounded-2xl bg-white text-gray-600 text-xl font-bold shadow-lg py-2"
            >
              {spinning ? "Spinning…" : "SPIN 🎲"}
            </motion.button>

            <p className="text-sm text-white">
              Difficulty, muscle & duration randomized
            </p>
          </div>
        </div>
      )}

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ scale: 0.85, rotate: -6, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
          >
            {/* Workout header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-black">
                  {result.workout.name}
                </h2>
                {result.workout.description && (
                  <p className="text-gray-600 mt-1">
                    {result.workout.description}
                  </p>
                )}
              </div>

              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                {result.workout.difficulty.toUpperCase()}
              </span>
            </div>

            {/* Meta */}
            <div className="flex gap-4 text-sm text-gray-500">
              <span>⏱ {result.workout.durationMinutes} min</span>
              <span>🎯 {result.workout.targetMuscle}</span>
              <span>🏋️ {result.workout.equipment ?? "none"}</span>
            </div>

            {/* Exercises */}
            <div>
              <h3 className="font-semibold text-black mb-3">Exercises</h3>
              <ul className="space-y-3">
                {result.exercises.map((item, idx) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg"
                  >
                    <div className="flex gap-3 items-center">
                      <span className="font-semibold text-gray-400">
                        {idx + 1}.
                      </span>
                      <span className="text-black font-medium">
                        {item.exercise.name}
                      </span>
                    </div>

                    {item.durationSeconds && (
                      <span className="text-sm text-gray-500">
                        {item.durationSeconds}s
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setResult(null)}
                className="text-sm text-gray-500 hover:underline"
              >
                Spin again
              </button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow"
              >
                 Mark Completed
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
