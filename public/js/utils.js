var FOOD_PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=1200&auto=format&fit=crop";

function parseRupees(priceLabel) {
  const n = parseInt(String(priceLabel).replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function formatRupees(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

/** One-time fallback when a remote food image fails to load (broken URL, hotlink, etc.). */
function bindFoodImageFallback(root, imgSelector) {
  if (!root || !root.querySelectorAll) return;
  var sel = imgSelector || "img";
  root.querySelectorAll(sel).forEach(function (img) {
    img.addEventListener("error", function onFoodImgErr() {
      img.removeEventListener("error", onFoodImgErr);
      if (img.getAttribute("data-food-img-fb") === "1") return;
      img.setAttribute("data-food-img-fb", "1");
      img.src = FOOD_PLACEHOLDER_IMAGE;
    });
  });
}
