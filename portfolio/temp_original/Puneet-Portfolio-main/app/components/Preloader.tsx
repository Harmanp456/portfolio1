"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const ease = [0.76, 0, 0.24, 1] as const;

const words = ["projects.", "skills.", "ideas.", "the future."];

export default function Preloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  /* ── Counter ── */
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 2200;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quartic for dramatic slowdown near 100
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setLoading(false), 500);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  /* ── Word rotation ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Exit animation — split screen wipe */}
            <motion.div
              className="absolute inset-0 bg-background z-10"
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              style={{ transformOrigin: "top" }}
            />
            <motion.div
              className="absolute inset-0 bg-surface z-[9]"
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              style={{ transformOrigin: "top" }}
            />

            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(transparent_49.5%,#F59E0B_49.5%,#F59E0B_50.5%,transparent_50.5%),linear-gradient(90deg,transparent_49.5%,#F59E0B_49.5%,#F59E0B_50.5%,transparent_50.5%)] bg-[size:80px_80px]" />

            {/* Vertical lines background */}
            <div className="absolute inset-0 flex justify-between px-[10%] opacity-[0.02]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-[1px] h-full bg-accent" />
              ))}
            </div>

            {/* Main counter */}
            <motion.div
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative z-20 flex flex-col items-center"
            >
              {/* Percentage */}
              <div className="relative">
                <motion.span
                  className="text-[7rem] sm:text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter tabular-nums"
                  style={{
                    background:
                      "linear-gradient(180deg, #F59E0B, #F59E0B88 80%, transparent)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {String(count).padStart(3, "0")}
                </motion.span>
                {/* Reflection */}
                <span
                  className="absolute top-full left-0 right-0 text-[7rem] sm:text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter tabular-nums opacity-[0.06] scale-y-[-1]"
                  style={{ filter: "blur(4px)" }}
                >
                  {String(count).padStart(3, "0")}
                </span>
              </div>

              {/* Name + rotating word */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                <div className="flex items-center gap-4">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-accent" />
                  <span className="text-xs font-mono uppercase tracking-[0.5em] text-accent">
                    Puneet Shankar
                  </span>
                  <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-accent" />
                </div>

                <div className="text-xs font-mono text-tertiary tracking-wider">
                  Building{" "}
                  <span className="text-accent/70">{words[wordIndex]}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Progress bar — bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/20">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-hot"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>

            {/* Corner marks */}
            <div className="absolute top-6 left-6 w-6 h-6 border-l border-t border-accent/20" />
            <div className="absolute top-6 right-6 w-6 h-6 border-r border-t border-accent/20" />
            <div className="absolute bottom-6 left-6 w-6 h-6 border-l border-b border-accent/20" />
            <div className="absolute bottom-6 right-6 w-6 h-6 border-r border-b border-accent/20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
