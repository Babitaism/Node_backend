const connectionstr = require("../connection");
const UserModel = require("../models/user");
require("crypto").randomBytes(64).toString("hex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');


class User {
  static async signup(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    let responsFromModel = await UserModel.create({
      email,
      password,
      firstname,
      lastname,
    });
    res.json(responsFromModel);
  }


}

module.exports = User;
