import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Founded", value: "2018" },
    { label: "Projects", value: "250+" },
    { label: "Team", value: "45" },
    { label: "Awards", value: "80+" }
  ];

  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-full border border-primary/20 absolute -top-20 -left-20 w-96 blur-[1px]" />
            <div className="grid grid-cols-2 gap-8 relative z-10">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-5xl md:text-7xl font-serif font-light text-foreground mb-2">{stat.value}</span>
                  <span className="text-sm uppercase tracking-[0.2em] text-primary">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="uppercase tracking-[0.3em] text-sm text-foreground/50 mb-6 font-semibold">The Agency</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-8">
              We operate at the intersection of aesthetic obsession and technical mastery.
            </h3>
            <div className="space-y-6 text-foreground/60 font-light text-lg">
              <p>
                ClariSolve TECH wasn't built to be another agency. It was forged to be a partner for visionaries who refuse to compromise on craft.
              </p>
              <p>
                Every project we undertake is an exercise in pushing boundaries. From typography selection to the mathematical precision of our animations, we believe that true luxury lies in the details others overlook.
              </p>
            </div>
            
            <button className="mt-12 group flex items-center gap-4 text-primary font-medium tracking-wide uppercase text-sm">
              <span className="group-hover:mr-2 transition-all duration-300">Meet the Team</span>
              <div className="w-8 h-[1px] bg-primary group-hover:w-12 transition-all duration-300" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
