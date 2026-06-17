"use client";

import { motion } from "framer-motion";
import { education, type EducationEntry } from "@/data/resume";
import { GraduationCap, Landmark, BookOpen, Calendar, Star, Shield } from "lucide-react";

const ICONS = [GraduationCap, Landmark, BookOpen, BookOpen];

function EduCard({ entry, index }: { entry: EducationEntry; index: number }) {
  const isLast = index === education.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-5"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center font-mono text-sm font-bold z-10 ${
            entry.current
              ? "bg-accent text-black shadow-[0_0_20px_rgba(249,115,22,0.4)]"
              : "bg-[#1a1a1e] text-white/40 border border-white/10"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        {!isLast && <div className="w-px flex-1 mt-1 bg-white/8 min-h-[2rem]" />}
      </div>

      {/* Card */}
      <div
        className={`flex-1 mb-6 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_0_32px_rgba(249,115,22,0.06)] ${
          entry.current ? "border-accent/40 bg-[#111114]" : "border-white/6 bg-[#111114]"
        }`}
      >
        <div className="p-5 flex gap-4">
          {/* Icon box */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1c1c21] border border-white/8 flex items-center justify-center text-white/50">
            {(() => { const I = ICONS[index]; return I ? <I size={22} strokeWidth={1.5} /> : null; })()}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Top row: title + badges */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-display font-bold text-sm md:text-base text-white leading-tight">
                  {entry.degree}
                </h3>
                <p className="text-sm text-white/45 mt-0.5">
                  {entry.institution}
                  <span className="mx-2 inline-block w-1 h-1 rounded-full bg-accent/60 align-middle" />
                  {entry.location}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {entry.highlight && (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-accent/20 text-accent border border-accent/30 uppercase tracking-widest">
                    {entry.highlight}
                  </span>
                )}
                {entry.current && (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/25 uppercase tracking-wider">
                    Current
                  </span>
                )}
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 font-mono text-xs text-white/35">
              <span className="flex items-center gap-1"><Calendar size={11} strokeWidth={1.5} /> {entry.duration}</span>
              {entry.cgpa && (
                <>
                  <span className="text-white/15">|</span>
                  <span className="flex items-center gap-1"><Star size={11} strokeWidth={1.5} /> {entry.cgpa}</span>
                </>
              )}
              {entry.rank && (
                <>
                  <span className="text-white/15">|</span>
                  <span className="flex items-center gap-1"><Shield size={11} strokeWidth={1.5} /> {entry.rank}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EducationSection() {
  return (
    <section id="education" className="relative py-16 px-6 max-w-7xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-accent mb-3">
          Background
        </p>
        <h2 className="font-display font-black text-4xl md:text-5xl uppercase text-white leading-none tracking-tighter">
          Education
        </h2>
        <div className="mt-5 h-1 w-14 bg-accent rounded-full" />
      </motion.div>

      {/* Timeline cards */}
      <div className="max-w-4xl mx-auto">
        {education.map((entry, i) => (
          <EduCard key={i} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
