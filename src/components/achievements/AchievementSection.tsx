"use client";

import { motion } from "framer-motion";
import { achievements } from "@/data/resume";
import Image from "next/image";
import { Trophy, Medal, Award, Target, Flame, BarChart2, FileText, Cloud, Microscope, Layers, Code2, Settings2 } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = { Trophy, Medal, Award, Target, Flame, BarChart2, FileText, Cloud, Microscope, Layers, Code2, Settings2 };

function Icon({ name, size = 20 }: { name?: string; size?: number }) {
  if (!name) return null;
  const Comp = ICON_MAP[name];
  if (!Comp) return null;
  return <Comp size={size} strokeWidth={1.5} />;
}

function AchievementTile({ item }: { item: any }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex-shrink-0 w-[260px] h-[290px] bg-[#111114] border border-white/5 rounded-3xl overflow-hidden flex flex-col hover:border-accent/25 hover:shadow-[0_0_40px_rgba(249,115,22,0.1)] transition-all duration-500 cursor-default"
    >
      {/* Image strip */}
      <div className="relative w-full h-40 flex-shrink-0 bg-[#18181b] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          loading="lazy"
          className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-108 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#111114]" />
        <div className="absolute top-3 right-4 font-mono text-xs text-white/30 uppercase tracking-widest group-hover:text-accent/60 transition-colors">
          {item.year}
        </div>
        <div className="absolute bottom-3 left-4 text-white/50 group-hover:text-accent transition-colors duration-300">
          <Icon name={item.icon} size={22} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-sm font-display font-black text-white uppercase tracking-tight leading-snug group-hover:text-accent/90 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-accent font-mono text-[10px] uppercase tracking-[0.15em] font-bold">
          {item.event}
        </p>
      </div>
    </motion.div>
  );
}

export default function AchievementSection() {
  const doubled = [...achievements, ...achievements];

  return (
    <section id="achievements" className="relative py-16 overflow-hidden">
      {/* Subtle radial glow behind heading */}
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Heading */}
      <div className="px-6 max-w-7xl mx-auto mb-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="block font-mono text-xs text-accent uppercase tracking-[0.4em] font-black mb-3"
        >
          04 / WINS
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black uppercase tracking-tighter text-white leading-tight"
        >
          Awards &amp; Achievements
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-4 h-px w-24 bg-accent origin-left"
        />
      </div>

      {/* Marquee strip */}
      <div className="overflow-hidden">
        <div className="marquee-track" style={{ gap: "1rem" }}>
          {doubled.map((item, i) => (
            <div key={i} style={{ marginRight: "1rem" }}>
              <AchievementTile item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
