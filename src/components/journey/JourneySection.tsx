"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { type JourneyEntry } from "@/data/resume";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function JourneyItem({ item }: { item: JourneyEntry }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="relative pl-8 md:pl-16 pb-20 group"
    >
      {/* Timeline Connector */}
      <div 
        className="absolute left-[7px] md:left-[11px] top-6 bottom-0 w-[1.5px] bg-white/5 group-hover:bg-accent/30 transition-colors"
      />
      
      {/* Timeline Node */}
      <div 
        className="absolute left-0 top-1 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-black bg-[#111114] group-hover:bg-accent group-hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] transition-all z-10 flex items-center justify-center"
      >
        <div className="w-1.5 h-1.5 bg-white/10 rounded-full group-hover:bg-white" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] font-black">{item.duration}</span>
          <span className="w-8 h-[1px] bg-white/10" />
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.1em]">{item.location}</span>
        </div>
        
        <h3 className="text-2xl md:text-4xl font-display font-black text-white mb-2 leading-tight uppercase tracking-tight">
          {item.role}
        </h3>
        <h4 className="text-base md:text-lg text-white/40 mb-6 font-medium italic">@ {item.company}</h4>
        
        <p className="text-white/50 max-w-xl leading-relaxed text-sm md:text-base">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-8">
          {item.tags?.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/[0.04] border border-white/5 rounded-full text-[9px] uppercase tracking-widest text-white/40 group-hover:text-accent group-hover:border-accent/20 transition-all">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function JourneySection({ title, label, data, id, isFirst: _isFirst }: { title: string; label: string; data: JourneyEntry[]; id: string; isFirst?: boolean }) {
  return (
    <section id={id} className="relative py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24 lg:gap-32">
        {/* Fixed Width Header on Desktop */}
        <div className="w-full md:w-[300px] lg:w-[400px] xl:w-[450px] flex-shrink-0 z-20">
          <div className="md:sticky md:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 pr-4"
            >
              <span className="font-mono text-xs text-accent tracking-[0.4em] uppercase font-bold">
                {label}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-black uppercase tracking-tighter leading-[1.1] text-white">
                {title}
              </h2>
              <div className="h-1.5 w-16 bg-accent mt-2" />
            </motion.div>
          </div>
        </div>

        {/* Vertical Timeline Content */}
        <div className="flex-1 md:border-l md:border-white/5">
          <div className="flex flex-col">
            {data.map((item, i) => (
              <JourneyItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
