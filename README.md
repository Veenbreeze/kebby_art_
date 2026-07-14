# Kebby Arts

Premium, award-style marketing site for **Kebby Arts** — a creative printing & branding studio
based in Tanzania. Built with React 19, TypeScript, Tailwind CSS v4, Framer Motion, GSAP and Lenis
smooth scroll.

## Tech Stack

- **React 19 + TypeScript + Vite 6**
- **Tailwind CSS v4** (CSS-first theme via `@theme` in `src/index.css`)
- **Framer Motion** — scroll reveals, hover/tilt interactions, page micro-animations, hero photo
  mosaic
- **GSAP** — ticker driving Lenis smooth scroll
- **Lenis** — inertia smooth scrolling
- **Embla Carousel** — testimonials slider
- **React CountUp** — animated statistics
- **React Hook Form + Zod** — validated contact form
- **EmailJS** — contact form email delivery
- **yet-another-react-lightbox** — portfolio lightbox
- **Lucide React + React Icons** — iconography

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Environment Variables (Contact Form)

The contact form sends messages via [EmailJS](https://www.emailjs.com/). Copy `.env.example` to
`.env` and fill in your own EmailJS credentials:

```bash
cp .env.example .env
```

```
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Without these set, the form will show a friendly error asking the visitor to reach out via
WhatsApp instead — it will not crash the app.

### Available Scripts

| Command           | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`       | Start the Vite dev server            |
| `npm run build`     | Type-check and build for production  |
| `npm run preview`   | Preview the production build locally |
| `npm run lint`      | Run ESLint                           |

## Project Structure

```
src/
  components/
    layout/      Navbar, Footer
    ui/          Shared UI primitives (cards, buttons, backgrounds, hero mosaic, etc.)
  data/          Static content: services, portfolio, testimonials, FAQ, stats, nav
  hooks/         useLenis, useMousePosition
  lib/           cn, image URL helpers, zod schema
  sections/      One component per homepage section
  types/         Shared TypeScript types
public/
  kebby/         Real product/work photography, referenced via src/lib/images.ts#kebbyImage
  robots.txt, sitemap.xml, favicon.svg
```

## Design Notes

- **Colors**: `#FF6A00` orange, `#050505` background, `#111111` secondary background, `#171717`
  cards — all defined as Tailwind v4 theme tokens in `src/index.css`.
- **Typography**: Space Grotesk (display), Inter (body), Bebas Neue (available for large numerals),
  loaded via Google Fonts in `index.html`.
- **Hero**: a cycling 2x3 photo mosaic (`src/components/ui/HeroSlideshow.tsx`) built from real
  Kebby Arts work photos in `public/kebby`, each cell cross-fading independently.
- **Images**: portfolio, services and hero images are real work photography from `public/kebby`
  (force-cropped to a uniform 810x1080), except the "Shoes" portfolio category and a few services
  with no photographed work yet, which still use seeded Lorem Picsum placeholders — swap those in
  `src/data/portfolio.ts` / `src/data/services.ts` once real photos exist.

## Performance

- All images use `loading="lazy"` (except the eagerly-loaded hero mosaic).
- `vite.config.ts` manually chunks `framer-motion`/`gsap` separately from the main bundle.
- Real photos in `public/kebby` are pre-compressed and uniformly sized; `vercel.json` sets
  long-lived cache headers for `/assets` and `/kebby`.

## SEO

- Full meta tags, Open Graph, Twitter Card and `LocalBusiness` JSON-LD structured data live in
  `index.html`.
- `public/robots.txt` and `public/sitemap.xml` are included — update the sitemap if you add real
  routes.

## Deployment (Vercel)

The project is a static Vite build with zero server-side code, deployed via `vercel.json`
(`framework: vite`, `outputDirectory: dist`).

## CI/CD

`.github/workflows/ci-cd.yml` runs on every push/PR against `main`:

1. **`build`** — `npm ci`, `npm run lint`, `npm run build` (type-checks + builds). Runs on every
   push and pull request; gates the deploy jobs below.
2. **`deploy-preview`** — on pull requests only, once `build` passes: builds and deploys a Vercel
   preview via the Vercel CLI, then comments the preview URL on the PR.
3. **`deploy-production`** — on pushes to `main` only, once `build` passes: builds and deploys to
   production via the Vercel CLI.

### One-time setup

1. Push this repo to GitHub.
2. Create a Vercel project from it (`vercel link` locally, or import it in the Vercel dashboard —
   either way, do **not** also enable Vercel's own GitHub integration/auto-deploy on the same
   repo, since it would deploy in parallel with this workflow and race it).
3. Generate a token at [vercel.com/account/tokens](https://vercel.com/account/tokens).
4. Get your org/project IDs — after `vercel link`, they're in `.vercel/project.json`.
5. Add three repository secrets under **Settings → Secrets and variables → Actions**:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
6. Add the EmailJS variables from `.env.example` as **environment variables** on the Vercel project
   itself (Project Settings → Environment Variables), not as GitHub secrets — the Vercel build
   step reads them from there via `vercel pull`.

## Before Going Live

1. Fill in the still-placeholder portfolio/service entries (Shoes category, a few services) with
   real photography once available.
2. Set up EmailJS (or swap in your preferred form backend) and add the Vercel environment
   variables.
3. Update the canonical domain in `index.html`, `public/robots.txt` and `public/sitemap.xml` if
   `kebbyarts.com` is not the final domain.
4. Complete the CI/CD one-time setup above so pushes to `main` deploy automatically.
