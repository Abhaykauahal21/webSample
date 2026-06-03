import { useState } from "react";
import { Search, Sun, Grid2x2, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Page", href: "#" },
  { name: "Portfolio", href: "#work" },
  { name: "Shop", href: "#" },
  { name: "News", href: "#" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0" data-testid="link-logo">
            <div className="w-7 h-7 grid grid-cols-2 gap-[2px]">
              <div className="bg-white rounded-[2px]"></div>
              <div className="bg-white rounded-[2px]"></div>
              <div className="bg-white rounded-[2px]"></div>
              <div className="bg-white rounded-[2px]"></div>
            </div>
            <span className="text-white font-semibold text-base tracking-wide">Orisa</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/5"
                data-testid={`link-nav-${link.name.toLowerCase()}`}
              >
                {link.name}
                <ChevronDown size={13} className="opacity-60" />
              </a>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <button className="p-2 text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5" data-testid="button-search">
              <Search size={18} />
            </button>
            <button className="p-2 text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5" data-testid="button-theme">
              <Sun size={18} />
            </button>
            <button className="p-2 text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5" data-testid="button-grid">
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
            className="fixed inset-x-0 top-14 z-40 bg-[#111111] border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col py-4 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-white/80 hover:text-white border-b border-white/5 text-sm flex items-center justify-between"
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
