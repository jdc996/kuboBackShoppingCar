const express = require('express');
const bodyParser = require('body-parser')
const orderController = require('../controllers/orderController')

const orderRouter = express.Router();

orderRouter.use(bodyParser.json())

orderRouter.route("/")
.post(orderController.postOrder)

module.exports = orderRouter;