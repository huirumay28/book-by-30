# Ru's Writing Desk

A personal writing discipline tool with a Y2K/early-internet aesthetic. Daily logs, writing tasks, submission tracking, and an inspiration scrapbook — all stored locally in your browser.

## Features

- **Today** — Discipline hub with floor check-in, daily journal, streak counter, and today's tasks
- **Writing** — Track writing tasks/projects with status, notes, and due dates
- **Submissions** — Slow prestige ladder for story submissions with tier-based tracking
- **Inspo** — Digital corkboard for quotes, excerpts, and fragments
- **Log** — Chronological history of all daily entries with search and edit

## Design

Dense-but-cozy Y2K aesthetic inspired by:
- Early-2000s modular layouts (framed portlets, beveled boxes, diagonal title bars)
- 1-bit pixel art / GameBoy nostalgia
- DIY collage / bedroom desk energy

Clean tool UI with:
- Modular window frames with title bars
- Soft grain texture and warm neutrals
- Status badges and monospace fonts for data
- Mobile-first responsive design

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Storage**: localStorage (zero backend — works immediately on Vercel)
- **Deployment**: Vercel-ready

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Data Storage

All data is stored in **localStorage** — no backend required. This means:
- ✅ Works immediately after deployment
- ✅ Completely private (data never leaves your browser)
- ✅ No accounts or sign-in needed
- ⚠️ Data is local to each device/browser
- ⚠️ Clearing browser data will erase your logs

### Future: Google Drive Sync

The data structure is designed to support a future Google Drive backend for cross-device sync. Current localStorage implementation can be replaced without changing the UI.

## Usage Philosophy

### Daily Discipline
- **Soft minimum**: 4 sessions/week, 45–60 min each
- **Floor rule**: Miss a session → 15 min floor work required
- **Streak tracking**: Visual motivation for consistency

### Writing vs Submissions
Tasks are organized into two tracks:
- **Writing** — Craft work, drafts, revision, creative projects
- **Submissions** — Send track with tier-based submission ladder

### Inspo Scrapbook
Paste-to-save digital corkboard for:
- Quotes that resonate
- Excerpts from reading
- Fragments to return to
- Optional tags, sources, and notes

## Seed Data

The app comes preloaded with:

### Writing Tasks
- Name ONE collection story to advance this month
- 4 calendar blocks Mon/Wed/Thu/Sat (45–60m)
- Create Substack + About
- First Substack post
- Sunday log habit

### Submission Ladder
15 preloaded submissions across 4 tiers:
- **Tier 1**: Open/Match (The Offing, Joyland, AAWW The Margins)
- **Tier 2**: Solid Mid (The Common, Electric Lit, Guernica, ZYZZYVA, Epiphany)
- **Tier 3**: Selective (One Story, A Public Space, New England Review, Missouri Review)
- **Tier 4**: Bigger (Kenyon Review, Granta)

All editable and customizable.

## Deployment

### Deploy to Vercel

1. Push this repo to GitHub
2. Import to [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js — zero configuration
4. Deploy

Every push to main auto-deploys.

### Other Platforms

Works on any Next.js-compatible host:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Railway
- Fly.io

## License

Personal project — all writing and content © Huiru May Huang.

---

**Built for discipline. Designed for writers.**
