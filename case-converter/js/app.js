(function(){
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  document.querySelectorAll("[data-mode]").forEach(btn => {
    btn.onclick = () => {
      const t = input.value;
      const m = btn.dataset.mode;
      if (m === "upper") output.value = t.toUpperCase();
      else if (m === "lower") output.value = t.toLowerCase();
      else if (m === "title") output.value = t.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
      else if (m === "sentence") output.value = t.replace(/(^|[.!?]\s+)([a-z])/g, (m,p1,p2) => p1 + p2.toUpperCase());
    };
  });
  document.getElementById("copy").onclick = () => {
    navigator.clipboard.writeText(output.value);
    if (window.ax6) ax6.toast("Copied");
  };
})();
