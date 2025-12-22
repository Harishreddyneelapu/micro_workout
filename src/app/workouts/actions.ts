"use server";

import { prisma } from "@/lib/prisma";

export async function getAllWorkouts() {
  return prisma.workout.findMany({
    orderBy: {
      durationMinutes: "asc",
    },
  });
}
