document.addEventListener("DOMContentLoaded", () => {
    // so it loads dynamically
    fetch("/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
            setTimeout(initializeMenu, 100);
        })
        .catch(error => console.error("Error loading navbar:", error));

    function initializeMenu() {
        const menuToggle = document.getElementById("menu-toggle");
        const menuDropdown = document.getElementById("menu-dropdown");
        const menuClose = document.getElementById("menu-close");

        if (menuToggle && menuDropdown && menuClose) {
            menuToggle.addEventListener("click", () => {
                menuDropdown.classList.toggle("hidden"); 
            });

            menuClose.addEventListener("click", () => {
                menuDropdown.classList.add("hidden");
            });
        } else {
            console.error("Menu elements not found.");
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar-container");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 10) { // when scrolling down
            navbar.style.top = "20px";
        } else { // when at the top
            navbar.style.top = "40px";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar-container");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            // Scrolling down -> Fade out
            navbar.style.opacity = "0";
        } else {
            // Scrolling up -> Fade in
            navbar.style.opacity = "1";
        }

        lastScrollY = currentScrollY;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
            setTimeout(initializeMenu, 100); 
        })
        .catch(error => console.error("Error loading footer:", error));

});
