const fs = require('fs');
const path = require('path');
const connectionstr = require("../connection");
const actualPath = 'file:///C:/Users/91858/Desktop/Node_backend/productimages/'
const Brands = ['Puma', 'Adidas', 'Cantabil', 'Reebok', 'Denim', 'Peter-England']


class ProductFeed {
    constructor(){
      this.rootPath = path.resolve('.'+'/productimages')
    }

      readFolderAndGetImages(){
         fs.readdirSync(this.rootPath).forEach(async file => {
            let random1 =  parseInt(Math.random() * Brands.length-1)
            let random2 =  parseInt(Math.random() * 100)
            let random3 =  parseInt(Math.random() * 2000)
            let resp = await connectionstr(
                ` INSERT INTO ProductDetails (ProductName, ProductSpecification, ProductCount,ProductPerPrice,ProductImage) values('T-shirt', '${Brands[random1]}', '${random2}', '${random3}', '${actualPath+file}' )`)  
          });
    }

    run(){
        this.readFolderAndGetImages()
    }
}


const productFeedObj = new ProductFeed()
productFeedObj.run();