const mongoose = require("mongoose");

// create signup schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// create model and export it

const User = new mongoose.model("moviematcher", userSchema);
module.exports = User;
