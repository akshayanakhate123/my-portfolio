"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { education, type EducationEntry } from "@/data/resume";

/* ── Helpers ──────────────────────────────────────────────── */
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15 } },
};

/* ── Single Education Card ────────────────────────────────── */
function EduCard({ entry, index }: { entry: EducationEntry; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay: index * 0.12 }}
      className="group relative flex gap-6 items-start"
    >
      {/* ── Left: index number ── */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold transition-all duration-300"
          style={{
            background:   entry.current ? "var(--accent)" : "var(--bg-surface)",
            color:        entry.current ? "#fff"          : "var(--fg-muted)",
            border:       `1px solid ${entry.current ? "var(--accent)" : "var(--border)"}`,
            boxShadow:    entry.current ? "0 0 20px rgba(249,115,22,0.35)" : "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        {/* connector dot at bottom */}
        <div
          className="w-px flex-1 mt-3 min-h-[2rem]"
          style={{ background: "var(--border)" }}
        />
      </div>

      {/* ── Right: card ── */}
      <div
        className="flex-1 mb-8 rounded-2xl p-6 transition-all duration-300 group-hover:translate-y-[-2px]"
        style={{
          background:   "var(--bg-surface)",
          border:       "1px solid var(--border)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-accent)";
          (e.currentTarget as HTMLDivElement).style.boxShadow   = "0 0 32px rgba(249,115,22,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLDivElement).style.boxShadow   = "none";
        }}
      >
        {/* top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3
              className="font-display font-bold text-lg leading-tight mb-1"
              style={{ color: "var(--fg)" }}
            >
              {entry.degree}
            </h3>
            <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
              {entry.institution}
              <span
                className="mx-2 inline-block w-1 h-1 rounded-full align-middle"
                style={{ background: "var(--border-accent)" }}
              />
              {entry.location}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* badge */}
            {entry.highlight && (
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full tracking-widest uppercase"
                style={{
                  background: "var(--accent-dim)",
                  color:      "var(--accent)",
                  border:     "1px solid var(--border-accent)",
                }}
              >
                {entry.highlight}
              </span>
            )}
            {/* current badge */}
            {entry.current && (
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full tracking-wider uppercase flex items-center gap-1"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  color:      "rgb(34,197,94)",
                  border:     "1px solid rgba(34,197,94,0.25)",
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "rgb(34,197,94)", boxShadow: "0 0 5px rgb(34,197,94)" }}
                />
                Current
              </span>
            )}
          </div>
        </div>

        {/* duration + cgpa row */}
        <div className="flex flex-wrap items-center gap-4">
          <span
            className="font-mono text-xs tracking-wide"
            style={{ color: "var(--fg-subtle)" }}
          >
            📅 {entry.duration}
          </span>
          {entry.cgpa && (
            <span
              className="font-mono text-xs tracking-wide"
              style={{ color: "var(--fg-subtle)" }}
            >
              CGPA {entry.cgpa}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────── */
export default function EducationSection() {
  const headRef    = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-10%" });

  return (
    <section
      id="education"
      aria-label="Education"
      className="relative w-full py-24 px-6 overflow-hidden"
    >
      {/* bg accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width:  "60vw",
          height: "30vw",
          background: "radial-gradient(ellipse at top, rgba(249,115,22,0.05) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* ── Section heading ── */}
        <motion.div
          ref={headRef}
          variants={stagger}
          initial="hidden"
          animate={headInView ? "show" : "hidden"}
          className="mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-[11px] tracking-[0.4em] uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Background
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl sm:text-5xl leading-tight"
            style={{ color: "var(--fg)" }}
          >
            Education
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mt-4 h-px w-16"
            style={{ background: "var(--accent)" }}
          />
        </motion.div>

        {/* ── Cards ── */}
        <div>
          {education.map((entry, i) => (
            <EduCard key={i} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
