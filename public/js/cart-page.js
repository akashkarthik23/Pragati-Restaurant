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

function renderCart() {
  var root = document.getElementById("cart-lines");
  var summary = document.getElementById("cart-summary");
  var empty = document.getElementById("cart-empty");
  var items = loadCart();
  if (!items.length) {
    if (root) root.innerHTML = "";
    if (summary) summary.classList.add("hidden");
    if (empty) empty.classList.remove("hidden");
    return;
  }
  if (empty) empty.classList.add("hidden");
  if (summary) summary.classList.remove("hidden");
  var total = 0;
  if (root) {
    root.innerHTML = items
      .map(function (line) {
        var lineTotal = line.unitPrice * line.quantity;
        total += lineTotal;
        return (
          '<div class="cart-line" data-id="' +
          line.id +
          '">' +
          '<img class="cart-line__img" src="' +
          escapeAttr(line.image) +
          '" alt="' +
          escapeAttr(line.name) +
          '"/>' +
          '<div style="flex:1;min-width:200px">' +
          '<h3 class="font-serif text-lg" style="font-family:Playfair Display,serif">' +
          escapeHtml(line.name) +
          "</h3>" +
          '<p class="text-gold">' +
          escapeHtml(line.priceLabel) +
          ' <span class="text-neutral-400 text-sm">each</span></p>' +
          "</div>" +
          '<div class="qty-control">' +
          '<button type="button" data-act="dec" aria-label="Decrease">−</button>' +
          '<span>' +
          line.quantity +
          "</span>" +
          '<button type="button" data-act="inc" aria-label="Increase">+</button>' +
          "</div>" +
          '<p class="font-semibold" style="min-width:5rem;text-align:right">' +
          formatRupees(lineTotal) +
          "</p>" +
          '<button type="button" class="btn btn--ghost" data-act="remove" aria-label="Remove">✕</button>' +
          "</div>"
        );
      })
      .join("");

    bindFoodImageFallback(root, ".cart-line__img");

    root.querySelectorAll(".cart-line").forEach(function (row) {
      var id = Number(row.getAttribute("data-id"));
      row.querySelectorAll("button").forEach(function (btn) {
        var act = btn.getAttribute("data-act");
        btn.addEventListener("click", function () {
          if (act === "inc") setQuantity(id, 1);
          else if (act === "dec") setQuantity(id, -1);
          else if (act === "remove") removeLine(id);
          renderCart();
        });
      });
    });
  }
  var totalEl = document.getElementById("cart-total");
  if (totalEl) totalEl.textContent = formatRupees(total);
}

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
  renderCart();
  window.addEventListener("pragati-cart-updated", renderCart);
  var clearBtn = document.getElementById("cart-clear");
  if (clearBtn)
    clearBtn.addEventListener("click", function () {
      clearCart();
      renderCart();
    });
});
