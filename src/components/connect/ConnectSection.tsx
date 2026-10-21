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
  const words = ["LET'S", "CONNECT"];

  return (
    <section id="connect" className="relative py-12 bg-black overflow-hidden px-6 border-t border-white/5">
      {/* Interactive dots background */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <InteractiveDots />
      </div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 right-1/3 w-96 h-48 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs text-accent uppercase tracking-[0.4em] font-black"
          >
            05 / CONTACT
          </motion.span>

          {/* Word-by-word heading reveal */}
          <div className="flex flex-wrap justify-center gap-x-4 overflow-hidden" style={{ perspective: "600px" }}>
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tighter leading-tight inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/65 max-w-lg text-sm leading-relaxed italic"
          >
            &quot;Bringing tech and business together, one connection at a time.&quot;
          </motion.p>
        </div>

        {/* Social links — staggered entrance */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 md:gap-16 border-t border-white/5 pt-8 w-full max-w-4xl">
          {[
            { href: `mailto:${connect.email}`, label: "EMAIL", subLabel: connect.email, icon: <Mail className="w-5 h-5" /> },
            { href: connect.linkedin, label: "LINKEDIN", subLabel: "Connect", icon: <LinkedinIcon size={20} /> },
            { href: connect.github, label: "GITHUB", subLabel: "Repositories", icon: <GithubIcon size={20} /> },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <SocialLink {...s} />
            </motion.div>
          ))}
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
      whileHover={{ scale: 1.06, x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="flex items-center gap-5 group"
    >
      <div className="w-12 h-12 bg-white/8 rounded-full flex items-center justify-center text-white/50 group-hover:bg-accent/20 group-hover:text-accent group-hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all duration-300">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 group-hover:text-accent transition-colors font-bold">{label}</span>
        <span className="text-sm text-white/45 group-hover:text-white transition-colors">{subLabel}</span>
      </div>
    </motion.a>
  );
}
