const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var orderSchema = new Schema({
    products : [{

        productId : {
            type : mongoose.Types.ObjectId
        },
        
        productName : {
            type : String,
            required: true
        },

        quantity : {
            type : Number,
            required : true,
            min : 1
        }
    }],

    totalPrice : {
        type : Number,
        required : true 
    }

},{
    timestamps : true
})

let orders = mongoose.model("order",orderSchema);
module.exports = orders;