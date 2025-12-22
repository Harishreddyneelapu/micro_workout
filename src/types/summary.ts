export type DailyCount = {
  date: string; // YYYY-MM-DD
  count: number;
};

export type MuscleCount = {
  muscle: string;
  count: number;
};

export type WeeklySummary = {
  totalWorkouts: number;
  totalMinutes: number;
  dailyCounts: DailyCount[];
  muscleCounts: MuscleCount[];
};
