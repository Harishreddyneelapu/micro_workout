import SummaryChart from "@/components/SummaryChart";

async function getSummary() {
  const res = await fetch("http://localhost:3000/api/summary/weekly", {
    cache: "no-store",
  });
  return res.json();
}

export default async function SummaryPage() {
  const data = await getSummary();

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-bold">Weekly Summary</h1>
      <p>Total workouts: {data.summary.workout_count}</p>
      <p>Total minutes: {data.summary.total_minutes}</p>
      <SummaryChart data={data.perMuscle} />
    </div>
  );
}
