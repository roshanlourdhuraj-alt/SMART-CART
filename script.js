// =========================================
// SMARTCART CART JAVASCRIPT
// =========================================


// GET CART PRODUCTS

let cart = JSON.parse(

    localStorage.getItem("cart")

) || [];


// DISPLAY CART

function displayCart() {


    const cartItems =

        document.getElementById(

            "cartItems"

        );


    const emptyCart =

        document.getElementById(

            "emptyCart"

        );


    const subtotalElement =

        document.getElementById(

            "subtotal"

        );


    const totalElement =

        document.getElementById(

            "total"

        );


    // Empty cart

    if (cart.length === 0) {


        cartItems.style.display = "none";

        emptyCart.style.display = "block";

        subtotalElement.textContent = "₹0";

        totalElement.textContent = "₹0";

        return;

    }


    // Show products

    cartItems.style.display = "block";

    emptyCart.style.display = "none";


    let total = 0;


    cartItems.innerHTML = "";


    cart.forEach(function(product, index) {


        total += product.price;


        const productDiv =

            document.createElement("div");


        productDiv.className =

            "cart-product";


        productDiv.innerHTML = `

            <div class="cart-product-icon">

                🛍️

            </div>


            <div class="cart-product-details">

                <h3>

                    ${product.name}

                </h3>


                <p>

                    Price: ₹${product.price}

                </p>

            </div>


            <button

                class="remove-button"

                onclick="removeProduct(${index})"

            >

                🗑️ Remove

            </button>

        `;


        cartItems.appendChild(productDiv);

    });


    subtotalElement.textContent =

        "₹" + total;


    totalElement.textContent =

        "₹" + total;

}


// REMOVE PRODUCT

function removeProduct(index) {


    cart.splice(index, 1);


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    displayCart();

}


// CHECKOUT

function checkout() {


    if (cart.length === 0) {


        alert(

            "Your cart is empty!"

        );


        return;

    }


    alert(

        "Order placed successfully! 🎉"

    );


    localStorage.removeItem("cart");


    cart = [];


    displayCart();

}


// RUN WHEN PAGE LOADS

displayCart();
function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty! 🛒"
        );

        return;

    }


    window.location.href =
        "checkout.html";

}