const requestTest = require('supertest');
const app = require('../../../app');
const ProductModel = require('../model/products')

describe('getProducts', ()=>{
    
    let testProd;
    beforeAll( async()=>{
        //await ProductModel.deleteMany({})
        testProd = await ProductModel.create(
            { image : "test 1.jpg", 
            name : "test product" ,       
            description : "test 1 description",
            price : 430,
            inventory : 40,
            category : "test"})

    })

    test('Return  products from the database',async()=>{
        const res = await requestTest(app)
        .get("/products/")
        expect(res.status).toBe(200);
        expect(res.body.docs).not.toBeNull();
    }),

    test('Return the products with category "test" from the database',async()=>{
        const res = await requestTest(app)
        .get("/products?category=test")
        expect(res.status).toBe(200);
        expect(res.body.docs[0].category).toBe("test");
    })



    test('Return one product from the database',async()=>{
        const res = await requestTest(app)
        .get(`/products/${testProd._id}`)
        expect(res.status).toBe(200);
        expect(res.body).not.toBeNull()
    })

    test('return Products not found ', async()=>{
        const res = await requestTest(app)
        .get('/products/000000000000000000000000');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({"message": "Not products found"});
    })

    test('return 9 product per page', async()=>{
        const res = await requestTest(app)
        .get("/products?limit=9");
        expect(res.status).toBe(200);
        expect(res.body.limit).toBe(9);
    })

    test('return the products from the page 1',async()=>{
        const res = await requestTest(app)
        .get("/products?page=1");
        expect(res.status).toBe(200);
        expect(res.body.page).toBe(1);
    })

    afterAll(async()=>{
        //await ProductModel.deleteMany({})
    })
})