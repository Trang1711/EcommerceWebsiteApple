document.getElementById("signup-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn form load lại trang

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let role = document.getElementById("role").value;

  if (username && password) {
      let users = JSON.parse(localStorage.getItem("users")) || []; // Lấy danh sách người dùng từ localStorage
      users.push({ username, password, role }); // Thêm người dùng mới
      localStorage.setItem("users", JSON.stringify(users)); // Lưu lại danh sách

      alert("Sign up successful! Now you can log in.");
      window.location.href = "login.html"; // Chuyển sang trang đăng nhập
  } else {
      alert("Please fill in all fields.");
  }
});
