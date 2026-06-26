"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { projects } from "@/lib/data";
import type { Project } from "@/types";
import TiltCard from "./TiltCard";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/* ── Featured Project Card ── */
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafId    = useRef<number>(0);

  const isPointerFine =
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: fine)").matches
      : false;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!isPointerFine) return;
    const card = cardRef.current;
    if (!card) return;

    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const rect    = card.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const cx      = rect.width  / 2;
      const cy      = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -5;
      const rotateY = ((x - cx) / cx) *  5;

      card.style.transform  = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
      card.style.transition = "transform 0.08s linear";

      /* Spotlight / radial spotlight following cursor */
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(245,158,11,0.07), #0a0a0fdd 55%)`;

      /* Glare layer */
      if (glareRef.current) {
        const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI) + 90;
        glareRef.current.style.background = `linear-gradient(${angle}deg, rgba(245,158,11,0.10) 0%, transparent 55%)`;
        glareRef.current.style.opacity    = "1";
      }
    });
  }

  function handleMouseLeave() {
    if (!isPointerFine) return;
    cancelAnimationFrame(rafId.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.transition = "transform 0.65s cubic-bezier(0.22,1,0.36,1)";
    card.style.background = "";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }

  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay: 0.1, ease }}
      style={{ perspective: 1200 }}
      className="grid md:grid-cols-2 gap-8 items-center"
    >
      {/* Project visual — gradient placeholder */}
      <motion.div
        className={`relative aspect-[16/10] rounded-xl overflow-hidden ${
          !isEven ? "md:order-2" : ""
        }`}
        whileHover={{ scale: 1.03, rotateY: isEven ? -2 : 2 }}
        transition={{ duration: 0.45, ease }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-surface to-surface border border-border/30 rounded-xl depth-scan">
          {/* Decorative code lines */}
          <div className="absolute inset-0 p-6 flex flex-col gap-3 opacity-30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-hot/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-2 w-1/4 rounded bg-accent/20" />
              <div className="h-2 w-3/4 rounded bg-white/5" />
              <div className="h-2 w-1/2 rounded bg-white/5" />
              <div className="h-2 w-2/3 rounded bg-white/5" />
              <div className="h-2 w-1/3 rounded bg-accent/10" />
              <div className="h-2 w-3/5 rounded bg-white/5" />
              <div className="h-2 w-1/4 rounded bg-white/5" />
              <div className="h-2 w-4/5 rounded bg-white/5" />
            </div>
          </div>
          {/* Project number overlay */}
          <div className="absolute bottom-4 right-6 text-[6rem] font-black text-white/[0.03] leading-none">
            {pad(index + 1)}
          </div>
        </div>
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-accent/10 via-transparent to-transparent" />
      </motion.div>

      {/* Project info */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`glass-card rounded-xl p-8 md:p-10 transition-colors duration-300 ease-out relative overflow-hidden ${
          !isEven ? "md:order-1" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glare overlay — follows mouse */}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-xl z-0"
          style={{ opacity: 0, transition: "opacity 0.3s ease", mixBlendMode: "overlay" }}
          aria-hidden="true"
        />
        {/* ── All inner content sits above the glare layer ── */}
        <div className="relative z-[1]">
        {/* Number + Featured badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-accent/50 tracking-widest">
            {pad(index + 1)}
          </span>
          {project.featured && (
            <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-secondary text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-[10px] font-mono font-medium rounded-md bg-accent/[0.06] text-accent/70 border border-accent/10 transition-all duration-300 hover:bg-accent hover:text-background hover:shadow-[0_0_16px_#F59E0B44]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent/30 text-accent text-sm font-mono font-medium hover:bg-accent hover:text-background transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            Source Code
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-background text-sm font-mono font-medium hover:bg-accent-hover transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
        </div>{/* end z-[1] wrapper */}
      </div>
    </motion.div>
  );
}

/* ── Small Project Card ── */
function SmallCard({ project, index }: { project: Project; index: number }) {
  return (
    <TiltCard maxTilt={9} scale={1.03}>
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease }}
      className="glass-card rounded-xl p-6 animated-border group h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-mono text-accent/50 tracking-widest">
          {pad(index + 1)}
        </span>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:text-accent transition-colors duration-200"
        >
          <Github className="w-4 h-4" />
        </a>
      </div>

      <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-200">
        {project.title}
      </h3>

      <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-[9px] font-mono text-accent/60 border border-accent/10 rounded cursor-default transition-all duration-200 hover:text-accent hover:bg-accent/10 hover:border-accent/40 hover:shadow-[0_0_8px_rgba(245,158,11,0.35)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
    </TiltCard>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 md:py-44 px-6 md:px-12">
      {/* Ambient light */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none">
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
          03
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
              &#x2F;&#x2F; projects
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-primary"
            >
              What I&apos;ve Built
            </motion.h2>

            <motion.a
              href="https://github.com/CodeWhizPuneet"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 text-xs font-mono text-secondary hover:text-accent transition-colors duration-200 uppercase tracking-widest"
            >
              View All
              <ArrowRight className="w-3 h-3" />
            </motion.a>
          </div>
        </div>

        {/* Featured projects */}
        <div className="space-y-20 mb-20 scene-3d">
          {featured.map((project, i) => (
            <FeaturedCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-secondary">
                Other Noteworthy Projects
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {others.map((project, i) => (
                <SmallCard
                  key={project.title}
                  project={project}
                  index={featured.length + i}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
