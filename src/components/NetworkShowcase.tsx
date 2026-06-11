"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const networkImages = [
  "/1c.webp",
  "/2c.webp",
  "/AbhayPhoto.webp",
  "/4c.webp",
  "/5c.webp",
];

function NetworkImage({ src, index, total, scrollYProgress }: { src: string; index: number; total: number; scrollYProgress: MotionValue<number> }) {
  const offset = index - (total - 1) / 2;
  const initialX = offset * 80;
  const initialY = Math.pow(Math.abs(offset), 2) * 15;

  const x = `${initialX}px`;
  const y = `${initialY}px`;
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <motion.div
      className="absolute rounded-full overflow-hidden border-[4px] border-[#0C0C0C] shadow-2xl transition-transform duration-500 hover:scale-110 hover:z-50 cursor-pointer group"
      style={{
        width: "140px",
        height: "140px",
        left: "50%",
        x,
        y,
        translateX: "-50%",
        zIndex: total - Math.abs(offset),
        opacity,
        scale,
      }}
    >
      <Image src={src} alt="" width={140} height={140} className="w-full h-full object-cover" />
    </motion.div>
  );
}

function AnimatedWord({ word, index, total, scrollYProgress }: { word: string; index: number; total: number; scrollYProgress: MotionValue<number> }) {
  const start = index / total;
  const end = start + 1 / total;
  const wordY = useTransform(scrollYProgress, [start * 0.3 + 0.1, end * 0.3 + 0.2], ["100%", "0%"]);
  const wordOpacity = useTransform(scrollYProgress, [start * 0.3 + 0.1, end * 0.3 + 0.2], [0, 1]);

  return (
    <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span style={{ y: wordY, opacity: wordOpacity }} className="inline-block">
        {word}
      </motion.span>
    </span>
  );
}

export function NetworkShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end start"],
  });

  const headline = "We design data–driven digital journeys that connect brands with the right audiences and turn strategy into measurable growth.";
  const words = headline.split(" ");

  return (
    <section ref={containerRef} className="relative w-full bg-[#0C0C0C] py-12 md:py-24 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center h-[220px] w-full max-w-4xl mx-auto mb-12">
        {isMobile ? (
          networkImages.map((src, i) => {
            const offset = i - (networkImages.length - 1) / 2;
            const xPos = offset * 45;
            const yPos = Math.pow(Math.abs(offset), 2) * 8;
            return (
              <div
                key={`mobile-${i}`}
                className="absolute rounded-full overflow-hidden border-[3px] border-[#0C0C0C] shadow-lg"
                style={{
                  width: "80px",
                  height: "80px",
                  left: `calc(50% + ${xPos}px)`,
                  top: `${yPos}px`,
                  transform: `translateX(-50%)`,
                  zIndex: networkImages.length - Math.abs(offset),
                }}
              >
                <Image src={src} alt="" width={80} height={80} className="w-full h-full object-cover" />
              </div>
            );
          })
        ) : (
          networkImages.map((src, i) => (
            <NetworkImage key={i} src={src} index={i} total={networkImages.length} scrollYProgress={scrollYProgress} />
          ))
        )}
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-bold text-white leading-[1.1] tracking-tight mb-12 max-w-[900px] flex flex-wrap justify-center gap-x-[0.25em]">
          {words.map((word, i) => (
            <AnimatedWord key={i} word={word} index={i} total={words.length} scrollYProgress={scrollYProgress} />
          ))}
        </h2>

        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.4, 0.5], [0, 1]),
            y: useTransform(scrollYProgress, [0.4, 0.5], [20, 0]),
          }}
          className="flex items-center gap-3"
        >
          <Link
            href="/start-project"
            className="px-10 py-5 rounded-full bg-[#1a1a1a] text-white font-medium hover:bg-white hover:text-black transition-all duration-500 text-lg inline-block"
            aria-label="Get in touch with us"
          >
            Get In Touch
          </Link>
          <Link
            href="/start-project"
            className="w-16 h-16 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
            aria-label="Start a project"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
