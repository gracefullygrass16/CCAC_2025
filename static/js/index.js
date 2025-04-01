//Trying to make the scroll effect in the readme and failing asdgjkl

window.addEventListener("scroll", function() {
    let scrollPos = window.scrollY;
    let bg = document.getElementById("bg");
    let text = document.getElementById("text");

    let scale = Math.min(0.8 + scrollPos / 1000, 1); // Scale up to full size, where 0.8 is the starting size
    bg.style.transform = `translateX(-50%) scale(${scale})`;
    
    text.style.transform = `translateY(${scrollPos * -0.08}px)`; // Slower scroll-up effect (parallex effect)

});

// window.addEventListener("scroll", function() {
//     let scrollPos = window.scrollY;
//     let bg = document.getElementById("bg");
//     let text = document.getElementById("text");

//     let maxScale = 1; // Final zoom size
//     let minScale = 0.8; // Initial size
//     let zoomDistance = 500; // When zooming stops
//     let fixedGap = 100; // Space between text and image

//     // Calculate image scale
//     let scale = minScale + (scrollPos / zoomDistance) * (maxScale - minScale);
//     scale = Math.min(scale, maxScale); // Stop scaling at maxScale

//     bg.style.transform = `translateX(-50%) scale(${scale})`;

//     // Move text up with a limit
//     let moveUp = Math.min(scrollPos * -0.1, -fixedGap);
//     text.style.transform = `translateY(${moveUp}px)`;

//     if (scrollPos >= zoomDistance) {
//         // Let the background scroll normally
//         bg.style.position = "absolute"; 
//         bg.style.top = `${30 + zoomDistance * 0.1}vh`;

//         // Let the text scroll normally
//         text.style.position = "absolute"; 
//         text.style.top = `${50 + scrollPos - zoomDistance}px`;
//     } else {
//         // Restore original behavior when scrolling up
//         text.style.position = "relative";
//         text.style.top = "50vh";
//     }
// });



//for redirecting of TAKE THE QUIZ button
document.addEventListener("DOMContentLoaded", function () {
    const quizButton = document.getElementById("quizButtonTakeQuiz");
    if (quizButton) {
        quizButton.addEventListener("click", function () {
            window.location.href = "/pre-review";  // Redirects to pre-review.html
        });
    }
});

