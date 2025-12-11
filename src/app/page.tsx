export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Micro Workout Roulette</h1>
      <a
        href="/workouts"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Start Workout
      </a>
    </main>
  );
}
