const path = require("path");
const url = require("url");
const fs = require('fs');

class Product {
  static async fetchAll(req, res) {
    // console.log(req.body,"page")
    const total = await req.connectionstr(`select count(*) count from productdetails`)
    // console.log(total,"total")
    let totalCount  = total[0].count
    const count = Math.ceil(totalCount /req.body.limit)
    // console.log(count)
     const resp = await req.connectionstr(`select * from ProductDetails limit ${req.body.limit} offset ${req.body.offset}`);
    // console.log('====================', resp)
     res.json({ message: resp ,count:count});
  }

  static async sendImage(req, res) {
    const path = req.query.path
     let x = fs.existsSync(path)
    //  console.log('=====eeee=========', x, '==', path)
    res.sendFile(`${path}`);
  }
}

module.exports = Product;
