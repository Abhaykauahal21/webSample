"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Linkedin", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
];

const navLinks1 = [
  { label: "Home", href: "/" },
  { label: "About", href: "#" },
  { label: "Works", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

const navLinks2 = [
  { label: "Shop", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Cart", href: "#" },
  { label: "Checkout", href: "#" },
];

const capabilities = [
  "Web Development",
  "Motion Graphics",
  "Brand Strategy",
  "Product Design",
];

export function Footer() {
  return (
    <footer className="bg-[#0C0C0C] pt-32 pb-10 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-40">
          {/* Brand & Info */}
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-3">
              <img 
                src="https://clarisolvetech.lovable.app/assets/clarisolve-logo-B7oqDF0B.png" 
                alt="ClariSolve TECH Logo" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-white text-2xl font-bold tracking-tight">ClariSolve <span className="text-white/60 font-medium text-xl">TECH</span></span>
            </div>

            <div className="flex flex-col gap-4">
              <a href="tel:+212-555-7398" className="text-white/60 hover:text-white transition-colors text-xl">
                +212-555-7398
              </a>
              <a href="mailto:hello@clarisolve.com" className="text-white/60 hover:text-white transition-colors text-xl font-medium">
                hello@clarisolve.com
              </a>
              <p className="text-white/40 text-lg leading-tight max-w-[280px]">
                245 Fifth Avenue, Suite 1800<br />
                New York, NY 10016, USA
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-20 lg:gap-32">
            <ul className="flex flex-col gap-4">
              {navLinks1.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/50 hover:text-white transition-colors text-lg">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-4">
              {navLinks2.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/50 hover:text-white transition-colors text-lg">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-8">
            <span className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase">Follow Us</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center justify-between gap-2 px-6 py-3 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/5 transition-all text-sm group"
                >
                  {social.label}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Big Connect Section */}
        <motion.div 
          className="relative mb-20 group cursor-pointer"
          initial="initial"
          whileHover="hover"
        >
          <div className="text-white/20 text-xs font-mono mb-4">ClariSolve TECH © 2026</div>
          <div className="flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="overflow-hidden">
              <h2 className="text-[clamp(4rem,15vw,12rem)] font-bold text-white leading-[0.8] tracking-tighter flex flex-wrap items-center gap-x-[0.2em]">
                <span>Let's</span>
                <div className="relative flex overflow-hidden">
                  {"Connect".split("").map((char, i) => (
                    <div key={i} className="relative overflow-hidden h-[0.9em]">
                      <motion.span
                        variants={{
                          initial: { y: 0 },
                          hover: { y: "-100%" }
                        }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.33, 1, 0.68, 1],
                          delay: i * 0.02 
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                      <motion.span
                        variants={{
                          initial: { y: "100%" },
                          hover: { y: 0 }
                        }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.33, 1, 0.68, 1],
                          delay: i * 0.02 
                        }}
                        className="absolute left-0 top-0 inline-block text-[#ff8c00]"
                      >
                        {char}
                      </motion.span>
                    </div>
                  ))}
                </div>
              </h2>
            </div>
            <div className="text-right">
              <div className="text-white/30 text-xs font-mono mb-1 uppercase tracking-widest">Mo – Sa</div>
              <div className="text-white text-4xl md:text-5xl font-medium tracking-tight group-hover:text-white/80 transition-colors duration-500">9am – 5pm</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Capabilities Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-4">
          {capabilities.map((cap) => (
            <div key={cap} className="flex items-center gap-3 group cursor-default">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
              <span className="text-white/40 group-hover:text-white/80 transition-colors text-sm font-medium tracking-wide">
                {cap}
              </span>
              <ArrowUpRight size={12} className="text-white/20 group-hover:text-white/60" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
