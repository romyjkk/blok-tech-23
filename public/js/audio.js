// 404 page

console.log("Hello?");

const hello = new Audio("../public/audio/hello.mp3");
const playPauseButton = document.querySelector(".playpausebutton");

playPauseButton.addEventListener("click", () => {
  hello.play();
});
