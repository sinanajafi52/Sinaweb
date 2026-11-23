# Portfolio website – Sina Najafi

Personal portfolio site for **Sina Najafi, Junior Embedded Software Engineer**, aimed at German employers
(recruiters + embedded team leads). Design concept: **"Datenblatt"** – the site reads like a technical datasheet.

## Source of truth: the design

The approved design lives in `design/reference/`. Open these files in a browser – they ARE the visual spec.

| File | What it shows |
|---|---|
| `design/reference/index.html` | Home page, desktop (1440 px wide) – also responsive |
| `design/reference/mobile.html` | Home page on a phone (390 px) – how hero + first section stack |
| `design/reference/project-frog.html` | Project detail page for "Frog" |
| `design/reference/tokens.html` | Colors, type scale, buttons, tags, section header |

Rules:
- Match the reference **exactly**: colors, font sizes, weights, spacing, borders, copy, section order.
  Do not redesign, "improve" or add sections. If something seems missing or wrong, ask Sina first.
- The reference files use inline styles because they were exported from a design tool.
  In the real site, move styles into `assets/css/style.css` (classes + CSS custom properties), keep markup semantic.
- The German copy in the reference is final unless Sina changes it. Text in `[BRACKETS]` is a placeholder
  for data Sina still has to provide – keep it visible, never invent the content.

## Stack and structure

- Plain **static HTML + one CSS file + minimal vanilla JS** (mobile menu only). No framework, no build step,
  no npm runtime dependencies. Sina must be able to read and edit every file.
- Hosting: files are uploaded as-is to Sina's web host (staging: `sinolab-com.stackstaging.com`). Relative paths only.

```
/index.html                     Home (DE)
/projekte/frog.html             Frog project page (DE)
/en/index.html                  Home (EN)
/en/projects/frog.html          Frog project page (EN)
/impressum.html                 Legal notice (DE) – shell only, see "Legal"
/datenschutz.html               Privacy policy (DE) – shell only, see "Legal"
/assets/css/style.css
/assets/js/main.js
/assets/fonts/                  self-hosted IBM Plex woff2
/assets/img/                    photos (see "Images")
/assets/cv/Lebenslauf_Sina_Najafi.pdf   (Sina adds this)
/design/reference/              design spec – do not deploy
```

## Design tokens

```css
--paper:    #F6F5F1;  /* page background */
--surface:  #EFEDE7;  /* alternating section background */
--white:    #FFFFFF;  /* cards, tables */
--ink:      #16181D;  /* text, dark sections, primary button */
--text-2:   #3A3D44;  /* body copy */
--muted:    #5B5F66;  /* labels, meta (passes 4.5:1 on paper) */
--line:     #D9D7D0;  /* hairlines */
--line-2:   #C9C6BD;  /* tag / chip borders */
--accent:   #C2410C;  /* section numbers, award badge, mono subline */
--led:      #2F9E44;  /* "available" status dot */
```

- Fonts: **IBM Plex Sans** (400/500/600/700) for text, **IBM Plex Mono** (400/500/600) for labels, numbers, specs.
  **Self-host** the woff2 files in `/assets/fonts` (IBM Plex is open source, OFL). Do NOT load Google Fonts from
  Google's servers – self-hosting is standard practice in Germany for GDPR reasons.
- Content width: max 1200 px, 32 px side padding (20 px on phones). Sections: 112 px vertical padding on desktop.
- Section header pattern: 2 px ink rule on top, mono number in accent (`01`), H2 next to it.
- Grids use `repeat(auto-fit, minmax(min(Xpx, 100%), 1fr))` so they collapse to one column on phones.
- Background of hero: subtle 24 px graph-paper grid (see `.paper-grid` in the reference).
- Image placeholders: diagonal stripes (`.placeholder`) with a mono label – keep until real photos exist.

## Signature element: the chip pinout (hero)

Build it in HTML/CSS (not an image), exactly as in the reference: dark chip body "SN-01" with notch and pin-1 dot,
8 pins per side with DIP numbering (left 1→8 top-down, right 16→9 top-down).
Left: C, C++, Python, HAL, CubeMX, Git, CAD, GND · Right: VCC, UART, SPI, I2C, ADC, PWM, EXTI, GPIO
(GND/VCC in muted grey). Keep the `role="img"` + `aria-label`. On phones it scales down (see `mobile.html`).

## Languages

- German is primary (`/`), English mirror under `/en/` with the same layout. Translate the copy faithfully,
  keep proper names and technical terms as they are.
- The DE/EN switch in the header is a pair of links to the counterpart page (not JS). Add `hreflang` alternates.

## Responsive and accessibility

- Must look right at 390 px and 1440 px (compare with `mobile.html` and `index.html`). Nav collapses into a
  menu button below ~760 px.
- Semantic HTML (`header`, `nav`, `main`, `section`, `article`, real `<a>`/`<button>`), visible focus styles,
  touch targets ≥ 44 px, text contrast ≥ 4.5:1, meaningful `alt` text for every photo.
- Basic SEO: `<title>`, meta description, Open Graph tags, an "SN" favicon matching the logo mark.

## Images (Sina supplies them – expected file names)

| File | Where |
|---|---|
| `assets/img/portrait.jpg` | Hero – small portrait next to the name (proposed; confirm with Sina) |
| `assets/img/frog-front.jpg` | Home "Hauptprojekt" large image + Frog page hero image |
| `assets/img/frog-cad.jpg` | Home small image + Frog gallery |
| `assets/img/sinolab-dashboard.png` | Home small image + Frog gallery |
| `assets/img/frog-electronics.jpg` | Frog gallery |
| `assets/img/cellcore.jpg`, `farmbot.jpg`, `fdm.jpg`, `incubator.jpg` | Project cards (optional) |

If a card image is missing, drop the image area from that card instead of showing a placeholder on the live site.
Compress images (max ~1600 px wide, WebP or optimized JPEG), use `loading="lazy"` below the fold.

## Content rules

- Never mention AI tools anywhere on the site (Sina's decision).
- The hotel job is intentionally NOT on the site.
- Facts come only from the reference files or from Sina. Do not invent dates, grades, titles or numbers.
- Open placeholders: `[JOBTITEL]` (Faralab), master start year, bachelor degree / university / years,
  `[E-MAIL-ADRESSE]`, CV PDF, photos.

## Legal

`impressum.html` and `datenschutz.html`: create the page shells in the site's style with a clear
`[TEXT FOLGT]` placeholder. Do not write legal text yourself – Sina will provide it.

## Workflow

- Sina's Git routine: branch → small commits → push → pull request → merge → pull. One feature branch per step
  (e.g. `feature/home-de`, `feature/frog-page-de`, `feature/en`).
- After each step: open the page at 390 px and 1440 px and compare side by side with the reference.
- Explain briefly what you built and why, in simple terms – Sina wants to understand and maintain the code.
