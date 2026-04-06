function initNav() {
  var header = document.getElementById("site-header");
  var openBtn = document.getElementById("nav-open");
  var panel = document.getElementById("nav-mobile-panel");
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 50) header.classList.add("site-header--scrolled");
    else header.classList.remove("site-header--scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closePanel() {
    if (!panel) return;
    panel.classList.remove("nav-mobile-panel--open");
    document.body.style.overflow = "";
  }

  if (openBtn && panel) {
    openBtn.addEventListener("click", function () {
      var open = panel.classList.toggle("nav-mobile-panel--open");
      document.body.style.overflow = open ? "hidden" : "";
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closePanel);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initNav, 0);
});
