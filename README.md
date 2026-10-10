# Puttriot

Marketing site for Puttriot, an upcoming iPhone app that reads real putting greens and shows the break. The app itself is not in this repo. This is the landing page: how a read works, what the app will do, and a Download button ready for the App Store link.

Puttriot is putt + patriot. It is a practice tool for juniors and everyday golfers, made in the USA.

## Run it locally

From the repo root, start any static file server:

```bash
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

There is no install and no build step. `npx serve`, Netlify’s drag-and-drop, or opening the folder in another static server all work the same way.

## Deploy

Publish the repository root as a static site. Do not set a build command.

| Host | Setting |
| --- | --- |
| Netlify | Publish directory `.` |
| Cloudflare Pages | Build command empty, output directory `.` |
| Vercel | Framework preset “Other”, output `.` |
| GitHub Pages | Deploy from the branch root (`/`) |

Asset paths are relative (`css/styles.css`, `assets/…`), so the site also works if it is served from a subpath, such as a GitHub project site.

## App Store link

Every Download button reads one value:

```js
// js/config.js
const APP_STORE_URL = "#";
```

Replace `"#"` with the real listing when it ships, for example `https://apps.apple.com/app/id1234567890`.

Until that value is an `http` or `https` URL, the buttons stay on this page and say the listing is coming soon. After you set a real URL, the same buttons open it in a new tab.

## What’s on the page

- Hero, with a sample of the on-green read
- How it works: scan the green, see the break, roll it in
- A sample read, marked as an illustration
- Features, including LiDAR on Pro iPhones and a camera fallback
- The American-made story
- FAQ
- Footer

## Icon and type

`assets/icon.svg` is the app icon, redrawn as vectors from the provided artwork (flag in the hole, wavy green contours). It is the logo, the favicon, and the Apple touch icon source. Regenerate the SVG with:

```bash
python3 scripts/render-icon.py
```

Fraunces and Outfit are self-hosted in `assets/fonts` (latin subset) under the SIL Open Font License. See `assets/fonts/OFL.txt`. The page does not call Google Fonts at runtime.

## Browser support

Current Safari, Chrome, Firefox, and Edge. Layout is checked from a small phone width up through a desktop window. Motion is reduced when the visitor asks for that.
