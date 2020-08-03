# kuboBackShoppingCar
Backend de carrito de compras para la pruba practica de Kubo

##Instalacion
*Tener instalado `node`
* Instalar dependencias node
```bash
npm install
```
## Test
### Unit Test
```bash
npm run test
```
### Coverage
```bash
npm run coverage
```

##Desarrollo
El programa esta desarrollado en node, exponiendo los servicios:
- GET "/products/" para listar todos los productos
- GET "/products/:idProduct" listar un producto en especifico
- GET "products/categories/all" listar todas las categorias de los productos
- POST "/orders/" guardar la factura u orden de compra con el total de la compra y los productos

Modelo de un producto :
```json
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
}
```
Modelo de una orden : 
```json
    products : [{

        _id : {
            type : mongoose.Types.ObjectId
        },
        
        name : {
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

}  
```

