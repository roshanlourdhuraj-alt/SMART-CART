// =========================================
// SMARTCART CHECKOUT JAVASCRIPT
// =========================================


// =========================================
// CART PRODUCTS
// =========================================

const cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// =========================================
// TOTAL AMOUNT
// =========================================

let totalAmount =
    parseFloat(
        localStorage.getItem("cartTotal") ||
        localStorage.getItem("totalAmount") ||
        0
    );

let discount = 0;


// =========================================
// SHOW PAYMENT BOX
// =========================================

function showPaymentBox(paymentType) {

    const upiBox =
        document.getElementById("upiBox");

    const cardBox =
        document.getElementById("cardBox");

    const codBox =
        document.getElementById("codBox");


    if (upiBox) {
        upiBox.style.display = "none";
    }

    if (cardBox) {
        cardBox.style.display = "none";
    }

    if (codBox) {
        codBox.style.display = "none";
    }


    if (paymentType === "upi" && upiBox) {

        upiBox.style.display = "block";

    }


    if (paymentType === "card" && cardBox) {

        cardBox.style.display = "block";

    }


    if (paymentType === "cod" && codBox) {

        codBox.style.display = "block";

    }

}


// =========================================
// APPLY COUPON
// =========================================

function applyCoupon() {

    const couponInput =
        document.getElementById("couponCode");


    if (!couponInput) {
        return;
    }


    const coupon =
        couponInput.value
            .trim()
            .toUpperCase();


    discount = 0;


    if (coupon === "SAVE10") {

        discount =
            totalAmount * 0.10;


        document.getElementById(
            "couponMessage"
        ).innerText =
            "✅ 10% discount applied";

    }

    else if (coupon === "SAVE20") {

        discount =
            totalAmount * 0.20;


        document.getElementById(
            "couponMessage"
        ).innerText =
            "✅ 20% discount applied";

    }

    else {

        document.getElementById(
            "couponMessage"
        ).innerText =
            "❌ Invalid coupon";

    }


    const discountElement =
        document.getElementById(
            "discountAmount"
        );


    if (discountElement) {

        discountElement.innerText =
            "₹" + discount.toFixed(2);

    }


    const finalAmount =
        totalAmount - discount;


    const totalElement =
        document.getElementById("total");


    if (totalElement) {

        totalElement.innerText =
            "₹" + finalAmount.toFixed(2);

    }

}


// =========================================
// PLACE ORDER
// =========================================

async function confirmOrder() {


    // -------------------------------------
    // CUSTOMER DETAILS
    // -------------------------------------

    const customerName =
        document.getElementById(
            "customerName"
        ).value.trim();


    const mobileNumber =
        document.getElementById(
            "mobileNumber"
        ).value.trim();


    const emailAddress =
        document.getElementById(
            "emailAddress"
        ).value.trim();


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    const city =
        document.getElementById(
            "city"
        ).value.trim();


    const pincode =
        document.getElementById(
            "pincode"
        ).value.trim();


    // -------------------------------------
    // PAYMENT
    // -------------------------------------

    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    // -------------------------------------
    // VALIDATE CUSTOMER DETAILS
    // -------------------------------------

    if (
        !customerName ||
        !mobileNumber ||
        !emailAddress ||
        !address ||
        !city ||
        !pincode
    ) {

        alert(
            "Please fill all customer details"
        );

        return;

    }


    // -------------------------------------
    // VALIDATE PAYMENT
    // -------------------------------------

    if (!payment) {

        alert(
            "Please select a payment method"
        );

        return;

    }


    const paymentMethod =
        payment.value;


    // -------------------------------------
    // GET USER
    // -------------------------------------

    const userData =
        JSON.parse(
            localStorage.getItem(
                "smartCartUser"
            )
        );


    const userId =
        userData
            ? userData.id
            : localStorage.getItem("user_id");


    // -------------------------------------
    // CHECK CART
    // -------------------------------------

    if (!cart || cart.length === 0) {

        alert(
            "🛒 Your cart is empty"
        );

        return;

    }


    // -------------------------------------
    // FINAL AMOUNT
    // -------------------------------------

    const finalAmount =
        totalAmount - discount;


    // -------------------------------------
    // ORDER DATA
    // -------------------------------------

    const orderData = {

        user_id: userId || null,

        customer_name:
            customerName,

        email:
            emailAddress,

        phone:
            mobileNumber,

        address:
            address,

        city:
            city,

        pincode:
            pincode,

        payment_method:
            paymentMethod,

        total_amount:
            totalAmount,

        coupon_code:
            document.getElementById(
                "couponCode"
            )
            ? document.getElementById(
                "couponCode"
            ).value.trim()
            : "",

        discount:
            discount,

        final_amount:
            finalAmount,

        items:
            cart

    };


    console.log(
        "ORDER DATA:",
        orderData
    );


    // -------------------------------------
    // SEND ORDER TO SERVER
    // -------------------------------------

    try {

        const response =
            await fetch(
                "http://localhost:3000/place-order",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            orderData
                        )

                }
            );


        const data =
            await response.json();


        console.log(
            "SERVER RESPONSE:",
            data
        );


        // ---------------------------------
        // SUCCESS
        // ---------------------------------

        if (response.ok) {

            alert(
                "🎉 Order placed successfully!\n\n" +
                "Order ID: " +
                data.order_id
            );


            // Clear cart

            localStorage.removeItem(
                "cart"
            );


            localStorage.removeItem(
                "cartTotal"
            );


            localStorage.removeItem(
                "totalAmount"
            );


            // Go to home

            window.location.href =
                "home.html";

        }


        // ---------------------------------
        // SERVER ERROR
        // ---------------------------------

        else {

            alert(
                "❌ " +
                (
                    data.message ||
                    "Unable to place order"
                )
            );

        }

    }


    // -------------------------------------
    // CONNECTION ERROR
    // -------------------------------------

    catch (error) {

        console.error(
            "ORDER ERROR:",
            error
        );


        alert(
            "❌ Server connection failed.\n\n" +
            "Please make sure server.js is running."
        );

    }

}
// =========================================
// UPI APP SELECTION
// =========================================

