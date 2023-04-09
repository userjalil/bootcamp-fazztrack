// require('newrelic') //disable
const dotenv = require('dotenv')
const Logger = require('./src/helpers/logger')
const PORT = 9000

if (process.env.NODE_ENV === 'dev') {
    dotenv.config({ path: __dirname + '/.env.development' })
}
if (process.env.NODE_ENV === 'prod') {
    dotenv.config({ path: __dirname + '/.env.production' })
}

const { orm: database } = require('./src/configs/db')
const redis = require('./src/configs/redis')
const server = require('./app')

    ; (async () => {
        try {
            await database.authenticate()
            if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'dev') {
                await database.sync({ alter: true })
                await redis.check()
            }
            await database.sync() //tambahan
            server.listen(PORT, () => {
                Logger.info('Database connected')
                Logger.info('Redis connected')
                Logger.info(`Service running on port ${PORT}`)
            })
        } catch (error) {
            Logger.error(error)
        }
    })()
