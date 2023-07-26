const fs = require('fs');
const path = require('path');
const connectionstr = require("../connection");
const actualPath = 'C:\/Users\/91858\/Desktop\/Node_backend\/productimages\/'
const Brands = ['Puma', 'Adidas', 'Cantabil', 'Reebok', 'Denim', 'Peter-England']
const PRODUCT_CONFIGS = require('./productConfig.js')

class ProductFeed {
    constructor(){
      this.rootPath = path.resolve('.'+'/productimages/')
    }

    setItemName(itemName){
      let type = itemName.split('')[0].toLowerCase();
      return { name: PRODUCT_CONFIGS[type], prefix: type }

    }

      readFolderAndGetImages(){
         fs.readdirSync(this.rootPath).forEach(async file => {
      
            let item = this.setItemName(file)
            let random1 =  parseInt(Math.random() * Brands.length)
            let random2 =  parseInt((Math.random()+1) * 100)
            let random3 =  parseInt((Math.random()+1) * 2000)
           let resp = await connectionstr(
           
               ` INSERT INTO ProductDetails (ProductName, ProductSpecification, ProductCount,ProductPerPrice,ProductImage, product_prefix) values('${item.name}', '${Brands[random1]}', '${random2}', '${random3}', '${actualPath+file}' , '${item.prefix}')`)  
          });
    }

    run(){
        this.readFolderAndGetImages()
    }
}


const productFeedObj = new ProductFeed()
productFeedObj.run();