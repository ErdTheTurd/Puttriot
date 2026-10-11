# Puttriot

Website for Puttriot, an upcoming iPhone app that reads putting greens. The app is not in this repo. The site is three static pages.

| Page | URL |
| --- | --- |
| Home | `/home/` |
| Support | `/support/` |
| Privacy policy | `/privacy-policy/` |

`/` redirects to `/home/`.

## Run it locally

From the repo root:

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173/home/>.

There is no install and no build. Any static file server works.

## Deploy

Publish the repository root. Leave the build command empty.

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

Replace `"#"` with the listing, for example `https://apps.apple.com/app/id1234567890`. Until the value is an `http` or `https` URL, the links stay on the site and say the listing is not up.

`CONTACT_EMAIL` in the same file is optional. Leave it empty. When you set a real address, Support and the privacy policy show it.

## Type

Literata and Barlow Condensed are self-hosted (latin) under the SIL Open Font License. See `assets/fonts/OFL.txt`.
