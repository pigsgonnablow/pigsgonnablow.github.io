(function () {
  const games = window.LMNOP_GAMES || [];
  const LABELS = { playable: "Playable", prototype: "Prototype", "coming-soon": "Coming soon" };
  const FILTERS = [["all", "All"], ["playable", "Playable"], ["prototype", "Prototypes"], ["coming-soon", "Coming soon"]];
  const grid = document.getElementById("grid");
  const bar = document.querySelector(".filters");
  document.getElementById("year").textContent = new Date().getFullYear();

  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };

  // Only follow http(s) links, so a typo or a "javascript:" url in games.js can never run code.
  function safeUrl(u) {
    if (!u) return null;
    try { const x = new URL(u, location.href); return x.protocol === "https:" || x.protocol === "http:" ? x.href : null; }
    catch (e) { return null; }
  }

  function card(g, i) {
    const title = g.title || "Untitled";
    const url = safeUrl(g.url);
    const linked = !!url;
    const c = el(linked ? "a" : "div", "card" + (g.featured ? " featured" : "") + (linked ? "" : " disabled"));
    if (linked) { c.href = url; c.target = "_blank"; c.rel = "noopener"; }
    c.style.setProperty("--accent", g.color || "#ff9f1c");
    const art = el("div", "art");
    if (g.image) {
      const img = el("img"); img.src = g.image; img.alt = ""; img.width = 800; img.height = 500;
      if (i >= 3) img.loading = "lazy"; // the first row is on screen right away, so load it immediately
      art.append(img);
    } else art.append(el("span", "initial", title.charAt(0)));
    art.append(el("span", "badge " + g.status, LABELS[g.status] || g.status));
    const body = el("div", "body");
    body.append(el("h3", "", title), el("p", "", g.tagline));
    const tags = el("ul", "tags");
    (g.tags || []).forEach(t => tags.append(el("li", "", t)));
    const play = el("span", "play", linked ? "Play →" : "Coming soon");
    if (linked) play.append(el("span", "sr-only", " (opens in a new tab)"));
    body.append(tags, play);
    c.append(art, body);
    return c;
  }

  function render(filter) {
    grid.replaceChildren(...games.filter(g => filter === "all" || g.status === filter).map(card));
    bar.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.f === filter));
  }

  // Only show filters that have at least one game, and hide the bar until there's something to filter.
  const used = new Set(games.map(g => g.status));
  const shown = FILTERS.filter(([k]) => k === "all" || used.has(k));
  if (shown.length > 2) shown.forEach(([k, label]) => {
    const b = el("button", "chip", label); b.type = "button"; b.dataset.f = k;
    b.onclick = () => render(k); bar.append(b);
  });
  render("all");
})();
