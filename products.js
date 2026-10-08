// =========================================
// SMARTCART PRODUCTS JAVASCRIPT
// =========================================


// FILTER PRODUCTS

function filterProducts(category, clickedButton) {

    const products = document.querySelectorAll(
        ".all-product-card"
    );

    const buttons = document.querySelectorAll(
        ".product-filter-btn"
    );

    buttons.forEach(function (button) {
        button.classList.remove("active");
    });

    clickedButton.classList.add("active");

    products.forEach(function (product) {

        if (
            category === "all" ||
            product.classList.contains(category)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


// SEARCH PRODUCTS

function searchAllProducts() {

    const searchInput = document.getElementById(
        "productSearch"
    );

    const searchValue = searchInput.value
        .toLowerCase()
        .trim();

    const products = document.querySelectorAll(
        ".all-product-card"
    );

    let found = false;

    products.forEach(function (product) {

        const productName = product
            .getAttribute("data-name")
            .toLowerCase();

        if (productName.includes(searchValue)) {

            product.style.display = "block";

            found = true;

        } else {

            product.style.display = "none";

        }

    });

    const noProductMessage =
        document.getElementById(
            "noProductMessage"
        );

    if (found || searchValue === "") {

        noProductMessage.style.display = "none";

    } else {

        noProductMessage.style.display = "block";

    }

}

// =========================================
// ADD PRODUCT TO CART
// =========================================

function addProductToCart(
    productName,
    price,
    category = "",
    image = ""
) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const delivery =
        category.toLowerCase() === "grocery"
            ? "1–2 Days"
            : "3–5 Days";


    const fastDelivery =
        category.toLowerCase() === "grocery";


    cart.push({

        name: productName,

        price: Number(price),

        quantity: 1,

        category: category,

        image: image,

        delivery: delivery,

        fastDelivery: fastDelivery

    });


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        productName +
        " added to cart 🛒"
    );

}

// =========================================
// SMARTCART VOICE SEARCH
// =========================================

let smartCartRecognition = null;
let voiceIsRunning = false;

function startVoiceSearch() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported in this browser."
        );

        return;
    }


    // Prevent multiple recognition sessions
    if (voiceIsRunning) {
        return;
    }


    smartCartRecognition =
        new SpeechRecognition();


    smartCartRecognition.lang = "en-IN";

    smartCartRecognition.continuous = false;

    smartCartRecognition.interimResults = false;

    smartCartRecognition.maxAlternatives = 1;


    const button =
        document.getElementById("voiceSearchBtn");


    voiceIsRunning = true;


    if (button) {

        button.innerHTML =
            "🎙️ Listening...";

        button.disabled = true;
    }


    smartCartRecognition.onstart = function () {

        console.log(
            "SmartCart voice recognition started"
        );

    };


    smartCartRecognition.onresult = function (event) {

    const spokenText =
        event.results[0][0].transcript
            .trim();

    console.log("Voice text:", spokenText);

    const searchInput =
        document.getElementById("productSearch");

    if (!searchInput) {
        console.log("productSearch input not found");
        return;
    }

    // Put voice text into search box
    searchInput.value = spokenText;

    // Run existing product search
    searchAllProducts();
};

    smartCartRecognition.onerror =
        function (event) {

            console.log(
                "Voice recognition:",
                event.error
            );


            // Don't show unnecessary error
            // for normal browser cancellation
            if (
                event.error !== "aborted" &&
                event.error !== "no-speech"
            ) {

                alert(
                    "Voice recognition error: " +
                    event.error
                );

            }

        };


    smartCartRecognition.onend =
        function () {

            voiceIsRunning = false;


            if (button) {

                button.innerHTML =
                    "🎤 Voice Search";

                button.disabled = false;

            }


            smartCartRecognition = null;

        };


    try {

        smartCartRecognition.start();

    }

    catch (error) {

        console.log(
            "Voice start error:",
            error
        );

        voiceIsRunning = false;

        if (button) {

            button.innerHTML =
                "🎤 Voice Search";

            button.disabled = false;

        }

    }

}
// =========================================
// GET SEARCH FROM HOME PAGE
// =========================================

function loadHomeSearch() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const searchValue =
        params.get("search");

    if (!searchValue) {
        return;
    }


    const searchInput =
        document.getElementById("productSearch");


    if (!searchInput) {
        return;
    }


    searchInput.value = searchValue;


    searchAllProducts();
}


document.addEventListener(
    "DOMContentLoaded",
    loadHomeSearch
);
// =========================================
// ADD PRODUCT TO WISHLIST
// =========================================

async function addToWishlist(productName, price, image = "", productId = "") {

    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("smartCartUser"));

    if (!user) {
        alert("Please login first to add products to wishlist ❤️");
        return;
    }

    const userId = user.id;

    // Local wishlist
    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    // Check duplicate
    const alreadyExists = wishlist.some(function(product) {
        return product.name === productName;
    });

    if (alreadyExists) {
        alert(productName + " is already in your wishlist ❤️");
        return;
    }

    // Save to database
    try {

        const response = await fetch("http://localhost:3000/add-wishlist", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                user_id: userId,
                product_id: productId,
                product_name: productName,
                product_price: Number(price),
                product_image: image

            })

        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message || "Failed to add wishlist");
            return;
        }

        // Save locally also
        const product = {
            name: productName,
            price: Number(price),
            image: image,
            product_id: productId
        };

        wishlist.push(product);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert(productName + " added to wishlist ❤️");

    } catch (error) {

        console.error("Wishlist error:", error);

        alert("Server connection failed ❌");
    }
}