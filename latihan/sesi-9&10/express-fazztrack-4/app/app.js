const express = require('express')
const server = express()
const cors = require('cors')
const morganMidle = require('./src/middleware/morganLogs')
const main = require('./src/main')

server.use(cors())
server.use(morganMidle)
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use('/api/v1', main)

module.exports = server
