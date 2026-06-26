"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { stats } from "@/lib/data";
import { certifications } from "@/lib/certifications";
import TiltCard from "./TiltCard";
import { X, Award, ExternalLink } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const ticker =
  "C++ · Python · Java · DSA · Machine Learning · Neural Networks · Full Stack · AI & ML · Problem Solving · Clean Code · Next.js · LLMs · RAG · Continuous Learning · ";

/* ── Animated counter ── */
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const duration = 1500;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [certOpen, setCertOpen] = useState(false);

  // Lock page scroll (including Lenis) while cert modal is open
  useEffect(() => {
    document.body.style.overflow = certOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [certOpen]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      {/* Section ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, #F59E0B, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
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
              I&apos;m a Computer Science student pursuing B.E. in AI &amp;
              Machine Learning, currently focused on strengthening my
              programming foundations and exploring full stack development.
              My academic background has introduced me to core subjects like
              data structures, algorithms, and database systems, which I
              continue to practice and refine through projects.
            </p>

            <p className="text-secondary leading-[1.8] text-base">
              I&apos;ve shipped real projects — Terminal Police, a VS Code
              extension published on the Marketplace that gives instant audio
              alerts on terminal errors, and this portfolio itself. I enjoy
              building things end-to-end and understanding how every layer of
              a system fits together.
            </p>

            <p className="text-secondary leading-[1.8] text-base">
              Right now I&apos;m deepening my knowledge in DBMS and backend
              development while actively studying Machine Learning — NumPy,
              Pandas, and ML algorithms. My goal is to build production-ready
              AI systems and contribute to meaningful software.
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
                  if (isCert) setCertOpen(true);
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
                    className={`glass-card rounded-xl p-6 text-center animated-border ${
                      isClickable ? "cursor-pointer hover:border-accent/40 transition-colors duration-300" : ""
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
                        {isCert ? "Click to view all" : isLang ? "Click to view skills" : "Click to view projects"}
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

      {/* Certifications Modal */}
      <AnimatePresence>
        {certOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Certifications"
            onClick={() => setCertOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl pointer-events-none" />

            {/* Modal — max-h + overflow-y-auto for small screens */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative glass-card rounded-2xl p-6 md:p-10 max-w-lg w-full border border-border/50 max-h-[85vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setCertOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">Certifications</h3>
                  <p className="text-[10px] font-mono text-secondary tracking-widest uppercase">Verified credentials</p>
                </div>
              </div>

              {/* Certificate list */}
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease }}
                    className="p-4 rounded-xl border border-border/30 bg-surface/30 hover:border-accent/20 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-primary group-hover:text-accent transition-colors duration-300 leading-snug">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-secondary mt-1">
                          {cert.issuer}
                        </p>
                      </div>
                      <span className="text-[9px] font-mono text-accent/60 tracking-wider whitespace-nowrap mt-0.5">
                        {cert.date}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-accent/[0.08] text-accent/70 border border-accent/10 rounded">
                        {cert.platform}
                      </span>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-accent/50 hover:text-accent border border-accent/10 hover:border-accent/30 rounded transition-all duration-300"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Verify
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
