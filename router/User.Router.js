const express = require("express");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/User.model");

//post---request --->>register
UserRouter.post("/register", async (req, res) => {
  const { email, password, name, gender } = req.body;
  bcrypt.hash(password, 5, async (err, hash) => {
    const user = new UserModel({ email, password: hash, name, gender });
    await user.save();
    res.send("user Added");
  });
});

//post---request --->>login
UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].hash, (err, result) => {
        if (!result) {
          const token = jwt.sign({ body_id: user[0]._id }, "masaieval");
          res.send({ msg: "LoginSuccess", token: token });
        } else {
          res.send({ msg: "User Not Found" });
        }
      });
    } else {
      res.send({ msg: "User Not Found" });
    }
  } catch (error) {
    console.log({ error: "error.message" });
  }
});

module.exports = { UserRouter };
