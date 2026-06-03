"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: "timely-group",
    title: "Timely Group",
    category: "CORPORATE WEBSITE",
    description:
      "Premium industrial and abrasives manufacturing company website with modern branding and global presence.",
    image: "/timely.png",
    url: "https://timelygroup.vercel.app/",
    align: "left",
  },
  {
    id: "kavyaboss",
    title: "KavyaBoss",
    category: "NUTRITION E-COMMERCE",
    description:
      "Modern nutrition and wellness e-commerce platform designed to deliver a seamless shopping experience for health-conscious customers.",
    image: "/kavyaboss.png",
    url: "https://kavyaboss.vercel.app/",
    align: "right",
  },
  {
    id: "digital-agency",
    title: "Digital Agency",
    category: "CREATIVE DIGITAL AGENCY",
    description:
      "A modern digital agency website focused on brand strategy, web experiences, UI/UX design, and high-converting marketing solutions.",
    image: "/digitalagency.png",
    url: "https://abhaywebagency.vercel.app/",
    align: "left",
  },
];

function ProjectCard({ project, index, scrollYProgress }: { project: typeof projects[0], index: number, scrollYProgress: MotionValue<number> }) {
  const isRight = project.align === "right";
  
  const rangeStart = index * 0.2;
  const rangeEnd = (index + 1) * 0.2;

  const y = useTransform(scrollYProgress, [rangeStart, rangeEnd], [20, -20]);
  const imageY = useTransform(scrollYProgress, [rangeStart - 0.1, rangeEnd + 0.1], ["-8%", "8%"]);

  return (
    <motion.div
      style={{ y, opacity: 1 }}
      className={`relative w-full flex ${isRight ? "justify-end" : "justify-start"} mb-32 md:mb-64 px-4 md:px-20`}
    >
      <div className={`w-full max-w-[900px] flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isRight ? "md:flex-row-reverse" : ""}`}>
        {/* Image */}
        <div className="w-full md:w-1/2 relative aspect-[4/5] overflow-hidden rounded-2xl">
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ y: imageY }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase border border-white/20 px-3 py-1 rounded-full">
            {project.category}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mt-6 leading-tight">
            {project.title}
          </h3>
          <p className="text-base md:text-lg text-white/60 mt-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex items-center gap-3 mt-8">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white hover:text-black transition-all duration-500 text-sm border border-white/5 inline-block"
            >
              View Project
            </a>
            <span className="text-white/30 text-xl">+</span>
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
    <section id="work" ref={containerRef} className="bg-[#0C0C0C] py-20 relative overflow-hidden">
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
