# lmnop.games

The LMNOP Games studio hub. It's a plain static site, so there's no build step, and it runs on GitHub Pages as is.

## Add a game

1. Put a screenshot in `assets/games/` (16:10 works best, about 800px wide).
2. Open `games.js` and copy one of the blocks.
3. Fill in the title, a one-line tagline, the status (`playable`, `prototype` or `coming-soon`), the link and the picture.
   A game in another pigsgonnablow repo with Pages turned on lives at `https://lmnop.games/<repo-name>/`, so link that. Leave `url` out to show "Coming soon".
4. In `index.html`, add the game to the `<noscript>` list too (title, link, tagline). That list is what search engines and visitors without JavaScript see.
5. Push to `main`. The site updates in a minute or two.
6. Check the "Check game list" run on the repo's Actions tab. It fails if the `<noscript>` list and `games.js` don't match (same titles and links), or if a status isn't one of the three above. Run it yourself first with `node .github/scripts/check-games.js`.

Pictures must live in this repo (in `assets/games/`). The page's security policy only loads images from lmnop.games itself, so a picture hosted on another site won't show up.

If a status has a typo, like `Prototype` or `coming soon`, the page still works it out. Anything it can't recognize shows up as a prototype.

`app.js` only links `http` and `https` urls, so a game whose url is anything else shows "Coming soon".

A visit to a page that doesn't exist shows `404.html`.

The filter buttons appear on their own once there are games in more than one status.

## Update a game that lives in this repo

Some games live in their own folder here instead of their own repo (`skydial/`, `driftspan/`; `sdrHam/` only redirects to `skydial/`). The folder's `index.html` is the whole game.

Driftspan is one file. To update it, replace `driftspan/index.html` with the new `driftspan.html` and push to `main`:

```sh
cp path/to/driftspan.html driftspan/index.html
git add driftspan/index.html && git commit -m "Driftspan: <what changed>" && git push
```

It's live at https://lmnop.games/driftspan/ a minute or two later. If the old version still shows, do a hard refresh (Ctrl+Shift+R, or Cmd+Shift+R on a Mac).

## Hosting

- This repo is named pigsgonnablow.github.io, so it is the account's main site: any other repo with Pages turned on shows up at lmnop.games/<repo-name>.
- GitHub repo with Pages turned on (Settings → Pages → deploy from the `main` branch, root folder).
- The `CNAME` file holds `lmnop.games`.
- In Cloudflare DNS for lmnop.games, add the four GitHub Pages A records (185.199.108.153, .109.153, .110.153, .111.153) and a `www` CNAME to `<account>.github.io`, with the proxy set to "DNS only".
- Point lmnopgames.com at lmnop.games with a Cloudflare redirect rule.
