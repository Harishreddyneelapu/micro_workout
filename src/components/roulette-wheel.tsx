"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ROULETTE_SEGMENTS } from "@/lib/roulette-config";

type Props = {
  spinning: boolean;
  finalIndex: number | null;
};

// const SEGMENTS = [
//   { label: "Easy", color: "#22c55e" },
//   { label: "Medium", color: "#eab308" },
//   { label: "Hard", color: "#ef4444" },
//   { label: "Full", color: "#6366f1" },
//   { label: "Cardio", color: "#3b82f6" },
//   { label: "Random", color: "#9ca3af" },
// ];

export function RouletteWheel({ spinning, finalIndex }: Props) {
  const size = 260;
  const radius = size / 2;
  const center = radius;
  const sliceAngle = 360 / ROULETTE_SEGMENTS.length;

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!spinning || finalIndex === null) return;

    const spins = 5;
    const target = rotation + spins * 360 - finalIndex * sliceAngle;

    setRotation(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, finalIndex]);

  function polarToCartesian(angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  }

  function describeArc(startAngle: number, endAngle: number) {
    const start = polarToCartesian(endAngle);
    const end = polarToCartesian(startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `
      M ${center} ${center}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
      Z
    `;
  }

  return (
    <div className="relative flex justify-center items-center">
      {/* Needle */}
      <div className="absolute -top-4 z-20">
        <div
          className="w-0 h-0 border-l-8 border-r-8 border-b-16
          border-l-transparent border-r-transparent border-b-black"
        />
      </div>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rounded-full border-8 border-black shadow-2xl bg-white"
      >
        {/* 🔑 ROTATING GROUP */}
        <motion.g
          animate={{ rotate: rotation }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{
            transformOrigin: "50% 50%",
          }}
        >
          {ROULETTE_SEGMENTS.map((seg, i) => {
            const start = i * sliceAngle;
            const end = start + sliceAngle;
            const midAngle = start + sliceAngle / 2;

            const rad = ((midAngle - 90) * Math.PI) / 180;
            const textX = center + radius * 0.62 * Math.cos(rad);
            const textY = center + radius * 0.62 * Math.sin(rad);

            return (
              <g key={seg.key}>
                <path d={describeArc(start, end)} fill={seg.color} />

                {/* Label */}
                <text
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="white"
                  fontWeight="bold"
                  style={{ pointerEvents: "none" }}
                >
                  {seg.label}
                </text>
              </g>
            );
          })}
        </motion.g>

        {/* Center cap */}
        <circle cx={center} cy={center} r={radius * 0.28} fill="white" />
        <text x={center} y={center + 6} textAnchor="middle" fontSize="28">
          🎰
        </text>
      </svg>
    </div>
  );
}
