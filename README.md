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

## App Store link

Every App Store link reads one value in `js/config.js`:

```js
const APP_STORE_URL = "#";
```

The buttons say “Coming soon to the App Store” and stay on this site until that value is an `http` or `https` URL.

When the listing is live, set it to the commented URL in that file:

```js
// const APP_STORE_URL = "https://apps.apple.com/app/id6821444727";
```

## Contact

`CONTACT_EMAIL` is empty on purpose. The pages show `TODO_EMAIL` and label it as a placeholder, not a mailto link.

TODO: set `CONTACT_EMAIL` in `js/config.js` to a real inbox before you rely on this site as the App Store support or privacy contact.

## Screenshots

The home page has three empty `<img>` slots (Fig. 1, Fig. 2, Fig. 3). The repo has no real captures.

TODO: drop real screenshots in, set each `src`, and delete the TODO comment above that image. Do not draw a fake screen.

Suggested paths:

- `assets/screenshots/read.png` — the line and aim point on a green
- `assets/screenshots/find-hole.png` — Find hole, after the walk
- `assets/screenshots/speed.png` — green-speed presets and the weather adjustment

The “Screenshot not placed yet” label hides once an `src` is set.

## Type

Barlow Condensed is self-hosted (latin) under the SIL Open Font License. See `assets/fonts/OFL.txt`. Body text uses a serif already on the device. `assets/fonts/outfit-latin.woff2` is unused and is not requested by the pages.
