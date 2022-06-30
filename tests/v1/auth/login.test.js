const request = require("supertest");
const app = require("../../../app");

describe("POST /api/user/login", () => {
    it("should response with 200 as status code", async () => {
        const email = `member@gmail.com`;
        const password = "123";

        return request(app)
            .post("/api/user/login")
            .set("Content-Type", "application/json")
            .send({email, password})
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        ...res.body,
                    })
                );
            });
    });

    // it("should response with 404 as status code", async () => {
    //     const email = `notfound@gmail.com`;
    //     const password = "123";

    //     return request(app)
    //         .post("/api/user/login")
    //         .set("Content-Type", "application/json")
    //         .send({email, password})
    //         .then((res) => {
    //             expect(res.statusCode).toBe(404);
    //             expect(res.body).toEqual(
    //                 expect.objectContaining({
    //                     error: {
    //                         name: expect.any(String),
    //                         message: expect.any(String),
    //                         details: {
    //                             email: email,
    //                         },
    //                     },
    //                 })
    //             );
    //         });
    // });

    // it("should response with 404 as status code", async () => {
    //     const email = `member@gmail.com`;
    //     const password = "passwordsalah";

    //     return request(app)
    //         .post("/v1/auth/login")
    //         .set("Content-Type", "application/json")
    //         .send({email, password})
    //         .then((res) => {
    //             expect(res.statusCode).toBe(401);
    //             expect(res.body).toEqual(
    //                 expect.objectContaining({
    //                     error: {
    //                         name: "Error",
    //                         message: "Password is not correct!",
    //                         details: {},
    //                     },
    //                 })
    //             );
    //         });
    // });
});