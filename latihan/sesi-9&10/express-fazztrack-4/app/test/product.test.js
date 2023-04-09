require("dotenv").config()
const app = require("../app")
const request = require("supertest")

const standardRespone = {
    status: expect.any(Number),
    description: expect.any(String),
    result: expect.any(Array),
}

let idCategori

describe("service /products", () => {
    describe("POST /products", () => {
        test("should return statuscode 200", async () => {
            const respone = await request(app).post("/api/categori").send({
                name: "minuman",
            })
            const { id } = respone.body.result[0]
            idCategori = id
            expect(respone.statusCode).toBe(200)
        })

        test("should return statuscode 200", async () => {
            const respone = await request(app).post("/api/product").send({
                name: "susu",
                price: 10000,
                categori: idCategori,
            })
            expect(respone.statusCode).toBe(200)
        })
    })
    describe("GET /products", () => {
        test("should return statuscode 200", async () => {
            const respone = await request(app).get("/api/product")
            expect(respone.statusCode).toBe(200)
        })
        test("should return with respone standar", async () => {
            const respone = await request(app).get("/api/product")
            expect(respone.body).toEqual(expect.objectContaining(standardRespone))
        })
    })
})
