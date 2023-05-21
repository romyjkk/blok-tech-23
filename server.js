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
// const bodyParser = require("body-parser");

// models

const user = require("./models/User.js");

// setting up handlebars and the static folder

app.use("/public", express.static("public"));
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "views");
app.use(express.urlencoded({ extended: false }));

// setting up body parser

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// connect to the database

mongoose
  .connect(dbKey, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(() => {
    console.log("Failed to connect:");
  });

// connectDB().catch((error) => console.log(error));

// async function connectToDB() {
//   await mongoose.connect(dbKey, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// }

// routes

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });

  // let loginData = new User(req.body);
  // loginData.save();
});

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

// we need to work with async/await in order to work with mongodb

app.post("/signup", async (req, res) => {
  const newUser = {
    firstname: req.body.firstname,
    username: req.body.username,
    email: req.body.email,
    dateofbirth: req.body.dateofbirth,
    password: req.body.password,
  };

  await user.insertMany([newUser]);

  res.render("/questions");
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

// doesn't work

// app.post("/profile", function (req, res) {
//   res.send(req.body);
//   // send form data here (later want to showcase it in a nice way, example: "Welcome, Romy!", maybe "Welcome back" if the account already exists)
// });

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
