# lmnop.games

The LMNOP Games studio hub. It's a plain static site, so there's no build step, and it runs on GitHub Pages as is.

## Add a game

1. Put a screenshot in `assets/games/` (16:10 works best, about 800px wide).
2. Open `games.js` and copy one of the blocks.
3. Fill in the title, a one-line tagline, the status (`playable`, `prototype` or `coming-soon`), the link and the picture.

The filter buttons appear on their own once there are games in more than one status.

## Hosting

- This repo is named pigsgonnablow.github.io, so it is the account's main site: any other repo with Pages turned on shows up at lmnop.games/<repo-name>.
- GitHub repo with Pages turned on (Settings → Pages → deploy from the `main` branch, root folder).
- The `CNAME` file holds `lmnop.games`.
- In Cloudflare DNS for lmnop.games, add the four GitHub Pages A records (185.199.108.153, .109.153, .110.153, .111.153) and a `www` CNAME to `<account>.github.io`, with the proxy set to "DNS only".
- Point lmnopgames.com at lmnop.games with a Cloudflare redirect rule.
