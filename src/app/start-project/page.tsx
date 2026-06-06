"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight, Check, ChevronRight, ChevronLeft, Clock, Star, Shield,
  Users, MessageSquare, Send, Loader2, AlertCircle, Building2, Globe,
  Target, Calendar, Phone, Mail, Sparkles
} from "lucide-react";
import {
  projectInquirySchema,
  formSteps,
  PROJECT_TYPES,
  PROJECT_GOALS,
  BUDGET_RANGES,
  TIMELINES,
  BUSINESS_STAGES,
  HEAR_ABOUT,
  CONTACT_METHODS,
  BEST_TIMES,
} from "@/lib/validations/project-inquiry";
import type { ProjectInquiry } from "@/lib/validations/project-inquiry";

const defaultForm: ProjectInquiry = {
  name: "", email: "", phone: "", company: "", businessStage: "", websiteUrl: "",
  projectType: "", projectGoal: "", budget: "", timeline: "", description: "",
  preferredContact: "", bestTime: "", hearAbout: "",
};

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 shrink-0 ${
              i < current
                ? "bg-primary text-black"
                : i === current
                ? "bg-primary/20 text-primary border border-primary/40"
                : "bg-white/5 text-white/30 border border-white/10"
            }`}
          >
            {i < current ? <Check size={14} /> : i + 1}
          </div>
          <span className={`text-[10px] font-semibold uppercase tracking-wider hidden sm:block ${
            i === current ? "text-white" : "text-white/30"
          }`}>
            {formSteps[i].title}
          </span>
          {i < total - 1 && <div className={`flex-1 h-px ${i < current ? "bg-primary" : "bg-white/10"}`} />}
        </div>
      ))}
    </div>
  );
}

function TrustBadge({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
      <Icon size={12} className="text-primary" />
      <span className="text-[10px] text-white/50 font-medium whitespace-nowrap">{text}</span>
    </div>
  );
}

export default function StartProject() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ProjectInquiry>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectInquiry, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [touched, setTouched] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = sessionStorage.getItem("project-inquiry");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({ ...prev, ...parsed }));
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("project-inquiry", JSON.stringify(form));
  }, [form]);

  const updateField = useCallback((field: keyof ProjectInquiry, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => new Set(prev).add(field));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validateStep = useCallback((stepIndex: number): boolean => {
    const currentFields = formSteps[stepIndex].fields as unknown as (keyof ProjectInquiry)[];
    const stepData: Record<string, any> = {};
    for (const field of currentFields) {
      stepData[field] = form[field];
    }
    const result = projectInquirySchema.safeParse({ ...form, ...stepData });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Partial<Record<keyof ProjectInquiry, string>> = {};
      for (const field of currentFields) {
        const msgs = fieldErrors[field];
        if (msgs && msgs.length > 0) {
          newErrors[field] = msgs[0];
        }
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    setErrors({});
    return true;
  }, [form]);

  const nextStep = useCallback(() => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, formSteps.length - 1));
    }
  }, [step, validateStep]);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateStep(step)) return;
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
        sessionStorage.removeItem("project-inquiry");
      } else {
        const err = await res.json();
        setSubmitError(err.error || "Something went wrong.");
      }
    } catch {
      setSubmitError("Unable to send. Please email us directly at vijaynadella@clarisolvetech.com");
    } finally {
      setLoading(false);
    }
  }, [form, step, validateStep]);

  const totalSteps = formSteps.length;

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
              Vijay Nadella has received your inquiry and will personally review it within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0C0C0C] rounded-2xl p-6 mb-8 text-left space-y-3"
            >
              <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Submission Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/40">Project</span><span className="text-white">{form.projectType}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Budget</span><span className="text-white">{form.budget || "Not specified"}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Timeline</span><span className="text-white">{form.timeline || "Not specified"}</span></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-2 mb-8"
            >
              <p className="text-white/40 text-xs uppercase tracking-[0.15em] font-medium">What happens next?</p>
              <div className="flex flex-col gap-2">
                {["Vijay reviews your requirements", "We reach out via your preferred contact", "You receive a tailored proposal"].map((item, i) => (
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
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a
                href="https://cal.com/vijaynadella"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-black font-semibold text-sm rounded-full transition-all"
              >
                Schedule a Call
                <Calendar size={14} />
              </a>
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

      <div className="max-w-[900px] mx-auto px-6 md:px-14 py-8 md:py-16">
        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          <TrustBadge icon={Clock} text="Response within 24 hours" />
          <TrustBadge icon={Star} text="20+ Projects Delivered" />
          <TrustBadge icon={Shield} text="98% Client Satisfaction" />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 text-primary text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
            <Sparkles size={12} />
            <span>Start Your Project</span>
          </div>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.05] tracking-tighter mb-3">
            Tell Us About Your Project
          </h1>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Fill in the details below and Vijay Nadella will personally review your requirements.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#141414] rounded-[32px] border border-white/5 p-6 md:p-10"
        >
          <StepIndicator current={step} total={totalSteps} />

          {submitError && (
            <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} />
              {submitError}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Step 1: Personal */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                      Full Name <span className="text-primary">*</span>
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
                      Email Address <span className="text-primary">*</span>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">Preferred Contact</label>
                      <select
                        value={form.preferredContact}
                        onChange={(e) => updateField("preferredContact", e.target.value)}
                        className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Any method</option>
                        {CONTACT_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Company */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                        <Building2 size={12} className="inline mr-1" />Company
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors"
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                        <Target size={12} className="inline mr-1" />Business Stage
                      </label>
                      <select
                        value={form.businessStage}
                        onChange={(e) => updateField("businessStage", e.target.value)}
                        className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Select stage</option>
                        {BUSINESS_STAGES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                      <Globe size={12} className="inline mr-1" />Existing Website URL
                    </label>
                    <input
                      type="url"
                      value={form.websiteUrl}
                      onChange={(e) => updateField("websiteUrl", e.target.value)}
                      className={`w-full bg-[#0C0C0C] border ${errors.websiteUrl ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors`}
                      placeholder="https://yoursite.com"
                    />
                    {errors.websiteUrl && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={10} />{errors.websiteUrl}</p>}
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                      <Users size={12} className="inline mr-1" />How did you hear about us?
                    </label>
                    <select
                      value={form.hearAbout}
                      onChange={(e) => updateField("hearAbout", e.target.value)}
                      className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select one</option>
                      {HEAR_ABOUT.map((h) => <option key={h.value} value={h.value}>{h.label}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Project */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                        Project Type <span className="text-primary">*</span>
                      </label>
                      <select
                        value={form.projectType}
                        onChange={(e) => updateField("projectType", e.target.value)}
                        className={`w-full bg-[#0C0C0C] border ${errors.projectType ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors`}
                      >
                        <option value="">Select type</option>
                        {PROJECT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                      {errors.projectType && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={10} />{errors.projectType}</p>}
                    </div>
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                        <Target size={12} className="inline mr-1" />Primary Goal
                      </label>
                      <select
                        value={form.projectGoal}
                        onChange={(e) => updateField("projectGoal", e.target.value)}
                        className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Select goal</option>
                        {PROJECT_GOALS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">Budget Range</label>
                      <select
                        value={form.budget}
                        onChange={(e) => updateField("budget", e.target.value)}
                        className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Select budget</option>
                        {BUDGET_RANGES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">Timeline</label>
                      <select
                        value={form.timeline}
                        onChange={(e) => updateField("timeline", e.target.value)}
                        className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Select timeline</option>
                        {TIMELINES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                      <Calendar size={12} className="inline mr-1" />Best Time to Contact
                    </label>
                    <select
                      value={form.bestTime}
                      onChange={(e) => updateField("bestTime", e.target.value)}
                      className="w-full bg-[#0C0C0C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Any time</option>
                      {BEST_TIMES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Description */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-white/40 text-[10px] uppercase tracking-[0.15em] font-medium block mb-2">
                      <MessageSquare size={12} className="inline mr-1" />Project Description <span className="text-primary">*</span>
                    </label>
                    <textarea
                      rows={8}
                      value={form.description}
                      onChange={(e) => updateField("description", e.target.value)}
                      className={`w-full bg-[#0C0C0C] border ${errors.description ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors resize-none`}
                      placeholder="Describe your project in detail. What are your goals? What problem are you trying to solve? Any specific features or requirements?"
                    />
                    <div className="flex justify-between items-center mt-1.5">
                      {errors.description ? (
                        <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={10} />{errors.description}</p>
                      ) : <span />}
                      <span className={`text-[10px] ${form.description.length > 4500 ? "text-red-400" : "text-white/30"}`}>
                        {form.description.length}/5000
                      </span>
                    </div>
                  </div>

                  {/* Trust / Social Proof */}
                  <div className="bg-[#0C0C0C] rounded-2xl p-5 border border-white/5">
                    <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Why work with us?</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {[
                        { value: "20+", label: "Projects" },
                        { value: "98%", label: "Satisfaction" },
                        { value: "24h", label: "Response Time" },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <div className="text-lg font-bold text-primary">{stat.value}</div>
                          <div className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-white/5">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0C0C0C] bg-white/10" />
                        ))}
                      </div>
                      <span className="text-[10px] text-white/40">Trusted by founders worldwide</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className="flex items-center gap-1.5 px-4 py-2 text-white/50 hover:text-white transition-colors text-sm disabled:opacity-0 disabled:pointer-events-none"
            >
              <ChevronLeft size={16} />
              Back
            </button>

            {step < totalSteps - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-black font-semibold text-sm rounded-full transition-all"
              >
                Continue
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-black font-semibold text-sm rounded-full transition-all disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Sending...</>
                ) : (
                  <><Send size={16} /> Send Inquiry</>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
