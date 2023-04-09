const products = {}
const model = require("../models/products")
const respone = require("../helpers/respone")
const uploads = require("../helpers/uploadCloud")
const Logger = require("../helpers/logger")
const Redis = require("../configs/redis").redisDb

products.getAll = async (_, res) => {
    try {
        const result = await model.GetAll()
        Redis.setex("product", 20, JSON.stringify(result))
        return respone(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return respone(res, 500, error, true)
    }
}

products.addData = async (req, res) => {
    try {
        let urlImage = ""
        if (req.file !== undefined) {
            urlImage = await uploads(req.file.path)
        }

        const data = {
            name_product: req.body.name,
            price_product: req.body.price,
            image_product: urlImage,
            id_categori: req.body.categori,
        }

        const result = await model.Save(data)
        Redis.del("product")
        return respone(res, 200, result)
    } catch (error) {
        Logger.error(error)
        return respone(res, 500, error, true)
    }
}

module.exports = products
