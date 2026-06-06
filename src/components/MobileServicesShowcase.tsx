
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Business Websites",
    description:
      "Premium websites that build trust and convert visitors into customers. Built for outcomes, not buzzwords.",
  },
  {
    id: "02",
    title: "Web Applications",
    description:
      "Custom software tailored to how your business actually works. A focused set of services designed to move the numbers.",
  },
  {
    id: "03",
    title: "E-Commerce",
    description:
      "Storefronts engineered to sell — fast, mobile-first, and reliable.",
  },
  {
    id: "04",
    title: "QA Testing",
    description:
      "Confidence at every release. We catch problems before customers do.",
  },
  {
    id: "05",
    title: "Maintenance & Support",
    description:
      "Long-term care that keeps your product fast, secure, and current.",
  },
  {
    id: "06",
    title: "Digital Marketing",
    description:
      "Reach the right audience and turn attention into measurable revenue.",
  },
  {
    id: "07",
    title: "AI & Automation",
    description:
      "AI agents and workflows that quietly do the work in the background.",
  },
];

export function MobileServicesShowcase() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const title = titleRefs.current[index];
      const desc = descRefs.current[index];

      const words = title?.querySelectorAll(".word");

      gsap.set(desc, {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          once: true,
        },
      });

      if (words?.length) {
        tl.fromTo(
          words,
          {
            yPercent: 120,
          },
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          }
        );
      }

      tl.to(
        desc,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="md:hidden bg-[#0C0C0C] py-24">
      <div className="px-6">
        {/* Header */}
        <div className="mb-20">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 font-semibold">
            What We Do
          </p>

          <h2 className="mt-6 text-white text-5xl font-bold leading-[0.9] tracking-tight">
            Built For
            <br />
            Outcomes
          </h2>
        </div>

        {/* Services */}
        <div>
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="py-16 border-b border-white/10"
            >
              {/* Number */}
              <span className="block text-7xl font-bold text-white/10 leading-none">
                {service.id}
              </span>

              {/* Title */}
              <h3
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                className="mt-6 text-white text-4xl font-bold leading-[0.95] tracking-tight"
              >
                {service.title.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden mr-3"
                  >
                    <span className="word inline-block">
                      {word}
                    </span>
                  </span>
                ))}
              </h3>

              {/* Description */}
              <p
                ref={(el) => {
                  descRefs.current[index] = el;
                }}
                className="mt-6 text-white/55 text-base leading-relaxed max-w-md"
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

