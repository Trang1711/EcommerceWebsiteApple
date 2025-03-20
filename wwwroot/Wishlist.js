document.addEventListener("DOMContentLoaded", function () {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    renderWishlist();

    document.querySelectorAll(".add-to-wishlist").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định nếu có
            let productElement = this.closest(".product");
            let product = {
                id: productElement.querySelector(".add-to-cart-btn").dataset.id,
                name: productElement.querySelector(".product-name a").textContent,
                price: productElement.querySelector(".product-price").textContent,
                img: productElement.querySelector(".product-img img").src
            };
            addToWishlist(product);
        });
    });

    document.getElementById("wishlist-btn").addEventListener("click", function (event) {
        event.preventDefault();
        displayWishlist();
    });
});

function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
    }
    
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist();
}

function renderWishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let wishlistQty = document.getElementById("wishlist-qty");
    if (wishlistQty) {
        wishlistQty.textContent = wishlist.length;
    }
}

function displayWishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    console.log("Your Wishlist:", wishlist);
}
