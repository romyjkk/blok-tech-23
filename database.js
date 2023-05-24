// file to handle all things related to the database (MongoDB)

require("dotenv").config();
const dbKey = process.env.MONGO_URI;
const mongoose = require("mongoose");

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
  });
