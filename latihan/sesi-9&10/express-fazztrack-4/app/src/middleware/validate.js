const respone = require("../helpers/respone")
const jwt = require("jsonwebtoken")

const checkToken = (role) => {
    return (req, res, next) => {
        const { tokenauth } = req.headers

        if (process.env.NODE_ENV === "test") {
            next()
            return
        }

        if (!tokenauth) {
            return respone(res, 401, { msg: "Login dlu" })
        }

        jwt.verify(tokenauth, process.env.JWT_KEYS, (err, decode) => {
            if (err) {
                return respone(res, 401, err)
            }

            if (decode.role === role) {
                next()
            } else {
                return respone(res, 401, { msg: "akess tidak dizinkan" })
            }
        })
    }
}

module.exports = checkToken
