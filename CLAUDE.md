# Forge Marketing Website

**Live at:** https://forgetrainer.ai
**Repo:** https://github.com/10D-Labs/forge-website

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Routing:** React Router DOM
- **Hosting:** Vercel (auto-deploys from main branch)

## Commands

```bash
npm run dev      # Start dev server (usually port 8080)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

## Project Structure

```
Website/
├── public/
│   ├── markdown/           # AI-crawler-friendly markdown versions
│   │   ├── blog/           # Blog posts as .md files
│   │   ├── trainers/       # Trainer profiles as .md files
│   │   ├── home.md
│   │   ├── about.md
│   │   └── blog.md
│   ├── trainers/           # Trainer avatar images (.webp)
│   └── sitemap.xml
├── src/
│   ├── assets/             # Images (hero, founders)
│   ├── components/
│   │   ├── blog/           # Blog-specific components
│   │   ├── effects/        # Visual effects (GlowOrbs)
│   │   ├── hero/           # Hero section components
│   │   ├── sections/       # Page sections
│   │   └── ui/             # Radix UI primitives
│   ├── content/
│   │   ├── blog/           # Blog posts (.md) + index.ts
│   │   ├── trainers.ts     # Trainer data
│   │   └── topics.ts       # Topic/category definitions
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities, animations, constants
│   ├── pages/              # Route components
│   └── types/              # TypeScript interfaces
├── brand-guidelines.md     # Full brand guidelines
├── vercel.json             # Vercel config (rewrites, headers)
└── vite.config.ts          # Vite config (manual chunks)
```

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Index | Homepage with hero, features, trainers, CTA |
| `/about` | About | Mission, story, founders, values |
| `/blog` | Blog | Blog post listing |
| `/blog/:slug` | BlogPost | Individual blog article |
| `/topics/:topic` | TopicPage | Posts filtered by category |
| `/trainers/:trainer` | TrainerPage | Individual trainer profile |
| `/privacy-policy` | PrivacyPolicy | Legal |
| `/terms-of-service` | TermsOfService | Legal |
| `/delete-account` | DeleteAccount | Account deletion info |

## Adding a Blog Post

Blog posts live in two places (keep them in sync):

1. **Source:** `src/content/blog/[slug].md` — used by website build
2. **Markdown:** `public/markdown/blog/[slug].md` — served to AI crawlers

### Steps:

1. Create the `.md` file with frontmatter:
```yaml
---
title: "Your Title Here"
date: "YYYY-MM-DD"
excerpt: "Brief description."
author: "The Forge Team"
keywords: ["keyword1", "keyword2"]
category: "training-fundamentals"
---
```

2. Copy to both locations above

3. Add entry to `src/content/blog/index.ts` (at TOP of array):
```typescript
{
  slug: "your-slug",
  title: "Your Title Here",
  date: "YYYY-MM-DD",
  excerpt: "Brief description.",
  author: "The Forge Team",
  keywords: ["keyword1", "keyword2"],
  category: "training-fundamentals"
},
```

4. Add to `public/sitemap.xml` (in Blog Posts section)

5. Commit and push — Vercel auto-deploys

**Or use the article-pipeline skill** which automates all of this.

## Blog Categories

| Slug | Use For |
|------|---------|
| `training-fundamentals` | Workout splits, progressive overload, basics |
| `workout-recovery` | Rest days, deload weeks, muscle growth |
| `strength-training` | Equipment, plateaus, lifting techniques |
| `fitness-psychology` | Habits, motivation, mental barriers |
| `exercise-technique` | Form guides, rep tempo |
| `fitness-technology` | AI trainers, apps, tracking |
| `getting-started` | Intro content, beginner guides |

## Key Components

| Component | Purpose |
|-----------|---------|
| `SEOHead` | Dynamic meta tags, OG tags, markdown discovery |
| `StructuredData` | JSON-LD schema markup |
| `Header` | Navigation with scroll-to functionality |
| `WaitlistForm` | Email capture form (Supabase) |
| `MeetTheTrainersSection` | Trainer carousel |
| `RelatedPosts` | Shows related blog posts |

## SEO Features

- **Markdown for AI crawlers:** All pages have `<link rel="alternate" type="text/markdown">` discovery tags pointing to `/markdown/` versions
- **Structured data:** Organization, WebSite, WebPage, Article, FAQ schemas
- **Dynamic meta tags:** SEOHead component updates title, description, OG tags per page
- **Sitemap:** `public/sitemap.xml` with all pages

## Brand Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | `#FF6600` (Electric Orange) |
| Background | `#0d0a07` (Warm Brown-Black, hsl 30 30% 3%) |
| Headlines | Barlow Condensed, uppercase, 700-900 weight |
| Body | Barlow, normal case, 400-500 weight |
| Corners | Rounded (cards 20px, buttons 14px, inputs/chips 10px, badges 8px) |

Full guidelines: `brand-guidelines.md`

## Deployment

Push to `main` branch → Vercel auto-deploys

```bash
git add .
git commit -m "Description"
git push
```

## Environment Variables

`.env` (gitignored):
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Vercel Configuration

`vercel.json` handles:
- SPA routing (rewrites all non-API/markdown routes to `/`)
- Markdown content-type headers for `/markdown/*.md`
