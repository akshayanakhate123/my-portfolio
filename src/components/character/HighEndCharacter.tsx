"use client";

import { motion } from "framer-motion";

export default function HighEndCharacter({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 130" className="w-full h-full text-accent drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">
        {/* Shadow */}
        <motion.ellipse 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          cx="50" cy="120" rx="30" ry="5" fill="currentColor" fillOpacity="0.2" 
        />
        
        {/* Legs */}
        <motion.path 
          animate={{ d: ["M40,100 Q35,110 30,120", "M40,100 Q45,110 50,120"] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
          stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"
        />
        <motion.path 
          animate={{ d: ["M60,100 Q65,110 70,120", "M60,100 Q55,110 50,120"] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
          stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"
        />

        {/* Torso / Outfit */}
        <motion.path 
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          d="M35,45 L65,45 L70,80 Q50,90 30,80 Z" 
          fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" 
        />
        <motion.path 
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          d="M35,45 L65,45 L60,100 L40,100 Z" 
          fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" 
        />

        {/* Arms */}
        <motion.path 
          animate={{ d: ["M35,50 Q20,60 15,80", "M35,50 Q10,40 20,20"] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none"
        />
        <motion.path 
          animate={{ d: ["M65,50 Q80,60 85,80", "M65,50 Q90,40 80,20"] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", delay: 0.1 }}
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none"
        />

        {/* Head */}
        <motion.g animate={{ y: [-3, 3, -3], rotate: [-5, 5, -5] }} transition={{ duration: 0.8, repeat: Infinity }}>
          {/* Hair */}
          <path d="M35,25 Q35,5 50,5 Q65,5 65,25 L65,35 Q50,45 35,35 Z" fill="currentColor" fillOpacity="0.4" />
          {/* Face */}
          <circle cx="50" cy="25" r="14" fill="#000" stroke="currentColor" strokeWidth="2" />
          <circle cx="45" cy="22" r="1.5" fill="currentColor" />
          <circle cx="55" cy="22" r="1.5" fill="currentColor" />
          <path d="M45,32 Q50,36 55,32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Tech Accents */}
        <motion.circle 
          animate={{ r: [1, 3, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          cx="30" cy="40" r="2" fill="currentColor" 
        />
        <motion.circle 
          animate={{ r: [1, 3, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          cx="70" cy="60" r="2" fill="currentColor" 
        />
      </svg>
    </div>
  );
}
