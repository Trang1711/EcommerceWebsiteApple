
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn form load lại trang

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Danh sách tài khoản mặc định
    let validUsers = [
        { username: "admin", password: "12345" },
        { username: "user", password: "password" }
    ];

    // Lấy danh sách tài khoản từ localStorage (nếu có)
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Gộp danh sách tài khoản mặc định với tài khoản đăng ký
    let allUsers = [...validUsers, ...storedUsers];

    // Kiểm tra xem username & password có hợp lệ không
    let isValid = allUsers.some(user => user.username === username && user.password === password);

    if (isValid) {
        alert("Login successful!");
        window.location.href = "index.html"; // Chuyển hướng nếu đăng nhập thành công
    } else {
        alert("Wrong account or password! Please try again.");
    }
});
