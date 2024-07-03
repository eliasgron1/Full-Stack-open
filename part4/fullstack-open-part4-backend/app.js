const logger = require('./utils/logger') // logging errors and info
const config = require('./utils/config') // variables such as port
const middleware = require('./utils/middleware')
const express = require('express')  // express instance
const app = express()
const cors = require('cors') // allow cross-origin resource sharing
const blogsRouter = require('./controllers/blogs') // contains routes for requests
const mongoose = require('mongoose') // mongodb library

mongoose.set('strictQuery', false)

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
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app