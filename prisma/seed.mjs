import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  // directly pass the database URL via `adapter` property
  adapter: {
    url: process.env.DATABASE_URL
  }
});

/* ----------------------  ALL EXERCISES  ---------------------- */
const exercises = [
  { name: "Jumping Jacks", instructions: "Perform jumping jacks for the duration.", muscleGroup: "full-body", equipment: "none" },
  // ... rest of your exercises
];

/* ----------------------  ALL WORKOUTS  ---------------------- */
const workouts = [
  {
    name: "5-Min HIIT",
    description: "High intensity interval circuit.",
    difficulty: "hard",
    targetMuscle: "full-body",
    durationMinutes: 5,
    equipment: "none",
    items: [
      { exName: "Jumping Jacks", order: 1, duration: 45 },
      { exName: "Mountain Climbers", order: 2, duration: 30 },
      { exName: "Rest", order: 3, duration: 15, custom: true },
      { exName: "Burpees", order: 4, duration: 45 },
      { exName: "High Knees", order: 5, duration: 45 },
      { exName: "Plank Hold", order: 6, duration: 30 },
    ],
  },
  // ... rest of your workouts
];

async function main() {
  console.log("🌱 Seeding exercises…");
  for (const ex of exercises) {
    await prisma.exercise.upsert({
      where: { name: ex.name },
      update: ex,
      create: ex,
    });
  }

  console.log("🌱 Seeding workouts…");
  for (const w of workouts) {
    const workout = await prisma.workout.upsert({
      where: { name: w.name },
      update: {
        description: w.description,
        difficulty: w.difficulty,
        targetMuscle: w.targetMuscle,
        durationMinutes: w.durationMinutes,
        equipment: w.equipment,
      },
      create: {
        name: w.name,
        description: w.description,
        difficulty: w.difficulty,
        targetMuscle: w.targetMuscle,
        durationMinutes: w.durationMinutes,
        equipment: w.equipment,
      },
    });

    for (const item of w.items) {
      const exercise = await prisma.exercise.findFirst({
        where: { name: item.exName },
      });

      if (!exercise) continue;

      await prisma.workoutExercise.upsert({
        where: {
          id: `${workout.id}-${exercise.id}-${item.order}`,
        },
        update: {
          orderIndex: item.order,
          durationSeconds: item.duration,
        },
        create: {
          id: `${workout.id}-${exercise.id}-${item.order}`,
          workoutId: workout.id,
          exerciseId: exercise.id,
          orderIndex: item.order,
          durationSeconds: item.duration,
        },
      });
    }
  }

  console.log("✅ Seed complete!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
