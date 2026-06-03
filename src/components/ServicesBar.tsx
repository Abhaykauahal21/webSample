import { motion } from "framer-motion";

const services = [
  "Web Development",
  "Motion Graphics",
  "Brand Strategy",
  "Product Design",
];

function Sparkle() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 opacity-80">
      <path d="M10 0 L11.2 8.8 L20 10 L11.2 11.2 L10 20 L8.8 11.2 L0 10 L8.8 8.8 Z" fill="white" />
    </svg>
  );
}

export function ServicesBar() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: "linear-gradient(90deg, #2a1a08 0%, #5c3010 25%, #8b4a18 50%, #5c3010 75%, #2a1a08 100%)" }}>
      <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between gap-4">
        {services.map((service, i) => (
          <div key={service} className="flex items-center gap-4 flex-1">
            {i > 0 && <Sparkle />}
            <motion.a
              href="#services"
              className="flex items-center gap-2 text-white font-medium text-sm md:text-base tracking-wide whitespace-nowrap hover:opacity-80 transition-opacity group"
              whileHover={{ x: 2 }}
              data-testid={`link-service-${i}`}
            >
              {service}
              <span className="text-white/70 group-hover:text-white transition-colors">↗</span>
            </motion.a>
          </div>
        ))}
      </div>
    </div>
  );
}
