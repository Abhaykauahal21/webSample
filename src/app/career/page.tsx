"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin, Clock, Briefcase } from "lucide-react";

const jobs = [
  {
    title: "Senior Frontend Developer",
    type: "Full-time",
    location: "Remote",
    dept: "Engineering",
    desc: "Build and maintain modern web applications using React, Next.js, and TypeScript. Collaborate with design and backend teams to deliver seamless user experiences.",
  },
  {
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Remote",
    dept: "Design",
    desc: "Create intuitive, beautiful interfaces and end-to-end user experiences. Own the design process from research to high-fidelity prototypes.",
  },
  {
    title: "Backend Engineer",
    type: "Full-time",
    location: "Remote",
    dept: "Engineering",
    desc: "Design and build scalable APIs, microservices, and cloud infrastructure. Work with Node.js, PostgreSQL, and modern DevOps tooling.",
  },
  {
    title: "Project Manager",
    type: "Contract",
    location: "Remote",
    dept: "Operations",
    desc: "Lead cross-functional teams to deliver projects on time and within scope. Strong communication and agile methodology expertise required.",
  },
  {
    title: "Digital Marketing Specialist",
    type: "Full-time",
    location: "Remote",
    dept: "Marketing",
    desc: "Drive brand awareness and lead generation through SEO, content marketing, and paid campaigns. Experience with analytics tools is a must.",
  },
];

export default function Career() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900">
      {/* Nav */}
      <div className="flex items-center justify-between px-6 md:px-14 pt-6 pb-2">
        <Link href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-1.5">
          <span>Back to Home</span>
          <ArrowUpRight size={13} />
        </Link>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-14 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-neutral-500 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 inline-block">Join Our Team</span>
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.9] tracking-tighter mb-4">
            Careers at<br />ClariSolve TECH
          </h1>
          <p className="text-neutral-500 text-sm md:text-base max-w-lg">
            Help us build the future of technology solutions. We&apos;re looking for passionate people who love what they do.
          </p>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white hover:bg-[#F4F4F5] border border-black/10 rounded-2xl p-6 md:p-8 transition-all duration-500 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 border border-black/10 px-2 py-0.5 rounded-full">
                      {job.dept}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2 group-hover:text-[#ff4d00] transition-colors duration-500">
                    {job.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                    {job.desc}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      Posted 2 days ago
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  <a
                    href={`mailto:vijaynadella@clarisolvetech.com?subject=Application for ${encodeURIComponent(job.title)}`}
                    className="inline-block w-full md:w-auto px-6 py-3 rounded-full bg-black/10 text-neutral-900 font-medium hover:bg-black hover:text-white transition-all duration-500 text-sm border border-black/10 text-center"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 p-8 md:p-12 bg-white rounded-2xl border border-black/10 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Don&apos;t see a fit?</h3>
          <p className="text-neutral-500 text-sm md:text-base mb-6 max-w-md mx-auto">
            We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind.
          </p>
          <a
            href="mailto:vijaynadella@clarisolvetech.com?subject=Open Application - ClariSolve TECH"
            className="inline-block px-8 py-3 rounded-full bg-black/10 text-neutral-900 font-medium hover:bg-black hover:text-white transition-all duration-500 text-sm border border-black/10"
          >
            Send Open Application
          </a>
        </motion.div>
      </div>
    </div>
  );
}
