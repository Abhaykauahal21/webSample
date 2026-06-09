"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight, Check, Send, Loader2, AlertCircle, Sparkles
} from "lucide-react";
import { projectInquirySchema } from "@/lib/validations/project-inquiry";

const defaultForm = {
  name: "", email: "", phone: "", description: "",
};

export default function StartProject() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    const result = projectInquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Record<string, string> = {};
      for (const [key, msgs] of Object.entries(fieldErrors)) {
        if (msgs && msgs.length > 0) newErrors[key] = msgs[0];
      }
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json();
        setSubmitError(err.error || "Something went wrong.");
      }
    } catch {
      setSubmitError("Unable to send. Please email us directly at vijaynadella@clarisolvetech.com");
    } finally {
      setLoading(false);
    }
  }, [form]);

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="bg-[#141414] rounded-[32px] border border-white/5 p-8 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
            >
              <Check size={32} className="text-green-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-white mb-3"
            >
              Thank You, {form.name.split(" ")[0]}!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/60 text-sm mb-8"
            >
              Vijay Nadella has received your message and will get back to you within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-2 mb-8"
            >
              <p className="text-white/40 text-xs uppercase tracking-[0.15em] font-medium">What happens next?</p>
              <div className="flex flex-col gap-2">
                {["Vijay reviews your message", "We reach out via email or phone", "You receive a personalized response"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-primary" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white text-sm rounded-full transition-all"
              >
                Back to Home
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white">
      <div className="flex items-center justify-between px-6 md:px-14 pt-6 pb-2">
        <Link href="/" className="text-white/50 hover:text-white transition-colors text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-1.5">
          <span>Back to Home</span>
          <ArrowUpRight size={13} />
        </Link>
      </div>

      <div className="max-w-[600px] mx-auto px-6 md:px-14 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 text-primary text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
            <Sparkles size={12} />
            <span>Contact Us</span>
          </div>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.05] tracking-tighter mb-3">
            Get in Touch
          </h1>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Fill in the form below and Vijay Nadella will personally get back to you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#141414] rounded-[32px] border border-white/5 p-6 md:p-10"
        >
          {submitError && (
            <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} />
              {submitError}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={`w-full bg-[#0C0C0C] border ${errors.name ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={10} />{errors.name}</p>}
            </div>

            <div>
              <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                Email <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={`w-full bg-[#0C0C0C] border ${errors.email ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors`}
                placeholder="john@company.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={10} />{errors.email}</p>}
            </div>

            <div>
              <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                Phn no:
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors"
                placeholder="+1 234 567 890"
              />
            </div>

            <div>
              <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                Message <span className="text-primary">*</span>
              </label>
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className={`w-full bg-[#0C0C0C] border ${errors.description ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors resize-none`}
                placeholder="Tell us about your vision..."
              />
              {errors.description && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={10} />{errors.description}</p>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-black font-semibold text-sm rounded-full transition-all disabled:opacity-60 mt-8"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
