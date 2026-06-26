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
    /* AI/ML learning track — marks technologies Puneet is actively studying */
    { title: "AI / ML Learning Track", skills: skills.aiml },
  ];

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 md:py-44 px-6 md:px-12">
      {/* Ambient light */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, #F59E0B, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Giant background number — parallax */}
        <motion.span
          style={{ y: numberY }}
          className="absolute -top-16 -left-4 text-[12rem] md:text-[18rem] font-black leading-none text-white/[0.02] select-none pointer-events-none"
        >
          02
        </motion.span>

        {/* Section header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-12 bg-gradient-to-r from-accent to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent">
              &#x2F;&#x2F; skills &amp; tools
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-primary"
          >
            What I Know
          </motion.h2>
        </div>

        {/* Cards grid — 2 cols on md, 4 cols on xl for the 4 categories */}
        <motion.div
          style={{ rotateX: gridRotateX, y: gridY, perspective: 1000 }}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {categories.map(({ title, skills: skillList }, catIdx) => {
            const Icon = categoryIcons[catIdx];
            return (
              <TiltCard key={title} maxTilt={8} scale={1.025}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + catIdx * 0.12, ease }}
                className="glass-card rounded-xl p-8 animated-border group"
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-accent/60 tracking-widest">
                        {pad(catIdx + 1)}
                      </span>
                      <h3 className="text-lg font-bold text-primary leading-tight">
                        {title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gradient-to-r from-border/50 to-transparent mb-6" />

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, skillIdx) => (
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
