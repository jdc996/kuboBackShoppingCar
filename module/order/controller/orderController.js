const orderService = require('../service/orderService');

let orderController = {

    postOrder : async(req,res,next)=>{
        try {
            await orderService.postOrders(req.body)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = orderController;