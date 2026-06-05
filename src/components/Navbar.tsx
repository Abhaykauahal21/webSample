"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Sun, Grid2x2, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "#work" },
  { name: "Careers", href: "/career" },
  { name: "Contact", href: "#connect" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" data-testid="link-logo">
            <img 
              src="https://clarisolvetech.lovable.app/assets/clarisolve-logo-B7oqDF0B.png" 
              alt="ClariSolve TECH Logo" 
              className="h-8 w-auto object-contain"
              loading="lazy"
            />
            <span className="text-white font-bold text-sm sm:text-lg tracking-tight">ClariSolve <span className="text-white/60 font-medium">TECH</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-white/80 hover:text-white transition-colors rounded-md"
                data-testid={`link-nav-${link.name.toLowerCase()}`}
              >
                {link.name}
                <ChevronDown size={13} className="opacity-60" />
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            
            <button className="hidden sm:flex p-2 text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5" data-testid="button-theme">
              <Sun size={18} />
            </button>
            <button className="hidden sm:flex p-2 text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5" data-testid="button-grid">
              <Grid2x2 size={18} />
            </button>
            <button
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-14 z-40 bg-[#111111]/95 backdrop-blur-lg border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col py-4 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-4 text-white/80 hover:text-white border-b border-white/5 text-base flex items-center justify-between"
                >
                  {link.name}
                  <ChevronDown size={14} className="opacity-50" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
