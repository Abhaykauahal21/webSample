"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={`shrink-0 ${className}`}>
      <path d="M11 0 L12.5 9.5 L22 11 L12.5 12.5 L11 22 L9.5 12.5 L0 11 L9.5 9.5 Z" fill="white" />
    </svg>
  );
}

const socialLinks = [
 
  { label: "Facebook", href: "https://www.facebook.com/people/Clarisolvetech/61590262391170/" },
  { label: "Instagram", href: "https://www.instagram.com/ClariSolve_Tech" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/115284051/" },
 
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headline = "Understand. Simplify. Solve.";
  const words = headline.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative pt-14 bg-[#0C0C0C] min-h-screen flex flex-col">
      <div className="flex-1 px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 pb-0">
        <div className="relative rounded-2xl overflow-hidden w-full" style={{ background: "#1a1a1a", minHeight: "520px" }}>
          {/* Subtle noise texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "250px" }} />

          {/* Sparkle decorators */}
          <div className=" absolute -top-5 -left-3 z-20"><Sparkle /></div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"><Sparkle /></div>
          <div className="absolute -top-5 -right-3 z-20"><Sparkle /></div>

          {/* Card content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 md:gap-8 p-5 md:p-12 h-full min-h-[400px] md:min-h-[480px]">
            {/* Left column */}
            <div className="flex flex-col gap-4 md:gap-5 lg:w-[280px] shrink-0 w-full">
              <div className="flex flex-row items-start gap-4 md:flex-col md:gap-5">
                {/* Portrait with border glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:block relative w-[200px] h-[200px] shrink-0"
                >
                  <div className="absolute inset-0 rounded-xl p-[1px]">
                    <div className="w-full h-full rounded-xl bg-[#1a1a1a]" />
                  </div>
                  <Image src="/founder.webp" alt="Vijay Nadella — Founder & CEO of ClariSolve TECH" fill sizes="200px" className="object-cover object-top rounded-xl" priority />
                </motion.div>

                {/* Logo + text */}
                <div className="flex flex-col gap-3 md:gap-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Image src="/logo.webp" alt="ClariSolve TECH Logo" width={40} height={40} className="h-8 md:h-10 w-auto object-contain shrink-0" />
                    <span className="text-white font-bold tracking-tight text-sm md:text-xl truncate">ClariSolve <span className="text-white/60 font-medium">TECH</span></span>
                  </div>
                  <div className="flex flex-col gap-2 md:gap-4">
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-white font-medium text-sm md:text-lg leading-tight">
                      Technology solutions that help businesses grow.
                    </motion.p>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-white/60 text-xs md:text-sm leading-relaxed">
                      We help businesses build websites, develop software, automate processes, improve quality, and grow through technology — without the complexity.
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* CTA + Separator row on mobile */}
              <div className="flex flex-col gap-4">
                <motion.a
                  href="/start-project"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="hidden md:inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#ff4d00] hover:text-white transition-colors group"
                >
                  Start a project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.a>
                <div className="w-full h-px bg-white/10" />
              </div>
            </div>

            {/* Right: Headline + socials + phone */}
            <div className="flex-1 flex flex-col justify-between h-full gap-4 md:gap-8">
              <motion.div style={{ y: headlineY, opacity: headlineOpacity }} className="flex-1 flex items-center">
                <h1 className="text-[clamp(3.5rem,9vw,8rem)] font-bold leading-none tracking-tighter text-white flex flex-wrap gap-x-[0.2em]">
                  {words.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                      <motion.span
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h1>
              </motion.div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap items-center gap-1.5 md:gap-2">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 md:px-4 py-1 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all text-xs md:text-sm font-medium">
                      {s.label}
                      <span className="text-[10px] opacity-60">↑</span>
                    </a>
                  ))}
                </motion.div>

                <motion.a href="tel:+918500222838" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }} className="text-white/60 hover:text-white transition-colors text-sm font-mono tracking-widest whitespace-nowrap shrink-0">
                  [ (+91) 85002 22838]
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: sparkles + scroll indicator */}
      <div className="flex items-center justify-between px-4 md:px-12 py-3 md:py-4">
        <div className="flex items-center gap-4">
          <Sparkle className="opacity-60 scale-75 md:scale-100" />
          <motion.a
            href="#work"
            className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 hover:text-white/60 transition-colors"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.a>
        </div>
        <Sparkle className="opacity-60 scale-75 md:scale-100" />
        <Sparkle className="opacity-60 scale-75 md:scale-100" />
        <Sparkle className="opacity-60 scale-75 md:scale-100" />
      </div>
    </section>
  );
}
