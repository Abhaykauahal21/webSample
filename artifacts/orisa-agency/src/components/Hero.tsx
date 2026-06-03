import { motion } from "framer-motion";

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M11 0 L12.5 9.5 L22 11 L12.5 12.5 L11 22 L9.5 12.5 L0 11 L9.5 9.5 Z"
        fill="white"
      />
    </svg>
  );
}

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Dribbble", href: "#" },
];

export function Hero() {
  return (
    <section className="relative pt-14 bg-[#111111] min-h-screen flex flex-col">
      {/* Main card area */}
      <div className="flex-1 px-4 md:px-6 pt-4 pb-0">
        {/* Card with noise texture */}
        <div
          className="relative rounded-2xl overflow-hidden w-full"
          style={{
            background: "#1a1a1a",
            minHeight: "520px",
          }}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.35]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          {/* Sparkle decorators at corners */}
          <div className="absolute -top-3 -left-3 z-20">
            <Sparkle />
          </div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <Sparkle />
          </div>
          <div className="absolute -top-3 -right-3 z-20">
            <Sparkle />
          </div>

          {/* Card content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8 md:p-12 h-full min-h-[480px]">

            {/* Left column */}
            <div className="flex flex-col gap-5 lg:w-[280px] shrink-0">
              {/* Portrait */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[200px] h-[160px] lg:h-[200px] rounded-xl overflow-hidden"
              >
                <img
                  src="/portrait.png"
                  alt="Creative professional"
                  className="w-full h-full object-cover object-top"
                  data-testid="img-hero-portrait"
                />
              </motion.div>

              {/* Logo mark */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 grid grid-cols-2 gap-[2px] shrink-0 mt-0.5">
                  <div className="bg-white rounded-[2px]"></div>
                  <div className="bg-white rounded-[2px]"></div>
                  <div className="bg-white rounded-[2px]"></div>
                  <div className="bg-white rounded-[2px]"></div>
                </div>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white/70 text-sm leading-relaxed"
                >
                  We collaborate with the world's leading platforms and partners to deliver results that redefine industry standards.
                </motion.p>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-white/10" />
            </div>

            {/* Right: Big name + socials + phone */}
            <div className="flex-1 flex flex-col justify-between h-full gap-8">
              {/* Big studio name */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex items-center"
              >
                <h1
                  className="text-[clamp(3.5rem,9vw,8rem)] font-bold leading-none tracking-tight text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  data-testid="text-hero-headline"
                >
                  Nexus&nbsp;Studio<span className="text-white/60">®</span>
                </h1>
              </motion.div>

              {/* Bottom row: socials + phone */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Social pills */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-wrap items-center gap-2"
                >
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="flex items-center gap-1 px-4 py-1.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all text-sm font-medium"
                      data-testid={`link-social-${s.label.toLowerCase()}`}
                    >
                      {s.label}
                      <span className="text-[10px] opacity-60">↑</span>
                    </a>
                  ))}
                </motion.div>

                {/* Phone */}
                <motion.a
                  href="tel:+015557398"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-white/60 hover:text-white transition-colors text-sm font-mono tracking-widest whitespace-nowrap shrink-0"
                  data-testid="link-phone"
                >
                  [ (+01) 555-7398 ]
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sparkle row */}
      <div className="flex items-center justify-between px-8 md:px-12 py-3">
        <Sparkle className="opacity-60" />
        <Sparkle className="opacity-60" />
        <Sparkle className="opacity-60" />
        <Sparkle className="opacity-60" />
      </div>
    </section>
  );
}
