const connectionstr = require ("../connection");
const path = require("path");

class SearchItems {
  static async searchBrandImages(req, res) {
    let responseFromModel = await this.fetchProducts(req);
    console.log(responseFromModel,"===========")
    res.json({ message:responseFromModel}); 
  }

  static async fetchProducts(name) {
    let sql;
    console.log(name.query.item,"item")
    if (name.query.item) {
      sql = `select * from ProductDetails WHERE ProductSpecification = "${name.query.item}" `;
    }
    if (!name.query.item) {
      sql = ` select * from ProductDetails`;
    }
    let resp = await connectionstr(sql)
    return resp
  }

  static async searchBrand(req, res) {
    let responseFromModel = await this.getBrandDetails(req);
    let resp = await this.rename(responseFromModel)
    console.log(resp,"mmmm")
    res.json({ message:resp}); 
  }

  static async rename(RowDataPacket) {
    let blankarr = [];
    let uniqueArr = [];
    let uniqueObj = {};
    for (let i in RowDataPacket) {
      let obj = {};
      obj.title = RowDataPacket[i].ProductSpecification;
      blankarr.push(obj);
    }
    for (let i in blankarr) {
      let values = blankarr[i].title;
      uniqueObj[values] = blankarr[i];
    }
    for (let i in uniqueObj) {
      uniqueArr.push(uniqueObj[i]);
    }
    return uniqueArr;
  }

  static async getBrandDetails(name) {
    let sql;
    if (name.query.item.length != 0) {
      sql = `select * from ProductDetails WHERE ProductSpecification LIKE "${name.query.item}%" `;
    }
    if (name.query.item.length == 0) {
      sql = ` select * from ProductDetails WHERE ProductSpecification IS NULL`;
    }
    let resp = await connectionstr(sql)
    return resp
  }
}

module.exports = SearchItems;
