// =========================================
// SMARTCART GLOBAL VOICE RECOGNIZER
// =========================================

function startSmartCartVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice recognition is not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    const button = document.getElementById("globalVoiceBtn");

    if (button) {
        button.innerHTML = "🎙️ Listening...";
    }

    recognition.onresult = function (event) {

        const text =
            event.results[0][0].transcript
                .toLowerCase()
                .trim();

        console.log("Voice Command:", text);

        handleVoiceCommand(text);
    };

    recognition.onerror = function (event) {

        console.log("Voice Error:", event.error);

        alert("Sorry, I couldn't understand. Please try again.");
    };

    recognition.onend = function () {

        if (button) {
            button.innerHTML = "🎤 Voice";
        }
    };

    recognition.start();
}


// =========================================
// VOICE COMMAND HANDLER
// =========================================

function handleVoiceCommand(command) {

    // HOME
    if (
        command.includes("home") ||
        command.includes("go home")
    ) {
        window.location.href = "home.html";
        return;
    }


    // PRODUCTS
    if (
        command.includes("products") ||
        command.includes("product page") ||
        command.includes("show products")
    ) {
        window.location.href = "products.html";
        return;
    }


    // CATEGORIES
    if (
        command.includes("categories") ||
        command.includes("category")
    ) {
        window.location.href = "categories.html";
        return;
    }


    // CART
    if (
        command.includes("cart") ||
        command.includes("shopping cart")
    ) {
        window.location.href = "cart.html";
        return;
    }


    // WISHLIST
    if (
        command.includes("wishlist") ||
        command.includes("wish list")
    ) {
        window.location.href = "wishlist.html";
        return;
    }


    // PROFILE
    if (
        command.includes("profile") ||
        command.includes("my profile")
    ) {
        window.location.href = "profile.html";
        return;
    }


    // ORDERS
    if (
        command.includes("orders") ||
        command.includes("my orders")
    ) {
        window.location.href = "orders.html";
        return;
    }


    // LOGOUT
    if (
        command.includes("logout") ||
        command.includes("log out")
    ) {
        window.location.href = "login.html";
        return;
    }


    // PRODUCT SEARCH
    const searchInput =
        document.getElementById("productSearch");

    if (searchInput) {

        searchInput.value = command;

        if (typeof searchAllProducts === "function") {
            searchAllProducts();
        }

        return;
    }


    alert(
        "I couldn't find what you asked for."
    );
}