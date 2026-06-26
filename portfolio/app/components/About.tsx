"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { stats } from "@/lib/data";
import { certifications } from "@/lib/certifications";
import TiltCard from "./TiltCard";
import { X, Award, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

const ticker =
  "Python · Angular · FastAPI · Next.js · Groq AI · TypeScript · React.js · Supabase · MongoDB · Generative AI · Prompt Engineering · JWT · RBAC · REST APIs · Deep Learning · Chandigarh University · Trigunasoft · ";

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isFloat = value.includes(".");
  const target = isFloat ? parseFloat(value) : parseInt(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const duration = 1500;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  const displayValue = isFloat ? count.toFixed(2) : Math.floor(count);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function About() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Section ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, #fc4a1f, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="w-full bg-white/[0.02] backdrop-blur-md border border-accent/20 rounded-[2.5rem] p-8 md:p-14 lg:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
        {/* Giant background number — parallax */}
        <motion.span
          style={{ y: numberY }}
          className="absolute -top-16 -left-4 text-[12rem] md:text-[18rem] font-black leading-none text-white/[0.02] select-none pointer-events-none"
        >
          01
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
              &#x2F;&#x2F; about me
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-primary"
          >
            Who I Am
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — narrative */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="space-y-8"
          >
            {/* Pull quote — smaller base size so it reads well at 320px */}
            <div className="relative pl-6 border-l-2 border-accent">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary leading-snug">
                Strong foundations build{" "}
                <span className="gradient-text">great engineers.</span>
              </p>
            </div>

            <p className="text-secondary leading-[1.8] text-base">
              I&apos;m a B.E. CSE (AI &amp; ML) student at Chandigarh University, Mohali,
              maintaining an <span className="text-accent font-semibold">8.35 CGPA</span>.
              Currently working as a{" "}
              <span className="text-accent font-semibold">Software Engineering Intern at Trigunasoft</span>,
              developing responsive Angular &amp; TypeScript UI components for AI-driven enterprise products
              and integrating frontend interfaces with FastAPI backends.
            </p>

            <p className="text-secondary leading-[1.8] text-base">
              I&apos;ve shipped real full-stack AI projects — a Pet Adoption Platform with
              Groq AI chat support and Role-Based Access Control, and an AI-Powered Lost &amp; Found
              Platform with ML matching algorithms and JWT authentication. I enjoy building
              systems end-to-end and understanding every layer of the stack.
            </p>

            <p className="text-secondary leading-[1.8] text-base">
              Beyond code, I hold{" "}
              <span className="text-accent font-semibold">10+ advanced AI certifications</span>{" "}
              from institutions like Imperial College London (98%) and Vanderbilt University (100%).
              I&apos;m passionate about Generative AI, Prompt Engineering, and building
              intelligent applications that solve real-world problems.
            </p>
          </motion.div>

          {/* Right — stats + highlight cards */}
          <div className="space-y-8">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label, suffix }, i) => {
                const isCert = label === "Certifications";
                const isLang = label === "Languages Learned";
                const isProj = label === "Projects Built";
                const isClickable = isCert || isLang || isProj;

                function handleClick() {
                  if (isCert) router.push("/certifications");
                  else if (isLang) document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
                  else if (isProj) document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }

                return (
                  <TiltCard key={label} maxTilt={7} scale={1.03} glare={true}>
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                      onClick={isClickable ? handleClick : undefined}
                      className={`glass-card rounded-xl p-6 text-center animated-border ${isClickable ? "cursor-pointer hover:border-accent/40 transition-colors duration-300" : ""
                        }`}
                    >
                      <p className="text-3xl md:text-4xl font-black text-accent mb-1">
                        <AnimatedCounter value={value} suffix={suffix} />
                      </p>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-secondary">
                        {label}
                      </p>
                      {isClickable && (
                        <p className="text-[9px] font-mono text-accent/50 mt-2 tracking-wider">
                          {isCert ? "Click to view" : isLang ? "Click to view skills" : "Click to view projects"}
                        </p>
                      )}
                    </motion.div>
                  </TiltCard>
                );
              })}
            </div>

            {/* Highlight cards — quick snapshot of current focus & goals */}
            {[
              { tag: "focus", text: "AI/ML Engineering & Full Stack" },
              { tag: "motto", text: "Learn, Build, Improve, Repeat" },
              { tag: "seeking", text: "Internships & Learning Opportunities" },
            ].map(({ tag, text }, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease }}
                className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-surface/30 hover:border-accent/20 transition-all duration-300 group"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent min-w-[70px]">
                  {tag}
                </span>
                <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                  {text}
                </span>
              </motion.div>
            ))}
        </div>
          </div>
        </div>
      </div>
      </div>

      {/* Marquee ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-28 md:mt-36 border-y border-border/30 bg-surface/20 py-5 overflow-hidden"
      >
        <div className="marquee-track">
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-accent/40 px-4">
            {ticker}
            {ticker}
          </span>
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-accent/40 px-4">
            {ticker}
            {ticker}
          </span>
        </div>
      </motion.div>


    </section>
  );
}
