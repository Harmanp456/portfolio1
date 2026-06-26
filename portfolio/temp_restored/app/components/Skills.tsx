"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { skills } from "@/lib/data";
import TiltCard from "./TiltCard";
import {
  Code2,
  Cpu,
  Wrench,
  Brain,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/* One icon per category — index order matches the categories array below */
const categoryIcons = [Code2, Cpu, Wrench, Brain];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const numberY    = useTransform(scrollYProgress, [0, 1], [80, -80]);
  /** Subtle 3D tilt on the cards grid as it scrolls into view */
  const gridRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [6, 0, 0, -3]);
  const gridY       = useTransform(scrollYProgress, [0, 0.3], [30, 0]);

  const categories = [
    { title: "Programming Languages", skills: skills.languages },
    { title: "Core Computer Science", skills: skills.core },
    { title: "Tools & Frameworks", skills: skills.tools },
    /* AI/ML learning track — marks technologies I am actively studying */
    { title: "AI / ML Learning Track", skills: skills.aiml },
  ];

  return (
    <section id="skills" ref={sectio
<truncated 3920 bytes>
map((skill, skillIdx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: 0.4 + catIdx * 0.12 + skillIdx * 0.04,
                        ease,
                      }}
                      className="px-3 py-1.5 text-[11px] font-mono font-medium rounded-md bg-accent/[0.06] text-accent/80 border border-accent/10 cursor-default transition-all duration-300 hover:bg-accent hover:text-background hover:shadow-[0_0_20px_#F59E0B44] hover:scale-105"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Count */}
                <p className="mt-6 text-[10px] font-mono text-tertiary">
                  {skillList.length} technologies
                </p>
              </motion.div>
              </TiltCard>
            );
          })}
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center text-xs font-mono text-tertiary tracking-wider"
        >
          Always learning. Always building. Currently deepening{" "}
          <span className="text-accent">AI / ML foundations</span> while exploring{" "}
          <span className="text-accent">Full Stack Development</span>.
        </motion.p>
      </div>
    </section>
  );
}
