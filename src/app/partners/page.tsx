"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Grid2x2, ArrowUpRight, ChevronUp } from "lucide-react";

/* ─── Partner brand data ─────────────────────────────────── */
const partners = [
  {
    name: "Sisyphus",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <path d="M9 0L11 7H18L12.5 11.3L14.5 18L9 13.7L3.5 18L5.5 11.3L0 7H7Z" />
      </svg>
    ),
  },
  {
    name: "Blockly",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <polygon points="9,1 17,5.5 17,12.5 9,17 1,12.5 1,5.5" />
      </svg>
    ),
  },
  {
    name: "Architect",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <path d="M9 1L1 17H17L9 1ZM9 6L14 15H4L9 6Z" />
      </svg>
    ),
  },
  {
    name: "Techlify",
    icon: (
      <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor">
        <path d="M10 0C6 0 2.7 2.2 1 5.4C2.7 3.9 5 3 7.5 3C12.2 3 16 6.8 16 11.5H18C18 5.1 14.5 0 10 0Z" />
        <path d="M10 4C7 4 4.5 5.9 3.2 8.6C4.5 7.4 6.1 6.7 8 6.7C11.5 6.7 14.3 9.5 14.3 13H16.3C16.3 8 13.6 4 10 4Z" />
        <path d="M10 8C8 8 6.5 9.2 5.7 10.9C6.5 10.2 7.7 9.8 9 9.8C11.3 9.8 13.1 11.6 13.1 13.9H14.9C14.9 10.6 12.8 8 10 8Z" />
      </svg>
    ),
  },
  {
    name: "Cloudly",
    icon: (
      <svg width="22" height="14" viewBox="0 0 22 14" fill="currentColor">
        <path d="M17.5 5.5C17.5 5.5 17.3 5.5 17.1 5.5C16.5 2.4 13.8 0 10.5 0C7.5 0 5 1.9 3.9 4.6C1.7 4.9 0 6.8 0 9C0 11.2 1.8 13 4 13H17.5C19.4 13 21 11.4 21 9.5C21 7.6 19.4 5.5 17.5 5.5Z" />
      </svg>
    ),
  },
  {
    name: "LOGO",
    icon: null,
    isWordmark: true,
  },
];

/* Duplicate for seamless loop */
const loopedPartners = [...partners, ...partners, ...partners];

/* ─── Blob "Let's Talk" button ───────────────────────────── */
function BlobButton() {
  return (
    <motion.a
      href="#contact"
      className="relative flex flex-col items-center justify-center w-[150px] h-[150px] shrink-0 cursor-pointer select-none"
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      data-testid="button-lets-talk"
    >
      {/* Animated blob via border-radius */}
      <motion.div
        className="absolute inset-0 bg-[#282828]"
        animate={{
          borderRadius: [
            "60% 40% 55% 45% / 55% 45% 60% 40%",
            "45% 55% 40% 60% / 60% 40% 55% 45%",
            "55% 45% 60% 40% / 40% 60% 45% 55%",
            "60% 40% 55% 45% / 55% 45% 60% 40%",
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 text-white">
        <ArrowUpRight size={16} className="opacity-70" />
        <span className="text-sm font-semibold tracking-wide">Let's Talk</span>
      </div>
    </motion.a>
  );
}

/* ─── Marquee ────────────────────────────────────────────── */
function Marquee() {
  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-white/10">
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {loopedPartners.map((partner, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
            data-testid={`partner-logo-${i}`}
          >
            {partner.isWordmark ? (
              <span className="text-xl font-black tracking-tighter text-white/60">
                LO<span className="inline-block w-5 h-3 bg-white/60 rounded-sm mx-0.5 align-middle"></span>O
              </span>
            ) : (
              <>
                <span className="text-white/50">{partner.icon}</span>
                <span className="text-base font-medium tracking-wide">{partner.name}</span>
              </>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Scroll to top ──────────────────────────────────────── */
function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0.4, scale: 1 }}
      className="fixed bottom-8 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors bg-black/60 backdrop-blur-sm z-50"
      data-testid="button-scroll-top"
    >
      <ChevronUp size={18} />
    </motion.button>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Partners() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 md:px-14 pt-6 pb-2 shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-1.5 text-white/50 text-xs font-semibold tracking-[0.2em] uppercase"
        >
          <Link href="/" className="hover:text-white transition-colors" data-testid="link-our-partners">
            Our Partners
          </Link>
          <ArrowUpRight size={13} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold tracking-[0.15em] uppercase"
            data-testid="link-menu"
          >
            Menu
            <Grid2x2 size={16} />
          </Link>
        </motion.div>
      </div>

      {/* Headline */}
      <div className="px-8 md:px-14 pt-4 pb-6">
        <motion.h1
          ref={headlineRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-tight max-w-[700px]"
          data-testid="text-partners-headline"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Collaborating with progressive brands to shape meaningful, long&#8209;term impact.
        </motion.h1>
      </div>

      {/* Partner logos marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Marquee />
      </motion.div>

      {/* Bottom section: blob CTA + tagline */}
      <div className="flex-1 px-8 md:px-14 py-4 flex items-center justify-center gap-12 md:gap-20">
        {/* Blob button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200, damping: 18 }}
        >
          <BlobButton />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white/70 text-sm md:text-base leading-relaxed max-w-[220px]"
          data-testid="text-partners-tagline"
        >
          Empowering ambitious brands to define their presence with focus and precision.
        </motion.p>
      </div>

      <ScrollTopBtn />
    </div>
  );
}
