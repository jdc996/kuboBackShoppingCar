const productModel = require('../model/products');


let productService = {

    getProducts : async(query,options)=>{
        let products = await productModel.paginate(query,options)
        return products
    },

    getProductById : async(id)=>{

            let product = await productModel.findById(id)
            return product  
    },

    getCategories : async()=>{
        return await productModel.distinct("category")
    }

}

module.exports = productService;