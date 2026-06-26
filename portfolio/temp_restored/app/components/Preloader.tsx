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
      <Anima
<truncated 3358 bytes>
bg-gradient-to-r from-transparent to-accent" />
                  <span className="text-xs font-mono uppercase tracking-[0.5em] text-accent">
                    Harmanpreet Kaur
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
