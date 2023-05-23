// file to handle all server related things

// setting up the variables

// server (express)

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// engine

const { engine } = require("express-handlebars");
const session = require("express-session");

// other js files

const User = require("./models/User.js");
const database = require("./database.js");

// rest

const passwordHash = require("bcrypt");

// express & express handlebars & express session

app.use("/public", express.static("public"));
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// session

app.use(
  session({
    secret: "youdidnthearthisfrommebutyouareanerd",
    saveUninitialized: true,
    resave: false,
  })
);

// routes

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});

app.get("/login", (req, res) => {
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

  req.session.username = newUser.username;

  res.redirect("questions");
});

app.post("/login", (req, res) => {
  const existingUser = {
    username: req.body.username,
    password: req.body.password,
  };
  User.findOne(existingUser).then((user) => {
    if (!user) {
      res.json({ succes: false, error: "This user doesn't exist!" });
    } else if (user) {
      req.session.username = existingUser.username;
      res.redirect("questions");
    }
  });
});

app.get("/questions", (req, res) => {
  const username = req.session.username;
  res.render("questions", { title: "MovieMatcher", username });
});

// app.post("/questions", (req, res) => {
//   const username = req.session.username;
//   res.render("questions", { title: "MovieMatcher", username });
// });

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
