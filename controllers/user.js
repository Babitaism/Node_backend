const connectionstr = require("../connection");
const UserModel = require("../models/user");
require("crypto").randomBytes(64).toString("hex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Authentication = require("./authentication");
const TokenManager = require("../utility/tokenManager");
const jwt_decode = require("jwt-decode");

class User {

  static async deleteUserDetails(req, res) {
    let responsFromModel = await UserModel.deleteUserIdDetails(req.body);
    res.json(responsFromModel);
  }

  static async editUserDetails(req, res) {
    let responsFromModel = await UserModel.editUserIdDetails(req);
    res.json(responsFromModel);
  }

  static async editAndAddUserDetails(req, res) {
     let responsFromModel = await UserModel.addUserIdDetails(req);
     res.json(responsFromModel);
  }

  static async editAddress(req, res) {
    let responsFromModel = await UserModel.editAddressDetails(req);
    res.json(responsFromModel);
  }

  static async fetchUser(req, res) {
    let responsFromModel = await UserModel.fetchUserWishlistDetails(req);
    res.json(responsFromModel);
  }

  static async fetchUserItems(req, res) {
    let responsFromModel = await UserModel.fetchUserWishlistItems(req.currentUser.userId);
    res.json(responsFromModel);
  }

  static async getUserProfile(req, res) {
    let decoded = jwt_decode(req.headers.token);
    let responsFromModel = await UserModel.fetchUserDetails(decoded.userId);
    res.json(responsFromModel);
  }

  static async addDetails(req, res) {
    let responsFromModel = await UserModel.addUserDetails(req);
    res.json(responsFromModel);
  }


  static async signup(req, res) {
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
      sql = `select * from users where userId = ${number}`;
    }
    let resp = await connectionstr(
      `select * from users where userId = ${number}`
    );
    let userInfo = UserModel.createUserObj(resp);
    let token = await TokenManager.tokenGenerator(userInfo);
    let name = resp[0].FirstName + " " + resp[0].LastName;
    let userDetails = resp[0];
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
