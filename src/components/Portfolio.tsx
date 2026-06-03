import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: 1,
    client: "Aura Fintech",
    type: "Digital Platform",
    year: "2024",
    image: "/projects/project3.png"
  },
  {
    id: 2,
    client: "Veles Luxury",
    type: "E-Commerce",
    year: "2023",
    image: "/projects/project2.png"
  },
  {
    id: 3,
    client: "Kroma Core",
    type: "Brand Identity",
    year: "2024",
    image: "/projects/project1.png"
  },
  {
    id: 4,
    client: "Nova Media",
    type: "Visual System",
    year: "2023",
    image: "/projects/project4.png"
  }
];

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div>
            <h2 className="uppercase tracking-[0.3em] text-sm text-foreground/50 mb-4 font-semibold">Selected Work</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-foreground">Featured Projects</h3>
          </div>
          <button className="text-sm uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-white hover:border-white transition-colors">
            View All Cases
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`group cursor-pointer ${index % 2 !== 0 ? "md:mt-24" : ""}`}
            >
              <div className="overflow-hidden rounded-xl bg-card border border-white/5 mb-6 relative aspect-[4/3]">
                <div className="absolute inset-0 bg-black/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="px-6 py-3 border border-white/30 text-white rounded-full backdrop-blur-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Project
                  </span>
                </div>
                <img 
                  src={project.image} 
                  alt={project.client}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{project.client}</h4>
                  <p className="text-foreground/50 text-sm">{project.type}</p>
                </div>
                <span className="text-sm font-mono text-foreground/40">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
