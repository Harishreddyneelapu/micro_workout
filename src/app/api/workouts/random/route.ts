import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma, Workout } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, include: { preferences: true }});
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  const { difficulty, targetMuscle } = user.preferences || {};
  const where: Prisma.WorkoutWhereInput = {};
  if (difficulty) where.difficulty = difficulty;
  if (targetMuscle) where.targetMuscle = targetMuscle;
  if (targetMuscle) where.targetMuscle = targetMuscle;

  const workout = await prisma.workout.findFirst({
    where,
    orderBy: { id: "asc" }, // Prisma doesn't support random order directly for all adapters; use raw query for truly random
  });

  // For true randomness:
  const random = await prisma.$queryRawUnsafe(
    `SELECT * FROM "Workout" WHERE ${difficulty ? `difficulty = '${difficulty}' AND` : ''} ${targetMuscle ? `target_muscle = '${targetMuscle}'` : 'true'} ORDER BY RANDOM() LIMIT 1;`
  ) as Workout[];

  return NextResponse.json(random[0] || workout);
}
