// main.js - simple search handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.getElementById("location").value.trim();
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const guests = document.getElementById("guests").value;

    // Basic validation
    if (!location) {
      alert("Please enter a city or hotel name.");
      return;
    }

    // Build query string to pass to hotels.html
    const qs = new URLSearchParams({
      location,
      checkin,
      checkout,
      guests
    }).toString();

    // Redirect to hotels page for now (backend to be connected later)
    window.location.href = `hotels.html?${qs}`;
  });
});
