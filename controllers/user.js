const connectionstr = require("../connection");
const UserModel = require("../models/user");
require("crypto").randomBytes(64).toString("hex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const Authentication = require("./authentication")
const TokenManager = require("../utility/tokenManager");

class User {
  static async signup(req, res) {
    // console.log(req.body,"body")
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstName;
    let lastname = req.body.lastName;

    let responsFromModel = await UserModel.create({
      email,
      password,
      firstname,
      lastname,
    });
    res.json(responsFromModel);
    console.log(responsFromModel,"res")
  }

  static async getUserDetail(req, res) {
      let responseFromModel = await this.userNameDetails(req.currentUser.userId);
      res.json(responseFromModel);
  }

  static async userNameDetails(number) {
    let sql;
    if (number == undefined) {
      return {
        message: "Authentication Failed",
        name: "",
        status: 401,
      };
    }
   
    if (number) {
      sql = `select * from UserDetails where userId = ${number}`;
    }
    let resp = await connectionstr(
      `select * from UserDetails where userId = ${number}`
    );
    let userInfo = UserModel.createUserObj(resp);
    let token = await TokenManager.tokenGenerator(userInfo);
    let name = resp[0].FirstName + " " + resp[0].LastName;
    let userDetails = resp[0]
    if (resp.length == 1) {
      return {
        message: "Authentication Sucessful",
        userName: name,
        status: 200,
        userDetails,
        token,
      };
    }
  }
}



module.exports = User;
