var CART_KEY = "pragati-restaurant-cart";

function loadCart() {
  try {
    var raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    var data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (e) {}
  window.dispatchEvent(new CustomEvent("pragati-cart-updated"));
}

function getCartTotals(items) {
  var count = 0;
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    count += items[i].quantity;
    total += items[i].unitPrice * items[i].quantity;
  }
  return { count: count, total: total };
}

function addToCart(product) {
  var items = loadCart();
  var existing = items.find(function (l) {
    return l.id === product.id;
  });
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({
      id: product.id,
      name: product.name,
      image: product.image,
      priceLabel: product.priceLabel,
      unitPrice: product.unitPrice,
      quantity: 1,
    });
  }
  saveCart(items);
}

function removeLine(id) {
  saveCart(loadCart().filter(function (l) {
    return l.id !== id;
  }));
}

function setQuantity(id, delta) {
  var items = loadCart().map(function (l) {
    if (l.id !== id) return l;
    return Object.assign({}, l, { quantity: l.quantity + delta });
  }).filter(function (l) {
    return l.quantity > 0;
  });
  saveCart(items);
}

function clearCart() {
  saveCart([]);
}

function updateCartBadge() {
  var t = getCartTotals(loadCart());
  var text = t.count > 99 ? "99+" : String(t.count);
  var disp = t.count > 0 ? "flex" : "none";
  ["cart-count-badge", "cart-count-badge-mobile"].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.style.display = disp;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge();
});
window.addEventListener("pragati-cart-updated", updateCartBadge);
