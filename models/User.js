const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema

const userSchema = new mongoose.Schema({
  username: String,
  age: Date,
  email: String,
  password: String,
  // username: {
  //   type: String,
  //   required: [true, "Please provide a username!"],
  // },
  // age: {
  //   type: Number,
  //   required: [true, "Please provide an age!"],
  // },
  // email: {
  //   type: String,
  //   required: [true, "Please provide an email address!"],
  // },
  // password: {
  //   type: String,
  //   required: [true, "Please provide a password!"],
  // },
});

module.exports = mongoose.model("User", userSchema);

// const UserModel = mongoose.model("user", UserSchema);
// module.exports = UserModel;
// module.exports = mongoose.model("User", userModel);
