"use client";

import { motion } from "framer-motion";
import { connect } from "@/data/resume";
import { Mail } from "lucide-react";
import InteractiveDots from "./InteractiveDots";

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

export default function ConnectSection() {
  return (
    <section id="connect" className="relative py-12 bg-black overflow-hidden px-6 border-t border-white/5">
      {/* Background Interactive Dots - On Top for Interaction, but non-blocking */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <InteractiveDots />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
           <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-xs text-accent uppercase tracking-[0.4em] font-black"
          >
            05 / CONTACT
          </motion.span>
          
          <div className="relative w-full overflow-visible">
            {/* SVG heading optimized for scale without truncation */}
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tighter leading-tight flex flex-wrap justify-center overflow-visible">
              LET&apos;S <span className="mx-4">CONNECT</span>
            </h2>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/30 max-w-lg text-sm leading-relaxed italic"
          >
            &quot;Bringing tech and business together, one connection at a time.&quot;
          </motion.p>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/5 pt-8 w-full max-w-4xl">
          <SocialLink 
            href={`mailto:${connect.email}`} 
            label="EMAIL" 
            subLabel={connect.email}
            icon={<Mail className="w-5 h-5" />} 
          />
          <SocialLink 
            href={connect.linkedin} 
            label="LINKEDIN" 
            subLabel="Connect"
            icon={<LinkedinIcon size={20} />} 
          />
          <SocialLink 
            href={connect.github} 
            label="GITHUB" 
            subLabel="Repositories"
            icon={<GithubIcon size={20} />} 
          />
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label, subLabel, icon }: { href: string; label: string; subLabel: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-5 group"
    >
      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/20 group-hover:bg-accent/20 group-hover:text-accent transition-all">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-accent transition-colors font-bold">{label}</span>
        <span className="text-sm text-white/20 group-hover:text-white transition-colors">{subLabel}</span>
      </div>
    </motion.a>
  );
}
