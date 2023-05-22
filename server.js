// file to handle all server related things

// setting up the variables

// server (express)

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const passwordHash = require("bcrypt");

// engine

const { engine } = require("express-handlebars");

// database

require("dotenv").config();
const dbKey = process.env.MONGO_URI;
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

// other js files

const User = require("./models/User.js");

// express & express handlebars & express session

app.use("/public", express.static("public"));
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(
//   session({
//     secret: "youdidnthearthisfrommebutyouareanerd",
//     saveUninitialized: true,
//     resave: false,
//   })
// );

// connect to the database

mongoose
  .connect(dbKey, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Failed to connect", err);
    process.exit();
  });

// routes

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});

app.get("/", (req, res) => {
  res.render("login", { title: "Login" });
});

// we need to work with async/await in order to work with mongodb

app.post("/signup", async (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password,
  };

  await User.create(newUser);

  res.render("questions");
});

app.post("/", (req, res) => {
  const existingUser = {
    username: req.body.username,
    password: req.body.password,
  };
  User.findOne(existingUser).then((user) => {
    if (!user) {
      res.json({ succes: false, error: "This user doesn't exist!" });
    }
  });
  res.render("questions");
});

app.post("/questions", (req, res) => {});

app.get("/questions", (req, res) => {
  res.render("questions", { title: "MovieMatcher" });
});

app.get("/matcher", (req, res) => {
  res.render("matcher", { title: "MovieMatcher" });
  // will be a static page
});

app.get("*", (req, res) => {
  res.render("404", { title: "404 page not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
