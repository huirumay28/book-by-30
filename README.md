# Book by 30

A scrapbook-style portfolio website showcasing the writing of Huiru Huang. Features a distinctive DIY collage aesthetic with handmade touches, torn edges, washi tape, and paper textures.

## 🎨 Features

- **Scrapbook Aesthetic**: Hand-crafted collage design with rotated cards, washi tape decorations, and paper textures
- **Polaroid-Style Images**: Each piece includes a collage photo in vintage polaroid framing
- **4 Content Categories**: Short stories, film/music commentary, literary analysis, and essays
- **Responsive Design**: Beautiful on all screen sizes
- **Static Generation**: Fully pre-rendered for optimal performance
- **Vercel-Ready**: Deploy with zero configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

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

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Adding New Content

Currently, content is managed through local TypeScript files. This will eventually be replaced with a Google Drive CMS (see roadmap below).

### To add a new piece:

1. Open `data/works.ts`
2. Add a new entry to the `works` array:

```typescript
{
  slug: "your-piece-slug",  // URL-friendly identifier
  title: "Your Piece Title",
  category: "short-stories" | "film-music" | "literary-analysis" | "essays",
  date: "2024-01-15",  // YYYY-MM-DD format
  excerpt: "A brief excerpt that appears on the homepage...",
  body: `Full text of your piece here.
  
  Use double line breaks for new paragraphs.`,
  image: "optional-image-name",  // Currently unused, for future enhancement
}
```

3. Save the file—changes will hot-reload in development
4. Rebuild for production: `npm run build`

## 🎨 Customizing Fonts

The site uses a **two-font system** designed for easy customization:

- **Display Font** (titles, headings): Currently **Caveat** from Google Fonts
- **Body Font** (paragraphs, UI text): **Dosis** from Google Fonts

### Swapping to Quiet Attempt Extended (or any custom font)

When you acquire Quiet Attempt Extended (or want to use any other custom font) for titles:

1. **Place font files** in `public/fonts/`:
   ```
   public/
   └── fonts/
       ├── quiet-attempt-extended.woff2
       └── quiet-attempt-extended.woff
   ```

2. **Update `app/globals.css`** — add a `@font-face` declaration at the top:

```css
@font-face {
  font-family: 'Quiet Attempt Extended';
  src: url('/fonts/quiet-attempt-extended.woff2') format('woff2'),
       url('/fonts/quiet-attempt-extended.woff') format('woff');
  font-weight: 400 700;
  font-display: swap;
}
```

3. **Update `app/layout.tsx`** to use the custom font instead of Google Font:

Replace this:
```typescript
import { Caveat, Dosis } from "next/font/google";

const caveat = Caveat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});
```

With this:
```typescript
import { Dosis } from "next/font/google";
import localFont from "next/font/local";

const quietAttempt = localFont({
  src: [
    {
      path: '../public/fonts/quiet-attempt-extended.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/quiet-attempt-extended.woff2',
      weight: '700',
    },
  ],
  variable: '--font-display',
});
```

4. **Update the className** in the `<html>` tag:
```typescript
className={`${quietAttempt.variable} ${dosis.variable} h-full antialiased`}
```

That's it! The `--font-display` CSS variable controls all display typography throughout the site.

## 🎨 Color Palette

The site uses a warm, muted scrapbook palette:

- **Background**: `#faf8f5` (cream)
- **Paper White**: `#ffffff`
- **Kraft**: `#e8dcc4`
- **Washi Tape Yellow**: `#f4e8c1`
- **Washi Tape Pink**: `#ffd6e8`
- **Washi Tape Blue**: `#c8e3f5`
- **Ink Black**: `#0a0a0a`
- **Text Soft**: `#3a3a3a`

Colors are defined as CSS variables in `app/globals.css` for easy customization.

## 🗺️ Roadmap

### Planned Features

- [ ] **Google Drive CMS Integration**: Manage content through Google Docs/Sheets instead of local files
  - Write in Google Docs with simple formatting
  - Metadata in Google Sheets (title, category, date, etc.)
  - Automatic sync on build/deploy
- [ ] **Image Support**: Polaroid-style photo frames for pieces with images
- [ ] **Search Functionality**: Find pieces by keyword or category
- [ ] **Tags System**: Cross-cutting themes beyond the 4 main categories
- [ ] **RSS Feed**: Subscribe to new pieces
- [ ] **Dark Mode**: Evening reading mode with adjusted scrapbook palette

### Google Drive CMS Migration (Future)

When ready to migrate from local files to Google Drive:

1. Content will move from `data/works.ts` to a Google Sheet
2. Full text will be stored in Google Docs (one doc per piece)
3. Build process will fetch content from Google Drive API
4. Environment variables will store Google API credentials
5. Local data files will remain as fallback/backup

This allows non-technical editing while maintaining version control for code.

## 📸 Collage Images

The site uses **personal collage-style imagery** throughout to create the scrapbook aesthetic:

### Current Images (`public/collage/`)

8 curated images inspired by the Pinterest "cool" board aesthetic:
- `painterly-scene.jpg` — Atmospheric interior
- `handwritten-journal.jpg` — Personal notes and writing
- `vintage-portrait.jpg` — Candid photography
- `nightlife-scene.jpg` — Urban/social moments
- `casual-candid.jpg` — Everyday snapshots  
- `forest-path.jpg` — Atmospheric landscapes
- `nostalgic-objects.jpg` — Vintage ephemera
- `dreamy-overhead.jpg` — Creative compositions

**These are temporary stand-ins** sourced from Unsplash that match the Pinterest moodboard aesthetic. Replace them with your own personal photos/scans for the authentic scrapbook feel.

### To Replace with Your Pinterest Images:

1. **Export from Pinterest**: Save images from your boards
2. **Add to** `public/collage/`: Drop JPG files (800x600px recommended)
3. **Update** `data/works.ts`: Change the `image` field to your filename
   ```typescript
   image: "collage/your-photo.jpg"
   ```
4. Mix photo types: film stills, handwritten notes, candid portraits, vintage objects, atmospheric scenes

### Image Guidelines:

- **Format**: JPG or PNG
- **Size**: 800x600px to 1200x800px (varies OK for collage feel)
- **Aesthetic**: Personal, nostalgic, editorial, film-inspired
- **Variety**: Mix portraits, objects, text, landscapes for visual interest
- **Crops**: Different orientations and ratios add to scrapbook authenticity

## 📁 Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with font setup
│   ├── page.tsx            # Homepage with collage grid
│   ├── globals.css         # Global styles and CSS variables
│   └── work/[slug]/
│       └── page.tsx        # Individual piece pages
├── components/
│   ├── WorkCard.tsx        # Scrapbook-style preview card with polaroid images
│   └── CategoryFilter.tsx  # Category navigation
├── data/
│   └── works.ts            # Content database (temporary)
├── types/
│   └── index.ts            # TypeScript interfaces
└── public/
    ├── images/             # Original Unsplash literary images (8)
    └── collage/            # Personal collage photos (Pinterest-style, 8)
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push this repo to GitHub
2. Import the project to [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and configure everything
4. Deploy!

Every push to `main` will auto-deploy.

### Other Platforms

The site is a standard static Next.js app and will work on:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Any host that supports Node.js

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Google Fonts (Caveat, Dosis)
- **Deployment**: Vercel

## 📄 License

Private portfolio site. All writing © Huiru Huang.

---

*Built with ♥️ and virtual washi tape*
