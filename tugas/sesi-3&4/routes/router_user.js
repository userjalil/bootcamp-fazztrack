const { findAllUsers, getUsersById, createNewUsers, updateUsers, deleteUsers } = require('../controllers/user_controller')
const router = require('express').Router()

router.get('/users', findAllUsers)
router.get('/users/:id', getUsersById)
router.post('/users', createNewUsers)
router.patch('/users/:id', updateUsers)
router.delete('/users/:id', deleteUsers)

module.exports = router