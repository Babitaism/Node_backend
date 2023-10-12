const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

class TokenManager {
  static async  tokenGenerator(userInfo) {
  let  jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      email: userInfo.email,
      time: Date(),
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      userId: userInfo.UserId,
    };
    const token = jwt.sign(data, jwtSecretKey);

    return token
  
  }

}


module.exports = TokenManager
