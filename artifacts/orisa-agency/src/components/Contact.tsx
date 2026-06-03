import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 bg-card border-t border-white/5 relative" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="uppercase tracking-[0.3em] text-sm text-foreground/50 mb-6 font-semibold">Let's Work Together</h2>
            <h3 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-8 leading-tight">
              Ready to redefine your category?
            </h3>
            <p className="text-foreground/60 text-lg font-light mb-12 max-w-md">
              We partner with visionary leaders to create digital experiences that set the benchmark. Reach out to start the conversation.
            </p>
            
            <div className="space-y-6">
              <div>
                <span className="block text-sm uppercase tracking-widest text-foreground/40 mb-2 font-medium">Email</span>
                <a href="mailto:hello@nexus.studio" className="text-2xl font-serif text-foreground hover:text-primary transition-colors">hello@nexus.studio</a>
              </div>
              <div>
                <span className="block text-sm uppercase tracking-widest text-foreground/40 mb-2 font-medium">Office</span>
                <p className="text-lg font-light text-foreground/80">
                  100 Obsidian Way<br />
                  San Francisco, CA 94103
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 md:p-12 rounded-3xl bg-background border border-white/5"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm uppercase tracking-widest text-foreground/60 font-medium">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/10 pb-2 focus:border-primary outline-none transition-colors text-foreground" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm uppercase tracking-widest text-foreground/60 font-medium">Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/10 pb-2 focus:border-primary outline-none transition-colors text-foreground" placeholder="john@company.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-foreground/60 font-medium">Project Type</label>
                <select className="w-full bg-transparent border-b border-white/10 pb-2 focus:border-primary outline-none transition-colors text-foreground/80 appearance-none">
                  <option className="bg-card text-foreground">Brand Identity</option>
                  <option className="bg-card text-foreground">Digital Platform</option>
                  <option className="bg-card text-foreground">Web Experience</option>
                  <option className="bg-card text-foreground">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-foreground/60 font-medium">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/10 pb-2 focus:border-primary outline-none transition-colors text-foreground resize-none" placeholder="Tell us about your vision..."></textarea>
              </div>

              <button className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors uppercase tracking-widest text-sm relative group overflow-hidden">
                <span className="relative z-10">Submit Inquiry</span>
                <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
