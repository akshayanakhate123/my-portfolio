# Handoff — akshaya-portfolio

_Last updated: 2026-06-17 (Session 2)_

---

## Goal we're working toward

Ship Akshaya Nakhate's personal portfolio as a **static export deployed to GitHub Pages** (`akshayanakhate123/my-portfolio`). The work this session has been entirely about **visual polish and UX refinement** — no new sections, just making existing sections look right and feel tight.

Specific sub-goals still in flight:
1. All sections have **consistent typography** (standardized heading/body scale).
2. All sections have **tight spacing** — no dead black zones between sections.
3. Projects section → **flip-card carousel** with full image visibility and fixed card size.
4. Awards & Achievements → **auto-scrolling horizontal marquee** (RTL, pauseable).
5. Resume download → serves the correct PDF file.
6. Hard refresh → always lands at top of page (hero section).

---

## Current state of the code

### Stack
- Next.js 15.5 (App Router), React 19, Tailwind v4, Framer Motion
- Spline (hero 3D robot), Lottie (preloader)
- Dev server: `npm run dev` on port **3050**
- Static export: `next.config.ts` → `output: "export"`, `images.unoptimized: true`
- CI: `.github/workflows/deploy.yml` → builds on push to `main`, deploys via `actions/deploy-pages@v4`
- Repo: `akshayanakhate123/my-portfolio` ✅ confirmed

### `bp` pattern (critical)
All image paths in `resume.ts` use:
```ts
const bp = process.env.NODE_ENV === "production"
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
  : "";
```
This gates the `/my-portfolio` prefix to production only — dev serves files at root. Every `image:` field in projects and achievements uses `` `${bp}/...` ``.

### Section-by-section state

| Section | File | State |
|---------|------|-------|
| Hero | `HeroSection.tsx` | Name, tagline, description, two CTA buttons, nav. Download resume → `AkshayaNakhate_Resume.pdf` |
| Education | `EducationSection.tsx` | Timeline (01–04), icon boxes, meta row (calendar / star / shield). Heading `text-4xl md:text-5xl`. |
| Work Experience | `JourneySection.tsx` | `py-10`, compact header row, internal `grid-cols-[220px_1fr]`, `text-4xl md:text-5xl` section title, `text-lg md:text-xl` role title, `text-sm` body |
| Internships | `JourneySection.tsx` | Same component as Work Experience, same layout |
| Builds (Projects) | `ProjectSection.tsx` | Flip-card horizontal carousel. Fixed `h-[520px]`. Front: badges + `object-contain` image + title. Back: description (scrollable) + stack tags + links. Tap to flip, hover-pauses nothing (flip is click). ← / → keys scroll between cards. |
| Awards & Achievements | `AchievementSection.tsx` | **Infinite RTL marquee.** Tiles duplicated for seamless loop. `animation: marquee-rtl 40s linear infinite`. Hover pauses. No description text (removed). |
| Let's Connect | `ConnectSection.tsx` | `text-4xl md:text-5xl` heading, same color for both words. `py-24`. Email / LinkedIn / GitHub links. |
| Footer | `Footer.tsx` | Unchanged |

### Typography scale (standardized this session)

| Level | Classes | Used for |
|-------|---------|----------|
| Section label | `text-xs font-mono tracking-[0.4em] uppercase` | "01 / CAREER", "BACKGROUND" |
| **Section H2** | **`text-4xl md:text-5xl font-display font-black uppercase tracking-tighter`** | Education, Journey, Builds, Achievements, Connect — ALL identical |
| Item/role H3 | `text-lg md:text-xl font-display font-black uppercase tracking-tight` | Job role titles |
| Card sub-title | `text-sm md:text-base font-display font-bold` | Education degree name |
| Body | `text-sm leading-relaxed` | All descriptions |
| Meta | `text-xs font-mono` | Dates, CGPA, duration, location |
| Micro | `text-[9px]–text-[11px] font-mono uppercase` | Tags, badges, tile events |

### Spacing (standardized this session)
- `page.tsx`: `space-y-0` between sections (was `space-y-40` — this was the main culprit)
- Education: `py-16`
- Journey: `py-10`
- Projects: `py-20`
- Achievements: `py-16`
- Connect: `py-24`

---

## Files actively being edited

