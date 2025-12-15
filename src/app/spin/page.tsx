"use client";

import { useState } from "react";
import SpinButton from "@/components/SpinButton";
import WorkoutCard from "@/components/WorkoutCard";

type Workout = {
  id: string;
  name: string;
  description?: string;
  durationMinutes: number;
  difficulty?: "easy" | "medium" | "hard";
  targetMuscle?: "full-body" | "abs" | "flexibility";
  [key: string]: unknown;
};

export default function SpinPage() {
  const [workout, setWorkout] = useState<Workout | null>(null);

  async function spin() {
    const res = await fetch("/api/workouts/random");
    const data = await res.json();
    setWorkout(data);
  }

  async function completeWorkout() {
    if (!workout) return;
    await fetch("/api/workout-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workoutId: workout.id }),
    });
    alert("Workout logged 💪");
    setWorkout(null);
  }

  return (
    <div className="space-y-6">
      <SpinButton onSpin={spin} />
      {workout && (
        <WorkoutCard workout={workout} onComplete={completeWorkout} />
      )}
    </div>
  );
}
