document.addEventListener("DOMContentLoaded", () => {

  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // لو في نقص بيانات نرجع للفنادق
  if (!hotel || !bookingData || !user) {
    alert("Missing confirmation data!");
    window.location.href = "hotels.html";
    return;
  }

  // عرض البيانات في الصفحة
  document.getElementById("confirmHotel").textContent = hotel.name;
  document.getElementById("confirmCheckIn").textContent = bookingData.checkIn;
  document.getElementById("confirmCheckOut").textContent = bookingData.checkOut;
  document.getElementById("confirmGuests").textContent = bookingData.guests;
  document.getElementById("confirmNights").textContent = bookingData.nights;
  document.getElementById("confirmTotal").textContent = hotel.price * bookingData.nights;

});
