import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import WorkoutCard, { WorkoutCardData } from "./WorkoutCard";

const sampleWorkout: WorkoutCardData = {
  id: "workout-1",
  name: "7-Min Leg Blast",
  description: "A quick lower-body burner to wake up your legs.",
  difficulty: "easy",
  targetMuscle: "legs",
  durationMinutes: 7,
};

const meta: Meta<typeof WorkoutCard> = {
  title: "Components/WorkoutCard",
  component: WorkoutCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof WorkoutCard>;

export const Default: Story = {
  args: {
    workout: sampleWorkout,
  },
};

export const MediumWorkout: Story = {
  args: {
    workout: {
      ...sampleWorkout,
      name: "Core Strength Builder",
      description: "Strengthen your abs and stabilize your core.",
      difficulty: "medium",
      targetMuscle: "core",
      durationMinutes: 10,
    },
  },
};

export const HardWorkout: Story = {
  args: {
    workout: {
      ...sampleWorkout,
      name: "HIIT Cardio Burn",
      description: "High-intensity cardio to push your limits.",
      difficulty: "hard",
      targetMuscle: "full-body",
      durationMinutes: 12,
    },
  },
};

export const NoDescription: Story = {
  args: {
    workout: {
      ...sampleWorkout,
      description: null,
    },
  },
};

