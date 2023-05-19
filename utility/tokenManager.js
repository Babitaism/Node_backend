const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

class TokenManager {
  static async  tokenGenerator(userInfo) {
  let  jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: userInfo.UserId,
      email: userInfo.email
    };
    const token = jwt.sign(data, jwtSecretKey);
    console.log(token,"token")
    return token
  }
}


module.exports = TokenManager
