document.addEventListener("DOMContentLoaded", () => {

  // 1) Read book data
  const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

  if (!checkoutData) {
    console.error("No checkout data found!");
    return;
  }

  const hotel = checkoutData.hotel;
  const booking = checkoutData.bookingData;
  const finalPrice = checkoutData.finalPrice;

  // 2) Fill page UI
  document.getElementById("coHotelName").textContent = hotel.name;
  document.getElementById("coLocation").textContent = hotel.location;
  document.getElementById("coHotelImage").src = hotel.image;

  document.getElementById("coCheckIn").textContent = booking.checkIn;
  document.getElementById("coCheckOut").textContent = booking.checkOut;
  document.getElementById("coGuests").textContent = booking.guests;

  document.getElementById("coNights").textContent = booking.nights;
  document.getElementById("coTotalPrice").textContent = `$${finalPrice}`;

  // 3) Confirm Booking Handler
  document.getElementById("confirmBookingBtn").addEventListener("click", () => {

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();

    if (!name || !email || !phone) {
      alert("Please fill all customer information.");
      return;
    }

    // create final booking record
    const completedBooking = {
      hotel,
      booking,
      finalPrice,
      customer: {
        name,
        email,
        phone
      },
      time: new Date().toLocaleString()
    };

    // save booking history
    const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    history.push(completedBooking);
    localStorage.setItem("bookingHistory", JSON.stringify(history));

    // redirect to success page
    window.location.href = "success.html";
  });

});
