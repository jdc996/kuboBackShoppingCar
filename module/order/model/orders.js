const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productModel = require('../../product/model/products');
const lodash = require('lodash');
const paginate = require('mongoose-paginate-v2');



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
        min : 0
    }

},{
    timestamps : true
})

orderSchema.plugin(paginate);

orderSchema.pre('save',async function(){
    let doc=this
    let ids = doc.products.map(p=>p.productId.toString());
    let products= await productModel.find({'_id':{$in: ids}})
    let diferencia = lodash.difference(ids,products.map(p => p._id.toString()))
    if(diferencia.length !== 0 ){
        throw new Error("los productos no se encuentran en la base")
    }
    let pUpdate = []
    let precio = 0
    doc.products.forEach(p => {
        let product = products.find(i => i._id.toString() === p.productId.toString());
        product.inventory -= p.quantity;
        
        precio += p.quantity*product.price
        
        if (product.inventory < 0 ){
            throw new Error(`La cantidad de compra del producto "${product.name}" supera la cantidad en el inventarios`)
            // throw error La cantidad de compra del producto supera la cantidad en el inventario
        }    
        pUpdate.push(product);
    });

    let promises = [];
    
    for(let p of pUpdate){
        promises = [...promises,p.save()];
    }
    await Promise.all(promises);
    
    doc.totalPrice = precio;

})

let orders = mongoose.model("order",orderSchema);
module.exports = orders;