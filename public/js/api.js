function apiGetMenu() {
  return fetch("/menu").then(function (r) {
    if (!r.ok) throw new Error("Could not load menu");
    return r.json();
  });
}

function apiPostReservation(payload) {
  return fetch("/reservation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(function (r) {
    return r.text().then(function (text) {
      var body = {};
      if (text) {
        try {
          body = JSON.parse(text);
        } catch (e) {
          body = { error: text.slice(0, 120) || "Invalid server response" };
        }
      }
      if (!r.ok) throw new Error(body.error || "Booking failed");
      return body;
    });
  });
}
