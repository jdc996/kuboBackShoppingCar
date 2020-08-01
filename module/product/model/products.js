const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const paginate = require('mongoose-paginate-v2')

var productSchema = new Schema({
    image : {
        type : String,
        required : true,
        url : [String],
    },
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    inventory : {
        type : Number,
        required : true,
        min : 0
    },
    category : {
        type : String,
        required : true,
        default : ''
    }
},
{ timestamps : true } 
)
productSchema.plugin(paginate);

let products = mongoose.model("product",productSchema)

module.exports = products