"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { PreferencesForm } from "@/types/preferences";

export async function getPreferences(): Promise<PreferencesForm> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { preferences: true },
  });

  if (!user) throw new Error("User not found");

  return {
    difficulty: user.preferences?.difficulty ?? "",
    targetMuscle: user.preferences?.targetMuscle ?? "",
    equipment: user.preferences?.equipment ?? "",
  };
}

export async function savePreferences(data: PreferencesForm) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {
      difficulty: data.difficulty || null,
      targetMuscle: data.targetMuscle || null,
      equipment: data.equipment || null,
    },
    create: {
      userId: user.id,
      difficulty: data.difficulty || null,
      targetMuscle: data.targetMuscle || null,
      equipment: data.equipment || null,
    },
  });
}
