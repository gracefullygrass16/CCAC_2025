window.addEventListener("scroll", function() {
    let scrollPos = window.scrollY;
    let bg = document.getElementById("bg");
    let text = document.getElementById("text");

    let scale = Math.min(0.8 + scrollPos / 1000, 1); // Scale up to full size
    bg.style.transform = `translateX(-50%) scale(${scale})`;
    
    text.style.transform = `translateY(${scrollPos * -0.08}px)`; // Slower scroll-up effect

});

