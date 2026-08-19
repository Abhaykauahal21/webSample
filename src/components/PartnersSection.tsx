"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

/* ─── Partner brand data ─────────────────────────────────── */
const partners = [
  {
    name: "Sisyphus",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <path d="M9 0L11 7H18L12.5 11.3L14.5 18L9 13.7L3.5 18L5.5 11.3L0 7H7Z" />
      </svg>
    ),
  },
  {
    name: "Blockly",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <polygon points="9,1 17,5.5 17,12.5 9,17 1,12.5 1,5.5" />
      </svg>
    ),
  },
  {
    name: "Architect",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <path d="M9 1L1 17H17L9 1ZM9 6L14 15H4L9 6Z" />
      </svg>
    ),
  },
  {
    name: "Techlify",
    icon: (
      <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor">
        <path d="M10 0C6 0 2.7 2.2 1 5.4C2.7 3.9 5 3 7.5 3C12.2 3 16 6.8 16 11.5H18C18 5.1 14.5 0 10 0Z" />
        <path d="M10 4C7 4 4.5 5.9 3.2 8.6C4.5 7.4 6.1 6.7 8 6.7C11.5 6.7 14.3 9.5 14.3 13H16.3C16.3 8 13.6 4 10 4Z" />
        <path d="M10 8C8 8 6.5 9.2 5.7 10.9C6.5 10.2 7.7 9.8 9 9.8C11.3 9.8 13.1 11.6 13.1 13.9H14.9C14.9 10.6 12.8 8 10 8Z" />
      </svg>
    ),
  },
  {
    name: "Cloudly",
    icon: (
      <svg width="22" height="14" viewBox="0 0 22 14" fill="currentColor">
        <path d="M17.5 5.5C17.5 5.5 17.3 5.5 17.1 5.5C16.5 2.4 13.8 0 10.5 0C7.5 0 5 1.9 3.9 4.6C1.7 4.9 0 6.8 0 9C0 11.2 1.8 13 4 13H17.5C19.4 13 21 11.4 21 9.5C21 7.6 19.4 5.5 17.5 5.5Z" />
      </svg>
    ),
  },
  {
    name: "LOGO",
    icon: null,
    isWordmark: true,
  },
];

/* Duplicate for seamless loop */
const loopedPartners = [...partners, ...partners, ...partners];

/* ─── Blob "Let's Talk" button ───────────────────────────── */
function BlobButton() {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="shrink-0"
    >
      <Link
        href="/start-project"
        className="relative flex flex-col items-center justify-center w-[120px] h-[120px] md:w-[150px] md:h-[150px] cursor-pointer select-none"
        aria-label="Start a project with us"
      >
        <motion.div
          className="absolute inset-0 bg-[#F4F4F5] border border-black/10"
          animate={{
            borderRadius: [
              "60% 40% 55% 45% / 55% 45% 60% 40%",
              "45% 55% 40% 60% / 60% 40% 55% 45%",
              "55% 45% 60% 40% / 40% 60% 45% 55%",
              "60% 40% 55% 45% / 55% 45% 60% 40%",
            ],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 flex flex-col items-center gap-1.5 text-neutral-900">
          <ArrowUpRight size={16} className="opacity-70" />
          <span className="text-sm font-semibold tracking-wide">Let's Talk</span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Marquee ────────────────────────────────────────────── */
function Marquee() {
  return (
    <div className="relative w-full overflow-hidden py-10 border-y border-black/10">
      <motion.div
        className="flex items-center gap-16 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {loopedPartners.map((partner, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer shrink-0"
          >
            {partner.isWordmark ? (
              <span className="text-2xl font-black tracking-tighter">
                LO<span className="inline-block w-6 h-4 bg-white/40 rounded-sm mx-0.5 align-middle"></span>O
              </span>
            ) : (
              <>
                <span className="scale-125">{partner.icon}</span>
                <span className="text-lg font-medium tracking-wide">{partner.name}</span>
              </>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function AnimatedWord({ word, index, total, scrollYProgress }: { word: string; index: number; total: number; scrollYProgress: MotionValue<number> }) {
  const start = index / total;
  const end = start + 1 / total;
  
  // Mask reveal progress
  const y = useTransform(scrollYProgress, [start * 0.4, end * 0.4 + 0.1], ["100%", "0%"]);
  // Opacity progress
  const opacity = useTransform(scrollYProgress, [start * 0.4, end * 0.4 + 0.1], [0, 1]);

  return (
    <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span 
        style={{ y, opacity }}
        className="inline-block"
      >
        {word}
      </motion.span>
    </span>
  );
}

export function PartnersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headline = "Collaborating with progressive brands to shape meaningful, long-term impact.";
  const words = headline.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="bg-[#FAFAFA] py-12 md:py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-14">
        {/* Top Label */}
        <Link href="/partners" className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-8 transition-colors" aria-label="View our partners">
          <span>Our Partners</span>
        </Link>

        {/* Headline with Scroll-based Word-by-word Reveal */}
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight max-w-[850px] text-neutral-900 mb-16 flex flex-wrap gap-x-[0.25em]">
          {words.map((word, i) => (
            <AnimatedWord key={i} word={word} index={i} total={words.length} scrollYProgress={scrollYProgress} />
          ))}
        </h2>
      </div>

      {/* Marquee */}
      <Marquee />

      {/* Bottom Section */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-14 mt-16 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        <BlobButton />
        <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-[280px] text-center md:text-left">
          Empowering ambitious brands to define their presence with focus and precision.
        </p>
      </div>
    </section>
  );
}
