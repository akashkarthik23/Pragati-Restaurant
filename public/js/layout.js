function navClass(active, key) {
  return "nav-link" + (active === key ? " nav-link--active" : "");
}

function renderHeader(active) {
  return (
    '<header class="site-header" id="site-header">' +
    '<div class="taj-container site-header__inner">' +
    '<a href="index.html" class="site-logo">' +
    'Pra<span class="text-gold">gati</span>' +
    "</a>" +
    '<nav class="nav-desktop" aria-label="Main">' +
    '<a href="index.html" class="' +
    navClass(active, "home") +
    '">Home</a>' +
    '<a href="about.html" class="' +
    navClass(active, "about") +
    '">About Us</a>' +
    '<a href="menu.html" class="' +
    navClass(active, "menu") +
    '">Menu</a>' +
    '<a href="reservation.html" class="' +
    navClass(active, "reservation") +
    '">Book a Table</a>' +
    '<a href="gallery.html" class="' +
    navClass(active, "gallery") +
    '">Gallery</a>' +
    '<a href="contact.html" class="' +
    navClass(active, "contact") +
    '">Contact</a>' +
    '<a href="cart.html" class="cart-link" aria-label="Shopping cart">' +
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
    '<span class="cart-badge" id="cart-count-badge" style="display:none">0</span>' +
    "</a>" +
    "</nav>" +
    '<div class="nav-mobile-toggle">' +
    '<a href="cart.html" class="cart-link" aria-label="Cart">' +
    '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
    '<span class="cart-badge" id="cart-count-badge-mobile" style="display:none">0</span>' +
    "</a>" +
    '<button type="button" class="btn btn--ghost" id="nav-open" aria-label="Open menu">' +
    '<svg class="icon nav-icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>' +
    "</button>" +
    "</div>" +
    "</div>" +
    '<div class="nav-mobile-panel" id="nav-mobile-panel" aria-hidden="true">' +
    '<nav class="flex flex-col gap-2">' +
    '<a href="index.html" class="' +
    navClass(active, "home") +
    '">Home</a>' +
    '<a href="about.html" class="' +
    navClass(active, "about") +
    '">About Us</a>' +
    '<a href="menu.html" class="' +
    navClass(active, "menu") +
    '">Menu</a>' +
    '<a href="reservation.html" class="' +
    navClass(active, "reservation") +
    '">Book a Table</a>' +
    '<a href="gallery.html" class="' +
    navClass(active, "gallery") +
    '">Gallery</a>' +
    '<a href="contact.html" class="' +
    navClass(active, "contact") +
    '">Contact</a>' +
    '<a href="cart.html" class="' +
    navClass(active, "cart") +
    '">Cart</a>' +
    "</nav>" +
    "</div>" +
    "</header>"
  );
}

function renderFooter() {
  var y = new Date().getFullYear();
  return (
    '<footer class="site-footer">' +
    '<div class="taj-container">' +
    '<div class="footer-grid">' +
    "<div>" +
    '<a href="index.html" class="site-logo text-white" style="font-size:1.75rem">Pra<span class="text-gold">gati</span></a>' +
    '<p class="text-neutral-300 mt-4" style="font-size:0.875rem">Authentic Indian dining on Main Road, Kakinada — warm hospitality and memorable flavors.</p>' +
    '<div class="footer-social mt-4">' +
    '<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>' +
    '<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>' +
    '<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">X</a>' +
    "</div>" +
    "</div>" +
    "<div>" +
    '<h3 class="mb-4" style="font-size:1.125rem">Quick Links</h3>' +
    '<ul class="footer-links list-none" style="list-style:none;padding:0;margin:0">' +
    '<li><a href="index.html">Home</a></li>' +
    '<li><a href="about.html">About Us</a></li>' +
    '<li><a href="menu.html">Menu</a></li>' +
    '<li><a href="reservation.html">Reservations</a></li>' +
    '<li><a href="gallery.html">Gallery</a></li>' +
    '<li><a href="contact.html">Contact</a></li>' +
    '<li><a href="cart.html">Cart</a></li>' +
    "</ul>" +
    "</div>" +
    "<div>" +
    '<h3 class="mb-4" style="font-size:1.125rem">Contact Us</h3>' +
    '<p class="text-neutral-300 text-sm">Main Road, Kakinada, Andhra Pradesh 533001, India</p>' +
    '<p class="mt-2"><a href="tel:+918842345678" class="text-neutral-300">+91 884 234 5678</a></p>' +
    '<p class="mt-1"><a href="mailto:info@pragatikakinada.in" class="text-neutral-300">info@pragatikakinada.in</a></p>' +
    "</div>" +
    "<div>" +
    '<h3 class="mb-4" style="font-size:1.125rem">Opening Hours</h3>' +
    '<ul class="text-neutral-300 text-sm" style="list-style:none;padding:0;margin:0">' +
    '<li class="flex justify-between mb-2"><span>Mon - Thu</span><span>12:00 - 22:00</span></li>' +
    '<li class="flex justify-between mb-2"><span>Fri - Sat</span><span>12:00 - 23:00</span></li>' +
    '<li class="flex justify-between"><span>Sunday</span><span>12:00 - 21:00</span></li>' +
    "</ul>" +
    "</div>" +
    "</div>" +
    '<hr style="border:0;border-top:1px solid #262626;margin:2rem 0" />' +
    '<p class="text-center text-neutral-400 text-sm">&copy; ' +
    y +
    " Pragati. All rights reserved.</p>" +
    "</div>" +
    "</footer>"
  );
}

function injectLayout() {
  var active = document.body.getAttribute("data-nav") || "home";
  var h = document.getElementById("site-header-mount");
  var f = document.getElementById("site-footer-mount");
  if (h) h.innerHTML = renderHeader(active);
  if (f) f.innerHTML = renderFooter();
}

document.addEventListener("DOMContentLoaded", injectLayout);
