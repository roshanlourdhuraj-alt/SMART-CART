// =========================================
// SMARTCART DATABASE LOGIN
// =========================================


// LOGIN FORM

const loginForm =
    document.getElementById("loginForm");


const loginMessage =
    document.getElementById("loginMessage");



loginForm.addEventListener(

    "submit",

    async function (event) {


        // Stop page refresh

        event.preventDefault();



        // Get email or username

        const email =
            document
                .getElementById("username")
                .value
                .trim();



        // Get password

        const password =
            document
                .getElementById("password")
                .value
                .trim();



        // Remember me

        const rememberMe =
            document
                .getElementById("rememberMe")
                .checked;



        try {


            const response =
                await fetch(

                    "http://localhost:3000/login",

                    {

                        method: "POST",


                        headers: {

                            "Content-Type":
                                "application/json"

                        },


                        // IMPORTANT

                        body: JSON.stringify({

                            username: email,

                            password: password

                        })

                    }

                );



            const data =
                await response.json();



            // LOGIN SUCCESS

            if (response.ok) {


                loginMessage.textContent =
                    "✓ Login successful! Welcome to SmartCart";


                loginMessage.style.color =
                    "green";



                // Save login status

                localStorage.setItem(

                    "smartCartLoggedIn",

                    "true"

                );



                // Save complete user details

                localStorage.setItem(

                    "smartCartUser",

                    JSON.stringify(

                        data.user

                    )

                );



                // Remember email

                if (rememberMe) {


                    localStorage.setItem(

                        "rememberedUsername",

                        email

                    );

                }



                // Go to home

                setTimeout(

                    function () {


                        window.location.href =
                            "home.html";


                    },

                    1000

                );

            }



            // LOGIN FAILED

            else {


                loginMessage.textContent =
                    "✕ " + data.message;


                loginMessage.style.color =
                    "red";

            }

        }



        // SERVER ERROR

        catch (error) {


            console.log(error);


            loginMessage.textContent =
                "✕ Server connection failed";


            loginMessage.style.color =
                "red";

        }

    }

);



// =========================================
// SHOW / HIDE PASSWORD
// =========================================

function togglePassword() {


    const passwordInput =
        document.getElementById(
            "password"
        );


    const toggleButton =
        document.querySelector(
            ".password-toggle"
        );



    if (

        passwordInput.type ===
        "password"

    ) {


        passwordInput.type =
            "text";


        toggleButton.textContent =
            "🙈";

    }



    else {


        passwordInput.type =
            "password";


        toggleButton.textContent =
            "👁️";

    }

}



// =========================================
// REMEMBERED EMAIL
// =========================================

window.addEventListener(

    "load",

    function () {


        const rememberedUsername =
            localStorage.getItem(

                "rememberedUsername"

            );



        if (rememberedUsername) {


            document
                .getElementById(
                    "username"
                )
                .value =
                rememberedUsername;



            document
                .getElementById(
                    "rememberMe"
                )
                .checked =
                true;

        }

    }

);



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