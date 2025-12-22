"use client";

import { useEffect, useState } from "react";
import type { WeeklySummary } from "@/types/summary";
import { getWeeklySummary } from "./actions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { getStreakInfo } from "./streaks";
import type { StreakInfo } from "@/types/streaks";
import { fireBigConfetti } from "@/lib/confetti";
import { motion } from "framer-motion";
import { useRef } from "react";

const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#ef4444"];

export default function SummaryPage() {
  const [data, setData] = useState<WeeklySummary | null>(null);
  const [streaks, setStreaks] = useState<StreakInfo | null>(null);
  const prevBadgesRef = useRef<string[]>([]);

  useEffect(() => {
  async function load() {
    const summary = await getWeeklySummary();
    const streakInfo = await getStreakInfo();

    setData(summary);
    setStreaks(streakInfo);

    const prevBadges = prevBadgesRef.current;

    const newBadges = streakInfo.badges.filter(
      (b) => !prevBadges.includes(b)
    );

    if (newBadges.length > 0) {
      fireBigConfetti();
    }

    prevBadgesRef.current = streakInfo.badges;
  }

  load();
}, []);



  if (!data) {
    return <p className="text-center mt-20">Loading summary…</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-10">
      <h1 className="text-3xl font-bold text-center">📊 Weekly Summary</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-6 text-center">
        <div className="p-6 bg-white rounded-xl shadow">
          <p className="text-gray-500">Workouts</p>
          <p className="text-3xl font-bold text-black">{data.totalWorkouts}</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <p className="text-gray-500">Minutes</p>
          <p className="text-3xl font-bold text-black">{data.totalMinutes}</p>
        </div>
      </div>
      {streaks && (
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-white rounded-xl shadow">
            <p className="text-gray-500">Current Streak</p>
            <p className="text-3xl font-bold text-black">{streaks.currentStreak} 🔥</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <p className="text-gray-500">Best Streak</p>
            <p className="text-3xl font-bold text-black">{streaks.bestStreak} 🏆</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <p className="text-gray-500">Total Workouts</p>
            <p className="text-3xl font-bold text-black">{streaks.totalWorkouts}</p>
          </div>
        </div>
      )}
      {streaks && streaks.badges.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-3 text-black">🏅 Badges</h2>
          <div className="flex flex-wrap gap-3">
            {streaks.badges.map((badge) => (
              <motion.span
  whileHover={{ scale: 1.1 }}
  key={badge}
  className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm"
>
  {badge}
</motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Bar chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4 text-black">Workouts per Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.dailyCounts}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4 text-black">Muscle Groups Trained</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.muscleCounts}
              dataKey="count"
              nameKey="muscle"
              outerRadius={110}
              label
            >
              {data.muscleCounts.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
