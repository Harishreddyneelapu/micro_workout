import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  // ---------- CLEANUP (safe for dev) ----------
  await prisma.workoutExercise.deleteMany();
  await prisma.workoutLog.deleteMany();
  await prisma.workout.deleteMany();
  await prisma.exercise.deleteMany();

  // ---------- EXERCISES ----------
await prisma.exercise.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        name: "Push-ups",
        muscleGroup: "chest",
        instructions: "Keep your body straight, lower and push up.",
      },
      {
        id: crypto.randomUUID(),
        name: "Squats",
        muscleGroup: "legs",
        instructions: "Sit back and down, then stand up.",
      },
      {
        id: crypto.randomUUID(),
        name: "Plank",
        muscleGroup: "core",
        instructions: "Hold a straight plank position.",
      },
      {
        id: crypto.randomUUID(),
        name: "Jumping Jacks",
        muscleGroup: "full-body",
        instructions: "Jump while spreading arms and legs.",
      },
      {
        id: crypto.randomUUID(),
        name: "Mountain Climbers",
        muscleGroup: "core",
        instructions: "Run knees toward chest in plank position.",
      },
    ],
  });

  const allExercises = await prisma.exercise.findMany();

  const get = (name: string) =>
    allExercises.find((e) => e.name === name)!;

  // ---------- WORKOUTS ----------
  const hiit = await prisma.workout.create({
    data: {
      name: "5-Min Full Body HIIT",
      difficulty: "hard",
      targetMuscle: "full-body",
      durationMinutes: 5,
      equipment: "none",
      description: "Quick high-intensity full body workout",
    },
  });

  const abs = await prisma.workout.create({
    data: {
      name: "6-Min Core Burner",
      difficulty: "medium",
      targetMuscle: "core",
      durationMinutes: 6,
      equipment: "mat",
      description: "Short intense core workout",
    },
  });

  // ---------- LINK EXERCISES TO WORKOUTS ----------
  await prisma.workoutExercise.createMany({
    data: [
      // HIIT
      {
        workoutId: hiit.id,
        exerciseId: get("Jumping Jacks").id,
        orderIndex: 1,
        durationSeconds: 60,
      },
      {
        workoutId: hiit.id,
        exerciseId: get("Push-ups").id,
        orderIndex: 2,
        durationSeconds: 45,
      },
      {
        workoutId: hiit.id,
        exerciseId: get("Squats").id,
        orderIndex: 3,
        durationSeconds: 60,
      },
      {
        workoutId: hiit.id,
        exerciseId: get("Mountain Climbers").id,
        orderIndex: 4,
        durationSeconds: 45,
      },

      // CORE
      {
        workoutId: abs.id,
        exerciseId: get("Plank").id,
        orderIndex: 1,
        durationSeconds: 60,
      },
      {
        workoutId: abs.id,
        exerciseId: get("Mountain Climbers").id,
        orderIndex: 2,
        durationSeconds: 45,
      },
    ],
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
