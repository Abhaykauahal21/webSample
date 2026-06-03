import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6 w-max">
              <div className="w-6 h-6 bg-primary rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
              <span className="font-sans font-bold text-xl tracking-[0.2em] text-foreground">
                NEXUS
              </span>
            </Link>
            <p className="text-foreground/50 max-w-sm font-light text-sm">
              Sculpting brands and digital experiences for category-defining companies. Every pixel engineered with precision.
            </p>
          </div>
          
          <div>
            <h4 className="uppercase tracking-[0.2em] text-sm text-foreground mb-6 font-semibold">Navigation</h4>
            <ul className="space-y-4 text-foreground/50 text-sm">
              <li><a href="#work" className="hover:text-primary transition-colors">Work</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="uppercase tracking-[0.2em] text-sm text-foreground mb-6 font-semibold">Social</h4>
            <ul className="space-y-4 text-foreground/50 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Behance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-foreground/40 font-mono uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Nexus Studio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
