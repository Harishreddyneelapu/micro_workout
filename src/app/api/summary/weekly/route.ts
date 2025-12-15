import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

type WeeklySummaryRow = {
  workout_count: number | bigint | string | null;
  total_minutes: number | string | null;
};

type PerMuscleRow = {
  targetMuscle: string | null;
  count: number | string | null;
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email }});
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const res = await prisma.$queryRaw<WeeklySummaryRow[]>`
    SELECT 
      COUNT(*) AS workout_count,
      COALESCE(SUM(w."durationMinutes"), 0) AS total_minutes
    FROM "WorkoutLog" l
    JOIN "Workout" w ON w.id = l."workoutId"
    WHERE l."completedAt" >= NOW() - INTERVAL '7 days'
      AND l."userId" = ${user.id};
  `;

  // Also per-muscle counts:
  const perMuscle = await prisma.$queryRaw<PerMuscleRow[]>`
    SELECT w."targetMuscle", COUNT(*) as count
    FROM "WorkoutLog" l
    JOIN "Workout" w ON w.id = l."workoutId"
    WHERE l."completedAt" >= NOW() - INTERVAL '7 days'
      AND l."userId" = ${user.id}
    GROUP BY w."targetMuscle";
  `;

  const summaryRow = res[0] ?? { workout_count: 0, total_minutes: 0 };

  // Normalize numeric types to numbers for JSON serialization
  const summary = {
    workout_count: Number(summaryRow.workout_count ?? 0),
    total_minutes: Number(summaryRow.total_minutes ?? 0),
  };

  return NextResponse.json({ summary, perMuscle });
}
