const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const app = express();


// =========================================
// MIDDLEWARE
// =========================================

app.use(
    cors()
);


app.use(
    express.json()
);


// =========================================
// MYSQL DATABASE CONNECTION
// =========================================

const db =
    mysql.createConnection({

        host: "localhost",

        user: "root",

        password: "",

        database: "smartcart_db"

    });


db.connect(

    (err) => {

        if (err) {

            console.log(
                "❌ Database connection failed"
            );

            console.log(err);

            return;

        }


        console.log(
            "✅ MySQL Database Connected Successfully!"
        );

    }

);



// =========================================
// HOME TEST
// =========================================

app.get(

    "/",

    (req, res) => {

        res.send(
            "Server is Running Successfully!"
        );

    }

);



// =========================================
// REGISTER
// =========================================

app.post(

    "/register",

    (req, res) => {


        const {

            name,

            email,

            password

        } = req.body;


        const sql = `

            INSERT INTO users

            (
                name,
                email,
                password
            )

            VALUES (?, ?, ?)

        `;


        db.query(

            sql,

            [

                name,

                email,

                password

            ],

            (err, result) => {


                if (err) {


                    console.log(err);


                    return res.status(500).json({

                        message:
                            "Registration failed"

                    });

                }


                res.status(201).json({

                    message:
                        "Registration successful!"

                });

            }

        );

    }

);




// =========================================
// LOGIN
// =========================================

app.post("/login", (req, res) => {

    const {
        username,
        password
    } = req.body;


    const sql = `

        SELECT *

        FROM users

        WHERE

            (email = ? OR name = ?)

            AND password = ?

    `;


    db.query(

        sql,

        [
            username,
            username,
            password
        ],

        (err, result) => {


            if (err) {

                console.log(err);

                return res.status(500).json({

                    message:
                        "Login failed"

                });

            }


            if (result.length === 0) {

                return res.status(401).json({

                    message:
                        "Invalid username/email or password"

                });

            }


            res.json({

                message:
                    "Login successful",

                user:
                    result[0]

            });

        }

    );

});



// =========================================
// PLACE ORDER
// =========================================

app.post(

    "/place-order",

    (req, res) => {


        const {

            user_id,

            customer_name,

            email,

            phone,

            address,

            city,

            pincode,

            payment_method,

            total_amount,

            items

        } = req.body;



        // First save order details

        const orderSql = `

            INSERT INTO orders

            (

                user_id,

                customer_name,

                email,

                phone,

                address,

                city,

                pincode,

                payment_method,

                total_amount

            )

            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

        `;


        db.query(

            orderSql,

            [

                user_id,

                customer_name,

                email,

                phone,

                address,

                city,

                pincode,

                payment_method,

                total_amount

            ],

            (err, orderResult) => {


                if (err) {


                    console.log(

                        "Order Error:"

                    );


                    console.log(err);


                    return res.status(500).json({

                        message:
                            "Order placement failed"

                    });

                }



                // Get new order ID

                const orderId =
                    orderResult.insertId;



                // If no products

                if (

                    !items ||

                    items.length === 0

                ) {


                    return res.status(201).json({

                        message:
                            "Order placed successfully!",

                        order_id:
                            orderId

                    });

                }

app.post("/add-wishlist", (req, res) => {

    const {
        user_id,
        product_id,
        product_name,
        product_price,
        product_image
    } = req.body;

    const sql = `
        INSERT INTO wishlist
        (user_id, product_id, product_name, product_price, product_image)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            product_id,
            product_name,
            product_price,
            product_image
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Added to wishlist"
            });
        }
    );
});


                // Prepare product values

                const itemValues =
                    items.map(

                        (item) => {


                            const price =
                                Number(
                                    item.price || 0
                                );


                            const quantity =
                                Number(
                                    item.quantity || 1
                                );


                            const itemTotal =
                                price *
                                quantity;


                            return [

                                orderId,

                                item.name,

                                price,

                                quantity,

                                itemTotal

                            ];

                        }

                    );



                // Save ordered products

                const itemSql = `

                    INSERT INTO order_items

                    (

                        order_id,

                        product_name,

                        product_price,

                        quantity,

                        item_total

                    )

                    VALUES ?

                `;


                db.query(

                    itemSql,

                    [

                        itemValues

                    ],

                    (itemErr) => {


                        if (itemErr) {


                            console.log(

                                "Order Items Error:"

                            );


                            console.log(

                                itemErr

                            );


                            return res.status(500).json({

                                message:
                                    "Order saved but products failed"

                            });

                        }


                        res.status(201).json({

                            message:
                                "Order placed successfully!",

                            order_id:
                                orderId

                        });

                    }

                );

            }

        );

    }

);



// =========================================
// GET USER ORDERS
// =========================================

app.get(

    "/orders/:userId",

    (req, res) => {


        const userId =
            req.params.userId;


        const sql = `

            SELECT *

            FROM orders

            WHERE user_id = ?

            ORDER BY order_date DESC

        `;


        db.query(

            sql,

            [

                userId

            ],

            (err, orders) => {


                if (err) {


                    console.log(err);


                    return res.status(500).json({

                        message:
                            "Failed to fetch orders"

                    });

                }


                if (

                    orders.length === 0

                ) {


                    return res.json({

                        orders: []

                    });

                }



                // Get all order IDs

                const orderIds =
                    orders.map(

                        (order) =>
                            order.id

                    );



                const itemSql = `

                    SELECT *

                    FROM order_items

                    WHERE order_id IN (?)

                `;


                db.query(

                    itemSql,

                    [

                        orderIds

                    ],

                    (itemErr, items) => {


                        if (itemErr) {


                            console.log(

                                itemErr

                            );


                            return res.status(500).json({

                                message:
                                    "Failed to fetch products"

                            });

                        }



                        // Attach products to orders

                        const finalOrders =
                            orders.map(

                                (order) => {


                                    return {

                                        ...order,

                                        items:

                                            items.filter(

                                                (item) =>

                                                    item.order_id ===
                                                    order.id

                                            )

                                    };

                                }

                            );


                        res.json({

                            orders:
                                finalOrders

                        });

                    }

                );

            }

        );

    }

);

// =========================================
// UPDATE USER PROFILE
// =========================================

app.put("/update-profile/:id", (req, res) => {

    const userId = req.params.id;

    const {
        name,
        email
    } = req.body;


    if (!name || !email) {

        return res.status(400).json({

            message:
                "Name and email are required"

        });

    }


    const sql = `

        UPDATE users

        SET
            name = ?,
            email = ?

        WHERE id = ?

    `;


    db.query(

        sql,

        [
            name,
            email,
            userId
        ],

        (err, result) => {


            if (err) {

                console.log(err);


                return res.status(500).json({

                    message:
                        "Database update failed"

                });

            }


            res.json({

                message:
                    "Profile updated successfully",

                user: {

                    id: userId,

                    name: name,

                    email: email

                }

            });

        }

    );

});

// =========================================
// START SERVER
// =========================================

app.listen(

    3000,

    () => {

        console.log(

            "🚀 Server started on http://localhost:3000"

        );

    }

);
app.get("/wishlist/:userId", (req, res) => {

    const userId = req.params.userId;

    const sql =
        "SELECT * FROM wishlist WHERE user_id = ?";

    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});