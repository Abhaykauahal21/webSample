import { z } from "zod";

export const projectInquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .transform((v) => v.trim().toLowerCase()),
  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val || val === "") return true;
        const digits = val.replace(/\D/g, "");
        if (digits.length === 0) return false;
        if (digits.length === 10) {
          return /^[6-9]/.test(digits);
        }
        return digits.length >= 7 && digits.length <= 15;
      },
      { message: "Indian numbers must start with 6-9 and be exactly 10 digits" },
    ),
  company: z.string().max(200).optional().or(z.literal("")),
  businessStage: z.string().optional().or(z.literal("")),
  websiteUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  projectType: z.string().optional().or(z.literal("")),
  projectGoal: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
  timeline: z.string().optional().or(z.literal("")),
  description: z.string().min(1, "Please provide a message").max(5000),
  preferredContact: z.string().optional().or(z.literal("")),
  bestTime: z.string().optional().or(z.literal("")),
  hearAbout: z.string().optional().or(z.literal("")),
});

export type ProjectInquiry = z.infer<typeof projectInquirySchema>;

export const formSteps = [
  {
    id: "personal",
    title: "Personal Info",
    fields: ["name", "email", "phone", "preferredContact"],
  },
  {
    id: "company",
    title: "Company",
    fields: ["company", "businessStage", "websiteUrl", "hearAbout"],
  },
  {
    id: "project",
    title: "Project",
    fields: ["projectType", "projectGoal", "budget", "timeline", "bestTime"],
  },
  {
    id: "details",
    title: "Details",
    fields: ["description"],
  },
] as const;

export const PROJECT_TYPES = [
  { value: "Website", label: "Website" },
  { value: "Web Application", label: "Web Application" },
  { value: "E-Commerce", label: "E-Commerce" },
  { value: "Mobile App", label: "Mobile App" },
  { value: "AI & Automation", label: "AI & Automation" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "QA Testing", label: "QA Testing" },
  { value: "Maintenance", label: "Maintenance & Support" },
  { value: "Other", label: "Other" },
] as const;

export const PROJECT_GOALS = [
  { value: "Increase Revenue", label: "Increase Revenue" },
  { value: "Brand Awareness", label: "Brand Awareness" },
  { value: "Customer Acquisition", label: "Customer Acquisition" },
  { value: "Process Automation", label: "Process Automation" },
  { value: "Digital Transformation", label: "Digital Transformation" },
  { value: "User Experience", label: "Improve User Experience" },
  { value: "Other", label: "Other" },
] as const;

export const BUDGET_RANGES = [
  { value: "Under $5,000", label: "Under $5,000" },
  { value: "$5,000 - $15,000", label: "$5,000 – $15,000" },
  { value: "$15,000 - $50,000", label: "$15,000 – $50,000" },
  { value: "$50,000 - $100,000", label: "$50,000 – $100,000" },
  { value: "$100,000+", label: "$100,000+" },
  { value: "Not sure", label: "Not sure yet" },
] as const;

export const TIMELINES = [
  { value: "ASAP", label: "ASAP" },
  { value: "1-2 months", label: "1–2 months" },
  { value: "3-6 months", label: "3–6 months" },
  { value: "6+ months", label: "6+ months" },
  { value: "Not sure", label: "Not sure yet" },
] as const;

export const BUSINESS_STAGES = [
  { value: "Startup", label: "Startup (Pre-seed)" },
  { value: "Early Stage", label: "Early Stage (Seed)" },
  { value: "Growth", label: "Growth Stage" },
  { value: "Established", label: "Established" },
  { value: "Enterprise", label: "Enterprise" },
] as const;

export const HEAR_ABOUT = [
  { value: "Google", label: "Google Search" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Referral", label: "Referral" },
  { value: "Social Media", label: "Social Media" },
  { value: "Blog", label: "Blog / Article" },
  { value: "Conference", label: "Conference / Event" },
  { value: "Other", label: "Other" },
] as const;

export const CONTACT_METHODS = [
  { value: "Email", label: "Email" },
  { value: "Phone", label: "Phone" },
  { value: "Either", label: "Either" },
] as const;

export const BEST_TIMES = [
  { value: "Morning", label: "Morning (9AM–12PM)" },
  { value: "Afternoon", label: "Afternoon (12PM–5PM)" },
  { value: "Evening", label: "Evening (5PM–8PM)" },
  { value: "Any", label: "Any time" },
] as const;
