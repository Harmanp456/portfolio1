"use client";

import { useRef, useCallback, useState, useEffect, type MouseEvent } from "react";
import { motion } from "motion/react";
import TextScramble from "./TextScramble";
import { ArrowRight, Github, ChevronDown, FileDown } from "lucide-react";
import { LeetCodeIcon } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

function stagger(i: number) {
  return { duration: 0.8, delay: 0.4 + i * 0.15, ease };
}

/* ═══════════════════════════════════════════
   3D HOLOGRAPHIC WIREFRAME CUBE
   Pure CSS-3D, no extra deps.
   ═══════════════════════════════════════════ */
function HoloCube({ size = 96, speed = 18 }: { size?: number; speed?: number }) {
  const half = size / 2;
  /* Six faces, each placed by rotating the box then translating along its new Z axis */
  const faces: string[] = [
    `translateZ(${half}px)`,                          // front
    `rotateY(180deg) translateZ(${half}px)`,          // back
    `rotateY(90deg)  translateZ(${half}px)`,          // right
    `rotateY(-90deg) translateZ(${half}px)`,          // left
    `rotateX(90deg)  translateZ(${half}px)`,          // top
    `rotateX(-90deg) translateZ(${half}px)`,          // bottom
  ];

  return (
    <div style={{ width: size, height: size, perspective: 520, perspe
<truncated 18294 bytes>
tracking-wider hover:border-accent/40 hover:text-primary backdrop-blur-sm transition-all duration-300"
              >
                <LeetCodeIcon className="w-4 h-4" />
                <span>LeetCode</span>
              </Magnetic>
            </div>
          </div>
        </motion.div>

        {/* Scramble role text — appears after delay; reflects AI/ML journey */}
        {showScramble && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-10 font-mono text-xs text-tertiary tracking-wider break-words"
          >
            <TextScramble
              text="// 8.44 CGPA · Angular · FastAPI · Next.js · Groq AI · building real products"
              delay={200}
              speed={15}
            />
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-tertiary">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-accent/50" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
