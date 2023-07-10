const connectionstr = require("../connection");
const jwt = require("jsonwebtoken");
require("crypto").randomBytes(64).toString("hex");
const bcrypt = require("bcryptjs");

// const jwt = require('jsonwebtoken')

class UserModel {
  static async create(parameters) {
  console.log('====syssa', parameters)
    let sql = `INSERT INTO UserDetails (email,password,firstname,lastname) VALUES ("${parameters.email}","${parameters.password}","${parameters.firstname}","${parameters.lastname}")`;
    try {
      let resp = await connectionstr(sql);
      if (resp.serverStatus == 2) {
        return { message: "Registered Sucessfully", status: 200 };
      }
    } catch (err) {
      if (err.code == "ER_DUP_ENTRY") {
        return { message: "Duplicate email Id", status: 500 };
      }
      console.log("=============", err);
    }
    // TODO: research aboyr serverstatus or resposne from mysql
  }


  static createUserObj(data) {
    delete data[0].Password;
    return data[0];
  }
}
// TODO: research aboyr serverstatus or resposne from mysql

module.exports = UserModel;
