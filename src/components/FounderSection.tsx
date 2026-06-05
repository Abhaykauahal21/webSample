"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: "20+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "1+", label: "Years Building Digital Solutions" },
];

function Word({ word, index, totalWords, scrollYProgress }: {
  word: string;
  index: number;
  totalWords: number;
  scrollYProgress: any;
}) {
  const start = index / totalWords;
  const end = start + (1 / totalWords);

  const opacity = useTransform(scrollYProgress, [start * 0.4 + 0.1, end * 0.4 + 0.15], [0.2, 1]);
  const y = useTransform(scrollYProgress, [start * 0.4 + 0.1, end * 0.4 + 0.15], [10, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium text-white leading-[1.5] tracking-tight italic font-serif mr-[0.3em] mb-[0.2em]"
    >
      {word}
    </motion.span>
  );
}

function MobileFounderSection() {
  const quote = "At ClariSolve Tech, we help organizations overcome technical challenges, automate processes, and build digital solutions that create measurable business growth.";
  const quoteWords = quote.split(" ");

  return (
    <section className="relative w-full bg-[#0C0C0C] py-12 px-4 overflow-hidden">
      <div className="max-w-[1400px] mx-auto bg-[#141414] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl relative">
        {/* Subtle grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-0" style={{ backgroundImage: `url("/noisy.gif?v=2")`, backgroundRepeat: "repeat", backgroundSize: "200px" }} />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#ff8c00]/30"
              style={{ left: `${10 + i * 18}%`, top: `${20 + (i % 3) * 30}%` }}
              animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Founder Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[320px] overflow-hidden"
        >
          {/* Soft glow behind image */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-[#ff8c00]/15 blur-[100px] rounded-full z-0" />

          <img
            src="/founderSection.png"
            alt="Vijay Nadella - Founder"
            className="w-full h-full object-cover object-[50%_15%]"
            loading="lazy"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />

          {/* Glassmorphism bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#141414] to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 px-6 pb-8 -mt-16">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-[1px] bg-[#ff8c00]/60" />
              <span className="text-[#ff8c00] text-[9px] font-bold tracking-[0.25em] uppercase">Founder&apos;s Vision</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(1.8rem,7vw,2.8rem)] font-bold text-white leading-[1.05] tracking-tighter mb-3"
          >
            The Mind Behind<br />ClariSolve Tech
          </motion.h2>

          {/* Mission */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-sm leading-relaxed mb-6 italic border-l-2 border-[#ff8c00]/40 pl-4"
          >
            &ldquo;Technology should simplify business, not complicate it.&rdquo;
          </motion.p>

          {/* Quote - word by word reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <p className="text-white/50 text-sm leading-relaxed">
              {quoteWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.03 }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5"
          >
            <div className="w-10 h-10 rounded-full bg-[#ff8c00]/10 flex items-center justify-center border border-[#ff8c00]/20">
              <span className="text-[#ff8c00] text-lg font-serif font-bold">V</span>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm leading-none mb-1">Vijay Nadella</h4>
              <p className="text-white/40 text-[10px] tracking-[0.15em] uppercase font-medium">Founder &amp; CEO, ClariSolve Tech</p>
            </div>
          </motion.div>

          {/* Stats Cards - Horizontal Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 scrollbar-hide">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.15 }}
                  className="snap-start shrink-0 w-[160px] bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 backdrop-blur-xl"
                >
                  <span className="text-[clamp(1.5rem,5vw,2rem)] font-bold text-[#ff8c00] leading-none block mb-2">
                    {stat.value}
                  </span>
                  <span className="text-white/50 text-xs leading-snug block">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="h-[1px] bg-gradient-to-r from-[#ff8c00]/40 via-transparent to-transparent mt-6 origin-left"
          />
        </div>
      </div>
    </section>
  );
}

export function FounderSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const quote = "ClariSolve Tech was founded with a simple belief: businesses should not struggle with technology. Our mission is to help organizations understand challenges clearly, simplify solutions, and implement technology that creates real business value.";
  const words = quote.split(" ");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile) {
    return <MobileFounderSection />;
  }

  return (
    <section ref={containerRef} className="relative w-full bg-[#0C0C0C] py-12 md:py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto bg-[#141414] rounded-[40px] overflow-hidden border border-white/5 shadow-2xl relative min-h-[600px] lg:min-h-[800px]">

        {/* Background Image Wrapper */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <img
            src="/founderSection.webp"
              alt="Founder Background"
              className="w-full h-full object-cover object-[95%_top] lg:object-right-top"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/60 to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/50 to-transparent z-10 lg:hidden" />
          <div className="absolute inset-0 bg-black/5 z-10" />
        </div>

        {/* Content Layer */}
        <div className="relative z-20 flex flex-col justify-center h-full min-h-[600px] lg:min-h-[800px] p-8 md:p-16 lg:p-24 max-w-4xl lg:max-w-[55%]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12 group cursor-default"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-8 h-[1px] bg-[#ff8c00]/40 group-hover:w-12 transition-all duration-500" />
                <span className="text-[#ff8c00] text-[10px] font-bold tracking-[0.3em] uppercase">
                  Founder&rsquo;s Vision
                </span>
              </div>
              <h4 className="text-white/50 text-xs font-medium tracking-[0.15em] uppercase pl-10 group-hover:text-white/80 transition-colors duration-500">
                The Mind Behind The Brand
              </h4>
            </div>
          </motion.div>

          <div className="relative mb-12">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute -left-10 -top-10 text-[10rem] font-serif leading-none text-white pointer-events-none"
            >
              &ldquo;
            </motion.span>
            <div className="flex flex-wrap relative z-10">
              {words.map((word, i) => (
                <Word key={i} word={word} index={i} totalWords={words.length} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-2 mb-16 pl-1 border-l-2 border-[#ff8c00]/50"
          >
            <h3 className="text-white text-3xl font-bold tracking-tight leading-none">Vijay Nadella</h3>
            <p className="text-[#ff8c00] text-sm font-semibold tracking-[0.1em] uppercase">Founder &amp; CEO, ClariSolve Tech</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center gap-4 mt-8 opacity-40 hover:opacity-100 transition-opacity duration-500"
          >
            <div className="w-8 h-8 grid grid-cols-2 gap-[2px]">
              <div className="bg-white rounded-[1px]" />
              <div className="bg-white rounded-[1px] opacity-40" />
              <div className="bg-white rounded-[1px] opacity-40" />
              <div className="bg-white rounded-[1px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tighter leading-none text-sm uppercase">Founder</span>
              <span className="text-white font-bold tracking-tighter leading-none text-sm uppercase">Vision</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
