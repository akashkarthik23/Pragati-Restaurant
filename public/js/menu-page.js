var menuState = {
  items: [],
  category: "all",
  dietary: "all",
  search: "",
};

function dishMatches(d) {
  if (
    menuState.search &&
    d.name.toLowerCase().indexOf(menuState.search) === -1 &&
    d.description.toLowerCase().indexOf(menuState.search) === -1
  )
    return false;
  if (menuState.category !== "all" && d.category !== menuState.category)
    return false;
  if (menuState.dietary !== "all" && d.type !== menuState.dietary) return false;
  return true;
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

function renderMenuGrid() {
  var root = document.getElementById("menu-grid");
  var empty = document.getElementById("menu-empty");
  if (!root) return;
  var list = menuState.items.filter(dishMatches);
  if (!list.length) {
    root.innerHTML = "";
    if (empty) empty.classList.remove("hidden");
    return;
  }
  if (empty) empty.classList.add("hidden");
  root.innerHTML = list
    .map(function (d) {
      var spice =
        d.spiceLevel != null
          ? '<div class="flex items-center gap-1 mb-4"><span class="text-xs text-neutral-500">Spice:</span><span>' +
            [1, 2, 3]
              .map(function (i) {
                return (
                  '<span style="display:inline-block;width:0.75rem;height:0.75rem;border-radius:9999px;margin-right:4px;background:' +
                  (i <= d.spiceLevel ? "#ef4444" : "var(--neutral-200)") +
                  '"></span>'
                );
              })
              .join("") +
            "</span></div>"
          : "";
      return (
        '<article class="card group">' +
        '<div class="relative image-overlay">' +
        '<img src="' +
        escapeAttr(d.image) +
        '" alt="' +
        escapeAttr(d.name) +
        '" class="menu-card__img"/>' +
        '<span class="badge badge--light" style="top:12px;left:12px">' +
        (d.type === "veg" ? "Vegetarian" : "Non-Vegetarian") +
        "</span>" +
        (d.chefRecommended
          ? '<span class="badge badge--gold" style="top:12px;right:12px">Chef\'s Choice</span>'
          : "") +
        (d.bestseller
          ? '<span class="badge badge--dark" style="bottom:12px;left:12px">Bestseller</span>'
          : "") +
        "</div>" +
        '<div class="card__body">' +
        '<div class="flex justify-between items-start mb-2">' +
        '<h3 class="text-xl" style="font-family:Playfair Display,serif">' +
        escapeHtml(d.name) +
        "</h3>" +
        '<span class="text-gold font-medium">' +
        escapeHtml(d.price) +
        "</span>" +
        "</div>" +
        '<p class="text-neutral-600 text-sm mb-4">' +
        escapeHtml(d.description) +
        "</p>" +
        spice +
        '<button type="button" class="btn btn--outline btn--sm btn--block menu-add" data-id="' +
        d.id +
        '">Add to Cart</button>' +
        "</div>" +
        "</article>"
      );
    })
    .join("");

  bindFoodImageFallback(root, ".menu-card__img");

  root.querySelectorAll(".menu-add").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = Number(btn.getAttribute("data-id"));
      var d = menuState.items.find(function (x) {
        return x.id === id;
      });
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

function bindFilters() {
  document.querySelectorAll("[data-cat]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      menuState.category = btn.getAttribute("data-cat");
      document.querySelectorAll("[data-cat]").forEach(function (b) {
        b.classList.toggle("pill--active", b === btn);
      });
      renderMenuGrid();
    });
  });
  document.querySelectorAll("[data-diet]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      menuState.dietary = btn.getAttribute("data-diet");
      document.querySelectorAll("[data-diet]").forEach(function (b) {
        b.classList.toggle("pill--active", b === btn);
      });
      renderMenuGrid();
    });
  });
  var search = document.getElementById("menu-search");
  if (search) {
    search.addEventListener("input", function () {
      menuState.search = search.value.trim().toLowerCase();
      renderMenuGrid();
    });
  }
  var reset = document.getElementById("menu-reset");
  if (reset) {
    reset.addEventListener("click", function () {
      menuState.category = "all";
      menuState.dietary = "all";
      menuState.search = "";
      if (search) search.value = "";
      document.querySelectorAll("[data-cat]").forEach(function (b) {
        b.classList.toggle("pill--active", b.getAttribute("data-cat") === "all");
      });
      document.querySelectorAll("[data-diet]").forEach(function (b) {
        b.classList.toggle("pill--active", b.getAttribute("data-diet") === "all");
      });
      renderMenuGrid();
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
  getMenuItems().then(function (items) {
    menuState.items = items;
    renderMenuGrid();
  });
  bindFilters();
});
