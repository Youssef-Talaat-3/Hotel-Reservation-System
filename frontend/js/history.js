document.addEventListener("DOMContentLoaded", () => {

  const historyList = document.getElementById("historyList");
  const clearAllBtn = document.getElementById("clearAllBtn");

  // Load history
  let bookingHistory = JSON.parse(localStorage.getItem("bookingHistory")) || [];

  function renderHistory() {
    historyList.innerHTML = "";

    if (bookingHistory.length === 0) {
      historyList.innerHTML = `
        <p style="padding:15px; background:#f5f5f5; border-radius:10px; text-align:center;">
          No bookings found.
        </p>
      `;
      return;
    }

    bookingHistory.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("history-card");

      card.innerHTML = `
        <h3>${item.hotelName}</h3>
        <p><strong>Check-in:</strong> ${item.checkIn}</p>
        <p><strong>Check-out:</strong> ${item.checkOut}</p>
        <p><strong>Guests:</strong> ${item.guests}</p>
        <p><strong>Nights:</strong> ${item.nights}</p>
        <p><strong>Total Price:</strong> $${item.totalPrice}</p>
        <button data-index="${index}" class="delete-btn">Delete</button>
      `;

      historyList.appendChild(card);
    });

    attachDeleteButtons();
  }

  function attachDeleteButtons() {
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");

        bookingHistory.splice(index, 1);

        localStorage.setItem("bookingHistory", JSON.stringify(bookingHistory));

        renderHistory();
      });
    });
  }

  clearAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all history?")) {
      bookingHistory = [];
      localStorage.setItem("bookingHistory", JSON.stringify([]));
      renderHistory();
    }
  });

  // Initial render
  renderHistory();
});
