
class Product {
  
   static async fetchAll(req, res){
     console.log('pppppppppppppppppppp',req.connectionstr)
    const resp =  await req.connectionstr('select * from ProductDetails')
       res.json({ message: resp})
   }
}

module.exports = Product;
