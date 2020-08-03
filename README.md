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
![coverage test](https://kubo-shopping-car-assets.s3.amazonaws.com/images/Screenshot_2020-08-03+Code+coverage+report+for+All+files.png)

##Desarrollo
El programa esta desarrollado en node, exponiendo los servicios:
- GET "/products/" para listar todos los productos
- GET "/products/:idProduct" listar un producto en especifico
- GET "products/categories/all" listar todas las categorias de los productos
- POST "/orders/" guardar la factura u orden de compra con el total de la compra y los productos

Modelo de un producto :
```json
{
"image" : "urlimage",
"name" : "Nombre Producto",
"description" : "Descripcion Producto",
"price" : 200,
"inventory" : 20,
"category" : "Tecnologia"
}
```
Modelo de una orden : 
```json
    "products" : [{

        "_id" : "idProducto",
        
        "name" : "nobreProducto",

        "quantity" : 2
    }],

    "totalPrice" : 10
}  
```

