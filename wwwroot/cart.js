document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    renderCart();
    renderCartPage();

    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", function () {
            let product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                img: this.dataset.img,
                quantity: 1
            };
            addToCart(product);
        });
    });

    let checkoutButtons = document.querySelectorAll("#checkout, #checkout-btn");
    checkoutButtons.forEach(checkoutButton => {
        if (checkoutButton) {
            checkoutButton.addEventListener("click", function (event) {
                event.preventDefault();
                checkout();
            });
        }
    });
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    renderCartPage();
}

function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let cartQty = document.getElementById("cart-qty");
    let cartTotal = document.getElementById("cart-total");
    let cartItemCount = document.getElementById("cart-count");
    let totalPrice = 0;
    let totalQuantity = 0;
    
    if (cartContainer) {
        cartContainer.innerHTML = "";
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            totalQuantity += item.quantity;
            cartContainer.innerHTML += `
                <div class="product-widget" data-id="${item.id}">
                    <div class="product-img">
                        <img src="${item.img}" alt="${item.name}">
                    </div>
                    <div class="product-body">
                        <h3 class="product-name"><a href="#">${item.name}</a></h3>
                        <h4 class="product-price"><span class="qty">${item.quantity}x</span> $${(item.price * item.quantity).toFixed(2)}</h4>
                    </div>
                    <button class="delete" data-id="${item.id}"><i class="fa fa-close"></i></button>
                </div>
            `;
        });
    }
    
    if (cartTotal) cartTotal.textContent = totalPrice.toFixed(2);
    if (cartQty) cartQty.textContent = totalQuantity;
    if (cartItemCount) cartItemCount.textContent = totalQuantity;
    
    document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", function () {
            removeFromCart(this.dataset.id);
        });
    });
}

function renderCartPage() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.getElementById("cart-table");
    let cartTotal = document.getElementById("cart-total");
    let totalPrice = 0;
    
    if (cartTable) {
        cartTable.innerHTML = "";
        cart.forEach(item => {
            let itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            cartTable.innerHTML += `
                <tr data-id="${item.id}">
                    <td><img src="${item.img}" width="50"></td>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><input type="number" class="cart-quantity" data-id="${item.id}" value="${item.quantity}" min="1"></td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td><button class="remove-from-cart" data-id="${item.id}">X</button></td>
                </tr>
            `;
        });
        cartTotal.textContent = totalPrice.toFixed(2);
    }
    
    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", function () {
            removeFromCart(this.dataset.id);
        });
    });
    
    document.querySelectorAll(".cart-quantity").forEach(input => {
        input.addEventListener("change", function () {
            updateQuantity(this.dataset.id, this.value);
        });
    });
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    renderCartPage();
}

function updateQuantity(id, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(item => item.id === id);
    if (product) {
        product.quantity = parseInt(quantity);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartPage();
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before checking out.");
        return;
    }
    
    alert("You will be redirected to the checkout page to pay for the products in your cart.");
    window.location.href = "checkout.html";
}