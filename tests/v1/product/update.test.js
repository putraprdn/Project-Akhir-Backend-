const request = require("supertest");
const app = require("../../../app");

// Update a product
describe("PUT /api/product/update", () => {
    it("should response with 201 as status code", async () => {
        return request(app)
            .put("/api/product/update")
            .send({
                id: 1,
                name: "Product 1",
                description: "Product 1 description",
                price: 100,
                categoryId: 1,
            })
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        error: 0,
                        message: "Product updated",
                        data: expect.any(Object),
                    })
                );
            });
    }).timeout(10000);
    it("should response with 201 as status code", async () => {
        return request(app)
            .put("/api/product/update")
            .send({
                id: 1,
                name: "Product 1",
                description: "Product 1 description",
                price: 100,
                categoryId: 1,
            })
            .then((res) => {
                expect(res.statusCode).toBe(500);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        error: expect.any(Object),
                        message: expect.any(String),
                        data: null,
                    })
                );
            });
    }).timeout(10000);
})