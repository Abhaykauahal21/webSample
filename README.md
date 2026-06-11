# ClariSolve TECH — Company Website

Production website for **ClariSolve TECH**, a technology solutions company founded by Vijay Nadella. Built with Next.js 16 App Router, TypeScript, Tailwind CSS, and GSAP/Framer Motion animations.

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.2.7 (App Router) |
| **Language** | TypeScript 5.x — strict mode |
| **Styling** | Tailwind CSS 3.4 + `tailwindcss-animate` + `@tailwindcss/typography` |
| **Animation** | GSAP 3.12 + ScrollTrigger, Framer Motion 11, Lenis 1.1 |
| **UI Library** | Radix UI primitives (50+ components), shadcn/ui |
| **Form** | react-hook-form + Zod validation |
| **Email** | Resend SDK |
| **Carousel** | Swiper 12, Embla Carousel |
| **Charts** | Recharts 2 |
| **Icons** | Lucide React |
| **3D/Globe** | Cobe |
| **Package Manager** | pnpm (workspace-based) |

---

## Architecture

```
src/
├── app/                          # Next.js App Router — routes & pages
│   ├── api/send-inquiry/         # POST endpoint for contact form submissions
│   ├── career/                   # /career — job listings page
│   ├── partners/                 # /partners — partner brands showcase
│   ├── projects/                 # /projects — portfolio/project listings
│   ├── start-project/            # /start-project — contact form page
│   ├── globals.css               # Global styles + Tailwind directives
│   ├── layout.tsx                # Root layout — fonts, metadata, favicon
│   ├── page.tsx                  # Homepage — assembles all sections
│   ├── error.tsx                 # Error boundary
│   ├── loading.tsx               # Loading state
│   ├── not-found.tsx             # 404 page
│   ├── robots.ts                 # Dynamic robots.txt
│   └── sitemap.ts                # Dynamic sitemap.xml
│
├── components/                   # React components
│   ├── ui/                       # 50+ shadcn/ui primitives (accordion, dialog, etc.)
│   ├── Navbar.tsx                # Fixed header with scroll-hide + mobile menu
│   ├── Hero.tsx                  # Hero section — headline, founder intro, CTA
│   ├── ServicesShowcase.tsx      # Desktop service cards (GSAP pinned scroll)
│   ├── MobileServicesShowcase.tsx# Mobile service list (scroll-triggered animations)
│   ├── PartnersSection.tsx       # Partner marquee + "Let's Talk" blob CTA
│   ├── SelectedWork.tsx          # Portfolio/work showcase with project cards
│   ├── FounderSection.tsx        # Founder quote + stats (desktop + mobile)
│   ├── Process.tsx               # Process steps section
│   ├── TestimonialShowcase.tsx   # Testimonials + pillar cards (stacking cards)
│   ├── NetworkShowcase.tsx       # Network/connectivity section
│   ├── Connect.tsx               # "Let's Connect" — contact info + globe
│   ├── Footer.tsx                # Site footer — links, social, contact
│   ├── Cursor.tsx                # Custom cursor follower
│   ├── LenisProvider.tsx         # Client wrapper for Lenis smooth scroll
│   └── PageTransition.tsx        # Page transition animations
│
├── hooks/
│   ├── useLenis.ts               # Initializes Lenis + GSAP ScrollTrigger sync
│   ├── use-mobile.tsx            # Mobile detection hook
│   ├── use-toast.ts              # Toast notification hook
│   └── useMouseGlow.ts           # Mouse glow effect
│
└── lib/
    ├── validations/
    │   └── project-inquiry.ts    # Zod schemas for contact form + field definitions
    ├── email-templates.ts        # HTML templates for admin notification + auto-reply
    └── utils.ts                  # Utility functions (cn, etc.)

public/                           # Static assets
├── projects/                     # Project detail images
├── *.webp                        # Service images, logos, founder photos
├── favicon.ico                   # Favicon
├── ClariSolveFavicon.webp        # Primary favicon
└── robots.txt                    # Crawler rules
```

---

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage — all sections assembled |
| `/career` | Static | Job listings page |
| `/partners` | Static | Partner brands showcase |
| `/projects` | Static | Portfolio/project listings |
| `/start-project` | Static | Contact form (Name, Email, Phone, Message) |
| `/api/send-inquiry` | Dynamic | POST — validates & emails form submissions |

---

## Key Features

### Smooth Scrolling
- **Lenis** provides smooth scrolling across the homepage and `/projects` page
- Integrated with **GSAP ScrollTrigger** for scroll-driven animations
- Hash links (`#work`, `#connect`) use Lenis scrollTo for smooth navigation
- Page refresh scrolls to top via `requestAnimationFrame` + lenis.scrollTo

### Animations
- **GSAP + ScrollTrigger** — Pinned horizontal service cards (ServicesShowcase), stacking testimonial cards
- **Framer Motion** — Scroll-triggered word reveals, counters, entrance animations
- **Custom cursor** — Follows mouse, scales on heading hover

### Form Validation (Zod)
- **Name**: Only alphabetic characters + spaces allowed
- **Email**: Trimmed + lowercased on submit
- **Phone**: Strips non-digits; Indian numbers validated (starts with 6-9, exactly 10 digits)
- All fields validated client-side before API submission

### Email Integration (Resend)
- Admin notification email on form submission
- Auto-reply to the submitter
- Rate limiting (3 requests/minute/IP)
- Spam filtering via keyword detection

### SEO
- Dynamic `sitemap.xml` and `robots.txt`
- Open Graph + Twitter card metadata
- Google Site Verification meta tag
- Favicon in both `.webp` and `.ico` formats for Google crawl

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Approve native builds (first time only)
pnpm approve-builds esbuild

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

**Environment Variables** (`.env.local`):

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | No | Resend API key for email sending |
| `FROM_EMAIL` | No | Sender email address |
| `ADMIN_EMAIL` | No | Recipient email for form submissions |
| `PORT` | No | Dev server port (default 3000) |
| `BASE_PATH` | Yes | Base path for asset URLs |

---

## Project Structure Notes

- All source code lives under `src/` with `@/` path alias mapped to `./src/*`
- Components are in `components/`, pages/API in `app/`, shared logic in `lib/`
- UI primitives (shadcn/ui) are in `components/ui/` — customize via Tailwind + CSS variables in `globals.css`
- The homepage (`page.tsx`) is a server component; interactive sections are client components with `"use client"`

## Browser Support

- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Responsive: Desktop (1024px+), Tablet (768-1023px), Mobile (<768px)
