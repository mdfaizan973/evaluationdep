const mongoose = require("mongoose");
const UserSchma = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    gender: { type: String, require: true },
    password: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", UserSchma);

module.exports = { UserModel };
