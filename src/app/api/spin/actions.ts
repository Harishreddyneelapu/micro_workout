"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { WorkoutWithExercises } from "@/types/workout";

export async function spinWorkout(): Promise<WorkoutWithExercises | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { preferences: true },
  });

  if (!user) throw new Error("User not found");

  const prefs = user.preferences;

  // ✅ Typed Prisma where clause
  const where: {
    difficulty?: string;
    targetMuscle?: string;
    equipment?: string;
  } = {};

  if (prefs?.difficulty) where.difficulty = prefs.difficulty;
  if (prefs?.targetMuscle) where.targetMuscle = prefs.targetMuscle;
  if (prefs?.equipment) where.equipment = prefs.equipment;

  // ✅ Fetch matching workouts
  const workouts = await prisma.workout.findMany({
    where,
  });

  if (workouts.length === 0) return null;

  // ✅ Random selection in JS (simple & safe)
  const workout =
    workouts[Math.floor(Math.random() * workouts.length)];

  const exercises = await prisma.workoutExercise.findMany({
    where: { workoutId: workout.id },
    include: { exercise: true },
    orderBy: { orderIndex: "asc" },
  });

  return { workout, exercises };
}
