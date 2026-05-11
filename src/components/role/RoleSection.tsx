"use client";

import { motion } from "framer-motion";

export default function RoleSection() {
  return (
    <div className="w-full flex justify-center py-10 px-6">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-mono text-sm md:text-base tracking-[0.2em] uppercase text-white/40 text-center max-w-2xl leading-relaxed"
      >
        PGP in Management and Technology <span className="text-accent underline underline-offset-8">@ Scaler School of Business</span>. 
        <br />
        Salesforce Developer. GenAI Explorer.
      </motion.p>
    </div>
  );
}
