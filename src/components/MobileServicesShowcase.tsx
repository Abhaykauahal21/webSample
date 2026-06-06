
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
    features: [
      "Custom Design",
      "Mobile Responsive",
      "SEO Optimized",
      "Fast Loading",
      "Lead Generation Ready",
    ],
  },
  {
    id: "02",
    title: "Web Applications",
    description:
      "Custom software tailored to how your business actually works. A focused set of services designed to move the numbers.",
    features: [
      "SaaS Platforms",
      "Admin Dashboards",
      "CRM Systems",
      "API Integrations",
      "Secure Authentication",
    ],
  },
  {
    id: "03",
    title: "E-Commerce",
    description:
      "Storefronts engineered to sell — fast, mobile-first, and reliable.",
    features: [
      "Shopify Stores",
      "Custom Checkouts",
      "Payment Integration",
      "Inventory Management",
      "Analytics Setup",
    ],
  },
  {
    id: "04",
    title: "QA Testing",
    description:
      "Confidence at every release. We catch problems before customers do.",
    features: [
      "Manual Testing",
      "Automated Testing",
      "Performance Testing",
      "Bug Tracking",
      "UAT Support",
    ],
  },
  {
    id: "05",
    title: "Maintenance & Support",
    description:
      "Long-term care that keeps your product fast, secure, and current.",
    features: [
      "Security Updates",
      "Bug Fixes",
      "Performance Monitoring",
      "Backup Management",
      "Content Updates",
    ],
  },
  {
    id: "06",
    title: "Digital Marketing",
    description:
      "Reach the right audience and turn attention into measurable revenue.",
    features: [
      "SEO",
      "Google Ads",
      "Meta Ads",
      "Content Strategy",
      "Email Campaigns",
    ],
  },
  {
    id: "07",
    title: "AI & Automation",
    description:
      "AI agents and workflows that quietly do the work in the background.",
    features: [
      "AI Chatbots",
      "Workflow Automation",
      "GPT Agents",
      "Data Processing",
      "Business Automation",
    ],
  },
];

export function MobileServicesShowcase() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const featureRefs = useRef<(HTMLUListElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const title = titleRefs.current[index];
      const desc = descRefs.current[index];
      const features = featureRefs.current[index];

      const words = title?.querySelectorAll(".word");
      const featureItems = features?.querySelectorAll(".feature");

      
if (words?.length) {
  gsap.set(words, {
    yPercent: 120,
    opacity: 0,
  });
}

      gsap.set(desc, {
        opacity: 0,
        y: 30,
      });

      if (featureItems?.length) {
  gsap.set(featureItems, {
    opacity: 0,
    y: 15,
  });
}   

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          once: true,
        },
      });

      if (words?.length) {
        tl.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power4.out",
        });
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

      if (featureItems?.length) {
        tl.to(
          featureItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="md:hidden bg-[#0C0C0C] py-24">
      <div className="px-6">
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

        <div>
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="py-16 border-b border-white/10"
            >
              <span className="block text-7xl font-bold text-white/10 leading-none">
                {service.id}
              </span>

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

              <div className="mt-6">
                <p
                  ref={(el) => {
                    descRefs.current[index] = el;
                  }}
                  className="text-white/55 text-base leading-relaxed max-w-md"
                >
                  {service.description}
                </p>

                <ul
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="mt-8 space-y-4"
                >
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="feature flex items-center gap-3 text-white/75 text-sm"
                    >
                      <span className="text-white/40">→</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

