# QA Bug Report — ClariSolve TECH Website

**Project:** WebSample (ClariSolve TECH Agency)
**Date:** 06 June 2026
**QA Engineer:** Automated Audit
**Environment:** Production (https://clarisolvetech.com) / Local Development

---

## SECURITY ISSUES

---

### BUG-001: Live Resend API Key Exposed in Repository

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-001 |
| **Severity** | Critical |
| **Priority** | P1 |
| **Module** | API / Configuration |
| **Page** | Global |
| **Environment** | Production |
| **Issue Title** | Live Resend API key and email credentials visible in `.env.local` and readable in repo |

**Description:**
The `.env.local` file contains a live `RESEND_API_KEY`, `FROM_EMAIL`, and `ADMIN_EMAIL`. This file is tracked in the working tree. Any contributor with repo access can read this key. The key `re_PDkBj9Rw_5CQNSnXNGekxK6BYtnoLFqYv` can be used to send emails impersonating the domain.

**Steps to Reproduce:**
1. Open `.env.local` in any code editor or terminal
2. View the `RESEND_API_KEY` value on line 2

**Expected Result:**
API keys should never be stored in the repository. They should be injected via CI/CD secrets or environment variables at the platform level.

**Actual Result:**
The plaintext API key is present in a tracked file.

**Impact:**
- Anyone with repo access can send unlimited emails via your Resend account
- Could be scraped by malicious actors
- Financial liability for unauthorized email usage
- Domain reputation damage

**Evidence:**
`.env.local` line 2: `RESEND_API_KEY=re_PDkBj9Rw_5CQNSnXNGekxK6BYtnoLFqYv`

---

### BUG-002: No Security Headers Configured

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-002 |
| **Severity** | Medium |
| **Priority** | P2 |
| **Module** | Configuration |
| **Page** | Global |
| **Environment** | Production |
| **Issue Title** | Missing Content-Security-Policy and security headers in next.config.mjs |

**Description:**
`next.config.mjs` is completely empty. No Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, or Referrer-Policy headers are configured. The X-Powered-By header is also not disabled.

**Steps to Reproduce:**
1. Inspect HTTP response headers of any page
2. Note absence of CSP, X-Frame-Options, etc.

**Expected Result:**
Security headers should be configured to prevent clickjacking, XSS, and information leakage.

**Actual Result:**
No security headers present. Server reveals it's running Next.js via X-Powered-By.

**Impact:**
- Vulnerable to clickjacking attacks
- No XSS protection via CSP
- Information disclosure (server framework visible)

**Evidence:**
`next.config.mjs` lines 1-6 (empty config)

---

### BUG-003: Rate Limiting Bypassable in Multi-Instance Deployments

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-003 |
| **Severity** | Medium |
| **Priority** | P2 |
| **Module** | API |
| **Page** | `/api/send-inquiry` |
| **Environment** | Production |
| **Issue Title** | In-memory rate limiting ineffective in serverless/multi-instance environments |

**Description:**
Rate limiting uses an in-memory `Map` that is local to each server instance. In serverless environments (Vercel, Netlify) or multi-replica deployments, each instance has its own counter. An attacker can rotate through instances to bypass the 3-request-per-minute limit.

**Steps to Reproduce:**
1. Deploy to Vercel (serverless)
2. Send 3 rapid requests to `/api/send-inquiry` — blocked by instance A
3. Wait for a new cold start or different instance — counter is fresh

**Expected Result:**
Rate limiting should use a shared store (Redis, database, or external service).

**Actual Result:**
Rate limiting resets per instance, providing no real protection.

**Impact:**
- Form can be spammed with unlimited submissions
- Email API costs can escalate

**Evidence:**
`src/app/api/send-inquiry/route.ts` lines 11-25

---

### BUG-004: API Error Response Exposes Founder Email

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-004 |
| **Severity** | Medium |
| **Priority** | P3 |
| **Module** | API |
| **Page** | `/api/send-inquiry` |
| **Environment** | Production |
| **Issue Title** | Founder email address leaked in API error response |

**Description:**
The catch block in the API route returns the founder's email address (`vijaynadella@clarisolvetech.com`) in the error response. This can be harvested by bots or scrapers.

**Steps to Reproduce:**
1. Send a malformed request to `/api/send-inquiry`
2. Observe the error response contains the email address

**Expected Result:**
Error messages should be generic and not expose internal contact information.

**Actual Result:**
The founder's email is returned in the API response body.

**Impact:**
- Email address can be harvested for spam
- Personal information leak

**Evidence:**
`src/app/api/send-inquiry/route.ts` lines 101-103

---

### BUG-005: Form Data Stored in sessionStorage Without Sanitization

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-005 |
| **Severity** | Low |
| **Priority** | P3 |
| **Module** | Form |
| **Page** | `/start-project` |
| **Environment** | Production |
| **Issue Title** | Project inquiry form data persisted in sessionStorage with no sanitization on read |

**Description:**
The form persists all field data to `sessionStorage` on every change and reads it back on mount. If an XSS vulnerability exists elsewhere, an attacker can read form data including phone, email, and project description.

**Steps to Reproduce:**
1. Fill out the start-project form
2. Open DevTools → Application → Session Storage
3. View the raw form data including phone, email, company details

**Expected Result:**
Sensitive data should not be persisted in client-side storage without sanitization.

**Actual Result:**
Raw form data stored in sessionStorage.

**Impact:**
- Low severity (requires XSS to exploit)
- Exposes user's contact data if compromised

**Evidence:**
`src/app/start-project/page.tsx` lines 77-89

---

## FUNCTIONAL BUGS

---

### BUG-006: Career Page "Apply Now" Buttons Do Nothing

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-006 |
| **Severity** | High |
| **Priority** | P1 |
| **Module** | Career Page |
| **Page** | `/career` |
| **Environment** | All |
| **Issue Title** | "Apply Now" and "Send Open Application" buttons have no onClick handler |

**Description:**
Both the job-specific "Apply Now" buttons and the "Send Open Application" button are plain `<button>` elements with no `onClick`, `href`, or form action. Clicking them produces zero response — no modal, no navigation, no feedback.

**Steps to Reproduce:**
1. Navigate to `/career`
2. Click any "Apply Now" button next to a job listing
3. Click "Send Open Application" button

**Expected Result:**
Clicking should open an application form, navigate to an application page, or trigger a modal.

**Actual Result:**
Nothing happens. Buttons are decorative.

**Impact:**
- Job applicants cannot apply through the website
- Lost recruitment opportunities
- Broken core functionality

**Evidence:**
`src/app/career/page.tsx` lines 112-114, 132-134

---

### BUG-007: Partners Page "Let's Talk" Button Links to Missing Anchor

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-007 |
| **Severity** | Medium |
| **Priority** | P2 |
| **Module** | Partners Page |
| **Page** | `/partners` |
| **Environment** | All |
| **Issue Title** | "Let's Talk" blob button on /partners links to #contact which does not exist on that page |

**Description:**
The `BlobButton` on the `/partners` page links to `#contact`, but the partners page has no element with `id="contact"`. Clicking it scrolls to the top of the page (no target found). The equivalent component in `PartnersSection.tsx` (used on home page) correctly links to `/start-project`.

**Steps to Reproduce:**
1. Navigate to `/partners`
2. Click the "Let's Talk" blob button
3. Observe the page scrolls to top with no effect

**Expected Result:**
Should navigate to `/start-project` or a valid contact section.

**Actual Result:**
Navigates to a non-existent anchor `#contact`.

**Impact:**
- Users cannot start a partnership inquiry
- Broken conversion funnel

**Evidence:**
`src/app/partners/page.tsx` line 66 vs `src/components/PartnersSection.tsx` line 189

---

### BUG-008: Fallback Email Redirect Exposes Email in Browser

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-008 |
| **Severity** | Medium |
| **Priority** | P3 |
| **Module** | Form |
| **Page** | `/start-project` |
| **Environment** | Production |
| **Issue Title** | Form fallback uses mailto: redirect exposing founder email |

**Description:**
When the API call fails, the form falls back to `window.location.href = "mailto:..."`. This exposes the founder's email in the browser URL bar and opens the user's default mail client. Users on mobile or without a mail client will see an error.

**Steps to Reproduce:**
1. Fill the form and submit
2. Disconnect network or cause API failure
3. Observe mailto redirect with founder email in URL

**Expected Result:**
Graceful error message with option to try again or contact via a non-exposed method.

**Actual Result:**
Forces mailto redirect with email exposed.

**Impact:**
- Founder email harvested from URL bar
- Poor UX on devices without mail client

**Evidence:**
`src/app/start-project/page.tsx` lines 153-156

---

### BUG-009: Duplicated Partner Data Across Two Files

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-009 |
| **Severity** | Medium |
| **Priority** | P3 |
| **Module** | Partners |
| **Page** | `/` and `/partners` |
| **Environment** | All |
| **Issue Title** | Partner brand data and marquee component duplicated in PartnersSection.tsx and partners/page.tsx |

**Description:**
The partner brands array, `BlobButton` component, and marquee implementation are copied across two files. Any update to partner logos or data must be made in two places, inevitably causing drift.

**Steps to Reproduce:**
1. Open `src/components/PartnersSection.tsx` lines 7-57
2. Open `src/app/partners/page.tsx` lines 9-57
3. Compare the duplicated code

**Expected Result:**
Shared data and components should be extracted to a single source of truth.

**Actual Result:**
~50 lines of code duplicated across two files.

**Impact:**
- Maintenance burden
- Data inconsistency risk
- Increased bundle size

**Evidence:**
`src/components/PartnersSection.tsx` lines 7-57, `src/app/partners/page.tsx` lines 9-57

---

## UI/UX ISSUES

---

### BUG-010: Global `cursor: none` Disables All Native Cursors

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-010 |
| **Severity** | High |
| **Priority** | P1 |
| **Module** | Cursor |
| **Page** | Global |
| **Environment** | All |
| **Issue Title** | Global `cursor: none !important` hides text selection I-beam, pointer, and all native cursors |

**Description:**
The custom cursor component injects `* { cursor: none !important; }` globally. This hides all native cursors including the text selection I-beam (users can't tell when they can select text), the pointer hand on links/buttons, and the not-allowed cursor on disabled elements.

**Steps to Reproduce:**
1. Load any page on the site
2. Try to select text — cursor stays as custom ring/dot
3. Hover over a link — no hand pointer appears

**Expected Result:**
Custom cursor should only replace the default arrow cursor. Text selection, pointer, and other cursors should remain native.

**Actual Result:**
Every interactive cursor is replaced by the custom ring+dot.

**Impact:**
- Accessibility: users cannot distinguish clickable vs non-clickable elements
- Usability: text selection feels broken
- Professionalism: non-standard behavior

**Evidence:**
`src/components/Cursor.tsx` line 58

---

### BUG-011: Above-the-Fold Images Use `loading="lazy"` Hurting LCP

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-011 |
| **Severity** | Medium |
| **Priority** | P2 |
| **Module** | Images |
| **Page** | `/` (Hero, Navbar) |
| **Environment** | Production |
| **Issue Title** | Logo and hero images use `loading="lazy"` despite being above the fold |

**Description:**
The navbar logo and hero section images are above the fold (visible on initial page load without scrolling) but use `loading="lazy"`. Lazy loading above-the-fold images delays LCP (Largest Contentful Paint), hurting Core Web Vitals and SEO ranking.

**Steps to Reproduce:**
1. Open DevTools → Network tab
2. Reload the page
3. Observe hero images loading with low priority

**Expected Result:**
Above-the-fold images should use `loading="eager"` or omit the attribute (default eager) and use `fetchpriority="high"`.

**Actual Result:**
Above-the-fold images are lazy-loaded.

**Impact:**
- Slower perceived page load
- Worse LCP score
- Negative SEO impact

**Evidence:**
`Navbar.tsx` line 28, `Hero.tsx` lines 63, 69

---

### BUG-012: Navbar Overlaps Page Content

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-012 |
| **Severity** | Medium |
| **Priority** | P2 |
| **Module** | Layout |
| **Page** | Global |
| **Environment** | All |
| **Issue Title** | Fixed navbar has no content offset, overlaps top of page content |

**Description:**
The navbar is `fixed top-0` with `h-14` (56px height), but no `padding-top` or `margin-top` is applied to the page content. The top ~56px of every page is hidden behind the navbar.

**Steps to Reproduce:**
1. Inspect any page's main content
2. Check if first content element has `pt-14` or equivalent offset

**Expected Result:**
Main content should have top padding equal to navbar height (56px).

**Actual Result:**
No offset applied — content starts behind the navbar.

**Impact:**
- Text and images hidden at the top of every page
- Poor UX

**Evidence:**
`src/components/Navbar.tsx` line 39 — no corresponding padding in page layouts

---

### BUG-013: Custom Cursor Not Keyboard Accessible

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-013 |
| **Severity** | Medium |
| **Priority** | P3 |
| **Module** | Cursor |
| **Page** | Global |
| **Environment** | All |
| **Issue Title** | Custom cursor does not respond to keyboard tab navigation |

**Description:**
The custom cursor only responds to mouse movement. Users navigating via keyboard (Tab key) will not see any visual feedback on focused elements. The expand-on-hover effect never triggers.

**Steps to Reproduce:**
1. Load any page
2. Press Tab repeatedly to navigate
3. Observe the cursor ring does not react to focused elements

**Expected Result:**
Custom cursor should expand or change when an element receives keyboard focus.

**Actual Result:**
No cursor response to keyboard navigation.

**Impact:**
- Accessibility violation (WCAG 2.1.1 Keyboard)
- Keyboard-only users get no focus feedback

**Evidence:**
`src/components/Cursor.tsx` — no focus event handlers

---

### BUG-014: 404 Page is Unstyled

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-014 |
| **Severity** | Medium |
| **Priority** | P2 |
| **Module** | 404 |
| **Page** | `/404` |
| **Environment** | Production |
| **Issue Title** | 404 page is plain unstyled HTML with no navigation |

**Description:**
The 404 Not Found page contains only a single unstyled `<h1>404 - Not Found</h1>`. No branding, no navigation links, no "Go Home" button. Users landing here have no way to recover.

**Steps to Reproduce:**
1. Navigate to `https://clarisolvetech.com/nonexistent-page`
2. Observe the unstyled 404 page

**Expected Result:**
A branded 404 page with navigation links, search, or a "Back to Home" button matching the site's dark luxury theme.

**Actual Result:**
Plain text on white background with no navigation.

**Impact:**
- Poor user experience for lost visitors
- No recovery path — users may leave the site
- Unprofessional appearance

**Evidence:**
`src/app/not-found.tsx` lines 1-3

---

## PERFORMANCE ISSUES

---

### BUG-015: All Images Use Native `<img>` Instead of Next.js `<Image>`

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-015 |
| **Severity** | High |
| **Priority** | P1 |
| **Module** | Images |
| **Page** | All |
| **Environment** | Production |
| **Issue Title** | Zero usage of `next/image` — no responsive images, WebP conversion, or lazy loading optimization |

**Description:**
Every image across the entire application uses native `<img>` tags. This means no automatic WebP/AVIF conversion, no responsive `srcset` generation, no blur placeholder support, and no automatic lazy loading with proper `fetchpriority`. This is a significant performance gap.

**Steps to Reproduce:**
1. Search entire codebase for `<Image` or `next/image`
2. Search entire codebase for `<img`
3. Compare counts — 0 vs 35+

**Expected Result:**
Should use `next/image` with `next.config.mjs` `images.remotePatterns` configured.

**Actual Result:**
100% native `<img>` usage.

**Impact:**
- Larger image payloads (no WebP conversion)
- No responsive images (mobile users download desktop-sized images)
- Worse LCP and CLS scores
- No blur-up placeholders

**Evidence:**
Grep across all components — no `next/image` imports found.

---

### BUG-016: No `next.config` Image Remote Patterns Configured

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-016 |
| **Severity** | High |
| **Priority** | P1 |
| **Module** | Configuration |
| **Page** | Global |
| **Environment** | Production |
| **Issue Title** | `next.config.mjs` is empty — no remote image patterns configured |

**Description:**
`next.config.mjs` is completely empty. Even if `next/image` were used, it would fail because the external image hosts (unsplash.com, istockphoto.com, btech.id, etc.) are not configured in `images.remotePatterns`.

**Steps to Reproduce:**
1. Check `next.config.mjs`
2. Note empty config

**Expected Result:**
Should configure `images.remotePatterns` for all external image hosts.

**Actual Result:**
Empty config — using `next/image` would throw errors for external domains.

**Impact:**
- Blocks adoption of next/image
- All images bypass Next.js optimization pipeline

**Evidence:**
`next.config.mjs` lines 1-6

---

### BUG-017: Three Animation Libraries Installed (Bundle Bloat)

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-017 |
| **Severity** | Medium |
| **Priority** | P2 |
| **Module** | Dependencies |
| **Page** | Global |
| **Environment** | All |
| **Issue Title** | Framer Motion, Motion, and GSAP all installed — redundant animation libraries |

**Description:**
`package.json` lists `framer-motion` (v11), `motion` (v12), and `gsap` (v3). `motion` is an evolution of framer-motion; they share a similar API. Having all three adds significant bundle size. GSAP + framer-motion overlap in functionality for most animations.

**Steps to Reproduce:**
1. Check `package.json` for animation libraries
2. Measure bundle size impact

**Expected Result:**
Should use one animation library to minimize bundle size.

**Actual Result:**
Three animation libraries installed.

**Impact:**
- Larger JavaScript bundle
- Longer initial load time
- Maintenance complexity

**Evidence:**
`package.json` — `framer-motion`, `motion`, `gsap` all present

---

### BUG-018: Large Unoptimized PNG Assets in Public Folder

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-018 |
| **Severity** | Medium |
| **Priority** | P3 |
| **Module** | Assets |
| **Page** | Global |
| **Environment** | Production |
| **Issue Title** | Large PNG files (1.4MB+) in public folder without optimization |

**Description:**
`founderSection.png` is ~1.4MB, `portrait.png` and other PNGs are similarly large. These are served as-is without compression, WebP conversion, or responsive sizing.

**Steps to Reproduce:**
1. Check file sizes in `/public`
2. Note `founderSection.png` at ~1.4MB

**Expected Result:**
Images should be optimized (compressed, WebP/AVIF format) with responsive size variants.

**Actual Result:**
Large uncompressed assets served to all devices.

**Impact:**
- Slow page loads, especially on mobile
- High bandwidth consumption
- Poor LCP

**Evidence:**
`public/founderSection.png` (1.4MB), `public/portrait.png`, `public/founder.png`

---

## SEO ISSUES

---

### BUG-019: Critical Metadata Properties Missing

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-019 |
| **Severity** | High |
| **Priority** | P1 |
| **Module** | Layout / SEO |
| **Page** | Global |
| **Environment** | Production |
| **Issue Title** | Missing Open Graph, Twitter Card, metadataBase, robots, and canonical metadata |

**Description:**
The `metadata` export in `layout.tsx` is minimal. Missing critical SEO properties: `metadataBase`, `openGraph` (title, description, images, url, locale), `twitter` card, `robots` directives, `alternates` (canonical), `icons` reference for favicon, and `other` tags like `theme-color`.

**Steps to Reproduce:**
1. Check `src/app/layout.tsx` metadata export (lines 18-24)
2. View page source for Open Graph tags
3. Check Twitter card validator

**Expected Result:**
Should have complete Open Graph, Twitter Card, canonical, and robots metadata.

**Actual Result:**
Minimal metadata with no OG tags, Twitter cards, or canonical URLs.

**Impact:**
- Poor social sharing previews (no image, no description)
- Lower SEO ranking
- No control over how URLs appear when shared
- Potential duplicate content issues (no canonical)

**Evidence:**
`src/app/layout.tsx` lines 18-24

---

### BUG-020: No Sitemap

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-020 |
| **Severity** | High |
| **Priority** | P1 |
| **Module** | SEO |
| **Page** | Global |
| **Environment** | Production |
| **Issue Title** | No sitemap.xml — search engines cannot discover all pages |

**Description:**
No `public/sitemap.xml` file exists and no `app/sitemap.ts` route is configured. The site has at least 4 important pages (`/`, `/start-project`, `/career`, `/partners`) that search engines cannot efficiently discover.

**Steps to Reproduce:**
1. Visit `https://clarisolvetech.com/sitemap.xml`
2. Visit `https://clarisolvetech.com/robots.txt`

**Expected Result:**
Sitemap should be available listing all pages with priority and lastmod dates.

**Actual Result:**
404 for sitemap.xml. robots.txt does not reference a sitemap.

**Impact:**
- Pages may not be indexed by search engines
- Slower discovery of new content
- Lower organic traffic

**Evidence:**
No `sitemap.ts` in `src/app/`, no `sitemap.xml` in `/public`

---

### BUG-021: Generic Alt Text on Key Images

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-021 |
| **Severity** | Medium |
| **Priority** | P2 |
| **Module** | Accessibility / SEO |
| **Page** | `/` |
| **Environment** | All |
| **Issue Title** | Hero and founder images use generic, non-descriptive alt text |

**Description:**
Hero section founder image: `alt="Creative professional"` — too generic, doesn't name the founder. Founder section background: `alt="Founder Background"` — not descriptive. These hurt both accessibility and SEO (image search).

**Steps to Reproduce:**
1. Inspect hero image alt text
2. Inspect founder section background alt text

**Expected Result:**
Alt text should describe the specific person and context (e.g., "Vijay Nadella — Founder & CEO, ClariSolve TECH").

**Actual Result:**
Generic alt text.

**Impact:**
- Poor accessibility for screen reader users
- Missed image SEO opportunity

**Evidence:**
`src/components/Hero.tsx` line 62, `src/components/FounderSection.tsx` line 243

---

## PRODUCTION RISKS

---

### BUG-022: No Error Boundaries — Entire App Can White Screen

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-022 |
| **Severity** | High |
| **Priority** | P1 |
| **Module** | Error Handling |
| **Page** | Global |
| **Environment** | Production |
| **Issue Title** | No error.tsx or global-error.tsx — any client crash causes white screen |

**Description:**
No `error.tsx` or `global-error.tsx` files exist in the app directory. If any client component throws during render (e.g., GSAP plugin fails, API call returns unexpected data), the entire React tree will unmount showing a white screen with no recovery option.

**Steps to Reproduce:**
1. Force an error in any client component (e.g., invalid animation target)
2. Observe the entire app crashes to white screen

**Expected Result:**
Error boundaries should catch component errors and show a branded fallback UI with retry option.

**Actual Result:**
No error boundary at any level.

**Impact:**
- Any runtime error makes the site completely unusable
- Users see a blank white screen with no way to recover
- Lost traffic and conversions

**Evidence:**
No `error.tsx` or `global-error.tsx` in `src/app/`

---

### BUG-023: All Pages Are Client Components (No SSR/Server Components)

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-023 |
| **Severity** | Medium |
| **Priority** | P2 |
| **Module** | Architecture |
| **Page** | All |
| **Environment** | Production |
| **Issue Title** | Every page uses `"use client"` — no server components, no SSR benefits |

**Description:**
Every `page.tsx` starts with `"use client"`, converting the entire page to a client component. This means no server-side rendering for SEO, no React Server Components streaming, and larger JavaScript bundles sent to the client. Static content that doesn't need interactivity is shipped as JavaScript.

**Steps to Reproduce:**
1. Check `src/app/page.tsx` line 1
2. Check `src/app/start-project/page.tsx` line 1
3. Check `src/app/career/page.tsx` line 1
4. Check `src/app/partners/page.tsx` line 1

**Expected Result:**
Pages should use Server Components by default, with only interactive pieces isolated as client components.

**Actual Result:**
Every page is a client component.

**Impact:**
- Larger JS bundle
- Slower initial load
- No server rendering for SEO-sensitive content
- Higher hosting costs (more compute per request)

**Evidence:**
All four `page.tsx` files have `"use client"` at line 1

---

### BUG-024: ESLint Config Version Mismatch with Next.js

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-024 |
| **Severity** | Medium |
| **Priority** | P3 |
| **Module** | Build |
| **Page** | Global |
| **Environment** | Development |
| **Issue Title** | `eslint-config-next` v15.1.0 installed with Next.js v16.2.7 — major version mismatch |

**Description:**
`package.json` lists `next` v16.2.7 but `eslint-config-next` v15.1.0. The ESLint config from v15 may not include rules or support for v16 features, potentially causing incorrect linting or missed issues.

**Steps to Reproduce:**
1. Check `package.json` — `next` version vs `eslint-config-next` version

**Expected Result:**
Major versions of `next` and `eslint-config-next` should match.

**Actual Result:**
v16 vs v15 — major version mismatch.

**Impact:**
- Potential linting errors
- Missing or incorrect ESLint rules
- Could mask bugs

**Evidence:**
`package.json` lines 53, 75

---

### BUG-025: No Loading States for Page Transitions

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-025 |
| **Severity** | Medium |
| **Priority** | P2 |
| **Module** | UX |
| **Page** | All |
| **Environment** | Production |
| **Issue Title** | No loading.tsx — blank screen during page navigation |

**Description:**
No `loading.tsx` files exist in any route segment. When navigating between pages (especially with the PageTransition animation), users may see a blank screen while the next page loads and renders.

**Steps to Reproduce:**
1. Navigate between `/` and `/career` on a slow connection
2. Observe blank/white screen during transition

**Expected Result:**
Should show a branded loading state (skeleton, spinner, or progress bar) during page transitions.

**Actual Result:**
No loading state — blank screen.

**Impact:**
- Poor perceived performance
- Users may think the site is broken
- Higher bounce rate

**Evidence:**
No `loading.tsx` in any `src/app/` route

---

### BUG-026: gsap.ticker.lagSmoothing(0) Disabled

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-026 |
| **Severity** | Low |
| **Priority** | P3 |
| **Module** | Animations |
| **Page** | Global |
| **Environment** | All |
| **Issue Title** | GSAP lag smoothing disabled — animations may jank on slow devices |

**Description:**
`gsap.ticker.lagSmoothing(0)` disables GSAP's built-in lag smoothing. On devices with fluctuating frame rates or under heavy CPU load, GSAP animations will jump or stutter as the ticker tries to catch up.

**Steps to Reproduce:**
1. Load the site on a low-end mobile device
2. Scroll through the What We Do section with GSAP ScrollTrigger animations
3. Observe animation stutter

**Expected Result:**
Lag smoothing should be enabled (default) to provide smooth animations across devices.

**Actual Result:**
Lag smoothing disabled.

**Impact:**
- Animation stutter on slower devices
- Poor UX for mobile users

**Evidence:**
`src/hooks/useLenis.ts` line 26

---

### BUG-027: External Images Without Fallbacks

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-027 |
| **Severity** | Medium |
| **Priority** | P3 |
| **Module** | Images |
| **Page** | `/` (ServicesShowcase, NetworkShowcase) |
| **Environment** | Production |
| **Issue Title** | External CDN images loaded without error handling or fallback placeholders |

**Description:**
ServicesShowcase images are loaded from `btech.id`, `tse2.mm.bing.net`, `media.istockphoto.com` — external URLs with no guarantee of uptime. If these sources go down or change URLs, the images will show broken with no fallback.

**Steps to Reproduce:**
1. Block an external image host in DevTools
2. Reload the page
3. Observe broken image icons

**Expected Result:**
Should have fallback placeholders or at minimum `onError` handlers to show a fallback.

**Actual Result:**
No fallback — broken images.

**Impact:**
- Broken visuals if CDN URLs change
- Unprofessional appearance

**Evidence:**
`src/components/ServicesShowcase.tsx` lines 15, 22, 29, 36, 43, 50, 57

---

### BUG-028: Unused Dead Components Increase Maintenance

| Field | Value |
|-------|-------|
| **BUG ID** | BUG-028 |
| **Severity** | Low |
| **Priority** | P3 |
| **Module** | Code Quality |
| **Page** | Global |
| **Environment** | All |
| **Issue Title** | 6 components and 2 hooks are defined but never imported anywhere |

**Description:**
Files exist in the codebase that are never imported or used: `Contact.tsx`, `Portfolio.tsx`, `Statistics.tsx`, `Testimonials.tsx`, `Services.tsx`, `ServicesBar.tsx`, `useMouseGlow.ts`, `use-mobile.tsx`. These waste developer attention and increase maintenance surface area.

**Steps to Reproduce:**
1. Grep for imports of each listed file
2. Note zero matches

**Expected Result:**
Unused files should be removed.

**Actual Result:**
Multiple dead files in the codebase.

**Impact:**
- Developer confusion
- Potential dead code in bundle (if tree-shaking fails)
- Maintenance overhead

**Evidence:**
Grep — zero imports found for: Contact, Portfolio, Statistics, Testimonials, Services, ServicesBar, useMouseGlow, use-mobile

---

## QA SUMMARY

### Bug Count by Severity

| Severity | Count |
|----------|-------|
| **Critical** | 1 |
| **High** | 8 |
| **Medium** | 14 |
| **Low** | 5 |
| **Total** | **28** |

### Bug Count by Category

| Category | Count |
|----------|-------|
| Security | 5 |
| Functional | 4 |
| UI/UX | 5 |
| Performance | 4 |
| SEO | 3 |
| Production Risks | 7 |

### Production Readiness Score: **35/100**

**Scoring Breakdown:**
- Security: −25 (exposed API key, no security headers, rate limiting bypass)
- Functional: −15 (dead buttons, broken navigation, email fallback)
- UI/UX: −10 (global cursor none, no keyboard accessibility, white 404)
- Performance: −10 (no next/image, bundle bloat, unoptimized assets)
- SEO: −5 (missing OG/sitemap/metadata)

### Release Decision:

❌ **Not Ready for Production**

**Critical blockers requiring resolution before release:**
1. **BUG-001** — Exposed API key (Critical) — rotatethe key immediately and remove from repo
2. **BUG-006** — Career buttons non-functional (High)
3. **BUG-010** — Global cursor none breaks UX (High)
4. **BUG-015** — No next/image anywhere (High)
5. **BUG-019** — Missing SEO metadata (High)
6. **BUG-020** — No sitemap (High)
7. **BUG-022** — No error boundaries (High)
8. **BUG-002** — No security headers (Medium)

---

*Report generated by automated QA audit.*
