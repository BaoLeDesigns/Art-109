const flashlight = document.querySelector(".flashlight");

document.addEventListener("mousemove", function (event) {
    flashlight.style.left = `${event.clientX}px`;
    flashlight.style.top = `${event.clientY}px`;
});


// alert box messages for story

window.onload = function() {
    if (!sessionStorage.getItem("alertShown")) {
        alert("hi");
        sessionStorage.setItem("alertShown", "true");
}}

document.querySelector(".image-1").addEventListener("click", function() {  
    alert("You see my gaze, but not my true form, look into a mirror first before I will speak to you fully."); 
});

document.querySelector(".image-2").addEventListener("click", function() {  
    alert("now you can find my true face, but you must find where I am."); 
    document.querySelector(".image-1").style.display = "none";
});

document.querySelector(".image-3").addEventListener("click", function() {  
    alert("test test"); 
});

