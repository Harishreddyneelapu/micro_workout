import { NextResponse } from "next/server";

const workouts = [
  {
    name: "5-min HIIT Blast",
    duration: 5,
    difficulty: "Medium",
    targetMuscle: "Full Body",
  },
  {
    name: "7-min Abs Shred",
    duration: 7,
    difficulty: "Hard",
    targetMuscle: "Abs",
  },
  {
    name: "5-min Stretch",
    duration: 5,
    difficulty: "Easy",
    targetMuscle: "Flexibility",
  },
];

export function GET() {
  const random = workouts[Math.floor(Math.random() * workouts.length)];
  return NextResponse.json(random);
}
