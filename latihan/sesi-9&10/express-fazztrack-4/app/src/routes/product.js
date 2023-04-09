const express = require("express")
const routing = express.Router()
const ctrl = require("../controllers/product")
const uploads = require("../middleware/upload")
const redis = require("../middleware/cache")

routing.get("/", redis.getProds, ctrl.getAll)
routing.post("/", uploads.single("image"), ctrl.addData)

module.exports = routing
