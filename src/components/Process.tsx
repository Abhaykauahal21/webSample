import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  { num: "01", title: "Discovery", desc: "Deep dive into your brand architecture and market position." },
  { num: "02", title: "Strategy", desc: "Data-driven roadmaps to ensure long-term dominance." },
  { num: "03", title: "Design", desc: "Obsessive visual exploration and prototype generation." },
  { num: "04", title: "Build", desc: "Surgical engineering of the digital experience." },
  { num: "05", title: "Launch", desc: "Calculated rollout and performance monitoring." },
];

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-32 bg-background relative" ref={ref}>
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="uppercase tracking-[0.3em] text-sm text-foreground/50 mb-4 font-semibold">Our Process</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Methodical Execution</h3>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex gap-8 md:gap-12 relative pb-16 last:pb-0 group"
            >
              {/* Line */}
              {index !== steps.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-[1px] bg-white/10 group-hover:bg-primary/50 transition-colors duration-500" />
              )}
              
              <div className="flex-none">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center font-serif text-xl bg-background z-10 relative group-hover:border-primary group-hover:text-primary transition-colors duration-500 text-foreground">
                  {step.num}
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="text-2xl font-bold font-serif mb-3 group-hover:text-primary transition-colors duration-500 text-foreground">{step.title}</h4>
                <p className="text-foreground/60 text-lg font-light leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
