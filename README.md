# Tables — marketing website

The marketing site for **Tables**, a calm, ad-free times tables app for iPhone and iPad.
Live at **[tables.challengr.io](https://tables.challengr.io)**.

Ported from the Claude Design "Tables" project into a plain, static, standards-based site — no
build step, no framework, no trackers.

## Pages

| URL | File |
|-----|------|
| `/` | `index.html` — landing page |
| `/privacy` | `privacy/index.html` — privacy policy (App Store privacy URL) |
| `/support` | `support/index.html` — support / FAQ (App Store support URL) |

## Structure

```
index.html              Landing page
privacy/index.html      Privacy policy
support/index.html      Support & FAQ
404.html                Not-found page
assets/css/styles.css   Design tokens + component styles
assets/js/main.js       Accordion, mastery grid, scroll-reveal, email
assets/img/             Images (favicon + screenshots)
CNAME                   Custom domain (tables.challengr.io)
.nojekyll               Serve files as-is (skip Jekyll)
robots.txt, sitemap.xml SEO
docs/                   Design spec
```

## Local preview

No build step. Serve the folder with any static server, e.g.:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

(Use a server rather than opening `index.html` directly, so the root-relative `/assets/...`
paths and the `/privacy` and `/support` routes resolve.)

## To do before / after launch

- **App Store link.** The download buttons currently point at `href="#"`. Search for
  `data-appstore-url` (and the `TODO` comments beside each) and drop in the real App Store URL
  once the app is published.
- **Hero screenshot.** The hero shows a placeholder phone. To use a real screenshot, add the PNG
  to `assets/img/` and follow the comment in `index.html` (`hero__art`) to swap the
  `.phone__placeholder` block for an `<img>`.

## Deployment (GitHub Pages)

1. Push to `main`.
2. GitHub → **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main` / `/ (root)`.
3. Set **Custom domain** to `tables.challengr.io`, then enable **Enforce HTTPS**.
4. DNS at the domain host: a `CNAME` record for `tables` → `col.github.io`.

The `CNAME` file in this repo pins the custom domain across deploys.
