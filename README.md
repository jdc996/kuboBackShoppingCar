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



