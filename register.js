document
    .getElementById("registerForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        try {

            const response = await fetch(
                "http://localhost:3000/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        name: name,
                        email: email,
                        password: password

                    })
                }
            );


            const data =
                await response.json();


            document
                .getElementById("message")
                .innerText = data.message;


            if (response.ok) {

                alert("Registration successful!");

                window.location.href =
                    "index.html";

            }

        } catch (error) {

            console.log(error);

            document
                .getElementById("message")
                .innerText =
                    "Server connection failed";

        }

    });