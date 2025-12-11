import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // No adapter/accelerate needed in TS seed

export default async function seed() {
  console.log('🌱 Seeding database...');

  await prisma.exercise.createMany({
    data: [
      { name: 'Jumping Jacks', muscleGroup: 'full-body', instructions: 'Do jumping jacks for 30s', equipment: 'none' },
      { name: 'Burpees', muscleGroup: 'full-body', instructions: 'Do burpees for 30s', equipment: 'none' },
    ],
  });

  await prisma.workout.create({
    data: {
      name: '5-Min HIIT',
      difficulty: 'hard',
      targetMuscle: 'full-body',
      durationMinutes: 5,
      equipment: 'none',
    },
  });

  console.log('🌱 Seed completed!');
}
