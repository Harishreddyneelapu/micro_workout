import type { Workout, Exercise, WorkoutExercise } from "@prisma/client";

export type WorkoutWithExercises = {
  workout: Workout;
  exercises: (WorkoutExercise & {
    exercise: Exercise;
  })[];
};
