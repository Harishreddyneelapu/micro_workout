"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { StreakInfo } from "@/types/streaks";

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function getStreakInfo(): Promise<StreakInfo> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("User not found");

  const logs = await prisma.workoutLog.findMany({
    where: { userId: user.id },
    include: { workout: true },
    orderBy: { completedAt: "asc" },
  });

  if (logs.length === 0) {
    return {
      currentStreak: 0,
      bestStreak: 0,
      totalWorkouts: 0,
      badges: [],
    };
  }

  // ---- Group workouts by day ----
  const days = Array.from(
    new Set(logs.map((l) => dateKey(l.completedAt)))
  ).sort();

  // ---- Compute streaks ----
  let best = 1;
  let current = 1;

  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]);
    const curr = new Date(days[i]);

    const diff =
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }

  // Check if streak is active today
  const todayKey = dateKey(new Date());
  if (days[days.length - 1] !== todayKey) {
    current = 0;
  }

  // ---- Badges ----
  const badges: string[] = [];

  if (current >= 3) badges.push("🔥 3-Day Streak");
  if (current >= 7) badges.push("💪 7-Day Streak");
  if (logs.length >= 10) badges.push("🏅 10 Workouts");

  const muscles = new Set(logs.map((l) => l.workout.targetMuscle));
  if (
    ["legs", "arms", "core", "full-body"].every((m) =>
      muscles.has(m)
    )
  ) {
    badges.push("🧠 All Muscles Trained");
  }

  return {
    currentStreak: current,
    bestStreak: best,
    totalWorkouts: logs.length,
    badges,
  };
}
