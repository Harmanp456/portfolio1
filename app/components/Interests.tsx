"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import TiltCard from "./TiltCard";
import { Music, Palette, Languages, Trophy, PenTool } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

interface InterestItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  tag: string;
}

const interestsData: InterestItem[] = [
  {
    title: "Singing",
    description: "Vocal training and standard performances. Music brings balance, creative expression, and focus to my development routine.",
    icon: Music,
    gradient: "from-pink-500 to-rose-600",
    tag: "Creative"
  },
  {
    title: "Painting",
    description: "Creating visual art on canvas. Enhances spatial thinking, attention to detail, and a deep appreciation for UI/UX design aesthetics.",
    icon: Palette,
    gradient: "from-blue-500 to-indigo-600",
    tag: "Artistic"
  },
  {
    title: "Japanese Language",
    description: "Learning Hiragana, Katakana, and basic Kanji. Driven by a passion for global cultures, linguistic structures, and mental agility.",
    icon: Languages,
    gradient: "from-emerald-500 to-teal-600",
    tag: "Languages"
  },
  {
    title: "Hackathons",
    description: "Participating in collaborative build sprints. Building fast, iterating on feedback, and shipping functional solutions under pressure.",
    icon: Trophy,
    gradient: "from-amber-500 to-orange-600",
    tag: "Competition"
  },
  {
    title: "Technical Writing",
    description: "Documenting systems, writing implementation plans, and detailing project work. Making complex tech accessible to everyone.",
    icon: PenTool,
    gradient: "from-purple-500 to-fuchsia-600",
    tag: "Community"
  }
];

export default function Interests() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="interests"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] opacity-[0.025] pointer-events-none">
        <div
          className="w-full h-full rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, #ac0057, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Giant background number */}
        <motion.span
          style={{ y: numberY }}
          className="absolute -top-16 -left-4 text-[12rem] md:text-[18rem] font-black leading-none text-white/[0.02] select-none pointer-events-none"
        >
          05
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
              &#x2F;&#x2F; beyond tech
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-[2.2rem] leading-[0.92] sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-primary break-words"
          >
            Interests & Hobbies
          </motion.h2>
        </div>

        {/* Interests Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {interestsData.map((interest, i) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className={`${
                  i === 3 ? "sm:col-span-2 lg:col-span-1" : i === 4 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <TiltCard maxTilt={6} scale={1.02} glare={true} className="h-full">
                  <div className="glass-card rounded-xl p-6 md:p-8 border border-border/50 h-full flex flex-col justify-between animated-border group relative overflow-hidden">
                    {/* Corner gradient orb on card hover */}
                    <div className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-tr ${interest.gradient} opacity-[0.03] group-hover:opacity-[0.12] rounded-full blur-2xl transition-opacity duration-500 pointer-events-none`} />

                    <div>
                      {/* Icon header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${interest.gradient} p-[1px] shadow-lg shadow-black/30`}>
                          <div className="w-full h-full rounded-xl bg-surface flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-secondary bg-surface/80 border border-border/40 px-2.5 py-1 rounded-full">
                          {interest.tag}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-3">
                        {interest.title}
                      </h3>
                      <p className="text-sm text-secondary/90 leading-relaxed">
                        {interest.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-border/20 flex items-center justify-between text-[10px] font-mono text-tertiary">
                      <span>STABILITY STATE</span>
                      <span>ACTIVE</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
