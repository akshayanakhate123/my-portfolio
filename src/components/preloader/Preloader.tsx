"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1.8s is enough — Spline loads in parallel in the hero behind this screen
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          {/* Simple monogram — no Spline so nothing heavy blocks the preloader */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center font-display font-black text-black text-3xl shadow-[0_0_40px_rgba(249,115,22,0.4)]">
              A
            </div>
            <p className="font-display font-black text-white text-2xl tracking-tight">AKSHAYA.</p>
          </motion.div>

          <div className="h-px w-40 bg-white/10 relative overflow-hidden">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-accent"
            />
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/40 mt-6">
            Loading...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
