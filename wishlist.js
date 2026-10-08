// =========================================
// SMARTCART WISHLIST JAVASCRIPT
// =========================================

const wishlistContainer =
    document.getElementById("wishlistContainer");


// LOAD WISHLIST

function loadWishlist() {

    const wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlistContainer) {
        return;
    }

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `
            <div class="empty-wishlist">
                <h2>Your Wishlist is Empty ❤️</h2>
                <p>Add your favourite products from the Products page.</p>
                <a href="products.html">
                    Continue Shopping
                </a>
            </div>
        `;

        return;
    }


    wishlist.forEach(function (product, index) {

        const card = document.createElement("div");

        card.className = "wishlist-card";


        card.innerHTML = `

            <div class="wishlist-image">

                ${
                    product.image
                    ? `<img src="${product.image}" alt="${product.name}">`
                    : `<div class="no-image">🛍️</div>`
                }

            </div>


            <div class="wishlist-details">

                <h3>${product.name}</h3>

                <p class="wishlist-price">
                    ₹${Number(product.price).toLocaleString("en-IN")}
                </p>


                <button
                    type="button"
                    onclick="moveToCart(${index})"
                >
                    🛒 Add to Cart
                </button>


                <button
                    type="button"
                    onclick="removeFromWishlist(${index})"
                >
                    🗑️ Remove
                </button>

            </div>

        `;


        wishlistContainer.appendChild(card);

    });

}


// REMOVE FROM WISHLIST

function removeFromWishlist(index) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];


    wishlist.splice(index, 1);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    loadWishlist();

}


// MOVE WISHLIST PRODUCT TO CART

function moveToCart(index) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];


    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const product = wishlist[index];


    const existingProduct = cart.find(function (item) {

        return item.name === product.name;

    });


    if (existingProduct) {

        existingProduct.quantity =
            (existingProduct.quantity || 1) + 1;

    }

    else {

        cart.push({

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    wishlist.splice(index, 1);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    alert("Product moved to cart 🛒");


    loadWishlist();

}


// PAGE LOAD

loadWishlist();