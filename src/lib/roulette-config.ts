export type RouletteKey =
  | "easy"
  | "medium"
  | "hard"
  | "full"
  | "cardio"
  | "random";

export const ROULETTE_SEGMENTS: {
  key: RouletteKey;
  label: string;
  color: string;
  difficulty?: string;
  targetMuscle?: string;
}[] = [
  {
    key: "easy",
    label: "Easy",
    color: "#22c55e",
    difficulty: "easy",
  },
  {
    key: "medium",
    label: "Medium",
    color: "#eab308",
    difficulty: "medium",
  },
  {
    key: "hard",
    label: "Hard",
    color: "#ef4444",
    difficulty: "hard",
  },
  {
    key: "full",
    label: "Full Body",
    color: "#6366f1",
    targetMuscle: "full-body",
  },
  {
    key: "cardio",
    label: "Cardio",
    color: "#3b82f6",
    targetMuscle: "cardio",
  },
  {
    key: "random",
    label: "Random",
    color: "#9ca3af",
  },
];
