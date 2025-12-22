import { prisma } from "../src/lib/prisma";

/**
 * Incremental seed
 * Safe to run multiple times
 */
async function main() {
  console.log("🌱 Seeding exercises, workouts, and links...");

  // ---------- EXERCISES ----------
  await prisma.exercise.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        name: "Lunges",
        muscleGroup: "legs",
        instructions:
          "Step forward, lower back knee toward floor, then push back. Alternate legs.",
      },
      {
        id: crypto.randomUUID(),
        name: "Burpees",
        muscleGroup: "full-body",
        instructions:
          "Squat down, kick feet to plank, return to squat, then jump explosively upward.",
      },
      {
        id: crypto.randomUUID(),
        name: "High Knees",
        muscleGroup: "full-body",
        instructions:
          "Run in place lifting knees toward chest. Keep core tight and land softly.",
      },
      {
        id: crypto.randomUUID(),
        name: "Glute Bridges",
        muscleGroup: "legs",
        instructions:
          "Lie on back, knees bent. Drive hips upward by squeezing glutes, then lower slowly.",
      },
      {
        id: crypto.randomUUID(),
        name: "Wall Sit",
        muscleGroup: "legs",
        instructions:
          "Lean against wall with knees at 90°. Hold while keeping back flat.",
      },
      {
        id: crypto.randomUUID(),
        name: "Bicycle Crunches",
        muscleGroup: "core",
        instructions:
          "Alternate elbow-to-opposite-knee while extending the other leg.",
      },
      {
        id: crypto.randomUUID(),
        name: "Arm Circles",
        muscleGroup: "arms",
        instructions:
          "Extend arms sideways and make small controlled circles. Reverse halfway.",
      },
    ],
    skipDuplicates: true,
  });

  // ---------- WORKOUTS ----------
  await prisma.workout.createMany({
    data: [
      {
        name: "7-Min Leg Blast",
        difficulty: "easy",
        targetMuscle: "legs",
        durationMinutes: 7,
        equipment: "none",
      },
      {
        name: "5-Min Cardio Burn",
        difficulty: "hard",
        targetMuscle: "full-body",
        durationMinutes: 5,
        equipment: "none",
      },
      {
        name: "6-Min Upper Body Quickie",
        difficulty: "medium",
        targetMuscle: "arms",
        durationMinutes: 6,
        equipment: "none",
      },
      {
        name: "7-Min Core & Cardio",
        difficulty: "medium",
        targetMuscle: "core",
        durationMinutes: 7,
        equipment: "none",
      },
      {
        name: "5-Min No-Equipment Express",
        difficulty: "easy",
        targetMuscle: "full-body",
        durationMinutes: 5,
        equipment: "none",
      },
    ],
    skipDuplicates: true,
  });

  // ---------- FETCH HELPERS ----------
  const exercises = await prisma.exercise.findMany();
  const workouts = await prisma.workout.findMany();

  const getExercise = (name: string) => {
    const e = exercises.find((x) => x.name === name);
    if (!e) throw new Error(`Exercise not found: ${name}`);
    return e;
  };

  const getWorkout = (name: string) => {
    const w = workouts.find((x) => x.name === name);
    if (!w) throw new Error(`Workout not found: ${name}`);
    return w;
  };

  // ---------- LINK EXERCISES TO WORKOUTS ----------
  await prisma.workoutExercise.createMany({
    data: [
      // 7-Min Leg Blast
      {
        workoutId: getWorkout("7-Min Leg Blast").id,
        exerciseId: getExercise("Lunges").id,
        orderIndex: 1,
        durationSeconds: 60,
      },
      {
        workoutId: getWorkout("7-Min Leg Blast").id,
        exerciseId: getExercise("Wall Sit").id,
        orderIndex: 2,
        durationSeconds: 60,
      },
      {
        workoutId: getWorkout("7-Min Leg Blast").id,
        exerciseId: getExercise("Glute Bridges").id,
        orderIndex: 3,
        durationSeconds: 60,
      },

      // 5-Min Cardio Burn
      {
        workoutId: getWorkout("5-Min Cardio Burn").id,
        exerciseId: getExercise("Burpees").id,
        orderIndex: 1,
        durationSeconds: 45,
      },
      {
        workoutId: getWorkout("5-Min Cardio Burn").id,
        exerciseId: getExercise("High Knees").id,
        orderIndex: 2,
        durationSeconds: 45,
      },

      // 6-Min Upper Body Quickie
      {
        workoutId: getWorkout("6-Min Upper Body Quickie").id,
        exerciseId: getExercise("Arm Circles").id,
        orderIndex: 1,
        durationSeconds: 60,
      },
      {
        workoutId: getWorkout("6-Min Upper Body Quickie").id,
        exerciseId: getExercise("Push-ups").id,
        orderIndex: 2,
        durationSeconds: 45,
      },

      // 7-Min Core & Cardio
      {
        workoutId: getWorkout("7-Min Core & Cardio").id,
        exerciseId: getExercise("Bicycle Crunches").id,
        orderIndex: 1,
        durationSeconds: 60,
      },
      {
        workoutId: getWorkout("7-Min Core & Cardio").id,
        exerciseId: getExercise("Mountain Climbers").id,
        orderIndex: 2,
        durationSeconds: 45,
      },

      // 5-Min No-Equipment Express
      {
        workoutId: getWorkout("5-Min No-Equipment Express").id,
        exerciseId: getExercise("Jumping Jacks").id,
        orderIndex: 1,
        durationSeconds: 60,
      },
      {
        workoutId: getWorkout("5-Min No-Equipment Express").id,
        exerciseId: getExercise("Burpees").id,
        orderIndex: 2,
        durationSeconds: 45,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed complete (incremental & safe)");
}

// ---------- RUN ----------
main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
