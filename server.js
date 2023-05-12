require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
// const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
// 1337

app.use("/public", express.static("public"));
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "views");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("login", { title: "Login" });
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});

// app.post("/profile", (req, res) => {
//   req.render("profile", {
//     title: "Profile",
//     name: "Romy Jongkees",
//   });
// });

app.post("/profile", function (req, res) {
  res.send(req.body);
});

app.get("/matcher", (req, res) => {
  res.render("matcher", { title: "MovieMatcher" });
});

app.get("*", (req, res) => {
  res.render("404", { title: "404 page not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
