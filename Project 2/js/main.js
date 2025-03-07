const flashlight = document.querySelector(".flashlight");

document.addEventListener("mousemove", function (event) {
    flashlight.style.left = `${event.clientX}px`;
    flashlight.style.top = `${event.clientY}px`;
});


// alert box messages for story

window.onload = function() {
    if (!sessionStorage.getItem("alertShown")) {
        alert("Welcome to the forever darkness, look around until you find me, in a wall where it rhymes with free");
        sessionStorage.setItem("alertShown", "true");
    }

    const image1 = document.querySelector(".image-1");
    const image2 = document.querySelector(".image-2");
    const image3 = document.querySelector(".image-3");

    if (image1) {
        image1.addEventListener("click", function() {
            alert("You have found me, but I won't talk to you fully until you can truly see me, find a mirror and look into it, its located where you came from"); 
        });
    }

    if (image2) {
        image2.addEventListener("click", function() {
            alert("Now you can find my true face, but I have moved to another wall, the one between the two clues you have found."); 
            image1.style.display = "none"; 
        });
    }

    if (image3) {
        image3.addEventListener("click", function() {
            alert("test test"); 
        });
    }
};
