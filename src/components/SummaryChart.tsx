"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

type SummaryData = { targetMuscle: string; count: number };

export default function SummaryChart({ data }: { data: SummaryData[] }) {
  return (
    <BarChart width={300} height={200} data={data}>
      <XAxis dataKey="targetMuscle" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" />
    </BarChart>
  );
}
