document.addEventListener("mousemove", function(event) {
    const flashlight = document.querySelector(".flashlight");

    flashlight.style.left = `${event.clientX}px`;
    flashlight.style.top = `${event.clientY}px`;
});