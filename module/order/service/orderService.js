const mongoose = require('mongoose');
const orderModel = require('../model/orders');
const { isEmpty } = require('lodash');

let orderService = {
    postOrders: async (order) => {        
        if (!order ||  isEmpty(order)){
            throw new Error("Orden Vacia")    
        } else if(order.products.length <= 0){
            throw new Error("No hay productors en la orden")    
        }
        return await orderModel.create(order)
    }
}

module.exports = orderService;