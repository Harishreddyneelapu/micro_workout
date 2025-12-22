import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function WorkoutDetails({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const workout = await prisma.workout.findUnique({
    where: { id },
    include: {
      exercises: {
        include: { exercise: true },
        orderBy: { orderIndex: "asc" },
      },
    },
  });

  if (!workout) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-8">
      <h1 className="text-3xl font-bold text-white">{workout.name}</h1>

      <div className="flex gap-4 text-white/80">
        <span>⏱ {workout.durationMinutes} min</span>
        <span>🎯 {workout.targetMuscle}</span>
        <span>🏋️ {workout.equipment ?? "none"}</span>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="font-semibold text-black">Exercises</h2>

        <ul className="space-y-3">
          {workout.exercises.map((item, i) => (
            <li
              key={item.id}
              className="flex justify-between bg-gray-50 px-4 py-3 rounded-lg"
            >
              <span className="font-medium text-black">
                {i + 1}. {item.exercise.name}
              </span>

              {item.durationSeconds && (
                <span className="text-sm text-gray-500">
                  {item.durationSeconds}s
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
