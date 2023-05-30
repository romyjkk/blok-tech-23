// file to handle all server related things + routes

// setting up the variables

// server (express)

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// engine

const { engine } = require("express-handlebars");
const session = require("express-session");

// other js files

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
  const error = req.session.error;
  req.session.error = "";
  res.render("signup", { title: "Signup", error: error });
});

app.get("/login", (req, res) => {
  const error = req.session.error;
  req.session.error = "";
  res.render("login", { title: "Login", error: error });
});

// make an account

app.post("/signup", async (req, res) => {
  try {
    const { username, email, age, password } = req.body;
    const error = [];

    if (username && email && age && password) {
      const existingUsername = await User.findOne({ username: username });
      if (existingUsername) {
        req.session.error = "This username is already in use";
        return res.redirect("/signup");
      } else {
        if (username.length < 3) {
          req.session.error =
            "Please make sure the username contains at least 3 characters";
          return res.redirect("/signup");
        } else if (username.length > 20) {
          req.session.error =
            "Please make sure the username doesn't contain more than 20 characters";
          return res.redirect("/signup");
        }
      }

      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
        req.session.error = "This e-mail address is already in use";
        return res.redirect("/signup");
      } else {
        const emailRegex =
          /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if (!emailRegex.test(email)) {
          req.session.error = "This e-mail address is not valid";
          return res.redirect("/signup");
        }
      }

      if (password) {
        const passwordRegex =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!passwordRegex.test(password)) {
          req.session.error =
            "Please make sure your password contains at least 8 characters, one capital letter, a number and a special character";
          return res.redirect("/signup");
        }
      }

      if (error.length > 0) {
        req.session.signupError = error;
        return res.redirect("/signup");
      } else {
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
      }
    } else {
      req.session.error = "Please make sure you have filled in all the fields";
      return res.redirect("/signup");
    }
  } catch (error) {
    console.log(error);
  }
});

// login

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const error = [];

    if (username && password) {
      const user = await User.findOne({ username });
      if (user) {
        const checkingPassword = await bcrypt.compare(password, user.password);
        if (checkingPassword) {
          req.session.username = user.username;
          res.redirect("/profile");
        } else {
          req.session.error = "Password incorrect";
          return res.redirect("/login");
        }
      } else {
        req.session.error = "User doesn't exist";
        return res.redirect("/login");
      }

      if (error.length > 0) {
        req.session.signupError = error;
        return res.redirect("/login");
      }
    } else {
      req.session.error = "Please make sure you have filled in all the fields";
      return res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/questions", (req, res) => {
  if (req.session.username) {
    const username = req.session.username;
    res.render("questions", { title: "MovieMatcher", username });
  } else {
    res.redirect("/login");
  }
});

app.get("/matcher", (req, res) => {
  if (req.session.username) {
    res.render("matcher", { title: "MovieMatcher" });
  } else {
    res.redirect("/login");
  }
});

app.get("/search", (req, res) => {
  if (req.session.username) {
    res.render("search", { title: "Search" });
  } else {
    res.redirect("/login");
  }
});

app.get("/list", (req, res) => {
  if (req.session.username) {
    res.render("list", { title: "List" });
  } else {
    res.redirect("/login");
  }
});

app.get("/profile", (req, res) => {
  if (req.session.username) {
    const username = req.session.username;
    const email = req.session.email;
    const age = req.session.age;
    const password = req.session.password;
    res.render("profile", { title: "Profile", username, email, age, password });
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/login");
    console.log("Logged out!");
  } catch (error) {
    console.log(error);
    res.redirect("/profile");
  }
});

app.get("/delete", async (req, res) => {
  const username = req.session.username;

  try {
    await User.findOneAndDelete({ username: username });
    req.session.destroy();
    res.redirect("/login");
    console.log("Account deleted successfully");
  } catch (error) {
    console.log(error);
    res.redirect("/profile");
  }
});

app.get("*", (req, res) => {
  res.render("404", { title: "404 page not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
