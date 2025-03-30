document.addEventListener("DOMContentLoaded", () => {
    // Load the navbar dynamically
    fetch("/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
            setTimeout(initializeMenu, 100); // Ensures elements are available
        })
        .catch(error => console.error("Error loading navbar:", error));

    function initializeMenu() {
        const menuToggle = document.getElementById("menu-toggle");
        const menuDropdown = document.getElementById("menu-dropdown");
        const menuClose = document.getElementById("menu-close");

        if (menuToggle && menuDropdown && menuClose) {
            menuToggle.addEventListener("click", () => {
                menuDropdown.classList.toggle("hidden"); // Only toggle "hidden"
            });

            menuClose.addEventListener("click", () => {
                menuDropdown.classList.add("hidden"); // Ensure it hides
            });
        } else {
            console.error("Menu elements not found.");
        }
    }
});
