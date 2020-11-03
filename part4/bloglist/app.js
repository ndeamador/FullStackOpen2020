// ¿Config imported first to make sure dotenv is imported as early as possible?
const config  = require('./utils/config')
const express = require('express')
// express-async-errors handles async errors on its own, so we don't need try-catch blocks or the next function.
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


const mongoUrl = config.MONGODB_URI

logger.info('connecting to', mongoUrl)

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {
    logger.info('connected to MonboDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})


app.use(cors())
app.use(express.json())
// since the express.Router() object in blogsRouter.js is a middleware, we use it with app.use:
// the first parameter indicates the root of the used route (the routes in blogsRouter.js are relative to this one)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)


module.exports = app