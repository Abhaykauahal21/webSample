import { NextResponse } from "next/server";
import { Resend } from "resend";
import { projectInquirySchema } from "@/lib/validations/project-inquiry";
import { adminEmailTemplate, autoReplyEmailTemplate } from "@/lib/email-templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "vijaynadella@clarisolvetech.com";

const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT) return true;
  return false;
}

function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

function isSpam(data: Record<string, unknown>): boolean {
  const text = Object.values(data).join(" ").toLowerCase();
  const spamKeywords = ["viagra", "casino", "crypto", "free money", "click here", "buy now"];
  return spamKeywords.some((kw) => text.includes(kw));
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const honeypot = request.headers.get("x-honeypot");
    if (honeypot === "true") {
      return NextResponse.json({ success: true });
    }

    const body = await request.json();
    const sanitized = Object.fromEntries(
      Object.entries(body).map(([key, val]) => [key, typeof val === "string" ? sanitize(val) : val])
    );

    const parsed = projectInquirySchema.safeParse(sanitized);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (isSpam(data as unknown as Record<string, unknown>)) {
      return NextResponse.json({ success: true });
    }

    const emailPromises: Promise<unknown>[] = [];

    if (resend) {
      emailPromises.push(
        resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New Project Inquiry from ${data.name} — ${data.projectType}`,
          html: adminEmailTemplate(data),
        })
      );

      emailPromises.push(
        resend.emails.send({
          from: FROM_EMAIL,
          to: data.email,
          subject: "Your project inquiry has been received — ClariSolve TECH",
          html: autoReplyEmailTemplate(data),
        })
      );
    }

    const results = await Promise.allSettled(emailPromises);
    for (const result of results) {
      if (result.status === "rejected") {
        console.error("Email send failed:", result.reason);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try emailing us directly at vijaynadella@clarisolvetech.com" },
      { status: 500 }
    );
  }
}
