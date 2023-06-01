// 404 page (playing audio + adding filter to the image)

console.log("Hello?");

const lionelImage = document.querySelector(".error");
const hello = new Audio("../public/audio/hello.mp3");
const playPauseButton = document.querySelector(".playpausebutton");

playPauseButton.addEventListener("click", () => {
  hello.play();
  lionelImage.classList.add("filteranimation");
});

// https://codepen.io/beauhaus/pen/bpzWEb
