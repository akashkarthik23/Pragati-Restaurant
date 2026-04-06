var GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=2940&auto=format&fit=crop",
    alt: "Dal Makhani",
    category: "food",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2874&auto=format&fit=crop",
    alt: "Lamb Biryani",
    category: "food",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2940&auto=format&fit=crop",
    alt: "Butter Chicken",
    category: "food",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=3271&auto=format&fit=crop",
    alt: "Paneer dish",
    category: "food",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop",
    alt: "Vegetable dish",
    category: "food",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1585937421612-70a008356c36?q=80&w=2636&auto=format&fit=crop",
    alt: "Prawn Curry",
    category: "food",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2940&auto=format&fit=crop",
    alt: "Restaurant interior",
    category: "ambiance",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2940&auto=format&fit=crop",
    alt: "Elegant dining area",
    category: "ambiance",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940&auto=format&fit=crop",
    alt: "Table setting",
    category: "ambiance",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2944&auto=format&fit=crop",
    alt: "Chef at work",
    category: "ambiance",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1586999768265-24af89630739?q=80&w=2874&auto=format&fit=crop",
    alt: "Bar area",
    category: "ambiance",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop",
    alt: "Restaurant exterior",
    category: "ambiance",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2940&auto=format&fit=crop",
    alt: "Private dining event",
    category: "events",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2940&auto=format&fit=crop",
    alt: "Wedding reception",
    category: "events",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2940&auto=format&fit=crop",
    alt: "Corporate event",
    category: "events",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2940&auto=format&fit=crop",
    alt: "Birthday celebration",
    category: "events",
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2940&auto=format&fit=crop",
    alt: "Celebration event",
    category: "events",
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2940&auto=format&fit=crop",
    alt: "Small gathering",
    category: "events",
  },
];

var galleryCat = "all";

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function filteredGallery() {
  if (galleryCat === "all") return GALLERY_IMAGES;
  return GALLERY_IMAGES.filter(function (img) {
    return img.category === galleryCat;
  });
}

function renderGallery() {
  var root = document.getElementById("gallery-grid");
  if (!root) return;
  root.innerHTML = filteredGallery()
    .map(function (img) {
      return (
        '<div class="image-overlay rounded-lg shadow-md cursor-pointer gallery-item" data-id="' +
        img.id +
        '" style="position:relative">' +
        '<img src="' +
        escapeAttr(img.src) +
        '" alt="' +
        escapeAttr(img.alt) +
        '" class="w-full h-64 object-cover" style="height:16rem;object-fit:cover;width:100%"/>' +
        '<div class="absolute inset-0 flex items-center justify-center" style="opacity:0;transition:opacity .3s;background:rgba(0,0,0,.3)" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0">' +
        '<span class="text-white text-sm">View</span>' +
        "</div>" +
        "</div>"
      );
    })
    .join("");

  root.querySelectorAll(".gallery-item").forEach(function (cell) {
    cell.addEventListener("click", function () {
      var id = Number(cell.getAttribute("data-id"));
      var img = GALLERY_IMAGES.find(function (x) {
        return x.id === id;
      });
      if (!img) return;
      openModal(img);
    });
  });
}

function openModal(img) {
  var m = document.getElementById("gallery-modal");
  var mi = document.getElementById("gallery-modal-img");
  var mc = document.getElementById("gallery-modal-cap");
  if (!m || !mi) return;
  mi.src = img.src;
  mi.alt = img.alt;
  if (mc) mc.textContent = img.alt;
  m.classList.add("modal--open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  var m = document.getElementById("gallery-modal");
  if (m) m.classList.remove("modal--open");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
  document.querySelectorAll("[data-gallery-cat]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      galleryCat = btn.getAttribute("data-gallery-cat");
      document.querySelectorAll("[data-gallery-cat]").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      renderGallery();
    });
  });
  renderGallery();
  var closeBtn = document.getElementById("gallery-modal-close");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  var modal = document.getElementById("gallery-modal");
  if (modal)
    modal.addEventListener("click", function (e) {
      if (e.target.id === "gallery-modal") closeModal();
    });
});
