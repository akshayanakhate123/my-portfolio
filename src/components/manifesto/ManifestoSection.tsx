"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const words = "PASSIONATE ABOUT BUILDING PRODUCTS & CONSTANTLY LEARNING.".split(" ");

  return (
    <section ref={ref} className="min-h-[120vh] w-full flex items-center justify-center px-6 py-40 bg-black overflow-hidden select-none">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-display font-black text-center leading-[1.3] tracking-tighter flex flex-wrap justify-center overflow-visible">
          {words.map((word, i) => {
            const start = (i / words.length) * 0.4; 
            const end = start + 0.3;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const color = useTransform(scrollYProgress, [start, end], ["rgba(255,255,255,0.05)", "var(--accent)"]);
            
             return (
              <motion.span 
                key={i} 
                style={{ 
                  color,
                  fontSize: "clamp(2rem, 6vw, 6rem)", // Smaller font size to prevent cutting
                }}
                className="mr-[0.3em] mb-[0.2em] inline-block"
              >
                {word}
              </motion.span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
