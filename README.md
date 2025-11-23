# Aesthetic Travel Log - Five Days in Ancient Greece

A high-end, immersive digital travel journal built with Next.js 14, featuring scrollytelling, Framer Motion animations, and editorial-style design.

## 🎨 Design Philosophy

- **Editorial Magazine Aesthetic**: Inspired by Kinfolk, Cereal Magazine, and Apple product pages
- **Typography**: Playfair Display (serif) + Inter (sans-serif)
- **Color Palette**: Muted earth tones (sand, sage, slate)
- **Layout**: Bento-grid galleries, extensive whitespace, smooth micro-interactions

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── Hero.tsx            # Hero section with animations
│   ├── Timeline.tsx        # Sticky navigation timeline
│   ├── DayEntry.tsx        # Individual day entry cards
│   └── PhotoGrid.tsx       # Bento-grid photo gallery
├── data/
│   └── travelLog.json      # Structured travel data
└── public/                 # Static assets
```

## ✨ Features

- **Scrollytelling**: Active timeline navigation that follows scroll position
- **Framer Motion**: Smooth entrance animations, parallax effects, hover states
- **Responsive Design**: Mobile-first, fully responsive layout
- **Structured Data**: JSON-based content architecture
- **Expandable Narratives**: Click to read full entries
- **Sensory Details**: Organized by sight, sound, smell, taste, feeling

## 🎯 Components

### Hero
Full-screen hero with animated title, subtitle, and scroll indicator.

### Timeline
Sticky navigation bar showing all 5 days with active state tracking.

### DayEntry
Rich content cards featuring:
- Location & mood badges
- Pull quotes
- Key moments (bullet list)
- Sensory detail cards
- Bento-grid photo galleries
- Expandable full narratives

### PhotoGrid
Dynamic bento-grid layout with:
- Varying aspect ratios
- Hover animations
- Placeholder system for images

## 🖼️ Future Enhancements

- Add actual travel images
- Implement parallax scroll effects
- Add page transitions
- Include map integration
- Add dark mode

## 📝 Content

This travel log chronicles a humorous time-traveling journey through Ancient Greece in 441 B.C., visiting:
1. **The Acropolis** - Athens
2. **The Agora** - Athens
3. **Theatre of Dionysus** - Athens
4. **Sanctuary of Apollo** - Delphi
5. **Olympic Stadium** - Olympia

---

Built with ❤️ and a sense of humor about ancient marital strife.
