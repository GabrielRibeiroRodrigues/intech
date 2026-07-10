# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Marketing/portfolio site for "Intech Jr." (junior enterprise), built with Next.js 15 (App Router) + React 19 + TypeScript. Single-page site (`app/page.tsx`) in Brazilian Portuguese, no database, no CMS. Content (services, portfolio items, process steps) is hardcoded as arrays inside `app/page.tsx`.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build (standalone output, see next.config.ts)
npm run start    # run the production build
npm run lint     # next lint
```

There is no test suite configured.

## Architecture

- **App Router, one route**: everything renders from `app/layout.tsx` (global `<head>`, fonts, Bootstrap Icons CDN, mounts `ScrollReveal`) and `app/page.tsx` (all page sections: hero, services, about, process, portfolio, CTA, contact — identified by `<section id="...">` anchors used for in-page nav links).
- **Components are presentation-only**, not routed:
  - `Navbar.tsx` — site nav
  - `ServicesCarousel.tsx`, `PortfolioCarousel.tsx` — client-side carousels fed by data arrays defined in `page.tsx`
  - `StatsCounter.tsx` — animated count-up stats, driven by `IntersectionObserver` (`useCountUp` hook), pure client component
  - `ScrollReveal.tsx` — global `IntersectionObserver` that toggles a `.visible` class on any `.reveal` element as it scrolls into view; mounted once in the root layout and relied on by CSS scroll animations throughout `globals.css`
  - `ContactForm.tsx` — **does not send email**. It builds a WhatsApp deep link (`wa.me/<number>`) from the form fields and opens it in a new tab; there is no backend/API route for contact submissions
- **Styling**: single large stylesheet `app/globals.css` (~2300 lines), no CSS modules/Tailwind. Class-name-driven (BEM-ish: `stat__number`, `hero__title`, etc.).
- **Static assets**: `public/images/*` and `public/videos/video.mp4`, referenced directly by path from the data arrays in `page.tsx`.
- Path alias `@/*` maps to the repo root (see `tsconfig.json`).

## Environment variables

Two example files exist but are inconsistent with current code — `SMTP_*`/`EMAIL_HOST_*` vars and the `nodemailer` dependency are leftover from a prior email-based contact form; the form now submits via WhatsApp only and does not use them:
- `.env.local.example` — `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`
- `.env.production.example` — `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NEXT_PUBLIC_CONTACT_EMAIL`

The WhatsApp number used by `ContactForm.tsx` is hardcoded (`WHATSAPP_NUMBER` constant), not sourced from env.

## Deployment

Docker-based deploy documented in `DEPLOY_DOCKER_NGINX.md`: multi-stage `Dockerfile` builds the Next.js standalone output (`next.config.ts` sets `output: 'standalone'`), `docker-compose.yml` runs the `app` container behind an `nginx` reverse proxy container (`nginx/default.conf`) on port 80. To deploy: copy `.env.production.example` to `.env.production`, then `docker compose up -d --build`.
