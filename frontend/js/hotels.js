// hotels.js
document.addEventListener("DOMContentLoaded", () => {
  const hotelsContainer = document.getElementById("hotelsContainer");

  // Real hotel images
  const hotels = [
    {
      id: 1,
      name: "Grand Palace Hotel",
      location: "Downtown",
      price: 120,
      image: "images/hotel1.jpg"
    },
    {
      id: 2,
      name: "Sea Breeze Resort",
      location: "Beachfront",
      price: 95,
      image: "images/hotel2.jpg"},

    {
      id: 3,
      name: "City Comfort Inn",
      location: "Near Airport",
      price: 70,
      image: "images/hotel3.jpg"
    }
  ];

  function computeNights(checkin, checkout) {
    if (!checkin || !checkout) return 1;
    try {
      const inDate = new Date(checkin);
      const outDate = new Date(checkout);
      const diff = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch (e) {
      return 1;
    }
  }

  hotels.forEach(hotel => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-img">
        <img src="${hotel.image}" alt="${hotel.name}" 
             style="width:110px;height:80px;object-fit:cover;border-radius:6px;">
      </div>
      <div class="card-body">
        <h4>${hotel.name}</h4>
        <p>${hotel.location} • From $${hotel.price} / night</p>
        <a href="#" class="btn view-btn" data-id="${hotel.id}">View Rooms</a>
      </div>
    `;

    const viewBtn = card.querySelector(".view-btn");
    viewBtn.addEventListener("click", (e) => {
      e.preventDefault();

      localStorage.setItem("selectedHotel", JSON.stringify(hotel));

      const searchData = JSON.parse(localStorage.getItem("searchData")) || {};

      const nights = computeNights(searchData.checkin, searchData.checkout);

      const bookingData = {
        checkIn: searchData.checkin || "",
        checkOut: searchData.checkout || "",
        guests: searchData.guests || "1",
        nights: nights
      };

      localStorage.setItem("bookingData", JSON.stringify(bookingData));

      window.location.href = `room-details.html?id=${hotel.id}`;
    });

    hotelsContainer.appendChild(card);
  });
});
