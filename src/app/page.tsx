import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getStreakInfo } from "@/app/summary/streaks";
type DashboardProps = {
  searchParams: {
    from?: string;
  };
};

export default async function DashboardPage({ searchParams }: DashboardProps) {
  // ---------- AUTH ----------
  const session = await getAuthSession();
  console.log("DashboardPage session:", session);
  
  const searchParamsPromise = await searchParams;
  const justLoggedIn = searchParamsPromise.from === "login";

  if (!session) redirect("/login");

  const email = session.user?.email;
  if (!email) redirect("/login");

  // ---------- DATA ----------
  const user = await prisma.user.findUnique({
    where: { email },
    include: { workoutLogs: true },
  });

  const totalWorkouts = user?.workoutLogs.length ?? 0;
  const lastWorkout = user?.workoutLogs[user.workoutLogs.length - 1];

  // 🔥 Reuse existing streak logic
  const streakInfo = await getStreakInfo();

  // ---------- UI ----------
  return (
    <div className="space-y-8 max-w-5xl mx-auto mt-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">
          {justLoggedIn ? "👋 Welcome back" : "🏠 Dashboard"}
        </h1>
        {justLoggedIn && (
          <p className="text-white">
            Logged in as{"   "}
            <span className="font-medium text-white text-xl">{email}</span>
          </p>
        )}

        <p className="font-medium text-white text-xl">
          All your progress in one place
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Workouts" value={totalWorkouts} emoji="💪" />

        {/* ✅ REAL STREAK VALUE */}
        <StatCard
          title="Current Streak"
          value={streakInfo.currentStreak}
          emoji="🔥"
          description={
            streakInfo.currentStreak === 0
              ? "Start a streak today"
              : "Days in a row"
          }
        />

        <StatCard
          title="Last Workout"
          value={
            lastWorkout
              ? new Date(lastWorkout.completedAt).toLocaleDateString()
              : "--"
          }
          emoji="🕒"
        />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActionCard
          title="🎰 Spin a Workout"
          description="Get a random micro workout now"
          href="/spin"
        />

        <ActionCard
          title="📊 Weekly Summary"
          description="Track workouts, streaks & badges"
          href="/summary"
        />

        <ActionCard
          title="⚙️ Preferences"
          description="Customize your workout filters"
          href="/preferences"
        />

        <ActionCard
          title="🏅 Streaks & Badges"
          description="View achievements"
          href="/summary"
        />
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({
  title,
  value,
  emoji,
  description,
}: {
  title: string;
  value: string | number;
  emoji?: string;
  description?: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-black">
        {value} {emoji}
      </p>
      {description && (
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      )}
    </div>
  );
}

function ActionCard({
  title,
  description,
  href,
  primary,
}: {
  title: string;
  description: string;
  href: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-xl p-6 shadow transition hover:shadow-lg
        ${primary ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p
        className={`text-sm mt-1 ${
          primary ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {description}
      </p>
    </Link>
  );
}
