"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { WeeklySummary } from "@/types/summary";

function last7Days(): Date {
  const d = new Date();
  d.setDate(d.getDate() - 6); // inclusive of today
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getWeeklySummary(): Promise<WeeklySummary> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("User not found");

  const since = last7Days();

  // Fetch logs with workout info
  const logs = await prisma.workoutLog.findMany({
    where: {
      userId: user.id,
      completedAt: { gte: since },
    },
    include: {
      workout: true,
    },
    orderBy: { completedAt: "asc" },
  });

  // ---- Totals ----
  const totalWorkouts = logs.length;
  const totalMinutes = logs.reduce(
    (sum, l) => sum + l.workout.durationMinutes,
    0
  );

  // ---- Per-day counts ----
  const dayMap = new Map<string, number>();
  for (let i = 0; i < 7; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    dayMap.set(key, 0);
  }

  logs.forEach((l) => {
    const key = l.completedAt.toISOString().slice(0, 10);
    dayMap.set(key, (dayMap.get(key) ?? 0) + 1);
  });

  const dailyCounts = Array.from(dayMap.entries()).map(
    ([date, count]) => ({ date, count })
  );

  // ---- Muscle breakdown ----
  const muscleMap = new Map<string, number>();
  logs.forEach((l) => {
    const muscle = l.workout.targetMuscle;
    muscleMap.set(muscle, (muscleMap.get(muscle) ?? 0) + 1);
  });

  const muscleCounts = Array.from(muscleMap.entries()).map(
    ([muscle, count]) => ({ muscle, count })
  );

  return {
    totalWorkouts,
    totalMinutes,
    dailyCounts,
    muscleCounts,
  };
}
