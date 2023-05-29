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

const bcrypt = require("bcrypt");

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

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup", error: req.session.error });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login", error: req.session.error });
});

// make an account

app.post("/signup", async (req, res) => {
  try {
    const { username, email, age, password } = req.body;

    // check username
    if (username) {
      if (username.length < 3) {
        req.session.error =
          "Please make sure the username contains at least 3 characters";
        res.render("signup", { error: req.session.error });
        return;
      } else if (username.length > 20) {
        req.session.error =
          "Please make sure the username doesn't contain more than 20 characters";
        res.render("signup", { error: req.session.error });
        return;
      } else {
        console.log("Username is valid!");
      }
    } else {
      req.session.error = "Please provide a username!";
      res.render("signup", { error: req.session.error });
      return;
    }

    // check email
    if (email) {
      const emailRegex =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
      if (emailRegex.test(email)) {
        // something good
      } else {
        req.session.error = "This e-mail address is not valid";
        res.render("signup", { error: req.session.error });
        return;
        // res.render("signup");
      }
    } else {
      req.session.error = "Please provide an e-mail address";
      res.render("signup", { error: req.session.error });
      return;
      // res.render("signup");
    }

    // check age
    if (age) {
      // something good
    } else {
      req.session.error = "Please provide your age";
      res.render("signup", { error: req.session.error });
      return;
      // res.render("signup");
    }

    // check password
    if (!password) {
      req.session.error = "Please provide a password";
      res.render("signup", { error: req.session.error });
      return;
      // res.render("signup");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      email,
      age,
      password: hashedPassword,
    });
    req.session.username = user.username;
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
});

// login

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      const checkingPassword = await bcrypt.compare(password, user.password);
      if (checkingPassword) {
        req.session.username = req.body.username;
        // res.redirect("profile");
      } else {
        req.session.error = "Password incorrect";
        res.render("login", { error: req.session.error });
        return;
      }
    } else {
      req.session.error = "User doesn't exist";
      res.render("login", { error: req.session.error });
      return;
    }
  } catch (error) {
    console.log(error);
  }
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
