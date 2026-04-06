/**
 * Full menu with prices — used when /menu API is empty or unavailable (e.g. MySQL not set up).
 * Shape matches API: id, name, description, price, image, category, type, spiceLevel?, chefRecommended?, bestseller?
 */
var MENU_DEFAULT_IMAGE =
  typeof FOOD_PLACEHOLDER_IMAGE !== "undefined"
    ? FOOD_PLACEHOLDER_IMAGE
    : "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=1200&auto=format&fit=crop";

function normalizeMenuName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

var MENU_ITEMS_FALLBACK = [
  {
    id: 1,
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled to perfection in the tandoor",
    price: "₹350",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200&auto=format&fit=crop",
    category: "starters",
    type: "veg",
    spiceLevel: 2,
    bestseller: true,
  },
  {
    id: 2,
    name: "Chicken Seekh Kebab",
    description: "Minced chicken mixed with herbs and spices, skewered and grilled",
    price: "₹420",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2940&auto=format&fit=crop",
    category: "starters",
    type: "non-veg",
    spiceLevel: 2,
  },
  {
    id: 3,
    name: "Vegetable Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas",
    price: "₹250",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2940&auto=format&fit=crop",
    category: "starters",
    type: "veg",
    spiceLevel: 1,
  },
  {
    id: 4,
    name: "Tandoori Prawns",
    description: "Jumbo prawns marinated in yogurt and spices, cooked in tandoor",
    price: "₹650",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
    category: "starters",
    type: "non-veg",
    spiceLevel: 2,
    chefRecommended: true,
  },
  {
    id: 5,
    name: "Butter Chicken",
    description: "Tender chicken in a rich buttery tomato sauce with aromatic spices",
    price: "₹450",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2940&auto=format&fit=crop",
    category: "mains",
    type: "non-veg",
    spiceLevel: 2,
    bestseller: true,
    chefRecommended: true,
  },
  {
    id: 6,
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese cubes in a spiced tomato gravy",
    price: "₹380",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1200&auto=format&fit=crop",
    category: "mains",
    type: "veg",
    spiceLevel: 2,
  },
  {
    id: 7,
    name: "Lamb Biryani",
    description: "Fragrant basmati rice cooked with tender lamb and signature spices",
    price: "₹520",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2874&auto=format&fit=crop",
    category: "mains",
    type: "non-veg",
    spiceLevel: 3,
  },
  {
    id: 8,
    name: "Dal Makhani",
    description: "Creamy black lentils simmered overnight with butter and spices",
    price: "₹320",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=2940&auto=format&fit=crop",
    category: "mains",
    type: "veg",
    spiceLevel: 1,
    chefRecommended: true,
  },
  {
    id: 9,
    name: "Prawn Curry",
    description: "Succulent prawns cooked in a coconut-based curry with coastal spices",
    price: "₹580",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=1200&auto=format&fit=crop",
    category: "mains",
    type: "non-veg",
    spiceLevel: 3,
  },
  {
    id: 10,
    name: "Gulab Jamun",
    description: "Soft khoya dumplings soaked in rose-flavored sugar syrup",
    price: "₹220",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop",
    category: "desserts",
    type: "veg",
  },
  {
    id: 11,
    name: "Rasmalai",
    description: "Soft cottage cheese patties soaked in sweetened, thickened milk",
    price: "₹250",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1200&auto=format&fit=crop",
    category: "desserts",
    type: "veg",
    bestseller: true,
  },
  {
    id: 12,
    name: "Garlic Naan",
    description: "Soft leavened bread with garlic, baked in tandoor",
    price: "₹80",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop",
    category: "sides",
    type: "veg",
  },
  {
    id: 13,
    name: "Jeera Rice",
    description: "Basmati rice tempered with cumin seeds",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200&auto=format&fit=crop",
    category: "sides",
    type: "veg",
  },
  {
    id: 14,
    name: "Mango Lassi",
    description: "Refreshing yogurt drink blended with sweet mangoes",
    price: "₹150",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1200&auto=format&fit=crop",
    category: "beverages",
    type: "veg",
  },
  {
    id: 15,
    name: "Masala Chai",
    description: "Traditional Indian spiced tea with milk",
    price: "₹120",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2940&auto=format&fit=crop",
    category: "beverages",
    type: "veg",
  },
  {
    id: 16,
    name: "Malai Kofta",
    description: "Cottage cheese and vegetable dumplings in a rich, creamy cashew-tomato gravy",
    price: "₹340",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200&auto=format&fit=crop",
    category: "mains",
    type: "veg",
    spiceLevel: 1,
  },
  {
    id: 17,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice layered with spiced chicken and saffron",
    price: "₹490",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
    category: "mains",
    type: "non-veg",
    spiceLevel: 2,
    bestseller: true,
  },
  {
    id: 18,
    name: "Palak Paneer",
    description: "Fresh spinach puree with cubes of cottage cheese and gentle spices",
    price: "₹360",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop",
    category: "mains",
    type: "veg",
    spiceLevel: 1,
    chefRecommended: true,
  },
  {
    id: 19,
    name: "Mixed Vegetable Curry",
    description: "Seasonal vegetables simmered in a tomato-onion masala gravy",
    price: "₹280",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
    category: "mains",
    type: "veg",
    spiceLevel: 2,
  },
  {
    id: 20,
    name: "Roomali Roti",
    description: "Paper-thin whole wheat bread cooked on an inverted griddle",
    price: "₹60",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop",
    category: "sides",
    type: "veg",
  },
  {
    id: 21,
    name: "Sweet Lassi",
    description: "Chilled sweetened yogurt drink with a hint of cardamom",
    price: "₹130",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop",
    category: "beverages",
    type: "veg",
  },
  {
    id: 22,
    name: "Fresh Lime Soda",
    description: "Sparkling lime refresher — sweet or salted",
    price: "₹100",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1200&auto=format&fit=crop",
    category: "beverages",
    type: "veg",
  },
];

function mergeMenuImagesFromFallback(apiList) {
  var byId = {};
  var byName = {};
  MENU_ITEMS_FALLBACK.forEach(function (m) {
    byId[m.id] = m.image;
    byName[normalizeMenuName(m.name)] = m.image;
  });
  return apiList.map(function (item) {
    var cur = item.image && String(item.image).trim();
    var fromFallback = byId[item.id] || byName[normalizeMenuName(item.name)];
    if (!cur) {
      return Object.assign({}, item, {
        image: fromFallback || MENU_DEFAULT_IMAGE,
      });
    }
    if (fromFallback) return Object.assign({}, item, { image: fromFallback });
    return item;
  });
}

function getMenuItems() {
  return fetch("/menu")
    .then(function (r) {
      if (!r.ok) throw new Error("Menu HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      if (Array.isArray(data) && data.length > 0) {
        return mergeMenuImagesFromFallback(data);
      }
      return MENU_ITEMS_FALLBACK.slice();
    })
    .catch(function () {
      return MENU_ITEMS_FALLBACK.slice();
    });
}
