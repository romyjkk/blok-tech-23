const theJoke = document.querySelector(".joke");
const getJoke = document.querySelector(".generate-joke");

async function fetchTheJoke() {
  const response = await fetch("https://icanhazdadjoke.com", {
    headers: {
      Accept: "application/json",
    },
  });
  return response.json();
}

async function generateJoke() {
  const { joke } = await fetchTheJoke();
  theJoke.textContent = joke;
}

getJoke.addEventListener("click", generateJoke);
