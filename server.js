// setting up the variables

// server

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// engine

const { engine } = require("express-handlebars");

// database

require("dotenv").config();
const dbKey = process.env.MONGO_URI;
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

// body parser
const bodyParser = require("body-parser");

// models

const User = require("./models/User.js");

// setting up handlebars and the static folder

app.use("/public", express.static("public"));
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "views");

// setting up body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to the database

connectToDB().catch((error) => console.log(error));

async function connectToDB() {
  await mongoose.connect(dbKey, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// routes

app.get("/", (req, res) => {
  res.render("login", { title: "Login" });
  // the root page is the login page

  // .then(item => {
  //   res.send("Item saved to database!");
  // })
  // .catch(err => {
  //   console.log(err);
  // })
});

app.post("/", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username, password }, (error, user) => {
    if (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ error: "Failed to log in" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    return res.status(200).json({ message: "Logged in successfully" });
  });
  // ik weet nog niet zo goed wat ik hiermee ga doen
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });

  // let loginData = new User(req.body);
  // loginData.save();
});

app.post("/signup", (req, res) => {
  const { firstname, username, dateofbirth, email, password } = req.body;

  const newUser = new User({
    firstname,
    username,
    dateofbirth,
    email,
    password,
  });

  newUser.save();

  // newUser.save((err) => {
  //   if (err) {
  //     console.error("Error signing up:", err);
  //     return res.status(500).json({ error: "Failed to sign up" });
  //   }
  //   return res.status(200).json({ message: "Sign up successful" });
  // });
});

// doesn't work

// app.post("/profile", function (req, res) {
//   res.send(req.body);
//   // send form data here (later want to showcase it in a nice way, example: "Welcome, Romy!", maybe "Welcome back" if the account already exists)
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
