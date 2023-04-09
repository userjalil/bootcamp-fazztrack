const router = require('express').Router()
const routerUser = require('./router_user')

router.use("/api/v1", routerUser)

module.exports = router