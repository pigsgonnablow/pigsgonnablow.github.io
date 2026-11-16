// Checks that the <noscript> game list in index.html matches games.js,
// and that every game's status is one the site understands.
// Run it with: node .github/scripts/check-games.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..", "..");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "games.js"), "utf8"), sandbox);
const games = sandbox.window.LMNOP_GAMES || [];

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const noscript = (html.match(/<noscript>([\s\S]*?)<\/noscript>/) || [])[1] || "";
const decode = s => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const listed = [...noscript.matchAll(/<a href="([^"]*)">([\s\S]*?)<\/a>/g)].map(m => ({ url: decode(m[1]), title: decode(m[2].trim()) }));

const problems = [];
const STATUSES = ["playable", "prototype", "coming-soon"];
for (const g of games) {
  if (!STATUSES.includes(g.status)) problems.push(`"${g.title}" has status "${g.status}"; use ${STATUSES.join(", ")}.`);
  if (!g.url) continue; // "Coming soon" games have no link, so they aren't in the list
  const hit = listed.find(l => l.title === g.title);
  if (!hit) problems.push(`"${g.title}" is in games.js but not in the <noscript> list in index.html.`);
  else if (hit.url !== g.url) problems.push(`"${g.title}" links to ${g.url} in games.js but ${hit.url} in index.html.`);
}
for (const l of listed) {
  if (!games.some(g => g.title === l.title)) problems.push(`"${l.title}" is in the <noscript> list in index.html but not in games.js.`);
}

if (problems.length) {
  console.error("Game list problems:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log(`OK: ${games.length} games, and the <noscript> list matches games.js.`);
