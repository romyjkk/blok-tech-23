require("dotenv").config();
const dbKey = process.env.MONGO_URI;
// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
// 1337

app.use("/public", express.static("public"));
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "views");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// connect to the database
async function run() {
  try {
    await mongoose.connect(dbKey);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error(error);
  }
}
run();

// routes

app.get("/", (req, res) => {
  res.render("login", { title: "Login" });
  // the root page is the login page
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});

app.post("/profile", function (req, res) {
  res.send(req.body);
  // send form data here (later want to showcase it in a nice way, example: "Welcome, Romy!", maybe "Welcome back" if the account already exists)
});

app.get("/matcher", (req, res) => {
  res.render("matcher", { title: "MovieMatcher" });
  // will be a static page
});

app.get("*", (req, res) => {
  res.render("404", { title: "404 page not found" });
  // 404 is an actual hbs page
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
