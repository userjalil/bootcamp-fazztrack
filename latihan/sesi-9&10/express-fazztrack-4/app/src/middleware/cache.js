const respone = require("../helpers/respone")
const { redisDb } = require("../configs/redis")
const redis = {}

redis.getProds = (req, res, next) => {
    redisDb.get("product", (err, data) => {
        if (err) {
            return respone(res, 500, err, true)
        }

        if (data !== null) {
            console.log("data dari redis")
            const result = JSON.parse(data)
            return respone(res, 200, result)
        } else {
            next()
        }
    })
}

redis.getCategori = (req, res, next) => {
    redisDb.get("categori", (err, data) => {
        if (err) {
            return respone(res, 500, err, true)
        }

        if (data !== null) {
            console.log("data dari redis")
            const result = JSON.parse(data)
            return respone(res, 200, result)
        } else {
            next()
        }
    })
}

module.exports = redis
