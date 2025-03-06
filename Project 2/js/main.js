const flashlight = document.querySelector(".flashlight");

document.addEventListener("mousemove", function (event) {
    flashlight.style.left = `${event.clientX}px`;
    flashlight.style.top = `${event.clientY}px`;
});