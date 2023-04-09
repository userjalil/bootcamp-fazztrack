const hash = require("./hash")

describe("helpers/hash", () => {
    test("should return random char", async () => {
        const result = await hash("bukanebi")
        expect(result).toEqual(expect.stringContaining("$2b$10$"))
    })

    test("should throw error when params not provie", async () => {
        try {
            const result = await hash()
            expect(result).toBe(false)
        } catch (error) {
            expect(error.message).toBe("data and salt arguments required")
        }
    })
})
