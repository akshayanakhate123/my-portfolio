"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-display font-black text-white text-xs">
               A
             </div>
             <span className="font-display font-bold text-white tracking-tighter text-xl">AKSHAYA.</span>
          </div>
          <p className="text-white/20 text-xs font-mono uppercase tracking-[0.2em]">
            © {currentYear} ALL RIGHTS RESERVED
          </p>
        </div>

        <nav className="flex gap-8">
          <a href="#hero" className="text-white/40 hover:text-accent transition-colors font-mono text-[10px] uppercase tracking-widest">Top</a>
          <a href="#experience" className="text-white/40 hover:text-accent transition-colors font-mono text-[10px] uppercase tracking-widest">Journey</a>
          <a href="#projects" className="text-white/40 hover:text-accent transition-colors font-mono text-[10px] uppercase tracking-widest">Work</a>
          <a href="#achievements" className="text-white/40 hover:text-accent transition-colors font-mono text-[10px] uppercase tracking-widest">Achievements</a>
        </nav>

        {/* Removed attribution per user request */}
      </div>

      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mt-8"
      />
    </footer>
  );
}
