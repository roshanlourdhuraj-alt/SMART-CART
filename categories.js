// =========================================
// SMARTCART CATEGORIES JAVASCRIPT
// =========================================


// =========================================
// CURRENT CATEGORY
// =========================================

let currentCategory = "all";


// =========================================
// CATEGORY FILTER
// =========================================

function filterCategory(categoryName, clickedButton) {

    // Save selected category
    currentCategory = categoryName;


    // Get all category sections
    const categorySections =
        document.querySelectorAll(
            ".category-product-section"
        );


    // Get all filter buttons
    const filterButtons =
        document.querySelectorAll(
            ".category-filter button"
        );


    // Remove active class from all buttons
    filterButtons.forEach(function(button) {

        button.classList.remove("active");

    });


    // Add active class to clicked button
    if (clickedButton) {

        clickedButton.classList.add("active");

    }


    // Clear search box
    const searchInput =
        document.getElementById(
            "categorySearch"
        );

    if (searchInput) {

        searchInput.value = "";

    }


    // Get no product message
    const noProductMessage =
        document.getElementById(
            "noCategoryProductMessage"
        );


    if (noProductMessage) {

        noProductMessage.style.display = "none";

    }


    // Show / hide category sections
    categorySections.forEach(function(section) {

        const sectionCategory =
            section.getAttribute(
                "data-category-section"
            );


        // ALL category
        if (
            categoryName === "all"
        ) {

            section.style.display = "block";


            // Show all products
            const products =
                section.querySelectorAll(
                    ".all-product-card"
                );


            products.forEach(function(product) {

                product.style.display = "flex";

            });

        }


        // Selected category
        else if (
            sectionCategory === categoryName
        ) {

            section.style.display = "block";


            // Show all products in selected category
            const products =
                section.querySelectorAll(
                    ".all-product-card"
                );


            products.forEach(function(product) {

                product.style.display = "flex";

            });

        }


        // Other categories
        else {

            section.style.display = "none";

        }

    });

}


// =========================================
// SEARCH CATEGORY PRODUCTS
// =========================================

function searchCategoryProducts() {

    // Get search input
    const searchInput =
        document.getElementById(
            "categorySearch"
        );


    if (!searchInput) {

        return;

    }


    const searchValue =
        searchInput.value
        .toLowerCase()
        .trim();


    // Get all category sections
    const categorySections =
        document.querySelectorAll(
            ".category-product-section"
        );


    // Get no product message
    const noProductMessage =
        document.getElementById(
            "noCategoryProductMessage"
        );


    // =========================================
    // EMPTY SEARCH
    // =========================================

    if (searchValue === "") {

        let foundAnyProduct = false;


        categorySections.forEach(function(section) {

            const sectionCategory =
                section.getAttribute(
                    "data-category-section"
                );


            // Respect selected category
            if (
                currentCategory !== "all" &&
                sectionCategory !== currentCategory
            ) {

                section.style.display = "none";

                return;

            }


            section.style.display = "block";


            const productCards =
                section.querySelectorAll(
                    ".all-product-card"
                );


            productCards.forEach(function(card) {

                card.style.display = "flex";

                foundAnyProduct = true;

            });

        });


        if (noProductMessage) {

            noProductMessage.style.display =
                foundAnyProduct
                    ? "none"
                    : "block";

        }


        return;

    }


    // =========================================
    // SEARCH PRODUCTS
    // =========================================

    let foundAnyProduct = false;


    categorySections.forEach(function(section) {

        const sectionCategory =
            section.getAttribute(
                "data-category-section"
            );


        // If a particular category is selected,
        // hide other category sections
        if (
            currentCategory !== "all" &&
            sectionCategory !== currentCategory
        ) {

            section.style.display = "none";

            return;

        }


        const productCards =
            section.querySelectorAll(
                ".all-product-card"
            );


        let foundInThisSection = false;


        productCards.forEach(function(card) {

            // Get product name
            const productName =
                (
                    card.getAttribute(
                        "data-name"
                    ) || ""
                )
                .toLowerCase();


            // Get complete product text
            const productText =
                card.textContent.toLowerCase();


            // Check product name or text
            if (
                productName.includes(searchValue) ||
                productText.includes(searchValue)
            ) {

                card.style.display = "flex";

                foundInThisSection = true;

                foundAnyProduct = true;

            }

            else {

                card.style.display = "none";

            }

        });


        // Show category only if product found
        if (foundInThisSection) {

            section.style.display = "block";

        }

        else {

            section.style.display = "none";

        }

    });


    // =========================================
    // NO PRODUCT MESSAGE
    // =========================================

    if (noProductMessage) {

        if (foundAnyProduct) {

            noProductMessage.style.display =
                "none";

        }

        else {

            noProductMessage.style.display =
                "block";

        }

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

    // Get existing cart
    let cart =
        JSON.parse(
            localStorage.getItem(
                "cart"
            )
        ) || [];


    // Convert price to number
    const productPrice =
        Number(price);


    // Delivery information
    const delivery =
        category.toLowerCase() === "grocery"
            ? "1–2 Days"
            : "3–5 Days";


    const fastDelivery =
        category.toLowerCase() === "grocery";


    // Create product object
    const product = {

        name: productName,

        price: productPrice,

        quantity: 1,

        category: category,

        image: image,

        delivery: delivery,

        fastDelivery: fastDelivery

    };


    // Add product to cart
    cart.push(product);


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Show message
    alert(
        productName +
        " added to cart 🛒"
    );

}


// =========================================
// OLD ADD TO CART SUPPORT
// =========================================
// This keeps compatibility if any old HTML
// button still uses addToCart()

function addToCart(
    productName,
    price
) {

    addProductToCart(
        productName,
        price
    );

}


// =========================================
// PAGE LOAD
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Set All category as default
        currentCategory = "all";


        // Get all category sections
        const categorySections =
            document.querySelectorAll(
                ".category-product-section"
            );


        // Show all sections
        categorySections.forEach(
            function(section) {

                section.style.display =
                    "block";


                // Show all products
                const products =
                    section.querySelectorAll(
                        ".all-product-card"
                    );


                products.forEach(
                    function(product) {

                        product.style.display =
                            "flex";

                    }
                );

            }
        );


        // Set first filter button active
        const filterButtons =
            document.querySelectorAll(
                ".category-filter button"
            );


        filterButtons.forEach(
            function(button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        if (filterButtons.length > 0) {

            filterButtons[0].classList.add(
                "active"
            );

        }

    }
);