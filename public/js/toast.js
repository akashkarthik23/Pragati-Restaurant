function showToast(title, description) {
  var root = document.getElementById("toast-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "toast-root";
    document.body.appendChild(root);
  }
  var t = document.createElement("div");
  t.className = "toast";
  t.innerHTML =
    "<strong>" +
    escapeHtml(title) +
    "</strong>" +
    (description ? "<small>" + escapeHtml(description) + "</small>" : "");
  root.appendChild(t);
  setTimeout(function () {
    t.remove();
  }, 4000);
}

function escapeHtml(s) {
  var d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}
