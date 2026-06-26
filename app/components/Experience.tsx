"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { experience } from "@/lib/data";
import TiltCard from "./TiltCard";
import { Briefcase, GraduationCap, Code2, Cpu } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Software Engineering Intern": Briefcase,
  "First Developer Projects": Code2,
  "Programming Foundations": GraduationCap,
  "Started B.E. CSE (AI & ML)": Cpu,
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 sm:py-28 md:py-40 lg:py-44 px-4 sm:px-6 md:px-10 lg:px-12"
    >
      {/* Ambient light */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] opacity-[0.02] pointer-events-none">
        <div
          className="w-full h-full rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Giant background number */}
        <motion.span
          style={{ y: numberY }}
          className="absolute -top-16 -left-4 text-[12rem] md:text-[18rem] font-black leading-none text-white/[0.02] select-none pointer-events-none"
        >
          04
        </motion.span>

        {/* Section header */}
        <div className="mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-12 bg-gradient-to-r from-accent to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent">
              &#x2F;&#x2F; journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-[2.2rem] leading-[0.92] sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-primary break-words"
          >
            Engineering Journey
          </motion.h2>
        </div>

        {/* Internship Card */}
        <div className="relative max-w-4xl mx-auto mt-12">
          <TiltCard maxTilt={4} scale={1.01}>
            <div className="glass-card rounded-2xl p-8 md:p-12 animated-border group relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Period & Role */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                        {experience[0].role}
                      </h3>
                      <p className="text-base font-mono text-secondary">
                        {experience[0].company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-green-400 bg-green-400/10 border border-green-400/20 rounded-full self-start md:self-auto">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    {experience[0].period}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4 mb-8">
                  <p className="text-secondary text-base leading-relaxed">
                    {experience[0].description}
                  </p>
                </div>

                {/* Tech Stack */}
                {experience[0].techStack && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-tertiary mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience[0].techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs font-mono text-accent/80 bg-accent/5 border border-accent/20 rounded-md cursor-default transition-all duration-300 hover:text-accent hover:bg-accent/10 hover:border-accent/40 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center text-xs font-mono text-tertiary tracking-wider"
        >
          The journey continues... <span className="text-accent">always leveling up</span>
        </motion.p>
      </div>
    </section>
  );
}
