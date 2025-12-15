"use client";

import { motion } from "framer-motion";

export default function SpinButton({ onSpin }: { onSpin: () => void }) {
  return (
    <motion.button
      whileTap={{ rotate: 360 }}
      className="bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold"
      onClick={onSpin}
    >
      🎰 SPIN
    </motion.button>
  );
}
