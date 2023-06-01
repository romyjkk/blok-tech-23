// const fetch = require("node-fetch");
// import fetch from "node-fetch";

// window.addEventListener("DOMContentLoaded", () => {
//   const posterContainers = document.getElementsByClassName("movie-poster");

//   fetch("/matcher")
//     .then((response) => response.json())
//     .then((data) => {
//       const movies = data.movies;

//       movies.forEach((movie, index) => {
//         const posterPath = movie.poster_path;
//         const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

//         const img = document.createElement("img");
//         img.src = posterUrl;
//         img.alt = movie.title;

//         // Append the image to each individual poster container
//         if (posterContainers[index]) {
//           posterContainers[index].appendChild(img);
//         }
//       });
//     })
//     .catch((error) => {
//       console.log("Error:", error);
//     });
// });

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGRmNTg2MjNjZmJmN2FmZTQ0OGM3ZWJlMzYzZjAzMiIsInN1YiI6IjY0Nzc2NTllMDc2Y2U4MDBhODIxOWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oKitKcLCvDmOBRibqwbafYB6oQLuo0eC1-VD2jbSq_M",
//   },
// };

// async function fetchAPI() {
//   try {
//     const apiKey = "68df58623cfbf7afe448c7ebe363f032";
//     const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// fetchAPI();
