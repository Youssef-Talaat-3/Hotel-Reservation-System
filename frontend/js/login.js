document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    // 🟢 Save logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert(`Welcome back, ${user.name}!`);
    window.location.href = "index.html";
  });
});
