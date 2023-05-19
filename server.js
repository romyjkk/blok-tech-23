// setting up the variables

require("dotenv").config();
const dbKey = process.env.MONGO_URI;
const { MongoClient, ServerApiVersion } = require("mongodb");
// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
// const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
// const User = require("./models/User.js");
// 1337

app.use("/public", express.static("public"));
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "views");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// connect to the database

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(dbKey, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // call the database and the collection
    const db = client.db("sample_guides");
    const coll = db.collection("comets");

    const doc = {
      orbitalPeriod: {
        $gt: 5,
        $lt: 85,
      },
    };

    const result = await coll.deleteMany(doc);

    // iterate over all the results

    console.log("Number of documents deleted: " + result.deletedCount);
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Connected!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// routes

app.get("/", (req, res) => {
  res.render("login", { title: "Login" });
  // the root page is the login page
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});

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
  // 404 is an actual hbs page
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
