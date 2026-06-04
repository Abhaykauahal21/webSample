"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Business Websites",
    description: "Premium websites that build trust and convert visitors into customers. Built for outcomes, not buzzwords.",
    metadata: ["Fast, Mobile-First", "SEO Optimized", "Conversion Focused", "High-End Design", "Lead Generation"],
    image: "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "02",
    title: "Web Applications",
    description: "Custom software tailored to how your business actually works. A focused set of services designed to move the numbers.",
    metadata: ["SaaS Platforms", "Internal Tools", "Client Portals", "API Integration", "Scalable Architecture"],
    image: "https://media.istockphoto.com/id/2210688897/photo/ux-ui-design-web-and-application-user-design-concepts-web-design-application-design-user.webp?a=1&b=1&s=612x612&w=0&k=20&c=3vTDBUL24n5mH1Hpu3kf9uVqjItR6a2lboOWV_VFQlE= ",
  },
  {
    id: "03",
    title: "E-Commerce",
    description: "Storefronts engineered to sell — fast, mobile-first, and reliable. We simplify complex selling environments.",
    metadata: ["Shopify Development", "Custom Checkouts", "Inventory Sync", "Payment Gateways", "Analytics Integration"],
    image: "https://plus.unsplash.com/premium_photo-1664475347754-f633cb166d13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "04",
    title: "QA Testing",
    description: "Confidence at every release. We catch problems before customers do, ensuring your technology never fails.",
    metadata: ["Automated Testing", "Manual QA", "Bug Tracking", "Performance Testing", "User Acceptance"],
    image: "https://media.istockphoto.com/id/2223826437/photo/q-a-support-and-information-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=gUWMqNabiQV8xFZubtOtCpiqDCLCFJ9C-WYg8xKJUXw=  ",
  },
  {
    id: "05",
    title: "Maintenance & Support",
    description: "Long-term care that keeps your product fast, secure, and current. We handle the complexity for you.",
    metadata: ["Security Patches", "Performance Tuning", "Content Updates", "Bug Fixes", "24/7 Monitoring"],
    image: "https://btech.id/media/images/Page/2024/01/18/Poster_Artikel_43.jpg",
  },
  {
    id: "06",
    title: "Digital Marketing",
    description: "Reach the right audience and turn attention into measurable revenue. Strategy that actually grows your business.",
    metadata: ["Search Engine Optimization", "Pay-Per-Click", "Content Strategy", "Email Marketing", "Social Media Growth"],
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "07",
    title: "AI & Automation",
    description: "AI agents and workflows that quietly do the work in the background. Modern solutions for efficient operations.",
    metadata: ["Custom GPT Agents", "Workflow Automation", "Data Analysis", "Chatbot Integration", "Process Optimization"],
    image: "https://tse2.mm.bing.net/th/id/OIP.bWxFN1qSS4PWS1gQUqD4RQHaHa?cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3",
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
        scrub: 0.5,
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: 0.4,
          ease: "power2.out",
          directional: true,
        },
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

      // Inner content animations
      const innerTl = gsap.timeline();
      const delayOffset = index === 0 ? 0 : 0.2; // First slide: no delay
      
      if (title) {
        if (index === 0) {
          gsap.set(title, { y: 0, opacity: 1 });
        } else {
          innerTl.fromTo(title, 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
            delayOffset
          );
        }
      }

      if (desc) {
        if (index === 0) {
          gsap.set(desc, { y: 0, opacity: 1 });
        } else {
          innerTl.fromTo(desc,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            delayOffset + 0.2
          );
        }
      }

      if (meta) {
        if (index === 0) {
          gsap.set(meta.children, { y: 0, opacity: 1 });
        } else {
          innerTl.fromTo(meta.children,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            delayOffset + 0.4
          );
        }
      }

      if (num) {
        gsap.set(num, { opacity: 0 });
      }

      if (imageCard) {
        if (index === 0) {
          gsap.set(imageCard, { scale: 1, opacity: 1, rotateY: 0 });
        } else {
          innerTl.fromTo(imageCard,
            { scale: 1.2, opacity: 0, rotateY: 15 },
            { scale: 1, opacity: 1, rotateY: 0, duration: 1.2, ease: "expo.out" },
            delayOffset
          );
        }
      }

      if (image) {
        if (index === 0) {
          gsap.set(image, { scale: 1 });
        } else {
          innerTl.fromTo(image,
            { scale: 1.3 },
            { scale: 1, duration: 1.5, ease: "power2.out" },
            0
          );
        }
      }

      // Add inner timeline to master at the right point
      if (index !== 0) {
        masterTl.add(innerTl, index);
      } else {
        // Subtle parallax for first section so it has scroll feedback
        const img = section.querySelector(".service-image");
        if (img) {
          masterTl.fromTo(img, { scale: 1 }, { scale: 1.08, duration: 1, ease: "none" }, 0);
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0C0C0C] overflow-hidden min-h-screen">
      {services.map((service, i) => (
        <div
          key={service.id}
          ref={(el) => {
            sectionsRef.current[i] = el;
          }}
          className="absolute inset-x-4 md:inset-x-8 top-0 bottom-4 rounded-[40px] flex flex-col lg:flex-row items-center justify-between px-8 md:px-20 py-20 lg:py-0 bg-[#141414] overflow-hidden"
          style={{ willChange: "transform, opacity, scale" }}
        >
          {/* Top Bar inside slide */}
          <div className="absolute top-10 left-8 md:left-20 right-8 md:right-20 flex justify-between items-center z-20">
            <div className="flex items-center gap-2 text-white/50 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              <span>What We Do</span>
              <span className="text-white/30">↗</span>
            </div>
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
              <img
                src={service.image}
                alt={service.title}
                className="service-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
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
  );
}
