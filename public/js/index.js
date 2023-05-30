console.log(
  "Yo, yo, yo. 148, 3-to-the-3-to-the-6-to-the-9. Representin’ the ABQ. What up, biaatch? Leave it at the tone!"
);

// Progressive enhancement

// Remove "novalidate" if JS is turned off (enabling standard HTML form validation)

const signupForm = document.getElementById("signup");
const loginForm = document.getElementById("login");

signupForm.setAttribute("novalidate", true);
loginForm.setAttribute("novalidate", true);
