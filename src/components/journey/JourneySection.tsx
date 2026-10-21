"use client";

import { motion } from "framer-motion";
import { type JourneyEntry } from "@/data/resume";

const bulletVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: i * 0.07, ease: "easeOut" },
  }),
};

function JourneyItem({ item, globalIndex }: { item: JourneyEntry; globalIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.5, delay: globalIndex * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10 pb-14 group"
    >
      {/* Timeline connector */}
      <div className="absolute left-[7px] top-5 bottom-0 w-[1.5px] bg-white/5 group-hover:bg-accent/20 transition-colors duration-500" />

      {/* Timeline node — pulses on hover */}
      <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-black bg-[#111114] group-hover:bg-accent group-hover:shadow-[0_0_20px_rgba(249,115,22,0.7)] transition-all duration-300 z-10 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-white/10 rounded-full group-hover:bg-white transition-colors" />
      </div>

      {/* Shimmer ring on hover */}
      <div className="absolute left-[-4px] top-[-3px] w-[calc(1rem+8px)] h-[calc(1rem+8px)] rounded-full border border-accent/0 group-hover:border-accent/40 group-hover:animate-ping-once transition-all duration-300 pointer-events-none" />

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-10">
        {/* Left: meta */}
        <div className="flex flex-col gap-1 pt-0.5">
          <span className="text-xs font-mono text-accent uppercase tracking-[0.2em] font-black">{item.duration}</span>
          <span className="text-xs font-mono text-white/30 uppercase tracking-[0.1em]">{item.location}</span>
          <span className="text-sm text-white/50 italic mt-2">@ {item.company}</span>
        </div>

        {/* Right: role + description + bullets + tags */}
        <div>
          <h3 className="text-lg md:text-xl font-display font-black text-white mb-3 leading-tight uppercase tracking-tight group-hover:text-accent/90 transition-colors duration-300">
            {item.role}
          </h3>
          <p className="text-white/50 leading-relaxed text-sm">
            {item.description}
          </p>
          {item.bullets && item.bullets.length > 0 && (
            <ul className="mt-4 space-y-2">
              {item.bullets.map((b, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={bulletVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-5%" }}
                  className="flex gap-2 text-xs md:text-sm leading-relaxed text-white/40"
                >
                  <span className="text-accent mt-0.5 flex-shrink-0">▸</span>
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2 mt-6">
            {item.tags?.map(tag => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05, borderColor: "rgba(249,115,22,0.4)" }}
                className="px-3 py-1 bg-white/[0.04] border border-white/5 rounded-full text-[9px] uppercase tracking-widest text-white/40 group-hover:text-accent group-hover:border-accent/20 transition-all cursor-default"
              >
                {tag}
              </motion.span>
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-end gap-6 mb-12 pb-6 border-b border-white/5"
      >
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-mono text-xs text-accent tracking-[0.4em] uppercase font-bold shrink-0"
        >
          {label}
        </motion.span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black uppercase tracking-tighter leading-none text-white">
          {title}
        </h2>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="hidden sm:block h-px flex-1 bg-white/5 origin-left"
        />
      </motion.div>

      {/* Timeline entries */}
      <div className="flex flex-col">
        {data.map((item, i) => (
          <JourneyItem key={i} item={item} globalIndex={i} />
        ))}
      </div>
    </section>
  );
}
