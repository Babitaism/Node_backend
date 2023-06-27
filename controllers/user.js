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

  static async getUserDetail(userDetails, res) {
    let token = userDetails.headers.token;
    let decode = Authentication.tokenDecode(token, process.env.JWT_SECRET_KEY);
    if (decode.status == 500) {
      res.json(decode);
    }


    if (decode.status ==  200) {
      let id = decode.message.userId;
      console.log(decode, "deco.....");
      let responseFromModel = await this.userNameDetails(id);
      res.json(responseFromModel);
    }
    //  var older_token = jwt.sign({ token:token, iat: Math.floor(Date.now() / 1000) - 30 },process.env.JWT_SECRET_KEY);
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
      console.log(name);
      console.log(userDetails,"resp")
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
