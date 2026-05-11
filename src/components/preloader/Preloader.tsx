"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SplineScene } from "@/components/ui/splite";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Increased time slightly since Spline takes a moment to load
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-none"
        >
          {/* 3D Robot for Preloader */}
          <div className="relative w-full max-w-[400px] h-80 mb-10 flex items-center justify-center">
             <SplineScene 
               scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
               className="w-full h-full"
             />

            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-6 bg-accent/20 blur-2xl rounded-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="h-px w-40 bg-white/10 relative overflow-hidden">
               <motion.div 
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-accent"
               />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/40 mt-6 animate-pulse">
              AKSHAYA IS CHARGING...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
