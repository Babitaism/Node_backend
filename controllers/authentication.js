const UserModel = require("../models/user");
const connectionstr = require("../connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("crypto").randomBytes(64).toString("hex");
const TokenManager = require("../utility/tokenManager");
const { userInfo } = require("os");
dotenv.config();

class Authentication {
  static async login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let responsFromModel = await this.authenticate({ email, password });
    res.json(responsFromModel);
  }

  static tokenDecode = (token, secretkey) => {
    try {
      let decoded = jwt.verify(token, secretkey);
      return { message: decoded, status: 200 }
    } catch (err) {
      return { message: err.message, status: 500 }
    }
  
  }

  static async authenticate(parameters) {
    let user_email = parameters.email;
    let user_password = parameters.password;
    let sql;
    let userInfo = {};
    let token = {};
    if (user_email && user_password) {
      // TODO:: Bad practise improve it later
      sql = `select * from UserDetails where email ="${user_email}" && password ="${user_password}"`;
    }
    try {
      let resp = await connectionstr(
        `select * from UserDetails where email ="${user_email}" && password ="${user_password}"`
      );
      userInfo = UserModel.createUserObj(resp);
      token = await TokenManager.tokenGenerator(userInfo);
      console.log(token);

      if (resp.length == 1) {
        return {
          message: "Authentication Sucessful",
          status: 200,
          userInfo,
          token,
        };
      } else {
        return { message: "Invalid credentials", status: 500 };
      }
    } catch (err) {
      console.log(err);
    }
  }

}

module.exports = Authentication;
