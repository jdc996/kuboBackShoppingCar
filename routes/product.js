const express = require('express');
const productRouter = express.Router();
const bodyParser = require('body-parser')
const controller = require('../controllers/productController')

productRouter.use(bodyParser.json())

productRouter.route("/")
.get(controller.getProducts)
.post(controller.postProduct)

productRouter.route("/:productId")
.get(controller.getOneProduct)

module.exports = productRouter;