let selectedUPIApp = "";


function selectUPIApp(appName) {

    selectedUPIApp = appName;


    document.getElementById(
        "selectedUPIApp"
    ).innerHTML =
        "✅ Selected UPI App: <b>" +
        appName +
        "</b>";

}



// =========================================
// GENERATE PAYMENT QR
// =========================================

function generatePaymentQR() {

    const qrBox =
        document.getElementById(
            "paymentQRCode"
        );


    if (!qrBox) {

        return;

    }


    qrBox.innerHTML = "";


    const totalAmount =
        localStorage.getItem(
            "cartTotal"
        ) || 0;


    const upiId =
        document.getElementById(
            "upiId"
        );


    let merchantUPI =
        "smartcart@upi";


    if (

        upiId &&
        upiId.value.trim() !== ""

    ) {

        merchantUPI =
            upiId.value.trim();

    }


    const paymentData =

        "upi://pay?" +

        "pa=" +
        encodeURIComponent(
            merchantUPI
        ) +

        "&pn=" +
        encodeURIComponent(
            "SmartCart"
        ) +

        "&am=" +
        totalAmount +

        "&cu=INR";


    // Demo QR display

    qrBox.innerHTML = `

        <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(paymentData)}"
            alt="SmartCart Payment QR"
        >

    `;

}



// =========================================
// QR SCANNER
// =========================================

let html5QrCode = null;


function startQRScanner() {

    const scannerBox =
        document.getElementById(
            "qrScannerBox"
        );


    if (!scannerBox) {

        return;

    }


    scannerBox.style.display =
        "block";


    if (

        !html5QrCode

    ) {

        html5QrCode =
            new Html5Qrcode(
                "qr-reader"
            );

    }


    html5QrCode.start(

        {

            facingMode:
                "environment"

        },

        {

            fps: 10,

            qrbox: {

                width: 250,

                height: 250

            }

        },


        function(decodedText) {

            alert(

                "✅ QR Code Scanned Successfully!\n\n" +

                decodedText

            );


            stopQRScanner();

        },


        function(errorMessage) {

            // Scanner continuously scans
            // No alert needed here

        }

    )

    .catch(

        function(error) {

            console.log(
                "QR Scanner Error:",
                error
            );


            alert(
                "Camera permission not available"
            );

        }

    );

}



// =========================================
// STOP QR SCANNER
// =========================================

function stopQRScanner() {

    const scannerBox =
        document.getElementById(
            "qrScannerBox"
        );


    if (

        html5QrCode

    ) {

        html5QrCode.stop()

        .then(

            function() {

                scannerBox.style.display =
                    "none";

            }

        )

        .catch(

            function(error) {

                console.log(
                    error
                );

            }

        );

    }

}