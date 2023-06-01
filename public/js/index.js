console.log(
  "Yo, yo, yo. 148, 3-to-the-3-to-the-6-to-the-9. Representin’ the ABQ. What up, biaatch? Leave it at the tone!"
);

// Progressive enhancement

// Remove "novalidate" if JS is turned off (enabling standard HTML form validation)
// Doesn't work if I put all this in 1 window.addEventListener function for some reason, so this will have to do

// window.addEventListener("DOMContentLoaded", () => {
//   const signupForm = document.getElementById("signup");

//   signupForm.setAttribute("novalidate", true);
// });

// window.addEventListener("DOMContentLoaded", () => {
//   const loginForm = document.getElementById("login");

//   loginForm.setAttribute("novalidate", true);
// });

// expanding text when you click the "delete your account" button

const expandButton = document.querySelector(".expand");
const expandableContent = document.querySelector(".hidden");

expandButton.addEventListener("click", () => {
  expandableContent.classList.toggle("hidden");
});
