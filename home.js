// =========================================
// SMARTCART HOME JAVASCRIPT
// =========================================


// =========================================
// SHOW LOGGED-IN USER
// =========================================

const userData =
    JSON.parse(
        localStorage.getItem("smartCartUser")
    );


if (userData) {


    const welcomeUser =
        document.getElementById(
            "welcomeUser"
        );


    if (welcomeUser) {


        welcomeUser.textContent =
            "Welcome, " +
            userData.name +
            " 👋";

    }

}



// =========================================
// CHECK LOGIN STATUS
// =========================================

const loggedIn =
    localStorage.getItem(
        "smartCartLoggedIn"
    );


if (loggedIn !== "true") {


    window.location.href =
        "index.html";

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
// HOME PAGE SEARCH
// =========================================

function searchFromHome() {

    const input =
        document.getElementById("homeSearch");

    if (!input) {
        return;
    }

    const searchValue =
        input.value.trim();

    if (searchValue === "") {
        return;
    }

    window.location.href =
        "products.html?search=" +
        encodeURIComponent(searchValue);
}


// =========================================
// HOME PAGE VOICE SEARCH
// =========================================

function startHomeVoiceSearch() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported in this browser."
        );

        return;
    }

    const recognition =
        new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.continuous = false;

    recognition.interimResults = false;


    const button =
        document.getElementById("homeVoiceBtn");

    if (button) {
        button.innerHTML = "🎙️ Listening...";
        button.disabled = true;
    }

recognition.onresult = function(event) {

    let spokenText =
        event.results[0][0].transcript
            .toLowerCase()
            .trim();

    // Remove punctuation from voice input
    spokenText = spokenText.replace(/[.,!?;:]+$/g, "");

    // Remove extra spaces
    spokenText = spokenText.replace(/\s+/g, " ").trim();

    console.log("Clean voice search:", spokenText);

    const input =
        document.getElementById("homeSearch");

    if (input) {
        input.value = spokenText;
    }

    window.location.href =
        "products.html?search=" +
        encodeURIComponent(spokenText);
};
    
    recognition.onerror = function(event) {

        console.log(
            "Home voice error:",
            event.error
        );

    };


    recognition.onend = function() {

        if (button) {
            button.innerHTML = "🎤 Voice";
            button.disabled = false;
        }

    };


    recognition.start();
}