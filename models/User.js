const mongoose = require("mongoose");
// const bycrypt = require("bcrypt");

// create signup schema

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide your first name!"],
    trim: true,
  },
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
  dateofbirth: {
    type: Date,
    required: [true, "Please provide a date of birth!"],
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

// userSchema.method({
//   async authenticate(hashedPassword) {
//     return bycrypt.compare(hashedPassword, this.password);
//   },
// });

// create model and export it

const User = new mongoose.model("moviematcher", userSchema);
module.exports = User;

// module.exports = mongoose.model("User", userSchema);

// const UserModel = mongoose.model("user", UserSchema);
// module.exports = UserModel;
// module.exports = mongoose.model("User", userModel);
