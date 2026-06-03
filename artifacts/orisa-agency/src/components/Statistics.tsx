import { useRef, useEffect, useState } from "react";
import { useInView, animate } from "framer-motion";

function Counter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => setCount(Math.round(v))
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-7xl font-serif font-light text-foreground">
      {count}{suffix}
    </span>
  );
}

export function Statistics() {
  const stats = [
    { value: 150, suffix: "+", label: "Projects Delivered" },
    { value: 98, suffix: "%", label: "Client Retention" },
    { value: 12, suffix: "", label: "Years Experience" },
    { value: 40, suffix: "+", label: "Industry Awards" },
  ];

  return (
    <section className="py-24 bg-card border-y border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className="text-sm uppercase tracking-[0.2em] text-primary mt-4 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
