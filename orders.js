// =========================================
// SMARTCART - MY ORDERS
// =========================================


// Get logged-in user

const userData =
    JSON.parse(
        localStorage.getItem(
            "smartCartUser"
        )
    );


// Check login

if (!userData) {

    window.location.href =
        "index.html";

}


// =========================================
// LOAD ORDERS
// =========================================

async function loadOrders() {


    const ordersContainer =
        document.getElementById(
            "ordersContainer"
        );


    try {


        const response =
            await fetch(

                "http://localhost:3000/orders/" +
                userData.id

            );


        const data =
            await response.json();


        if (!response.ok) {

            ordersContainer.innerHTML = `

                <h2>
                    ❌ ${data.message}
                </h2>

            `;

            return;

        }


        displayOrders(
            data.orders
        );


    }


    catch (error) {


        console.log(error);


        ordersContainer.innerHTML = `

            <h2>
                ❌ Server connection failed
            </h2>

        `;

    }

}



// =========================================
// DISPLAY ORDERS
// =========================================

function displayOrders(orders) {


    const ordersContainer =
        document.getElementById(
            "ordersContainer"
        );


    if (

        !orders ||

        orders.length === 0

    ) {


        ordersContainer.innerHTML = `

            <div class="empty-cart">

                📦

                <h2>
                    No Orders Yet
                </h2>

                <p>
                    Your orders will appear here.
                </p>

            </div>

        `;


        return;

    }


    ordersContainer.innerHTML = "";


    orders.forEach(

        (order) => {


            const orderCard =
                document.createElement(
                    "div"
                );


            orderCard.className =
                "order-card";


            const orderDate =
                new Date(
                    order.order_date
                );


            const formattedDate =
                orderDate.toLocaleDateString(
                    "en-IN"
                );



            // PRODUCTS ORDERED

            let productsHTML = "";


            if (

                order.items &&

                order.items.length > 0

            ) {


                productsHTML =

                    order.items.map(

                        (item) => `

                            <div
                                class="ordered-item"
                            >

                                <strong>

                                    🛒

                                    ${item.product_name}

                                </strong>


                                <p>

                                    Price:

                                    ₹${item.product_price}

                                </p>


                                <p>

                                    Quantity:

                                    ${item.quantity}

                                </p>


                                <p>

                                    Item Total:

                                    ₹${item.item_total}

                                </p>

                            </div>

                        `

                    ).join("");

            }


            else {


                productsHTML = `

                    <p>
                        No product details found
                    </p>

                `;

            }



            // ORDER CARD

            orderCard.innerHTML = `

                <div
                    class="order-header"
                >

                    <h2>

                        📦 Order #${order.id}

                    </h2>


                    <span
                        class="order-status"
                    >

                        ${order.order_status}

                    </span>

                </div>



                <h3>

                    🛍️ Products Ordered

                </h3>


                <div
                    class="ordered-products"
                >

                    ${productsHTML}

                </div>



                <hr>



                <div
                    class="order-details"
                >

                    <p>

                        <strong>
                            Customer:
                        </strong>

                        ${order.customer_name}

                    </p>


                    <p>

                        <strong>
                            Payment:
                        </strong>

                        ${order.payment_method}

                    </p>


                    <p>

                        <strong>
                            Total:
                        </strong>

                        ₹${order.total_amount}

                    </p>


                    <p>

                        <strong>
                            Order Date:
                        </strong>

                        ${formattedDate}

                    </p>

                </div>

            `;


            ordersContainer.appendChild(
                orderCard
            );

        }

    );

}



// =========================================
// START
// =========================================

loadOrders();