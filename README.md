# Puttriot

Website for Puttriot, an iPhone and iPad app that reads putting greens with LiDAR. The app is in App Review and is not on the App Store yet. The app itself is not in this repo. The site is three static pages.

| Page | URL |
| --- | --- |
| Home | `/home/` |
| Support | `/support/` |
| Privacy policy | `/privacy-policy/` |

`/` redirects to `/home/`.

Live reads need a LiDAR iPhone Pro (12 Pro and later) or a LiDAR iPad Pro. Other iPhones and iPads get the demo green and the speed tools. They do not scan a real green.

## Run it locally

From the repo root:

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173/home/>.

There is no install and no build. Any static file server works. The pages follow `prefers-color-scheme` for dark mode.

## Deploy

Publish the repository root. Leave the build command empty. Do not deploy from a pull request until it is reviewed and merged.

| Host | Setting |
| --- | --- |
| Netlify | Publish directory `.` |
| Cloudflare Pages | Build command empty, output directory `.` |
| Vercel | Framework preset “Other”, output `.` |
| GitHub Pages | Deploy from the branch root |

Links are relative, so a project site served from a subpath still works.

## App Store

The pages show “Coming soon to the App Store” as text. It is not a link. When the listing is public, the address is:

https://apps.apple.com/app/id6821444727

That address is also noted in `js/config.js`. The site does not load that file.

## Contact

Support and privacy mail is [erdunn+greenreader@mail.grokbot.com](mailto:erdunn%2Bgreenreader@mail.grokbot.com). Puttriot has no domain mailbox. The site is served from GitHub Pages.

## Drawings

The home page draws the green and the walk as inline SVG. The repo has no app screenshots.

## Type

Barlow Condensed is self-hosted (latin) under the SIL Open Font License. See `assets/fonts/OFL.txt`. Body text uses a serif already on the device. `assets/fonts/outfit-latin.woff2` is unused and is not requested by the pages.
