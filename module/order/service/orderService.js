const mongoose = require('mongoose');
const orderModel = require('../model/orders');
const productModel = require('../../product/model/products');

let orderService = {
    postOrders: async (order) => {
        ("entro a servicio")

        if (!order || order.products.length <= 0) {
            //error orden vacia
            throw new Error("orden Vacia")
        }
        return await orderModel.create(order)
    }
}

module.exports = orderService;