"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    content: "They delivered not just a design, but a complete brand experience. Strategic, creative, and incredibly detail-oriented.",
    author: "Amrita Sharma",
    role: "Head of Marketing",
    location: "London, United Kingdom",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 2,
    content: "Working with ClariSolve was a game-changer for our startup. Their ability to translate complex ideas into intuitive interfaces is unmatched.",
    author: "Arjun Verma",
    role: "Product Lead",
    location: "San Francisco, USA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 3,
    content: "The attention to detail and the level of craftsmanship they put into every pixel is truly world-class. Highly recommended.",
    author: "Priya Patel",
    role: "Creative Director",
    location: "Madrid, Spain",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  },
];

const pillars = [
  {
    title: "Clarity",
    desc: "We help businesses understand the right solution before investing.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
      </svg>
    )
  },
  {
    title: "Quality",
    desc: "Every solution is built with long-term reliability in mind.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.26L12 1.75z"/>
      </svg>
    )
  },
  {
    title: "Partnership",
    desc: "We aim to become a trusted technology partner — not a vendor.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  }
];

function PillarCard({ pillar, idx }: { pillar: typeof pillars[0]; idx: number }) {
  return (
    <div className="relative flex flex-col p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] h-full">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
      <div className="mb-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
        {pillar.icon}
      </div>
      <h4 className="text-white text-lg font-bold tracking-tight mb-2 uppercase">
        {pillar.title}
      </h4>
      <p className="text-white/40 text-sm leading-relaxed font-light">
        {pillar.desc}
      </p>
    </div>
  );
}

function MobileTestimonialShowcase() {
  return (
    <section className="relative w-full bg-[#0C0C0C] py-10 px-4 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
          <span>Why choose us</span>
          <ArrowUpRight size={14} />
        </div>

        <h2 className="text-[clamp(2rem,10vw,3rem)] font-bold text-white leading-[1] tracking-tighter mb-8">
          What our<br />clients are<br />saying
        </h2>

        {/* Pillar Cards Swiper */}
        <div className="mb-10">
          <p className="text-white/40 text-xs uppercase tracking-[0.15em] mb-4 font-medium">Our pillars</p>
          <Swiper
            spaceBetween={16}
            slidesPerView={1.2}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="!pb-10"
          >
            {pillars.map((pillar, idx) => (
              <SwiperSlide key={pillar.title} className="!h-auto">
                <PillarCard pillar={pillar} idx={idx} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Testimonial Cards Swiper */}
        <div>
          <p className="text-white/40 text-xs uppercase tracking-[0.15em] mb-4 font-medium">Testimonials</p>
          <Swiper
            spaceBetween={16}
            slidesPerView={1.1}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="!pb-10"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="!h-auto">
                <div className="bg-[#141414] border border-white/5 rounded-[24px] p-6 flex flex-col justify-between h-full min-h-[280px]">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                        <path d="M12 1.75l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.26L12 1.75z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/90 text-base font-medium leading-relaxed mb-6">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-xl overflow-hidden">
<img src={t.avatar} alt={t.author} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-none mb-1">{t.author}</h4>
                      <p className="text-white/40 text-xs">{t.role} &middot; {t.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3 mt-6">
          <button className="px-6 py-3 rounded-full bg-[#141414] text-white/60 text-sm font-medium border border-white/5">
            View Latest Projects
          </button>
          <button className="w-12 h-12 rounded-full bg-[#141414] text-white/60 flex items-center justify-center border border-white/5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export function TestimonialShowcase() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (!containerRef.current || !innerRef.current || !leftRef.current || !rightRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        pin: innerRef.current,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    cards.forEach((card, i) => {
      if (i > 0) {
        gsap.set(card, { yPercent: 120, opacity: 0, scale: 0.9, transformOrigin: "top center" });
      } else {
        gsap.set(card, { yPercent: 0, opacity: 1, scale: 1, transformOrigin: "top center" });
      }
    });

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        const nextCard = cards[i + 1];

        tl.to(card, {
          scale: 0.92,
          opacity: 0.3,
          yPercent: -5,
          duration: 1,
          ease: "power2.inOut"
        }, i);

        tl.to(nextCard, {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        }, i + 0.1);
      }
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [isMobile]);

  if (isMobile) return <MobileTestimonialShowcase />;

  return (
    <section ref={containerRef} className="relative w-full bg-[#0C0C0C] py-12 md:py-20 px-4 md:px-8 overflow-visible">
      <div ref={innerRef} className="max-w-[1400px] mx-auto min-h-[80vh] bg-[#141414] rounded-[40px] p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16">

        {/* Left Side: Static Content (60%) */}
        <div ref={leftRef} className="w-full lg:w-[55%] flex flex-col items-start justify-center">
          <div className="flex items-center gap-2 text-white/50 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-8">
            <span>Why choose us</span>
            <ArrowUpRight size={14} />
          </div>

          <h2 className="text-[clamp(3rem,8vw,6.5rem)] font-bold text-white leading-[0.95] tracking-tighter mb-16">
            What our<br />clients are<br />saying
          </h2>

          <div className="flex items-center gap-3 mb-16">
              <Link href="#work" className="flex items-center gap-3 group">
  <button className="px-6 py-3 rounded-full bg-[#141414] text-white/60 text-sm font-medium border border-white/5 transition-all duration-500 ease-out group-hover:bg-primary group-hover:text-black">
    View Latest Projects
  </button>

  <div className="w-12 h-12 rounded-full bg-[#141414] text-white/60 flex items-center justify-center border border-white/5 transition-all duration-500 ease-out group-hover:bg-primary group-hover:text-black group-hover:rotate-45">
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  </div>
</Link>
          </div>

          {/* Pillars Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-16 border-t border-white/5">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 group overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />

                <div className="mb-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-primary group-hover:scale-110 transition-all duration-500 border border-white/10">
                  {pillar.icon}
                </div>

                <h4 className="text-white text-lg font-bold tracking-tight mb-2 group-hover:translate-x-1 transition-transform duration-500 uppercase">
                  {pillar.title}
                </h4>

                <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/70 transition-colors duration-500">
                  {pillar.desc}
                </p>

                <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Stacking Cards (40%) */}
        <div ref={rightRef} className="relative w-full lg:w-[45%] h-[450px] md:h-[500px] flex items-center justify-center">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="absolute inset-0 w-full h-full bg-[#0C0C0C] border border-white/5 rounded-[32px] p-8 md:p-12 flex flex-col justify-between shadow-2xl"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37" className="w-4 h-4 md:w-5 md:h-5">
                    <path d="M12 1.75l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.26L12 1.75z" />
                  </svg>
                ))}
              </div>

              <p className="text-white text-xl md:text-2xl lg:text-3xl font-medium leading-tight tracking-tight mb-12">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg leading-none mb-1">{t.author}</h4>
                  <p className="text-white/40 text-xs md:text-sm font-light">
                    {t.role}<br />{t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
