"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: "dream10",
    title: "Dream10",
    category: "FANTASY QUIZ & GAMING PLATFORM",
    description:
      "An immersive fantasy quiz platform featuring real-time competitions, global leaderboards, multiplayer challenges, and engaging knowledge-based gameplay for fantasy enthusiasts worldwide.",
    image: "/dream10.webp",
    url: "https://dream10.in/",
    align: "left",
  },
  {
    id: "cashbackwallah",
    title: "Cashback Wallah",
    category: "LOGISTICS & SHIPPING PLATFORM",
    description:
      "An all-in-one logistics platform enabling businesses to access multiple courier partners, optimize shipping costs, automate order fulfillment, and manage deliveries through a unified dashboard.",
    image: "/cashbackwallah.webp",
    url: "https://cashbackwallah.com/",
    align: "right",
  },
  {
    id: "timely-group",
    title: "Timely Group",
    category: "CORPORATE WEBSITE",
    description:
      "Premium industrial and abrasives manufacturing company website with modern branding and global presence.",
    image: "/timely.webp",
    url: "https://timelygroup.vercel.app/",
    align: "left",
  },
  {
    id: "kavyaboss",
    title: "KavyaBoss",
    category: "NUTRITION E-COMMERCE",
    description:
      "Modern nutrition and wellness e-commerce platform designed to deliver a seamless shopping experience for health-conscious customers.",
    image: "/kavyaboss.webp",
    url: "https://kavyaboss.vercel.app/",
    align: "right",
  },
  {
    id: "digital-agency",
    title: "Digital Agency",
    category: "CREATIVE DIGITAL AGENCY",
    description:
      "A modern digital agency website focused on brand strategy, web experiences, UI/UX design, and high-converting marketing solutions.",
    image: "/digitalagency.webp",
    url: "https://abhaywebagency.vercel.app/",
    align: "left",
  },
];

function ProjectCard({ project, index, scrollYProgress }: { project: typeof projects[0], index: number, scrollYProgress: MotionValue<number> }) {
  const isRight = project.align === "right";
  
  const rangeStart = index * 0.2;
  const rangeEnd = (index + 1) * 0.2;

  const y = useTransform(scrollYProgress, [rangeStart, rangeEnd], [20, -20]);

  return (
    <motion.div
      style={{ y, opacity: 1 }}
      className={`relative w-full flex ${isRight ? "justify-end" : "justify-start"} mb-32 md:mb-64 px-4 md:px-20`}
    >
      <div className={`w-full max-w-[900px] flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isRight ? "md:flex-row-reverse" : ""}`}>
        {/* Image */}
        <div className="w-full relative rounded-2xl bg-black/[0.03]">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title} project`}
            width={900}
            height={600}
            className="w-full h-auto rounded-2xl"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
            }}
          />
        </div>

        {/* Text Content */}
        <div className="w-full">
          <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase border border-black/20 px-3 py-1 rounded-full">
            {project.category}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-6 leading-tight">
            {project.title}
          </h3>
          <p className="text-base md:text-lg text-neutral-600 mt-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex items-center gap-3 mt-8">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full bg-black/10 text-neutral-900 font-medium hover:bg-black hover:text-white transition-all duration-500 text-sm border border-black/10 inline-block"
            >
              View Project
            </a>
            <span className="text-neutral-400 text-xl">+</span>
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
    <section id="work" ref={containerRef} className="bg-[#FAFAFA] py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="bg-white rounded-[40px] py-24 md:py-32 relative overflow-hidden">
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
            {/* Back to Home */}
            <div className="px-8 md:px-20 mb-8">
              <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-900 text-xs font-bold tracking-[0.2em] uppercase transition-colors" aria-label="Back to Home">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back to Home
              </Link>
            </div>
            {/* Headline */}
            <div className="px-8 md:px-20 mb-32">
              <h2 className="text-[clamp(3rem,12vw,10rem)] font-bold text-neutral-900 leading-[0.85] tracking-tighter">
                Our<span className="inline-flex items-center mx-4 md:mx-8">
                  <svg width="1em" height="1em" viewBox="0 0 100 100" fill="none" className="w-[0.8em] h-[0.8em] animate-spin-slow">
                    <path d="M50 0V100M0 50H100M14.6 14.6L85.4 85.4M14.6 85.4L85.4 14.6" stroke="currentColor" strokeWidth="8"/>
                  </svg>
                </span><br />
                Selected<br />
                Work<span className="ml-4 text-neutral-400">→</span>
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
                <div className="w-6 h-6 border-2 border-black/20 grid grid-cols-2 gap-0.5">
                    <div className="bg-white"></div>
                    <div></div>
                    <div></div>
                    <div className="bg-white"></div>
                </div>
              </div>
              <p className="text-neutral-600 text-lg md:text-xl max-w-md leading-relaxed mb-10">
                A curated selection of projects where strategy, creativity, and craftsmanship come together to build meaningful and enduring brand experiences.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="/projects"
                  className="px-10 py-4 rounded-full bg-[#FAFAFA] text-neutral-900 font-medium hover:bg-black hover:text-white transition-all duration-500 text-lg border border-black/10 inline-block"
                  aria-label="View all our latest projects"
                >
                  View Latest Projects
                </a>
                <a
                  href="/projects"
                  className="w-14 h-14 rounded-full bg-[#FAFAFA] text-neutral-900 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 border border-black/10"
                  aria-label="Get started with your project"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
