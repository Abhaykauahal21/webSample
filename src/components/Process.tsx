"use client";

import { motion } from "framer-motion";

function RevealWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.05em] -mb-[0.05em]">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.015, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const steps = [
  {
    num: "01",
    title: "Understand",
    desc: "We learn your business before recommending solutions. Goals, customers, constraints.",
  },
  {
    num: "02",
    title: "Simplify",
    desc: "We strip unnecessary complexity and align everyone on the simplest path forward.",
  },
  {
    num: "03",
    title: "Solve",
    desc: "We implement practical solutions that create measurable business results.",
  },
];

export function Process() {
  return (
    <section className="py-12 md:py-32 bg-[#0C0C0C] px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-[#141414] rounded-[40px] p-8 md:p-20">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white/50 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 inline-block"
            >
              Our Process
            </motion.span>
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white leading-[0.9] tracking-tighter mb-4">
              <RevealWords text="The ClariSolve Framework." />
            </h2>
            <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto">
              <RevealWords text="A simple, signature framework we apply to every engagement." />
            </p>
          </div>

          {/* Steps */}
          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step.num}
                className="relative flex gap-6 md:gap-10 pb-12 md:pb-16 last:pb-0 group"
              >
                {index !== steps.length - 1 && (
                  <div className="absolute left-5 md:left-6 top-14 md:top-16 bottom-0 w-[1px] bg-white/10" />
                )}

                <div className="flex-none">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-sm md:text-base font-bold text-white/60 bg-[#0C0C0C] z-10 relative group-hover:border-[#ff4d00] group-hover:text-[#ff4d00] transition-colors duration-500"
                  >
                    {step.num}
                  </motion.div>
                </div>

                <div className="pt-1 md:pt-2 overflow-hidden">
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 + 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#ff4d00] transition-colors duration-500"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white/50 text-sm md:text-base leading-relaxed"
                  >
                    <RevealWords text={step.desc} />
                  </motion.p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
