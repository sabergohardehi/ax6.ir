// Hub search, filter, favorites
(function () {
  const grid = document.getElementById("tool-grid");
  const search = document.getElementById("tool-search");
  const filters = document.getElementById("filters");
  if (!grid || !search) return;

  const cards = Array.from(grid.querySelectorAll(".tool-card"));
  let activeCat = "all";
  let favs = JSON.parse(localStorage.getItem("ax6-favs") || "[]");

  function apply() {
    const q = search.value.toLowerCase().trim();
    cards.forEach(card => {
      const id = card.dataset.id;
      const cat = card.dataset.cat;
      const keys = (card.dataset.keys || "").toLowerCase();
      const name = (card.querySelector("h3")?.textContent || "").toLowerCase();
      const matchQ = !q || name.includes(q) || keys.includes(q) || id.includes(q);
      const matchCat = activeCat === "all" || (activeCat === "fav" ? favs.includes(id) : cat === activeCat);
      card.style.display = matchQ && matchCat ? "" : "none";
    });
  }

  search.oninput = apply;
  filters?.addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filters.querySelectorAll(".filter-btn").forEach(b => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    activeCat = btn.dataset.cat;
    apply();
  });

  grid.addEventListener("click", e => {
    const fav = e.target.closest(".fav-btn");
    if (!fav) return;
    const id = fav.dataset.id;
    const on = favs.includes(id);
    favs = on ? favs.filter(x => x !== id) : [...favs, id];
    localStorage.setItem("ax6-favs", JSON.stringify(favs));
    fav.setAttribute("aria-pressed", !on);
    if (activeCat === "fav") apply();
  });

  // mark existing favs
  favs.forEach(id => {
    const btn = grid.querySelector(`.fav-btn[data-id="${id}"]`);
    if (btn) btn.setAttribute("aria-pressed", "true");
  });
})();
