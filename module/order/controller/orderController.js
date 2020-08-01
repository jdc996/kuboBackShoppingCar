const orderService = require('../service/orderService');

let orderController = {

    postOrder : async(req,res,next)=>{
        try {
            let order = await orderService.postOrders(req.body)
            res.status(201).send(order)
        } catch (error) {
            //res.status(error.status).send(error.message)
            next(error)
        }
    }
}

module.exports = orderController;