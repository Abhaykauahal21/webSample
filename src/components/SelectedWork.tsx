"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: "noirform",
    title: "Noirform",
    category: "CREATIVE",
    description: "Brand art direction & visual identity",
    image: "https://images.unsplash.com/photo-1554047310-99742f364024?q=80&w=2000&auto=format&fit=crop",
    align: "left",
  },
  {
    id: "nebula",
    title: "Nebula",
    category: "UI DESIGN",
    description: "UI/UX & product design for digital platforms",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000&auto=format&fit=crop",
    align: "right",
  },
  {
    id: "nexora",
    title: "Nexora",
    category: "CAMPAIGNS",
    description: "Campaigns & focused content",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop",
    align: "left",
  },
  {
    id: "veltrix",
    title: "Veltrix",
    category: "WEB DEVELOPMENT",
    description: "High-performance website development",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
    align: "right",
  },
  {
    id: "solace",
    title: "Solace",
    category: "CREATIVE",
    description: "Visual storytelling & brand experience",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2000&auto=format&fit=crop",
    align: "left",
  },
  {
    id: "ardent",
    title: "Ardent",
    category: "CREATIVE",
    description: "Visual storytelling & brand experience",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop",
    align: "right",
  },
];

function ProjectCard({ project, index, scrollYProgress }: { project: typeof projects[0], index: number, scrollYProgress: MotionValue<number> }) {
  const isRight = project.align === "right";
  
  // Card-level parallax (movement of the entire card)
  const y = useTransform(scrollYProgress, [index * 0.15, (index + 1) * 0.15], [100, -100]);
  const opacity = useTransform(scrollYProgress, [index * 0.15 - 0.1, index * 0.15, (index + 1) * 0.15, (index + 1) * 0.15 + 0.1], [0, 1, 1, 0]);

  // Image-level parallax (movement of the image inside its container)
  const imageY = useTransform(scrollYProgress, [index * 0.15 - 0.2, (index + 1) * 0.15 + 0.2], ["-15%", "15%"]);

  return (
    <motion.div
      style={{ y, opacity }}
      className={`relative w-full flex ${isRight ? "justify-end" : "justify-start"} mb-32 md:mb-64 px-4 md:px-20`}
    >
      <div className={`w-full max-w-[550px] group cursor-pointer`}>
        {/* Title Bar */}
        <div className="flex items-center justify-between bg-[#1A1A1A] rounded-t-2xl px-6 py-4 border-b border-white/5">
          <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
          <span className="text-white/40 text-xl">+</span>
        </div>

        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-b-2xl">
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ y: imageY, scale: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 z-10">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-3 border border-white/20 w-max px-3 py-1 rounded-full backdrop-blur-md">
              {project.category}
            </span>
            <p className="text-2xl font-medium text-white leading-tight max-w-[280px]">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="bg-[#0C0C0C] py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="bg-[#141414] rounded-[40px] py-24 md:py-32 relative overflow-hidden">
          {/* Sticky Background Symbol */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <div className="w-[80vw] h-[80vw] grid grid-cols-2 gap-10 rotate-45">
              <div className="bg-white rounded-full"></div>
              <div className="bg-white rounded-full"></div>
              <div className="bg-white rounded-full"></div>
              <div className="bg-white rounded-full"></div>
            </div>
          </div>

          <div className="relative z-10">
            {/* Headline */}
            <div className="px-8 md:px-20 mb-32">
              <h2 className="text-[clamp(3rem,12vw,10rem)] font-bold text-white leading-[0.85] tracking-tighter">
                Our<span className="inline-flex items-center mx-4 md:mx-8">
                  <svg width="1em" height="1em" viewBox="0 0 100 100" fill="none" className="w-[0.8em] h-[0.8em] animate-spin-slow">
                    <path d="M50 0V100M0 50H100M14.6 14.6L85.4 85.4M14.6 85.4L85.4 14.6" stroke="currentColor" strokeWidth="8"/>
                  </svg>
                </span><br />
                Selected<br />
                Work<span className="ml-4 text-white/40">→</span>
              </h2>
            </div>

            {/* Project List */}
            <div className="relative">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} scrollYProgress={scrollYProgress} />
              ))}
            </div>

            {/* Footer CTA */}
            <div className="flex flex-col items-center justify-center text-center px-8 mt-20">
              <div className="w-12 h-12 bg-[#ff4d00] rounded-lg mb-8 rotate-12 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white/20 grid grid-cols-2 gap-0.5">
                    <div className="bg-white"></div>
                    <div></div>
                    <div></div>
                    <div className="bg-white"></div>
                </div>
              </div>
              <p className="text-white/60 text-lg md:text-xl max-w-md leading-relaxed mb-10">
                A curated selection of projects where strategy, creativity, and craftsmanship come together to build meaningful and enduring brand experiences.
              </p>
              <div className="flex items-center gap-3">
                <button className="px-10 py-4 rounded-full bg-[#0C0C0C] text-white font-medium hover:bg-white hover:text-black transition-all duration-500 text-lg border border-white/5">
                  View Latest Projects
                </button>
                <button className="w-14 h-14 rounded-full bg-[#0C0C0C] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 border border-white/5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
