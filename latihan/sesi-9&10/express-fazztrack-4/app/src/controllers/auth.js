const auth = {}
const model = require('../models/users')
const bcr = require('bcrypt')
const jwt = require('jsonwebtoken')
const respone = require('../helpers/respone')
const Logger = require('../helpers/logger')

const token = async (username, role = 'user') => {
    try {
        const payload = {
            user: username,
            role: role
        }
        const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: '1h' })
        const result = {
            message: 'token created, login success',
            token: token
        }
        return result
    } catch (error) {
        throw error // melempar ke function yang memanggil
    }
}

auth.login = async (req, res) => {
    try {
        const passDB = await model.getbyUsername(req.body.username)

        if (passDB <= 0) {
            return respone(res, 400, { msg: 'username tidak terdaftar' }, true)
        }

        const passUsers = req.body.password
        const check = await bcr.compare(passUsers, passDB[0].password)

        if (check) {
            const result = await token(req.body.username, passDB[0].role)
            return respone(res, 200, result)
        } else {
            return respone(res, 401, { msg: 'Password Salah' }, true)
        }
    } catch (error) {
        Logger.error(error)
        return respone(res, 500, error, true)
    }
}

module.exports = auth
