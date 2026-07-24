# Tables Marketing Site — Design

**Date:** 2026-07-24
**Goal:** Turn the Claude Design "Tables Landing" project into a legitimate, structured static
website and publish it on GitHub Pages at `https://tables.challengr.io`, with a privacy page at
`/privacy` and a support (FAQ) page at `/support`.

## Source

Imported from Claude Design project `Times tables practice app`
(`4df9b49e-986b-4fe2-8484-35933c63854e`):

- `Tables Landing.dc.html` → landing page
- `Tables Privacy.dc.html` → privacy page
- `Tables FAQ.dc.html` → support / FAQ page
- Design tokens from the linked `Tables Design System`
  (`_ds/.../tokens/{colors,typography,spacing,radius-shadow,motion,fonts}.css`)

The `.dc.html` files use Claude Design's `x-dc` runtime (`sc-for`, `dc-import`, a `DCLogic`
class). We port them to plain, static, standards-based HTML/CSS. All copy — including the full
privacy policy and FAQ answers — is taken verbatim from the design; none is invented.

## Stack

- **Plain static HTML + one shared CSS file.** No build step — the simplest, most reliable fit
  for GitHub Pages.
- **Fonts:** Google Fonts (`Zilla Slab`, `Libre Franklin`), as the design specifies.
- **JavaScript:** a single small progressive-enhancement file for the FAQ accordion, the
  decorative mastery grid, scroll-reveal, and runtime email obfuscation. Core content and CTAs
  work without JS.

## Structure (folder-per-page for clean, extensionless URLs)

| URL | File |
|-----|------|
| `tables.challengr.io/` | `index.html` |
| `tables.challengr.io/privacy` | `privacy/index.html` |
| `tables.challengr.io/support` | `support/index.html` |

```
index.html
privacy/index.html
support/index.html
assets/css/styles.css        # design tokens + base + reusable component classes
assets/js/main.js            # accordion, mastery grid, reveal, email
assets/img/                  # screenshots (placeholder for now)
CNAME                        # tables.challengr.io
.nojekyll                    # skip Jekyll processing
robots.txt
README.md
```

"Structured" means the heavy inline styling of the source is refactored into a real stylesheet:
design tokens as CSS custom properties, plus reusable classes (`.nav`, `.footer`, `.btn`,
`.card`, `.eyebrow`, `.section`, etc.). Exact visual values (colors, sizes, spacing) are
preserved.

## Key decisions

- **Hero phone:** a tasteful CSS phone frame containing the brand mark as a *placeholder*,
  structured so a real screenshot (an `<img>` in `assets/img/`) can be dropped in later with a
  one-line change. (Real screenshots can't be pulled full-res through the design MCP — 256KB
  cap.)
- **Download buttons:** kept, pointing at a clearly-marked placeholder (`href="#"` +
  `data-appstore-url` + a TODO comment) until the app is live.
- **FAQ nav link and the App Store Support URL** both resolve to `/support`.
- **Email** `colin@challengr.io` is assembled at runtime (kept from the source) to reduce
  scraping; degrades to a visible address.

## Deployment

1. Commit everything to `main` (repo root is the Pages source).
2. GitHub → Settings → Pages: source = `main` / root; set custom domain `tables.challengr.io`;
   enable "Enforce HTTPS".
3. DNS at the domain provider: `CNAME  tables  →  col.github.io` (apex not involved).
4. `CNAME` file in the repo pins the custom domain across deploys.

## Out of scope

- No analytics or trackers (consistent with the app's privacy stance).
- No CMS or build tooling.
- App Store URL wiring-in happens once the app is published.
