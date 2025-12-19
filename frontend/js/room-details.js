document.addEventListener("DOMContentLoaded", () => {

  // 1) Read hotel from localStorage
  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));

  if (!hotel) {
    console.error("No hotel data found!");
    return;
  }

  // 2) Fill page elements
  document.getElementById("hotelName").textContent = hotel.name;
  document.getElementById("hotelLocation").textContent = hotel.location;
  document.getElementById("hotelImage").src = hotel.image;

  // 3) Show nights & pricing
  const nights = bookingData?.nights || 1;
  const finalPrice = hotel.price * nights;

  document.getElementById("pricePerNight").textContent = `$${hotel.price}`;
  document.getElementById("nightsCount").textContent = nights;
  document.getElementById("totalPrice").textContent = `$${finalPrice}`;

  // 4) Add click handler for booking button
  document.getElementById("bookNowBtn").addEventListener("click", () => {

    // send all booking data to checkout
    const checkoutData = {
      hotel,
      bookingData,
      finalPrice
    };

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    window.location.href = "checkout.html";
  });

});
