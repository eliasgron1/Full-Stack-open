const logger = require('./utils/logger') // logging errors and info
const config = require('./utils/config') // variables such as port
const middleware = require('./utils/middleware')
require('express-async-errors') // eliminates the need for try-catch
const express = require('express')  // express instance
const app = express()
const cors = require('cors') // allow cross-origin resource sharing
const blogsRouter = require('./controllers/blogs') // handle requests for /api/blogs
const usersRouter = require('./controllers/users') // handle requests for /api/users
const loginRouter = require('./controllers/login') // handle requests for /api/login
const mongoose = require('mongoose') // library for mongodb

mongoose.set('strictQuery', false)

logger.info('running on ', config.NODE_ENV)
logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(
    logger.info('connection to db successful')
  )
  .catch(error => {
    logger.info('connection failed', error)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.logRequests)
app.use(middleware.getTokenFrom)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app