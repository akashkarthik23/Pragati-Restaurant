document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ["err-c-name", "err-c-email", "err-c-phone", "err-c-subject", "err-c-message"].forEach(
      function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = "";
      }
    );

    var name = document.getElementById("c-name").value.trim();
    var email = document.getElementById("c-email").value.trim();
    var phone = document.getElementById("c-phone").value.trim();
    var subject = document.getElementById("c-subject").value.trim();
    var message = document.getElementById("c-message").value.trim();
    var ok = true;

    if (name.length < 2) {
      setErr("err-c-name", "Name must be at least 2 characters.");
      ok = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("err-c-email", "Please enter a valid email.");
      ok = false;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setErr("err-c-phone", "Please enter a valid phone number.");
      ok = false;
    }
    if (subject.length < 5) {
      setErr("err-c-subject", "Subject must be at least 5 characters.");
      ok = false;
    }
    if (message.length < 10) {
      setErr("err-c-message", "Message must be at least 10 characters.");
      ok = false;
    }
    if (!ok) return;

    console.log("Contact form:", { name, email, phone, subject, message });
    showToast(
      "Message sent",
      "We'll get back to you shortly."
    );
    form.reset();
  });
});

function setErr(id, msg) {
  var el = document.getElementById(id);
  if (el) el.textContent = msg;
}
