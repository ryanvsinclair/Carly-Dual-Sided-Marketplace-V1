# Amplify Readiness Checklist

## Overview

This document tracks changes that affect hosting, deployment, or runtime behavior on AWS Amplify.

**Purpose:**
- Pre-deploy checklist
- Post-change validation
- Answers: "Does this change require me to do something different on Amplify?"

**What this does NOT track:**
- UI changes
- Feature additions (listings, analytics, etc.)
- Styling
- Refactors that do not affect deployment
- Database schema changes (unless they affect env vars or auth flow)

---

## Current Hosting Assumptions

- **Framework:** Next.js App Router
- **Host:** AWS Amplify
- **Auth + Database:** Supabase (external)
- **Deployment:** Single deployment serving public, dealer, and admin routes
- **Runtime:** Node.js (no Edge-only dependencies)
- **Routing:** File-based routing with middleware

---

## Environment Variables Required

### Current (Production-Ready)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_PROJECT_ID` (internal, set via Tempo)
- `SUPABASE_URL` (internal, set via Tempo)
- `SUPABASE_ANON_KEY` (internal, set via Tempo)
- `SUPABASE_SERVICE_KEY` (internal, set via Tempo)

### Future (Not Yet Required)
- None currently

---

## Build & Runtime Assumptions

### next.config.js
- No custom output mode set (uses default)
- No experimental features enabled
- Standard Next.js build process

### Middleware
- Active middleware at `/src/middleware.ts`
- Runs on all routes except static assets
- Performs Supabase session refresh + role enforcement
- **Amplify Impact:** Middleware executes on every request (affects cold start times)

### Server Components
- Used throughout app (default in App Router)
- Server-side Supabase client created per request
- No client-side data fetching patterns that would break in serverless

### Node Runtime
- No Edge runtime usage
- All routes use Node.js runtime (default)

---

## Subdomains (Current vs Future)

### Current (Single Domain)
- All routes served from single domain
- Public routes: `/`, `/browse`
- Dealer routes: `/login`, `/signup`, `/dashboard`
- Admin routes: `/admin/login`, `/admin/dashboard`

### Future (Multi-Subdomain) - NOT IMPLEMENTED
When implemented, will require:
- `www.carlyauto.ca` → public routes
- `dealer.carlyauto.ca` → dealer routes
- `admin.carlyauto.ca` → admin routes
- Middleware updates to enforce subdomain-based routing
- Amplify rewrites/redirects configuration
- Potential CORS updates

**Action Required Before Multi-Subdomain:**
- Update this file with new environment variables (if any)
- Document Amplify rewrite rules
- Test middleware behavior across subdomains

---

## Change Log (Amplify-Relevant Only)

### 2024-12-XX - Initial Setup
- **What Changed:** Created base Next.js App Router project with Supabase
- **Amplify Impact:** Standard Next.js deployment, no special config required

### 2024-12-XX - Dark Mode (next-themes)
- **What Changed:** Added ThemeProvider at root layout
- **Amplify Impact:** No impact (client-side only, no build changes)

### 2024-12-XX - Dealer Profile + Role Binding
- **What Changed:** 
  - Added `dealer_profiles` table (Supabase)
  - Middleware now queries `dealer_profiles` on every dealer route
  - Added `/login`, `/signup`, `/dashboard` routes
- **Amplify Impact:** 
  - Middleware now makes Supabase query per request (may affect cold starts)
  - No env var changes
  - No build config changes

### 2024-12-XX - Dealer Signup (Option 3)
- **What Changed:**
  - Added `/signup` route
  - Removed profile creation from login flow
  - Middleware enforces `status === 'active'`
- **Amplify Impact:**
  - No impact (routing + middleware behavior unchanged from Amplify perspective)
  - No new env vars
  - No build config changes

---

## Update Policy (CRITICAL)

**This file MUST be updated when:**
- Environment variables are added, removed, or renamed
- `next.config.js` is modified
- Middleware behavior changes (routing, auth, session handling)
- Server/client execution boundaries change
- Build process requirements change
- Subdomain routing is introduced
- External service dependencies are added (beyond Supabase)

**This file should NOT be updated for:**
- UI component changes
- Feature additions that do not affect deployment
- Styling changes
- Database schema changes (unless they require new env vars)
- Refactors that maintain same deployment surface

**When in doubt:**
Ask: "Would this change require me to update Amplify configuration, environment variables, or build settings?"
- If yes → update this file
- If no → skip

---

## Pre-Deploy Checklist

Before deploying to Amplify, verify:

- [ ] All required environment variables are set in Amplify console
- [ ] `NEXT_PUBLIC_*` variables are correctly prefixed
- [ ] Middleware is tested locally with production-like env vars
- [ ] No Edge runtime usage (check for `export const runtime = 'edge'`)
- [ ] No hardcoded URLs that assume localhost or specific domain
- [ ] Supabase project is in production mode (if applicable)
- [ ] Build succeeds locally with `npm run build`

---

## Post-Deploy Validation

After deploying to Amplify, test:

- [ ] Public routes load correctly (`/`, `/browse`)
- [ ] Dealer signup works (`/signup`)
- [ ] Dealer login works (`/login`)
- [ ] Dealer dashboard loads after login (`/dashboard`)
- [ ] Non-dealers redirected to `/` when accessing `/dashboard`
- [ ] Theme persistence works across reloads
- [ ] Middleware redirects work as expected

---

## Known Amplify-Specific Behaviors

- **Cold Starts:** Middleware runs on every request, may add latency on first load
- **Supabase Calls:** Middleware makes database query per dealer route (consider caching in future)
- **Session Cookies:** Supabase session stored in cookies, managed by `@supabase/ssr`

---

*Last Updated: 2024-12-XX*
