document.addEventListener("DOMContentLoaded", function () {
    // Get references to elements in the login form
    const loginForm = document.getElementById("loginForm");
    const errorPopup = document.getElementById("errorPopup");
    const errorMessage = document.getElementById("popupMessage");
    const closePopupBtn = document.getElementById("closePopup");
    const resetPasswordBtn = document.getElementById("resetPasswordBtn");
    const resetPopup = document.getElementById("resetPopup");
    const closeResetPopup = document.getElementById("closeResetPopup");
    const confirmReset = document.getElementById("confirmReset");

    // Default stored credentials
    let storedUsername = "XXXXX";
    let storedPassword = localStorage.getItem("adminPassword") || "AtXXXXXteam";

    // Check if the user is already authenticated
    if (sessionStorage.getItem("isAuthenticated")) {
        console.log("User already authenticated. Redirecting...");
        window.location.href = "../pages/cotizaciones.html";
        return;
    }

    // Ensure that the login form is found before proceeding
    if (!loginForm) {
        console.error("Error: Login form not found.");
        return;
    }

    // Handle login form submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        console.log("Attempting login with:", username, password);

        // Validate login credentials
        if (username === storedUsername && password === storedPassword) {
            console.log("Login successful. Saving session...");

            // Store authentication status
            sessionStorage.setItem("isAuthenticated", "true");

            // Redirect to the next page
            window.location.href = "../pages/cotizaciones.html";
        } else {
            console.log("Incorrect credentials.");
            errorMessage.textContent = "Incorrect username or password";
            errorPopup.style.display = "block";
        }
    });

    // Close error popup if button exists
    if (closePopupBtn) {
        closePopupBtn.addEventListener("click", function () {
            errorPopup.style.display = "none";
        });
    }

    // Show reset password popup
    resetPasswordBtn.addEventListener("click", function () {
        resetPopup.style.display = "block";
    });

    // Close reset password popup
    closeResetPopup.addEventListener("click", function () {
        resetPopup.style.display = "none";
    });

    // Handle password reset process
    confirmReset.addEventListener("click", function () {
        const currentPassword = document.getElementById("currentPassword").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Check if the current password is correct
        if (currentPassword !== storedPassword) {
            alert("The current password is incorrect.");
            return;
        }

        // Ensure the new password meets length requirements
        if (newPassword.length < 6) {
            alert("The new password must be at least 6 characters long.");
            return;
        }

        // Verify that the new passwords match
        if (newPassword !== confirmPassword) {
            alert("The new passwords do not match.");
            return;
        }

        // Update stored password
        localStorage.setItem("adminPassword", newPassword);
        storedPassword = newPassword;
        alert("Password updated successfully.");
        resetPopup.style.display = "none";
    });
});