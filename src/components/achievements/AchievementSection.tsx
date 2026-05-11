"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { achievements } from "@/data/resume";
import Image from "next/image";
import { useRef } from "react";

function AchievementCard({ item, index, scrollYProgress }: { item: any; index: number; scrollYProgress: any }) {
  // To have them stack on top of each other, we give them the same top position
  // but they stay in place due to sticky positioning.
  const scale = useTransform(scrollYProgress, [index * 0.1, 1], [1 - (index * 0.05), 1 - (index * 0.05)]);

  return (
    <motion.div
      style={{ scale, top: `15vh` }} // Fixed top for all cards creates the stacking effect
      className="sticky w-full mb-[30vh]" // Added large margin-bottom to allow for scroll room between stack steps
    >
      <div className="group bg-[#111114] border border-white/5 rounded-[40px] overflow-hidden flex flex-col md:flex-row h-full min-h-[450px] shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
         {/* Image Area */}
         <div className="w-full md:w-2/5 relative min-h-[250px] md:min-h-full bg-[#18181b] overflow-hidden">
          <Image 
            src={item.image} 
            alt={item.title} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
        </div>

        <div className="w-full md:w-3/5 p-8 md:p-14 relative flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">{item.icon}</span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-xs text-white/20 uppercase tracking-widest">{item.year}</span>
          </div>
          
          <h3 className="text-2xl md:text-5xl font-display font-black text-white leading-tight tracking-tighter mb-4 uppercase">
            {item.title}
          </h3>
          <p className="text-accent font-mono text-xs uppercase tracking-[0.2em] mb-8 font-bold">
            {item.event}
          </p>
          <p className="text-white/40 text-lg leading-relaxed italic max-w-lg">
            &quot;{item.description}&quot;
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AchievementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="achievements" className="relative py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-40">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-mono text-xs text-accent uppercase tracking-[0.4em] mb-4 block"
        >
          Special Honors
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-display font-black uppercase tracking-tighter text-white leading-none overflow-visible"
        >
          AWARDS
        </motion.h2>
      </div>

      <div className="flex flex-col relative">
        {achievements.map((item, i) => (
          <AchievementCard 
            key={i} 
            item={item} 
            index={i} 
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
