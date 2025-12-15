import { motion } from "framer-motion";

type Workout = {
  name: string;
  description?: string;
  durationMinutes: number;
  difficulty?: "easy" | "medium" | "hard" | string;
};

export default function WorkoutCard({
  workout,
  onComplete,
}: {
  workout: Workout | null;
  onComplete: () => void;
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow"
    >
      {workout && (
        <>
          <h2 className="text-xl font-bold">{workout.name}</h2>
          <p>{workout.description}</p>
          <p>⏱ {workout.durationMinutes} min</p>
          <p>🔥 {workout.difficulty}</p>
          <button onClick={onComplete} className="btn mt-4">
            Mark Completed
          </button>
        </>
      )}
    </motion.div>
  );
}