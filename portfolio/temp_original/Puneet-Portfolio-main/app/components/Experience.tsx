"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { experience } from "@/lib/data";
import TiltCard from "./TiltCard";
import { Briefcase, GraduationCap, Code2, Cpu } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, React.ElementType> = {
  "Started Computer Science": GraduationCap,
  "Programming Foundations": Code2,
  "First Developer Projects": Briefcase,
  "Current Focus — AI & ML": Cpu,
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

        {/* Timeline */}
        <div className="relative overflow-visible pl-1 sm:pl-2 md:pl-0">
          {/* Vertical line */}
          <div className="absolute left-[27px] sm:left-[29px] md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px]">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
              className="w-full h-full bg-gradient-to-b from-accent via-accent/30 to-transparent origin-top"
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12 sm:space-y-16">
            {experience.map((item, i) => {
              const Icon = iconMap[item.role] || Briefcase;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, y: 40, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.15, ease }}
                  style={{ perspective: 900 }}
                  className={`relative flex items-start gap-6 sm:gap-8 md:gap-0 overflow-visible ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[18px] sm:left-[20px] md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="w-[20px] h-[20px] rounded-full border-2 border-accent bg-background flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full border border-accent/30 animate-[pulse-ring_2s_ease-in-out_infinite]" />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-16 sm:ml-18 md:ml-0 md:w-[calc(50%-40px)] ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <TiltCard maxTilt={6} scale={1.02}>
                    <div className="glass-card rounded-xl p-6 md:p-8 animated-border group">
                      {/* Period badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                          {item.period}
                        </span>
                        {i === experience.length - 1 && (
                          <span className="flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-green-400 bg-green-400/10 border border-green-400/20 rounded-full ml-auto">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Now
                          </span>
                        )}
                      </div>

                      {/* Role + Company */}
                      <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                        {item.role}
                      </h3>
                      <p className="text-sm font-mono text-secondary mb-4">
                        {item.company}
                      </p>

                      {/* Description */}
                      <p className="text-secondary text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Tech tags */}
                      {item.techStack && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-[9px] font-mono text-accent/60 bg-accent/[0.04] border border-accent/10 rounded cursor-default transition-all duration-200 hover:text-accent hover:bg-accent/10 hover:border-accent/40 hover:shadow-[0_0_8px_rgba(245,158,11,0.35)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    </TiltCard>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline end dot */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="absolute left-[18px] sm:left-[20px] md:left-1/2 md:-translate-x-1/2 -bottom-4"
          >
            <div className="w-[20px] h-[20px] rounded-full bg-green-400/20 border border-green-400/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-400/60 animate-pulse" />
            </div>
          </motion.div>
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
