"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "#work" },
  { name: "Careers", href: "/career" },
  { name: "Contact", href: "#connect" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
        setMobileOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={(e) => { if (window.location.pathname === "/") { e.preventDefault(); const l = (window as any).__lenis; if (l) l.scrollTo(0, { immediate: true }); } }} className="flex items-center shrink-0" data-testid="link-logo">
            <Image 
              src="/logo.webp" 
              alt="ClariSolve TECH Logo" 
              width={80}
              height={80}
              className="h-16 sm:h-20 mt-5 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("#");
              return (
                <Link
                  key={link.name}
                  href={isHash ? `/${link.href}` : link.href}
                  scroll={!isHash}
                  onClick={(e) => {
                    if (link.href === "/" && window.location.pathname === "/") {
                      e.preventDefault();
                      const l = (window as any).__lenis;
                      if (l) l.scrollTo(0, { immediate: true });
                    } else if (isHash) {
                      e.preventDefault();
                      const l = (window as any).__lenis;
                      if (l) l.scrollTo(link.href);
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-neutral-800 hover:text-neutral-900 transition-colors rounded-md"
                  data-testid={`link-nav-${link.name.toLowerCase()}`}
                  aria-label={`Navigate to ${link.name}`}
                >
                  {link.name}
                  <ChevronDown size={13} className="opacity-60" />
                </Link>
              );
            })}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <button
              className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 transition-colors"
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
            className="fixed inset-x-0 top-14 z-40 bg-white/95 backdrop-blur-lg border-b border-black/10 md:hidden"
          >
            <div className="flex flex-col py-4 px-6">
              {navLinks.map((link) => {
                const isHash = link.href.startsWith("#");
                return (
                  <Link
                    key={link.name}
                    href={isHash ? `/${link.href}` : link.href}
                    scroll={!isHash}
                    onClick={(e) => {
                      setMobileOpen(false);
                      if (link.href === "/" && window.location.pathname === "/") {
                        e.preventDefault();
                        const l = (window as any).__lenis;
                        if (l) l.scrollTo(0, { immediate: true });
                      } else if (isHash) {
                        e.preventDefault();
                        const l = (window as any).__lenis;
                        if (l) l.scrollTo(link.href);
                      }
                    }}
                    className="py-4 text-neutral-800 hover:text-neutral-900 border-b border-black/10 text-base flex items-center justify-between"
                    aria-label={`Navigate to ${link.name}`}
                  >
                    {link.name}
                    <ChevronDown size={14} className="opacity-50" />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
