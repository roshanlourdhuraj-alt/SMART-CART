// =========================================
// SMARTCART PROFILE JAVASCRIPT
// =========================================


// GET LOGGED-IN USER

let userData =
    JSON.parse(
        localStorage.getItem(
            "smartCartUser"
        )
    );


// CHECK LOGIN

if (!userData) {

    window.location.href =
        "index.html";

}


// =========================================
// DISPLAY USER DETAILS
// =========================================

function displayUserData() {

    document
        .getElementById("profileName")
        .textContent =
        userData.name;


    document
        .getElementById("profileEmail")
        .textContent =
        userData.email;


    document
        .getElementById("userName")
        .textContent =
        userData.name;


    document
        .getElementById("userEmail")
        .textContent =
        userData.email;

}


displayUserData();


// =========================================
// PROFILE IMAGE
// =========================================

const imageUpload =
    document.getElementById(
        "imageUpload"
    );


const profileImage =
    document.getElementById(
        "profileImage"
    );


const savedImage =
    localStorage.getItem(
        "profileImage"
    );


if (savedImage) {

    profileImage.src =
        savedImage;

}


imageUpload.addEventListener(

    "change",

    function () {


        const file =
            this.files[0];


        if (file) {


            const reader =
                new FileReader();


            reader.onload =
                function (event) {


                    profileImage.src =
                        event.target.result;


                    localStorage.setItem(

                        "profileImage",

                        event.target.result

                    );

                };


            reader.readAsDataURL(
                file
            );

        }

    }

);


// =========================================
// OPEN EDIT PROFILE
// =========================================

function openEditProfile() {


    document
        .getElementById(
            "editProfileForm"
        )
        .style.display =
        "block";


    document
        .getElementById(
            "editName"
        )
        .value =
        userData.name;


    document
        .getElementById(
            "editEmail"
        )
        .value =
        userData.email;

}


// =========================================
// CLOSE EDIT PROFILE
// =========================================

function closeEditProfile() {


    document
        .getElementById(
            "editProfileForm"
        )
        .style.display =
        "none";

}


// =========================================
// SAVE PROFILE
// =========================================

async function saveProfile() {

    const newName =
        document
            .getElementById("editName")
            .value
            .trim();

    const newEmail =
        document
            .getElementById("editEmail")
            .value
            .trim();


    if (
        newName === "" ||
        newEmail === ""
    ) {

        alert(
            "Please fill all details"
        );

        return;

    }


    try {

        const response =
            await fetch(

                `http://localhost:3000/update-profile/${userData.id}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        name: newName,

                        email: newEmail

                    })

                }

            );


        const data =
            await response.json();


        if (response.ok) {


            userData.name =
                data.user.name;


            userData.email =
                data.user.email;


            localStorage.setItem(

                "smartCartUser",

                JSON.stringify(
                    userData
                )

            );


            displayUserData();


            closeEditProfile();


            alert(

                "Profile updated successfully!"

            );

        }


        else {

            alert(
                data.message
            );

        }


    }

    catch (error) {

        console.log(error);


        alert(

            "Server connection failed"

        );

    }

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