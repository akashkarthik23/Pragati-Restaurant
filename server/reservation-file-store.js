const fs = require("fs").promises;
const path = require("path");

const FILE = path.join(__dirname, "data", "reservations.json");

/**
 * When MySQL is unavailable, bookings are appended here so the UI still succeeds.
 */
async function saveReservationToFile(row) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  let list = [];
  try {
    const raw = await fs.readFile(FILE, "utf8");
    list = JSON.parse(raw);
    if (!Array.isArray(list)) list = [];
  } catch (e) {
    list = [];
  }
  const id = `local-${Date.now()}`;
  const created = new Date().toISOString();
  const full = {
    id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    reservation_date: row.reservation_date,
    reservation_time: row.reservation_time,
    guests: row.guests,
    message: row.message,
    status: "pending",
    created_at: created,
    storage: "file",
  };
  list.unshift(full);
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf8");
  return full;
}

module.exports = { saveReservationToFile, FILE };
