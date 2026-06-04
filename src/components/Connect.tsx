"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Globe } from "@/components/ui/cobe-globe"
import { useInView, animate } from "framer-motion"
import { ChevronRight, MapPin, Mail, Clock, Shield, Zap, Headphones } from "lucide-react"

function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.05em] -mb-[0.05em]">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => setCount(Math.round(v)),
      })
      return controls.stop
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-white">
      {count}{suffix}
    </span>
  )
}

const locations = [
  { id: "india", location: [20.5937, 78.9629] as [number, number], label: "India" },
  { id: "usa", location: [37.0902, -95.7129] as [number, number], label: "USA" },
  { id: "uk", location: [55.3781, -3.436] as [number, number], label: "UK" },
  { id: "dubai", location: [25.2048, 55.2708] as [number, number], label: "Dubai" },
  { id: "singapore", location: [1.3521, 103.8198] as [number, number], label: "Singapore" },
  { id: "australia", location: [-25.2744, 133.7751] as [number, number], label: "Australia" },
]

const arcs = [
  { id: "india-usa", from: [20.5937, 78.9629] as [number, number], to: [37.0902, -95.7129] as [number, number] },
  { id: "usa-uk", from: [37.0902, -95.7129] as [number, number], to: [55.3781, -3.436] as [number, number] },
  { id: "uk-dubai", from: [55.3781, -3.436] as [number, number], to: [25.2048, 55.2708] as [number, number] },
  { id: "dubai-singapore", from: [25.2048, 55.2708] as [number, number], to: [1.3521, 103.8198] as [number, number] },
  { id: "singapore-australia", from: [1.3521, 103.8198] as [number, number], to: [-25.2744, 133.7751] as [number, number] },
]

const trustPoints = [
  { icon: Clock, text: "Free Consultation" },
  { icon: Zap, text: "Fast Response Within 24 Hours" },
  { icon: Shield, text: "Custom Software Solutions" },
  { icon: Headphones, text: "End-to-End Support" },
]

const metrics = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 5, suffix: "+", label: "Years Experience" },
]

export function Connect() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-4 md:px-8 bg-[#0C0C0C] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 140, 0, 0.3) 0%, transparent 60%)`,
          transition: "background 0.3s ease",
          pointerEvents: "none",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("/noisy.gif?v=2")`,
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column — Content */}
          <div className="order-2 lg:order-1">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-primary inline-block mb-6"
            >
              LET&apos;S CONNECT
            </motion.span>

            <h2 className="font-serif text-[clamp(2rem,6vw,3.8rem)] leading-[1.1] text-white mb-6">
              <WordReveal text="Let's Build Something Great Together." />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/50 text-sm md:text-base leading-relaxed mb-10 max-w-lg"
            >
              We help businesses transform through cutting-edge software, websites, AI solutions,
              and automation. Partner with us to turn your vision into reality.
            </motion.p>

            {/* Trust Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
            >
              {trustPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <point.icon size={14} className="text-primary" />
                  </div>
                  <span className="text-white/70 text-sm">{point.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8 md:gap-12 mb-10 pb-10 border-b border-white/5"
            >
              {metrics.map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <Counter value={metric.value} suffix={metric.suffix} />
                  <span className="text-white/40 text-xs tracking-[0.1em] uppercase mt-1">{metric.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Mail size={16} className="text-white/60" />
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase tracking-[0.15em]">Email</span>
                <p className="text-white/80 text-sm">vijaynadella@clarisolvetech.com</p>
              </div>
              <div className="w-px h-10 bg-white/5 mx-2" />
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <MapPin size={16} className="text-white/60" />
              </div>
              <div>
                <span className="text-white/40 text-xs uppercase tracking-[0.15em]">Location</span>
                <p className="text-white/80 text-sm">Hyderabad, India</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-black font-semibold text-sm rounded-full transition-all duration-300"
              >
                Schedule a Call
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white text-sm rounded-full transition-all duration-300"
              >
                Start a Project
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Right Column — Globe */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="absolute inset-0 rounded-full opacity-30 blur-3xl"
                style={{
                  background: "radial-gradient(circle at center, rgba(255, 140, 0, 0.25) 0%, transparent 70%)",
                }}
              />
              <div className="relative w-full max-w-[500px] mx-auto">
                <Globe
                  markers={locations}
                  arcs={arcs}
                  markerColor={[1, 0.55, 0]}
                  baseColor={[0.08, 0.08, 0.1]}
                  arcColor={[1, 0.55, 0]}
                  glowColor={[1, 0.4, 0]}
                  dark={1}
                  mapBrightness={6}
                  markerSize={0.035}
                  markerElevation={0.03}
                  arcWidth={0.8}
                  arcHeight={0.35}
                  speed={0.004}
                  theta={0.3}
                  diffuse={1.2}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
