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

      card.style.transform  = `perspectiv
<truncated 11813 bytes>
a
              href="https://github.com/Harmanp456"
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
