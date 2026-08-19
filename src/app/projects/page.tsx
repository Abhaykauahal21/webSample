"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Lenis from "lenis";

const projects = [
  {
    id: "dream10",
    title: "Dream10",
    category: "Fantasy Quiz & Gaming Platform",
    description: "An immersive fantasy quiz platform featuring real-time competitions, global leaderboards, multiplayer challenges, and engaging knowledge-based gameplay for fantasy enthusiasts worldwide.",
    image: "/dream10.webp",
    url: "https://dream10.in/",
    features: ["Real-time Competitions", "Global Leaderboards", "Multiplayer Challenges", "Knowledge-based Gameplay"],
  },
  {
    id: "cashbackwallah",
    title: "Cashback Wallah",
    category: "Logistics & Shipping Platform",
    description: "An all-in-one logistics platform enabling businesses to access multiple courier partners, optimize shipping costs, automate order fulfillment, and manage deliveries through a unified dashboard.",
    image: "/cashbackwallah.webp",
    url: "https://cashbackwallah.com/",
    features: ["Multi-courier Access", "Cost Optimization", "Order Automation", "Unified Dashboard"],
  },
  {
    id: "timely-group",
    title: "Timely Group",
    category: "Corporate Website",
    description: "Premium industrial and abrasives manufacturing company website with modern branding, global presence, and a seamless user experience.",
    image: "/timely.webp",
    url: "https://timelygroup.vercel.app/",
    features: ["Modern Branding", "Global Presence", "Seamless UX", "Industrial Design"],
  },
  {
    id: "kavyaboss",
    title: "KavyaBoss",
    category: "Nutrition E-Commerce",
    description: "Modern nutrition and wellness e-commerce platform designed to deliver a seamless shopping experience for health-conscious customers.",
    image: "/kavyaboss.webp",
    url: "https://kavyaboss.vercel.app/",
    features: ["E-commerce Platform", "Wellness Products", "Seamless Checkout", "Customer Dashboard"],
  },
  {
    id: "digital-agency",
    title: "Digital Agency",
    category: "Creative Digital Agency",
    description: "A modern digital agency website focused on brand strategy, web experiences, UI/UX design, and high-converting marketing solutions.",
    image: "/digitalagency.webp",
    url: "https://abhaywebagency.vercel.app/",
    features: ["Brand Strategy", "Web Experiences", "UI/UX Design", "Marketing Solutions"],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Projects() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    const rafLoop = (time: number) => {
      lenis.raf(time * 1000);
      requestAnimationFrame(rafLoop);
    };
    const id = requestAnimationFrame(rafLoop);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900">
      <div className="flex items-center justify-between px-6 md:px-14 pt-6 pb-2">
        <Link href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-1.5" aria-label="Back to Home">
          <ArrowLeft size={13} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-14 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-neutral-500 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 inline-block">Our Work</span>
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.9] tracking-tighter mb-4">
            Selected<br />Projects
          </h1>
          <p className="text-neutral-500 text-sm md:text-base max-w-lg">
            A curated selection of projects where strategy, creativity, and craftsmanship come together.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={item}
              className="group bg-white hover:bg-[#F4F4F5] border border-black/10 rounded-2xl overflow-hidden transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="relative w-full lg:w-[400px] h-[250px] lg:h-[300px] shrink-0 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent lg:hidden" />
                </div>
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 border border-black/10 px-2 py-0.5 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-neutral-300 text-[10px] font-mono">0{i + 1}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.map((feat) => (
                        <span key={feat} className="text-[10px] text-neutral-400 border border-black/10 px-2 py-1 rounded-full">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/10 text-neutral-900 font-medium hover:bg-black hover:text-white transition-all duration-500 text-sm self-start border border-black/10"
                    aria-label={`View ${project.title} project`}
                  >
                    View Live
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
