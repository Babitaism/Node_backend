const path = require("path");
const url = require("url");

class Product {
  static async fetchAll(req, res) {
    const resp = await req.connectionstr("select * from ProductDetails");
    res.json({ message: resp });
  }

  static async sendImage(req, res) {
    const path = req.query.path
    console.log('==============', path )
    res.sendFile(`${path}`);
  }
}

module.exports = Product;
