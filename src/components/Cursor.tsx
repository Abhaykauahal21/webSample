"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });

    const isHeading = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      return /^H[1-6]$/.test(el.tagName) || !!el.closest("h1, h2, h3, h4, h5, h6");
    };

    const checkHover = (e: MouseEvent) => {
      setHovered(isHeading(e.target as HTMLElement));
    };

    document.addEventListener("mouseover", checkHover);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", checkHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 60 : 28,
          height: hovered ? 60 : 28,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.5)",
          boxShadow: hovered
            ? "0 0 20px rgba(255,255,255,0.15), inset 0 0 20px rgba(255,255,255,0.05)"
            : "0 0 6px rgba(255,255,255,0.1)",
          willChange: "transform",
          transition: "width 0.35s ease, height 0.35s ease, box-shadow 0.35s ease",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: 4,
          height: 4,
          background: "rgba(255,255,255,0.8)",
          boxShadow: "0 0 6px rgba(255,255,255,0.4)",
          willChange: "transform",
        }}
      />
    </>
  );
}
