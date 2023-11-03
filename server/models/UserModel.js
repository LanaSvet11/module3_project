const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
//                           1. ^which collection 2. ^ the schema

module.exports = UserModel;
