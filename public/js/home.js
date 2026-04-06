var HERO_IMAGES = [
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop",
];

var FEATURED_IDS = [5, 6, 7, 8, 4];

var TESTIMONIALS = [
  {
    name: "Raj Sharma",
    position: "Food Critic",
    rating: 5,
    comment:
      "The butter chicken at Pragati is the best I've had in the city. The spices are perfectly balanced, and the service is impeccable.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
  },
  {
    name: "Priya Patel",
    rating: 5,
    comment:
      "The ambiance is simply stunning! Every dish we ordered was a masterpiece, both in presentation and taste.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
  },
  {
    name: "Michael Chen",
    position: "Travel Blogger",
    rating: 4,
    comment:
      "Pragati offers an authentic experience that stands out. The lamb biryani was exceptional!",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop",
  },
  {
    name: "Anita Desai",
    rating: 5,
    comment:
      "We celebrated our anniversary at Pragati and it was perfect from start to finish. Thank you for making our evening so special!",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop",
  },
];

function initHero() {
  var layers = document.querySelectorAll(".hero__bg");
  if (!layers.length) return;
  var i = 0;
  setInterval(function () {
    layers[i].classList.remove("hero__bg--active");
    i = (i + 1) % layers.length;
    layers[i].classList.add("hero__bg--active");
  }, 5000);
}

function renderFeatured(menuItems) {
  var root = document.getElementById("featured-root");
  if (!root) return;
  var map = {};
  menuItems.forEach(function (m) {
    map[m.id] = m;
  });
  var html = "";
  FEATURED_IDS.forEach(function (id) {
    var d = map[id];
    if (!d) return;
    html +=
      '<article class="card featured-card group">' +
      '<div class="image-overlay" style="height:14rem">' +
      '<img src="' +
      escapeAttr(d.image) +
      '" alt="' +
      escapeAttr(d.name) +
      '" class="menu-card__img" style="height:100%"/>' +
      (d.chefRecommended
        ? '<span class="badge badge--gold" style="top:12px;right:12px;position:absolute">Chef\'s Choice</span>'
        : "") +
      '<span class="badge badge--light" style="top:12px;left:12px;position:absolute">' +
      (d.type === "veg" ? "Vegetarian" : "Non-Vegetarian") +
      "</span>" +
      "</div>" +
      '<div class="card__body">' +
      "<h3 class=\"font-serif text-xl mb-2\" style=\"font-family:Playfair Display,serif\">" +
      escapeHtml(d.name) +
      "</h3>" +
      '<p class="text-neutral-600 text-sm mb-4">' +
      escapeHtml(d.description) +
      "</p>" +
      '<div class="flex flex-col gap-3" style="align-items:stretch">' +
      '<span class="text-gold font-medium">' +
      escapeHtml(d.price) +
      "</span>" +
      '<button type="button" class="btn btn--outline btn--sm btn--block add-featured-cart" data-id="' +
      d.id +
      '">Add to Cart</button>' +
      "</div>" +
      "</div>" +
      "</article>";
  });
  root.innerHTML = html;
  bindFoodImageFallback(root, ".menu-card__img");
  root.querySelectorAll(".add-featured-cart").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = Number(btn.getAttribute("data-id"));
      var d = map[id];
      if (!d) return;
      addToCart({
        id: d.id,
        name: d.name,
        image: d.image,
        priceLabel: d.price,
        unitPrice: parseRupees(d.price),
      });
      showToast("Added to cart", d.name + " · " + d.price);
    });
  });
}

function escapeHtml(s) {
  var d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}
function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function initFeatured() {
  getMenuItems().then(renderFeatured);
}

function renderTestimonial(index) {
  var t = TESTIMONIALS[index];
  var el = document.getElementById("testimonial-slide");
  if (!el) return;
  var stars = "";
  for (var i = 0; i < 5; i++) {
    stars +=
      '<span style="color:' +
      (i < t.rating ? "var(--gold)" : "#525252") +
      '">★</span>';
  }
  el.innerHTML =
    '<div>' +
    '<img src="' +
    escapeAttr(t.image) +
    '" alt="" class="mx-auto rounded-full mb-4" style="width:5rem;height:5rem;object-fit:cover"/>' +
    '<div class="flex justify-center gap-1 mb-4">' +
    stars +
    "</div>" +
    '<blockquote class="text-lg italic text-neutral-200 mb-6">"' +
    escapeHtml(t.comment) +
    '"</blockquote>' +
    '<p class="text-gold font-medium text-lg">' +
    escapeHtml(t.name) +
    "</p>" +
    (t.position
      ? '<p class="text-neutral-400 text-sm">' + escapeHtml(t.position) + "</p>"
      : "") +
    "</div>";
  document.querySelectorAll("#test-dots button").forEach(function (b, i) {
    b.classList.toggle("is-active", i === index);
  });
}

function initTestimonials() {
  var el = document.getElementById("testimonial-slide");
  if (!el) return;
  var idx = 0;
  var dots = document.getElementById("test-dots");
  if (dots) {
    dots.innerHTML = TESTIMONIALS.map(function (_, i) {
      return '<button type="button" aria-label="Slide ' + (i + 1) + '"></button>';
    }).join("");
    dots.querySelectorAll("button").forEach(function (b, i) {
      b.addEventListener("click", function () {
        idx = i;
        renderTestimonial(idx);
      });
    });
  }
  renderTestimonial(0);
  setInterval(function () {
    idx = (idx + 1) % TESTIMONIALS.length;
    renderTestimonial(idx);
  }, 5000);
  var prev = document.getElementById("test-prev");
  var next = document.getElementById("test-next");
  if (prev)
    prev.addEventListener("click", function () {
      idx = (idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
      renderTestimonial(idx);
    });
  if (next)
    next.addEventListener("click", function () {
      idx = (idx + 1) % TESTIMONIALS.length;
      renderTestimonial(idx);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
  initHero();
  initFeatured();
  initTestimonials();
});
