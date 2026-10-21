"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { SplineScene } from "@/components/ui/splite";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export default function HeroSection() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      {/* Subtle animated grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(249,115,22,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.4) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating accent dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-accent/40 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-accent/25 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-2/3 right-1/5 w-1 h-1 rounded-full bg-accent/30 animate-float" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 right-2/5 w-0.5 h-0.5 rounded-full bg-accent/50 animate-float-slow" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Background watermark */}
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

      {/* Main layout */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between min-h-screen w-full px-6 md:px-12 lg:px-24 gap-8 md:gap-16">

        {/* ── Left: Text ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: isReady ? 1 : 0, x: isReady ? 0 : -40 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 flex flex-col items-start justify-center text-left pt-24 md:pt-0 z-30 w-full max-w-xs lg:max-w-sm"
        >
          {/* HEY, I'M */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ delay: 0.1 }}
            className="font-mono text-[9px] tracking-[0.45em] uppercase text-white/30 mb-2"
          >
            HEY, I&apos;M
          </motion.p>

          {/* Name */}
          <h1 className="text-[2rem] sm:text-[2.8rem] md:text-[3.6rem] lg:text-[4.2rem] font-display font-black uppercase text-accent leading-[0.88] tracking-tighter mb-4 sm:mb-5 text-shimmer">
            AKSHAYA<br />NAKHATE
          </h1>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: isReady ? 1 : 0, opacity: isReady ? 1 : 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
            className="w-8 h-[2px] bg-accent origin-left mb-5"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ delay: 0.35 }}
            className="text-sm md:text-base text-white/70 leading-relaxed font-sans mb-2 max-w-[280px] sm:max-w-[300px]"
          >
            Building AI products at the intersection of growth and technology.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ delay: 0.42 }}
            className="text-xs text-white/40 leading-relaxed font-sans mb-5 max-w-[280px] sm:max-w-[300px]"
          >
            I&apos;m an engineer turned product builder with 2+ years at Accenture shipping GenAI workflows. I specialise in AI-powered products, growth strategy, and turning user research into measurable outcomes across fintech, healthtech, and SaaS.
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-1.5 mb-8"
          >
            <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.2em]">
              📍 Bengaluru, India
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 8 }}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="flex items-center gap-2 px-5 py-2.5 bg-accent text-black font-mono text-[10px] uppercase tracking-widest font-black hover:bg-accent/90 transition-colors rounded-sm"
            >
              View Projects <span>↗</span>
            </a>
            <a
              href="/AkshayaNakhate_Resume.pdf"
              download="AkshayaNakhate_Resume.pdf"
              className="flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/60 font-mono text-[10px] uppercase tracking-widest font-black hover:border-white/40 hover:text-white transition-colors rounded-sm"
            >
              Resume <span>↓</span>
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: 3D Robot ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:flex flex-1 w-full h-screen relative z-10 items-center justify-center"
        >
          <div className="absolute flex items-center justify-center min-w-[800px] lg:min-w-[1200px] h-[80vh] md:h-[120vh] pointer-events-auto">
            <ErrorBoundary fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping" style={{ animationDuration: "3s" }} />
                  <div className="absolute inset-8 rounded-full border border-accent/30 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
                  <div className="absolute inset-16 rounded-full bg-accent/10 border border-accent/50 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center text-accent/40 font-mono text-xs tracking-widest uppercase">AI</div>
                </div>
              </div>
            }>
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </ErrorBoundary>
          </div>
        </motion.div>
      </div>

      {/* Navbar */}
      <div className="absolute top-10 w-full px-10 flex justify-between items-center z-30">
        <span className="font-display font-black text-2xl text-white">AK.</span>
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          <a href="#hero" className="text-accent flex items-center gap-2">TOP <span className="w-2 h-2 rounded-full bg-accent inline-block" /></a>
          <a href="#experience" className="text-white/50 hover:text-white transition-colors">Journey</a>
          <a href="#projects" className="text-white/50 hover:text-white transition-colors">Work</a>
          <a href="#achievements" className="text-white/50 hover:text-white transition-colors">Achievements</a>
        </nav>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-10 z-30 flex items-center gap-3 animate-float"
      >
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center animate-glow-pulse">
          <span className="text-white/40 text-sm">↓</span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll to Explore</span>
      </motion.div>
    </section>
  );
}
