// Shared helpers for tools
(function () {
  window.ax6 = window.ax6 || {};
  ax6.toast = function (msg) {
    let el = document.getElementById("ax6-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "ax6-toast";
      el.style.cssText = "position:fixed;bottom:1.2rem;left:50%;transform:translateX(-50%);background:var(--bg-card);border:1px solid var(--border);padding:0.6rem 1rem;border-radius:999px;font-size:0.85rem;z-index:60;box-shadow:var(--shadow);";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = "1";
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.style.opacity = "0"; }, 1800);
  };
})();
