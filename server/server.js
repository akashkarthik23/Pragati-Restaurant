const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { pool } = require("./db");
const { saveReservationToFile } = require("./reservation-file-store");

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "..", "public");

app.use(cors());
app.use(express.json());

function mapMenuRow(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price_display,
    image: row.image_url,
    category: row.category,
    type: row.dietary_type,
    spiceLevel: row.spice_level,
    chefRecommended: Boolean(row.chef_recommended),
    bestseller: Boolean(row.bestseller),
  };
}

/* ---------- Menu (CRUD) ---------- */
app.get("/menu", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM menu_items ORDER BY id ASC"
    );
    res.json(rows.map(mapMenuRow));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load menu" });
  }
});

app.post("/menu", async (req, res) => {
  try {
    const b = req.body;
    const [result] = await pool.query(
      `INSERT INTO menu_items (name, description, price_display, image_url, category, dietary_type, spice_level, chef_recommended, bestseller)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        b.name,
        b.description || "",
        b.price,
        b.image,
        b.category,
        b.type,
        b.spiceLevel ?? null,
        Boolean(b.chefRecommended),
        Boolean(b.bestseller),
      ]
    );
    const [rows] = await pool.query("SELECT * FROM menu_items WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(mapMenuRow(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Could not create menu item" });
  }
});

app.put("/menu/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const b = req.body;
    await pool.query(
      `UPDATE menu_items SET name=?, description=?, price_display=?, image_url=?, category=?, dietary_type=?, spice_level=?, chef_recommended=?, bestseller=? WHERE id=?`,
      [
        b.name,
        b.description || "",
        b.price,
        b.image,
        b.category,
        b.type,
        b.spiceLevel ?? null,
        Boolean(b.chefRecommended),
        Boolean(b.bestseller),
        id,
      ]
    );
    const [rows] = await pool.query("SELECT * FROM menu_items WHERE id = ?", [
      id,
    ]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(mapMenuRow(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Could not update menu item" });
  }
});

app.delete("/menu/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [r] = await pool.query("DELETE FROM menu_items WHERE id = ?", [id]);
    if (r.affectedRows === 0)
      return res.status(404).json({ error: "Not found" });
    res.json({ ok: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete menu item" });
  }
});

/* ---------- Reservations (CRUD) ---------- */
app.post("/reservation", async (req, res) => {
  const { name, email, phone, date, time, guests, message } = req.body || {};
  if (!name || !email || !phone || !date || !time || guests == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const payload = {
    name,
    email,
    phone,
    reservation_date: date,
    reservation_time: time,
    guests: Number(guests),
    message: message || null,
  };
  try {
    const [result] = await pool.query(
      `INSERT INTO reservations (name, email, phone, reservation_date, reservation_time, guests, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.name,
        payload.email,
        payload.phone,
        payload.reservation_date,
        payload.reservation_time,
        payload.guests,
        payload.message,
      ]
    );
    const [rows] = await pool.query(
      "SELECT * FROM reservations WHERE id = ?",
      [result.insertId]
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.warn("Reservation: MySQL unavailable, using file store:", err.message);
    try {
      const saved = await saveReservationToFile(payload);
      return res.status(201).json(saved);
    } catch (fileErr) {
      console.error(fileErr);
      return res.status(500).json({ error: "Could not save reservation" });
    }
  }
});

app.get("/reservations", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM reservations ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load reservations" });
  }
});

app.get("/reservation/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [rows] = await pool.query(
      "SELECT * FROM reservations WHERE id = ?",
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load reservation" });
  }
});

app.put("/reservation/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const b = req.body;
    await pool.query(
      `UPDATE reservations SET name=?, email=?, phone=?, reservation_date=?, reservation_time=?, guests=?, message=?, status=? WHERE id=?`,
      [
        b.name,
        b.email,
        b.phone,
        b.reservation_date,
        b.reservation_time,
        b.guests,
        b.message ?? null,
        b.status || "pending",
        id,
      ]
    );
    const [rows] = await pool.query(
      "SELECT * FROM reservations WHERE id = ?",
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Could not update reservation" });
  }
});

app.delete("/reservation/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [r] = await pool.query("DELETE FROM reservations WHERE id = ?", [id]);
    if (r.affectedRows === 0)
      return res.status(404).json({ error: "Not found" });
    res.json({ ok: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete reservation" });
  }
});

/* ---------- Static site ---------- */
app.use(express.static(publicDir));

app.listen(PORT, () => {
  console.log(`Pragati server: http://localhost:${PORT}`);
});
