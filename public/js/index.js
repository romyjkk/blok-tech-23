// Progressive enhancement

// Remove "novalidate" if JS is turned off (enabling standard HTML form validation)
// Doesn't work if I put all this in 1 window.addEventListener function for some reason, so this will have to do

window.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup");

  signupForm.setAttribute("novalidate", true);
});

window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login");

  loginForm.setAttribute("novalidate", true);
});

// password validation

let passwordInput = document.getElementById("password");
let characters = document.querySelector(".characters");
let letters = document.querySelector(".letters");
let numbers = document.querySelector(".numbers");
let specialCharacters = document.querySelector(".specialcharacters");

const checkPasswordStrength = (passwordValue) => {
  if (passwordValue.length >= 8 && passwordValue.length <= 50) {
    characters.classList.remove("red");
    characters.classList.add("green");
  } else {
    characters.classList.add("red");
    characters.classList.remove("green");
  }

  if (passwordValue.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    letters.classList.remove("red");
    letters.classList.add("green");
  } else {
    letters.classList.add("red");
    letters.classList.remove("green");
  }

  if (passwordValue.match(/([0-9])/)) {
    numbers.classList.remove("red");
    numbers.classList.add("green");
  } else {
    numbers.classList.add("red");
    numbers.classList.remove("green");
  }

  if (passwordValue.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
    specialCharacters.classList.remove("red");
    specialCharacters.classList.add("green");
  } else {
    specialCharacters.classList.add("red");
    specialCharacters.classList.remove("green");
  }
};

passwordInput.addEventListener("input", () => {
  checkPasswordStrength(passwordInput.value);
});
