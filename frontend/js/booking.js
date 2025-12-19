document.addEventListener("DOMContentLoaded", () => {

  // 1) Load logged user
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("You must login first!");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userName").textContent = user.name;
  document.getElementById("userEmail").textContent = user.email;

  // 2) Load hotel + booking info
  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));

  if (!hotel || !bookingData) {
    alert("Missing booking information!");
    window.location.href = "hotels.html";
    return;
  }

  // Fill hotel section
  document.getElementById("hotelName").textContent = hotel.name;
  document.getElementById("hotelDesc").textContent = hotel.description || "No description available.";
  document.getElementById("hotelImage").src = hotel.image;
  document.getElementById("hotelPrice").textContent = `$${hotel.price} / night`;

  // Fill booking details
  document.getElementById("checkIn").textContent = bookingData.checkIn || "-";
  document.getElementById("checkOut").textContent = bookingData.checkOut || "-";
  document.getElementById("guestCount").textContent = bookingData.guests;
  document.getElementById("nights").textContent = bookingData.nights;

  const total = hotel.price * bookingData.nights;
  document.getElementById("totalPrice").textContent = `$${total}`;

  // 3) Confirm booking
  document.getElementById("confirmBookingBtn").addEventListener("click", () => {

    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    reservations.push({
      userEmail: user.email,
      hotelName: hotel.name,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      nights: bookingData.nights,
      total: total,
      description: hotel.description,
      date: new Date().toLocaleString()
    });

    localStorage.setItem("reservations", JSON.stringify(reservations));

    window.location.href = "booking-confirmation.html";
  });

});
