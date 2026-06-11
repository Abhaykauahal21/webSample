"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { MobileServicesShowcase } from "./MobileServicesShowcase";

const services = [
  {
    id: "01",
    title: "Business Websites",
    description: "Premium websites that build trust and convert visitors into customers. Built for outcomes, not buzzwords.",
    metadata: ["Fast, Mobile-First", "SEO Optimized", "Conversion Focused", "High-End Design", "Lead Generation"],
    image: "/business.webp",
  },
  {
    id: "02",
    title: "Web Applications",
    description: "Custom software tailored to how your business actually works. A focused set of services designed to move the numbers.",
    metadata: ["SaaS Platforms", "Internal Tools", "Client Portals", "API Integration", "Scalable Architecture"],
    image: "/webapplication.webp",
  },
  {
    id: "03",
    title: "E-Commerce",
    description: "Storefronts engineered to sell — fast, mobile-first, and reliable. We simplify complex selling environments.",
    metadata: ["Shopify Development", "Custom Checkouts", "Inventory Sync", "Payment Gateways", "Analytics Integration"],
    image: "/ecommerce.webp",
  },
  {
    id: "04",
    title: "QA Testing",
    description: "Confidence at every release. We catch problems before customers do, ensuring your technology never fails.",
    metadata: ["Automated Testing", "Manual QA", "Bug Tracking", "Performance Testing", "User Acceptance"],
    image: "/qa.webp",
  },
  {
    id: "05",
    title: "Maintenance & Support",
    description: "Long-term care that keeps your product fast, secure, and current. We handle the complexity for you.",
    metadata: ["Security Patches", "Performance Tuning", "Content Updates", "Bug Fixes", "24/7 Monitoring"],
    image: "/maintain.webp",
  },
  {
    id: "06",
    title: "Digital Marketing",
    description: "Reach the right audience and turn attention into measurable revenue. Strategy that actually grows your business.",
    metadata: ["Search Engine Optimization", "Pay-Per-Click", "Content Strategy", "Email Marketing", "Social Media Growth"],
    image: "/digital.webp",
  },
  {
    id: "07",
    title: "AI & Automation",
    description: "AI agents and workflows that quietly do the work in the background. Modern solutions for efficient operations.",
    metadata: ["Custom GPT Agents", "Workflow Automation", "Data Analysis", "Chatbot Integration", "Process Optimization"],
    image: "/ai.webp",
  },
];

export function ServicesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = sectionsRef.current;
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${(sections.length - 1) * 100}%`,
        pin: true,
        scrub: 1,
      },
    });

    sections.forEach((section, index) => {
      if (!section) return;

      const title = section.querySelector(".service-title");
      const desc = section.querySelector(".service-desc");
      const meta = section.querySelector(".service-meta");
      const num = section.querySelector(".service-num");
      const imageCard = section.querySelector(".service-image-card");
      const image = section.querySelector(".service-image");

      // Slide over effect: New section slides up over the previous one
      if (index !== 0) {
        // Position all sections but the first one below the viewport
        gsap.set(section, { yPercent: 100, zIndex: index, opacity: 1, visibility: "visible" });
        
        // Animate section sliding up over the previous one
        masterTl.to(section, {
          yPercent: 0,
          duration: 1,
          ease: "none",
        }, index);

        // Keep previous section fully opaque underneath
        masterTl.to(sections[index - 1], {
          duration: 1,
          ease: "none",
        }, index);
      } else {
        gsap.set(section, { zIndex: 0, yPercent: 0, opacity: 1, visibility: "visible" });
      }

      // Show all content immediately for instant readability
      if (title) gsap.set(title, { y: 0, opacity: 1 });
      if (desc) gsap.set(desc, { y: 0, opacity: 1 });
      if (meta) gsap.set(meta.children, { y: 0, opacity: 1 });
      if (num) gsap.set(num, { opacity: 0 });
      if (imageCard) gsap.set(imageCard, { scale: 1, opacity: 1, rotateY: 0 });
      if (image) gsap.set(image, { scale: 1 });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>

       <MobileServicesShowcase />


      <div ref={containerRef} className="relative bg-[#0C0C0C] overflow-hidden min-h-screen hidden md:block">
      {services.map((service, i) => (
        <div
          key={service.id}
          ref={(el) => {
            sectionsRef.current[i] = el;
          }}
          className="absolute inset-x-4 md:inset-x-8 top-0 bottom-0 md:bottom-4 rounded-[40px] flex flex-col lg:flex-row items-center justify-between px-8 md:px-20 py-20 lg:py-0 bg-[#141414] overflow-hidden"
          style={{ willChange: "transform, opacity, scale" }}
        >
          {/* Top Bar inside slide */}
          <div className="absolute top-20 left-8 md:left-20 right-8 md:right-20 flex justify-between items-center z-20">
            <Link href="/start-project" className="flex items-center gap-2 text-white/50 hover:text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-colors" aria-label="What We Do - view our services">
              <span>What We Do</span>
            </Link>
            <div className="text-white/30 text-[10px] md:text-xs font-mono tracking-widest uppercase">
              Built for outcomes
            </div>
          </div>

          {/* Left Content (60%) */}
          <div className="relative z-10 w-full lg:w-[60%] flex flex-col justify-center gap-8 mt-12 lg:mt-0">
            <div className="flex flex-col gap-4">
              <h2 className="service-title text-[clamp(2.5rem,8vw,7rem)] font-bold text-white leading-[0.9] tracking-tighter">
                {service.title.split(" ").map((word, idx) => (
                  <span key={idx} className="inline-block mr-[0.2em]">{word}</span>
                ))}
              </h2>
            </div>

            <p className="service-desc text-white/60 text-lg md:text-xl max-w-xl leading-relaxed font-light">
              {service.description}
            </p>

            <ul className="service-meta grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mt-4">
              {service.metadata.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/80 text-sm md:text-base group cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Visual (40%) */}
          <div className="relative z-10 w-full lg:w-[35%] aspect-[4/5] lg:aspect-auto lg:h-[70vh] flex items-center justify-center mt-12 lg:mt-0">
            <div className="service-image-card relative w-full h-full rounded-2xl overflow-hidden border border-white/10 backdrop-blur-3xl group perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="service-image object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                  }}
                />
              <div className="absolute bottom-8 left-8 z-20">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
    
  );
}
