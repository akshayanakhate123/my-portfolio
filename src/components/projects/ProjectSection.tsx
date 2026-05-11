"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { projects, type ProjectEntry } from "@/data/resume";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

function ProjectCard({ project, index, scrollYProgress }: { project: ProjectEntry; index: number; scrollYProgress: any }) {
  // True stacking: cards slide exactly on top of each other
  const scale = useTransform(scrollYProgress, [index * 0.15, 1], [1 - (index * 0.04), 1 - (index * 0.04)]);
  
  return (
    <motion.div
      style={{ scale, top: `12vh` }}
      className="sticky w-full mb-[35vh]"
    >
      <div className="group bg-[#111114] border border-white/5 rounded-[50px] overflow-hidden flex flex-col lg:flex-row h-full min-h-[500px] shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
        {/* Image Area */}
        <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-full bg-[#18181b] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
          {project.image ? (
            <Image 
              src={project.image} 
              alt={project.name} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-70 group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/5 font-display text-4xl font-black">
              NO PREVIEW
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>

        {/* Info Area */}
        <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-between relative bg-black">
          <div>
            <div className="flex justify-between items-center mb-12">
              <span className="font-mono text-[10px] text-accent tracking-[0.4em] uppercase font-bold">0{index + 1} / Featured Project</span>
              <div className="flex gap-6">
                 {project.link?.includes("github") && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                    <GithubIcon size={24} />
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                    <ExternalLink size={24} />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-4xl lg:text-7xl font-display font-black text-white leading-[1.1] tracking-tighter mb-8 uppercase">
              {project.name}
            </h3>
            
            <p className="text-white/40 text-base lg:text-lg leading-relaxed mb-12 max-w-xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <span key={tech} className="text-[10px] uppercase tracking-widest font-mono text-white/30 border border-white/10 px-4 py-2 rounded-full group-hover:border-accent/40 group-hover:text-accent transition-all">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16 flex items-center justify-between">
             <div className="flex items-center gap-4 group/btn cursor-pointer">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/20 group-hover/btn:text-accent transition-colors">Explore Project</span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover/btn:border-accent group-hover/btn:text-accent transition-all">
                   <ArrowUpRight size={16} />
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
);

export default function ProjectSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="projects" className="relative py-40 px-6 max-w-7xl mx-auto">
      <div className="mb-48 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-mono text-xs text-accent uppercase tracking-[0.5em] mb-4 block font-black"
        >
          Selected Portfolio
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-7xl md:text-9xl font-display font-black uppercase tracking-tighter text-white leading-none overflow-visible"
        >
          PROJECTS
        </motion.h2>
      </div>

      <div className="flex flex-col items-center relative">
        {projects.map((project, i) => (
          <ProjectCard 
            key={project.name} 
            project={project} 
            index={i} 
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
