const express = require("express")
const routing = express.Router()
const product = require("./routes/product")
const categori = require("./routes/categori")
const users = require("./routes/users")
const auth = require("./routes/auth")
const { cloudConfig } = require("./configs/cloudinary")

routing.use("*", cloudConfig)
routing.use("/product", product)
routing.use("/categori", categori)
routing.use("/users", users)
routing.use("/auth", auth)

routing.use("*", (req, res) => {
    res.status(404).json("salah endpoint?")
})

module.exports = routing
