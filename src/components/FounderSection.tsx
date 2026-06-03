"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRef } from "react";

export function FounderSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const quote = "ClariSolve Tech was founded with a simple belief: businesses should not struggle with technology. Our mission is to help organizations understand challenges clearly, simplify solutions, and implement technology that creates real business value.";
  const words = quote.split(" ");

  return (
    <section ref={containerRef} className="relative w-full bg-[#0C0C0C] py-24 px-4 md:px-8 overflow-hidden">
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
              src="/founderSection.png" 
              alt="Founder Background" 
              className="w-full h-full object-cover object-[95%_top] lg:object-right-top"
            />
          </motion.div>
          {/* High-end Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/60 to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/50 to-transparent z-10 lg:hidden" />
          <div className="absolute inset-0 bg-black/5 z-10" />
        </div>

        {/* Content Layer */}
        <div className="relative z-20 flex flex-col justify-center h-full min-h-[600px] lg:min-h-[800px] p-8 md:p-16 lg:p-24 max-w-4xl lg:max-w-[55%]">
          {/* Founder Badge - Refined UI */}
          <motion.div
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="flex items-center gap-4 mb-12 group cursor-default"
>
  <div className="flex flex-col">
    <div className="flex items-center gap-2 mb-1">
      <span className="w-8 h-[1px] bg-[#ff8c00]/40 group-hover:w-12 transition-all duration-500"></span>
      <span className="text-[#ff8c00] text-[10px] font-bold tracking-[0.3em] uppercase">
        Founder’s Vision
      </span>
    </div>

    <h4 className="text-white/50 text-xs font-medium tracking-[0.15em] uppercase pl-10 group-hover:text-white/80 transition-colors duration-500">
      The Mind Behind The Brand
    </h4>
  </div>
</motion.div>

          {/* Headline / Quote */}
          <div className="relative mb-12">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute -left-10 -top-10 text-[10rem] font-serif leading-none text-white pointer-events-none"
            >
              “
            </motion.span>
            <div className="flex flex-wrap relative z-10">
              {words.map((word, i) => (
                <Word key={i} word={word} index={i} totalWords={words.length} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>

          {/* Founder Name & Role */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-2 mb-16 pl-1 border-l-2 border-[#ff8c00]/50"
          >
            <h3 className="text-white text-3xl font-bold tracking-tight leading-none">Vijay Nadella</h3>
            <p className="text-[#ff8c00] text-sm font-semibold tracking-[0.1em] uppercase">Founder & CEO, ClariSolve Tech</p>
          </motion.div>

          {/* Founder Vision Logo Area */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center gap-4 mt-8 opacity-40 hover:opacity-100 transition-opacity duration-500"
          >
            <div className="w-8 h-8 grid grid-cols-2 gap-[2px]">
              <div className="bg-white rounded-[1px]"></div>
              <div className="bg-white rounded-[1px] opacity-40"></div>
              <div className="bg-white rounded-[1px] opacity-40"></div>
              <div className="bg-white rounded-[1px]"></div>
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

function Word({ word, index, totalWords, scrollYProgress }: { 
  word: string; 
  index: number; 
  totalWords: number; 
  scrollYProgress: any 
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
