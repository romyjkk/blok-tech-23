// expanding text when you click the "delete your account" button

const expandButton = document.querySelector(".expand");
const expandableContent = document.querySelector("#hidden-content");

expandButton.addEventListener("click", () => {
  expandableContent.classList.toggle("hidden");
});
