const productService = require('../service/productService');



let productController = {

    getProducts: async (req, res, next) => {
        try {
            let options = { limit: parseInt(req.query.limit) || 12, page: parseInt(req.query.page || 1) };
            Reflect.deleteProperty(req.query, "limit");
            Reflect.deleteProperty(req.query, "page");
            let query = req.query || {};
            let response = await productService.getProducts(query, options);
            let code = 200;
            res.status(code).send(response)


        } catch (err) {
            //istanbul ignore next
            next(err)
        }

    },

    getOneProduct: async (req, res, next) => {
        try {
            let response = await productService.getProductById(req.params.productId);
            if (!response || response.length === 0) {
                res.status(404).send({ message: "Not products found" })
            } else {
                let code = 200;
                res.status(code).send(response)
            }
        } catch (err) {
            // istanbul ignore next
            next(err);
        }
    },

    getCategories: async (req, res, next) => {
        try {
            let response = await productService.getCategories();
            res.status(200).send(response)
        } catch (error) {
            next(error)
        }

    }


}

module.exports = productController;