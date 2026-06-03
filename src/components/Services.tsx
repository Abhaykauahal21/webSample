import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Smartphone, PenTool, Layers, Box, Cpu } from "lucide-react";

const services = [
  {
    icon: <PenTool size={24} />,
    title: "Brand Identity",
    description: "Visual systems and brand narratives that define categories and captivate audiences."
  },
  {
    icon: <Monitor size={24} />,
    title: "Digital Products",
    description: "High-performance applications engineered for scale, usability, and impact."
  },
  {
    icon: <Smartphone size={24} />,
    title: "Web Experiences",
    description: "Immersive, award-winning websites that tell your story with unforgettable motion."
  },
  {
    icon: <Box size={24} />,
    title: "Motion & 3D",
    description: "Cinematic animations and spatial design that bring static interfaces to life."
  },
  {
    icon: <Layers size={24} />,
    title: "Strategy",
    description: "Data-driven roadmaps to position your brand for long-term market dominance."
  },
  {
    icon: <Cpu size={24} />,
    title: "Content Systems",
    description: "Scalable design architectures that empower your team to build faster."
  }
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 bg-background relative" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="uppercase tracking-[0.3em] text-sm text-foreground/50 mb-4 font-semibold">What We Do</h2>
          <h3 className="text-4xl md:text-6xl font-serif font-bold text-foreground">Digital Excellence,<br/>Delivered.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              
              <h4 className="text-xl font-bold mb-3 font-serif tracking-tight">{service.title}</h4>
              <p className="text-foreground/60 leading-relaxed text-sm font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
