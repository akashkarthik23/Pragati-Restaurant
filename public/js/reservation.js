var TIMES = [
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
  var timeSel = document.getElementById("res-time");
  if (timeSel) {
    timeSel.innerHTML =
      '<option value="">Select a time</option>' +
      TIMES.map(function (t) {
        return '<option value="' + t + '">' + t + "</option>";
      }).join("");
  }

  var form = document.getElementById("reservation-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();
    var name = document.getElementById("res-name").value.trim();
    var email = document.getElementById("res-email").value.trim();
    var phone = document.getElementById("res-phone").value.trim();
    var date = document.getElementById("res-date").value;
    var time = document.getElementById("res-time").value;
    var guests = document.getElementById("res-guests").value;
    var message = document.getElementById("res-message").value.trim();
    var ok = true;
    if (name.length < 2) {
      showFieldError("err-name", "Name must be at least 2 characters.");
      ok = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFieldError("err-email", "Please enter a valid email.");
      ok = false;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      showFieldError("err-phone", "Please enter a valid phone number.");
      ok = false;
    }
    if (!date) {
      showFieldError("err-date", "Please choose a date.");
      ok = false;
    }
    if (!time) {
      showFieldError("err-time", "Please select a time.");
      ok = false;
    }
    if (!guests) {
      showFieldError("err-guests", "Please select guests.");
      ok = false;
    }
    if (!ok) return;

    var submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    apiPostReservation({
      name: name,
      email: email,
      phone: phone,
      date: date,
      time: time,
      guests: Number(guests),
      message: message || undefined,
    })
      .then(function (body) {
        if (body && body.storage === "file") {
          showToast(
            "Reservation received",
            "We'll confirm soon. (Saved locally — connect MySQL to store in the database.)"
          );
        } else {
          showToast("Reservation received", "We'll confirm your booking shortly.");
        }
        form.reset();
      })
      .catch(function (err) {
        showToast("Booking failed", err.message || "Try again later.");
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
});

function showFieldError(id, msg) {
  var el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors() {
  ["err-name", "err-email", "err-phone", "err-date", "err-time", "err-guests"].forEach(
    function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = "";
    }
  );
}
