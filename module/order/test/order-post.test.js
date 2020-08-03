const requestTest = require('supertest');
const app = require('../../../app');
const ProductModel = require('../../product/model/products');
const OrderModel = require('../model/orders')

describe("post new order", () => {

    let orderProduct, produtcOutStock, productInventoryUpdate;
    beforeAll(async () => {
        //await ProductModel.deleteMany({})
        orderProduct = await ProductModel.create({
            image: "test Order 1.jpg",
            name: "test Order product",
            description: "test Order 1 description",
            price: 10,
            inventory: 20,
            category: "test"
        })

        produtcOutStock = await ProductModel.create({
            image: "test Order outStock 1.jpg",
            name: "test Order  outStock product",
            description: "test Order 1 description outStock",
            price: 1,
            inventory: 0,
            category: "test"
        })

        productInventoryUpdate = await ProductModel.create({
            image: "Inventory Update 1.jpg",
            name: "Inventory Update product",
            description: "Inventory Update description",
            price: 1,
            inventory: 10,
            category: "test"
        })

    })

    test('return empty order',async()=>{
        const res = await requestTest(app)
        .post("/orders/")
        .send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Orden Vacia");
    })

    test('return No products in the order',async()=>{
        const res = await requestTest(app)
        .post("/orders/")
        .send({"products":[]});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("No hay productors en la orden");
    })

    test('return new order', async () => {
        const res = await requestTest(app)
            .post("/orders/")
            .send({ "products": [{ "_id": orderProduct._id, "name": orderProduct.name, "quantity": 1 }] })
        expect(res.status).toBe(201);
        expect(res.body).not.toBeNull();
    })

    test('return new order with a total price of 30', async () => {
        const res = await requestTest(app)
            .post("/orders/")
            .send({ "products": [{ "_id": orderProduct._id, "name": orderProduct.name, "quantity": 3 }] });
        expect(res.status).toBe(201);
        expect(res.body.totalPrice).toBe(30)
    })

    test('return product dont have enought inventory', async () => {
        const res = await requestTest(app)
            .post("/orders/")
            .send({ "products": [{ "_id": produtcOutStock._id, "name": produtcOutStock.name, "quantity": 3 }] });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(`La cantidad de compra del producto "${produtcOutStock.name}" supera la cantidad en el inventarios`);
    })

    test('return Error product not found in the database', async () => {
        const res = await requestTest(app)
            .post("/orders/")
            .send({ "products": [{ "_id": '000000000000000000000000', "name": " ", "quantity": 3 }] });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('los productos no se encuentran en la base');
    })

    test('return Update the inventory of the product to 5', async () => {
        const res = await requestTest(app)
            .post("/orders/")
            .send({ "products": [{ "_id": productInventoryUpdate._id, "name": productInventoryUpdate.name, "quantity": 5 }] })
        const product = await ProductModel.findById({ _id: productInventoryUpdate._id });
        expect(product.inventory).toBe(5);
    })

    afterAll(async()=>{
        await OrderModel.deleteMany({});
    })


})