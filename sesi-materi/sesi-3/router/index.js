const { findAllusers,getUsersById } = require('../controller/user_controller')
const router = require('express').Router()

router.get('/users', findAllusers)
router.get('/users/:id', getUsersById)

module.exports = router
