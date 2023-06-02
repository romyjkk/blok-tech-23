// Intersection Observer API

// adding a nice animation when you load the login page for the first time

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".container");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  });
  observer.observe(section);
});

// adding a nice animation on the "list" page

document.addEventListener("DOMContentLoaded", () => {
  const scrollingSections = document.querySelectorAll(".list-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("list-hidden");
      } else {
        entry.target.classList.add("list-hidden");
      }
    });
  });

  scrollingSections.forEach((section) => {
    observer.observe(section);
  });
});
