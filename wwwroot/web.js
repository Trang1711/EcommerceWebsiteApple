// Mảng để lưu trữ các sản phẩm trong giỏ hàng
let cart = [];

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productId, productName, productPrice) {
  const product = {
    id: productId,
    name: productName,
    price: parseFloat(productPrice),
  };
  cart.push(product);
  updateCart();
}

// Hàm cập nhật giỏ hàng (cập nhật số lượng sản phẩm và hiển thị trong giỏ hàng)
function updateCart() {
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;

  // Cập nhật các sản phẩm trong dropdown
  const dropdownCartItems = document.getElementById('dropdown-cart-items');
  dropdownCartItems.innerHTML = '';  // Xóa nội dung cũ
  cart.forEach((product, index) => {
    const productElement = document.createElement('div');
    productElement.classList.add('cart-item');
    productElement.innerHTML = `${product.name} - $${product.price.toFixed(2)}`;
    dropdownCartItems.appendChild(productElement);
  });

  // Tính tổng tiền và hiển thị
  const dropdownCartTotal = document.getElementById('dropdown-cart-total');
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  dropdownCartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Hàm xử lý checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  // Hiển thị thông báo thanh toán
  alert('Proceeding to checkout. Total: $' + cart.reduce((sum, product) => sum + product.price, 0).toFixed(2));

  // Xóa giỏ hàng sau khi thanh toán
  cart = [];
  updateCart();
  closeModal();
}

// Hàm mở modal giỏ hàng
function openModal() {
  document.getElementById('cart-modal').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

// Hàm đóng modal giỏ hàng
function closeModal() {
  document.getElementById('cart-modal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

// Đảm bảo JavaScript chạy sau khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', function () {
  // Lắng nghe sự kiện khi nhấn vào nút "Add to Cart"
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productElement = button.closest('.product');  // Tìm sản phẩm gần nhất
      const productId = productElement.getAttribute('data-product-id');  // Lấy ID sản phẩm
      const productName = productElement.querySelector('.product-name').textContent;  // Lấy tên sản phẩm
      const productPrice = productElement.querySelector('.product-price').textContent.replace('$', '').trim();  // Lấy giá sản phẩm

      addToCart(productId, productName, productPrice);
      openModal(); // Mở modal khi có sản phẩm
    });
  });
});
