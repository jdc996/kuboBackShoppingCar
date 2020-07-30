const productModel = require('../model/products');


let productService = {

    getProducts : async()=>{
        let products = await productModel.find({})
        return products
    },

    getProductById : async(id)=>{

            let product = await productModel.findById(id)
            return product
       
    },
    postProduct : async(product)=>{

            res = await productModel.insertMany(product)
            return res
 
    }

}

module.exports = productService;