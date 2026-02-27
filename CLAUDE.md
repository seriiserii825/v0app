# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use **bun** as the package manager (not npm or yarn — `bun.lock` is present).

```bash
bun run dev       # Start dev server
bun run build     # Production build
bun run start     # Start production server
bun run lint      # ESLint
```

There are no tests configured in this project.

## Architecture

This is a **single-page marketing site** for "Portale Doors" (premium interior doors), built with Next.js 16 App Router and React 19.

### Page structure

`app/page.tsx` composes the page from section components in this order: `Navbar → HeroSection → AboutSection → ServicesSection → CollectionSlider → GallerySection → TestimonialsSection → FooterSection`. All page-level section components live directly in `components/` (not in `app/`).

### UI components

shadcn/ui (new-york style) components live in `components/ui/`. Add new shadcn components with:
```bash
bunx shadcn@latest add <component>
```

### Styling

- Tailwind CSS v4 — configured via `@import 'tailwindcss'` in `app/globals.css` (no `tailwind.config.*` file)
- Design tokens defined as CSS custom properties in `globals.css` using the **oklch** color space, with separate `:root` (light) and `.dark` blocks
- Two Google Fonts loaded in `layout.tsx`: **Inter** (`--font-inter`, `font-sans`) and **DM Serif Display** (`--font-dm-serif`)
- Use `cn()` from `@/lib/utils` for conditional className merging (wraps `clsx` + `tailwind-merge`)

### Notable config

- `next.config.mjs` has `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`
- Vercel Analytics (`@vercel/analytics`) is included in `app/layout.tsx`
- Path alias `@/` maps to the project root
