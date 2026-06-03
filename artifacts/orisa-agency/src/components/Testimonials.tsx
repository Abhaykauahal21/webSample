import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Elena Rostova",
    role: "CMO, Veles Luxury",
    quote: "Nexus doesn't just build websites; they engineer digital gravity. Our engagement metrics doubled within weeks of the relaunch."
  },
  {
    name: "Marcus Chen",
    role: "Founder, Aura Fintech",
    quote: "The precision in their work is unmatched. They translated complex financial data into an interface that feels impossibly elegant."
  },
  {
    name: "Sarah Jenkins",
    role: "VP Brand, Kroma Core",
    quote: "Working with Nexus is a masterclass in design execution. They operate at a standard of quality that redefines expectations."
  }
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="uppercase tracking-[0.3em] text-sm text-foreground/50 mb-4 font-semibold">What Clients Say</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">The Nexus Standard</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl relative"
            >
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg font-serif italic text-foreground/80 mb-8 leading-relaxed">
                "{t.quote}"
              </p>
              <div>
                <h4 className="font-bold tracking-tight text-foreground">{t.name}</h4>
                <p className="text-sm text-foreground/50 uppercase tracking-wider mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