| File | What changed this session |
|------|--------------------------|
| `src/data/resume.ts` | All 6 project descriptions + stacks rewritten. GitHub URL updated to `akshayanakhate123`. |
| `src/components/achievements/AchievementSection.tsx` | Replaced 4-col grid with infinite RTL marquee. Removed description text from tiles. |
| `src/components/projects/ProjectSection.tsx` | Full rewrite → flip-card carousel. Fixed `h-[520px]`. `object-contain` image. Scrollable description on back. |
| `src/components/journey/JourneySection.tsx` | `py-10`, `text-4xl md:text-5xl` section H2, `text-lg md:text-xl` role H3, `text-xs` meta (duration/location/company). |
| `src/components/education/EducationSection.tsx` | `py-16`, `text-4xl md:text-5xl` heading. |
| `src/components/connect/ConnectSection.tsx` | `py-24`, `text-4xl md:text-5xl` heading, both words same white color, `text-sm` tagline. |
| `src/components/hero/HeroSection.tsx` | Download href → `AkshayaNakhate_Resume.pdf`, `download="AkshayaNakhate_Resume.pdf"`. |
| `src/components/ScrollToTop.tsx` | **New file.** `history.scrollRestoration = "manual"` + `window.scrollTo(0,0)` on mount. |
| `src/app/layout.tsx` | Added `<ScrollToTop />`, `suppressHydrationWarning` on `<body>` (Grammarly ext conflict). |
| `src/app/page.tsx` | `space-y-0 mb-16`. |
| `public/AkshayaNakhate_Resume.pdf` | Copied from `D:\SSB\Prep\Resume\Product roles\Akshaya Nakhate product resume.pdf`. |

---

## What's been tried that failed / needed rework

### Spacing / dead zones
- `space-y-40` on the section wrapper in `page.tsx` was adding 160px between every section ON TOP of each section's own `py-*` — giving ~300–400px dead black zones. Removed entirely → `space-y-0`.

### Project card image display
- **Attempt 1:** `object-cover` — crops the image. User rejected: "show the whole image".
- **Attempt 2:** `object-contain` with `fill` inside a full-height container — leaves letterbox gaps top/bottom. User rejected: "still I can see the space".
- **Attempt 3:** Natural height via `width={0} height={0} sizes="100vw"` + `w-full h-auto` with no fixed card height — cards became variable heights across the row, looked uneven.
- **Final fix:** Back to `fill` + `object-contain` + `p-2` inside a `flex-1` container, but with **fixed card height `h-[520px]`** so all cards are uniform. The `#18181b` bg fills letterbox gaps cleanly. User accepted.

### Flip card structure
- Initial flip used `absolute inset-0` on BOTH faces — requires parent to have a fixed height. When we removed fixed height (for natural image sizing, attempt 3), the faces collapsed to 0px. Resolved by restoring fixed `h-[520px]` on the outer card.

### "LET'S CONNECT" heading color
- `CONNECT` had `text-accent/20` (dark orange). User wanted both words same color. Removed the `<span>` color override → both inherit `text-white`.

### Hydration mismatch error
- **Cause:** Grammarly browser extension injecting `data-new-gr-c-s-check-loaded` and `data-gr-ext-installed` onto `<body>` after SSR. React detected server/client HTML mismatch.
- **Fix:** `suppressHydrationWarning` on `<body>` in `layout.tsx`. This is the standard fix — nothing to change in code, it's a third-party browser extension issue.

### Resume download 404
- `.env.local` sets `NEXT_PUBLIC_BASE_PATH=/my-portfolio` even in dev, so `${process.env.NEXT_PUBLIC_BASE_PATH}/ResumeDraft.pdf` resolved to `/my-portfolio/ResumeDraft.pdf` in dev — file not found.
- Fixed with `NODE_ENV === "production"` guard (the `bp` pattern).
- Also: file was `ResumeDraft.pdf` (placeholder). Replaced with `AkshayaNakhate_Resume.pdf` (actual resume).

---

## Next step I'd take

1. **Run production build** — `npm run build`. Check for any TypeScript errors or image path issues. The flip-card uses inline `style` and `backfaceVisibility` which should be fine, but worth confirming.

2. **Test the marquee on mobile** — the `w-[260px]` tiles and `40s` speed should be fine, but verify on a narrow viewport that edge tiles aren't clipped weirdly and hover-pause still works on touch (it won't — add `touch-action: pan-x` or a tap-to-pause toggle for mobile).

3. **Test flip cards on mobile** — tap-to-flip should work. Verify the scrollable description on the back actually scrolls on touch (may need `-webkit-overflow-scrolling: touch` or `overscroll-behavior: contain`).

4. **Commit the dirty tree and push** — trigger `deploy.yml` and verify the live GitHub Pages URL loads correctly with all images, fonts, and animations under `/my-portfolio/`.

5. **Clean up unused files** — `src/components/role/RoleSection.tsx` and `src/components/demo/SplineSceneBasic.tsx` appear unused. Confirm and delete to reduce bundle.

6. **Consider:** The achievement tile images on hover currently scale (`group-hover:scale-105`) but the marquee auto-pauses on hover too — these interact cleanly since hover pause stops the strip, then the tile image zooms in place. No conflict, but worth checking visually.
