"use client";

import { motion } from "motion/react";

export default function GradientOrbs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Primary orb — top left */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, #fc4a1f, #ac0057 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Secondary orb — bottom right */}
      <motion.div
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 40, -80, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle, #fc4a1f, #d42c3b 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Tertiary orb — center */}
      <motion.div
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.02]"
        style={{
          background:
            "radial-gradient(circle, #ac0057, #fc4a1f 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
    </div>
  );
}
