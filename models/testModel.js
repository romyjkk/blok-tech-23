const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username!"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
  },
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
// module.exports = mongoose.model("User", userModel);
