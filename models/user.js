const connectionstr = require("../connection");
const jwt = require("jsonwebtoken");
require("crypto").randomBytes(64).toString("hex");
const bcrypt = require('bcryptjs');

class UserModel {
  static async create(parameters) {
     console.log("====syssa", parameters);
    let sql = `INSERT INTO users (email,password,firstname,lastname) VALUES ("${parameters.email}","${parameters.password}","${parameters.firstname}","${parameters.lastname}")`;
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
  }


  static createUserObj(data) {
    delete data[0].Password;
    // console.log("9999999999999999999999999999999999999999999", data[0])
    return data[0];
  }

  static async deleteUserIdDetails(id) {
    let sql;
    if (id) {
      sql = `delete from addresses where id  = ${id.id}`;
    }
    try {
      let resp = await connectionstr(sql);
      if (resp) {
        console.log(id, "deletedddddddddddddddddddddddddddd");
        return {
          message: resp,
          id:id,
        };
      }
    } catch (err) {
      console.log("=====err========", err);
    }
  }

  static async editUserIdDetails(reqObject) {
    const id = reqObject.body;
    const currentUser = reqObject.currentUser.userId;
    let sql;
    if (id) {
      sql = `select * from addresses where id  = ${id.id}`;
    }
    try {
      let resp = await connectionstr(sql);
      // console.log(resp,"resp")
      if (resp) {
        return {
          message: resp,
        };
      }
    } catch (err) {
      console.log("=====err========", err);
    }
  }

  static async editAddressDetails(reqObject) {
    const data = reqObject.body;
    if (data) {
      return {
        message: data,
      };
    }
  }

  static async fetchUserWishlistDetails(reqObject) {
    const id = parseInt(reqObject.body.id);
    const currentUser = reqObject.currentUser.userId;
    function GFG_Fun() {
      let date = new Date();
      return date.toISOString().slice(0, 19).replace("T", " ");
    }
    const created = GFG_Fun();
    let sql;
    if (id) {
      sql = `Insert into wish_list(item_id,user_id,created_at,updated_at) values (${id},${currentUser},'${created}','${created}')`;
    }
    console.log(sql, "sql");
    try {
      let resp = await connectionstr(sql);
      console.log(resp, "resp");
      if (resp.serverStatus==2) {
        return {
          message: id,
        };
      }
    } catch (err) {
      console.log("=============", err);
    }
  }

  static async fetchUserWishlistItems(id) {
    let sql;
    if (id) {
      sql =`select pd.* from wish_list as wl join productdetails as pd on wl.item_id = pd.ID where wl.user_id = ${id}`
    }
    console.log(sql, "sql");
    try {
      let resp = await connectionstr(sql);
      console.log(resp, "resp");
      if (resp) {
        return {
          message: resp,
        };
      }
    } catch (err) {
      console.log("=============", err);
    }
  }


  static async addUserIdDetails(reqObject) {
    const data = reqObject.body;
    const currentUser = reqObject.currentUser;
    console.log(data, "dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    let sql;
    if (data) {
      sql = `update addresses set fullname = "${data.firstName}",mobile_number = "${data.mobileNum}",
      pincode =${data.editPincode},flat_no="${data.editAddress}",house_no="${data.editAddress1}",
     building= "${data.editAddress2}",area_street_sector="${data.editSector}",landmark="${data.editLandmark}",
     town_city="${data.editCity}",state="${data.editState}" where id=${data.id}`;
    }
    try {
      let resp = await connectionstr(sql);
      if (resp) {
        return {
          message: data,
          id: currentUser,
        };
      }
    } catch (err) {
      console.log("=====err========", err);
    }
  }

  static async addUserDetails(reqObject) {
    const data = reqObject.body;
    const currentUser = reqObject.currentUser;
    let sql;
    if (data) {
      sql = `insert into addresses (fullname,mobile_number,pincode,flat_no,house_no,building,area_street_sector,landmark,town_city,state,user_id)
      values ("${data.firstName}","${data.mobile}","${data.pincode}","${data.address}","${data.address1}",
      "${data.address2}"," ${data.sector}","${data.landmark}","${data.city}","${data.state}","${currentUser.userId}")`;
    }
    try {
      let resp = await connectionstr(sql);
      console.log(resp, "resp");
      if (resp) {
        return {
          message: resp,
        };
      }
    } catch (err) {
      console.log("=============", err);
    }
  }

  static async fetchUserDetails(id) {
    let sql;
    if (id) {
      sql = ` select * from addresses where user_id = ${id}`;
    }
    try {
      let resp = await connectionstr(sql);
      // console.log(resp,"resp")
      if (resp) {
        return {
          message: resp,
        };
      }
    } catch (err) {
      console.log("=============", err);
    }
  }
}
// TODO: research about serverstatus or resposne from mysql

module.exports = UserModel;
