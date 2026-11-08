(function () {
  const games = window.LMNOP_GAMES || [];
  const LABELS = { playable: "Playable", prototype: "Prototype", "coming-soon": "Coming soon" };
  const FILTERS = [["all", "All"], ["playable", "Playable"], ["prototype", "Prototypes"], ["coming-soon", "Coming soon"]];
  const grid = document.getElementById("grid");
  const bar = document.querySelector(".filters");
  document.getElementById("year").textContent = new Date().getFullYear();

  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };

  function card(g) {
    const linked = !!g.url;
    const c = el(linked ? "a" : "div", "card" + (g.featured ? " featured" : "") + (linked ? "" : " disabled"));
    if (linked) { c.href = g.url; c.target = "_blank"; c.rel = "noopener"; }
    c.style.setProperty("--accent", g.color || "#ff9f1c");
    const art = el("div", "art");
    if (g.image) { const i = el("img"); i.src = g.image; i.alt = ""; i.loading = "lazy"; art.append(i); }
    else art.append(el("span", "initial", g.title.charAt(0)));
    art.append(el("span", "badge " + g.status, LABELS[g.status] || g.status));
    const body = el("div", "body");
    body.append(el("h3", "", g.title), el("p", "", g.tagline));
    const tags = el("ul", "tags");
    (g.tags || []).forEach(t => tags.append(el("li", "", t)));
    body.append(tags, el("span", "play", linked ? "Play →" : "Coming soon"));
    c.append(art, body);
    return c;
  }

  function render(filter) {
    grid.replaceChildren(...games.filter(g => filter === "all" || g.status === filter).map(card));
    bar.querySelectorAll("button").forEach(b => b.setAttribute("aria-selected", b.dataset.f === filter));
  }

  // Only show filters that have at least one game, and hide the bar until there's something to filter.
  const used = new Set(games.map(g => g.status));
  const shown = FILTERS.filter(([k]) => k === "all" || used.has(k));
  if (shown.length > 2) shown.forEach(([k, label]) => {
    const b = el("button", "chip", label); b.dataset.f = k; b.setAttribute("role", "tab");
    b.onclick = () => render(k); bar.append(b);
  });
  render("all");
})();
