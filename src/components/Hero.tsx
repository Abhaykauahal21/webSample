"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M11 0 L12.5 9.5 L22 11 L12.5 12.5 L11 22 L9.5 12.5 L0 11 L9.5 9.5 Z"
        fill="white"
      />
    </svg>
  );
}

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "https://www.facebook.com/ClariSolveTech" },
  { label: "Instagram", href: "https://www.instagram.com/ClariSolve_Tech" },
  { label: "Dribbble", href: "#" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headline = "Understand. Simplify. Solve.";
  const words = headline.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax and fade effects for the headline on scroll
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative pt-14 bg-[#0C0C0C] min-h-screen flex flex-col">
      {/* Main card area */}
      <div className="flex-1 px-4 md:px-6 pt-4 pb-0">
        {/* Card with noise texture */}
        <div
          className="relative rounded-2xl overflow-hidden w-full"
          style={{
            background: "#1a1a1a",
            minHeight: "520px",
          }}
        >
          {/* Noisy texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.5] mix-blend-overlay z-[1]"
            style={{
              backgroundImage: `url("/noisy.gif?v=2")`,
              backgroundRepeat: "repeat",
              backgroundSize: "250px",
            }}
          />

          {/* Sparkle decorators at corners */}
          <div className="absolute -top-3 -left-3 z-20">
            <Sparkle />
          </div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <Sparkle />
          </div>
          <div className="absolute -top-3 -right-3 z-20">
            <Sparkle />
          </div>

          {/* Card content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8 md:p-12 h-full min-h-[480px]">

            {/* Left column */}
            <div className="flex flex-col gap-5 lg:w-[280px] shrink-0">
              {/* Portrait */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[200px] h-[160px] lg:h-[200px] rounded-xl overflow-hidden"
              >
                <img
                  src="/founder.png"
                  alt="Creative professional"
                  className="w-full h-full object-cover object-top"
                  data-testid="img-hero-portrait"
                />
              </motion.div>

              {/* Logo mark */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://clarisolvetech.lovable.app/assets/clarisolve-logo-B7oqDF0B.png" 
                    alt="ClariSolve TECH Logo" 
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-white font-bold tracking-tight text-xl">ClariSolve <span className="text-white/60 font-medium text-lg">TECH</span></span>
                </div>
                
                <div className="flex flex-col gap-4">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-white font-medium text-lg leading-tight"
                  >
                    Technology solutions that help businesses grow.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-white/60 text-sm leading-relaxed"
                  >
                    We help businesses build websites, develop software, automate processes, improve quality, and grow through technology — without the complexity.
                  </motion.p>
                </div>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-white/10" />
            </div>

            {/* Right: Big name + socials + phone */}
            <div className="flex-1 flex flex-col justify-between h-full gap-8">
              {/* Big studio name with Masking Reveal & Scroll Effect */}
              <motion.div
                style={{ y: headlineY, opacity: headlineOpacity }}
                className="flex-1 flex items-center"
              >
                <h1
                  className="text-[clamp(3.5rem,9vw,8rem)] font-bold leading-none tracking-tight text-white flex flex-wrap gap-x-[0.2em] font-sans"
                  data-testid="text-hero-headline"
                >
                  {words.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                      <motion.span 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ 
                          duration: 1, 
                          delay: 0.3 + (i * 0.1), 
                          ease: [0.16, 1, 0.3, 1] 
                        }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h1>
              </motion.div>

              {/* Bottom row: socials + phone */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Social pills */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-wrap items-center gap-2"
                >
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="flex items-center gap-1 px-4 py-1.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all text-sm font-medium"
                      data-testid={`link-social-${s.label.toLowerCase()}`}
                    >
                      {s.label}
                      <span className="text-[10px] opacity-60">↑</span>
                    </a>
                  ))}
                </motion.div>

                {/* Phone */}
                <motion.a
                  href="tel:+015557398"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-white/60 hover:text-white transition-colors text-sm font-mono tracking-widest whitespace-nowrap shrink-0"
                  data-testid="link-phone"
                >
                  [ (+01) 555-7398 ]
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sparkle row */}
      <div className="flex items-center justify-between px-8 md:px-12 py-3">
        <Sparkle className="opacity-60" />
        <Sparkle className="opacity-60" />
        <Sparkle className="opacity-60" />
        <Sparkle className="opacity-60" />
      </div>
    </section>
  );
}
