const request = require("supertest");
const app = require("../../../app");

describe("GET /api/category/list", () => {
  it("should response with 201 as status code", async () => {
    return request(app)
      .get("/api/category/list")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            category: expect.arrayContaining([expect.any(Object)]),
            meta: expect.objectContaining({
              pagination: expect.any(Object),
            }),
          })
        );
      });
  });

  it("should response with 201 as status code", async () => {
    return request(app)
      .get("/api/category/list")
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual(
          expect.objectContaining({
            category: expect.arrayContaining([expect.any(Object)]),
            meta: expect.objectContaining({
              pagination: expect.any(Object),
            }),
          })
        );
      });
  });
});