
let song = document.querySelector("#song");

let playBtn = document.querySelector("#play-btn");

let pauseBtn = document.querySelector("#pause-btn");

playBtn.addEventListener('click', function () {
    song.play();
})

pauseBtn.addEventListener('click', function () {
    song.pause();
})

document.querySelector("#quiet-btn").addEventListener("click", () => {
    song.volume = 0.2;
});

document.querySelector("#loud-btn").addEventListener("click", () => {
    song.volume = 1.0;
});