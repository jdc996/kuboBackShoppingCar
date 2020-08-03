const express = require('express');
const productRouter = express.Router();
const bodyParser = require('body-parser')
const controller = require('../controller/productController')

productRouter.use(bodyParser.json())

productRouter.route("/")
.get(controller.getProducts)


productRouter.route("/:productId")
.get(controller.getOneProduct)

productRouter.route("/categories/all")
.get(controller.getCategories)

module.exports = productRouter;