const productService = require('../service/productService');


let productController = {

    getProducts : async(req,res,next)=>{
        try {
            let response = await productService.getProducts();
            let code = 200;
            res.status(code).send(response)
            
        } catch (err) {
            next(err)
        }

    },

    getOneProduct : async(req,res,next)=>{
        try {
            let response = await productService.getProductById(req.params.productId);
            let code = 200;
            res.status(code).send(response)
        } catch (err) {
            res.status(404).send({err})
            console.log(err)
        }
    }

    ,
    postProduct : async(req,res,next)=>{
        try {
            let product = req.body;
            console.log(product)
            let response = await productService.postProduct(product);
            let code = 201;
            res.status(code).send(response)
        } catch (err) {
            next(err)
            
        }
    }
}

module.exports = productController;