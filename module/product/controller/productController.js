const productService = require('../service/productService');



let productController = {

    getProducts : async(req,res,next)=>{
        try {
            let options = {limit: parseInt(req.query.limit) || 10,page : parseInt(req.query.page || 1)};
            Reflect.deleteProperty(req.query,"limit");
            Reflect.deleteProperty(req.query,"page");
            let query = req.query || null;
            let response = await productService.getProducts(query,options);
            if(!response || response.length ===0){
                let code = 404
                res.status(code).send(response)
            }else{
                let code = 200;
                res.status(code).send(response)

            }
            
        } catch (err) {
            next(err)
        }

    },

    getOneProduct : async(req,res,next)=>{
        try {
            let response = await productService.getProductById(req.params.productId);
            if (!response || response.length===0 ){
                res.status(404).send({message: "Not products found"})
            }else{
                let code = 200;
                res.status(code).send(response)
            }
        } catch (err) {
            //res.status(404).send({err})
            next(err);
        }
    }

    ,
    postProduct : async(req,res,next)=>{
        try {
            let product = req.body;
            let response = await productService.postProduct(product);
            let code = 201;
            res.status(code).send(response)
        } catch (err) {
            next(err)
            
        }
    }
}

module.exports = productController;