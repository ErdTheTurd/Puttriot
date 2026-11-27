# Puttriot

Website for Puttriot, an iPhone and iPad app that reads putting greens with LiDAR. The app is not on the App Store yet. The app itself is not in this repo.

| Page | URL |
| --- | --- |
| Home | `/home/` |
| Support | `/support/` |
| Privacy policy | `/privacy-policy/` |

`/` redirects to `/home/`.

Live reads need a LiDAR iPhone Pro (12 Pro or later) or a LiDAR iPad Pro. Other iPhones and iPads get the demo green and the speed tools.

## Run it locally

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173/home/>. The pages follow `prefers-color-scheme`.

## App Store

“Coming soon to the App Store” is text, not a link. When the listing is public, the address is:

https://apps.apple.com/app/id6821444727

## Contact

[erdunn+greenreader@mail.grokbot.com](mailto:erdunn%2Bgreenreader@mail.grokbot.com)

## Screens

Real captures live in `assets/screens/`. The home page shows the iPhone home screen, the iPad home screen, and the iPhone green-speed screen. They are the app, inside a CSS device frame.

## Type

Fraunces and Figtree are self-hosted (latin) under the SIL Open Font License. Older font files in `assets/fonts/` are unused by the pages.
