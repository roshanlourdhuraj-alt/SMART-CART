// =========================================
// SMARTCART CART JAVASCRIPT
// =========================================


// =========================================
// GET CART FROM LOCAL STORAGE
// =========================================

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// =========================================
// SHOW LOGGED-IN USER
// =========================================

const userData =
    JSON.parse(
        localStorage.getItem("smartCartUser")
    );


const welcomeUser =
    document.getElementById("welcomeUser");


if (userData && welcomeUser) {

    welcomeUser.textContent =
        "👤 Hello, " + userData.name;

}


// =========================================
// DISPLAY CART PRODUCTS
// =========================================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");


    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    // =====================================
    // EMPTY CART
    // =====================================

    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        updateTotal();

        return;
    }


    // Hide empty cart

    if (emptyCart) {
        emptyCart.style.display = "none";
    }


    // =====================================
    // DISPLAY PRODUCTS
    // =====================================

    cart.forEach(function(product, index) {

        const item =
            document.createElement("div");

        item.className = "cart-item";


        const quantity =
            Number(product.quantity || 1);


        const price =
            Number(product.price || 0);


        const itemTotal =
            price * quantity;


        // =================================
        // DELIVERY INFORMATION
        // =================================

        let deliveryText;
        let deliveryClass;


        if (
            product.fastDelivery === true ||
            String(product.category).toLowerCase() === "grocery"
        ) {

            deliveryText =
                "🚚 Fast Delivery: 1–2 Days";

            deliveryClass =
                "fast-delivery";

        }

        else {

            deliveryText =
                "🚚 Delivery: 3–5 Days";

            deliveryClass =
                "normal-delivery";

        }


        // =================================
        // PRODUCT CARD
        // =================================

        item.innerHTML = `

            <div class="cart-product-info">

                <h3>
                    ${product.name}
                </h3>


                <p>
                    Price: ₹${price}
                </p>


                <p>
                    Quantity: ${quantity}
                </p>


                <strong>
                    Total: ₹${itemTotal}
                </strong>


                <p class="${deliveryClass}">
                    ${deliveryText}
                </p>

            </div>


            <button
                class="remove-button"
                onclick="removeFromCart(${index})"
            >

                🗑️ Remove

            </button>

        `;


        cartItems.appendChild(item);

    });


    // Update total

    updateTotal();

}


// =========================================
// CALCULATE TOTAL
// =========================================

function updateTotal() {

    let total = 0;


    cart.forEach(function(product) {

        const price =
            Number(product.price || 0);


        const quantity =
            Number(product.quantity || 1);


        total +=
            price * quantity;

    });


    // Subtotal

    const subtotal =
        document.getElementById("subtotal");


    if (subtotal) {

        subtotal.textContent =
            "₹" + total;

    }


    // Total

    const totalElement =
        document.getElementById("total");


    if (totalElement) {

        totalElement.textContent =
            "₹" + total;

    }


    // Save total

    localStorage.setItem(
        "cartTotal",
        total
    );

}


// =========================================
// REMOVE PRODUCT
// =========================================

function removeFromCart(index) {

    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}


// =========================================
// GO TO CHECKOUT
// =========================================

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "🛒 Your cart is empty!"
        );

        return;
    }


    updateTotal();


    window.location.href =
        "checkout.html";

}


// =========================================
// LOGOUT
// =========================================

function logout() {

    localStorage.removeItem(
        "smartCartLoggedIn"
    );

    localStorage.removeItem(
        "smartCartUser"
    );

    localStorage.removeItem(
        "rememberedUsername"
    );


    window.location.href =
        "index.html";

}


// =========================================
// LOAD CART
// =========================================

displayCart();