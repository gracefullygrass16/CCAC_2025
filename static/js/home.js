document.addEventListener("DOMContentLoaded", () => {
    fetch("/footer")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar-container");
    let lastScrollY = window.scrollY;
    
    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            navbar.style.opacity = "0";
        } else {
            navbar.style.opacity = "1";
        }

        lastScrollY = currentScrollY;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".quiz-button").addEventListener("click", function () {
        window.location.href = "/pre-review";
    });
});
