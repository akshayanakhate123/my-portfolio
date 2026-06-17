"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { SplineScene } from "@/components/ui/splite";

export default function HeroSection() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  /* ── Cursor parallax ─────────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const nameX = useTransform(springX, [-1, 1], ["-15px", "15px"]);
  const nameY = useTransform(springY, [-1, 1], ["-10px", "10px"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2));
      mouseY.set((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black select-none">
      {/* Background Name (Optimized scaling to avoid overwhelming the screen) */}
      <motion.div
        style={{ x: nameX, y: nameY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.9 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <h2 className="text-[12rem] md:text-[22rem] lg:text-[28rem] font-display font-black uppercase text-white/[0.02] tracking-tighter leading-none whitespace-nowrap overflow-visible opacity-30">
          NAKHATE
        </h2>
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between min-h-screen w-full px-6 md:px-12 lg:px-24 gap-16 md:gap-32">
        
        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isReady ? 1 : 0, x: isReady ? 0 : -50 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 flex flex-col items-start justify-center text-left pt-32 md:pt-0 z-30"
        >
          <h1 className="text-6xl md:text-[6rem] lg:text-[7.5rem] font-display font-black uppercase text-white leading-[0.9] tracking-tighter mb-6 whitespace-nowrap">
            AKSHAYA<br/>NAKHATE
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ delay: 1 }}
            className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-accent font-black mb-6"
          >
            Engineer → MBA → Product Builder
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ delay: 1.3 }}
            className="text-sm md:text-base text-white/50 leading-relaxed max-w-sm mb-10"
          >
            From building enterprise solutions at Accenture to launching AI-powered products and winning national case competitions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 10 }}
            transition={{ delay: 1.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 bg-accent text-black font-mono text-xs uppercase tracking-widest font-black hover:bg-accent/90 transition-colors rounded-sm"
            >
              View Projects <span>↗</span>
            </a>
            <a
              href={`${process.env.NODE_ENV === "production" ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "") : ""}/AkshayaNakhate_Resume.pdf`}
              download="AkshayaNakhate_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-mono text-xs uppercase tracking-widest font-black hover:border-white/50 transition-colors rounded-sm"
            >
              Download Resume <span>↓</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: The 3D Robot (Full Body & Arms) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 w-full h-[60vh] md:h-screen relative z-10 flex items-center justify-center"
        >
          {/* By forcing a minimum width that exceeds the flex container, we stop Spline from cropping the sides (arms) */}
          <div className="absolute flex items-center justify-center min-w-[800px] lg:min-w-[1200px] h-[80vh] md:h-[120vh] pointer-events-auto">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Navbar Overlay */}
      <div className="absolute top-10 w-full px-10 flex justify-between items-center z-30">
        <span className="font-display font-black text-2xl text-white">AK.</span>
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          <a href="#hero" className="text-accent flex items-center gap-2">TOP <span className="w-2 h-2 rounded-full bg-accent inline-block" /></a>
          <a href="#experience" className="text-white/50 hover:text-white transition-colors">Journey</a>
          <a href="#projects" className="text-white/50 hover:text-white transition-colors">Work</a>
          <a href="#achievements" className="text-white/50 hover:text-white transition-colors">Achievements</a>
        </nav>
      </div>

      {/* Scroll to Explore */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-10 z-30 flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
          <span className="text-white/40 text-sm">↓</span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll to Explore</span>
      </motion.div>
    </section>
  );
}
