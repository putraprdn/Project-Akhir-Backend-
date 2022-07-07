const request = require("supertest");
const app = require("../../../app");

describe("GET /api/product/list", () => {
    it("should response with 201 as status code", async () => {
        return request(app)
            .get("/api/product/list")
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        product: expect.arrayContaining([expect.any(Object)]),
                        meta: expect.objectContaining({
                            pagination: expect.any(Object),
                        }),
                    })
                );
            });
    });
    it("should response with 201 as status code", async () => {
        return request(app)
            .get("/api/product/list")
            .then((res) => {
                expect(res.statusCode).toBe(500);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        product: expect.arrayContaining([expect.any(Object)]),
                        meta: expect.objectContaining({
                            pagination: expect.any(Object),
                        }),
                    })
                );
            });
    })
})