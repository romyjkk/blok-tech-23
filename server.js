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

// const User = require("./models/User.js");
const database = require("./database.js");
const User = require("./models/User.js");

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

// make an account

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

// login

app.post("/login", (req, res) => {
  const existingUser = {
    username: req.body.username,
    password: req.body.password,
  };

  // hij gaat zoeken naar de gebruiker in de database
  User.findOne(existingUser).then((user) => {
    // als de gebruiker niet bestaat:
    if (!user) {
      console.log("This user doesn't exist!");
      // als de gebruiker wel bestaat:
    } else if (user) {
      // hij maakt een session aan en redirect je naar de "questions" pagina
      req.session.username = existingUser.username;
      res.redirect("questions");
    }
  });
});

app.get("/questions", (req, res) => {
  const username = req.session.username;
  res.render("questions", { title: "MovieMatcher", username });
});

app.get("/matcher", (req, res) => {
  res.render("matcher", { title: "MovieMatcher" });
});

app.get("/search", (req, res) => {
  res.render("search", { title: "Search" });
});

app.get("/list", (req, res) => {
  res.render("list", { title: "List" });
});

app.get("/profile", (req, res) => {
  const username = req.session.username;
  const email = req.session.email;
  const age = req.session.age;
  const password = req.session.password;
  res.render("profile", { title: "Profile", username, email, age, password });
});

app.get("*", (req, res) => {
  res.render("404", { title: "404 page not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
