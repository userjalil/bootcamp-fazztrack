const { findAllMotors, getMotorsById } = require('../controller/motor_controller')
const { findAllHomes, getHomesById } = require('../controller/rumah_controller')
const router = require('express').Router()

router.get('/motors', findAllMotors)
router.get('/motors/:id', getMotorsById)
router.get('/rumah', findAllHomes)
router.get('/rumah/:id', getHomesById)

module.exports = router
