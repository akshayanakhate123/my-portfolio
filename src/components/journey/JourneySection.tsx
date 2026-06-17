"use client";

import { motion } from "framer-motion";
import { type JourneyEntry } from "@/data/resume";

function JourneyItem({ item }: { item: JourneyEntry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative pl-10 pb-14 group"
    >
      {/* Timeline Connector */}
      <div className="absolute left-[7px] top-5 bottom-0 w-[1.5px] bg-white/5 group-hover:bg-accent/30 transition-colors" />

      {/* Timeline Node */}
      <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-black bg-[#111114] group-hover:bg-accent group-hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] transition-all z-10 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-white/10 rounded-full group-hover:bg-white" />
      </div>

      {/* Two-column: meta left, content right */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-10">
        {/* Left: duration + company */}
        <div className="flex flex-col gap-1 pt-0.5">
          <span className="text-xs font-mono text-accent uppercase tracking-[0.2em] font-black">{item.duration}</span>
          <span className="text-xs font-mono text-white/30 uppercase tracking-[0.1em]">{item.location}</span>
          <span className="text-sm text-white/50 italic mt-2">@ {item.company}</span>
        </div>

        {/* Right: role + description + tags */}
        <div>
          <h3 className="text-lg md:text-xl font-display font-black text-white mb-3 leading-tight uppercase tracking-tight">
            {item.role}
          </h3>
          <p className="text-white/50 leading-relaxed text-sm">
            {item.description}
          </p>
          {item.bullets && item.bullets.length > 0 && (
            <ul className="mt-4 space-y-2">
              {item.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-xs md:text-sm leading-relaxed text-white/40">
                  <span className="text-accent mt-0.5 flex-shrink-0">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2 mt-6">
            {item.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/[0.04] border border-white/5 rounded-full text-[9px] uppercase tracking-widest text-white/40 group-hover:text-accent group-hover:border-accent/20 transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function JourneySection({ title, label, data, id, isFirst: _isFirst }: { title: string; label: string; data: JourneyEntry[]; id: string; isFirst?: boolean }) {
  return (
    <section id={id} className="relative py-10 px-6 max-w-7xl mx-auto">
      {/* Compact header row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-end gap-6 mb-12 pb-6 border-b border-white/5"
      >
        <span className="font-mono text-xs text-accent tracking-[0.4em] uppercase font-bold shrink-0">
          {label}
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none text-white">
          {title}
        </h2>
        <div className="h-px flex-1 bg-white/5" />
      </motion.div>

      {/* Full-width timeline entries */}
      <div className="flex flex-col">
        {data.map((item, i) => (
          <JourneyItem key={i} item={item} />
        ))}
      </div>
    </section>
  );
}
