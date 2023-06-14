// fetch api and use it

const theJoke = document.querySelector(".joke");
const getJoke = document.querySelector(".generate-joke");

const fetchTheJoke = async () => {
  const response = await fetch("https://icanhazdadjoke.com", {
    headers: {
      Accept: "application/json",
    },
  });
  return response.json();
};

const generateJoke = async () => {
  const { joke } = await fetchTheJoke();
  theJoke.textContent = joke;
};

getJoke.addEventListener("click", generateJoke);
