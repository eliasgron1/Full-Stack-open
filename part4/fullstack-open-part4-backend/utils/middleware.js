const logger = require('./logger')

const logRequests = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('******')
  next()
}


// ERROR HANDLER
const errorHandler = (error, request, response, next) => {
  logger.info(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'bad id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  errorHandler,
  logRequests,
  unknownEndpoint
}