# Kebby Arts

Premium, award-style marketing site for **Kebby Arts** — a creative printing & branding studio
based in Tanzania. Built with React 19, TypeScript, Tailwind CSS v4, Framer Motion, GSAP, Lenis
smooth scroll and a React Three Fiber 3D hero showcase.

## Tech Stack

- **React 19 + TypeScript + Vite 6**
- **Tailwind CSS v4** (CSS-first theme via `@theme` in `src/index.css`)
- **Framer Motion** — scroll reveals, hover/tilt interactions, page micro-animations
- **GSAP** — ticker driving Lenis smooth scroll
- **Lenis** — inertia smooth scrolling
- **Three.js / React Three Fiber / Drei** — animated hero product carousel (jersey, t-shirt,
  shoe, wooden name board), lazy-loaded and code-split from the main bundle
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
    three/       R3F models (Jersey, T-Shirt, Shoe, Wood Board) + HeroScene canvas
    ui/          Shared UI primitives (cards, buttons, backgrounds, cursor, etc.)
  data/          Static content: services, portfolio, testimonials, FAQ, stats, nav
  hooks/         useLenis, useMousePosition
  lib/           cn, image URL helpers, garment geometry, zod schema
  sections/      One component per homepage section
  types/         Shared TypeScript types
public/
  robots.txt, sitemap.xml, favicon.svg
```

## Design Notes

- **Colors**: `#FF6A00` orange, `#050505` background, `#111111` secondary background, `#171717`
  cards — all defined as Tailwind v4 theme tokens in `src/index.css`.
- **Typography**: Space Grotesk (display), Inter (body), Bebas Neue (available for large numerals),
  loaded via Google Fonts in `index.html`.
- **3D Hero Showcase**: the four products are stylized, procedurally-built geometry (not
  photorealistic GLTF scans) so the scene stays dependency-free and loads instantly. Swap in real
  `.glb` models under `src/components/three/` if you have professional 3D assets.
- **Images**: every service/portfolio/avatar image is a placeholder from Lorem Picsum /
  Pravatar (seeded, so they stay consistent across reloads). Replace the URLs in
  `src/data/*.ts` and `src/lib/images.ts` with real product photography before launch.
- **Instagram**: the handle/link in `src/data/nav.ts` is a placeholder (`@kebbyarts`) — update it
  once the real handle is confirmed.

## Performance

- The Three.js hero scene is lazy-loaded (`React.lazy` + `Suspense`) and split into its own chunk
  so it never blocks first paint of the text/CTA content.
- `vite.config.ts` manually chunks `three`/`@react-three/*` and `framer-motion`/`gsap` separately
  from the main bundle.
- All images use `loading="lazy"`.

## SEO

- Full meta tags, Open Graph, Twitter Card and `LocalBusiness` JSON-LD structured data live in
  `index.html`.
- `public/robots.txt` and `public/sitemap.xml` are included — update the sitemap if you add real
  routes.

## Before Going Live

1. Replace placeholder images with real product photography.
2. Confirm the Instagram handle and update `src/data/nav.ts`.
3. Set up EmailJS (or swap in your preferred form backend) and add the `.env` values.
4. Update the canonical domain in `index.html`, `public/robots.txt` and `public/sitemap.xml` if
   `kebbyarts.com` is not the final domain.
