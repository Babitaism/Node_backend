const path = require("path");
const url = require('url');


class Product {
  static async fetchAll(req, res) {
    const resp = await req.connectionstr("select * from ProductDetails");
    res.json({ message: resp });
  }

  static async sendImage(req, res) {    
    res.sendFile(`${req.query.path}`);
  }

}


module.exports = Product;
