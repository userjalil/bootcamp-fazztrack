const categori = {}
const model = require("../models/categori")
const respone = require("../helpers/respone")
const Logger = require("../helpers/logger")
const { redisDb } = require("../configs/redis")

categori.getAll = async (_, res) => {
    try {
        const result = await model.GetAll()
        redisDb.setex("categori", 20, JSON.stringify(result))
        return respone(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return respone(res, 500, error, true)
    }
}

categori.addData = async (req, res) => {
    try {
        const data = {
            name_categori: req.body.name_categori, //edit
        }

        const result = await model.Save(data)
        redisDb.del("categori")
        return respone(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return respone(res, 500, error, true)
    }
}

module.exports = categori
