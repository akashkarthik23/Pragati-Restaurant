-- Pragati — MySQL schema and seed data
-- Run: mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS taj_royale;
USE taj_royale;

DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS menu_items;

CREATE TABLE menu_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_display VARCHAR(32) NOT NULL,
  image_url TEXT NOT NULL,
  category ENUM('starters','mains','desserts','sides','beverages') NOT NULL,
  dietary_type ENUM('veg','non-veg') NOT NULL,
  spice_level TINYINT NULL,
  chef_recommended BOOLEAN DEFAULT FALSE,
  bestseller BOOLEAN DEFAULT FALSE
);

CREATE TABLE reservations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(64) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time VARCHAR(32) NOT NULL,
  guests INT NOT NULL,
  message TEXT,
  status VARCHAR(32) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO menu_items (name, description, price_display, image_url, category, dietary_type, spice_level, chef_recommended, bestseller) VALUES
('Paneer Tikka', 'Marinated cottage cheese cubes grilled to perfection in the tandoor', '₹350', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200&auto=format&fit=crop', 'starters', 'veg', 2, FALSE, TRUE),
('Chicken Seekh Kebab', 'Minced chicken mixed with herbs and spices, skewered and grilled', '₹420', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2940&auto=format&fit=crop', 'starters', 'non-veg', 2, FALSE, FALSE),
('Vegetable Samosa', 'Crispy pastry filled with spiced potatoes and peas', '₹250', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2940&auto=format&fit=crop', 'starters', 'veg', 1, FALSE, FALSE),
('Tandoori Prawns', 'Jumbo prawns marinated in yogurt and spices, cooked in tandoor', '₹650', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop', 'starters', 'non-veg', 2, TRUE, FALSE),
('Butter Chicken', 'Tender chicken in a rich buttery tomato sauce with aromatic spices', '₹450', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2940&auto=format&fit=crop', 'mains', 'non-veg', 2, TRUE, TRUE),
('Paneer Tikka Masala', 'Grilled cottage cheese cubes in a spiced tomato gravy', '₹380', 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1200&auto=format&fit=crop', 'mains', 'veg', 2, FALSE, FALSE),
('Lamb Biryani', 'Fragrant basmati rice cooked with tender lamb and signature spices', '₹520', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2874&auto=format&fit=crop', 'mains', 'non-veg', 3, FALSE, FALSE),
('Dal Makhani', 'Creamy black lentils simmered overnight with butter and spices', '₹320', 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=2940&auto=format&fit=crop', 'mains', 'veg', 1, TRUE, FALSE),
('Prawn Curry', 'Succulent prawns cooked in a coconut-based curry with coastal spices', '₹580', 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=1200&auto=format&fit=crop', 'mains', 'non-veg', 3, FALSE, FALSE),
('Gulab Jamun', 'Soft khoya dumplings soaked in rose-flavored sugar syrup', '₹220', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop', 'desserts', 'veg', NULL, FALSE, FALSE),
('Rasmalai', 'Soft cottage cheese patties soaked in sweetened, thickened milk', '₹250', 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1200&auto=format&fit=crop', 'desserts', 'veg', NULL, FALSE, TRUE),
('Garlic Naan', 'Soft leavened bread with garlic, baked in tandoor', '₹80', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop', 'sides', 'veg', NULL, FALSE, FALSE),
('Jeera Rice', 'Basmati rice tempered with cumin seeds', '₹180', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200&auto=format&fit=crop', 'sides', 'veg', NULL, FALSE, FALSE),
('Mango Lassi', 'Refreshing yogurt drink blended with sweet mangoes', '₹150', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1200&auto=format&fit=crop', 'beverages', 'veg', NULL, FALSE, FALSE),
('Masala Chai', 'Traditional Indian spiced tea with milk', '₹120', 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2940&auto=format&fit=crop', 'beverages', 'veg', NULL, FALSE, FALSE);

INSERT INTO menu_items (name, description, price_display, image_url, category, dietary_type, spice_level, chef_recommended, bestseller) VALUES
('Malai Kofta', 'Cottage cheese and vegetable dumplings in a rich, creamy cashew-tomato gravy', '₹340', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200&auto=format&fit=crop', 'mains', 'veg', 1, FALSE, FALSE),
('Chicken Biryani', 'Aromatic basmati rice layered with spiced chicken and saffron', '₹490', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop', 'mains', 'non-veg', 2, FALSE, TRUE),
('Palak Paneer', 'Fresh spinach puree with cubes of cottage cheese and gentle spices', '₹360', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop', 'mains', 'veg', 1, TRUE, FALSE),
('Mixed Vegetable Curry', 'Seasonal vegetables simmered in a tomato-onion masala gravy', '₹280', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop', 'mains', 'veg', 2, FALSE, FALSE),
('Roomali Roti', 'Paper-thin whole wheat bread cooked on an inverted griddle', '₹60', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop', 'sides', 'veg', NULL, FALSE, FALSE),
('Sweet Lassi', 'Chilled sweetened yogurt drink with a hint of cardamom', '₹130', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop', 'beverages', 'veg', NULL, FALSE, FALSE),
('Fresh Lime Soda', 'Sparkling lime refresher, sweet or salted', '₹100', 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1200&auto=format&fit=crop', 'beverages', 'veg', NULL, FALSE, FALSE);
