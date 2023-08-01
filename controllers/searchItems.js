const connectionstr = require("../connection");
const path = require("path");

class SearchItems {
  static async searchImages(req, res) {
    let responseFromModel = await this.fetchProducts(req);
    res.json({ message: responseFromModel });
  }

  static async fetchProducts(name) {
    let sql;
    if (name.query.item) {
      sql = `with temp_view as (select pd.*, concat( ProductSpecification , ' ' , ProductName)  comb from ProductDetails pd)
      select * from temp_view where comb = '${name.query.item}' or ProductName = '${name.query.item}'`;
    }
    if (!name.query.item) {
      sql = ` select * from ProductDetails`;
    }
    let resp = await connectionstr(sql);
    return resp;
  }

  static async search(req, res) {
    let refinedDataset = await this.getBrandDetails(req);
    let resp = await this.searchElement(refinedDataset, req.query.item);
    console.log(resp,"mmmm")
    res.json({ message: resp });
  }

  static async searchElement(refinedDataset, element) {
    let obj = {};
    let array = [];
    let obj2 = {};
    let finalArray=[]
    for (let i in refinedDataset) {
      let key1 = refinedDataset[i].concatInfo;
      let key2 = refinedDataset[i].items;
      if (obj[key2] == undefined) {
        obj[key2] = 0;
      }
      obj[key2] = obj[key2] + 1;
      if (obj[key1] == undefined) {
        obj[key1] = 0;
      }
      obj[key1] = obj[key1] + 1;
    }
    let objKeys = Object.keys(obj);
    let elem = element.toLowerCase();
    for (let i in objKeys) {
      if (objKeys[i].startsWith(elem)) {
        array.push(objKeys[i]);
      }
    }
    for (let i in array) {
      obj2 = {};
      obj2["title"] = array[i];
      finalArray.push(obj2);
    }
    return finalArray;
  }

  static async removeDuplicate(resp) {
    let obj = {};
    let obj1 = {};
    let array = [];
    let blankArray = [];
    let concatInfo, items;
    let keys;
    for (let i in resp) {
      obj = {};
      concatInfo = resp[i].concatInfo;
      concatInfo = concatInfo.replace(/ +(?= )/g, "");
      concatInfo = concatInfo.toLowerCase();
      obj["concatInfo"] = concatInfo;
      items = resp[i].items;
      items = items.replace(/ +(?= )/g, "");
      items = items.toLowerCase();
      obj["items"] = items;
      blankArray.push(obj);
    }
    for (let i in blankArray) {
      keys = blankArray[i].concatInfo;
      obj1[keys] = blankArray[i];
    }
    for (let i in obj1) {
      array.push(obj1[i]);
    }
    return array;
  }

  static async getBrandDetails(name) {
    let sql;
    let resp = [];
    if (name.query.item.length != 0) {
      sql = `select concat( ProductSpecification , ' ' , ProductName)  concatInfo,  ProductName items from ProductDetails`;
      let dataSet = await connectionstr(sql);
      resp = this.removeDuplicate(dataSet);
    } else {
      resp = [];
    }
    return resp;
  }
}

module.exports = SearchItems;
