"use client";

import { motion } from "framer-motion";
import { projects, type ProjectEntry } from "@/data/resume";
import { ExternalLink, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function ProjectCard({ project, index }: { project: ProjectEntry; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      data-card
      className="relative flex-shrink-0 snap-center w-[85vw] sm:w-[54vw] lg:w-[36vw] xl:w-[28vw] h-[460px] sm:h-[520px]"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-[28px] overflow-hidden border border-white/8 bg-[#0e0e11] shadow-[0_24px_60px_rgba(0,0,0,0.8)] cursor-pointer flex flex-col hover:border-accent/20 transition-colors duration-500"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
            <span className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase font-black">
              {String(index + 1).padStart(2, "0")} / Build
            </span>
            {project.featured && (
              <span className="font-mono text-[9px] text-white/50 tracking-[0.2em] uppercase border border-white/15 rounded-full px-3 py-0.5">
                Featured
              </span>
            )}
          </div>

          <div className="mx-4 rounded-2xl overflow-hidden bg-[#18181b] flex-1 relative">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.name}
                fill
                priority={index < 2}
                loading={index < 2 ? "eager" : "lazy"}
                className="object-contain opacity-95 p-2 group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/10 font-display text-xl font-black">
                NO PREVIEW
              </div>
            )}
          </div>

          <div className="px-5 pt-3 pb-5 flex-shrink-0">
            <h3 className="text-sm md:text-base font-display font-black text-white uppercase tracking-tight leading-snug mb-1 line-clamp-2">
              {project.name}
            </h3>
            <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.25em]">
              Tap to see details →
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-[28px] border border-accent/20 bg-[#0e0e11] shadow-[0_24px_60px_rgba(0,0,0,0.8)] cursor-pointer flex flex-col p-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex-shrink-0">
            <span className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase font-black">
              {String(index + 1).padStart(2, "0")} / Build
            </span>
            <h3 className="mt-2 text-base md:text-lg font-display font-black text-white uppercase tracking-tight leading-snug">
              {project.name}
            </h3>
            <div className="mt-3 h-px bg-white/8" />
          </div>

          <div className="flex-1 overflow-y-auto mt-4 pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">
            <p className="text-white/55 text-xs leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex-shrink-0 mt-4">
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest mb-2">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span key={tech} className="text-[9px] uppercase tracking-widest font-mono text-accent border border-accent/25 bg-accent/5 px-2.5 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center justify-between mt-4 pt-4 border-t border-white/8">
            <div className="flex gap-3">
              {project.link?.includes("github") && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-white/35 hover:text-white transition-colors">
                  <GithubIcon size={16} />
                </a>
              )}
              {project.link && !project.link.includes("github") && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-white/35 hover:text-accent transition-colors">
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
            <span className="flex items-center gap-1 font-mono text-[8px] text-white/20 uppercase tracking-widest">
              <RotateCcw size={9} /> flip back
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

const SPEED = 1.0;
const CARD_GAP = 24;

const doubled = [...projects, ...projects];

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const frameRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const visibleRef = useRef(false);
  const [hovering, setHovering] = useState(false);

  const animate = useCallback(() => {
    const track = trackRef.current;
    if (track && !pausedRef.current) {
      posRef.current += SPEED;
      const half = track.scrollWidth / 2;
      if (posRef.current >= half) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
    }
    if (visibleRef.current) {
      frameRef.current = requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries[0].isIntersecting;
      visibleRef.current = visible;
      if (visible) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(frameRef.current);
      }
    }, { threshold: 0 });
    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [animate]);

  useEffect(() => {
    pausedRef.current = hovering;
  }, [hovering]);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Get actual card width from DOM
    const card = track.querySelector("[data-card]") as HTMLElement | null;
    const cardW = card ? card.offsetWidth + CARD_GAP : 400;
    pausedRef.current = true;
    let next = posRef.current + dir * cardW;
    const half = track.scrollWidth / 2;
    if (next < 0) next = half + next;
    if (next >= half) next = next - half;
    posRef.current = next;
    track.style.transform = `translateX(-${posRef.current}px)`;
    // Resume after a moment
    setTimeout(() => { pausedRef.current = hovering; }, 700);
  };

  return (
    <section ref={sectionRef} id="projects" className="relative py-20">
      {/* Heading + arrows */}
      <div className="px-6 max-w-7xl mx-auto mb-10 flex items-end justify-between">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-white leading-none"
          >
            BUILDS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-2 font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]"
          >
            Hover to pause · tap a card to flip
          </motion.p>
        </div>

        {/* Navigation arrows */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Previous project"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-accent/50 hover:text-accent hover:shadow-[0_0_16px_rgba(249,115,22,0.3)] transition-all duration-300"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Next project"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-accent/50 hover:text-accent hover:shadow-[0_0_16px_rgba(249,115,22,0.3)] transition-all duration-300"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </motion.div>
      </div>

      {/* Scrolling track */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{ gap: `${CARD_GAP}px`, willChange: "transform", paddingLeft: `${CARD_GAP}px` }}
        >
          {doubled.map((project, i) => (
            <ProjectCard key={`${project.name}-${i}`} project={project} index={i % projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
