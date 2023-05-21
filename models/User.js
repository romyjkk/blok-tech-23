const mongoose = require("mongoose");

// create signup schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username!"],
    trim: true,
    unique: [true, "This username is already in use!"],
    min: [3, "Please make sure your username is 3 or more characters long!"],
    max: [
      20,
      "Please make sure your username doesn't have more than 20 characters!",
    ],
  },
  age: {
    type: Number,
    required: [true, "Please provide your age!"],
  },
  email: {
    type: String,
    required: [true, "Please make sure you provide an email address!"],
    trim: true,
    unique: [true, "This e-mail address is already in use!"],
  },
  password: {
    type: String,
    required: [true, "Please make sure to provide a password!"],
  },
});

// create model and export it

const User = new mongoose.model("moviematcher", userSchema);
module.exports = User;
