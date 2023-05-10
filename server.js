// let require;
// let process;

const { engine } = require("express-handlebars");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
// 1337

app.use("/public", express.static("public"));
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.set("views", "views");

// register partial
// const handlebars = engine.create();
// handlebars.handlebars.registerPartial("footer", "{{footer}}");

app.get("/", (req, res) => {
  res.render("login", { title: "Login" });
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});

app.get("/profile", (req, res) => {
  res.render("profile", {
    title: "Profile",
    name: "Romy Jongkees",
  });
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
