
const mysql = require('mysql');
const util = require('util');
const connectionStr = mysql.createConnection({
    host: 'localhost', user: 'root',
    password: 'babita_360703', database: 'babita_first_web'
})


const query = util.promisify(connectionStr.query).bind(connectionStr);


  //connect to mysql
  connectionStr.connect(err => {
    if (err) {
      throw err
    }
    console.log("MYSQL Connected")
  })



  module.exports = query;