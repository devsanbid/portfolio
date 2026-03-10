# Sandesh Shahi — Personal Portfolio

A modern, visually impressive developer portfolio built with **Next.js 16**, **TailwindCSS 4**, and **Framer Motion**.

## Features

- **Glassmorphism UI** — Translucent cards, soft blurs, and subtle glass effects
- **Smooth Animations** — Scroll reveals, hover effects, and floating elements via Framer Motion
- **Dark Modern Theme** — Purple/blue gradient palette with neon glow accents
- **GitHub Integration** — Dynamically fetches and displays repositories from the GitHub API
- **i18n Language Switching** — English and Nepali with a navbar toggle
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Animated Cursor Glow** — Soft glowing effect following the mouse
- **Scroll Progress Bar** — Fixed top indicator showing page scroll position
- **SEO Optimized** — Meta tags, Open Graph, and semantic HTML
- **Accessible** — Keyboard navigable, proper ARIA labels

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| TailwindCSS 4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| TypeScript | Type safety |

## Sections

1. **Hero** — Animated gradient intro with glass cards
2. **About** — Journey cards explaining background
3. **Skills** — Animated progress bars for frontend & learning skills
4. **Projects** — Live GitHub repo cards fetched from API
5. **Experience** — Animated vertical timeline
6. **Contact** — Glassmorphism form with social links
7. **Footer** — Minimal modern footer

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
app/
├── components/        # All React components
│   ├── Navbar.tsx     # Navigation with language switcher
│   ├── Hero.tsx       # Hero/landing section
│   ├── About.tsx      # About me section
│   ├── Skills.tsx     # Skills with progress bars
│   ├── Projects.tsx   # GitHub repos display
│   ├── Experience.tsx # Timeline section
│   ├── Contact.tsx    # Contact form & social links
│   ├── Footer.tsx     # Footer
│   ├── GlassCard.tsx  # Reusable glass card
│   ├── SectionWrapper.tsx   # Section with scroll reveal
│   ├── ScrollProgress.tsx   # Top scroll bar
│   ├── CursorGlow.tsx       # Mouse glow effect
│   └── FloatingShapes.tsx   # Background orbs
├── lib/
│   ├── i18n.tsx       # i18n context provider
│   └── github.ts      # GitHub API utility
├── globals.css        # Global styles
├── layout.tsx         # Root layout with fonts & metadata
└── page.tsx           # Main page (assembles all sections)
locales/
├── en.json            # English translations
└── ne.json            # Nepali translations
```

## License

MIT — Sandesh Shahi
