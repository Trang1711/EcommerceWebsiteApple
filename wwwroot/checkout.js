document.addEventListener("DOMContentLoaded", function () {
    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orderSummary = document.querySelector(".order-products"); // Vị trí hiển thị sản phẩm
    let orderTotal = document.querySelector(".order-total"); // Tổng tiền

    let totalPrice = 0;

    // Xóa nội dung cũ (nếu có)
    orderSummary.innerHTML = "";

    // Nếu giỏ hàng rỗng, hiển thị thông báo
    if (cart.length === 0) {
        orderSummary.innerHTML = "<div>Your cart is empty.</div>";
        orderTotal.textContent = "$0.00";
        return;
    }

    // Hiển thị từng sản phẩm
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        // Thêm sản phẩm vào danh sách
        orderSummary.innerHTML += `
            <div class="order-col">
                <div>${item.quantity}x ${item.name}</div>
                <div>$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });

    // Cập nhật tổng giá trị đơn hàng
    orderTotal.textContent = `$${totalPrice.toFixed(2)}`;
});


document.addEventListener("DOMContentLoaded", function () {
    // Lấy nút "Place order"
    const placeOrderButton = document.querySelector(".order-submit");

    // Gắn sự kiện click
    placeOrderButton.addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định (nếu có)

        // Xóa giỏ hàng trong localStorage
        localStorage.removeItem("cart");

        // Hiển thị thông báo thành công
        alert("Your payment was successful. Your order will be delivered to you soon.");

        // Chuyển hướng về trang chủ hoặc làm mới trang
        window.location.href = "index.html"; // Thay bằng đường dẫn bạn muốn
    });
});