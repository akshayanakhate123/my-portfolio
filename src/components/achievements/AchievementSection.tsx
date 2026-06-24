"use client";

import { achievements } from "@/data/resume";
import Image from "next/image";
import * as LucideIcons from "lucide-react";

function Icon({ name, size = 20 }: { name?: string; size?: number }) {
  if (!name) return null;
  const Comp = (LucideIcons as any)[name];
  if (!Comp) return null;
  return <Comp size={size} strokeWidth={1.5} />;
}

function AchievementTile({ item }: { item: any }) {
  return (
    <div className="group flex-shrink-0 w-[260px] h-[290px] bg-[#111114] border border-white/5 rounded-3xl overflow-hidden flex flex-col hover:border-white/15 transition-colors duration-300 cursor-default">
      {/* Image strip */}
      <div className="relative w-full h-40 flex-shrink-0 bg-[#18181b] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#111114]" />
        <div className="absolute top-3 right-4 font-mono text-xs text-white/30 uppercase tracking-widest">
          {item.year}
        </div>
        <div className="absolute bottom-3 left-4 text-white/70">
          <Icon name={item.icon} size={22} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-sm font-display font-black text-white uppercase tracking-tight leading-snug">
          {item.title}
        </h3>
        <p className="text-accent font-mono text-[10px] uppercase tracking-[0.15em] font-bold">
          {item.event}
        </p>
      </div>
    </div>
  );
}

export default function AchievementSection() {
  // Duplicate items for seamless infinite loop
  const doubled = [...achievements, ...achievements];

  return (
    <section id="achievements" className="relative py-16">
      {/* Heading */}
      <div className="px-6 max-w-7xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black uppercase tracking-tighter text-white leading-tight">
          Awards and Achievements
        </h2>
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
